import React, { useCallback, useEffect, useState, useRef } from 'react';
import { PipetteIcon, CopyIcon, CheckIcon } from 'lucide-react';
interface ColorPickerPanelProps {
  color: string;
  onChange: (color: string) => void;
  onEyedropper?: () => void;
  recentColors?: string[];
}
export const ColorPickerPanel = ({
  color,
  onChange
}: ColorPickerPanelProps) => {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Color Picker
        </label>

        {/* Color preview */}
        <div
          className="w-full h-12 rounded border border-gray-300 mb-3"
          style={{
            backgroundColor: color
          }} />


        {/* RGB Sliders */}
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-600">Red</label>
            <input type="range" min="0" max="255" className="w-full" />
          </div>
          {/* ... existing sliders ... */}
        </div>

        {/* Hex input */}
        <input
          type="text"
          className="mt-3 w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="#000000" />

      </div>
    </div>);

};