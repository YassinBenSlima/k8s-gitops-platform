import React, { useState } from 'react';
import {
  UploadIcon,
  XIcon,
  FileTextIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  FileIcon,
  PlusIcon,
  TrashIcon } from
'lucide-react';
import { Link } from 'react-router-dom';
const DocumentUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [fseId, setFseId] = useState('FSE-2023-043');
  const [patient, setPatient] = useState({
    name: 'Emma Petit',
    id: 3
  });
  const handleFileChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => ({
        file,
        id: Math.random().toString(36).substring(2),
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: 'pending'
      }));
      setSelectedFiles([...selectedFiles, ...filesArray]);
    }
  };
  const handleRemoveFile = (id) => {
    setSelectedFiles(selectedFiles.filter((file) => file.id !== id));
  };
  const handleUpload = () => {
    if (selectedFiles.length === 0) return;
    setUploading(true);
    // Simulate file upload progress
    const uploadPromises = selectedFiles.map((file, index) => {
      return new Promise((resolve) => {
        const intervalTime = 500 + Math.random() * 1000; // Random time between 500ms and 1500ms
        const interval = setInterval(() => {
          setSelectedFiles((prevFiles) => {
            const newFiles = [...prevFiles];
            const fileIndex = newFiles.findIndex((f) => f.id === file.id);
            if (fileIndex !== -1) {
              const newProgress = Math.min(
                newFiles[fileIndex].progress + 10,
                100
              );
              newFiles[fileIndex] = {
                ...newFiles[fileIndex],
                progress: newProgress,
                status: newProgress === 100 ? 'completed' : 'uploading'
              };
            }
            return newFiles;
          });
          const currentFile = selectedFiles.find((f) => f.id === file.id);
          if (currentFile && currentFile.progress >= 100) {
            clearInterval(interval);
            resolve();
          }
        }, intervalTime);
      });
    });
    Promise.all(uploadPromises).then(() => {
      setTimeout(() => {
        setUploading(false);
        setUploadComplete(true);
      }, 500);
    });
  };
  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) {
      return (
        <img
          src="https://cdn-icons-png.flaticon.com/512/337/337940.png"
          className="h-6 w-6"
          alt="Image" />);


    } else if (fileType === 'application/pdf') {
      return (
        <img
          src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
          className="h-6 w-6"
          alt="PDF" />);


    } else {
      return <FileIcon className="h-6 w-6 text-gray-400" />;
    }
  };
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Complété
          </span>);

      case 'uploading':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Téléversement...
          </span>);

      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            En attente
          </span>);

      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>);

    }
  };
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            Téléversement de documents
          </h3>
          <Link
            to="/administration/mutuelles"
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">

            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Retour
          </Link>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <FileTextIcon className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Documents complémentaires requis
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  La feuille de soins {fseId} pour {patient.name} a été rejetée
                  car des documents sont manquants. Veuillez téléverser les
                  documents suivants :
                </p>
                <ul className="list-disc list-inside mt-2">
                  <li>Prescription médicale</li>
                  <li>Radiographie panoramique</li>
                  <li>Attestation de droits à jour</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Documents
          </label>
          <div className="mt-1 border-2 border-dashed border-gray-300 rounded-md px-6 pt-5 pb-6">
            <div className="space-y-1 text-center">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <UploadIcon className="mx-auto h-12 w-12" />
              </div>
              <div className="flex text-sm text-gray-600 justify-center">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">

                  <span>Téléverser des fichiers</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    multiple
                    onChange={handleFileChange}
                    disabled={uploading} />

                </label>
                <p className="pl-1">ou glisser-déposer</p>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, PDF jusqu'à 10MB
              </p>
            </div>
          </div>
        </div>
        {selectedFiles.length > 0 &&
        <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Fichiers sélectionnés
            </h4>
            <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
              {selectedFiles.map((file) =>
            <li key={file.id} className="px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getFileIcon(file.type)}
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {getStatusBadge(file.status)}
                      {!uploading && file.status !== 'completed' &&
                  <button
                    onClick={() => handleRemoveFile(file.id)}
                    className="text-red-600 hover:text-red-900">

                          <TrashIcon className="h-4 w-4" />
                        </button>
                  }
                    </div>
                  </div>
                  {(file.status === 'uploading' ||
              file.status === 'completed') &&
              <div className="mt-2">
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                          <div
                      style={{
                        width: `${file.progress}%`
                      }}
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${file.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'}`}>
                    </div>
                        </div>
                      </div>
                    </div>
              }
                </li>
            )}
            </ul>
            <div className="mt-4 flex justify-end">
              <button
              onClick={() => {
                setSelectedFiles([]);
                setUploadComplete(false);
              }}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
              disabled={uploading}>

                Effacer tout
              </button>
              <button
              onClick={handleUpload}
              disabled={
              uploading ||
              selectedFiles.length === 0 ||
              selectedFiles.every((file) => file.status === 'completed')
              }
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">

                {uploading ?
              <>
                    <UploadIcon className="h-4 w-4 mr-2 animate-pulse" />
                    Téléversement...
                  </> :

              <>
                    <UploadIcon className="h-4 w-4 mr-2" />
                    Téléverser
                  </>
              }
              </button>
            </div>
          </div>
        }
        {uploadComplete &&
        <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-5 w-5 text-green-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Téléversement réussi
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>
                    Tous les documents ont été téléversés avec succès. La
                    feuille de soins sera traitée dans les plus brefs délais.
                  </p>
                  <div className="mt-4">
                    <Link
                    to="/administration/mutuelles"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">

                      Retour aux mutuelles
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Documents déjà téléversés
          </h4>
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <ul className="divide-y divide-gray-200">
              <li className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                    className="h-6 w-6"
                    alt="PDF" />

                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      Formulaire_FSE.pdf
                    </p>
                    <p className="text-xs text-gray-500">
                      Téléversé le 08/06/2023
                    </p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-900">
                  <UploadIcon className="h-5 w-5" />
                </button>
              </li>
              <li className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/337/337940.png"
                    className="h-6 w-6"
                    alt="Image" />

                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      Photo_carte_vitale.jpg
                    </p>
                    <p className="text-xs text-gray-500">
                      Téléversé le 08/06/2023
                    </p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-900">
                  <UploadIcon className="h-5 w-5" />
                </button>
              </li>
            </ul>
          </div>
          <div className="mt-4">
            <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <PlusIcon className="h-4 w-4 mr-1" />
              Ajouter un document existant
            </button>
          </div>
        </div>
      </div>
    </div>);

};
export default DocumentUpload;