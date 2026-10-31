import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
const PhotoComparison = () => {
  const [comparisonType, setComparisonType] = useState('side-by-side');
  // Mock photos for before/after comparison
  const beforePhoto =
  'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80';
  const afterPhoto =
  'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80';
  const renderSideBySide = () =>
  <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="aspect-w-4 aspect-h-3 rounded-md overflow-hidden">
          <img
          src={beforePhoto}
          alt="Before treatment"
          className="w-full h-full object-cover" />

        </div>
        <p className="mt-2 text-sm text-center text-gray-500">
          Avant (01/01/2023)
        </p>
      </div>
      <div>
        <div className="aspect-w-4 aspect-h-3 rounded-md overflow-hidden">
          <img
          src={afterPhoto}
          alt="After treatment"
          className="w-full h-full object-cover" />

        </div>
        <p className="mt-2 text-sm text-center text-gray-500">
          Après (01/10/2023)
        </p>
      </div>
    </div>;

  const renderSlider = () =>
  <div className="relative">
      <div className="aspect-w-4 aspect-h-3 rounded-md overflow-hidden">
        <div className="absolute inset-0 w-1/2 overflow-hidden z-10">
          <img
          src={beforePhoto}
          alt="Before treatment"
          className="absolute h-full w-[200%] max-w-none object-cover object-left" />

        </div>
        <div className="absolute inset-0 overflow-hidden">
          <img
          src={afterPhoto}
          alt="After treatment"
          className="absolute h-full w-full object-cover" />

        </div>
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="h-full w-0.5 bg-white"></div>
        </div>
        <div className="absolute bottom-2 left-0 right-0 flex justify-center z-20 pointer-events-none">
          <div className="bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
            Glissez pour comparer
          </div>
        </div>
      </div>
      <div className="mt-2 flex justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Avant (01/01/2023)
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Après (01/10/2023)
        </p>
      </div>
    </div>;

  const renderOverlay = () =>
  <div className="relative">
      <div className="aspect-w-4 aspect-h-3 rounded-md overflow-hidden">
        <img
        src={afterPhoto}
        alt="After treatment"
        className="absolute h-full w-full object-cover" />

        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <button className="bg-white bg-opacity-75 p-2 rounded-full">
            <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
          </button>
          <div className="mx-2 text-white text-sm font-medium">
            Cliquez pour voir avant/après
          </div>
          <button className="bg-white bg-opacity-75 p-2 rounded-full">
            <ChevronRightIcon className="h-6 w-6 text-gray-800" />
          </button>
        </div>
      </div>
    </div>;

  return (
    <div>
      <div className="mb-4">
        <label
          htmlFor="comparison-type"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">

          Type de comparaison
        </label>
        <select
          id="comparison-type"
          value={comparisonType}
          onChange={(e) => setComparisonType(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white">

          <option value="side-by-side">Côte à côte</option>
          <option value="slider">Curseur de comparaison</option>
          <option value="overlay">Superposition</option>
        </select>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
        {comparisonType === 'side-by-side' && renderSideBySide()}
        {comparisonType === 'slider' && renderSlider()}
        {comparisonType === 'overlay' && renderOverlay()}
      </div>
      <div className="mt-4">
        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
          Analyse des changements
        </h4>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-md p-3 border border-green-100 dark:border-green-800">
          <p className="text-sm text-green-700 dark:text-green-300">
            <span className="font-medium">Détection IA : </span>
            L'analyse montre une amélioration de 60% dans l'alignement des
            incisives centrales et une réduction de 45% du chevauchement.
          </p>
        </div>
      </div>
    </div>);

};
export default PhotoComparison;