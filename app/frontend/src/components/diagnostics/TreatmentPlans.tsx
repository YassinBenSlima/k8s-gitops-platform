import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileTextIcon,
  SaveIcon,
  ClipboardCheckIcon,
  SparklesIcon,
  LoaderIcon,
  PlusIcon,
  CalendarIcon,
  ClockIcon,
  ArrowLeftIcon,
  CheckCircle2Icon,
  MoreHorizontalIcon,
  EditIcon,
  EyeIcon } from
'lucide-react';
// Mock data for existing treatment plans
const mockTreatmentPlans = [
{
  id: 1,
  date: '15 Jan 2025',
  status: 'active',
  objectifs: ['Alignement dentaire', 'Correction classe II'],
  types: ['Orthodontique', 'Multi-attache'],
  duration: '24 mois',
  doctor: 'Dr. Martin'
},
{
  id: 2,
  date: '10 Nov 2024',
  status: 'draft',
  objectifs: ['Expansion maxillaire'],
  types: ['Orthopédique'],
  duration: '6 mois',
  doctor: 'Dr. Martin'
},
{
  id: 3,
  date: '05 Juin 2023',
  status: 'completed',
  objectifs: ['Interception', "Gestion d'espace"],
  types: ['Préventif'],
  duration: '12 mois',
  doctor: 'Dr. Dubois'
}];

