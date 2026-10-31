import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  PhoneIcon,
  FileTextIcon,
  PillIcon,
  ActivityIcon,
  CheckCircleIcon,
  XCircleIcon,
  EditIcon,
  PrinterIcon,
  ShareIcon,
  PlusIcon,
  HeartIcon,
  ThermometerIcon,
  ScaleIcon,
  RulerIcon,
  EyeIcon,
  AlertCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  StethoscopeIcon,
  ClipboardListIcon,
  BeakerIcon,
  CameraIcon,
  LinkIcon } from
'lucide-react';
const appointment = {
  id: '2',
  patient: {
    name: 'Marie Dupont',
    age: 45,
    dob: '15/03/1979',
    phone: '06 12 34 56 78',
    email: 'marie.dupont@email.com',
    bloodType: 'A+',
    allergies: ['Pénicilline', 'Aspirine'],
    insurance: 'CNAM',
    insuranceNum: 'CN-2024-789456'
  },
  date: '15 Jan 2025',
  time: '09:30',
  duration: '45 min',
  type: 'Consultation',
  status: 'completed',
  doctor: 'Dr. Ahmed Ben Ali',
  specialty: 'Médecine Générale',
  room: 'Salle 3',
  motif: 'Douleurs thoraciques et essoufflement depuis 3 jours',
  vitals: {
    bp: '135/85',
    hr: '78',
    temp: '37.2',
    weight: '68',
    height: '165',
    spo2: '97',
    rr: '16',
    glucose: '5.2'
  },
  anamnese:
  "Patient se plaint de douleurs thoraciques irradiant vers l'épaule gauche, associées à un essoufflement à l'effort. Pas de fièvre. Antécédents d'HTA traitée.",
  examen:
  'Auscultation cardiaque: rythme régulier, pas de souffle. Auscultation pulmonaire: murmure vésiculaire présent bilatéralement. Abdomen souple.',
  diagnostic: 'Angor stable - à confirmer par ECG et bilan biologique',
  prescriptions: [
  {
    name: 'Aspirine 100mg',
    dosage: '1 cp/j',
    duration: '30 jours',
    instructions: 'Le matin au petit déjeuner'
  },
  {
    name: 'Amlodipine 5mg',
    dosage: '1 cp/j',
    duration: '30 jours',
    instructions: 'Le soir'
  }],

  examens: [
  {
    name: 'ECG 12 dérivations',
    status: 'ordered',
    urgency: 'urgent'
  },
  {
    name: 'Bilan lipidique',
    status: 'ordered',
    urgency: 'normal'
  },
  {
    name: 'Troponine I',
    status: 'ordered',
    urgency: 'urgent'
  }],

  nextAppointment: '22 Jan 2025 à 10:00',
  notes:
  "Patient à revoir dans 7 jours avec résultats. Conseils hygiéno-diététiques donnés. Arrêt de travail non nécessaire pour l'instant.",
  carePathways: [
  {
    id: 'cp1',
    name: 'Protocole HTA',
    status: 'active',
    step: 'Étape 2/4',
    nextAction: 'Contrôle TA dans 1 mois'
  },
  {
    id: 'cp2',
    name: 'Suivi Cardiologique',
    status: 'active',
    step: 'Étape 1/3',
    nextAction: 'ECG de contrôle'
  }]

};
const availableProtocols = [
{
  id: 'p1',
  name: 'Suivi HTA',
  category: 'Cardiologie',
  description: "Protocole de suivi et contrôle de l'hypertension artérielle",
  duration: '3 mois',
  steps: 4,
  stepDetails: [
  {
    id: 's1',
    label: 'Consultation initiale',
    description: 'Évaluation tensionnelle de base et anamnèse'
  },
  {
    id: 's2',
    label: 'Bilan biologique',
    description: 'NFS, ionogramme, créatinine, bilan lipidique'
  },
  {
    id: 's3',
    label: 'Ajustement thérapeutique',
    description: 'Adaptation du traitement antihypertenseur'
  },
  {
    id: 's4',
    label: 'Contrôle à 3 mois',
    description: "Vérification de l'efficacité du traitement"
  }]

},
{
  id: 'p2',
  name: 'Diabète Type 2',
  category: 'Endocrinologie',
  description: 'Gestion et suivi du diabète de type 2 avec contrôle glycémique',
  duration: '6 mois',
  steps: 6,
  stepDetails: [
  {
    id: 's1',
    label: 'Consultation initiale',
    description: 'Évaluation glycémique et éducation thérapeutique'
  },
  {
    id: 's2',
    label: 'Bilan biologique',
    description: 'HbA1c, glycémie à jeun, bilan rénal et lipidique'
  },
  {
    id: 's3',
    label: 'Consultation diététique',
    description: 'Plan alimentaire personnalisé'
  }]

},
{
  id: 'p3',
  name: 'Post-opératoire',
  category: 'Chirurgie',
  description: 'Suivi post-opératoire standard avec contrôles réguliers',
  duration: '6 semaines',
  steps: 5,
  stepDetails: [
  {
    id: 's1',
    label: 'Sortie hospitalière',
    description: 'Remise des consignes et ordonnances'
  },
  {
    id: 's2',
    label: 'Contrôle J8',
    description: 'Vérification de la cicatrisation'
  },
  {
    id: 's3',
    label: 'Ablation des fils',
    description: 'Retrait des sutures si nécessaire'
  }]

},
{
  id: 'p4',
  name: 'Bilan Annuel',
  category: 'Médecine générale',
  description: 'Bilan de santé annuel complet avec examens de routine',
  duration: '1 mois',
  steps: 4,
  stepDetails: [
  {
    id: 's1',
    label: 'Consultation générale',
    description: 'Examen clinique complet'
  },
  {
    id: 's2',
    label: 'Bilan biologique',
    description: 'NFS, bilan métabolique, marqueurs'
  },
  {
    id: 's3',
    label: 'Examens complémentaires',
    description: 'ECG, radiographie selon âge'
  }]

}];
const statusColors: Record<string, string> = {
  completed: 'bg-green-100 text-green-700',
  scheduled: 'bg-blue-100 text-blue-700',
  cancelled: 'bg-red-100 text-red-700',
  pending: 'bg-yellow-100 text-yellow-700'
};
const statusLabels: Record<string, string> = {
  completed: 'Terminé',
  scheduled: 'Planifié',
  cancelled: 'Annulé',
  pending: 'En attente'
};
type AppointmentStatus = keyof typeof statusLabels;
type SectionKey =
'vitals' |
'anamnese' |
'examen' |
'diagnostic' |
'prescriptions' |
'examens' |
'notes' |
'carePathways';
export function AppointmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState(() =>
    JSON.parse(JSON.stringify(appointment)) as typeof appointment
  );
  const [isProtocolModalOpen, setIsProtocolModalOpen] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<SectionKey, boolean>>({
    vitals: false,
    anamnese: false,
    examen: false,
    diagnostic: false,
    prescriptions: false,
    examens: false,
    notes: false,
    carePathways: false
  });
  const toggle = (key: SectionKey) =>
  setCollapsed((prev) => ({
    ...prev,
    [key]: !prev[key]
  }));

  const updateTopField = (field: keyof typeof details, value: string) => {
    setDetails((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const updateVitalsField = (
    field: keyof typeof details.vitals,
    value: string
  ) => {
    setDetails((prev) => ({
      ...prev,
      vitals: {
        ...prev.vitals,
        [field]: value
      }
    }));
  };

  const updateArrayItem = <T,>(
    arrayName: 'prescriptions' | 'examens',
    index: number,
    patch: Partial<T>
  ) => {
    setDetails((prev) => ({
      ...prev,
      [arrayName]: (prev[arrayName] as Array<T>).map((item, i) =>
        i === index ? { ...item, ...patch } : item
      )
    }));
  };

  const removeArrayItem = (
    arrayName: 'prescriptions' | 'examens',
    index: number
  ) => {
    setDetails((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
  };

  const addPrescription = () => {
    setDetails((prev) => ({
      ...prev,
      prescriptions: [
        ...prev.prescriptions,
        {
          name: 'Nouveau médicament',
          dosage: '',
          duration: '',
          instructions: ''
        }
      ]
    }));
  };

  const addExam = () => {
    setDetails((prev) => ({
      ...prev,
      examens: [
        ...prev.examens,
        {
          name: 'Nouvel examen',
          status: 'ordered',
          urgency: 'normal'
        }
      ]
    }));
  };

  const attachProtocol = (protocol: (typeof availableProtocols)[number]) => {
    setDetails((prev) => ({
      ...prev,
      carePathways: [
        ...prev.carePathways,
        {
          id: `cp-${protocol.id}-${Date.now()}`,
          name: protocol.name,
          status: 'active',
          step: `Étape 1/${protocol.steps}`,
          nextAction: protocol.stepDetails[0]?.description || 'Suivi initial'
        }
      ]
    }));
    setIsProtocolModalOpen(false);
  };

  const toDateTimeLocalValue = (value: string) => {
    if (!value) return '';
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(value)) {
      return value.slice(0, 16);
    }
    const parsed = new Date(value.replace(' a ', ' ').replace(' à ', ' '));
    if (Number.isNaN(parsed.getTime())) return '';
    const year = parsed.getFullYear();
    const month = String(parsed.getMonth() + 1).padStart(2, '0');
    const day = String(parsed.getDate()).padStart(2, '0');
    const hours = String(parsed.getHours()).padStart(2, '0');
    const minutes = String(parsed.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const formatNextAppointmentDisplay = (value: string) => {
    if (!value) return '';
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(value)) return value;
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return value;
    const day = String(parsed.getDate()).padStart(2, '0');
    const month = String(parsed.getMonth() + 1).padStart(2, '0');
    const year = parsed.getFullYear();
    const hours = String(parsed.getHours()).padStart(2, '0');
    const minutes = String(parsed.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} à ${hours}:${minutes}`;
  };
  const SectionHeader = ({
    sectionKey,
    icon: Icon,
    title,
    color = 'text-gray-500'





  }: {sectionKey: SectionKey;icon: React.ElementType;title: string;color?: string;}) =>
  <button
    onClick={() => toggle(sectionKey)}
    className="w-full flex items-center justify-between mb-2 group">

      <div className="flex items-center gap-1.5">
        <Icon className={`w-3.5 h-3.5 ${color}`} />
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {title}
        </span>
      </div>
      {collapsed[sectionKey] ?
    <ChevronDownIcon className="w-3.5 h-3.5 text-gray-400" /> :

    <ChevronUpIcon className="w-3.5 h-3.5 text-gray-400" />
    }
    </button>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="p-1 hover:bg-gray-100 rounded text-gray-500">

            <ArrowLeftIcon className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-sm font-semibold text-gray-900">
              Détails du Rendez-vous #{id}
            </h1>
            <p className="text-xs text-gray-500">
              {details.date} · {details.time} · {details.doctor}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-medium text-gray-500">Statut</span>
            <select
              value={details.status as AppointmentStatus}
              onChange={(e) =>
                updateTopField('status', e.target.value as AppointmentStatus)
              }
              className={`text-xs px-2 py-1 rounded-full font-medium border-none focus:outline-none focus:ring-2 focus:ring-red-500 ${statusColors[details.status as AppointmentStatus]}`}>
              {(Object.entries(statusLabels) as Array<[AppointmentStatus, string]>).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <button className="p-1 hover:bg-gray-100 rounded text-gray-500">
            <PrinterIcon className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded text-gray-500">
            <ShareIcon className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className={`flex items-center gap-1 text-xs text-white px-2.5 py-1 rounded ${isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
            <EditIcon className="w-3 h-3" /> {isEditing ? 'Enregistrer' : 'Modifier'}
          </button>
        </div>
      </div>

      <div className="p-3 w-full">
        <div className="grid grid-cols-12 gap-3">
          {/* LEFT COLUMN */}
          <div className="col-span-12 lg:col-span-3 space-y-3">
            {/* Patient Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {details.patient.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {details.patient.age} ans · {details.patient.dob}
                  </p>
                </div>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-gray-600">
                  <PhoneIcon className="w-3 h-3 text-gray-400" />
                  {details.patient.phone}
                </div>
                <div className="flex items-center gap-1.5 text-gray-600">
                  <span className="text-gray-400">@</span>
                  {details.patient.email}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-500">Groupe:</span>
                  <span className="font-medium text-red-600">
                    {details.patient.bloodType}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-500">Assurance:</span>
                  <span className="font-medium">{details.patient.insurance}</span>
                </div>
                <div className="text-gray-500">
                  N°: {details.patient.insuranceNum}
                </div>
              </div>
              {details.patient.allergies.length > 0 &&
              <div className="mt-2 pt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Allergies</p>
                  <div className="flex flex-wrap gap-1">
                    {details.patient.allergies.map((a, i) =>
                  <span
                    key={`${a}-${i}`}
                    className="text-xs bg-red-50 text-red-600 px-1.5 py-0.5 rounded border border-red-100">

                        {a}
                      </span>
                  )}
                  </div>
                </div>
              }
            </div>

            {/* RDV Info */}
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Rendez-vous
              </p>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 text-gray-600">
                  <CalendarIcon className="w-3 h-3 text-gray-400" />
                  {details.date}
                </div>
                <div className="flex items-center gap-1.5 text-gray-600">
                  <ClockIcon className="w-3 h-3 text-gray-400" />
                  {`${details.time} · ${details.duration}`}
                </div>
                <div className="flex items-center gap-1.5 text-gray-600">
                  <StethoscopeIcon className="w-3 h-3 text-gray-400" />
                  {details.doctor}
                </div>
                <div className="text-gray-500">{details.specialty}</div>
                <div className="text-gray-500">{details.room}</div>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Motif</p>
                {isEditing ?
              <textarea
                value={details.motif}
                onChange={(e) => updateTopField('motif', e.target.value)}
                rows={3}
                className="text-xs text-gray-700 w-full border border-gray-200 rounded px-2 py-1" /> :
              <p className="text-xs text-gray-700">{details.motif}</p>
              }
              </div>
            </div>

            {/* Care Pathways */}
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <SectionHeader
                sectionKey="carePathways"
                icon={LinkIcon}
                title="Protocoles de soins"
                color="text-purple-500" />

              {!collapsed.carePathways &&
              <div className="space-y-2">
                  {details.carePathways.map((cp) =>
                <div
                  key={cp.id}
                  className="bg-purple-50 border border-purple-100 rounded p-2">

                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-medium text-purple-800">{cp.name}</p>
                        <span className="text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded">{cp.step}</span>
                      </div>
                      <p className="text-xs text-purple-600">{cp.nextAction}</p>
                    </div>
                )}
                  <button
                    type="button"
                    onClick={() => setIsProtocolModalOpen(true)}
                    className="w-full text-xs text-purple-600 border border-purple-200 rounded py-1 hover:bg-purple-50 flex items-center justify-center gap-1">
                    <PlusIcon className="w-3 h-3" /> Associer un protocole
                  </button>
                </div>
              }
            </div>
          </div>

          {/* MIDDLE COLUMN */}
          <div className="col-span-12 lg:col-span-5 space-y-3">
            {/* Vitals */}
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <SectionHeader
                sectionKey="vitals"
                icon={ActivityIcon}
                title="Constantes vitales"
                color="text-red-500" />

              {!collapsed.vitals &&
              <div className="grid grid-cols-4 gap-2">
                  {[
                {
                  label: 'TA',
                  value: details.vitals.bp,
                  field: 'bp',
                  unit: 'mmHg',
                  icon: HeartIcon,
                  color: 'text-red-500'
                },
                {
                  label: 'FC',
                  value: details.vitals.hr,
                  field: 'hr',
                  unit: 'bpm',
                  icon: ActivityIcon,
                  color: 'text-pink-500'
                },
                {
                  label: 'Temp',
                  value: details.vitals.temp,
                  field: 'temp',
                  unit: '°C',
                  icon: ThermometerIcon,
                  color: 'text-orange-500'
                },
                {
                  label: 'SpO2',
                  value: details.vitals.spo2,
                  field: 'spo2',
                  unit: '%',
                  icon: ActivityIcon,
                  color: 'text-blue-500'
                },
                {
                  label: 'Poids',
                  value: details.vitals.weight,
                  field: 'weight',
                  unit: 'kg',
                  icon: ScaleIcon,
                  color: 'text-green-500'
                },
                {
                  label: 'Taille',
                  value: details.vitals.height,
                  field: 'height',
                  unit: 'cm',
                  icon: RulerIcon,
                  color: 'text-teal-500'
                },
                {
                  label: 'FR',
                  value: details.vitals.rr,
                  field: 'rr',
                  unit: '/min',
                  icon: ActivityIcon,
                  color: 'text-indigo-500'
                },
                {
                  label: 'Glycémie',
                  value: details.vitals.glucose,
                  field: 'glucose',
                  unit: 'mmol/L',
                  icon: BeakerIcon,
                  color: 'text-yellow-600'
                }].
                map((v) =>
                <div
                  key={v.label}
                  className="bg-gray-50 rounded p-1.5 text-center">

                      <p className="text-xs text-gray-500 mb-0.5">{v.label}</p>
                      {isEditing ?
                  <input
                    value={v.value}
                    onChange={(e) =>
                      updateVitalsField(
                        v.field as keyof typeof details.vitals,
                        e.target.value
                      )
                    }
                    className={`text-sm font-bold ${v.color} border border-gray-200 rounded px-1 py-0.5 w-full text-center`} /> :
                  <p className={`text-sm font-bold ${v.color}`}>{v.value}</p>
                  }
                      <p className="text-xs text-gray-400">{v.unit}</p>
                    </div>
                )}
                </div>
              }
            </div>

            {/* Anamnèse */}
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <SectionHeader
                sectionKey="anamnese"
                icon={ClipboardListIcon}
                title="Anamnèse"
                color="text-blue-500" />

              {!collapsed.anamnese &&
              (isEditing ?
              <textarea
                value={details.anamnese}
                onChange={(e) => updateTopField('anamnese', e.target.value)}
                rows={4}
                className="text-xs text-gray-700 leading-relaxed w-full border border-gray-200 rounded px-2 py-1" /> :
              <p className="text-xs text-gray-700 leading-relaxed">{details.anamnese}</p>)
              }
            </div>

            {/* Examen clinique */}
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <SectionHeader
                sectionKey="examen"
                icon={StethoscopeIcon}
                title="Examen clinique"
                color="text-green-500" />

              {!collapsed.examen &&
              (isEditing ?
              <textarea
                value={details.examen}
                onChange={(e) => updateTopField('examen', e.target.value)}
                rows={4}
                className="text-xs text-gray-700 leading-relaxed w-full border border-gray-200 rounded px-2 py-1" /> :
              <p className="text-xs text-gray-700 leading-relaxed">{details.examen}</p>)
              }
            </div>

            {/* Diagnostic */}
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <SectionHeader
                sectionKey="diagnostic"
                icon={AlertCircleIcon}
                title="Diagnostic"
                color="text-orange-500" />

              {!collapsed.diagnostic &&
              <div className="bg-orange-50 border border-orange-100 rounded p-2">
                  {isEditing ?
                <textarea
                  value={details.diagnostic}
                  onChange={(e) => updateTopField('diagnostic', e.target.value)}
                  rows={3}
                  className="text-xs text-orange-800 font-medium w-full border border-orange-200 rounded px-2 py-1 bg-white" /> :
                <p className="text-xs text-orange-800 font-medium">{details.diagnostic}</p>
                }
                </div>
              }
            </div>

            {/* Notes */}
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <SectionHeader
                sectionKey="notes"
                icon={FileTextIcon}
                title="Notes & Suivi"
                color="text-gray-500" />

              {!collapsed.notes &&
              <>
                  <p className="text-xs text-gray-700 leading-relaxed mb-2">
                    {isEditing ?
                  <textarea
                    value={details.notes}
                    onChange={(e) => updateTopField('notes', e.target.value)}
                    rows={4}
                    className="text-xs text-gray-700 leading-relaxed w-full border border-gray-200 rounded px-2 py-1" /> :
                  details.notes
                  }
                  </p>
                  {(details.nextAppointment || isEditing) &&
                <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-100 rounded p-2">
                      <CalendarIcon className="w-3 h-3 text-blue-500" />
                      {isEditing ?
                    <input
                      type="datetime-local"
                      value={toDateTimeLocalValue(details.nextAppointment)}
                      onChange={(e) =>
                        updateTopField('nextAppointment', e.target.value)
                      }
                      className="text-xs text-blue-700 border border-blue-200 rounded px-2 py-0.5 w-full" /> :
                    <span className="text-xs text-blue-700">
                          Prochain RDV: <strong>{formatNextAppointmentDisplay(details.nextAppointment)}</strong>
                        </span>
                    }
                    </div>
                }
                </>
              }
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-span-12 lg:col-span-4 space-y-3">
            {/* Prescriptions */}
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <div className="flex items-center justify-between mb-2">
                <SectionHeader
                  sectionKey="prescriptions"
                  icon={PillIcon}
                  title="Prescriptions"
                  color="text-purple-500" />

                <button className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 ml-2">
                  <PlusIcon className="w-3 h-3" /> Ajouter
                </button>
              </div>
              {!collapsed.prescriptions &&
              <div className="space-y-2">
                  {details.prescriptions.map((p, i) =>
                <div
                  key={i}
                  className="bg-purple-50 border border-purple-100 rounded p-2">

                      <div className="flex items-center justify-between mb-1">
                        {isEditing ?
                    <input
                      value={p.name}
                      onChange={(e) =>
                        updateArrayItem<typeof p>('prescriptions', i, {
                          name: e.target.value
                        })
                      }
                      className="text-xs font-semibold text-purple-900 border border-purple-200 rounded px-1.5 py-0.5 flex-1 mr-1" /> :
                    <p className="text-xs font-semibold text-purple-900">{p.name}</p>
                    }
                        {isEditing ?
                    <div className="flex items-center gap-1">
                            <input
                        value={p.duration}
                        onChange={(e) =>
                          updateArrayItem<typeof p>('prescriptions', i, {
                            duration: e.target.value
                          })
                        }
                        className="text-xs text-purple-600 border border-purple-200 rounded px-1.5 py-0.5 w-20" />
                            <button
                        type="button"
                        onClick={() => removeArrayItem('prescriptions', i)}
                        className="text-xs text-red-600">
                              Suppr.
                            </button>
                          </div> :
                    <span className="text-xs text-purple-600">{p.duration}</span>
                    }
                      </div>
                      {isEditing ?
                  <input
                    value={p.dosage}
                    onChange={(e) =>
                      updateArrayItem<typeof p>('prescriptions', i, {
                        dosage: e.target.value
                      })
                    }
                    className="text-xs text-purple-700 border border-purple-200 rounded px-1.5 py-0.5 w-full mb-1" /> :
                  <p className="text-xs text-purple-700">{p.dosage}</p>
                  }
                      {isEditing ?
                  <input
                    value={p.instructions}
                    onChange={(e) =>
                      updateArrayItem<typeof p>('prescriptions', i, {
                        instructions: e.target.value
                      })
                    }
                    className="text-xs text-gray-500 italic border border-gray-200 rounded px-1.5 py-0.5 w-full" /> :
                  <p className="text-xs text-gray-500 italic">{p.instructions}</p>
                  }
                    </div>
                )}
                  {isEditing &&
                <button
                  type="button"
                  onClick={addPrescription}
                  className="w-full text-xs text-blue-600 border border-blue-200 rounded py-1 hover:bg-blue-50 flex items-center justify-center gap-1">
                      <PlusIcon className="w-3 h-3" /> Ajouter prescription
                    </button>
                }
                  <button className="w-full text-xs text-gray-500 border border-dashed border-gray-300 rounded py-1 hover:bg-gray-50 flex items-center justify-center gap-1">
                    <PrinterIcon className="w-3 h-3" /> Imprimer l'ordonnance
                  </button>
                </div>
              }
            </div>

            {/* Examens complémentaires */}
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <div className="flex items-center justify-between mb-2">
                <SectionHeader
                  sectionKey="examens"
                  icon={BeakerIcon}
                  title="Examens complémentaires"
                  color="text-teal-500" />

                <button className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 ml-2">
                  <PlusIcon className="w-3 h-3" /> Ajouter
                </button>
              </div>
              {!collapsed.examens &&
              <div className="space-y-1.5">
                  {details.examens.map((e, i) =>
                <div
                  key={i}
                  className="flex items-center justify-between bg-gray-50 rounded p-2">

                      <div className="flex items-center gap-1.5">
                        <BeakerIcon className="w-3 h-3 text-teal-500" />
                        {isEditing ?
                    <input
                      value={e.name}
                      onChange={(ev) =>
                        updateArrayItem<typeof e>('examens', i, {
                          name: ev.target.value
                        })
                      }
                      className="text-xs text-gray-700 border border-gray-200 rounded px-1.5 py-0.5" /> :
                    <span className="text-xs text-gray-700">{e.name}</span>
                    }
                      </div>
                      <div className="flex items-center gap-1">
                        {isEditing ?
                    <>
                            <select
                        value={e.urgency}
                        onChange={(ev) =>
                          updateArrayItem<typeof e>('examens', i, {
                            urgency: ev.target.value
                          })
                        }
                        className="text-xs border border-gray-200 rounded px-1 py-0.5">
                              <option value="normal">Normal</option>
                              <option value="urgent">Urgent</option>
                            </select>
                            <select
                        value={e.status}
                        onChange={(ev) =>
                          updateArrayItem<typeof e>('examens', i, {
                            status: ev.target.value
                          })
                        }
                        className="text-xs border border-gray-200 rounded px-1 py-0.5">
                              <option value="ordered">Demandé</option>
                              <option value="done">Terminé</option>
                            </select>
                            <button
                        type="button"
                        onClick={() => removeArrayItem('examens', i)}
                        className="text-xs text-red-600">
                              Suppr.
                            </button>
                          </> :
                    <>
                            {e.urgency === 'urgent' &&
                    <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
                                Urgent
                              </span>
                    }
                            <span className="text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded">
                              {e.status === 'done' ? 'Terminé' : 'Demandé'}
                            </span>
                          </>
                    }
                      </div>
                    </div>
                )}
                  {isEditing &&
                <button
                  type="button"
                  onClick={addExam}
                  className="w-full text-xs text-blue-600 border border-blue-200 rounded py-1 hover:bg-blue-50 flex items-center justify-center gap-1">
                      <PlusIcon className="w-3 h-3" /> Ajouter examen
                    </button>
                }
                </div>
              }
            </div>

            {/* Actions rapides */}
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Actions rapides
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                <button className="flex items-center gap-1.5 text-xs bg-blue-50 text-blue-700 border border-blue-100 rounded px-2 py-1.5 hover:bg-blue-100">
                  <CalendarIcon className="w-3 h-3" /> Nouveau RDV
                </button>
                <button className="flex items-center gap-1.5 text-xs bg-green-50 text-green-700 border border-green-100 rounded px-2 py-1.5 hover:bg-green-100">
                  <FileTextIcon className="w-3 h-3" /> Ordonnance
                </button>
                <button className="flex items-center gap-1.5 text-xs bg-purple-50 text-purple-700 border border-purple-100 rounded px-2 py-1.5 hover:bg-purple-100">
                  <BeakerIcon className="w-3 h-3" /> Bilan bio
                </button>
                <button className="flex items-center gap-1.5 text-xs bg-orange-50 text-orange-700 border border-orange-100 rounded px-2 py-1.5 hover:bg-orange-100">
                  <CameraIcon className="w-3 h-3" /> Imagerie
                </button>
                <button className="flex items-center gap-1.5 text-xs bg-teal-50 text-teal-700 border border-teal-100 rounded px-2 py-1.5 hover:bg-teal-100">
                  <EyeIcon className="w-3 h-3" /> Dossier patient
                </button>
                <button className="flex items-center gap-1.5 text-xs bg-red-50 text-red-700 border border-red-100 rounded px-2 py-1.5 hover:bg-red-100">
                  <XCircleIcon className="w-3 h-3" /> Annuler RDV
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isProtocolModalOpen &&
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-gray-200 shadow-xl w-full max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
            <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-lg">
              <div>
                <h2 className="text-sm font-semibold text-red-800">Protocoles disponibles</h2>
                <p className="text-xs text-red-600 mt-0.5">Sélectionnez un protocole depuis la base /care-pathways</p>
              </div>
              <button
                type="button"
                onClick={() => setIsProtocolModalOpen(false)}
                className="rounded-md p-1 text-red-600 hover:bg-red-100"
                aria-label="Fermer">
                <XCircleIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableProtocols.map((protocol) => (
                <div key={protocol.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-gray-900">{protocol.name}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-red-100 text-red-700">{protocol.category}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{protocol.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                    <div className="bg-white border border-gray-200 rounded p-2">
                      <span className="text-gray-500">Durée</span>
                      <p className="font-medium text-gray-800">{protocol.duration}</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded p-2">
                      <span className="text-gray-500">Étapes</span>
                      <p className="font-medium text-gray-800">{protocol.steps}</p>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded p-2 mb-2">
                    <p className="text-xs font-semibold text-gray-700 mb-1">Détails des étapes</p>
                    <div className="space-y-1 max-h-24 overflow-auto">
                      {protocol.stepDetails.map((step) => (
                        <div key={step.id} className="text-xs">
                          <p className="font-medium text-gray-700">{step.label}</p>
                          <p className="text-gray-500">{step.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => attachProtocol(protocol)}
                    className="w-full text-xs bg-red-600 text-white rounded py-1.5 hover:bg-red-700">
                    Choisir ce protocole
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    </div>);

}
export default AppointmentDetails;