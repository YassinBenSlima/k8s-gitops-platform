import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XIcon,
  FileTextIcon,
  ArrowDownLeftIcon,
  CalendarIcon } from
'lucide-react';
interface Invoice {
  id: string;
  reference: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
  remaining?: number;
}
interface Fournisseur {
  id: number;
  code: string;
  nom: string;
  matricule: string;
  email: string;
  phone: string;
  ville: string;
  statut: 'actif' | 'inactif';
}
interface FournisseurOperationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  fournisseur: Fournisseur | null;
}
const formatCurrency = (amount: number): string => {
  return (
    amount.
    toLocaleString('fr-TN', {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    }).
    replace(/\s/g, ' ') + ' DT');

};
// Mock invoices data
const mockInvoices: Record<number, Invoice[]> = {
  1: [
  {
    id: '1',
    reference: 'ACH-2024-055',
    date: '2024-02-05',
    amount: 535500,
    status: 'pending',
    remaining: 535500
  },
  {
    id: '2',
    reference: 'ACH-2024-057',
    date: '2024-02-20',
    amount: 3570000,
    status: 'paid'
  }],

  2: [
  {
    id: '3',
    reference: 'ACH-2024-060',
    date: '2024-03-01',
    amount: 128300,
    status: 'paid'
  }]

};
export function FournisseurOperationsModal({
  isOpen,
  onClose,
  fournisseur
}: FournisseurOperationsModalProps) {
  if (!isOpen || !fournisseur) return null;
  const invoices = mockInvoices[fournisseur.id] || [];
  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = invoices.
  filter((inv) => inv.status === 'paid').
  reduce((sum, inv) => sum + inv.amount, 0);
  const solde = invoices.
  filter((inv) => inv.status === 'pending').
  reduce((sum, inv) => sum + (inv.remaining || 0), 0);
  return (
    <AnimatePresence>
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
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}>

        <motion.div
          initial={{
            scale: 0.95,
            opacity: 0,
            y: 20
          }}
          animate={{
            scale: 1,
            opacity: 1,
            y: 0
          }}
          exit={{
            scale: 0.95,
            opacity: 0,
            y: 20
          }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 300
          }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden">

          {/* Header */}
          <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-2xl">
            <div>
              <h2 className="text-sm font-semibold text-red-800">Opérations - {fournisseur.nom}</h2>
              <p className="text-xs text-red-600 mt-0.5">Historique des factures et paiements</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-md p-1 text-red-600 hover:bg-red-100"
              aria-label="Fermer">
              <XIcon className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            {/* Supplier summary */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <FileTextIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {fournisseur.nom}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {fournisseur.matricule}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                  Solde
                </p>
                <p className="text-xl font-bold text-orange-500">
                  {formatCurrency(solde)}
                </p>
              </div>
            </div>

            {/* Invoices list */}
            <div className="space-y-3">
              {invoices.map((invoice, index) =>
              <motion.div
                key={invoice.id}
                initial={{
                  opacity: 0,
                  x: -20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  delay: index * 0.1
                }}
                className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">

                  <div className="flex items-center gap-3">
                    <div
                    className={`h-10 w-10 rounded-lg flex items-center justify-center ${invoice.status === 'pending' ? 'bg-orange-100 dark:bg-orange-900/30' : 'bg-purple-100 dark:bg-purple-900/30'}`}>

                      <ArrowDownLeftIcon
                      className={`h-5 w-5 ${invoice.status === 'pending' ? 'text-orange-600 dark:text-orange-400' : 'text-purple-600 dark:text-purple-400'}`} />

                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {invoice.reference}
                        </p>
                        <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${invoice.status === 'pending' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'}`}>

                          {invoice.status === 'pending' ?
                        'En attente' :
                        'Payée'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <CalendarIcon className="h-3.5 w-3.5" />
                        {invoice.date}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white">
                      {formatCurrency(invoice.amount)}
                    </p>
                    {invoice.status === 'pending' && invoice.remaining &&
                  <p className="text-sm text-orange-500">
                        Reste: {formatCurrency(invoice.remaining)}
                      </p>
                  }
                  </div>
                </motion.div>
              )}
            </div>

            {/* Summary footer */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">
                  Total Factures
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {invoices.length}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">
                  Montant Total
                </p>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(totalAmount)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">
                  Payé
                </p>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(paidAmount)}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>);

}