const TreatmentPlans = () => {
  const [viewMode, setViewMode] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [isAIFilling, setIsAIFilling] = useState(false);
  // Initial empty form state
  const initialFormData = {
    // Objectifs généraux
    objectifsGeneraux: {
      favoriserCorrection: false,
      favoriserEvolution: false,
      retablirAlignement: false,
      ameliorerRecouvrement: {
        incisif: false,
        supraclusion: false,
        infraclusion: false
      },
      obtenirOcclusion: false,
      ameliorerEsthetique: false,
      suiteTra: false
    },
    // Déplacements dentaires - Arcade maxillaire
    deplacementsMaxillaire: {
      repositionnementIncisif: {
        lingual: false,
        ingression: false,
        aucun: false,
        egression: false,
        vestibulaire: false
      },
      deplacementMolaire: {
        mesialisation: false,
        ingression: false,
        aucun: false,
        egression: false,
        distalisation: false,
        asymetrique: false
      },
      expansionTransversale: false,
      torque: false
    },
    // Déplacements dentaires - Arcade mandibulaire
    deplacementsMandibulaire: {
      repositionnementIncisif: {
        lingual: false,
        ingression: false,
        aucun: false,
        egression: false,
        vestibulaire: false
      },
      deplacementMolaire: {
        mesialisation: false,
        ingression: false,
        aucun: false,
        egression: false,
        distalisation: false,
        asymetrique: false
      },
      expansionTransversale: false,
      torque: false
    },
    // Type de traitement
    typeTraitement: {
      preventif: false,
      fonctionnel: false,
      interceptif: false,
      orthopedique: false,
      correctif: false,
      orthodontique: false,
      orthoChirurgie: false,
      orthoProthese: false,
      orthoParo: false
    },
    // Moyens orthopédiques
    moyensOrthopediques: {
      disjoncteurMaxillaire: false,
      EF: false,
      DGainer: false,
      masqueDelaire: false,
      activateur: false,
      FEO: false,
      quadhelix: false
    },
    // Moyens orthodontiques
    moyensOrthodontiques: {
      appareilMultiattache: {
        global: false,
        sectoriel: false
      },
      arcadeMaxillaire: {
        metal: false,
        ceramique: false,
        lingual: false,
        invisalign: false
      },
      arcadeMandibulaire: {
        metal: false,
        ceramique: false,
        lingual: false,
        invisalign: false
      },
      nivellementSupInf: false,
      expansionTransversale: false,
      correctionSupraclusion: false,
      tractionsDentsIncluses: false,
      intercuspidationClasse1: false,
      forsus: false,
      miniImplants: {
        maxillaires: false,
        mandibulaires: false
      },
      extractions: '',
      germectomie: {
        oui: false,
        aSurveiller: false
      },
      reductionAmelaire: {
        maxillaire: {
          anterieure: false,
          posterieure: false
        },
        mandibulaire: {
          anterieure: false,
          posterieure: false
        }
      },
      meulageTemporaires: '',
      multidisciplinaire: {
        bilanFonctionnel: false,
        consultationORL: false,
        traitementParodontal: false,
        soinsOCE: false,
        desinclusion: false,
        rehabilitationProthetique: false,
        consultationChirurgie: false
      },
      contention: {
        maxillaire: {
          fixe: false,
          amovible: false
        },
        mandibulaire: {
          fixe: false,
          amovible: false
        }
      }
    },
    // Phases de traitement
    phasesTraitement: {
      interception: false,
      preparation: false,
      dureeEstimee: ''
    }
  };
  const [formData, setFormData] = useState(initialFormData);
  const handleAIFill = async () => {
    setIsAIFilling(true);
    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Fill form with AI-generated data
    setFormData({
      objectifsGeneraux: {
        favoriserCorrection: true,
        favoriserEvolution: true,
        retablirAlignement: true,
        ameliorerRecouvrement: {
          incisif: true,
          supraclusion: true,
          infraclusion: false
        },
        obtenirOcclusion: true,
        ameliorerEsthetique: true,
        suiteTra: false
      },
      deplacementsMaxillaire: {
        repositionnementIncisif: {
          lingual: false,
          ingression: false,
          aucun: false,
          egression: false,
          vestibulaire: true
        },
        deplacementMolaire: {
          mesialisation: false,
          ingression: false,
          aucun: false,
          egression: false,
          distalisation: true,
          asymetrique: false
        },
        expansionTransversale: true,
        torque: true
      },
      deplacementsMandibulaire: {
        repositionnementIncisif: {
          lingual: true,
          ingression: false,
          aucun: false,
          egression: false,
          vestibulaire: false
        },
        deplacementMolaire: {
          mesialisation: true,
          ingression: false,
          aucun: false,
          egression: false,
          distalisation: false,
          asymetrique: false
        },
        expansionTransversale: false,
        torque: true
      },
      typeTraitement: {
        preventif: false,
        fonctionnel: false,
        interceptif: false,
        orthopedique: true,
        correctif: true,
        orthodontique: true,
        orthoChirurgie: false,
        orthoProthese: false,
        orthoParo: false
      },
      moyensOrthopediques: {
        disjoncteurMaxillaire: true,
        EF: false,
        DGainer: false,
        masqueDelaire: false,
        activateur: false,
        FEO: true,
        quadhelix: false
      },
      moyensOrthodontiques: {
        appareilMultiattache: {
          global: true,
          sectoriel: false
        },
        arcadeMaxillaire: {
          metal: true,
          ceramique: false,
          lingual: false,
          invisalign: false
        },
        arcadeMandibulaire: {
          metal: true,
          ceramique: false,
          lingual: false,
          invisalign: false
        },
        nivellementSupInf: true,
        expansionTransversale: true,
        correctionSupraclusion: true,
        tractionsDentsIncluses: false,
        intercuspidationClasse1: true,
        forsus: true,
        miniImplants: {
          maxillaires: true,
          mandibulaires: false
        },
        extractions: '14, 24, 34, 44',
        germectomie: {
          oui: true,
          aSurveiller: false
        },
        reductionAmelaire: {
          maxillaire: {
            anterieure: true,
            posterieure: false
          },
          mandibulaire: {
            anterieure: true,
            posterieure: false
          }
        },
        meulageTemporaires: '54, 64, 74, 84',
        multidisciplinaire: {
          bilanFonctionnel: true,
          consultationORL: false,
          traitementParodontal: false,
          soinsOCE: true,
          desinclusion: false,
          rehabilitationProthetique: false,
          consultationChirurgie: false
        },
        contention: {
          maxillaire: {
            fixe: true,
            amovible: false
          },
          mandibulaire: {
            fixe: true,
            amovible: false
          }
        }
      },
      phasesTraitement: {
        interception: false,
        preparation: true,
        dureeEstimee: '24'
      }
    });
    setIsAIFilling(false);
  };
  const handleSave = () => {
    console.log('Saving treatment plan:', formData);
    // Simulate save
    setTimeout(() => {
      setViewMode('list');
      setSelectedPlanId(null);
    }, 500);
  };
  const handleCreateNew = () => {
    setFormData(initialFormData);
    setSelectedPlanId(null);
    setViewMode('create');
  };
  const handleEdit = (id: number) => {
    // In a real app, we would fetch the plan data here
    // For now we just use the current form data or AI fill for demo
    if (id === 1) {
      // Simulate loading existing data
      handleAIFill();
    } else {
      setFormData(initialFormData);
    }
    setSelectedPlanId(id);
    setViewMode('edit');
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'draft':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'draft':
        return 'Brouillon';
      case 'completed':
        return 'Terminé';
      default:
        return status;
    }
  };
  // Render List View
  if (viewMode === 'list') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Plans de traitement
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Historique des plans thérapeutiques
            </p>
          </div>
          <motion.button
            whileHover={{
              scale: 1.05
            }}
            whileTap={{
              scale: 0.95
            }}
            onClick={handleCreateNew}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">

            <PlusIcon className="h-5 w-5 mr-2" />
            Nouveau Plan
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTreatmentPlans.map((plan, index) =>
          <motion.div
            key={plan.id}
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
            onClick={() => handleEdit(plan.id)}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer hover:shadow-lg hover:border-purple-200 dark:hover:border-purple-800 transition-all group">

              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mr-3">
                      <FileTextIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        Plan #{plan.id}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {plan.date}
                      </p>
                    </div>
                  </div>
                  <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(plan.status)}`}>

                    {getStatusLabel(plan.status)}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                      Objectifs
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {plan.objectifs.map((obj, i) =>
                    <span
                      key={i}
                      className="inline-flex items-center px-2 py-1 rounded-md bg-gray-50 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">

                          <CheckCircle2Icon className="h-3 w-3 mr-1 text-green-500" />
                          {obj}
                        </span>
                    )}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                      Type
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {plan.types.map((type, i) =>
                    <span
                      key={i}
                      className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50 px-2 py-1 rounded">

                          {type}
                        </span>
                    )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <ClockIcon className="h-3.5 w-3.5 mr-1" />
                    {plan.duration}
                  </div>
                  <div className="flex items-center text-purple-600 dark:text-purple-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <EyeIcon className="h-4 w-4 mr-1" />
                    Voir détails
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Add New Card Placeholder */}
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
              delay: 0.3
            }}
            onClick={handleCreateNew}
            className="bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center p-6 cursor-pointer hover:border-purple-400 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all min-h-[250px]">

            <div className="h-12 w-12 rounded-full bg-white dark:bg-gray-700 shadow-sm flex items-center justify-center mb-3">
              <PlusIcon className="h-6 w-6 text-purple-500" />
            </div>
            <p className="font-semibold text-gray-900 dark:text-white">
              Créer un nouveau plan
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">
              Définir de nouveaux objectifs et moyens thérapeutiques
            </p>
          </motion.div>
        </div>
      </div>);

  }
  // Render Detail View (Create/Edit)
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{
          opacity: 0,
          y: -20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-2xl p-6 text-white shadow-xl">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center">
            <button
              onClick={() => setViewMode('list')}
              className="mr-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm">

              <ArrowLeftIcon className="h-5 w-5 text-white" />
            </button>
            <div className="h-14 w-14 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mr-4">
              <FileTextIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">
                {viewMode === 'create' ?
                'Nouveau plan de traitement' :
                `Plan de traitement #${selectedPlanId}`}
              </h3>
              <p className="text-pink-100 text-sm mt-1">
                {viewMode === 'create' ?
                'Définition des objectifs et moyens thérapeutiques' :
                'Modification et suivi du plan'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={handleAIFill}
              disabled={isAIFilling}
              className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base">

              {isAIFilling ?
              <>
                  <LoaderIcon className="h-5 w-5 mr-2 animate-spin" />
                  Analyse...
                </> :

              <>
                  <SparklesIcon className="h-5 w-5 mr-2" />
                  Remplir avec IA
                </>
              }
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 bg-white text-purple-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all text-sm md:text-base">

              <SaveIcon className="h-5 w-5 mr-2" />
              Enregistrer
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Objectifs de traitement */}
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
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border-l-4 border-blue-500 overflow-hidden">

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-6 py-4 border-b border-blue-100 dark:border-blue-800">
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-3 shadow-lg">
              <ClipboardCheckIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="block">1. Objectifs de traitement</span>
              <span className="text-xs font-normal text-gray-600 dark:text-gray-400">
                Objectifs généraux
              </span>
            </div>
          </h3>
        </div>
        <div className="p-6">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
              Objectifs généraux
            </p>
            <div className="space-y-2">
              <label className="flex items-start text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={formData.objectifsGeneraux.favoriserCorrection}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    objectifsGeneraux: {
                      ...formData.objectifsGeneraux,
                      favoriserCorrection: e.target.checked
                    }
                  })
                  }
                  className="mr-2 mt-0.5 rounded text-blue-600 focus:ring-blue-500" />

                <span className="text-gray-700 dark:text-gray-300">
                  Favoriser la correction du décalage squelettique et rétablir
                  l'harmonie fonctionnelle
                </span>
              </label>
              <label className="flex items-start text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={formData.objectifsGeneraux.favoriserEvolution}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    objectifsGeneraux: {
                      ...formData.objectifsGeneraux,
                      favoriserEvolution: e.target.checked
                    }
                  })
                  }
                  className="mr-2 mt-0.5 rounded text-blue-600 focus:ring-blue-500" />

                <span className="text-gray-700 dark:text-gray-300">
                  Favoriser l'évolution des dents permanentes dans les
                  meilleures conditions occlusales et parodontales
                </span>
              </label>
              <label className="flex items-start text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={formData.objectifsGeneraux.retablirAlignement}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    objectifsGeneraux: {
                      ...formData.objectifsGeneraux,
                      retablirAlignement: e.target.checked
                    }
                  })
                  }
                  className="mr-2 mt-0.5 rounded text-blue-600 focus:ring-blue-500" />

                <span className="text-gray-700 dark:text-gray-300">
                  Rétablir l'alignement dentaire
                </span>
              </label>

              {/* Améliorer le recouvrement */}
              <div className="ml-4 space-y-2 mt-2">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  Améliorer le recouvrement :
                </p>
                <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={
                    formData.objectifsGeneraux.ameliorerRecouvrement.incisif
                    }
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      objectifsGeneraux: {
                        ...formData.objectifsGeneraux,
                        ameliorerRecouvrement: {
                          ...formData.objectifsGeneraux.ameliorerRecouvrement,
                          incisif: e.target.checked
                        }
                      }
                    })
                    }
                    className="mr-2 rounded text-blue-600 focus:ring-blue-500" />

                  <span className="text-gray-700 dark:text-gray-300">
                    Incisif
                  </span>
                </label>
                <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={
                    formData.objectifsGeneraux.ameliorerRecouvrement.
                    supraclusion
                    }
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      objectifsGeneraux: {
                        ...formData.objectifsGeneraux,
                        ameliorerRecouvrement: {
                          ...formData.objectifsGeneraux.ameliorerRecouvrement,
                          supraclusion: e.target.checked
                        }
                      }
                    })
                    }
                    className="mr-2 rounded text-blue-600 focus:ring-blue-500" />

                  <span className="text-gray-700 dark:text-gray-300">
                    Supraclusion
                  </span>
                </label>
                <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={
                    formData.objectifsGeneraux.ameliorerRecouvrement.
                    infraclusion
                    }
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      objectifsGeneraux: {
                        ...formData.objectifsGeneraux,
                        ameliorerRecouvrement: {
                          ...formData.objectifsGeneraux.ameliorerRecouvrement,
                          infraclusion: e.target.checked
                        }
                      }
                    })
                    }
                    className="mr-2 rounded text-blue-600 focus:ring-blue-500" />

                  <span className="text-gray-700 dark:text-gray-300">
                    Infraclusion
                  </span>
                </label>
              </div>

              <label className="flex items-start text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={formData.objectifsGeneraux.obtenirOcclusion}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    objectifsGeneraux: {
                      ...formData.objectifsGeneraux,
                      obtenirOcclusion: e.target.checked
                    }
                  })
                  }
                  className="mr-2 mt-0.5 rounded text-blue-600 focus:ring-blue-500" />

                <span className="text-gray-700 dark:text-gray-300">
                  Obtenir une occlusion fonctionnelle de classe I canine et
                  molaire
                </span>
              </label>
              <label className="flex items-start text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={formData.objectifsGeneraux.ameliorerEsthetique}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    objectifsGeneraux: {
                      ...formData.objectifsGeneraux,
                      ameliorerEsthetique: e.target.checked
                    }
                  })
                  }
                  className="mr-2 mt-0.5 rounded text-blue-600 focus:ring-blue-500" />

                <span className="text-gray-700 dark:text-gray-300">
                  Améliorer l'esthétique du sourire et du profil
                </span>
              </label>
              <label className="flex items-start text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={formData.objectifsGeneraux.suiteTra}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    objectifsGeneraux: {
                      ...formData.objectifsGeneraux,
                      suiteTra: e.target.checked
                    }
                  })
                  }
                  className="mr-2 mt-0.5 rounded text-blue-600 focus:ring-blue-500" />

                <span className="text-gray-700 dark:text-gray-300">
                  Suite TRA
                </span>
              </label>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Déplacements dentaires */}
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
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border-l-4 border-purple-500 overflow-hidden">

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 px-6 py-4 border-b border-purple-100 dark:border-purple-800">
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mr-3 shadow-lg">
              <ClipboardCheckIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="block">1.2. Déplacements dentaires</span>
              <span className="text-xs font-normal text-gray-600 dark:text-gray-400">
                Mouvements orthodontiques planifiés
              </span>
            </div>
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Arcade maxillaire */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <span className="h-2 w-2 rounded-full bg-purple-500 mr-2"></span>
                Arcade maxillaire
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Repositionnement incisif :
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={
                        formData.deplacementsMaxillaire.
                        repositionnementIncisif.lingual
                        }
                        onChange={(e) =>
                        setFormData({
                          ...formData,
                          deplacementsMaxillaire: {
                            ...formData.deplacementsMaxillaire,
                            repositionnementIncisif: {
                              ...formData.deplacementsMaxillaire.
                              repositionnementIncisif,
                              lingual: e.target.checked
                            }
                          }
                        })
                        }
                        className="mr-1 rounded text-purple-600 focus:ring-purple-500" />

                      <span className="text-gray-700 dark:text-gray-300">
                        Lingual
                      </span>
                    </label>
                    <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={
                        formData.deplacementsMaxillaire.
                        repositionnementIncisif.ingression
                        }
                        onChange={(e) =>
                        setFormData({
                          ...formData,
                          deplacementsMaxillaire: {
                            ...formData.deplacementsMaxillaire,
                            repositionnementIncisif: {
                              ...formData.deplacementsMaxillaire.
                              repositionnementIncisif,
                              ingression: e.target.checked
                            }
                          }
                        })
                        }
                        className="mr-1 rounded text-purple-600 focus:ring-purple-500" />

                      <span className="text-gray-700 dark:text-gray-300">
                        Ingression
                      </span>
                    </label>
                    <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={
                        formData.deplacementsMaxillaire.
                        repositionnementIncisif.aucun
                        }
                        onChange={(e) =>
                        setFormData({
                          ...formData,
                          deplacementsMaxillaire: {
                            ...formData.deplacementsMaxillaire,
                            repositionnementIncisif: {
                              ...formData.deplacementsMaxillaire.
                              repositionnementIncisif,
                              aucun: e.target.checked
                            }
                          }
                        })
                        }
                        className="mr-1 rounded text-purple-600 focus:ring-purple-500" />

                      <span className="text-gray-700 dark:text-gray-300">
                        Aucun
                      </span>
                    </label>
                    <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={
                        formData.deplacementsMaxillaire.
                        repositionnementIncisif.egression
                        }
                        onChange={(e) =>
                        setFormData({
                          ...formData,
                          deplacementsMaxillaire: {
                            ...formData.deplacementsMaxillaire,
                            repositionnementIncisif: {
                              ...formData.deplacementsMaxillaire.
                              repositionnementIncisif,
                              egression: e.target.checked
                            }
                          }
                        })
                        }
                        className="mr-1 rounded text-purple-600 focus:ring-purple-500" />

                      <span className="text-gray-700 dark:text-gray-300">
                        Égression
                      </span>
                    </label>
                    <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={
                        formData.deplacementsMaxillaire.
                        repositionnementIncisif.vestibulaire
                        }
                        onChange={(e) =>
                        setFormData({
                          ...formData,
                          deplacementsMaxillaire: {
                            ...formData.deplacementsMaxillaire,
                            repositionnementIncisif: {
                              ...formData.deplacementsMaxillaire.
                              repositionnementIncisif,
                              vestibulaire: e.target.checked
                            }
                          }
                        })
                        }
                        className="mr-1 rounded text-purple-600 focus:ring-purple-500" />

                      <span className="text-gray-700 dark:text-gray-300">
                        Vestibulaire
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Déplacement molaire :
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={
                        formData.deplacementsMaxillaire.deplacementMolaire.
                        mesialisation
                        }
                        onChange={(e) =>
                        setFormData({
                          ...formData,
                          deplacementsMaxillaire: {
                            ...formData.deplacementsMaxillaire,
                            deplacementMolaire: {
                              ...formData.deplacementsMaxillaire.
                              deplacementMolaire,
                              mesialisation: e.target.checked
                            }
                          }
                        })
                        }
                        className="mr-1 rounded text-purple-600 focus:ring-purple-500" />

                      <span className="text-gray-700 dark:text-gray-300">
                        Mésialisation
                      </span>
                    </label>
                    <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={
                        formData.deplacementsMaxillaire.deplacementMolaire.
                        ingression
                        }
                        onChange={(e) =>
                        setFormData({
                          ...formData,
                          deplacementsMaxillaire: {
                            ...formData.deplacementsMaxillaire,
                            deplacementMolaire: {
                              ...formData.deplacementsMaxillaire.
                              deplacementMolaire,
                              ingression: e.target.checked
                            }
                          }
                        })
                        }
                        className="mr-1 rounded text-purple-600 focus:ring-purple-500" />

                      <span className="text-gray-700 dark:text-gray-300">
                        Ingression
                      </span>
                    </label>
                    <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={
                        formData.deplacementsMaxillaire.deplacementMolaire.
                        aucun
                        }
                        onChange={(e) =>
                        setFormData({
                          ...formData,
                          deplacementsMaxillaire: {
                            ...formData.deplacementsMaxillaire,
                            deplacementMolaire: {
                              ...formData.deplacementsMaxillaire.
                              deplacementMolaire,
                              aucun: e.target.checked
                            }
                          }
                        })
                        }
                        className="mr-1 rounded text-purple-600 focus:ring-purple-500" />

                      <span className="text-gray-700 dark:text-gray-300">
                        Aucun
                      </span>
                    </label>
                    <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={
                        formData.deplacementsMaxillaire.deplacementMolaire.
                        egression
                        }
                        onChange={(e) =>
                        setFormData({
                          ...formData,
                          deplacementsMaxillaire: {
                            ...formData.deplacementsMaxillaire,
                            deplacementMolaire: {
                              ...formData.deplacementsMaxillaire.
                              deplacementMolaire,
                              egression: e.target.checked
                            }
                          }
                        })
                        }
                        className="mr-1 rounded text-purple-600 focus:ring-purple-500" />

                      <span className="text-gray-700 dark:text-gray-300">
                        Égression
                      </span>
                    </label>
                    <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={
                        formData.deplacementsMaxillaire.deplacementMolaire.
                        distalisation
                        }
                        onChange={(e) =>
                        setFormData({
                          ...formData,
                          deplacementsMaxillaire: {
                            ...formData.deplacementsMaxillaire,
                            deplacementMolaire: {
                              ...formData.deplacementsMaxillaire.
                              deplacementMolaire,
                              distalisation: e.target.checked
                            }
                          }
                        })
                        }
                        className="mr-1 rounded text-purple-600 focus:ring-purple-500" />

                      <span className="text-gray-700 dark:text-gray-300">
                        Distalisation
                      </span>
                    </label>
                    <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={
                        formData.deplacementsMaxillaire.deplacementMolaire.
                        asymetrique
                        }
                        onChange={(e) =>
                        setFormData({
                          ...formData,
                          deplacementsMaxillaire: {
                            ...formData.deplacementsMaxillaire,
                            deplacementMolaire: {
                              ...formData.deplacementsMaxillaire.
                              deplacementMolaire,
                              asymetrique: e.target.checked
                            }
                          }
                        })
                        }
                        className="mr-1 rounded text-purple-600 focus:ring-purple-500" />

                      <span className="text-gray-700 dark:text-gray-300">
                        Asymétrique
                      </span>
                    </label>
                  </div>
                </div>

                <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={
                    formData.deplacementsMaxillaire.expansionTransversale
                    }
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      deplacementsMaxillaire: {
                        ...formData.deplacementsMaxillaire,
                        expansionTransversale: e.target.checked
                      }
                    })
                    }
                    className="mr-2 rounded text-purple-600 focus:ring-purple-500" />

                  <span className="text-gray-700 dark:text-gray-300">
                    Expansion transversale
                  </span>
                </label>
                <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.deplacementsMaxillaire.torque}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      deplacementsMaxillaire: {
                        ...formData.deplacementsMaxillaire,
                        torque: e.target.checked
                      }
                    })
                    }
                    className="mr-2 rounded text-purple-600 focus:ring-purple-500" />

                  <span className="text-gray-700 dark:text-gray-300">
                    Torque
                  </span>
                </label>
              </div>
            </div>

            {/* Arcade mandibulaire */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <span className="h-2 w-2 rounded-full bg-purple-500 mr-2"></span>
                Arcade mandibulaire
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Repositionnement incisif :
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={
                        formData.deplacementsMandibulaire.
                        repositionnementIncisif.lingual
                        }
                        onChange={(e) =>
                        setFormData({
                          ...formData,
                          deplacementsMandibulaire: {
                            ...formData.deplacementsMandibulaire,
                            repositionnementIncisif: {
                              ...formData.deplacementsMandibulaire.
                              repositionnementIncisif,
                              lingual: e.target.checked
                            }
                          }
                        })
                        }
                        className="mr-1 rounded text-purple-600 focus:ring-purple-500" />

                      <span className="text-gray-700 dark:text-gray-300">
                        Lingual
                      </span>
                    </label>
                    <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={
                        formData.deplacementsMandibulaire.
                        repositionnementIncisif.ingression
                        }
                        onChange={(e) =>
                        setFormData({
                          ...formData,
                          deplacementsMandibulaire: {
                            ...formData.deplacementsMandibulaire,
                            repositionnementIncisif: {
                              ...formData.deplacementsMandibulaire.
                              repositionnementIncisif,
                              ingression: e.target.checked
                            }
                          }
                        })
                        }
                        className="mr-1 rounded text-purple-600 focus:ring-purple-500" />

                      <span className="text-gray-700 dark:text-gray-300">
                        Ingression
                      </span>
                    </label>
                    <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={
                        formData.deplacementsMandibulaire.
                        repositionnementIncisif.aucun
                        }
                        onChange={(e) =>
                        setFormData({
                          ...formData,
                          deplacementsMandibulaire: {
                            ...formData.deplacementsMandibulaire,
                            repositionnementIncisif: {
                              ...formData.deplacementsMandibulaire.
                              repositionnementIncisif,
                              aucun: e.target.checked
                            }
                          }
                        })
                        }
                        className="mr-1 rounded text-purple-600 focus:ring-purple-500" />

                      <span className="text-gray-700 dark:text-gray-300">
                        Aucun
                      </span>
                    </label>
                    <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={
                        formData.deplacementsMandibulaire.
                        repositionnementIncisif.egression
                        }
                        onChange={(e) =>
                        setFormData({
                          ...formData,
                          deplacementsMandibulaire: {
                            ...formData.deplacementsMandibulaire,
                            repositionnementIncisif: {
                              ...formData.deplacementsMandibulaire.
                              repositionnementIncisif,
                              egression: e.target.checked
                            }
                          }
                        })
                        }
                        className="mr-1 rounded text-purple-600 focus:ring-purple-500" />

                      <span className="text-gray-700 dark:text-gray-300">
                        Égression
                      </span>
                    </label>
                    <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={
                        formData.deplacementsMandibulaire.
                        repositionnementIncisif.vestibulaire
                        }
                        onChange={(e) =>
                        setFormData({
                          ...formData,
                          deplacementsMandibulaire: {
                            ...formData.deplacementsMandibulaire,
                            repositionnementIncisif: {
                              ...formData.deplacementsMandibulaire.
                              repositionnementIncisif,
                              vestibulaire: e.target.checked
                            }
                          }
                        })
                        }
                        className="mr-1 rounded text-purple-600 focus:ring-purple-500" />

                      <span className="text-gray-700 dark:text-gray-300">
                        Vestibulaire
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Déplacement molaire :
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={
                        formData.deplacementsMandibulaire.deplacementMolaire.
                        mesialisation
                        }
                        onChange={(e) =>
                        setFormData({
                          ...formData,
                          deplacementsMandibulaire: {
                            ...formData.deplacementsMandibulaire,
                            deplacementMolaire: {
                              ...formData.deplacementsMandibulaire.
                              deplacementMolaire,
                              mesialisation: e.target.checked
                            }
                          }
                        })
                        }
                        className="mr-1 rounded text-purple-600 focus:ring-purple-500" />

                      <span className="text-gray-700 dark:text-gray-300">
                        Mésialisation
                      </span>
                    </label>
                    <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={
                        formData.deplacementsMandibulaire.deplacementMolaire.
                        ingression
                        }
                        onChange={(e) =>
                        setFormData({
                          ...formData,
                          deplacementsMandibulaire: {
                            ...formData.deplacementsMandibulaire,
                            deplacementMolaire: {
                              ...formData.deplacementsMandibulaire.
                              deplacementMolaire,
                              ingression: e.target.checked
                            }
                          }
                        })
                        }
                        className="mr-1 rounded text-purple-600 focus:ring-purple-500" />

                      <span className="text-gray-700 dark:text-gray-300">
                        Ingression
                      </span>
                    </label>
                    <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={
                        formData.deplacementsMandibulaire.deplacementMolaire.
                        aucun
                        }
                        onChange={(e) =>
                        setFormData({
                          ...formData,
                          deplacementsMandibulaire: {
                            ...formData.deplacementsMandibulaire,
                            deplacementMolaire: {
                              ...formData.deplacementsMandibulaire.
                              deplacementMolaire,
                              aucun: e.target.checked
                            }
                          }
                        })
                        }
                        className="mr-1 rounded text-purple-600 focus:ring-purple-500" />

                      <span className="text-gray-700 dark:text-gray-300">
                        Aucun
                      </span>
                    </label>
                    <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={
                        formData.deplacementsMandibulaire.deplacementMolaire.
                        egression
                        }
                        onChange={(e) =>
                        setFormData({
                          ...formData,
                          deplacementsMandibulaire: {
                            ...formData.deplacementsMandibulaire,
                            deplacementMolaire: {
                              ...formData.deplacementsMandibulaire.
                              deplacementMolaire,
                              egression: e.target.checked
                            }
                          }
                        })
                        }
                        className="mr-1 rounded text-purple-600 focus:ring-purple-500" />

                      <span className="text-gray-700 dark:text-gray-300">
                        Égression
                      </span>
                    </label>
                    <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={
                        formData.deplacementsMandibulaire.deplacementMolaire.
                        distalisation
                        }
                        onChange={(e) =>
                        setFormData({
                          ...formData,
                          deplacementsMandibulaire: {
                            ...formData.deplacementsMandibulaire,
                            deplacementMolaire: {
                              ...formData.deplacementsMandibulaire.
                              deplacementMolaire,
                              distalisation: e.target.checked
                            }
                          }
                        })
                        }
                        className="mr-1 rounded text-purple-600 focus:ring-purple-500" />

                      <span className="text-gray-700 dark:text-gray-300">
                        Distalisation
                      </span>
                    </label>
                    <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={
                        formData.deplacementsMandibulaire.deplacementMolaire.
                        asymetrique
                        }
                        onChange={(e) =>
                        setFormData({
                          ...formData,
                          deplacementsMandibulaire: {
                            ...formData.deplacementsMandibulaire,
                            deplacementMolaire: {
                              ...formData.deplacementsMandibulaire.
                              deplacementMolaire,
                              asymetrique: e.target.checked
                            }
                          }
                        })
                        }
                        className="mr-1 rounded text-purple-600 focus:ring-purple-500" />

                      <span className="text-gray-700 dark:text-gray-300">
                        Asymétrique
                      </span>
                    </label>
                  </div>
                </div>

                <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={
                    formData.deplacementsMandibulaire.expansionTransversale
                    }
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      deplacementsMandibulaire: {
                        ...formData.deplacementsMandibulaire,
                        expansionTransversale: e.target.checked
                      }
                    })
                    }
                    className="mr-2 rounded text-purple-600 focus:ring-purple-500" />

                  <span className="text-gray-700 dark:text-gray-300">
                    Expansion transversale
                  </span>
                </label>
                <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.deplacementsMandibulaire.torque}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      deplacementsMandibulaire: {
                        ...formData.deplacementsMandibulaire,
                        torque: e.target.checked
                      }
                    })
                    }
                    className="mr-2 rounded text-purple-600 focus:ring-purple-500" />

                  <span className="text-gray-700 dark:text-gray-300">
                    Torque
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Type de traitement et Moyens */}
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
          delay: 0.3
        }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border-l-4 border-green-500 overflow-hidden">

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 px-6 py-4 border-b border-green-100 dark:border-green-800">
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mr-3 shadow-lg">
              <ClipboardCheckIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="block">2. Plan de traitement</span>
              <span className="text-xs font-normal text-gray-600 dark:text-gray-400">
                Type et moyens thérapeutiques
              </span>
            </div>
          </h3>
        </div>
        <div className="p-6 space-y-6">
          {/* 2.1 Type de traitement */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              2.1. Type de traitement
            </p>
            <div className="flex flex-wrap gap-2">
              <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-3 py-1.5 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={formData.typeTraitement.preventif}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    typeTraitement: {
                      ...formData.typeTraitement,
                      preventif: e.target.checked
                    }
                  })
                  }
                  className="mr-2 rounded text-green-600 focus:ring-green-500" />

                <span className="text-gray-700 dark:text-gray-300">
                  Préventif
                </span>
              </label>
              <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-3 py-1.5 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={formData.typeTraitement.fonctionnel}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    typeTraitement: {
                      ...formData.typeTraitement,
                      fonctionnel: e.target.checked
                    }
                  })
                  }
                  className="mr-2 rounded text-green-600 focus:ring-green-500" />

                <span className="text-gray-700 dark:text-gray-300">
                  Fonctionnel
                </span>
              </label>
              <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-3 py-1.5 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={formData.typeTraitement.interceptif}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    typeTraitement: {
                      ...formData.typeTraitement,
                      interceptif: e.target.checked
                    }
                  })
                  }
                  className="mr-2 rounded text-green-600 focus:ring-green-500" />

                <span className="text-gray-700 dark:text-gray-300">
                  Interceptif
                </span>
              </label>
              <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-3 py-1.5 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={formData.typeTraitement.orthopedique}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    typeTraitement: {
                      ...formData.typeTraitement,
                      orthopedique: e.target.checked
                    }
                  })
                  }
                  className="mr-2 rounded text-green-600 focus:ring-green-500" />

                <span className="text-gray-700 dark:text-gray-300">
                  Orthopédique
                </span>
              </label>
              <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-3 py-1.5 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={formData.typeTraitement.correctif}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    typeTraitement: {
                      ...formData.typeTraitement,
                      correctif: e.target.checked
                    }
                  })
                  }
                  className="mr-2 rounded text-green-600 focus:ring-green-500" />

                <span className="text-gray-700 dark:text-gray-300">
                  Correctif
                </span>
              </label>
              <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-3 py-1.5 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={formData.typeTraitement.orthodontique}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    typeTraitement: {
                      ...formData.typeTraitement,
                      orthodontique: e.target.checked
                    }
                  })
                  }
                  className="mr-2 rounded text-green-600 focus:ring-green-500" />

                <span className="text-gray-700 dark:text-gray-300">
                  Orthodontique
                </span>
              </label>
              <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-3 py-1.5 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={formData.typeTraitement.orthoChirurgie}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    typeTraitement: {
                      ...formData.typeTraitement,
                      orthoChirurgie: e.target.checked
                    }
                  })
                  }
                  className="mr-2 rounded text-green-600 focus:ring-green-500" />

                <span className="text-gray-700 dark:text-gray-300">
                  Ortho-chirurgie
                </span>
              </label>
              <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-3 py-1.5 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={formData.typeTraitement.orthoProthese}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    typeTraitement: {
                      ...formData.typeTraitement,
                      orthoProthese: e.target.checked
                    }
                  })
                  }
                  className="mr-2 rounded text-green-600 focus:ring-green-500" />

                <span className="text-gray-700 dark:text-gray-300">
                  Ortho-prothèse
                </span>
              </label>
              <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-3 py-1.5 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={formData.typeTraitement.orthoParo}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    typeTraitement: {
                      ...formData.typeTraitement,
                      orthoParo: e.target.checked
                    }
                  })
                  }
                  className="mr-2 rounded text-green-600 focus:ring-green-500" />

                <span className="text-gray-700 dark:text-gray-300">
                  Ortho-paro
                </span>
              </label>
            </div>
          </div>

          {/* 2.2 Moyens orthopédiques */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              2.2. Moyens orthopédiques
            </p>
            <div className="flex flex-wrap gap-2">
              <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-3 py-1.5 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={formData.moyensOrthopediques.disjoncteurMaxillaire}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    moyensOrthopediques: {
                      ...formData.moyensOrthopediques,
                      disjoncteurMaxillaire: e.target.checked
                    }
                  })
                  }
                  className="mr-2 rounded text-green-600 focus:ring-green-500" />

                <span className="text-gray-700 dark:text-gray-300">
                  Disjoncteur maxillaire
                </span>
              </label>
              <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-3 py-1.5 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={formData.moyensOrthopediques.EF}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    moyensOrthopediques: {
                      ...formData.moyensOrthopediques,
                      EF: e.target.checked
                    }
                  })
                  }
                  className="mr-2 rounded text-green-600 focus:ring-green-500" />

                <span className="text-gray-700 dark:text-gray-300">EF</span>
              </label>
              <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-3 py-1.5 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={formData.moyensOrthopediques.DGainer}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    moyensOrthopediques: {
                      ...formData.moyensOrthopediques,
                      DGainer: e.target.checked
                    }
                  })
                  }
                  className="mr-2 rounded text-green-600 focus:ring-green-500" />

                <span className="text-gray-700 dark:text-gray-300">
                  D.Gainer
                </span>
              </label>
              <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-3 py-1.5 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={formData.moyensOrthopediques.masqueDelaire}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    moyensOrthopediques: {
                      ...formData.moyensOrthopediques,
                      masqueDelaire: e.target.checked
                    }
                  })
                  }
                  className="mr-2 rounded text-green-600 focus:ring-green-500" />

                <span className="text-gray-700 dark:text-gray-300">
                  Masque de Delaire
                </span>
              </label>
              <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-3 py-1.5 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={formData.moyensOrthopediques.activateur}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    moyensOrthopediques: {
                      ...formData.moyensOrthopediques,
                      activateur: e.target.checked
                    }
                  })
                  }
                  className="mr-2 rounded text-green-600 focus:ring-green-500" />

                <span className="text-gray-700 dark:text-gray-300">
                  Activateur
                </span>
              </label>
              <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-3 py-1.5 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={formData.moyensOrthopediques.FEO}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    moyensOrthopediques: {
                      ...formData.moyensOrthopediques,
                      FEO: e.target.checked
                    }
                  })
                  }
                  className="mr-2 rounded text-green-600 focus:ring-green-500" />

                <span className="text-gray-700 dark:text-gray-300">FEO</span>
              </label>
              <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-3 py-1.5 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={formData.moyensOrthopediques.quadhelix}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    moyensOrthopediques: {
                      ...formData.moyensOrthopediques,
                      quadhelix: e.target.checked
                    }
                  })
                  }
                  className="mr-2 rounded text-green-600 focus:ring-green-500" />

                <span className="text-gray-700 dark:text-gray-300">
                  Quad-helix
                </span>
              </label>
            </div>
          </div>

          {/* 2.3 Moyens orthodontiques */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 space-y-4">
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              2.3. Moyens orthodontiques
            </p>

            {/* Appareil multi-attache */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Appareil multi-attache :
              </p>
              <div className="flex flex-wrap gap-2 ml-4">
                <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={
                    formData.moyensOrthodontiques.appareilMultiattache.global
                    }
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      moyensOrthodontiques: {
                        ...formData.moyensOrthodontiques,
                        appareilMultiattache: {
                          ...formData.moyensOrthodontiques.
                          appareilMultiattache,
                          global: e.target.checked
                        }
                      }
                    })
                    }
                    className="mr-1 rounded text-green-600 focus:ring-green-500" />

                  <span className="text-gray-700 dark:text-gray-300">
                    Global
                  </span>
                </label>
                <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={
                    formData.moyensOrthodontiques.appareilMultiattache.
                    sectoriel
                    }
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      moyensOrthodontiques: {
                        ...formData.moyensOrthodontiques,
                        appareilMultiattache: {
                          ...formData.moyensOrthodontiques.
                          appareilMultiattache,
                          sectoriel: e.target.checked
                        }
                      }
                    })
                    }
                    className="mr-1 rounded text-green-600 focus:ring-green-500" />

                  <span className="text-gray-700 dark:text-gray-300">
                    Sectoriel
                  </span>
                </label>
              </div>
            </div>

            {/* Arcade maxillaire */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Arcade maxillaire :
              </p>
              <div className="flex flex-wrap gap-2 ml-4">
                <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={
                    formData.moyensOrthodontiques.arcadeMaxillaire.metal
                    }
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      moyensOrthodontiques: {
                        ...formData.moyensOrthodontiques,
                        arcadeMaxillaire: {
                          ...formData.moyensOrthodontiques.arcadeMaxillaire,
                          metal: e.target.checked
                        }
                      }
                    })
                    }
                    className="mr-1 rounded text-green-600 focus:ring-green-500" />

                  <span className="text-gray-700 dark:text-gray-300">
                    Métal
                  </span>
                </label>
                <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={
                    formData.moyensOrthodontiques.arcadeMaxillaire.ceramique
                    }
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      moyensOrthodontiques: {
                        ...formData.moyensOrthodontiques,
                        arcadeMaxillaire: {
                          ...formData.moyensOrthodontiques.arcadeMaxillaire,
                          ceramique: e.target.checked
                        }
                      }
                    })
                    }
                    className="mr-1 rounded text-green-600 focus:ring-green-500" />

                  <span className="text-gray-700 dark:text-gray-300">
                    Céramique
                  </span>
                </label>
                <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={
                    formData.moyensOrthodontiques.arcadeMaxillaire.lingual
                    }
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      moyensOrthodontiques: {
                        ...formData.moyensOrthodontiques,
                        arcadeMaxillaire: {
                          ...formData.moyensOrthodontiques.arcadeMaxillaire,
                          lingual: e.target.checked
                        }
                      }
                    })
                    }
                    className="mr-1 rounded text-green-600 focus:ring-green-500" />

                  <span className="text-gray-700 dark:text-gray-300">
                    Lingual
                  </span>
                </label>
                <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={
                    formData.moyensOrthodontiques.arcadeMaxillaire.invisalign
                    }
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      moyensOrthodontiques: {
                        ...formData.moyensOrthodontiques,
                        arcadeMaxillaire: {
                          ...formData.moyensOrthodontiques.arcadeMaxillaire,
                          invisalign: e.target.checked
                        }
                      }
                    })
                    }
                    className="mr-1 rounded text-green-600 focus:ring-green-500" />

                  <span className="text-gray-700 dark:text-gray-300">
                    Invisalign
                  </span>
                </label>
              </div>
            </div>

            {/* Arcade mandibulaire */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Arcade mandibulaire :
              </p>
              <div className="flex flex-wrap gap-2 ml-4">
                <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={
                    formData.moyensOrthodontiques.arcadeMandibulaire.metal
                    }
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      moyensOrthodontiques: {
                        ...formData.moyensOrthodontiques,
                        arcadeMandibulaire: {
                          ...formData.moyensOrthodontiques.arcadeMandibulaire,
                          metal: e.target.checked
                        }
                      }
                    })
                    }
                    className="mr-1 rounded text-green-600 focus:ring-green-500" />

                  <span className="text-gray-700 dark:text-gray-300">
                    Métal
                  </span>
                </label>
                <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={
                    formData.moyensOrthodontiques.arcadeMandibulaire.ceramique
                    }
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      moyensOrthodontiques: {
                        ...formData.moyensOrthodontiques,
                        arcadeMandibulaire: {
                          ...formData.moyensOrthodontiques.arcadeMandibulaire,
                          ceramique: e.target.checked
                        }
                      }
                    })
                    }
                    className="mr-1 rounded text-green-600 focus:ring-green-500" />

                  <span className="text-gray-700 dark:text-gray-300">
                    Céramique
                  </span>
                </label>
                <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={
                    formData.moyensOrthodontiques.arcadeMandibulaire.lingual
                    }
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      moyensOrthodontiques: {
                        ...formData.moyensOrthodontiques,
                        arcadeMandibulaire: {
                          ...formData.moyensOrthodontiques.arcadeMandibulaire,
                          lingual: e.target.checked
                        }
                      }
                    })
                    }
                    className="mr-1 rounded text-green-600 focus:ring-green-500" />

                  <span className="text-gray-700 dark:text-gray-300">
                    Lingual
                  </span>
                </label>
                <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={
                    formData.moyensOrthodontiques.arcadeMandibulaire.
                    invisalign
                    }
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      moyensOrthodontiques: {
                        ...formData.moyensOrthodontiques,
                        arcadeMandibulaire: {
                          ...formData.moyensOrthodontiques.arcadeMandibulaire,
                          invisalign: e.target.checked
                        }
                      }
                    })
                    }
                    className="mr-1 rounded text-green-600 focus:ring-green-500" />

                  <span className="text-gray-700 dark:text-gray-300">
                    Invisalign
                  </span>
                </label>
              </div>
            </div>

            {/* Other orthodontic means */}
            <div className="space-y-2">
              <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={formData.moyensOrthodontiques.nivellementSupInf}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    moyensOrthodontiques: {
                      ...formData.moyensOrthodontiques,
                      nivellementSupInf: e.target.checked
                    }
                  })
                  }
                  className="mr-2 rounded text-green-600 focus:ring-green-500" />

                <span className="text-gray-700 dark:text-gray-300">
                  Nivellement sup/inf
                </span>
              </label>
              <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={formData.moyensOrthodontiques.expansionTransversale}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    moyensOrthodontiques: {
                      ...formData.moyensOrthodontiques,
                      expansionTransversale: e.target.checked
                    }
                  })
                  }
                  className="mr-2 rounded text-green-600 focus:ring-green-500" />

                <span className="text-gray-700 dark:text-gray-300">
                  Expansion transversale
                </span>
              </label>
              <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={formData.moyensOrthodontiques.correctionSupraclusion}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    moyensOrthodontiques: {
                      ...formData.moyensOrthodontiques,
                      correctionSupraclusion: e.target.checked
                    }
                  })
                  }
                  className="mr-2 rounded text-green-600 focus:ring-green-500" />

                <span className="text-gray-700 dark:text-gray-300">
                  Correction supraclusion
                </span>
              </label>
              <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={formData.moyensOrthodontiques.tractionsDentsIncluses}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    moyensOrthodontiques: {
                      ...formData.moyensOrthodontiques,
                      tractionsDentsIncluses: e.target.checked
                    }
                  })
                  }
                  className="mr-2 rounded text-green-600 focus:ring-green-500" />

                <span className="text-gray-700 dark:text-gray-300">
                  Tractions dents incluses
                </span>
              </label>
              <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={
                  formData.moyensOrthodontiques.intercuspidationClasse1
                  }
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    moyensOrthodontiques: {
                      ...formData.moyensOrthodontiques,
                      intercuspidationClasse1: e.target.checked
                    }
                  })
                  }
                  className="mr-2 rounded text-green-600 focus:ring-green-500" />

                <span className="text-gray-700 dark:text-gray-300">
                  Intercuspidation classe I
                </span>
              </label>
              <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={formData.moyensOrthodontiques.forsus}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    moyensOrthodontiques: {
                      ...formData.moyensOrthodontiques,
                      forsus: e.target.checked
                    }
                  })
                  }
                  className="mr-2 rounded text-green-600 focus:ring-green-500" />

                <span className="text-gray-700 dark:text-gray-300">Forsus</span>
              </label>
            </div>

            {/* Mini-implants */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Mini-implants :
              </p>
              <div className="flex flex-wrap gap-2 ml-4">
                <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={
                    formData.moyensOrthodontiques.miniImplants.maxillaires
                    }
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      moyensOrthodontiques: {
                        ...formData.moyensOrthodontiques,
                        miniImplants: {
                          ...formData.moyensOrthodontiques.miniImplants,
                          maxillaires: e.target.checked
                        }
                      }
                    })
                    }
                    className="mr-1 rounded text-green-600 focus:ring-green-500" />

                  <span className="text-gray-700 dark:text-gray-300">
                    Maxillaires
                  </span>
                </label>
                <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={
                    formData.moyensOrthodontiques.miniImplants.mandibulaires
                    }
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      moyensOrthodontiques: {
                        ...formData.moyensOrthodontiques,
                        miniImplants: {
                          ...formData.moyensOrthodontiques.miniImplants,
                          mandibulaires: e.target.checked
                        }
                      }
                    })
                    }
                    className="mr-1 rounded text-green-600 focus:ring-green-500" />

                  <span className="text-gray-700 dark:text-gray-300">
                    Mandibulaires
                  </span>
                </label>
              </div>
            </div>

            {/* Extractions */}
            <div>
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-2">
                Extractions (numéros des dents) :
              </label>
              <input
                type="text"
                value={formData.moyensOrthodontiques.extractions}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  moyensOrthodontiques: {
                    ...formData.moyensOrthodontiques,
                    extractions: e.target.value
                  }
                })
                }
                placeholder="Ex: 14, 24, 34, 44"
                className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-green-500 dark:focus:border-green-400" />

            </div>

            {/* Germectomie */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Germectomie :
              </p>
              <div className="flex flex-wrap gap-2 ml-4">
                <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.moyensOrthodontiques.germectomie.oui}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      moyensOrthodontiques: {
                        ...formData.moyensOrthodontiques,
                        germectomie: {
                          ...formData.moyensOrthodontiques.germectomie,
                          oui: e.target.checked
                        }
                      }
                    })
                    }
                    className="mr-1 rounded text-green-600 focus:ring-green-500" />

                  <span className="text-gray-700 dark:text-gray-300">Oui</span>
                </label>
                <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={
                    formData.moyensOrthodontiques.germectomie.aSurveiller
                    }
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      moyensOrthodontiques: {
                        ...formData.moyensOrthodontiques,
                        germectomie: {
                          ...formData.moyensOrthodontiques.germectomie,
                          aSurveiller: e.target.checked
                        }
                      }
                    })
                    }
                    className="mr-1 rounded text-green-600 focus:ring-green-500" />

                  <span className="text-gray-700 dark:text-gray-300">
                    À surveiller
                  </span>
                </label>
              </div>
            </div>

            {/* Réduction amélaire */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Réduction amélaire :
              </p>
              <div className="ml-4 space-y-2">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">
                    Maxillaire :
                  </p>
                  <div className="flex flex-wrap gap-2 ml-2">
                    <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={
                        formData.moyensOrthodontiques.reductionAmelaire.
                        maxillaire.anterieure
                        }
                        onChange={(e) =>
                        setFormData({
                          ...formData,
                          moyensOrthodontiques: {
                            ...formData.moyensOrthodontiques,
                            reductionAmelaire: {
                              ...formData.moyensOrthodontiques.
                              reductionAmelaire,
                              maxillaire: {
                                ...formData.moyensOrthodontiques.
                                reductionAmelaire.maxillaire,
                                anterieure: e.target.checked
                              }
                            }
                          }
                        })
                        }
                        className="mr-1 rounded text-green-600 focus:ring-green-500" />

                      <span className="text-gray-700 dark:text-gray-300">
                        Antérieure
                      </span>
                    </label>
                    <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={
                        formData.moyensOrthodontiques.reductionAmelaire.
                        maxillaire.posterieure
                        }
                        onChange={(e) =>
                        setFormData({
                          ...formData,
                          moyensOrthodontiques: {
                            ...formData.moyensOrthodontiques,
                            reductionAmelaire: {
                              ...formData.moyensOrthodontiques.
                              reductionAmelaire,
                              maxillaire: {
                                ...formData.moyensOrthodontiques.
                                reductionAmelaire.maxillaire,
                                posterieure: e.target.checked
                              }
                            }
                          }
                        })
                        }
                        className="mr-1 rounded text-green-600 focus:ring-green-500" />

                      <span className="text-gray-700 dark:text-gray-300">
                        Postérieure
                      </span>
                    </label>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">
                    Mandibulaire :
                  </p>
                  <div className="flex flex-wrap gap-2 ml-2">
                    <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={
                        formData.moyensOrthodontiques.reductionAmelaire.
                        mandibulaire.anterieure
                        }
                        onChange={(e) =>
                        setFormData({
                          ...formData,
                          moyensOrthodontiques: {
                            ...formData.moyensOrthodontiques,
                            reductionAmelaire: {
                              ...formData.moyensOrthodontiques.
                              reductionAmelaire,
                              mandibulaire: {
                                ...formData.moyensOrthodontiques.
                                reductionAmelaire.mandibulaire,
                                anterieure: e.target.checked
                              }
                            }
                          }
                        })
                        }
                        className="mr-1 rounded text-green-600 focus:ring-green-500" />

                      <span className="text-gray-700 dark:text-gray-300">
                        Antérieure
                      </span>
                    </label>
                    <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={
                        formData.moyensOrthodontiques.reductionAmelaire.
                        mandibulaire.posterieure
                        }
                        onChange={(e) =>
                        setFormData({
                          ...formData,
                          moyensOrthodontiques: {
                            ...formData.moyensOrthodontiques,
                            reductionAmelaire: {
                              ...formData.moyensOrthodontiques.
                              reductionAmelaire,
                              mandibulaire: {
                                ...formData.moyensOrthodontiques.
                                reductionAmelaire.mandibulaire,
                                posterieure: e.target.checked
                              }
                            }
                          }
                        })
                        }
                        className="mr-1 rounded text-green-600 focus:ring-green-500" />

                      <span className="text-gray-700 dark:text-gray-300">
                        Postérieure
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Meulage temporaires */}
            <div>
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-2">
                Meulage temporaires (numéros des dents) :
              </label>
              <input
                type="text"
                value={formData.moyensOrthodontiques.meulageTemporaires}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  moyensOrthodontiques: {
                    ...formData.moyensOrthodontiques,
                    meulageTemporaires: e.target.value
                  }
                })
                }
                placeholder="Ex: 54, 64, 74, 84"
                className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-green-500 dark:focus:border-green-400" />

            </div>

            {/* Multidisciplinaire */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Multidisciplinaire :
              </p>
              <div className="space-y-2 ml-4">
                <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={
                    formData.moyensOrthodontiques.multidisciplinaire.
                    bilanFonctionnel
                    }
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      moyensOrthodontiques: {
                        ...formData.moyensOrthodontiques,
                        multidisciplinaire: {
                          ...formData.moyensOrthodontiques.multidisciplinaire,
                          bilanFonctionnel: e.target.checked
                        }
                      }
                    })
                    }
                    className="mr-2 rounded text-green-600 focus:ring-green-500" />

                  <span className="text-gray-700 dark:text-gray-300">
                    Bilan fonctionnel
                  </span>
                </label>
                <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={
                    formData.moyensOrthodontiques.multidisciplinaire.
                    consultationORL
                    }
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      moyensOrthodontiques: {
                        ...formData.moyensOrthodontiques,
                        multidisciplinaire: {
                          ...formData.moyensOrthodontiques.multidisciplinaire,
                          consultationORL: e.target.checked
                        }
                      }
                    })
                    }
                    className="mr-2 rounded text-green-600 focus:ring-green-500" />

                  <span className="text-gray-700 dark:text-gray-300">
                    Consultation ORL
                  </span>
                </label>
                <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={
                    formData.moyensOrthodontiques.multidisciplinaire.
                    traitementParodontal
                    }
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      moyensOrthodontiques: {
                        ...formData.moyensOrthodontiques,
                        multidisciplinaire: {
                          ...formData.moyensOrthodontiques.multidisciplinaire,
                          traitementParodontal: e.target.checked
                        }
                      }
                    })
                    }
                    className="mr-2 rounded text-green-600 focus:ring-green-500" />

                  <span className="text-gray-700 dark:text-gray-300">
                    Traitement parodontal
                  </span>
                </label>
                <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={
                    formData.moyensOrthodontiques.multidisciplinaire.soinsOCE
                    }
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      moyensOrthodontiques: {
                        ...formData.moyensOrthodontiques,
                        multidisciplinaire: {
                          ...formData.moyensOrthodontiques.multidisciplinaire,
                          soinsOCE: e.target.checked
                        }
                      }
                    })
                    }
                    className="mr-2 rounded text-green-600 focus:ring-green-500" />

                  <span className="text-gray-700 dark:text-gray-300">
                    Soins OCE
                  </span>
                </label>
                <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={
                    formData.moyensOrthodontiques.multidisciplinaire.
                    desinclusion
                    }
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      moyensOrthodontiques: {
                        ...formData.moyensOrthodontiques,
                        multidisciplinaire: {
                          ...formData.moyensOrthodontiques.multidisciplinaire,
                          desinclusion: e.target.checked
                        }
                      }
                    })
                    }
                    className="mr-2 rounded text-green-600 focus:ring-green-500" />

                  <span className="text-gray-700 dark:text-gray-300">
                    Désinclusion
                  </span>
                </label>
                <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={
                    formData.moyensOrthodontiques.multidisciplinaire.
                    rehabilitationProthetique
                    }
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      moyensOrthodontiques: {
                        ...formData.moyensOrthodontiques,
                        multidisciplinaire: {
                          ...formData.moyensOrthodontiques.multidisciplinaire,
                          rehabilitationProthetique: e.target.checked
                        }
                      }
                    })
                    }
                    className="mr-2 rounded text-green-600 focus:ring-green-500" />

                  <span className="text-gray-700 dark:text-gray-300">
                    Réhabilitation prothétique
                  </span>
                </label>
                <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={
                    formData.moyensOrthodontiques.multidisciplinaire.
                    consultationChirurgie
                    }
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      moyensOrthodontiques: {
                        ...formData.moyensOrthodontiques,
                        multidisciplinaire: {
                          ...formData.moyensOrthodontiques.multidisciplinaire,
                          consultationChirurgie: e.target.checked
                        }
                      }
                    })
                    }
                    className="mr-2 rounded text-green-600 focus:ring-green-500" />

                  <span className="text-gray-700 dark:text-gray-300">
                    Consultation chirurgie
                  </span>
                </label>
              </div>
            </div>

            {/* Contention */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Contention :
              </p>
              <div className="ml-4 space-y-2">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">
                    Maxillaire :
                  </p>
                  <div className="flex flex-wrap gap-2 ml-2">
                    <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={
                        formData.moyensOrthodontiques.contention.maxillaire.
                        fixe
                        }
                        onChange={(e) =>
                        setFormData({
                          ...formData,
                          moyensOrthodontiques: {
                            ...formData.moyensOrthodontiques,
                            contention: {
                              ...formData.moyensOrthodontiques.contention,
                              maxillaire: {
                                ...formData.moyensOrthodontiques.contention.
                                maxillaire,
                                fixe: e.target.checked
                              }
                            }
                          }
                        })
                        }
                        className="mr-1 rounded text-green-600 focus:ring-green-500" />

                      <span className="text-gray-700 dark:text-gray-300">
                        Fixe
                      </span>
                    </label>
                    <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={
                        formData.moyensOrthodontiques.contention.maxillaire.
                        amovible
                        }
                        onChange={(e) =>
                        setFormData({
                          ...formData,
                          moyensOrthodontiques: {
                            ...formData.moyensOrthodontiques,
                            contention: {
                              ...formData.moyensOrthodontiques.contention,
                              maxillaire: {
                                ...formData.moyensOrthodontiques.contention.
                                maxillaire,
                                amovible: e.target.checked
                              }
                            }
                          }
                        })
                        }
                        className="mr-1 rounded text-green-600 focus:ring-green-500" />

                      <span className="text-gray-700 dark:text-gray-300">
                        Amovible
                      </span>
                    </label>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">
                    Mandibulaire :
                  </p>
                  <div className="flex flex-wrap gap-2 ml-2">
                    <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={
                        formData.moyensOrthodontiques.contention.mandibulaire.
                        fixe
                        }
                        onChange={(e) =>
                        setFormData({
                          ...formData,
                          moyensOrthodontiques: {
                            ...formData.moyensOrthodontiques,
                            contention: {
                              ...formData.moyensOrthodontiques.contention,
                              mandibulaire: {
                                ...formData.moyensOrthodontiques.contention.
                                mandibulaire,
                                fixe: e.target.checked
                              }
                            }
                          }
                        })
                        }
                        className="mr-1 rounded text-green-600 focus:ring-green-500" />

                      <span className="text-gray-700 dark:text-gray-300">
                        Fixe
                      </span>
                    </label>
                    <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={
                        formData.moyensOrthodontiques.contention.mandibulaire.
                        amovible
                        }
                        onChange={(e) =>
                        setFormData({
                          ...formData,
                          moyensOrthodontiques: {
                            ...formData.moyensOrthodontiques,
                            contention: {
                              ...formData.moyensOrthodontiques.contention,
                              mandibulaire: {
                                ...formData.moyensOrthodontiques.contention.
                                mandibulaire,
                                amovible: e.target.checked
                              }
                            }
                          }
                        })
                        }
                        className="mr-1 rounded text-green-600 focus:ring-green-500" />

                      <span className="text-gray-700 dark:text-gray-300">
                        Amovible
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Phases de traitement */}
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
          delay: 0.4
        }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border-l-4 border-amber-500 overflow-hidden">

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 px-6 py-4 border-b border-amber-100 dark:border-amber-800">
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mr-3 shadow-lg">
              <ClipboardCheckIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="block">3. Phases de traitement</span>
              <span className="text-xs font-normal text-gray-600 dark:text-gray-400">
                Séquence thérapeutique
              </span>
            </div>
          </h3>
        </div>
        <div className="p-6">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 space-y-4">
            <div className="flex flex-wrap gap-2">
              <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-3 py-1.5 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={formData.phasesTraitement.interception}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    phasesTraitement: {
                      ...formData.phasesTraitement,
                      interception: e.target.checked
                    }
                  })
                  }
                  className="mr-2 rounded text-amber-600 focus:ring-amber-500" />

                <span className="text-gray-700 dark:text-gray-300">
                  Interception - Réévaluation - Surveillance
                </span>
              </label>
              <label className="flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-3 py-1.5 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={formData.phasesTraitement.preparation}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    phasesTraitement: {
                      ...formData.phasesTraitement,
                      preparation: e.target.checked
                    }
                  })
                  }
                  className="mr-2 rounded text-amber-600 focus:ring-amber-500" />

                <span className="text-gray-700 dark:text-gray-300">
                  Préparation - Évaluation - Suivi
                </span>
              </label>
            </div>
            <textarea
              className="w-full px-4 py-3 text-sm border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all resize-none"
              rows={3}
              placeholder="Détails des phases..." />

            <div>
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-2">
                Durée prévisible estimée du traitement (en mois) :
              </label>
              <input
                type="number"
                value={formData.phasesTraitement.dureeEstimee}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  phasesTraitement: {
                    ...formData.phasesTraitement,
                    dureeEstimee: e.target.value
                  }
                })
                }
                className="w-full px-3 py-2 text-sm border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all"
                placeholder="Nombre de mois" />

            </div>
          </div>
        </div>
      </motion.div>
    </div>);

};
export default TreatmentPlans;