import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XIcon,
  DollarSignIcon,
  CalendarIcon,
  SaveIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  TrendingUpIcon,
  SparklesIcon } from
'lucide-react';
interface Installment {
  id: number;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending';
  paymentDate?: string;
}
interface PaymentPlan {
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  installments: Installment[];
  nextPaymentDate: string | null;
  nextPaymentAmount: number | null;
}
interface EditPaymentPlanModalProps {
  currentPlan: PaymentPlan;
  patientName: string;
  onClose: () => void;
  onSave: (updatedPlan: PaymentPlan) => void;
}
type PaymentMode = 'monthly' | 'biweekly' | 'weekly';
const EditPaymentPlanModal: React.FC<EditPaymentPlanModalProps> = ({
  currentPlan,
  patientName,
  onClose,
  onSave
}) => {
  const [firstPaymentAmount, setFirstPaymentAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(currentPlan.totalAmount);
  const [numberOfInstallments, setNumberOfInstallments] = useState(6);
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('monthly');
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [previewInstallments, setPreviewInstallments] = useState<Installment[]>(
    []
  );
  // Calculate installments whenever inputs change
  useEffect(() => {
    calculateInstallments();
  }, [
  firstPaymentAmount,
  totalAmount,
  numberOfInstallments,
  paymentMode,
  startDate]
  );
  const calculateInstallments = () => {
    const remainingAfterFirst =
    totalAmount - currentPlan.paidAmount - firstPaymentAmount;
    if (remainingAfterFirst <= 0 || numberOfInstallments <= 0) {
      setPreviewInstallments([]);
      return;
    }
    const amountPerInstallment = Math.round(
      remainingAfterFirst / numberOfInstallments
    );
    const lastInstallmentAmount =
    remainingAfterFirst - amountPerInstallment * (numberOfInstallments - 1);
    const newInstallments: Installment[] = [];
    const start = new Date(startDate);
    // Add first payment if amount > 0
    if (firstPaymentAmount > 0) {
      newInstallments.push({
        id: 1,
        amount: firstPaymentAmount,
        dueDate: start.toLocaleDateString('fr-FR'),
        status: 'pending'
      });
    }
    // Calculate subsequent installments
    for (let i = 0; i < numberOfInstallments; i++) {
      const dueDate = new Date(start);
      // Calculate date based on payment mode
      if (paymentMode === 'monthly') {
        dueDate.setMonth(
          start.getMonth() + (firstPaymentAmount > 0 ? i + 1 : i)
        );
      } else if (paymentMode === 'biweekly') {
        dueDate.setDate(
          start.getDate() + (firstPaymentAmount > 0 ? (i + 1) * 14 : i * 14)
        );
      } else if (paymentMode === 'weekly') {
        dueDate.setDate(
          start.getDate() + (firstPaymentAmount > 0 ? (i + 1) * 7 : i * 7)
        );
      }
      newInstallments.push({
        id: firstPaymentAmount > 0 ? i + 2 : i + 1,
        amount:
        i === numberOfInstallments - 1 ?
        lastInstallmentAmount :
        amountPerInstallment,
        dueDate: dueDate.toLocaleDateString('fr-FR'),
        status: 'pending'
      });
    }
    setPreviewInstallments(newInstallments);
  };
  const handleSave = () => {
    const paidInstallments = currentPlan.installments.filter(
      (i) => i.status === 'paid'
    );
    const allInstallments = [...paidInstallments, ...previewInstallments];
    const paidAmount = paidInstallments.reduce((sum, i) => sum + i.amount, 0);
    const remainingAmount = totalAmount - paidAmount;
    const nextPending = previewInstallments[0];
    const updatedPlan: PaymentPlan = {
      totalAmount,
      paidAmount,
      remainingAmount,
      installments: allInstallments,
      nextPaymentDate: nextPending?.dueDate || null,
      nextPaymentAmount: nextPending?.amount || null
    };
    onSave(updatedPlan);
  };
  const remainingAmount = totalAmount - currentPlan.paidAmount;
  const totalPreviewAmount = previewInstallments.reduce(
    (sum, i) => sum + i.amount,
    0
  );
  const isValid =
  Math.abs(totalPreviewAmount - remainingAmount) < 1 &&
  previewInstallments.length > 0;
  const paymentModes = [
  {
    id: 'monthly' as PaymentMode,
    name: 'Mensuel',
    description: 'Tous les mois',
    icon: '📅'
  },
  {
    id: 'biweekly' as PaymentMode,
    name: 'Bimensuel',
    description: 'Toutes les 2 semaines',
    icon: '📆'
  },
  {
    id: 'weekly' as PaymentMode,
    name: 'Hebdomadaire',
    description: 'Toutes les semaines',
    icon: '🗓️'
  }];

  return (
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
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}>

      <motion.div
        initial={{
          scale: 0.9,
          y: 20
        }}
        animate={{
          scale: 1,
          y: 0
        }}
        exit={{
          scale: 0.9,
          y: 20
        }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">

        {/* Header */}
        <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-2xl">
          <div>
            <h3 className="text-sm font-semibold text-red-800">Configurer le plan de paiement</h3>
            <p className="text-xs text-red-600 mt-0.5">{patientName}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="rounded-md p-1 text-red-600 hover:bg-red-100"
            aria-label="Fermer">
            <XIcon className="h-4 w-4" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Left Column - Configuration */}
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 border border-blue-100 dark:border-gray-600">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Déjà payé
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {currentPlan.paidAmount} DT
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 border border-orange-100 dark:border-gray-600">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Reste à payer
                </p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {remainingAmount} DT
                </p>
              </div>
            </div>

            {/* Configuration Form */}
            <div className="space-y-4">
              {/* Total Amount */}
              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                  Montant total du traitement
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(Number(e.target.value))}
                    className="w-full px-4 py-3 pr-12 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold" />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">
                    DT
                  </span>
                </div>
              </div>

              {/* First Payment Amount */}
              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                  Montant de la 1ère tranche (optionnel)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={firstPaymentAmount}
                    onChange={(e) =>
                    setFirstPaymentAmount(Number(e.target.value))
                    }
                    placeholder="0"
                    className="w-full px-4 py-3 pr-12 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold" />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">
                    DT
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Laissez à 0 pour répartir équitablement
                </p>
              </div>

              {/* Number of Installments */}
              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                  Nombre de tranches
                </label>
                <input
                  type="number"
                  min="1"
                  max="24"
                  value={numberOfInstallments}
                  onChange={(e) =>
                  setNumberOfInstallments(Number(e.target.value))
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold" />

              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                  Date de début
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold" />

              </div>
            </div>
          </div>

          {/* Right Column - Preview Timeline */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center">
                <SparklesIcon className="h-4 w-4 text-purple-600 dark:text-purple-400 mr-2" />
                Aperçu du plan ({previewInstallments.length} tranches)
              </h4>
              {isValid &&
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300">
                  <CheckCircleIcon className="h-3 w-3 mr-1" />
                  Valide
                </span>
              }
            </div>

            {/* Timeline Preview */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 border-2 border-gray-200 dark:border-gray-600 max-h-[500px] overflow-y-auto">
              {previewInstallments.length > 0 ?
              <div className="space-y-3">
                  {previewInstallments.map((installment, index) =>
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    x: -20
                  }}
                  animate={{
                    opacity: 1,
                    x: 0
                  }}
                  transition={{
                    delay: index * 0.05
                  }}
                  className={`relative p-4 rounded-lg border-2 ${index === 0 && firstPaymentAmount > 0 ? 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-300 dark:border-purple-700' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600'}`}>

                      {/* Timeline connector */}
                      {index < previewInstallments.length - 1 &&
                  <div className="absolute left-6 top-full h-3 w-0.5 bg-gray-300 dark:bg-gray-600" />
                  }

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md ${index === 0 && firstPaymentAmount > 0 ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'bg-gradient-to-br from-green-500 to-emerald-500'}`}>

                            {installment.id}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">
                              {index === 0 && firstPaymentAmount > 0 ?
                          '1ère tranche' :
                          `Tranche ${installment.id}`}
                            </p>
                            <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                              <CalendarIcon className="h-3 w-3 mr-1" />
                              {installment.dueDate}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                        className={`text-lg font-bold ${index === 0 && firstPaymentAmount > 0 ? 'text-purple-600 dark:text-purple-400' : 'text-green-600 dark:text-green-400'}`}>

                            {installment.amount} DT
                          </p>
                        </div>
                      </div>
                    </motion.div>
                )}
                </div> :

              <div className="text-center py-12">
                  <TrendingUpIcon className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Configurez les paramètres pour voir l'aperçu
                  </p>
                </div>
              }
            </div>

            {/* Validation Warning */}
            {!isValid && previewInstallments.length > 0 &&
            <motion.div
              initial={{
                opacity: 0,
                y: -10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              className="p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl border border-red-200 dark:border-red-800">

                <div className="flex items-start">
                  <AlertCircleIcon className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-red-900 dark:text-red-300">
                      Les montants ne correspondent pas
                    </p>
                    <p className="text-xs text-red-700 dark:text-red-400 mt-1">
                      Total prévu: {totalPreviewAmount} DT • Reste à payer:{' '}
                      {remainingAmount} DT
                    </p>
                  </div>
                </div>
              </motion.div>
            }
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border-t border-gray-200 dark:border-gray-600">
          <div className="flex justify-between items-center">
            <div className="text-sm">
              <p className="font-bold text-gray-900 dark:text-white">
                Total: {totalPreviewAmount} DT
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {previewInstallments.length} tranche
                {previewInstallments.length > 1 ? 's' : ''} • Mode{' '}
                {paymentModes.
                find((m) => m.id === paymentMode)?.
                name.toLowerCase()}
              </p>
            </div>
            <div className="flex space-x-3">
              <motion.button
                whileHover={{
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.95
                }}
                onClick={onClose}
                className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-600">

                Annuler
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.95
                }}
                onClick={handleSave}
                disabled={!isValid}
                className={`px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}>

                <SaveIcon className="h-5 w-5 mr-2" />
                Enregistrer le plan
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>);

};
export default EditPaymentPlanModal;