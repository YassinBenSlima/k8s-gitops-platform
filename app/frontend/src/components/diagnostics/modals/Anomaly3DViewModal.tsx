import React, { useEffect, useState, useRef } from 'react';
import {
  XIcon,
  ZoomInIcon,
  ZoomOutIcon,
  RotateCcwIcon,
  RefreshCwIcon,
  CheckCircleIcon,
  InfoIcon,
  ChevronRightIcon,
  ChevronLeftIcon } from
'lucide-react';
import TeethModel from '../models/TeethModel';
const Anomaly3DViewModal = ({ anomalies, onClose, patientName }) => {
  const [selectedAnomaly, setSelectedAnomaly] = useState(
    anomalies[0]?.id || null
  );
  const [showControls, setShowControls] = useState(true);
  const [viewMode, setViewMode] = useState('all'); // 'all', 'upper', 'lower'
  const getSelectedAnomaly = () => {
    return anomalies.find((a) => a.id === selectedAnomaly) || anomalies[0];
  };
  const handleNextAnomaly = () => {
    const currentIndex = anomalies.findIndex((a) => a.id === selectedAnomaly);
    const nextIndex = (currentIndex + 1) % anomalies.length;
    setSelectedAnomaly(anomalies[nextIndex].id);
  };
  const handlePreviousAnomaly = () => {
    const currentIndex = anomalies.findIndex((a) => a.id === selectedAnomaly);
    const prevIndex = (currentIndex - 1 + anomalies.length) % anomalies.length;
    setSelectedAnomaly(anomalies[prevIndex].id);
  };
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Élevée':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Moyenne':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Faible':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  return (
    <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
        onClick={onClose}>
      </div>
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Vision 3D des anomalies détectées
            </h3>
            <p className="text-sm text-gray-500">Patient: {patientName}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500">

            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="flex-1 flex overflow-hidden">
          {/* 3D Model View */}
          <div className="w-2/3 relative border-r border-gray-200 bg-gray-50 overflow-hidden">
            <div className="absolute inset-0">
              <TeethModel
                anomalies={anomalies}
                selectedAnomaly={selectedAnomaly}
                viewMode={viewMode} />

            </div>
            {/* Zoom and Rotation Controls */}
            {showControls &&
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-white rounded-lg shadow-md p-2 border border-gray-200">
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">
                  <ZoomInIcon className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">
                  <ZoomOutIcon className="h-5 w-5" />
                </button>
                <div className="border-r border-gray-200 mx-1"></div>
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">
                  <RotateCcwIcon className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">
                  <RefreshCwIcon className="h-5 w-5" />
                </button>
              </div>
            }
            {/* View Mode Selector */}
            <div className="absolute top-4 left-4 flex space-x-2 bg-white rounded-lg shadow-md p-1 border border-gray-200">
              <button
                className={`px-3 py-1 text-sm font-medium rounded-md ${viewMode === 'all' ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setViewMode('all')}>

                Complète
              </button>
              <button
                className={`px-3 py-1 text-sm font-medium rounded-md ${viewMode === 'upper' ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setViewMode('upper')}>

                Supérieure
              </button>
              <button
                className={`px-3 py-1 text-sm font-medium rounded-md ${viewMode === 'lower' ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setViewMode('lower')}>

                Inférieure
              </button>
            </div>
            {/* Navigation Controls */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <button
                className="p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handlePreviousAnomaly}>

                <ChevronLeftIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <button
                className="p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleNextAnomaly}>

                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          {/* Details Panel */}
          <div className="w-1/3 flex flex-col overflow-y-auto p-6">
            <div
              className={`mb-6 p-4 rounded-lg border ${getSeverityColor(getSelectedAnomaly()?.severity)}`}>

              <div className="flex justify-between items-start">
                <h4 className="text-lg font-medium text-gray-900">
                  {getSelectedAnomaly()?.type}
                </h4>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(getSelectedAnomaly()?.severity)}`}>

                  {getSelectedAnomaly()?.severity}
                </span>
              </div>
              <p className="mt-1 text-sm font-medium text-gray-700">
                {getSelectedAnomaly()?.subtype}
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <h5 className="text-sm font-medium text-gray-700 uppercase tracking-wider mb-2">
                  Description
                </h5>
                <p className="text-sm text-gray-600">
                  {getSelectedAnomaly()?.description}
                </p>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-700 uppercase tracking-wider mb-2">
                  Localisation
                </h5>
                <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                  <div className="grid grid-cols-4 gap-2">
                    {getSelectedAnomaly()?.teethNumbers.map((toothNumber) =>
                    <div
                      key={toothNumber}
                      className="bg-blue-100 text-blue-800 rounded-md p-2 text-center text-sm font-medium">

                        {toothNumber}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-700 uppercase tracking-wider mb-2">
                  Recommandations
                </h5>
                <ul className="space-y-2">
                  {getSelectedAnomaly()?.recommendations.map((rec, index) =>
                  <li key={index} className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">{rec}</span>
                    </li>
                  )}
                </ul>
              </div>
              <div className="bg-blue-50 rounded-md p-4 border border-blue-200">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <InfoIcon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <h5 className="text-sm font-medium text-blue-800">
                      Impact sur le traitement
                    </h5>
                    <p className="mt-1 text-sm text-blue-700">
                      {getSelectedAnomaly()?.severity === 'Élevée' ?
                      'Cette anomalie nécessite une attention prioritaire et pourrait impacter significativement le plan de traitement. Une intervention rapide est recommandée.' :
                      getSelectedAnomaly()?.severity === 'Moyenne' ?
                      'Cette anomalie doit être prise en compte dans le plan de traitement global. Une surveillance régulière est recommandée.' :
                      'Cette anomalie peut être traitée dans le cadre du plan de traitement global sans ajustement majeur.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-auto pt-6">
              <h5 className="text-sm font-medium text-gray-700 uppercase tracking-wider mb-2">
                Navigation
              </h5>
              <div className="flex space-x-2">
                {anomalies.map((anomaly) =>
                <button
                  key={anomaly.id}
                  className={`w-3 h-3 rounded-full ${selectedAnomaly === anomaly.id ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'}`}
                  onClick={() => setSelectedAnomaly(anomaly.id)}
                  title={anomaly.type} />

                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

};
export default Anomaly3DViewModal;