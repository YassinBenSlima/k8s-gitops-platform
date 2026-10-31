import React, { useState } from 'react';
import { UploadIcon, ImageIcon } from 'lucide-react';
interface ImageUploaderProps {
  onUpload: (files: FileList, type: string) => void;
  imageTypes?: Array<{
    id: string;
    name: string;
    color: string;
  }>;
  multiple?: boolean;
}
const ImageUploader = ({
  onUpload,
  imageTypes,
  multiple = false
}: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedType, setSelectedType] = useState(
    imageTypes?.[0]?.id || 'panoramic'
  );
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
      onUpload(e.dataTransfer.files, selectedType);
      e.dataTransfer.clearData();
    }
  };
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files, selectedType);
    }
  };
  return (
    <div className="space-y-4">
      {imageTypes && imageTypes.length > 0 &&
      <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Type d'image à téléverser
          </label>
          <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="block w-full pl-3 pr-10 py-3 text-base border-2 border-purple-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-purple-500 dark:focus:border-purple-400 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm transition-all">

            {imageTypes.map((type) =>
          <option key={type.id} value={type.id}>
                {type.name}
              </option>
          )}
          </select>
        </div>
      }
      <div
        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-all ${isDragging ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-purple-300 dark:border-gray-600 bg-white dark:bg-gray-700'}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          minHeight: '200px'
        }}>

        <div className="flex flex-col items-center text-center">
          <div
            className={`h-16 w-16 rounded-full flex items-center justify-center mb-4 ${isDragging ? 'bg-purple-500' : 'bg-purple-100 dark:bg-purple-900/30'}`}>

            <UploadIcon
              className={`h-8 w-8 ${isDragging ? 'text-white' : 'text-purple-600 dark:text-purple-400'}`} />

          </div>
          <div className="mt-2">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Déposez vos fichiers ici ou
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PNG, JPG, DICOM jusqu'à 20MB
              {multiple ? ' (plusieurs fichiers acceptés)' : ''}
            </p>
          </div>
          <div className="mt-4">
            <label
              htmlFor="file-upload"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 cursor-pointer transition-all">

              <ImageIcon className="h-4 w-4 mr-2" />
              <span>
                Sélectionner {multiple ? 'des fichiers' : 'un fichier'}
              </span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                accept=".jpg,.jpeg,.png,.dcm"
                multiple={multiple}
                onChange={handleFileChange} />

            </label>
          </div>
        </div>
      </div>
    </div>);

};
export default ImageUploader;