import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIcon,
  PlusIcon,
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  EyeIcon,
  PrinterIcon,
  ChevronLeftIcon,
  HeartIcon,
  ClockIcon,
  UserIcon,
  CalendarIcon,
  XIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  ZapIcon,
  TrendingUpIcon } from
'lucide-react';
import { usePatient } from '../contexts/PatientContext';
interface ECGRecord {
  id: string;
  patient: string;
  age: number;
  date: string;
  time: string;
  type: string;
  cardiologue: string;
  status: 'Normal' | 'Anormal' | 'Critique';
  heartRate: number;
  prInterval: number;
  qrsDuration: number;
  qtInterval: number;
  diagnosis: string;
  recommendations: string[];
  notes: string;
  ecgImageSrc?: string;
  ecgAnnotations?: ECGImageAnnotation[];
}

interface ECGImageAnnotation {
  id: string;
  type: 'rect' | 'circle' | 'line' | 'arrow' | 'freehand' | 'text';
  color: string;
  strokeWidth: number;
  x: number;
  y: number;
  width?: number;
  height?: number;
  endX?: number;
  endY?: number;
  text?: string;
  points?: { x: number; y: number }[];
}
const ecgData: ECGRecord[] = [
{
  id: 'ECG-2024-001',
  patient: 'Ahmed Ben Salem',
  age: 58,
  date: '2024-01-15',
  time: '09:30',
  type: 'Repos',
  cardiologue: 'Dr. Karim Mansour',
  status: 'Normal',
  heartRate: 72,
  prInterval: 160,
  qrsDuration: 90,
  qtInterval: 400,
  diagnosis: "Rythme sinusal normal. Pas d'anomalie détectée.",
  recommendations: [
  'Suivi annuel recommandé',
  "Maintenir l'activité physique modérée"],

  notes: 'Patient asymptomatique, bilan de routine.'
},
{
  id: 'ECG-2024-002',
  patient: 'Fatima Trabelsi',
  age: 65,
  date: '2024-01-14',
  time: '11:15',
  type: 'Holter 24h',
  cardiologue: 'Dr. Sonia Belhadj',
  status: 'Anormal',
  heartRate: 88,
  prInterval: 210,
  qrsDuration: 120,
  qtInterval: 450,
  diagnosis:
  'Bloc auriculo-ventriculaire du 1er degré. Élargissement du QRS.',
  recommendations: [
  'Échocardiographie recommandée',
  'Consultation de suivi dans 2 semaines',
  'Surveillance tensionnelle'],

  notes: 'Patiente sous traitement antihypertenseur.'
},
{
  id: 'ECG-2024-003',
  patient: 'Mohamed Chaabane',
  age: 72,
  date: '2024-01-13',
  time: '14:00',
  type: 'Effort',
  cardiologue: 'Dr. Karim Mansour',
  status: 'Critique',
  heartRate: 145,
  prInterval: 140,
  qrsDuration: 110,
  qtInterval: 380,
  diagnosis:
  "Sous-décalage ST significatif à l'effort. Ischémie myocardique probable.",
  recommendations: [
  'Coronarographie urgente recommandée',
  "Arrêt de l'effort physique intense",
  'Hospitalisation envisagée',
  'Traitement anticoagulant à discuter'],

  notes: "Douleurs thoraciques à l'effort depuis 3 semaines."
},
{
  id: 'ECG-2024-004',
  patient: 'Leila Hamdi',
  age: 45,
  date: '2024-01-12',
  time: '10:00',
  type: 'Repos',
  cardiologue: 'Dr. Sonia Belhadj',
  status: 'Normal',
  heartRate: 68,
  prInterval: 155,
  qrsDuration: 85,
  qtInterval: 390,
  diagnosis: 'ECG normal. Rythme sinusal régulier.',
  recommendations: ['Pas de traitement nécessaire', 'Contrôle dans 1 an'],
  notes: 'Bilan préopératoire.'
},
{
  id: 'ECG-2024-005',
  patient: 'Youssef Gharbi',
  age: 61,
  date: '2024-01-11',
  time: '16:30',
  type: 'Holter 48h',
  cardiologue: 'Dr. Karim Mansour',
  status: 'Anormal',
  heartRate: 95,
  prInterval: 180,
  qrsDuration: 100,
  qtInterval: 430,
  diagnosis:
  'Fibrillation auriculaire paroxystique détectée. Episodes nocturnes.',
  recommendations: [
  'Anticoagulation à instaurer',
  'Contrôle de la fréquence cardiaque',
  'Cardioversion à discuter'],

  notes: 'Palpitations intermittentes depuis 2 mois.'
}];

