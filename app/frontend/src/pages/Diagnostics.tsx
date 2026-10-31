import React, { useEffect, useState, useRef } from 'react';
import {
  HeartIcon,
  ActivityIcon,
  ScanIcon,
  AlertTriangleIcon,
  ClipboardListIcon,
  ZapIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  UserIcon,
  PrinterIcon,
  DownloadIcon,
  RefreshCwIcon,
  PlayIcon,
  PauseIcon,
  MaximizeIcon,
  InfoIcon,
  ChevronRightIcon,
  CalendarIcon,
  StarIcon,
  AlertCircleIcon,
  ThermometerIcon,
  DropletIcon,
  WindIcon,
  PlusIcon,
  ChevronDownIcon } from
'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useECGHardware } from '../hooks/useECGHardware';
import { HardwareConnectionPanel } from '../components/diagnostics/HardwareConnectionPanel';
import { ECGMonitorCanvas } from '../components/diagnostics/ECGMonitorCanvas';
import type { ECGLeads } from '../services/hardwareService';
import { usePatient } from '../contexts/PatientContext';
type TabId = 'ecg' | 'imagerie' | 'anomalies' | 'plans';
interface VitalSign {
  label: string;
  value: string;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  icon: React.ReactNode;
}
interface CardiacAnomaly {
  id: string;
  type: string;
  severity: 'faible' | 'modérée' | 'sévère';
  location: string;
  description: string;
  detected: string;
  confidence: number;
}

