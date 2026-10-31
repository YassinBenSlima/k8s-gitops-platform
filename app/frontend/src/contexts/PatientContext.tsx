/**
 * PatientContext
 * Global patient selector — loads from backend via patientService.
 * Maintains backward-compatible interface for all existing clinical pages.
 */
import React, { createContext, useContext, useState,
  useEffect, useCallback } from 'react';
import { patientService, PatientSummary } from '../services/patientService';
import { useAuth } from './AuthContext';

// ─── Patient model (local representation for UI) ──────────────────────────────

export type RiskLevel = 'Faible' | 'Modéré' | 'Élevé' | 'Critique';
export type Gender = 'M' | 'F';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  dossier: string;
  riskLevel: RiskLevel;
  diagnosis: string;
  bloodType?: string;
  insurance?: string;
  lastVisit: string;
  phone?: string;
}

// ─── Fallback / loading placeholder ──────────────────────────────────────────

const FALLBACK_PATIENT: Patient = {
  id: '',
  name: '—',
  age: 0,
  gender: 'M',
  dossier: '—',
  riskLevel: 'Faible',
  diagnosis: '',
  lastVisit: '—',
};

// ─── Mapper: backend PatientSummary → local Patient ──────────────────────────

const mapRisk = (r: string): RiskLevel => {
  if (r === 'Eleve')    return 'Élevé';
  if (r === 'Modere')   return 'Modéré';
  if (r === 'Critique') return 'Critique';
  return 'Faible';
};

const mapToLocal = (p: PatientSummary): Patient => ({
  id:        String(p.id),
  name:      p.nomComplet,
  age:       p.age,
  gender:    p.genre === 'Masculin' ? 'M' : 'F',
  dossier:   p.numeroDossier,
  riskLevel: mapRisk(p.niveauRisque),
  diagnosis: '',
  bloodType: p.groupeSanguin,
  insurance: p.assurance,
  lastVisit: p.derniereConsultation
    ? new Date(p.derniereConsultation).toLocaleDateString('fr-TN')
    : '—',
  phone: p.telephone,
});

// ─── Context ──────────────────────────────────────────────────────────────────

interface PatientContextValue {
  patients: Patient[];
  isLoading: boolean;
  error: string | null;
  selectedPatientId: string;
  selectedPatient: Patient;
  setSelectedPatientId: (id: string) => void;
  refresh: () => Promise<void>;
}

const PatientContext = createContext<PatientContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function PatientProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [patients, setPatients]               = useState<Patient[]>([]);
  const [isLoading, setIsLoading]             = useState(false);
  const [error, setError]                     = useState<string | null>(null);
  const [selectedPatientId, setSelectedPatientId] = useState('');

  const refresh = useCallback(async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    setError(null);
    try {
      const res    = await patientService.getAll({ pageSize: 100 });
      const mapped = res.items.map(mapToLocal);
      setPatients(mapped);
      if (mapped.length > 0 && !selectedPatientId) {
        setSelectedPatientId(mapped[0].id);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erreur de chargement');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, selectedPatientId]);

  // Reload patients whenever authentication state changes (login/logout)
  useEffect(() => {
    if (isAuthenticated) refresh();
    else setPatients([]);
  }, [isAuthenticated]);

  const selectedPatient =
    patients.find(p => p.id === selectedPatientId) ?? FALLBACK_PATIENT;

  return (
    <PatientContext.Provider value={{
      patients, isLoading, error,
      selectedPatientId, selectedPatient,
      setSelectedPatientId, refresh,
    }}>
      {children}
    </PatientContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function usePatient(): PatientContextValue {
  const ctx = useContext(PatientContext);
  if (!ctx) throw new Error('usePatient must be used inside <PatientProvider>');
  return ctx;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const RISK_STYLES: Record<
  RiskLevel,
  { bg: string; text: string; border: string; dot: string }
> = {
  Faible:   { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  'Modéré': { bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200',   dot: 'bg-amber-500' },
  'Élevé':  { bg: 'bg-orange-50',  text: 'text-orange-700',  border: 'border-orange-200',  dot: 'bg-orange-500' },
  Critique: { bg: 'bg-red-50',     text: 'text-red-700',     border: 'border-red-200',     dot: 'bg-red-500' },
};