function ECGWaveform({ status }: {status: string;}) {
  const color =
  status === 'Normal' ?
  '#22c55e' :
  status === 'Anormal' ?
  '#f59e0b' :
  '#ef4444';
  const normalPath =
  'M0,50 L20,50 L25,50 L30,20 L35,80 L40,10 L45,50 L55,50 L60,45 L65,50 L80,50 L85,50 L90,20 L95,80 L100,10 L105,50 L115,50 L120,45 L125,50 L140,50 L145,50 L150,20 L155,80 L160,10 L165,50 L175,50 L180,45 L185,50 L200,50 L205,50 L210,20 L215,80 L220,10 L225,50 L235,50 L240,45 L245,50 L260,50 L265,50 L270,20 L275,80 L280,10 L285,50 L295,50 L300,45 L305,50 L320,50';
  const anormalPath =
  'M0,50 L20,50 L25,50 L30,15 L35,85 L40,5 L45,50 L55,50 L60,40 L65,55 L70,50 L80,50 L85,50 L90,15 L95,85 L100,5 L105,50 L115,50 L120,40 L125,55 L130,50 L140,50 L145,50 L150,15 L155,85 L160,5 L165,50 L175,50 L180,40 L185,55 L190,50 L200,50 L205,50 L210,15 L215,85 L220,5 L225,50 L235,50 L240,40 L245,55 L250,50 L260,50 L265,50 L270,15 L275,85 L280,5 L285,50 L295,50 L300,40 L305,55 L310,50 L320,50';
  const criticalPath =
  'M0,50 L15,50 L20,50 L25,10 L30,90 L35,0 L40,50 L45,30 L50,60 L55,50 L60,50 L65,50 L70,10 L75,90 L80,0 L85,50 L90,30 L95,60 L100,50 L105,50 L110,50 L115,10 L120,90 L125,0 L130,50 L135,30 L140,60 L145,50 L150,50 L155,50 L160,10 L165,90 L170,0 L175,50 L180,30 L185,60 L190,50 L195,50 L200,50 L205,10 L210,90 L215,0 L220,50 L225,30 L230,60 L235,50 L240,50 L245,50 L250,10 L255,90 L260,0 L265,50 L270,30 L275,60 L280,50 L285,50 L290,50 L295,10 L300,90 L305,0 L310,50 L315,30 L320,60';
  const path =
  status === 'Normal' ?
  normalPath :
  status === 'Anormal' ?
  anormalPath :
  criticalPath;
  return (
    <div className="bg-gray-900 rounded-lg p-3 relative overflow-hidden">
      <svg
        width="100%"
        height="70"
        viewBox="0 0 320 100"
        className="absolute inset-0 opacity-20">

        {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((x) =>
        <line
          key={x}
          x1={x}
          y1="0"
          x2={x}
          y2="100"
          stroke="#22c55e"
          strokeWidth="0.5" />

        )}
        {[0, 20, 40, 60, 80, 100].map((y) =>
        <line
          key={y}
          x1="0"
          y1={y}
          x2="320"
          y2={y}
          stroke="#22c55e"
          strokeWidth="0.5" />

        )}
      </svg>
      <svg
        width="100%"
        height="70"
        viewBox="0 0 320 100"
        className="relative z-10">

        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round" />

      </svg>
      <div className="absolute top-1.5 right-2 flex items-center gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        <span className="text-green-400 text-[10px] font-mono">LIVE</span>
      </div>
    </div>);

}

function buildArrowHeadPoints(x1: number, y1: number, x2: number, y2: number) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const headLength = 2;
  const x3 = x2 - headLength * Math.cos(angle - Math.PI / 7);
  const y3 = y2 - headLength * Math.sin(angle - Math.PI / 7);
  const x4 = x2 - headLength * Math.cos(angle + Math.PI / 7);
  const y4 = y2 - headLength * Math.sin(angle + Math.PI / 7);
  return `${x2},${y2} ${x3},${y3} ${x4},${y4}`;
}

