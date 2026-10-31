import React, { useState, useEffect } from 'react';
import { stockService, StockItem as ApiStockItem, StockStats, CreateStockItemData } from '../services/stockService';
import { fournisseurService } from '../services/fournisseurService';
import {
  PackageIcon,
  PlusIcon,
  SearchIcon,
  AlertTriangleIcon,
  ShoppingCartIcon,
  EditIcon,
  TrashIcon,
  XIcon,
  HeartIcon,
  ActivityIcon,
  ZapIcon,
  FlaskConicalIcon } from
'lucide-react';
type StockItem = ApiStockItem;
const categories = [
'Tous',
'Médicaments',
'Dispositifs médicaux',
'Consommables',
'Réactifs et tests'];

const categoryIcons: Record<string, React.ElementType> = {
  Médicaments: HeartIcon,
  'Dispositifs médicaux': ActivityIcon,
  Consommables: PackageIcon,
  'Réactifs et tests': FlaskConicalIcon
};
const categoryColors: Record<string, string> = {
  Médicaments: 'bg-red-100 text-red-600',
  'Dispositifs médicaux': 'bg-red-100 text-red-600',
  Consommables: 'bg-green-100 text-green-600',
  'Réactifs et tests': 'bg-rose-100 text-rose-600'
};
const statutBadge = (s: string) => {
  if (s === 'OK') return 'bg-green-100 text-green-700';
  if (s === 'Bas') return 'bg-amber-100 text-amber-700';
  if (s === 'Critique') return 'bg-orange-100 text-orange-700';
  return 'bg-red-100 text-red-700';
};
function ReorderModal({
  item,
  suppliers,
  onClose,
  onConfirm
}: {
  item: StockItem;
  suppliers: string[];
  onClose: () => void;
  onConfirm: (payload: {
    quantity: number;
    supplier: string;
    expectedDate: string;
    priority: 'Normale' | 'Urgente';
    notes: string;
  }) => void;
}) {
  const suggestedQuantity = Math.max(item.seuilMaximal - item.quantiteDisponible, item.seuilMinimal * 2 - item.quantiteDisponible, 1);
  const [form, setForm] = useState({
    quantity: suggestedQuantity,
    supplier: item.fournisseurNom ?? '',
    expectedDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    priority: item.statut === 'Critique' || item.statut === 'Rupture' ? 'Urgente' as const : 'Normale' as const,
    notes: `Réapprovisionnement ${item.categorie.toLowerCase()} pour sécuriser le stock ${item.nom}.`
  });

  const estimatedTotal = form.quantity * item.prixUnitaire;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-xl">
          <div>
            <h3 className="text-sm font-semibold text-red-800">Commander un article</h3>
            <p className="text-xs text-red-600 mt-0.5">Réapprovisionnement cardiologique</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-red-600 hover:bg-red-100"
            aria-label="Fermer">
            <XIcon size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          <div className="rounded-xl border border-red-100 bg-red-50 p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-gray-900">{item.nom}</p>
                <p className="mt-1 text-xs text-gray-600">{item.categorie} · {item.unite}</p>
                <p className="mt-2 text-xs text-gray-500">Stock actuel: <span className="font-semibold text-gray-900">{item.quantiteDisponible}</span> / min {item.seuilMinimal}</p>
              </div>
              <span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${statutBadge(item.statut)}`}>
                {item.statut}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">Quantité à commander</label>
              <input
                type="number"
                min="1"
                value={form.quantity}
                onChange={(e) =>
                  setForm({
                    ...form,
                    quantity: Math.max(1, Number(e.target.value) || 1)
                  })
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">Livraison estimée</label>
              <input
                type="date"
                value={form.expectedDate}
                onChange={(e) =>
                  setForm({
                    ...form,
                    expectedDate: e.target.value
                  })
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">Fournisseur</label>
              <select
                value={form.supplier}
                onChange={(e) =>
                  setForm({
                    ...form,
                    supplier: e.target.value
                  })
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500">
                {suppliers.map((supplier) =>
                <option key={supplier} value={supplier}>{supplier}</option>
                )}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">Priorité</label>
              <select
                value={form.priority}
                onChange={(e) =>
                  setForm({
                    ...form,
                    priority: e.target.value as 'Normale' | 'Urgente'
                  })
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500">
                <option value="Normale">Normale</option>
                <option value="Urgente">Urgente</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">Notes</label>
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) =>
                setForm({
                  ...form,
                  notes: e.target.value
                })
              }
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div className="rounded-xl border border-rose-100 bg-rose-50 px-3 py-2 text-xs text-gray-700">
            Montant estimé: <span className="font-semibold text-gray-900">{estimatedTotal.toFixed(2)} TND</span>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50">
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-red-700">
              Confirmer la commande
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
const getItemStatus = (item: Pick<StockItem, 'quantiteDisponible' | 'seuilMinimal'>): StockItem['statut'] => {
  if (item.quantiteDisponible === 0) return 'Rupture';
  if (item.quantiteDisponible <= item.seuilMinimal * 0.5) return 'Critique';
  if (item.quantiteDisponible <= item.seuilMinimal) return 'Bas';
  return 'OK';
};
function EditItemModal({
  item,
  suppliers,
  onClose,
  onSave
}: {
  item: StockItem;
  suppliers: string[];
  onClose: () => void;
  onSave: (item: StockItem) => void;
}) {
  const [form, setForm] = useState({
    nom: item.nom,
    categorie: item.categorie,
    unite: item.unite,
    stock: String(item.quantiteDisponible),
    stockMin: String(item.seuilMinimal),
    stockMax: String(item.seuilMaximal),
    fournisseur: item.fournisseurNom ?? '',
    prixUnitaire: String(item.prixUnitaire),
    dateExpiration: item.datePeremption ?? ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedItem: StockItem = {
      ...item,
      nom: form.nom,
      categorie: form.categorie,
      unite: form.unite,
      quantiteDisponible: parseInt(form.stock, 10) || 0,
      seuilMinimal: parseInt(form.stockMin, 10) || 0,
      seuilMaximal: parseInt(form.stockMax, 10) || 0,
      fournisseurNom: form.fournisseur,
      prixUnitaire: parseFloat(form.prixUnitaire) || 0,
      datePeremption: form.dateExpiration || undefined,
      statut: item.statut,
      misAJourLe: item.misAJourLe
    };

    onSave({
      ...updatedItem,
      statut: getItemStatus(updatedItem)
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-xl">
          <div>
            <h3 className="text-sm font-semibold text-red-800">Modifier le matériel</h3>
            <p className="text-xs text-red-600 mt-0.5">Référence {item.id}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-red-600 hover:bg-red-100"
            aria-label="Fermer">
            <XIcon size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-h-[85vh] space-y-3 overflow-y-auto p-5">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">Nom de l'article *</label>
            <input
              required
              value={form.nom}
              onChange={(e) => setForm({ ...form, nom: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">Catégorie *</label>
              <select
                value={form.categorie}
                onChange={(e) => setForm({ ...form, categorie: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500">
                {categories.slice(1).map((category) =>
                <option key={category} value={category}>{category}</option>
                )}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">Unité *</label>
              <input
                required
                value={form.unite}
                onChange={(e) => setForm({ ...form, unite: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">Stock actuel</label>
              <input
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">Stock min</label>
              <input
                type="number"
                min="0"
                value={form.stockMin}
                onChange={(e) => setForm({ ...form, stockMin: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">Stock max</label>
              <input
                type="number"
                min="0"
                value={form.stockMax}
                onChange={(e) => setForm({ ...form, stockMax: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">Fournisseur</label>
              <select
                value={form.fournisseur}
                onChange={(e) => setForm({ ...form, fournisseur: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500">
                {suppliers.map((supplier) =>
                <option key={supplier} value={supplier}>{supplier}</option>
                )}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">Prix unitaire (TND)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.prixUnitaire}
                onChange={(e) => setForm({ ...form, prixUnitaire: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">Date d'expiration</label>
            <input
              type="month"
              value={form.dateExpiration}
              onChange={(e) => setForm({ ...form, dateExpiration: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50">
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-red-700">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
function AddItemModal({
  onClose,
  onSave,
  suppliers



}: {onClose: () => void;onSave: (item: StockItem) => void;suppliers: string[];}) {
  const [form, setForm] = useState({
    nom: '',
    categorie: 'Médicaments',
    unite: '',
    stock: '',
    stockMin: '',
    stockMax: '',
    fournisseur: '',
    prixUnitaire: '',
    dateExpiration: ''
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: 0,
      nom: form.nom,
      categorie: form.categorie,
      unite: form.unite,
      quantiteDisponible: parseInt(form.stock) || 0,
      seuilMinimal: parseInt(form.stockMin) || 0,
      seuilMaximal: parseInt(form.stockMax) || 0,
      fournisseurNom: form.fournisseur,
      prixUnitaire: parseFloat(form.prixUnitaire) || 0,
      datePeremption: form.dateExpiration || undefined,
      statut: 'OK',
      reference: '',
      pourcentageStock: 0,
      misAJourLe: new Date().toISOString()
    });
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-xl sticky top-0">
          <div>
            <h3 className="text-sm font-semibold text-red-800">Ajouter un article</h3>
            <p className="text-xs text-red-600 mt-0.5">Nouveau matériel cardiologique</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-red-600 hover:bg-red-100"
            aria-label="Fermer">
            <XIcon size={14} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Nom de l'article *
            </label>
            <input
              required
              value={form.nom}
              onChange={(e) =>
              setForm({
                ...form,
                nom: e.target.value
              })
              }
              placeholder="Ex: Aspirine 100mg"
              className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-red-500" />

          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Catégorie *
              </label>
              <select
                required
                value={form.categorie}
                onChange={(e) =>
                setForm({
                  ...form,
                  categorie: e.target.value
                })
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-red-500">

                <option>Médicaments</option>
                <option>Dispositifs médicaux</option>
                <option>Consommables</option>
                <option>Réactifs et tests</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Unité *
              </label>
              <input
                required
                value={form.unite}
                onChange={(e) =>
                setForm({
                  ...form,
                  unite: e.target.value
                })
                }
                placeholder="boîte 100, unité..."
                className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-red-500" />

            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Stock actuel *
              </label>
              <input
                required
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) =>
                setForm({
                  ...form,
                  stock: e.target.value
                })
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-red-500" />

            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Stock min *
              </label>
              <input
                required
                type="number"
                min="0"
                value={form.stockMin}
                onChange={(e) =>
                setForm({
                  ...form,
                  stockMin: e.target.value
                })
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-red-500" />

            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Stock max
              </label>
              <input
                type="number"
                min="0"
                value={form.stockMax}
                onChange={(e) =>
                setForm({
                  ...form,
                  stockMax: e.target.value
                })
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-red-500" />

            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Fournisseur
              </label>
              <select
                value={form.fournisseur}
                onChange={(e) =>
                setForm({
                  ...form,
                  fournisseur: e.target.value
                })
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-red-500">

                <option value="">Sélectionner</option>
                {suppliers.map((supplier) =>
                <option key={supplier} value={supplier}>{supplier}</option>
                )}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Prix unitaire (TND)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.prixUnitaire}
                onChange={(e) =>
                setForm({
                  ...form,
                  prixUnitaire: e.target.value
                })
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-red-500" />

            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Date d'expiration
            </label>
            <input
              type="month"
              value={form.dateExpiration}
              onChange={(e) =>
              setForm({
                ...form,
                dateExpiration: e.target.value
              })
              }
              className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-red-500" />

          </div>
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-3 py-1.5 border border-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50">

              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700">

              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>);

}
export function StockManagement() {
  const [items, setItems] = useState<StockItem[]>([]);
  const [_isLoading, setIsLoading] = useState(false);
  const [statsData, setStatsData] = useState<StockStats | null>(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [showAddModal, setShowAddModal] = useState(false);
  const [orderTarget, setOrderTarget] = useState<StockItem | null>(null);
  const [editTarget, setEditTarget] = useState<StockItem | null>(null);
  const [orderMessage, setOrderMessage] = useState<string | null>(null);
  const [availableSuppliers, setAvailableSuppliers] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const [itemsData, statsRes, frsData] = await Promise.all([
          stockService.getAll(),
          stockService.getStats(),
          fournisseurService.getAll({ actif: true }),
        ]);
        setItems(itemsData);
        setStatsData(statsRes);
        setAvailableSuppliers(frsData.map(f => f.nom));
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);
  const filtered = items.filter((item) => {
    const matchSearch =
    item.nom.toLowerCase().includes(search.toLowerCase()) ||
    (item.fournisseurNom ?? '').toLowerCase().includes(search.toLowerCase());
    const matchCat =
    selectedCategory === 'Tous' || item.categorie === selectedCategory;
    return matchSearch && matchCat;
  });
  const stats = {
    total:            statsData?.totalArticles ?? items.length,
    lowStock:         (statsData?.articlesBas ?? 0) + (statsData?.articlesCritiques ?? 0),
    rupture:          statsData?.articlesRupture ?? 0,
    commandesEnCours: statsData?.commandesEnCours ?? 0,
    valeurMensuelle:  statsData?.valeurTotaleStock ?? 0,
  };
  const categoryCounts = categories.slice(1).map((cat) => ({
    name: cat,
    count: items.filter((i) => i.categorie === cat).length,
    lowStock: items.filter(
      (i) =>
      i.categorie === cat && (i.statut === 'Bas' || i.statut === 'Critique')
    ).length
  }));
  const handleAddItem = async (formData: CreateStockItemData) => {
    try {
      const newItem = await stockService.create(formData);
      setItems(prev => [...prev, newItem]);
      const newStats = await stockService.getStats();
      setStatsData(newStats);
      setShowAddModal(false);
    } catch (e) { console.error(e); }
  };
  const handleDeleteItem = async (id: number) => {
    try {
      await stockService.delete(id);
      setItems(prev => prev.filter(i => i.id !== id));
      const newStats = await stockService.getStats();
      setStatsData(newStats);
    } catch (e) { console.error(e); }
  };
  const handleSaveItem = async (updatedItem: StockItem) => {
    try {
      const saved = await stockService.update(updatedItem.id, {
        nom: updatedItem.nom, categorie: updatedItem.categorie, unite: updatedItem.unite,
        quantiteDisponible: updatedItem.quantiteDisponible, seuilMinimal: updatedItem.seuilMinimal,
        seuilMaximal: updatedItem.seuilMaximal, prixUnitaire: updatedItem.prixUnitaire,
        datePeremption: updatedItem.datePeremption,
      });
      setItems(prev => prev.map(i => i.id === saved.id ? saved : i));
      setEditTarget(null);
      const newStats = await stockService.getStats();
      setStatsData(newStats);
    } catch (e) { console.error(e); }
  };
  const handleOpenOrder = (item: StockItem) => {
    setOrderMessage(null);
    setOrderTarget(item);
  };
  const handleConfirmOrder = async (payload: {
    quantity: number;
    supplier: string;
    expectedDate: string;
    priority: 'Normale' | 'Urgente';
    notes: string;
  }) => {
    if (!orderTarget) {
      return;
    }

    try {
      const frsData = await fournisseurService.getAll({ search: payload.supplier });
      const frsId = frsData[0]?.id;
      if (!frsId) throw new Error('Fournisseur introuvable');
      await stockService.createCommande({
        fournisseurId: frsId,
        lignes: [{ consommableId: orderTarget.id, quantiteCommandee: payload.quantity, prixUnitaire: orderTarget.prixUnitaire }],
        dateLivraisonPrevue: payload.expectedDate, notes: payload.notes,
      });
      setOrderMessage(`Commande créée pour ${orderTarget.nom} · ${payload.quantity} ${orderTarget.unite}`);
      setOrderTarget(null);
      const newStats = await stockService.getStats();
      setStatsData(newStats);
    } catch (e: unknown) {
      if (e instanceof Error) setOrderMessage(`Erreur: ${e.message}`);
    }
  };
  const getStockPercent = (item: StockItem) => item.pourcentageStock;
  const getStockBarColor = (item: StockItem) => {
    if (item.statut === 'Rupture') return 'bg-red-500';
    if (item.statut === 'Critique') return 'bg-orange-500';
    if (item.statut === 'Bas') return 'bg-amber-500';
    return 'bg-green-500';
  };
  return (
    <div className="min-h-screen bg-gray-50 p-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-red-600 rounded-lg flex items-center justify-center">
            <PackageIcon size={14} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900">
              Gestion des Stocks
            </h1>
            <p className="text-xs text-gray-500">
              Inventaire cardiologique — médicaments, dispositifs et
              consommables
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1 px-3 py-1.5 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">

          <PlusIcon size={12} />
          Ajouter article
        </button>
      </div>

      {orderMessage &&
      <div className="mb-3 flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-800">
          <ShoppingCartIcon size={14} className="mt-0.5 flex-shrink-0 text-red-600" />
          <span>{orderMessage}</span>
        </div>
      }

      {/* Stats */}
      <div className="grid grid-cols-5 gap-2 mb-3">
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Total articles</span>
            <PackageIcon size={14} className="text-red-500" />
          </div>
          <div className="text-xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-xs text-gray-500 mt-0.5">Références actives</div>
        </div>
        <div className="bg-white border border-amber-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Stock bas</span>
            <AlertTriangleIcon size={14} className="text-amber-500" />
          </div>
          <div className="text-xl font-bold text-amber-600">
            {stats.lowStock}
          </div>
          <div className="text-xs text-gray-500 mt-0.5">
            Réapprovisionnement
          </div>
        </div>
        <div className="bg-white border border-red-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Ruptures</span>
            <AlertTriangleIcon size={14} className="text-red-500" />
          </div>
          <div className="text-xl font-bold text-red-600">{stats.rupture}</div>
          <div className="text-xs text-red-500 mt-0.5">Action urgente</div>
        </div>
        <div className="bg-white border border-rose-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Commandes</span>
            <ShoppingCartIcon size={14} className="text-rose-500" />
          </div>
          <div className="text-xl font-bold text-rose-600">
            {stats.commandesEnCours}
          </div>
          <div className="text-xs text-gray-500 mt-0.5">En cours</div>
        </div>
        <div className="bg-white border border-green-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Valeur mensuelle</span>
            <ZapIcon size={14} className="text-green-500" />
          </div>
          <div className="text-xl font-bold text-green-600">
            {(stats.valeurMensuelle ?? 0).toLocaleString('fr-TN', { maximumFractionDigits: 0 })}
          </div>
          <div className="text-xs text-gray-500 mt-0.5">TND / mois</div>
        </div>
      </div>

      {/* Category filter pills */}
      <div className="flex gap-1.5 mb-3 flex-wrap">
        {categories.map((cat) => {
          const Icon =
          cat === 'Tous' ? PackageIcon : categoryIcons[cat] || PackageIcon;
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${isActive ? 'bg-red-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>

              <Icon size={11} />
              {cat}
              {cat !== 'Tous' &&
              <span
                className={`ml-0.5 ${isActive ? 'text-red-200' : 'text-gray-400'}`}>

                  ({categoryCounts.find((c) => c.name === cat)?.count || 0})
                </span>
              }
            </button>);

        })}
      </div>

      {/* Stock Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-gray-50">
          <h2 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
            <PackageIcon size={12} className="text-red-500" />
            Inventaire détaillé
            <span className="text-gray-400 font-normal">
              — {filtered.length} article(s)
            </span>
          </h2>
          <div className="relative">
            <SearchIcon
              size={12}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-6 pr-3 py-1 text-xs border border-gray-200 rounded-lg bg-white w-36 focus:outline-none focus:ring-1 focus:ring-red-500" />

          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                  Article
                </th>
                <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                  Catégorie
                </th>
                <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                  Stock
                </th>
                <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                  Niveau
                </th>
                <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                  Fournisseur
                </th>
                <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                  Prix unit.
                </th>
                <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                  Expiration
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
              {filtered.map((item) => {
                const Icon = categoryIcons[item.categorie] || PackageIcon;
                const colorClass =
                categoryColors[item.categorie] || 'bg-gray-100 text-gray-600';
                const pct = getStockPercent(item);
                return (
                  <tr
                    key={item.id}
                    className="border-b border-gray-50 hover:bg-gray-50">

                    <td className="px-3 py-1.5">
                      <div className="flex items-center gap-2">
                        <div
                          className={`p-1 rounded flex-shrink-0 ${colorClass}`}>

                          <Icon size={11} />
                        </div>
                        <div>
                          <div className="text-xs font-medium text-gray-800">
                            {item.nom}
                          </div>
                          <div className="text-xs text-gray-400">
                            {item.unite}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-1.5 text-xs text-gray-600">
                      {item.categorie}
                    </td>
                    <td className="px-3 py-1.5">
                      <span className="font-bold text-gray-900 text-xs">
                        {item.quantiteDisponible}
                      </span>
                      <span className="text-xs text-gray-400 ml-1">
                        / min {item.seuilMinimal}
                      </span>
                    </td>
                    <td className="px-3 py-1.5 w-28">
                      <div className="flex items-center gap-1.5">
                        <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${getStockBarColor(item)}`}
                            style={{
                              width: `${pct}%`
                            }} />

                        </div>
                        <span className="text-xs text-gray-500 w-7 text-right">
                          {pct}%
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-1.5 text-xs text-gray-600">
                      {item.fournisseurNom ?? ''}
                    </td>
                    <td className="px-3 py-1.5 text-xs font-medium text-gray-900">
                      {item.prixUnitaire.toFixed(2)} TND
                    </td>
                    <td className="px-3 py-1.5">
                      {item.datePeremption ?
                      <span className="text-xs text-gray-600">
                          {item.datePeremption}
                        </span> :

                      <span className="text-xs text-gray-300">—</span>
                      }
                    </td>
                    <td className="px-3 py-1.5">
                      <span
                        className={`px-1.5 py-0.5 rounded text-xs font-medium ${statutBadge(item.statut)}`}>

                        {item.statut}
                      </span>
                    </td>
                    <td className="px-3 py-1.5">
                      <div className="flex items-center gap-0.5">
                        <button
                          type="button"
                          onClick={() => setEditTarget(item)}
                          className="p-1 hover:bg-red-50 rounded text-gray-400 hover:text-red-600 transition-colors">
                          <EditIcon size={11} />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-1 hover:bg-red-50 rounded text-gray-400 hover:text-red-500 transition-colors">

                          <TrashIcon size={11} />
                        </button>
                        {(item.statut === 'Bas' ||
                        item.statut === 'Critique') &&
                        <button
                          type="button"
                          onClick={() => handleOpenOrder(item)}
                          className="p-1 hover:bg-amber-50 rounded text-amber-500 hover:text-amber-700 transition-colors"
                          title="Commander">

                            <ShoppingCartIcon size={11} />
                          </button>
                        }
                      </div>
                    </td>
                  </tr>);

              })}
            </tbody>
          </table>
          {filtered.length === 0 &&
          <div className="text-center py-8 text-gray-400">
              <PackageIcon size={24} className="mx-auto mb-2 opacity-30" />
              <p className="text-xs font-medium">Aucun article trouvé</p>
            </div>
          }
        </div>
      </div>

      {/* Low Stock Alerts */}
      {items.filter((i) => i.statut !== 'OK').length > 0 &&
      <div className="mt-3 bg-white border border-amber-200 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b border-amber-100 bg-amber-50">
            <h2 className="text-xs font-semibold text-amber-800 flex items-center gap-1.5">
              <AlertTriangleIcon size={12} className="text-amber-500" />
              Alertes de stock — {
            items.filter((i) => i.statut !== 'OK').length
            }{' '}
              article(s)
            </h2>
          </div>
          <div className="p-3 grid grid-cols-1 md:grid-cols-3 gap-2">
            {items.
          filter((i) => i.statut !== 'OK').
          map((item) =>
          <div
            key={item.id}
            className={`rounded-lg p-2.5 border ${item.statut === 'Critique' ? 'bg-orange-50 border-orange-200' : 'bg-amber-50 border-amber-200'}`}>

                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold text-gray-900">
                        {item.nom}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.fournisseurNom ?? ''}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-xs font-bold text-gray-900">
                          {item.quantiteDisponible}
                        </span>
                        <span className="text-xs text-gray-500">
                          / min {item.seuilMinimal}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleOpenOrder(item)}
                      className="flex items-center gap-1 bg-white border border-amber-300 text-amber-700 px-2 py-0.5 rounded text-xs hover:bg-amber-50">
                      <ShoppingCartIcon size={10} />
                      Commander
                    </button>
                  </div>
                </div>
          )}
          </div>
        </div>
      }

      {showAddModal &&
      <AddItemModal
        onClose={() => setShowAddModal(false)}
        onSave={handleAddItem}
        suppliers={availableSuppliers} />

      }

      {orderTarget &&
      <ReorderModal
        item={orderTarget}
        suppliers={availableSuppliers}
        onClose={() => setOrderTarget(null)}
        onConfirm={handleConfirmOrder} />

      }

      {editTarget &&
      <EditItemModal
        item={editTarget}
        suppliers={availableSuppliers}
        onClose={() => setEditTarget(null)}
        onSave={handleSaveItem} />

      }
    </div>);

}
export default StockManagement;