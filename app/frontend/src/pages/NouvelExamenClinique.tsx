import React, { useEffect, useState } from 'react';
import {
  HeartIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SaveIcon,
  XIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  InfoIcon,
  UserIcon,
  CalendarIcon,
  ClockIcon,
  ActivityIcon,
  StethoscopeIcon,
  ZapIcon,
  DropletIcon,
  PillIcon,
  ClipboardListIcon,
  FileTextIcon,
  ThermometerIcon,
  ScaleIcon,
  AlertCircleIcon,
  CheckIcon,
  MinusIcon,
  ChevronDownIcon,
  PlusIcon } from
'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePatient, type Patient } from '../contexts/PatientContext';
type FormTab =
'general' |
'vitaux' |
'symptomes' |
'physique' |
'antecedents' |
'complementaires' |
'ordonnances';
const formTabs: {
  id: FormTab;
  label: string;
  icon: React.ReactNode;
  shortLabel: string;
}[] = [
{
  id: 'general',
  label: 'Informations Générales',
  shortLabel: 'Général',
  icon: <UserIcon size={12} />
},
{
  id: 'vitaux',
  label: 'Signes Vitaux',
  shortLabel: 'Vitaux',
  icon: <HeartIcon size={12} />
},
{
  id: 'symptomes',
  label: 'Symptômes Cardiaques',
  shortLabel: 'Symptômes',
  icon: <ZapIcon size={12} />
},
{
  id: 'physique',
  label: 'Examen Physique',
  shortLabel: 'Physique',
  icon: <StethoscopeIcon size={12} />
},
{
  id: 'antecedents',
  label: 'Antécédents Cardiaques',
  shortLabel: 'Antécédents',
  icon: <ClipboardListIcon size={12} />
},
{
  id: 'complementaires',
  label: 'Examens Complémentaires',
  shortLabel: 'Complémentaires',
  icon: <FileTextIcon size={12} />
},
{
  id: 'ordonnances',
  label: 'Ordonnances & Suivi',
  shortLabel: 'Ordonnances',
  icon: <PillIcon size={12} />
}];

const tabOrder: FormTab[] = [
'general',
'vitaux',
'symptomes',
'physique',
'antecedents',
'complementaires',
'ordonnances'];

