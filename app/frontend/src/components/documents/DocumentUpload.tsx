import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeftIcon,
  UploadIcon,
  FileIcon,
  FileTextIcon,
  ImageIcon,
  XIcon,
  SaveIcon,
  FilePlusIcon,
  CheckCircleIcon,
  SparklesIcon,
  FolderIcon,
  CalendarIcon } from
'lucide-react';
const DocumentUpload = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    type: 'medical_record',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const documentTypes = [
  {
    id: 'medical_record',
    name: 'Dossier médical',
    icon: FileTextIcon,
    color: 'blue'
  },
  {
    id: 'xray',
    name: 'Radiographie',
    icon: ImageIcon,
    color: 'purple'
  },
  {
    id: 'scan',
    name: 'Scan 3D',
    icon: FileIcon,
    color: 'green'
  },
  {
    id: 'prescription',
    name: 'Prescription',
    icon: FileTextIcon,
    color: 'amber'
  },
  {
    id: 'treatment_plan',
    name: 'Plan de traitement',
    icon: FileTextIcon,
    color: 'pink'
  },
  {
    id: 'other',
    name: 'Autre',
    icon: FileIcon,
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
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
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
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Veuillez sélectionner un fichier');
      return;
    }
    if (!formData.title) {
      alert('Veuillez saisir un titre pour le document');
      return;
    }
    console.log('Document data:', formData);
    console.log('File:', selectedFile);
    alert('Document ajouté avec succès');
    navigate(`/patients/${patientId}`);
  };
  const handleBack = () => {
    navigate(`/patients/${patientId}`);
  };
  const handleRemoveFile = () => {
    setSelectedFile(null);
  };
  const getFileIcon = (file) => {
    if (!file) return null;
    if (file.type.startsWith('image/')) {
      return <ImageIcon className="h-6 w-6 text-blue-500" />;
    } else if (file.type === 'application/pdf') {
      return <FileTextIcon className="h-6 w-6 text-red-500" />;
    } else {
      return <FileIcon className="h-6 w-6 text-gray-500" />;
    }
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
        className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-2xl p-6 text-white shadow-xl">

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

              <FilePlusIcon className="h-8 w-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold">Ajouter un document</h1>
              <p className="text-pink-100 text-sm mt-1">
                Téléversez un nouveau document au dossier patient
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
              className="inline-flex items-center px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">

              <SaveIcon className="h-5 w-5 mr-2" />
              Enregistrer
            </motion.button>
          </div>
        </div>
      </motion.div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload Section */}
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
          className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg border-2 border-purple-100 overflow-hidden">

          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-xl bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mr-4">
                <UploadIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Téléversement du document</h3>
                <p className="text-purple-100 text-sm mt-1">
                  Glissez-déposez ou cliquez pour sélectionner
                </p>
              </div>
            </div>
          </div>
          <div className="p-6">
            {!selectedFile ?
            <motion.div
              animate={{
                scale: dragActive ? 1.02 : 1
              }}
              className={`relative border-3 border-dashed rounded-2xl p-12 transition-all ${dragActive ? 'border-purple-400 bg-purple-100' : 'border-purple-200 bg-white'}`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}>

                <div className="text-center">
                  <motion.div
                  animate={{
                    y: dragActive ? -10 : 0
                  }}
                  className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">

                    <UploadIcon className="h-10 w-10 text-white" />
                  </motion.div>
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-xl px-4 py-2 font-semibold text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500 transition-all">

                      <span>Télécharger un fichier</span>
                      <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange} />

                    </label>
                    <p className="pl-2 self-center">ou glisser-déposer</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    PNG, JPG, PDF jusqu'à 10MB
                  </p>
                </div>
              </motion.div> :

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              className="bg-white rounded-2xl p-6 border-2 border-purple-200 shadow-md">

                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <div className="flex-shrink-0 h-16 w-16 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                      {getFileIcon(selectedFile)}
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-bold text-gray-900 truncate">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatFileSize(selectedFile.size)}
                      </p>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircleIcon className="h-3 w-3 mr-1" />
                          Fichier prêt
                        </span>
                      </div>
                    </div>
                  </div>
                  <motion.button
                  whileHover={{
                    scale: 1.1,
                    rotate: 90
                  }}
                  whileTap={{
                    scale: 0.9
                  }}
                  type="button"
                  className="ml-4 p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-all"
                  onClick={handleRemoveFile}>

                    <XIcon className="h-5 w-5" />
                  </motion.button>
                </div>
              </motion.div>
            }
          </div>
        </motion.div>
        {/* Document Details Section */}
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
                <h3 className="text-xl font-bold">Détails du document</h3>
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

                  Titre du document <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-2 border-gray-200 rounded-xl py-3 px-4 transition-all"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ex: Radiographie panoramique"
                  required />

              </div>
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-bold text-gray-700 mb-2">

                  Type de document
                </label>
                <select
                  id="type"
                  name="type"
                  className="shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-2 border-gray-200 rounded-xl py-3 px-4 transition-all"
                  value={formData.type}
                  onChange={handleChange}>

                  {documentTypes.map((type) =>
                  <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  )}
                </select>
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-bold text-gray-700 mb-2">

                  Date du document
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
                  placeholder="Ajoutez des notes ou commentaires sur ce document..." />

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
            className="inline-flex items-center px-8 py-4 border-2 border-transparent text-sm font-bold rounded-xl shadow-lg text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 hover:shadow-xl transition-all">

            <SaveIcon className="h-5 w-5 mr-2" />
            Enregistrer le document
          </motion.button>
        </motion.div>
      </form>
    </div>);

};
export default DocumentUpload;