import React, { useState, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayersIcon,
  PackageIcon,
  BarChart2Icon,
  PlusIcon,
  DownloadIcon,
  UploadIcon,
  SearchIcon,
  MoreHorizontalIcon,
  EditIcon,
  TrashIcon,
  XIcon,
  CheckIcon,
  FilterIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DollarSignIcon,
  ShoppingCartIcon,
  TagIcon,
  TrendingUpIcon,
  ArrowUpRightIcon,
  ArrowDownRightIcon } from
'lucide-react';
// --- Types ---
type ArticleType = 'Vente' | 'Achat';
type ArticleCategory =
'Services' |
'Marchandises' |
'Immobilisations' |
'Matière première' |
'Produits finis';
interface Family {
  id: string;
  code: string;
  name: string;
  type: ArticleType;
  category: ArticleCategory;
  account: string;
  articleCount: number;
}
interface Article {
  id: string;
  code: string;
  name: string;
  familyId: string;
  familyName: string;
  unit: string;
  purchasePrice: number;
  margin: number;
  sellingPrice: number;
  tiersCount: number;
}
// --- Mock Data ---
const MOCK_FAMILIES: Family[] = [
{
  id: '1',
  code: 'SRV-IT',
  name: 'Services Informatiques',
  type: 'Vente',
  category: 'Services',
  account: '70600001',
  articleCount: 3
},
{
  id: '2',
  code: 'MAINT',
  name: 'Maintenance',
  type: 'Vente',
  category: 'Services',
  account: '70600002',
  articleCount: 3
},
{
  id: '3',
  code: 'FOUR-BUR',
  name: 'Fournitures de Bureau',
  type: 'Achat',
  category: 'Marchandises',
  account: '60100001',
  articleCount: 2
},
{
  id: '4',
  code: 'EQUIP-INFO',
  name: 'Équipements Informatiques',
  type: 'Achat',
  category: 'Immobilisations',
  account: '21800001',
  articleCount: 3
},
{
  id: '5',
  code: 'TELECOM',
  name: 'Télécommunications',
  type: 'Achat',
  category: 'Services',
  account: '62600001',
  articleCount: 2
},
{
  id: '6',
  code: 'CONSEIL',
  name: 'Conseil & Formation',
  type: 'Vente',
  category: 'Services',
  account: '70600003',
  articleCount: 2
},
{
  id: '7',
  code: 'MAT-PREM',
  name: 'Matières Premières',
  type: 'Achat',
  category: 'Matière première',
  account: '60200001',
  articleCount: 0
},
{
  id: '8',
  code: 'PROD-FIN',
  name: 'Produits Finis',
  type: 'Vente',
  category: 'Produits finis',
  account: '70100001',
  articleCount: 0
}];