interface FollowUpPlan {
  id: string;
  anomalyId: string;
  anomalyType: string;
  severity: CardiacAnomaly['severity'];
  scheduledDate: string;
  scheduledTime: string;
  followUpType: string;
  specialist: string;
  channel: 'présentiel' | 'téléconsultation';
  reminderDays: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

type FollowUpPlanInput = Omit<FollowUpPlan, 'id' | 'createdAt' | 'updatedAt'>;
interface TreatmentPlan {
  id: string;
  title: string;
  category: string;
  priority: 'urgent' | 'élevée' | 'normale' | 'surveillance';
  status: 'en_cours' | 'planifié' | 'terminé';
  startDate: string;
  duration: string;
  medications: string[];
  procedures: string[];
  nextReview: string;
}
interface CardiacImage {
  id: string;
  type: string;
  date: string;
  findings: string;
  status: 'normal' | 'anormal' | 'à_surveiller';
  aiScore: number;
  region: string;
}

interface DicomImportModalProps {
  patientName: string;
  onClose: () => void;
  onImport: (payload: { modality: string; fileName: string }) => void;
}

function DicomImportModal({ patientName, onClose, onImport }: DicomImportModalProps) {
  const [modality, setModality] = useState('Echo');
  const [fileName, setFileName] = useState('');

  const canImport = fileName.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/55 p-4">
      <div className="w-full max-w-xl rounded-xl border border-red-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-xl">
          <div>
            <h3 className="text-sm font-semibold text-red-800">Importer une image DICOM</h3>
            <p className="text-xs text-red-600 mt-0.5">Patient: {patientName}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-red-600 hover:bg-red-100"
            aria-label="Fermer">

            <XCircleIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 p-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Modalité</label>
            <div className="grid grid-cols-4 gap-2">
              {['Echo', 'IRM', 'Scanner', 'Angiographie'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setModality(option)}
                  className={`rounded-lg border px-2 py-2 text-xs font-medium transition-colors ${
                    modality === option
                      ? 'border-red-300 bg-red-50 text-red-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-red-200'
                  }`}>
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Fichier DICOM (.dcm)</label>
            <input
              type="file"
              accept=".dcm,.dicom,application/dicom"
              onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
              className="w-full rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs text-gray-700 file:mr-2 file:rounded-md file:border-0 file:bg-red-100 file:px-2 file:py-1 file:text-xs file:font-medium file:text-red-700" />

            <p className="mt-1 text-[11px] text-gray-500">Formats supportés: .dcm, .dicom</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-gray-100 px-4 py-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50">
            Annuler
          </button>
          <button
            onClick={() => canImport && onImport({ modality, fileName })}
            disabled={!canImport}
            className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50">
            Importer une image DICOM
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Cardiac Image Detail ─────────────────────────────────────────────────────
interface CardiacImageDetail {
  technique: string;
  indication: string;
  measurements: { label: string; value: string; flag?: 'normal' | 'warning' | 'critical' }[];
  aiAnalysis: string;
  recommendations: string[];
  radiologist: string;
  conclusion: string;
}

const cardiacImageDetailsMap: Record<string, CardiacImageDetail> = {
  i1: {
    technique: 'Échocardiographie transthoracique 2D/Doppler couleur',
    indication: 'Évaluation de la fonction cardiaque globale. Contrôle insuffisance cardiaque connue.',
    measurements: [
      { label: "Fraction d'éjection (FE)", value: '45 %', flag: 'warning' },
      { label: 'DTDVG', value: '62 mm', flag: 'warning' },
      { label: 'DSDVG', value: '50 mm', flag: 'warning' },
      { label: 'Épaisseur SIV', value: '14 mm', flag: 'warning' },
      { label: 'Oreillette gauche', value: '45 mm', flag: 'warning' },
      { label: "E/e' (remplissage)", value: '18', flag: 'critical' },
    ],
    aiAnalysis:
      "L'IA détecte une dilatation ventriculaire gauche avec altération modérée de la fonction systolique (FE 45 %). La valve mitrale présente une régurgitation de grade I. La dilatation de l'oreillette gauche (45 mm) est confirmée et corrélée au risque de fibrillation auriculaire.",
    recommendations: [
      'Contrôle échocardiographique à 3 mois',
      'Ajustement du traitement diurétique (furosémide)',
      "Épreuve d'effort contre-indiquée à ce stade",
      'Envisager CRT si FE reste < 40 %',
    ],
    radiologist: 'Dr. Martin — Cardiologue Échographiste',
    conclusion:
      'Cardiomyopathie dilatée légère. Dysfonction systolique VG modérée (FE 45 %). Régurgitation mitrale légère. Dilatation auriculaire gauche modérée.',
  },
  i2: {
    technique: 'Angio-scanner coronaire 128 barrettes, synchronisation ECG prospective',
    indication: "Bilan d'une douleur thoracique d'effort. Évaluation du risque coronarien.",
    measurements: [
      { label: 'Sténose IVA proximale', value: '60 %', flag: 'critical' },
      { label: 'Score CAC (Agatston)', value: '245', flag: 'warning' },
      { label: 'Sténose Cx', value: '15 %', flag: 'normal' },
      { label: 'Sténose CD', value: '20 %', flag: 'normal' },
      { label: 'Calcifications', value: 'Modérées', flag: 'warning' },
      { label: 'Vaisseaux analysés', value: '3', flag: 'normal' },
    ],
    aiAnalysis:
      "Détection d'une sténose significative (> 50 %) au niveau de l'IVA proximale nécessitant une évaluation interventionnelle. Les calcifications coronariennes modérées (Score CAC 245) confirment une maladie coronarienne établie. Aucune autre lésion hémodynamiquement significative détectée.",
    recommendations: [
      'Coronarographie diagnostique + angioplastie IVA en urgence semi-urgente',
      'Poursuite aspirine 100 mg/j + clopidogrel 75 mg/j',
      'Consultation chirurgie cardiaque (bilan préopératoire)',
      'Contrôle scanner coronaire à 1 an post-revascularisation',
    ],
    radiologist: 'Dr. Leroy — Radiologue Cardiovasculaire',
    conclusion:
      "Maladie coronarienne monotronculaire. Sténose IVA proximale 60 % hémodynamiquement significative. Score CAC 245 (risque intermédiaire-élevé). Indication formelle à la coronarographie + angioplastie.",
  },
  i3: {
    technique: 'IRM cardiaque 3 Tesla avec injection de gadolinium (LGE)',
    indication: 'Caractérisation tissulaire myocardique. Bilan de viabilité myocardique post-ischémique.',
    measurements: [
      { label: 'Masse VG', value: '185 g/m²', flag: 'warning' },
      { label: 'FEVG', value: '48 %', flag: 'warning' },
      { label: 'Fibrose myocardique', value: '8 %', flag: 'warning' },
      { label: 'Volume TDd', value: '210 mL', flag: 'warning' },
      { label: 'T1 natif', value: '1 250 ms', flag: 'warning' },
      { label: 'Viabilité myocardique', value: '92 %', flag: 'normal' },
    ],
    aiAnalysis:
      "Le rehaussement tardif au gadolinium identifie une fibrose myocardique de 8 % au niveau du segment inféro-latéral, compatible avec des séquelles ischémiques. La masse ventriculaire gauche est augmentée à 185 g/m². La viabilité myocardique résiduelle reste satisfaisante à 92 %, rendant la revascularisation bénéfique.",
    recommendations: [
      'Surveillance IRM cardiaque annuelle',
      'Évaluation électrophysiologique (risque arythmique lié à la fibrose)',
      'Optimisation traitement insuffisance cardiaque (IEC + bêtabloquant)',
      'Réhabilitation cardiaque supervisée',
    ],
    radiologist: 'Dr. Rousseau — IRM Cardiovasculaire',
    conclusion:
      "Fibrose myocardique segmentaire inféro-latérale (8 %). Hypertrophie VG modérée. Dysfonction systolique légère (FEVG 48 %). Viabilité myocardique conservée (92 %).",
  },
  i4: {
    technique: 'Scintigraphie myocardique Tc⁹⁹ᵐ-sestamibi — protocole effort/repos',
    indication: "Recherche d'ischémie myocardique inductible à l'effort.",
    measurements: [
      { label: 'SSS (effort)', value: '12', flag: 'critical' },
      { label: 'SRS (repos)', value: '4', flag: 'warning' },
      { label: 'SDS (ischémie)', value: '8', flag: 'critical' },
      { label: 'FEVG effort', value: '52 %', flag: 'warning' },
      { label: 'Masse ischémique', value: '~15 %', flag: 'warning' },
      { label: 'Nécrose', value: 'Absente', flag: 'normal' },
    ],
    aiAnalysis:
      "Défect de perfusion réversible au niveau du territoire IVA (antéro-septal et apical). L'ischémie inductible concerne environ 15 % de la masse myocardique totale — seuil considéré comme significatif. Absence de nécrose : le myocarde est viable et la revascularisation est susceptible d'améliorer substantiellement la fonction.",
    recommendations: [
      'Revascularisation coronarienne recommandée (confirmation par coronarographie)',
      'Éviter tout effort intense en attendant la revascularisation',
      'Contrôle scintigraphique post-revascularisation à 3 mois',
      "Épreuve d'effort de contrôle à 6 mois post-revascularisation",
    ],
    radiologist: 'Dr. Dupont — Médecine Nucléaire Cardiaque',
    conclusion:
      "Ischémie myocardique inductible significative territoire IVA (≈ 15 % masse myocardique). Aucune nécrose. Myocarde viable. Indication à la revascularisation coronarienne.",
  },
};

function CardiacImageDetailModal({
  image,
  patientName,
  onClose,
  onAddToReport,
}: {
  image: CardiacImage;
  patientName: string;
  onClose: () => void;
  onAddToReport: () => void;
}) {
  const detail = cardiacImageDetailsMap[image.id];
  const statusLabel = (s: CardiacImage['status']) =>
    s === 'anormal' ? 'Anormal' : s === 'à_surveiller' ? 'À surveiller' : 'Normal';
  const statusBadge = (s: CardiacImage['status']) =>
    s === 'anormal'
      ? 'bg-red-100 text-red-700'
      : s === 'à_surveiller'
      ? 'bg-orange-100 text-orange-700'
      : 'bg-green-100 text-green-700';
  const measureBg = (flag?: string) =>
    flag === 'critical'
      ? 'border-red-200 bg-red-50'
      : flag === 'warning'
      ? 'border-orange-200 bg-orange-50'
      : 'border-gray-100 bg-gray-50';
  const measureText = (flag?: string) =>
    flag === 'critical'
      ? 'text-red-700 font-bold'
      : flag === 'warning'
      ? 'text-orange-700 font-bold'
      : 'text-gray-900';

  if (!detail) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-hidden flex flex-col">

        {/* Header — NouveauPatient style */}
        <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-xl flex-shrink-0">
          <div>
            <h3 className="text-sm font-semibold text-red-800">{image.type}</h3>
            <p className="text-xs text-red-600 mt-0.5">{image.date} • {image.region} • {patientName}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-red-600 hover:bg-red-100"
            aria-label="Fermer">
            <XCircleIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">

          {/* Preview + quick summary */}
          <div className="flex gap-3">
            <div className="bg-gray-900 rounded-xl flex-shrink-0 w-40 h-32 flex flex-col items-center justify-center relative overflow-hidden">
              <ScanIcon className="w-10 h-10 text-gray-600 mb-1" />
              <p className="text-gray-500 text-[10px]">{image.type}</p>
              <p className="text-gray-600 text-[10px]">{image.region}</p>
              <div className="absolute top-1.5 right-1.5 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                IA: {image.aiScore}%
              </div>
              <div className={`absolute top-1.5 left-1.5 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${statusBadge(image.status)}`}>
                {statusLabel(image.status)}
              </div>
            </div>
            <div className="flex-1 space-y-2.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusBadge(image.status)}`}>
                  {statusLabel(image.status)}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-red-100 text-red-700 font-medium">
                  Score IA : {image.aiScore}/100
                </span>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Indication</p>
                <p className="text-xs text-gray-700 leading-relaxed">{detail.indication}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Technique</p>
                <p className="text-xs text-gray-700 leading-relaxed">{detail.technique}</p>
              </div>
            </div>
          </div>

          {/* Measurements */}
          <div>
            <h3 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
              <ActivityIcon className="w-3.5 h-3.5 text-red-500" /> Mesures &amp; Paramètres
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {detail.measurements.map((m, i) => (
                <div key={i} className={`rounded-lg border p-2.5 ${measureBg(m.flag)}`}>
                  <p className="text-[10px] text-gray-500 mb-0.5">{m.label}</p>
                  <p className={`text-sm ${measureText(m.flag)}`}>{m.value}</p>
                  {m.flag && m.flag !== 'normal' && (
                    <p className={`text-[10px] ${m.flag === 'critical' ? 'text-red-500' : 'text-orange-500'}`}>
                      {m.flag === 'critical' ? '⚠ Critique' : '↑ À surveiller'}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Findings */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-3">
            <h3 className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
              <ClipboardListIcon className="w-3.5 h-3.5 text-gray-500" /> Résultats &amp; Constatations
            </h3>
            <p className="text-xs text-gray-700 leading-relaxed">{image.findings}</p>
          </div>

          {/* AI Analysis */}
          <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border border-red-200 p-3">
            <h3 className="text-xs font-semibold text-red-800 mb-1.5 flex items-center gap-1.5">
              <ZapIcon className="w-3.5 h-3.5 text-red-600" /> Analyse IA
            </h3>
            <p className="text-xs text-red-700 leading-relaxed">{detail.aiAnalysis}</p>
          </div>

          {/* Recommendations */}
          <div>
            <h3 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
              <StarIcon className="w-3.5 h-3.5 text-amber-500" /> Recommandations
            </h3>
            <ul className="space-y-1.5">
              {detail.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          {/* Conclusion */}
          <div className="bg-amber-50 rounded-xl border border-amber-200 p-3">
            <h3 className="text-xs font-semibold text-amber-800 mb-1.5 flex items-center gap-1.5">
              <InfoIcon className="w-3.5 h-3.5 text-amber-600" /> Conclusion
            </h3>
            <p className="text-xs text-amber-800 leading-relaxed">{detail.conclusion}</p>
            <p className="text-[10px] text-amber-600 mt-2 font-medium">{detail.radiologist}</p>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 border-t border-gray-100 px-5 py-3 bg-gray-50 flex-shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gray-200 bg-white text-gray-600 rounded-lg hover:bg-gray-100">
              <PrinterIcon className="w-3.5 h-3.5" /> Imprimer
            </button>
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gray-200 bg-white text-gray-600 rounded-lg hover:bg-gray-100">
              <DownloadIcon className="w-3.5 h-3.5" /> Exporter PDF
            </button>
            <button
              onClick={onAddToReport}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-red-200 bg-red-50 text-red-700 rounded-lg hover:bg-red-100">
              <ClipboardListIcon className="w-3.5 h-3.5" /> Ajouter au rapport
            </button>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
}

function FollowUpSchedulerModal({
  anomaly,
  existingPlan,
  onClose,
  onSave,
  onDelete,
}: {
  anomaly: CardiacAnomaly;
  existingPlan?: FollowUpPlan;
  onClose: () => void;
  onSave: (payload: FollowUpPlanInput) => void;
  onDelete: () => void;
}) {
  const defaultDays = anomaly.severity === 'sévère' ? 7 : anomaly.severity === 'modérée' ? 14 : 30;
  const [scheduledDate, setScheduledDate] = useState(existingPlan?.scheduledDate ?? '');
  const [scheduledTime, setScheduledTime] = useState(existingPlan?.scheduledTime ?? '09:00');
  const [followUpType, setFollowUpType] = useState(existingPlan?.followUpType ?? 'Consultation cardiologique');
  const [specialist, setSpecialist] = useState(existingPlan?.specialist ?? 'Cardiologue référent');
  const [channel, setChannel] = useState<FollowUpPlan['channel']>(existingPlan?.channel ?? 'présentiel');
  const [reminderDays, setReminderDays] = useState(existingPlan?.reminderDays ?? defaultDays);
  const [notes, setNotes] = useState(existingPlan?.notes ?? `Suivi ciblé pour ${anomaly.type}.`);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduledDate) {
      setError('Veuillez sélectionner une date de suivi.');
      return;
    }
    if (!scheduledTime) {
      setError('Veuillez sélectionner une heure de suivi.');
      return;
    }
    if (followUpType.trim().length < 3) {
      setError('Le type de suivi doit contenir au moins 3 caractères.');
      return;
    }
    if (specialist.trim().length < 3) {
      setError('Le spécialiste doit contenir au moins 3 caractères.');
      return;
    }

    setError(null);
    onSave({
      anomalyId: anomaly.id,
      anomalyType: anomaly.type,
      severity: anomaly.severity,
      scheduledDate,
      scheduledTime,
      followUpType: followUpType.trim(),
      specialist: specialist.trim(),
      channel,
      reminderDays,
      notes: notes.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/55 p-4">
      <div className="w-full max-w-xl rounded-xl border border-red-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-xl">
          <div>
            <h3 className="text-sm font-semibold text-red-800">
              {existingPlan ? 'Modifier le suivi planifié' : 'Planifier un suivi'}
            </h3>
            <p className="text-xs text-red-600 mt-0.5">Anomalie: {anomaly.type}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-red-600 hover:bg-red-100"
            aria-label="Fermer">
            <XCircleIcon className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Date de suivi</label>
              <input
                type="date"
                value={scheduledDate}
                min={new Date().toISOString().slice(0, 10)}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Heure</label>
              <input
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Type de suivi</label>
              <select
                value={followUpType}
                onChange={(e) => setFollowUpType(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500">
                <option value="Consultation cardiologique">Consultation cardiologique</option>
                <option value="Holter ECG 24h">Holter ECG 24h</option>
                <option value="Échocardiographie de contrôle">Échocardiographie de contrôle</option>
                <option value="Scanner cardiaque de contrôle">Scanner cardiaque de contrôle</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Canal</label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value as FollowUpPlan['channel'])}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500">
                <option value="présentiel">Présentiel</option>
                <option value="téléconsultation">Téléconsultation</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Spécialiste</label>
              <input
                value={specialist}
                onChange={(e) => setSpecialist(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
                placeholder="Cardiologue référent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Rappel (jours avant)</label>
              <input
                type="number"
                min={1}
                max={30}
                value={reminderDays}
                onChange={(e) => setReminderDays(Math.max(1, Math.min(30, Number(e.target.value) || 1)))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Notes de suivi</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between gap-2 border-t border-gray-100 pt-3">
            <div>
              {existingPlan && (
                <button
                  type="button"
                  onClick={onDelete}
                  className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs text-red-700 hover:bg-red-100">
                  Supprimer la planification
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50">
                Annuler
              </button>
              <button
                type="submit"
                className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700">
                {existingPlan ? 'Mettre à jour le suivi' : 'Planifier le suivi'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// Create Treatment Plan Modal Component
function CreateTreatmentPlanModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (data: Omit<TreatmentPlan, 'id'>) => void;
}) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Arythmologie');
  const [priority, setPriority] = useState<TreatmentPlan['priority']>('normale');
  const [status, setStatus] = useState<TreatmentPlan['status']>('planifié');
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [duration, setDuration] = useState('3 mois');
  const [medications, setMedications] = useState<string[]>(['']);
  const [procedures, setProcedures] = useState<string[]>(['']);
  const [nextReview, setNextReview] = useState('');
  const [error, setError] = useState<string | null>(null);

  const categories = ['Arythmologie', 'Coronarographie', 'Insuffisance Cardiaque', 'Prévention', 'Autre'];

  const handleAddMedication = () => setMedications([...medications, '']);
  const handleRemoveMedication = (i: number) => setMedications(medications.filter((_, idx) => idx !== i));
  const handleMedicationChange = (i: number, value: string) => {
    const updated = [...medications];
    updated[i] = value;
    setMedications(updated);
  };

  const handleAddProcedure = () => setProcedures([...procedures, '']);
  const handleRemoveProcedure = (i: number) => setProcedures(procedures.filter((_, idx) => idx !== i));
  const handleProcedureChange = (i: number, value: string) => {
    const updated = [...procedures];
    updated[i] = value;
    setProcedures(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Le titre du plan est obligatoire.');
      return;
    }
    if (!startDate) {
      setError('La date de début est obligatoire.');
      return;
    }
    if (!nextReview) {
      setError('La date du prochain contrôle est obligatoire.');
      return;
    }
    const nonEmptyMeds = medications.filter((m) => m.trim().length > 0);
    const nonEmptyProcs = procedures.filter((p) => p.trim().length > 0);
    if (nonEmptyMeds.length === 0 && nonEmptyProcs.length === 0) {
      setError('Veuillez ajouter au moins un médicament ou une procédure.');
      return;
    }

    setError(null);
    onSave({
      title: title.trim(),
      category,
      priority,
      status,
      startDate: formatDate(startDate),
      duration,
      medications: nonEmptyMeds,
      procedures: nonEmptyProcs,
      nextReview: formatDate(nextReview),
    });
  };

  const formatDate = (isoDate: string) => {
    const [year, month, day] = isoDate.split('-');
    if (!year || !month || !day) return isoDate;
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/55 p-4">
      <div className="w-full max-w-2xl rounded-xl border border-red-200 bg-white shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-xl flex-shrink-0">
          <div>
            <h3 className="text-sm font-semibold text-red-800">Créer un plan de traitement</h3>
            <p className="text-xs text-red-600 mt-0.5">Personalisé pour le patient - basé sur les diagnostics</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-red-600 hover:bg-red-100"
            aria-label="Fermer">
            <XCircleIcon className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 p-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Titre du plan *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Gestion de la FA"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Catégorie</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500">
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Priorité</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TreatmentPlan['priority'])}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500">
                <option value="urgent">Urgent</option>
                <option value="élevée">Élevée</option>
                <option value="normale">Normale</option>
                <option value="surveillance">Surveillance</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Statut</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TreatmentPlan['status'])}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500">
                <option value="planifié">Planifié</option>
                <option value="en_cours">En cours</option>
                <option value="terminé">Terminé</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Durée</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Ex: 3 mois"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Date de début *</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Prochain contrôle *</label>
              <input
                type="date"
                value={nextReview}
                onChange={(e) => setNextReview(e.target.value)}
                min={startDate}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-medium text-gray-700">Médicaments</label>
              <button
                type="button"
                onClick={handleAddMedication}
                className="flex items-center gap-1 text-[10px] px-2 py-0.5 bg-red-50 text-red-700 rounded hover:bg-red-100">
                <PlusIcon className="w-3 h-3" /> Ajouter
              </button>
            </div>
            <div className="space-y-2">
              {medications.map((med, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={med}
                    onChange={(e) => handleMedicationChange(i, e.target.value)}
                    placeholder="Ex: Apixaban 5mg x2/j"
                    className="flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                  {medications.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMedication(i)}
                      className="p-1 text-gray-400 hover:text-red-600">
                      <XCircleIcon className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-medium text-gray-700">Procédures</label>
              <button
                type="button"
                onClick={handleAddProcedure}
                className="flex items-center gap-1 text-[10px] px-2 py-0.5 bg-red-50 text-red-700 rounded hover:bg-red-100">
                <PlusIcon className="w-3 h-3" /> Ajouter
              </button>
            </div>
            <div className="space-y-2">
              {procedures.map((proc, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={proc}
                    onChange={(e) => handleProcedureChange(i, e.target.value)}
                    placeholder="Ex: Ablation par radiofréquence"
                    className="flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                  {procedures.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveProcedure(i)}
                      className="p-1 text-gray-400 hover:text-red-600">
                      <XCircleIcon className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              {error}
            </div>
          )}
        </form>

        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3 rounded-b-xl flex items-center justify-end gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50">
            Annuler
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700">
            Créer le plan
          </button>
        </div>
      </div>
    </div>
  );
}

// Edit Treatment Plan Modal
function EditTreatmentPlanModal({
  plan,
  onClose,
  onSave,
  onDelete,
}: {
  plan: TreatmentPlan;
  onClose: () => void;
  onSave: (planId: string, data: Omit<TreatmentPlan, 'id'>) => void;
  onDelete: (planId: string) => void;
}) {
  const [title, setTitle] = useState(plan.title);
  const [category, setCategory] = useState(plan.category);
  const [priority, setPriority] = useState<TreatmentPlan['priority']>(plan.priority);
  const [status, setStatus] = useState<TreatmentPlan['status']>(plan.status);
  const [duration, setDuration] = useState(plan.duration);
  const [medications, setMedications] = useState<string[]>(plan.medications);
  const [procedures, setProcedures] = useState<string[]>(plan.procedures);
  const [nextReview, setNextReview] = useState(plan.nextReview);
  const [error, setError] = useState<string | null>(null);

  const categories = ['Arythmologie', 'Coronarographie', 'Insuffisance Cardiaque', 'Prévention', 'Autre'];

  const handleAddMedication = () => setMedications([...medications, '']);
  const handleRemoveMedication = (i: number) => setMedications(medications.filter((_, idx) => idx !== i));
  const handleMedicationChange = (i: number, value: string) => {
    const updated = [...medications];
    updated[i] = value;
    setMedications(updated);
  };

  const handleAddProcedure = () => setProcedures([...procedures, '']);
  const handleRemoveProcedure = (i: number) => setProcedures(procedures.filter((_, idx) => idx !== i));
  const handleProcedureChange = (i: number, value: string) => {
    const updated = [...procedures];
    updated[i] = value;
    setProcedures(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Le titre du plan est obligatoire.');
      return;
    }
    if (!nextReview) {
      setError('La date du prochain contrôle est obligatoire.');
      return;
    }
    const nonEmptyMeds = medications.filter((m) => m.trim().length > 0);
    const nonEmptyProcs = procedures.filter((p) => p.trim().length > 0);
    if (nonEmptyMeds.length === 0 && nonEmptyProcs.length === 0) {
      setError('Veuillez ajouter au moins un médicament ou une procédure.');
      return;
    }

    setError(null);
    onSave(plan.id, {
      title: title.trim(),
      category,
      priority,
      status,
      startDate: plan.startDate,
      duration,
      medications: nonEmptyMeds,
      procedures: nonEmptyProcs,
      nextReview,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/55 p-4">
      <div className="w-full max-w-2xl rounded-xl border border-red-200 bg-white shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-xl flex-shrink-0">
          <div>
            <h3 className="text-sm font-semibold text-red-800">Modifier le plan de traitement</h3>
            <p className="text-xs text-red-600 mt-0.5">Plan: {plan.title}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-red-600 hover:bg-red-100"
            aria-label="Fermer">
            <XCircleIcon className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 p-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Titre du plan *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Catégorie</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500">
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Priorité</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TreatmentPlan['priority'])}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500">
                <option value="urgent">Urgent</option>
                <option value="élevée">Élevée</option>
                <option value="normale">Normale</option>
                <option value="surveillance">Surveillance</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Statut</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TreatmentPlan['status'])}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500">
                <option value="planifié">Planifié</option>
                <option value="en_cours">En cours</option>
                <option value="terminé">Terminé</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Durée</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Prochain contrôle *</label>
            <input
              type="text"
              value={nextReview}
              onChange={(e) => setNextReview(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-medium text-gray-700">Médicaments</label>
              <button
                type="button"
                onClick={handleAddMedication}
                className="flex items-center gap-1 text-[10px] px-2 py-0.5 bg-red-50 text-red-700 rounded hover:bg-red-100">
                <PlusIcon className="w-3 h-3" /> Ajouter
              </button>
            </div>
            <div className="space-y-2">
              {medications.map((med, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={med}
                    onChange={(e) => handleMedicationChange(i, e.target.value)}
                    className="flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                  {medications.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMedication(i)}
                      className="p-1 text-gray-400 hover:text-red-600">
                      <XCircleIcon className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-medium text-gray-700">Procédures</label>
              <button
                type="button"
                onClick={handleAddProcedure}
                className="flex items-center gap-1 text-[10px] px-2 py-0.5 bg-red-50 text-red-700 rounded hover:bg-red-100">
                <PlusIcon className="w-3 h-3" /> Ajouter
              </button>
            </div>
            <div className="space-y-2">
              {procedures.map((proc, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={proc}
                    onChange={(e) => handleProcedureChange(i, e.target.value)}
                    className="flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                  {procedures.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveProcedure(i)}
                      className="p-1 text-gray-400 hover:text-red-600">
                      <XCircleIcon className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              {error}
            </div>
          )}
        </form>

        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3 rounded-b-xl flex items-center justify-between gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Êtes-vous sûr de vouloir supprimer ce plan?')) {
                onDelete(plan.id);
              }
            }}
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100">
            Supprimer
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50">
              Annuler
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700">
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate Report Modal
function GenerateReportModal({
  plan,
  onClose,
  onGenerate,
}: {
  plan: TreatmentPlan;
  onClose: () => void;
  onGenerate: (plan: TreatmentPlan) => void;
}) {
  const [reportFormat, setReportFormat] = useState<'txt' | 'detailed'>('detailed');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/55 p-4">
      <div className="w-full max-w-lg rounded-xl border border-red-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-xl">
          <div>
            <h3 className="text-sm font-semibold text-red-800">Générer un rapport</h3>
            <p className="text-xs text-red-600 mt-0.5">Plan: {plan.title}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-red-600 hover:bg-red-100"
            aria-label="Fermer">
            <XCircleIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 p-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">Format du rapport</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="txt"
                  checked={reportFormat === 'txt'}
                  onChange={(e) => setReportFormat(e.target.value as 'txt' | 'detailed')}
                  className="w-4 h-4 text-red-600"
                />
                <span className="text-xs text-gray-700">Format texte (.txt)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="detailed"
                  checked={reportFormat === 'detailed'}
                  onChange={(e) => setReportFormat(e.target.value as 'txt' | 'detailed')}
                  className="w-4 h-4 text-red-600"
                />
                <span className="text-xs text-gray-700">Rapport détaillé avec graphiques</span>
              </label>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <h4 className="text-xs font-semibold text-gray-700 mb-2">Contenu du rapport:</h4>
            <ul className="text-[10px] text-gray-600 space-y-1">
              <li className="flex items-center gap-2">
                <CheckCircleIcon className="w-3 h-3 text-green-600" />
                Détails du plan de traitement
              </li>
              <li className="flex items-center gap-2">
                <CheckCircleIcon className="w-3 h-3 text-green-600" />
                Médicaments prescripts ({plan.medications.length})
              </li>
              <li className="flex items-center gap-2">
                <CheckCircleIcon className="w-3 h-3 text-green-600" />
                Procédures prévues ({plan.procedures.length})
              </li>
              <li className="flex items-center gap-2">
                <CheckCircleIcon className="w-3 h-3 text-green-600" />
                Chronologie du traitement
              </li>
              <li className="flex items-center gap-2">
                <CheckCircleIcon className="w-3 h-3 text-green-600" />
                Date de génération et patient
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3 rounded-b-xl flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50">
            Annuler
          </button>
          <button
            type="button"
            onClick={() => onGenerate(plan)}
            className="flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700">
            <DownloadIcon className="w-3 h-3" />
            Générer et télécharger
          </button>
        </div>
      </div>
    </div>
  );
}

// Animated ECG waveform component
function ECGWaveform({ isPlaying }: {isPlaying: boolean;}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const offsetRef = useRef(0);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const mid = H / 2;
    // PQRST waveform points (normalized 0-1 x, relative y amplitude)
    function ecgY(x: number): number {
      const cycle = 200; // pixels per cycle
      const pos = (x % cycle + cycle) % cycle;
      const t = pos / cycle;
      // P wave
      if (t < 0.1) return -12 * Math.sin(t / 0.1 * Math.PI);
      // PQ segment
      if (t < 0.18) return 0;
      // Q wave
      if (t < 0.22) return 8 * Math.sin((t - 0.18) / 0.04 * Math.PI);
      // R wave (tall spike)
      if (t < 0.28) return -70 * Math.sin((t - 0.22) / 0.06 * Math.PI);
      // S wave
      if (t < 0.34) return 20 * Math.sin((t - 0.28) / 0.06 * Math.PI);
      // ST segment
      if (t < 0.42) return 0;
      // T wave
      if (t < 0.58) return -18 * Math.sin((t - 0.42) / 0.16 * Math.PI);
      // TP segment (flat)
      return 0;
    }
    function draw() {
      ctx!.clearRect(0, 0, W, H);
      // Grid background
      ctx!.strokeStyle = 'rgba(239, 68, 68, 0.08)';
      ctx!.lineWidth = 0.5;
      for (let x = 0; x < W; x += 20) {
        ctx!.beginPath();
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x, H);
        ctx!.stroke();
      }
      for (let y = 0; y < H; y += 20) {
        ctx!.beginPath();
        ctx!.moveTo(0, y);
        ctx!.lineTo(W, y);
        ctx!.stroke();
      }
      // Major grid
      ctx!.strokeStyle = 'rgba(239, 68, 68, 0.15)';
      ctx!.lineWidth = 1;
      for (let x = 0; x < W; x += 100) {
        ctx!.beginPath();
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x, H);
        ctx!.stroke();
      }
      for (let y = 0; y < H; y += 100) {
        ctx!.beginPath();
        ctx!.moveTo(0, y);
        ctx!.lineTo(W, y);
        ctx!.stroke();
      }
      // ECG line with gradient
      const gradient = ctx!.createLinearGradient(0, 0, W, 0);
      gradient.addColorStop(0, 'rgba(239, 68, 68, 0)');
      gradient.addColorStop(0.1, 'rgba(239, 68, 68, 1)');
      gradient.addColorStop(0.85, 'rgba(239, 68, 68, 1)');
      gradient.addColorStop(1, 'rgba(239, 68, 68, 0)');
      ctx!.beginPath();
      ctx!.strokeStyle = gradient;
      ctx!.lineWidth = 2;
      ctx!.shadowColor = 'rgba(239, 68, 68, 0.6)';
      ctx!.shadowBlur = 4;
      for (let px = 0; px <= W; px++) {
        const y = mid + ecgY(px + offsetRef.current);
        if (px === 0) ctx!.moveTo(px, y);else
        ctx!.lineTo(px, y);
      }
      ctx!.stroke();
      ctx!.shadowBlur = 0;
      if (isPlaying) {
        offsetRef.current += 2;
        animFrameRef.current = requestAnimationFrame(draw);
      }
    }
    draw();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isPlaying]);
  return (
    <canvas
      ref={canvasRef}
      width={900}
      height={160}
      className="w-full h-40 rounded-lg"
      style={{
        background: '#0f172a'
      }} />);


}
export default Diagnostics;
export function Diagnostics() {
  const [activeTab, setActiveTab] = useState<TabId>('ecg');
  const [ecgPlaying, setEcgPlaying] = useState(true);
  const [showDicomImportModal, setShowDicomImportModal] = useState(false);
  const [selectedAnomaly, setSelectedAnomaly] = useState<string | null>(null);
  const [planningAnomalyId, setPlanningAnomalyId] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [creatingTreatmentPlan, setCreatingTreatmentPlan] = useState(false);
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [generatingReportForPlanId, setGeneratingReportForPlanId] = useState<string | null>(null);
  const [selectedPlansForFolder, setSelectedPlansForFolder] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<string | null>(null);
  const [selectedImageDetail, setSelectedImageDetail] = useState<CardiacImage | null>(null);
  const navigate = useNavigate();
  const { selectedPatient } = usePatient();

  // ── Hardware & ECG realtime ──
  const [selectedLead, setSelectedLead] = useState<keyof ECGLeads>('II');
  const {
    deviceStatuses,
    latestSample,
    sampleBuffer,
    connectedDevice,
    isStreaming,
    connect,
    disconnect,
    simulatedHeartRate,
    setSimHeartRate,
  } = useECGHardware();

  const tabs = [
  {
    id: 'ecg' as TabId,
    label: 'ECG / Tracé Cardiaque',
    icon: <ActivityIcon className="w-4 h-4" />
  },
  {
    id: 'imagerie' as TabId,
    label: 'Imagerie Cardiaque',
    icon: <ScanIcon className="w-4 h-4" />
  },
  {
    id: 'anomalies' as TabId,
    label: "Détection d'Anomalies",
    icon: <AlertTriangleIcon className="w-4 h-4" />
  },
  {
    id: 'plans' as TabId,
    label: 'Plans de Traitement',
    icon: <ClipboardListIcon className="w-4 h-4" />
  }];

  const vitals: VitalSign[] = [
  {
    label: 'FC',
    value: String(latestSample?.heartRate ?? 72),
    unit: 'bpm',
    status: 'normal',
    icon: <HeartIcon className="w-4 h-4" />
  },
  {
    label: 'PA',
    value: '130/85',
    unit: 'mmHg',
    status: 'warning',
    icon: <ActivityIcon className="w-4 h-4" />
  },
  {
    label: 'SpO2',
    value: '97',
    unit: '%',
    status: 'normal',
    icon: <WindIcon className="w-4 h-4" />
  },
  {
    label: 'Temp',
    value: '37.1',
    unit: '°C',
    status: 'normal',
    icon: <ThermometerIcon className="w-4 h-4" />
  },
  {
    label: 'Glycémie',
    value: '1.12',
    unit: 'g/L',
    status: 'normal',
    icon: <DropletIcon className="w-4 h-4" />
  }];

  const anomalies: CardiacAnomaly[] = [
  {
    id: 'a1',
    type: 'Fibrillation Auriculaire',
    severity: 'sévère',
    location: 'Oreillette gauche',
    description:
    "Rythme irrégulier avec absence d'onde P distincte. Fréquence ventriculaire variable entre 80-130 bpm.",
    detected: '14/01/2025',
    confidence: 94
  },
  {
    id: 'a2',
    type: 'Hypertrophie Ventriculaire Gauche',
    severity: 'modérée',
    location: 'Ventricule gauche',
    description:
    'Épaississement de la paroi du ventricule gauche (14mm). Critères de Sokolow-Lyon positifs.',
    detected: '14/01/2025',
    confidence: 88
  },
  {
    id: 'a3',
    type: 'Sous-décalage ST',
    severity: 'modérée',
    location: 'Dérivations V4-V6',
    description:
    "Sous-décalage du segment ST de 1.5mm en V4-V6, évocateur d'ischémie sous-endocardique.",
    detected: '14/01/2025',
    confidence: 82
  },
  {
    id: 'a4',
    type: 'Extrasystoles Ventriculaires',
    severity: 'faible',
    location: 'Ventricule droit',
    description:
    'Présence de 3 extrasystoles ventriculaires isolées par heure. Morphologie en retard gauche.',
    detected: '14/01/2025',
    confidence: 96
  }];

  const cardiacImages: CardiacImage[] = [
  {
    id: 'i1',
    type: 'Échocardiographie',
    date: '14/01/2025',
    findings:
    'FE: 45% (légèrement diminuée). Dilatation OG modérée. Valve mitrale: régurgitation légère.',
    status: 'anormal',
    aiScore: 87,
    region: 'Cœur complet'
  },
  {
    id: 'i2',
    type: 'Scanner Coronaire',
    date: '10/01/2025',
    findings:
    'Sténose 60% IVA proximale. Calcifications coronaires modérées. Score CAC: 245.',
    status: 'anormal',
    aiScore: 91,
    region: 'Artères coronaires'
  },
  {
    id: 'i3',
    type: 'IRM Cardiaque',
    date: '05/01/2025',
    findings:
    'Rehaussement tardif gadolinium segment inféro-latéral. Masse VG: 185g/m². Fibrose myocardique 8%.',
    status: 'à_surveiller',
    aiScore: 79,
    region: 'Myocarde'
  },
  {
    id: 'i4',
    type: 'Scintigraphie Myocardique',
    date: '28/12/2024',
    findings:
    "Hypoperfusion réversible territoire IVA à l'effort. Ischémie myocardique induite.",
    status: 'anormal',
    aiScore: 85,
    region: 'Perfusion myocardique'
  }];

  const initialTreatmentPlans: TreatmentPlan[] = [
  {
    id: 'p1',
    title: 'Contrôle de la Fibrillation Auriculaire',
    category: 'Arythmologie',
    priority: 'urgent',
    status: 'en_cours',
    startDate: '15/01/2025',
    duration: '6 mois',
    medications: [
    'Apixaban 5mg x2/j',
    'Bisoprolol 5mg/j',
    'Amiodarone 200mg/j'],

    procedures: [
    'Cardioversion électrique',
    'Ablation par radiofréquence (à évaluer)'],

    nextReview: '15/02/2025'
  },
  {
    id: 'p2',
    title: 'Revascularisation Coronaire',
    category: 'Coronarographie',
    priority: 'élevée',
    status: 'planifié',
    startDate: '20/01/2025',
    duration: '3 mois',
    medications: [
    'Aspirine 100mg/j',
    'Clopidogrel 75mg/j',
    'Atorvastatine 40mg/j'],

    procedures: [
    'Coronarographie diagnostique',
    'Angioplastie IVA + stent actif'],

    nextReview: '20/02/2025'
  },
  {
    id: 'p3',
    title: "Traitement de l'Insuffisance Cardiaque",
    category: 'Insuffisance Cardiaque',
    priority: 'normale',
    status: 'en_cours',
    startDate: '10/01/2025',
    duration: '12 mois',
    medications: [
    'Énalapril 10mg/j',
    'Furosémide 40mg/j',
    'Spironolactone 25mg/j'],

    procedures: [
    'Suivi échocardiographique mensuel',
    'Réhabilitation cardiaque'],

    nextReview: '10/02/2025'
  },
  {
    id: 'p4',
    title: 'Prévention Cardiovasculaire Secondaire',
    category: 'Prévention',
    priority: 'surveillance',
    status: 'en_cours',
    startDate: '01/01/2025',
    duration: 'Indéfini',
    medications: ['Rosuvastatine 20mg/j', 'Ramipril 5mg/j'],
    procedures: [
    'Bilan lipidique trimestriel',
    'Holter ECG semestriel',
    "Épreuve d'effort annuelle"],

    nextReview: '01/04/2025'
  }];

  const [treatmentPlans, setTreatmentPlans] = useState<TreatmentPlan[]>(initialTreatmentPlans);
  const [followUpPlans, setFollowUpPlans] = useState<Record<string, FollowUpPlan>>({});

  const planningAnomaly = planningAnomalyId ? anomalies.find((a) => a.id === planningAnomalyId) ?? null : null;

  const formatDate = (isoDate: string) => {
    const [year, month, day] = isoDate.split('-');
    if (!year || !month || !day) return isoDate;
    return `${day}/${month}/${year}`;
  };

  const severityToPriority = (severity: CardiacAnomaly['severity']): TreatmentPlan['priority'] => {
    if (severity === 'sévère') return 'urgent';
    if (severity === 'modérée') return 'élevée';
    return 'surveillance';
  };

  const toTreatmentPlan = (plan: FollowUpPlan): TreatmentPlan => ({
    id: `fu-${plan.anomalyId}`,
    title: `Suivi: ${plan.anomalyType}`,
    category: 'Suivi ciblé',
    priority: severityToPriority(plan.severity),
    status: 'planifié',
    startDate: formatDate(plan.scheduledDate),
    duration: '1 mois',
    medications: ['À confirmer selon réévaluation clinique'],
    procedures: [
      plan.followUpType,
      `Spécialiste: ${plan.specialist}`,
      `Canal: ${plan.channel}`,
    ],
    nextReview: formatDate(plan.scheduledDate),
  });

  const saveFollowUpPlan = (input: FollowUpPlanInput) => {
    const now = new Date().toISOString();
    const existing = followUpPlans[input.anomalyId];
    const nextPlan: FollowUpPlan = {
      ...input,
      id: existing?.id ?? `followup-${input.anomalyId}`,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    };

    setFollowUpPlans((prev) => ({ ...prev, [input.anomalyId]: nextPlan }));

    const mappedPlan = toTreatmentPlan(nextPlan);
    setTreatmentPlans((prev) => {
      if (prev.some((p) => p.id === mappedPlan.id)) {
        return prev.map((p) => (p.id === mappedPlan.id ? mappedPlan : p));
      }
      return [mappedPlan, ...prev];
    });

    setSelectedPlan(mappedPlan.id);
    setPlanningAnomalyId(null);
    showToast(existing ? `Suivi mis à jour pour "${input.anomalyType}"` : `Suivi planifié pour "${input.anomalyType}"`);
  };

  const deleteFollowUpPlan = (anomaly: CardiacAnomaly) => {
    setFollowUpPlans((prev) => {
      const next = { ...prev };
      delete next[anomaly.id];
      return next;
    });
    setTreatmentPlans((prev) => prev.filter((p) => p.id !== `fu-${anomaly.id}`));
    setPlanningAnomalyId(null);
    showToast(`Planification supprimée pour "${anomaly.type}"`);
  };

  const createTreatmentPlan = (data: Omit<TreatmentPlan, 'id'>) => {
    const newPlan: TreatmentPlan = {
      ...data,
      id: `tp-${Date.now()}`,
    };
    setTreatmentPlans((prev) => [newPlan, ...prev]);
    setSelectedPlan(newPlan.id);
    setCreatingTreatmentPlan(false);
    showToast(`Plan de traitement créé: "${data.title}"`);
  };

  const updateTreatmentPlan = (planId: string, data: Omit<TreatmentPlan, 'id'>) => {
    setTreatmentPlans((prev) =>
      prev.map((plan) =>
        plan.id === planId ? { ...plan, ...data } : plan
      )
    );
    setEditingPlanId(null);
    showToast(`Plan "${data.title}" mis à jour avec succès`);
  };

  const deleteTreatmentPlan = (planId: string, planTitle: string) => {
    setTreatmentPlans((prev) => prev.filter((p) => p.id !== planId));
    setSelectedPlan(null);
    setEditingPlanId(null);
    showToast(`Plan "${planTitle}" supprimé`);
  };

  const generateTreatmentReport = (plan: TreatmentPlan) => {
    const reportContent = `
RAPPORT DE PLAN DE TRAITEMENT
========================================
Date: ${new Date().toLocaleDateString('fr-FR')}
Patient: ${selectedPatient?.name || 'Patient'}

Plan: ${plan.title}
Catégorie: ${plan.category}
Priorité: ${plan.priority}
Statut: ${plan.status}

Dates:
- Début: ${plan.startDate}
- Durée: ${plan.duration}
- Prochain contrôle: ${plan.nextReview}

Médicaments:
${plan.medications.map((med) => `• ${med}`).join('\n')}

Procédures:
${plan.procedures.map((proc) => `• ${proc}`).join('\n')}

Notes: Plan personnalisé basé sur les diagnostics cardiologiques
Généré par: Système Cardio
    `.trim();

    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(reportContent)}`);
    element.setAttribute('download', `rapport-traitement-${plan.id}-${new Date().toISOString().split('T')[0]}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setGeneratingReportForPlanId(null);
    showToast(`Rapport généré pour "${plan.title}"`);
  };

  const addPlansToPatientFolder = () => {
    if (selectedPlansForFolder.size === 0) return;
    
    const selectedPlansList = treatmentPlans.filter((p) => selectedPlansForFolder.has(p.id));
    const planNames = selectedPlansList.map((p) => p.title).join(', ');
    
    // Simulate adding to patient folder
    showToast(`${selectedPlansForFolder.size} plan(s) ajouté(s) au dossier patient: ${planNames}`);
    setSelectedPlansForFolder(new Set());
  };

  const togglePlanSelection = (planId: string) => {
    const newSelected = new Set(selectedPlansForFolder);
    if (newSelected.has(planId)) {
      newSelected.delete(planId);
    } else {
      newSelected.add(planId);
    }
    setSelectedPlansForFolder(newSelected);
  };

  const followUpTimeline = Object.values(followUpPlans)
    .slice()
    .sort((a, b) => `${a.scheduledDate}T${a.scheduledTime}`.localeCompare(`${b.scheduledDate}T${b.scheduledTime}`))
    .map((plan) => ({
      dot: plan.severity === 'sévère' ? 'bg-red-500' : plan.severity === 'modérée' ? 'bg-orange-500' : 'bg-blue-500',
      title: `Suivi planifié: ${plan.anomalyType}`,
      date: `${formatDate(plan.scheduledDate)} ${plan.scheduledTime} • ${plan.specialist}`,
    }));

  const severityColor = (s: CardiacAnomaly['severity']) => {
    if (s === 'sévère') return 'bg-red-100 text-red-700 border-red-200';
    if (s === 'modérée')
    return 'bg-orange-100 text-orange-700 border-orange-200';
    return 'bg-yellow-100 text-yellow-700 border-yellow-200';
  };
  const statusColor = (s: CardiacImage['status']) => {
    if (s === 'anormal') return 'bg-red-100 text-red-700';
    if (s === 'à_surveiller') return 'bg-orange-100 text-orange-700';
    return 'bg-green-100 text-green-700';
  };
  const priorityColor = (p: TreatmentPlan['priority']) => {
    if (p === 'urgent') return 'bg-red-100 text-red-700 border-red-200';
    if (p === 'élevée') return 'bg-orange-100 text-orange-700 border-orange-200';
    if (p === 'normale') return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-gray-100 text-gray-600 border-gray-200';
  };
  const planStatusColor = (s: TreatmentPlan['status']) => {
    if (s === 'en_cours') return 'bg-green-100 text-green-700';
    if (s === 'planifié') return 'bg-blue-100 text-blue-700';
    return 'bg-gray-100 text-gray-600';
  };
  const vitalStatusColor = (s: VitalSign['status']) => {
    if (s === 'critical') return 'border-red-400 bg-red-50';
    if (s === 'warning') return 'border-orange-400 bg-orange-50';
    return 'border-green-400 bg-green-50';
  };
  const vitalTextColor = (s: VitalSign['status']) => {
    if (s === 'critical') return 'text-red-600';
    if (s === 'warning') return 'text-orange-600';
    return 'text-green-600';
  };
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };
  return (
    <div className="min-h-screen bg-gray-50 p-3">
      {/* Toast */}
      {toast &&
      <div className="fixed top-4 right-4 z-50 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
          <CheckCircleIcon className="w-3.5 h-3.5 text-green-400" />
          {toast}
        </div>
      }

      {showDicomImportModal &&
      <DicomImportModal
        patientName={selectedPatient.name}
        onClose={() => setShowDicomImportModal(false)}
        onImport={({ modality, fileName }) => {
          showToast(`Image DICOM importée (${modality}) : ${fileName}`);
          setShowDicomImportModal(false);
        }} />

      }

      {selectedImageDetail &&
      <CardiacImageDetailModal
        image={selectedImageDetail}
        patientName={selectedPatient.name}
        onClose={() => setSelectedImageDetail(null)}
        onAddToReport={() => {
          showToast(`Image "${selectedImageDetail.type}" ajoutée au rapport.`);
          setSelectedImageDetail(null);
        }} />
      }

      {planningAnomaly && (
        <FollowUpSchedulerModal
          anomaly={planningAnomaly}
          existingPlan={followUpPlans[planningAnomaly.id]}
          onClose={() => setPlanningAnomalyId(null)}
          onSave={saveFollowUpPlan}
          onDelete={() => deleteFollowUpPlan(planningAnomaly)}
        />
      )}

      {creatingTreatmentPlan && (
        <CreateTreatmentPlanModal
          onClose={() => setCreatingTreatmentPlan(false)}
          onSave={createTreatmentPlan}
        />
      )}

      {editingPlanId && treatmentPlans.find((p) => p.id === editingPlanId) && (
        <EditTreatmentPlanModal
          plan={treatmentPlans.find((p) => p.id === editingPlanId)!}
          onClose={() => setEditingPlanId(null)}
          onSave={updateTreatmentPlan}
          onDelete={(planId) => {
            const plan = treatmentPlans.find((p) => p.id === planId);
            if (plan) deleteTreatmentPlan(planId, plan.title);
          }}
        />
      )}

      {generatingReportForPlanId && treatmentPlans.find((p) => p.id === generatingReportForPlanId) && (
        <GenerateReportModal
          plan={treatmentPlans.find((p) => p.id === generatingReportForPlanId)!}
          onClose={() => setGeneratingReportForPlanId(null)}
          onGenerate={generateTreatmentReport}
        />
      )}

      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-red-600 rounded-lg flex items-center justify-center">
            <HeartIcon className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900">
              Diagnostics Cardiologiques
            </h1>
            <p className="text-xs text-gray-500">
              Analyse et suivi cardiovasculaire avancé
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white min-w-[210px]">
            <p className="text-[10px] text-gray-400 leading-none mb-0.5">
              Patient actif
            </p>
            <p className="text-xs font-semibold text-gray-900 leading-tight">
              {selectedPatient.name}
            </p>
            <p className="text-[10px] text-gray-500 leading-tight">
              {selectedPatient.age} ans • Dossier #{selectedPatient.dossier}
            </p>
          </div>
          <button
            onClick={() => navigate('/nouvel-examen-clinique')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">

            <PlusIcon className="w-3.5 h-3.5" />
            Nouvel Examen
          </button>
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
            <PrinterIcon className="w-3.5 h-3.5" />
            Imprimer
          </button>
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
            <DownloadIcon className="w-3.5 h-3.5" />
            Exporter
          </button>
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700">
            <ZapIcon className="w-3.5 h-3.5" />
            Analyse IA
          </button>
        </div>
      </div>

      {/* Patient Info Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-2.5 mb-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
            <UserIcon className="w-4 h-4 text-red-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {selectedPatient.name}
            </p>
            <p className="text-xs text-gray-500">
              {selectedPatient.age} ans • {selectedPatient.gender === 'M' ? 'Homme' : 'Femme'} • Dossier #{selectedPatient.dossier}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-[10px] text-gray-500">Risque CV</p>
            <p className="text-xs font-bold text-red-600">{selectedPatient.riskLevel}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-gray-500">Score GRACE</p>
            <p className="text-xs font-bold text-orange-600">148</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-gray-500">Dernière consultation</p>
            <p className="text-xs font-semibold text-gray-700">{selectedPatient.lastVisit}</p>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-red-50 border border-red-200 rounded-full">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-medium text-red-600">
              Surveillance Active
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) =>
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium transition-all border-b-2 ${activeTab === tab.id ? 'border-red-500 text-red-600 bg-red-50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>

              {tab.icon}
              {tab.label}
            </button>
          )}
        </div>

        <div className="p-3">
          {/* TAB 1: ECG */}
          {activeTab === 'ecg' &&
          <div className="space-y-3">
              {/* Hardware Connection Panel */}
              <HardwareConnectionPanel
                deviceStatuses={deviceStatuses}
                connectedDevice={connectedDevice}
                latestHeartRate={latestSample?.heartRate}
                isStreaming={isStreaming}
                simulatedHeartRate={simulatedHeartRate}
                onConnect={connect}
                onDisconnect={disconnect}
                onSimHeartRateChange={setSimHeartRate}
              />

              {/* Vitals */}
              <div className="grid grid-cols-5 gap-2">
                {vitals.map((v) =>
              <div
                key={v.label}
                className={`rounded-lg border p-2.5 ${vitalStatusColor(v.status)}`}>

                    <div className="flex items-center justify-between mb-1">
                      <span className={`${vitalTextColor(v.status)}`}>
                        {v.icon}
                      </span>
                      <span
                    className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${v.status === 'normal' ? 'bg-green-100 text-green-700' : v.status === 'warning' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>

                        {v.status === 'normal' ?
                    'Normal' :
                    v.status === 'warning' ?
                    'Attention' :
                    'Critique'}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500 font-medium">
                      {v.label}
                    </p>
                    <p
                  className={`text-base font-bold ${vitalTextColor(v.status)}`}>

                      {v.value}
                    </p>
                    <p className="text-[10px] text-gray-400">{v.unit}</p>
                  </div>
              )}
              </div>

              {/* Real-time ECG Monitor with Hardware Integration */}
              <ECGMonitorCanvas
                sampleBuffer={sampleBuffer}
                latestSample={latestSample}
                selectedLead={selectedLead}
                onLeadChange={setSelectedLead}
                isStreaming={isStreaming}
              />

              {/* Heart Rate Zones */}
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <h3 className="text-xs font-semibold text-gray-700 mb-2">
                  Zones de Fréquence Cardiaque
                </h3>
                <div className="flex items-center gap-0 rounded-lg overflow-hidden">
                  <div className="flex-1 bg-blue-500 text-white text-center py-1.5 text-[10px] font-medium">
                    <p>Bradycardie</p>
                    <p className="text-blue-200">&lt;60 bpm</p>
                  </div>
                  <div className="flex-1 bg-green-500 text-white text-center py-1.5 text-[10px] font-medium ring-2 ring-green-300 z-10 scale-105 rounded">
                    <p>✓ Normal</p>
                    <p className="text-green-200">60-100 bpm</p>
                  </div>
                  <div className="flex-1 bg-orange-500 text-white text-center py-1.5 text-[10px] font-medium">
                    <p>Tachycardie</p>
                    <p className="text-orange-200">&gt;100 bpm</p>
                  </div>
                  <div className="flex-1 bg-red-600 text-white text-center py-1.5 text-[10px] font-medium">
                    <p>Critique</p>
                    <p className="text-red-200">&gt;150 bpm</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                  <span className="text-xs text-gray-600">
                    FC actuelle: <strong>72 bpm</strong> — Zone normale
                  </span>
                </div>
              </div>

              {/* Interpretation */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <InfoIcon className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-amber-800 mb-1">
                      Interprétation ECG
                    </p>
                    <p className="text-xs text-amber-700">
                      Rythme sinusal à 72 bpm. Axe électrique normal.
                      Hypertrophie ventriculaire gauche (critères de
                      Sokolow-Lyon: 38mm). Sous-décalage ST en V4-V6 de 1-1.5mm
                      évocateur d'ischémie sous-endocardique. Onde T négative en
                      V5-V6. <strong>Corrélation clinique recommandée.</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          }

          {/* TAB 2: Imagerie Cardiaque */}
          {activeTab === 'imagerie' &&
          <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-900">
                  Imagerie Cardiaque
                </h2>
                <button
                onClick={() => setShowDicomImportModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs hover:bg-red-700">

                  <ScanIcon className="w-3.5 h-3.5" />
                  Nouvelle Imagerie
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {cardiacImages.map((img) =>
              <div
                key={img.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">

                    <div className="bg-gray-900 h-36 flex items-center justify-center relative">
                      <div className="text-center">
                        <ScanIcon className="w-8 h-8 text-gray-600 mx-auto mb-1" />
                        <p className="text-gray-500 text-xs">{img.type}</p>
                        <p className="text-gray-600 text-[10px]">
                          {img.region}
                        </p>
                      </div>
                      <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                        IA: {img.aiScore}%
                      </div>
                      <div className="absolute top-2 left-2">
                        <span
                      className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${statusColor(img.status)}`}>

                          {img.status === 'anormal' ?
                      'Anormal' :
                      img.status === 'à_surveiller' ?
                      'À surveiller' :
                      'Normal'}
                        </span>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-xs font-semibold text-gray-900">
                          {img.type}
                        </h3>
                        <span className="text-[10px] text-gray-500">
                          {img.date}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">
                        {img.findings}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-gray-500">
                          {img.region}
                        </span>
                        <button
                          onClick={() => setSelectedImageDetail(img)}
                          className="flex items-center gap-1 text-[10px] text-red-600 hover:text-red-700 font-medium">
                          Voir détails <ChevronRightIcon className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
              )}
              </div>
              <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <ZapIcon className="w-4 h-4 text-red-600" />
                  <h3 className="text-xs font-semibold text-red-800">
                    Analyse IA — Synthèse Imagerie
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                {
                  label: "Fraction d'Éjection",
                  val: '45%',
                  sub: '↓ Légèrement diminuée',
                  color: 'orange'
                },
                {
                  label: 'Sténose max. coronaire',
                  val: '60%',
                  sub: '⚠ IVA proximale',
                  color: 'red'
                },
                {
                  label: 'Fibrose myocardique',
                  val: '8%',
                  sub: '↑ À surveiller',
                  color: 'orange'
                }].
                map((item, i) =>
                <div
                  key={i}
                  className="bg-white rounded-lg p-2.5 border border-red-100">

                      <p className="text-[10px] text-gray-500 mb-1">
                        {item.label}
                      </p>
                      <p className={`text-xl font-bold text-${item.color}-600`}>
                        {item.val}
                      </p>
                      <p className={`text-[10px] text-${item.color}-600`}>
                        {item.sub}
                      </p>
                    </div>
                )}
                </div>
              </div>
            </div>
          }

          {/* TAB 3: Anomalies */}
          {activeTab === 'anomalies' &&
          <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">
                    Détection d'Anomalies Cardiaques
                  </h2>
                  <p className="text-xs text-gray-500">
                    {anomalies.length} anomalies détectées par analyse IA
                  </p>
                  <p className="text-[10px] text-red-600 mt-0.5">
                    {Object.keys(followUpPlans).length} suivis planifiés depuis cette analyse
                  </p>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs hover:bg-red-700">
                  <RefreshCwIcon className="w-3.5 h-3.5" />
                  Relancer l'analyse
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
              {
                bg: 'red',
                val: '1',
                label: 'Sévère'
              },
              {
                bg: 'orange',
                val: '2',
                label: 'Modérée'
              },
              {
                bg: 'yellow',
                val: '1',
                label: 'Faible'
              },
              {
                bg: 'blue',
                val: '94%',
                label: 'Confiance moy.'
              }].
              map((item, i) =>
              <div
                key={i}
                className={`bg-${item.bg}-50 border border-${item.bg}-200 rounded-lg p-3 text-center`}>

                    <p className={`text-xl font-bold text-${item.bg}-600`}>
                      {item.val}
                    </p>
                    <p
                  className={`text-[10px] text-${item.bg}-600 font-medium`}>

                      {item.label}
                    </p>
                  </div>
              )}
              </div>
              <div className="space-y-2">
                {anomalies.map((anomaly) =>
              <div
                key={anomaly.id}
                className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${selectedAnomaly === anomaly.id ? 'border-red-400 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}
                onClick={() =>
                setSelectedAnomaly(
                  selectedAnomaly === anomaly.id ? null : anomaly.id
                )
                }>

                    <div className="p-3 flex items-center justify-between bg-white">
                      <div className="flex items-center gap-2">
                        <div
                      className={`w-2.5 h-2.5 rounded-full ${anomaly.severity === 'sévère' ? 'bg-red-500' : anomaly.severity === 'modérée' ? 'bg-orange-500' : 'bg-yellow-500'}`} />

                        <div>
                          <p className="text-xs font-semibold text-gray-900">
                            {anomaly.type}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            {anomaly.location} • Détecté le {anomaly.detected}
                          </p>
                          {followUpPlans[anomaly.id] && (
                            <p className="text-[10px] text-red-600 mt-0.5">
                              Suivi prévu le {formatDate(followUpPlans[anomaly.id].scheduledDate)} à {followUpPlans[anomaly.id].scheduledTime}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <p className="text-[10px] text-gray-500">
                            Confiance IA
                          </p>
                          <p className="text-xs font-bold text-gray-900">
                            {anomaly.confidence}%
                          </p>
                        </div>
                        <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${severityColor(anomaly.severity)}`}>

                          {anomaly.severity.charAt(0).toUpperCase() +
                      anomaly.severity.slice(1)}
                        </span>
                        <ChevronRightIcon
                      className={`w-3.5 h-3.5 text-gray-400 transition-transform ${selectedAnomaly === anomaly.id ? 'rotate-90' : ''}`} />

                      </div>
                    </div>
                    {selectedAnomaly === anomaly.id &&
                <div className="px-3 pb-3 bg-gray-50 border-t border-gray-100">
                        <p className="text-xs text-gray-700 mt-2 mb-2">
                          {anomaly.description}
                        </p>
                        {followUpPlans[anomaly.id] && (
                          <div className="rounded-lg border border-red-100 bg-red-50 px-2.5 py-2 mb-2">
                            <p className="text-[10px] font-semibold text-red-700">Suivi planifié</p>
                            <p className="text-[10px] text-red-600 mt-0.5">
                              {followUpPlans[anomaly.id].followUpType} • {formatDate(followUpPlans[anomaly.id].scheduledDate)} {followUpPlans[anomaly.id].scheduledTime}
                            </p>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5">
                          <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTab('ecg');
                      }}
                      className="px-2.5 py-1 bg-red-600 text-white text-[10px] rounded-lg hover:bg-red-700">

                            Voir sur ECG
                          </button>
                          <button
                      onClick={(e) => {
                        e.stopPropagation();
                        showToast(
                          `Anomalie "${anomaly.type}" ajoutée au rapport`
                        );
                      }}
                      className="px-2.5 py-1 bg-white border border-gray-200 text-gray-600 text-[10px] rounded-lg hover:bg-gray-50">

                            Ajouter au rapport
                          </button>
                          <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPlanningAnomalyId(anomaly.id);
                      }}
                      className="px-2.5 py-1 bg-white border border-gray-200 text-gray-600 text-[10px] rounded-lg hover:bg-gray-50">

                            {followUpPlans[anomaly.id] ? 'Modifier suivi' : 'Planifier suivi'}
                          </button>
                          {followUpPlans[anomaly.id] && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveTab('plans');
                                setSelectedPlan(`fu-${anomaly.id}`);
                              }}
                              className="px-2.5 py-1 bg-red-50 border border-red-200 text-red-700 text-[10px] rounded-lg hover:bg-red-100">
                              Voir plan
                            </button>
                          )}
                        </div>
                      </div>
                }
                  </div>
              )}
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <h3 className="text-xs font-semibold text-gray-700 mb-3">
                  Niveaux de Confiance IA
                </h3>
                <div className="space-y-2">
                  {anomalies.map((a) =>
                <div key={a.id} className="flex items-center gap-2">
                      <p className="text-[10px] text-gray-600 w-40 truncate">
                        {a.type}
                      </p>
                      <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                        <div
                      className={`h-1.5 rounded-full ${a.severity === 'sévère' ? 'bg-red-500' : a.severity === 'modérée' ? 'bg-orange-500' : 'bg-yellow-500'}`}
                      style={{
                        width: `${a.confidence}%`
                      }} />

                      </div>
                      <span className="text-[10px] font-semibold text-gray-700 w-8 text-right">
                        {a.confidence}%
                      </span>
                    </div>
                )}
                </div>
              </div>
            </div>
          }

          {/* TAB 4: Plans de Traitement */}
          {activeTab === 'plans' &&
          <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">
                    Plans de Traitement Cardiologique
                  </h2>
                  <p className="text-xs text-gray-500">
                    {treatmentPlans.length} plans actifs
                    {selectedPlansForFolder.size > 0 && ` • ${selectedPlansForFolder.size} sélectionné(s)`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {selectedPlansForFolder.size > 0 && (
                    <button
                      onClick={addPlansToPatientFolder}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs hover:bg-green-700">
                      <CheckCircleIcon className="w-3.5 h-3.5" />
                      Ajouter au dossier patient
                    </button>
                  )}
                  <button
                    onClick={() => setCreatingTreatmentPlan(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs hover:bg-red-700">
                    <ClipboardListIcon className="w-3.5 h-3.5" />
                    Nouveau Plan
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                {treatmentPlans.map((plan) =>
              <div
                key={plan.id}
                className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${selectedPlan === plan.id ? 'border-red-400 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}
                onClick={() =>
                setSelectedPlan(selectedPlan === plan.id ? null : plan.id)
                }>

                    <div className="p-3 bg-white">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-2">
                          <input
                            type="checkbox"
                            checked={selectedPlansForFolder.has(plan.id)}
                            onChange={(e) => {
                              e.stopPropagation();
                              togglePlanSelection(plan.id);
                            }}
                            className="w-4 h-4 mt-0.5 cursor-pointer text-red-600 rounded border-gray-300 focus:ring-red-500"
                          />
                          <div
                        className={`w-2 h-2 rounded-full mt-1.5 ${plan.priority === 'urgent' ? 'bg-red-500' : plan.priority === 'élevée' ? 'bg-orange-500' : plan.priority === 'normale' ? 'bg-blue-500' : 'bg-gray-400'}`} />

                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <h3 className="text-xs font-semibold text-gray-900">
                                {plan.title}
                              </h3>
                              <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-full ${planStatusColor(plan.status)}`}>

                                {plan.status === 'en_cours' ?
                            'En cours' :
                            plan.status === 'planifié' ?
                            'Planifié' :
                            'Terminé'}
                              </span>
                            </div>
                            <p className="text-[10px] text-gray-500">
                              {plan.category} • Débuté le {plan.startDate} •
                              Durée: {plan.duration}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${priorityColor(plan.priority)}`}>

                            {plan.priority.charAt(0).toUpperCase() +
                        plan.priority.slice(1)}
                          </span>
                          <ChevronRightIcon
                        className={`w-3.5 h-3.5 text-gray-400 transition-transform ${selectedPlan === plan.id ? 'rotate-90' : ''}`} />

                        </div>
                      </div>
                    </div>
                    {selectedPlan === plan.id &&
                <div className="px-3 pb-3 bg-gray-50 border-t border-gray-100">
                        <div className="grid grid-cols-2 gap-3 mt-3">
                          <div>
                            <h4 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                              Médicaments
                            </h4>
                            <ul className="space-y-1">
                              {plan.medications.map((med, i) =>
                        <li
                          key={i}
                          className="flex items-center gap-1.5 text-xs text-gray-700">

                                  <div className="w-1 h-1 bg-red-400 rounded-full" />
                                  {med}
                                </li>
                        )}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                              Procédures
                            </h4>
                            <ul className="space-y-1">
                              {plan.procedures.map((proc, i) =>
                        <li
                          key={i}
                          className="flex items-center gap-1.5 text-xs text-gray-700">

                                  <div className="w-1 h-1 bg-blue-400 rounded-full" />
                                  {proc}
                                </li>
                        )}
                            </ul>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs text-gray-600">
                            <CalendarIcon className="w-3.5 h-3.5" />
                            Prochain contrôle:{' '}
                            <strong>{plan.nextReview}</strong>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingPlanId(plan.id);
                        }}
                        className="px-2.5 py-1 bg-red-600 text-white text-[10px] rounded-lg hover:bg-red-700">

                              Modifier le plan
                            </button>
                            <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setGeneratingReportForPlanId(plan.id);
                        }}
                        className="px-2.5 py-1 bg-white border border-gray-200 text-gray-600 text-[10px] rounded-lg hover:bg-gray-50">

                              Générer rapport
                            </button>
                          </div>
                        </div>
                      </div>
                }
                  </div>
              )}
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <h3 className="text-xs font-semibold text-gray-700 mb-3">
                  Chronologie des Traitements
                </h3>
                <div className="relative">
                  <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200" />
                  <div className="space-y-3">
                    {[
                      {
                        dot: 'bg-red-500',
                        title: 'Cardioversion électrique programmée',
                        date: '20/01/2025 • Arythmologie'
                      },
                      {
                        dot: 'bg-orange-500',
                        title: 'Coronarographie + Angioplastie IVA',
                        date: '25/01/2025 • Cardiologie interventionnelle'
                      },
                      {
                        dot: 'bg-blue-500',
                        title: 'Début réhabilitation cardiaque',
                        date: '01/02/2025 • Réhabilitation'
                      },
                      {
                        dot: 'bg-green-500',
                        title: 'Contrôle échocardiographique',
                        date: '15/02/2025 • Suivi'
                      },
                      ...followUpTimeline
                    ].map((item, i) =>
                  <div
                    key={i}
                    className="flex items-start gap-3 pl-8 relative">

                        <div
                      className={`absolute left-2 w-2.5 h-2.5 ${item.dot} rounded-full border-2 border-white shadow`} />

                        <div>
                          <p className="text-xs font-semibold text-gray-900">
                            {item.title}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            {item.date}
                          </p>
                        </div>
                      </div>
                  )}
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>);

}