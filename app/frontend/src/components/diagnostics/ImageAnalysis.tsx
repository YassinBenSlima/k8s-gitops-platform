import React, { useState } from 'react';
import {
  UploadIcon,
  CheckIcon,
  XIcon,
  EditIcon,
  SaveIcon,
  DownloadIcon,
  SparklesIcon,
  ZapIcon,
  ScanIcon,
  AlertTriangleIcon,
  FileImageIcon,
  UserIcon,
  ImageIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  EyeIcon,
  LayersIcon,
  XCircleIcon } from
'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageUploader from './common/ImageUploader';
interface UploadedImage {
  file: File;
  type: string;
  preview: string;
}
interface ImageAnalysisProps {
  selectedPatient?: string | null;
}
const ImageAnalysis: React.FC<ImageAnalysisProps> = ({ selectedPatient }) => {
  const [analysisStage, setAnalysisStage] = useState('upload');
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [annotations, setAnnotations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const patients = [
  {
    id: '1',
    name: 'Sophie Martin'
  },
  {
    id: '2',
    name: 'Thomas Bernard'
  },
  {
    id: '3',
    name: 'Emma Petit'
  },
  {
    id: '4',
    name: 'Lucas Dubois'
  }];

  const imageTypes = [
  {
    id: 'panoramic',
    name: 'Radiographie panoramique',
    color: 'blue'
  },
  {
    id: 'lateral',
    name: 'Téléradiographie latérale',
    color: 'purple'
  },
  {
    id: 'frontal',
    name: 'Téléradiographie frontale',
    color: 'green'
  },
  {
    id: 'intraoral',
    name: 'Photo intra-orale',
    color: 'amber'
  },
  {
    id: 'extraoral',
    name: 'Photo extra-orale',
    color: 'pink'
  },
  {
    id: 'scan3d',
    name: 'Scan 3D',
    color: 'indigo'
  },
  {
    id: 'other',
    name: 'Autre',
    color: 'gray'
  }];

  const mockFindings = [
  {
    id: 1,
    type: 'Dent incluse',
    location: 'Canine supérieure droite',
    severity: 'Élevée',
    x: 65,
    y: 45,
    description:
    'La canine supérieure droite est incluse en position palatine',
    confidence: 95,
    detectedIn: 'Radiographie panoramique'
  },
  {
    id: 2,
    type: 'Chevauchement',
    location: 'Incisives inférieures',
    severity: 'Moyenne',
    x: 50,
    y: 70,
    description: 'Chevauchement modéré des incisives inférieures centrales',
    confidence: 88,
    detectedIn: 'Photo intra-orale'
  },
  {
    id: 3,
    type: 'Diastème',
    location: 'Incisives centrales supérieures',
    severity: 'Faible',
    x: 50,
    y: 40,
    description: 'Espace de 2mm entre les incisives centrales supérieures',
    confidence: 92,
    detectedIn: 'Photo intra-orale'
  },
  {
    id: 4,
    type: 'Profil convexe',
    location: 'Profil facial',
    severity: 'Moyenne',
    x: 45,
    y: 50,
    description: 'Convexité faciale modérée détectée',
    confidence: 90,
    detectedIn: 'Téléradiographie latérale'
  }];

  const handleImageUpload = (files: FileList, type: string) => {
    const newImages = Array.from(files).map((file) => ({
      file,
      type,
      preview: URL.createObjectURL(file)
    }));
    setUploadedImages((prev) => [...prev, ...newImages]);
  };
  const handleRemoveImage = (index: number) => {
    setUploadedImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };
  const handleChangeImageType = (index: number, newType: string) => {
    setUploadedImages((prev) => {
      const newImages = [...prev];
      newImages[index] = {
        ...newImages[index],
        type: newType
      };
      return newImages;
    });
  };
  const handleAnalyze = () => {
    setAnalysisStage('analyzing');
    setTimeout(() => {
      setAnalysisStage('results');
      setAnnotations(mockFindings);
    }, 2000);
  };
  const handleSaveAnalysis = () => {
    setIsEditing(false);
    alert('Analyse sauvegardée dans le dossier patient');
  };
  const handleAddObservation = () => {
    const newObservation = {
      id: annotations.length + 1,
      type: 'Nouvelle observation',
      location: 'À définir',
      severity: 'Moyenne',
      x: 50,
      y: 50,
      description: 'Description à compléter',
      confidence: 85
    };
    setAnnotations([...annotations, newObservation]);
  };
  const handleRemoveObservation = (id) => {
    setAnnotations(annotations.filter((annotation) => annotation.id !== id));
  };
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Élevée':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          border: 'border-red-500',
          gradient: 'from-red-50 to-orange-50'
        };
      case 'Moyenne':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          border: 'border-yellow-500',
          gradient: 'from-yellow-50 to-amber-50'
        };
      case 'Faible':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-800',
          border: 'border-blue-500',
          gradient: 'from-blue-50 to-cyan-50'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-500',
          gradient: 'from-gray-50 to-slate-50'
        };
    }
  };
  const getImageTypeColor = (type: string) => {
    const imageType = imageTypes.find((t) => t.id === type);
    return imageType?.color || 'gray';
  };
  const getImageTypeName = (type: string) => {
    const imageType = imageTypes.find((t) => t.id === type);
    return imageType?.name || type;
  };
  const renderUploadStage = () =>
  <div className="space-y-6">
      {/* Patient Required Message */}
      {!selectedPatient &&
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border-2 border-amber-200 dark:border-amber-800">

          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-amber-500 flex items-center justify-center mr-3">
              <UserIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Sélectionnez un patient
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Veuillez sélectionner un patient dans le menu déroulant
                ci-dessus pour commencer l'analyse
              </p>
            </div>
          </div>
        </motion.div>
    }

      {/* Upload Section - Only show if patient is selected */}
      {selectedPatient &&
    <>
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
        className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border-2 border-purple-100 dark:border-gray-600 shadow-lg">

            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center mr-3">
                <LayersIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Téléverser les images diagnostiques
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Ajoutez plusieurs images de différents types pour une analyse
                  complète
                </p>
              </div>
            </div>
            <ImageUploader
          onUpload={handleImageUpload}
          imageTypes={imageTypes}
          multiple={true} />


            {/* Uploaded Images Grid */}
            <AnimatePresence>
              {uploadedImages.length > 0 &&
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -20
            }}
            className="mt-6">

                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                      Images téléversées ({uploadedImages.length})
                    </h4>
                    <button
                onClick={() => setUploadedImages([])}
                className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium">

                      Tout supprimer
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {uploadedImages.map((image, index) =>
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  scale: 0.9
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9
                }}
                transition={{
                  delay: index * 0.05
                }}
                className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden border-2 border-purple-200 dark:border-gray-600 shadow-md">

                        <div className="relative aspect-video bg-gray-100 dark:bg-gray-600">
                          <img
                    src={image.preview}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover" />

                          <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors shadow-lg">

                            <XCircleIcon className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="p-3">
                          <select
                    value={image.type}
                    onChange={(e) =>
                    handleChangeImageType(index, e.target.value)
                    }
                    className={`block w-full text-sm border-2 rounded-lg py-2 px-3 bg-${getImageTypeColor(image.type)}-50 dark:bg-gray-600 border-${getImageTypeColor(image.type)}-200 dark:border-gray-500 text-gray-900 dark:text-white focus:ring-2 focus:ring-${getImageTypeColor(image.type)}-500 transition-all`}>

                            {imageTypes.map((type) =>
                    <option key={type.id} value={type.id}>
                                {type.name}
                              </option>
                    )}
                          </select>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 truncate">
                            {image.file.name}
                          </p>
                        </div>
                      </motion.div>
              )}
                  </div>
                </motion.div>
          }
            </AnimatePresence>

            {/* Action Button */}
            {uploadedImages.length > 0 &&
        <motion.div
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          className="mt-6">

                <button
            onClick={handleAnalyze}
            className="w-full inline-flex items-center justify-center px-6 py-4 border-2 border-transparent text-base font-bold rounded-xl shadow-lg text-white bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-700 hover:from-purple-700 hover:to-indigo-700 dark:hover:from-purple-800 dark:hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all">

                  <ZapIcon className="h-5 w-5 mr-2" />
                  Analyser toutes les images ({uploadedImages.length})
                </button>
              </motion.div>
        }

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-white dark:bg-gray-700 rounded-lg p-3 border border-purple-200 dark:border-gray-600">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  Formats acceptés
                </p>
                <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">
                  JPEG, PNG, DICOM
                </p>
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-lg p-3 border border-purple-200 dark:border-gray-600">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  Taille maximale
                </p>
                <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">
                  20MB par image
                </p>
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-lg p-3 border border-purple-200 dark:border-gray-600">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  Images multiples
                </p>
                <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">
                  Analyse combinée
                </p>
              </div>
            </div>
          </motion.div>

          {/* Info Section */}
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
        className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border-2 border-green-100 dark:border-gray-600 shadow-lg">

            <div className="flex items-start">
              <div className="h-10 w-10 rounded-full bg-green-500 dark:bg-green-600 flex items-center justify-center mr-3 flex-shrink-0">
                <SparklesIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                  Analyse multi-images par IA
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  Notre système d'IA analyse simultanément toutes vos images
                  (panoramiques, latérales, frontales, photos intra-orales,
                  etc.) pour fournir un diagnostic complet et précis. Plus vous
                  fournissez d'images de types différents, plus l'analyse sera
                  détaillée.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-3 border border-green-200 dark:border-gray-600">
                    <div className="flex items-center mb-1">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        Précision
                      </span>
                    </div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      95%+
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-3 border border-green-200 dark:border-gray-600">
                    <div className="flex items-center mb-1">
                      <ZapIcon className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        Vitesse
                      </span>
                    </div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {'<10s'}
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-3 border border-green-200 dark:border-gray-600">
                    <div className="flex items-center mb-1">
                      <LayersIcon className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        Types d'images
                      </span>
                    </div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      7 types
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
    }
    </div>;

  const renderAnalyzingStage = () =>
  <motion.div
    initial={{
      opacity: 0,
      scale: 0.9
    }}
    animate={{
      opacity: 1,
      scale: 1
    }}
    className="flex flex-col items-center justify-center py-16">

      <div className="relative">
        <motion.div
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear'
        }}
        className="w-24 h-24 border-8 border-blue-200 border-t-blue-600 rounded-full" />

        <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.8, 1]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity
        }}
        className="absolute inset-0 flex items-center justify-center">

          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <ScanIcon className="h-8 w-8 text-white" />
          </div>
        </motion.div>
      </div>
      <motion.div
      initial={{
        opacity: 0,
        y: 10
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        delay: 0.2
      }}
      className="mt-8 text-center">

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Analyse en cours...
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          L'IA analyse vos {uploadedImages.length} images simultanément
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
          {uploadedImages.map((img) => getImageTypeName(img.type)).join(', ')}
        </p>
        <div className="flex items-center justify-center space-x-2">
          <motion.div
          animate={{
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: 0
          }}
          className="h-2 w-2 rounded-full bg-blue-500" />

          <motion.div
          animate={{
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: 0.2
          }}
          className="h-2 w-2 rounded-full bg-indigo-500" />

          <motion.div
          animate={{
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: 0.4
          }}
          className="h-2 w-2 rounded-full bg-purple-500" />

        </div>
      </motion.div>
    </motion.div>;

  const renderResultsStage = () =>
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
      className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white shadow-xl">

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
              <CheckCircleIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold dark:text-white">
                Résultats de l'analyse multi-images
              </h3>
              <p className="text-green-100 dark:text-green-200 text-sm mt-1">
                {annotations.length} observations détectées à partir de{' '}
                {uploadedImages.length} images
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            {!isEditing ?
          <motion.button
            whileHover={{
              scale: 1.05
            }}
            whileTap={{
              scale: 0.95
            }}
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center px-4 py-2 border-2 border-white rounded-xl text-sm font-bold text-white hover:bg-white hover:text-green-600 transition-all">

                <EditIcon className="h-4 w-4 mr-2" />
                Modifier
              </motion.button> :

          <motion.button
            whileHover={{
              scale: 1.05
            }}
            whileTap={{
              scale: 0.95
            }}
            onClick={handleSaveAnalysis}
            className="inline-flex items-center px-4 py-2 bg-white rounded-xl text-sm font-bold text-green-600 shadow-lg hover:shadow-xl transition-all">

                <SaveIcon className="h-4 w-4 mr-2" />
                Enregistrer
              </motion.button>
          }
            <motion.button
            whileHover={{
              scale: 1.05
            }}
            whileTap={{
              scale: 0.95
            }}
            className="inline-flex items-center px-4 py-2 border-2 border-white rounded-xl text-sm font-bold text-white hover:bg-white hover:text-green-600 transition-all">

              <DownloadIcon className="h-4 w-4 mr-2" />
              Télécharger
            </motion.button>
          </div>
        </div>
      </motion.div>
      {/* Images Analyzed Summary */}
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
      className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border-2 border-indigo-100 dark:border-gray-600 shadow-lg">

        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center mr-3">
            <LayersIcon className="h-5 w-5 text-white" />
          </div>
          <h4 className="font-bold text-gray-900 dark:text-white">
            Images analysées ({uploadedImages.length})
          </h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {uploadedImages.map((image, index) =>
        <div
          key={index}
          className={`bg-white dark:bg-gray-700 rounded-lg p-3 border-2 border-${getImageTypeColor(image.type)}-200 dark:border-gray-600`}>

              <div className="aspect-video bg-gray-100 dark:bg-gray-600 rounded-lg overflow-hidden mb-2">
                <img
              src={image.preview}
              alt={getImageTypeName(image.type)}
              className="w-full h-full object-cover" />

              </div>
              <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
                {getImageTypeName(image.type)}
              </p>
            </div>
        )}
        </div>
      </motion.div>
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image with annotations */}
        <motion.div
        initial={{
          opacity: 0,
          x: -20
        }}
        animate={{
          opacity: 1,
          x: 0
        }}
        transition={{
          delay: 0.1
        }}
        className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border-2 border-gray-100 dark:border-gray-600 shadow-lg">

          <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <FileImageIcon className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
            Image radiographique annotée
          </h4>
          <div
          className="relative border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 overflow-hidden shadow-inner"
          style={{
            height: '400px'
          }}>

            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
              <span className="text-gray-400 dark:text-gray-500 font-medium">
                Image radiographique
              </span>
            </div>
            {annotations.map((annotation, index) =>
          <motion.div
            key={annotation.id}
            initial={{
              scale: 0,
              opacity: 0
            }}
            animate={{
              scale: 1,
              opacity: 1
            }}
            transition={{
              delay: 0.2 + index * 0.1
            }}
            className={`absolute w-8 h-8 rounded-full flex items-center justify-center -ml-4 -mt-4 cursor-pointer shadow-lg ${annotation.severity === 'Élevée' ? 'bg-red-500' : annotation.severity === 'Moyenne' ? 'bg-yellow-500' : 'bg-blue-500'} text-white font-bold ring-4 ring-white hover:scale-110 transition-transform`}
            style={{
              left: `${annotation.x}%`,
              top: `${annotation.y}%`
            }}>

                {annotation.id}
              </motion.div>
          )}
          </div>
          <p className="mt-3 text-xs text-center text-gray-500 dark:text-gray-400">
            Cliquez sur les marqueurs pour voir les détails
          </p>
        </motion.div>
        {/* Observations */}
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
          delay: 0.1
        }}
        className="space-y-4">

          <h4 className="font-bold text-gray-900 dark:text-white flex items-center">
            <AlertTriangleIcon className="h-5 w-5 mr-2 text-amber-500 dark:text-amber-400" />
            Observations détectées
          </h4>
          <div className="space-y-3">
            {annotations.map((annotation, index) => {
            const colors = getSeverityColor(annotation.severity);
            return (
              <motion.div
                key={annotation.id}
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: 0.2 + index * 0.1
                }}
                className={`bg-gradient-to-br ${colors.gradient} dark:from-gray-800 dark:to-gray-700 border-l-4 ${colors.border} dark:border-gray-600 rounded-xl overflow-hidden shadow-md`}>

                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center ${annotation.severity === 'Élevée' ? 'bg-red-500' : annotation.severity === 'Moyenne' ? 'bg-yellow-500' : 'bg-blue-500'} text-white font-bold mr-3`}>

                          {annotation.id}
                        </div>
                        <div>
                          <h5 className="font-bold text-gray-900 dark:text-white">
                            {annotation.type}
                          </h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {annotation.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {isEditing ?
                      <>
                            <motion.button
                          whileHover={{
                            scale: 1.1
                          }}
                          whileTap={{
                            scale: 0.9
                          }}
                          className="p-1.5 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">

                              <CheckIcon className="h-4 w-4" />
                            </motion.button>
                            <motion.button
                          whileHover={{
                            scale: 1.1
                          }}
                          whileTap={{
                            scale: 0.9
                          }}
                          onClick={() =>
                          handleRemoveObservation(annotation.id)
                          }
                          className="p-1.5 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">

                              <XIcon className="h-4 w-4" />
                            </motion.button>
                          </> :

                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${colors.bg} ${colors.text}`}>

                            {annotation.severity}
                          </span>
                      }
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      {annotation.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-xs text-gray-600 dark:text-gray-400 mr-2">
                          Confiance:
                        </span>
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                            <motion.div
                            initial={{
                              width: 0
                            }}
                            animate={{
                              width: `${annotation.confidence}%`
                            }}
                            transition={{
                              duration: 1,
                              delay: 0.3 + index * 0.1
                            }}
                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" />

                          </div>
                          <span className="text-xs font-bold text-gray-900 dark:text-white">
                            {annotation.confidence}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>);

          })}
          </div>
          {isEditing &&
        <motion.button
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          whileHover={{
            scale: 1.02
          }}
          whileTap={{
            scale: 0.98
          }}
          onClick={handleAddObservation}
          className="w-full inline-flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all">

              <UploadIcon className="h-4 w-4 mr-2" />
              Ajouter une observation
            </motion.button>
        }
        </motion.div>
      </div>
      {/* Summary */}
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
      className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border-2 border-blue-100 dark:border-gray-600 shadow-lg">

        <div className="flex items-start">
          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center mr-4 flex-shrink-0">
            <SparklesIcon className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">
              Résumé de l'analyse
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              L'analyse a détecté {annotations.length} observations principales
              nécessitant votre attention. La canine supérieure droite incluse
              présente une priorité élevée de traitement. Les chevauchements
              d'incisives inférieures suggèrent un besoin d'alignement.
            </p>
          </div>
        </div>
      </motion.div>
      {/* Actions */}
      <div className="flex justify-between items-center">
        <motion.button
        whileHover={{
          scale: 1.02
        }}
        whileTap={{
          scale: 0.98
        }}
        onClick={() => setAnalysisStage('upload')}
        className="inline-flex items-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all shadow-md">

          <ArrowRightIcon className="h-4 w-4 mr-2 rotate-180" />
          Nouvelle analyse
        </motion.button>
        <motion.button
        whileHover={{
          scale: 1.02
        }}
        whileTap={{
          scale: 0.98
        }}
        className="inline-flex items-center px-6 py-3 border-2 border-transparent rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg">

          <SaveIcon className="h-4 w-4 mr-2" />
          Enregistrer dans le dossier
        </motion.button>
      </div>
    </div>;

  return (
    <div>
      {analysisStage === 'upload' && renderUploadStage()}
      {analysisStage === 'analyzing' && renderAnalyzingStage()}
      {analysisStage === 'results' && renderResultsStage()}
    </div>);

};
export default ImageAnalysis;