interface VitalSigns {
  tas: string;
  tad: string;
  fc: string;
  spo2: string;
  fr: string;
  temp: string;
  poids: string;
  taille: string;
  imc: string;
  perimAbdo: string;
}
interface Symptomes {
  douleurThoracique: boolean;
  douleurLocalisation: string;
  douleurIrradiation: string[];
  douleurCaractere: string;
  douleurEva: number;
  douleurDuree: string;
  douleurDeclenchant: string;
  douleurCalmant: string;
  dyspnee: boolean;
  nyha: string;
  orthopnee: string;
  dpn: boolean;
  palpitations: boolean;
  palpitationsType: string;
  palpitationsDuree: string;
  syncope: boolean;
  syncopeCirconstances: string;
  syncOpeDuree: string;
  oedemes: boolean;
  oedemesLocalisation: string;
  oedemesPoidsPlus: string;
  fatigue: boolean;
  fatigueIntensité: string;
  fatigueEffort: boolean;
  toux: boolean;
  touxType: string;
  touxNocturne: boolean;
  cyanose: boolean;
  cyanoseType: string;
  autresSymptomes: string;
}
interface PhysiqueExam {
  rythme: string;
  b1b2: string;
  b3: string;
  b4: string;
  souffle: string;
  souffleType: string;
  souffleSiege: string;
  souffleIntensite: string;
  souffleIrradiation: string;
  frottement: string;
  mv: string;
  ralesCrepitants: string;
  sibilants: string;
  epanchement: string;
  poulsPeripheriques: string;
  trc: string;
  varices: string;
  tvp: string;
  hepatomegalie: string;
  splenomegalie: string;
  ascite: string;
  etatGeneral: string;
  conscienceScore: string;
}
interface Antecedents {
  idm: boolean;
  avc: boolean;
  fa: boolean;
  ic: boolean;
  hta: boolean;
  diabete: boolean;
  dyslipidemie: boolean;
  angor: boolean;
  pontage: boolean;
  stent: boolean;
  tabac: string;
  obesite: boolean;
  sedentarite: boolean;
  stress: boolean;
  alcool: boolean;
  famMortSubite: boolean;
  famCoronaro: boolean;
  famHTA: boolean;
  famDiabete: boolean;
  anticoagulants: boolean;
  antiagregants: boolean;
  betabloquants: boolean;
  iecAra2: boolean;
  statines: boolean;
  diuretiques: boolean;
  antiarythmiques: boolean;
  autresMedicaments: string;
}
interface ComplementairesData {
  ecgRythme: string;
  ecgFc: string;
  ecgAxe: string;
  ecgPr: string;
  ecgQrs: string;
  ecgQt: string;
  ecgAnomalies: string;
  troponine: string;
  bnp: string;
  nfs: string;
  ionogramme: string;
  creatinine: string;
  glycemie: string;
  cholTotal: string;
  ldl: string;
  hdl: string;
  triglycerides: string;
  echoFevg: string;
  echoDimensions: string;
  echoValves: string;
  echoAutres: string;
  coronarographie: string;
  scanner: string;
  scintigraphie: string;
}
interface OrdonnancesData {
  medicaments: string;
  posologie: string;
  duree: string;
  prochainRdv: string;
  typeRdv: string;
  education: string;
  regimeHyposode: boolean;
  restrictionHydrique: boolean;
  activitePhysique: string;
  peseeQuotidienne: boolean;
  diagnostic: string;
  conclusion: string;
}
const defaultVitaux: VitalSigns = {
  tas: '',
  tad: '',
  fc: '',
  spo2: '',
  fr: '',
  temp: '',
  poids: '',
  taille: '',
  imc: '',
  perimAbdo: ''
};
const defaultSymptomes: Symptomes = {
  douleurThoracique: false,
  douleurLocalisation: '',
  douleurIrradiation: [],
  douleurCaractere: '',
  douleurEva: 5,
  douleurDuree: '',
  douleurDeclenchant: '',
  douleurCalmant: '',
  dyspnee: false,
  nyha: '',
  orthopnee: '',
  dpn: false,
  palpitations: false,
  palpitationsType: '',
  palpitationsDuree: '',
  syncope: false,
  syncopeCirconstances: '',
  syncOpeDuree: '',
  oedemes: false,
  oedemesLocalisation: '',
  oedemesPoidsPlus: '',
  fatigue: false,
  fatigueIntensité: '',
  fatigueEffort: false,
  toux: false,
  touxType: '',
  touxNocturne: false,
  cyanose: false,
  cyanoseType: '',
  autresSymptomes: ''
};
const defaultPhysique: PhysiqueExam = {
  rythme: '',
  b1b2: '',
  b3: 'Absent',
  b4: 'Absent',
  souffle: 'Absent',
  souffleType: '',
  souffleSiege: '',
  souffleIntensite: '',
  souffleIrradiation: '',
  frottement: 'Absent',
  mv: '',
  ralesCrepitants: 'Absents',
  sibilants: 'Absents',
  epanchement: 'Absent',
  poulsPeripheriques: '',
  trc: '',
  varices: 'Non',
  tvp: 'Non',
  hepatomegalie: 'Absent',
  splenomegalie: 'Absent',
  ascite: 'Absent',
  etatGeneral: '',
  conscienceScore: '15/15'
};
const defaultAntecedents: Antecedents = {
  idm: false,
  avc: false,
  fa: false,
  ic: false,
  hta: false,
  diabete: false,
  dyslipidemie: false,
  angor: false,
  pontage: false,
  stent: false,
  tabac: 'Non-fumeur',
  obesite: false,
  sedentarite: false,
  stress: false,
  alcool: false,
  famMortSubite: false,
  famCoronaro: false,
  famHTA: false,
  famDiabete: false,
  anticoagulants: false,
  antiagregants: false,
  betabloquants: false,
  iecAra2: false,
  statines: false,
  diuretiques: false,
  antiarythmiques: false,
  autresMedicaments: ''
};
const defaultComplementaires: ComplementairesData = {
  ecgRythme: '',
  ecgFc: '',
  ecgAxe: '',
  ecgPr: '',
  ecgQrs: '',
  ecgQt: '',
  ecgAnomalies: '',
  troponine: '',
  bnp: '',
  nfs: '',
  ionogramme: '',
  creatinine: '',
  glycemie: '',
  cholTotal: '',
  ldl: '',
  hdl: '',
  triglycerides: '',
  echoFevg: '',
  echoDimensions: '',
  echoValves: '',
  echoAutres: '',
  coronarographie: '',
  scanner: '',
  scintigraphie: ''
};
const defaultOrdonnances: OrdonnancesData = {
  medicaments: '',
  posologie: '',
  duree: '',
  prochainRdv: '',
  typeRdv: '',
  education: '',
  regimeHyposode: false,
  restrictionHydrique: false,
  activitePhysique: '',
  peseeQuotidienne: false,
  diagnostic: '',
  conclusion: ''
};
const inputClass =
'w-full px-2 py-1.5 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 bg-white';
const labelClass = 'block text-xs font-medium text-gray-600 mb-0.5';
const sectionHeaderClass =
'text-xs font-semibold text-gray-700 mb-2 pb-1 border-b border-gray-100 flex items-center gap-1.5';
function NormalIndicator({
  value,
  min,
  max,
  unit = ''





}: {value: string;min: number;max: number;unit?: string;}) {
  const num = parseFloat(value);
  if (!value || isNaN(num)) return null;
  const isNormal = num >= min && num <= max;
  return (
    <span
      className={`ml-1 text-xs px-1 py-0.5 rounded ${isNormal ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>

      {isNormal ? '✓ Normal' : '⚠ Anormal'}
    </span>);

}
function CheckboxField({
  label,
  checked,
  onChange




}: {label: string;checked: boolean;onChange: (v: boolean) => void;}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div
        onClick={() => onChange(!checked)}
        className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 cursor-pointer transition-colors ${checked ? 'bg-red-600 border-red-600' : 'border-gray-300 bg-white'}`}>

        {checked && <CheckIcon size={10} className="text-white" />}
      </div>
      <span className="text-xs text-gray-700">{label}</span>
    </label>);

}
function RadioGroup({
  label,
  options,
  value,
  onChange





}: {label: string;options: string[];value: string;onChange: (v: string) => void;}) {
  return (
    <div>
      <div className={labelClass}>{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) =>
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`px-2 py-1 text-xs rounded border transition-colors ${value === opt ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-600 border-gray-200 hover:border-red-300'}`}>

            {opt}
          </button>
        )}
      </div>
    </div>);

}
export function NouvelExamenClinique() {
  const navigate = useNavigate();
  const { selectedPatient } = usePatient();
  const [activeTab, setActiveTab] = useState<FormTab>('general');
  const [vitaux, setVitaux] = useState<VitalSigns>(defaultVitaux);
  const [symptomes, setSymptomes] = useState<Symptomes>(defaultSymptomes);
  const [physique, setPhysique] = useState<PhysiqueExam>(defaultPhysique);
  const [antecedents, setAntecedents] =
  useState<Antecedents>(defaultAntecedents);
  const [complementaires, setComplementaires] = useState<ComplementairesData>(
    defaultComplementaires
  );
  const [ordonnances, setOrdonnances] =
  useState<OrdonnancesData>(defaultOrdonnances);
  // General info state
  const [dateConsult, setDateConsult] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [heureConsult, setHeureConsult] = useState(
    new Date().toTimeString().slice(0, 5)
  );
  const [medecin, setMedecin] = useState('');
  const [motif, setMotif] = useState('');
  const [typeConsult, setTypeConsult] = useState('');
  const [modeArrivee, setModeArrivee] = useState('');
  // Auto-calculate IMC
  useEffect(() => {
    const poids = parseFloat(vitaux.poids);
    const taille = parseFloat(vitaux.taille);
    if (poids > 0 && taille > 0) {
      const tailleM = taille / 100;
      const imc = (poids / (tailleM * tailleM)).toFixed(1);
      setVitaux((prev) => ({
        ...prev,
        imc
      }));
    }
  }, [vitaux.poids, vitaux.taille]);
  const currentTabIndex = tabOrder.indexOf(activeTab);
  const canGoNext = currentTabIndex < tabOrder.length - 1;
  const canGoPrev = currentTabIndex > 0;
  const goNext = () => canGoNext && setActiveTab(tabOrder[currentTabIndex + 1]);
  const goPrev = () => canGoPrev && setActiveTab(tabOrder[currentTabIndex - 1]);
  const updateVitaux = (field: keyof VitalSigns, value: string) =>
  setVitaux((prev) => ({
    ...prev,
    [field]: value
  }));
  const updateSymptomes = (field: keyof Symptomes, value: any) =>
  setSymptomes((prev) => ({
    ...prev,
    [field]: value
  }));
  const updatePhysique = (field: keyof PhysiqueExam, value: string) =>
  setPhysique((prev) => ({
    ...prev,
    [field]: value
  }));
  const updateAntecedents = (field: keyof Antecedents, value: any) =>
  setAntecedents((prev) => ({
    ...prev,
    [field]: value
  }));
  const updateComplementaires = (
  field: keyof ComplementairesData,
  value: string) =>

  setComplementaires((prev) => ({
    ...prev,
    [field]: value
  }));
  const updateOrdonnances = (field: keyof OrdonnancesData, value: any) =>
  setOrdonnances((prev) => ({
    ...prev,
    [field]: value
  }));
  const imcCategory = () => {
    const imc = parseFloat(vitaux.imc);
    if (isNaN(imc)) return null;
    if (imc < 18.5)
    return {
      label: 'Maigreur',
      color: 'text-red-600'
    };
    if (imc < 25)
    return {
      label: 'Normal',
      color: 'text-green-600'
    };
    if (imc < 30)
    return {
      label: 'Surpoids',
      color: 'text-yellow-600'
    };
    return {
      label: 'Obésité',
      color: 'text-red-600'
    };
  };
  return (
    <div className="min-h-screen bg-gray-50 p-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/examen-clinique')}
            className="flex items-center gap-1 px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-lg border border-gray-200 bg-white">

            <ChevronLeftIcon size={12} />
            Retour
          </button>
          <div className="w-7 h-7 bg-red-600 rounded-lg flex items-center justify-center">
            <HeartIcon size={14} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900">
              Nouvel Examen Clinique — Cardiologie
            </h1>
            <p className="text-xs text-gray-500">
              Service de Cardiologie · CHU Tunis
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/examen-clinique')}
            className="flex items-center gap-1 px-2 py-1.5 text-xs border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50">

            <XIcon size={11} />
            Annuler
          </button>
          <button className="flex items-center gap-1 px-2 py-1.5 text-xs border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50">
            <SaveIcon size={11} />
            Brouillon
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
            <CheckCircleIcon size={11} />
            Enregistrer l'examen
          </button>
        </div>
      </div>

      {/* Progress tabs */}
      <div className="flex gap-0 mb-3 bg-white border border-gray-200 rounded-lg p-1 overflow-x-auto">
        {formTabs.map((tab, idx) => {
          const isActive = activeTab === tab.id;
          const isPast = tabOrder.indexOf(tab.id) < currentTabIndex;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs whitespace-nowrap transition-all flex-1 justify-center ${isActive ? 'bg-red-600 text-white font-medium shadow-sm' : isPast ? 'text-green-700 bg-green-50' : 'text-gray-500 hover:bg-gray-100'}`}>

              {isPast && !isActive ?
              <CheckCircleIcon size={11} className="text-green-600" /> :

              tab.icon
              }
              <span className="hidden lg:inline">{tab.shortLabel}</span>
            </button>);

        })}
      </div>

      {/* Tab Content */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 min-h-96">
        {activeTab === 'general' &&
        <GeneralTab
          selectedPatient={selectedPatient}
          dateConsult={dateConsult}
          setDateConsult={setDateConsult}
          heureConsult={heureConsult}
          setHeureConsult={setHeureConsult}
          medecin={medecin}
          setMedecin={setMedecin}
          motif={motif}
          setMotif={setMotif}
          typeConsult={typeConsult}
          setTypeConsult={setTypeConsult}
          modeArrivee={modeArrivee}
          setModeArrivee={setModeArrivee} />

        }
        {activeTab === 'vitaux' &&
        <VitauxTab
          vitaux={vitaux}
          updateVitaux={updateVitaux}
          imcCategory={imcCategory()} />

        }
        {activeTab === 'symptomes' &&
        <SymptomsFormTab
          symptomes={symptomes}
          updateSymptomes={updateSymptomes} />

        }
        {activeTab === 'physique' &&
        <PhysiqueFormTab
          physique={physique}
          updatePhysique={updatePhysique} />

        }
        {activeTab === 'antecedents' &&
        <AntecedentsFormTab
          antecedents={antecedents}
          updateAntecedents={updateAntecedents} />

        }
        {activeTab === 'complementaires' &&
        <ComplementairesFormTab
          complementaires={complementaires}
          updateComplementaires={updateComplementaires} />

        }
        {activeTab === 'ordonnances' &&
        <OrdonnancesFormTab
          ordonnances={ordonnances}
          updateOrdonnances={updateOrdonnances} />

        }
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-3">
        <button
          onClick={goPrev}
          disabled={!canGoPrev}
          className="flex items-center gap-1 px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed">

          <ChevronLeftIcon size={12} />
          Précédent
        </button>
        <div className="flex items-center gap-1">
          {tabOrder.map((t, i) =>
          <div
            key={t}
            onClick={() => setActiveTab(t)}
            className={`w-2 h-2 rounded-full cursor-pointer transition-all ${t === activeTab ? 'bg-red-600 w-4' : i < currentTabIndex ? 'bg-green-500' : 'bg-gray-300'}`} />

          )}
        </div>
        {canGoNext ?
        <button
          onClick={goNext}
          className="flex items-center gap-1 px-3 py-1.5 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700">

            Suivant
            <ChevronRightIcon size={12} />
          </button> :

        <button className="flex items-center gap-1 px-3 py-1.5 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700">
            <CheckCircleIcon size={12} />
            Enregistrer
          </button>
        }
      </div>
    </div>);

}
// ─── TAB 1: General ─────────────────────────────────────────────────────────
interface GeneralTabProps {
  selectedPatient: Patient;
  dateConsult: string;
  setDateConsult: (v: string) => void;
  heureConsult: string;
  setHeureConsult: (v: string) => void;
  medecin: string;
  setMedecin: (v: string) => void;
  motif: string;
  setMotif: (v: string) => void;
  typeConsult: string;
  setTypeConsult: (v: string) => void;
  modeArrivee: string;
  setModeArrivee: (v: string) => void;
}
function GeneralTab({
  selectedPatient,
  dateConsult,
  setDateConsult,
  heureConsult,
  setHeureConsult,
  medecin,
  setMedecin,
  motif,
  setMotif,
  typeConsult,
  setTypeConsult,
  modeArrivee,
  setModeArrivee
}: GeneralTabProps) {
  return (
    <div className="space-y-4">
      <div className={sectionHeaderClass}>
        <UserIcon size={12} className="text-red-500" />
        Identification du Patient
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <label className={labelClass}>Patient (depuis l'en-tête)</label>
          <input
            type="text"
            value={selectedPatient.name}
            className={`${inputClass} bg-gray-50`}
            readOnly />
        </div>
        <div>
          <label className={labelClass}>N° Dossier</label>
          <input
            type="text"
            value={selectedPatient.dossier}
            className={`${inputClass} bg-gray-50`}
            readOnly />

        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-2 grid grid-cols-4 gap-2 text-xs">
          <div>
            <span className="text-red-500">Nom:</span>{' '}
            <span className="font-medium text-red-800">{selectedPatient.name}</span>
          </div>
          <div>
            <span className="text-red-500">Âge:</span>{' '}
            <span className="font-medium text-red-800">{selectedPatient.age} ans</span>
          </div>
          <div>
            <span className="text-red-500">Sexe:</span>{' '}
            <span className="font-medium text-red-800">{selectedPatient.gender === 'M' ? 'Masculin' : 'Féminin'}</span>
          </div>
          <div>
            <span className="text-red-500">Groupe sanguin:</span>{' '}
            <span className="font-medium text-red-800">{selectedPatient.bloodType ?? 'Non renseigné'}</span>
          </div>
        </div>

      <div className={sectionHeaderClass}>
        <CalendarIcon size={12} className="text-red-500" />
        Informations de la Consultation
      </div>
      <div className="grid grid-cols-4 gap-3">
        <div>
          <label className={labelClass}>Date de consultation *</label>
          <input
            type="date"
            value={dateConsult}
            onChange={(e) => setDateConsult(e.target.value)}
            className={inputClass} />

        </div>
        <div>
          <label className={labelClass}>Heure *</label>
          <input
            type="time"
            value={heureConsult}
            onChange={(e) => setHeureConsult(e.target.value)}
            className={inputClass} />

        </div>
        <div>
          <label className={labelClass}>Médecin *</label>
          <select
            value={medecin}
            onChange={(e) => setMedecin(e.target.value)}
            className={inputClass}>

            <option value="">Sélectionner...</option>
            <option value="mansouri">Dr. Mansouri — Cardiologue</option>
            <option value="chaabane">Dr. Chaabane — Cardiologue</option>
            <option value="belhadj">Dr. Belhadj — Cardiologue</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Motif de consultation *</label>
          <select
            value={motif}
            onChange={(e) => setMotif(e.target.value)}
            className={inputClass}>

            <option value="">Sélectionner...</option>
            <option value="douleur">Douleur thoracique</option>
            <option value="dyspnee">Dyspnée</option>
            <option value="palpitations">Palpitations</option>
            <option value="bilan">Bilan cardiaque</option>
            <option value="hta">Suivi HTA</option>
            <option value="ic">Suivi IC</option>
            <option value="fa">Suivi FA</option>
            <option value="post-idm">Suivi post-IDM</option>
            <option value="syncope">Syncope/Lipothymie</option>
            <option value="autre">Autre</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <RadioGroup
          label="Type de consultation *"
          options={[
          'Première consultation',
          'Consultation de suivi',
          'Urgence']
          }
          value={typeConsult}
          onChange={setTypeConsult} />

        <RadioGroup
          label="Mode d'arrivée *"
          options={['Ambulatoire', 'Urgences', 'Hospitalisation', 'Transfert']}
          value={modeArrivee}
          onChange={setModeArrivee} />

      </div>

      {(typeConsult === 'Urgence' || modeArrivee === 'Urgences') &&
      <div className="bg-red-50 border border-red-200 rounded-lg p-2 flex items-center gap-2">
          <AlertTriangleIcon size={14} className="text-red-500 flex-shrink-0" />
          <span className="text-xs text-red-700 font-medium">
            Consultation urgente — Priorité élevée. Veuillez compléter les
            signes vitaux immédiatement.
          </span>
        </div>
      }

      <div>
        <label className={labelClass}>Observations préliminaires</label>
        <textarea
          rows={2}
          placeholder="Notes d'accueil, contexte clinique particulier..."
          className={`${inputClass} resize-none`} />

      </div>
    </div>);

}
// ─── TAB 2: Vitaux ──────────────────────────────────────────────────────────
interface VitauxTabProps {
  vitaux: VitalSigns;
  updateVitaux: (field: keyof VitalSigns, value: string) => void;
  imcCategory: {
    label: string;
    color: string;
  } | null;
}
function VitauxTab({ vitaux, updateVitaux, imcCategory }: VitauxTabProps) {
  return (
    <div className="space-y-4">
      <div className={sectionHeaderClass}>
        <HeartIcon size={12} className="text-red-500" />
        Paramètres Hémodynamiques
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div className="col-span-2">
          <label className={labelClass}>Tension Artérielle (mmHg) *</label>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <input
                type="number"
                placeholder="Systolique"
                value={vitaux.tas}
                onChange={(e) => updateVitaux('tas', e.target.value)}
                className={inputClass} />

              <div className="text-xs text-gray-400 mt-0.5">
                Systolique (N: 90–130)
              </div>
            </div>
            <span className="text-gray-400 text-sm font-bold">/</span>
            <div className="flex-1">
              <input
                type="number"
                placeholder="Diastolique"
                value={vitaux.tad}
                onChange={(e) => updateVitaux('tad', e.target.value)}
                className={inputClass} />

              <div className="text-xs text-gray-400 mt-0.5">
                Diastolique (N: 60–85)
              </div>
            </div>
          </div>
          {vitaux.tas && vitaux.tad &&
          <div
            className={`text-xs mt-1 font-medium ${parseFloat(vitaux.tas) > 140 || parseFloat(vitaux.tad) > 90 ? 'text-red-600' : parseFloat(vitaux.tas) < 90 ? 'text-orange-600' : 'text-green-600'}`}>

              {parseFloat(vitaux.tas) > 140 || parseFloat(vitaux.tad) > 90 ?
            '⚠ Hypertension artérielle' :
            parseFloat(vitaux.tas) < 90 ?
            '⚠ Hypotension' :
            '✓ Tension normale'}
            </div>
          }
        </div>

        <div>
          <label className={labelClass}>Fréquence Cardiaque (bpm) *</label>
          <input
            type="number"
            placeholder="ex: 72"
            value={vitaux.fc}
            onChange={(e) => updateVitaux('fc', e.target.value)}
            className={inputClass} />

          <div className="text-xs text-gray-400 mt-0.5">
            Normale: 60–100 bpm
          </div>
          {vitaux.fc &&
          <div
            className={`text-xs mt-0.5 font-medium ${parseFloat(vitaux.fc) > 100 ? 'text-red-600' : parseFloat(vitaux.fc) < 60 ? 'text-orange-600' : 'text-green-600'}`}>

              {parseFloat(vitaux.fc) > 100 ?
            '⚠ Tachycardie' :
            parseFloat(vitaux.fc) < 60 ?
            '⚠ Bradycardie' :
            '✓ Normal'}
            </div>
          }
        </div>

        <div>
          <label className={labelClass}>SpO2 (%) *</label>
          <input
            type="number"
            placeholder="ex: 98"
            value={vitaux.spo2}
            onChange={(e) => updateVitaux('spo2', e.target.value)}
            className={inputClass}
            min="0"
            max="100" />

          <div className="text-xs text-gray-400 mt-0.5">Normale: ≥ 95%</div>
          {vitaux.spo2 &&
          <div
            className={`text-xs mt-0.5 font-medium ${parseFloat(vitaux.spo2) < 90 ? 'text-red-600' : parseFloat(vitaux.spo2) < 95 ? 'text-orange-600' : 'text-green-600'}`}>

              {parseFloat(vitaux.spo2) < 90 ?
            '⚠ Hypoxémie sévère' :
            parseFloat(vitaux.spo2) < 95 ?
            '⚠ Hypoxémie' :
            '✓ Normal'}
            </div>
          }
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div>
          <label className={labelClass}>Fréquence Respiratoire (/min)</label>
          <input
            type="number"
            placeholder="ex: 16"
            value={vitaux.fr}
            onChange={(e) => updateVitaux('fr', e.target.value)}
            className={inputClass} />

          <div className="text-xs text-gray-400 mt-0.5">Normale: 12–20/min</div>
          {vitaux.fr && <NormalIndicator value={vitaux.fr} min={12} max={20} />}
        </div>

        <div>
          <label className={labelClass}>Température (°C)</label>
          <input
            type="number"
            step="0.1"
            placeholder="ex: 37.0"
            value={vitaux.temp}
            onChange={(e) => updateVitaux('temp', e.target.value)}
            className={inputClass} />

          <div className="text-xs text-gray-400 mt-0.5">
            Normale: 36.5–37.5°C
          </div>
          {vitaux.temp &&
          <NormalIndicator value={vitaux.temp} min={36.5} max={37.5} />
          }
        </div>

        <div>
          <label className={labelClass}>Poids (kg) *</label>
          <input
            type="number"
            step="0.1"
            placeholder="ex: 75"
            value={vitaux.poids}
            onChange={(e) => updateVitaux('poids', e.target.value)}
            className={inputClass} />

        </div>

        <div>
          <label className={labelClass}>Taille (cm) *</label>
          <input
            type="number"
            placeholder="ex: 170"
            value={vitaux.taille}
            onChange={(e) => updateVitaux('taille', e.target.value)}
            className={inputClass} />

        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div>
          <label className={labelClass}>IMC (calculé auto)</label>
          <div
            className={`${inputClass} bg-gray-50 flex items-center justify-between`}>

            <span className="font-semibold">{vitaux.imc || '—'}</span>
            {imcCategory &&
            <span className={`text-xs font-medium ${imcCategory.color}`}>
                {imcCategory.label}
              </span>
            }
          </div>
          <div className="text-xs text-gray-400 mt-0.5">Normal: 18.5–24.9</div>
        </div>

        <div>
          <label className={labelClass}>Périmètre abdominal (cm)</label>
          <input
            type="number"
            placeholder="ex: 90"
            value={vitaux.perimAbdo}
            onChange={(e) => updateVitaux('perimAbdo', e.target.value)}
            className={inputClass} />

          <div className="text-xs text-gray-400 mt-0.5">
            Risque: H &gt;102cm, F &gt;88cm
          </div>
        </div>
      </div>

      {/* Vital signs summary */}
      {(vitaux.tas || vitaux.fc || vitaux.spo2) &&
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <div className="text-xs font-semibold text-gray-600 mb-2">
            Résumé des signes vitaux
          </div>
          <div className="grid grid-cols-5 gap-2">
            {[
          {
            label: 'TA',
            val:
            vitaux.tas && vitaux.tad ?
            `${vitaux.tas}/${vitaux.tad}` :
            '—',
            unit: 'mmHg',
            abnormal:
            parseFloat(vitaux.tas) > 140 || parseFloat(vitaux.tad) > 90
          },
          {
            label: 'FC',
            val: vitaux.fc || '—',
            unit: 'bpm',
            abnormal:
            parseFloat(vitaux.fc) > 100 || parseFloat(vitaux.fc) < 60
          },
          {
            label: 'SpO2',
            val: vitaux.spo2 ? `${vitaux.spo2}%` : '—',
            unit: '',
            abnormal: parseFloat(vitaux.spo2) < 95
          },
          {
            label: 'FR',
            val: vitaux.fr || '—',
            unit: '/min',
            abnormal:
            parseFloat(vitaux.fr) > 20 || parseFloat(vitaux.fr) < 12
          },
          {
            label: 'IMC',
            val: vitaux.imc || '—',
            unit: '',
            abnormal:
            parseFloat(vitaux.imc) >= 30 || parseFloat(vitaux.imc) < 18.5
          }].
          map((item) =>
          <div
            key={item.label}
            className={`text-center p-2 rounded-lg border ${item.abnormal && item.val !== '—' ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'}`}>

                <div className="text-xs text-gray-500">{item.label}</div>
                <div
              className={`text-sm font-bold ${item.abnormal && item.val !== '—' ? 'text-red-600' : 'text-gray-800'}`}>

                  {item.val}
                </div>
                {item.unit &&
            <div className="text-xs text-gray-400">{item.unit}</div>
            }
              </div>
          )}
          </div>
        </div>
      }
    </div>);

}
// ─── TAB 3: Symptômes ───────────────────────────────────────────────────────
interface SymptomsFormTabProps {
  symptomes: Symptomes;
  updateSymptomes: (field: keyof Symptomes, value: any) => void;
}
function SymptomsFormTab({ symptomes, updateSymptomes }: SymptomsFormTabProps) {
  return (
    <div className="space-y-3">
      <div className={sectionHeaderClass}>
        <ZapIcon size={12} className="text-yellow-500" />
        Symptômes Cardiaques
      </div>

      {/* Douleur thoracique */}
      <div
        className={`border rounded-lg overflow-hidden ${symptomes.douleurThoracique ? 'border-red-300' : 'border-gray-200'}`}>

        <div
          className={`px-3 py-2 flex items-center gap-2 ${symptomes.douleurThoracique ? 'bg-red-50' : 'bg-gray-50'}`}>

          <CheckboxField
            label="Douleur thoracique"
            checked={symptomes.douleurThoracique}
            onChange={(v) => updateSymptomes('douleurThoracique', v)} />

          {symptomes.douleurThoracique &&
          <span className="ml-auto text-xs text-red-600 font-medium flex items-center gap-1">
              <AlertTriangleIcon size={10} /> Symptôme urgent — Évaluer
              immédiatement
            </span>
          }
        </div>
        {symptomes.douleurThoracique &&
        <div className="p-3 grid grid-cols-3 gap-3">
            <RadioGroup
            label="Localisation"
            options={['Rétrosternale', 'Précordiale', 'Latérale', 'Autre']}
            value={symptomes.douleurLocalisation}
            onChange={(v) => updateSymptomes('douleurLocalisation', v)} />

            <RadioGroup
            label="Caractère"
            options={[
            'Constrictive',
            'Brûlure',
            'Pression',
            'Piqûre',
            'Autre']
            }
            value={symptomes.douleurCaractere}
            onChange={(v) => updateSymptomes('douleurCaractere', v)} />

            <div>
              <label className={labelClass}>Irradiation</label>
              <div className="flex flex-wrap gap-1.5">
                {[
              'Bras gauche',
              'Mâchoire',
              'Dos',
              'Épaule',
              'Épigastre',
              'Sans irradiation'].
              map((opt) =>
              <button
                key={opt}
                type="button"
                onClick={() => {
                  const arr = symptomes.douleurIrradiation;
                  updateSymptomes(
                    'douleurIrradiation',
                    arr.includes(opt) ?
                    arr.filter((x) => x !== opt) :
                    [...arr, opt]
                  );
                }}
                className={`px-2 py-1 text-xs rounded border transition-colors ${symptomes.douleurIrradiation.includes(opt) ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-600 border-gray-200 hover:border-red-300'}`}>

                    {opt}
                  </button>
              )}
              </div>
            </div>
            <div>
              <label className={labelClass}>
                Intensité EVA:{' '}
                <span className="text-red-600 font-bold">
                  {symptomes.douleurEva}/10
                </span>
              </label>
              <input
              type="range"
              min={0}
              max={10}
              value={symptomes.douleurEva}
              onChange={(e) =>
              updateSymptomes('douleurEva', parseInt(e.target.value))
              }
              className="w-full accent-red-500" />

              <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                <span>0 (Aucune)</span>
                <span>5 (Modérée)</span>
                <span>10 (Max)</span>
              </div>
            </div>
            <div>
              <label className={labelClass}>Durée</label>
              <input
              type="text"
              placeholder="ex: 30 min, 2h, depuis hier"
              value={symptomes.douleurDuree}
              onChange={(e) =>
              updateSymptomes('douleurDuree', e.target.value)
              }
              className={inputClass} />

            </div>
            <div>
              <RadioGroup
              label="Facteur déclenchant"
              options={[
              'Effort',
              'Repos',
              'Stress',
              'Spontanée',
              'Post-prandial']
              }
              value={symptomes.douleurDeclenchant}
              onChange={(v) => updateSymptomes('douleurDeclenchant', v)} />

            </div>
            <div>
              <RadioGroup
              label="Facteur calmant"
              options={['Trinitrine', 'Repos', 'Antalgiques', 'Aucun']}
              value={symptomes.douleurCalmant}
              onChange={(v) => updateSymptomes('douleurCalmant', v)} />

            </div>
          </div>
        }
      </div>

      {/* Dyspnée */}
      <div
        className={`border rounded-lg overflow-hidden ${symptomes.dyspnee ? 'border-red-300' : 'border-gray-200'}`}>

        <div
          className={`px-3 py-2 ${symptomes.dyspnee ? 'bg-red-50' : 'bg-gray-50'}`}>

          <CheckboxField
            label="Dyspnée"
            checked={symptomes.dyspnee}
            onChange={(v) => updateSymptomes('dyspnee', v)} />

        </div>
        {symptomes.dyspnee &&
        <div className="p-3 grid grid-cols-3 gap-3">
            <RadioGroup
            label="Classification NYHA"
            options={['NYHA I', 'NYHA II', 'NYHA III', 'NYHA IV']}
            value={symptomes.nyha}
            onChange={(v) => updateSymptomes('nyha', v)} />

            <div>
              <label className={labelClass}>Orthopnée (nb oreillers)</label>
              <select
              value={symptomes.orthopnee}
              onChange={(e) => updateSymptomes('orthopnee', e.target.value)}
              className={inputClass}>

                <option value="">Aucune</option>
                <option value="1">1 oreiller</option>
                <option value="2">2 oreillers</option>
                <option value="3">3 oreillers</option>
                <option value="4+">4+ oreillers (orthopnée sévère)</option>
              </select>
            </div>
            <div className="flex items-center">
              <CheckboxField
              label="Dyspnée paroxystique nocturne (DPN)"
              checked={symptomes.dpn}
              onChange={(v) => updateSymptomes('dpn', v)} />

            </div>
          </div>
        }
      </div>

      {/* Palpitations */}
      <div
        className={`border rounded-lg overflow-hidden ${symptomes.palpitations ? 'border-yellow-300' : 'border-gray-200'}`}>

        <div
          className={`px-3 py-2 ${symptomes.palpitations ? 'bg-yellow-50' : 'bg-gray-50'}`}>

          <CheckboxField
            label="Palpitations"
            checked={symptomes.palpitations}
            onChange={(v) => updateSymptomes('palpitations', v)} />

        </div>
        {symptomes.palpitations &&
        <div className="p-3 grid grid-cols-3 gap-3">
            <RadioGroup
            label="Type"
            options={['Régulières', 'Irrégulières', 'Rapides', 'Lentes']}
            value={symptomes.palpitationsType}
            onChange={(v) => updateSymptomes('palpitationsType', v)} />

            <div>
              <label className={labelClass}>Durée des épisodes</label>
              <input
              type="text"
              placeholder="ex: quelques secondes, minutes"
              value={symptomes.palpitationsDuree}
              onChange={(e) =>
              updateSymptomes('palpitationsDuree', e.target.value)
              }
              className={inputClass} />

            </div>
          </div>
        }
      </div>

      {/* Syncope */}
      <div
        className={`border rounded-lg overflow-hidden ${symptomes.syncope ? 'border-orange-300' : 'border-gray-200'}`}>

        <div
          className={`px-3 py-2 ${symptomes.syncope ? 'bg-orange-50' : 'bg-gray-50'}`}>

          <CheckboxField
            label="Syncope / Lipothymie"
            checked={symptomes.syncope}
            onChange={(v) => updateSymptomes('syncope', v)} />

        </div>
        {symptomes.syncope &&
        <div className="p-3 grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Circonstances</label>
              <input
              type="text"
              placeholder="ex: à l'effort, au repos, orthostatique"
              value={symptomes.syncopeCirconstances}
              onChange={(e) =>
              updateSymptomes('syncopeCirconstances', e.target.value)
              }
              className={inputClass} />

            </div>
            <div>
              <label className={labelClass}>
                Durée de perte de connaissance
              </label>
              <input
              type="text"
              placeholder="ex: quelques secondes"
              value={symptomes.syncOpeDuree}
              onChange={(e) =>
              updateSymptomes('syncOpeDuree', e.target.value)
              }
              className={inputClass} />

            </div>
          </div>
        }
      </div>

      {/* Oedèmes */}
      <div
        className={`border rounded-lg overflow-hidden ${symptomes.oedemes ? 'border-orange-300' : 'border-gray-200'}`}>

        <div
          className={`px-3 py-2 ${symptomes.oedemes ? 'bg-orange-50' : 'bg-gray-50'}`}>

          <CheckboxField
            label="Œdèmes"
            checked={symptomes.oedemes}
            onChange={(v) => updateSymptomes('oedemes', v)} />

        </div>
        {symptomes.oedemes &&
        <div className="p-3 grid grid-cols-2 gap-3">
            <RadioGroup
            label="Localisation"
            options={[
            'Membres inférieurs',
            'Généralisés',
            'Facial',
            'Ascite']
            }
            value={symptomes.oedemesLocalisation}
            onChange={(v) => updateSymptomes('oedemesLocalisation', v)} />

            <div>
              <label className={labelClass}>Prise de poids récente</label>
              <input
              type="text"
              placeholder="ex: +3 kg en 1 semaine"
              value={symptomes.oedemesPoidsPlus}
              onChange={(e) =>
              updateSymptomes('oedemesPoidsPlus', e.target.value)
              }
              className={inputClass} />

            </div>
          </div>
        }
      </div>

      {/* Autres symptômes compacts */}
      <div className="grid grid-cols-3 gap-2">
        <div
          className={`border rounded-lg p-2 ${symptomes.fatigue ? 'border-gray-400 bg-gray-50' : 'border-gray-200'}`}>

          <CheckboxField
            label="Fatigue"
            checked={symptomes.fatigue}
            onChange={(v) => updateSymptomes('fatigue', v)} />

          {symptomes.fatigue &&
          <div className="mt-2 space-y-1.5">
              <RadioGroup
              label="Intensité"
              options={['Légère', 'Modérée', 'Sévère']}
              value={symptomes.fatigueIntensité}
              onChange={(v) => updateSymptomes('fatigueIntensité', v)} />

              <CheckboxField
              label="À l'effort"
              checked={symptomes.fatigueEffort}
              onChange={(v) => updateSymptomes('fatigueEffort', v)} />

            </div>
          }
        </div>
        <div
          className={`border rounded-lg p-2 ${symptomes.toux ? 'border-gray-400 bg-gray-50' : 'border-gray-200'}`}>

          <CheckboxField
            label="Toux"
            checked={symptomes.toux}
            onChange={(v) => updateSymptomes('toux', v)} />

          {symptomes.toux &&
          <div className="mt-2 space-y-1.5">
              <RadioGroup
              label="Type"
              options={['Sèche', 'Productive']}
              value={symptomes.touxType}
              onChange={(v) => updateSymptomes('touxType', v)} />

              <CheckboxField
              label="Nocturne"
              checked={symptomes.touxNocturne}
              onChange={(v) => updateSymptomes('touxNocturne', v)} />

            </div>
          }
        </div>
        <div
          className={`border rounded-lg p-2 ${symptomes.cyanose ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}>

          <CheckboxField
            label="Cyanose"
            checked={symptomes.cyanose}
            onChange={(v) => updateSymptomes('cyanose', v)} />

          {symptomes.cyanose &&
          <div className="mt-2">
              <RadioGroup
              label="Type"
              options={['Centrale', 'Périphérique']}
              value={symptomes.cyanoseType}
              onChange={(v) => updateSymptomes('cyanoseType', v)} />

            </div>
          }
        </div>
      </div>

      <div>
        <label className={labelClass}>Autres symptômes</label>
        <textarea
          rows={2}
          placeholder="Préciser tout autre symptôme cardiologique..."
          value={symptomes.autresSymptomes}
          onChange={(e) => updateSymptomes('autresSymptomes', e.target.value)}
          className={`${inputClass} resize-none`} />

      </div>
    </div>);

}
// ─── TAB 4: Examen Physique ─────────────────────────────────────────────────
interface PhysiqueFormTabProps {
  physique: PhysiqueExam;
  updatePhysique: (field: keyof PhysiqueExam, value: string) => void;
}
function PhysiqueFormTab({ physique, updatePhysique }: PhysiqueFormTabProps) {
  return (
    <div className="space-y-4">
      {/* État général */}
      <div>
        <div className={sectionHeaderClass}>
          <UserIcon size={12} className="text-gray-500" />
          État Général
        </div>
        <div className="grid grid-cols-3 gap-3">
          <RadioGroup
            label="État général"
            options={['Bon', 'Altéré', 'Très altéré']}
            value={physique.etatGeneral}
            onChange={(v) => updatePhysique('etatGeneral', v)} />

          <div>
            <label className={labelClass}>Score de Glasgow</label>
            <input
              type="text"
              placeholder="ex: 15/15"
              value={physique.conscienceScore}
              onChange={(e) =>
              updatePhysique('conscienceScore', e.target.value)
              }
              className={inputClass} />

          </div>
        </div>
      </div>

      {/* Auscultation cardiaque */}
      <div>
        <div className={sectionHeaderClass}>
          <HeartIcon size={12} className="text-red-500" />
          Auscultation Cardiaque
        </div>
        <div className="grid grid-cols-2 gap-3">
          <RadioGroup
            label="Rythme cardiaque *"
            options={['Régulier', 'Irrégulier', 'Tachycarde', 'Bradycarde']}
            value={physique.rythme}
            onChange={(v) => updatePhysique('rythme', v)} />

          <RadioGroup
            label="Bruits du cœur B1/B2"
            options={['Normaux', 'Assourdis', 'Éclat de B2', 'Dédoublement']}
            value={physique.b1b2}
            onChange={(v) => updatePhysique('b1b2', v)} />

          <RadioGroup
            label="B3 (galop protodiastolique)"
            options={['Absent', 'Présent']}
            value={physique.b3}
            onChange={(v) => updatePhysique('b3', v)} />

          <RadioGroup
            label="B4 (galop présystolique)"
            options={['Absent', 'Présent']}
            value={physique.b4}
            onChange={(v) => updatePhysique('b4', v)} />

          <RadioGroup
            label="Souffles *"
            options={[
            'Absent',
            'Systolique',
            'Diastolique',
            'Continu',
            'Systolo-diastolique']
            }
            value={physique.souffle}
            onChange={(v) => updatePhysique('souffle', v)} />

          <RadioGroup
            label="Frottement péricardique"
            options={['Absent', 'Présent']}
            value={physique.frottement}
            onChange={(v) => updatePhysique('frottement', v)} />

        </div>
        {physique.souffle !== 'Absent' && physique.souffle &&
        <div className="mt-2 grid grid-cols-3 gap-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div>
              <label className={labelClass}>Siège du souffle</label>
              <select
              value={physique.souffleSiege}
              onChange={(e) => updatePhysique('souffleSiege', e.target.value)}
              className={inputClass}>

                <option value="">Sélectionner...</option>
                <option>Foyer aortique</option>
                <option>Foyer pulmonaire</option>
                <option>Foyer mitral</option>
                <option>Foyer tricuspide</option>
                <option>Mésocardique</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Intensité (Levine)</label>
              <select
              value={physique.souffleIntensite}
              onChange={(e) =>
              updatePhysique('souffleIntensite', e.target.value)
              }
              className={inputClass}>

                <option value="">Sélectionner...</option>
                <option>1/6</option>
                <option>2/6</option>
                <option>3/6</option>
                <option>4/6</option>
                <option>5/6</option>
                <option>6/6</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Irradiation</label>
              <input
              type="text"
              placeholder="ex: axillaire, carotides"
              value={physique.souffleIrradiation}
              onChange={(e) =>
              updatePhysique('souffleIrradiation', e.target.value)
              }
              className={inputClass} />

            </div>
          </div>
        }
      </div>

      {/* Auscultation pulmonaire */}
      <div>
        <div className={sectionHeaderClass}>
          <ActivityIcon size={12} className="text-red-500" />
          Auscultation Pulmonaire
        </div>
        <div className="grid grid-cols-2 gap-3">
          <RadioGroup
            label="Murmure vésiculaire"
            options={['Normal', 'Diminué', 'Absent', 'Asymétrique']}
            value={physique.mv}
            onChange={(v) => updatePhysique('mv', v)} />

          <RadioGroup
            label="Râles crépitants"
            options={['Absents', 'Bases', 'Mi-champs', 'Diffus']}
            value={physique.ralesCrepitants}
            onChange={(v) => updatePhysique('ralesCrepitants', v)} />

          <RadioGroup
            label="Sibilants"
            options={['Absents', 'Présents']}
            value={physique.sibilants}
            onChange={(v) => updatePhysique('sibilants', v)} />

          <RadioGroup
            label="Épanchement pleural"
            options={['Absent', 'Droit', 'Gauche', 'Bilatéral']}
            value={physique.epanchement}
            onChange={(v) => updatePhysique('epanchement', v)} />

        </div>
      </div>

      {/* Examen vasculaire */}
      <div>
        <div className={sectionHeaderClass}>
          <DropletIcon size={12} className="text-orange-500" />
          Examen Vasculaire
        </div>
        <div className="grid grid-cols-2 gap-3">
          <RadioGroup
            label="Pouls périphériques"
            options={[
            'Tous présents',
            'Abolition fémorale',
            'Abolition poplitée',
            'Abolition distale',
            'Asymétrie']
            }
            value={physique.poulsPeripheriques}
            onChange={(v) => updatePhysique('poulsPeripheriques', v)} />

          <RadioGroup
            label="TRC (Temps de Recoloration Cutanée)"
            options={['< 2s (Normal)', '2–3s', '> 3s (Anormal)']}
            value={physique.trc}
            onChange={(v) => updatePhysique('trc', v)} />

          <RadioGroup
            label="Varices"
            options={['Non', 'Oui (membres inférieurs)']}
            value={physique.varices}
            onChange={(v) => updatePhysique('varices', v)} />

          <RadioGroup
            label="Suspicion TVP"
            options={['Non', 'Oui — Signe de Homans +']}
            value={physique.tvp}
            onChange={(v) => updatePhysique('tvp', v)} />

        </div>
      </div>

      {/* Abdomen */}
      <div>
        <div className={sectionHeaderClass}>
          <ScaleIcon size={12} className="text-green-500" />
          Examen Abdominal
        </div>
        <div className="grid grid-cols-3 gap-3">
          <RadioGroup
            label="Hépatomégalie"
            options={['Absent', 'Modérée', 'Importante']}
            value={physique.hepatomegalie}
            onChange={(v) => updatePhysique('hepatomegalie', v)} />

          <RadioGroup
            label="Splénomégalie"
            options={['Absent', 'Présente']}
            value={physique.splenomegalie}
            onChange={(v) => updatePhysique('splenomegalie', v)} />

          <RadioGroup
            label="Ascite"
            options={['Absent', 'Minime', 'Modérée', 'Abondante']}
            value={physique.ascite}
            onChange={(v) => updatePhysique('ascite', v)} />

        </div>
      </div>
    </div>);

}
// ─── TAB 5: Antécédents ─────────────────────────────────────────────────────
interface AntecedentsFormTabProps {
  antecedents: Antecedents;
  updateAntecedents: (field: keyof Antecedents, value: any) => void;
}
function AntecedentsFormTab({
  antecedents,
  updateAntecedents
}: AntecedentsFormTabProps) {
  return (
    <div className="space-y-4">
      {/* Antécédents personnels */}
      <div>
        <div className={sectionHeaderClass}>
          <ClipboardListIcon size={12} className="text-red-500" />
          Antécédents Cardiovasculaires Personnels
        </div>
        <div className="grid grid-cols-5 gap-2">
          <CheckboxField
            label="IDM (Infarctus)"
            checked={antecedents.idm}
            onChange={(v) => updateAntecedents('idm', v)} />

          <CheckboxField
            label="AVC / AIT"
            checked={antecedents.avc}
            onChange={(v) => updateAntecedents('avc', v)} />

          <CheckboxField
            label="Fibrillation auriculaire"
            checked={antecedents.fa}
            onChange={(v) => updateAntecedents('fa', v)} />

          <CheckboxField
            label="Insuffisance cardiaque"
            checked={antecedents.ic}
            onChange={(v) => updateAntecedents('ic', v)} />

          <CheckboxField
            label="HTA"
            checked={antecedents.hta}
            onChange={(v) => updateAntecedents('hta', v)} />

          <CheckboxField
            label="Diabète"
            checked={antecedents.diabete}
            onChange={(v) => updateAntecedents('diabete', v)} />

          <CheckboxField
            label="Dyslipidémie"
            checked={antecedents.dyslipidemie}
            onChange={(v) => updateAntecedents('dyslipidemie', v)} />

          <CheckboxField
            label="Angor stable/instable"
            checked={antecedents.angor}
            onChange={(v) => updateAntecedents('angor', v)} />

          <CheckboxField
            label="Pontage coronarien"
            checked={antecedents.pontage}
            onChange={(v) => updateAntecedents('pontage', v)} />

          <CheckboxField
            label="Stent coronarien"
            checked={antecedents.stent}
            onChange={(v) => updateAntecedents('stent', v)} />

        </div>
      </div>

      {/* Facteurs de risque */}
      <div>
        <div className={sectionHeaderClass}>
          <AlertTriangleIcon size={12} className="text-orange-500" />
          Facteurs de Risque Cardiovasculaire
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Tabagisme</label>
            <div className="flex flex-wrap gap-1.5">
              {[
              'Non-fumeur',
              'Fumeur actif',
              'Sevré < 3 ans',
              'Sevré > 3 ans'].
              map((opt) =>
              <button
                key={opt}
                type="button"
                onClick={() => updateAntecedents('tabac', opt)}
                className={`px-2 py-1 text-xs rounded border transition-colors ${antecedents.tabac === opt ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'}`}>

                  {opt}
                </button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <CheckboxField
              label="Obésité (IMC ≥ 30)"
              checked={antecedents.obesite}
              onChange={(v) => updateAntecedents('obesite', v)} />

            <CheckboxField
              label="Sédentarité"
              checked={antecedents.sedentarite}
              onChange={(v) => updateAntecedents('sedentarite', v)} />

            <CheckboxField
              label="Stress chronique"
              checked={antecedents.stress}
              onChange={(v) => updateAntecedents('stress', v)} />

            <CheckboxField
              label="Alcool"
              checked={antecedents.alcool}
              onChange={(v) => updateAntecedents('alcool', v)} />

          </div>
        </div>
      </div>

      {/* Antécédents familiaux */}
      <div>
        <div className={sectionHeaderClass}>
          <UserIcon size={12} className="text-red-500" />
          Antécédents Familiaux Cardiovasculaires
        </div>
        <div className="grid grid-cols-4 gap-2">
          <CheckboxField
            label="Mort subite (< 55 ans H, < 65 ans F)"
            checked={antecedents.famMortSubite}
            onChange={(v) => updateAntecedents('famMortSubite', v)} />

          <CheckboxField
            label="Coronaropathie précoce"
            checked={antecedents.famCoronaro}
            onChange={(v) => updateAntecedents('famCoronaro', v)} />

          <CheckboxField
            label="HTA familiale"
            checked={antecedents.famHTA}
            onChange={(v) => updateAntecedents('famHTA', v)} />

          <CheckboxField
            label="Diabète familial"
            checked={antecedents.famDiabete}
            onChange={(v) => updateAntecedents('famDiabete', v)} />

        </div>
      </div>

      {/* Traitements en cours */}
      <div>
        <div className={sectionHeaderClass}>
          <PillIcon size={12} className="text-red-500" />
          Traitements Cardiovasculaires en Cours
        </div>
        <div className="grid grid-cols-4 gap-2 mb-3">
          <CheckboxField
            label="Anticoagulants (AVK/NACO)"
            checked={antecedents.anticoagulants}
            onChange={(v) => updateAntecedents('anticoagulants', v)} />

          <CheckboxField
            label="Antiagrégants (Aspirine/Clopidogrel)"
            checked={antecedents.antiagregants}
            onChange={(v) => updateAntecedents('antiagregants', v)} />

          <CheckboxField
            label="Bêtabloquants"
            checked={antecedents.betabloquants}
            onChange={(v) => updateAntecedents('betabloquants', v)} />

          <CheckboxField
            label="IEC / ARA2"
            checked={antecedents.iecAra2}
            onChange={(v) => updateAntecedents('iecAra2', v)} />

          <CheckboxField
            label="Statines"
            checked={antecedents.statines}
            onChange={(v) => updateAntecedents('statines', v)} />

          <CheckboxField
            label="Diurétiques"
            checked={antecedents.diuretiques}
            onChange={(v) => updateAntecedents('diuretiques', v)} />

          <CheckboxField
            label="Antiarythmiques"
            checked={antecedents.antiarythmiques}
            onChange={(v) => updateAntecedents('antiarythmiques', v)} />

        </div>
        <div>
          <label className={labelClass}>
            Autres médicaments (non cardiovasculaires)
          </label>
          <textarea
            rows={2}
            placeholder="Lister les autres traitements en cours..."
            value={antecedents.autresMedicaments}
            onChange={(e) =>
            updateAntecedents('autresMedicaments', e.target.value)
            }
            className={`${inputClass} resize-none`} />

        </div>
      </div>
    </div>);

}
// ─── TAB 6: Examens Complémentaires ─────────────────────────────────────────
interface ComplementairesFormTabProps {
  complementaires: ComplementairesData;
  updateComplementaires: (
  field: keyof ComplementairesData,
  value: string)
  => void;
}
function ComplementairesFormTab({
  complementaires,
  updateComplementaires
}: ComplementairesFormTabProps) {
  return (
    <div className="space-y-4">
      {/* ECG */}
      <div>
        <div className={sectionHeaderClass}>
          <ZapIcon size={12} className="text-orange-500" />
          ECG (Électrocardiogramme)
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div>
            <label className={labelClass}>Rythme *</label>
            <select
              value={complementaires.ecgRythme}
              onChange={(e) =>
              updateComplementaires('ecgRythme', e.target.value)
              }
              className={inputClass}>

              <option value="">Sélectionner...</option>
              <option>Sinusal</option>
              <option>Fibrillation auriculaire</option>
              <option>Flutter auriculaire</option>
              <option>Tachycardie ventriculaire</option>
              <option>Bradycardie sinusale</option>
              <option>Bloc sino-auriculaire</option>
              <option>Rythme électro-entraîné</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Fréquence cardiaque (bpm)</label>
            <input
              type="number"
              placeholder="ex: 72"
              value={complementaires.ecgFc}
              onChange={(e) => updateComplementaires('ecgFc', e.target.value)}
              className={inputClass} />

          </div>
          <div>
            <label className={labelClass}>Axe électrique</label>
            <select
              value={complementaires.ecgAxe}
              onChange={(e) => updateComplementaires('ecgAxe', e.target.value)}
              className={inputClass}>

              <option value="">Sélectionner...</option>
              <option>Normal (0° à +90°)</option>
              <option>Déviation gauche</option>
              <option>Déviation droite</option>
              <option>Axe indéterminé</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Espace PR (ms)</label>
            <input
              type="text"
              placeholder="ex: 160ms"
              value={complementaires.ecgPr}
              onChange={(e) => updateComplementaires('ecgPr', e.target.value)}
              className={inputClass} />

          </div>
          <div>
            <label className={labelClass}>Durée QRS (ms)</label>
            <input
              type="text"
              placeholder="ex: 90ms"
              value={complementaires.ecgQrs}
              onChange={(e) => updateComplementaires('ecgQrs', e.target.value)}
              className={inputClass} />

            {complementaires.ecgQrs &&
            parseInt(complementaires.ecgQrs) > 120 &&
            <div className="text-xs text-red-600 mt-0.5">
                  ⚠ Élargissement QRS — BBG/BBD?
                </div>
            }
          </div>
          <div>
            <label className={labelClass}>Espace QT (ms)</label>
            <input
              type="text"
              placeholder="ex: 420ms"
              value={complementaires.ecgQt}
              onChange={(e) => updateComplementaires('ecgQt', e.target.value)}
              className={inputClass} />

            {complementaires.ecgQt && parseInt(complementaires.ecgQt) > 440 &&
            <div className="text-xs text-red-600 mt-0.5">
                ⚠ QT long — Risque arythmique
              </div>
            }
          </div>
          <div className="col-span-2">
            <label className={labelClass}>Anomalies ECG</label>
            <input
              type="text"
              placeholder="ex: Sus-décalage ST V1-V4, Onde Q en D2D3aVF..."
              value={complementaires.ecgAnomalies}
              onChange={(e) =>
              updateComplementaires('ecgAnomalies', e.target.value)
              }
              className={inputClass} />

          </div>
        </div>
      </div>

      {/* Biologie */}
      <div>
        <div className={sectionHeaderClass}>
          <DropletIcon size={12} className="text-green-500" />
          Biologie Cardiaque
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div>
            <label className={labelClass}>Troponine (µg/L)</label>
            <input
              type="text"
              placeholder="ex: 0.04"
              value={complementaires.troponine}
              onChange={(e) =>
              updateComplementaires('troponine', e.target.value)
              }
              className={inputClass} />

            <div className="text-xs text-gray-400 mt-0.5">
              Normale: &lt; 0.04 µg/L
            </div>
          </div>
          <div>
            <label className={labelClass}>BNP / NT-proBNP (pg/mL)</label>
            <input
              type="text"
              placeholder="ex: 100"
              value={complementaires.bnp}
              onChange={(e) => updateComplementaires('bnp', e.target.value)}
              className={inputClass} />

            <div className="text-xs text-gray-400 mt-0.5">
              BNP &lt; 100 / NT-proBNP &lt; 300
            </div>
          </div>
          <div>
            <label className={labelClass}>NFS</label>
            <input
              type="text"
              placeholder="ex: Normal, Anémie..."
              value={complementaires.nfs}
              onChange={(e) => updateComplementaires('nfs', e.target.value)}
              className={inputClass} />

          </div>
          <div>
            <label className={labelClass}>Ionogramme</label>
            <input
              type="text"
              placeholder="ex: Na+ 138, K+ 4.2"
              value={complementaires.ionogramme}
              onChange={(e) =>
              updateComplementaires('ionogramme', e.target.value)
              }
              className={inputClass} />

          </div>
          <div>
            <label className={labelClass}>Créatinine (µmol/L)</label>
            <input
              type="text"
              placeholder="ex: 90"
              value={complementaires.creatinine}
              onChange={(e) =>
              updateComplementaires('creatinine', e.target.value)
              }
              className={inputClass} />

            <div className="text-xs text-gray-400 mt-0.5">
              Normale: H 62–115, F 44–97
            </div>
          </div>
          <div>
            <label className={labelClass}>Glycémie (mmol/L)</label>
            <input
              type="text"
              placeholder="ex: 5.5"
              value={complementaires.glycemie}
              onChange={(e) =>
              updateComplementaires('glycemie', e.target.value)
              }
              className={inputClass} />

            <div className="text-xs text-gray-400 mt-0.5">
              Normale: 3.9–6.1 mmol/L
            </div>
          </div>
          <div>
            <label className={labelClass}>LDL-Cholestérol (mmol/L)</label>
            <input
              type="text"
              placeholder="ex: 2.5"
              value={complementaires.ldl}
              onChange={(e) => updateComplementaires('ldl', e.target.value)}
              className={inputClass} />

            <div className="text-xs text-gray-400 mt-0.5">
              Cible: &lt; 1.8 (haut risque)
            </div>
          </div>
          <div>
            <label className={labelClass}>HDL-Cholestérol (mmol/L)</label>
            <input
              type="text"
              placeholder="ex: 1.2"
              value={complementaires.hdl}
              onChange={(e) => updateComplementaires('hdl', e.target.value)}
              className={inputClass} />

          </div>
          <div>
            <label className={labelClass}>Cholestérol total (mmol/L)</label>
            <input
              type="text"
              placeholder="ex: 5.2"
              value={complementaires.cholTotal}
              onChange={(e) =>
              updateComplementaires('cholTotal', e.target.value)
              }
              className={inputClass} />

          </div>
          <div>
            <label className={labelClass}>Triglycérides (mmol/L)</label>
            <input
              type="text"
              placeholder="ex: 1.5"
              value={complementaires.triglycerides}
              onChange={(e) =>
              updateComplementaires('triglycerides', e.target.value)
              }
              className={inputClass} />

            <div className="text-xs text-gray-400 mt-0.5">
              Normale: &lt; 1.7 mmol/L
            </div>
          </div>
        </div>
      </div>

      {/* Imagerie */}
      <div>
        <div className={sectionHeaderClass}>
          <FileTextIcon size={12} className="text-red-500" />
          Imagerie Cardiaque
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Échocardiographie — FEVG (%)</label>
            <input
              type="text"
              placeholder="ex: 55%"
              value={complementaires.echoFevg}
              onChange={(e) =>
              updateComplementaires('echoFevg', e.target.value)
              }
              className={inputClass} />

            <div className="text-xs text-gray-400 mt-0.5">
              Normale: ≥ 55% · Altérée: 40–54% · Sévère: &lt; 40%
            </div>
            {complementaires.echoFevg &&
            parseFloat(complementaires.echoFevg) < 40 &&
            <div className="text-xs text-red-600 mt-0.5 font-medium">
                  ⚠ Dysfonction systolique sévère
                </div>
            }
          </div>
          <div>
            <label className={labelClass}>Dimensions cavitaires</label>
            <input
              type="text"
              placeholder="ex: VG 55mm, OG 42mm, VD normal"
              value={complementaires.echoDimensions}
              onChange={(e) =>
              updateComplementaires('echoDimensions', e.target.value)
              }
              className={inputClass} />

          </div>
          <div>
            <label className={labelClass}>Valves</label>
            <input
              type="text"
              placeholder="ex: IM modérée, IA légère, valves normales"
              value={complementaires.echoValves}
              onChange={(e) =>
              updateComplementaires('echoValves', e.target.value)
              }
              className={inputClass} />

          </div>
          <div>
            <label className={labelClass}>
              Autres données échocardiographiques
            </label>
            <input
              type="text"
              placeholder="ex: épanchement péricardique, HTAP..."
              value={complementaires.echoAutres}
              onChange={(e) =>
              updateComplementaires('echoAutres', e.target.value)
              }
              className={inputClass} />

          </div>
          <div>
            <label className={labelClass}>Coronarographie</label>
            <input
              type="text"
              placeholder="ex: Sténose IVA 70%, tronc sain"
              value={complementaires.coronarographie}
              onChange={(e) =>
              updateComplementaires('coronarographie', e.target.value)
              }
              className={inputClass} />

          </div>
          <div>
            <label className={labelClass}>
              Scanner cardiaque / Coroscanner
            </label>
            <input
              type="text"
              placeholder="ex: Score calcique 450, sténose LAD 60%"
              value={complementaires.scanner}
              onChange={(e) => updateComplementaires('scanner', e.target.value)}
              className={inputClass} />

          </div>
          <div>
            <label className={labelClass}>Scintigraphie myocardique</label>
            <input
              type="text"
              placeholder="ex: Ischémie antérieure réversible"
              value={complementaires.scintigraphie}
              onChange={(e) =>
              updateComplementaires('scintigraphie', e.target.value)
              }
              className={inputClass} />

          </div>
        </div>
      </div>
    </div>);

}
// ─── TAB 7: Ordonnances & Suivi ─────────────────────────────────────────────
interface OrdonnancesFormTabProps {
  ordonnances: OrdonnancesData;
  updateOrdonnances: (field: keyof OrdonnancesData, value: any) => void;
}
function OrdonnancesFormTab({
  ordonnances,
  updateOrdonnances
}: OrdonnancesFormTabProps) {
  return (
    <div className="space-y-4">
      {/* Diagnostic */}
      <div>
        <div className={sectionHeaderClass}>
          <FileTextIcon size={12} className="text-red-500" />
          Diagnostic & Conclusion
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Diagnostic principal *</label>
            <select
              value={ordonnances.diagnostic}
              onChange={(e) => updateOrdonnances('diagnostic', e.target.value)}
              className={inputClass}>

              <option value="">Sélectionner...</option>
              <option>Syndrome coronarien aigu (SCA ST+)</option>
              <option>Syndrome coronarien aigu (SCA ST-)</option>
              <option>Angor stable</option>
              <option>Insuffisance cardiaque aiguë</option>
              <option>Insuffisance cardiaque chronique</option>
              <option>Fibrillation auriculaire</option>
              <option>Hypertension artérielle</option>
              <option>Valvulopathie</option>
              <option>Péricardite aiguë</option>
              <option>Embolie pulmonaire</option>
              <option>Tachycardie supraventriculaire</option>
              <option>Bloc auriculo-ventriculaire</option>
              <option>Bilan cardiologique normal</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Conclusion clinique</label>
            <textarea
              rows={3}
              placeholder="Résumé clinique, orientation diagnostique, plan de prise en charge..."
              value={ordonnances.conclusion}
              onChange={(e) => updateOrdonnances('conclusion', e.target.value)}
              className={`${inputClass} resize-none`} />

          </div>
        </div>
      </div>

      {/* Prescription */}
      <div>
        <div className={sectionHeaderClass}>
          <PillIcon size={12} className="text-green-500" />
          Prescription Médicamenteuse
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <label className={labelClass}>Médicaments prescrits</label>
            <textarea
              rows={4}
              placeholder="Ex: Aspirine 100mg - 1cp/j&#10;Bisoprolol 5mg - 1cp/j le matin&#10;Atorvastatine 40mg - 1cp/j le soir&#10;Ramipril 5mg - 1cp/j"
              value={ordonnances.medicaments}
              onChange={(e) => updateOrdonnances('medicaments', e.target.value)}
              className={`${inputClass} resize-none font-mono`} />

          </div>
          <div className="space-y-2">
            <div>
              <label className={labelClass}>Durée du traitement</label>
              <select
                value={ordonnances.duree}
                onChange={(e) => updateOrdonnances('duree', e.target.value)}
                className={inputClass}>

                <option value="">Sélectionner...</option>
                <option>7 jours</option>
                <option>1 mois</option>
                <option>3 mois</option>
                <option>6 mois</option>
                <option>1 an</option>
                <option>Traitement au long cours</option>
              </select>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-2">
              <div className="text-xs font-semibold text-red-700 mb-1.5">
                Médicaments courants
              </div>
              {[
              'Aspirine 100mg',
              'Bisoprolol 5mg',
              'Ramipril 5mg',
              'Atorvastatine 40mg',
              'Furosémide 40mg',
              'Apixaban 5mg'].
              map((med) =>
              <button
                key={med}
                type="button"
                onClick={() =>
                updateOrdonnances(
                  'medicaments',
                  ordonnances.medicaments + (
                  ordonnances.medicaments ? '\n' : '') +
                  med +
                  ' - '
                )
                }
                className="block w-full text-left text-xs text-red-600 hover:bg-red-100 px-1 py-0.5 rounded">

                  + {med}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mesures hygiéno-diététiques */}
      <div>
        <div className={sectionHeaderClass}>
          <ActivityIcon size={12} className="text-orange-500" />
          Mesures Hygiéno-Diététiques & Éducation
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <CheckboxField
              label="Régime hyposodé (< 2g NaCl/j)"
              checked={ordonnances.regimeHyposode}
              onChange={(v) => updateOrdonnances('regimeHyposode', v)} />

            <CheckboxField
              label="Restriction hydrique (1.5L/j)"
              checked={ordonnances.restrictionHydrique}
              onChange={(v) => updateOrdonnances('restrictionHydrique', v)} />

            <CheckboxField
              label="Pesée quotidienne (alerte +2kg)"
              checked={ordonnances.peseeQuotidienne}
              onChange={(v) => updateOrdonnances('peseeQuotidienne', v)} />

            <div>
              <label className={labelClass}>
                Activité physique recommandée
              </label>
              <select
                value={ordonnances.activitePhysique}
                onChange={(e) =>
                updateOrdonnances('activitePhysique', e.target.value)
                }
                className={inputClass}>

                <option value="">Sélectionner...</option>
                <option>Repos strict</option>
                <option>Activité légère (marche douce)</option>
                <option>30 min marche/j</option>
                <option>Réadaptation cardiaque</option>
                <option>Activité normale</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>
              Notes d'éducation thérapeutique
            </label>
            <textarea
              rows={4}
              placeholder="Instructions au patient, signes d'alarme à surveiller, quand consulter en urgence..."
              value={ordonnances.education}
              onChange={(e) => updateOrdonnances('education', e.target.value)}
              className={`${inputClass} resize-none`} />

          </div>
        </div>
      </div>

      {/* Prochain RDV */}
      <div>
        <div className={sectionHeaderClass}>
          <CalendarIcon size={12} className="text-orange-500" />
          Planification du Suivi
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className={labelClass}>Date du prochain RDV</label>
            <input
              type="date"
              value={ordonnances.prochainRdv}
              onChange={(e) => updateOrdonnances('prochainRdv', e.target.value)}
              className={inputClass} />

          </div>
          <div>
            <label className={labelClass}>Type de prochain RDV</label>
            <select
              value={ordonnances.typeRdv}
              onChange={(e) => updateOrdonnances('typeRdv', e.target.value)}
              className={inputClass}>

              <option value="">Sélectionner...</option>
              <option>Consultation de contrôle</option>
              <option>Échocardiographie de contrôle</option>
              <option>Holter ECG 24h</option>
              <option>Épreuve d'effort</option>
              <option>Coronarographie</option>
              <option>Staff multidisciplinaire</option>
              <option>Hospitalisation programmée</option>
            </select>
          </div>
          <div className="flex items-end">
            <div className="bg-green-50 border border-green-200 rounded-lg p-2 w-full">
              <div className="text-xs font-semibold text-green-700 mb-1">
                Résumé de la consultation
              </div>
              <div className="text-xs text-green-600">
                {ordonnances.diagnostic ?
                `✓ Diagnostic: ${ordonnances.diagnostic}` :
                '— Diagnostic non renseigné'}
              </div>
              <div className="text-xs text-green-600 mt-0.5">
                {ordonnances.prochainRdv ?
                `✓ RDV: ${ordonnances.prochainRdv}` :
                '— RDV non planifié'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}
