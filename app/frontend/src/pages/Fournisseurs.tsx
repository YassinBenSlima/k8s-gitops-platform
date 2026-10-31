import React, { useEffect, useState, useRef } from 'react';
import {
  TruckIcon,
  PlusIcon,
  SearchIcon,
  FilterIcon,
  UsersIcon,
  TrendingUpIcon,
  FileTextIcon,
  DollarSignIcon,
  MoreHorizontalIcon,
  EyeIcon,
  EditIcon,
  TrashIcon } from
'lucide-react';
import { NouveauFournisseurModal } from '../components/stock/NouveauFournisseurModal';
import { FournisseurOperationsModal } from '../components/stock/FournisseurOperationsModal';
import { fournisseurService, Fournisseur as ApiFournisseur } from '../services/fournisseurService';
type Fournisseur = ApiFournisseur;
const formatCurrency = (amount: number): string =>
amount.
toLocaleString('fr-TN', {
  minimumFractionDigits: 3,
  maximumFractionDigits: 3
}).
replace(/\s/g, ' ') + ' DT';

const Fournisseurs = () => {
  const [fournisseurs, setFournisseurs] =
  useState<Fournisseur[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewModal, setShowNewModal] = useState(false);
  const [showOperationsModal, setShowOperationsModal] = useState(false);
  const [selectedFournisseur, setSelectedFournisseur] =
  useState<Fournisseur | null>(null);
  const [editingFournisseur, setEditingFournisseur] =
  useState<Fournisseur | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node))
      setOpenMenuId(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  useEffect(() => {
    fournisseurService.getAll().then((data) => setFournisseurs(data)).catch(console.error);
  }, []);
  const filteredFournisseurs = fournisseurs.filter(
    (f) =>
    f.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.code.includes(searchTerm) ||
    (f.matriculeFiscal ?? '').toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSaveFournisseur = async (data: Partial<Fournisseur>) => {
    try {
      if (editingFournisseur) {
        const updated = await fournisseurService.update(editingFournisseur.id, {
          nom: data.nom,
          email: data.email,
          telephone: data.telephone,
          ville: data.ville,
          matriculeFiscal: data.matriculeFiscal,
          tauxRetenueSource: data.tauxRetenueSource,
          suspensionTaxes: data.suspensionTaxes,
        });
        setFournisseurs((prev) => prev.map((f) => f.id === updated.id ? updated : f));
        setEditingFournisseur(null);
      } else {
        const created = await fournisseurService.create({
          nom: data.nom || '',
          email: data.email,
          telephone: data.telephone,
          ville: data.ville,
          matriculeFiscal: data.matriculeFiscal,
          tauxRetenueSource: data.tauxRetenueSource,
          suspensionTaxes: data.suspensionTaxes || false,
        });
        setFournisseurs((prev) => [...prev, created]);
      }
    } catch (err: any) {
      alert(err?.message || 'Erreur lors de la sauvegarde du fournisseur');
    }
  };
  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce fournisseur ?')) return;
    try {
      await fournisseurService.delete(id);
      setFournisseurs((prev) => prev.filter((f) => f.id !== id));
    } catch (err: any) {
      alert(err?.message || 'Impossible de supprimer ce fournisseur');
    }
    setOpenMenuId(null);
  };
  const handleViewOperations = (fournisseur: Fournisseur) => {
    setSelectedFournisseur(fournisseur);
    setShowOperationsModal(true);
    setOpenMenuId(null);
  };
  const handleEdit = (fournisseur: Fournisseur) => {
    setEditingFournisseur(fournisseur);
    setShowNewModal(true);
    setOpenMenuId(null);
  };
  return (
    <div className="min-h-screen bg-gray-50 p-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-red-600 rounded-lg flex items-center justify-center">
            <TruckIcon size={14} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900">
              Gestion des Fournisseurs
            </h1>
            <p className="text-xs text-gray-500">
              Gérez vos fournisseurs et suivez leurs opérations
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            setEditingFournisseur(null);
            setShowNewModal(true);
          }}
          className="flex items-center gap-1 px-3 py-1.5 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">

          <PlusIcon size={12} />
          Nouveau Fournisseur
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Total Tiers</span>
            <UsersIcon size={14} className="text-purple-500" />
          </div>
          <div className="text-xl font-bold text-gray-900">
            {fournisseurs.length}
          </div>
          <div className="text-xs text-gray-500 mt-0.5">
            Mis à jour aujourd'hui
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Volume Achats</span>
            <TrendingUpIcon size={14} className="text-green-500" />
          </div>
          <div className="text-xl font-bold text-gray-900">
            {formatCurrency(4233900)}
          </div>
          <div className="text-xs text-gray-500 mt-0.5">
            Mis à jour aujourd'hui
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Nombre Factures</span>
            <FileTextIcon size={14} className="text-red-500" />
          </div>
          <div className="text-xl font-bold text-gray-900">3</div>
          <div className="text-xs text-gray-500 mt-0.5">
            Mis à jour aujourd'hui
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Panier Moyen</span>
            <DollarSignIcon size={14} className="text-orange-500" />
          </div>
          <div className="text-xl font-bold text-gray-900">
            {formatCurrency(1411300)}
          </div>
          <div className="text-xs text-gray-500 mt-0.5">
            Mis à jour aujourd'hui
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white border border-gray-200 rounded-lg p-2.5 mb-3">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <SearchIcon
              size={12}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Rechercher par nom, code, matricule..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-7 pr-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-red-500" />

          </div>
          <button className="flex items-center gap-1 px-2.5 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 text-xs">
            <FilterIcon size={11} />
            Filtres
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-gray-50">
          <h2 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
            <TruckIcon size={12} className="text-red-500" />
            Liste des fournisseurs
          </h2>
          <span className="text-xs text-gray-400">
            1-{filteredFournisseurs.length} sur {filteredFournisseurs.length}
          </span>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-3 py-1.5 text-left">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 w-3 h-3" />

              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Code
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Nom
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Contact
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Ville
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Statut
              </th>
              <th className="text-right px-3 py-1.5 text-xs font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredFournisseurs.map((fournisseur) =>
            <tr
              key={fournisseur.id}
              className="border-b border-gray-50 hover:bg-gray-50 transition-colors">

                <td className="px-3 py-1.5">
                  <input
                  type="checkbox"
                  className="rounded border-gray-300 w-3 h-3" />

                </td>
                <td className="px-3 py-1.5">
                  <span className="px-1.5 py-0.5 rounded bg-gray-100 text-xs font-mono text-gray-700">
                    {fournisseur.code}
                  </span>
                </td>
                <td className="px-3 py-1.5">
                  <div className="text-xs font-semibold text-gray-900">
                    {fournisseur.nom}
                  </div>
                  <div className="text-xs text-gray-400">
                    {fournisseur.matriculeFiscal}
                  </div>
                </td>
                <td className="px-3 py-1.5">
                  <div className="text-xs text-gray-700">
                    {fournisseur.email}
                  </div>
                  <div className="text-xs text-gray-400">
                    {fournisseur.telephone ?? ''}
                  </div>
                </td>
                <td className="px-3 py-1.5 text-xs text-gray-600">
                  {fournisseur.ville}
                </td>
                <td className="px-3 py-1.5">
                  <span
                  className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${fournisseur.actif ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>

                    {fournisseur.actif ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td
                className="px-3 py-1.5 text-right relative"
                ref={openMenuId === fournisseur.id ? menuRef : null}>

                  <button
                  onClick={() =>
                  setOpenMenuId(
                    openMenuId === fournisseur.id ? null : fournisseur.id
                  )
                  }
                  className="p-1 rounded hover:bg-gray-100 transition-colors">

                    <MoreHorizontalIcon size={14} className="text-gray-500" />
                  </button>
                  {openMenuId === fournisseur.id &&
                <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10 overflow-hidden">
                      <button
                    onClick={() => handleViewOperations(fournisseur)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50">

                        <EyeIcon size={12} className="text-gray-400" />
                        Voir opérations
                      </button>
                      <button
                    onClick={() => handleEdit(fournisseur)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50">

                        <EditIcon size={12} className="text-gray-400" />
                        Modifier
                      </button>
                      <button
                    onClick={() => handleDelete(fournisseur.id)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50">

                        <TrashIcon size={12} />
                        Supprimer
                      </button>
                    </div>
                }
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <NouveauFournisseurModal
        isOpen={showNewModal}
        onClose={() => {
          setShowNewModal(false);
          setEditingFournisseur(null);
        }}
        onSave={handleSaveFournisseur}
        fournisseur={editingFournisseur as any} />

      <FournisseurOperationsModal
        isOpen={showOperationsModal}
        onClose={() => {
          setShowOperationsModal(false);
          setSelectedFournisseur(null);
        }}
        fournisseur={selectedFournisseur as any} />

    </div>);

};
export default Fournisseurs;