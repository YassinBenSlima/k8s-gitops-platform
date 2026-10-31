import { api } from './api';

export interface Fournisseur {
  id: number;
  code: string;
  nom: string;
  matriculeFiscal?: string;
  email?: string;
  telephone?: string;
  ville?: string;
  codePostal?: string;
  adresse?: string;
  activite?: string;
  actif: boolean;
  statut: 'actif' | 'inactif';
  typeIdentifiant?: string;
  regimeImpots?: string;
  tauxRetenueSource: number;
  suspensionTaxes: boolean;
  delaiLivraisonJours: number;
  notes?: string;
  nbCommandes: number;
  creeLe: string;
}

export interface CreateFournisseurData {
  nom: string;
  matriculeFiscal?: string;
  email?: string;
  telephone?: string;
  ville?: string;
  codePostal?: string;
  adresse?: string;
  activite?: string;
  typeIdentifiant?: string;
  regimeImpots?: string;
  tauxRetenueSource?: number;
  suspensionTaxes?: boolean;
  delaiLivraisonJours?: number;
  notes?: string;
}

export const fournisseurService = {
  getAll: (params?: { actif?: boolean; search?: string }) => {
    const q = new URLSearchParams();
    if (params?.actif !== undefined) q.set('actif', String(params.actif));
    if (params?.search) q.set('search', params.search);
    const qs = q.toString();
    return api.get<Fournisseur[]>(`/fournisseurs${qs ? '?' + qs : ''}`);
  },

  getById: (id: number) => api.get<Fournisseur>(`/fournisseurs/${id}`),

  create: (data: CreateFournisseurData) =>
    api.post<Fournisseur>('/fournisseurs', data),

  update: (id: number, data: Partial<CreateFournisseurData>) =>
    api.put<Fournisseur>(`/fournisseurs/${id}`, data),

  delete: (id: number) => api.delete<boolean>(`/fournisseurs/${id}`),
};
