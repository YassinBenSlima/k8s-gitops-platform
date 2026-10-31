import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCardIcon,
  SearchIcon,
  PlusIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  TrendingUpIcon,
  FilterIcon,
  DownloadIcon,
  FileTextIcon,
  ActivityIcon,
  HeartIcon,
  ZapIcon,
  BanknoteIcon,
  ClipboardIcon,
  CopyIcon,
  XIcon,
  BarChart2Icon,
  CalendarIcon,
  RefreshCwIcon,
  PrinterIcon,
  CheckIcon,
  ArrowLeftIcon,
  AlertCircleIcon,
  DollarSignIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  EyeIcon } from
'lucide-react';
import { usePatient } from '../contexts/PatientContext';
// ─── TYPES ────────────────────────────────────────────────────────────────────
interface BillingRecord {
  id: number;
  patient: string;
  date: string;
  procedure: string;
  cptCode: string;
  amount: number;
  insurance: string;
  status: 'validated' | 'pending' | 'rejected' | 'paid';
}
interface CPTCode {
  code: string;
  description: string;
  price: number;
  category: string;
}
interface InsuranceProvider {
  name: string;
  acceptanceRate: number;
  avgProcessingDays: number;
  pendingClaims: number;
  color: string;
}
interface PaymentLink {
  id: string;
  patient: string;
  amount: number;
  createdDate: string;
  status: 'active' | 'expired' | 'used';
  link: string;
}
interface PaymentPlan {
  id: string;
  patient: string;
  totalAmount: number;
  monthlyAmount: number;
  duration: number;
  paidMonths: number;
  status: 'active' | 'completed' | 'late';
  relatedRecordIds: number[];
  installments: PaymentInstallment[];
}
interface PaymentInstallment {
  id: string;
  dueDate: string;
  amount: number;
  status: 'pending' | 'paid' | 'late';
}
interface FSEActLine {
  id: string;
  code: string;
  description: string;
  amount: string;
}
interface CnamPrintActLine {
  date: string;
  designation: string;
  codeActe: string;
  honoraires: string;
  codeConventionnel: string;
}
interface CnamPrintPreviewData {
  fseId: string;
  patientName: string;
  patientGender: string;
  patientAge: number;
  patientPhone: string;
  patientDossier: string;
  patientBirthDate: string;
  dateSoins: string;
  mutuelle: string;
  practitioner: string;
  matriculeFiscal: string;
  acts: CnamPrintActLine[];
  totalAmount: number;
  notes: string;
}
interface DevisRecord {
  id: string;
  number: string;
  patient: string;
  date: string;
  acts: string;
  totalAmount: number;
  status: 'accepted' | 'pending' | 'rejected';
}
interface FSERecord {
  id: string;
  patient: string;
  date: string;
  act: string;
  amount: number;
  organism: string;
  reimbursementStatus: 'in_progress' | 'reimbursed' | 'rejected';
  reimbursementDate: string;
}
// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const billingRecords: BillingRecord[] = [
{
  id: 1,
  patient: 'Jean-Pierre Moreau',
  date: '28/02/2026',
  procedure: 'ECG 12 dérivations',
  cptCode: '93000',
  amount: 85,
  insurance: 'CPAM',
  status: 'validated'
},
{
  id: 2,
  patient: 'Marie Lefevre',
  date: '28/02/2026',
  procedure: 'Échocardiographie Doppler',
  cptCode: '93306',
  amount: 320,
  insurance: 'Mutuelle Santé',
  status: 'pending'
},
{
  id: 3,
  patient: 'Robert Blanc',
  date: '27/02/2026',
  procedure: "Test d'effort",
  cptCode: '93015',
  amount: 250,
  insurance: 'CPAM',
  status: 'validated'
},
{
  id: 4,
  patient: 'Sylvie Dupont',
  date: '27/02/2026',
  procedure: 'Holter 24h',
  cptCode: '93224',
  amount: 180,
  insurance: 'AXA Santé',
  status: 'rejected'
},
{
  id: 5,
  patient: 'Michel Bernard',
  date: '26/02/2026',
  procedure: 'Consultation cardio',
  cptCode: '99213',
  amount: 65,
  insurance: 'CPAM',
  status: 'validated'
},
{
  id: 6,
  patient: 'Françoise Martin',
  date: '26/02/2026',
  procedure: 'Consultation complexe',
  cptCode: '99214',
  amount: 95,
  insurance: 'Harmonie Mutuelle',
  status: 'pending'
},
{
  id: 7,
  patient: 'André Rousseau',
  date: '25/02/2026',
  procedure: "ECG d'effort",
  cptCode: '93017',
  amount: 150,
  insurance: 'CPAM',
  status: 'validated'
},
{
  id: 8,
  patient: 'Isabelle Petit',
  date: '25/02/2026',
  procedure: 'Écho de stress',
  cptCode: '93351',
  amount: 450,
  insurance: 'Mutuelle Santé',
  status: 'pending'
}];

const cptCodes: CPTCode[] = [
{
  code: '93000',
  description: 'ECG avec interprétation',
  price: 85,
  category: 'ECG'
},
{
  code: '93306',
  description: 'Échocardiographie Doppler',
  price: 320,
  category: 'Imagerie'
},
{
  code: '93015',
  description: "Test d'effort",
  price: 250,
  category: 'Exploration'
},
{
  code: '93224',
  description: 'Holter 24h',
  price: 180,
  category: 'Monitoring'
},
{
  code: '93458',
  description: 'Cathétérisme cardiaque',
  price: 1200,
  category: 'Intervention'
},
{
  code: '99213',
  description: 'Consultation établie',
  price: 65,
  category: 'Consultation'
},
{
  code: '99214',
  description: 'Consultation complexe',
  price: 95,
  category: 'Consultation'
},
{
  code: '93017',
  description: "ECG d'effort",
  price: 150,
  category: 'ECG'
},
{
  code: '93351',
  description: 'Écho de stress',
  price: 450,
  category: 'Imagerie'
},
{
  code: '93653',
  description: 'Ablation AFib',
  price: 3500,
  category: 'Intervention'
},
{
  code: '93280',
  description: 'Implantation pacemaker',
  price: 2800,
  category: 'Intervention'
},
{
  code: '93798',
  description: 'Réhabilitation cardiaque',
  price: 120,
  category: 'Rééducation'
}];

const insuranceProviders: InsuranceProvider[] = [
{
  name: 'CNAM',
  acceptanceRate: 94,
  avgProcessingDays: 12,
  pendingClaims: 8,
  color: 'blue'
},
{
  name: 'Mutuelle Santé',
  acceptanceRate: 88,
  avgProcessingDays: 18,
  pendingClaims: 5,
  color: 'emerald'
},
{
  name: 'AXA Santé',
  acceptanceRate: 82,
  avgProcessingDays: 21,
  pendingClaims: 3,
  color: 'amber'
},
{
  name: 'Harmonie Mutuelle',
  acceptanceRate: 91,
  avgProcessingDays: 15,
  pendingClaims: 4,
  color: 'purple'
}];

const paymentLinks: PaymentLink[] = [
{
  id: 'pl1',
  patient: 'Marie Lefevre',
  amount: 320,
  createdDate: '28/02/2026',
  status: 'active',
  link: 'https://pay.cardio.fr/ml-320'
},
{
  id: 'pl2',
  patient: 'Françoise Martin',
  amount: 95,
  createdDate: '26/02/2026',
  status: 'used',
  link: 'https://pay.cardio.fr/fm-095'
},
{
  id: 'pl3',
  patient: 'Isabelle Petit',
  amount: 450,
  createdDate: '25/02/2026',
  status: 'active',
  link: 'https://pay.cardio.fr/ip-450'
},
{
  id: 'pl4',
  patient: 'Sylvie Dupont',
  amount: 180,
  createdDate: '20/02/2026',
  status: 'expired',
  link: 'https://pay.cardio.fr/sd-180'
},
{
  id: 'pl5',
  patient: 'Robert Blanc',
  amount: 250,
  createdDate: '27/02/2026',
  status: 'active',
  link: 'https://pay.cardio.fr/rb-250'
}];

const paymentPlans: PaymentPlan[] = [
{
  id: 'pp1',
  patient: 'André Rousseau',
  totalAmount: 1200,
  monthlyAmount: 200,
  duration: 6,
  paidMonths: 4,
  status: 'active',
  relatedRecordIds: [],
  installments: [
  {
    id: 'pp1-i1',
    dueDate: '2026-03-10',
    amount: 200,
    status: 'paid'
  },
  {
    id: 'pp1-i2',
    dueDate: '2026-04-10',
    amount: 200,
    status: 'paid'
  },
  {
    id: 'pp1-i3',
    dueDate: '2026-05-10',
    amount: 200,
    status: 'paid'
  },
  {
    id: 'pp1-i4',
    dueDate: '2026-06-10',
    amount: 200,
    status: 'paid'
  },
  {
    id: 'pp1-i5',
    dueDate: '2026-07-10',
    amount: 200,
    status: 'pending'
  },
  {
    id: 'pp1-i6',
    dueDate: '2026-08-10',
    amount: 200,
    status: 'pending'
  }]
},
{
  id: 'pp2',
  patient: 'Jean-Pierre Moreau',
  totalAmount: 3500,
  monthlyAmount: 350,
  duration: 10,
  paidMonths: 10,
  status: 'completed',
  relatedRecordIds: [],
  installments: Array.from({ length: 10 }, (_, i) => ({
    id: `pp2-i${i + 1}`,
    dueDate: `2026-${String(i + 1).padStart(2, '0')}-12`,
    amount: 350,
    status: 'paid' as const
  }))
},
{
  id: 'pp3',
  patient: 'Sylvie Dupont',
  totalAmount: 800,
  monthlyAmount: 200,
  duration: 4,
  paidMonths: 1,
  status: 'late',
  relatedRecordIds: [],
  installments: [
  {
    id: 'pp3-i1',
    dueDate: '2026-03-05',
    amount: 200,
    status: 'paid'
  },
  {
    id: 'pp3-i2',
    dueDate: '2026-04-05',
    amount: 200,
    status: 'late'
  },
  {
    id: 'pp3-i3',
    dueDate: '2026-05-05',
    amount: 200,
    status: 'pending'
  },
  {
    id: 'pp3-i4',
    dueDate: '2026-06-05',
    amount: 200,
    status: 'pending'
  }]
},
{
  id: 'pp4',
  patient: 'Michel Bernard',
  totalAmount: 600,
  monthlyAmount: 150,
  duration: 4,
  paidMonths: 2,
  status: 'active',
  relatedRecordIds: [],
  installments: [
  {
    id: 'pp4-i1',
    dueDate: '2026-02-20',
    amount: 150,
    status: 'paid'
  },
  {
    id: 'pp4-i2',
    dueDate: '2026-03-20',
    amount: 150,
    status: 'paid'
  },
  {
    id: 'pp4-i3',
    dueDate: '2026-04-20',
    amount: 150,
    status: 'pending'
  },
  {
    id: 'pp4-i4',
    dueDate: '2026-05-20',
    amount: 150,
    status: 'pending'
  }]
}];

const devisRecords: DevisRecord[] = [
{
  id: 'd1',
  number: 'DEV-2026-001',
  patient: 'Marie Lefevre',
  date: '28/02/2026',
  acts: 'Écho Doppler + Holter',
  totalAmount: 500,
  status: 'pending'
},
{
  id: 'd2',
  number: 'DEV-2026-002',
  patient: 'Robert Blanc',
  date: '27/02/2026',
  acts: "Test d'effort + ECG",
  totalAmount: 335,
  status: 'accepted'
},
{
  id: 'd3',
  number: 'DEV-2026-003',
  patient: 'Isabelle Petit',
  date: '25/02/2026',
  acts: 'Écho de stress + Consultation',
  totalAmount: 545,
  status: 'accepted'
},
{
  id: 'd4',
  number: 'DEV-2026-004',
  patient: 'Sylvie Dupont',
  date: '22/02/2026',
  acts: 'Ablation AFib',
  totalAmount: 3500,
  status: 'rejected'
},
{
  id: 'd5',
  number: 'DEV-2026-005',
  patient: 'André Rousseau',
  date: '20/02/2026',
  acts: 'Cathétérisme + Suivi',
  totalAmount: 1350,
  status: 'pending'
},
{
  id: 'd6',
  number: 'DEV-2026-006',
  patient: 'Michel Bernard',
  date: '18/02/2026',
  acts: 'Réhabilitation cardiaque x5',
  totalAmount: 600,
  status: 'accepted'
}];

const fseRecords: FSERecord[] = [
{
  id: 'f1',
  patient: 'Jean-Pierre Moreau',
  date: '28/02/2026',
  act: 'ECG 12 dérivations',
  amount: 85,
  organism: 'CPAM',
  reimbursementStatus: 'reimbursed',
  reimbursementDate: '10/03/2026'
},
{
  id: 'f2',
  patient: 'Robert Blanc',
  date: '27/02/2026',
  act: "Test d'effort",
  amount: 250,
  organism: 'CPAM',
  reimbursementStatus: 'in_progress',
  reimbursementDate: '-'
},
{
  id: 'f3',
  patient: 'Michel Bernard',
  date: '26/02/2026',
  act: 'Consultation cardio',
  amount: 65,
  organism: 'CPAM',
  reimbursementStatus: 'reimbursed',
  reimbursementDate: '08/03/2026'
},
{
  id: 'f4',
  patient: 'Sylvie Dupont',
  date: '27/02/2026',
  act: 'Holter 24h',
  amount: 180,
  organism: 'AXA Santé',
  reimbursementStatus: 'rejected',
  reimbursementDate: '-'
},
{
  id: 'f5',
  patient: 'André Rousseau',
  date: '25/02/2026',
  act: "ECG d'effort",
  amount: 150,
  organism: 'CPAM',
  reimbursementStatus: 'in_progress',
  reimbursementDate: '-'
},
{
  id: 'f6',
  patient: 'Françoise Martin',
  date: '26/02/2026',
  act: 'Consultation complexe',
  amount: 95,
  organism: 'Harmonie Mutuelle',
  reimbursementStatus: 'reimbursed',
  reimbursementDate: '05/03/2026'
}];

