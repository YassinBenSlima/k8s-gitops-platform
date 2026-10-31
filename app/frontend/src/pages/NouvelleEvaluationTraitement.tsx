import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeftIcon,
  SaveIcon,
  CalendarIcon,
  TrendingUpIcon,
  SparklesIcon,
  CameraIcon,
  FileTextIcon,
  CheckCircle2Icon,
  AlertCircleIcon,
  WandSparklesIcon,
  ClipboardCheckIcon,
  ActivityIcon,
  ImageIcon,
  UploadIcon,
  MicIcon,
  StopCircleIcon,
  Volume2Icon,
  BrainCircuitIcon } from
'lucide-react';
import SuccessAnimation from '../components/animations/SuccessAnimation';
const NouvelleEvaluationTraitement = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showSuccess, setShowSuccess] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  // Voice recording states
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [showTranscript, setShowTranscript] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recognition, setRecognition] = useState(null);
  const [formData, setFormData] = useState({
    evaluationDate: new Date().toISOString().split('T')[0],
    progressPercentage: '',
    clinicalObservations: '',
    alignmentQuality: '',
    oralHygiene: '',
    patientCooperation: '',
    complications: '',
    nextSteps: '',
    nextAppointmentDate: '',
    treatmentAdjustments: '',
    photos: []
  });
  // Mock patient data
  const patient = {
    id: id,
    name: 'Sophie Martin',
    treatment: 'Appareil fixe',
    currentProgress: 65,
    lastEvaluation: {
      date: '15/12/2023',
      progress: 55,
      notes: 'Bonne évolution, léger retard sur le planning initial'
    }
  };
  const alignmentOptions = [
  'Excellent',
  'Bon',
  'Satisfaisant',
  'À améliorer',
  'Insuffisant'];

  const hygieneOptions = [
  'Excellente',
  'Bonne',
  'Moyenne',
  'Insuffisante',
  'Préoccupante'];

  const cooperationOptions = [
  'Excellent',
  'Bon',
  'Moyen',
  'Faible',
  'Très faible'];

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
  const startRecording = () => {
    if (recognition) {
      setTranscript('');
      setShowTranscript(true);
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
      if (transcript) {
        processTranscript(transcript);
      }
    }
  };
  const processTranscript = (text) => {
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      // AI parsing logic - extract structured information from transcript
      const parsedData = parseVoiceInput(text);
      // Auto-fill form fields
      setFormData((prev) => ({
        ...prev,
        ...parsedData
      }));
      setIsProcessing(false);
      setShowTranscript(false);
    }, 2000);
  };
  const parseVoiceInput = (text) => {
    const lowerText = text.toLowerCase();
    const parsed = {};
    // Parse clinical observations
    const observationKeywords = [
    'observation',
    'état clinique',
    'constat',
    'remarque'];

    if (observationKeywords.some((keyword) => lowerText.includes(keyword))) {
      const observationMatch = text.match(
        /(?:observation(?:s)?|état clinique|constat|remarque)[:\s]+([^.!?]+)/gi
      );
      if (observationMatch) {
        parsed.clinicalObservations = observationMatch.
        map((m) => m.replace(/^[^:]+:\s*/, '')).
        join('. ');
      }
    }
    // Parse alignment quality
    const alignmentKeywords = ['alignement', 'qualité', 'position'];
    if (alignmentKeywords.some((keyword) => lowerText.includes(keyword))) {
      if (lowerText.includes('excellent')) {
        parsed.alignmentQuality = 'Excellent';
      } else if (lowerText.includes('bon')) {
        parsed.alignmentQuality = 'Bon';
      } else if (lowerText.includes('satisfaisant')) {
        parsed.alignmentQuality = 'Satisfaisant';
      } else if (lowerText.includes('améliorer')) {
        parsed.alignmentQuality = 'À améliorer';
      } else if (lowerText.includes('insuffisant')) {
        parsed.alignmentQuality = 'Insuffisant';
      }
    }
    // Parse oral hygiene
    const hygieneKeywords = ['hygiène', 'propreté', 'nettoyage'];
    if (hygieneKeywords.some((keyword) => lowerText.includes(keyword))) {
      if (lowerText.includes('excellente')) {
        parsed.oralHygiene = 'Excellente';
      } else if (lowerText.includes('bonne')) {
        parsed.oralHygiene = 'Bonne';
      } else if (lowerText.includes('moyenne')) {
        parsed.oralHygiene = 'Moyenne';
      } else if (lowerText.includes('insuffisante')) {
        parsed.oralHygiene = 'Insuffisante';
      } else if (lowerText.includes('préoccupante')) {
        parsed.oralHygiene = 'Préoccupante';
      }
    }
    // Parse patient cooperation
    const cooperationKeywords = ['coopération', 'collaboration', 'suivi'];
    if (cooperationKeywords.some((keyword) => lowerText.includes(keyword))) {
      if (lowerText.includes('excellent')) {
        parsed.patientCooperation = 'Excellent';
      } else if (lowerText.includes('bon')) {
        parsed.patientCooperation = 'Bon';
      } else if (lowerText.includes('moyen')) {
        parsed.patientCooperation = 'Moyen';
      } else if (lowerText.includes('faible')) {
        parsed.patientCooperation = 'Faible';
      } else if (lowerText.includes('très faible')) {
        parsed.patientCooperation = 'Très faible';
      }
    }
    // Parse complications
    const complicationKeywords = [
    'complication',
    'problème',
    'difficulté',
    'incident'];

    if (complicationKeywords.some((keyword) => lowerText.includes(keyword))) {
      const complicationMatch = text.match(
        /(?:complication(?:s)?|problème(?:s)?|difficulté(?:s)?|incident(?:s)?)[:\s]+([^.!?]+)/gi
      );
      if (complicationMatch) {
        parsed.complications = complicationMatch.
        map((m) => m.replace(/^[^:]+:\s*/, '')).
        join('. ');
      }
    }
    // Parse treatment adjustments
    const adjustmentKeywords = ['ajustement', 'modification', 'changement'];
    if (adjustmentKeywords.some((keyword) => lowerText.includes(keyword))) {
      const adjustmentMatch = text.match(
        /(?:ajustement(?:s)?|modification(?:s)?|changement(?:s)?)[:\s]+([^.!?]+)/gi
      );
      if (adjustmentMatch) {
        parsed.treatmentAdjustments = adjustmentMatch.
        map((m) => m.replace(/^[^:]+:\s*/, '')).
        join('. ');
      }
    }
    // Parse next steps
    const nextStepsKeywords = ['prochaine étape', 'suite', 'plan', 'objectif'];
    if (nextStepsKeywords.some((keyword) => lowerText.includes(keyword))) {
      const nextStepsMatch = text.match(
        /(?:prochaine(?:s)? étape(?:s)?|suite|plan|objectif(?:s)?)[:\s]+([^.!?]+)/gi
      );
      if (nextStepsMatch) {
        parsed.nextSteps = nextStepsMatch.
        map((m) => m.replace(/^[^:]+:\s*/, '')).
        join('. ');
      }
    }
    // Parse progress percentage
    const progressMatch = text.match(
      /(?:progression|avancement)[:\s]+(\d+)\s*(?:%|pourcent)/i
    );
    if (progressMatch) {
      parsed.progressPercentage = progressMatch[1];
    }
    // If no specific fields detected, put everything in clinical observations
    if (Object.keys(parsed).length === 0) {
      parsed.clinicalObservations = text;
    }
    return parsed;
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
  const generateAISuggestions = () => {
    setAiGenerating(true);
    setTimeout(() => {
      setAiGenerating(false);
      setShowAiSuggestions(true);
    }, 2000);
  };
  const applyAISuggestions = () => {
    const aiSuggestions = {
      progressPercentage: '70',
      clinicalObservations:
      'Progression satisfaisante depuis la dernière évaluation. Les mouvements dentaires sont conformes au plan de traitement. Les brackets sont bien positionnés et les arcs exercent une force appropriée.',
      alignmentQuality: 'Bon',
      oralHygiene: 'Bonne',
      patientCooperation: 'Excellent',
      complications: 'Aucune complication majeure observée',
      nextSteps:
      'Continuer le traitement actuel. Changement des élastiques recommandé. Surveillance accrue de la canine supérieure droite.',
      treatmentAdjustments:
      "Ajustement mineur de l'arc supérieur pour optimiser l'alignement"
    };
    setFormData({
      ...formData,
      ...aiSuggestions
    });
    setShowAiSuggestions(false);
  };
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      photos: [...formData.photos, ...files]
    });
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
  const isFormComplete =
  formData.progressPercentage && formData.clinicalObservations;
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
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-xl">

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
                <ClipboardCheckIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Nouvelle Évaluation</h3>
                <p className="text-indigo-100 text-sm mt-1">
                  Évaluation du traitement pour {patient.name}
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2">
              <ActivityIcon className="h-5 w-5 text-yellow-300" />
              <div>
                <div className="text-xs text-indigo-100">
                  Progression actuelle
                </div>
                <div className="text-sm font-bold">
                  {patient.currentProgress}%
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
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
              className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border-2 border-blue-100 dark:border-gray-600">

              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <CalendarIcon className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Informations générales
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Date et progression du traitement
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date d'évaluation *
                  </label>
                  <input
                    type="date"
                    value={formData.evaluationDate}
                    onChange={(e) =>
                    handleChange('evaluationDate', e.target.value)
                    }
                    required
                    className="block w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" />

                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Progression (%) *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.progressPercentage}
                      onChange={(e) =>
                      handleChange('progressPercentage', e.target.value)
                      }
                      required
                      className="block w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="0-100" />

                    <TrendingUpIcon className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Prochain rendez-vous
                  </label>
                  <input
                    type="date"
                    value={formData.nextAppointmentDate}
                    onChange={(e) =>
                    handleChange('nextAppointmentDate', e.target.value)
                    }
                    className="block w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" />

                </div>
              </div>
              <div className="mt-4 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-600 dark:text-blue-400 font-medium">
                    Dernière évaluation: {patient.lastEvaluation.date}
                  </span>
                  <span className="text-blue-900 dark:text-blue-300 font-bold">
                    {patient.lastEvaluation.progress}%
                  </span>
                </div>
              </div>
            </motion.div>
            {/* Clinical Assessment */}
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
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 border-b border-purple-100 dark:border-purple-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center">
                      <ClipboardCheckIcon className="h-5 w-5 text-white" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Évaluation clinique
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Observations et qualité du traitement
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {/* Voice Input Button */}
                    <motion.button
                      whileHover={{
                        scale: 1.05
                      }}
                      whileTap={{
                        scale: 0.95
                      }}
                      type="button"
                      onClick={isRecording ? stopRecording : startRecording}
                      disabled={isProcessing}
                      className={`inline-flex items-center px-4 py-2 rounded-lg font-semibold shadow-lg transition-all ${isRecording ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white animate-pulse' : isProcessing ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl'}`}>

                      {isProcessing ?
                      <>
                          <motion.div
                          animate={{
                            rotate: 360
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'linear'
                          }}
                          className="mr-2">

                            <SparklesIcon className="h-4 w-4" />
                          </motion.div>
                          Traitement IA...
                        </> :
                      isRecording ?
                      <>
                          <StopCircleIcon className="h-4 w-4 mr-2" />
                          Arrêter ({formatTime(recordingTime)})
                        </> :

                      <>
                          <MicIcon className="h-4 w-4 mr-2" />
                          Dictée vocale
                        </>
                      }
                    </motion.button>
                    <motion.button
                      whileHover={{
                        scale: 1.05
                      }}
                      whileTap={{
                        scale: 0.95
                      }}
                      type="button"
                      onClick={generateAISuggestions}
                      disabled={aiGenerating}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50">

                      {aiGenerating ?
                      <>
                          <motion.div
                          animate={{
                            rotate: 360
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'linear'
                          }}
                          className="mr-2">

                            <SparklesIcon className="h-4 w-4" />
                          </motion.div>
                          Génération...
                        </> :

                      <>
                          <WandSparklesIcon className="h-4 w-4 mr-2" />
                          Assistance IA
                        </>
                      }
                    </motion.button>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-6">
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
                    className="p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl border-2 border-red-200 dark:border-red-800">

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
                              Parlez clairement pour une meilleure transcription
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Volume2Icon className="h-5 w-5 text-red-600 dark:text-red-400" />
                          <span className="text-lg font-bold text-red-900 dark:text-red-300">
                            {formatTime(recordingTime)}
                          </span>
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
                      className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-red-200 dark:border-red-700">

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
                    className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border-2 border-purple-200 dark:border-purple-800">

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

                          <BrainCircuitIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </motion.div>
                        <div>
                          <p className="text-sm font-bold text-purple-900 dark:text-purple-300">
                            L'IA analyse votre dictée...
                          </p>
                          <p className="text-xs text-purple-700 dark:text-purple-400">
                            Extraction et remplissage automatique des champs
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  }
                </AnimatePresence>
                {/* Help Text */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex">
                    <AlertCircleIcon className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2 text-sm">
                        Comment utiliser la dictée vocale
                      </h4>
                      <ul className="text-xs text-blue-800 dark:text-blue-400 space-y-1">
                        <li>• Cliquez sur "Dictée vocale" pour commencer</li>
                        <li>
                          • Mentionnez les catégories: "État clinique:",
                          "Complications:", etc.
                        </li>
                        <li>
                          • Exemple: "État clinique: Bon alignement des dents.
                          Hygiène: Bonne. Progression: 70 pourcent."
                        </li>
                        <li>
                          • L'IA remplira automatiquement les champs
                          correspondants
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Qualité d'alignement
                    </label>
                    <select
                      value={formData.alignmentQuality}
                      onChange={(e) =>
                      handleChange('alignmentQuality', e.target.value)
                      }
                      className="block w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white">

                      <option value="">Sélectionner</option>
                      {alignmentOptions.map((option) =>
                      <option key={option} value={option}>
                          {option}
                        </option>
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Hygiène bucco-dentaire
                    </label>
                    <select
                      value={formData.oralHygiene}
                      onChange={(e) =>
                      handleChange('oralHygiene', e.target.value)
                      }
                      className="block w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white">

                      <option value="">Sélectionner</option>
                      {hygieneOptions.map((option) =>
                      <option key={option} value={option}>
                          {option}
                        </option>
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Coopération du patient
                    </label>
                    <select
                      value={formData.patientCooperation}
                      onChange={(e) =>
                      handleChange('patientCooperation', e.target.value)
                      }
                      className="block w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white">

                      <option value="">Sélectionner</option>
                      {cooperationOptions.map((option) =>
                      <option key={option} value={option}>
                          {option}
                        </option>
                      )}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Observations cliniques *
                  </label>
                  <textarea
                    value={formData.clinicalObservations}
                    onChange={(e) =>
                    handleChange('clinicalObservations', e.target.value)
                    }
                    rows={4}
                    required
                    placeholder="Décrivez les observations cliniques détaillées..."
                    className="block w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white resize-none" />

                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Complications ou problèmes
                  </label>
                  <textarea
                    value={formData.complications}
                    onChange={(e) =>
                    handleChange('complications', e.target.value)
                    }
                    rows={3}
                    placeholder="Notez toute complication ou problème rencontré..."
                    className="block w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white resize-none" />

                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Ajustements du traitement
                  </label>
                  <textarea
                    value={formData.treatmentAdjustments}
                    onChange={(e) =>
                    handleChange('treatmentAdjustments', e.target.value)
                    }
                    rows={3}
                    placeholder="Décrivez les ajustements effectués ou prévus..."
                    className="block w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white resize-none" />

                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Prochaines étapes
                  </label>
                  <textarea
                    value={formData.nextSteps}
                    onChange={(e) => handleChange('nextSteps', e.target.value)}
                    rows={3}
                    placeholder="Définissez les prochaines étapes du traitement..."
                    className="block w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white resize-none" />

                </div>
              </div>
            </motion.div>
            {/* Photo Upload */}
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
                delay: 0.3
              }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">

              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                  <CameraIcon className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Photos cliniques
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Ajoutez des photos de l'évolution du traitement
                  </p>
                </div>
              </div>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-green-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload" />

                <label
                  htmlFor="photo-upload"
                  className="cursor-pointer flex flex-col items-center">

                  <UploadIcon className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-3" />
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Cliquez pour télécharger des photos
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG jusqu'à 10MB
                  </p>
                </label>
              </div>
              {formData.photos.length > 0 &&
              <div className="mt-4 grid grid-cols-3 gap-3">
                  {formData.photos.map((photo, index) =>
                <div
                  key={index}
                  className="aspect-square rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">

                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                )}
                </div>
              }
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
              className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-2 border-green-200 dark:border-gray-600 sticky top-6">

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Résumé
              </h3>
              <div className="space-y-4 mb-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 text-white mb-3">
                    <div>
                      <div className="text-3xl font-bold">
                        {formData.progressPercentage || '0'}%
                      </div>
                      <div className="text-xs">Progression</div>
                    </div>
                  </div>
                  {formData.progressPercentage &&
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formData.progressPercentage >= patient.currentProgress ?
                    `+${formData.progressPercentage - patient.currentProgress}% depuis la dernière évaluation` :
                    `${patient.currentProgress - formData.progressPercentage}% de recul`}
                    </p>
                  }
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
                  {formData.photos.length > 0 &&
                  <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Photos:
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {formData.photos.length}
                      </span>
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
                  className={`w-full py-3 rounded-lg font-bold transition-all flex items-center justify-center ${isFormComplete ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg' : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'}`}>

                  <SaveIcon className="h-5 w-5 mr-2" />
                  Enregistrer l'évaluation
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
            {/* AI Suggestions */}
            {showAiSuggestions &&
            <motion.div
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-800">

                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <SparklesIcon className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                      Suggestions IA
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Basées sur l'historique
                    </p>
                  </div>
                </div>
                <motion.button
                whileHover={{
                  scale: 1.02
                }}
                whileTap={{
                  scale: 0.98
                }}
                type="button"
                onClick={applyAISuggestions}
                className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all text-sm">

                  Appliquer les suggestions
                </motion.button>
              </motion.div>
            }
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
                <AlertCircleIcon className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2 text-sm">
                    Conseils pour l'évaluation
                  </h4>
                  <ul className="text-xs text-blue-800 dark:text-blue-400 space-y-1">
                    <li>• Soyez précis dans vos observations</li>
                    <li>• Prenez des photos de qualité</li>
                    <li>• Notez tous les changements observés</li>
                    <li>• Définissez des objectifs clairs</li>
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
          message="L'évaluation a été enregistrée avec succès!"
          onComplete={handleSuccessComplete} />

        }
      </AnimatePresence>
    </>);

};
export default NouvelleEvaluationTraitement;