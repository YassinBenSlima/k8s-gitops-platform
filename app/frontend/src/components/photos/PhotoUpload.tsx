import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeftIcon,
  UploadIcon,
  ImageIcon,
  XIcon,
  SaveIcon,
  CameraIcon,
  CheckCircleIcon,
  SparklesIcon,
  FolderIcon,
  CalendarIcon,
  ZapIcon } from
'lucide-react';
const PhotoUpload = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: 'treatment_progress',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const photoCategories = [
  {
    id: 'treatment_progress',
    name: 'Progression du traitement',
    color: 'blue'
  },
  {
    id: 'initial_state',
    name: 'État initial',
    color: 'green'
  },
  {
    id: 'final_state',
    name: 'État final',
    color: 'purple'
  },
  {
    id: 'intraoral',
    name: 'Photos intra-orales',
    color: 'amber'
  },
  {
    id: 'extraoral',
    name: 'Photos extra-orales',
    color: 'pink'
  },
  {
    id: 'other',
    name: 'Autre',
    color: 'gray'
  }];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...newFiles]);
    }
  };
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith('image/')
      );
      setSelectedFiles((prev) => [...prev, ...newFiles]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      alert('Veuillez sélectionner au moins une photo');
      return;
    }
    if (!formData.title) {
      alert('Veuillez saisir un titre pour les photos');
      return;
    }
    console.log('Photo data:', formData);
    console.log('Files:', selectedFiles);
    alert('Photos ajoutées avec succès');
    navigate(`/patients/${patientId}`);
  };
  const handleBack = () => {
    navigate(`/patients/${patientId}`);
  };
  const handleRemoveFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };
  const renderImagePreview = (file) => {
    const url = URL.createObjectURL(file);
    return (
      <img
        src={url}
        alt="Preview"
        className="h-full w-full object-cover"
        onLoad={() => URL.revokeObjectURL(url)} />);


  };
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  return (
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
        className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl p-6 text-white shadow-xl">

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <motion.button
              whileHover={{
                scale: 1.1,
                x: -5
              }}
              whileTap={{
                scale: 0.9
              }}
              onClick={handleBack}
              className="mr-4 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all">

              <ArrowLeftIcon className="h-5 w-5 text-white" />
            </motion.button>
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="h-14 w-14 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mr-4">

              <CameraIcon className="h-8 w-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold">Ajouter des photos</h1>
              <p className="text-green-100 text-sm mt-1">
                Téléversez de nouvelles photos au dossier patient
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              type="button"
              onClick={handleBack}
              className="inline-flex items-center px-6 py-3 bg-white bg-opacity-20 backdrop-blur-sm text-white rounded-xl font-semibold shadow-lg hover:bg-opacity-30 transition-all">

              <XIcon className="h-5 w-5 mr-2" />
              Annuler
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center px-6 py-3 bg-white text-green-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">

              <SaveIcon className="h-5 w-5 mr-2" />
              Enregistrer
            </motion.button>
          </div>
        </div>
      </motion.div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Photo Upload Section */}
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
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg border-2 border-green-100 overflow-hidden">

          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-xl bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mr-4">
                <ImageIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Téléversement des photos</h3>
                <p className="text-green-100 text-sm mt-1">
                  Glissez-déposez ou cliquez pour sélectionner plusieurs photos
                </p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <motion.div
              animate={{
                scale: dragActive ? 1.02 : 1
              }}
              className={`relative border-3 border-dashed rounded-2xl p-12 transition-all ${dragActive ? 'border-green-400 bg-green-100' : 'border-green-200 bg-white'}`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}>

              <div className="text-center">
                <motion.div
                  animate={{
                    y: dragActive ? -10 : 0,
                    rotate: dragActive ? 10 : 0
                  }}
                  className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4">

                  <CameraIcon className="h-10 w-10 text-white" />
                </motion.div>
                <div className="flex text-sm text-gray-600 justify-center">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-xl px-4 py-2 font-semibold text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500 transition-all">

                    <span>Télécharger des photos</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      className="sr-only"
                      onChange={handleFileChange} />

                  </label>
                  <p className="pl-2 self-center">ou glisser-déposer</p>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  PNG, JPG, HEIC jusqu'à 10MB chacune
                </p>
              </div>
            </motion.div>
            {selectedFiles.length > 0 &&
            <motion.div
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              className="mt-6">

                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-gray-700 flex items-center">
                    <ZapIcon className="h-5 w-5 text-green-500 mr-2" />
                    Photos sélectionnées ({selectedFiles.length})
                  </h4>
                  <span className="text-xs text-gray-500">
                    {selectedFiles.reduce((acc, file) => acc + file.size, 0) /
                  1024 /
                  1024 <
                  1 ?
                  `${(selectedFiles.reduce((acc, file) => acc + file.size, 0) / 1024).toFixed(2)} KB` :
                  `${(selectedFiles.reduce((acc, file) => acc + file.size, 0) / 1024 / 1024).toFixed(2)} MB`}{' '}
                    total
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  <AnimatePresence>
                    {selectedFiles.map((file, index) =>
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      scale: 0.8
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.8
                    }}
                    transition={{
                      delay: index * 0.05
                    }}
                    className="relative group">

                        <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-md">
                          {renderImagePreview(file)}
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity rounded-xl flex items-center justify-center">
                          <motion.button
                        initial={{
                          opacity: 0,
                          scale: 0.5
                        }}
                        whileHover={{
                          opacity: 1,
                          scale: 1
                        }}
                        whileTap={{
                          scale: 0.9
                        }}
                        type="button"
                        className="opacity-0 group-hover:opacity-100 p-2 bg-red-500 rounded-full text-white shadow-lg transition-all"
                        onClick={() => handleRemoveFile(index)}>

                            <XIcon className="h-4 w-4" />
                          </motion.button>
                        </div>
                        <div className="mt-2">
                          <p className="text-xs text-gray-700 truncate font-medium">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                        <div className="absolute top-2 right-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 shadow-sm">
                            <CheckCircleIcon className="h-3 w-3 mr-1" />
                            Prêt
                          </span>
                        </div>
                      </motion.div>
                  )}
                  </AnimatePresence>
                </div>
              </motion.div>
            }
          </div>
        </motion.div>
        {/* Photo Details Section */}
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
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border-2 border-blue-100 overflow-hidden">

          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 text-white">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-xl bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mr-4">
                <FolderIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Détails des photos</h3>
                <p className="text-blue-100 text-sm mt-1">
                  Informations et classification
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-bold text-gray-700 mb-2">

                  Titre des photos <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-2 border-gray-200 rounded-xl py-3 px-4 transition-all"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ex: Photos progression mois 6"
                  required />

              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-bold text-gray-700 mb-2">

                  Catégorie
                </label>
                <select
                  id="category"
                  name="category"
                  className="shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-2 border-gray-200 rounded-xl py-3 px-4 transition-all"
                  value={formData.category}
                  onChange={handleChange}>

                  {photoCategories.map((category) =>
                  <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  )}
                </select>
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-bold text-gray-700 mb-2">

                  Date des photos
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-2 border-gray-200 rounded-xl py-3 transition-all"
                    value={formData.date}
                    onChange={handleChange} />

                </div>
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="notes"
                  className="block text-sm font-bold text-gray-700 mb-2">

                  Notes additionnelles
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  className="shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-2 border-gray-200 rounded-xl py-3 px-4 transition-all resize-none"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Ajoutez des notes ou commentaires sur ces photos..." />

              </div>
            </div>
          </div>
        </motion.div>
        {/* Action Buttons */}
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
          className="flex justify-end space-x-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-100 shadow-lg">

          <motion.button
            whileHover={{
              scale: 1.05,
              y: -2
            }}
            whileTap={{
              scale: 0.95
            }}
            type="button"
            onClick={handleBack}
            className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-sm font-bold rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 shadow-md hover:shadow-lg transition-all">

            <XIcon className="h-5 w-5 mr-2" />
            Annuler
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.05,
              y: -2
            }}
            whileTap={{
              scale: 0.95
            }}
            type="submit"
            className="inline-flex items-center px-8 py-4 border-2 border-transparent text-sm font-bold rounded-xl shadow-lg text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 hover:shadow-xl transition-all">

            <SaveIcon className="h-5 w-5 mr-2" />
            Enregistrer les photos
          </motion.button>
        </motion.div>
      </form>
    </div>);

};
export default PhotoUpload;