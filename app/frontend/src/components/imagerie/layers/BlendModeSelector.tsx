import React, { useEffect, useState, useRef, Component } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import {
  BlendMode,
  BLEND_MODES,
  getBlendModesByCategory } from
'../utils/blendModes';
interface BlendModeSelectorProps {
  value: BlendMode;
  onChange: (mode: BlendMode) => void;
  disabled?: boolean;
}
export function BlendModeSelector({
  value,
  onChange,
  disabled
}: BlendModeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentMode = BLEND_MODES.find((m) => m.id === value);
  const categories = getBlendModesByCategory();
  const categoryLabels: Record<string, string> = {
    basic: 'Basic',
    darken: 'Darken',
    lighten: 'Lighten',
    contrast: 'Contrast',
    inversion: 'Inversion',
    component: 'Component'
  };
  const categoryOrder = [
  'basic',
  'darken',
  'lighten',
  'contrast',
  'inversion',
  'component'];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node))
      {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full flex items-center justify-between px-3 py-1.5 text-sm
          bg-gray-800 border border-gray-700 rounded-md
          text-gray-200 hover:bg-gray-750 transition-colors
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:ring-offset-gray-900
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}>

        <span>{currentMode?.name || 'Normal'}</span>
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />

      </button>

      {isOpen &&
      <div
        className="absolute z-50 w-48 mt-1 py-1 bg-gray-800 border border-gray-700 rounded-md shadow-xl max-h-80 overflow-y-auto"
        role="listbox">

          {categoryOrder.map((category, catIndex) =>
        <div key={category}>
              {catIndex > 0 &&
          <div className="border-t border-gray-700 my-1" />
          }
              <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {categoryLabels[category]}
              </div>
              {categories[category]?.map((mode) =>
          <button
            key={mode.id}
            type="button"
            onClick={() => {
              onChange(mode.id);
              setIsOpen(false);
            }}
            className={`
                    w-full px-3 py-1.5 text-left text-sm transition-colors
                    ${value === mode.id ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}
                  `}
            role="option"
            aria-selected={value === mode.id}>

                  {mode.name}
                </button>
          )}
            </div>
        )}
        </div>
      }
    </div>);

}