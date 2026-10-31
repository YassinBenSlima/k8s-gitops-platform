import React, { useEffect, useState } from 'react';
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  HeartIcon,
  ChevronDownIcon,
  CheckIcon,
  XIcon,
  ZapIcon,
  ToggleLeftIcon,
  ToggleRightIcon,
  InfoIcon } from
'lucide-react';
import { usePatient } from '../../contexts/PatientContext';
interface AppointmentFormData {
  date: string;
  time: string;
  duration: string;
  patientName: string;
  patientId: string;
  type: string;
  doctor: string;
  room: string;
  notes: string;
  priority: string;
}
interface AppointmentCreateProps {
  onClose?: () => void;
  onSuccess?: (data: AppointmentFormData) => void;
}
function getCurrentDateString() {
  const now = new Date();
  return now.toISOString().split('T')[0];
}
function getCurrentTimeString() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(Math.ceil(now.getMinutes() / 5) * 5).padStart(2, '0');
  return `${hours}:${minutes === '60' ? '00' : minutes}`;
}
const APPOINTMENT_TYPES = [
'Consultation cardiologique',
'ECG / Tracé cardiaque',
'Échocardiographie',
"Épreuve d'effort",
'Holter ECG 24h',
'Holter tensionnel 24h',
'Coronarographie',
'Angioplastie coronaire',
'Cardioversion électrique',
'Pose de pacemaker',
'Consultation pré-opératoire',
'Suivi post-intervention',
'Bilan cardiovasculaire',
'Téléconsultation cardiologie',
'Urgence cardiologique'];

const DOCTORS = [
'Dr. Mansouri — Cardiologie',
'Dr. Ben Ali — Cardiologie interventionnelle',
'Dr. Chaabane — Arythmologie',
'Dr. Trabelsi — Insuffisance cardiaque',
'Dr. Khelil — Imagerie cardiaque'];

const ROOMS = [
'Salle ECG 1',
'Salle ECG 2',
'Salle Écho 1',
'Salle Écho 2',
'Salle Cathétérisme',
'Salle Effort',
'Consultation 1',
'Consultation 2',
'Consultation 3',
'Soins intensifs cardiologiques'];

const DURATIONS = ['15 min', '30 min', '45 min', '1h', '1h30', '2h', '3h', '4h'];
const PRIORITIES = [
{
  value: 'normal',
  label: 'Normal',
  color: 'text-green-600 bg-green-50 border-green-200'
},
{
  value: 'urgent',
  label: 'Urgent',
  color: 'text-orange-600 bg-orange-50 border-orange-200'
},
{
  value: 'critique',
  label: 'Critique',
  color: 'text-red-600 bg-red-50 border-red-200'
}];

const DOCTOR_AVAILABILITY: Record<
  string,
  Array<{ dateOffset: number; time: string; durationMin: number; patient: string; type: string }>
> = {
  'Dr. Mansouri — Cardiologie': [
    { dateOffset: 0, time: '08:30', durationMin: 30, patient: 'Ahmed Ben Salah', type: 'Consultation' },
    { dateOffset: 0, time: '10:00', durationMin: 60, patient: 'Fatma Trabelsi', type: 'ECG' },
    { dateOffset: 1, time: '14:00', durationMin: 30, patient: 'Mohamed Khelifi', type: 'Suivi' }
  ],
  'Dr. Ben Ali — Cardiologie interventionnelle': [
    { dateOffset: 0, time: '09:00', durationMin: 90, patient: 'Karim Bouzid', type: 'Coronarographie' },
    { dateOffset: 2, time: '11:00', durationMin: 45, patient: 'Riadh Gharbi', type: 'Bilan' }
  ],
  'Dr. Chaabane — Arythmologie': [
    { dateOffset: 0, time: '11:30', durationMin: 30, patient: 'Nadia Sfar', type: 'Holter' },
    { dateOffset: 1, time: '15:00', durationMin: 60, patient: 'Ahmed Ben Salah', type: 'ECG' }
  ],
  'Dr. Trabelsi — Insuffisance cardiaque': [
    { dateOffset: 0, time: '13:30', durationMin: 30, patient: 'Sonia Mejri', type: 'Suivi' },
    { dateOffset: 3, time: '09:30', durationMin: 45, patient: 'Leila Hamdi', type: 'Consultation' }
  ],
  'Dr. Khelil — Imagerie cardiaque': [
    { dateOffset: 0, time: '08:00', durationMin: 60, patient: 'Mohamed Khelifi', type: 'Échocardiographie' },
    { dateOffset: 2, time: '16:00', durationMin: 60, patient: 'Fatma Trabelsi', type: 'Échocardiographie' }
  ]
};