function renderECGAnnotation(annotation: ECGImageAnnotation) {
  switch (annotation.type) {
    case 'rect':
      return (
        <rect
          key={annotation.id}
          x={Math.min(annotation.x, annotation.x + (annotation.width || 0))}
          y={Math.min(annotation.y, annotation.y + (annotation.height || 0))}
          width={Math.abs(annotation.width || 0)}
          height={Math.abs(annotation.height || 0)}
          fill="transparent"
          stroke={annotation.color}
          strokeWidth={annotation.strokeWidth}
          rx="0.8"
        />
      );
    case 'circle': {
      const radius = Math.max(
        Math.abs(annotation.width || 0),
        Math.abs(annotation.height || 0)
      ) / 2;
      return (
        <circle
          key={annotation.id}
          cx={annotation.x + (annotation.width || 0) / 2}
          cy={annotation.y + (annotation.height || 0) / 2}
          r={Math.abs(radius)}
          fill="transparent"
          stroke={annotation.color}
          strokeWidth={annotation.strokeWidth}
        />
      );
    }
    case 'line':
      return (
        <line
          key={annotation.id}
          x1={annotation.x}
          y1={annotation.y}
          x2={annotation.endX}
          y2={annotation.endY}
          stroke={annotation.color}
          strokeWidth={annotation.strokeWidth}
          strokeLinecap="round"
        />
      );
    case 'arrow':
      return (
        <g key={annotation.id}>
          <line
            x1={annotation.x}
            y1={annotation.y}
            x2={annotation.endX}
            y2={annotation.endY}
            stroke={annotation.color}
            strokeWidth={annotation.strokeWidth}
            strokeLinecap="round"
          />
          <polygon
            points={buildArrowHeadPoints(
              annotation.x,
              annotation.y,
              annotation.endX || annotation.x,
              annotation.endY || annotation.y
            )}
            fill={annotation.color}
          />
        </g>
      );
    case 'freehand':
      return (
        <polyline
          key={annotation.id}
          points={(annotation.points || [])
            .map((point) => `${point.x},${point.y}`)
            .join(' ')}
          fill="none"
          stroke={annotation.color}
          strokeWidth={annotation.strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case 'text':
      return (
        <text
          key={annotation.id}
          x={annotation.x}
          y={annotation.y}
          fill={annotation.color}
          fontSize={Math.max(2.4, annotation.strokeWidth * 2.8)}
          fontFamily="'Segoe Print', 'Bradley Hand', 'Comic Sans MS', cursive"
          fontWeight="600">
          {annotation.text}
        </text>
      );
    default:
      return null;
  }
}

function ECGAnnotatedImage({
  imageSrc,
  annotations,
  className
}: {
  imageSrc: string;
  annotations: ECGImageAnnotation[];
  className?: string;
}) {
  return (
    <div className={className || 'relative w-full'}>
      <img src={imageSrc} alt="ECG" className="w-full h-auto rounded-xl border border-slate-200 bg-white" />
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none rounded-xl overflow-hidden">
        {annotations.map((annotation) => renderECGAnnotation(annotation))}
      </svg>
    </div>
  );
}

function ECGImageAnnotator({
  imageSrc,
  annotations,
  onImageChange,
  onAnnotationsChange
}: {
  imageSrc: string | null;
  annotations: ECGImageAnnotation[];
  onImageChange: (src: string | null) => void;
  onAnnotationsChange: (annotations: ECGImageAnnotation[]) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeTool, setActiveTool] = useState<ECGImageAnnotation['type']>('arrow');
  const [strokeColor, setStrokeColor] = useState('#ef4444');
  const [strokeWidth, setStrokeWidth] = useState(1.1);
  const [textDraft, setTextDraft] = useState('onde T inversée');
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [pendingTextPosition, setPendingTextPosition] = useState<{ x: number; y: number } | null>(null);
  const [draggingTextId, setDraggingTextId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(null);
  const [draftAnnotation, setDraftAnnotation] = useState<ECGImageAnnotation | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const getRelativePosition = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) {
      return { x: 0, y: 0 };
    }
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    return {
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y))
    };
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onImageChange(reader.result as string);
      onAnnotationsChange([]);
    };
    reader.readAsDataURL(file);
  };

  const estimateTextBox = (annotation: ECGImageAnnotation) => {
    const fontSize = Math.max(2.4, annotation.strokeWidth * 2.8);
    const textLength = (annotation.text || '').length;
    const width = Math.max(5, textLength * fontSize * 0.62);
    const height = fontSize * 1.2;
    const left = annotation.x;
    const top = annotation.y - fontSize;
    return {
      left,
      top,
      right: left + width,
      bottom: top + height
    };
  };

  const findTextAtPosition = (x: number, y: number) => {
    const textAnnotations = annotations
      .filter((annotation) => annotation.type === 'text')
      .slice()
      .reverse();

    return textAnnotations.find((annotation) => {
      const box = estimateTextBox(annotation);
      return x >= box.left - 1.2 && x <= box.right + 1.2 && y >= box.top - 1.2 && y <= box.bottom + 1.2;
    });
  };

  const openTextModalAt = (x: number, y: number) => {
    setPendingTextPosition({ x, y });
    setIsTextModalOpen(true);
  };

  const closeTextModal = () => {
    setIsTextModalOpen(false);
    setPendingTextPosition(null);
  };

  const submitTextAnnotation = () => {
    if (!pendingTextPosition || !textDraft.trim()) return;
    onAnnotationsChange([
      ...annotations,
      {
        id: `${Date.now()}`,
        type: 'text',
        x: pendingTextPosition.x,
        y: pendingTextPosition.y,
        color: strokeColor,
        strokeWidth,
        text: textDraft.trim()
      }
    ]);
    closeTextModal();
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!imageSrc) return;
    const { x, y } = getRelativePosition(event);

    if (activeTool === 'text') {
      const clickedText = findTextAtPosition(x, y);
      if (clickedText) {
        setDraggingTextId(clickedText.id);
        setDragOffset({ x: x - clickedText.x, y: y - clickedText.y });
        return;
      }

      openTextModalAt(x, y);
      return;
    }

    setIsDrawing(true);
    if (activeTool === 'freehand') {
      setDraftAnnotation({
        id: `${Date.now()}`,
        type: 'freehand',
        x,
        y,
        color: strokeColor,
        strokeWidth,
        points: [{ x, y }]
      });
      return;
    }

    setDraftAnnotation({
      id: `${Date.now()}`,
      type: activeTool,
      x,
      y,
      endX: x,
      endY: y,
      width: 0,
      height: 0,
      color: strokeColor,
      strokeWidth
    });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (draggingTextId) {
      const { x, y } = getRelativePosition(event);
      const offsetX = dragOffset?.x || 0;
      const offsetY = dragOffset?.y || 0;
      onAnnotationsChange(
        annotations.map((annotation) =>
          annotation.id === draggingTextId
            ? {
                ...annotation,
                x: Math.max(0, Math.min(100, x - offsetX)),
                y: Math.max(0, Math.min(100, y - offsetY))
              }
            : annotation
        )
      );
      return;
    }

    if (!isDrawing || !draftAnnotation) return;
    const { x, y } = getRelativePosition(event);

    if (draftAnnotation.type === 'freehand') {
      setDraftAnnotation((prev) =>
        prev ? { ...prev, points: [...(prev.points || []), { x, y }] } : prev
      );
      return;
    }

    setDraftAnnotation((prev) =>
      prev
        ? {
            ...prev,
            width: x - prev.x,
            height: y - prev.y,
            endX: x,
            endY: y
          }
        : prev
    );
  };

  const commitDraft = () => {
    if (!draftAnnotation) {
      setIsDrawing(false);
      return;
    }

    const isTinyShape =
      draftAnnotation.type !== 'freehand' &&
      Math.abs(draftAnnotation.width || 0) < 0.6 &&
      Math.abs(draftAnnotation.height || 0) < 0.6;

    if (!isTinyShape) {
      onAnnotationsChange([...annotations, draftAnnotation]);
    }

    setDraftAnnotation(null);
    setIsDrawing(false);
  };

  const handleMouseUp = () => {
    if (draggingTextId) {
      setDraggingTextId(null);
      setDragOffset(null);
      return;
    }
    commitDraft();
  };

  useEffect(() => {
    if (!isTextModalOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeTextModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isTextModalOpen]);

  const toolbarTools: Array<{ type: ECGImageAnnotation['type']; label: string }> = [
    { type: 'arrow', label: 'Flèche' },
    { type: 'line', label: 'Ligne' },
    { type: 'rect', label: 'Rectangle' },
    { type: 'circle', label: 'Cercle' },
    { type: 'freehand', label: 'Main levée' },
    { type: 'text', label: 'Texte manuscrit' }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Image ECG & annotations</h3>
          <p className="text-xs text-slate-500 mt-1">
            Chargez une image puis cliquez dans l'image pour dessiner ou poser du texte à main levée.
          </p>
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-medium hover:bg-red-700">
          {imageSrc ? 'Remplacer image' : 'Uploader image'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          {toolbarTools.map((tool) => (
            <button
              key={tool.type}
              type="button"
              onClick={() => setActiveTool(tool.type)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border ${activeTool === tool.type ? 'bg-red-600 text-white border-red-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>
              {tool.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => onAnnotationsChange(annotations.slice(0, -1))}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium border border-slate-200 text-slate-600 hover:bg-slate-50"
            disabled={annotations.length === 0}>
            Suppr. dernier
          </button>
          <button
            type="button"
            onClick={() => onAnnotationsChange([])}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium border border-slate-200 text-slate-600 hover:bg-slate-50"
            disabled={annotations.length === 0}>
            Effacer tout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[110px,1fr,140px] gap-3 items-center">
          <label className="flex items-center gap-2 text-xs text-slate-600">
            Couleur
            <input
              type="color"
              value={strokeColor}
              onChange={(e) => setStrokeColor(e.target.value)}
              className="w-9 h-8 p-0 border border-slate-200 rounded"
            />
          </label>
          <label className="flex items-center gap-3 text-xs text-slate-600">
            Épaisseur
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={strokeWidth}
              onChange={(e) => setStrokeWidth(Number(e.target.value))}
              className="flex-1"
            />
            <span className="font-medium text-slate-700">{strokeWidth.toFixed(1)}</span>
          </label>
          <button
            type="button"
            onClick={() => openTextModalAt(50, 50)}
            className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            Ouvrir le carnet manuscrit
          </button>
        </div>
        <p className="text-[11px] text-slate-400">
          Le texte manuscrit s'ajoute via une modale élégante et peut ensuite être déplacé directement sur l'image.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-3">
        {imageSrc ? (
          <div
            ref={stageRef}
            className={`relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 bg-white select-none ${activeTool === 'text' ? 'cursor-move' : 'cursor-crosshair'}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}>
            <img src={imageSrc} alt="ECG upload" className="absolute inset-0 w-full h-full object-contain bg-white" />
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
              {annotations.map((annotation) => renderECGAnnotation(annotation))}
              {draftAnnotation && renderECGAnnotation(draftAnnotation)}
            </svg>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full aspect-[4/3] rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 transition-colors flex flex-col items-center justify-center text-center px-6">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xl font-bold mb-3">
              ECG
            </div>
            <p className="text-sm font-semibold text-slate-800">Uploader une image ECG</p>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              PNG, JPG ou capture d'écran d'un tracé ECG. Une fois chargée, vous pourrez ajouter des formes, des flèches, du tracé libre et des commentaires manuscrits.
            </p>
          </button>
        )}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white px-3 py-2">
        <p className="text-xs font-semibold text-slate-700">Résumé de l'annotation</p>
        <div className="grid grid-cols-3 gap-3 mt-2 text-center">
          <div>
            <p className="text-lg font-bold text-slate-900">{annotations.length}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wide">Annotations</p>
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900">{annotations.filter((item) => item.type === 'text').length}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wide">Textes</p>
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900">{annotations.filter((item) => item.type !== 'text').length}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wide">Formes</p>
          </div>
        </div>
      </div>

      {isTextModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            onClick={closeTextModal}
            className="absolute inset-0 bg-slate-900/45 backdrop-blur-[2px]"
            aria-label="Fermer la modale texte"
          />
          <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/60 bg-gradient-to-br from-sky-50 via-white to-rose-50 shadow-2xl p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-sky-600 font-semibold">Annotation manuscrite</p>
                <h4 className="text-lg font-semibold text-slate-900 mt-1">Écrire une note clinique</h4>
              </div>
              <button
                type="button"
                onClick={closeTextModal}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-white/70 hover:text-slate-700">
                <XIcon size={16} />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <textarea
                value={textDraft}
                onChange={(e) => setTextDraft(e.target.value)}
                rows={3}
                placeholder="Ex: sus-décalage ST en DII, DIII, aVF"
                className="w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none"
              />
              <div className="rounded-xl border border-dashed border-slate-300 bg-white/70 px-3 py-2">
                <p className="text-[11px] text-slate-500 uppercase tracking-wide">Aperçu manuscrit</p>
                <p
                  className="mt-1 text-base"
                  style={{
                    color: strokeColor,
                    fontFamily: "'Segoe Print', 'Bradley Hand', 'Comic Sans MS', cursive",
                    fontWeight: 600
                  }}>
                  {textDraft.trim() || 'Votre texte apparaîtra ici...'}
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={closeTextModal}
                className="px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50">
                Annuler
              </button>
              <button
                type="button"
                onClick={submitTextAnnotation}
                disabled={!textDraft.trim()}
                className="px-3 py-2 rounded-xl bg-sky-600 text-white text-sm font-medium hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed">
                Ajouter sur l'image
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function NewECGModal({
  onClose,
  onSave



}: {onClose: () => void;onSave: (data: any) => void;}) {
  const { selectedPatient } = usePatient();
  const [ecgImageSrc, setEcgImageSrc] = useState<string | null>(null);
  const [ecgAnnotations, setEcgAnnotations] = useState<ECGImageAnnotation[]>([]);
  const [form, setForm] = useState({
    patient: selectedPatient.name,
    date: new Date().toISOString().split('T')[0],
    heure: new Date().toTimeString().slice(0, 5),
    type: 'Repos',
    cardiologue: '',
    motif: '',
    notes: ''
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      ecgImageSrc,
      ecgAnnotations
    });
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-7xl max-h-[92vh] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-600 rounded-md flex items-center justify-center">
              <ActivityIcon size={13} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-900">
              Nouvel ECG
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded text-gray-400">

            <XIcon size={14} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-2 min-h-[760px] max-h-[calc(92vh-58px)]">
          <div className="p-4 space-y-3 overflow-y-auto border-r border-gray-100">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Patient *
              </label>
              <div className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-xs">
                <p className="font-semibold text-gray-900">{selectedPatient.name}</p>
                <p className="text-[10px] text-gray-500">
                  {selectedPatient.age} ans • Dossier #{selectedPatient.dossier}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) =>
                  setForm({
                    ...form,
                    date: e.target.value
                  })
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-red-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Heure *
                </label>
                <input
                  type="time"
                  required
                  value={form.heure}
                  onChange={(e) =>
                  setForm({
                    ...form,
                    heure: e.target.value
                  })
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-red-500" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Type d'ECG *
              </label>
              <select
                required
                value={form.type}
                onChange={(e) =>
                setForm({
                  ...form,
                  type: e.target.value
                })
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-red-500">
                <option value="Repos">ECG de Repos</option>
                <option value="Effort">ECG d'Effort</option>
                <option value="Holter 24h">Holter 24h</option>
                <option value="Holter 48h">Holter 48h</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Cardiologue assigné *
              </label>
              <select
                required
                value={form.cardiologue}
                onChange={(e) =>
                setForm({
                  ...form,
                  cardiologue: e.target.value
                })
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-red-500">
                <option value="">Sélectionner un cardiologue</option>
                <option value="Dr. Karim Mansour">Dr. Karim Mansour</option>
                <option value="Dr. Sonia Belhadj">Dr. Sonia Belhadj</option>
                <option value="Dr. Ahmed Riahi">Dr. Ahmed Riahi</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Motif
              </label>
              <input
                type="text"
                value={form.motif}
                onChange={(e) =>
                setForm({
                  ...form,
                  motif: e.target.value
                })
                }
                placeholder="Ex: Douleurs thoraciques, bilan de routine..."
                className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-red-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Notes cliniques
              </label>
              <textarea
                value={form.notes}
                onChange={(e) =>
                setForm({
                  ...form,
                  notes: e.target.value
                })
                }
                rows={4}
                placeholder="Observations cliniques..."
                className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-red-500 resize-none" />
            </div>
            <div className="rounded-xl border border-red-100 bg-red-50 px-3 py-2">
              <p className="text-xs font-semibold text-red-800">Image ECG annotable</p>
              <p className="text-[11px] text-red-600 mt-1">
                Chargez une image d'ECG puis annotez-la avec des formes, des flèches, du tracé libre et des notes manuscrites dans le panneau de droite.
              </p>
            </div>
            <div className="flex gap-2 pt-1 sticky bottom-0 bg-white">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-3 py-2 border border-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50">
                Annuler
              </button>
              <button
                type="submit"
                className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700">
                Enregistrer l'ECG
              </button>
            </div>
          </div>
          <div className="p-4 bg-slate-50 overflow-y-auto">
            <ECGImageAnnotator
              imageSrc={ecgImageSrc}
              annotations={ecgAnnotations}
              onImageChange={setEcgImageSrc}
              onAnnotationsChange={setEcgAnnotations}
            />
          </div>
        </form>
      </div>
    </div>);

}
function ECGDetailPanel({
  ecg,
  onClose



}: {ecg: ECGRecord;onClose: () => void;}) {
  const statusBadgeClass =
  ecg.status === 'Normal' ?
  'bg-green-100 text-green-700' :
  ecg.status === 'Anormal' ?
  'bg-amber-100 text-amber-700' :
  'bg-red-100 text-red-700';
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50 sticky top-0">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">

              <ChevronLeftIcon size={13} />
              Retour
            </button>
            <span className="text-gray-300">|</span>
            <div className="w-5 h-5 bg-red-600 rounded flex items-center justify-center">
              <ActivityIcon size={11} className="text-white" />
            </div>
            <span className="text-xs font-semibold text-gray-900">
              {ecg.patient}
            </span>
            <span className="text-xs text-gray-400">{ecg.id}</span>
            <span
              className={`px-1.5 py-0.5 rounded text-xs font-medium ${statusBadgeClass}`}>

              {ecg.status}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button className="flex items-center gap-1 px-2 py-1 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
              <PrinterIcon size={11} />
              Imprimer
            </button>
            <button className="flex items-center gap-1 px-2 py-1 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
              <DownloadIcon size={11} />
              PDF
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded text-gray-400">

              <XIcon size={14} />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {/* Info row */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <CalendarIcon size={11} />
              {ecg.date} à {ecg.time}
            </span>
            <span className="flex items-center gap-1">
              <UserIcon size={11} />
              {ecg.cardiologue}
            </span>
            <span className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-xs">
              {ecg.type}
            </span>
          </div>

          {/* ECG Waveform */}
          <div>
            <div className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
              <ActivityIcon size={12} className="text-red-600" />
              Tracé ECG
            </div>
            <ECGWaveform status={ecg.status} />
          </div>

          {ecg.ecgImageSrc &&
          <div>
              <div className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <EyeIcon size={12} className="text-red-600" />
                Image ECG annotée
              </div>
              <ECGAnnotatedImage
                imageSrc={ecg.ecgImageSrc}
                annotations={ecg.ecgAnnotations || []}
                className="relative w-full max-w-3xl mx-auto" />
            </div>
          }

          {/* Measurements */}
          <div>
            <div className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
              <TrendingUpIcon size={12} className="text-red-600" />
              Mesures et paramètres
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-red-50 border border-red-100 rounded-lg p-2.5 text-center">
                <HeartIcon size={14} className="text-red-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-red-700">
                  {ecg.heartRate}
                </p>
                <p className="text-[10px] text-red-600">bpm</p>
                <p className="text-[10px] text-gray-500 mt-0.5">Fréquence</p>
              </div>
              <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-2.5 text-center">
                <ActivityIcon
                  size={14}
                  className="text-indigo-600 mx-auto mb-1" />

                <p className="text-lg font-bold text-indigo-700">
                  {ecg.prInterval}
                </p>
                <p className="text-[10px] text-indigo-600">ms</p>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  Intervalle PR
                </p>
              </div>
              <div className="bg-purple-50 border border-purple-100 rounded-lg p-2.5 text-center">
                <ZapIcon size={14} className="text-purple-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-purple-700">
                  {ecg.qrsDuration}
                </p>
                <p className="text-[10px] text-purple-600">ms</p>
                <p className="text-[10px] text-gray-500 mt-0.5">Durée QRS</p>
              </div>
              <div className="bg-pink-50 border border-pink-100 rounded-lg p-2.5 text-center">
                <ClockIcon size={14} className="text-pink-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-pink-700">
                  {ecg.qtInterval}
                </p>
                <p className="text-[10px] text-pink-600">ms</p>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  Intervalle QT
                </p>
              </div>
            </div>
          </div>

          {/* Diagnosis */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <div className="text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
              <CheckCircleIcon size={12} className="text-red-600" />
              Interprétation et diagnostic
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">
              {ecg.diagnosis}
            </p>
          </div>

          {/* Recommendations */}
          <div>
            <div className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
              <AlertTriangleIcon size={12} className="text-red-600" />
              Recommandations
            </div>
            <div className="space-y-1">
              {ecg.recommendations.map((rec, i) =>
              <div
                key={i}
                className="flex items-start gap-2 text-xs text-gray-700">

                  <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {rec}
                </div>
              )}
            </div>
          </div>

          {ecg.notes &&
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="text-xs font-semibold text-amber-800 mb-1">
                Notes cliniques
              </div>
              <p className="text-xs text-amber-700">{ecg.notes}</p>
            </div>
          }
        </div>
      </div>
    </div>);

}
export function ECGReports() {
  const { selectedPatient } = usePatient();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedECG, setSelectedECG] = useState<ECGRecord | null>(null);
  const [showNewECGModal, setShowNewECGModal] = useState(false);
  const [records, setRecords] = useState<ECGRecord[]>(ecgData);
  const filtered = records.filter((ecg) => {
    const matchPatient =
      ecg.patient.toLowerCase() === selectedPatient.name.toLowerCase();
    const matchSearch =
    ecg.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ecg.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filterStatus === 'all' || ecg.status === filterStatus;
    return matchPatient && matchSearch && matchFilter;
  });
  const stats = {
    total: filtered.length,
    normal: filtered.filter((e) => e.status === 'Normal').length,
    anormal: filtered.filter((e) => e.status === 'Anormal').length,
    critique: filtered.filter((e) => e.status === 'Critique').length
  };
  const handleSaveNewECG = (data: any) => {
    const newRecord: ECGRecord = {
      id: `ECG-2024-00${records.length + 1}`,
      patient: selectedPatient.name,
      age: selectedPatient.age,
      date: data.date,
      time: data.heure,
      type: data.type,
      cardiologue: data.cardiologue,
      status: 'Normal',
      heartRate: 75,
      prInterval: 160,
      qrsDuration: 90,
      qtInterval: 400,
      diagnosis: "En attente d'interprétation.",
      recommendations: ['Interprétation en cours'],
      notes: data.notes,
      ecgImageSrc: data.ecgImageSrc,
      ecgAnnotations: data.ecgAnnotations || []
    };
    setRecords([newRecord, ...records]);
  };
  const statusBadge = (status: string) => {
    if (status === 'Normal') return 'bg-green-100 text-green-700';
    if (status === 'Anormal') return 'bg-amber-100 text-amber-700';
    return 'bg-red-100 text-red-700';
  };
  const typeBadge = (type: string) => {
    const map: Record<string, string> = {
      Repos: 'bg-red-100 text-red-700',
      Effort: 'bg-orange-100 text-orange-700',
      'Holter 24h': 'bg-purple-100 text-purple-700',
      'Holter 48h': 'bg-indigo-100 text-indigo-700'
    };
    return map[type] || 'bg-gray-100 text-gray-700';
  };
  return (
    <div className="min-h-screen bg-gray-50 p-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-red-600 rounded-lg flex items-center justify-center">
            <ActivityIcon size={14} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900">Rapports ECG</h1>
            <p className="text-xs text-gray-500">
              Gestion et consultation des électrocardiogrammes
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <SearchIcon
              size={12}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Rechercher un patient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-6 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white w-44 focus:outline-none focus:ring-1 focus:ring-red-500" />

          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="py-1.5 px-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-red-500">

            <option value="all">Tous</option>
            <option value="Normal">Normal</option>
            <option value="Anormal">Anormal</option>
            <option value="Critique">Critique</option>
          </select>
          <button
            onClick={() => setShowNewECGModal(true)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">

            <PlusIcon size={12} />
            Nouvel ECG
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        <div className="bg-white border border-red-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Total ECG</span>
            <ActivityIcon size={14} className="text-red-500" />
          </div>
          <div className="text-xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-xs text-gray-500 mt-0.5">Ce mois</div>
        </div>
        <div className="bg-white border border-green-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Normaux</span>
            <CheckCircleIcon size={14} className="text-green-500" />
          </div>
          <div className="text-xl font-bold text-green-600">{stats.normal}</div>
          <div className="text-xs text-gray-500 mt-0.5">
            {Math.round(stats.normal / stats.total * 100)}% du total
          </div>
        </div>
        <div className="bg-white border border-amber-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Anormaux</span>
            <AlertTriangleIcon size={14} className="text-amber-500" />
          </div>
          <div className="text-xl font-bold text-amber-600">
            {stats.anormal}
          </div>
          <div className="text-xs text-gray-500 mt-0.5">Suivi requis</div>
        </div>
        <div className="bg-white border border-red-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Critiques</span>
            <ZapIcon size={14} className="text-red-500" />
          </div>
          <div className="text-xl font-bold text-red-600">{stats.critique}</div>
          <div className="text-xs text-red-500 mt-0.5">Action urgente</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-gray-50">
          <h2 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
            <ActivityIcon size={12} className="text-red-500" />
            Liste des ECG
          </h2>
          <span className="text-xs text-gray-400">
            {filtered.length} enregistrement(s)
          </span>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Patient
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Date & Heure
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Type
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Cardiologue
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                FC (bpm)
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Statut
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((ecg) =>
            <tr
              key={ecg.id}
              className={`border-b border-gray-50 hover:bg-gray-50 ${ecg.status === 'Critique' ? 'bg-red-50' : ''}`}>

                <td className="px-3 py-1.5">
                  <div className="text-xs font-medium text-gray-800">
                    {ecg.patient}
                  </div>
                  <div className="text-xs text-gray-400">{ecg.id}</div>
                </td>
                <td className="px-3 py-1.5">
                  <div className="text-xs text-gray-700">{ecg.date}</div>
                  <div className="text-xs text-gray-400">{ecg.time}</div>
                </td>
                <td className="px-3 py-1.5">
                  <span
                  className={`px-1.5 py-0.5 rounded text-xs ${typeBadge(ecg.type)}`}>

                    {ecg.type}
                  </span>
                </td>
                <td className="px-3 py-1.5 text-xs text-gray-600">
                  {ecg.cardiologue}
                </td>
                <td className="px-3 py-1.5">
                  <div className="flex items-center gap-1">
                    <HeartIcon size={11} className="text-red-400" />
                    <span className="font-semibold text-gray-900 text-xs">
                      {ecg.heartRate}
                    </span>
                  </div>
                </td>
                <td className="px-3 py-1.5">
                  <span
                  className={`px-1.5 py-0.5 rounded text-xs font-medium ${statusBadge(ecg.status)}`}>

                    {ecg.status}
                  </span>
                </td>
                <td className="px-3 py-1.5">
                  <div className="flex items-center gap-1">
                    <button
                    onClick={() => setSelectedECG(ecg)}
                    className="p-1 hover:bg-red-50 rounded text-gray-400 hover:text-red-600 transition-colors">

                      <EyeIcon size={11} />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors">
                      <PrinterIcon size={11} />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors">
                      <DownloadIcon size={11} />
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {filtered.length === 0 &&
        <div className="text-center py-8 text-gray-400">
            <ActivityIcon size={24} className="mx-auto mb-2 opacity-30" />
            <p className="text-xs font-medium">Aucun ECG trouvé</p>
          </div>
        }
      </div>

      {showNewECGModal &&
      <NewECGModal
        onClose={() => setShowNewECGModal(false)}
        onSave={handleSaveNewECG} />

      }
      {selectedECG &&
      <ECGDetailPanel
        ecg={selectedECG}
        onClose={() => setSelectedECG(null)} />

      }
    </div>);

}
export default ECGReports;