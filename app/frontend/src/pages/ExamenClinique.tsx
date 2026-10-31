import React, { useState } from 'react';
import {
  HeartIcon,
  PlusIcon,
  SearchIcon,
  FilterIcon,
  CalendarIcon,
  UserIcon,
  ActivityIcon,
  AlertTriangleIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChevronDownIcon,
  FileTextIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  MinusIcon,
  EyeIcon,
  PrinterIcon,
  DownloadIcon,
  StethoscopeIcon,
  ThermometerIcon,
  ZapIcon,
  DropletIcon,
  ScaleIcon,
  PillIcon,
  ClipboardListIcon,
  AlertCircleIcon,
  CheckIcon,
  RefreshCwIcon } from
'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePatient } from '../contexts/PatientContext';
type TabId =
'overview' |
'vitaux' |
'symptomes' |
'physique' |
'antecedents' |
'complementaires' |
'ordonnances';
const tabs: {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}[] = [
{
  id: 'overview',
  label: "Vue d'ensemble",
  icon: <ActivityIcon size={13} />
},
{
  id: 'vitaux',
  label: 'Signes Vitaux',
  icon: <HeartIcon size={13} />
},
{
  id: 'symptomes',
  label: 'Symptômes Cardiaques',
  icon: <ZapIcon size={13} />
},
{
  id: 'physique',
  label: 'Examen Physique',
  icon: <StethoscopeIcon size={13} />
},
{
  id: 'antecedents',
  label: 'Antécédents',
  icon: <ClipboardListIcon size={13} />
},
{
  id: 'complementaires',
  label: 'Examens Complémentaires',
  icon: <FileTextIcon size={13} />
},
{
  id: 'ordonnances',
  label: 'Ordonnances & Suivi',
  icon: <PillIcon size={13} />
}];

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    Normal: 'bg-green-100 text-green-700',
    Anormal: 'bg-red-100 text-red-700',
    'En attente': 'bg-yellow-100 text-yellow-700',
    Urgent: 'bg-red-200 text-red-800 font-semibold',
    Terminé: 'bg-gray-100 text-gray-700',
    'En cours': 'bg-orange-100 text-orange-700',
    Suivi: 'bg-red-50 text-red-700'
  };
  return (
    <span
      className={`px-1.5 py-0.5 rounded text-xs ${map[status] || 'bg-gray-100 text-gray-600'}`}>

      {status}
    </span>);

};
const recentExams = [
{
  id: 'EC001',
  date: '28/02/2026',
  heure: '09:15',
  patient: 'Ahmed Ben Salem',
  age: 62,
  motif: 'Douleur thoracique',
  medecin: 'Dr. Mansouri',
  statut: 'Terminé',
  urgence: true
},
{
  id: 'EC002',
  date: '28/02/2026',
  heure: '10:30',
  patient: 'Fatma Trabelsi',
  age: 55,
  motif: 'Suivi HTA',
  medecin: 'Dr. Mansouri',
  statut: 'En cours',
  urgence: false
},
{
  id: 'EC003',
  date: '28/02/2026',
  heure: '11:00',
  patient: 'Mohamed Khelifi',
  age: 71,
  motif: 'Suivi IC',
  medecin: 'Dr. Chaabane',
  statut: 'En attente',
  urgence: false
},
{
  id: 'EC004',
  date: '27/02/2026',
  heure: '14:20',
  patient: 'Leila Hamdi',
  age: 48,
  motif: 'Palpitations',
  medecin: 'Dr. Mansouri',
  statut: 'Terminé',
  urgence: false
},
{
  id: 'EC005',
  date: '27/02/2026',
  heure: '15:45',
  patient: 'Karim Bouzid',
  age: 58,
  motif: 'Dyspnée',
  medecin: 'Dr. Chaabane',
  statut: 'Terminé',
  urgence: true
},
{
  id: 'EC006',
  date: '27/02/2026',
  heure: '16:30',
  patient: 'Sonia Mejri',
  age: 44,
  motif: 'Bilan cardiaque',
  medecin: 'Dr. Mansouri',
  statut: 'Terminé',
  urgence: false
},
{
  id: 'EC007',
  date: '26/02/2026',
  heure: '09:00',
  patient: 'Riadh Gharbi',
  age: 67,
  motif: 'Suivi FA',
  medecin: 'Dr. Chaabane',
  statut: 'Terminé',
  urgence: false
},
{
  id: 'EC008',
  date: '26/02/2026',
  heure: '10:15',
  patient: 'Nadia Sfar',
  age: 52,
  motif: 'Suivi post-IDM',
  medecin: 'Dr. Mansouri',
  statut: 'Terminé',
  urgence: false
}];

const vitalSigns = [
{
  date: '28/02/2026 09:15',
  patient: 'Ahmed Ben Salem',
  tas: 165,
  tad: 98,
  fc: 92,
  spo2: 96,
  fr: 18,
  temp: 37.1,
  poids: 84,
  taille: 172,
  imc: 28.4,
  statut: 'Anormal'
},
{
  date: '28/02/2026 10:30',
  patient: 'Fatma Trabelsi',
  tas: 148,
  tad: 92,
  fc: 78,
  spo2: 97,
  fr: 16,
  temp: 36.8,
  poids: 72,
  taille: 162,
  imc: 27.4,
  statut: 'Anormal'
},
{
  date: '28/02/2026 11:00',
  patient: 'Mohamed Khelifi',
  tas: 130,
  tad: 82,
  fc: 68,
  spo2: 94,
  fr: 20,
  temp: 36.9,
  poids: 78,
  taille: 168,
  imc: 27.6,
  statut: 'Anormal'
},
{
  date: '27/02/2026 14:20',
  patient: 'Leila Hamdi',
  tas: 120,
  tad: 78,
  fc: 112,
  spo2: 98,
  fr: 15,
  temp: 36.7,
  poids: 65,
  taille: 165,
  imc: 23.9,
  statut: 'Anormal'
},
{
  date: '27/02/2026 15:45',
  patient: 'Karim Bouzid',
  tas: 142,
  tad: 88,
  fc: 88,
  spo2: 93,
  fr: 22,
  temp: 37.2,
  poids: 92,
  taille: 175,
  imc: 30.0,
  statut: 'Anormal'
},
{
  date: '27/02/2026 16:30',
  patient: 'Sonia Mejri',
  tas: 118,
  tad: 76,
  fc: 72,
  spo2: 99,
  fr: 14,
  temp: 36.6,
  poids: 58,
  taille: 160,
  imc: 22.7,
  statut: 'Normal'
}];

