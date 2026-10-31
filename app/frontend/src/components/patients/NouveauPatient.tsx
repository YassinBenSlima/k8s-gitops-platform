import React, { useEffect, useState } from 'react';
import { patientService } from '../../services/patientService';
import { usePatient } from '../../contexts/PatientContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XIcon,
  UserIcon,
  UsersIcon,
  FileTextIcon,
  PhoneIcon,
  CalendarIcon,
  SaveIcon,
  PlusIcon,
  TrashIcon,
  DollarSignIcon,
  ClockIcon,
  CreditCardIcon,
  StethoscopeIcon,
  ShareIcon,
  ActivityIcon,
  HeartIcon,
} from 'lucide-react';

interface NouveauPatientProps {
  onClose: () => void;
  onSave: (patient: any) => void;
}

const ic = 'block w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-all bg-white text-sm text-gray-900';
const lc = 'block text-xs font-medium text-gray-600 mb-1';
const sc = 'bg-gray-50 rounded-lg p-3 border border-gray-200';
const sh = 'text-xs font-semibold text-gray-700 mb-2.5 flex items-center gap-1.5';

const NouveauPatient: React.FC<NouveauPatientProps> = ({ onClose, onSave }) => {
  const { refresh } = usePatient();
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [activeTab, setActiveTab] = useState('personal');
  const [copyToPayerEnabled, setCopyToPayerEnabled] = useState(false);
  const [copyToEmergencyEnabled, setCopyToEmergencyEnabled] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', sexe: '', dateOfBirth: '', birthPlace: '',
    email: '', phonePrimary: '', phoneSecondary: '',
    address: '', city: '', postalCode: '',
    groupeSanguin: '', taille: '', poids: '', imc: '', tourDeTaille: '',
    profession: '', establishment: '', schoolLevel: '', insurance: '',
    dossierNumber: '', treatingDoctor: '', medicalHistory: '', allergies: '',
    legalGuardian: { nom: '', prenom: '', adresse: '', phone1: '', phone2: '' },
    payer: { nom: '', prenom: '', adresse: '', phone1: '', phone2: '' },
    emergencyContact: { nom: '', prenom: '', adresse: '', phone1: '', phone2: '' },
    referringDentist: '', referralSource: '', referralSocialPlatform: '',
    referralPatientName: '', referralDentistName: '',
    treatment: '',
    treatmentStartDate: new Date().toISOString().split('T')[0],
    treatmentDuration: '', treatmentProgress: 0, treatmentAmount: '',
    enablePaymentPlan: false, numberOfInstallments: '3', frequency: 'monthly',
    firstPaymentDate: new Date().toISOString().split('T')[0], notes: '',
  });
  const [installments, setInstallments] = useState<Array<{ id: number; amount: string; dueDate: string; status: string; isCustom?: boolean }>>([]);
  const [customInstallments, setCustomInstallments] = useState<Array<{ id: number; amount: string; dueDate: string }>>([]);

  useEffect(() => {
    const h = parseFloat(formData.taille);
    const w = parseFloat(formData.poids);
    if (h > 0 && w > 0) {
      const val = (w / Math.pow(h / 100, 2)).toFixed(1);
      const n = parseFloat(val);
      const label = n < 18.5 ? 'Maigreur' : n < 25 ? 'Normal' : n < 30 ? 'Surpoids' : 'Obésité';
      setFormData(prev => ({ ...prev, imc: `${val} (${label})` }));
    } else {
      setFormData(prev => ({ ...prev, imc: '' }));
    }
  }, [formData.taille, formData.poids]);

  const calcRemaining = () => {
    const total = parseFloat(formData.treatmentAmount) || 0;
    const custom = customInstallments.reduce((s, i) => s + (parseFloat(i.amount) || 0), 0);
    return Math.max(0, total - custom);
  };
  const handleAddCustom = () => setCustomInstallments([...customInstallments, { id: Date.now(), amount: '', dueDate: new Date().toISOString().split('T')[0] }]);
  const handleRemoveCustom = (id: number) => setCustomInstallments(customInstallments.filter(i => i.id !== id));
  const handleCustomChange = (id: number, field: string, value: string) =>
    setCustomInstallments(customInstallments.map(i => i.id === id ? { ...i, [field]: value } : i));

  const generateInstallments = (data: typeof formData) => {
    if (!data.treatmentAmount || !data.numberOfInstallments || !data.firstPaymentDate) return;
    const rem = calcRemaining();
    if (rem <= 0) {
      setInstallments([...customInstallments].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()).map((i, idx) => ({ id: idx + 1, amount: i.amount, dueDate: i.dueDate, status: 'pending', isCustom: true })));
      return;
    }
    const num = parseInt(data.numberOfInstallments);
    const amt = (rem / num).toFixed(2);
    const auto = [];
    const start = new Date(data.firstPaymentDate);
    for (let i = 0; i < num; i++) {
      const d = new Date(start);
      if (data.frequency === 'weekly') d.setDate(start.getDate() + i * 7);
      else if (data.frequency === 'biweekly') d.setDate(start.getDate() + i * 14);
      else if (data.frequency === 'monthly') d.setMonth(start.getMonth() + i);
      else d.setMonth(start.getMonth() + i * 3);
      auto.push({ id: customInstallments.length + i + 1, amount: i === num - 1 ? (rem - parseFloat(amt) * (num - 1)).toFixed(2) : amt, dueDate: d.toISOString().split('T')[0], status: 'pending', isCustom: false });
    }
    const all = [...customInstallments.map((i, idx) => ({ id: idx + 1, amount: i.amount, dueDate: i.dueDate, status: 'pending', isCustom: true })), ...auto].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()).map((i, idx) => ({ ...i, id: idx + 1 }));
    setInstallments(all);
  };

  useEffect(() => { if (formData.enablePaymentPlan && formData.treatmentAmount) generateInstallments(formData); }, [customInstallments, formData.treatmentAmount]);
  useEffect(() => { if (copyToPayerEnabled) setFormData(p => ({ ...p, payer: { ...p.legalGuardian } })); }, [copyToPayerEnabled, formData.legalGuardian]);
  useEffect(() => { if (copyToEmergencyEnabled) setFormData(p => ({ ...p, emergencyContact: { ...p.legalGuardian } })); }, [copyToEmergencyEnabled, formData.legalGuardian]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const nv = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData({ ...formData, [name]: nv });
    if (['treatmentAmount', 'numberOfInstallments', 'frequency', 'firstPaymentDate'].includes(name) && formData.enablePaymentPlan)
      setTimeout(() => generateInstallments({ ...formData, [name]: nv }), 100);
  };
  const handleNestedChange = (section: 'legalGuardian' | 'payer' | 'emergencyContact', field: string, value: string) =>
    setFormData({ ...formData, [section]: { ...formData[section], [field]: value } });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError('');
    setIsSaving(true);
    try {
      const payload = {
        prenom: formData.firstName,
        nom: formData.lastName,
        genre: formData.sexe === 'M' ? 1 : 2,
        dateNaissance: formData.dateOfBirth,
        lieuNaissance: formData.birthPlace || undefined,
        email: formData.email || undefined,
        telephone: formData.phonePrimary,
        telephoneSecondaire: formData.phoneSecondary || undefined,
        adresse: formData.address || undefined,
        ville: formData.city || undefined,
        codePostal: formData.postalCode || undefined,
        groupeSanguin: formData.groupeSanguin || undefined,
        taille: formData.taille ? parseFloat(formData.taille) : undefined,
        poids: formData.poids ? parseFloat(formData.poids) : undefined,
        tourDeTaille: formData.tourDeTaille || undefined,
        profession: formData.profession || undefined,
        assurance: formData.insurance || undefined,
        numeroCIN: formData.dossierNumber || undefined,
        medecineTraitant: formData.treatingDoctor || undefined,
        pathologiesChroniques: formData.medicalHistory || undefined,
        contactUrgenceNom: formData.emergencyContact.nom || undefined,
        contactUrgencePrenom: formData.emergencyContact.prenom || undefined,
        contactUrgenceTelephone: formData.emergencyContact.phone1 || undefined,
        contactUrgenceAdresse: formData.emergencyContact.adresse || undefined,
        representantLegal: formData.legalGuardian.nom ? {
          prenom: formData.legalGuardian.prenom,
          nom: formData.legalGuardian.nom,
          telephone: formData.legalGuardian.phone1,
          telephoneSecondaire: formData.legalGuardian.phone2 || undefined,
          adresse: formData.legalGuardian.adresse || undefined,
        } : undefined,
      };
      const newPatient = await patientService.create(payload);
      await refresh();
      onSave({
        id: newPatient.id,
        name: `${newPatient.prenom} ${newPatient.nom}`,
        numeroDossier: newPatient.numeroDossier,
      });
      onClose();
    } catch (err: unknown) {
      setSaveError(err instanceof Error ? err.message : 'Erreur lors de la création du patient');
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'personal', name: 'Dossier Patient', icon: <UserIcon className="w-3.5 h-3.5" /> },
    { id: 'tutors', name: 'Contacts', icon: <UsersIcon className="w-3.5 h-3.5" /> },
    { id: 'extra', name: 'Infos médicales', icon: <FileTextIcon className="w-3.5 h-3.5" /> },
 ];

  const imcColor = formData.imc.includes('Surpoids') || formData.imc.includes('Obésité') ? 'text-orange-600' : formData.imc.includes('Maigreur') ? 'text-yellow-600' : 'text-gray-900';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 16 }} transition={{ type: 'spring', stiffness: 300, damping: 28 }} className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[88vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-xl flex-shrink-0">
          <div>
            <h2 className="text-sm font-semibold text-red-800">Nouveau Patient</h2>
            <p className="text-xs text-red-600 mt-0.5">Cardiologie • Créer un nouveau dossier patient</p>
          </div>
          <button onClick={onClose} className="rounded-md p-1 text-red-600 hover:bg-red-100" aria-label="Fermer">
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-white overflow-x-auto flex-shrink-0">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium whitespace-nowrap transition-all border-b-2 ${activeTab === tab.id ? 'border-red-500 text-red-600 bg-red-50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>
              {tab.icon}{tab.name}
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto p-3">
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">

              {activeTab === 'personal' && (
                <motion.div key="personal" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.15 }} className="space-y-3">

                  {/* Identité */}
                  <div className={sc}>
                    <h3 className={sh}><UserIcon className="w-3.5 h-3.5 text-red-500" />Identité du patient</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className={lc}>Prénom *</label><input type="text" name="firstName" required className={ic} value={formData.firstName} onChange={handleInputChange} /></div>
                      <div><label className={lc}>Nom *</label><input type="text" name="lastName" required className={ic} value={formData.lastName} onChange={handleInputChange} /></div>
                      <div><label className={lc}>Date de naissance *</label><input type="date" name="dateOfBirth" required className={ic} value={formData.dateOfBirth} onChange={handleInputChange} /></div>
                      <div><label className={lc}>Lieu de naissance</label><input type="text" name="birthPlace" className={ic} value={formData.birthPlace} onChange={handleInputChange} /></div>
                      <div>
                        <label className={lc}>Sexe</label>
                        <select name="sexe" className={ic} value={formData.sexe} onChange={handleInputChange}>
                          <option value="">Sélectionner</option>
                          <option value="M">Homme</option>
                          <option value="F">Femme</option>
                        </select>
                      </div>
                      <div>
                        <label className={lc}>Groupe sanguin</label>
                        <select name="groupeSanguin" className={ic} value={formData.groupeSanguin} onChange={handleInputChange}>
                          <option value="">Sélectionner</option>
                          {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                      </div>
                      <div><label className={lc}>Email</label><input type="email" name="email" className={ic} value={formData.email} onChange={handleInputChange} /></div>
                      <div>
                        <label className={lc}>Mutuelle</label>
                        <select name="insurance" className={ic} value={formData.insurance} onChange={handleInputChange}>
                          <option value="">Sélectionner</option>
                          <option value="CNAM">CNAM</option>
                          <option value="CNRPS">CNRPS</option>
                          <option value="Assurance Carte">Assurance Carte</option>
                          <option value="MGPTT">MGPTT</option>
                          <option value="MDS">MDS</option>
                        </select>
                      </div>
                      <div className="col-span-2"><label className={lc}>Adresse</label><input type="text" name="address" className={ic} value={formData.address} onChange={handleInputChange} /></div>
                      <div><label className={lc}>Ville</label><input type="text" name="city" className={ic} value={formData.city} onChange={handleInputChange} /></div>
                      <div><label className={lc}>Code postal</label><input type="text" name="postalCode" className={ic} value={formData.postalCode} onChange={handleInputChange} /></div>
                    </div>
                  </div>

                  {/* Données physiques */}
                  <div className={sc}>
                    <h3 className={sh}><ActivityIcon className="w-3.5 h-3.5 text-red-500" />Données physiques</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className={lc}>Taille (cm)</label><input type="number" name="taille" min="50" max="250" placeholder="ex: 175" className={ic} value={formData.taille} onChange={handleInputChange} /></div>
                      <div><label className={lc}>Poids (kg)</label><input type="number" name="poids" min="1" max="500" placeholder="ex: 80" className={ic} value={formData.poids} onChange={handleInputChange} /></div>
                      <div>
                        <label className={lc}>IMC (calculé automatiquement)</label>
                        <div className={`px-3 py-2 rounded-lg border border-gray-200 bg-gray-100 text-sm font-semibold ${formData.imc ? imcColor : 'text-gray-400'}`}>
                          {formData.imc || ' calculé à partir de taille / poids'}
                        </div>
                      </div>
                      <div><label className={lc}>Tour de taille (cm)</label><input type="number" name="tourDeTaille" min="30" max="300" placeholder="ex: 88" className={ic} value={formData.tourDeTaille} onChange={handleInputChange} /></div>
                    </div>
                  </div>

                  {/* Contact & Profession */}
                  <div className={sc}>
                    <h3 className={sh}><PhoneIcon className="w-3.5 h-3.5 text-red-500" />Contact &amp; Profession</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className={lc}>Téléphone principal *</label><input type="tel" name="phonePrimary" required className={ic} value={formData.phonePrimary} onChange={handleInputChange} /></div>
                      <div><label className={lc}>Téléphone secondaire</label><input type="tel" name="phoneSecondary" className={ic} value={formData.phoneSecondary} onChange={handleInputChange} /></div>
                      <div><label className={lc}>Profession</label><input type="text" name="profession" className={ic} value={formData.profession} onChange={handleInputChange} /></div>
                      <div><label className={lc}>Établissement</label><input type="text" name="establishment" className={ic} value={formData.establishment} onChange={handleInputChange} /></div>
                      <div>
                        <label className={lc}>Niveau scolaire</label>
                        <select name="schoolLevel" className={ic} value={formData.schoolLevel} onChange={handleInputChange}>
                          <option value="">Sélectionner</option>
                          <option value="Primaire">Primaire</option>
                          <option value="Collège">Collège</option>
                          <option value="Lycée">Lycée</option>
                          <option value="Université">Université</option>
                          <option value="Autre">Autre</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'tutors' && (
                <motion.div key="tutors" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.15 }} className="space-y-3">

                  <div className={sc}>
                    <h3 className={sh}><UsersIcon className="w-3.5 h-3.5 text-red-500" />Représentant légal</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className={lc}>Prénom</label><input className={ic} value={formData.legalGuardian.prenom} onChange={e => handleNestedChange('legalGuardian','prenom',e.target.value)} /></div>
                      <div><label className={lc}>Nom</label><input className={ic} value={formData.legalGuardian.nom} onChange={e => handleNestedChange('legalGuardian','nom',e.target.value)} /></div>
                      <div className="col-span-2"><label className={lc}>Adresse</label><input className={ic} value={formData.legalGuardian.adresse} onChange={e => handleNestedChange('legalGuardian','adresse',e.target.value)} /></div>
                      <div><label className={lc}>Téléphone principal</label><input className={ic} value={formData.legalGuardian.phone1} onChange={e => handleNestedChange('legalGuardian','phone1',e.target.value)} /></div>
                      <div><label className={lc}>Téléphone secondaire</label><input className={ic} value={formData.legalGuardian.phone2} onChange={e => handleNestedChange('legalGuardian','phone2',e.target.value)} /></div>
                    </div>
                  </div>

                  <div className={sc}>
                    <div className="flex items-center justify-between mb-2.5">
                      <h3 className={sh} style={{marginBottom:0}}><CreditCardIcon className="w-3.5 h-3.5 text-red-500" />Payeur</h3>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <span className="text-[10px] text-gray-500">Même que représentant légal</span>
                        <div className="relative">
                          <input type="checkbox" checked={copyToPayerEnabled} onChange={e => { setCopyToPayerEnabled(e.target.checked); if (e.target.checked) setFormData(p => ({ ...p, payer: { ...p.legalGuardian } })); }} className="sr-only peer" />
                          <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-red-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
                        </div>
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className={lc}>Prénom</label><input disabled={copyToPayerEnabled} className={`${ic} ${copyToPayerEnabled?'opacity-50 cursor-not-allowed':''}`} value={formData.payer.prenom} onChange={e => handleNestedChange('payer','prenom',e.target.value)} /></div>
                      <div><label className={lc}>Nom</label><input disabled={copyToPayerEnabled} className={`${ic} ${copyToPayerEnabled?'opacity-50 cursor-not-allowed':''}`} value={formData.payer.nom} onChange={e => handleNestedChange('payer','nom',e.target.value)} /></div>
                      <div className="col-span-2"><label className={lc}>Adresse</label><input disabled={copyToPayerEnabled} className={`${ic} ${copyToPayerEnabled?'opacity-50 cursor-not-allowed':''}`} value={formData.payer.adresse} onChange={e => handleNestedChange('payer','adresse',e.target.value)} /></div>
                      <div><label className={lc}>Téléphone principal</label><input disabled={copyToPayerEnabled} className={`${ic} ${copyToPayerEnabled?'opacity-50 cursor-not-allowed':''}`} value={formData.payer.phone1} onChange={e => handleNestedChange('payer','phone1',e.target.value)} /></div>
                      <div><label className={lc}>Téléphone secondaire</label><input disabled={copyToPayerEnabled} className={`${ic} ${copyToPayerEnabled?'opacity-50 cursor-not-allowed':''}`} value={formData.payer.phone2} onChange={e => handleNestedChange('payer','phone2',e.target.value)} /></div>
                    </div>
                  </div>

                  <div className={sc}>
                    <div className="flex items-center justify-between mb-2.5">
                      <h3 className={sh} style={{marginBottom:0}}><PhoneIcon className="w-3.5 h-3.5 text-red-500" />Contact en cas d&apos;urgence</h3>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <span className="text-[10px] text-gray-500">Même que représentant légal</span>
                        <div className="relative">
                          <input type="checkbox" checked={copyToEmergencyEnabled} onChange={e => { setCopyToEmergencyEnabled(e.target.checked); if (e.target.checked) setFormData(p => ({ ...p, emergencyContact: { ...p.legalGuardian } })); }} className="sr-only peer" />
                          <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-red-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
                        </div>
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className={lc}>Prénom</label><input disabled={copyToEmergencyEnabled} className={`${ic} ${copyToEmergencyEnabled?'opacity-50 cursor-not-allowed':''}`} value={formData.emergencyContact.prenom} onChange={e => handleNestedChange('emergencyContact','prenom',e.target.value)} /></div>
                      <div><label className={lc}>Nom</label><input disabled={copyToEmergencyEnabled} className={`${ic} ${copyToEmergencyEnabled?'opacity-50 cursor-not-allowed':''}`} value={formData.emergencyContact.nom} onChange={e => handleNestedChange('emergencyContact','nom',e.target.value)} /></div>
                      <div className="col-span-2"><label className={lc}>Adresse</label><input disabled={copyToEmergencyEnabled} className={`${ic} ${copyToEmergencyEnabled?'opacity-50 cursor-not-allowed':''}`} value={formData.emergencyContact.adresse} onChange={e => handleNestedChange('emergencyContact','adresse',e.target.value)} /></div>
                      <div><label className={lc}>Téléphone principal</label><input disabled={copyToEmergencyEnabled} className={`${ic} ${copyToEmergencyEnabled?'opacity-50 cursor-not-allowed':''}`} value={formData.emergencyContact.phone1} onChange={e => handleNestedChange('emergencyContact','phone1',e.target.value)} /></div>
                      <div><label className={lc}>Téléphone secondaire</label><input disabled={copyToEmergencyEnabled} className={`${ic} ${copyToEmergencyEnabled?'opacity-50 cursor-not-allowed':''}`} value={formData.emergencyContact.phone2} onChange={e => handleNestedChange('emergencyContact','phone2',e.target.value)} /></div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'extra' && (
                <motion.div key="extra" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.15 }} className="space-y-3">

                  <div className={sc}>
                    <h3 className={sh}><FileTextIcon className="w-3.5 h-3.5 text-red-500" />Dossier médical</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className={lc}>Numéro de dossier</label><input type="text" name="dossierNumber" placeholder="#C-2025-" className={ic} value={formData.dossierNumber} onChange={handleInputChange} /></div>
                      <div><label className={lc}>Médecin traitant</label><input type="text" name="treatingDoctor" placeholder="Dr. ..." className={ic} value={formData.treatingDoctor} onChange={handleInputChange} /></div>
                      <div className="col-span-2"><label className={lc}>Antécédents médicaux</label><textarea name="medicalHistory" rows={3} placeholder="HTA, diabète, antécédents familiaux cardiovasculaires..." className={`${ic} resize-none`} value={formData.medicalHistory} onChange={handleInputChange} /></div>
                      <div className="col-span-2"><label className={lc}>Allergies &amp; intolérances</label><textarea name="allergies" rows={2} placeholder="Pénicilline, AINS, produits de contraste..." className={`${ic} resize-none`} value={formData.allergies} onChange={handleInputChange} /></div>
                    </div>
                  </div>

                  <div className={sc}>
                    <h3 className={sh}><StethoscopeIcon className="w-3.5 h-3.5 text-red-500" />Médecin référent</h3>
                    <div className="space-y-2">
                      <select name="referringDentist" className={ic} value={formData.referringDentist} onChange={handleInputChange}>
                        <option value="">Sélectionner un médecin référent</option>
                        <option value="Dr. Ben Ali">Dr. Ben Ali</option>
                        <option value="Dr. Salah">Dr. Salah</option>
                        <option value="Dr. Karoui">Dr. Karoui</option>
                        <option value="other">Autre (Saisir manuellement)</option>
                      </select>
                      {formData.referringDentist === 'other' && <input type="text" placeholder="Nom du médecin référent" className={ic} value={formData.referralDentistName} onChange={e => setFormData({ ...formData, referralDentistName: e.target.value })} />}
                    </div>
                  </div>

                  <div className={sc}>
                    <h3 className={sh}><ShareIcon className="w-3.5 h-3.5 text-red-500" />Comment le patient nous a-t-il connu ?</h3>
                    <div className="space-y-2">
                      {[{value:'social',label:'Réseaux sociaux'},{value:'patient',label:'Recommandé par un autre patient'},{value:'dentist',label:'Médecin / praticien'}].map(opt => (
                        <div key={opt.value}>
                          <label className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                            <input type="radio" name="referralSource" value={opt.value} checked={formData.referralSource===opt.value} onChange={handleInputChange} className="h-3.5 w-3.5 text-red-600 focus:ring-red-500" />
                            <span className="text-xs font-medium text-gray-700">{opt.label}</span>
                          </label>
                          {formData.referralSource==='social' && opt.value==='social' && (
                            <div className="ml-6 mt-1.5 grid grid-cols-2 gap-1.5">
                              {['Facebook','Instagram','TikTok','Autre'].map(p => (
                                <label key={p} className="flex items-center gap-1.5 p-1.5 border border-gray-200 rounded-lg bg-white">
                                  <input type="radio" name="referralSocialPlatform" value={p} checked={formData.referralSocialPlatform===p} onChange={handleInputChange} className="h-3 w-3 text-red-600" />
                                  <span className="text-xs text-gray-600">{p}</span>
                                </label>
                              ))}
                            </div>
                          )}
                          {formData.referralSource==='patient' && opt.value==='patient' && <input type="text" placeholder="Nom du patient" className={`${ic} ml-6 mt-1.5 w-3/4`} value={formData.referralPatientName} onChange={e => setFormData({...formData,referralPatientName:e.target.value})} />}
                          {formData.referralSource==='dentist' && opt.value==='dentist' && <input type="text" placeholder="Nom du médecin" className={`${ic} ml-6 mt-1.5 w-3/4`} value={formData.referralDentistName} onChange={e => setFormData({...formData,referralDentistName:e.target.value})} />}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>


            {/* Actions */}
            {saveError && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mt-2">{saveError}</p>
            )}
            <div className="flex justify-end gap-2 mt-3">
              <button type="button" onClick={onClose} disabled={isSaving} className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-600 bg-white hover:bg-gray-50 transition-all disabled:opacity-50">Annuler</button>
              <button type="submit" disabled={isSaving} className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-all disabled:opacity-60">
                <SaveIcon className="h-3.5 w-3.5" />{isSaving ? 'Enregistrement…' : 'Enregistrer le patient'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NouveauPatient;
