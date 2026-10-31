import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  HeartIcon,
  UserIcon,
  ActivityIcon,
  FileTextIcon,
  PillIcon,
  CalendarIcon,
  ClipboardListIcon,
  AlertTriangleIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  EditIcon,
  PrinterIcon,
  DownloadIcon,
  PlusIcon,
  XCircleIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  ShieldIcon,
  DropletIcon,
  ScanIcon,
  EyeIcon,
  MessageSquareIcon,
  ArrowLeftIcon,
  SearchIcon,
  FilterIcon } from
'lucide-react';
import NouveauPatient from '../components/patients/NouveauPatient';
import { patientService, Patient, PatientStatsResponse, PatientSummary } from '../services/patientService';
type TabId =
'dossier' |
'antecedents' |
'examens' |
'traitements' |
'documents' |
'suivi';
interface Medication {
  name: string;
  dose: string;
  frequency: string;
  since: string;
  status: 'actif' | 'arrêté' | 'suspendu';
}
interface Exam {
  date: string;
  type: string;
  result: string;
  status: 'normal' | 'anormal' | 'à_surveiller';
  doctor: string;
}
interface ExamFormData {
  date: string;
  type: string;
  result: string;
  status: Exam['status'];
  doctor: string;
}
interface Consultation {
  date: string;
  motif: string;
  diagnostic: string;
  doctor: string;
  type: string;
}
interface ColoredItem {
  title: string;
  sub: string;
  color: 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'gray';
}
interface BioMetric {
  label: string;
  val: string;
  unit: string;
  color: 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'gray';
}
interface ProtocolItem {
  title: string;
  sub: string;
  status: string;
  color: 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'gray';
}
interface DocumentItem {
  name: string;
  date: string;
  type: string;
  size: string;
  attachmentName?: string;
}
interface DocumentFormData {
  name: string;
  date: string;
  type: string;
}
interface EvolutionMetric {
  label: string;
  val: string;
  sub: string;
  trend: string;
  up: boolean;
  color: 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'gray';
}
interface AppointmentItem {
  day: string;
  month: string;
  title: string;
  sub: string;
  badge: string;
  color: 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'gray';
}
interface FollowUpNote {
  doctor: string;
  date: string;
  note: string;
}
interface FollowUpNoteFormData {
  doctor: string;
  dateTime: string;
  note: string;
}
type ViewMode = 'list' | 'dossier';