const symptoms = [
{
  patient: 'Ahmed Ben Salem',
  douleurThoracique: true,
  dyspnee: false,
  palpitations: false,
  syncope: false,
  oedemes: false,
  fatigue: true,
  toux: false,
  cyanose: false,
  severite: 'Sévère',
  duree: '2h'
},
{
  patient: 'Fatma Trabelsi',
  douleurThoracique: false,
  dyspnee: true,
  palpitations: false,
  syncope: false,
  oedemes: true,
  fatigue: true,
  toux: false,
  cyanose: false,
  severite: 'Modérée',
  duree: '3j'
},
{
  patient: 'Mohamed Khelifi',
  douleurThoracique: false,
  dyspnee: true,
  palpitations: false,
  syncope: false,
  oedemes: true,
  fatigue: true,
  toux: true,
  cyanose: false,
  severite: 'Sévère',
  duree: '1sem'
},
{
  patient: 'Leila Hamdi',
  douleurThoracique: false,
  dyspnee: false,
  palpitations: true,
  syncope: false,
  oedemes: false,
  fatigue: false,
  toux: false,
  cyanose: false,
  severite: 'Légère',
  duree: '30min'
},
{
  patient: 'Karim Bouzid',
  douleurThoracique: false,
  dyspnee: true,
  palpitations: false,
  syncope: false,
  oedemes: false,
  fatigue: true,
  toux: false,
  cyanose: true,
  severite: 'Sévère',
  duree: '6h'
}];

const physicalExams = [
{
  id: 'EC001',
  patient: 'Ahmed Ben Salem',
  date: '28/02/2026',
  auscCar: 'Régulier, souffle systolique 2/6 foyer aortique',
  auscPulm: 'MV diminué bases',
  vasc: 'Pouls présents, TRC < 2s',
  abdomen: 'Hépatomégalie modérée',
  statut: 'Anormal'
},
{
  id: 'EC002',
  patient: 'Fatma Trabelsi',
  date: '28/02/2026',
  auscCar: 'Irrégulier, B1B2 normaux',
  auscPulm: 'Râles crépitants bases',
  vasc: 'Oedèmes membres inférieurs ++',
  abdomen: 'RAS',
  statut: 'Anormal'
},
{
  id: 'EC003',
  patient: 'Mohamed Khelifi',
  date: '28/02/2026',
  auscCar: 'Régulier, B3 présent',
  auscPulm: 'Râles crépitants diffus',
  vasc: 'Oedèmes +++, TRC > 3s',
  abdomen: 'Hépatomégalie importante',
  statut: 'Urgent'
},
{
  id: 'EC004',
  patient: 'Leila Hamdi',
  date: '27/02/2026',
  auscCar: 'Irrégulier, tachycarde',
  auscPulm: 'Normal',
  vasc: 'Pouls présents, TRC < 2s',
  abdomen: 'RAS',
  statut: 'Anormal'
}];

const medicalHistory = [
{
  patient: 'Ahmed Ben Salem',
  age: 62,
  antecedents: ['HTA', 'Dyslipidémie', 'IDM (2019)'],
  facteurs: ['Tabac actif', 'Obésité'],
  familiaux: ['Coronaropathie précoce (père)'],
  traitements: [
  'Aspirine 100mg',
  'Atorvastatine 40mg',
  'Ramipril 5mg',
  'Bisoprolol 5mg'],

  score: 'Élevé'
},
{
  patient: 'Fatma Trabelsi',
  age: 55,
  antecedents: ['HTA', 'Diabète T2', 'FA'],
  facteurs: ['Obésité', 'Sédentarité'],
  familiaux: ['HTA (mère)'],
  traitements: [
  'Métoprolol 50mg',
  'Apixaban 5mg',
  'Amlodipine 5mg',
  'Metformine 1g'],

  score: 'Élevé'
},
{
  patient: 'Mohamed Khelifi',
  age: 71,
  antecedents: ['IC systolique', 'HTA', 'FA', 'AVC (2021)'],
  facteurs: ['Tabac sevré', 'Obésité'],
  familiaux: ['Mort subite (frère)'],
  traitements: [
  'Furosémide 40mg',
  'Spironolactone 25mg',
  'Sacubitril/Valsartan',
  'Rivaroxaban 20mg'],

  score: 'Très élevé'
}];

