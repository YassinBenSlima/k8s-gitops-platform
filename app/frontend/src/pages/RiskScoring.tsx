import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BrainIcon,
  HeartIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  UserIcon,
  ChevronDownIcon,
  FileTextIcon,
  ActivityIcon,
  ZapIcon,
  XIcon,
  DownloadIcon,
  PrinterIcon } from
'lucide-react';
import { usePatient } from '../contexts/PatientContext';
interface RiskFactors {
  age: number;
  gender: string;
  hta: boolean;
  diabetes: boolean;
  smoking: boolean;
  cholesterol: boolean;
  familyHistory: boolean;
  obesity: boolean;
  sedentary: boolean;
  systolic: number;
  diastolic: number;
  heartRate: number;
  ldl: number;
  hba1c: number;
}
interface PatientHistory {
  date: string;
  score: number;
  level: string;
  afibRisk: number;
  hfRisk: number;
}
const patientHistories: Record<string, PatientHistory[]> = {
  '1': [
  {
    date: '28/02/2026',
    score: 68,
    level: 'Élevé',
    afibRisk: 45,
    hfRisk: 32
  },
  {
    date: '15/01/2026',
    score: 72,
    level: 'Élevé',
    afibRisk: 48,
    hfRisk: 35
  },
  {
    date: '01/12/2025',
    score: 65,
    level: 'Élevé',
    afibRisk: 42,
    hfRisk: 30
  }],

  '2': [
  {
    date: '28/02/2026',
    score: 34,
    level: 'Modéré',
    afibRisk: 18,
    hfRisk: 12
  },
  {
    date: '10/01/2026',
    score: 38,
    level: 'Modéré',
    afibRisk: 20,
    hfRisk: 14
  }]

};
const patients = [
{
  id: '1',
  name: 'Jean-Pierre Moreau',
  age: 67
},
{
  id: '2',
  name: 'Marie Lefevre',
  age: 54
},
{
  id: '3',
  name: 'Robert Blanc',
  age: 72
},
{
  id: '4',
  name: 'Sylvie Dupont',
  age: 48
},
{
  id: '5',
  name: 'Michel Bernard',
  age: 61
}];

