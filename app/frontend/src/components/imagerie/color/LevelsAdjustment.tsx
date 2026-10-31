import React from 'react';
import { Sliders } from 'lucide-react';
interface LevelsAdjustmentProps {
  levels?: {
    input: {
      black: number;
      white: number;
      gamma: number;
    };
    output: {
      black: number;
      white: number;
    };
  };
  onChange: (levels: {
    input: {
      black: number;
      white: number;
      gamma: number;
    };
    output: {
      black: number;
      white: number;
    };
  }) => void;
}
export const LevelsAdjustment: React.FC<LevelsAdjustmentProps> = ({
  levels,
  onChange
}) => {
  // Provide default values if levels is undefined
  const currentLevels = levels || {
    input: {
      black: 0,
      white: 255,
      gamma: 1
    },
    output: {
      black: 0,
      white: 255
    }
  };
  const handleInputChange = (
  type: 'black' | 'white' | 'gamma',
  value: number) =>
  {
    onChange({
      ...currentLevels,
      input: {
        ...currentLevels.input,
        [type]: value
      }
    });
  };
  const handleOutputChange = (type: 'black' | 'white', value: number) => {
    onChange({
      ...currentLevels,
      output: {
        ...currentLevels.output,
        [type]: value
      }
    });
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Sliders className="w-4 h-4" />
        <span>Niveaux</span>
      </div>

      {/* Input Levels */}
      <div className="space-y-3">
        <div className="text-xs font-medium text-gray-600">Entrée</div>

        <div>
          <label className="text-xs text-gray-600">Noir</label>
          <input
            type="range"
            min="0"
            max="255"
            value={currentLevels.input.black}
            onChange={(e) => handleInputChange('black', Number(e.target.value))}
            className="w-full" />

          <span className="text-xs text-gray-500">
            {currentLevels.input.black}
          </span>
        </div>

        <div>
          <label className="text-xs text-gray-600">Gamma</label>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={currentLevels.input.gamma}
            onChange={(e) => handleInputChange('gamma', Number(e.target.value))}
            className="w-full" />

          <span className="text-xs text-gray-500">
            {currentLevels.input.gamma.toFixed(1)}
          </span>
        </div>

        <div>
          <label className="text-xs text-gray-600">Blanc</label>
          <input
            type="range"
            min="0"
            max="255"
            value={currentLevels.input.white}
            onChange={(e) => handleInputChange('white', Number(e.target.value))}
            className="w-full" />

          <span className="text-xs text-gray-500">
            {currentLevels.input.white}
          </span>
        </div>
      </div>

      {/* Output Levels */}
      <div className="space-y-3">
        <div className="text-xs font-medium text-gray-600">Sortie</div>

        <div>
          <label className="text-xs text-gray-600">Noir</label>
          <input
            type="range"
            min="0"
            max="255"
            value={currentLevels.output.black}
            onChange={(e) =>
            handleOutputChange('black', Number(e.target.value))
            }
            className="w-full" />

          <span className="text-xs text-gray-500">
            {currentLevels.output.black}
          </span>
        </div>

        <div>
          <label className="text-xs text-gray-600">Blanc</label>
          <input
            type="range"
            min="0"
            max="255"
            value={currentLevels.output.white}
            onChange={(e) =>
            handleOutputChange('white', Number(e.target.value))
            }
            className="w-full" />

          <span className="text-xs text-gray-500">
            {currentLevels.output.white}
          </span>
        </div>
      </div>
    </div>);

};