const complementaryExams = [
{
  patient: 'Ahmed Ben Salem',
  date: '28/02/2026',
  ecg: {
    rythme: 'Sinusal',
    fc: 92,
    axe: '+45°',
    pr: '180ms',
    qrs: '90ms',
    qt: '420ms',
    anomalies: 'Sus-décalage ST V1-V4'
  },
  bio: {
    troponine: '0.8 µg/L ↑',
    bnp: '450 pg/mL ↑',
    nfs: 'Normal',
    creat: '95 µmol/L',
    glycemie: '6.2 mmol/L',
    ldl: '3.8 mmol/L ↑'
  },
  imagerie: {
    echo: 'FEVG 45%, HVG',
    coro: 'Sténose IVA 70%',
    scanner: 'N/A'
  },
  statut: 'Urgent'
},
{
  patient: 'Fatma Trabelsi',
  date: '28/02/2026',
  ecg: {
    rythme: 'FA',
    fc: 78,
    axe: '+30°',
    pr: 'N/A',
    qrs: '88ms',
    qt: '410ms',
    anomalies: 'Fibrillation auriculaire'
  },
  bio: {
    troponine: '< 0.04 µg/L',
    bnp: '280 pg/mL ↑',
    nfs: 'Anémie légère',
    creat: '88 µmol/L',
    glycemie: '8.1 mmol/L ↑',
    ldl: '2.9 mmol/L'
  },
  imagerie: {
    echo: 'FEVG 50%, OG dilatée',
    coro: 'N/A',
    scanner: 'N/A'
  },
  statut: 'Anormal'
},
{
  patient: 'Mohamed Khelifi',
  date: '28/02/2026',
  ecg: {
    rythme: 'FA',
    fc: 68,
    axe: '-20°',
    pr: 'N/A',
    qrs: '130ms',
    qt: '460ms',
    anomalies: 'BBG complet, FA'
  },
  bio: {
    troponine: '0.12 µg/L ↑',
    bnp: '2800 pg/mL ↑↑',
    nfs: 'Normal',
    creat: '142 µmol/L ↑',
    glycemie: '5.8 mmol/L',
    ldl: '1.8 mmol/L'
  },
  imagerie: {
    echo: 'FEVG 28%, IC sévère',
    coro: 'Tritronculaire',
    scanner: 'N/A'
  },
  statut: 'Urgent'
}];

const prescriptions = [
{
  patient: 'Ahmed Ben Salem',
  date: '28/02/2026',
  medecin: 'Dr. Mansouri',
  medicaments: [
  'Aspirine 100mg/j',
  'Clopidogrel 75mg/j',
  'Atorvastatine 80mg/j',
  'Bisoprolol 5mg/j',
  'Ramipril 5mg/j'],

  prochain: '07/03/2026',
  notes: 'Coronarographie urgente programmée. Repos strict. Régime hyposodé.',
  statut: 'Urgent'
},
{
  patient: 'Fatma Trabelsi',
  date: '28/02/2026',
  medecin: 'Dr. Mansouri',
  medicaments: [
  'Apixaban 5mg x2/j',
  'Métoprolol 50mg/j',
  'Furosémide 40mg/j',
  'Amlodipine 5mg/j'],

  prochain: '14/03/2026',
  notes:
  'Contrôle INR dans 1 semaine. Pesée quotidienne. Restriction hydrique 1.5L/j.',
  statut: 'Suivi'
},
{
  patient: 'Mohamed Khelifi',
  date: '28/02/2026',
  medecin: 'Dr. Chaabane',
  medicaments: [
  'Furosémide 80mg IV',
  'Spironolactone 50mg/j',
  'Sacubitril/Valsartan 24/26mg x2/j',
  'Rivaroxaban 20mg/j'],

  prochain: '03/03/2026',
  notes:
  'Hospitalisation recommandée. Bilan pré-transplantation à discuter en staff.',
  statut: 'Urgent'
}];

