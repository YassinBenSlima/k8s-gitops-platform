import React, { useState } from 'react';
import { motion } from 'framer-motion';
interface DentalChartProps {
  selectedTeeth: number[];
  onToothSelect: (toothNumber: number) => void;
}
const DentalChart: React.FC<DentalChartProps> = ({
  selectedTeeth,
  onToothSelect
}) => {
  // Upper teeth (18-11 right to left, 21-28 left to right)
  const upperTeeth = [
  18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];

  // Lower teeth (48-41 right to left, 31-38 left to right)
  const lowerTeeth = [
  48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

  const isSelected = (toothNumber: number) =>
  selectedTeeth.includes(toothNumber);
  const renderTooth = (toothNumber: number, index: number) => {
    const selected = isSelected(toothNumber);
    return (
      <motion.button
        key={toothNumber}
        whileHover={{
          scale: 1.1
        }}
        whileTap={{
          scale: 0.95
        }}
        onClick={() => onToothSelect(toothNumber)}
        className={`relative w-8 h-12 rounded-t-lg transition-all ${selected ? 'bg-gradient-to-b from-blue-500 to-blue-600 shadow-lg' : 'bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 hover:from-gray-300 hover:to-gray-400 dark:hover:from-gray-500 dark:hover:to-gray-600'}`}
        title={`Dent ${toothNumber}`}>

        <span
          className={`absolute top-1 left-1/2 transform -translate-x-1/2 text-xs font-bold ${selected ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>

          {toothNumber}
        </span>
      </motion.button>);

  };
  return (
    <div className="space-y-6">
      {/* Upper Jaw */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center">
          Arcade supérieure
        </p>
        <div className="flex justify-center items-end space-x-1 pb-2 border-b-2 border-gray-400 dark:border-gray-500">
          {upperTeeth.map((tooth, index) => renderTooth(tooth, index))}
        </div>
      </div>

      {/* Lower Jaw */}
      <div className="space-y-2">
        <div className="flex justify-center items-start space-x-1 pt-2 border-t-2 border-gray-400 dark:border-gray-500">
          {lowerTeeth.map((tooth, index) =>
          <motion.button
            key={tooth}
            whileHover={{
              scale: 1.1
            }}
            whileTap={{
              scale: 0.95
            }}
            onClick={() => onToothSelect(tooth)}
            className={`relative w-8 h-12 rounded-b-lg transition-all ${isSelected(tooth) ? 'bg-gradient-to-t from-blue-500 to-blue-600 shadow-lg' : 'bg-gradient-to-t from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 hover:from-gray-300 hover:to-gray-400 dark:hover:from-gray-500 dark:hover:to-gray-600'}`}
            title={`Dent ${tooth}`}>

              <span
              className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-bold ${isSelected(tooth) ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>

                {tooth}
              </span>
            </motion.button>
          )}
        </div>
        <p className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center">
          Arcade inférieure
        </p>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-4 text-xs text-gray-600 dark:text-gray-400">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700" />
          <span>Normal</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded bg-gradient-to-b from-blue-500 to-blue-600" />
          <span>Sélectionné</span>
        </div>
      </div>
    </div>);

};
export default DentalChart;