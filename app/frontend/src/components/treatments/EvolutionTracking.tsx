import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CameraIcon,
  UploadIcon,
  BarChart2Icon,
  EditIcon,
  CheckIcon,
  XIcon,
  SaveIcon,
  SparklesIcon,
  TrendingUpIcon,
  CalendarIcon,
  ImageIcon,
  ZoomInIcon,
  LayersIcon,
  ActivityIcon } from
'lucide-react';
import PhotoUploader from './common/PhotoUploader';
import PhotoComparison from './common/PhotoComparison';
const EvolutionTracking = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedStage, setSelectedStage] = useState(null);
  const [showUploader, setShowUploader] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [isAnnotating, setIsAnnotating] = useState(false);
  const [currentAnnotation, setCurrentAnnotation] = useState('');
  const [annotations, setAnnotations] = useState([]);
  const [draggingAnnotation, setDraggingAnnotation] = useState(null);
  const [imageContainerRef, setImageContainerRef] = useState(null);
  // Mock patients
  const patients = [
  {
    id: 1,
    name: 'Sophie Martin',
    startDate: '01/01/2023',
    progress: 60
  },
  {
    id: 2,
    name: 'Thomas Bernard',
    startDate: '15/03/2023',
    progress: 30
  },
  {
    id: 3,
    name: 'Emma Petit',
    startDate: '10/12/2022',
    progress: 80
  },
  {
    id: 4,
    name: 'Lucas Dubois',
    startDate: '05/02/2023',
    progress: 45
  }];

  // Mock treatment stages
  const treatmentStages = [
  {
    id: 1,
    name: 'Initial',
    date: '01/01/2023',
    photos: [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      type: 'frontal'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      type: 'latéral'
    }]

  },
  {
    id: 2,
    name: 'Alignement Initial',
    date: '01/04/2023',
    photos: [
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      type: 'frontal'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      type: 'latéral'
    }]

  },
  {
    id: 3,
    name: 'Intermédiaire',
    date: '01/07/2023',
    photos: [
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      type: 'frontal'
    }]

  },
  {
    id: 4,
    name: 'Actuel',
    date: '01/10/2023',
    photos: []
  }];

  // Mock AI detected changes
  const detectedChanges = [
  {
    id: 1,
    description: "Amélioration de l'alignement des incisives centrales",
    severity: 'positive',
    percentage: 75
  },
  {
    id: 2,
    description: 'Réduction du chevauchement des incisives latérales',
    severity: 'positive',
    percentage: 60
  },
  {
    id: 3,
    description: 'Fermeture partielle du diastème antérieur',
    severity: 'positive',
    percentage: 45
  },
  {
    id: 4,
    description: 'Légère rotation persistante de la canine droite',
    severity: 'neutral',
    percentage: 20
  }];

  const handlePatientSelect = (patientId) => {
    setSelectedPatient(patientId);
    setSelectedStage(null);
    setShowComparison(false);
    setShowUploader(false);
  };
  const handleStageSelect = (stageId) => {
    setSelectedStage(stageId);
    setShowComparison(false);
    setShowUploader(false);
  };
  const handlePhotoUpload = (files) => {
    console.log('Files to upload:', files);
    setShowUploader(false);
    alert('Photos téléversées avec succès');
  };
  const handleAddAnnotation = () => {
    if (currentAnnotation.trim()) {
      setAnnotations([
      ...annotations,
      {
        id: annotations.length + 1,
        text: currentAnnotation,
        x: 50,
        y: 50
      }]
      );
      setCurrentAnnotation('');
    }
  };
  const handleSaveAnnotations = () => {
    setIsAnnotating(false);
    alert('Annotations sauvegardées avec succès');
  };
  const getPatientById = (id) => {
    return patients.find((patient) => patient.id === parseInt(id));
  };
  const getProgressColor = (progress) => {
    if (progress >= 75) return 'from-green-500 to-emerald-500';
    if (progress >= 50) return 'from-blue-500 to-indigo-500';
    if (progress >= 25) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };
  const handleAnnotationDragStart = (e, annotationId) => {
    e.preventDefault();
    setDraggingAnnotation(annotationId);
  };
  const handleAnnotationDrag = (e) => {
    if (draggingAnnotation === null || !imageContainerRef) return;
    const rect = imageContainerRef.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * 100;
    const y = (e.clientY - rect.top) / rect.height * 100;
    // Clamp values between 0 and 100
    const clampedX = Math.max(0, Math.min(100, x));
    const clampedY = Math.max(0, Math.min(100, y));
    setAnnotations((prev) =>
    prev.map((annotation) =>
    annotation.id === draggingAnnotation ?
    {
      ...annotation,
      x: clampedX,
      y: clampedY
    } :
    annotation
    )
    );
  };
  const handleAnnotationDragEnd = () => {
    setDraggingAnnotation(null);
  };
  const renderPatientSelection = () =>
  <div className="space-y-6">
      {/* Header */}
      <motion.div
      initial={{
        opacity: 0,
        y: -20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl p-6 text-white shadow-xl">

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

            <CameraIcon className="h-8 w-8 text-white" />
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold">
              Suivi d'évolution avec photos
            </h3>
            <p className="text-pink-100 text-sm mt-1">
              Suivez l'évolution du traitement grâce aux photos avant/après et
              aux analyses IA
            </p>
          </div>
        </div>
      </motion.div>
      {/* Patient Cards */}
      <div>
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
        className="mb-4">

          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
            <ActivityIcon className="h-5 w-5 text-purple-500 mr-2" />
            Sélectionner un patient
          </h3>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {patients.map((patient, index) =>
        <motion.div
          key={patient.id}
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.1 + index * 0.1
          }}
          whileHover={{
            scale: 1.02,
            y: -4
          }}
          whileTap={{
            scale: 0.98
          }}
          className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all shadow-lg border-2 ${selectedPatient === patient.id ? 'border-purple-500 shadow-2xl' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'}`}
          onClick={() => handlePatientSelect(patient.id)}>

              <div className="bg-transparent p-6">
                <div className="flex items-center mb-4">
                  <motion.div
                whileHover={{
                  rotate: 360
                }}
                transition={{
                  duration: 0.5
                }}
                className={`h-14 w-14 rounded-full bg-gradient-to-br ${getProgressColor(patient.progress)} flex items-center justify-center shadow-lg`}>

                    <span className="font-bold text-xl text-white">
                      {patient.name.
                  split(' ').
                  map((name) => name[0]).
                  join('')}
                    </span>
                  </motion.div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                      {patient.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      Début: {patient.startDate}
                    </p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-700 bg-opacity-20 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-200">
                      Progression
                    </span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {patient.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden">
                    <motion.div
                  initial={{
                    width: 0
                  }}
                  animate={{
                    width: `${patient.progress}%`
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.2 + index * 0.1
                  }}
                  className={`bg-gradient-to-r ${getProgressColor(patient.progress)} h-3 rounded-full shadow-lg`} />

                  </div>
                </div>
              </div>
            </motion.div>
        )}
        </div>
      </div>
    </div>;

  const renderTreatmentStages = () =>
  <div className="space-y-6">
      {/* Patient Header */}
      <motion.div
      initial={{
        opacity: 0,
        y: -20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-xl">

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <motion.div
            whileHover={{
              rotate: 360
            }}
            transition={{
              duration: 0.5
            }}
            className="h-14 w-14 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mr-4">

              <span className="font-bold text-xl text-white">
                {getPatientById(selectedPatient)?.
              name.split(' ').
              map((n) => n[0]).
              join('')}
              </span>
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold">
                {getPatientById(selectedPatient)?.name}
              </h3>
              <p className="text-purple-100 text-sm mt-1">
                Étapes du traitement
              </p>
            </div>
          </div>
          <motion.button
          whileHover={{
            scale: 1.05
          }}
          whileTap={{
            scale: 0.95
          }}
          onClick={() => {
            setSelectedPatient(null);
            setSelectedStage(null);
          }}
          className="px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg text-sm font-bold text-white hover:bg-opacity-30 transition-all">

            Changer de patient
          </motion.button>
        </div>
      </motion.div>
      {/* Treatment Stages */}
      <div className="space-y-4">
        {treatmentStages.map((stage, index) =>
      <motion.div
        key={stage.id}
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: 0.1 + index * 0.1
        }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-100 dark:border-gray-700 overflow-hidden">

            <motion.div
          whileHover={{
            backgroundColor: '#f9fafb'
          }}
          className={`p-6 cursor-pointer ${selectedStage === stage.id ? 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20' : ''}`}
          onClick={() => handleStageSelect(stage.id)}>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div
                className={`h-12 w-12 rounded-full ${selectedStage === stage.id ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'bg-gradient-to-br from-gray-400 to-gray-500'} flex items-center justify-center mr-4 shadow-md`}>

                    <LayersIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                      {stage.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center mt-1">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      {stage.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold mr-3 ${stage.photos.length > 0 ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>

                    <ImageIcon className="h-4 w-4 mr-1" />
                    {stage.photos.length} photo
                    {stage.photos.length !== 1 ? 's' : ''}
                  </span>
                  <motion.div
                animate={{
                  rotate: selectedStage === stage.id ? 180 : 0
                }}
                transition={{
                  duration: 0.3
                }}>

                    {selectedStage === stage.id ?
                <ChevronUpIcon className="h-6 w-6 text-purple-500 dark:text-purple-400" /> :

                <ChevronDownIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                }
                  </motion.div>
                </div>
              </div>
            </motion.div>
            <AnimatePresence>
              {selectedStage === stage.id &&
          <motion.div
            initial={{
              height: 0,
              opacity: 0
            }}
            animate={{
              height: 'auto',
              opacity: 1
            }}
            exit={{
              height: 0,
              opacity: 0
            }}
            transition={{
              duration: 0.3
            }}
            className="border-t-2 border-gray-100 dark:border-gray-700">

                  <div className="p-6 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-purple-900/20">
                    {stage.photos.length > 0 ?
              <div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                          {stage.photos.map((photo, photoIndex) =>
                  <motion.div
                    key={photo.id}
                    initial={{
                      opacity: 0,
                      scale: 0.8
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1
                    }}
                    transition={{
                      delay: photoIndex * 0.1
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -4
                    }}
                    className="relative group rounded-xl overflow-hidden shadow-lg">

                              <div className="aspect-w-4 aspect-h-3">
                                <img
                        src={photo.url}
                        alt={`${stage.name} - ${photo.type}`}
                        className="w-full h-48 object-cover" />

                              </div>
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3">
                                <motion.button
                        whileHover={{
                          scale: 1.1
                        }}
                        whileTap={{
                          scale: 0.9
                        }}
                        className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}>

                                  <ZoomInIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                </motion.button>
                              </div>
                              <div className="absolute top-2 left-2">
                                <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-bold bg-white bg-opacity-90 backdrop-blur-sm text-purple-600 shadow-md">
                                  {photo.type}
                                </span>
                              </div>
                            </motion.div>
                  )}
                        </div>
                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                          <motion.button
                    whileHover={{
                      scale: 1.02
                    }}
                    whileTap={{
                      scale: 0.98
                    }}
                    onClick={() => setShowUploader(true)}
                    className="inline-flex items-center px-4 py-2 border-2 border-transparent text-sm font-bold rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all">

                            <PlusIcon className="h-4 w-4 mr-2" />
                            Ajouter des photos
                          </motion.button>
                          <motion.button
                    whileHover={{
                      scale: 1.02
                    }}
                    whileTap={{
                      scale: 0.98
                    }}
                    onClick={() => setShowComparison(true)}
                    className="inline-flex items-center px-4 py-2 border-2 border-purple-300 dark:border-purple-700 text-sm font-bold rounded-lg shadow-sm text-purple-700 dark:text-purple-300 bg-white dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all">

                            <BarChart2Icon className="h-4 w-4 mr-2" />
                            Analyser les changements
                          </motion.button>
                          <motion.button
                    whileHover={{
                      scale: 1.02
                    }}
                    whileTap={{
                      scale: 0.98
                    }}
                    onClick={() => setIsAnnotating(true)}
                    className="inline-flex items-center px-4 py-2 border-2 border-pink-300 dark:border-pink-700 text-sm font-bold rounded-lg shadow-sm text-pink-700 dark:text-pink-300 bg-white dark:bg-gray-800 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all">

                            <EditIcon className="h-4 w-4 mr-2" />
                            Annoter
                          </motion.button>
                        </div>
                      </div> :

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                className="flex flex-col items-center justify-center py-12 bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">

                        <motion.div
                  animate={{
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                  className="h-20 w-20 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center mb-4">

                          <CameraIcon className="h-10 w-10 text-purple-500" />
                        </motion.div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          Aucune photo pour cette étape
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                          Commencez par ajouter des photos de cette étape
                        </p>
                        <motion.button
                  whileHover={{
                    scale: 1.05
                  }}
                  whileTap={{
                    scale: 0.95
                  }}
                  onClick={() => setShowUploader(true)}
                  className="inline-flex items-center px-6 py-3 border-2 border-transparent text-sm font-bold rounded-lg shadow-lg text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all">

                          <UploadIcon className="h-5 w-5 mr-2" />
                          Ajouter des photos
                        </motion.button>
                      </motion.div>
              }
                  </div>
                </motion.div>
          }
            </AnimatePresence>
          </motion.div>
      )}
      </div>
    </div>;

  const renderPhotoUploader = () =>
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
    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

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
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">

        <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-2xl">
          <div>
            <h3 className="text-sm font-semibold text-red-800">Ajouter des photos</h3>
            <p className="text-xs text-red-600 mt-0.5">Téléversement de photos de suivi</p>
          </div>
          <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowUploader(false)}
          className="rounded-md p-1 text-red-600 hover:bg-red-100"
          aria-label="Fermer">
            <XIcon className="h-4 w-4" />
          </motion.button>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
              Type de photo
            </label>
            <select className="block w-full pl-4 pr-10 py-3 text-base border-2 border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm transition-all">
              <option>Frontal</option>
              <option>Latéral droit</option>
              <option>Latéral gauche</option>
              <option>Occlusal supérieur</option>
              <option>Occlusal inférieur</option>
            </select>
          </div>
          <PhotoUploader onUpload={handlePhotoUpload} />
          <div className="mt-6 flex justify-end space-x-3">
            <motion.button
            whileHover={{
              scale: 1.02
            }}
            whileTap={{
              scale: 0.98
            }}
            onClick={() => setShowUploader(false)}
            className="px-5 py-2.5 border-2 border-gray-300 dark:border-gray-600 text-sm font-bold rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">

              Annuler
            </motion.button>
            <motion.button
            whileHover={{
              scale: 1.02
            }}
            whileTap={{
              scale: 0.98
            }}
            onClick={() => {
              setShowUploader(false);
            }}
            className="px-5 py-2.5 border-2 border-transparent text-sm font-bold rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all">

              Téléverser
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>;

  const renderPhotoComparison = () =>
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
    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

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
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">

        <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-2xl flex-shrink-0">
          <div>
            <h3 className="text-sm font-semibold text-red-800">Analyse des changements</h3>
            <p className="text-xs text-red-600 mt-0.5">Comparaison des photos de suivi</p>
          </div>
          <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowComparison(false)}
          className="rounded-md p-1 text-red-600 hover:bg-red-100"
          aria-label="Fermer">
            <XIcon className="h-4 w-4" />
          </motion.button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          <PhotoComparison />
          <div className="mt-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border-2 border-purple-100 dark:border-purple-800">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <TrendingUpIcon className="h-5 w-5 text-purple-500 mr-2" />
              Changements détectés par l'IA
            </h4>
            <div className="space-y-3">
              {detectedChanges.map((change, index) =>
            <motion.div
              key={change.id}
              initial={{
                opacity: 0,
                x: -20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                delay: index * 0.1
              }}
              className={`p-4 rounded-xl border-2 ${change.severity === 'positive' ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : change.severity === 'negative' ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'} shadow-sm`}>

                  <div className="flex justify-between items-center">
                    <p
                  className={`text-sm font-medium ${change.severity === 'positive' ? 'text-green-800 dark:text-green-300' : change.severity === 'negative' ? 'text-red-800 dark:text-red-300' : 'text-gray-800 dark:text-gray-300'}`}>

                      {change.description}
                    </p>
                    <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${change.severity === 'positive' ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300' : change.severity === 'negative' ? 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'}`}>

                      {change.percentage}%
                    </span>
                  </div>
                </motion.div>
            )}
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <motion.button
            whileHover={{
              scale: 1.02
            }}
            whileTap={{
              scale: 0.98
            }}
            onClick={() => setShowComparison(false)}
            className="px-6 py-3 border-2 border-transparent text-sm font-bold rounded-lg shadow-sm text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all">

              Fermer
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>;

  const renderAnnotationMode = () =>
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
    onMouseMove={handleAnnotationDrag}
    onMouseUp={handleAnnotationDragEnd}>

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
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden">

        <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-2xl">
          <div>
            <h3 className="text-sm font-semibold text-red-800">Annoter les images</h3>
            <p className="text-xs text-red-600 mt-0.5">Ajoutez des annotations sur les photos de suivi</p>
          </div>
          <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsAnnotating(false)}
          className="rounded-md p-1 text-red-600 hover:bg-red-100"
          aria-label="Fermer">
            <XIcon className="h-4 w-4" />
          </motion.button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div
              ref={(ref) => setImageContainerRef(ref)}
              className="relative border-2 border-pink-200 dark:border-pink-800 rounded-xl bg-gradient-to-br from-gray-50 to-pink-50 dark:from-gray-700 to-pink-900 overflow-hidden shadow-lg cursor-crosshair"
              style={{
                height: '300px'
              }}>

                <img
                src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                alt="Photo à annoter"
                className="w-full h-full object-contain pointer-events-none" />

                {annotations.map((annotation) =>
              <motion.div
                key={annotation.id}
                initial={{
                  scale: 0
                }}
                animate={{
                  scale: draggingAnnotation === annotation.id ? 1.2 : 1
                }}
                className={`absolute bg-gradient-to-br from-pink-500 to-rose-500 text-white text-xs rounded-full w-8 h-8 flex items-center justify-center shadow-lg font-bold ring-4 ring-white hover:scale-110 transition-transform ${draggingAnnotation === annotation.id ? 'cursor-grabbing z-50' : 'cursor-grab'}`}
                style={{
                  left: `${annotation.x}%`,
                  top: `${annotation.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                title={annotation.text}
                onMouseDown={(e) =>
                handleAnnotationDragStart(e, annotation.id)
                }>

                    {annotation.id}
                  </motion.div>
              )}
              </div>
              <p className="mt-3 text-xs text-center text-gray-600 dark:text-gray-400 font-medium">
                Glissez-déposez les numéros pour les repositionner
              </p>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 rounded-xl p-4 border-2 border-pink-100 dark:border-pink-800">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Annotations
              </h4>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                  Nouvelle annotation
                </label>
                <div className="flex">
                  <input
                  type="text"
                  value={currentAnnotation}
                  onChange={(e) => setCurrentAnnotation(e.target.value)}
                  className="flex-1 px-4 py-2 border-2 border-pink-200 dark:border-pink-800 focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:border-pink-500 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Entrez votre commentaire..." />

                  <motion.button
                  whileHover={{
                    scale: 1.1
                  }}
                  whileTap={{
                    scale: 0.9
                  }}
                  onClick={handleAddAnnotation}
                  className="ml-2 px-4 py-2 border-2 border-transparent font-bold rounded-lg shadow-sm text-white bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 transition-all">

                    <PlusIcon className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {annotations.length === 0 ?
              <div className="text-center py-8">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Aucune annotation pour le moment
                    </p>
                  </div> :

              annotations.map((annotation, index) =>
              <motion.div
                key={annotation.id}
                initial={{
                  opacity: 0,
                  x: -20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  delay: index * 0.1
                }}
                className="flex items-start p-3 bg-white dark:bg-gray-700 rounded-lg border-2 border-pink-200 dark:border-pink-800 shadow-sm">

                      <div className="bg-gradient-to-br from-pink-500 to-rose-500 text-white text-xs rounded-full w-6 h-6 flex-shrink-0 flex items-center justify-center mr-3 font-bold shadow-md">
                        {annotation.id}
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 flex-1 font-medium">
                        {annotation.text}
                      </p>
                      <motion.button
                  whileHover={{
                    scale: 1.1
                  }}
                  whileTap={{
                    scale: 0.9
                  }}
                  className="text-red-500 hover:text-red-700 ml-2"
                  onClick={() =>
                  setAnnotations((prev) =>
                  prev.filter((a) => a.id !== annotation.id)
                  )
                  }>

                        <XIcon className="h-4 w-4" />
                      </motion.button>
                    </motion.div>
              )
              }
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <motion.button
            whileHover={{
              scale: 1.02
            }}
            whileTap={{
              scale: 0.98
            }}
            onClick={() => setIsAnnotating(false)}
            className="px-5 py-2.5 border-2 border-gray-300 dark:border-gray-600 text-sm font-bold rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">

              Annuler
            </motion.button>
            <motion.button
            whileHover={{
              scale: 1.02
            }}
            whileTap={{
              scale: 0.98
            }}
            onClick={handleSaveAnnotations}
            className="inline-flex items-center px-5 py-2.5 border-2 border-transparent text-sm font-bold rounded-lg shadow-sm text-white bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 transition-all">

              <SaveIcon className="h-4 w-4 mr-2" />
              Enregistrer les annotations
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>;

  return (
    <div>
      {!selectedPatient && renderPatientSelection()}
      {selectedPatient && renderTreatmentStages()}
      <AnimatePresence>
        {showUploader && renderPhotoUploader()}
        {showComparison && renderPhotoComparison()}
        {isAnnotating && renderAnnotationMode()}
      </AnimatePresence>
    </div>);

};
export default EvolutionTracking;