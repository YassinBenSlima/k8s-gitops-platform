import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XIcon,
  CreditCardIcon,
  BuildingIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  PercentIcon,
  ShieldIcon,
  ChevronDownIcon } from
'lucide-react';
interface Fournisseur {
  id: number;
  code: string;
  nom: string;
  matricule: string;
  email: string;
  phone: string;
  ville: string;
  codePostal: string;
  adresse: string;
  activite: string;
  statut: 'actif' | 'inactif';
  typeIdentifiant: string;
  regimeImpots: string;
  retenueSource: string;
  suspensionTaxes: boolean;
}
interface NouveauFournisseurModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (fournisseur: Partial<Fournisseur>) => void;
  fournisseur?: Fournisseur | null;
}
export function NouveauFournisseurModal({
  isOpen,
  onClose,
  onSave,
  fournisseur
}: NouveauFournisseurModalProps) {
  const [formData, setFormData] = useState({
    typeIdentifiant: 'Matricule Fiscale',
    numeroIdentifiant: '',
    nom: '',
    activite: '',
    adresse: '',
    ville: '',
    codePostal: '',
    email: '',
    phone: '+216 ',
    retenueSource: '',
    suspensionTaxes: false,
    regimeImpots: 'Régime Réel'
  });
  useEffect(() => {
    if (fournisseur) {
      setFormData({
        typeIdentifiant: fournisseur.typeIdentifiant || 'Matricule Fiscale',
        numeroIdentifiant: fournisseur.matricule,
        nom: fournisseur.nom,
        activite: fournisseur.activite || '',
        adresse: fournisseur.adresse || '',
        ville: fournisseur.ville,
        codePostal: fournisseur.codePostal || '',
        email: fournisseur.email,
        phone: fournisseur.phone,
        retenueSource: fournisseur.retenueSource || '',
        suspensionTaxes: fournisseur.suspensionTaxes || false,
        regimeImpots: fournisseur.regimeImpots || 'Régime Réel'
      });
    } else {
      setFormData({
        typeIdentifiant: 'Matricule Fiscale',
        numeroIdentifiant: '',
        nom: '',
        activite: '',
        adresse: '',
        ville: '',
        codePostal: '',
        email: '',
        phone: '+216 ',
        retenueSource: '',
        suspensionTaxes: false,
        regimeImpots: 'Régime Réel'
      });
    }
  }, [fournisseur, isOpen]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      nom: formData.nom,
      matricule: formData.numeroIdentifiant,
      email: formData.email,
      phone: formData.phone,
      ville: formData.ville,
      codePostal: formData.codePostal,
      adresse: formData.adresse,
      activite: formData.activite,
      typeIdentifiant: formData.typeIdentifiant,
      regimeImpots: formData.regimeImpots,
      retenueSource: formData.retenueSource,
      suspensionTaxes: formData.suspensionTaxes,
      statut: 'actif'
    });
    onClose();
  };
  if (!isOpen) return null;
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
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <CreditCardIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {fournisseur ?
                    'Modifier le Fournisseur' :
                    'Nouveau Fournisseur'}
                  </h2>
                  <p className="text-purple-100 text-sm">
                    Remplissez les informations du fournisseur
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors">

                <XIcon className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          {/* Body */}
          <form
            onSubmit={handleSubmit}
            className="overflow-y-auto max-h-[calc(90vh-180px)]">

            <div className="p-6 space-y-6">
              {/* IDENTIFICATION */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <CreditCardIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                    Identification
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Type d'identifiant <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.typeIdentifiant}
                      onChange={(e) =>
                      setFormData({
                        ...formData,
                        typeIdentifiant: e.target.value
                      })
                      }
                      className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500">

                      <option>Matricule Fiscale</option>
                      <option>CIN</option>
                      <option>Passeport</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Numéro d'identifiant{' '}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.numeroIdentifiant}
                      onChange={(e) =>
                      setFormData({
                        ...formData,
                        numeroIdentifiant: e.target.value
                      })
                      }
                      placeholder="1234567G/A/P/000"
                      className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />

                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Format: Ex: 1234567G/A/M/000
                    </p>
                  </div>
                </div>
              </div>

              {/* Auto-computed pills */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg">
                  <div>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium uppercase">
                      Catégorie
                    </p>
                    <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">
                      Personne Physique
                    </p>
                  </div>
                  <span className="px-2 py-0.5 bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-blue-200 text-xs font-bold rounded">
                    AUTO
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 rounded-lg">
                  <div>
                    <p className="text-xs text-purple-600 dark:text-purple-400 font-medium uppercase">
                      Régime TVA
                    </p>
                    <p className="text-sm font-semibold text-purple-800 dark:text-purple-200">
                      Assujetti
                    </p>
                  </div>
                  <span className="px-2 py-0.5 bg-purple-200 dark:bg-purple-700 text-purple-800 dark:text-purple-200 text-xs font-bold rounded">
                    AUTO
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg">
                  <div>
                    <p className="text-xs text-green-600 dark:text-green-400 font-medium uppercase">
                      Régime Impôts
                    </p>
                    <select
                      value={formData.regimeImpots}
                      onChange={(e) =>
                      setFormData({
                        ...formData,
                        regimeImpots: e.target.value
                      })
                      }
                      className="text-sm font-semibold text-green-800 dark:text-green-200 bg-transparent border-none focus:ring-0 p-0 pr-6">

                      <option>Régime Réel</option>
                      <option>Régime Forfaitaire</option>
                    </select>
                  </div>
                  <ChevronDownIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
              </div>

              {/* INFORMATIONS GÉNÉRALES */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <BuildingIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                    Informations Générales
                  </h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nom / Raison sociale{' '}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.nom}
                      onChange={(e) =>
                      setFormData({
                        ...formData,
                        nom: e.target.value
                      })
                      }
                      placeholder="Ex: Société ABC"
                      className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      required />

                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Activité
                    </label>
                    <input
                      type="text"
                      value={formData.activite}
                      onChange={(e) =>
                      setFormData({
                        ...formData,
                        activite: e.target.value
                      })
                      }
                      placeholder="Ex: Commerce, Services, Industrie..."
                      className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />

                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Adresse
                    </label>
                    <input
                      type="text"
                      value={formData.adresse}
                      onChange={(e) =>
                      setFormData({
                        ...formData,
                        adresse: e.target.value
                      })
                      }
                      placeholder="Rue, Avenue..."
                      className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />

                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Ville
                      </label>
                      <input
                        type="text"
                        value={formData.ville}
                        onChange={(e) =>
                        setFormData({
                          ...formData,
                          ville: e.target.value
                        })
                        }
                        placeholder="Ville"
                        className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />

                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Code Postal
                      </label>
                      <input
                        type="text"
                        value={formData.codePostal}
                        onChange={(e) =>
                        setFormData({
                          ...formData,
                          codePostal: e.target.value
                        })
                        }
                        placeholder="CP"
                        className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />

                    </div>
                  </div>
                </div>
              </div>

              {/* CONTACT */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <MailIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                    Contact
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value
                      })
                      }
                      placeholder="email@exemple.com"
                      className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />

                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value
                      })
                      }
                      placeholder="+216..."
                      className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />

                  </div>
                </div>
              </div>

              {/* RÉGIME FISCAL */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <PercentIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                    Régime Fiscal
                  </h3>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Retenue à la Source
                  </label>
                  <select
                    value={formData.retenueSource}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      retenueSource: e.target.value
                    })
                    }
                    className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500">

                    <option value="">Sélectionner un taux...</option>
                    <option value="1.5">1.5%</option>
                    <option value="5">5%</option>
                    <option value="10">10%</option>
                    <option value="15">15%</option>
                  </select>
                </div>
              </div>

              {/* RÉGIMES SPÉCIAUX */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <ShieldIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                    Régimes Spéciaux
                  </h3>
                </div>
                <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.suspensionTaxes}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      suspensionTaxes: e.target.checked
                    })
                    }
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />

                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Achat en Suspension de Taxes
                  </span>
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-600 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">

                Annuler
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-sm font-semibold hover:from-purple-700 hover:to-indigo-700 transition-colors shadow-lg">

                {fournisseur ? 'Enregistrer' : 'Créer le fournisseur'}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>);

}