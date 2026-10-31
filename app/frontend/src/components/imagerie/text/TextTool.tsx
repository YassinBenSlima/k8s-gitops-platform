import React, { useEffect, useState, useRef } from 'react';
import {
  TypeIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon } from
'lucide-react';
export interface TextLayer {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  align: 'left' | 'center' | 'right';
  bold: boolean;
  italic: boolean;
  underline: boolean;
  rotation: number;
}
interface TextToolProps {
  onAddText: (text: Partial<TextLayer>) => void;
  activeTextLayer?: TextLayer;
  onUpdateText: (id: string, updates: Partial<TextLayer>) => void;
}
export function TextTool({
  onAddText,
  activeTextLayer,
  onUpdateText
}: TextToolProps) {
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(24);
  const [fontFamily, setFontFamily] = useState('Inter');
  const [color, setColor] = useState('#ffffff');
  const [align, setAlign] = useState<'left' | 'center' | 'right'>('left');
  const [styles, setStyles] = useState({
    bold: false,
    italic: false,
    underline: false
  });
  // Sync with active layer
  useEffect(() => {
    if (activeTextLayer) {
      setText(activeTextLayer.text);
      setFontSize(activeTextLayer.fontSize);
      setFontFamily(activeTextLayer.fontFamily);
      setColor(activeTextLayer.color);
      setAlign(activeTextLayer.align);
      setStyles({
        bold: activeTextLayer.bold,
        italic: activeTextLayer.italic,
        underline: activeTextLayer.underline
      });
    }
  }, [activeTextLayer]);
  const handleUpdate = (updates: Partial<TextLayer>) => {
    if (activeTextLayer) {
      onUpdateText(activeTextLayer.id, updates);
    }
  };
  const fonts = [
  'Inter',
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Courier New',
  'Georgia',
  'Verdana',
  'Roboto',
  'Open Sans',
  'Lato'];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-200">
        <TypeIcon className="w-4 h-4" />
        <span>Text Tool</span>
      </div>

      {/* Text Input */}
      <div>
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            handleUpdate({
              text: e.target.value
            });
          }}
          placeholder="Enter text..."
          className="w-full h-24 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />

      </div>

      {/* Font Settings */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <select
            value={fontFamily}
            onChange={(e) => {
              setFontFamily(e.target.value);
              handleUpdate({
                fontFamily: e.target.value
              });
            }}
            className="flex-1 px-2 py-1.5 text-sm bg-gray-800 border border-gray-700 rounded text-gray-200 focus:outline-none">

            {fonts.map((font) =>
            <option
              key={font}
              value={font}
              style={{
                fontFamily: font
              }}>

                {font}
              </option>
            )}
          </select>

          <input
            type="number"
            value={fontSize}
            onChange={(e) => {
              setFontSize(Number(e.target.value));
              handleUpdate({
                fontSize: Number(e.target.value)
              });
            }}
            className="w-16 px-2 py-1.5 text-sm bg-gray-800 border border-gray-700 rounded text-gray-200 focus:outline-none" />

        </div>

        {/* Style Buttons */}
        <div className="flex gap-1 bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => {
              const newBold = !styles.bold;
              setStyles((prev) => ({
                ...prev,
                bold: newBold
              }));
              handleUpdate({
                bold: newBold
              });
            }}
            className={`flex-1 p-1.5 rounded flex justify-center ${styles.bold ? 'bg-gray-600 text-white' : 'text-gray-400 hover:text-gray-200'}`}>

            <BoldIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              const newItalic = !styles.italic;
              setStyles((prev) => ({
                ...prev,
                italic: newItalic
              }));
              handleUpdate({
                italic: newItalic
              });
            }}
            className={`flex-1 p-1.5 rounded flex justify-center ${styles.italic ? 'bg-gray-600 text-white' : 'text-gray-400 hover:text-gray-200'}`}>

            <ItalicIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              const newUnderline = !styles.underline;
              setStyles((prev) => ({
                ...prev,
                underline: newUnderline
              }));
              handleUpdate({
                underline: newUnderline
              });
            }}
            className={`flex-1 p-1.5 rounded flex justify-center ${styles.underline ? 'bg-gray-600 text-white' : 'text-gray-400 hover:text-gray-200'}`}>

            <UnderlineIcon className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-gray-700 mx-1 self-center" />

          <button
            onClick={() => {
              setAlign('left');
              handleUpdate({
                align: 'left'
              });
            }}
            className={`flex-1 p-1.5 rounded flex justify-center ${align === 'left' ? 'bg-gray-600 text-white' : 'text-gray-400 hover:text-gray-200'}`}>

            <AlignLeftIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setAlign('center');
              handleUpdate({
                align: 'center'
              });
            }}
            className={`flex-1 p-1.5 rounded flex justify-center ${align === 'center' ? 'bg-gray-600 text-white' : 'text-gray-400 hover:text-gray-200'}`}>

            <AlignCenterIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setAlign('right');
              handleUpdate({
                align: 'right'
              });
            }}
            className={`flex-1 p-1.5 rounded flex justify-center ${align === 'right' ? 'bg-gray-600 text-white' : 'text-gray-400 hover:text-gray-200'}`}>

            <AlignRightIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Color */}
        <div>
          <label className="text-xs text-gray-500 block mb-1">Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
                handleUpdate({
                  color: e.target.value
                });
              }}
              className="w-8 h-8 rounded border border-gray-600 cursor-pointer" />

            <input
              type="text"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
                handleUpdate({
                  color: e.target.value
                });
              }}
              className="flex-1 px-2 py-1.5 text-sm bg-gray-800 border border-gray-700 rounded text-gray-200 font-mono uppercase" />

          </div>
        </div>
      </div>

      {!activeTextLayer &&
      <button
        onClick={() =>
        onAddText({
          text: text || 'New Text',
          fontSize,
          fontFamily,
          color,
          align,
          bold: styles.bold,
          italic: styles.italic,
          underline: styles.underline,
          x: 50,
          y: 50
        })
        }
        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors font-medium text-sm">

          Add Text Layer
        </button>
      }
    </div>);

}