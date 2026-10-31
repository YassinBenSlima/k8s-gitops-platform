import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeftIcon,
  SaveIcon,
  MessageSquareIcon,
  AlertTriangleIcon,
  InfoIcon,
  CheckCircle2Icon,
  CalendarIcon,
  TagIcon,
  FileTextIcon,
  MicIcon,
  StopCircleIcon,
  Volume2Icon,
  BrainCircuitIcon,
  SparklesIcon } from
'lucide-react';
import SuccessAnimation from '../components/animations/SuccessAnimation';
const NouvelleNoteTraitement = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showSuccess, setShowSuccess] = useState(false);
  // Voice recording states
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  const [recognition, setRecognition] = useState(null);
  const [activeField, setActiveField] = useState(null); // 'title' or 'content'
  const [formData, setFormData] = useState({
    noteDate: new Date().toISOString().split('T')[0],
    noteType: 'general',
    priority: 'normal',
    title: '',
    content: '',
    tags: [],
    isPrivate: false
  });
  // Mock patient data
  const patient = {
    id: id,
    name: 'Sophie Martin',
    treatment: 'Appareil fixe'
  };
  const noteTypes = [
  {
    value: 'general',
    label: 'Générale',
    color: 'blue',
    icon: MessageSquareIcon
  },
  {
    value: 'important',
    label: 'Important',
    color: 'amber',
    icon: AlertTriangleIcon
  },
  {
    value: 'reminder',
    label: 'Rappel',
    color: 'purple',
    icon: InfoIcon
  },
  {
    value: 'clinical',
    label: 'Clinique',
    color: 'green',
    icon: FileTextIcon
  }];

  const priorities = [
  {
    value: 'low',
    label: 'Faible',
    color: 'text-green-600'
  },
  {
    value: 'normal',
    label: 'Normale',
    color: 'text-blue-600'
  },
  {
    value: 'high',
    label: 'Haute',
    color: 'text-amber-600'
  },
  {
    value: 'urgent',
    label: 'Urgente',
    color: 'text-red-600'
  }];

  const commonTags = [
  'Hygiène',
  'Coopération',
  'Douleur',
  'Rendez-vous',
  'Urgence',
  'Suivi',
  'Complication',
  'Amélioration'];

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'fr-FR';
      recognitionInstance.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPiece = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPiece + ' ';
          } else {
            interimTranscript += transcriptPiece;
          }
        }
        setTranscript((prev) => prev + finalTranscript);
      };
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };
      recognitionInstance.onend = () => {
        if (isRecording) {
          recognitionInstance.start();
        }
      };
      setRecognition(recognitionInstance);
    }
  }, []);
  // Recording timer
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);
  const startRecording = (field) => {
    if (recognition) {
      setTranscript('');
      setActiveField(field);
      setIsRecording(true);
      recognition.start();
    } else {
      alert(
        "La reconnaissance vocale n'est pas supportée par votre navigateur. Veuillez utiliser Chrome ou Edge."
      );
    }
  };
  const stopRecording = () => {
    if (recognition) {
      setIsRecording(false);
      recognition.stop();
      if (transcript && activeField) {
        processTranscript(transcript, activeField);
      }
    }
  };
  const processTranscript = (text, field) => {
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      // Directly set the appropriate field with the transcript
      if (field === 'title') {
        setFormData((prev) => ({
          ...prev,
          title: text.trim()
        }));
      } else if (field === 'content') {
        setFormData((prev) => ({
          ...prev,
          content: prev.content ? prev.content + ' ' + text : text
        }));
      }
      setIsProcessing(false);
      setTranscript('');
      setActiveField(null);
    }, 1000);
  };
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  const toggleTag = (tag) => {
    if (formData.tags.includes(tag)) {
      setFormData({
        ...formData,
        tags: formData.tags.filter((t) => t !== tag)
      });
    } else {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag]
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
  };
  const handleSuccessComplete = () => {
    setShowSuccess(false);
    navigate(`/treatments/${id}`);
  };
  const handleBack = () => {
    navigate(`/treatments/${id}`);
  };
  const isFormComplete = formData.title && formData.content;
  const selectedNoteType = noteTypes.find((t) => t.value === formData.noteType);
  const selectedPriority = priorities.find((p) => p.value === formData.priority);
  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-2xl p-6 text-white shadow-xl">

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <motion.button
                whileHover={{
                  scale: 1.1
                }}
                whileTap={{
                  scale: 0.9
                }}
                onClick={handleBack}
                className="mr-4 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all">

                <ArrowLeftIcon className="h-5 w-5 text-white" />
              </motion.button>
              <div className="h-14 w-14 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mr-4">
                <MessageSquareIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Nouvelle Note</h3>
                <p className="text-amber-100 text-sm mt-1">
                  Ajouter une note pour {patient.name}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Note Type and Priority */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.1
              }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date de la note
                  </label>
                  <input
                    type="date"
                    value={formData.noteDate}
                    onChange={(e) => handleChange('noteDate', e.target.value)}
                    className="block w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white" />

                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Type de note
                  </label>
                  <select
                    value={formData.noteType}
                    onChange={(e) => handleChange('noteType', e.target.value)}
                    className="block w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white">

                    {noteTypes.map((type) =>
                    <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priorité
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => handleChange('priority', e.target.value)}
                    className="block w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white">

                    {priorities.map((priority) =>
                    <option key={priority.value} value={priority.value}>
                        {priority.label}
                      </option>
                    )}
                  </select>
                </div>
              </div>
            </motion.div>
            {/* Note Content */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.2
              }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">

              {/* Recording Indicator */}
              <AnimatePresence>
                {isRecording &&
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0
                  }}
                  animate={{
                    opacity: 1,
                    height: 'auto'
                  }}
                  exit={{
                    opacity: 0,
                    height: 0
                  }}
                  className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl border-2 border-red-200 dark:border-red-800">

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [1, 0.5, 1]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                        className="h-4 w-4 rounded-full bg-red-500 mr-3" />

                        <div>
                          <p className="text-sm font-bold text-red-900 dark:text-red-300">
                            Enregistrement en cours...
                          </p>
                          <p className="text-xs text-red-700 dark:text-red-400">
                            {activeField === 'title' ?
                          'Dictée du titre' :
                          'Dictée du contenu'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Volume2Icon className="h-5 w-5 text-red-600 dark:text-red-400" />
                        <span className="text-lg font-bold text-red-900 dark:text-red-300">
                          {formatTime(recordingTime)}
                        </span>
                        <motion.button
                        whileHover={{
                          scale: 1.1
                        }}
                        whileTap={{
                          scale: 0.9
                        }}
                        type="button"
                        onClick={stopRecording}
                        className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all">

                          <StopCircleIcon className="h-5 w-5" />
                        </motion.button>
                      </div>
                    </div>
                    {/* Live Transcript */}
                    {transcript &&
                  <motion.div
                    initial={{
                      opacity: 0
                    }}
                    animate={{
                      opacity: 1
                    }}
                    className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-red-200 dark:border-red-700">

                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                          Transcription en direct:
                        </p>
                        <p className="text-sm text-gray-900 dark:text-white">
                          {transcript}
                        </p>
                      </motion.div>
                  }
                  </motion.div>
                }
              </AnimatePresence>
              {/* Processing Indicator */}
              <AnimatePresence>
                {isProcessing &&
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0
                  }}
                  animate={{
                    opacity: 1,
                    height: 'auto'
                  }}
                  exit={{
                    opacity: 0,
                    height: 0
                  }}
                  className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800">

                    <div className="flex items-center">
                      <motion.div
                      animate={{
                        rotate: 360
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                      className="mr-3">

                        <BrainCircuitIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </motion.div>
                      <div>
                        <p className="text-sm font-bold text-blue-900 dark:text-blue-300">
                          Traitement de votre dictée...
                        </p>
                        <p className="text-xs text-blue-700 dark:text-blue-400">
                          Remplissage automatique du champ
                        </p>
                      </div>
                    </div>
                  </motion.div>
                }
              </AnimatePresence>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Titre de la note *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      required
                      disabled={isRecording || isProcessing}
                      placeholder="Ex: Observation importante sur l'hygiène"
                      className="flex-1 px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed" />

                    <motion.button
                      whileHover={{
                        scale: 1.05
                      }}
                      whileTap={{
                        scale: 0.95
                      }}
                      type="button"
                      onClick={() =>
                      isRecording && activeField === 'title' ?
                      stopRecording() :
                      startRecording('title')
                      }
                      disabled={
                      isProcessing || isRecording && activeField !== 'title'
                      }
                      className={`p-3 rounded-lg shadow-lg transition-all ${isRecording && activeField === 'title' ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white animate-pulse' : isProcessing || isRecording && activeField !== 'title' ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl'}`}
                      title="Dictée vocale pour le titre">

                      {isRecording && activeField === 'title' ?
                      <StopCircleIcon className="h-5 w-5" /> :

                      <MicIcon className="h-5 w-5" />
                      }
                    </motion.button>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Contenu de la note *
                    </label>
                    <motion.button
                      whileHover={{
                        scale: 1.05
                      }}
                      whileTap={{
                        scale: 0.95
                      }}
                      type="button"
                      onClick={() =>
                      isRecording && activeField === 'content' ?
                      stopRecording() :
                      startRecording('content')
                      }
                      disabled={
                      isProcessing ||
                      isRecording && activeField !== 'content'
                      }
                      className={`inline-flex items-center px-4 py-2 rounded-lg shadow-lg transition-all text-sm font-semibold ${isRecording && activeField === 'content' ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white animate-pulse' : isProcessing || isRecording && activeField !== 'content' ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl'}`}
                      title="Dictée vocale pour le contenu">

                      {isRecording && activeField === 'content' ?
                      <>
                          <StopCircleIcon className="h-4 w-4 mr-2" />
                          Arrêter
                        </> :

                      <>
                          <MicIcon className="h-4 w-4 mr-2" />
                          Dicter le contenu
                        </>
                      }
                    </motion.button>
                  </div>
                  <textarea
                    value={formData.content}
                    onChange={(e) => handleChange('content', e.target.value)}
                    rows={10}
                    required
                    disabled={isRecording || isProcessing}
                    placeholder="Décrivez vos observations, remarques ou informations importantes..."
                    className="block w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white resize-none disabled:opacity-50 disabled:cursor-not-allowed" />

                </div>
                {/* Help Text */}
                {!isRecording && !isProcessing &&
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -10
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">

                    <div className="flex items-start">
                      <InfoIcon className="h-4 w-4 text-blue-500 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-xs text-blue-800 dark:text-blue-300">
                        <strong>Astuce:</strong> Utilisez les icônes de
                        microphone pour dicter le titre ou le contenu de votre
                        note. La transcription sera automatique.
                      </p>
                    </div>
                  </motion.div>
                }
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Étiquettes
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {commonTags.map((tag) =>
                    <motion.button
                      key={tag}
                      type="button"
                      whileHover={{
                        scale: 1.05
                      }}
                      whileTap={{
                        scale: 0.95
                      }}
                      onClick={() => toggleTag(tag)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${formData.tags.includes(tag) ? 'bg-amber-500 text-white shadow-lg' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>

                        {tag}
                      </motion.button>
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPrivate"
                    checked={formData.isPrivate}
                    onChange={(e) =>
                    handleChange('isPrivate', e.target.checked)
                    }
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded" />

                  <label
                    htmlFor="isPrivate"
                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300">

                    Note privée (visible uniquement par vous)
                  </label>
                </div>
              </div>
            </motion.div>
          </div>
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Summary */}
            <motion.div
              initial={{
                opacity: 0,
                x: 20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                delay: 0.2
              }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-2 border-amber-200 dark:border-gray-600 sticky top-6">

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Aperçu
              </h3>
              <div className="space-y-4 mb-6">
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    {selectedNoteType &&
                    <div
                      className={`h-10 w-10 rounded-full bg-${selectedNoteType.color}-100 dark:bg-${selectedNoteType.color}-900/30 flex items-center justify-center mr-3`}>

                        <selectedNoteType.icon
                        className={`h-5 w-5 text-${selectedNoteType.color}-600 dark:text-${selectedNoteType.color}-400`} />

                      </div>
                    }
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Type
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {selectedNoteType?.label}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <AlertTriangleIcon
                      className={`h-5 w-5 mr-2 ${selectedPriority?.color}`} />

                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Priorité
                      </p>
                      <p className={`font-semibold ${selectedPriority?.color}`}>
                        {selectedPriority?.label}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Patient:
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {patient.name}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Traitement:
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {patient.treatment}
                    </span>
                  </div>
                  {formData.tags.length > 0 &&
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        Étiquettes:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {formData.tags.map((tag) =>
                      <span
                        key={tag}
                        className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 text-xs rounded-full">

                            {tag}
                          </span>
                      )}
                      </div>
                    </div>
                  }
                </div>
              </div>
              <div className="space-y-3">
                <motion.button
                  whileHover={{
                    scale: 1.02
                  }}
                  whileTap={{
                    scale: 0.98
                  }}
                  type="submit"
                  disabled={!isFormComplete}
                  className={`w-full py-3 rounded-lg font-bold transition-all flex items-center justify-center ${isFormComplete ? 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg' : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'}`}>

                  <SaveIcon className="h-5 w-5 mr-2" />
                  Enregistrer la note
                </motion.button>
                <motion.button
                  whileHover={{
                    scale: 1.02
                  }}
                  whileTap={{
                    scale: 0.98
                  }}
                  type="button"
                  onClick={handleBack}
                  className="w-full py-3 rounded-lg font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">

                  Annuler
                </motion.button>
              </div>
            </motion.div>
            {/* Tips */}
            <motion.div
              initial={{
                opacity: 0,
                x: 20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                delay: 0.3
              }}
              className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">

              <div className="flex">
                <InfoIcon className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2 text-sm">
                    Conseils pour les notes
                  </h4>
                  <ul className="text-xs text-blue-800 dark:text-blue-400 space-y-1">
                    <li>• Soyez clair et concis</li>
                    <li>• Utilisez des étiquettes pertinentes</li>
                    <li>• Indiquez la priorité appropriée</li>
                    <li>• Datez vos observations</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
      {/* Success Animation */}
      <AnimatePresence>
        {showSuccess &&
        <SuccessAnimation
          message="La note a été enregistrée avec succès!"
          onComplete={handleSuccessComplete} />

        }
      </AnimatePresence>
    </>);

};
export default NouvelleNoteTraitement;