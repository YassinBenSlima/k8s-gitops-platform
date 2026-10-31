import { api } from './api';

export interface StockItem {
  id: number;
  reference: string;
  nom: string;
  categorie: string;
  unite: string;
  quantiteDisponible: number;
  seuilMinimal: number;
  seuilMaximal: number;
  prixUnitaire: number;
  emplacement?: string;
  datePeremption?: string;
  statut: 'OK' | 'Bas' | 'Critique' | 'Rupture';
  pourcentageStock: number;
  fournisseurId?: number;
  fournisseurNom?: string;
  misAJourLe: string;
}

export interface CreateStockItemData {
  nom: string;
  categorie: string;
  unite: string;
  quantiteDisponible: number;
  seuilMinimal: number;
  seuilMaximal: number;
  prixUnitaire: number;
  emplacement?: string;
  datePeremption?: string;
  fournisseurId?: number;
  reference?: string;
}

export interface StockStats {
  totalArticles: number;
  articlesBas: number;
  articlesCritiques: number;
  articlesRupture: number;
  commandesEnCours: number;
  valeurTotaleStock: number;
  alertesNonLues: number;
  parCategorie: Record<string, number>;
}

export interface AlerteStock {
  id: number;
  message: string;
  estLue: boolean;
  creeLe: string;
  consommableId: number;
  consommableNom: string;
  quantiteActuelle: number;
  seuilMinimal: number;
}

export interface MouvementStock {
  id: number;
  type: string;
  quantite: number;
  motif?: string;
  effectueLe: string;
  consommableId: number;
  consommableNom: string;
  personneNomComplet: string;
}

export interface LigneCommandeInput {
  consommableId: number;
  quantiteCommandee: number;
  prixUnitaire: number;
}

export interface CreateCommandeData {
  fournisseurId: number;
  lignes: LigneCommandeInput[];
  dateLivraisonPrevue?: string;
  notes?: string;
}

export interface CommandeResponse {
  id: number;
  numero: string;
  statut: string;
  dateCommande: string;
  dateLivraisonPrevue?: string;
  dateLivraisonReelle?: string;
  montantTotal: number;
  valideeParCardiologue: boolean;
  notes?: string;
  fournisseurNom: string;
  lignes: {
    id: number;
    consommableId: number;
    consommableNom: string;
    quantiteCommandee: number;
    quantiteRecue: number;
    prixUnitaire: number;
    sousTotal: number;
  }[];
}

export const stockService = {
  getAll: (params?: { categorie?: string; statut?: string; search?: string; fournisseurId?: number }) => {
    const q = new URLSearchParams();
    if (params?.categorie)    q.set('categorie', params.categorie);
    if (params?.statut)       q.set('statut', params.statut);
    if (params?.search)       q.set('search', params.search);
    if (params?.fournisseurId) q.set('fournisseurId', String(params.fournisseurId));
    const qs = q.toString();
    return api.get<StockItem[]>(`/stock${qs ? '?' + qs : ''}`);
  },

  getById: (id: number) => api.get<StockItem>(`/stock/${id}`),

  getStats: () => api.get<StockStats>('/stock/stats'),

  create: (data: CreateStockItemData) => api.post<StockItem>('/stock', data),

  update: (id: number, data: Partial<CreateStockItemData>) =>
    api.put<StockItem>(`/stock/${id}`, data),

  delete: (id: number) => api.delete<boolean>(`/stock/${id}`),

  getAlertes: (estLue = false) =>
    api.get<AlerteStock[]>(`/stock/alertes?estLue=${estLue}`),

  marquerAlerteLue: (id: number) =>
    api.patch<boolean>(`/stock/alertes/${id}/lue`, {}),

  getMouvements: (params?: { consommableId?: number; page?: number; pageSize?: number }) => {
    const q = new URLSearchParams();
    if (params?.consommableId) q.set('consommableId', String(params.consommableId));
    if (params?.page)          q.set('page', String(params.page));
    if (params?.pageSize)      q.set('pageSize', String(params.pageSize));
    const qs = q.toString();
    return api.get<{ items: MouvementStock[]; totalCount: number }>(
      `/stock/mouvements${qs ? '?' + qs : ''}`);
  },

  getCommandes: () => api.get<CommandeResponse[]>('/commandes'),

  createCommande: (data: CreateCommandeData) =>
    api.post<CommandeResponse>('/commandes', data),

  updateStatut: (id: number, statut: string) =>
    api.patch<CommandeResponse>(`/commandes/${id}/statut`, { statut }),

  receptionner: (id: number, lignes: { ligneCommandeId: number; quantiteRecue: number }[]) =>
    api.post<CommandeResponse>(`/commandes/${id}/receptionner`, { lignes }),
};