const getRiskLevel = (score: number) => {
  if (score < 30)
  return {
    label: 'Faible',
    color: '#22c55e',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200'
  };
  if (score < 60)
  return {
    label: 'Modéré',
    color: '#f59e0b',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200'
  };
  if (score < 80)
  return {
    label: 'Élevé',
    color: '#f97316',
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-200'
  };
  return {
    label: 'Très Élevé',
    color: '#ef4444',
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200'
  };
};
const getPriorityBadge = (priority: string) => {
  if (priority === 'high') {
    return 'bg-red-50 text-red-700 border-red-200';
  }
  if (priority === 'medium') {
    return 'bg-amber-50 text-amber-700 border-amber-200';
  }
  return 'bg-rose-50 text-rose-700 border-rose-200';
};
const ReportModal = ({
  isOpen,
  onClose,
  patient,
  generatedAt,
  reportText,
  riskScore,
  afibRisk,
  hfRisk,
  maceRisk,
  recommendations,
  factors,
  history
}: {
  isOpen: boolean;
  onClose: () => void;
  patient: any;
  generatedAt: string;
  reportText: string;
  riskScore: number;
  afibRisk: number;
  hfRisk: number;
  maceRisk: number;
  recommendations: Array<{ icon: string; text: string; priority: string }>;
  factors: RiskFactors;
  history: PatientHistory[];
}) => {
  if (!isOpen) {
    return null;
  }

  const risk = getRiskLevel(riskScore);
  const enabledFactors = [
    factors.hta && 'Hypertension artérielle',
    factors.diabetes && 'Diabète',
    factors.smoking && 'Tabagisme',
    factors.cholesterol && 'Hypercholestérolémie',
    factors.familyHistory && 'Antécédents familiaux',
    factors.obesity && 'Obésité',
    factors.sedentary && 'Sédentarité'
  ].filter(Boolean);

  const handleDownload = () => {
    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `rapport-risque-${patient?.id ?? 'patient'}-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (!printWindow) {
      return;
    }
    printWindow.document.write(`
      <html>
        <head>
          <title>Rapport complet de risque cardiologique</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 24px; color: #111827; }
            h1, h2 { color: #b91c1c; }
            .meta, .card { border: 1px solid #fecaca; border-radius: 12px; padding: 16px; margin-bottom: 16px; }
            .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
            .small { color: #6b7280; font-size: 12px; }
            ul { padding-left: 18px; }
            table { width: 100%; border-collapse: collapse; margin-top: 12px; }
            th, td { border-bottom: 1px solid #e5e7eb; padding: 8px; text-align: left; font-size: 13px; }
          </style>
        </head>
        <body>
          <h1>Rapport complet de risque cardiologique</h1>
          <div class="meta">
            <strong>Patient:</strong> ${patient?.name ?? ''}<br />
            <strong>Dossier:</strong> #${patient?.dossier ?? 'N/A'}<br />
            <strong>Généré le:</strong> ${generatedAt}
          </div>
          <pre style="white-space: pre-wrap; font-family: Arial, sans-serif;">${reportText}</pre>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          onClick={(e) => e.stopPropagation()}
          className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
          <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-2xl">
            <div>
              <h2 className="text-sm font-semibold text-red-800">Rapport complet de risque cardiologique</h2>
              <p className="text-xs text-red-600 mt-0.5">{patient?.name} · généré le {generatedAt}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-1 text-red-600 hover:bg-red-100">
              <XIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto bg-gray-50 p-5">
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
              <div className="xl:col-span-2 space-y-4">
                <div className="rounded-2xl border border-red-100 bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-red-500">Synthèse clinique</p>
                      <h3 className="mt-1 text-lg font-bold text-gray-900">{patient?.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {patient?.age} ans · {patient?.gender === 'M' ? 'Masculin' : 'Féminin'} · Dossier #{patient?.dossier}
                      </p>
                      <p className="mt-2 text-sm text-gray-600">Diagnostic actif: {patient?.diagnosis}</p>
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${risk.bg} ${risk.text} ${risk.border}`}>
                      Risque {risk.label}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {[
                    { label: 'Score global', value: `${riskScore}/100`, tone: 'text-red-600 bg-red-50 border-red-100' },
                    { label: 'Risque AFib', value: `${afibRisk}%`, tone: 'text-rose-600 bg-rose-50 border-rose-100' },
                    { label: 'Risque IC', value: `${hfRisk}%`, tone: 'text-amber-600 bg-amber-50 border-amber-100' },
                    { label: 'Risque MACE', value: `${maceRisk}%`, tone: 'text-orange-600 bg-orange-50 border-orange-100' }
                  ].map((item) => (
                    <div key={item.label} className={`rounded-xl border p-3 ${item.tone}`}>
                      <p className="text-[11px] font-semibold uppercase tracking-wide">{item.label}</p>
                      <p className="mt-2 text-xl font-bold">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-red-100 bg-white p-4 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-900">Facteurs de risque retenus</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {enabledFactors.length > 0 ? enabledFactors.map((factor) => (
                      <span key={factor} className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
                        {factor}
                      </span>
                    )) : (
                      <span className="text-sm text-gray-500">Aucun facteur majeur activé.</span>
                    )}
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                    {[
                      { label: 'TA', value: `${factors.systolic}/${factors.diastolic} mmHg` },
                      { label: 'Fréquence cardiaque', value: `${factors.heartRate} bpm` },
                      { label: 'LDL', value: `${factors.ldl} mmol/L` },
                      { label: 'HbA1c', value: `${factors.hba1c}%` }
                    ].map((item) => (
                      <div key={item.label} className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">{item.label}</p>
                        <p className="mt-1 text-sm font-semibold text-gray-900">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-red-100 bg-white p-4 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-900">Recommandations thérapeutiques et de suivi</h3>
                  <div className="mt-3 space-y-2">
                    {recommendations.map((recommendation, index) => (
                      <div key={`${recommendation.text}-${index}`} className={`flex items-start gap-3 rounded-xl border p-3 ${getPriorityBadge(recommendation.priority)}`}>
                        <span className="text-base">{recommendation.icon}</span>
                        <div>
                          <p className="text-sm font-medium">{recommendation.text}</p>
                          <p className="mt-1 text-[11px] uppercase tracking-wide opacity-75">
                            Priorité {recommendation.priority === 'high' ? 'haute' : recommendation.priority === 'medium' ? 'moyenne' : 'faible'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-red-100 bg-white p-4 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-900">Historique du patient</h3>
                  <div className="mt-3 space-y-2">
                    {history.length > 0 ? history.map((entry, index) => (
                      <div key={`${entry.date}-${index}`} className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-gray-900">{entry.date}</span>
                          <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${getRiskLevel(entry.score).bg} ${getRiskLevel(entry.score).text} ${getRiskLevel(entry.score).border}`}>
                            {entry.level}
                          </span>
                        </div>
                        <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-gray-600">
                          <div>Score: <span className="font-semibold text-gray-900">{entry.score}</span></div>
                          <div>AFib: <span className="font-semibold text-gray-900">{entry.afibRisk}%</span></div>
                          <div>IC: <span className="font-semibold text-gray-900">{entry.hfRisk}%</span></div>
                        </div>
                      </div>
                    )) : (
                      <p className="text-sm text-gray-500">Aucun historique disponible pour ce patient.</p>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-red-100 bg-white p-4 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-900">Version texte du rapport</h3>
                  <pre className="mt-3 max-h-[360px] overflow-y-auto whitespace-pre-wrap rounded-xl bg-gray-50 p-3 text-xs leading-5 text-gray-700">
                    {reportText}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2 border-t border-red-100 bg-white px-5 py-4">
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100">
              <DownloadIcon className="h-4 w-4" />
              Télécharger .txt
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50">
              <PrinterIcon className="h-4 w-4" />
              Imprimer
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700">
              Fermer
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
const RiskGauge = ({ score }: {score: number;}) => {
  const risk = getRiskLevel(score);
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - score / 100 * circumference;
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-40">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="10" />

          <motion.circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={risk.color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{
              strokeDashoffset: circumference
            }}
            animate={{
              strokeDashoffset
            }}
            transition={{
              duration: 1.5,
              ease: 'easeOut'
            }} />

        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-4xl font-bold text-slate-800"
            initial={{
              opacity: 0,
              scale: 0.5
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              delay: 0.5,
              duration: 0.5
            }}>

            {score}
          </motion.span>
          <span className="text-xs text-slate-500 font-medium">/100</span>
        </div>
      </div>
      <div
        className={`mt-3 px-4 py-1.5 rounded-full border font-bold text-sm ${risk.bg} ${risk.text} ${risk.border}`}>

        Risque {risk.label}
      </div>
    </div>);

};
export default function RiskScoring() {
  const [riskScore, setRiskScore] = useState(68);
  const [afibRisk, setAfibRisk] = useState(45);
  const [hfRisk, setHfRisk] = useState(32);
  const [maceRisk, setMaceRisk] = useState(28);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportText, setReportText] = useState('');
  const [reportGeneratedAt, setReportGeneratedAt] = useState('');
  const { selectedPatient } = usePatient();
  const [factors, setFactors] = useState<RiskFactors>({
    age: selectedPatient.age,
    gender: selectedPatient.gender,
    hta: true,
    diabetes: true,
    smoking: false,
    cholesterol: true,
    familyHistory: true,
    obesity: false,
    sedentary: true,
    systolic: 145,
    diastolic: 88,
    heartRate: 78,
    ldl: 3.8,
    hba1c: 7.2
  });
  const selectedPatientData = selectedPatient;
  const history = patientHistories[selectedPatient.id] || [];
  React.useEffect(() => {
    setFactors((prev) => ({
      ...prev,
      age: selectedPatient.age,
      gender: selectedPatient.gender,
    }));
  }, [selectedPatient]);

  const handleCalculate = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const baseScore = Math.min(
        100,
        Math.max(
          0,
          (factors.hta ? 15 : 0) + (
          factors.diabetes ? 12 : 0) + (
          factors.smoking ? 18 : 0) + (
          factors.cholesterol ? 10 : 0) + (
          factors.familyHistory ? 8 : 0) + (
          factors.obesity ? 10 : 0) + (
          factors.sedentary ? 7 : 0) +
          Math.floor(factors.age / 10) * 3 + (
          factors.systolic > 140 ? 8 : 0) + (
          factors.ldl > 3.5 ? 6 : 0)
        )
      );
      setRiskScore(baseScore);
      setAfibRisk(Math.floor(baseScore * 0.65));
      setHfRisk(Math.floor(baseScore * 0.47));
      setMaceRisk(Math.floor(baseScore * 0.41));
      setIsCalculating(false);
    }, 1500);
  };
  const risk = getRiskLevel(riskScore);
  const recommendations =
  riskScore >= 60 ?
  [
  {
    icon: '💊',
    text: 'Anticoagulants recommandés (risque AFib élevé)',
    priority: 'high'
  },
  {
    icon: '💊',
    text: 'Statines haute intensité (LDL > 3.5 mmol/L)',
    priority: 'high'
  },
  {
    icon: '💊',
    text: 'Bêta-bloquants pour contrôle de la FC',
    priority: 'medium'
  },
  {
    icon: '🏃',
    text: "Programme d'activité physique supervisé",
    priority: 'medium'
  },
  {
    icon: '🥗',
    text: 'Régime méditerranéen strict',
    priority: 'medium'
  },
  {
    icon: '📅',
    text: 'Suivi cardiologique mensuel recommandé',
    priority: 'low'
  }] :

  [
  {
    icon: '💊',
    text: 'Statines à dose modérée si LDL > 3.0',
    priority: 'medium'
  },
  {
    icon: '🏃',
    text: 'Activité physique 150 min/semaine',
    priority: 'medium'
  },
  {
    icon: '🥗',
    text: 'Alimentation équilibrée, réduction sel',
    priority: 'low'
  },
  {
    icon: '📅',
    text: 'Bilan cardiaque annuel',
    priority: 'low'
  }];

  const buildReportText = () => {
    const activeFactors = [
      factors.hta ? 'Hypertension artérielle' : null,
      factors.diabetes ? 'Diabète' : null,
      factors.smoking ? 'Tabagisme' : null,
      factors.cholesterol ? 'Hypercholestérolémie' : null,
      factors.familyHistory ? 'Antécédents familiaux cardiovasculaires' : null,
      factors.obesity ? 'Obésité' : null,
      factors.sedentary ? 'Sédentarité' : null
    ].filter(Boolean);
    const timestamp = new Date().toLocaleString('fr-FR');

    return [
      'RAPPORT COMPLET DE RISQUE CARDIOLOGIQUE',
      '',
      `Patient: ${selectedPatientData?.name}`,
      `Dossier: #${selectedPatientData?.dossier ?? 'N/A'}`,
      `Age: ${selectedPatientData?.age} ans`,
      `Sexe: ${factors.gender === 'M' ? 'Masculin' : 'Féminin'}`,
      `Diagnostic actif: ${selectedPatientData?.diagnosis ?? 'Non renseigné'}`,
      `Date de génération: ${timestamp}`,
      '',
      '1. SYNTHÈSE DES SCORES',
      `- Score global: ${riskScore}/100 (${risk.label})`,
      `- Risque AFib: ${afibRisk}%`,
      `- Risque insuffisance cardiaque: ${hfRisk}%`,
      `- Risque MACE: ${maceRisk}%`,
      '',
      '2. PARAMÈTRES CLINIQUES',
      `- Tension artérielle: ${factors.systolic}/${factors.diastolic} mmHg`,
      `- Fréquence cardiaque: ${factors.heartRate} bpm`,
      `- LDL: ${factors.ldl} mmol/L`,
      `- HbA1c: ${factors.hba1c}%`,
      '',
      '3. FACTEURS DE RISQUE ACTIFS',
      ...(activeFactors.length > 0 ? activeFactors.map((factor) => `- ${factor}`) : ['- Aucun facteur majeur activé']),
      '',
      '4. RECOMMANDATIONS IA',
      ...recommendations.map((recommendation) => `- [${recommendation.priority.toUpperCase()}] ${recommendation.text}`),
      '',
      '5. HISTORIQUE DES ÉVALUATIONS',
      ...(history.length > 0 ? history.map((entry) => `- ${entry.date}: Score ${entry.score}/100, niveau ${entry.level}, AFib ${entry.afibRisk}%, IC ${entry.hfRisk}%`) : ['- Aucun historique disponible']),
      '',
      '6. CONCLUSION',
      riskScore >= 60
        ? 'Le profil actuel justifie une surveillance cardiologique rapprochée, une optimisation thérapeutique et un suivi structuré.'
        : 'Le profil actuel reste intermédiaire et nécessite un suivi préventif, hygiéno-diététique et clinique régulier.'
    ].join('\n');
  };

  const handleGenerateReport = () => {
    setIsGeneratingReport(true);
    setTimeout(() => {
      const timestamp = new Date().toLocaleString('fr-FR');
      setReportGeneratedAt(timestamp);
      setReportText(buildReportText());
      setShowReportModal(true);
      setIsGeneratingReport(false);
    }, 800);
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-rose-500 rounded-lg p-3 text-white shadow-sm">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-white/20 flex items-center justify-center">
            <BrainIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold leading-none">
              Score de Risque IA
            </h1>
            <p className="text-red-100 text-xs mt-0.5">
              Évaluation du risque cardiaque assistée par intelligence
              artificielle
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3">
        {/* Risk Calculator */}
        <div className="col-span-12 lg:col-span-5 bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
          <div className="px-3 py-2 border-b border-red-100 bg-red-50">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-l-2 border-red-500 pl-2">
              Calculateur de Risque
            </h3>
          </div>
          <div className="p-3 space-y-3">
            <div className="rounded-lg border border-red-100 bg-red-50 px-3 py-2">
              <label className="block text-[10px] font-semibold uppercase tracking-wide text-red-500 mb-1">
                Patient actif
              </label>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {selectedPatientData?.name}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {selectedPatientData?.age} ans · Dossier #{selectedPatientData?.dossier}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400">Diagnostic</p>
                  <p className="text-[11px] font-medium text-slate-700 max-w-[180px] truncate">
                    {selectedPatient.diagnosis}
                  </p>
                </div>
              </div>
            </div>

            {/* Demographics */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Âge
                </label>
                <input
                  type="number"
                  value={factors.age}
                  onChange={(e) =>
                  setFactors((f) => ({
                    ...f,
                    age: parseInt(e.target.value) || 0
                  }))
                  }
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-red-500" />

              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Sexe
                </label>
                <select
                  value={factors.gender}
                  onChange={(e) =>
                  setFactors((f) => ({
                    ...f,
                    gender: e.target.value
                  }))
                  }
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-red-500">

                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                </select>
              </div>
            </div>

            {/* Risk Factors */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Facteurs de risque
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                {
                  key: 'hta',
                  label: 'HTA'
                },
                {
                  key: 'diabetes',
                  label: 'Diabète'
                },
                {
                  key: 'smoking',
                  label: 'Tabagisme'
                },
                {
                  key: 'cholesterol',
                  label: 'Hypercholestérolémie'
                },
                {
                  key: 'familyHistory',
                  label: 'ATCD familiaux'
                },
                {
                  key: 'obesity',
                  label: 'Obésité'
                },
                {
                  key: 'sedentary',
                  label: 'Sédentarité'
                }].
                map(({ key, label }) =>
                <label
                  key={key}
                  className="flex items-center gap-1.5 cursor-pointer">

                    <input
                    type="checkbox"
                    checked={factors[key as keyof RiskFactors] as boolean}
                    onChange={(e) =>
                    setFactors((f) => ({
                      ...f,
                      [key]: e.target.checked
                    }))
                    }
                    className="h-3.5 w-3.5 text-red-600 rounded border-slate-300 focus:ring-red-500" />

                    <span className="text-xs text-slate-700">{label}</span>
                  </label>
                )}
              </div>
            </div>

            {/* Vitals */}
            <div className="grid grid-cols-2 gap-2">
              {[
              {
                key: 'systolic',
                label: 'TA Systolique (mmHg)'
              },
              {
                key: 'diastolic',
                label: 'TA Diastolique (mmHg)'
              },
              {
                key: 'ldl',
                label: 'Cholestérol LDL (mmol/L)',
                step: '0.1'
              },
              {
                key: 'hba1c',
                label: 'HbA1c (%)',
                step: '0.1'
              }].
              map((field) =>
              <div key={field.key}>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    {field.label}
                  </label>
                  <input
                  type="number"
                  step={field.step}
                  value={factors[field.key as keyof RiskFactors] as number}
                  onChange={(e) =>
                  setFactors((f) => ({
                    ...f,
                    [field.key]: field.step ?
                    parseFloat(e.target.value) || 0 :
                    parseInt(e.target.value) || 0
                  }))
                  }
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-red-500" />

                </div>
              )}
            </div>

            <button
              onClick={handleCalculate}
              disabled={isCalculating}
              className="w-full py-2.5 bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 text-white rounded-lg font-semibold text-xs shadow-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2">

              {isCalculating ?
              <>
                  <svg
                  className="animate-spin h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24">

                    <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4" />

                    <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />

                  </svg>
                  Calcul en cours...
                </> :

              <>
                  <ZapIcon className="h-4 w-4" />
                  Calculer le Score de Risque
                </>
              }
            </button>
          </div>
        </div>

        {/* Risk Score Display */}
        <div className="col-span-12 lg:col-span-3 space-y-3">
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-l-2 border-red-500 pl-2 mb-4">
              Score Global
            </h3>
            <div className="flex justify-center mb-4">
              <RiskGauge score={riskScore} />
            </div>
            <div className="space-y-2">
              {[
              {
                label: 'Risque AFib',
                icon: HeartIcon,
                iconColor: 'text-red-500',
                val: afibRisk,
                barColor: 'bg-red-500'
              },
              {
                label: 'Insuffisance Cardiaque',
                icon: ActivityIcon,
                iconColor: 'text-amber-500',
                val: hfRisk,
                barColor: 'bg-amber-500'
              },
              {
                label: 'Risque MACE',
                icon: AlertCircleIcon,
                iconColor: 'text-orange-500',
                val: maceRisk,
                barColor: 'bg-orange-500'
              }].
              map((item) =>
              <div key={item.label}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-slate-600 flex items-center gap-1">
                      <item.icon className={`h-3 w-3 ${item.iconColor}`} />
                      {item.label}
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {item.val}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full">
                    <motion.div
                    className={`h-1.5 ${item.barColor} rounded-full`}
                    initial={{
                      width: 0
                    }}
                    animate={{
                      width: `${item.val}%`
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.3
                    }} />

                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="col-span-12 lg:col-span-4 bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
          <div className="px-3 py-2 border-b border-red-100 bg-red-50">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-l-2 border-red-500 pl-2">
              Recommandations IA
            </h3>
          </div>
          <div className="p-3 space-y-1.5 max-h-72 overflow-y-auto">
            {recommendations.map((rec, i) =>
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                x: 10
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                delay: i * 0.08
              }}
              className={`flex items-start gap-2 p-2 rounded-lg border ${rec.priority === 'high' ? 'bg-red-50 border-red-100' : rec.priority === 'medium' ? 'bg-amber-50 border-amber-100' : 'bg-slate-50 border-slate-100'}`}>

                <span className="text-base flex-shrink-0">{rec.icon}</span>
                <p
                className={`text-xs font-medium ${rec.priority === 'high' ? 'text-red-700' : rec.priority === 'medium' ? 'text-amber-700' : 'text-slate-600'}`}>

                  {rec.text}
                </p>
              </motion.div>
            )}
          </div>
          <div className="p-3 border-t border-red-100 bg-white">
            <button
              onClick={handleGenerateReport}
              disabled={isGeneratingReport}
              className="w-full py-2 bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 text-white rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 disabled:opacity-50">
              <FileTextIcon className="h-3.5 w-3.5" />
              {isGeneratingReport ? 'Génération du rapport...' : 'Générer Rapport Complet'}
            </button>
          </div>
        </div>

        {/* History Table */}
        {history.length > 0 &&
        <div className="col-span-12 bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <div className="px-3 py-2 border-b border-red-100 bg-red-50">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-l-2 border-red-500 pl-2">
                Historique des Évaluations — {selectedPatientData?.name}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    {[
                  'Date',
                  'Score',
                  'Niveau',
                  'Risque AFib',
                  'Risque IC',
                  'Tendance'].
                  map((h) =>
                  <th
                    key={h}
                    className="text-left px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">

                        {h}
                      </th>
                  )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {history.map((h, i) => {
                  const prev = history[i + 1];
                  const trend = prev ?
                  h.score < prev.score ?
                  'down' :
                  'up' :
                  null;
                  const riskInfo = getRiskLevel(h.score);
                  return (
                    <tr
                      key={i}
                      className="hover:bg-slate-50 transition-colors">

                        <td className="px-3 py-2 text-xs text-slate-700 font-medium">
                          {h.date}
                        </td>
                        <td className="px-3 py-2">
                          <span className="text-xs font-bold text-slate-800">
                            {h.score}/100
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <span
                          className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold border ${riskInfo.bg} ${riskInfo.text} ${riskInfo.border}`}>

                            {h.level}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-xs text-slate-700">
                          {h.afibRisk}%
                        </td>
                        <td className="px-3 py-2 text-xs text-slate-700">
                          {h.hfRisk}%
                        </td>
                        <td className="px-3 py-2">
                          {trend === 'down' ?
                        <span className="flex items-center gap-1 text-emerald-600 text-[10px] font-semibold">
                              <TrendingDownIcon className="h-3 w-3" />
                              Amélioration
                            </span> :
                        trend === 'up' ?
                        <span className="flex items-center gap-1 text-red-600 text-[10px] font-semibold">
                              <TrendingUpIcon className="h-3 w-3" />
                              Dégradation
                            </span> :

                        <span className="text-[10px] text-slate-400">
                              —
                            </span>
                        }
                        </td>
                      </tr>);

                })}
                </tbody>
              </table>
            </div>
          </div>
        }
      </div>

      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        patient={selectedPatientData}
        generatedAt={reportGeneratedAt}
        reportText={reportText}
        riskScore={riskScore}
        afibRisk={afibRisk}
        hfRisk={hfRisk}
        maceRisk={maceRisk}
        recommendations={recommendations}
        factors={factors}
        history={history}
      />
    </div>);

}