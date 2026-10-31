import React, { useState } from 'react';
import { UploadIcon, CameraIcon } from 'lucide-react';
interface PhotoUploaderProps {
  onUpload: (files: FileList) => void;
}
const PhotoUploader = ({ onUpload }: PhotoUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };
  const handleFiles = (files: FileList) => {
    // Create preview URLs
    const urls = [];
    for (let i = 0; i < files.length; i++) {
      urls.push(URL.createObjectURL(files[i]));
    }
    setPreviewUrls(urls);
    // Pass files to parent component
    onUpload(files);
  };
  const handleCameraCapture = () => {
    // In a real app, this would open the device camera
    alert("Fonctionnalité d'appareil photo à implémenter");
  };
  return (
    <div>
      {previewUrls.length > 0 ?
      <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {previewUrls.map((url, index) =>
          <div key={index} className="relative">
                <div className="aspect-w-4 aspect-h-3 rounded-md overflow-hidden">
                  <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover" />

                </div>
              </div>
          )}
          </div>
          <div className="flex justify-end">
            <button
            onClick={() => setPreviewUrls([])}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-xs font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">

              Réinitialiser
            </button>
          </div>
        </div> :

      <div
        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          minHeight: '200px'
        }}>

          <div className="flex flex-col items-center text-center">
            <UploadIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Déposez vos photos ici ou
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG jusqu'à 10MB
              </p>
            </div>
            <div className="mt-4 flex space-x-3">
              <label
              htmlFor="file-upload"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">

                <span>Sélectionner un fichier</span>
                <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                accept=".jpg,.jpeg,.png"
                multiple
                onChange={handleFileChange} />

              </label>
              <button
              type="button"
              onClick={handleCameraCapture}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">

                <CameraIcon className="h-4 w-4 mr-2" />
                Prendre une photo
              </button>
            </div>
          </div>
        </div>
      }
    </div>);

};
export default PhotoUploader;