export function PatientManagement() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: routeId } = useParams<{ id: string }>();
  const patientId = routeId ? parseInt(routeId, 10) : null;

  // ─── Backend patient state ────────────────────────────────────────
  const [patient, setPatient] = useState<Patient | null>(null);
  const [patientLoading, setPatientLoading] = useState(!!patientId);
  const [patientError, setPatientError] = useState<string | null>(null);

  // Allergie modal state
  const [showAddAllergie, setShowAddAllergie] = useState(false);
  const [allergieForm, setAllergieForm] = useState({ substance: '', reaction: '', severite: '', notes: '' });
  const [allergieError, setAllergieError] = useState('');
  const [allergieLoading, setAllergieLoading] = useState(false);

  // Antécédent modal state
  const [showAddAntecedent, setShowAddAntecedent] = useState(false);
  const [antecedentForm, setAntecedentForm] = useState({ type: '', description: '', relation: '', anneeDebut: '', notes: '' });
  const [antecedentError, setAntecedentError] = useState('');
  const [antecedentLoading, setAntecedentLoading] = useState(false);

  // ─── Patient list state ────────────────────────────────────────
  const [patientsData, setPatientsData] = useState<PatientSummary[]>([]);
  const [patientsLoading, setPatientsLoading] = useState(false);
  const [patientsError, setPatientsError] = useState<string | null>(null);
  const [statsData, setStatsData] = useState<PatientStatsResponse | null>(null);
  // ─────────────────────────────────────────────────────────────────

  const [view, setView] = useState<ViewMode>(patientId ? 'dossier' : 'list');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabId>('dossier');
  const [isEditing, setIsEditing] = useState(false);

  // Sync view with URL — if a patientId is present, always show dossier
  useEffect(() => {
    if (patientId) setView('dossier');
    else setView('list');
  }, [patientId]);

  const isNewPatientRoute = location.pathname === '/patients/new';
  const handleOpenNewPatient = () => navigate('/patients/new');
  const handleCloseNewPatient = () => navigate('/patients');
  const handleSaveNewPatient = () => {
    navigate('/patients');
  };

  const [diagnostics, setDiagnostics] = useState<ColoredItem[]>([
  {
    color: 'red',
    title: 'Fibrillation Auriculaire Persistante',
    sub: 'CIM-10: I48.1 • Diagnostiqué: 14/01/2025 • Score CHADS₂: 4/6'
  },
  {
    color: 'orange',
    title: 'Maladie Coronarienne (Sténose IVA 60%)',
    sub: 'CIM-10: I25.1 • Diagnostiqué: 10/01/2025 • Score CAC: 245'
  },
  {
    color: 'orange',
    title: 'Insuffisance Cardiaque FE Légèrement Réduite',
    sub: 'CIM-10: I50.1 • FEVG: 45% • Stade NYHA II'
  },
  {
    color: 'yellow',
    title: 'Hypertension Artérielle Essentielle',
    sub: 'CIM-10: I10 • PA: 130/85 mmHg sous traitement'
  },
  {
    color: 'yellow',
    title: 'Dyslipidémie Mixte',
    sub: 'CIM-10: E78.5 • LDL: 1.85 g/L • TG: 2.1 g/L'
  }]);

  const [bioMetrics, setBioMetrics] = useState<BioMetric[]>([
  {
    label: 'NT-proBNP',
    val: '1850',
    unit: 'pg/mL ↑ Élevé',
    color: 'red'
  },
  {
    label: 'Troponine I',
    val: '0.08',
    unit: 'ng/mL ↑ Légèrement élevée',
    color: 'orange'
  },
  {
    label: 'LDL Cholestérol',
    val: '1.85',
    unit: 'g/L ↑ Élevé',
    color: 'red'
  },
  {
    label: 'HbA1c',
    val: '7.2%',
    unit: '↑ Légèrement élevée',
    color: 'orange'
  },
  {
    label: 'INR',
    val: '2.4',
    unit: 'Zone thérapeutique',
    color: 'green'
  },
  {
    label: 'Créatinine',
    val: '115',
    unit: 'µmol/L Normal',
    color: 'green'
  },
  {
    label: 'Potassium',
    val: '3.4',
    unit: 'mmol/L ↓ Bas',
    color: 'orange'
  },
  {
    label: 'CRP',
    val: '4.2',
    unit: 'mg/L Normal',
    color: 'green'
  }]);

  const [protocols, setProtocols] = useState<ProtocolItem[]>([
  {
    title: 'Anticoagulation orale (FA)',
    sub: 'Apixaban 5mg x2/j • Objectif INR: 2-3',
    status: 'Actif',
    color: 'green'
  },
  {
    title: 'Double antiagrégation plaquettaire',
    sub: 'Aspirine 100mg + Clopidogrel 75mg • Post-stent',
    status: 'Planifié',
    color: 'blue'
  },
  {
    title: 'Réhabilitation cardiaque Phase II',
    sub: '3 séances/semaine • 8 semaines',
    status: 'Planifié',
    color: 'blue'
  }]);

  const [documents, setDocuments] = useState<DocumentItem[]>([
  {
    name: 'ECG 12 dérivations',
    date: '14/01/2025',
    type: 'ECG',
    size: '2.4 MB'
  },
  {
    name: 'Échocardiographie',
    date: '14/01/2025',
    type: 'Imagerie',
    size: '15.8 MB'
  },
  {
    name: 'Scanner coronaire',
    date: '10/01/2025',
    type: 'Imagerie',
    size: '45.2 MB'
  },
  {
    name: 'IRM cardiaque',
    date: '05/01/2025',
    type: 'Imagerie',
    size: '120 MB'
  },
  {
    name: 'Bilan biologique complet',
    date: '15/12/2024',
    type: 'Biologie',
    size: '0.8 MB'
  },
  {
    name: 'Holter ECG 24h',
    date: '20/12/2024',
    type: 'ECG',
    size: '8.2 MB'
  },
  {
    name: 'Rapport scintigraphie',
    date: '28/12/2024',
    type: 'Rapport',
    size: '3.1 MB'
  },
  {
    name: 'Compte-rendu consultation',
    date: '14/01/2025',
    type: 'Rapport',
    size: '0.5 MB'
  },
  {
    name: 'Ordonnance médicaments',
    date: '14/01/2025',
    type: 'Ordonnance',
    size: '0.3 MB'
  }]);
  const [isNewDocumentOpen, setIsNewDocumentOpen] = useState(false);
  const [newDocumentError, setNewDocumentError] = useState('');
  const [newDocumentForm, setNewDocumentForm] = useState<DocumentFormData>({
    name: '',
    date: '',
    type: 'Rapport'
  });
  const [newDocumentFile, setNewDocumentFile] = useState<File | null>(null);

  const [evolutionMetrics, setEvolutionMetrics] = useState<EvolutionMetric[]>([
  {
    label: 'FEVG',
    val: '45%',
    sub: 'Était 42% en juin 2024',
    trend: '+3%',
    up: true,
    color: 'orange'
  },
  {
    label: 'PA Systolique',
    val: '130',
    sub: 'Était 145 mmHg en déc. 2024',
    trend: '-15 mmHg',
    up: false,
    color: 'orange'
  },
  {
    label: 'LDL Cholestérol',
    val: '1.85',
    sub: 'Était 2.30 g/L en juin 2024',
    trend: '-0.45 g/L',
    up: false,
    color: 'red'
  },
  {
    label: 'NT-proBNP',
    val: '1850',
    sub: 'Était 2500 pg/mL en juin 2024',
    trend: '-650 pg/mL',
    up: false,
    color: 'orange'
  }]);

  const [upcomingAppointments, setUpcomingAppointments] = useState<AppointmentItem[]>([
  {
    day: '20',
    month: 'Jan 2025',
    title: 'Cardioversion électrique',
    sub: 'Dr. Mansouri • Arythmologie • 09h00',
    badge: 'Urgent',
    color: 'red'
  },
  {
    day: '25',
    month: 'Jan 2025',
    title: 'Coronarographie + Angioplastie',
    sub: 'Dr. Mansouri • Cardiologie interventionnelle • 08h30',
    badge: 'Prioritaire',
    color: 'orange'
  },
  {
    day: '15',
    month: 'Fév 2025',
    title: 'Contrôle échocardiographique',
    sub: 'Dr. Mansouri • Suivi IC • 10h00',
    badge: 'Suivi',
    color: 'blue'
  }]);

  const [followUpNotes, setFollowUpNotes] = useState<FollowUpNote[]>([
  {
    doctor: 'Dr. Mansouri',
    date: '14/01/2025 à 14h30',
    note: "Patient admis pour palpitations et dyspnée d'effort NYHA II. ECG confirme FA persistante avec réponse ventriculaire à 95 bpm. Échocardiographie montre FEVG à 45%, dilatation OG modérée. Décision de cardioversion électrique programmée sous anticoagulation efficace. Coronarographie planifiée pour sténose IVA 60% vue au scanner."
  },
  {
    doctor: 'Dr. Mansouri',
    date: '01/12/2024 à 11h00',
    note: "Bilan cardiovasculaire annuel. HTA mieux contrôlée sous traitement actuel (130/85 vs 145/95 en septembre). LDL en diminution mais encore au-dessus de l'objectif (<0.7 g/L pour risque très élevé). Augmentation Atorvastatine 20→40mg."
  }]);
  const [isNewNoteOpen, setIsNewNoteOpen] = useState(false);
  const [newNoteError, setNewNoteError] = useState('');
  const [newNoteForm, setNewNoteForm] = useState<FollowUpNoteFormData>({
    doctor: 'Dr. Mansouri',
    dateTime: '',
    note: ''
  });

  const inferColorFromValue = (value: string): string | null => {
    const text = value.
    toLowerCase().
    normalize('NFD').
    replace(/[\u0300-\u036f]/g, '');

    if (!text.trim()) return null;
    if (/(famil|pere|mere|frere|soeur)/.test(text)) return 'purple';
    if (/(urgence|critique|severe|eleve|haut|anormal|fatal|infarct|id[m]|actif|hemorrag|instable)/.test(text)) return 'red';
    if (/(surveiller|leger|modere|limite|bas|risque|attention|insuffis|dyslipid|hta|tabag|obesite|stress)/.test(text)) return 'orange';
    if (/(normal|controle|therapeutique|zone therapeutique|negatif|sevre|non|absent|stable|ok)/.test(text)) return 'green';
    if (/(information|bilan|suivi|compte[- ]?rendu)/.test(text)) return 'blue';
    return null;
  };

  const inferItemTone = (item: Record<string, any>): string | null => {
    const signal = [
    item.label,
    item.value,
    item.val,
    item.title,
    item.sub,
    item.unit,
    item.text,
    item.diagnostic,
    item.type].
    filter(Boolean).
    join(' ');
    return inferColorFromValue(signal);
  };

  const applyInferredTone = <T extends Record<string, any>>(item: T): T => {
    const inferred = inferItemTone(item);
    if (!inferred) return item;

    const next: Record<string, any> = { ...item };
    if ('color' in next) {
      next.color = inferred;
    }
    if ('severity' in next) {
      next.severity = inferred === 'purple' ? 'blue' : inferred;
    }
    return next as T;
  };

  const updateArrayItem = (
  setter: React.Dispatch<React.SetStateAction<any[]>>,
  index: number,
  field: string,
  value: string | boolean) =>
  {
    setter((prev) =>
    prev.map((item, i) =>
    i === index ?
    (() => {
      const updated = {
      ...item,
      [field]: value
      };

      // Keep tone selectors aligned with filled values unless user edits color directly.
      if (field !== 'color' && field !== 'severity') {
        return applyInferredTone(updated);
      }
      return updated;
    })() :
    item
    ));
  };
  const addArrayItem = (
  setter: React.Dispatch<React.SetStateAction<any[]>>,
  item: any) =>
  {
    setter((prev) => [...prev, item]);
  };
  const removeArrayItem = (
  setter: React.Dispatch<React.SetStateAction<any[]>>,
  index: number) =>
  {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const colorOptions = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'gray'];

  // ─── Load patient from backend ────────────────────────────────────
  useEffect(() => {
    if (!patientId) return;
    setPatientLoading(true);
    setPatientError(null);
    patientService.getById(patientId)
      .then(setPatient)
      .catch((err) => setPatientError(err?.message || 'Erreur de chargement'))
      .finally(() => setPatientLoading(false));
  }, [patientId]);

  const handleAddAllergie = async () => {
    if (!patientId || !allergieForm.substance.trim()) {
      setAllergieError('Substance requise.');
      return;
    }
    setAllergieLoading(true);
    setAllergieError('');
    try {
      const updated = await patientService.addAllergie(patientId, {
        substance: allergieForm.substance.trim(),
        reaction: allergieForm.reaction.trim() || undefined,
        severite: allergieForm.severite || undefined,
        notes: allergieForm.notes.trim() || undefined,
      });
      setPatient(updated);
      setAllergieForm({ substance: '', reaction: '', severite: '', notes: '' });
      setShowAddAllergie(false);
    } catch (err: any) {
      setAllergieError(err?.message || 'Erreur');
    } finally {
      setAllergieLoading(false);
    }
  };

  const handleRemoveAllergie = async (allergieId: number) => {
    if (!patientId || !confirm('Supprimer cette allergie ?')) return;
    try {
      const updated = await patientService.removeAllergie(patientId, allergieId);
      setPatient(updated);
    } catch (err: any) {
      alert(err?.message || 'Erreur');
    }
  };

  const handleAddAntecedent = async () => {
    if (!patientId || !antecedentForm.type.trim() || !antecedentForm.description.trim()) {
      setAntecedentError('Type et description requis.');
      return;
    }
    setAntecedentLoading(true);
    setAntecedentError('');
    try {
      const updated = await patientService.addAntecedent(patientId, {
        type: antecedentForm.type.trim(),
        description: antecedentForm.description.trim(),
        relation: antecedentForm.relation.trim() || undefined,
        anneeDebut: antecedentForm.anneeDebut ? parseInt(antecedentForm.anneeDebut, 10) : undefined,
        notes: antecedentForm.notes.trim() || undefined,
      });
      setPatient(updated);
      setAntecedentForm({ type: '', description: '', relation: '', anneeDebut: '', notes: '' });
      setShowAddAntecedent(false);
    } catch (err: any) {
      setAntecedentError(err?.message || 'Erreur');
    } finally {
      setAntecedentLoading(false);
    }
  };

  const handleRemoveAntecedent = async (antecedentId: number) => {
    if (!patientId || !confirm('Supprimer cet antécédent ?')) return;
    try {
      const updated = await patientService.removeAntecedent(patientId, antecedentId);
      setPatient(updated);
    } catch (err: any) {
      alert(err?.message || 'Erreur');
    }
  };
  // ─────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!isEditing) return;

    setDiagnostics((prev) => prev.map((item) => applyInferredTone(item)));
    setBioMetrics((prev) => prev.map((item) => applyInferredTone(item)));
  }, [isEditing]);

  const tabs = [
  {
    id: 'dossier' as TabId,
    label: 'Dossier Patient',
    icon: <UserIcon className="w-4 h-4" />
  },
  {
    id: 'antecedents' as TabId,
    label: 'Antécédents',
    icon: <ClipboardListIcon className="w-4 h-4" />
  },
  {
    id: 'examens' as TabId,
    label: 'Examens & Bilans',
    icon: <ActivityIcon className="w-4 h-4" />
  },
  {
    id: 'traitements' as TabId,
    label: 'Traitements',
    icon: <PillIcon className="w-4 h-4" />
  },
  {
    id: 'documents' as TabId,
    label: 'Documents',
    icon: <FileTextIcon className="w-4 h-4" />
  },
  {
    id: 'suivi' as TabId,
    label: 'Suivi & Évolution',
    icon: <TrendingUpIcon className="w-4 h-4" />
  }];

  const [medicationsData, setMedicationsData] = useState<Medication[]>([
  {
    name: 'Apixaban (Eliquis)',
    dose: '5 mg',
    frequency: '2x/jour',
    since: '15/01/2025',
    status: 'actif'
  },
  {
    name: 'Bisoprolol',
    dose: '5 mg',
    frequency: '1x/jour (matin)',
    since: '10/01/2025',
    status: 'actif'
  },
  {
    name: 'Amiodarone',
    dose: '200 mg',
    frequency: '1x/jour',
    since: '15/01/2025',
    status: 'actif'
  },
  {
    name: 'Atorvastatine',
    dose: '40 mg',
    frequency: '1x/jour (soir)',
    since: '01/12/2024',
    status: 'actif'
  },
  {
    name: 'Énalapril',
    dose: '10 mg',
    frequency: '1x/jour',
    since: '10/01/2025',
    status: 'actif'
  },
  {
    name: 'Furosémide',
    dose: '40 mg',
    frequency: '1x/jour (matin)',
    since: '10/01/2025',
    status: 'actif'
  },
  {
    name: 'Spironolactone',
    dose: '25 mg',
    frequency: '1x/jour',
    since: '10/01/2025',
    status: 'actif'
  },
  {
    name: 'Aspirine',
    dose: '100 mg',
    frequency: '1x/jour',
    since: '01/12/2024',
    status: 'actif'
  },
  {
    name: 'Warfarine',
    dose: '5 mg',
    frequency: '1x/jour',
    since: '01/06/2024',
    status: 'arrêté'
  }]);

  const [examsData, setExamsData] = useState<Exam[]>([
  {
    date: '14/01/2025',
    type: 'ECG 12 dérivations',
    result: 'FA + HVG + Sous-décalage ST V4-V6',
    status: 'anormal',
    doctor: 'Dr. Mansouri'
  },
  {
    date: '14/01/2025',
    type: 'Échocardiographie',
    result: 'FE 45%, Dilatation OG, IM légère',
    status: 'anormal',
    doctor: 'Dr. Mansouri'
  },
  {
    date: '10/01/2025',
    type: 'Scanner coronaire',
    result: 'Sténose 60% IVA, Score CAC 245',
    status: 'anormal',
    doctor: 'Dr. Mansouri'
  },
  {
    date: '05/01/2025',
    type: 'IRM cardiaque',
    result: 'Fibrose myocardique 8%, Masse VG 185g/m²',
    status: 'à_surveiller',
    doctor: 'Dr. Mansouri'
  },
  {
    date: '28/12/2024',
    type: 'Scintigraphie myocardique',
    result: 'Hypoperfusion réversible territoire IVA',
    status: 'anormal',
    doctor: 'Dr. Mansouri'
  },
  {
    date: '20/12/2024',
    type: 'Holter ECG 24h',
    result: 'FA paroxystique 3 épisodes, 450 ESV/24h',
    status: 'anormal',
    doctor: 'Dr. Mansouri'
  },
  {
    date: '15/12/2024',
    type: 'Bilan lipidique',
    result: 'LDL 1.85 g/L, HDL 0.42 g/L, TG 2.1 g/L',
    status: 'anormal',
    doctor: 'Dr. Mansouri'
  },
  {
    date: '15/12/2024',
    type: 'BNP / NT-proBNP',
    result: 'NT-proBNP: 1850 pg/mL (élevé)',
    status: 'anormal',
    doctor: 'Dr. Mansouri'
  },
  {
    date: '10/12/2024',
    type: 'Troponine I',
    result: '0.08 ng/mL (légèrement élevée)',
    status: 'à_surveiller',
    doctor: 'Dr. Mansouri'
  },
  {
    date: '01/12/2024',
    type: "Épreuve d'effort",
    result: 'Positive à 7 METS, sous-décalage ST 2mm',
    status: 'anormal',
    doctor: 'Dr. Mansouri'
  }]);

  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [isExamDetailsOpen, setIsExamDetailsOpen] = useState(false);
  const [isExamEditMode, setIsExamEditMode] = useState(false);
  const [examEditError, setExamEditError] = useState('');
  const [examEditForm, setExamEditForm] = useState<ExamFormData>({
    date: '',
    type: '',
    result: '',
    status: 'normal',
    doctor: ''
  });
  const [isNewExamOpen, setIsNewExamOpen] = useState(false);
  const [newExamError, setNewExamError] = useState('');
  const [newExamForm, setNewExamForm] = useState<ExamFormData>({
    date: '',
    type: '',
    result: '',
    status: 'normal',
    doctor: 'Dr. Mansouri'
  });

  const [consultationsData, setConsultationsData] = useState<Consultation[]>([
  {
    date: '14/01/2025',
    motif: "Palpitations + dyspnée d'effort",
    diagnostic: 'FA persistante + IC FE légèrement réduite',
    doctor: 'Dr. Mansouri',
    type: 'Urgence'
  },
  {
    date: '10/01/2025',
    motif: 'Douleur thoracique atypique',
    diagnostic: 'Syndrome coronarien chronique',
    doctor: 'Dr. Mansouri',
    type: 'Consultation'
  },
  {
    date: '01/12/2024',
    motif: 'Bilan cardiovasculaire annuel',
    diagnostic: 'HTA + Dyslipidémie + Risque CV élevé',
    doctor: 'Dr. Mansouri',
    type: 'Bilan'
  },
  {
    date: '15/09/2024',
    motif: 'Suivi HTA',
    diagnostic: 'HTA mal contrôlée, adaptation thérapeutique',
    doctor: 'Dr. Mansouri',
    type: 'Suivi'
  },
  {
    date: '10/06/2024',
    motif: "Essoufflement à l'effort",
    diagnostic: 'IC débutante, FEVG 50%',
    doctor: 'Dr. Mansouri',
    type: 'Consultation'
  }]);

  // Keep legacy render blocks stable while edit-state wiring is being finalized.
  const medications = medicationsData;
  const exams = examsData;
  const consultations = consultationsData;

  const statusColor = (s: Exam['status']) => {
    if (s === 'anormal') return 'bg-red-100 text-red-700';
    if (s === 'à_surveiller') return 'bg-orange-100 text-orange-700';
    return 'bg-green-100 text-green-700';
  };
  const statusLabel = (s: Exam['status']) => {
    if (s === 'anormal') return 'Anormal';
    if (s === 'à_surveiller') return 'À surveiller';
    return 'Normal';
  };

  const formatDateForInput = (date: string) => {
    const parts = date.split('/');
    if (parts.length !== 3) return '';
    const [day, month, year] = parts;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  const formatDateForDisplay = (date: string) => {
    if (!date) return '';
    const parts = date.split('-');
    if (parts.length !== 3) return date;
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  };

  const dateToSortValue = (date: string) => {
    const parts = date.split('/');
    if (parts.length !== 3) return 0;
    const [day, month, year] = parts;
    return Number(`${year}${month.padStart(2, '0')}${day.padStart(2, '0')}`);
  };

  const toExamForm = (exam: Exam): ExamFormData => ({
    date: formatDateForInput(exam.date),
    type: exam.type,
    result: exam.result,
    status: exam.status,
    doctor: exam.doctor
  });

  const openExamDetails = (exam: Exam) => {
    setSelectedExam(exam);
    setExamEditForm(toExamForm(exam));
    setExamEditError('');
    setIsExamEditMode(false);
    setIsExamDetailsOpen(true);
  };

  const closeExamDetails = () => {
    setIsExamDetailsOpen(false);
    setIsExamEditMode(false);
    setExamEditError('');
    setSelectedExam(null);
  };

  const editSelectedExam = () => {
    if (!selectedExam) return;
    setExamEditForm(toExamForm(selectedExam));
    setExamEditError('');
    setIsExamEditMode(true);
  };

  const cancelEditSelectedExam = () => {
    if (selectedExam) {
      setExamEditForm(toExamForm(selectedExam));
    }
    setExamEditError('');
    setIsExamEditMode(false);
  };

  const saveSelectedExam = () => {
    if (!selectedExam) return;

    const examDate = formatDateForDisplay(examEditForm.date);
    const type = examEditForm.type.trim();
    const result = examEditForm.result.trim();
    const doctor = examEditForm.doctor.trim();

    if (!examDate || !type || !result || !doctor) {
      setExamEditError('Veuillez renseigner la date, le type, le résultat et le médecin.');
      return;
    }

    const updatedExam: Exam = {
      date: examDate,
      type,
      result,
      status: examEditForm.status,
      doctor
    };

    setExamsData((prev) => {
      const index = prev.findIndex((item) => item === selectedExam);
      if (index < 0) return prev;

      const next = [...prev];
      next[index] = updatedExam;
      return next.sort((a, b) => dateToSortValue(b.date) - dateToSortValue(a.date));
    });

    setSelectedExam(updatedExam);
    setExamEditError('');
    setIsExamEditMode(false);
  };

  const deleteSelectedExam = () => {
    if (!selectedExam) return;

    setExamsData((prev) => {
      const index = prev.findIndex((item) => item === selectedExam);
      if (index < 0) return prev;
      return prev.filter((_, i) => i !== index);
    });

    closeExamDetails();
  };

  const openNewExamModal = () => {
    setNewExamError('');
    setNewExamForm({
      date: formatDateForInput(new Date().toLocaleDateString('fr-FR')),
      type: '',
      result: '',
      status: 'normal',
      doctor: 'Dr. Mansouri'
    });
    setIsNewExamOpen(true);
  };

  const closeNewExamModal = () => {
    setNewExamError('');
    setIsNewExamOpen(false);
  };

  const createExam = () => {
    const examDate = formatDateForDisplay(newExamForm.date);
    const type = newExamForm.type.trim();
    const result = newExamForm.result.trim();
    const doctor = newExamForm.doctor.trim();

    if (!examDate || !type || !result || !doctor) {
      setNewExamError('Veuillez renseigner la date, le type, le résultat et le médecin.');
      return;
    }

    const exam: Exam = {
      date: examDate,
      type,
      result,
      status: newExamForm.status,
      doctor
    };

    setExamsData((prev) =>
    [exam, ...prev].
    sort((a, b) => dateToSortValue(b.date) - dateToSortValue(a.date))
    );

    setNewExamError('');
    setIsNewExamOpen(false);
    openExamDetails(exam);
  };

  const medStatusColor = (s: Medication['status']) => {
    if (s === 'actif') return 'bg-green-100 text-green-700';
    if (s === 'arrêté') return 'bg-red-100 text-red-700';
    return 'bg-orange-100 text-orange-700';
  };
  const medStatusLabel = (s: Medication['status']) => {
    if (s === 'actif') return 'Actif';
    if (s === 'arrêté') return 'Arrêté';
    return 'Suspendu';
  };
  const protocolStatusOptions = ['Actif', 'Planifié', 'Suspendu', 'Terminé'];
  const protocolStatusColor = (status: string) => {
    if (status === 'Actif') return 'bg-green-100 text-green-700';
    if (status === 'Planifié') return 'bg-blue-100 text-blue-700';
    if (status === 'Suspendu') return 'bg-orange-100 text-orange-700';
    if (status === 'Terminé') return 'bg-gray-100 text-gray-700';
    return 'bg-gray-100 text-gray-700';
  };
  const protocolStatusToTone = (status: string): ProtocolItem['color'] => {
    if (status === 'Actif') return 'green';
    if (status === 'Planifié') return 'blue';
    if (status === 'Suspendu') return 'orange';
    return 'gray';
  };
  const metricTrendToColor = (up: boolean): EvolutionMetric['color'] => {
    return up ? 'orange' : 'green';
  };
  const addMedicationCard = () => {
    setIsEditing(true);
    setMedicationsData((prev) => [
    {
      name: 'Nouveau médicament',
      dose: '',
      frequency: '',
      since: new Date().toLocaleDateString('fr-FR'),
      status: 'actif'
    },
    ...prev
    ]);
  };
  const medicationEntries = medications.map((med, index) => ({ med, index }));
  const addProtocolCard = () => {
    setProtocols((prev) => [
    {
      title: 'Nouveau protocole',
      sub: '',
      status: 'Planifié',
      color: protocolStatusToTone('Planifié')
    },
    ...prev
    ]);
  };
  const getDocumentIcon = (type: string) => {
    const normalizedType = type.toLowerCase();
    if (normalizedType.includes('ecg')) return <ActivityIcon className="w-4 h-4 text-red-500" />;
    if (normalizedType.includes('imagerie') || normalizedType.includes('scanner') || normalizedType.includes('irm')) return <ScanIcon className="w-4 h-4 text-blue-500" />;
    if (normalizedType.includes('biologie') || normalizedType.includes('bilan')) return <DropletIcon className="w-4 h-4 text-purple-500" />;
    if (normalizedType.includes('ordonnance')) return <ClipboardListIcon className="w-4 h-4 text-orange-500" />;
    return <FileTextIcon className="w-4 h-4 text-green-500" />;
  };
  const openNewDocumentModal = () => {
    setNewDocumentError('');
    setNewDocumentForm({
      name: '',
      date: formatDateForInput(new Date().toLocaleDateString('fr-FR')),
      type: 'Rapport'
    });
    setNewDocumentFile(null);
    setIsNewDocumentOpen(true);
  };
  const closeNewDocumentModal = () => {
    setNewDocumentError('');
    setNewDocumentFile(null);
    setIsNewDocumentOpen(false);
  };
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  };
  const createDocument = () => {
    const name = newDocumentForm.name.trim();
    const date = formatDateForDisplay(newDocumentForm.date);
    const type = newDocumentForm.type.trim();
    const attachment = newDocumentFile;

    if (!name || !date || !type || !attachment) {
      setNewDocumentError('Veuillez renseigner le nom, la date, le type et ajouter une pièce jointe.');
      return;
    }

    const size = formatFileSize(attachment.size);

    setDocuments((prev) => [
    {
      name,
      date,
      type,
      size,
      attachmentName: attachment.name
    },
    ...prev
    ].sort((a, b) => dateToSortValue(b.date) - dateToSortValue(a.date)));

    setNewDocumentError('');
    setNewDocumentFile(null);
    setIsNewDocumentOpen(false);
  };
  const toDateTimeLocalNow = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - offset).toISOString().slice(0, 16);
  };
  const formatDateTimeForDisplay = (dateTime: string) => {
    if (!dateTime) return '';
    const [datePart, timePart] = dateTime.split('T');
    if (!datePart || !timePart) return dateTime;
    const [year, month, day] = datePart.split('-');
    const [hour, minute] = timePart.split(':');
    if (!year || !month || !day || !hour || !minute) return dateTime;
    return `${day}/${month}/${year} à ${hour}h${minute}`;
  };
  const openNewNoteModal = () => {
    setNewNoteError('');
    setNewNoteForm({
      doctor: 'Dr. Mansouri',
      dateTime: toDateTimeLocalNow(),
      note: ''
    });
    setIsNewNoteOpen(true);
  };
  const closeNewNoteModal = () => {
    setNewNoteError('');
    setIsNewNoteOpen(false);
  };
  const createFollowUpNote = () => {
    const doctor = newNoteForm.doctor.trim();
    const date = formatDateTimeForDisplay(newNoteForm.dateTime);
    const note = newNoteForm.note.trim();

    if (!doctor || !date || !note) {
      setNewNoteError('Veuillez renseigner le médecin, la date/heure et le contenu de la note.');
      return;
    }

    setFollowUpNotes((prev) => [
    {
      doctor,
      date,
      note
    },
    ...prev
    ]);

    setNewNoteError('');
    setIsNewNoteOpen(false);
  };
  const removeDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };
  // Load patients list from API when in list view
  useEffect(() => {
    if (view !== 'list') return;
    setPatientsLoading(true);
    setPatientsError(null);
    Promise.all([
      patientService.getAll({ pageSize: 100 }),
      patientService.getStats(),
    ]).then(([paged, stats]) => {
      setPatientsData(paged.items);
      setStatsData(stats);
    }).catch(() => setPatientsError("Impossible de charger la liste des patients"))
      .finally(() => setPatientsLoading(false));
  }, [view]);

  const filteredPatients = patientsData.filter(
    (p) =>
      p.nomComplet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.numeroDossier.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const risqueColor = (r: string) => {
    if (r === 'Critique') return 'bg-red-100 text-red-700';
    if (r === 'Eleve')    return 'bg-orange-100 text-orange-700';
    if (r === 'Modere')   return 'bg-yellow-100 text-yellow-700';
    return 'bg-green-100 text-green-700';
  };
  const risqueLabel = (r: string) => {
    if (r === 'Critique') return 'Critique';
    if (r === 'Eleve')    return 'Élevé';
    if (r === 'Modere')   return 'Modéré';
    if (r === 'Faible')   return 'Faible';
    return r;
  };
  // LIST VIEW
  if (view === 'list') {
    return (
      <div className="min-h-screen bg-gray-50 p-3">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-red-600 rounded-lg flex items-center justify-center">
              <HeartIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900">
                Gestion des Patients
              </h1>
              <p className="text-xs text-gray-500">
                Cardiologie — {statsData?.totalPatients ?? patientsData.length} patients enregistrés
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="relative">
              <SearchIcon className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un patient..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white w-48 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent" />

            </div>
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
              <FilterIcon className="w-3.5 h-3.5" />
              Filtrer
            </button>
            <button
              onClick={handleOpenNewPatient}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-sm">
              <PlusIcon className="w-3.5 h-3.5" />
              Nouveau Patient
            </button>
          </div>
        </div>

        {/* Error */}
        {patientsError && (
          <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">{patientsError}</div>
        )}

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          <div className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-sm">
            <p className="text-[10px] text-gray-500 mb-0.5">Total patients</p>
            <p className="text-xl font-bold text-gray-900">
              {patientsLoading ? '…' : (statsData?.totalPatients ?? patientsData.length)}
            </p>
          </div>
          <div className="bg-white border border-red-200 rounded-lg p-2.5 shadow-sm">
            <p className="text-[10px] text-gray-500 mb-0.5">Critiques</p>
            <p className="text-xl font-bold text-red-600">
              {statsData?.risqueCritique ?? '—'}
            </p>
          </div>
          <div className="bg-white border border-orange-200 rounded-lg p-2.5 shadow-sm">
            <p className="text-[10px] text-gray-500 mb-0.5">Risque élevé</p>
            <p className="text-xl font-bold text-orange-600">
              {statsData?.risqueEleve ?? '—'}
            </p>
          </div>
          <div className="bg-white border border-blue-200 rounded-lg p-2.5 shadow-sm">
            <p className="text-[10px] text-gray-500 mb-0.5">Nouveaux ce mois</p>
            <p className="text-xl font-bold text-blue-600">{statsData?.nouveauxCeMois ?? '—'}</p>
          </div>
        </div>

        {/* Datagrid */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                {[
                'Patient',
                'N° Dossier',
                'Niveau de risque',
                'Ville',
                'Dernière consultation',
                'Consultations',
                'Actions'].
                map((h) =>
                <th
                  key={h}
                  className="text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">

                    {h}
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPatients.map((patient) =>
              <tr
                key={patient.id}
                className="hover:bg-gray-50 transition-colors">

                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <UserIcon className="w-3.5 h-3.5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-900">{patient.nomComplet}</p>
                        <p className="text-[10px] text-gray-500">{patient.age} ans • {patient.genre}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <span className="text-xs font-mono text-red-600 font-semibold">{patient.numeroDossier}</span>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${risqueColor(patient.niveauRisque)}`}>
                      {risqueLabel(patient.niveauRisque)}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600">
                    {patient.ville ?? <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600">
                    {patient.derniereConsultation
                      ? new Date(patient.derniereConsultation).toLocaleDateString('fr-FR')
                      : <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600 text-center">
                    {patient.nbConsultations}
                  </td>
                  <td className="px-3 py-2">
                    <button
                      onClick={() => navigate(`/patients/${patient.id}/manage`)}
                      className="flex items-center gap-1 px-2.5 py-1 text-[10px] bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
                      <EyeIcon className="w-3 h-3" />
                      Voir dossier
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {patientsLoading && (
            <div className="text-center py-8 text-gray-400">
              <div className="animate-spin w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full mx-auto mb-2" />
              <p className="text-xs">Chargement des patients…</p>
            </div>
          )}
          {!patientsLoading && filteredPatients.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <UserIcon className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-xs">{patientsData.length === 0 ? 'Aucun patient enregistré' : 'Aucun résultat pour cette recherche'}</p>
            </div>
          )}
        </div>

        {isNewPatientRoute &&
        <NouveauPatient
          onClose={handleCloseNewPatient}
          onSave={handleSaveNewPatient} />
        }
      </div>);

  }
  // DOSSIER VIEW — full-page loading / error states
  if (patientLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full mx-auto mb-3" />
          <p className="text-sm text-gray-500">Chargement du dossier patient…</p>
        </div>
      </div>
    );
  }

  if (patientError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center max-w-md">
          <AlertTriangleIcon className="w-8 h-8 text-red-400 mx-auto mb-2" />
          <p className="text-sm font-semibold text-red-700">{patientError}</p>
          <button onClick={() => navigate('/patients')} className="mt-4 px-4 py-2 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700">
            Retour à la liste
          </button>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <UserIcon className="w-10 h-10 mx-auto mb-2 opacity-30" />
          <p className="text-sm">Patient introuvable.</p>
          <button onClick={() => navigate('/patients')} className="mt-3 px-4 py-2 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700">
            Retour à la liste
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3">
      <div className="mb-2">
        <button
          onClick={() => navigate('/patients')}
          className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-red-600 transition-colors">

          <ArrowLeftIcon className="w-3.5 h-3.5" />
          Retour à la liste des patients
        </button>
      </div>

      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-red-600 rounded-lg flex items-center justify-center">
            <HeartIcon className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900">Dossier Patient</h1>
            <p className="text-xs text-gray-500">
              Cardiologie — Suivi cardiovasculaire complet
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
            <MessageSquareIcon className="w-3.5 h-3.5" />
            Message
          </button>
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
            <PrinterIcon className="w-3.5 h-3.5" />
            Imprimer
          </button>
          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs text-white rounded-lg shadow-sm ${isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}>
            <EditIcon className="w-3.5 h-3.5" />
            {isEditing ? 'Enregistrer' : 'Modifier'}
          </button>
        </div>
      </div>

      {isEditing &&
      <div className="mb-3 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs text-amber-700 flex items-center justify-between">
          <span>Tous les onglets sont en mode édition. Vous pouvez ajouter et supprimer des éléments.</span>
          <button
          onClick={() => setIsEditing(false)}
          className="px-2 py-1 text-[10px] rounded bg-white border border-amber-300 hover:bg-amber-100">
            Fermer le mode édition
          </button>
        </div>
      }

      {/* Patient Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-3 mb-3 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-rose-200 rounded-xl flex items-center justify-center flex-shrink-0">
            <UserIcon className="w-7 h-7 text-red-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-900">{patient.nomComplet}</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Né(e) le {new Date(patient.dateNaissance).toLocaleDateString('fr-FR')} • {patient.age} ans • {patient.genre}
                </p>
                <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                  {patient.telephone && (
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <PhoneIcon className="w-3 h-3" />
                      {patient.telephone}
                    </div>
                  )}
                  {patient.email && (
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <MailIcon className="w-3 h-3" />
                      {patient.email}
                    </div>
                  )}
                  {patient.ville && (
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <MapPinIcon className="w-3 h-3" />
                      {patient.ville}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500">N° Dossier</p>
                <p className="text-sm font-bold text-red-600">{patient.numeroDossier}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  Depuis le {new Date(patient.creeLe).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-gray-100">
          <div className="text-center">
            <p className="text-[10px] text-gray-500 mb-0.5">Risque CV</p>
            <span className={`inline-block px-2 py-0.5 text-xs font-bold rounded-full ${
              patient.niveauRisque === 'Critique' ? 'bg-red-100 text-red-700' :
              patient.niveauRisque === 'Eleve' ? 'bg-orange-100 text-orange-700' :
              patient.niveauRisque === 'Modere' ? 'bg-yellow-100 text-yellow-700' :
              'bg-green-100 text-green-700'
            }`}>{patient.niveauRisque}</span>
          </div>
          {patient.groupeSanguin && (
            <div className="text-center">
              <p className="text-[10px] text-gray-500 mb-0.5">Groupe sanguin</p>
              <p className="text-sm font-bold text-gray-800">{patient.groupeSanguin}</p>
            </div>
          )}
          {patient.imc != null && (
            <div className="text-center">
              <p className="text-[10px] text-gray-500 mb-0.5">IMC</p>
              <p className={`text-sm font-bold ${patient.imc > 25 ? 'text-orange-600' : 'text-green-600'}`}>{patient.imc.toFixed(1)}</p>
            </div>
          )}
          <div className="text-center">
            <p className="text-[10px] text-gray-500 mb-0.5">Consultations</p>
            <p className="text-sm font-bold text-blue-600">{patient.nbConsultations}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) =>
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium whitespace-nowrap transition-all border-b-2 ${activeTab === tab.id ? 'border-red-500 text-red-600 bg-red-50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>

              {tab.icon}
              {tab.label}
            </button>
          )}
        </div>

        <div className="p-3">
          {/* TAB 1: Dossier Patient */}
          {activeTab === 'dossier' &&
          <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1 space-y-3">
                  {/* Informations Patient (backend) */}
                  {patient && (
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <h3 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                      <UserIcon className="w-3.5 h-3.5 text-red-500" />
                      Informations Personnelles
                    </h3>
                    <div className="space-y-1.5 text-xs">
                      {[
                        { label: 'Groupe sanguin', value: patient.groupeSanguin },
                        { label: 'Taille', value: patient.taille ? `${patient.taille} cm` : null },
                        { label: 'Poids', value: patient.poids ? `${patient.poids} kg` : null },
                        { label: 'IMC', value: patient.imc ? patient.imc.toFixed(1) : null },
                        { label: 'Tour de taille', value: patient.tourDeTaille },
                        { label: 'Profession', value: patient.profession },
                        { label: 'Assurance', value: patient.assurance },
                        { label: 'Médecin traitant', value: patient.medecineTraitant },
                        { label: 'CIN', value: patient.numeroCIN },
                      ].filter(f => f.value).map((item, i) => (
                        <div key={i} className="flex justify-between">
                          <span className="text-gray-500">{item.label}</span>
                          <span className={`font-semibold ${item.label === 'IMC' || item.label === 'Tour de taille' ? 'text-orange-600' : 'text-gray-900'}`}>
                            {item.value}
                          </span>
                        </div>
                      ))}
                      {patient.pathologiesChroniques && (
                        <div className="pt-1 border-t border-gray-200 mt-1">
                          <span className="text-gray-500">Pathologies chroniques</span>
                          <p className="font-semibold text-gray-900 mt-0.5">{patient.pathologiesChroniques}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  )}

                  {/* Allergies (backend) */}
                  {patient && (
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <h3 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                      <AlertTriangleIcon className="w-3.5 h-3.5 text-red-500" />
                      Allergies
                      <button
                        type="button"
                        onClick={() => setShowAddAllergie(true)}
                        className="ml-auto flex items-center gap-1 px-2 py-0.5 text-[10px] bg-red-600 text-white rounded hover:bg-red-700">
                        <PlusIcon className="w-3 h-3" /> Ajouter
                      </button>
                    </h3>
                    {(patient.allergies ?? []).length === 0 ? (
                      <p className="text-[10px] text-gray-400 italic">Aucune allergie enregistrée</p>
                    ) : (
                      <div className="space-y-1.5">
                        {(patient.allergies ?? []).map((a) => (
                          <div key={a.id} className="flex items-start justify-between gap-1 p-1.5 bg-red-50 border border-red-100 rounded-lg">
                            <div className="flex items-start gap-1.5">
                              <AlertTriangleIcon className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-[11px] font-semibold text-red-800">{a.substance}</p>
                                {a.reaction && <p className="text-[10px] text-red-600">↳ {a.reaction}</p>}
                                {a.severite && <span className="inline-block mt-0.5 px-1.5 py-0.5 text-[9px] bg-red-100 text-red-700 rounded-full">{a.severite}</span>}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveAllergie(a.id)}
                              className="flex-shrink-0 p-0.5 text-red-400 hover:text-red-600 hover:bg-red-100 rounded">
                              <XCircleIcon className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  )}

                  {/* Contact urgence */}
                  {patient?.contactUrgenceNom && (
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <h3 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                      <PhoneIcon className="w-3.5 h-3.5 text-green-500" />
                      Contact d'urgence
                    </h3>
                    <div className="space-y-1 text-xs">
                      <p className="font-semibold text-gray-900">{patient.contactUrgencePrenom} {patient.contactUrgenceNom}</p>
                      {patient.contactUrgenceRelation && <p className="text-gray-500">{patient.contactUrgenceRelation}</p>}
                      {patient.contactUrgenceTelephone && (
                        <div className="flex items-center gap-1 text-gray-600">
                          <PhoneIcon className="w-3 h-3" />{patient.contactUrgenceTelephone}
                        </div>
                      )}
                    </div>
                  </div>
                  )}
                </div>
                <div className="col-span-2 space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <h3 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                      <HeartIcon className="w-3.5 h-3.5 text-red-500" />
                      Diagnostics Cardiologiques Principaux
                    </h3>
                    {isEditing ?
                  <div className="space-y-2">
                        {diagnostics.map((d, i) =>
                    <div key={i} className="grid grid-cols-[1fr,1.4fr,88px,auto] gap-1.5 items-center">
                            <input
                        value={d.title}
                        onChange={(e) => updateArrayItem(setDiagnostics, i, 'title', e.target.value)}
                        className="px-2 py-1 border border-gray-200 rounded bg-white text-xs"
                        placeholder="Titre" />

                            <input
                        value={d.sub}
                        onChange={(e) => updateArrayItem(setDiagnostics, i, 'sub', e.target.value)}
                        className="px-2 py-1 border border-gray-200 rounded bg-white text-xs"
                        placeholder="Détails" />

                            <select
                        value={d.color}
                        onChange={(e) => updateArrayItem(setDiagnostics, i, 'color', e.target.value)}
                        className="px-2 py-1 border border-gray-200 rounded bg-white text-xs">
                              {colorOptions.map((c) =>
                        <option key={c} value={c}>{c}</option>
                        )}
                            </select>
                            <button
                        type="button"
                        onClick={() => removeArrayItem(setDiagnostics, i)}
                        className="px-2 py-1 text-[10px] bg-red-100 text-red-700 rounded hover:bg-red-200">
                              Suppr.
                            </button>
                          </div>
                    )}
                        <button
                      type="button"
                      onClick={() => addArrayItem(setDiagnostics, {
                        color: 'red',
                        title: 'Nouveau diagnostic',
                        sub: ''
                      })}
                      className="w-full flex items-center justify-center gap-1 px-2 py-1 text-[10px] bg-white border border-gray-200 rounded hover:bg-gray-50">
                          <PlusIcon className="w-3 h-3" /> Ajouter un diagnostic
                        </button>
                      </div> :
                  <div className="space-y-1.5">
                        {diagnostics.map((d, i) =>
                    <div
                      key={i}
                      className={`flex items-start gap-2 p-2 bg-${d.color}-50 border border-${d.color}-200 rounded-lg`}>

                            <div
                        className={`w-1.5 h-1.5 bg-${d.color}-500 rounded-full mt-1.5 flex-shrink-0`} />

                            <div>
                              <p className={`text-xs font-semibold text-${d.color}-800`}>
                                {d.title}
                              </p>
                              <p className={`text-[10px] text-${d.color}-600`}>
                                {d.sub}
                              </p>
                            </div>
                          </div>
                    )}
                      </div>
                  }
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <h3 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                      <CalendarIcon className="w-3.5 h-3.5 text-red-500" />
                      Dernières Consultations
                    </h3>
                    {isEditing ?
                  <div className="space-y-2">
                        {consultationsData.map((c, i) =>
                    <div key={i} className="grid grid-cols-[120px,1fr,1fr,110px,auto] gap-1.5 items-center">
                            <input
                        value={c.date}
                        onChange={(e) => updateArrayItem(setConsultationsData, i, 'date', e.target.value)}
                        className="px-2 py-1 border border-gray-200 rounded bg-white text-xs"
                        placeholder="Date" />

                            <input
                        value={c.motif}
                        onChange={(e) => updateArrayItem(setConsultationsData, i, 'motif', e.target.value)}
                        className="px-2 py-1 border border-gray-200 rounded bg-white text-xs"
                        placeholder="Motif" />

                            <input
                        value={c.diagnostic}
                        onChange={(e) => updateArrayItem(setConsultationsData, i, 'diagnostic', e.target.value)}
                        className="px-2 py-1 border border-gray-200 rounded bg-white text-xs"
                        placeholder="Diagnostic" />

                            <input
                        value={c.type}
                        onChange={(e) => updateArrayItem(setConsultationsData, i, 'type', e.target.value)}
                        className="px-2 py-1 border border-gray-200 rounded bg-white text-xs"
                        placeholder="Type" />
                            <button
                        type="button"
                        onClick={() => removeArrayItem(setConsultationsData, i)}
                        className="px-2 py-1 text-[10px] bg-red-100 text-red-700 rounded hover:bg-red-200">
                              Suppr.
                            </button>
                          </div>
                    )}
                        <button
                      type="button"
                      onClick={() => addArrayItem(setConsultationsData, {
                        date: '',
                        motif: 'Nouvelle consultation',
                        diagnostic: '',
                        doctor: 'Dr. Mansouri',
                        type: 'Consultation'
                      })}
                      className="w-full flex items-center justify-center gap-1 px-2 py-1 text-[10px] bg-white border border-gray-200 rounded hover:bg-gray-50">
                          <PlusIcon className="w-3 h-3" /> Ajouter une consultation
                        </button>
                      </div> :
                  <div className="space-y-1.5">
                        {consultations.slice(0, 3).map((c, i) =>
                    <div
                      key={i}
                      className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded-lg">

                            <div className="flex items-center gap-2">
                              <div className="text-center min-w-[40px]">
                                <p className="text-xs font-bold text-gray-900">
                                  {c.date.split('/')[0]}/{c.date.split('/')[1]}
                                </p>
                                <p className="text-[10px] text-gray-500">
                                  {c.date.split('/')[2]}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-900">
                                  {c.motif}
                                </p>
                                <p className="text-[10px] text-gray-500">
                                  {c.diagnostic}
                                </p>
                              </div>
                            </div>
                            <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-full ${c.type === 'Urgence' ? 'bg-red-100 text-red-700' : c.type === 'Bilan' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>

                              {c.type}
                            </span>
                          </div>
                    )}
                      </div>
                  }
                  </div>
                </div>
              </div>
            </div>
          }

          {/* TAB 2: Antécédents */}
          {activeTab === 'antecedents' &&
          <div className="p-4 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-800">Antécédents Médicaux</h3>
                <p className="text-xs text-gray-500 mt-0.5">Historique médical complet du patient</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddAntecedent(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium shadow-sm">
                <PlusIcon className="w-3.5 h-3.5" />
                Ajouter antécédent
              </button>
            </div>

            {/* List */}
            {!patient ? (
              <p className="text-sm text-gray-500 italic">Chargement...</p>
            ) : (patient.antecedents ?? []).length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <ClipboardListIcon className="w-10 h-10 mb-2 opacity-40" />
                <p className="text-sm">Aucun antécédent enregistré</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(patient.antecedents ?? []).map((ant) => {
                  const typeColors: Record<string, string> = {
                    'Cardiovasculaire': 'bg-red-50 border-red-200 text-red-700',
                    'Familial': 'bg-purple-50 border-purple-200 text-purple-700',
                    'Chirurgical': 'bg-orange-50 border-orange-200 text-orange-700',
                    'Médical': 'bg-blue-50 border-blue-200 text-blue-700',
                    'Autre': 'bg-gray-50 border-gray-200 text-gray-700',
                  };
                  const clr = typeColors[ant.type] ?? typeColors['Autre'];
                  const [bgClass, borderClass] = clr.split(' ');
                  return (
                    <div key={ant.id} className={`rounded-lg border p-3 ${bgClass} ${borderClass}`}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold rounded-full ${clr}`}>
                              {ant.type}
                            </span>
                            {ant.anneeDebut && (
                              <span className="text-[10px] text-gray-500">
                                <CalendarIcon className="inline w-3 h-3 mr-0.5" />{ant.anneeDebut}
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-semibold text-gray-900">{ant.description}</p>
                          {ant.relation && (
                            <p className="text-[11px] text-gray-500 mt-0.5 flex items-center gap-1">
                              <UserIcon className="w-3 h-3" /> {ant.relation}
                            </p>
                          )}
                          {ant.notes && (
                            <p className="text-[11px] text-gray-400 mt-1 italic border-t border-gray-100 pt-1">{ant.notes}</p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveAntecedent(ant.id)}
                          title="Supprimer"
                          className="flex-shrink-0 p-0.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors">
                          <XCircleIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          }

                    {/* TAB 3: Examens & Bilans */}
          {activeTab === 'examens' &&
          <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-900">
                  Examens & Bilans Cardiologiques
                </h2>
                <button
                  onClick={openNewExamModal}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs hover:bg-red-700">
                  <PlusIcon className="w-3.5 h-3.5" />
                  Nouvel Examen
                </button>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <h3 className="text-xs font-semibold text-gray-700 mb-2">
                  Bilan Biologique Cardiaque (15/12/2024)
                </h3>
                {isEditing ?
              <div className="space-y-2">
                    {bioMetrics.map((item, i) =>
                <div key={i} className="grid grid-cols-[1fr,120px,1fr,88px,auto] gap-1.5 items-center bg-white rounded-lg p-2 border border-gray-200">
                        <input
                    value={item.label}
                    onChange={(e) => updateArrayItem(setBioMetrics, i, 'label', e.target.value)}
                    className="px-2 py-1 border border-gray-200 rounded text-xs"
                    placeholder="Paramètre" />
                        <input
                    value={item.val}
                    onChange={(e) => updateArrayItem(setBioMetrics, i, 'val', e.target.value)}
                    className="px-2 py-1 border border-gray-200 rounded text-xs"
                    placeholder="Valeur" />
                        <input
                    value={item.unit}
                    onChange={(e) => updateArrayItem(setBioMetrics, i, 'unit', e.target.value)}
                    className="px-2 py-1 border border-gray-200 rounded text-xs"
                    placeholder="Unité / Interprétation" />
                        <select
                    value={item.color}
                    onChange={(e) => updateArrayItem(setBioMetrics, i, 'color', e.target.value)}
                    className="px-2 py-1 border border-gray-200 rounded text-xs">
                          {colorOptions.map((c) =>
                    <option key={c} value={c}>{c}</option>
                    )}
                        </select>
                        <button
                    type="button"
                    onClick={() => removeArrayItem(setBioMetrics, i)}
                    className="px-2 py-1 text-[10px] bg-red-100 text-red-700 rounded hover:bg-red-200">
                          Suppr.
                        </button>
                      </div>
                )}
                    <button
                  type="button"
                  onClick={() => addArrayItem(setBioMetrics, {
                    label: 'Nouveau paramètre',
                    val: '',
                    unit: '',
                    color: 'blue'
                  })}
                  className="w-full flex items-center justify-center gap-1 px-2 py-1 text-[10px] bg-white border border-gray-200 rounded hover:bg-gray-50">
                      <PlusIcon className="w-3 h-3" /> Ajouter un paramètre
                    </button>
                  </div> :
              <div className="grid grid-cols-4 gap-2">
                    {bioMetrics.map((item, i) =>
                <div
                  key={i}
                  className={`bg-white rounded-lg p-2 border border-${item.color}-200`}>

                        <p className="text-[10px] text-gray-500">{item.label}</p>
                        <p className={`text-base font-bold text-${item.color}-600`}>
                          {item.val}
                        </p>
                        <p className={`text-[10px] text-${item.color}-600`}>
                          {item.unit}
                        </p>
                      </div>
                )}
                  </div>
              }
              </div>
              <div className="overflow-hidden border border-gray-200 rounded-lg">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      {[
                    'Date',
                    "Type d'Examen",
                    'Résultat',
                    'Statut',
                    'Médecin',
                    ''].
                    map((h) =>
                    <th
                      key={h}
                      className="text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">

                          {h}
                        </th>
                    )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {exams.map((exam, i) =>
                  <tr key={i} className="hover:bg-gray-50">
                        <td className="px-3 py-2 text-xs text-gray-600">
                          {exam.date}
                        </td>
                        <td className="px-3 py-2 text-xs font-medium text-gray-900">
                          {exam.type}
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-600 max-w-xs truncate">
                          {exam.result}
                        </td>
                        <td className="px-3 py-2">
                          <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${statusColor(exam.status)}`}>

                            {statusLabel(exam.status)}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-600">
                          {exam.doctor}
                        </td>
                        <td className="px-3 py-2">
                          <button
                            onClick={() => openExamDetails(exam)}
                            className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            title="Voir les détails">
                            <EyeIcon className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                  )}
                  </tbody>
                </table>
              </div>
            </div>
          }

          {/* TAB 4: Traitements */}
          {activeTab === 'traitements' &&
          <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-900">
                  Traitements Cardiologiques
                </h2>
                <button
                  onClick={addMedicationCard}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs hover:bg-red-700">
                  <PlusIcon className="w-3.5 h-3.5" />
                  Ajouter Traitement
                </button>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-gray-700 mb-2">
                  Médicaments Actifs (
                  {medications.filter((m) => m.status === 'actif').length})
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {medicationEntries.
                filter(({ med }) => med.status === 'actif').
                map(({ med, index }) =>
                <div
                  key={`${med.name}-${index}`}
                  className="bg-white border border-gray-200 rounded-lg p-3 hover:border-red-200 transition-colors">

                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-2">
                            <div className="w-7 h-7 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <PillIcon className="w-3.5 h-3.5 text-red-600" />
                            </div>
                            <div>
                              {isEditing ?
                            <div className="space-y-1.5 min-w-[240px]">
                                  <input
                                value={med.name}
                                onChange={(e) => updateArrayItem(setMedicationsData, index, 'name', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-200 rounded bg-white text-xs font-semibold text-gray-900"
                                placeholder="Médicament" />
                                  <div className="grid grid-cols-2 gap-1.5">
                                    <input
                                  value={med.dose}
                                  onChange={(e) => updateArrayItem(setMedicationsData, index, 'dose', e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-200 rounded bg-white text-xs text-gray-700"
                                  placeholder="Dose" />
                                    <input
                                  value={med.frequency}
                                  onChange={(e) => updateArrayItem(setMedicationsData, index, 'frequency', e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-200 rounded bg-white text-xs text-gray-700"
                                  placeholder="Fréquence" />
                                  </div>
                                  <input
                                value={med.since}
                                onChange={(e) => updateArrayItem(setMedicationsData, index, 'since', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-200 rounded bg-white text-xs text-gray-500"
                                placeholder="Depuis le" />
                                </div> :
                            <>
                                  <p className="text-xs font-semibold text-gray-900">
                                    {med.name}
                                  </p>
                                  <p className="text-[10px] text-gray-500">
                                    {med.dose} • {med.frequency}
                                  </p>
                                  <p className="text-[10px] text-gray-400 mt-0.5">
                                    Depuis le {med.since}
                                  </p>
                                </>
                            }
                            </div>
                          </div>
                          {isEditing ?
                        <select
                          value={med.status}
                          onChange={(e) => updateArrayItem(setMedicationsData, index, 'status', e.target.value)}
                          className="px-2 py-1 border border-gray-200 rounded bg-white text-[10px] text-gray-700">
                            <option value="actif">Actif</option>
                            <option value="suspendu">Suspendu</option>
                            <option value="arrêté">Arrêté</option>
                          </select> :
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-full ${medStatusColor(med.status)}`}>
                            {medStatusLabel(med.status)}
                          </span>
                        }
                        </div>
                      </div>
                )}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-gray-700 mb-2">
                  Médicaments Arrêtés
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {medicationEntries.
                filter(({ med }) => med.status !== 'actif').
                map(({ med, index }) =>
                <div
                  key={`${med.name}-${index}`}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-3 opacity-70">

                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-2">
                            <div className="w-7 h-7 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                              <PillIcon className="w-3.5 h-3.5 text-gray-400" />
                            </div>
                            <div>
                              {isEditing ?
                            <div className="space-y-1.5 min-w-[240px]">
                                  <input
                                value={med.name}
                                onChange={(e) => updateArrayItem(setMedicationsData, index, 'name', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-200 rounded bg-white text-xs font-semibold text-gray-700"
                                placeholder="Médicament" />
                                  <div className="grid grid-cols-2 gap-1.5">
                                    <input
                                  value={med.dose}
                                  onChange={(e) => updateArrayItem(setMedicationsData, index, 'dose', e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-200 rounded bg-white text-xs text-gray-700"
                                  placeholder="Dose" />
                                    <input
                                  value={med.frequency}
                                  onChange={(e) => updateArrayItem(setMedicationsData, index, 'frequency', e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-200 rounded bg-white text-xs text-gray-700"
                                  placeholder="Fréquence" />
                                  </div>
                                  <input
                                value={med.since}
                                onChange={(e) => updateArrayItem(setMedicationsData, index, 'since', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-200 rounded bg-white text-xs text-gray-500"
                                placeholder="Depuis le" />
                                </div> :
                            <>
                                  <p className="text-xs font-semibold text-gray-700">
                                    {med.name}
                                  </p>
                                  <p className="text-[10px] text-gray-500">
                                    {med.dose} • {med.frequency}
                                  </p>
                                </>
                            }
                            </div>
                          </div>
                          {isEditing ?
                        <select
                          value={med.status}
                          onChange={(e) => updateArrayItem(setMedicationsData, index, 'status', e.target.value)}
                          className="px-2 py-1 border border-gray-200 rounded bg-white text-[10px] text-gray-700">
                            <option value="actif">Actif</option>
                            <option value="suspendu">Suspendu</option>
                            <option value="arrêté">Arrêté</option>
                          </select> :
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-full ${medStatusColor(med.status)}`}>
                            {medStatusLabel(med.status)}
                          </span>
                        }
                        </div>
                      </div>
                )}
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-semibold text-red-800 flex items-center gap-1.5">
                    <ShieldIcon className="w-3.5 h-3.5" />
                    Protocoles Thérapeutiques Actifs
                  </h3>
                  {isEditing &&
                  <button
                    type="button"
                    onClick={addProtocolCard}
                    className="flex items-center gap-1 px-2 py-1 text-[10px] bg-white border border-red-200 text-red-700 rounded hover:bg-red-100">
                    <PlusIcon className="w-3 h-3" /> Ajouter
                  </button>
                  }
                </div>
                <div className="space-y-1.5">
                  {protocols.map((item, i) =>
                <div
                  key={`${item.title}-${i}`}
                  className="flex items-center justify-between p-2 bg-white border border-red-100 rounded-lg">

                      <div>
                        {isEditing ?
                      <div className="space-y-1.5 min-w-[280px]">
                            <input
                          value={item.title}
                          onChange={(e) => updateArrayItem(setProtocols, i, 'title', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-200 rounded bg-white text-xs font-semibold text-gray-900"
                          placeholder="Protocole" />
                            <input
                          value={item.sub}
                          onChange={(e) => updateArrayItem(setProtocols, i, 'sub', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-200 rounded bg-white text-[10px] text-gray-600"
                          placeholder="Description / détails" />
                          </div> :
                      <>
                            <p className="text-xs font-semibold text-gray-900">
                              {item.title}
                            </p>
                            <p className="text-[10px] text-gray-500">{item.sub}</p>
                          </>
                      }
                      </div>
                      {isEditing ?
                    <div className="flex items-center gap-1.5">
                          <select
                        value={item.status}
                        onChange={(e) =>
                        setProtocols((prev) =>
                        prev.map((protocol, protocolIndex) =>
                        protocolIndex === i ?
                        {
                          ...protocol,
                          status: e.target.value,
                          color: protocolStatusToTone(e.target.value)
                        } :
                        protocol
                        ))
                        }
                        className="px-2 py-1 border border-gray-200 rounded bg-white text-[10px] text-gray-700">
                            {protocolStatusOptions.map((status) =>
                        <option key={status} value={status}>{status}</option>
                        )}
                          </select>
                          <button
                        type="button"
                        onClick={() => removeArrayItem(setProtocols, i)}
                        className="px-2 py-1 text-[10px] bg-red-100 text-red-700 rounded hover:bg-red-200">
                            Suppr.
                          </button>
                        </div> :
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${protocolStatusColor(item.status)}`}>

                        {item.status}
                      </span>
                    }
                    </div>
                )}
                </div>
              </div>
            </div>
          }

          {/* TAB 5: Documents */}
          {activeTab === 'documents' &&
          <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-900">
                  Documents Médicaux
                </h2>
                <button
                  onClick={openNewDocumentModal}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs hover:bg-red-700">
                  <PlusIcon className="w-3.5 h-3.5" />
                  Ajouter Document
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {documents.map((doc, i) =>
              <div
                key={`${doc.name}-${doc.date}-${i}`}
                className="bg-white border border-gray-200 rounded-lg p-3 hover:border-red-200 hover:shadow-sm transition-all cursor-pointer">

                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {getDocumentIcon(doc.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-900 truncate">
                          {doc.name}
                        </p>
                        <p className="text-[10px] text-gray-500">
                          {doc.date} • {doc.size}
                        </p>
                        {doc.attachmentName &&
                        <p className="text-[10px] text-gray-400 truncate">
                          PJ: {doc.attachmentName}
                        </p>
                        }
                        <span className="inline-block mt-0.5 text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                          {doc.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-gray-100">
                      <button className="flex-1 flex items-center justify-center gap-1 py-1 text-[10px] text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <EyeIcon className="w-3 h-3" />
                        Voir
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-1 py-1 text-[10px] text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <DownloadIcon className="w-3 h-3" />
                        Télécharger
                      </button>
                      <button
                        onClick={() => removeDocument(i)}
                        className="flex-1 flex items-center justify-center gap-1 py-1 text-[10px] text-gray-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                        <XCircleIcon className="w-3 h-3" />
                        Supprimer
                      </button>
                    </div>
                  </div>
              )}
              </div>
            </div>
          }

          {/* TAB 6: Suivi & Évolution */}
          {activeTab === 'suivi' &&
          <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-900">
                  Suivi & Évolution Cardiologique
                </h2>
                <button
                  onClick={openNewNoteModal}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs hover:bg-red-700">
                  <PlusIcon className="w-3.5 h-3.5" />
                  Nouvelle Note
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {evolutionMetrics.map((item, i) =>
              <div
                key={`${item.label}-${i}`}
                className="bg-white border border-gray-200 rounded-lg p-2.5">

                    <div className="flex items-center justify-between mb-1">
                      {isEditing ?
                    <input
                      value={item.label}
                      onChange={(e) => updateArrayItem(setEvolutionMetrics, i, 'label', e.target.value)}
                      className="w-full mr-1 px-1.5 py-1 border border-gray-200 rounded text-[10px] text-gray-700"
                      placeholder="Indicateur" /> :
                    <p className="text-[10px] text-gray-500">{item.label}</p>
                    }
                      <div className={`flex items-center gap-0.5 ${item.up ? 'text-orange-500' : 'text-green-500'}`}>
                        {item.up ?
                      <TrendingUpIcon className="w-3 h-3" /> :
                      <TrendingDownIcon className="w-3 h-3" />
                      }
                        {isEditing ?
                      <input
                        value={item.trend}
                        onChange={(e) => updateArrayItem(setEvolutionMetrics, i, 'trend', e.target.value)}
                        className="w-16 px-1.5 py-1 border border-gray-200 rounded text-[10px]"
                        placeholder="Trend" /> :
                      <span className="text-[10px]">{item.trend}</span>
                      }
                      </div>
                    </div>
                    {isEditing ?
                  <div className="space-y-1">
                        <input
                      value={item.val}
                      onChange={(e) => updateArrayItem(setEvolutionMetrics, i, 'val', e.target.value)}
                      className="w-full px-1.5 py-1 border border-gray-200 rounded text-xs font-semibold"
                      placeholder="Valeur" />
                        <input
                      value={item.sub}
                      onChange={(e) => updateArrayItem(setEvolutionMetrics, i, 'sub', e.target.value)}
                      className="w-full px-1.5 py-1 border border-gray-200 rounded text-[10px]"
                      placeholder="Description" />
                        <div className="flex items-center gap-1">
                          <select
                        value={item.up ? 'up' : 'down'}
                        onChange={(e) => {
                          const newUp = e.target.value === 'up';
                          updateArrayItem(setEvolutionMetrics, i, 'up', newUp);
                          updateArrayItem(setEvolutionMetrics, i, 'color', metricTrendToColor(newUp));
                        }}
                        className="px-1.5 py-1 border border-gray-200 rounded text-[10px] bg-white">
                            <option value="up">Hausse</option>
                            <option value="down">Baisse</option>
                          </select>
                          <button
                        type="button"
                        onClick={() => removeArrayItem(setEvolutionMetrics, i)}
                        className="px-1.5 py-1 text-[10px] bg-red-100 text-red-700 rounded hover:bg-red-200">
                            Suppr.
                          </button>
                        </div>
                      </div> :
                  <>
                        <p className={`text-xl font-bold text-${item.color}-600`}>
                          {item.val}
                        </p>
                        <p className="text-[10px] text-gray-400">{item.sub}</p>
                      </>
                  }
                  </div>
              )}
              </div>
              {isEditing &&
              <button
                type="button"
                onClick={() => addArrayItem(setEvolutionMetrics, {
                  label: 'Nouvel indicateur',
                  val: '',
                  sub: '',
                  trend: '',
                  up: true,
                  color: metricTrendToColor(true)
                })}
                className="px-2 py-1 text-[10px] bg-white border border-gray-200 rounded hover:bg-gray-50">
                <PlusIcon className="w-3 h-3 inline mr-1" /> Ajouter indicateur
              </button>
              }
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5 text-red-500" />
                    Prochains Rendez-vous
                  </h3>
                  {isEditing &&
                  <button
                    type="button"
                    onClick={() => addArrayItem(setUpcomingAppointments, {
                      day: '01',
                      month: 'Jan 2026',
                      title: 'Nouveau rendez-vous',
                      sub: '',
                      badge: 'Suivi',
                      color: 'blue'
                    })}
                    className="px-2 py-1 text-[10px] bg-white border border-gray-200 rounded hover:bg-gray-50">
                    <PlusIcon className="w-3 h-3 inline mr-1" /> Ajouter RDV
                  </button>
                  }
                </div>
                <div className="space-y-1.5">
                  {upcomingAppointments.map((item, i) =>
                <div
                  key={`${item.title}-${item.day}-${i}`}
                  className={`flex items-center justify-between p-2 bg-white border border-${item.color}-200 rounded-lg`}>

                      <div className="flex items-center gap-2">
                        {isEditing ?
                      <div className="grid grid-cols-2 gap-1 min-w-[96px]">
                            <input
                          value={item.day}
                          onChange={(e) => updateArrayItem(setUpcomingAppointments, i, 'day', e.target.value)}
                          className="px-1.5 py-1 border border-gray-200 rounded text-[10px]"
                          placeholder="Jour" />
                            <input
                          value={item.month}
                          onChange={(e) => updateArrayItem(setUpcomingAppointments, i, 'month', e.target.value)}
                          className="px-1.5 py-1 border border-gray-200 rounded text-[10px]"
                          placeholder="Mois" />
                          </div> :
                      <div className="text-center min-w-[36px]">
                            <p className={`text-xs font-bold text-${item.color}-600`}>
                              {item.day}
                            </p>
                            <p className="text-[10px] text-gray-500">
                              {item.month}
                            </p>
                          </div>
                      }
                        <div>
                          {isEditing ?
                        <div className="space-y-1 min-w-[280px]">
                              <input
                            value={item.title}
                            onChange={(e) => updateArrayItem(setUpcomingAppointments, i, 'title', e.target.value)}
                            className="w-full px-1.5 py-1 border border-gray-200 rounded text-xs"
                            placeholder="Titre" />
                              <input
                            value={item.sub}
                            onChange={(e) => updateArrayItem(setUpcomingAppointments, i, 'sub', e.target.value)}
                            className="w-full px-1.5 py-1 border border-gray-200 rounded text-[10px]"
                            placeholder="Détails" />
                            </div> :
                        <>
                              <p className="text-xs font-semibold text-gray-900">
                                {item.title}
                              </p>
                              <p className="text-[10px] text-gray-500">
                                {item.sub}
                              </p>
                            </>
                        }
                        </div>
                      </div>
                      {isEditing ?
                    <div className="flex items-center gap-1">
                          <input
                        value={item.badge}
                        onChange={(e) => updateArrayItem(setUpcomingAppointments, i, 'badge', e.target.value)}
                        className="w-20 px-1.5 py-1 border border-gray-200 rounded text-[10px]"
                        placeholder="Badge" />
                          <select
                        value={item.color}
                        onChange={(e) => updateArrayItem(setUpcomingAppointments, i, 'color', e.target.value)}
                        className="px-1.5 py-1 border border-gray-200 rounded text-[10px] bg-white">
                            {colorOptions.map((c) =>
                        <option key={c} value={c}>{c}</option>
                        )}
                          </select>
                          <button
                        type="button"
                        onClick={() => removeArrayItem(setUpcomingAppointments, i)}
                        className="px-1.5 py-1 text-[10px] bg-red-100 text-red-700 rounded hover:bg-red-200">
                            Suppr.
                          </button>
                        </div> :
                    <span
                      className={`text-[10px] px-1.5 py-0.5 bg-${item.color}-100 text-${item.color}-700 rounded-full`}>
                        {item.badge}
                      </span>
                    }
                    </div>
                )}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-semibold text-gray-700">
                    Notes de Suivi
                  </h3>
                  {isEditing &&
                  <button
                    type="button"
                    onClick={() => addArrayItem(setFollowUpNotes, {
                      doctor: 'Dr. Mansouri',
                      date: '',
                      note: ''
                    })}
                    className="px-2 py-1 text-[10px] bg-white border border-gray-200 rounded hover:bg-gray-50">
                    <PlusIcon className="w-3 h-3 inline mr-1" /> Ajouter note
                  </button>
                  }
                </div>
                <div className="space-y-2">
                  {followUpNotes.map((item, i) =>
                <div
                  key={`${item.doctor}-${item.date}-${i}`}
                  className="bg-white border border-gray-200 rounded-lg p-3">

                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                            <UserIcon className="w-3 h-3 text-red-600" />
                          </div>
                          {isEditing ?
                        <input
                          value={item.doctor}
                          onChange={(e) => updateArrayItem(setFollowUpNotes, i, 'doctor', e.target.value)}
                          className="px-2 py-1 border border-gray-200 rounded text-xs font-semibold text-gray-900"
                          placeholder="Médecin" /> :
                        <span className="text-xs font-semibold text-gray-900">
                              {item.doctor}
                            </span>
                        }
                        </div>
                        <div className="flex items-center gap-1">
                          {isEditing ?
                        <input
                          value={item.date}
                          onChange={(e) => updateArrayItem(setFollowUpNotes, i, 'date', e.target.value)}
                          className="px-2 py-1 border border-gray-200 rounded text-[10px] text-gray-500"
                          placeholder="Date" /> :
                        <span className="text-[10px] text-gray-500">
                              {item.date}
                            </span>
                        }
                          {isEditing &&
                        <button
                          type="button"
                          onClick={() => removeArrayItem(setFollowUpNotes, i)}
                          className="px-1.5 py-1 text-[10px] bg-red-100 text-red-700 rounded hover:bg-red-200">
                            Suppr.
                          </button>
                        }
                        </div>
                      </div>
                      {isEditing ?
                    <textarea
                      rows={4}
                      value={item.note}
                      onChange={(e) => updateArrayItem(setFollowUpNotes, i, 'note', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-200 rounded text-xs text-gray-700 resize-none"
                      placeholder="Contenu de la note" /> :
                    <p className="text-xs text-gray-700">{item.note}</p>
                    }
                    </div>
                )}
                </div>
              </div>
            </div>
          }
        </div>
      </div>

      {isExamDetailsOpen && selectedExam &&
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden">
            <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-xl">
              <div>
                <h3 className="text-sm font-semibold text-red-800">Détail de l'examen</h3>
                <p className="text-xs text-red-600 mt-0.5">{isExamEditMode ? 'Modification de l\'examen' : 'Consultation des résultats et métadonnées'}</p>
              </div>
              <button
                onClick={closeExamDetails}
                className="rounded-md p-1 text-red-600 hover:bg-red-100"
                aria-label="Fermer">
                <XCircleIcon className="w-4 h-4" />
              </button>
            </div>

            {isExamEditMode ?
            <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-gray-600 mb-1">Date</label>
                    <input
                      type="date"
                      value={examEditForm.date}
                      onChange={(e) =>
                      setExamEditForm((prev) => ({
                        ...prev,
                        date: e.target.value
                      }))
                      }
                      className="w-full px-2.5 py-2 border border-gray-200 rounded-lg text-xs" />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-600 mb-1">Statut</label>
                    <select
                      value={examEditForm.status}
                      onChange={(e) =>
                      setExamEditForm((prev) => ({
                        ...prev,
                        status: e.target.value as Exam['status']
                      }))
                      }
                      className="w-full px-2.5 py-2 border border-gray-200 rounded-lg text-xs bg-white">
                      <option value="normal">Normal</option>
                      <option value="à_surveiller">À surveiller</option>
                      <option value="anormal">Anormal</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-gray-600 mb-1">Type d'examen</label>
                  <input
                    type="text"
                    value={examEditForm.type}
                    onChange={(e) =>
                    setExamEditForm((prev) => ({
                      ...prev,
                      type: e.target.value
                    }))
                    }
                    className="w-full px-2.5 py-2 border border-gray-200 rounded-lg text-xs" />
                </div>

                <div>
                  <label className="block text-[11px] text-gray-600 mb-1">Résultat détaillé</label>
                  <textarea
                    rows={4}
                    value={examEditForm.result}
                    onChange={(e) =>
                    setExamEditForm((prev) => ({
                      ...prev,
                      result: e.target.value
                    }))
                    }
                    className="w-full px-2.5 py-2 border border-gray-200 rounded-lg text-xs resize-none" />
                </div>

                <div>
                  <label className="block text-[11px] text-gray-600 mb-1">Médecin</label>
                  <input
                    type="text"
                    value={examEditForm.doctor}
                    onChange={(e) =>
                    setExamEditForm((prev) => ({
                      ...prev,
                      doctor: e.target.value
                    }))
                    }
                    className="w-full px-2.5 py-2 border border-gray-200 rounded-lg text-xs" />
                </div>

                {examEditError &&
                <div className="text-[11px] text-red-700 bg-red-50 border border-red-200 rounded-lg px-2.5 py-2">
                    {examEditError}
                  </div>
                }
              </div> :
            <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">Date</p>
                    <p className="text-sm font-semibold text-gray-900 mt-0.5">{selectedExam.date}</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">Statut</p>
                    <span className={`inline-flex mt-1 text-[11px] px-2 py-0.5 rounded-full font-medium ${statusColor(selectedExam.status)}`}>
                      {statusLabel(selectedExam.status)}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide">Type d'examen</p>
                  <p className="text-sm font-semibold text-gray-900 mt-0.5">{selectedExam.type}</p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide">Résultat détaillé</p>
                  <p className="text-xs text-gray-800 mt-1 leading-relaxed">{selectedExam.result}</p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide">Médecin prescripteur / validateur</p>
                  <p className="text-sm font-medium text-gray-900 mt-0.5">{selectedExam.doctor}</p>
                </div>
              </div>
            }

            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between gap-2">
              <button
                onClick={deleteSelectedExam}
                className="px-3 py-1.5 text-xs rounded-lg bg-red-100 text-red-700 hover:bg-red-200">
                Supprimer
              </button>
              <div className="flex items-center gap-2">
                {isExamEditMode ?
                <>
                    <button
                    onClick={cancelEditSelectedExam}
                    className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-100">
                      Annuler
                    </button>
                    <button
                    onClick={saveSelectedExam}
                    className="px-3 py-1.5 text-xs rounded-lg bg-red-600 text-white hover:bg-red-700">
                      Enregistrer
                    </button>
                  </> :
                <button
                  onClick={editSelectedExam}
                  className="px-3 py-1.5 text-xs rounded-lg bg-red-600 text-white hover:bg-red-700">
                    Modifier
                  </button>
                }
              </div>
            </div>
          </div>
        </div>
      }

      {isNewExamOpen &&
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden">
            <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-xl">
              <div>
                <h3 className="text-sm font-semibold text-red-800">Nouvel Examen</h3>
                <p className="text-xs text-red-600 mt-0.5">Création d'un nouvel examen et ajout au datagrid</p>
              </div>
              <button
                onClick={closeNewExamModal}
                className="rounded-md p-1 text-red-600 hover:bg-red-100"
                aria-label="Fermer">
                <XCircleIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-gray-600 mb-1">Date</label>
                  <input
                    type="date"
                    value={newExamForm.date}
                    onChange={(e) =>
                    setNewExamForm((prev) => ({
                      ...prev,
                      date: e.target.value
                    }))
                    }
                    className="w-full px-2.5 py-2 border border-gray-200 rounded-lg text-xs" />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-600 mb-1">Statut</label>
                  <select
                    value={newExamForm.status}
                    onChange={(e) =>
                    setNewExamForm((prev) => ({
                      ...prev,
                      status: e.target.value as Exam['status']
                    }))
                    }
                    className="w-full px-2.5 py-2 border border-gray-200 rounded-lg text-xs bg-white">
                    <option value="normal">Normal</option>
                    <option value="à_surveiller">À surveiller</option>
                    <option value="anormal">Anormal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-gray-600 mb-1">Type d'examen</label>
                <input
                  type="text"
                  value={newExamForm.type}
                  onChange={(e) =>
                  setNewExamForm((prev) => ({
                    ...prev,
                    type: e.target.value
                  }))
                  }
                  placeholder="Ex: Échocardiographie, Holter ECG 24h..."
                  className="w-full px-2.5 py-2 border border-gray-200 rounded-lg text-xs" />
              </div>

              <div>
                <label className="block text-[11px] text-gray-600 mb-1">Résultat</label>
                <textarea
                  value={newExamForm.result}
                  onChange={(e) =>
                  setNewExamForm((prev) => ({
                    ...prev,
                    result: e.target.value
                  }))
                  }
                  rows={4}
                  placeholder="Résultat clinique détaillé..."
                  className="w-full px-2.5 py-2 border border-gray-200 rounded-lg text-xs resize-none" />
              </div>

              <div>
                <label className="block text-[11px] text-gray-600 mb-1">Médecin</label>
                <input
                  type="text"
                  value={newExamForm.doctor}
                  onChange={(e) =>
                  setNewExamForm((prev) => ({
                    ...prev,
                    doctor: e.target.value
                  }))
                  }
                  className="w-full px-2.5 py-2 border border-gray-200 rounded-lg text-xs" />
              </div>

              {newExamError &&
              <div className="text-[11px] text-red-700 bg-red-50 border border-red-200 rounded-lg px-2.5 py-2">
                  {newExamError}
                </div>
              }
            </div>

            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-2">
              <button
                onClick={closeNewExamModal}
                className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-100">
                Annuler
              </button>
              <button
                onClick={createExam}
                className="px-3 py-1.5 text-xs rounded-lg bg-red-600 text-white hover:bg-red-700">
                Enregistrer l'examen
              </button>
            </div>
          </div>
        </div>
      }

      {isNewDocumentOpen &&
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden">
            <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-xl">
              <div>
                <h3 className="text-sm font-semibold text-red-800">Ajouter Document</h3>
                <p className="text-xs text-red-600 mt-0.5">Ajout d'un document médical à la grille</p>
              </div>
              <button
                onClick={closeNewDocumentModal}
                className="rounded-md p-1 text-red-600 hover:bg-red-100"
                aria-label="Fermer">
                <XCircleIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <label className="block text-[11px] text-gray-600 mb-1">Nom du document</label>
                <input
                  type="text"
                  value={newDocumentForm.name}
                  onChange={(e) =>
                  setNewDocumentForm((prev) => ({
                    ...prev,
                    name: e.target.value
                  }))
                  }
                  className="w-full px-2.5 py-2 border border-gray-200 rounded-lg text-xs"
                  placeholder="Ex: Holter tensionnel, compte-rendu..." />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-gray-600 mb-1">Date</label>
                  <input
                    type="date"
                    value={newDocumentForm.date}
                    onChange={(e) =>
                    setNewDocumentForm((prev) => ({
                      ...prev,
                      date: e.target.value
                    }))
                    }
                    className="w-full px-2.5 py-2 border border-gray-200 rounded-lg text-xs" />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-600 mb-1">Type</label>
                  <select
                    value={newDocumentForm.type}
                    onChange={(e) =>
                    setNewDocumentForm((prev) => ({
                      ...prev,
                      type: e.target.value
                    }))
                    }
                    className="w-full px-2.5 py-2 border border-gray-200 rounded-lg text-xs bg-white">
                    <option value="Rapport">Rapport</option>
                    <option value="ECG">ECG</option>
                    <option value="Imagerie">Imagerie</option>
                    <option value="Biologie">Biologie</option>
                    <option value="Ordonnance">Ordonnance</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-gray-600 mb-1">Pièce jointe</label>
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
                    setNewDocumentFile(file);
                  }}
                  className="w-full px-2.5 py-2 border border-gray-200 rounded-lg text-xs bg-white" />
                {newDocumentFile &&
                <p className="text-[10px] text-gray-500 mt-1">
                    {newDocumentFile.name} • {formatFileSize(newDocumentFile.size)}
                  </p>
                }
              </div>

              {newDocumentError &&
              <div className="text-[11px] text-red-700 bg-red-50 border border-red-200 rounded-lg px-2.5 py-2">
                  {newDocumentError}
                </div>
              }
            </div>

            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-2">
              <button
                onClick={closeNewDocumentModal}
                className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-100">
                Annuler
              </button>
              <button
                onClick={createDocument}
                className="px-3 py-1.5 text-xs rounded-lg bg-red-600 text-white hover:bg-red-700">
                Enregistrer le document
              </button>
            </div>
          </div>
        </div>
      }

      {isNewNoteOpen &&
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden">
            <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-xl">
              <div>
                <h3 className="text-sm font-semibold text-red-800">Nouvelle Note de Suivi</h3>
                <p className="text-xs text-red-600 mt-0.5">Ajouter une note clinique au suivi cardiologique</p>
              </div>
              <button
                onClick={closeNewNoteModal}
                className="rounded-md p-1 text-red-600 hover:bg-red-100"
                aria-label="Fermer">
                <XCircleIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-gray-600 mb-1">Médecin</label>
                  <input
                    type="text"
                    value={newNoteForm.doctor}
                    onChange={(e) =>
                    setNewNoteForm((prev) => ({
                      ...prev,
                      doctor: e.target.value
                    }))
                    }
                    className="w-full px-2.5 py-2 border border-gray-200 rounded-lg text-xs"
                    placeholder="Ex: Dr. Mansouri" />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-600 mb-1">Date et heure</label>
                  <input
                    type="datetime-local"
                    value={newNoteForm.dateTime}
                    onChange={(e) =>
                    setNewNoteForm((prev) => ({
                      ...prev,
                      dateTime: e.target.value
                    }))
                    }
                    className="w-full px-2.5 py-2 border border-gray-200 rounded-lg text-xs" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-gray-600 mb-1">Contenu de la note</label>
                <textarea
                  rows={6}
                  value={newNoteForm.note}
                  onChange={(e) =>
                  setNewNoteForm((prev) => ({
                    ...prev,
                    note: e.target.value
                  }))
                  }
                  className="w-full px-2.5 py-2 border border-gray-200 rounded-lg text-xs resize-none"
                  placeholder="Saisir les observations cliniques, décisions thérapeutiques, plan de suivi..." />
              </div>

              {newNoteError &&
              <div className="text-[11px] text-red-700 bg-red-50 border border-red-200 rounded-lg px-2.5 py-2">
                  {newNoteError}
                </div>
              }
            </div>

            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-2">
              <button
                onClick={closeNewNoteModal}
                className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-100">
                Annuler
              </button>
              <button
                onClick={createFollowUpNote}
                className="px-3 py-1.5 text-xs rounded-lg bg-red-600 text-white hover:bg-red-700">
                Enregistrer la note
              </button>
            </div>
          </div>
        </div>
      }

      {/* ── Modal: Ajouter Allergie ─────────────────────────────── */}
      {showAddAllergie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <AlertTriangleIcon className="w-4 h-4 text-red-500" />
                Ajouter une allergie
              </h2>
              <button type="button" onClick={() => { setShowAddAllergie(false); setAllergieError(''); setAllergieForm({ substance: '', reaction: '', severite: '', notes: '' }); }}
                className="text-gray-400 hover:text-gray-600">
                <XCircleIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-3">
              {allergieError && <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded p-2">{allergieError}</p>}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Substance <span className="text-red-500">*</span></label>
                <input type="text" value={allergieForm.substance}
                  onChange={e => setAllergieForm(f => ({ ...f, substance: e.target.value }))}
                  placeholder="Ex: Pénicilline, Aspirine…"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-400" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Réaction</label>
                <input type="text" value={allergieForm.reaction}
                  onChange={e => setAllergieForm(f => ({ ...f, reaction: e.target.value }))}
                  placeholder="Ex: Urticaire, Anaphylaxie…"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-400" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Sévérité</label>
                <select value={allergieForm.severite}
                  onChange={e => setAllergieForm(f => ({ ...f, severite: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-400">
                  <option value="">— Sélectionner —</option>
                  <option value="Légère">Légère</option>
                  <option value="Modérée">Modérée</option>
                  <option value="Sévère">Sévère</option>
                  <option value="Critique">Critique</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Notes</label>
                <textarea value={allergieForm.notes}
                  onChange={e => setAllergieForm(f => ({ ...f, notes: e.target.value }))}
                  rows={2} placeholder="Informations complémentaires…"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-400 resize-none" />
              </div>
            </div>
            <div className="flex justify-end gap-2 px-5 py-4 border-t bg-gray-50 rounded-b-xl">
              <button type="button"
                onClick={() => { setShowAddAllergie(false); setAllergieError(''); setAllergieForm({ substance: '', reaction: '', severite: '', notes: '' }); }}
                className="px-4 py-2 text-xs text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                Annuler
              </button>
              <button type="button" onClick={handleAddAllergie} disabled={allergieLoading}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-1.5">
                {allergieLoading ? <><span className="animate-spin w-3 h-3 border-2 border-white border-t-transparent rounded-full inline-block"></span> Enregistrement…</> : <><PlusIcon className="w-3.5 h-3.5" /> Ajouter</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Ajouter Antécédent ─────────────────────────────── */}
      {showAddAntecedent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <ClipboardListIcon className="w-4 h-4 text-blue-500" />
                Ajouter un antécédent
              </h2>
              <button type="button" onClick={() => { setShowAddAntecedent(false); setAntecedentError(''); setAntecedentForm({ type: '', description: '', relation: '', anneeDebut: '', notes: '' }); }}
                className="text-gray-400 hover:text-gray-600">
                <XCircleIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-3">
              {antecedentError && <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded p-2">{antecedentError}</p>}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Type <span className="text-red-500">*</span></label>
                <select value={antecedentForm.type}
                  onChange={e => setAntecedentForm(f => ({ ...f, type: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400">
                  <option value="">— Sélectionner —</option>
                  <option value="Cardiovasculaire">Cardiovasculaire</option>
                  <option value="Familial">Familial</option>
                  <option value="Chirurgical">Chirurgical</option>
                  <option value="Médical">Médical</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
                <textarea value={antecedentForm.description}
                  onChange={e => setAntecedentForm(f => ({ ...f, description: e.target.value }))}
                  rows={2} placeholder="Description de l'antécédent…"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Relation (familial)</label>
                  <input type="text" value={antecedentForm.relation}
                    onChange={e => setAntecedentForm(f => ({ ...f, relation: e.target.value }))}
                    placeholder="Ex: Père, Mère…"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Année de début</label>
                  <input type="number" value={antecedentForm.anneeDebut}
                    onChange={e => setAntecedentForm(f => ({ ...f, anneeDebut: e.target.value }))}
                    placeholder="Ex: 2015"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Notes</label>
                <textarea value={antecedentForm.notes}
                  onChange={e => setAntecedentForm(f => ({ ...f, notes: e.target.value }))}
                  rows={2} placeholder="Informations complémentaires…"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none" />
              </div>
            </div>
            <div className="flex justify-end gap-2 px-5 py-4 border-t bg-gray-50 rounded-b-xl">
              <button type="button"
                onClick={() => { setShowAddAntecedent(false); setAntecedentError(''); setAntecedentForm({ type: '', description: '', relation: '', anneeDebut: '', notes: '' }); }}
                className="px-4 py-2 text-xs text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                Annuler
              </button>
              <button type="button" onClick={handleAddAntecedent} disabled={antecedentLoading}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1.5">
                {antecedentLoading ? <><span className="animate-spin w-3 h-3 border-2 border-white border-t-transparent rounded-full inline-block"></span> Enregistrement…</> : <><PlusIcon className="w-3.5 h-3.5" /> Ajouter</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>);

}
export default PatientManagement;