import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  createElement } from
'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ScanIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  UploadIcon,
  HeartIcon,
  ActivityIcon,
  ZapIcon,
  FileTextIcon,
  DownloadIcon,
  XIcon,
  UserIcon,
  ChevronDownIcon,
  TagIcon,
  InfoIcon,
  ImageIcon,
  FolderOpenIcon,
  CheckIcon,
  LayersIcon } from
'lucide-react';
import { usePatient } from '../contexts/PatientContext';
// ─── TYPES ────────────────────────────────────────────────────────────────────
interface ImagingStudy {
  id: number;
  patient: string;
  age: number;
  modality: 'Echo' | 'IRM' | 'Scanner' | 'Angiographie';
  date: string;
  ef?: number;
  lvDimension?: string;
  wallThickness?: string;
  findings: string;
  severity: 'normal' | 'mild' | 'moderate' | 'severe';
  status: 'urgent' | 'pending' | 'validated';
  aiFindings: string[];
  dicomFile?: File;
  dicomImageUrl?: string;
  dicomTags?: DicomTag[];
  dicomMeta?: DicomMeta;
}
interface DicomTag {
  tag: string;
  name: string;
  vr: string;
  value: string;
}
interface DicomMeta {
  patientName: string;
  patientId: string;
  patientBirthDate: string;
  patientSex: string;
  studyDate: string;
  studyTime: string;
  studyDescription: string;
  seriesDescription: string;
  modality: string;
  institutionName: string;
  rows: number;
  columns: number;
  bitsAllocated: number;
  windowCenter: string;
  windowWidth: string;
  transferSyntax: string;
}
// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const imagingStudies: ImagingStudy[] = [
{
  id: 1,
  patient: 'Jean-Pierre Moreau',
  age: 67,
  modality: 'Echo',
  date: '28/02/2026',
  ef: 35,
  lvDimension: '62 mm',
  wallThickness: '11 mm',
  findings: 'FE réduite - Dysfonction systolique VG',
  severity: 'severe',
  status: 'urgent',
  aiFindings: [
  "Fraction d'éjection sévèrement réduite (35%)",
  'Dilatation du VG',
  'Hypokinésie antéro-septale',
  'Insuffisance mitrale modérée']

},
{
  id: 2,
  patient: 'Marie Lefevre',
  age: 54,
  modality: 'IRM',
  date: '27/02/2026',
  ef: 62,
  lvDimension: '48 mm',
  wallThickness: '9 mm',
  findings: 'Examen normal',
  severity: 'normal',
  status: 'validated',
  aiFindings: [
  'Morphologie et fonction VG normales',
  'Absence de rehaussement tardif au gadolinium',
  'Valves normales']

},
{
  id: 3,
  patient: 'Robert Blanc',
  age: 72,
  modality: 'Scanner',
  date: '26/02/2026',
  findings: 'Calcifications coronaires significatives',
  severity: 'moderate',
  status: 'pending',
  aiFindings: [
  'Score calcique élevé (CAC > 400)',
  'Calcifications LAD et CX',
  'Sténose ostiale LAD 40%']

},
{
  id: 4,
  patient: 'Sylvie Dupont',
  age: 48,
  modality: 'Echo',
  date: '25/02/2026',
  ef: 62,
  lvDimension: '46 mm',
  wallThickness: '8 mm',
  findings: 'Examen normal',
  severity: 'normal',
  status: 'validated',
  aiFindings: [
  'FE conservée (62%)',
  'Dimensions VG normales',
  'Absence de valvulopathie significative']

},
{
  id: 5,
  patient: 'Michel Bernard',
  age: 61,
  modality: 'Angiographie',
  date: '24/02/2026',
  ef: 55,
  lvDimension: '52 mm',
  wallThickness: '10 mm',
  findings: 'Sténose coronaire significative',
  severity: 'severe',
  status: 'urgent',
  aiFindings: [
  'Sténose LAD proximale 70%',
  'Sténose CX 50%',
  'Indication angioplastie LAD',
  'Coronaire droite normale']

},
{
  id: 6,
  patient: 'Françoise Martin',
  age: 58,
  modality: 'Echo',
  date: '23/02/2026',
  ef: 58,
  lvDimension: '50 mm',
  wallThickness: '9 mm',
  findings: 'Valvulopathie légère',
  severity: 'mild',
  status: 'validated',
  aiFindings: [
  'Insuffisance aortique légère',
  'FE conservée (58%)',
  'Surveillance annuelle recommandée']

}];

const PATIENT_OPTIONS = [
'Ahmed Ben Salem',
'Fatma Trabelsi',
'Mohamed Khelifi',
'Leila Hamdi',
'Karim Bouzid',
'Sonia Mejri',
'Riadh Gharbi',
'Nadia Sfar',
'Jean-Pierre Moreau',
'Marie Lefevre',
'Robert Blanc',
'Sylvie Dupont',
'Michel Bernard',
'Françoise Martin'];