const recentGeneratedReports = [
{
  name: 'Rapport Janvier 2026',
  type: 'Mensuel',
  date: '01/02/2026',
  size: '245 KB'
},
{
  name: 'Bilan T4 2025',
  type: 'Trimestriel',
  date: '05/01/2026',
  size: '512 KB'
},
{
  name: 'Synthèse Annuelle 2025',
  type: 'Annuel',
  date: '10/01/2026',
  size: '1.2 MB'
}];

// ─── CARDIO MUTUELLES DATA ────────────────────────────────────────────────────
interface CardioFSE {
  id: string;
  patient: string;
  date: string;
  mutuelle: string;
  amount: number;
  status: 'sent' | 'processing' | 'reimbursed' | 'rejected';
}
interface CardioReimbursement {
  id: string;
  patient: string;
  date: string;
  mutuelle: string;
  reimbursedAmount: number;
  originalAmount: number;
  coverage: string;
  fseRef: string;
}
interface CardioInsurance {
  patient: string;
  mutuelle: string;
  coverageType: string;
  coverageRate: string;
  annualLimit: number;
  remainingLimit: number;
  status: 'active' | 'inactive' | 'expired';
}
const cardioFseInitialData: CardioFSE[] = [
{
  id: 'FSE-CARD-001',
  patient: 'Jean-Pierre Moreau',
  date: '28/02/2026',
  mutuelle: 'CPAM',
  amount: 85,
  status: 'reimbursed'
},
{
  id: 'FSE-CARD-002',
  patient: 'Marie Lefevre',
  date: '28/02/2026',
  mutuelle: 'Mutuelle Santé',
  amount: 320,
  status: 'processing'
},
{
  id: 'FSE-CARD-003',
  patient: 'Robert Blanc',
  date: '27/02/2026',
  mutuelle: 'CPAM',
  amount: 250,
  status: 'sent'
},
{
  id: 'FSE-CARD-004',
  patient: 'Sylvie Dupont',
  date: '27/02/2026',
  mutuelle: 'AXA Santé',
  amount: 180,
  status: 'rejected'
},
{
  id: 'FSE-CARD-005',
  patient: 'Michel Bernard',
  date: '26/02/2026',
  mutuelle: 'CPAM',
  amount: 65,
  status: 'reimbursed'
},
{
  id: 'FSE-CARD-006',
  patient: 'Françoise Martin',
  date: '26/02/2026',
  mutuelle: 'Harmonie Mutuelle',
  amount: 95,
  status: 'processing'
}];

const cardioReimbursementData: CardioReimbursement[] = [
{
  id: 'RMB-CARD-001',
  patient: 'Jean-Pierre Moreau',
  date: '10/03/2026',
  mutuelle: 'CPAM',
  reimbursedAmount: 68,
  originalAmount: 85,
  coverage: '80%',
  fseRef: 'FSE-CARD-001'
},
{
  id: 'RMB-CARD-002',
  patient: 'Michel Bernard',
  date: '08/03/2026',
  mutuelle: 'CPAM',
  reimbursedAmount: 52,
  originalAmount: 65,
  coverage: '80%',
  fseRef: 'FSE-CARD-005'
},
{
  id: 'RMB-CARD-003',
  patient: 'André Rousseau',
  date: '05/03/2026',
  mutuelle: 'CPAM',
  reimbursedAmount: 120,
  originalAmount: 150,
  coverage: '80%',
  fseRef: 'FSE-CARD-003'
},
{
  id: 'RMB-CARD-004',
  patient: 'Françoise Martin',
  date: '03/03/2026',
  mutuelle: 'Harmonie Mutuelle',
  reimbursedAmount: 57,
  originalAmount: 95,
  coverage: '60%',
  fseRef: 'FSE-CARD-006'
}];

const cardioInsuranceInitialData: CardioInsurance[] = [
{
  patient: 'Jean-Pierre Moreau',
  mutuelle: 'CPAM',
  coverageType: 'Régime général',
  coverageRate: '80%',
  annualLimit: 1500,
  remainingLimit: 1200,
  status: 'active'
},
{
  patient: 'Marie Lefevre',
  mutuelle: 'Mutuelle Santé',
  coverageType: 'Complémentaire',
  coverageRate: '60%',
  annualLimit: 2000,
  remainingLimit: 1680,
  status: 'active'
},
{
  patient: 'Robert Blanc',
  mutuelle: 'CPAM',
  coverageType: 'Régime général',
  coverageRate: '80%',
  annualLimit: 1500,
  remainingLimit: 1250,
  status: 'active'
},
{
  patient: 'Sylvie Dupont',
  mutuelle: 'AXA Santé',
  coverageType: 'Complémentaire',
  coverageRate: '60%',
  annualLimit: 1000,
  remainingLimit: 820,
  status: 'active'
},
{
  patient: 'Michel Bernard',
  mutuelle: 'CPAM',
  coverageType: 'Fonctionnaire',
  coverageRate: '70%',
  annualLimit: 2000,
  remainingLimit: 1935,
  status: 'active'
}];