const MOCK_ARTICLES: Article[] = [
{
  id: '1',
  code: 'DEV-WEB',
  name: 'Développement Site Web',
  familyId: '1',
  familyName: 'Services Informatiques',
  unit: 'Jour',
  purchasePrice: 4000.0,
  margin: 25,
  sellingPrice: 5000.0,
  tiersCount: 2
},
{
  id: '2',
  code: 'DEV-APP',
  name: 'Développement Application Mobile',
  familyId: '1',
  familyName: 'Services Informatiques',
  unit: 'Jour',
  purchasePrice: 6400.0,
  margin: 25,
  sellingPrice: 8000.0,
  tiersCount: 1
},
{
  id: '3',
  code: 'CONSULT-IT',
  name: 'Consulting IT (Jour)',
  familyId: '1',
  familyName: 'Services Informatiques',
  unit: 'Jour',
  purchasePrice: 640.0,
  margin: 25,
  sellingPrice: 800.0,
  tiersCount: 0
},
{
  id: '4',
  code: 'MAINT-ANN',
  name: 'Maintenance Annuelle',
  familyId: '2',
  familyName: 'Maintenance',
  unit: 'Unité',
  purchasePrice: 1920.0,
  margin: 25,
  sellingPrice: 2400.0,
  tiersCount: 2
},
{
  id: '5',
  code: 'MAINT-MENS',
  name: 'Maintenance Mensuelle',
  familyId: '2',
  familyName: 'Maintenance',
  unit: 'Unité',
  purchasePrice: 200.0,
  margin: 25,
  sellingPrice: 250.0,
  tiersCount: 0
},
{
  id: '6',
  code: 'SUPPORT-H',
  name: 'Support Technique (Heure)',
  familyId: '2',
  familyName: 'Maintenance',
  unit: 'Heure',
  purchasePrice: 60.0,
  margin: 25,
  sellingPrice: 75.0,
  tiersCount: 0
},
{
  id: '7',
  code: 'PAP-A4',
  name: 'Ramette Papier A4',
  familyId: '3',
  familyName: 'Fournitures de Bureau',
  unit: 'Unité',
  purchasePrice: 12.0,
  margin: 25,
  sellingPrice: 15.0,
  tiersCount: 1
},
{
  id: '8',
  code: 'FOUR-DIV',
  name: 'Fournitures Diverses',
  familyId: '3',
  familyName: 'Fournitures de Bureau',
  unit: 'Unité',
  purchasePrice: 360.0,
  margin: 25,
  sellingPrice: 450.0,
  tiersCount: 1
},
{
  id: '9',
  code: 'PC-PORT',
  name: 'PC Portable',
  familyId: '4',
  familyName: 'Équipements Informatiques',
  unit: 'Unité',
  purchasePrice: 2000.0,
  margin: 25,
  sellingPrice: 2500.0,
  tiersCount: 0
},
{
  id: '10',
  code: 'ECRAN-24',
  name: 'Écran 24 pouces',
  familyId: '4',
  familyName: 'Équipements Informatiques',
  unit: 'Unité',
  purchasePrice: 360.0,
  margin: 25,
  sellingPrice: 450.0,
  tiersCount: 0
}];

// --- Helper Components ---
const Badge = ({
  children,
  color



}: {children: React.ReactNode;color: string;}) =>
<span
  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>

    {children}
  </span>;

