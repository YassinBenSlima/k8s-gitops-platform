import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquareIcon,
  SearchIcon,
  SendIcon,
  PaperclipIcon,
  VideoIcon,
  PhoneIcon,
  MoreVerticalIcon,
  UserIcon,
  ClockIcon,
  CheckCheckIcon,
  ImageIcon,
  FileTextIcon,
  SmileIcon,
  MicIcon,
  XIcon,
  SparklesIcon,
  BellIcon,
  MailIcon,
  ZapIcon,
  CalendarIcon,
  StopCircleIcon,
  Volume2Icon,
  BrainCircuitIcon,
  AlertCircleIcon,
  ActivityIcon,
  HeartIcon } from
'lucide-react';
import { usePatient } from '../contexts/PatientContext';
const Communication = () => {
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);
  const {
    patients: sharedPatients,
    selectedPatientId,
    setSelectedPatientId,
  } = usePatient();
  // Voice recording states
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  const [recognition, setRecognition] = useState(null);
  const patients = sharedPatients.map((patient, index) => ({
    id: Number(patient.id),
    name: patient.name,
    avatar: patient.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase(),
    lastMessage:
      ({
        '1': "Merci pour les instructions, j'ai bien suivi les recommandations",
        '2': "D'accord, à demain pour le rendez-vous",
        '3': 'Est-ce normal que je ressente une légère douleur?'
      } as Record<string, string>)[patient.id] || 'Conversation prête pour le suivi patient',
    lastMessageTime:
      ({
        '1': 'Il y a 5 min',
        '2': 'Il y a 1h',
        '3': 'Il y a 2h'
      } as Record<string, string>)[patient.id] || 'Aucun message',
    unreadCount:
      ({ '1': 2, '2': 0, '3': 1 } as Record<string, number>)[patient.id] || 0,
    online: index % 2 === 0,
    color: ['from-red-500 to-rose-500', 'from-red-600 to-red-500', 'from-green-500 to-emerald-500', 'from-amber-500 to-orange-500', 'from-red-500 to-pink-500'][index % 5]
  }));

  // Mock messages
  const messages = {
    1: [
    {
      id: 1,
      sender: 'patient',
      text: "Bonjour docteur, j'ai une question concernant mon traitement",
      time: '10:30',
      read: true
    },
    {
      id: 2,
      sender: 'doctor',
      text: 'Bonjour Sophie! Bien sûr, je vous écoute. Quelle est votre question?',
      time: '10:32',
      read: true
    },
    {
      id: 3,
      sender: 'patient',
      text: 'Est-ce que je dois porter mes élastiques pendant la nuit?',
      time: '10:33',
      read: true
    },
    {
      id: 4,
      sender: 'doctor',
      text: 'Oui, il est important de porter vos élastiques 24h/24, même pendant la nuit. Cela accélère le traitement.',
      time: '10:35',
      read: true
    },
    {
      id: 5,
      sender: 'patient',
      text: "Merci pour les instructions, j'ai bien suivi les recommandations",
      time: '10:40',
      read: true
    }],

    2: [
    {
      id: 1,
      sender: 'doctor',
      text: "Bonjour Thomas, n'oubliez pas votre rendez-vous demain à 14h",
      time: 'Hier 16:00',
      read: true
    },
    {
      id: 2,
      sender: 'patient',
      text: "D'accord, à demain pour le rendez-vous",
      time: 'Hier 16:15',
      read: true
    }],

    3: [
    {
      id: 1,
      sender: 'patient',
      text: 'Bonjour docteur',
      time: '09:00',
      read: true
    },
    {
      id: 2,
      sender: 'patient',
      text: 'Est-ce normal que je ressente une légère douleur?',
      time: '09:01',
      read: false
    }]

  };
  // Message templates
  const templates = [
  {
    id: 1,
    title: 'Rappel de rendez-vous',
    content:
    'Bonjour, je vous rappelle votre rendez-vous prévu le [DATE] à [HEURE].',
    icon: CalendarIcon,
    color: 'from-red-500 to-rose-500'
  },
  {
    id: 2,
    title: 'Préparation consultation',
    content:
    'Merci de venir avec vos ordonnances, vos derniers bilans et votre carnet tensionnel.',
    icon: FileTextIcon,
    color: 'from-red-600 to-red-500'
  },
  {
    id: 3,
    title: 'Observance traitement',
    content: 'Pensez à prendre votre traitement cardiovasculaire selon la prescription quotidienne.',
    icon: BellIcon,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 4,
    title: 'Confirmation rendez-vous',
    content: 'Votre rendez-vous est confirmé pour le [DATE] à [HEURE].',
    icon: CheckCheckIcon,
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 5,
    title: 'Alerte symptômes',
    content: 'En cas de douleur thoracique prolongée, dyspnée importante ou malaise, contactez les urgences immédiatement.',
    icon: AlertCircleIcon,
    color: 'from-red-600 to-orange-500'
  },
  {
    id: 6,
    title: 'Suivi tensionnel',
    content: 'Merci de mesurer votre tension matin et soir pendant 7 jours et de nous envoyer les valeurs.',
    icon: ActivityIcon,
    color: 'from-red-500 to-rose-500'
  },
  {
    id: 7,
    title: 'Bilan biologique',
    content: 'Veuillez réaliser le bilan demandé (NFS, ionogramme, créatinine, bilan lipidique) avant la prochaine consultation.',
    icon: FileTextIcon,
    color: 'from-red-600 to-red-500'
  },
  {
    id: 8,
    title: 'Rappel ECG/Imagerie',
    content: 'N\'oubliez pas d\'apporter votre dernier ECG et le compte-rendu d\'imagerie cardiaque.',
    icon: HeartIcon,
    color: 'from-red-500 to-orange-500'
  },
  {
    id: 9,
    title: 'Hygiène de vie',
    content: 'Réduisez le sel, maintenez une activité physique adaptée et surveillez votre poids régulièrement.',
    icon: ZapIcon,
    color: 'from-red-500 to-rose-500'
  },
  {
    id: 10,
    title: 'Téléconsultation',
    content: 'Votre téléconsultation est prévue le [DATE] à [HEURE]. Merci d\'être disponible 10 minutes avant.',
    icon: VideoIcon,
    color: 'from-red-600 to-pink-500'
  }];

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
      // Directly set the message text with the transcript
      setMessageText((prev) => prev ? prev + ' ' + text : text);
      setIsProcessing(false);
      setTranscript('');
    }, 1000);
  };
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  const filteredPatients = patients.filter((patient) =>
  patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentPatient = selectedPatientId ?
  patients.find((p) => String(p.id) === selectedPatientId) :
  null;
  const currentMessages = selectedPatientId ? messages[Number(selectedPatientId)] || [] : [];
  const handleSendMessage = () => {
    if (messageText.trim()) {
      alert(`Message envoyé: ${messageText}`);
      setMessageText('');
    }
  };
  const handleTemplateSelect = (template) => {
    setMessageText(template.content);
    setShowTemplates(false);
  };
  const handleVideoCall = () => {
    alert('Démarrage de la consultation vidéo...');
  };
  const handlePhoneCall = () => {
    alert('Appel en cours...');
  };
  return (
    <div className="space-y-4">
      {/* Header - Compact */}
      <motion.div
        initial={{
          opacity: 0,
          y: -20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="bg-gradient-to-r from-red-600 via-red-500 to-rose-500 rounded-lg p-3 text-white shadow-sm">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-md bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <MessageSquareIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold leading-none">
                Communication & Messagerie
              </h1>
              <p className="text-red-100 text-xs mt-0.5">
                Communiquez avec vos patients en temps réel
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-white bg-opacity-10 rounded-md px-2.5 py-1.5 text-sm">
                <MailIcon className="h-3.5 w-3.5 opacity-75" />
                <span className="font-bold">
                  {patients.reduce((acc, p) => acc + p.unreadCount, 0)}
                </span>
                <span className="text-red-100 text-xs">non lus</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white bg-opacity-10 rounded-md px-2.5 py-1.5 text-sm">
                <UserIcon className="h-3.5 w-3.5 opacity-75" />
                <span className="font-bold">
                  {patients.filter((p) => p.online).length}
                </span>
                <span className="text-red-100 text-xs">en ligne</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white bg-opacity-10 rounded-md px-2.5 py-1.5 text-sm">
                <MessageSquareIcon className="h-3.5 w-3.5 opacity-75" />
                <span className="font-bold">{patients.length}</span>
                <span className="text-red-100 text-xs">conversations</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-md px-2.5 py-1.5">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-bold">En ligne</span>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Main Chat Interface */}
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
          delay: 0.4
        }}
        className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden"
        style={{
          height: '520px'
        }}>

        <div className="flex h-full">
          {/* Patient List Sidebar */}
          <div className="w-64 border-r border-gray-200 flex flex-col bg-gray-50">
            {/* Search */}
            <div className="p-2.5 border-b border-gray-200">
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un patient..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 text-xs bg-white text-gray-900 placeholder-gray-500" />

              </div>
            </div>
            {/* Patient List */}
            <div className="flex-1 overflow-y-auto">
              {filteredPatients.map((patient, index) =>
              <div
                key={patient.id}
                onClick={() => setSelectedPatientId(String(patient.id))}
                className={`p-3 cursor-pointer transition-all border-b border-gray-100 ${selectedPatientId === String(patient.id) ? 'bg-red-50 border-l-4 border-l-red-500' : 'hover:bg-gray-100'}`}>

                  <div className="flex items-start gap-2">
                    <div className="relative flex-shrink-0">
                      <div
                      className={`h-9 w-9 rounded-lg bg-gradient-to-br ${patient.color} flex items-center justify-center shadow-sm`}>

                        <span className="text-white font-bold text-xs">
                          {patient.avatar}
                        </span>
                      </div>
                      {patient.online &&
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
                    }
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-xs font-bold text-gray-900 truncate">
                          {patient.name}
                        </p>
                        {patient.unreadCount > 0 &&
                      <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-[10px] font-bold text-white">
                            {patient.unreadCount}
                          </span>
                      }
                      </div>
                      <p className="text-[10px] text-gray-500 truncate">
                        {patient.lastMessage}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {patient.lastMessageTime}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedPatientId ?
            <>
                {/* Chat Header */}
                <div className="p-3 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                      className={`h-9 w-9 rounded-lg bg-gradient-to-br ${currentPatient.color} flex items-center justify-center shadow-sm`}>

                        <span className="text-white font-bold text-xs">
                          {currentPatient.avatar}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-gray-900">
                          {currentPatient.name}
                        </h3>
                        <p className="text-[10px] text-gray-500 flex items-center gap-1">
                          <div
                          className={`h-1.5 w-1.5 rounded-full ${currentPatient.online ? 'bg-green-500' : 'bg-gray-400'}`} />

                          {currentPatient.online ? 'En ligne' : 'Hors ligne'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                      onClick={handleVideoCall}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all">

                        <VideoIcon className="h-3.5 w-3.5" />
                      </button>
                      <button
                      onClick={handlePhoneCall}
                      className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all">

                        <PhoneIcon className="h-3.5 w-3.5" />
                      </button>
                      <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all">
                        <MoreVerticalIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-3 bg-gray-50">
                  <div className="space-y-3">
                    {currentMessages.map((message, index) =>
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}>

                        <div
                      className={`max-w-xs ${message.sender === 'doctor' ? 'order-2' : 'order-1'}`}>

                          <div
                        className={`rounded-xl px-3 py-2 shadow-sm ${message.sender === 'doctor' ? 'bg-gradient-to-br from-red-500 to-rose-500 text-white' : 'bg-white border border-gray-200 text-gray-900'}`}>

                            <p className="text-xs">{message.text}</p>
                          </div>
                          <div
                        className={`flex items-center mt-0.5 text-[10px] text-gray-500 ${message.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}>

                            <ClockIcon className="h-2.5 w-2.5 mr-1" />
                            <span>{message.time}</span>
                            {message.sender === 'doctor' && message.read &&
                        <CheckCheckIcon className="h-2.5 w-2.5 ml-1 text-red-500" />
                        }
                          </div>
                        </div>
                      </div>
                  )}
                  </div>
                </div>
                {/* Message Input */}
                <div className="p-2.5 border-t border-gray-200 bg-gray-50">
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
                    className="mb-2 p-2 bg-red-50 rounded-lg border border-red-200">

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [1, 0.5, 1]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity
                          }}
                          className="h-2 w-2 rounded-full bg-red-500" />

                            <p className="text-[10px] font-bold text-red-900">
                              Enregistrement en cours...
                            </p>
                          </div>
                          <span className="text-xs font-bold text-red-900">
                            {formatTime(recordingTime)}
                          </span>
                        </div>
                        {transcript &&
                    <div className="mt-1.5 p-1.5 bg-white rounded border border-red-200">
                            <p className="text-[10px] text-gray-900">
                              {transcript}
                            </p>
                          </div>
                    }
                      </motion.div>
                  }
                  </AnimatePresence>
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <textarea
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="Tapez votre message..."
                      rows={2}
                      disabled={isRecording || isProcessing}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 resize-none text-xs bg-white text-gray-900 placeholder-gray-500 disabled:opacity-50" />

                    </div>
                    <div className="flex flex-col gap-1.5">
                      <button
                      type="button"
                      onClick={isRecording ? stopRecording : startRecording}
                      disabled={isProcessing}
                      className={`p-2 rounded-lg transition-all ${isRecording ? 'bg-red-600 text-white animate-pulse' : 'bg-red-600 text-white hover:bg-red-700'}`}>

                        {isRecording ?
                      <StopCircleIcon className="h-4 w-4" /> :

                      <MicIcon className="h-4 w-4" />
                      }
                      </button>
                      <button
                      onClick={() => setShowTemplates(!showTemplates)}
                      disabled={isRecording || isProcessing}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all disabled:opacity-50">

                        <SparklesIcon className="h-4 w-4" />
                      </button>
                      <button
                      disabled={isRecording || isProcessing}
                      className="p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-all disabled:opacity-50">

                        <PaperclipIcon className="h-4 w-4" />
                      </button>
                      <button
                      onClick={handleSendMessage}
                      disabled={isRecording || isProcessing}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all disabled:opacity-50">

                        <SendIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </> :

            <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <MessageSquareIcon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">
                    Sélectionnez un patient
                  </h3>
                  <p className="text-xs text-gray-500">
                    Choisissez un patient dans la liste pour commencer une
                    conversation
                  </p>
                </div>
              </div>
            }
          </div>
        </div>
      </motion.div>
      {/* Message Templates Modal */}
      <AnimatePresence>
        {showTemplates &&
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowTemplates(false)}>

            <motion.div
            initial={{
              scale: 0.9,
              y: 20
            }}
            animate={{
              scale: 1,
              y: 0
            }}
            exit={{
              scale: 0.9,
              y: 20
            }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-2xl max-w-xl w-full overflow-hidden">

              <div className="bg-gradient-to-r from-red-600 to-rose-500 p-4 text-white">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mr-3">
                      <SparklesIcon className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="text-base font-bold">Modèles de messages</h3>
                  </div>
                  <motion.button
                  whileHover={{
                    scale: 1.1,
                    rotate: 90
                  }}
                  whileTap={{
                    scale: 0.9
                  }}
                  onClick={() => setShowTemplates(false)}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1.5 transition-all">

                    <XIcon className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
              <div className="p-3 max-h-80 overflow-y-auto">
                <div className="grid grid-cols-1 gap-2">
                  {templates.map((template, index) =>
                <motion.div
                  key={template.id}
                  initial={{
                    opacity: 0,
                    x: -20
                  }}
                  animate={{
                    opacity: 1,
                    x: 0
                  }}
                  transition={{
                    delay: index * 0.05
                  }}
                  whileHover={{
                    scale: 1.01,
                    x: 2
                  }}
                  onClick={() => handleTemplateSelect(template)}
                  className="p-2.5 bg-gradient-to-br from-white to-gray-50 rounded-lg border border-gray-100 hover:border-red-300 cursor-pointer transition-all shadow-sm hover:shadow">

                      <div className="flex items-start">
                        <div
                      className={`h-8 w-8 rounded-lg bg-gradient-to-br ${template.color} flex items-center justify-center shadow-sm flex-shrink-0`}>

                          <template.icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="ml-2.5 flex-1">
                          <h4 className="text-xs font-bold text-gray-900 mb-0.5">
                            {template.title}
                          </h4>
                          <p className="text-xs text-gray-600 leading-snug">
                            {template.content}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

};
export default Communication;