const valColor = (val: number, min: number, max: number) =>
val < min || val > max ? 'text-red-600 font-semibold' : 'text-green-700';
// ─── PAGINATION COMPONENT ─────────────────────────────────────────────────────
function Pagination({
  currentPage,
  totalPages,
  onPageChange




}: {currentPage: number;totalPages: number;onPageChange: (page: number) => void;}) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between px-3 py-2 border-t border-gray-100 bg-gray-50">
      <span className="text-xs text-gray-500">
        Page {currentPage} sur {totalPages}
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 text-xs border border-gray-200 rounded bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed">

          ← Préc.
        </button>
        {Array.from(
          {
            length: totalPages
          },
          (_, i) => i + 1
        ).map((page) =>
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-6 h-6 text-xs rounded font-medium transition-all ${currentPage === page ? 'bg-red-600 text-white' : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}>

            {page}
          </button>
        )}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 text-xs border border-gray-200 rounded bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed">

          Suiv. →
        </button>
      </div>
    </div>);

}
export function ExamenClinique() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { selectedPatient } = usePatient();
  return (
    <div className="min-h-screen bg-gray-50 p-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-red-600 rounded-lg flex items-center justify-center">
            <HeartIcon size={14} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900">
              Examens Cliniques — Cardiologie
            </h1>
            <p className="text-xs text-gray-500">
              Service de Cardiologie · CHU Tunis
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
              placeholder="Rechercher dans le dossier du patient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-6 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white w-48 focus:outline-none focus:ring-1 focus:ring-red-500" />

          </div>
          <button className="flex items-center gap-1 px-2 py-1.5 text-xs border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50">
            <FilterIcon size={11} />
            Filtrer
          </button>
          <button className="flex items-center gap-1 px-2 py-1.5 text-xs border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50">
            <CalendarIcon size={11} />
            Aujourd'hui
          </button>
          <button
            onClick={() => navigate('/nouvel-examen-clinique')}
            className="flex items-center gap-1 px-3 py-1.5 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">

            <PlusIcon size={12} />
            Nouvel Examen
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0.5 mb-3 bg-white border border-gray-200 rounded-lg p-1 overflow-x-auto">
        {tabs.map((tab) =>
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-red-600 text-white font-medium shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}>

            {tab.icon}
            {tab.label}
          </button>
        )}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && <OverviewTab />}
      {activeTab === 'vitaux' && <VitauxTab />}
      {activeTab === 'symptomes' && <SymptomsTab />}
      {activeTab === 'physique' && <PhysiqueTab />}
      {activeTab === 'antecedents' && <AntecedentsTab />}
      {activeTab === 'complementaires' && <ComplementairesTab />}
      {activeTab === 'ordonnances' && <OrdonnancesTab />}
    </div>);

}
function OverviewTab() {
  const navigate = useNavigate();
  return (
    <div className="space-y-3">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Examens ce mois</span>
            <ClipboardListIcon size={14} className="text-red-500" />
          </div>
          <div className="text-xl font-bold text-gray-900">142</div>
          <div className="text-xs text-green-600 flex items-center gap-0.5 mt-0.5">
            <TrendingUpIcon size={10} /> +8% vs mois dernier
          </div>
        </div>
        <div className="bg-white border border-red-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Urgents</span>
            <AlertTriangleIcon size={14} className="text-red-500" />
          </div>
          <div className="text-xl font-bold text-red-600">7</div>
          <div className="text-xs text-red-500 mt-0.5">
            3 en attente de prise en charge
          </div>
        </div>
        <div className="bg-white border border-yellow-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">En attente résultats</span>
            <ClockIcon size={14} className="text-yellow-500" />
          </div>
          <div className="text-xl font-bold text-yellow-600">18</div>
          <div className="text-xs text-gray-500 mt-0.5">
            Bio: 12 · Imagerie: 6
          </div>
        </div>
        <div className="bg-white border border-green-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">
              Consultations aujourd'hui
            </span>
            <CalendarIcon size={14} className="text-green-500" />
          </div>
          <div className="text-xl font-bold text-green-600">12</div>
          <div className="text-xs text-gray-500 mt-0.5">
            8 terminées · 4 à venir
          </div>
        </div>
      </div>

      {/* Recent Exams Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-gray-50">
          <h2 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
            <ActivityIcon size={12} className="text-red-500" />
            Examens Récents
          </h2>
          <button className="text-xs text-red-600 hover:underline">
            Voir tout
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Date/Heure
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Patient
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Motif
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Médecin
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
            {recentExams.map((exam, i) =>
            <tr
              key={exam.id}
              className={`border-b border-gray-50 hover:bg-gray-50 ${exam.urgence ? 'bg-red-50' : ''}`}>

                <td className="px-3 py-1.5 text-xs text-gray-600">
                  <div>{exam.date}</div>
                  <div className="text-gray-400">{exam.heure}</div>
                </td>
                <td className="px-3 py-1.5">
                  <div className="flex items-center gap-1.5">
                    {exam.urgence &&
                  <AlertCircleIcon
                    size={10}
                    className="text-red-500 flex-shrink-0" />

                  }
                    <div>
                      <div className="text-xs font-medium text-gray-800">
                        {exam.patient}
                      </div>
                      <div className="text-xs text-gray-400">
                        {exam.age} ans
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-1.5 text-xs text-gray-600">
                  {exam.motif}
                </td>
                <td className="px-3 py-1.5 text-xs text-gray-600">
                  {exam.medecin}
                </td>
                <td className="px-3 py-1.5">{statusBadge(exam.statut)}</td>
                <td className="px-3 py-1.5">
                  <div className="flex items-center gap-1">
                    <button
                    onClick={() => navigate(`/nouvel-examen-clinique`)}
                    className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-red-600">

                      <EyeIcon size={11} />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600">
                      <PrinterIcon size={11} />
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mini trend cards */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
            <HeartIcon size={11} className="text-red-500" />
            Motifs fréquents
          </div>
          {[
          {
            motif: 'Douleur thoracique',
            n: 28,
            pct: 72
          },
          {
            motif: 'Dyspnée',
            n: 22,
            pct: 56
          },
          {
            motif: 'Suivi HTA',
            n: 35,
            pct: 90
          },
          {
            motif: 'Palpitations',
            n: 18,
            pct: 46
          },
          {
            motif: 'Bilan cardiaque',
            n: 15,
            pct: 38
          }].
          map((item) =>
          <div key={item.motif} className="mb-1.5">
              <div className="flex justify-between text-xs mb-0.5">
                <span className="text-gray-600">{item.motif}</span>
                <span className="text-gray-500 font-medium">{item.n}</span>
              </div>
              <div className="h-1 bg-gray-100 rounded-full">
                <div
                className="h-1 bg-red-500 rounded-full"
                style={{
                  width: `${item.pct}%`
                }} />

              </div>
            </div>
          )}
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
            <UserIcon size={11} className="text-red-500" />
            Médecins actifs
          </div>
          {[
          {
            nom: 'Dr. Mansouri',
            examens: 68,
            urgences: 4
          },
          {
            nom: 'Dr. Chaabane',
            examens: 52,
            urgences: 3
          },
          {
            nom: 'Dr. Belhadj',
            examens: 22,
            urgences: 0
          }].
          map((doc) =>
          <div
            key={doc.nom}
            className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">

              <div>
                <div className="text-xs font-medium text-gray-700">
                  {doc.nom}
                </div>
                <div className="text-xs text-gray-400">
                  {doc.examens} examens
                </div>
              </div>
              {doc.urgences > 0 &&
            <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-xs rounded">
                  {doc.urgences} urg.
                </span>
            }
            </div>
          )}
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
            <AlertTriangleIcon size={11} className="text-yellow-500" />
            Alertes du jour
          </div>
          {[
          {
            msg: 'Troponine élevée — Ahmed Ben Salem',
            level: 'urgent'
          },
          {
            msg: 'BNP critique — Mohamed Khelifi',
            level: 'urgent'
          },
          {
            msg: 'SpO2 93% — Karim Bouzid',
            level: 'warning'
          },
          {
            msg: 'TA 165/98 — Ahmed Ben Salem',
            level: 'warning'
          },
          {
            msg: 'ECG: BBG complet — Mohamed Khelifi',
            level: 'info'
          }].
          map((alert, i) =>
          <div
            key={i}
            className={`flex items-start gap-1.5 py-1 border-b border-gray-50 last:border-0`}>

              <div
              className={`w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0 ${alert.level === 'urgent' ? 'bg-red-500' : alert.level === 'warning' ? 'bg-yellow-500' : 'bg-red-300'}`} />

              <span className="text-xs text-gray-600">{alert.msg}</span>
            </div>
          )}
        </div>
      </div>
    </div>);

}
function VitauxTab() {
  const PAGE_SIZE = 4;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(vitalSigns.length / PAGE_SIZE);
  const paged = vitalSigns.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return (
    <div className="space-y-3">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-gray-50">
          <h2 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
            <HeartIcon size={12} className="text-red-500" />
            Mesures des Signes Vitaux
          </h2>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
              Anormal
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
              Normal
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500 whitespace-nowrap">
                  Date/Heure
                </th>
                <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500 whitespace-nowrap">
                  Patient
                </th>
                <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500 whitespace-nowrap">
                  TA (mmHg)
                  <span className="block text-gray-400 font-normal">
                    120/80
                  </span>
                </th>
                <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500 whitespace-nowrap">
                  FC (bpm)
                  <span className="block text-gray-400 font-normal">
                    60–100
                  </span>
                </th>
                <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500 whitespace-nowrap">
                  SpO2 (%)
                  <span className="block text-gray-400 font-normal">≥95</span>
                </th>
                <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500 whitespace-nowrap">
                  FR (/min)
                  <span className="block text-gray-400 font-normal">12–20</span>
                </th>
                <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500 whitespace-nowrap">
                  Temp (°C)
                  <span className="block text-gray-400 font-normal">
                    36.5–37.5
                  </span>
                </th>
                <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500 whitespace-nowrap">
                  Poids/IMC
                </th>
                <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody>
              {paged.map((v, i) =>
              <tr
                key={i}
                className="border-b border-gray-50 hover:bg-gray-50">

                  <td className="px-3 py-1.5 text-xs text-gray-500 whitespace-nowrap">
                    {v.date}
                  </td>
                  <td className="px-3 py-1.5 text-xs font-medium text-gray-800 whitespace-nowrap">
                    {v.patient}
                  </td>
                  <td className="px-3 py-1.5 text-xs whitespace-nowrap">
                    <span
                    className={
                    v.tas > 140 || v.tad > 90 ?
                    'text-red-600 font-semibold' :
                    'text-green-700'
                    }>

                      {v.tas}/{v.tad}
                    </span>
                  </td>
                  <td className="px-3 py-1.5 text-xs whitespace-nowrap">
                    <span className={valColor(v.fc, 60, 100)}>{v.fc}</span>
                  </td>
                  <td className="px-3 py-1.5 text-xs whitespace-nowrap">
                    <span
                    className={
                    v.spo2 < 95 ?
                    'text-red-600 font-semibold' :
                    'text-green-700'
                    }>

                      {v.spo2}%
                    </span>
                  </td>
                  <td className="px-3 py-1.5 text-xs whitespace-nowrap">
                    <span className={valColor(v.fr, 12, 20)}>{v.fr}</span>
                  </td>
                  <td className="px-3 py-1.5 text-xs whitespace-nowrap">
                    <span className={valColor(v.temp, 36.5, 37.5)}>
                      {v.temp}
                    </span>
                  </td>
                  <td className="px-3 py-1.5 text-xs whitespace-nowrap">
                    <div>{v.poids} kg</div>
                    <div
                    className={
                    v.imc >= 30 ?
                    'text-red-500' :
                    v.imc >= 25 ?
                    'text-yellow-600' :
                    'text-green-600'
                    }>

                      IMC {v.imc}
                    </div>
                  </td>
                  <td className="px-3 py-1.5">{statusBadge(v.statut)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage} />

      </div>

      {/* Normal ranges reference */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
        <div className="text-xs font-semibold text-red-700 mb-2">
          Valeurs de référence cardiologiques
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[
          {
            label: 'TA normale',
            val: '< 130/85 mmHg',
            alert: '> 140/90 = HTA'
          },
          {
            label: 'FC normale',
            val: '60–100 bpm',
            alert: '< 60 = bradycardie, > 100 = tachycardie'
          },
          {
            label: 'SpO2 normale',
            val: '≥ 95%',
            alert: '< 90% = hypoxémie sévère'
          },
          {
            label: 'IMC normal',
            val: '18.5–24.9',
            alert: '≥ 30 = obésité'
          }].
          map((ref) =>
          <div key={ref.label} className="text-xs">
              <div className="font-medium text-red-700">{ref.label}</div>
              <div className="text-green-700">{ref.val}</div>
              <div className="text-red-600 text-xs">{ref.alert}</div>
            </div>
          )}
        </div>
      </div>
    </div>);

}
function SymptomsTab() {
  const PAGE_SIZE = 3;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(symptoms.length / PAGE_SIZE);
  const paged = symptoms.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const symptomCols = [
  {
    key: 'douleurThoracique',
    label: 'Douleur thoracique'
  },
  {
    key: 'dyspnee',
    label: 'Dyspnée'
  },
  {
    key: 'palpitations',
    label: 'Palpitations'
  },
  {
    key: 'syncope',
    label: 'Syncope'
  },
  {
    key: 'oedemes',
    label: 'Œdèmes'
  },
  {
    key: 'fatigue',
    label: 'Fatigue'
  },
  {
    key: 'toux',
    label: 'Toux'
  },
  {
    key: 'cyanose',
    label: 'Cyanose'
  }];

  return (
    <div className="space-y-3">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
          <h2 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
            <ZapIcon size={12} className="text-yellow-500" />
            Tableau des Symptômes Cardiaques
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                  Patient
                </th>
                {symptomCols.map((s) =>
                <th
                  key={s.key}
                  className="text-center px-2 py-1.5 text-xs font-medium text-gray-500 whitespace-nowrap">

                    {s.label}
                  </th>
                )}
                <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                  Sévérité
                </th>
                <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                  Durée
                </th>
              </tr>
            </thead>
            <tbody>
              {paged.map((s, i) =>
              <tr
                key={i}
                className="border-b border-gray-50 hover:bg-gray-50">

                  <td className="px-3 py-1.5 text-xs font-medium text-gray-800 whitespace-nowrap">
                    {s.patient}
                  </td>
                  {symptomCols.map((col) =>
                <td key={col.key} className="px-2 py-1.5 text-center">
                      {(s as any)[col.key] ?
                  <CheckCircleIcon
                    size={13}
                    className="text-red-500 mx-auto" /> :


                  <MinusIcon
                    size={13}
                    className="text-gray-300 mx-auto" />

                  }
                    </td>
                )}
                  <td className="px-3 py-1.5">
                    <span
                    className={`px-1.5 py-0.5 rounded text-xs ${s.severite === 'Sévère' ? 'bg-red-100 text-red-700' : s.severite === 'Modérée' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>

                      {s.severite}
                    </span>
                  </td>
                  <td className="px-3 py-1.5 text-xs text-gray-600">
                    {s.duree}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage} />

      </div>

      {/* Symptom detail cards */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white border border-red-200 rounded-lg p-3">
          <div className="text-xs font-semibold text-red-700 mb-2 flex items-center gap-1">
            <AlertTriangleIcon size={11} />
            Douleur Thoracique — Détail
          </div>
          <div className="space-y-1.5">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-500">Patient:</span>{' '}
                <span className="font-medium">Ahmed Ben Salem</span>
              </div>
              <div>
                <span className="text-gray-500">Localisation:</span>{' '}
                Rétrosternale
              </div>
              <div>
                <span className="text-gray-500">Irradiation:</span> Bras gauche,
                mâchoire
              </div>
              <div>
                <span className="text-gray-500">Caractère:</span> Constrictive
              </div>
              <div>
                <span className="text-gray-500">Intensité (EVA):</span>{' '}
                <span className="text-red-600 font-semibold">8/10</span>
              </div>
              <div>
                <span className="text-gray-500">Durée:</span> 2 heures
              </div>
              <div>
                <span className="text-gray-500">Déclenchant:</span> Effort
              </div>
              <div>
                <span className="text-gray-500">Calmant:</span> Trinitrine
                partielle
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-red-200 rounded-lg p-3">
          <div className="text-xs font-semibold text-red-700 mb-2 flex items-center gap-1">
            <ActivityIcon size={11} />
            Dyspnée — Classification NYHA
          </div>
          <div className="space-y-1.5">
            {[
            {
              patient: 'Fatma Trabelsi',
              nyha: 'II',
              ortho: '2 oreillers',
              dpn: 'Non'
            },
            {
              patient: 'Mohamed Khelifi',
              nyha: 'IV',
              ortho: '4 oreillers',
              dpn: 'Oui'
            },
            {
              patient: 'Karim Bouzid',
              nyha: 'III',
              ortho: '3 oreillers',
              dpn: 'Oui'
            }].
            map((d) =>
            <div
              key={d.patient}
              className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0 text-xs">

                <span className="font-medium text-gray-700">{d.patient}</span>
                <span
                className={`px-1.5 py-0.5 rounded font-semibold ${d.nyha === 'IV' ? 'bg-red-100 text-red-700' : d.nyha === 'III' ? 'bg-orange-100 text-orange-700' : d.nyha === 'II' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>

                  NYHA {d.nyha}
                </span>
                <span className="text-gray-500">{d.ortho}</span>
                <span
                className={d.dpn === 'Oui' ? 'text-red-600' : 'text-gray-400'}>

                  DPN: {d.dpn}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

}
function PhysiqueTab() {
  const PAGE_SIZE = 2;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(physicalExams.length / PAGE_SIZE);
  const paged = physicalExams.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return (
    <div className="space-y-3">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
          <h2 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
            <StethoscopeIcon size={12} className="text-red-500" />
            Résultats de l'Examen Physique
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                  Patient
                </th>
                <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                  Date
                </th>
                <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                  Auscultation Cardiaque
                </th>
                <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                  Auscultation Pulmonaire
                </th>
                <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                  Examen Vasculaire
                </th>
                <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                  Abdomen
                </th>
                <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody>
              {paged.map((e, i) =>
              <tr
                key={e.id}
                className={`border-b border-gray-50 hover:bg-gray-50 ${e.statut === 'Urgent' ? 'bg-red-50' : ''}`}>

                  <td className="px-3 py-1.5 text-xs font-medium text-gray-800 whitespace-nowrap">
                    {e.patient}
                  </td>
                  <td className="px-3 py-1.5 text-xs text-gray-500 whitespace-nowrap">
                    {e.date}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600 max-w-xs">
                    {e.auscCar}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600 max-w-xs">
                    {e.auscPulm}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600 max-w-xs">
                    {e.vasc}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600">
                    {e.abdomen}
                  </td>
                  <td className="px-3 py-1.5">{statusBadge(e.statut)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage} />

      </div>

      {/* Structured findings grid */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
            <HeartIcon size={11} className="text-red-500" />
            Auscultation Cardiaque — Résumé
          </div>
          <div className="space-y-1">
            {[
            {
              label: 'Rythme régulier',
              n: 2,
              total: 4,
              color: 'blue'
            },
            {
              label: 'Rythme irrégulier (FA)',
              n: 2,
              total: 4,
              color: 'red'
            },
            {
              label: 'Souffles présents',
              n: 2,
              total: 4,
              color: 'yellow'
            },
            {
              label: 'B3 présent (galop)',
              n: 1,
              total: 4,
              color: 'red'
            },
            {
              label: 'Frottement péricardique',
              n: 0,
              total: 4,
              color: 'gray'
            }].
            map((item) =>
            <div
              key={item.label}
              className="flex items-center justify-between text-xs">

                <span className="text-gray-600">{item.label}</span>
                <span
                className={`font-semibold ${item.n > 0 ? item.color === 'red' ? 'text-red-600' : 'text-orange-600' : 'text-gray-400'}`}>

                  {item.n}/{item.total}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
            <ActivityIcon size={11} className="text-red-500" />
            Auscultation Pulmonaire — Résumé
          </div>
          <div className="space-y-1">
            {[
            {
              label: 'MV normal',
              n: 1,
              total: 4
            },
            {
              label: 'MV diminué',
              n: 2,
              total: 4
            },
            {
              label: 'Râles crépitants bases',
              n: 2,
              total: 4
            },
            {
              label: 'Râles crépitants diffus',
              n: 1,
              total: 4
            },
            {
              label: 'Épanchement pleural',
              n: 0,
              total: 4
            }].
            map((item) =>
            <div
              key={item.label}
              className="flex items-center justify-between text-xs">

                <span className="text-gray-600">{item.label}</span>
                <span
                className={`font-semibold ${item.n > 0 ? 'text-orange-600' : 'text-gray-400'}`}>

                  {item.n}/{item.total}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

}
function AntecedentsTab() {
  const PAGE_SIZE = 2;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(medicalHistory.length / PAGE_SIZE);
  const paged = medicalHistory.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return (
    <div className="space-y-3">
      {paged.map((p, i) =>
      <div
        key={p.patient}
        className="bg-white border border-gray-200 rounded-lg overflow-hidden">

          <div
          className={`flex items-center justify-between px-3 py-2 border-b border-gray-100 ${p.score === 'Très élevé' ? 'bg-red-50' : p.score === 'Élevé' ? 'bg-orange-50' : 'bg-gray-50'}`}>

            <div className="flex items-center gap-2">
              <UserIcon size={12} className="text-gray-500" />
              <span className="text-xs font-semibold text-gray-800">
                {p.patient}
              </span>
              <span className="text-xs text-gray-500">{p.age} ans</span>
            </div>
            <span
            className={`px-2 py-0.5 rounded text-xs font-semibold ${p.score === 'Très élevé' ? 'bg-red-100 text-red-700' : p.score === 'Élevé' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>

              Risque CV: {p.score}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-0 divide-x divide-gray-100">
            <div className="p-3">
              <div className="text-xs font-semibold text-gray-600 mb-1.5 flex items-center gap-1">
                <ClipboardListIcon size={10} />
                Antécédents personnels
              </div>
              <div className="space-y-0.5">
                {p.antecedents.map((a) =>
              <div key={a} className="flex items-center gap-1 text-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span className="text-gray-700">{a}</span>
                  </div>
              )}
              </div>
            </div>
            <div className="p-3">
              <div className="text-xs font-semibold text-gray-600 mb-1.5 flex items-center gap-1">
                <AlertTriangleIcon size={10} />
                Facteurs de risque
              </div>
              <div className="space-y-0.5">
                {p.facteurs.map((f) =>
              <div key={f} className="flex items-center gap-1 text-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                    <span className="text-gray-700">{f}</span>
                  </div>
              )}
              </div>
            </div>
            <div className="p-3">
              <div className="text-xs font-semibold text-gray-600 mb-1.5 flex items-center gap-1">
                <UserIcon size={10} />
                Antécédents familiaux
              </div>
              <div className="space-y-0.5">
                {p.familiaux.map((f) =>
              <div key={f} className="flex items-center gap-1 text-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-300 flex-shrink-0" />
                    <span className="text-gray-700">{f}</span>
                  </div>
              )}
              </div>
            </div>
            <div className="p-3">
              <div className="text-xs font-semibold text-gray-600 mb-1.5 flex items-center gap-1">
                <PillIcon size={10} />
                Traitements en cours
              </div>
              <div className="space-y-0.5">
                {p.traitements.map((t) =>
              <div key={t} className="flex items-center gap-1 text-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span className="text-gray-700">{t}</span>
                  </div>
              )}
              </div>
            </div>
          </div>
        </div>
      )}
      {totalPages > 1 &&
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage} />

        </div>
      }
    </div>);

}
function ComplementairesTab() {
  const PAGE_SIZE = 2;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(complementaryExams.length / PAGE_SIZE);
  const paged = complementaryExams.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );
  return (
    <div className="space-y-3">
      {paged.map((exam, i) =>
      <div
        key={exam.patient}
        className={`bg-white border rounded-lg overflow-hidden ${exam.statut === 'Urgent' ? 'border-red-300' : 'border-gray-200'}`}>

          <div
          className={`flex items-center justify-between px-3 py-2 border-b ${exam.statut === 'Urgent' ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-100'}`}>

            <div className="flex items-center gap-2">
              {exam.statut === 'Urgent' &&
            <AlertCircleIcon size={12} className="text-red-500" />
            }
              <span className="text-xs font-semibold text-gray-800">
                {exam.patient}
              </span>
              <span className="text-xs text-gray-500">{exam.date}</span>
            </div>
            {statusBadge(exam.statut)}
          </div>
          <div className="grid grid-cols-3 gap-0 divide-x divide-gray-100">
            <div className="p-3">
              <div className="text-xs font-semibold text-red-700 mb-2 flex items-center gap-1">
                <ZapIcon size={10} />
                ECG
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Rythme:</span>
                  <span
                  className={`font-medium ${exam.ecg.rythme !== 'Sinusal' ? 'text-red-600' : 'text-green-700'}`}>

                    {exam.ecg.rythme}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">FC:</span>
                  <span className={valColor(exam.ecg.fc, 60, 100)}>
                    {exam.ecg.fc} bpm
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Axe:</span>
                  <span className="text-gray-700">{exam.ecg.axe}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">PR:</span>
                  <span className="text-gray-700">{exam.ecg.pr}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">QRS:</span>
                  <span
                  className={
                  parseInt(exam.ecg.qrs) > 120 ?
                  'text-red-600 font-semibold' :
                  'text-gray-700'
                  }>

                    {exam.ecg.qrs}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">QT:</span>
                  <span
                  className={
                  parseInt(exam.ecg.qt) > 440 ?
                  'text-red-600 font-semibold' :
                  'text-gray-700'
                  }>

                    {exam.ecg.qt}
                  </span>
                </div>
                {exam.ecg.anomalies &&
              <div className="mt-1 p-1 bg-red-50 rounded text-red-700 text-xs">
                    {exam.ecg.anomalies}
                  </div>
              }
              </div>
            </div>
            <div className="p-3">
              <div className="text-xs font-semibold text-green-700 mb-2 flex items-center gap-1">
                <DropletIcon size={10} />
                Biologie
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Troponine:</span>
                  <span
                  className={
                  exam.bio.troponine.includes('↑') ?
                  'text-red-600 font-semibold' :
                  'text-green-700'
                  }>

                    {exam.bio.troponine}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">BNP:</span>
                  <span
                  className={
                  exam.bio.bnp.includes('↑') ?
                  'text-red-600 font-semibold' :
                  'text-green-700'
                  }>

                    {exam.bio.bnp}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">NFS:</span>
                  <span
                  className={
                  exam.bio.nfs !== 'Normal' ?
                  'text-yellow-600' :
                  'text-green-700'
                  }>

                    {exam.bio.nfs}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Créatinine:</span>
                  <span
                  className={
                  exam.bio.creat.includes('↑') ?
                  'text-red-600 font-semibold' :
                  'text-gray-700'
                  }>

                    {exam.bio.creat}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Glycémie:</span>
                  <span
                  className={
                  exam.bio.glycemie.includes('↑') ?
                  'text-yellow-600' :
                  'text-gray-700'
                  }>

                    {exam.bio.glycemie}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">LDL:</span>
                  <span
                  className={
                  exam.bio.ldl.includes('↑') ?
                  'text-red-600 font-semibold' :
                  'text-green-700'
                  }>

                    {exam.bio.ldl}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-3">
              <div className="text-xs font-semibold text-red-700 mb-2 flex items-center gap-1">
                <EyeIcon size={10} />
                Imagerie Cardiaque
              </div>
              <div className="space-y-1.5 text-xs">
                <div>
                  <div className="text-gray-500 mb-0.5">Échocardiographie:</div>
                  <div
                  className={`font-medium ${exam.imagerie.echo.includes('28%') || exam.imagerie.echo.includes('45%') ? 'text-red-600' : 'text-gray-700'}`}>

                    {exam.imagerie.echo}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500 mb-0.5">Coronarographie:</div>
                  <div
                  className={`font-medium ${exam.imagerie.coro !== 'N/A' ? 'text-orange-600' : 'text-gray-400'}`}>

                    {exam.imagerie.coro}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500 mb-0.5">Scanner cardiaque:</div>
                  <div className="text-gray-400">{exam.imagerie.scanner}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {totalPages > 1 &&
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage} />

        </div>
      }
    </div>);

}
function OrdonnancesTab() {
  const PAGE_SIZE = 2;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(prescriptions.length / PAGE_SIZE);
  const paged = prescriptions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return (
    <div className="space-y-3">
      {paged.map((rx, i) =>
      <div
        key={rx.patient}
        className={`bg-white border rounded-lg overflow-hidden ${rx.statut === 'Urgent' ? 'border-red-300' : 'border-gray-200'}`}>

          <div
          className={`flex items-center justify-between px-3 py-2 border-b ${rx.statut === 'Urgent' ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-100'}`}>

            <div className="flex items-center gap-2">
              <PillIcon size={12} className="text-red-500" />
              <span className="text-xs font-semibold text-gray-800">
                {rx.patient}
              </span>
              <span className="text-xs text-gray-500">
                {rx.date} · {rx.medecin}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {statusBadge(rx.statut)}
              <button className="flex items-center gap-1 px-2 py-0.5 text-xs border border-gray-200 rounded hover:bg-gray-50 text-gray-600">
                <PrinterIcon size={10} />
                Imprimer
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-0 divide-x divide-gray-100">
            <div className="p-3">
              <div className="text-xs font-semibold text-gray-600 mb-2">
                Médicaments prescrits
              </div>
              <div className="space-y-1">
                {rx.medicaments.map((m) =>
              <div key={m} className="flex items-center gap-1.5 text-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span className="text-gray-700">{m}</span>
                  </div>
              )}
              </div>
            </div>
            <div className="p-3">
              <div className="text-xs font-semibold text-gray-600 mb-2">
                Notes & Instructions
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {rx.notes}
              </p>
            </div>
            <div className="p-3">
              <div className="text-xs font-semibold text-gray-600 mb-2">
                Prochain RDV
              </div>
              <div className="flex items-center gap-2 mb-3">
                <CalendarIcon size={14} className="text-red-500" />
                <span className="text-sm font-semibold text-red-700">
                  {rx.prochain}
                </span>
              </div>
              <button className="w-full flex items-center justify-center gap-1 px-2 py-1.5 text-xs bg-red-50 text-red-700 border border-red-200 rounded hover:bg-red-100">
                <CalendarIcon size={10} />
                Planifier RDV
              </button>
              <button className="w-full flex items-center justify-center gap-1 px-2 py-1.5 text-xs bg-gray-50 text-gray-600 border border-gray-200 rounded hover:bg-gray-100 mt-1">
                <DownloadIcon size={10} />
                Télécharger PDF
              </button>
            </div>
          </div>
        </div>
      )}
      {totalPages > 1 &&
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage} />

        </div>
      }
    </div>);

}
export default ExamenClinique;