function generateTimeSlots(startHour = 8, endHour = 18, stepMinutes = 30) {
  const slots: string[] = [];
  const startMinutes = startHour * 60;
  const endMinutes = endHour * 60;

  for (
    let currentMinutes = startMinutes;
    currentMinutes < endMinutes;
    currentMinutes += stepMinutes
  ) {
    const hours = Math.floor(currentMinutes / 60);
    const minutes = currentMinutes % 60;
    slots.push(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`);
  }

  return slots;
}

function addMinutes(time: string, minutesToAdd: number) {
  const [hours, minutes] = time.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes + minutesToAdd;
  return `${String(Math.floor(totalMinutes / 60)).padStart(2, '0')}:${String(totalMinutes % 60).padStart(2, '0')}`;
}

function durationToMinutes(duration: string) {
  if (duration === '15 min') return 15;
  if (duration === '30 min') return 30;
  if (duration === '45 min') return 45;
  if (duration === '1h') return 60;
  if (duration === '1h30') return 90;
  if (duration === '2h') return 120;
  if (duration === '3h') return 180;
  if (duration === '4h') return 240;
  return 30;
}

function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function formatLongDate(date: string) {
  if (!date) return 'Sélectionner une date';
  return new Date(date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function makeIsoDate(offset: number) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().split('T')[0];
}

export function AppointmentCreate({
  onClose,
  onSuccess
}: AppointmentCreateProps) {
  const { selectedPatient } = usePatient();
  const [useCurrentDateTime, setUseCurrentDateTime] = useState(false);
  const [formData, setFormData] = useState<AppointmentFormData>({
    date: makeIsoDate(0),
    time: '',
    duration: '30 min',
    patientName: selectedPatient.name,
    patientId: selectedPatient.dossier,
    type: '',
    doctor: '',
    room: '',
    notes: '',
    priority: 'normal'
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof AppointmentFormData, string>>>(
    {});
  const [submitted, setSubmitted] = useState(false);
  const selectedDurationMin = durationToMinutes(formData.duration);
  const timeSlots = generateTimeSlots(8, 18, selectedDurationMin);
  const availabilityDates = Array.from({ length: 7 }, (_, index) => {
    const iso = makeIsoDate(index);
    const date = new Date(iso);
    return {
      iso,
      shortWeekday: date.toLocaleDateString('fr-FR', { weekday: 'short' }).replace('.', ''),
      day: date.getDate(),
      month: date.toLocaleDateString('fr-FR', { month: 'short' }).replace('.', '')
    };
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      patientName: selectedPatient.name,
      patientId: selectedPatient.dossier
    }));
  }, [selectedPatient]);

  // Auto-fill date/time when switch is toggled on
  useEffect(() => {
    if (useCurrentDateTime) {
      setFormData((prev) => ({
        ...prev,
        date: getCurrentDateString(),
        time: getCurrentTimeString()
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        date: prev.date || makeIsoDate(0),
        time: ''
      }));
    }
  }, [useCurrentDateTime]);
  // Live clock update when switch is on
  useEffect(() => {
    if (!useCurrentDateTime) return;
    const interval = setInterval(() => {
      setFormData((prev) => ({
        ...prev,
        date: getCurrentDateString(),
        time: getCurrentTimeString()
      }));
    }, 30000); // update every 30s
    return () => clearInterval(interval);
  }, [useCurrentDateTime]);
  const handleChange = (field: keyof AppointmentFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined
      }));
    }
  };
  const validate = () => {
    const newErrors: Partial<Record<keyof AppointmentFormData, string>> = {};
    if (!formData.date) newErrors.date = 'La date est requise';
    if (!formData.time) newErrors.time = "L'heure est requise";
    if (!formData.patientName)
    newErrors.patientName = 'Le nom du patient est requis';
    if (!formData.type) newErrors.type = 'Le type de rendez-vous est requis';
    if (!formData.doctor) newErrors.doctor = 'Le médecin est requis';
    return newErrors;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitted(true);
    onSuccess?.(formData);
  };
  const doctorBookings = formData.doctor ? DOCTOR_AVAILABILITY[formData.doctor] || [] : [];
  const getOccupiedSlot = (slotTime: string) => {
    if (!formData.doctor || !formData.date) return null;
    return doctorBookings.find((booking) => {
      const bookingDate = makeIsoDate(booking.dateOffset);
      if (bookingDate !== formData.date) return false;
      const bookingEnd = addMinutes(booking.time, booking.durationMin);
      return slotTime >= booking.time && slotTime < bookingEnd;
    }) || null;
  };

  useEffect(() => {
    if (!formData.time) return;

    const selectedTimeMinutes = timeToMinutes(formData.time);
    const dayStartMinutes = 8 * 60;
    const dayEndMinutes = 18 * 60;
    const slotFitsGrid =
      selectedTimeMinutes >= dayStartMinutes &&
      selectedTimeMinutes < dayEndMinutes &&
      (selectedTimeMinutes - dayStartMinutes) % selectedDurationMin === 0;

    if (!slotFitsGrid) {
      setFormData((prev) => ({
        ...prev,
        time: ''
      }));
    }
  }, [formData.time, selectedDurationMin]);

  const isSlotSelected = (slotTime: string) => formData.time === slotTime;
  const availableSlotCount = timeSlots.filter((slot) => !getOccupiedSlot(slot)).length;

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6 max-w-sm w-full text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckIcon className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Rendez-vous créé !
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Le rendez-vous a été enregistré avec succès pour le {formData.date}{' '}
            à {formData.time}.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                date: makeIsoDate(0),
                time: '',
                duration: '30 min',
                patientName: selectedPatient.name,
                patientId: selectedPatient.dossier,
                type: '',
                doctor: '',
                room: '',
                notes: '',
                priority: 'normal'
              });
              setUseCurrentDateTime(false);
            }}
            className="w-full py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">

            Nouveau rendez-vous
          </button>
        </div>
      </div>);

  }
  return (
    <div className="min-h-screen bg-gray-50 p-3 md:p-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center shadow-sm">
            <HeartIcon className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">
              Nouveau Rendez-vous
            </h1>
            <p className="text-xs text-gray-500">
              Cardiologie — Planification de consultation
            </p>
          </div>
        </div>
        {onClose &&
        <button
          onClick={onClose}
          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">

            <XIcon className="w-4 h-4" />
          </button>
        }
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Current Date/Time Switch — PROMINENT CARD */}
        <div
          className={`rounded-xl border-2 p-3.5 transition-all duration-300 ${useCurrentDateTime ? 'border-red-400 bg-gradient-to-r from-red-50 to-rose-50 shadow-sm' : 'border-gray-200 bg-white'}`}>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${useCurrentDateTime ? 'bg-red-600' : 'bg-gray-100'}`}>

                <ZapIcon
                  className={`w-4 h-4 ${useCurrentDateTime ? 'text-white' : 'text-gray-400'}`} />

              </div>
              <div>
                <p
                  className={`text-sm font-semibold ${useCurrentDateTime ? 'text-red-800' : 'text-gray-900'}`}>

                  Date & Heure Actuelles
                </p>
                <p
                  className={`text-xs ${useCurrentDateTime ? 'text-red-600' : 'text-gray-500'}`}>

                  {useCurrentDateTime ?
                  `Rempli automatiquement — ${new Date().toLocaleDateString(
                    'fr-FR',
                    {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }
                  )} à ${getCurrentTimeString()}` :
                  "Activer pour remplir automatiquement la date et l'heure"}
                </p>
              </div>
            </div>

            {/* Toggle Switch */}
            <button
              type="button"
              onClick={() => setUseCurrentDateTime(!useCurrentDateTime)}
              className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${useCurrentDateTime ? 'bg-red-600' : 'bg-gray-200'}`}
              role="switch"
              aria-checked={useCurrentDateTime}
              aria-label="Utiliser la date et l'heure actuelles">

              <span
                className={`inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${useCurrentDateTime ? 'translate-x-7' : 'translate-x-1'}`} />

            </button>
          </div>

          {useCurrentDateTime &&
            <div className="mt-3 flex items-center gap-2 p-2.5 bg-white border border-red-200 rounded-lg">
              <InfoIcon className="w-4 h-4 text-red-500 flex-shrink-0" />
              <p className="text-xs text-red-700">
                Les champs <strong>Date</strong> et <strong>Heure</strong> sont
                remplis automatiquement avec la date et l'heure actuelles. Vous
                pouvez toujours les modifier manuellement si nécessaire.
              </p>
            </div>
          }
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
          <div className="xl:col-span-7 space-y-4 min-w-0">
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-red-500" />
                Planification
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => {
                        handleChange('date', e.target.value);
                        handleChange('time', '');
                      }}
                      className={`w-full px-2.5 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${useCurrentDateTime ? 'bg-red-50 border-red-300 text-red-800 font-medium' : 'border-gray-200 bg-white'} ${errors.date ? 'border-red-400' : ''}`} />

                    {useCurrentDateTime &&
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        <ZapIcon className="w-3.5 h-3.5 text-red-500" />
                      </div>
                    }
                  </div>
                  {errors.date &&
                  <p className="text-xs text-red-500 mt-1">{errors.date}</p>
                  }
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Heure <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => handleChange('time', e.target.value)}
                      className={`w-full px-2.5 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${useCurrentDateTime ? 'bg-red-50 border-red-300 text-red-800 font-medium' : 'border-gray-200 bg-white'} ${errors.time ? 'border-red-400' : ''}`} />

                    {useCurrentDateTime &&
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        <ZapIcon className="w-3.5 h-3.5 text-red-500" />
                      </div>
                    }
                  </div>
                  {errors.time &&
                  <p className="text-xs text-red-500 mt-1">{errors.time}</p>
                  }
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Durée
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) => handleChange('duration', e.target.value)}
                    className="w-full px-2.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white">

                    {DURATIONS.map((d) =>
                    <option key={d} value={d}>
                        {d}
                      </option>
                    )}
                  </select>
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Priorité
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {PRIORITIES.map((p) =>
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => handleChange('priority', p.value)}
                    className={`py-1.5 px-2.5 rounded-lg text-sm font-medium border-2 transition-all ${formData.priority === p.value ? p.color + ' border-current' : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-300'}`}>

                      {p.label}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <UserIcon className="w-4 h-4 text-red-500" />
                Patient
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Nom du patient <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.patientName}
                    onChange={(e) => handleChange('patientName', e.target.value)}
                    placeholder="Rechercher un patient..."
                    className={`w-full px-2.5 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.patientName ? 'border-red-400' : 'border-gray-200'}`} />

                  {errors.patientName &&
                  <p className="text-xs text-red-500 mt-1">
                      {errors.patientName}
                    </p>
                  }
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    N° Dossier
                  </label>
                  <input
                    type="text"
                    value={formData.patientId}
                    onChange={(e) => handleChange('patientId', e.target.value)}
                    placeholder="Ex: C-2025-0042"
                    className="w-full px-2.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />

                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <HeartIcon className="w-4 h-4 text-red-500" />
                Détails de la Consultation
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Type de rendez-vous <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleChange('type', e.target.value)}
                    className={`w-full px-2.5 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white ${errors.type ? 'border-red-400' : 'border-gray-200'}`}>

                    <option value="">Sélectionner un type...</option>
                    {APPOINTMENT_TYPES.map((t) =>
                    <option key={t} value={t}>
                        {t}
                      </option>
                    )}
                  </select>
                  {errors.type &&
                  <p className="text-xs text-red-500 mt-1">{errors.type}</p>
                  }
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Médecin <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.doctor}
                    onChange={(e) => {
                      handleChange('doctor', e.target.value);
                      handleChange('time', '');
                    }}
                    className={`w-full px-2.5 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white ${errors.doctor ? 'border-red-400' : 'border-gray-200'}`}>

                    <option value="">Sélectionner un médecin...</option>
                    {DOCTORS.map((d) =>
                    <option key={d} value={d}>
                        {d}
                      </option>
                    )}
                  </select>
                  {errors.doctor &&
                  <p className="text-xs text-red-500 mt-1">{errors.doctor}</p>
                  }
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Salle / Équipement
                  </label>
                  <select
                    value={formData.room}
                    onChange={(e) => handleChange('room', e.target.value)}
                    className="w-full px-2.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white">

                    <option value="">Sélectionner une salle...</option>
                    {ROOMS.map((r) =>
                    <option key={r} value={r}>
                        {r}
                      </option>
                    )}
                  </select>
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Notes / Instructions
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  placeholder="Instructions pré-consultation, préparation requise, informations importantes..."
                  rows={3}
                  className="w-full px-2.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 resize-none" />

              </div>
            </div>
          </div>

          <aside className="xl:col-span-5 xl:sticky xl:top-4 space-y-4 min-w-0">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-semibold flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-red-400" />
                      Disponibilités du praticien
                    </h2>
                    <p className="text-[11px] text-slate-300 mt-1">
                      {formData.doctor || 'Sélectionnez un médecin'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">Date</p>
                    <p className="text-[11px] font-medium text-white">{formatLongDate(formData.date)}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 border-b border-gray-100 bg-slate-50">
                <div className="grid grid-cols-7 gap-1.5">
                  {availabilityDates.map((dateItem) => (
                    <button
                      key={dateItem.iso}
                      type="button"
                      onClick={() => {
                        handleChange('date', dateItem.iso);
                        handleChange('time', '');
                      }}
                      className={`rounded-lg border px-1.5 py-1.5 text-center transition-all ${formData.date === dateItem.iso ? 'border-red-300 bg-red-50 text-red-700 shadow-sm' : 'border-slate-200 bg-white text-slate-500 hover:border-emerald-300 hover:bg-emerald-50'}`}>
                      <p className="text-[10px] font-semibold uppercase">{dateItem.shortWeekday}</p>
                      <p className="text-sm font-bold leading-none mt-1">{dateItem.day}</p>
                      <p className="text-[10px] mt-0.5">{dateItem.month}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-white border-b border-gray-100">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-2 py-1.5">
                    <p className="text-[10px] uppercase tracking-wide text-emerald-600">Disponibles</p>
                    <p className="text-base font-bold text-emerald-700">{availableSlotCount}</p>
                  </div>
                  <div className="rounded-lg bg-amber-50 border border-amber-200 px-2 py-1.5">
                    <p className="text-[10px] uppercase tracking-wide text-amber-600">Sélection</p>
                    <p className="text-base font-bold text-amber-700">{formData.time || '--:--'}</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 border border-slate-200 px-2 py-1.5">
                    <p className="text-[10px] uppercase tracking-wide text-slate-500">Durée</p>
                    <p className="text-base font-bold text-slate-700">{durationToMinutes(formData.duration)} min</p>
                  </div>
                </div>
              </div>

              <div className="max-h-[460px] overflow-y-auto p-2.5 bg-slate-50 space-y-1">
                {!formData.doctor ? (
                  <div className="rounded-lg border border-dashed border-slate-300 bg-white px-4 py-6 text-center">
                    <ClockIcon className="w-5 h-5 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm font-medium text-slate-600">Choisissez un praticien</p>
                    <p className="text-xs text-slate-400 mt-1">Le planning journalier apparaîtra ici.</p>
                  </div>
                ) : (
                  timeSlots.map((slot) => {
                    const occupied = getOccupiedSlot(slot);
                    const isSelected = isSlotSelected(slot);
                    return (
                      <div key={slot} className="flex items-stretch h-9 group">
                        <div className="w-12 flex-shrink-0 text-[11px] font-medium text-slate-400 flex items-center justify-end pr-2">
                          {slot}
                        </div>
                        {occupied ? (
                          <div className="flex-1 rounded-lg border border-slate-200 bg-slate-200/70 text-slate-600 px-2.5 flex items-center justify-between cursor-not-allowed">
                            <span className="text-xs font-medium truncate">Occupé - {occupied.patient}</span>
                            <span className="text-[10px] text-slate-500 ml-2">{occupied.type}</span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleChange('time', slot)}
                            className={`flex-1 rounded-lg border px-2.5 text-left transition-colors ${isSelected ? 'border-red-300 bg-red-50 text-red-700' : 'border-dashed border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50 text-slate-400 hover:text-emerald-700'}`}>
                            <span className="text-xs font-medium">{isSelected ? 'Créneau sélectionné' : 'Disponible'}</span>
                          </button>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </aside>
        </div>

        {/* Summary when current datetime is used */}
        {useCurrentDateTime &&
        <div className="bg-red-600 rounded-xl p-3 text-white">
            <div className="flex items-center gap-2 mb-2">
              <ZapIcon className="w-4 h-4" />
              <p className="font-semibold text-sm">Rendez-vous immédiat</p>
            </div>
            <p className="text-red-100 text-xs">
              Ce rendez-vous sera enregistré pour <strong>maintenant</strong> —{' '}
              {new Date().toLocaleDateString('fr-FR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}{' '}
              à {getCurrentTimeString()}.
            </p>
          </div>
        }

        {/* Actions */}
        <div className="flex items-center justify-end gap-2.5 pb-4">
          {onClose &&
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">

              Annuler
            </button>
          }
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors shadow-sm">

            <CheckIcon className="w-4 h-4" />
            Créer le rendez-vous
          </button>
        </div>
      </form>
    </div>);

}
export default AppointmentCreate;