// ─── DICOM TAG NAMES ──────────────────────────────────────────────────────────
const DICOM_TAG_NAMES: Record<string, string> = {
  x00020001: 'File Meta Information Version',
  x00020002: 'Media Storage SOP Class UID',
  x00020003: 'Media Storage SOP Instance UID',
  x00020010: 'Transfer Syntax UID',
  x00020012: 'Implementation Class UID',
  x00020013: 'Implementation Version Name',
  x00080005: 'Specific Character Set',
  x00080008: 'Image Type',
  x00080016: 'SOP Class UID',
  x00080018: 'SOP Instance UID',
  x00080020: 'Study Date',
  x00080021: 'Series Date',
  x00080022: 'Acquisition Date',
  x00080023: 'Content Date',
  x00080030: 'Study Time',
  x00080031: 'Series Time',
  x00080032: 'Acquisition Time',
  x00080033: 'Content Time',
  x00080050: 'Accession Number',
  x00080060: 'Modality',
  x00080070: 'Manufacturer',
  x00080080: 'Institution Name',
  x00080090: 'Referring Physician Name',
  x00081030: 'Study Description',
  x0008103e: 'Series Description',
  x00081090: 'Manufacturer Model Name',
  x00100010: 'Patient Name',
  x00100020: 'Patient ID',
  x00100030: 'Patient Birth Date',
  x00100040: 'Patient Sex',
  x00101010: 'Patient Age',
  x00101020: 'Patient Size',
  x00101030: 'Patient Weight',
  x00180050: 'Slice Thickness',
  x00180088: 'Spacing Between Slices',
  x00180090: 'Data Collection Diameter',
  x00181030: 'Protocol Name',
  x00185100: 'Patient Position',
  x00200010: 'Study ID',
  x00200011: 'Series Number',
  x00200013: 'Instance Number',
  x00200037: 'Image Orientation Patient',
  x00200052: 'Frame of Reference UID',
  x00201040: 'Position Reference Indicator',
  x00280002: 'Samples per Pixel',
  x00280004: 'Photometric Interpretation',
  x00280010: 'Rows',
  x00280011: 'Columns',
  x00280030: 'Pixel Spacing',
  x00280100: 'Bits Allocated',
  x00280101: 'Bits Stored',
  x00280102: 'High Bit',
  x00280103: 'Pixel Representation',
  x00281050: 'Window Center',
  x00281051: 'Window Width',
  x00281052: 'Rescale Intercept',
  x00281053: 'Rescale Slope',
  x7fe00010: 'Pixel Data'
};
// ─── DICOM PARSER ─────────────────────────────────────────────────────────────
async function parseDicomFile(file: File): Promise<{
  imageUrl: string | null;
  tags: DicomTag[];
  meta: DicomMeta;
}> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const byteArray = new Uint8Array(arrayBuffer);
        // Dynamically import dicom-parser with fallback
        let dicomParser;
        try {
          dicomParser = await import('dicom-parser');
        } catch (importErr) {
          console.warn('dicom-parser not available, using mock data');
          resolve({
            imageUrl: null,
            tags: [],
            meta: {
              patientName: 'N/A',
              patientId: 'N/A',
              patientBirthDate: 'N/A',
              patientSex: 'N/A',
              studyDate: 'N/A',
              studyTime: 'N/A',
              studyDescription: 'DICOM parsing unavailable',
              seriesDescription: 'N/A',
              modality: 'N/A',
              institutionName: 'N/A',
              rows: 0,
              columns: 0,
              bitsAllocated: 0,
              windowCenter: 'N/A',
              windowWidth: 'N/A',
              transferSyntax: 'N/A'
            }
          });
          return;
        }
        const dataSet = dicomParser.default.parseDicom(byteArray);
        // Extract all tags
        const tags: DicomTag[] = [];
        for (const tag in dataSet.elements) {
          const element = dataSet.elements[tag];
          const name =
          DICOM_TAG_NAMES[tag] || `(${tag.slice(1, 5)},${tag.slice(5)})`;
          let value = '';
          try {
            if (tag === 'x7fe00010') {
              value = `[Pixel Data — ${element.length} bytes]`;
            } else {
              value = dataSet.string(tag) || '';
            }
          } catch {
            value = `[Binary — ${element.length} bytes]`;
          }
          if (value) {
            tags.push({
              tag: `(${tag.slice(1, 5)},${tag.slice(5).toUpperCase()})`,
              name,
              vr: element.vr || '',
              value: value.trim()
            });
          }
        }
        // Extract metadata
        const getString = (tag: string) => {
          try {
            return dataSet.string(tag) || '';
          } catch {
            return '';
          }
        };
        const getUint16 = (tag: string) => {
          try {
            return dataSet.uint16(tag) || 0;
          } catch {
            return 0;
          }
        };
        const rows = getUint16('x00280010');
        const cols = getUint16('x00280011');
        const bitsAllocated = getUint16('x00280100');
        const bitsStored = getUint16('x00280101');
        const pixelRepresentation = getUint16('x00280103');
        const windowCenter = getString('x00281050');
        const windowWidth = getString('x00281051');
        const rescaleIntercept = parseFloat(getString('x00281052') || '0');
        const rescaleSlope = parseFloat(getString('x00281053') || '1');
        const meta: DicomMeta = {
          patientName:
          getString('x00100010').replace(/\^/g, ' ').trim() || 'N/A',
          patientId: getString('x00100020') || 'N/A',
          patientBirthDate: getString('x00100030') || 'N/A',
          patientSex: getString('x00100040') || 'N/A',
          studyDate: getString('x00080020') || 'N/A',
          studyTime: getString('x00080030') || 'N/A',
          studyDescription: getString('x00081030') || 'N/A',
          seriesDescription: getString('x0008103e') || 'N/A',
          modality: getString('x00080060') || 'N/A',
          institutionName: getString('x00080080') || 'N/A',
          rows,
          columns: cols,
          bitsAllocated,
          windowCenter,
          windowWidth,
          transferSyntax: getString('x00020010') || 'N/A'
        };
        // Render pixel data to canvas
        let imageUrl: string | null = null;
        try {
          const pixelDataElement = dataSet.elements['x7fe00010'];
          if (pixelDataElement && rows > 0 && cols > 0) {
            const canvas = document.createElement('canvas');
            canvas.width = cols;
            canvas.height = rows;
            const ctx = canvas.getContext('2d')!;
            const imageData = ctx.createImageData(cols, rows);
            const wc = windowCenter ?
            parseFloat(windowCenter.split('\\')[0]) :
            null;
            const ww = windowWidth ?
            parseFloat(windowWidth.split('\\')[0]) :
            null;
            if (bitsAllocated === 16) {
              const signed = pixelRepresentation === 1;
              const pixelData = signed ?
              new Int16Array(
                arrayBuffer,
                pixelDataElement.dataOffset,
                pixelDataElement.length / 2
              ) :
              new Uint16Array(
                arrayBuffer,
                pixelDataElement.dataOffset,
                pixelDataElement.length / 2
              );
              // Determine window
              let minVal = Infinity,
                maxVal = -Infinity;
              if (!wc || !ww) {
                for (let i = 0; i < pixelData.length; i++) {
                  const v = pixelData[i] * rescaleSlope + rescaleIntercept;
                  if (v < minVal) minVal = v;
                  if (v > maxVal) maxVal = v;
                }
              }
              const wcVal = wc ?? (minVal + maxVal) / 2;
              const wwVal = (ww ?? maxVal - minVal) || 1;
              for (let i = 0; i < pixelData.length; i++) {
                const hu = pixelData[i] * rescaleSlope + rescaleIntercept;
                let normalized = (hu - (wcVal - wwVal / 2)) / wwVal * 255;
                normalized = Math.max(0, Math.min(255, normalized));
                const idx = i * 4;
                imageData.data[idx] = normalized;
                imageData.data[idx + 1] = normalized;
                imageData.data[idx + 2] = normalized;
                imageData.data[idx + 3] = 255;
              }
            } else {
              // 8-bit
              const pixelData = new Uint8Array(
                arrayBuffer,
                pixelDataElement.dataOffset,
                pixelDataElement.length
              );
              for (let i = 0; i < pixelData.length; i++) {
                const idx = i * 4;
                imageData.data[idx] = pixelData[i];
                imageData.data[idx + 1] = pixelData[i];
                imageData.data[idx + 2] = pixelData[i];
                imageData.data[idx + 3] = 255;
              }
            }
            ctx.putImageData(imageData, 0, 0);
            imageUrl = canvas.toDataURL('image/png');
          }
        } catch (pixelErr) {
          console.warn('Could not render pixel data:', pixelErr);
        }
        resolve({
          imageUrl,
          tags,
          meta
        });
      } catch (err) {
        console.error('DICOM parse error:', err);
        resolve({
          imageUrl: null,
          tags: [],
          meta: {
            patientName: 'N/A',
            patientId: 'N/A',
            patientBirthDate: 'N/A',
            patientSex: 'N/A',
            studyDate: 'N/A',
            studyTime: 'N/A',
            studyDescription: 'N/A',
            seriesDescription: 'N/A',
            modality: 'N/A',
            institutionName: 'N/A',
            rows: 0,
            columns: 0,
            bitsAllocated: 0,
            windowCenter: '',
            windowWidth: '',
            transferSyntax: 'N/A'
          }
        });
      }
    };
    reader.readAsArrayBuffer(file);
  });
}
// ─── HELPERS ──────────────────────────────────────────────────────────────────
const getModalityColor = (modality: ImagingStudy['modality']) => {
  switch (modality) {
    case 'Echo':
      return 'bg-red-100 text-red-700';
    case 'IRM':
      return 'bg-purple-100 text-purple-700';
    case 'Scanner':
      return 'bg-amber-100 text-amber-700';
    case 'Angiographie':
      return 'bg-red-100 text-red-700';
  }
};
const getSeverityColor = (severity: ImagingStudy['severity']) => {
  switch (severity) {
    case 'normal':
      return {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        label: 'Normal'
      };
    case 'mild':
      return {
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200',
        label: 'Léger'
      };
    case 'moderate':
      return {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        label: 'Modéré'
      };
    case 'severe':
      return {
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200',
        label: 'Sévère'
      };
  }
};
const getStatusBadge = (status: ImagingStudy['status']) => {
  switch (status) {
    case 'urgent':
      return (
        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700">
          Urgent
        </span>);

    case 'pending':
      return (
        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700">
          En attente
        </span>);

    case 'validated':
      return (
        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">
          Validé
        </span>);

  }
};
const CardiacAnatomySVG = () =>
<svg viewBox="0 0 200 200" className="w-full h-full opacity-30" fill="none">
    <path
    d="M100,160 C100,160 40,120 40,75 C40,55 55,40 75,40 C87,40 97,46 100,55 C103,46 113,40 125,40 C145,40 160,55 160,75 C160,120 100,160 100,160 Z"
    stroke="#ef4444"
    strokeWidth="2"
    fill="none" />

    <path
    d="M75,80 L80,80 L82,70 L85,90 L88,65 L91,95 L94,80 L100,80 L103,75 L106,85 L109,80 L125,80"
    stroke="#22c55e"
    strokeWidth="1.5"
    strokeLinecap="round" />

    <ellipse
    cx="80"
    cy="85"
    rx="15"
    ry="20"
    stroke="#60a5fa"
    strokeWidth="1"
    fill="none"
    strokeDasharray="3,3" />

    <ellipse
    cx="120"
    cy="85"
    rx="15"
    ry="20"
    stroke="#60a5fa"
    strokeWidth="1"
    fill="none"
    strokeDasharray="3,3" />

    <path
    d="M85,65 L85,45 L95,45"
    stroke="#94a3b8"
    strokeWidth="1"
    strokeDasharray="2,2" />

    <path
    d="M115,65 L115,45 L105,45"
    stroke="#94a3b8"
    strokeWidth="1"
    strokeDasharray="2,2" />

    <path
    d="M100,110 L100,130"
    stroke="#94a3b8"
    strokeWidth="1.5"
    strokeDasharray="2,2" />

    <circle cx="85" cy="45" r="3" fill="#60a5fa" opacity="0.6" />
    <circle cx="115" cy="45" r="3" fill="#60a5fa" opacity="0.6" />
  </svg>;