const formatCurrency = (amount: number) => {
  return (
    amount.toLocaleString('fr-TN', {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    }) + ' DT');

};
// --- Main Component ---
export default function Articles() {
  const [activeTab, setActiveTab] = useState<'familles' | 'articles' | 'stats'>(
    'familles'
  );
  const [showFamilyModal, setShowFamilyModal] = useState(false);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState<Family | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  // --- Modals ---
  const FamilyModal = () =>
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
    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    onClick={() => setShowFamilyModal(false)}>

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
      onClick={(e) => e.stopPropagation()}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">

        <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-2xl">
          <div>
            <h2 className="text-sm font-semibold text-red-800">{selectedFamily ? 'Modifier la Famille' : 'Nouvelle Famille'}</h2>
            <p className="text-xs text-red-600 mt-0.5">Configurez les informations de la famille d'articles</p>
          </div>
          <button
          onClick={() => setShowFamilyModal(false)}
          className="rounded-md p-1 text-red-600 hover:bg-red-100"
          aria-label="Fermer">
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Code <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  #
                </span>
                <input
                type="text"
                defaultValue={selectedFamily?.code}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                placeholder="CODE" />

              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Nom <span className="text-red-500">*</span>
              </label>
              <input
              type="text"
              defaultValue={selectedFamily?.name}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
              placeholder="Nom de la famille" />

            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
            rows={3}
            placeholder="Description de la famille..." />

          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Type <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-indigo-600 bg-indigo-50 text-indigo-700 rounded-lg font-medium">
                <TrendingUpIcon className="h-4 w-4" /> Vente
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">
                <ShoppingCartIcon className="h-4 w-4" /> Achat
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Catégorie <span className="text-red-500">*</span>
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700">
              <option>Services</option>
              <option>Marchandises</option>
              <option>Immobilisations</option>
              <option>Matière première</option>
              <option>Produits finis</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Compte Comptable <span className="text-red-500">*</span>
            </label>
            <input
            type="text"
            defaultValue={selectedFamily?.account || '70600001'}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700" />

          </div>

          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
            <input
            type="checkbox"
            className="mt-1 rounded text-yellow-600 focus:ring-yellow-500" />

            <div>
              <p className="text-sm font-bold text-yellow-800">
                Exonération de Taxes
              </p>
              <p className="text-xs text-yellow-700">
                Aucune taxe ne sera calculée pour les articles de cette famille
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Taxes applicables
            </label>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
                <div className="flex items-center gap-3">
                  <input
                  type="checkbox"
                  defaultChecked
                  className="rounded text-indigo-600 focus:ring-indigo-500" />

                  <span className="text-sm font-medium text-gray-900">
                    TVA 19%
                  </span>
                </div>
                <span className="text-sm font-bold text-indigo-600">19%</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <input
                  type="checkbox"
                  className="rounded text-indigo-600 focus:ring-indigo-500" />

                  <span className="text-sm font-medium text-gray-900">
                    TVA 13%
                  </span>
                </div>
                <span className="text-sm font-bold text-gray-500">13%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50">
          <button
          onClick={() => setShowFamilyModal(false)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors">

            Annuler
          </button>
          <button
          onClick={() => setShowFamilyModal(false)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors shadow-sm shadow-indigo-200">

            {selectedFamily ? 'Enregistrer' : 'Créer'}
          </button>
        </div>
      </motion.div>
    </motion.div>;

  const ArticleModal = () =>
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
    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    onClick={() => setShowArticleModal(false)}>

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
      onClick={(e) => e.stopPropagation()}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">

        <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-2xl">
          <div>
            <h2 className="text-sm font-semibold text-red-800">{selectedArticle ? "Modifier l'Article" : 'Nouvel Article'}</h2>
            <p className="text-xs text-red-600 mt-0.5">Configurez les informations de l'article</p>
          </div>
          <button
          onClick={() => setShowArticleModal(false)}
          className="rounded-md p-1 text-red-600 hover:bg-red-100"
          aria-label="Fermer">

            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Famille <span className="text-red-500">*</span>
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700">
              {MOCK_FAMILIES.map((f) =>
            <option key={f.id} value={f.id}>
                  {f.name} ({f.code})
                </option>
            )}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Code <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  #
                </span>
                <input
                type="text"
                defaultValue={selectedArticle?.code}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                placeholder="CODE" />

              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Nom <span className="text-red-500">*</span>
              </label>
              <input
              type="text"
              defaultValue={selectedArticle?.name}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
              placeholder="Nom de l'article" />

            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
            rows={3}
            placeholder="Description de l'article..." />

          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Unité <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <TagIcon className="h-4 w-4" />
              </span>
              <input
              type="text"
              defaultValue={selectedArticle?.unit || 'Unité'}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700" />

            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Prix Achat HT
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  $
                </span>
                <input
                type="number"
                defaultValue={selectedArticle?.purchasePrice}
                className="w-full pl-8 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                placeholder="0.000" />

                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                  TND
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Marge (%)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  %
                </span>
                <input
                type="number"
                defaultValue={selectedArticle?.margin}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                placeholder="25" />

              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Prix Vente HT <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500">
                  $
                </span>
                <input
                type="number"
                defaultValue={selectedArticle?.sellingPrice}
                className="w-full pl-8 pr-12 py-2 border border-indigo-200 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-900/20 rounded-lg focus:ring-2 focus:ring-indigo-500 text-indigo-700 dark:text-indigo-300 font-bold"
                placeholder="0.000" />

                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400 text-xs">
                  TND
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50">
          <button
          onClick={() => setShowArticleModal(false)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors">

            Annuler
          </button>
          <button
          onClick={() => setShowArticleModal(false)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors shadow-sm shadow-indigo-200">

            {selectedArticle ? 'Enregistrer' : 'Créer'}
          </button>
        </div>
      </motion.div>
    </motion.div>;

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {showFamilyModal && <FamilyModal />}
        {showArticleModal && <ArticleModal />}
      </AnimatePresence>

      {/* Compact Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 rounded-lg p-3 text-white shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-md bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
            <LayersIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold leading-none">Articles</h1>
            <p className="text-indigo-100 text-xs mt-0.5">
              Gérez vos familles d'articles et articles
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-white bg-opacity-10 rounded-md px-2.5 py-1.5 text-sm">
            <LayersIcon className="h-3.5 w-3.5 opacity-75" />
            <span className="font-bold">{MOCK_FAMILIES.length}</span>
            <span className="text-indigo-100 text-xs">familles</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white bg-opacity-10 rounded-md px-2.5 py-1.5 text-sm">
            <PackageIcon className="h-3.5 w-3.5 opacity-75" />
            <span className="font-bold">{MOCK_ARTICLES.length}</span>
            <span className="text-indigo-100 text-xs">articles</span>
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-1.5 inline-flex border border-gray-200 dark:border-gray-700 shadow-sm">
        {[
        {
          id: 'familles',
          label: 'Familles',
          count: MOCK_FAMILIES.length,
          icon: LayersIcon
        },
        {
          id: 'articles',
          label: 'Articles',
          count: MOCK_ARTICLES.length,
          icon: PackageIcon
        },
        {
          id: 'stats',
          label: 'Statistiques',
          icon: BarChart2Icon
        }].
        map((tab) =>
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id as any)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>

            <tab.icon className="h-4 w-4" />
            {tab.label}
            {tab.count !== undefined &&
          <span
            className={`ml-1 px-1.5 py-0.5 rounded-md text-xs ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'}`}>

                {tab.count}
              </span>
          }
          </button>
        )}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{
          opacity: 0,
          y: 10
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.2
        }}>

        {activeTab === 'familles' &&
        <div className="space-y-4">
            <div className="flex justify-end gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <UploadIcon className="h-4 w-4" /> Exporter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <DownloadIcon className="h-4 w-4" /> Importer
              </button>
              <button
              onClick={() => {
                setSelectedFamily(null);
                setShowFamilyModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">

                <PlusIcon className="h-4 w-4" /> Nouvelle Famille
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 font-medium border-b border-gray-200 dark:border-gray-700">
                    <tr>
                      <th className="px-6 py-4 w-10">
                        <input
                        type="checkbox"
                        className="rounded border-gray-300" />

                      </th>
                      <th className="px-6 py-4">CODE</th>
                      <th className="px-6 py-4">NOM</th>
                      <th className="px-6 py-4">TYPE</th>
                      <th className="px-6 py-4">CATÉGORIE</th>
                      <th className="px-6 py-4">COMPTE</th>
                      <th className="px-6 py-4 text-center">ARTICLES</th>
                      <th className="px-6 py-4 w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {MOCK_FAMILIES.map((family) =>
                  <tr
                    key={family.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">

                        <td className="px-6 py-4">
                          <input
                        type="checkbox"
                        className="rounded border-gray-300" />

                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded font-mono text-xs font-bold">
                            {family.code}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                          {family.name}
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                        color={
                        family.type === 'Vente' ?
                        'bg-green-100 text-green-700' :
                        'bg-orange-100 text-orange-700'
                        }>

                            {family.type}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Badge color="bg-indigo-100 text-indigo-700">
                            {family.category}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 font-mono text-gray-500">
                          {family.account}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300">
                            {family.articleCount}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                        onClick={() => {
                          setSelectedFamily(family);
                          setShowFamilyModal(true);
                        }}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-400 hover:text-gray-600 transition-colors">

                            <MoreHorizontalIcon className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                  )}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500">
                1-{MOCK_FAMILIES.length} sur {MOCK_FAMILIES.length}
              </div>
            </div>
          </div>
        }

        {activeTab === 'articles' &&
        <div className="space-y-4">
            <div className="flex justify-end gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <UploadIcon className="h-4 w-4" /> Exporter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <DownloadIcon className="h-4 w-4" /> Importer
              </button>
              <button
              onClick={() => {
                setSelectedArticle(null);
                setShowArticleModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">

                <PlusIcon className="h-4 w-4" /> Nouvel Article
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 font-medium border-b border-gray-200 dark:border-gray-700">
                    <tr>
                      <th className="px-6 py-4 w-10">
                        <input
                        type="checkbox"
                        className="rounded border-gray-300" />

                      </th>
                      <th className="px-6 py-4">CODE</th>
                      <th className="px-6 py-4">NOM</th>
                      <th className="px-6 py-4">FAMILLE</th>
                      <th className="px-6 py-4">UNITÉ</th>
                      <th className="px-6 py-4 text-right">PRIX ACHAT</th>
                      <th className="px-6 py-4 text-center">MARGE</th>
                      <th className="px-6 py-4 text-right">PRIX VENTE</th>
                      <th className="px-6 py-4 text-center">TIERS</th>
                      <th className="px-6 py-4 w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {MOCK_ARTICLES.map((article) =>
                  <tr
                    key={article.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">

                        <td className="px-6 py-4">
                          <input
                        type="checkbox"
                        className="rounded border-gray-300" />

                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded font-mono text-xs font-bold">
                            {article.code}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                          {article.name}
                        </td>
                        <td className="px-6 py-4">
                          <Badge color="bg-blue-50 text-blue-700 border border-blue-100">
                            {article.familyName}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {article.unit}
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-gray-600">
                          {formatCurrency(article.purchasePrice)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                            {article.margin}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right font-mono font-bold text-indigo-600">
                          {formatCurrency(article.sellingPrice)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-xs text-gray-500">
                            {article.tiersCount} tiers
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                        onClick={() => {
                          setSelectedArticle(article);
                          setShowArticleModal(true);
                        }}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-400 hover:text-gray-600 transition-colors">

                            <MoreHorizontalIcon className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                  )}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500">
                1-{MOCK_ARTICLES.length} sur {MOCK_ARTICLES.length}
              </div>
            </div>
          </div>
        }

        {activeTab === 'stats' &&
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
            {
              label: 'Total Familles',
              value: String(MOCK_FAMILIES.length),
              icon: LayersIcon,
              color: 'indigo',
              subtext: 'familles actives'
            },
            {
              label: 'Total Articles',
              value: String(MOCK_ARTICLES.length),
              icon: PackageIcon,
              color: 'purple',
              subtext: 'articles référencés'
            },
            {
              label: 'Volume Ventes',
              value: '100 801,000 DT',
              icon: TrendingUpIcon,
              color: 'green',
              subtext: 'exercice en cours',
              trend: 'up',
              trendValue: '+12%'
            },
            {
              label: 'Volume Achats',
              value: '28 715,000 DT',
              icon: ShoppingCartIcon,
              color: 'orange',
              subtext: 'exercice en cours',
              trend: 'up',
              trendValue: '+8%'
            }].
            map((stat, index) =>
            <motion.div
              key={stat.label}
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: index * 0.1
              }}
              className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex items-start justify-between relative overflow-hidden group hover:border-indigo-300 transition-colors">

                  <div
                className={`absolute top-0 left-0 w-1 h-full bg-${stat.color}-500`} />

                  <div className="pl-2">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                      {stat.label}
                    </p>
                    <h4 className="text-2xl font-bold text-slate-800 tabular-nums tracking-tight">
                      {stat.value}
                    </h4>
                    <div className="flex items-center mt-1 gap-2">
                      {stat.trend &&
                  <span className="text-xs font-bold flex items-center text-emerald-600">
                          <ArrowUpRightIcon className="w-3 h-3 mr-0.5" />
                          {stat.trendValue}
                        </span>
                  }
                      <span className="text-xs text-slate-400">
                        {stat.subtext}
                      </span>
                    </div>
                  </div>
                  <div
                className={`p-2 rounded-md bg-${stat.color}-50 text-${stat.color}-600 opacity-80 group-hover:scale-110 transition-transform`}>

                    <stat.icon className="w-5 h-5" />
                  </div>
                </motion.div>
            )}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Statistiques par Famille
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 font-medium">
                    <tr>
                      <th className="px-4 py-3">CODE</th>
                      <th className="px-4 py-3">FAMILLE</th>
                      <th className="px-4 py-3">COMPTE</th>
                      <th className="px-4 py-3 text-center">ARTICLES</th>
                      <th className="px-4 py-3 text-right">TOTAL VENTES</th>
                      <th className="px-4 py-3 text-right">TOTAL ACHATS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {MOCK_FAMILIES.map((f) =>
                  <tr key={f.id}>
                        <td className="px-4 py-3">
                          <span className="font-mono text-xs font-bold bg-gray-100 px-2 py-1 rounded">
                            {f.code}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-medium">{f.name}</td>
                        <td className="px-4 py-3 font-mono text-gray-500">
                          {f.account}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {f.articleCount}
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-green-600 font-medium">
                          15 000,000 DT
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-orange-600 font-medium">
                          9 000,000 DT
                        </td>
                      </tr>
                  )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        }
      </motion.div>
    </div>);

}