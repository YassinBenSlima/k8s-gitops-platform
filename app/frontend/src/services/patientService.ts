import { api } from './api';

// ✅ Aligned with backend (prenom/nom, Genre enum: Male=1, Female=2, Other=3)
export interface Patient {
  id: number;
  numeroDossier: string;
  prenom: string;
  nom: string;
  nomComplet: string;
  email?: string;
  telephone?: string;
  telephoneSecondaire?: string;
  adresse?: string;
  ville?: string;
  codePostal?: string;
  dateNaissance: string;
  age: number;
  genre: string;                   // "Masculin" | "Feminin" | "Autre"
  numeroCIN?: string;
  groupeSanguin?: string;
  niveauRisque: string;            // "Faible" | "Modere" | "Eleve" | "Critique"
  profession?: string;
  lieuNaissance?: string;
  taille?: number;
  poids?: number;
  imc?: number;
  tourDeTaille?: string;
  assurance?: string;
  notes?: string;
  medecineTraitant?: string;
  pathologiesChroniques?: string;
  contactUrgenceNom?: string;
  contactUrgencePrenom?: string;
  contactUrgenceTelephone?: string;
  contactUrgenceRelation?: string;
  allergies: AllergieItem[];
  antecedents: AntecedentItem[];
  representantLegal?: RepresentantLegalItem;
  nbConsultations: number;
  derniereConsultation?: string;
  creeLe: string;
  misAJourLe: string;
}

export interface PatientSummary {
  id: number;
  numeroDossier: string;
  prenom: string;
  nom: string;
  nomComplet: string;
  email?: string;
  telephone?: string;
  ville?: string;
  dateNaissance: string;
  age: number;
  genre: string;
  groupeSanguin?: string;
  niveauRisque: string;
  assurance?: string;
  nbConsultations: number;
  derniereConsultation?: string;
  creeLe: string;
}

export interface AllergieItem {
  id: number;
  substance: string;
  reaction?: string;
  severite?: string;
  notes?: string;
}

export interface AntecedentItem {
  id: number;
  type: string;
  description: string;
  relation?: string;
  anneeDebut?: number;
  notes?: string;
}

export interface RepresentantLegalItem {
  id: number;
  prenom: string;
  nom: string;
  telephone?: string;
  telephoneSecondaire?: string;
  adresse?: string;
  relation?: string;
}

export interface CreatePatientData {
  prenom: string;
  nom: string;
  dateNaissance: string;
  genre: number;             // 1=Male, 2=Female, 3=Other (Genre enum)
  email?: string;
  telephone?: string;
  telephoneSecondaire?: string;
  adresse?: string;
  ville?: string;
  codePostal?: string;
  lieuNaissance?: string;
  numeroCIN?: string;
  groupeSanguin?: string;
  profession?: string;
  assurance?: string;
  taille?: number;
  poids?: number;
  tourDeTaille?: string;
  notes?: string;
  medecineTraitant?: string;
  pathologiesChroniques?: string;
  contactUrgenceNom?: string;
  contactUrgencePrenom?: string;
  contactUrgenceTelephone?: string;
  contactUrgenceAdresse?: string;
  contactUrgenceRelation?: string;
  representantLegal?: {
    prenom: string; nom: string;
    telephone?: string; telephoneSecondaire?: string;
    adresse?: string; relation?: string;
  };
}

export interface PatientStatsResponse {
  totalPatients: number;
  nouveauxCeMois: number;
  risqueEleve: number;
  risqueCritique: number;
  repartitionRisque: Record<string, number>;
  repartitionAssurance: Record<string, number>;
  repartitionGenre: Record<string, number>;
}

export interface PagedPatients {
  items: PatientSummary[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const patientService = {
  getAll: (params?: {
    page?: number; pageSize?: number;
    niveauRisque?: string; assurance?: string;
  }) => {
    const q = new URLSearchParams();
    if (params?.page)         q.set('page', String(params.page));
    if (params?.pageSize)     q.set('pageSize', String(params.pageSize));
    if (params?.niveauRisque) q.set('niveauRisque', params.niveauRisque);
    if (params?.assurance)    q.set('assurance', params.assurance);
    const qs = q.toString();
    return api.get<PagedPatients>(`/patients${qs ? '?' + qs : ''}`);
  },

  search: (term: string) =>
    api.get<PatientSummary[]>(`/patients/search?term=${encodeURIComponent(term)}`),

  getById: (id: number) => api.get<Patient>(`/patients/${id}`),

  getStats: () => api.get<PatientStatsResponse>('/patients/stats'),

  create: (data: CreatePatientData) => api.post<Patient>('/patients', data),

  update: (id: number, data: Partial<CreatePatientData>) =>
    api.put<Patient>(`/patients/${id}`, data),

  delete: (id: number) => api.delete<boolean>(`/patients/${id}`),

  addAllergie: (patientId: number, data: Omit<AllergieItem, 'id'>) =>
    api.post<Patient>(`/patients/${patientId}/allergies`, data),

  removeAllergie: (patientId: number, allergieId: number) =>
    api.delete<Patient>(`/patients/${patientId}/allergies/${allergieId}`),

  addAntecedent: (patientId: number, data: Omit<AntecedentItem, 'id'>) =>
    api.post<Patient>(`/patients/${patientId}/antecedents`, data),

  removeAntecedent: (patientId: number, antecedentId: number) =>
    api.delete<Patient>(`/patients/${patientId}/antecedents/${antecedentId}`),
};
