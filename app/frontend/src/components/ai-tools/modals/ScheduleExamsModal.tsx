import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  XIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  UserIcon,
  MapPinIcon,
  FileTextIcon,
  BellIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  InfoIcon } from
'lucide-react';
interface ScheduleExamsModalProps {
  patientName: string;
  selectedExams: any[];
  onClose: () => void;
  onScheduleComplete: () => void;
}
const ScheduleExamsModal: React.FC<ScheduleExamsModalProps> = ({
  patientName,
  selectedExams,
  onClose,
  onScheduleComplete
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [examSchedules, setExamSchedules] = useState<
    Record<
      number,
      {
        date: Date;
        time: string;
        location: string;
        notes: string;
      }>>(

    {});
  const [currentExamIndex, setCurrentExamIndex] = useState(0);
  // Generate calendar days for current month
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(currentYear, currentMonth, day));
    }
    return days;
  };
  const calendarDays = generateCalendarDays();
  const monthNames = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre'];

  const timeSlots = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30'];

  const locations = [
  'Cabinet principal - Salle 1',
  'Cabinet principal - Salle 2',
  'Centre de radiologie partenaire',
  'Laboratoire externe'];

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };
  const handleTimeSelect = (time: string) => {
    if (selectedDate) {
      const currentExam = selectedExams[currentExamIndex];
      setExamSchedules({
        ...examSchedules,
        [currentExam.id]: {
          date: selectedDate,
          time,
          location: locations[0],
          notes: ''
        }
      });
    }
  };
  const handleLocationChange = (location: string) => {
    const currentExam = selectedExams[currentExamIndex];
    if (examSchedules[currentExam.id]) {
      setExamSchedules({
        ...examSchedules,
        [currentExam.id]: {
          ...examSchedules[currentExam.id],
          location
        }
      });
    }
  };
  const handleNotesChange = (notes: string) => {
    const currentExam = selectedExams[currentExamIndex];
    if (examSchedules[currentExam.id]) {
      setExamSchedules({
        ...examSchedules,
        [currentExam.id]: {
          ...examSchedules[currentExam.id],
          notes
        }
      });
    }
  };
  const handleNextExam = () => {
    if (currentExamIndex < selectedExams.length - 1) {
      setCurrentExamIndex(currentExamIndex + 1);
      setSelectedDate(null);
    } else {
      setCurrentStep(2);
    }
  };
  const handlePreviousExam = () => {
    if (currentExamIndex > 0) {
      setCurrentExamIndex(currentExamIndex - 1);
      setSelectedDate(null);
    }
  };
  const handleConfirmSchedule = () => {
    // Here you would typically send the schedule to your backend
    onScheduleComplete();
  };
  const isDateDisabled = (date: Date | null) => {
    if (!date) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };
  const currentExam = selectedExams[currentExamIndex];
  const currentSchedule = currentExam ? examSchedules[currentExam.id] : null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[60] p-4">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
          y: 20
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0
        }}
        exit={{
          opacity: 0,
          scale: 0.9,
          y: 20
        }}
        className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 text-white">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
                className="h-14 w-14 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mr-4">

                <CalendarIcon className="h-8 w-8 text-white" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold">Planifier les examens</h3>
                <p className="text-purple-100 text-sm mt-1">
                  Pour {patientName} - {selectedExams.length} examen(s) à
                  planifier
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors">

              <XIcon className="h-5 w-5 text-white" />
            </button>
          </div>
          {/* Progress */}
          <div className="flex items-center space-x-2">
            {selectedExams.map((exam, index) =>
            <div key={exam.id} className="flex items-center flex-1">
                <div
                className={`h-2 rounded-full flex-1 ${index <= currentExamIndex ? 'bg-white' : 'bg-white bg-opacity-30'}`} />

                {index < selectedExams.length - 1 &&
              <ChevronRightIcon className="h-4 w-4 text-white mx-1" />
              }
              </div>
            )}
          </div>
          <p className="text-xs text-purple-100 mt-2">
            Examen {currentExamIndex + 1} sur {selectedExams.length}
          </p>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {currentStep === 1 && currentExam &&
          <div className="p-6">
              {/* Current Exam Info */}
              <div className="mb-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border-2 border-indigo-200">
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {currentExam.name}
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  {currentExam.description}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    Durée: {currentExam.duration}
                  </span>
                  <span className="flex items-center">
                    <FileTextIcon className="h-4 w-4 mr-1" />
                    Coût: {currentExam.estimatedCost}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Calendar */}
                <div>
                  <h5 className="text-sm font-bold text-gray-900 mb-3 flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2 text-indigo-600" />
                    Sélectionner une date
                  </h5>
                  <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                    {/* Month Navigation */}
                    <div className="flex items-center justify-between mb-4">
                      <button
                      onClick={handlePreviousMonth}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors">

                        <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
                      </button>
                      <h6 className="text-base font-bold text-gray-900">
                        {monthNames[currentMonth]} {currentYear}
                      </h6>
                      <button
                      onClick={handleNextMonth}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors">

                        <ChevronRightIcon className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1">
                      {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(
                      (day) =>
                      <div
                        key={day}
                        className="text-center text-xs font-bold text-gray-600 py-2">

                            {day}
                          </div>

                    )}
                      {calendarDays.map((date, index) => {
                      const isDisabled = isDateDisabled(date);
                      const isSelected =
                      date &&
                      selectedDate &&
                      date.toDateString() === selectedDate.toDateString();
                      const isToday =
                      date && date.toDateString() === today.toDateString();
                      return (
                        <button
                          key={index}
                          onClick={() =>
                          date && !isDisabled && handleDateSelect(date)
                          }
                          disabled={!date || isDisabled}
                          className={`aspect-square rounded-lg text-sm font-medium transition-all ${!date ? 'invisible' : isSelected ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg scale-110' : isToday ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-300' : isDisabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100 text-gray-700'}`}>

                            {date?.getDate()}
                          </button>);

                    })}
                    </div>
                  </div>
                </div>
                {/* Time Slots & Details */}
                <div className="space-y-4">
                  {/* Time Slots */}
                  <div>
                    <h5 className="text-sm font-bold text-gray-900 mb-3 flex items-center">
                      <ClockIcon className="h-4 w-4 mr-2 text-indigo-600" />
                      Choisir un horaire
                    </h5>
                    <div className="bg-white rounded-xl border-2 border-gray-200 p-4 max-h-64 overflow-y-auto">
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((time) => {
                        const isSelected = currentSchedule?.time === time;
                        return (
                          <motion.button
                            key={time}
                            whileHover={{
                              scale: 1.05
                            }}
                            whileTap={{
                              scale: 0.95
                            }}
                            onClick={() => handleTimeSelect(time)}
                            disabled={!selectedDate}
                            className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${isSelected ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' : selectedDate ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-gray-50 text-gray-400 cursor-not-allowed'}`}>

                              {time}
                            </motion.button>);

                      })}
                      </div>
                    </div>
                  </div>
                  {/* Location */}
                  <div>
                    <h5 className="text-sm font-bold text-gray-900 mb-3 flex items-center">
                      <MapPinIcon className="h-4 w-4 mr-2 text-indigo-600" />
                      Lieu
                    </h5>
                    <select
                    value={currentSchedule?.location || ''}
                    onChange={(e) => handleLocationChange(e.target.value)}
                    disabled={!currentSchedule}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-400">

                      {locations.map((location) =>
                    <option key={location} value={location}>
                          {location}
                        </option>
                    )}
                    </select>
                  </div>
                  {/* Notes */}
                  <div>
                    <h5 className="text-sm font-bold text-gray-900 mb-3 flex items-center">
                      <FileTextIcon className="h-4 w-4 mr-2 text-indigo-600" />
                      Notes (optionnel)
                    </h5>
                    <textarea
                    value={currentSchedule?.notes || ''}
                    onChange={(e) => handleNotesChange(e.target.value)}
                    disabled={!currentSchedule}
                    placeholder="Ajouter des instructions spéciales..."
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-400 resize-none" />

                  </div>
                </div>
              </div>
            </div>
          }
          {currentStep === 2 &&
          <div className="p-6">
              <div className="mb-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
                <div className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-gray-900 mb-1">
                      Récapitulatif des rendez-vous
                    </p>
                    <p className="text-xs text-gray-700">
                      Vérifiez les détails avant de confirmer la planification
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {selectedExams.map((exam, index) => {
                const schedule = examSchedules[exam.id];
                if (!schedule) return null;
                return (
                  <motion.div
                    key={exam.id}
                    initial={{
                      opacity: 0,
                      y: 20
                    }}
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    transition={{
                      delay: index * 0.1
                    }}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-2 border-gray-200">

                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mr-4">
                            <exam.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h5 className="font-bold text-gray-900">
                              {exam.name}
                            </h5>
                            <p className="text-sm text-gray-600">
                              {exam.description}
                            </p>
                          </div>
                        </div>
                        <CheckCircleIcon className="h-6 w-6 text-green-500" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-200">
                          <p className="text-xs text-gray-600 mb-1">
                            Date et heure
                          </p>
                          <p className="text-sm font-bold text-gray-900">
                            {schedule.date.toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                          </p>
                          <p className="text-sm font-bold text-indigo-600">
                            {schedule.time}
                          </p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                          <p className="text-xs text-gray-600 mb-1">Lieu</p>
                          <p className="text-sm font-bold text-gray-900">
                            {schedule.location}
                          </p>
                        </div>
                      </div>
                      {schedule.notes &&
                    <div className="mt-3 bg-gray-50 rounded-lg p-3 border border-gray-200">
                          <p className="text-xs text-gray-600 mb-1">Notes</p>
                          <p className="text-sm text-gray-700">
                            {schedule.notes}
                          </p>
                        </div>
                    }
                    </motion.div>);

              })}
              </div>
              {/* Notifications */}
              <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-200">
                <div className="flex items-start">
                  <BellIcon className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-gray-900 mb-2">
                      Notifications automatiques
                    </p>
                    <div className="space-y-1 text-xs text-gray-700">
                      <p>✓ Email de confirmation envoyé au patient</p>
                      <p>✓ SMS de rappel 24h avant chaque rendez-vous</p>
                      <p>✓ Ajout automatique au calendrier du cabinet</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
        {/* Footer */}
        <div className="border-t-2 border-gray-200 bg-gray-50 px-6 py-4">
          <div className="flex justify-between items-center">
            {currentStep === 1 ?
            <>
                <motion.button
                whileHover={{
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.95
                }}
                onClick={handlePreviousExam}
                disabled={currentExamIndex === 0}
                className="inline-flex items-center px-6 py-3 border-2 border-gray-300 rounded-xl text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all">

                  <ChevronLeftIcon className="h-4 w-4 mr-2" />
                  Précédent
                </motion.button>
                <motion.button
                whileHover={{
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.95
                }}
                onClick={handleNextExam}
                disabled={!currentSchedule}
                className="inline-flex items-center px-6 py-3 border-2 border-transparent rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg disabled:from-gray-400 disabled:to-gray-500 transition-all">

                  {currentExamIndex < selectedExams.length - 1 ?
                'Suivant' :
                'Voir le récapitulatif'}
                  <ChevronRightIcon className="h-4 w-4 ml-2" />
                </motion.button>
              </> :

            <>
                <motion.button
                whileHover={{
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.95
                }}
                onClick={() => {
                  setCurrentStep(1);
                  setCurrentExamIndex(selectedExams.length - 1);
                }}
                className="inline-flex items-center px-6 py-3 border-2 border-gray-300 rounded-xl text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 transition-all">

                  <ChevronLeftIcon className="h-4 w-4 mr-2" />
                  Retour
                </motion.button>
                <motion.button
                whileHover={{
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.95
                }}
                onClick={handleConfirmSchedule}
                className="inline-flex items-center px-6 py-3 border-2 border-transparent rounded-xl text-sm font-bold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg transition-all">

                  <CheckCircleIcon className="h-4 w-4 mr-2" />
                  Confirmer la planification
                </motion.button>
              </>
            }
          </div>
        </div>
      </motion.div>
    </div>);

};
export default ScheduleExamsModal;