// ─── IMPORT MODAL ─────────────────────────────────────────────────────────────
function ImportModal({
  onClose,
  onImport



}: {onClose: () => void;onImport: (study: ImagingStudy) => void;}) {
  const { patients, selectedPatient } = usePatient();
  const [patient, setPatient] = useState(selectedPatient.name);
  const [modality, setModality] = useState<ImagingStudy['modality']>('Echo');
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFile = (f: File) => {
    setFile(f);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };
  const handleImport = async () => {
    if (!patient || !file) return;
    setIsProcessing(true);
    let dicomImageUrl: string | undefined;
    let dicomTags: DicomTag[] | undefined;
    let dicomMeta: DicomMeta | undefined;
    try {
      const result = await parseDicomFile(file);
      dicomImageUrl = result.imageUrl || undefined;
      dicomTags = result.tags;
      dicomMeta = result.meta;
    } catch {

      // If parsing fails, still create the study without DICOM data
    }const newStudy: ImagingStudy = {
      id: Date.now(),
      patient,
      age: 0,
      modality,
      date: new Date().toLocaleDateString('fr-FR'),
      findings: dicomMeta?.seriesDescription || `${modality} importé`,
      severity: 'pending' as any,
      status: 'pending',
      aiFindings: ['Analyse IA en cours...'],
      dicomFile: file,
      dicomImageUrl,
      dicomTags,
      dicomMeta
    };
    setIsProcessing(false);
    setDone(true);
    setTimeout(() => {
      onImport(newStudy);
      onClose();
    }, 800);
  };
  const modalityOptions: {
    value: ImagingStudy['modality'];
    label: string;
    color: string;
  }[] = [
  {
    value: 'Echo',
    label: 'Échocardiographie',
    color: 'border-red-400 bg-red-50 text-red-700'
  },
  {
    value: 'IRM',
    label: 'IRM Cardiaque',
    color: 'border-purple-400 bg-purple-50 text-purple-700'
  },
  {
    value: 'Scanner',
    label: 'Scanner Coronaire',
    color: 'border-amber-400 bg-amber-50 text-amber-700'
  },
  {
    value: 'Angiographie',
    label: 'Angiographie',
    color: 'border-red-400 bg-red-50 text-red-700'
  }];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}>

      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
          y: 10
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0
        }}
        exit={{
          opacity: 0,
          scale: 0.95,
          y: 10
        }}
        transition={{
          duration: 0.2,
          ease: 'easeOut'
        }}
        className="relative z-10 bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-cyan-600 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <UploadIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">
                Importer une image DICOM
              </h2>
              <p className="text-red-100 text-xs">
                Associer un fichier DICOM à un patient
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">

            <XIcon className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Patient */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              <UserIcon className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
              Patient *
            </label>
            <div className="relative">
              <select
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
                className="w-full pl-3 pr-8 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none">

                <option value="">Sélectionner un patient...</option>
                {patients.map((p) =>
                <option key={p.id} value={p.name}>
                    {p.name} - {p.age} ans - {p.dossier}
                  </option>
                )}
              </select>
              <ChevronDownIcon className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Modality */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              <ScanIcon className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
              Type d'imagerie *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {modalityOptions.map((opt) =>
              <button
                key={opt.value}
                onClick={() => setModality(opt.value)}
                className={`px-3 py-2 rounded-lg border-2 text-xs font-semibold transition-all ${modality === opt.value ? opt.color + ' border-opacity-100' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'}`}>

                  {modality === opt.value &&
                <CheckIcon className="w-3 h-3 inline mr-1" />
                }
                  {opt.label}
                </button>
              )}
            </div>
          </div>

          {/* File Drop Zone */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              <FileTextIcon className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
              Fichier DICOM (.dcm)
            </label>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${isDragging ? 'border-red-400 bg-red-50' : file ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200 hover:border-red-300 hover:bg-red-50/50'}`}>

              <input
                ref={fileInputRef}
                type="file"
                accept=".dcm,.dicom,application/dicom"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFile(e.target.files[0]);
                }} />

              {file ?
              <div className="flex items-center justify-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                  <div className="text-left">
                    <p className="text-xs font-semibold text-emerald-700">
                      {file.name}
                    </p>
                    <p className="text-[10px] text-emerald-600">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div> :

              <>
                  <FolderOpenIcon className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs font-medium text-slate-500">
                    Glisser-déposer un fichier DICOM
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    ou cliquer pour parcourir
                  </p>
                  <p className="text-[10px] text-slate-300 mt-1">
                    Formats: .dcm, .dicom
                  </p>
                </>
              }
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={onClose}
              className="flex-1 py-2 text-xs font-semibold border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">

              Annuler
            </button>
            <button
              onClick={handleImport}
              disabled={!patient || isProcessing || done}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${done ? 'bg-emerald-500 text-white' : 'bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed'}`}>

              {done ?
              <>
                  <CheckIcon className="w-3.5 h-3.5" /> Importé !
                </> :
              isProcessing ?
              <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />{' '}
                  Traitement...
                </> :

              <>
                  <UploadIcon className="w-3.5 h-3.5" /> Importer
                </>
              }
            </button>
          </div>
        </div>
      </motion.div>
    </div>);

}
// ─── DICOM VIEWER ─────────────────────────────────────────────────────────────
function DicomViewer({ study }: {study: ImagingStudy;}) {
  const [viewerTab, setViewerTab] = useState<'image' | 'tags' | 'meta'>('image');
  const [tagSearch, setTagSearch] = useState('');
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const hasDicom = !!(study.dicomImageUrl || study.dicomTags);
  const filteredTags = (study.dicomTags || []).filter(
    (t) =>
    t.name.toLowerCase().includes(tagSearch.toLowerCase()) ||
    t.tag.toLowerCase().includes(tagSearch.toLowerCase()) ||
    t.value.toLowerCase().includes(tagSearch.toLowerCase())
  );
  if (!hasDicom) {
    // Placeholder for mock studies
    return (
      <div className="bg-slate-900 rounded-lg h-40 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <CardiacAnatomySVG />
        </div>
        <div className="relative z-10 text-center">
          <ScanIcon className="h-8 w-8 text-slate-600 mx-auto mb-1" />
          <p className="text-slate-500 text-[10px]">Visionneuse DICOM</p>
          <p className="text-slate-600 text-[10px]">
            {study.modality} — {study.patient}
          </p>
          <p className="text-slate-700 text-[10px] mt-1">
            Importer un fichier DICOM pour visualiser
          </p>
        </div>
        <div className="absolute top-2 right-2 flex gap-1.5">
          <button className="p-1 bg-slate-700/80 hover:bg-slate-600 rounded text-slate-300 transition-colors">
            <DownloadIcon className="h-3 w-3" />
          </button>
          <button className="p-1 bg-slate-700/80 hover:bg-slate-600 rounded text-slate-300 transition-colors">
            <FileTextIcon className="h-3 w-3" />
          </button>
        </div>
      </div>);

  }
  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      {/* Viewer Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50">
        {[
        {
          id: 'image' as const,
          label: 'Image',
          icon: <ImageIcon className="w-3 h-3" />
        },
        {
          id: 'tags' as const,
          label: `Tags DICOM${study.dicomTags ? ` (${study.dicomTags.length})` : ''}`,
          icon: <TagIcon className="w-3 h-3" />
        },
        {
          id: 'meta' as const,
          label: 'Métadonnées',
          icon: <InfoIcon className="w-3 h-3" />
        }].
        map((tab) =>
        <button
          key={tab.id}
          onClick={() => setViewerTab(tab.id)}
          className={`flex items-center gap-1 px-3 py-2 text-[10px] font-semibold border-b-2 transition-all ${viewerTab === tab.id ? 'border-red-500 text-red-700 bg-white' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>

            {tab.icon}
            {tab.label}
          </button>
        )}
      </div>

      {/* Image Tab */}
      {viewerTab === 'image' &&
      <div className="bg-slate-900">
          {study.dicomImageUrl ?
        <div className="relative">
              <img
            src={study.dicomImageUrl}
            alt="DICOM"
            className="w-full object-contain max-h-64"
            style={{
              filter: `brightness(${brightness}%) contrast(${contrast}%)`,
              imageRendering: 'pixelated'
            }} />

              {/* Controls overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 flex-1">
                    <span className="text-[9px] text-slate-400 w-14">
                      Luminosité
                    </span>
                    <input
                  type="range"
                  min="0"
                  max="300"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="flex-1 h-1 accent-blue-400" />

                    <span className="text-[9px] text-slate-400 w-6">
                      {brightness}%
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-1">
                    <span className="text-[9px] text-slate-400 w-12">
                      Contraste
                    </span>
                    <input
                  type="range"
                  min="0"
                  max="300"
                  value={contrast}
                  onChange={(e) => setContrast(Number(e.target.value))}
                  className="flex-1 h-1 accent-blue-400" />

                    <span className="text-[9px] text-slate-400 w-6">
                      {contrast}%
                    </span>
                  </div>
                </div>
              </div>
              {/* Info overlay */}
              <div className="absolute top-2 left-2 bg-slate-900/70 rounded px-1.5 py-0.5">
                <p className="text-[9px] text-slate-300 font-mono">
                  {study.dicomMeta?.rows}×{study.dicomMeta?.columns} |{' '}
                  {study.dicomMeta?.bitsAllocated}bit
                </p>
              </div>
              <div className="absolute top-2 right-2 flex gap-1">
                <button
              onClick={() => {
                setBrightness(100);
                setContrast(100);
              }}
              className="p-1 bg-slate-700/80 hover:bg-slate-600 rounded text-slate-300 transition-colors text-[9px] px-1.5">

                  Reset
                </button>
              </div>
            </div> :

        <div className="h-40 flex items-center justify-center">
              <div className="text-center">
                <ImageIcon className="w-8 h-8 text-slate-600 mx-auto mb-1" />
                <p className="text-slate-500 text-[10px]">
                  Données pixel non disponibles
                </p>
                <p className="text-slate-600 text-[10px]">
                  Format DICOM non standard ou compressé
                </p>
              </div>
            </div>
        }
        </div>
      }

      {/* Tags Tab */}
      {viewerTab === 'tags' &&
      <div>
          <div className="p-2 border-b border-slate-100 bg-white">
            <input
            type="text"
            value={tagSearch}
            onChange={(e) => setTagSearch(e.target.value)}
            placeholder="Rechercher un tag, nom ou valeur..."
            className="w-full px-2.5 py-1.5 text-[10px] border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500" />

          </div>
          <div className="max-h-56 overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-2 py-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-wider w-24">
                    Tag
                  </th>
                  <th className="text-left px-2 py-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                    Nom
                  </th>
                  <th className="text-left px-2 py-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-wider w-8">
                    VR
                  </th>
                  <th className="text-left px-2 py-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                    Valeur
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTags.length > 0 ?
              filteredTags.map((tag, i) =>
              <tr
                key={i}
                className={`border-b border-slate-50 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>

                      <td className="px-2 py-1 font-mono text-[9px] text-red-600">
                        {tag.tag}
                      </td>
                      <td className="px-2 py-1 text-[10px] text-slate-700 font-medium">
                        {tag.name}
                      </td>
                      <td className="px-2 py-1 text-[9px] text-slate-400 font-mono">
                        {tag.vr}
                      </td>
                      <td
                  className="px-2 py-1 text-[10px] text-slate-600 max-w-xs truncate"
                  title={tag.value}>

                        {tag.value}
                      </td>
                    </tr>
              ) :

              <tr>
                    <td
                  colSpan={4}
                  className="px-3 py-4 text-center text-[10px] text-slate-400">

                      {study.dicomTags?.length === 0 ?
                  'Aucun tag DICOM extrait' :
                  'Aucun résultat'}
                    </td>
                  </tr>
              }
              </tbody>
            </table>
          </div>
        </div>
      }

      {/* Metadata Tab */}
      {viewerTab === 'meta' && study.dicomMeta &&
      <div className="p-3 max-h-64 overflow-y-auto">
          <div className="space-y-3">
            {/* Patient */}
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <UserIcon className="w-3 h-3 text-red-500" />
                <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                  Patient
                </span>
              </div>
              <div className="bg-blue-50 rounded-lg p-2.5 grid grid-cols-2 gap-1.5">
                <MetaRow label="Nom" value={study.dicomMeta.patientName} />
                <MetaRow label="ID" value={study.dicomMeta.patientId} />
                <MetaRow
                label="Date de naissance"
                value={study.dicomMeta.patientBirthDate} />

                <MetaRow label="Sexe" value={study.dicomMeta.patientSex} />
              </div>
            </div>
            {/* Study */}
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <FileTextIcon className="w-3 h-3 text-purple-500" />
                <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                  Étude
                </span>
              </div>
              <div className="bg-purple-50 rounded-lg p-2.5 grid grid-cols-2 gap-1.5">
                <MetaRow label="Date" value={study.dicomMeta.studyDate} />
                <MetaRow label="Heure" value={study.dicomMeta.studyTime} />
                <MetaRow
                label="Description"
                value={study.dicomMeta.studyDescription} />

                <MetaRow
                label="Série"
                value={study.dicomMeta.seriesDescription} />

                <MetaRow
                label="Institution"
                value={study.dicomMeta.institutionName} />

              </div>
            </div>
            {/* Modality & Image */}
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <ScanIcon className="w-3 h-3 text-amber-500" />
                <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                  Modalité & Image
                </span>
              </div>
              <div className="bg-amber-50 rounded-lg p-2.5 grid grid-cols-2 gap-1.5">
                <MetaRow label="Modalité" value={study.dicomMeta.modality} />
                <MetaRow
                label="Dimensions"
                value={`${study.dicomMeta.rows} × ${study.dicomMeta.columns}`} />

                <MetaRow
                label="Bits alloués"
                value={`${study.dicomMeta.bitsAllocated}`} />

                <MetaRow
                label="Window Center"
                value={study.dicomMeta.windowCenter || 'N/A'} />

                <MetaRow
                label="Window Width"
                value={study.dicomMeta.windowWidth || 'N/A'} />

                <MetaRow
                label="Transfer Syntax"
                value={study.dicomMeta.transferSyntax} />

              </div>
            </div>
          </div>
        </div>
      }
    </div>);

}
function MetaRow({ label, value }: {label: string;value: string;}) {
  return (
    <div>
      <p className="text-[9px] text-slate-500 font-medium">{label}</p>
      <p
        className="text-[10px] text-slate-800 font-semibold truncate"
        title={value}>

        {value || '—'}
      </p>
    </div>);

}
// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function HeartImaging() {
  const { selectedPatient } = usePatient();
  const [activeTab, setActiveTab] = useState<
    'echo' | 'irm' | 'scanner' | 'angio'>(
    'echo');
  const [selectedStudy, setSelectedStudy] = useState<ImagingStudy>(
    imagingStudies[0]
  );
  const [showImportModal, setShowImportModal] = useState(false);
  const [importedStudies, setImportedStudies] = useState<ImagingStudy[]>([]);
  const tabModalities: Record<string, ImagingStudy['modality']> = {
    echo: 'Echo',
    irm: 'IRM',
    scanner: 'Scanner',
    angio: 'Angiographie'
  };
  const allStudies = [...imagingStudies, ...importedStudies];
  const filteredStudies = allStudies.filter(
    (s) =>
      s.modality === tabModalities[activeTab] &&
      s.patient.toLowerCase() === selectedPatient.name.toLowerCase()
  );
  React.useEffect(() => {
    const nextStudy = allStudies.find(
      (s) => s.patient.toLowerCase() === selectedPatient.name.toLowerCase()
    );
    if (nextStudy) {
      setSelectedStudy(nextStudy);
    }
  }, [selectedPatient.name, importedStudies]);

  const handleImport = (study: ImagingStudy) => {
    setImportedStudies((prev) => [study, ...prev]);
    // Switch to the correct tab
    const tabMap: Record<ImagingStudy['modality'], string> = {
      Echo: 'echo',
      IRM: 'irm',
      Scanner: 'scanner',
      Angiographie: 'angio'
    };
    setActiveTab(tabMap[study.modality] as any);
    setSelectedStudy(study);
  };
  const stats = [
  {
    label: 'Images ce mois',
    value: String(89 + importedStudies.length),
    icon: ScanIcon,
    color: 'blue'
  },
  {
    label: 'Anomalies détectées',
    value: '18',
    icon: AlertCircleIcon,
    color: 'amber'
  },
  {
    label: 'En attente rapport',
    value: String(
      6 + importedStudies.filter((s) => s.status === 'pending').length
    ),
    icon: ClockIcon,
    color: 'red'
  },
  {
    label: 'IA analysées',
    value: '84',
    icon: ZapIcon,
    color: 'emerald'
  }];

  return (
    <div className="space-y-3">
      {/* Import Modal */}
      <AnimatePresence>
        {showImportModal &&
        <ImportModal
          onClose={() => setShowImportModal(false)}
          onImport={handleImport} />

        }
      </AnimatePresence>

      {/* Header */}
      <div className="bg-gradient-to-r from-red-700 via-rose-600 to-red-600 rounded-lg p-3 text-white shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-white/20 flex items-center justify-center">
              <ScanIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-none">
                Imagerie Cardiaque
              </h1>
              <p className="text-red-100 text-xs mt-0.5">
                Échocardiographie, IRM et Scanner cardiaque
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowImportModal(true)}
            className="inline-flex items-center px-3 py-1.5 bg-white text-red-600 rounded-lg font-semibold text-xs hover:shadow-md transition-all">

            <UploadIcon className="h-3.5 w-3.5 mr-1.5" />
            Importer Images
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {stats.map((stat) =>
        <div
          key={stat.label}
          className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-sm">

            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-500 font-medium">
                  {stat.label}
                </p>
                <p className="text-xl font-bold text-slate-800 mt-0.5">
                  {stat.value}
                </p>
              </div>
              <div
              className={`p-1.5 rounded-lg bg-${stat.color}-50 text-${stat.color}-600`}>

                <stat.icon className="h-4 w-4" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tabs + Content */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-100 overflow-x-auto">
          {[
          {
            id: 'echo',
            label: 'Échocardiographie'
          },
          {
            id: 'irm',
            label: 'IRM Cardiaque'
          },
          {
            id: 'scanner',
            label: 'Scanner Coronaire'
          },
          {
            id: 'angio',
            label: 'Angiographie'
          }].
          map((tab) => {
            const count = allStudies.filter(
              (s) => s.modality === tabModalities[tab.id]
            ).length;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-shrink-0 px-4 py-2.5 text-xs font-semibold transition-all border-b-2 flex items-center gap-1.5 ${activeTab === tab.id ? 'border-red-500 text-red-700 bg-red-50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}>

                {tab.label}
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${activeTab === tab.id ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-500'}`}>

                  {count}
                </span>
              </button>);

          })}
        </div>

        <div className="grid grid-cols-12">
          {/* Study List */}
          <div className="col-span-12 lg:col-span-5 border-r border-slate-100 divide-y divide-slate-100 max-h-[520px] overflow-y-auto">
            {filteredStudies.length > 0 ?
            filteredStudies.map((study) =>
            <div
              key={study.id}
              onClick={() => setSelectedStudy(study)}
              className={`p-3 cursor-pointer transition-colors ${selectedStudy.id === study.id ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-slate-50 border-l-4 border-transparent'}`}>

                  <div className="flex gap-2">
                    <div
                  className={`h-12 w-12 rounded-lg flex items-center justify-center flex-shrink-0 ${study.dicomImageUrl ? 'overflow-hidden' : 'bg-red-800'}`}>

                      {study.dicomImageUrl ?
                  <img
                    src={study.dicomImageUrl}
                    alt="DICOM thumb"
                    className="w-full h-full object-cover"
                    style={{
                      imageRendering: 'pixelated'
                    }} /> :


                  <HeartIcon className="h-6 w-6 text-red-400 opacity-60" />
                  }
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                        <p className="font-bold text-slate-800 text-xs">
                          {study.patient}
                        </p>
                        {study.age > 0 &&
                    <span className="text-[10px] text-slate-400">
                            {study.age} ans
                          </span>
                    }
                        {study.dicomFile &&
                    <span className="text-[9px] bg-blue-100 text-blue-600 px-1 rounded font-medium">
                            DICOM
                          </span>
                    }
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                        <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${getModalityColor(study.modality)}`}>

                          {study.modality}
                        </span>
                        {getStatusBadge(study.status)}
                      </div>
                      <p className="text-[10px] text-slate-500">{study.date}</p>
                      <p className="text-[10px] font-medium text-slate-700 mt-0.5 truncate">
                        {study.findings}
                      </p>
                    </div>
                  </div>
                </div>
            ) :

            <div className="p-8 text-center">
                <ScanIcon className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                <p className="text-xs text-slate-400 font-medium">
                  Aucune image disponible
                </p>
                <p className="text-[10px] text-slate-300 mt-0.5">
                  Importez un fichier DICOM pour commencer
                </p>
                <button
                onClick={() => setShowImportModal(true)}
                className="mt-3 px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 font-medium">

                  Importer
                </button>
              </div>
            }
          </div>

          {/* Detail Panel */}
          <div className="col-span-12 lg:col-span-7 p-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedStudy.id}
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                exit={{
                  opacity: 0
                }}>

                {/* Patient Header */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">
                      {selectedStudy.patient}
                    </h3>
                    <p className="text-[10px] text-slate-500">
                      {selectedStudy.age > 0 && `${selectedStudy.age} ans • `}
                      {selectedStudy.modality} • {selectedStudy.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${getModalityColor(selectedStudy.modality)}`}>

                      {selectedStudy.modality}
                    </span>
                    {getStatusBadge(selectedStudy.status)}
                  </div>
                </div>

                {/* DICOM Viewer */}
                <div className="mb-3">
                  <DicomViewer study={selectedStudy} />
                </div>

                {/* Measurements */}
                {(selectedStudy.ef !== undefined ||
                selectedStudy.lvDimension) &&
                <div className="grid grid-cols-3 gap-2 mb-3">
                    {selectedStudy.ef !== undefined &&
                  <div
                    className={`rounded-lg p-2 border ${getSeverityColor(selectedStudy.severity).bg} ${getSeverityColor(selectedStudy.severity).border}`}>

                        <p className="text-[10px] text-slate-500">
                          Fraction d'Éjection
                        </p>
                        <p
                      className={`text-xl font-bold ${getSeverityColor(selectedStudy.severity).text}`}>

                          {selectedStudy.ef}%
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {selectedStudy.ef >= 55 ?
                      'Normale' :
                      selectedStudy.ef >= 40 ?
                      'Modérément réduite' :
                      'Sévèrement réduite'}
                        </p>
                      </div>
                  }
                    {selectedStudy.lvDimension &&
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-2">
                        <p className="text-[10px] text-slate-500">
                          Dimensions VG
                        </p>
                        <p className="text-xl font-bold text-slate-800">
                          {selectedStudy.lvDimension}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Diamètre télédiastolique
                        </p>
                      </div>
                  }
                    {selectedStudy.wallThickness &&
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-2">
                        <p className="text-[10px] text-slate-500">
                          Épaisseur Paroi
                        </p>
                        <p className="text-xl font-bold text-slate-800">
                          {selectedStudy.wallThickness}
                        </p>
                        <p className="text-[10px] text-slate-400">Septum IV</p>
                      </div>
                  }
                  </div>
                }

                {/* AI Findings */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Analyse IA
                    </h4>
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-semibold text-emerald-600">
                        IA Active
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    {selectedStudy.aiFindings.map((finding, i) =>
                    <div
                      key={i}
                      className={`flex items-start gap-1.5 p-1.5 rounded-lg border ${selectedStudy.severity === 'normal' ? 'bg-emerald-50 border-emerald-100' : selectedStudy.severity === 'severe' ? 'bg-red-50 border-red-100' : 'bg-amber-50 border-amber-100'}`}>

                        {selectedStudy.severity === 'normal' ?
                      <CheckCircleIcon className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0 mt-0.5" /> :

                      <AlertCircleIcon
                        className={`h-3.5 w-3.5 flex-shrink-0 mt-0.5 ${selectedStudy.severity === 'severe' ? 'text-red-500' : 'text-amber-500'}`} />

                      }
                        <p
                        className={`text-[10px] font-medium ${selectedStudy.severity === 'normal' ? 'text-emerald-700' : selectedStudy.severity === 'severe' ? 'text-red-700' : 'text-amber-700'}`}>

                          {finding}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5">
                    <FileTextIcon className="h-3.5 w-3.5" />
                    Générer Rapport
                  </button>
                  <button className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5">
                    <DownloadIcon className="h-3.5 w-3.5" />
                    Télécharger DICOM
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>);

}