import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XIcon,
  PackageIcon,
  TruckIcon,
  CalendarIcon,
  FileTextIcon,
  CheckIcon,
  PlusIcon,
  MinusIcon,
  ShoppingCartIcon,
  SparklesIcon,
  AlertTriangleIcon,
  InfoIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  CreditCardIcon } from
'lucide-react';
const GenerateOrder = ({ lowStockItems, onClose }) => {
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [orderItems, setOrderItems] = useState(
    lowStockItems.map((item) => ({
      ...item,
      orderQuantity: Math.max(item.minStock - item.currentStock + 5, 1),
      selected: true
    }))
  );
  const [orderDetails, setOrderDetails] = useState({
    deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).
    toISOString().
    split('T')[0],
    priority: 'normal',
    notes: '',
    deliveryAddress: 'Cabinet principal - 123 Rue de la Santé, 75000 Paris',
    paymentMethod: 'account'
  });
  const suppliers = [
  {
    id: 1,
    name: 'OrthoSupply',
    email: 'commandes@orthosupply.fr',
    phone: '+33 1 23 45 67 89',
    rating: 4.8
  },
  {
    id: 2,
    name: 'DentalPro',
    email: 'orders@dentalpro.fr',
    phone: '+33 1 98 76 54 32',
    rating: 4.6
  },
  {
    id: 3,
    name: 'MedOrtho',
    email: 'contact@medortho.fr',
    phone: '+33 1 11 22 33 44',
    rating: 4.9
  }];

  const handleQuantityChange = (itemId, change) => {
    setOrderItems(
      orderItems.map((item) =>
      item.id === itemId ?
      {
        ...item,
        orderQuantity: Math.max(1, item.orderQuantity + change)
      } :
      item
      )
    );
  };
  const handleToggleItem = (itemId) => {
    setOrderItems(
      orderItems.map((item) =>
      item.id === itemId ?
      {
        ...item,
        selected: !item.selected
      } :
      item
      )
    );
  };
  const calculateTotal = () => {
    return orderItems.
    filter((item) => item.selected).
    reduce((sum, item) => sum + item.orderQuantity, 0);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedItems = orderItems.filter((item) => item.selected);
    console.log('Generating order:', {
      supplier: selectedSupplier,
      items: selectedItems,
      details: orderDetails
    });
    onClose();
  };
  const selectedSupplierData = suppliers.find(
    (s) => s.id === parseInt(selectedSupplier)
  );
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
          y: 20
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0
        }}
        exit={{
          opacity: 0,
          scale: 0.95,
          y: 20
        }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-800 dark:via-indigo-800 dark:to-purple-800 p-6 text-white">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                className="h-14 w-14 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mr-4">

                <ShoppingCartIcon className="h-8 w-8 text-white" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold">Générer une commande</h3>
                <p className="text-blue-100 text-sm mt-1">
                  Commandez les articles en stock bas
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors">

              <XIcon className="h-5 w-5 text-white" />
            </button>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs text-blue-100">Articles sélectionnés</p>
              <p className="text-2xl font-bold">
                {orderItems.filter((item) => item.selected).length}
              </p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs text-blue-100">Quantité totale</p>
              <p className="text-2xl font-bold">{calculateTotal()}</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs text-blue-100">Priorité</p>
              <p className="text-lg font-bold capitalize">
                {orderDetails.priority === 'urgent' ? '🔴 Urgent' : '🟢 Normal'}
              </p>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Supplier Selection */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-2 border-purple-100 dark:border-gray-600">

              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-purple-500 dark:bg-purple-600 flex items-center justify-center">
                  <TruckIcon className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    Fournisseur
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Sélectionnez votre fournisseur
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {suppliers.map((supplier) =>
                <motion.label
                  key={supplier.id}
                  whileHover={{
                    scale: 1.02,
                    y: -2
                  }}
                  whileTap={{
                    scale: 0.98
                  }}
                  className={`relative flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedSupplier === supplier.id.toString() ? 'border-purple-500 dark:border-purple-600 bg-purple-50 dark:bg-purple-900/30 shadow-lg' : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-purple-200 dark:hover:border-purple-700'}`}>

                    <input
                    type="radio"
                    name="supplier"
                    value={supplier.id}
                    checked={selectedSupplier === supplier.id.toString()}
                    onChange={(e) => setSelectedSupplier(e.target.value)}
                    className="sr-only"
                    required />

                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 dark:text-white">
                          {supplier.name}
                        </p>
                        <div className="flex items-center mt-1">
                          <span className="text-yellow-500 mr-1">⭐</span>
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {supplier.rating}
                          </span>
                        </div>
                      </div>
                      {selectedSupplier === supplier.id.toString() &&
                    <motion.div
                      initial={{
                        scale: 0
                      }}
                      animate={{
                        scale: 1
                      }}
                      className="h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center">

                          <CheckIcon className="h-4 w-4 text-white" />
                        </motion.div>
                    }
                    </div>
                    <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <MailIcon className="h-3 w-3 mr-1" />
                        {supplier.email}
                      </div>
                      <div className="flex items-center">
                        <PhoneIcon className="h-3 w-3 mr-1" />
                        {supplier.phone}
                      </div>
                    </div>
                  </motion.label>
                )}
              </div>
              {selectedSupplierData &&
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0
                }}
                animate={{
                  opacity: 1,
                  height: 'auto'
                }}
                className="mt-4 bg-white dark:bg-gray-800 rounded-lg p-4 border border-purple-200 dark:border-purple-700">

                  <div className="flex items-start">
                    <InfoIcon className="h-5 w-5 text-purple-500 dark:text-purple-400 mr-2 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      <p className="font-medium">Fournisseur sélectionné</p>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        La commande sera envoyée à {selectedSupplierData.name}
                      </p>
                    </div>
                  </div>
                </motion.div>
              }
            </motion.div>
            {/* Order Items */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.1
              }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-2 border-blue-100 dark:border-gray-600">

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center">
                    <PackageIcon className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                      Articles à commander
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Ajustez les quantités selon vos besoins
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                {orderItems.map((item, index) =>
                <motion.div
                  key={item.id}
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
                  className={`bg-white dark:bg-gray-800 rounded-xl p-4 border-2 transition-all ${item.selected ? 'border-blue-300 dark:border-blue-600 shadow-md' : 'border-gray-200 dark:border-gray-600 opacity-60'}`}>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-1">
                        <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => handleToggleItem(item.id)}
                        className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mr-3" />

                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 dark:from-blue-500 dark:to-indigo-600 flex items-center justify-center mr-3">
                          <PackageIcon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900 dark:text-white">
                            {item.name}
                          </p>
                          <div className="flex items-center mt-1 space-x-2">
                            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                              {item.category}
                            </span>
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Stock: {item.currentStock} / Min: {item.minStock}
                            </span>
                          </div>
                        </div>
                      </div>
                      {item.selected &&
                    <div className="flex items-center space-x-2">
                          <motion.button
                        whileHover={{
                          scale: 1.1
                        }}
                        whileTap={{
                          scale: 0.9
                        }}
                        type="button"
                        onClick={() => handleQuantityChange(item.id, -1)}
                        disabled={item.orderQuantity <= 1}
                        className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all">

                            <MinusIcon className="h-4 w-4" />
                          </motion.button>
                          <span className="text-lg font-bold text-gray-900 dark:text-white min-w-[3rem] text-center">
                            {item.orderQuantity}
                          </span>
                          <motion.button
                        whileHover={{
                          scale: 1.1
                        }}
                        whileTap={{
                          scale: 0.9
                        }}
                        type="button"
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 transition-all">

                            <PlusIcon className="h-4 w-4" />
                          </motion.button>
                        </div>
                    }
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
            {/* Order Details */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.2
              }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-2 border-green-100 dark:border-gray-600">

              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-green-500 dark:bg-green-600 flex items-center justify-center">
                  <FileTextIcon className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    Détails de la commande
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Informations de livraison et paiement
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="deliveryDate"
                    className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">

                    Date de livraison souhaitée
                  </label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <input
                      type="date"
                      name="deliveryDate"
                      id="deliveryDate"
                      className="block w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-900 focus:outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      value={orderDetails.deliveryDate}
                      onChange={(e) =>
                      setOrderDetails({
                        ...orderDetails,
                        deliveryDate: e.target.value
                      })
                      } />

                  </div>
                </div>
                <div>
                  <label
                    htmlFor="priority"
                    className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">

                    Priorité
                  </label>
                  <select
                    name="priority"
                    id="priority"
                    className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-900 focus:outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    value={orderDetails.priority}
                    onChange={(e) =>
                    setOrderDetails({
                      ...orderDetails,
                      priority: e.target.value
                    })
                    }>

                    <option value="normal">Normale</option>
                    <option value="urgent">Urgente</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="deliveryAddress"
                    className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">

                    Adresse de livraison
                  </label>
                  <div className="relative">
                    <MapPinIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <input
                      type="text"
                      name="deliveryAddress"
                      id="deliveryAddress"
                      className="block w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-900 focus:outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      value={orderDetails.deliveryAddress}
                      onChange={(e) =>
                      setOrderDetails({
                        ...orderDetails,
                        deliveryAddress: e.target.value
                      })
                      } />

                  </div>
                </div>
                <div>
                  <label
                    htmlFor="paymentMethod"
                    className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">

                    Mode de paiement
                  </label>
                  <div className="relative">
                    <CreditCardIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
                    <select
                      name="paymentMethod"
                      id="paymentMethod"
                      className="block w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-900 focus:outline-none transition-all appearance-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      value={orderDetails.paymentMethod}
                      onChange={(e) =>
                      setOrderDetails({
                        ...orderDetails,
                        paymentMethod: e.target.value
                      })
                      }>

                      <option value="account">Compte client</option>
                      <option value="card">Carte bancaire</option>
                      <option value="transfer">Virement</option>
                      <option value="check">Chèque</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="notes"
                  className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">

                  Notes supplémentaires
                </label>
                <textarea
                  name="notes"
                  id="notes"
                  rows={3}
                  className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-900 focus:outline-none transition-all resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Ajoutez des instructions spéciales pour cette commande..."
                  value={orderDetails.notes}
                  onChange={(e) =>
                  setOrderDetails({
                    ...orderDetails,
                    notes: e.target.value
                  })
                  } />

              </div>
            </motion.div>
            {/* Warning for urgent orders */}
            {orderDetails.priority === 'urgent' &&
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-l-4 border-red-500 dark:border-red-600 rounded-lg p-4">

                <div className="flex">
                  <AlertTriangleIcon className="h-5 w-5 text-red-500 dark:text-red-400 mr-3 flex-shrink-0" />
                  <div>
                    <h5 className="text-sm font-bold text-red-800 dark:text-red-300">
                      Commande urgente
                    </h5>
                    <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                      Les commandes urgentes peuvent entraîner des frais
                      supplémentaires. Veuillez contacter votre fournisseur pour
                      confirmer la disponibilité.
                    </p>
                  </div>
                </div>
              </motion.div>
            }
          </form>
        </div>
        {/* Footer */}
        <div className="border-t-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p className="font-medium">
                Total:{' '}
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {calculateTotal()} articles
                </span>
              </p>
              <p className="text-xs mt-1">
                {orderItems.filter((item) => item.selected).length} article(s)
                sélectionné(s)
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
                type="button"
                onClick={onClose}
                className="inline-flex items-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400 transition-all shadow-md">

                <XIcon className="h-4 w-4 mr-2" />
                Annuler
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.95
                }}
                type="button"
                onClick={handleSubmit}
                disabled={
                !selectedSupplier ||
                orderItems.filter((item) => item.selected).length === 0
                }
                className="inline-flex items-center px-6 py-3 border-2 border-transparent rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">

                <ShoppingCartIcon className="h-5 w-5 mr-2" />
                Générer la commande
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>);

};
export default GenerateOrder;