function getInitials(name: string) {
  return name.
  split(' ').
  map((n) => n[0]).
  join('').
  toUpperCase().
  slice(0, 2);
}
// ─── HELPERS ──────────────────────────────────────────────────────────────────
const statusBadge = (status: BillingRecord['status']) => {
  if (status === 'paid')
  return (
    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs bg-blue-100 text-blue-700">
        <CheckIcon size={10} /> Payé
      </span>);

  if (status === 'validated')
  return (
    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs bg-green-100 text-green-700">
        <CheckCircleIcon size={10} /> Validé
      </span>);

  if (status === 'pending')
  return (
    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs bg-amber-100 text-amber-700">
        <ClockIcon size={10} /> En attente
      </span>);

  return (
    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs bg-red-100 text-red-700">
      <XCircleIcon size={10} /> Refusé
    </span>);

};
const paymentLinkBadge = (status: PaymentLink['status']) => {
  if (status === 'active')
  return (
    <span className="px-1.5 py-0.5 rounded text-xs bg-green-100 text-green-700">
        Actif
      </span>);

  if (status === 'used')
  return (
    <span className="px-1.5 py-0.5 rounded text-xs bg-red-100 text-red-700">
        Utilisé
      </span>);

  return (
    <span className="px-1.5 py-0.5 rounded text-xs bg-gray-100 text-gray-500">
      Expiré
    </span>);

};
const planStatusBadge = (status: PaymentPlan['status']) => {
  if (status === 'active')
  return (
    <span className="px-1.5 py-0.5 rounded text-xs bg-green-100 text-green-700">
        Actif
      </span>);

  if (status === 'completed')
  return (
    <span className="px-1.5 py-0.5 rounded text-xs bg-red-100 text-red-700">
        Terminé
      </span>);

  return (
    <span className="px-1.5 py-0.5 rounded text-xs bg-red-100 text-red-700">
      En retard
    </span>);

};
const devisBadge = (status: DevisRecord['status']) => {
  if (status === 'accepted')
  return (
    <span className="px-1.5 py-0.5 rounded text-xs bg-green-100 text-green-700">
        Accepté
      </span>);

  if (status === 'pending')
  return (
    <span className="px-1.5 py-0.5 rounded text-xs bg-amber-100 text-amber-700">
        En attente
      </span>);

  return (
    <span className="px-1.5 py-0.5 rounded text-xs bg-red-100 text-red-700">
      Refusé
    </span>);

};
const fseBadge = (status: FSERecord['reimbursementStatus']) => {
  if (status === 'reimbursed')
  return (
    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs bg-green-100 text-green-700">
        <CheckCircleIcon size={10} />
        Remboursé
      </span>);

  if (status === 'in_progress')
  return (
    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs bg-amber-100 text-amber-700">
        <ClockIcon size={10} />
        En cours
      </span>);

  return (
    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs bg-red-100 text-red-700">
      <XCircleIcon size={10} />
      Rejeté
    </span>);

};
// ─── MODAL ────────────────────────────────────────────────────────────────────
const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 8
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 8
  }
};
function ViewInvoiceModal({
  record,
  onClose,
  onValidate




}: {record: BillingRecord;onClose: () => void;onValidate: (id: number) => void;}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}>

      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{
          duration: 0.2,
          ease: 'easeOut'
        }}
        className="relative z-10 bg-white rounded-xl shadow-2xl p-5 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}>

        <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-xl -mx-5 -mt-5 mb-4">
          <div>
            <h2 className="text-sm font-semibold text-red-800">Détail de la facture</h2>
            <p className="text-xs text-red-600 mt-0.5">Résumé des informations de facturation</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-red-600 hover:bg-red-100"
            aria-label="Fermer">
            <XIcon size={14} />
          </button>
        </div>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between py-1.5 border-b border-gray-100">
            <span className="text-xs text-gray-500">Patient</span>
            <span className="text-xs font-semibold text-gray-800">
              {record.patient}
            </span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-gray-100">
            <span className="text-xs text-gray-500">Date</span>
            <span className="text-xs text-gray-700">{record.date}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-gray-100">
            <span className="text-xs text-gray-500">Acte</span>
            <span className="text-xs text-gray-700">{record.procedure}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-gray-100">
            <span className="text-xs text-gray-500">Code CPT</span>
            <span className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded font-mono text-xs font-bold">
              {record.cptCode}
            </span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-gray-100">
            <span className="text-xs text-gray-500">Montant</span>
            <span className="text-xs font-bold text-gray-900">
              {record.amount} €
            </span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-gray-100">
            <span className="text-xs text-gray-500">Assurance</span>
            <span className="text-xs text-gray-700">{record.insurance}</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-xs text-gray-500">Statut</span>
            {statusBadge(record.status)}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 text-xs border border-gray-200 text-gray-600 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">

            Fermer
          </button>
          {record.status === 'pending' &&
          <button
            onClick={() => {
              onValidate(record.id);
              onClose();
            }}
            className="flex-1 text-xs bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-1">

              <CheckIcon size={12} /> Marquer comme validé
            </button>
          }
        </div>
      </motion.div>
    </div>);

}
// ─── TAB CONFIG ───────────────────────────────────────────────────────────────
type TabId = 'recent' | 'cpt' | 'insurance' | 'reports' | 'payments' | 'devis';
const tabs: {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}[] = [
{
  id: 'recent',
  label: 'Actes Récents',
  icon: <ActivityIcon size={13} />
},
{
  id: 'cpt',
  label: 'Codes CPT',
  icon: <FileTextIcon size={13} />
},
{
  id: 'insurance',
  label: 'Assurances',
  icon: <HeartIcon size={13} />
},
{
  id: 'payments',
  label: 'Paiements',
  icon: <BanknoteIcon size={13} />
},
{
  id: 'devis',
  label: 'Devis',
  icon: <ClipboardIcon size={13} />
},
{
  id: 'reports',
  label: 'Rapports',
  icon: <TrendingUpIcon size={13} />
}];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function CardiologyBilling() {
  const { selectedPatient, patients } = usePatient();
  const [activeTab, setActiveTab] = useState<TabId>('recent');
  const [cptSearch, setCptSearch] = useState('');
  const [cptCategory, setCptCategory] = useState('all');
  // Actes Récents filters
  const [recentSearch, setRecentSearch] = useState('');
  const [recentStatusFilter, setRecentStatusFilter] = useState<
    'all' | BillingRecord['status']>(
    'all');
  const [records, setRecords] = useState<BillingRecord[]>(billingRecords);
  const [cptData, setCptData] = useState<CPTCode[]>(cptCodes);
  const [paymentPlanData, setPaymentPlanData] = useState<PaymentPlan[]>(
    paymentPlans
  );
  const [viewInvoice, setViewInvoice] = useState<BillingRecord | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  // FSE filter
  const [fseFilter, setFseFilter] = useState<
    'all' | FSERecord['reimbursementStatus']>(
    'all');
  // Insurance sub-tabs
  const [insuranceSubTab, setInsuranceSubTab] = useState<
    'fse' | 'reimbursements' | 'coverage'>(
    'fse');
  const [cardioFseData, setCardioFseData] =
  useState<CardioFSE[]>(cardioFseInitialData);
  const [cardioInsuranceData, setCardioInsuranceData] = useState<
    CardioInsurance[]>(
    cardioInsuranceInitialData);
  const [fseSearch, setFseSearch] = useState('');
  const [reimbSearch, setReimbSearch] = useState('');
  const [coverageSearch, setCoverageSearch] = useState('');
  // Reports period
  const [reportPeriod, setReportPeriod] = useState<
    'monthly' | 'quarterly' | 'annual'>(
    'monthly');
  // Copied link
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  // New Act Modal
  const [showNewActModal, setShowNewActModal] = useState(false);
  const [showNewCptModal, setShowNewCptModal] = useState(false);
  const [showNewPaymentPlanModal, setShowNewPaymentPlanModal] = useState(false);
  const [showNewFseModal, setShowNewFseModal] = useState(false);
  const [showCnamPrintPreview, setShowCnamPrintPreview] = useState(false);
  const [cnamPrintPreviewData, setCnamPrintPreviewData] = useState<CnamPrintPreviewData | null>(
    null
  );
  const [expandedPaymentPlanIds, setExpandedPaymentPlanIds] = useState<Set<string>>(
    new Set()
  );
  const [selectedActIdsForPlan, setSelectedActIdsForPlan] = useState<Set<number>>(
    new Set()
  );
  const [newActFormData, setNewActFormData] = useState({
    patient: selectedPatient.name,
    date: new Date().toISOString().split('T')[0],
    procedure: '',
    cptCode: '',
    amount: '',
    discount: '',
    insurance: ''
  });
  const [newCptFormData, setNewCptFormData] = useState({
    code: '',
    description: '',
    price: '',
    category: ''
  });
  const [newPaymentPlanFormData, setNewPaymentPlanFormData] = useState({
    patient: selectedPatient.name,
    tranches: '3',
    firstDueDate: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [newFseFormData, setNewFseFormData] = useState({
    patient: selectedPatient.name,
    date: new Date().toISOString().split('T')[0],
    mutuelle: selectedPatient.insurance || 'CPAM',
    practitioner: 'Dr. Dupont',
    notes: ''
  });
  const [newFseActLines, setNewFseActLines] = useState<FSEActLine[]>([
    {
      id: 'line-1',
      code: '',
      description: '',
      amount: '0'
    },
    {
      id: 'line-2',
      code: '',
      description: '',
      amount: '0'
    }]);
  const [newFseDocuments, setNewFseDocuments] = useState<File[]>([]);
  const fseDocumentsInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    setNewActFormData((prev) => ({
      ...prev,
      patient: selectedPatient.name,
      insurance: prev.insurance || selectedPatient.insurance || ''
    }));
    setNewPaymentPlanFormData((prev) => ({
      ...prev,
      patient: selectedPatient.name
    }));
    setNewFseFormData((prev) => ({
      ...prev,
      patient: selectedPatient.name,
      mutuelle: prev.mutuelle || selectedPatient.insurance || 'CPAM',
      practitioner: prev.practitioner || 'Dr. Dupont'
    }));
  }, [selectedPatient]);
  const handleCardioFseStatus = (id: string, status: CardioFSE['status']) => {
    setCardioFseData((prev) =>
    prev.map((f) =>
    f.id === id ?
    {
      ...f,
      status
    } :
    f
    )
    );
  };
  const handleCoverageStatus = (
  patient: string,
  status: CardioInsurance['status']) =>
  {
    setCardioInsuranceData((prev) =>
    prev.map((i) =>
    i.patient === patient ?
    {
      ...i,
      status
    } :
    i
    )
    );
  };
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };
  const handleCopyLink = (link: string) => {
    setCopiedLink(link);
    showToast('Lien copié dans le presse-papier');
    setTimeout(() => setCopiedLink(null), 2000);
  };
  const handleValidate = (id: number) => {
    setRecords((prev) =>
    prev.map((r) =>
    r.id === id ?
    {
      ...r,
      status: 'validated' as const
    } :
    r
    )
    );
    showToast('Acte marqué comme validé');
  };

  const getDefaultNewActForm = () => ({
    patient: selectedPatient.name,
    date: new Date().toISOString().split('T')[0],
    procedure: '',
    cptCode: '',
    amount: '',
    discount: '',
    insurance: selectedPatient.insurance || ''
  });

  const handleOpenNewActModal = () => {
    setNewActFormData(getDefaultNewActForm());
    setShowNewActModal(true);
  };

  const handleOpenNewCptModal = () => {
    setNewCptFormData({
      code: '',
      description: '',
      price: '',
      category: ''
    });
    setShowNewCptModal(true);
  };

  const addMonthsToDate = (dateStr: string, monthsToAdd: number) => {
    const dt = new Date(dateStr);
    dt.setMonth(dt.getMonth() + monthsToAdd);
    return dt.toISOString().split('T')[0];
  };

  const formatDateFr = (isoDate: string) => {
    const dt = new Date(isoDate);
    return dt.toLocaleDateString('fr-FR');
  };

  const toBirthDateFromAge = (age: number) => {
    const year = new Date().getFullYear() - age;
    return `01/01/${year}`;
  };

  const buildCnamPrintPreviewData = (
  newFseId: string,
  formData: typeof newFseFormData,
  acts: FSEActLine[],
  amount: number):
  CnamPrintPreviewData =>
  {
    const matchedPatient =
    patients.find((p) => p.name.toLowerCase() === formData.patient.toLowerCase()) ||
    selectedPatient;

    const normalizedActs = acts
    .filter((line) => line.code.trim() || line.description.trim())
    .map((line) => ({
      date: formatDateFr(formData.date),
      designation: line.description || line.code,
      codeActe: line.code || '-',
      honoraires: `${(parseFloat(line.amount) || 0).toFixed(2)} DT`,
      codeConventionnel: line.code || '-'
    }));

    const fseDigits = (newFseId.match(/(\d+)/g) || []).join('');

    return {
      fseId: newFseId,
      patientName: matchedPatient.name,
      patientGender: matchedPatient.gender,
      patientAge: matchedPatient.age,
      patientPhone: matchedPatient.phone || '-',
      patientDossier: matchedPatient.dossier || '-',
      patientBirthDate: toBirthDateFromAge(matchedPatient.age),
      dateSoins: formatDateFr(formData.date),
      mutuelle: formData.mutuelle,
      practitioner: formData.practitioner,
      matriculeFiscal: fseDigits ? `MF-${fseDigits}` : 'MF-000',
      acts: normalizedActs,
      totalAmount: amount,
      notes: formData.notes || ''
    };
  };

  const handlePrintCnamPreview = () => {
    window.print();
  };

  const isCnamPaperMutuelle = (mutuelle: string) => {
    const normalized = mutuelle.trim().toUpperCase();
    return normalized.includes('CNAM') || normalized.includes('CPAM');
  };

  const getNextFseId = () => {
    const max = cardioFseData.reduce((acc, item) => {
      const match = item.id.match(/FSE-CARD-(\d+)/);
      const value = match ? parseInt(match[1], 10) : 0;
      return value > acc ? value : acc;
    }, 0);
    return `FSE-CARD-${String(max + 1).padStart(3, '0')}`;
  };

  const generateInstallments = (
  totalAmount: number,
  tranches: number,
  firstDueDate: string) =>
  {
    const totalCents = Math.round(totalAmount * 100);
    const baseCents = Math.floor(totalCents / tranches);
    const remainderCents = totalCents - baseCents * tranches;

    return Array.from({ length: tranches }, (_, idx) => {
      const cents = idx === tranches - 1 ? baseCents + remainderCents : baseCents;
      return {
        id: `inst-${Date.now()}-${idx + 1}`,
        dueDate: addMonthsToDate(firstDueDate, idx),
        amount: cents / 100,
        status: 'pending' as const
      };
    });
  };

  const handleOpenNewPaymentPlanModal = () => {
    setNewPaymentPlanFormData({
      patient: selectedPatient.name,
      tranches: '3',
      firstDueDate: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setSelectedActIdsForPlan(new Set());
    setShowNewPaymentPlanModal(true);
  };

  const handleOpenNewFseModal = () => {
    setNewFseFormData({
      patient: selectedPatient.name,
      date: new Date().toISOString().split('T')[0],
      mutuelle: selectedPatient.insurance || 'CPAM',
      practitioner: 'Dr. Dupont',
      notes: ''
    });
    setNewFseActLines([
    {
      id: `line-${Date.now()}-1`,
      code: '',
      description: '',
      amount: '0'
    },
    {
      id: `line-${Date.now()}-2`,
      code: '',
      description: '',
      amount: '0'
    }]);
    setNewFseDocuments([]);
    setShowNewFseModal(true);
  };

  const handleAddFseActLine = () => {
    setNewFseActLines((prev) => [
      ...prev,
      {
        id: `line-${Date.now()}-${prev.length + 1}`,
        code: '',
        description: '',
        amount: '0'
      }]);
  };

  const handleRemoveFseActLine = (lineId: string) => {
    setNewFseActLines((prev) =>
      prev.length > 1 ? prev.filter((line) => line.id !== lineId) : prev
    );
  };

  const handleFseActLineChange = (
  lineId: string,
  field: keyof FSEActLine,
  value: string) =>
  {
    setNewFseActLines((prev) =>
      prev.map((line) => {
        if (line.id !== lineId) return line;
        if (field === 'code') {
          const matchedCode = cptData.find((c) => c.code === value);
          return {
            ...line,
            code: value,
            description: matchedCode ? matchedCode.description : line.description,
            amount: matchedCode ? String(matchedCode.price) : line.amount
          };
        }
        return {
          ...line,
          [field]: value
        };
      })
    );
  };

  const handleFseDocumentsSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setNewFseDocuments((prev) => [...prev, ...Array.from(files)]);
  };

  const totalFseAmount = newFseActLines.reduce(
    (sum, line) => sum + (parseFloat(line.amount) || 0),
    0
  );

  const handleCreateNewFse = () => {
    if (!newFseFormData.patient.trim()) {
      showToast('Veuillez sélectionner un patient');
      return;
    }
    if (!newFseFormData.date) {
      showToast('Veuillez sélectionner une date');
      return;
    }
    if (!newFseFormData.mutuelle.trim()) {
      showToast('Veuillez sélectionner une mutuelle');
      return;
    }
    if (!newFseFormData.practitioner.trim()) {
      showToast('Veuillez saisir le praticien');
      return;
    }

    const validActs = newFseActLines.filter(
      (line) =>
      (line.code.trim() || line.description.trim()) &&
      (parseFloat(line.amount) || 0) > 0
    );
    if (validActs.length === 0) {
      showToast('Veuillez ajouter au moins un acte avec montant');
      return;
    }
    if (totalFseAmount <= 0) {
      showToast('Le montant total doit être supérieur à 0');
      return;
    }

    const newFseId = getNextFseId();

    const newFse: CardioFSE = {
      id: newFseId,
      patient: newFseFormData.patient,
      date: formatDateFr(newFseFormData.date),
      mutuelle: newFseFormData.mutuelle,
      amount: totalFseAmount,
      status: 'sent'
    };

    const shouldOpenCnamPreview = isCnamPaperMutuelle(newFseFormData.mutuelle);
    if (shouldOpenCnamPreview) {
      setCnamPrintPreviewData(
        buildCnamPrintPreviewData(newFseId, newFseFormData, validActs, totalFseAmount)
      );
      setShowCnamPrintPreview(true);
    }

    setCardioFseData((prev) => [newFse, ...prev]);
    setShowNewFseModal(false);
    showToast(
      shouldOpenCnamPreview ?
      `FSE ${newFse.id} enregistrée - aperçu d'impression CNAM/CPAM prêt` :
      `Nouvelle FSE ${newFse.id} enregistrée et transmise`
    );
  };

  const togglePaymentPlanDetails = (planId: string) => {
    setExpandedPaymentPlanIds((prev) => {
      const next = new Set(prev);
      if (next.has(planId)) {
        next.delete(planId);
      } else {
        next.add(planId);
      }
      return next;
    });
  };

  const toggleActForPaymentPlan = (recordId: number) => {
    setSelectedActIdsForPlan((prev) => {
      const next = new Set(prev);
      if (next.has(recordId)) {
        next.delete(recordId);
      } else {
        next.add(recordId);
      }
      return next;
    });
  };

  const handleCreatePaymentPlan = () => {
    if (!newPaymentPlanFormData.patient.trim()) {
      showToast('Veuillez sélectionner un patient');
      return;
    }
    if (!newPaymentPlanFormData.firstDueDate) {
      showToast('Veuillez sélectionner la première échéance');
      return;
    }
    if (selectedActIdsForPlan.size === 0) {
      showToast('Veuillez sélectionner au moins un acte');
      return;
    }

    const tranches = parseInt(newPaymentPlanFormData.tranches, 10);
    if (Number.isNaN(tranches) || tranches <= 0) {
      showToast('Le nombre de tranches doit être supérieur à 0');
      return;
    }

    const selectedActs = records.filter(
      (r) =>
      selectedActIdsForPlan.has(r.id) &&
      r.patient === newPaymentPlanFormData.patient &&
      r.status !== 'paid'
    );
    if (selectedActs.length === 0) {
      showToast('Aucun acte valide sélectionné pour ce patient');
      return;
    }

    const totalAmount = selectedActs.reduce((sum, act) => sum + act.amount, 0);
    const installments = generateInstallments(
      totalAmount,
      tranches,
      newPaymentPlanFormData.firstDueDate
    );

    const newPlan: PaymentPlan = {
      id: `pp-${Date.now()}`,
      patient: newPaymentPlanFormData.patient,
      totalAmount,
      monthlyAmount: installments[0]?.amount ?? 0,
      duration: tranches,
      paidMonths: 0,
      status: 'active',
      relatedRecordIds: selectedActs.map((a) => a.id),
      installments
    };

    setPaymentPlanData((prev) => [newPlan, ...prev]);
    setRecords((prev) =>
      prev.map((r) =>
      selectedActIdsForPlan.has(r.id) ?
      {
        ...r,
        status: 'paid'
      } :
      r
      )
    );

    setShowNewPaymentPlanModal(false);
    setSelectedActIdsForPlan(new Set());
    showToast('Plan de paiement créé avec échéances');
  };

  const handleCreateNewCpt = () => {
    const code = newCptFormData.code.trim().toUpperCase();
    const description = newCptFormData.description.trim();
    const category = newCptFormData.category.trim();
    const price = parseFloat(newCptFormData.price);

    if (!code) {
      showToast('Veuillez saisir un code CPT');
      return;
    }
    if (!description) {
      showToast('Veuillez saisir une description');
      return;
    }
    if (!category) {
      showToast('Veuillez saisir une catégorie');
      return;
    }
    if (!newCptFormData.price || Number.isNaN(price) || price <= 0) {
      showToast('Veuillez saisir un prix valide (> 0)');
      return;
    }
    if (cptData.some((item) => item.code.toUpperCase() === code)) {
      showToast('Ce code CPT existe déjà');
      return;
    }

    const newCode: CPTCode = {
      code,
      description,
      category,
      price: Math.round(price * 100) / 100
    };

    setCptData((prev) => [newCode, ...prev]);
    setShowNewCptModal(false);
    showToast(`Code CPT ${newCode.code} ajouté avec succès`);
  };

  const handleAddFromCpt = (code: CPTCode) => {
    setNewActFormData({
      ...getDefaultNewActForm(),
      cptCode: code.code,
      procedure: code.description,
      amount: String(code.price)
    });
    setShowNewActModal(true);
  };

  // New Act Handlers
  const handleNewActFormChange = (
  field: keyof typeof newActFormData,
  value: string) =>
  {
    if (field === 'cptCode') {
      const selectedCode = cptData.find((code) => code.code === value);
      setNewActFormData((prev) => ({
        ...prev,
        cptCode: value,
        procedure: selectedCode ? selectedCode.description : prev.procedure,
        amount: selectedCode ? String(selectedCode.price) : ''
      }));
      return;
    }
    setNewActFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateNewAct = () => {
    // Validation
    if (!newActFormData.patient.trim()) {
      showToast('Veuillez sélectionner un patient');
      return;
    }
    if (!newActFormData.date) {
      showToast('Veuillez sélectionner une date');
      return;
    }
    if (!newActFormData.procedure.trim()) {
      showToast('Veuillez saisir une description d\'acte');
      return;
    }
    if (!newActFormData.cptCode) {
      showToast('Veuillez sélectionner un code CPT');
      return;
    }
    if (!newActFormData.amount || parseFloat(newActFormData.amount) <= 0) {
      showToast('Veuillez saisir un montant valide (> 0)');
      return;
    }
    if (!newActFormData.insurance) {
      showToast('Veuillez sélectionner une assurance');
      return;
    }
    const baseAmount = parseFloat(newActFormData.amount);
    const discountAmount = newActFormData.discount ?
    parseFloat(newActFormData.discount) :
    0;
    if (discountAmount < 0) {
      showToast('La remise ne peut pas être négative');
      return;
    }
    if (discountAmount > baseAmount) {
      showToast('La remise ne peut pas dépasser le montant');
      return;
    }

    // Create new record
    const newRecord: BillingRecord = {
      id: Date.now(),
      patient: newActFormData.patient,
      date: newActFormData.date,
      procedure: newActFormData.procedure,
      cptCode: newActFormData.cptCode,
      amount: Math.max(0, baseAmount - discountAmount),
      insurance: newActFormData.insurance,
      status: 'pending'
    };

    // Add to records
    setRecords((prev) => [newRecord, ...prev]);
    
    // Reset form and close modal
    setNewActFormData(getDefaultNewActForm());
    setShowNewActModal(false);
    showToast('Nouvel acte créé avec succès');
  };

  const totalBilled = records.reduce((sum, r) => sum + r.amount, 0);
  const pendingAmount = records.
  filter((r) => r.status === 'pending').
  reduce((sum, r) => sum + r.amount, 0);
  const acceptanceRate = Math.round(
    records.filter((r) => r.status === 'validated').length / records.length *
    100
  );
  const netRevenue = records.
  filter((r) => r.status === 'validated').
  reduce((sum, r) => sum + r.amount, 0);
  const categories = [
  'all',
  ...Array.from(new Set(cptData.map((c) => c.category)))];

  const filteredCPT = cptData.filter((c) => {
    const matchSearch =
    c.description.toLowerCase().includes(cptSearch.toLowerCase()) ||
    c.code.includes(cptSearch);
    const matchCategory = cptCategory === 'all' || c.category === cptCategory;
    return matchSearch && matchCategory;
  });
  const filteredRecords = records.filter((r) => {
    const matchSearch =
    r.patient.toLowerCase().includes(recentSearch.toLowerCase()) ||
    r.procedure.toLowerCase().includes(recentSearch.toLowerCase());
    const matchStatus =
    recentStatusFilter === 'all' || r.status === recentStatusFilter;
    return matchSearch && matchStatus;
  });
  const filteredFSE = fseRecords.filter(
    (f) => fseFilter === 'all' || f.reimbursementStatus === fseFilter
  );
  const devisTotals = {
    total: devisRecords.length,
    accepted: devisRecords.filter((d) => d.status === 'accepted').length,
    pending: devisRecords.filter((d) => d.status === 'pending').length,
    amount: devisRecords.
    filter((d) => d.status === 'accepted').
    reduce((s, d) => s + d.totalAmount, 0)
  };
  return (
    <div className="min-h-screen bg-gray-50 p-3">
      {/* Toast */}
      <AnimatePresence>
        {toast &&
        <motion.div
          initial={{
            opacity: 0,
            y: -20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            y: -20
          }}
          className="fixed top-4 right-4 z-50 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg flex items-center gap-2">

            <CheckIcon size={12} className="text-green-400" />
            {toast}
          </motion.div>
        }
      </AnimatePresence>

      {/* View Invoice Modal */}
      <AnimatePresence>
        {viewInvoice &&
        <ViewInvoiceModal
          record={viewInvoice}
          onClose={() => setViewInvoice(null)}
          onValidate={handleValidate} />

        }
      </AnimatePresence>

      {/* New Act Modal */}
      <AnimatePresence>
        {showNewActModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
            onClick={() => setShowNewActModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-96 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-xl flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-red-800">Créer un nouvel acte</h3>
                  <p className="text-xs text-red-600">Ajouter une facturation pour un patient</p>
                </div>
                <button
                  onClick={() => setShowNewActModal(false)}
                  className="text-red-600 hover:bg-red-100 p-1 rounded"
                >
                  <XIcon size={14} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 space-y-3">
                {/* Patient Selector */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Patient *
                  </label>
                  <input
                    type="text"
                    value={newActFormData.patient}
                    readOnly
                    className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg bg-gray-50 text-gray-700"
                  />
                </div>

                {/* Date Picker */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={newActFormData.date}
                    onChange={(e) => handleNewActFormChange('date', e.target.value)}
                    className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                {/* Procedure Description */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Description d'acte *
                  </label>
                  <input
                    type="text"
                    value={newActFormData.procedure}
                    onChange={(e) => handleNewActFormChange('procedure', e.target.value)}
                    placeholder="Ex: Échocardiographie de stress..."
                    className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                {/* CPT Code Selector */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Code CPT *
                  </label>
                  <select
                    value={newActFormData.cptCode}
                    onChange={(e) => handleNewActFormChange('cptCode', e.target.value)}
                    className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Sélectionner un code CPT...</option>
                    {cptData.map((code) => (
                      <option key={code.code} value={code.code}>
                        {code.code} - {code.description}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Amount Input */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Montant CPT (€) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={newActFormData.amount}
                    readOnly
                    placeholder="0.00"
                    className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg bg-gray-50 text-gray-700"
                  />
                </div>

                {/* Discount Amount */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Remise (€)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={newActFormData.discount}
                    onChange={(e) => handleNewActFormChange('discount', e.target.value)}
                    placeholder="0.00"
                    className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div className="text-xs rounded-lg border border-red-100 bg-red-50 px-2 py-1.5 text-red-700">
                  Montant final: {
                  Math.max(
                    0,
                    (parseFloat(newActFormData.amount) || 0) -
                    (parseFloat(newActFormData.discount) || 0)
                  ).toFixed(2)} €
                </div>

                {/* Insurance Selector */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Assurance *
                  </label>
                  <select
                    value={newActFormData.insurance}
                    onChange={(e) => handleNewActFormChange('insurance', e.target.value)}
                    className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Sélectionner une assurance...</option>
                    {selectedPatient.insurance &&
                    !insuranceProviders.some((provider) =>
                    provider.name === selectedPatient.insurance
                    ) &&
                    <option value={selectedPatient.insurance}>
                      {selectedPatient.insurance}
                    </option>
                    }
                    {insuranceProviders.map((provider) => (
                      <option key={provider.name} value={provider.name}>
                        {provider.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex gap-2 p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl">
                <button
                  onClick={() => setShowNewActModal(false)}
                  className="flex-1 px-3 py-1.5 text-xs font-medium border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  onClick={handleCreateNewAct}
                  className="flex-1 px-3 py-1.5 text-xs font-medium bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Créer Acte
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New CPT Modal */}
      <AnimatePresence>
        {showNewCptModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
            onClick={() => setShowNewCptModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-xl flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-red-800">Créer un code CPT</h3>
                  <p className="text-xs text-red-600">Ajouter un nouveau code tarifaire</p>
                </div>
                <button
                  onClick={() => setShowNewCptModal(false)}
                  className="text-red-600 hover:bg-red-100 p-1 rounded"
                >
                  <XIcon size={14} />
                </button>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Code CPT *
                  </label>
                  <input
                    type="text"
                    value={newCptFormData.code}
                    onChange={(e) =>
                    setNewCptFormData((prev) => ({
                      ...prev,
                      code: e.target.value
                    }))
                    }
                    placeholder="Ex: 93922"
                    className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Description *
                  </label>
                  <input
                    type="text"
                    value={newCptFormData.description}
                    onChange={(e) =>
                    setNewCptFormData((prev) => ({
                      ...prev,
                      description: e.target.value
                    }))
                    }
                    placeholder="Ex: Évaluation vasculaire périphérique"
                    className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Catégorie *
                  </label>
                  <input
                    type="text"
                    value={newCptFormData.category}
                    onChange={(e) =>
                    setNewCptFormData((prev) => ({
                      ...prev,
                      category: e.target.value
                    }))
                    }
                    placeholder="Ex: Exploration"
                    className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Prix (€) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={newCptFormData.price}
                    onChange={(e) =>
                    setNewCptFormData((prev) => ({
                      ...prev,
                      price: e.target.value
                    }))
                    }
                    placeholder="0.00"
                    className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-2 p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl">
                <button
                  onClick={() => setShowNewCptModal(false)}
                  className="flex-1 px-3 py-1.5 text-xs font-medium border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  onClick={handleCreateNewCpt}
                  className="flex-1 px-3 py-1.5 text-xs font-medium bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Créer Code
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showNewPaymentPlanModal &&
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
          onClick={() => setShowNewPaymentPlanModal(false)}>

            <motion.div
            initial={{
              scale: 0.95,
              opacity: 0
            }}
            animate={{
              scale: 1,
              opacity: 1
            }}
            exit={{
              scale: 0.95,
              opacity: 0
            }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}>

              <div className="sticky top-0 border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-xl flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-red-800">Créer un plan de paiement</h3>
                  <p className="text-xs text-red-600">Sélectionner un ou plusieurs actes non payés et générer les échéances</p>
                </div>
                <button
                  onClick={() => setShowNewPaymentPlanModal(false)}
                  className="text-red-600 hover:bg-red-100 p-1 rounded">
                  <XIcon size={14} />
                </button>
              </div>

              <div className="p-4 space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Patient *
                    </label>
                    <select
                      value={newPaymentPlanFormData.patient}
                      onChange={(e) => {
                        setNewPaymentPlanFormData((prev) => ({
                          ...prev,
                          patient: e.target.value
                        }));
                        setSelectedActIdsForPlan(new Set());
                      }}
                      className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent">
                      <option value="">Sélectionner un patient...</option>
                      {Array.from(
                        new Set(
                          records.
                          filter((r) => r.status !== 'paid').
                          map((r) => r.patient)
                        )
                      ).map((patient) =>
                      <option key={patient} value={patient}>{patient}</option>
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Nombre de tranches *
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={newPaymentPlanFormData.tranches}
                      onChange={(e) =>
                      setNewPaymentPlanFormData((prev) => ({
                        ...prev,
                        tranches: e.target.value
                      }))
                      }
                      className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      1ère échéance *
                    </label>
                    <input
                      type="date"
                      value={newPaymentPlanFormData.firstDueDate}
                      onChange={(e) =>
                      setNewPaymentPlanFormData((prev) => ({
                        ...prev,
                        firstDueDate: e.target.value
                      }))
                      }
                      className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-3 py-2 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-700">
                    Actes du patient (statut différent de payé)
                  </div>
                  <div className="max-h-56 overflow-y-auto">
                    {records.
                    filter(
                      (r) =>
                      r.patient === newPaymentPlanFormData.patient &&
                      r.status !== 'paid'
                    ).
                    map((act) =>
                    <label
                      key={act.id}
                      className="flex items-center justify-between gap-3 px-3 py-2 border-b border-gray-50 hover:bg-gray-50 cursor-pointer">

                        <div className="flex items-center gap-2">
                          <input
                          type="checkbox"
                          checked={selectedActIdsForPlan.has(act.id)}
                          onChange={() => toggleActForPaymentPlan(act.id)}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                          <div>
                            <p className="text-xs font-medium text-gray-800">
                              {act.procedure}
                            </p>
                            <p className="text-[11px] text-gray-500">
                              {act.date} | {act.cptCode} | {act.status}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-gray-800">
                          {act.amount.toLocaleString()} €
                        </span>
                      </label>
                    )}
                    {records.filter(
                      (r) =>
                      r.patient === newPaymentPlanFormData.patient &&
                      r.status !== 'paid'
                    ).length === 0 &&
                    <div className="px-3 py-6 text-center text-xs text-gray-400">
                      Aucun acte non payé pour ce patient
                    </div>
                    }
                  </div>
                </div>

                <div className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-700">
                  <p>
                    Actes sélectionnés: <span className="font-semibold">{selectedActIdsForPlan.size}</span>
                  </p>
                  <p>
                    Montant total: <span className="font-semibold">{
                    records.
                    filter((r) => selectedActIdsForPlan.has(r.id)).
                    reduce((sum, r) => sum + r.amount, 0).
                    toLocaleString()} €</span>
                  </p>
                  <p>
                    Montant estimé par tranche: <span className="font-semibold">{
                    (() => {
                      const total = records.
                      filter((r) => selectedActIdsForPlan.has(r.id)).
                      reduce((sum, r) => sum + r.amount, 0);
                      const tranches = parseInt(newPaymentPlanFormData.tranches || '0', 10);
                      if (!tranches || tranches <= 0) return '0.00';
                      return (total / tranches).toFixed(2);
                    })()} €</span>
                  </p>
                </div>
              </div>

              <div className="flex gap-2 p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl">
                <button
                  onClick={() => setShowNewPaymentPlanModal(false)}
                  className="flex-1 px-3 py-1.5 text-xs font-medium border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
                  Annuler
                </button>
                <button
                  onClick={handleCreatePaymentPlan}
                  className="flex-1 px-3 py-1.5 text-xs font-medium bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Créer Plan de Paiement
                </button>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>

      <AnimatePresence>
        {showNewFseModal &&
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
          onClick={() => setShowNewFseModal(false)}>

            <motion.div
            initial={{
              scale: 0.95,
              opacity: 0
            }}
            animate={{
              scale: 1,
              opacity: 1
            }}
            exit={{
              scale: 0.95,
              opacity: 0
            }}
            className="bg-white rounded-xl shadow-xl max-w-5xl w-full max-h-[88vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}>

              <div className="rounded-t-xl border-b border-red-200 bg-gradient-to-r from-red-700 via-red-600 to-red-500 px-3 py-2 text-white">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowNewFseModal(false)}
                    className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 border border-white/30 flex items-center justify-center">
                    <ArrowLeftIcon size={15} />
                  </button>
                  <div>
                    <h3 className="text-sm font-semibold leading-tight">Nouvelle Feuille de Soins</h3>
                    <p className="text-xs text-red-100">Creer une nouvelle FSE pour transmission</p>
                  </div>
                </div>
              </div>

              <div className="p-2 space-y-1.5 bg-gray-50">
                <div className="rounded-xl border border-gray-200 bg-white p-2.5">
                  <h4 className="text-xs font-semibold text-gray-700 mb-2">INFORMATIONS PATIENT</h4>
                  <div className="grid grid-cols-2 gap-1.5">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">PATIENT</label>
                      <select
                        value={newFseFormData.patient}
                        onChange={(e) =>
                        setNewFseFormData((prev) => ({
                          ...prev,
                          patient: e.target.value
                        }))
                        }
                        className="w-full h-9 px-2.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-red-500">
                        <option value="">Selectionner un patient</option>
                        {Array.from(new Set(records.map((r) => r.patient))).map((patient) =>
                        <option key={patient} value={patient}>{patient}</option>
                        )}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">MUTUELLE</label>
                      <select
                        value={newFseFormData.mutuelle}
                        onChange={(e) =>
                        setNewFseFormData((prev) => ({
                          ...prev,
                          mutuelle: e.target.value
                        }))
                        }
                        className="w-full h-9 px-2.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-red-500">
                        <option value="">Selectionner une mutuelle</option>
                        {Array.from(
                          new Set([
                            ...insuranceProviders.map((p) => p.name),
                            ...cardioInsuranceData.map((i) => i.mutuelle)
                          ])
                        ).map((mutuelle) =>
                        <option key={mutuelle} value={mutuelle}>{mutuelle}</option>
                        )}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">DATE DES SOINS</label>
                      <input
                        type="date"
                        value={newFseFormData.date}
                        onChange={(e) =>
                        setNewFseFormData((prev) => ({
                          ...prev,
                          date: e.target.value
                        }))
                        }
                        className="w-full h-9 px-2.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">PRATICIEN</label>
                      <input
                        type="text"
                        value={newFseFormData.practitioner}
                        onChange={(e) =>
                        setNewFseFormData((prev) => ({
                          ...prev,
                          practitioner: e.target.value
                        }))
                        }
                        className="w-full h-9 px-2.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-2.5">
                  <h4 className="text-xs font-semibold text-gray-700 mb-2">ACTES ET SOINS</h4>
                  <div className="space-y-1.5">
                    {newFseActLines.map((line) =>
                    <div key={line.id} className="grid grid-cols-[2fr_3fr_100px_36px] gap-1.5 items-center">
                        <select
                        value={line.code}
                        onChange={(e) => handleFseActLineChange(line.id, 'code', e.target.value)}
                        className="h-8 px-2 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-red-500">
                          <option value="">Code acte</option>
                          {cptData.map((cpt) =>
                          <option key={cpt.code} value={cpt.code}>
                              {cpt.code} - {cpt.description}
                            </option>
                          )}
                        </select>
                        <input
                        type="text"
                        value={line.description}
                        onChange={(e) => handleFseActLineChange(line.id, 'description', e.target.value)}
                        placeholder="Description"
                        readOnly
                        className="h-8 px-2 text-xs border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                      />
                        <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={line.amount}
                        onChange={(e) => handleFseActLineChange(line.id, 'amount', e.target.value)}
                        readOnly
                        className="h-8 px-2 text-xs border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                      />
                        <button
                        onClick={() => handleRemoveFseActLine(line.id)}
                        className="h-8 w-8 rounded-lg border border-gray-300 text-gray-500 hover:text-red-600 hover:border-red-300 flex items-center justify-center"
                        title="Supprimer la ligne">
                          <XIcon size={14} />
                        </button>
                      </div>
                    )}
                    <button
                      onClick={handleAddFseActLine}
                      className="px-3 py-1.5 text-xs border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                      Ajouter un acte
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  <div className="rounded-xl border border-gray-200 bg-white p-2.5">
                    <h4 className="text-xs font-semibold text-gray-700 mb-2">DOCUMENTS JUSTIFICATIFS</h4>
                    <input
                      ref={fseDocumentsInputRef}
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => handleFseDocumentsSelect(e.target.files)}
                    />
                    <button
                      onClick={() => fseDocumentsInputRef.current?.click()}
                      className="w-full h-20 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-red-300 hover:text-red-600 text-xs">
                      Cliquez pour ajouter ou glissez-deposez
                    </button>
                    {newFseDocuments.length > 0 &&
                    <p className="mt-2 text-xs text-gray-600">
                        {newFseDocuments.length} document(s) ajouté(s)
                      </p>
                    }
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-2.5">
                    <h4 className="text-xs font-semibold text-gray-700 mb-2">MONTANT TOTAL</h4>
                    <p className="text-2xl font-bold text-red-600 mb-2">
                      {totalFseAmount.toLocaleString()} DT
                    </p>
                    <textarea
                      value={newFseFormData.notes}
                      onChange={(e) =>
                      setNewFseFormData((prev) => ({
                        ...prev,
                        notes: e.target.value
                      }))
                      }
                      placeholder="Notes additionnelles..."
                      rows={2}
                      className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-red-500 resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-1.5 p-2.5 border-t border-gray-200 bg-white rounded-b-xl">
                <button
                  onClick={() => setShowNewFseModal(false)}
                  className="px-4 py-2 text-xs font-medium border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  Annuler
                </button>
                <button
                  onClick={handleCreateNewFse}
                  className="px-4 py-2 text-xs font-semibold bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Enregistrer et transmettre
                </button>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>

      <AnimatePresence>
        {showCnamPrintPreview && cnamPrintPreviewData &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3"
          onClick={() => setShowCnamPrintPreview(false)}>

            <motion.div
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            className="w-full max-w-[1200px] max-h-[95vh] overflow-y-auto rounded-xl bg-gray-100 border border-gray-200 shadow-2xl"
            onClick={(e) => e.stopPropagation()}>

              <style>{`
                .cnam-sheet {
                  width: 210mm;
                  min-height: 297mm;
                  margin: 0 auto;
                  background: #ffffff;
                  color: #0f6f58;
                  border: 1.5px solid #26a37f;
                  padding: 10mm;
                  box-sizing: border-box;
                  background-repeat: no-repeat;
                  background-position: center;
                  background-size: 100% 100%;
                }
                .cnam-sheet-recto {
                  background-image: url('/assets/forms/cnam-recto.png');
                }
                .cnam-sheet-verso {
                  background-image: url('/assets/forms/cnam-verso.png');
                }
                .cnam-line { border-color: #26a37f; }
                .cnam-title { color: #15795f; letter-spacing: 0.02em; }
                .cnam-box { border: 1px solid #26a37f; }
                .cnam-fill { border-bottom: 1px dotted #26a37f; min-height: 18px; }
                .cnam-th {
                  border: 1px solid #26a37f;
                  background: #def5ed;
                  font-weight: 700;
                  font-size: 11px;
                  text-transform: uppercase;
                  text-align: center;
                  padding: 4px 3px;
                }
                .cnam-td {
                  border: 1px solid #26a37f;
                  font-size: 11px;
                  padding: 4px 3px;
                  min-height: 24px;
                }
                @media print {
                  body * { visibility: hidden; }
                  .cnam-print-root, .cnam-print-root * { visibility: visible; }
                  .cnam-print-root {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    background: white;
                    padding: 0;
                    margin: 0;
                  }
                  .cnam-no-print { display: none !important; }
                  .cnam-sheet {
                    border: 1px solid #26a37f;
                    page-break-after: always;
                    margin: 0 auto;
                    box-shadow: none;
                  }
                }
              `}</style>

              <div className="cnam-no-print sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Apercu Impression CNAM/CPAM</h3>
                  <p className="text-xs text-gray-500">FSE {cnamPrintPreviewData.fseId} • {cnamPrintPreviewData.patientName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowCnamPrintPreview(false)}
                    className="px-3 py-1.5 text-xs border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                    Fermer
                  </button>
                  <button
                    onClick={handlePrintCnamPreview}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-md bg-emerald-600 text-white hover:bg-emerald-700">
                    <PrinterIcon size={13} /> Imprimer
                  </button>
                </div>
              </div>

              <div className="cnam-print-root p-3 space-y-3">
                <div className="cnam-sheet cnam-sheet-recto">
                  <div className="grid grid-cols-[1.8fr_1fr] gap-2 mb-2">
                    <div className="cnam-box p-2">
                      <div className="text-2xl font-bold cnam-title leading-tight">CNAM / CPAM</div>
                      <div className="text-[11px] font-semibold cnam-title">CAISSE NATIONALE D'ASSURANCE MALADIE</div>
                      <div className="text-[10px] mt-1">BULLETIN DE REMBOURSEMENT DES FRAIS DE SOINS</div>
                    </div>
                    <div className="cnam-box p-2 text-[10px] space-y-1">
                      <div><span className="font-semibold">Ref. Dossier:</span> {cnamPrintPreviewData.patientDossier}</div>
                      <div><span className="font-semibold">Ref. FSE:</span> {cnamPrintPreviewData.fseId}</div>
                      <div><span className="font-semibold">Date:</span> {cnamPrintPreviewData.dateSoins}</div>
                      <div><span className="font-semibold">Mutuelle:</span> {cnamPrintPreviewData.mutuelle}</div>
                    </div>
                  </div>

                  <div className="cnam-box p-2 mb-2">
                    <div className="text-[11px] font-bold mb-2 cnam-title">A REMPLIR PAR L'ASSURE SOCIAL</div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px]">
                      <div>
                        <div className="font-semibold">IDENTIFIANT UNIQUE</div>
                        <div className="cnam-fill">{cnamPrintPreviewData.patientDossier}</div>
                      </div>
                      <div>
                        <div className="font-semibold">N° DU TELEPHONE PORTABLE</div>
                        <div className="cnam-fill">{cnamPrintPreviewData.patientPhone}</div>
                      </div>
                      <div>
                        <div className="font-semibold">Prenom / Nom</div>
                        <div className="cnam-fill">{cnamPrintPreviewData.patientName}</div>
                      </div>
                      <div>
                        <div className="font-semibold">Date de Naissance</div>
                        <div className="cnam-fill">{cnamPrintPreviewData.patientBirthDate}</div>
                      </div>
                      <div>
                        <div className="font-semibold">Sexe</div>
                        <div className="cnam-fill">{cnamPrintPreviewData.patientGender}</div>
                      </div>
                      <div>
                        <div className="font-semibold">Age</div>
                        <div className="cnam-fill">{cnamPrintPreviewData.patientAge} ans</div>
                      </div>
                    </div>
                  </div>

                  <div className="cnam-box p-2 mb-2 text-[10px]">
                    <div className="font-semibold cnam-title mb-1">SIGNATURE DE L'ASSURE SOCIAL</div>
                    <div className="h-8 cnam-box" />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="cnam-box p-2">
                      <div className="text-[11px] font-bold cnam-title mb-1">CONSULTATIONS ET ACTES DES SOINS</div>
                      <div className="grid grid-cols-6 text-[9px]">
                        <div className="cnam-th">Date</div>
                        <div className="cnam-th">Désignation</div>
                        <div className="cnam-th">Code acte</div>
                        <div className="cnam-th">Honoraires</div>
                        <div className="cnam-th">Code conv.</div>
                        <div className="cnam-th">Cachet</div>
                        {Array.from({ length: 4 }).map((_, rowIdx) => {
                          const act = cnamPrintPreviewData.acts[rowIdx];
                          return <React.Fragment key={`r1-${rowIdx}`}>
                              <div className="cnam-td">{act?.date || ''}</div>
                              <div className="cnam-td">{act?.designation || ''}</div>
                              <div className="cnam-td">{act?.codeActe || ''}</div>
                              <div className="cnam-td">{act?.honoraires || ''}</div>
                              <div className="cnam-td">{act?.codeConventionnel || ''}</div>
                              <div className="cnam-td">{cnamPrintPreviewData.practitioner}</div>
                            </React.Fragment>;
                        })}
                      </div>
                    </div>
                    <div className="cnam-box p-2">
                      <div className="text-[11px] font-bold cnam-title mb-1">PROTHESES DENTAIRES</div>
                      <div className="grid grid-cols-6 text-[9px]">
                        <div className="cnam-th">Date</div>
                        <div className="cnam-th">Dent</div>
                        <div className="cnam-th">Code acte</div>
                        <div className="cnam-th">Honoraires</div>
                        <div className="cnam-th">Matricule</div>
                        <div className="cnam-th">Cachet</div>
                        {Array.from({ length: 4 }).map((_, rowIdx) =>
                        <React.Fragment key={`r2-${rowIdx}`}>
                            <div className="cnam-td">{rowIdx === 0 ? cnamPrintPreviewData.dateSoins : ''}</div>
                            <div className="cnam-td">{rowIdx === 0 ? '-' : ''}</div>
                            <div className="cnam-td">{rowIdx === 0 ? cnamPrintPreviewData.acts[0]?.codeActe || '-' : ''}</div>
                            <div className="cnam-td">{rowIdx === 0 ? `${cnamPrintPreviewData.totalAmount.toFixed(2)} DT` : ''}</div>
                            <div className="cnam-td">{rowIdx === 0 ? cnamPrintPreviewData.matriculeFiscal : ''}</div>
                            <div className="cnam-td">{rowIdx === 0 ? cnamPrintPreviewData.practitioner : ''}</div>
                          </React.Fragment>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="cnam-sheet cnam-sheet-verso">
                  <div className="cnam-box mb-2">
                    <div className="px-2 py-1 bg-emerald-100 text-center text-[12px] font-bold cnam-title">
                      A REMPLIR PAR LES PROFESSIONNELS DE SANTE
                    </div>
                    <div className="p-2 text-[10px] grid grid-cols-4 gap-2">
                      <div className="flex items-center gap-1"><span className="cnam-box w-3.5 h-3.5 inline-block" /> APCI</div>
                      <div className="flex items-center gap-1"><span className="cnam-box w-3.5 h-3.5 inline-block" /> MO</div>
                      <div className="flex items-center gap-1"><span className="cnam-box w-3.5 h-3.5 inline-block" /> Hospitalisation</div>
                      <div className="flex items-center gap-1"><span className="cnam-box w-3.5 h-3.5 inline-block" /> Suivi de Grossesse</div>
                    </div>
                    <div className="px-2 pb-2 text-[10px]">
                      <span className="font-semibold">NOM ET PRENOM DU MALADE:</span> {cnamPrintPreviewData.patientName}
                    </div>
                  </div>

                  <div className="cnam-box p-2 mb-2">
                    <div className="text-[11px] font-bold cnam-title mb-1">Consultations & Visites</div>
                    <div className="grid grid-cols-6 text-[9px]">
                      <div className="cnam-th">Date</div>
                      <div className="cnam-th">Designation</div>
                      <div className="cnam-th">Honoraires</div>
                      <div className="cnam-th">Code conv.</div>
                      <div className="cnam-th">Matricule fiscal</div>
                      <div className="cnam-th">Cachet & signature</div>
                      {Array.from({ length: 4 }).map((_, rowIdx) => {
                        const act = cnamPrintPreviewData.acts[rowIdx];
                        return <React.Fragment key={`p2-a-${rowIdx}`}>
                            <div className="cnam-td">{act?.date || ''}</div>
                            <div className="cnam-td">{act?.designation || ''}</div>
                            <div className="cnam-td">{act?.honoraires || ''}</div>
                            <div className="cnam-td">{act?.codeConventionnel || ''}</div>
                            <div className="cnam-td">{cnamPrintPreviewData.matriculeFiscal}</div>
                            <div className="cnam-td">{cnamPrintPreviewData.practitioner}</div>
                          </React.Fragment>;
                      })}
                    </div>
                  </div>

                  <div className="cnam-box p-2 mb-2">
                    <div className="text-[11px] font-bold cnam-title mb-1">Actes Medicaux & Paramedicaux</div>
                    <div className="grid grid-cols-6 text-[9px]">
                      <div className="cnam-th">Date</div>
                      <div className="cnam-th">Code acte</div>
                      <div className="cnam-th">Honoraires</div>
                      <div className="cnam-th">Code conv.</div>
                      <div className="cnam-th">Matricule fiscal</div>
                      <div className="cnam-th">Cachet & signature</div>
                      {Array.from({ length: 4 }).map((_, rowIdx) => {
                        const act = cnamPrintPreviewData.acts[rowIdx + 4];
                        return <React.Fragment key={`p2-b-${rowIdx}`}>
                            <div className="cnam-td">{act?.date || ''}</div>
                            <div className="cnam-td">{act?.codeActe || ''}</div>
                            <div className="cnam-td">{act?.honoraires || ''}</div>
                            <div className="cnam-td">{act?.codeConventionnel || ''}</div>
                            <div className="cnam-td">{act ? cnamPrintPreviewData.matriculeFiscal : ''}</div>
                            <div className="cnam-td">{act ? cnamPrintPreviewData.practitioner : ''}</div>
                          </React.Fragment>;
                      })}
                    </div>
                  </div>

                  <div className="cnam-box p-2 mb-2">
                    <div className="text-[11px] font-bold cnam-title mb-1">Biologie / Pharmacie / Hospitalisation</div>
                    <div className="grid grid-cols-6 text-[9px]">
                      <div className="cnam-th">Date</div>
                      <div className="cnam-th">Montant</div>
                      <div className="cnam-th">Code conv.</div>
                      <div className="cnam-th">Code clinique</div>
                      <div className="cnam-th">Matricule fiscal</div>
                      <div className="cnam-th">Cachet & signature</div>
                      <div className="cnam-td">{cnamPrintPreviewData.dateSoins}</div>
                      <div className="cnam-td">{cnamPrintPreviewData.totalAmount.toFixed(2)} DT</div>
                      <div className="cnam-td">{cnamPrintPreviewData.acts[0]?.codeConventionnel || '-'}</div>
                      <div className="cnam-td">CARDIO</div>
                      <div className="cnam-td">{cnamPrintPreviewData.matriculeFiscal}</div>
                      <div className="cnam-td">{cnamPrintPreviewData.practitioner}</div>
                    </div>
                  </div>

                  <div className="cnam-box h-48 flex items-center justify-center text-5xl italic font-bold tracking-wide text-emerald-400/80 mb-2">
                    COLLER ICI LES VIGNETTES
                  </div>

                  <div className="cnam-box p-2 text-[10px] space-y-1">
                    <div className="font-semibold">Avis important</div>
                    <p>
                      Ce bulletin de soins doit etre rempli avec la plus grande precision et ne peut servir que pour un seul malade.
                    </p>
                    {cnamPrintPreviewData.notes ?
                    <p><span className="font-semibold">Notes:</span> {cnamPrintPreviewData.notes}</p> :
                    null}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-red-600 rounded-lg flex items-center justify-center">
            <CreditCardIcon size={14} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900">
              Facturation Cardiologique
            </h1>
            <p className="text-xs text-gray-500">
              Codes CPT et facturation des actes cardiologiques
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenNewCptModal}
            className="flex items-center gap-1 px-3 py-1.5 text-xs bg-white text-red-700 border border-red-200 rounded-lg hover:bg-red-50 font-medium"
          >
            <PlusIcon size={12} /> Nouveau Code CPT
          </button>
          <button 
            onClick={handleOpenNewActModal}
            className="flex items-center gap-1 px-3 py-1.5 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
            <PlusIcon size={12} /> Nouvel Acte
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        <div className="bg-white border border-red-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Facturé ce mois</span>
            <CreditCardIcon size={14} className="text-red-500" />
          </div>
          <div className="text-xl font-bold text-red-600">
            {totalBilled.toLocaleString()} €
          </div>
          <div className="text-xs text-gray-500 mt-0.5">
            {records.length} actes
          </div>
        </div>
        <div className="bg-white border border-amber-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">
              En attente remboursement
            </span>
            <ClockIcon size={14} className="text-amber-500" />
          </div>
          <div className="text-xl font-bold text-amber-600">
            {pendingAmount.toLocaleString()} €
          </div>
          <div className="text-xs text-gray-500 mt-0.5">
            {records.filter((r) => r.status === 'pending').length} dossiers
          </div>
        </div>
        <div className="bg-white border border-green-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Taux acceptation</span>
            <TrendingUpIcon size={14} className="text-green-500" />
          </div>
          <div className="text-xl font-bold text-green-600">
            {acceptanceRate}%
          </div>
          <div className="text-xs text-gray-500 mt-0.5">
            {records.filter((r) => r.status === 'validated').length} validés
          </div>
        </div>
        <div className="bg-white border border-red-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Revenus nets</span>
            <CheckCircleIcon size={14} className="text-red-500" />
          </div>
          <div className="text-xl font-bold text-red-600">
            {netRevenue.toLocaleString()} €
          </div>
          <div className="text-xs text-gray-500 mt-0.5">
            Après remboursements
          </div>
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

      {/* ── TAB: ACTES RÉCENTS ── */}
      {activeTab === 'recent' &&
      <div className="space-y-2">
          {/* Search + filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative flex-1 min-w-40">
              <SearchIcon
              size={12}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
              type="text"
              value={recentSearch}
              onChange={(e) => setRecentSearch(e.target.value)}
              placeholder="Rechercher patient ou acte..."
              className="w-full pl-6 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500" />

            </div>
            <div className="flex gap-1">
              {(['all', 'validated', 'pending', 'rejected', 'paid'] as const).map(
              (s) =>
              <button
                key={s}
                onClick={() => setRecentStatusFilter(s)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${recentStatusFilter === s ? 'bg-red-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>

                    {s === 'all' ?
                'Tous' :
                s === 'validated' ?
                'Validé' :
                s === 'pending' ?
                'En attente' :
                s === 'paid' ?
                'Payé' :
                'Refusé'}
                  </button>

            )}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-gray-50">
              <h2 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                <ActivityIcon size={12} className="text-red-500" /> Actes
                récents
              </h2>
              <span className="text-xs text-gray-400">
                {filteredRecords.length} actes
              </span>
            </div>
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
                    Acte
                  </th>
                  <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                    Code CPT
                  </th>
                  <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                    Montant
                  </th>
                  <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                    Assurance
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
                {filteredRecords.map((record) =>
              <tr
                key={record.id}
                className="border-b border-gray-50 hover:bg-gray-50 transition-colors">

                    <td className="px-3 py-1.5 text-xs font-medium text-gray-800">
                      {record.patient}
                    </td>
                    <td className="px-3 py-1.5 text-xs text-gray-500">
                      {record.date}
                    </td>
                    <td className="px-3 py-1.5 text-xs text-gray-700">
                      {record.procedure}
                    </td>
                    <td className="px-3 py-1.5">
                      <span className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded font-mono text-xs font-bold">
                        {record.cptCode}
                      </span>
                    </td>
                    <td className="px-3 py-1.5 text-xs font-bold text-gray-800">
                      {record.amount} €
                    </td>
                    <td className="px-3 py-1.5 text-xs text-gray-600">
                      {record.insurance}
                    </td>
                    <td className="px-3 py-1.5">
                      {statusBadge(record.status)}
                    </td>
                    <td className="px-3 py-1.5">
                      <div className="flex items-center gap-0.5">
                        <button
                      onClick={() => setViewInvoice(record)}
                      className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-red-600 transition-colors"
                      title="Voir la facture">

                          <FileTextIcon size={11} />
                        </button>
                        <button
                      onClick={() =>
                      showToast(`Facture ${record.patient} téléchargée`)
                      }
                      className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-red-600 transition-colors"
                      title="Télécharger">

                          <DownloadIcon size={11} />
                        </button>
                      </div>
                    </td>
                  </tr>
              )}
                {filteredRecords.length === 0 &&
              <tr>
                    <td
                  colSpan={8}
                  className="px-3 py-6 text-center text-xs text-gray-400">

                      Aucun résultat
                    </td>
                  </tr>
              }
              </tbody>
            </table>
          </div>
        </div>
      }

      {/* ── TAB: CODES CPT ── */}
      {activeTab === 'cpt' &&
      <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative flex-1 min-w-40">
              <SearchIcon
              size={12}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
              type="text"
              value={cptSearch}
              onChange={(e) => setCptSearch(e.target.value)}
              placeholder="Rechercher code ou acte..."
              className="w-full pl-6 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500" />

            </div>
            <div className="flex gap-1 flex-wrap">
              {categories.map((cat) =>
            <button
              key={cat}
              onClick={() => setCptCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${cptCategory === cat ? 'bg-red-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>

                  {cat === 'all' ? 'Tous' : cat}
                </button>
            )}
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
              <h2 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                <FileTextIcon size={12} className="text-red-500" /> Codes CPT
                ({filteredCPT.length})
              </h2>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                    Code
                  </th>
                  <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                    Description
                  </th>
                  <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                    Catégorie
                  </th>
                  <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                    Prix
                  </th>
                  <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCPT.map((code) =>
              <tr
                key={code.code}
                className="border-b border-gray-50 hover:bg-gray-50 transition-colors">

                    <td className="px-3 py-1.5">
                      <span className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded font-mono text-xs font-bold">
                        {code.code}
                      </span>
                    </td>
                    <td className="px-3 py-1.5 text-xs font-medium text-gray-800">
                      {code.description}
                    </td>
                    <td className="px-3 py-1.5">
                      <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                        {code.category}
                      </span>
                    </td>
                    <td className="px-3 py-1.5 text-xs font-bold text-gray-800">
                      {code.price} €
                    </td>
                    <td className="px-3 py-1.5">
                      <button
                        onClick={() => handleAddFromCpt(code)}
                        className="px-2 py-0.5 text-xs bg-red-50 text-red-700 border border-red-200 rounded hover:bg-red-600 hover:text-white hover:border-red-600 transition-all">
                        Ajouter
                      </button>
                    </td>
                  </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
      }

      {/* ── TAB: ASSURANCES ── */}
      {activeTab === 'insurance' &&
      <div className="space-y-3">
          {/* Organismes d'assurance table — unchanged */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
              <h2 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                <HeartIcon size={12} className="text-red-500" /> Organismes
                d'assurance
              </h2>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                    Organisme
                  </th>
                  <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                    Taux d'acceptation
                  </th>
                  <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                    Délai moyen
                  </th>
                  <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                    En attente
                  </th>
                </tr>
              </thead>
              <tbody>
                {insuranceProviders.map((provider) =>
              <tr
                key={provider.name}
                className="border-b border-gray-50 hover:bg-gray-50">

                    <td className="px-3 py-1.5 text-xs font-medium text-gray-800">
                      {provider.name}
                    </td>
                    <td className="px-3 py-2 w-48">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                          <div
                        className="h-1.5 bg-green-500 rounded-full"
                        style={{
                          width: `${provider.acceptanceRate}%`
                        }} />

                        </div>
                        <span className="text-xs font-bold text-gray-800 w-8 text-right">
                          {provider.acceptanceRate}%
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-1.5 text-xs text-gray-600">
                      {provider.avgProcessingDays} jours
                    </td>
                    <td className="px-3 py-1.5">
                      <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded text-xs">
                        {provider.pendingClaims} dossiers
                      </span>
                    </td>
                  </tr>
              )}
              </tbody>
            </table>
          </div>

          {/* Sub-tab panel */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* Sub-tab nav */}
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                onClick={() => setInsuranceSubTab('fse')}
                className={`flex items-center gap-1.5 whitespace-nowrap py-3 px-4 border-b-2 text-xs font-medium transition-all ${insuranceSubTab === 'fse' ? 'border-red-600 text-red-600 bg-red-50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>

                  <FileTextIcon size={13} /> Feuilles de soins
                </button>
                <button
                onClick={() => setInsuranceSubTab('reimbursements')}
                className={`flex items-center gap-1.5 whitespace-nowrap py-3 px-4 border-b-2 text-xs font-medium transition-all ${insuranceSubTab === 'reimbursements' ? 'border-red-600 text-red-600 bg-red-50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>

                  <DollarSignIcon size={13} /> Remboursements
                </button>
                <button
                onClick={() => setInsuranceSubTab('coverage')}
                className={`flex items-center gap-1.5 whitespace-nowrap py-3 px-4 border-b-2 text-xs font-medium transition-all ${insuranceSubTab === 'coverage' ? 'border-red-600 text-red-600 bg-red-50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>

                  <ShieldCheckIcon size={13} /> Couverture patient
                </button>
              </nav>
            </div>

            <div className="p-3 space-y-3">
              {/* ── SUB-TAB: FEUILLES DE SOINS ── */}
              {insuranceSubTab === 'fse' &&
            <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="relative flex-1 max-w-xs">
                      <SearchIcon
                    size={12}
                    className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />

                      <input
                    type="text"
                    value={fseSearch}
                    onChange={(e) => setFseSearch(e.target.value)}
                    placeholder="Rechercher une FSE..."
                    className="w-full pl-6 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500" />

                    </div>
                    <button
                      onClick={handleOpenNewFseModal}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
                      <PlusIcon size={11} /> Nouvelle FSE
                    </button>
                  </div>

                  <div className="overflow-x-auto rounded-lg border border-gray-100">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                          <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">
                            Référence
                          </th>
                          <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">
                            Patient
                          </th>
                          <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">
                            Date
                          </th>
                          <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">
                            Mutuelle
                          </th>
                          <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">
                            Montant
                          </th>
                          <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">
                            Statut
                          </th>
                          <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cardioFseData.
                    filter(
                      (f) =>
                      f.patient.
                      toLowerCase().
                      includes(fseSearch.toLowerCase()) ||
                      f.id.
                      toLowerCase().
                      includes(fseSearch.toLowerCase())
                    ).
                    map((fse) =>
                    <tr
                      key={fse.id}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors">

                              <td className="px-3 py-2 text-xs font-bold text-gray-800">
                                {fse.id}
                              </td>
                              <td className="px-3 py-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                                    {getInitials(fse.patient)}
                                  </div>
                                  <span className="text-xs font-medium text-gray-800">
                                    {fse.patient}
                                  </span>
                                </div>
                              </td>
                              <td className="px-3 py-2 text-xs text-gray-500">
                                {fse.date}
                              </td>
                              <td className="px-3 py-2 text-xs text-gray-600">
                                {fse.mutuelle}
                              </td>
                              <td className="px-3 py-2 text-xs font-bold text-red-600">
                                {fse.amount} €
                              </td>
                              <td className="px-3 py-2">
                                <div className="flex items-center gap-0.5 bg-gray-100 rounded-xl p-1 w-fit">
                                  <button
                            onClick={() =>
                            handleCardioFseStatus(fse.id, 'sent')
                            }
                            title="Envoyée"
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${fse.status === 'sent' ? 'bg-white shadow-sm text-red-600' : 'text-gray-400 hover:text-red-500'}`}>

                                    <ClockIcon size={11} />
                                    {fse.status === 'sent' &&
                            <span>Envoyée</span>
                            }
                                  </button>
                                  <button
                            onClick={() =>
                            handleCardioFseStatus(
                              fse.id,
                              'processing'
                            )
                            }
                            title="En traitement"
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${fse.status === 'processing' ? 'bg-white shadow-sm text-amber-600' : 'text-gray-400 hover:text-amber-500'}`}>

                                    <AlertCircleIcon size={11} />
                                    {fse.status === 'processing' &&
                            <span>En traitement</span>
                            }
                                  </button>
                                  <button
                            onClick={() =>
                            handleCardioFseStatus(
                              fse.id,
                              'reimbursed'
                            )
                            }
                            title="Remboursée"
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${fse.status === 'reimbursed' ? 'bg-white shadow-sm text-green-600' : 'text-gray-400 hover:text-green-500'}`}>

                                    <CheckIcon size={11} />
                                    {fse.status === 'reimbursed' &&
                            <span>Remboursée</span>
                            }
                                  </button>
                                  <button
                            onClick={() =>
                            handleCardioFseStatus(fse.id, 'rejected')
                            }
                            title="Rejetée"
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${fse.status === 'rejected' ? 'bg-white shadow-sm text-red-600' : 'text-gray-400 hover:text-red-500'}`}>

                                    <XIcon size={11} />
                                    {fse.status === 'rejected' &&
                            <span>Rejetée</span>
                            }
                                  </button>
                                </div>
                              </td>
                              <td className="px-3 py-2">
                                <div className="flex items-center gap-0.5">
                                  <button
                            onClick={() =>
                            showToast(`FSE ${fse.id} ouverte`)
                            }
                            className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-red-600 transition-colors">

                                    <EyeIcon size={12} />
                                  </button>
                                  <button
                            onClick={() =>
                            showToast(`FSE ${fse.id} téléchargée`)
                            }
                            className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-red-600 transition-colors">

                                    <DownloadIcon size={12} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                    )}
                      </tbody>
                    </table>
                  </div>

                  {/* Alert if any rejected */}
                  {cardioFseData.some((f) => f.status === 'rejected') &&
              <div className="bg-amber-50 border-l-4 border-amber-400 rounded-lg p-3 flex items-start gap-2">
                      <AlertCircleIcon
                  size={14}
                  className="text-amber-500 flex-shrink-0 mt-0.5" />

                      <div>
                        <p className="text-xs font-semibold text-amber-800">
                          FSE rejetée — documents manquants
                        </p>
                        <p className="text-xs text-amber-700 mt-0.5">
                          {cardioFseData.
                    filter((f) => f.status === 'rejected').
                    map((f) => f.id).
                    join(', ')}{' '}
                          — Veuillez téléverser les documents requis pour
                          relancer la demande.
                        </p>
                      </div>
                    </div>
              }
                </div>
            }

              {/* ── SUB-TAB: REMBOURSEMENTS ── */}
              {insuranceSubTab === 'reimbursements' &&
            <div className="space-y-3">
                  <div className="relative max-w-xs">
                    <SearchIcon
                  size={12}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                  type="text"
                  value={reimbSearch}
                  onChange={(e) => setReimbSearch(e.target.value)}
                  placeholder="Rechercher un remboursement..."
                  className="w-full pl-6 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500" />

                  </div>

                  <div className="overflow-x-auto rounded-lg border border-gray-100">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                          <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">
                            Référence
                          </th>
                          <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">
                            Patient
                          </th>
                          <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">
                            Date
                          </th>
                          <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">
                            Mutuelle
                          </th>
                          <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">
                            Montant remboursé
                          </th>
                          <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">
                            Montant original
                          </th>
                          <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">
                            Taux
                          </th>
                          <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cardioReimbursementData.
                    filter(
                      (r) =>
                      r.patient.
                      toLowerCase().
                      includes(reimbSearch.toLowerCase()) ||
                      r.id.
                      toLowerCase().
                      includes(reimbSearch.toLowerCase())
                    ).
                    map((r) =>
                    <tr
                      key={r.id}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors">

                              <td className="px-3 py-2 text-xs font-bold text-gray-800">
                                {r.id}
                              </td>
                              <td className="px-3 py-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                                    {getInitials(r.patient)}
                                  </div>
                                  <span className="text-xs font-medium text-gray-800">
                                    {r.patient}
                                  </span>
                                </div>
                              </td>
                              <td className="px-3 py-2 text-xs text-gray-500">
                                {r.date}
                              </td>
                              <td className="px-3 py-2 text-xs text-gray-600">
                                {r.mutuelle}
                              </td>
                              <td className="px-3 py-2 text-xs font-bold text-green-600">
                                {r.reimbursedAmount} €
                              </td>
                              <td className="px-3 py-2 text-xs text-gray-500">
                                {r.originalAmount} €
                              </td>
                              <td className="px-3 py-2">
                                <span className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-xs font-medium">
                                  {r.coverage}
                                </span>
                              </td>
                              <td className="px-3 py-2">
                                <div className="flex items-center gap-0.5">
                                  <button
                            onClick={() =>
                            showToast(`Remboursement ${r.id} ouvert`)
                            }
                            className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-red-600 transition-colors">

                                    <EyeIcon size={12} />
                                  </button>
                                  <button
                            onClick={() =>
                            showToast(
                              `Remboursement ${r.id} téléchargé`
                            )
                            }
                            className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-red-600 transition-colors">

                                    <DownloadIcon size={12} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                    )}
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-3 flex items-start gap-2">
                    <CheckCircleIcon
                  size={14}
                  className="text-green-500 flex-shrink-0 mt-0.5" />

                    <div>
                      <p className="text-xs font-semibold text-green-800">
                        Remboursements à jour
                      </p>
                      <p className="text-xs text-green-700 mt-0.5">
                        Tous les remboursements ont été correctement traités.
                        Aucune action n'est requise.
                      </p>
                    </div>
                  </div>
                </div>
            }

              {/* ── SUB-TAB: COUVERTURE PATIENT ── */}
              {insuranceSubTab === 'coverage' &&
            <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="relative flex-1 max-w-xs">
                      <SearchIcon
                    size={12}
                    className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />

                      <input
                    type="text"
                    value={coverageSearch}
                    onChange={(e) => setCoverageSearch(e.target.value)}
                    placeholder="Rechercher un patient..."
                    className="w-full pl-6 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500" />

                    </div>
                    <button className="flex items-center gap-1 px-3 py-1.5 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
                      <PlusIcon size={11} /> Ajouter une couverture
                    </button>
                  </div>

                  <div className="overflow-x-auto rounded-lg border border-gray-100">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                          <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">
                            Patient
                          </th>
                          <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">
                            Mutuelle
                          </th>
                          <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">
                            Type
                          </th>
                          <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">
                            Taux
                          </th>
                          <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">
                            Plafond annuel
                          </th>
                          <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">
                            Reste à utiliser
                          </th>
                          <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">
                            Statut
                          </th>
                          <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cardioInsuranceData.
                    filter((i) =>
                    i.patient.
                    toLowerCase().
                    includes(coverageSearch.toLowerCase())
                    ).
                    map((ins) => {
                      const pct = Math.round(
                        ins.remainingLimit / ins.annualLimit * 100
                      );
                      return (
                        <tr
                          key={ins.patient}
                          className="border-b border-gray-50 hover:bg-gray-50 transition-colors">

                                <td className="px-3 py-2">
                                  <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                                      {getInitials(ins.patient)}
                                    </div>
                                    <span className="text-xs font-medium text-gray-800">
                                      {ins.patient}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-3 py-2 text-xs text-gray-600">
                                  {ins.mutuelle}
                                </td>
                                <td className="px-3 py-2 text-xs text-gray-600">
                                  {ins.coverageType}
                                </td>
                                <td className="px-3 py-2">
                                  <span className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-xs font-medium">
                                    {ins.coverageRate}
                                  </span>
                                </td>
                                <td className="px-3 py-2 text-xs text-gray-600">
                                  {ins.annualLimit.toLocaleString()} €
                                </td>
                                <td className="px-3 py-2">
                                  <div className="text-xs font-medium text-gray-800 mb-1">
                                    {ins.remainingLimit.toLocaleString()} €
                                  </div>
                                  <div className="w-20 bg-gray-200 rounded-full h-1.5">
                                    <div
                                className="bg-gradient-to-r from-violet-500 to-blue-500 h-1.5 rounded-full"
                                style={{
                                  width: `${pct}%`
                                }} />

                                  </div>
                                </td>
                                <td className="px-3 py-2">
                                  <div className="flex items-center gap-0.5 bg-gray-100 rounded-xl p-1 w-fit">
                                    <button
                                onClick={() =>
                                handleCoverageStatus(
                                  ins.patient,
                                  'active'
                                )
                                }
                                title="Actif"
                                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${ins.status === 'active' ? 'bg-white shadow-sm text-green-600' : 'text-gray-400 hover:text-green-500'}`}>

                                      <CheckIcon size={11} />
                                      {ins.status === 'active' &&
                                <span>Actif</span>
                                }
                                    </button>
                                    <button
                                onClick={() =>
                                handleCoverageStatus(
                                  ins.patient,
                                  'inactive'
                                )
                                }
                                title="Inactif"
                                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${ins.status === 'inactive' ? 'bg-white shadow-sm text-red-600' : 'text-gray-400 hover:text-red-500'}`}>

                                      <XIcon size={11} />
                                      {ins.status === 'inactive' &&
                                <span>Inactif</span>
                                }
                                    </button>
                                    <button
                                onClick={() =>
                                handleCoverageStatus(
                                  ins.patient,
                                  'expired'
                                )
                                }
                                title="Expiré"
                                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${ins.status === 'expired' ? 'bg-white shadow-sm text-amber-600' : 'text-gray-400 hover:text-amber-500'}`}>

                                      <ClockIcon size={11} />
                                      {ins.status === 'expired' &&
                                <span>Expiré</span>
                                }
                                    </button>
                                  </div>
                                </td>
                                <td className="px-3 py-2">
                                  <button
                              onClick={() =>
                              showToast(
                                `Couverture de ${ins.patient} ouverte`
                              )
                              }
                              className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-red-600 transition-colors">

                                    <ArrowRightIcon size={13} />
                                  </button>
                                </td>
                              </tr>);

                    })}
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-3 flex items-start gap-2">
                    <ShieldCheckIcon
                  size={14}
                  className="text-red-500 flex-shrink-0 mt-0.5" />

                    <div>
                      <p className="text-xs font-semibold text-red-800">
                        Vérification des droits en temps réel disponible
                      </p>
                      <p className="text-xs text-red-700 mt-0.5">
                        Vous pouvez vérifier les droits d'un patient en temps
                        réel via notre service de télétransmission.
                      </p>
                    </div>
                  </div>
                </div>
            }
            </div>
          </div>
        </div>
      }

      {/* ── TAB: PAIEMENTS ── */}
      {activeTab === 'payments' &&
      <div className="space-y-3">
          {/* Plans de paiement */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-gray-50">
              <h2 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                <CalendarIcon size={12} className="text-red-500" /> Plans de
                paiement
              </h2>
              <button
                onClick={handleOpenNewPaymentPlanModal}
                className="flex items-center gap-1 px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 font-medium">
                <PlusIcon size={10} /> Nouveau plan
              </button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                    Patient
                  </th>
                  <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                    Montant total
                  </th>
                  <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                    Mensualité
                  </th>
                  <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                    Durée
                  </th>
                  <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                    Progression
                  </th>
                  <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                    Statut
                  </th>
                  <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                    Détails
                  </th>
                </tr>
              </thead>
              <tbody>
                {paymentPlanData.map((plan) => {
                const pct = Math.round(
                  plan.paidMonths / plan.duration * 100
                );
                const isExpanded = expandedPaymentPlanIds.has(plan.id);
                return (
                  <React.Fragment key={plan.id}>
                  <tr
                    className="border-b border-gray-50 hover:bg-gray-50">

                      <td className="px-3 py-1.5 text-xs font-medium text-gray-800">
                        {plan.patient}
                      </td>
                      <td className="px-3 py-1.5 text-xs font-bold text-gray-800">
                        {plan.totalAmount.toLocaleString()} €
                      </td>
                      <td className="px-3 py-1.5 text-xs text-gray-700">
                        {plan.monthlyAmount} €/mois
                      </td>
                      <td className="px-3 py-1.5 text-xs text-gray-600">
                        {plan.duration} mois
                      </td>
                      <td className="px-3 py-2 w-40">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                            <div
                            className={`h-1.5 rounded-full ${plan.status === 'completed' ? 'bg-red-500' : plan.status === 'late' ? 'bg-red-500' : 'bg-red-500'}`}
                            style={{
                              width: `${pct}%`
                            }} />

                          </div>
                          <span className="text-xs text-gray-500 w-8 text-right">
                            {plan.paidMonths}/{plan.duration}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-1.5">
                        {planStatusBadge(plan.status)}
                      </td>
                      <td className="px-3 py-1.5">
                        <button
                          onClick={() => togglePaymentPlanDetails(plan.id)}
                          className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded hover:bg-red-100 hover:text-red-700 transition-colors">
                          {isExpanded ? 'Masquer échéances' : 'Voir échéances'}
                        </button>
                      </td>
                    </tr>
                    {isExpanded &&
                    <tr className="border-b border-gray-50 bg-gray-50/60">
                        <td colSpan={7} className="px-3 py-2">
                          <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
                            <div className="px-3 py-2 border-b border-gray-100 bg-gray-50 text-xs font-semibold text-gray-700">
                              Échéances du plan
                            </div>
                            <table className="w-full">
                              <thead>
                                <tr className="border-b border-gray-100 bg-gray-50">
                                  <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">Tranche</th>
                                  <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">Date d'échéance</th>
                                  <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">Montant</th>
                                  <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">Statut</th>
                                </tr>
                              </thead>
                              <tbody>
                                {plan.installments.map((inst, idx) =>
                                <tr key={inst.id} className="border-b border-gray-50 last:border-b-0">
                                    <td className="px-3 py-1.5 text-xs text-gray-700">#{idx + 1}</td>
                                    <td className="px-3 py-1.5 text-xs text-gray-700">
                                      {new Date(inst.dueDate).toLocaleDateString('fr-FR')}
                                    </td>
                                    <td className="px-3 py-1.5 text-xs font-semibold text-gray-800">
                                      {inst.amount.toLocaleString()} €
                                    </td>
                                    <td className="px-3 py-1.5">
                                      <span
                                      className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs ${inst.status === 'paid' ? 'bg-green-100 text-green-700' : inst.status === 'late' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>

                                        {inst.status === 'paid' ? 'Payé' :
                                      inst.status === 'late' ? 'En retard' :
                                      'En attente'}
                                      </span>
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    }
                  </React.Fragment>);

              })}
              </tbody>
            </table>
          </div>
        </div>
      }

      {/* ── TAB: DEVIS ── */}
      {activeTab === 'devis' &&
      <div className="space-y-2">
          {/* Summary stats */}
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-0.5">Total devis</p>
              <p className="text-xl font-bold text-gray-900">
                {devisTotals.total}
              </p>
            </div>
            <div className="bg-white border border-green-200 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-0.5">Acceptés</p>
              <p className="text-xl font-bold text-green-600">
                {devisTotals.accepted}
              </p>
            </div>
            <div className="bg-white border border-amber-200 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-0.5">En attente</p>
              <p className="text-xl font-bold text-amber-600">
                {devisTotals.pending}
              </p>
            </div>
            <div className="bg-white border border-red-200 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-0.5">Montant accepté</p>
              <p className="text-xl font-bold text-red-600">
                {devisTotals.amount.toLocaleString()} €
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-gray-50">
              <h2 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                <ClipboardIcon size={12} className="text-red-500" /> Devis (
                {devisRecords.length})
              </h2>
              <button className="flex items-center gap-1 px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 font-medium">
                <PlusIcon size={10} /> Nouveau devis
              </button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                    N° Devis
                  </th>
                  <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                    Patient
                  </th>
                  <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                    Date
                  </th>
                  <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                    Actes inclus
                  </th>
                  <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                    Montant
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
                {devisRecords.map((devis) =>
              <tr
                key={devis.id}
                className="border-b border-gray-50 hover:bg-gray-50 transition-colors">

                    <td className="px-3 py-1.5">
                      <span className="font-mono text-xs text-red-700 font-bold">
                        {devis.number}
                      </span>
                    </td>
                    <td className="px-3 py-1.5 text-xs font-medium text-gray-800">
                      {devis.patient}
                    </td>
                    <td className="px-3 py-1.5 text-xs text-gray-500">
                      {devis.date}
                    </td>
                    <td className="px-3 py-1.5 text-xs text-gray-700">
                      {devis.acts}
                    </td>
                    <td className="px-3 py-1.5 text-xs font-bold text-gray-800">
                      {devis.totalAmount.toLocaleString()} €
                    </td>
                    <td className="px-3 py-1.5">{devisBadge(devis.status)}</td>
                    <td className="px-3 py-1.5">
                      <div className="flex items-center gap-0.5">
                        <button
                      onClick={() =>
                      showToast(`Devis ${devis.number} ouvert`)
                      }
                      className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-red-600 transition-colors"
                      title="Voir">

                          <FileTextIcon size={11} />
                        </button>
                        <button
                      onClick={() =>
                      showToast(`Devis ${devis.number} téléchargé`)
                      }
                      className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-red-600 transition-colors"
                      title="Télécharger">

                          <DownloadIcon size={11} />
                        </button>
                      </div>
                    </td>
                  </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
      }

      {/* ── TAB: RAPPORTS ── */}
      {activeTab === 'reports' &&
      <div className="space-y-3">
          {/* Period selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Période :</span>
            {(['monthly', 'quarterly', 'annual'] as const).map((p) =>
          <button
            key={p}
            onClick={() => setReportPeriod(p)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${reportPeriod === p ? 'bg-red-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>

                {p === 'monthly' ?
            'Mensuel' :
            p === 'quarterly' ?
            'Trimestriel' :
            'Annuel'}
              </button>
          )}
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-white border border-red-200 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-0.5">CA total</p>
              <p className="text-xl font-bold text-red-600">
                {reportPeriod === 'monthly' ?
              '1 645' :
              reportPeriod === 'quarterly' ?
              '4 820' :
              '19 250'}{' '}
                €
              </p>
            </div>
            <div className="bg-white border border-red-200 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-0.5">Actes réalisés</p>
              <p className="text-xl font-bold text-red-600">
                {reportPeriod === 'monthly' ?
              '8' :
              reportPeriod === 'quarterly' ?
              '24' :
              '96'}
              </p>
            </div>
            <div className="bg-white border border-green-200 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-0.5">Taux remboursement</p>
              <p className="text-xl font-bold text-green-600">87%</p>
            </div>
            <div className="bg-white border border-amber-200 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-0.5">Montant remboursé</p>
              <p className="text-xl font-bold text-amber-600">
                {reportPeriod === 'monthly' ?
              '1 430' :
              reportPeriod === 'quarterly' ?
              '4 193' :
              '16 747'}{' '}
                €
              </p>
            </div>
          </div>

          {/* Report types */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
              <h2 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                <BarChart2Icon size={12} className="text-red-500" /> Générer
                un rapport
              </h2>
            </div>
            <div className="divide-y divide-gray-50">
              <div className="flex items-center justify-between px-3 py-2.5 hover:bg-gray-50">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-red-100 rounded-lg flex items-center justify-center">
                    <ActivityIcon size={13} className="text-red-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">
                      Rapport mensuel d'activité
                    </p>
                    <p className="text-[10px] text-gray-500">
                      Synthèse des actes et revenus du mois
                    </p>
                  </div>
                </div>
                <button
                onClick={() => showToast('Rapport généré avec succès')}
                className="px-2.5 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors">

                  Générer
                </button>
              </div>
              <div className="flex items-center justify-between px-3 py-2.5 hover:bg-gray-50">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center">
                    <RefreshCwIcon size={13} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">
                      Bilan des remboursements
                    </p>
                    <p className="text-[10px] text-gray-500">
                      Suivi des remboursements par organisme
                    </p>
                  </div>
                </div>
                <button
                onClick={() => showToast('Rapport généré avec succès')}
                className="px-2.5 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors">

                  Générer
                </button>
              </div>
              <div className="flex items-center justify-between px-3 py-2.5 hover:bg-gray-50">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-red-100 rounded-lg flex items-center justify-center">
                    <FileTextIcon size={13} className="text-red-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">
                      Analyse par code CPT
                    </p>
                    <p className="text-[10px] text-gray-500">
                      Répartition des actes par code CPT
                    </p>
                  </div>
                </div>
                <button
                onClick={() => showToast('Rapport généré avec succès')}
                className="px-2.5 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors">

                  Générer
                </button>
              </div>
              <div className="flex items-center justify-between px-3 py-2.5 hover:bg-gray-50">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-red-100 rounded-lg flex items-center justify-center">
                    <HeartIcon size={13} className="text-red-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">
                      Rapport par organisme assureur
                    </p>
                    <p className="text-[10px] text-gray-500">
                      Statistiques par mutuelle et CPAM
                    </p>
                  </div>
                </div>
                <button
                onClick={() => showToast('Rapport généré avec succès')}
                className="px-2.5 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors">

                  Générer
                </button>
              </div>
              <div className="flex items-center justify-between px-3 py-2.5 hover:bg-gray-50">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-amber-100 rounded-lg flex items-center justify-center">
                    <TrendingUpIcon size={13} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">
                      Synthèse financière
                    </p>
                    <p className="text-[10px] text-gray-500">
                      Vue d'ensemble des finances du cabinet
                    </p>
                  </div>
                </div>
                <button
                onClick={() => showToast('Rapport généré avec succès')}
                className="px-2.5 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors">

                  Générer
                </button>
              </div>
            </div>
          </div>

          {/* Recent reports */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
              <h2 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                <ClockIcon size={12} className="text-gray-400" /> Rapports
                récents
              </h2>
            </div>
            <div className="divide-y divide-gray-50">
              {recentGeneratedReports.map((r, i) =>
            <div
              key={i}
              className="flex items-center justify-between px-3 py-2 hover:bg-gray-50">

                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                      <FileTextIcon size={11} className="text-gray-500" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-800">
                        {r.name}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        {r.type} · {r.date} · {r.size}
                      </p>
                    </div>
                  </div>
                  <button
                onClick={() => showToast(`${r.name} téléchargé`)}
                className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-red-600 transition-colors">

                    <DownloadIcon size={12} />
                  </button>
                </div>
            )}
            </div>
          </div>
        </div>
      }
    </div>);

}
