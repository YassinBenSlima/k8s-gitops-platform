import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  FileTextIcon,
  UserIcon,
  DollarSignIcon,
  CheckIcon,
  ChevronRightIcon,
  SaveIcon,
  XIcon,
  CalendarIcon,
  ShieldIcon,
  PlusIcon,
  TrashIcon } from
'lucide-react';
const steps = [
{
  id: 1,
  label: 'Parties',
  icon: UserIcon
},
{
  id: 2,
  label: 'Conditions',
  icon: FileTextIcon
},
{
  id: 3,
  label: 'Rémunération',
  icon: DollarSignIcon
},
{
  id: 4,
  label: 'Clauses',
  icon: ShieldIcon
},
{
  id: 5,
  label: 'Signature',
  icon: CheckIcon
}];

export function NouveauContrat() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [clauses, setClauses] = useState([
  {
    titre: 'Clause de confidentialité',
    contenu:
    "L'employé s'engage à maintenir la confidentialité des informations patients."
  },
  {
    titre: 'Clause de non-concurrence',
    contenu:
    'Pendant 12 mois après la fin du contrat, dans un rayon de 50 km.'
  }]
  );
  const [formData, setFormData] = useState({
    employe: '',
    employeur: 'Clinique Médicale Al-Shifa',
    typeContrat: 'CDI',
    dateDebut: '',
    dateFin: '',
    periodeEssai: '3',
    lieuTravail: '',
    horaire: '40h/semaine',
    joursConge: '30',
    salaireBrut: '',
    primes: '',
    avantages: '',
    devise: 'TND',
    periodicite: 'Mensuel',
    signatureEmploye: false,
    signatureEmployeur: false,
    dateSignature: '',
    lieu: ''
  });
  const update = (field: string, value: string | boolean) =>
  setFormData((prev) => ({
    ...prev,
    [field]: value
  }));
  const inputCls =
  'w-full text-xs border border-gray-200 rounded px-2 py-1 h-7 focus:outline-none focus:border-blue-400 bg-white';
  const selectCls =
  'w-full text-xs border border-gray-200 rounded px-2 py-1 h-7 focus:outline-none focus:border-blue-400 bg-white';
  const labelCls = 'text-xs text-gray-500 mb-0.5 block';
  const sectionTitleCls =
  'text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2';
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="p-1 hover:bg-gray-100 rounded text-gray-500">

            <ArrowLeftIcon className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-sm font-semibold text-gray-900">
              Nouveau Contrat
            </h1>
            <p className="text-xs text-gray-500">
              Étape {currentStep} sur {steps.length}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-xs border border-gray-200 text-gray-600 px-2.5 py-1 rounded hover:bg-gray-50">

            <XIcon className="w-3 h-3" /> Annuler
          </button>
          <button className="flex items-center gap-1 text-xs bg-blue-600 text-white px-2.5 py-1 rounded hover:bg-blue-700">
            <SaveIcon className="w-3 h-3" /> Enregistrer
          </button>
        </div>
      </div>

      <div className="p-3 max-w-4xl mx-auto">
        {/* Steps */}
        <div className="bg-white rounded-lg border border-gray-200 p-3 mb-3">
          <div className="flex items-center justify-between">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isDone = currentStep > step.id;
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium ${isActive ? 'bg-blue-50 text-blue-700' : isDone ? 'text-green-600' : 'text-gray-400'}`}>

                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${isActive ? 'bg-blue-600 text-white' : isDone ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>

                      {isDone ? <CheckIcon className="w-3 h-3" /> : step.id}
                    </div>
                    <span className="hidden sm:block">{step.label}</span>
                  </button>
                  {idx < steps.length - 1 &&
                  <div
                    className={`flex-1 h-px mx-1 ${isDone ? 'bg-green-300' : 'bg-gray-200'}`} />

                  }
                </div>);

            })}
          </div>
        </div>

        {/* Step 1: Parties */}
        {currentStep === 1 &&
        <div className="space-y-3">
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className={sectionTitleCls}>Employeur</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className={labelCls}>Raison sociale *</label>
                  <input
                  className={inputCls}
                  value={formData.employeur}
                  onChange={(e) => update('employeur', e.target.value)} />

                </div>
                <div>
                  <label className={labelCls}>Matricule fiscal</label>
                  <input className={inputCls} placeholder="0000000/A/M/000" />
                </div>
                <div>
                  <label className={labelCls}>Représentant légal</label>
                  <input className={inputCls} placeholder="Nom du directeur" />
                </div>
                <div>
                  <label className={labelCls}>Qualité</label>
                  <input className={inputCls} placeholder="Directeur général" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className={sectionTitleCls}>Employé</p>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className={labelCls}>Employé *</label>
                  <select
                  className={selectCls}
                  value={formData.employe}
                  onChange={(e) => update('employe', e.target.value)}>

                    <option value="">Sélectionner</option>
                    <option>Dr. Ahmed Ben Ali</option>
                    <option>Inf. Sara Mansouri</option>
                    <option>Tech. Karim Jlassi</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Poste</label>
                  <input className={inputCls} placeholder="Titre du poste" />
                </div>
                <div>
                  <label className={labelCls}>Département</label>
                  <input className={inputCls} placeholder="Département" />
                </div>
              </div>
            </div>
          </div>
        }

        {/* Step 2: Conditions */}
        {currentStep === 2 &&
        <div className="space-y-3">
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className={sectionTitleCls}>Type et durée</p>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className={labelCls}>Type de contrat *</label>
                  <select
                  className={selectCls}
                  value={formData.typeContrat}
                  onChange={(e) => update('typeContrat', e.target.value)}>

                    <option>CDI</option>
                    <option>CDD</option>
                    <option>Temps partiel</option>
                    <option>Vacation</option>
                    <option>Stage</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Date de début *</label>
                  <input
                  type="date"
                  className={inputCls}
                  value={formData.dateDebut}
                  onChange={(e) => update('dateDebut', e.target.value)} />

                </div>
                <div>
                  <label className={labelCls}>
                    Date de fin {formData.typeContrat === 'CDD' ? '*' : ''}
                  </label>
                  <input
                  type="date"
                  className={inputCls}
                  value={formData.dateFin}
                  onChange={(e) => update('dateFin', e.target.value)}
                  disabled={formData.typeContrat === 'CDI'} />

                </div>
                <div>
                  <label className={labelCls}>Période d'essai (mois)</label>
                  <input
                  type="number"
                  className={inputCls}
                  value={formData.periodeEssai}
                  onChange={(e) => update('periodeEssai', e.target.value)} />

                </div>
                <div>
                  <label className={labelCls}>Lieu de travail</label>
                  <input
                  className={inputCls}
                  placeholder="Clinique principale"
                  value={formData.lieuTravail}
                  onChange={(e) => update('lieuTravail', e.target.value)} />

                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className={sectionTitleCls}>Conditions de travail</p>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className={labelCls}>Horaire de travail</label>
                  <select
                  className={selectCls}
                  value={formData.horaire}
                  onChange={(e) => update('horaire', e.target.value)}>

                    <option>40h/semaine</option>
                    <option>35h/semaine</option>
                    <option>20h/semaine</option>
                    <option>Garde</option>
                    <option>Flexible</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Jours de congé/an</label>
                  <input
                  type="number"
                  className={inputCls}
                  value={formData.joursConge}
                  onChange={(e) => update('joursConge', e.target.value)} />

                </div>
              </div>
            </div>
          </div>
        }

        {/* Step 3: Rémunération */}
        {currentStep === 3 &&
        <div className="space-y-3">
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className={sectionTitleCls}>Salaire</p>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className={labelCls}>Salaire brut *</label>
                  <input
                  type="number"
                  className={inputCls}
                  placeholder="0.000"
                  value={formData.salaireBrut}
                  onChange={(e) => update('salaireBrut', e.target.value)} />

                </div>
                <div>
                  <label className={labelCls}>Devise</label>
                  <select
                  className={selectCls}
                  value={formData.devise}
                  onChange={(e) => update('devise', e.target.value)}>

                    <option>TND</option>
                    <option>EUR</option>
                    <option>USD</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Périodicité</label>
                  <select
                  className={selectCls}
                  value={formData.periodicite}
                  onChange={(e) => update('periodicite', e.target.value)}>

                    <option>Mensuel</option>
                    <option>Bimensuel</option>
                    <option>Hebdomadaire</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className={sectionTitleCls}>Avantages & Primes</p>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelCls}>Primes</label>
                  <textarea
                  className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 h-14 focus:outline-none focus:border-blue-400 bg-white resize-none"
                  placeholder="Prime de rendement, prime d'ancienneté..."
                  value={formData.primes}
                  onChange={(e) => update('primes', e.target.value)} />

                </div>
                <div>
                  <label className={labelCls}>Avantages en nature</label>
                  <textarea
                  className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 h-14 focus:outline-none focus:border-blue-400 bg-white resize-none"
                  placeholder="Véhicule, logement, tickets repas..."
                  value={formData.avantages}
                  onChange={(e) => update('avantages', e.target.value)} />

                </div>
              </div>
            </div>
          </div>
        }

        {/* Step 4: Clauses */}
        {currentStep === 4 &&
        <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between mb-2">
              <p className={sectionTitleCls}>Clauses contractuelles</p>
              <button
              onClick={() =>
              setClauses((prev) => [
              ...prev,
              {
                titre: '',
                contenu: ''
              }]
              )
              }
              className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700">

                <PlusIcon className="w-3 h-3" /> Ajouter
              </button>
            </div>
            <div className="space-y-2">
              {clauses.map((clause, i) =>
            <div
              key={i}
              className="bg-gray-50 rounded p-2 border border-gray-200">

                  <div className="flex items-center gap-2 mb-1.5">
                    <input
                  className={`${inputCls} flex-1`}
                  placeholder="Titre de la clause"
                  value={clause.titre}
                  onChange={(e) => {
                    const updated = [...clauses];
                    updated[i].titre = e.target.value;
                    setClauses(updated);
                  }} />

                    <button
                  onClick={() =>
                  setClauses((prev) => prev.filter((_, idx) => idx !== i))
                  }
                  className="p-1 text-red-400 hover:text-red-600">

                      <TrashIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <textarea
                className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 h-14 focus:outline-none focus:border-blue-400 bg-white resize-none"
                placeholder="Contenu de la clause..."
                value={clause.contenu}
                onChange={(e) => {
                  const updated = [...clauses];
                  updated[i].contenu = e.target.value;
                  setClauses(updated);
                }} />

                </div>
            )}
            </div>
          </div>
        }

        {/* Step 5: Signature */}
        {currentStep === 5 &&
        <div className="space-y-3">
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className={sectionTitleCls}>Informations de signature</p>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelCls}>Date de signature</label>
                  <input
                  type="date"
                  className={inputCls}
                  value={formData.dateSignature}
                  onChange={(e) => update('dateSignature', e.target.value)} />

                </div>
                <div>
                  <label className={labelCls}>Lieu de signature</label>
                  <input
                  className={inputCls}
                  placeholder="Tunis"
                  value={formData.lieu}
                  onChange={(e) => update('lieu', e.target.value)} />

                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className={sectionTitleCls}>Signatures</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-gray-200 rounded p-3 text-center">
                  <p className="text-xs text-gray-500 mb-2">
                    Signature de l'employé
                  </p>
                  <div className="h-16 bg-gray-50 rounded border border-dashed border-gray-300 flex items-center justify-center mb-2">
                    <p className="text-xs text-gray-400">Zone de signature</p>
                  </div>
                  <label className="flex items-center justify-center gap-2 cursor-pointer">
                    <input
                    type="checkbox"
                    className="w-3.5 h-3.5"
                    checked={formData.signatureEmploye}
                    onChange={(e) =>
                    update('signatureEmploye', e.target.checked)
                    } />

                    <span className="text-xs text-gray-600">
                      Signé par l'employé
                    </span>
                  </label>
                </div>
                <div className="border border-gray-200 rounded p-3 text-center">
                  <p className="text-xs text-gray-500 mb-2">
                    Signature de l'employeur
                  </p>
                  <div className="h-16 bg-gray-50 rounded border border-dashed border-gray-300 flex items-center justify-center mb-2">
                    <p className="text-xs text-gray-400">Zone de signature</p>
                  </div>
                  <label className="flex items-center justify-center gap-2 cursor-pointer">
                    <input
                    type="checkbox"
                    className="w-3.5 h-3.5"
                    checked={formData.signatureEmployeur}
                    onChange={(e) =>
                    update('signatureEmployeur', e.target.checked)
                    } />

                    <span className="text-xs text-gray-600">
                      Signé par l'employeur
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        }

        {/* Navigation */}
        <div className="flex items-center justify-between mt-3 bg-white rounded-lg border border-gray-200 p-3">
          <button
            onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
            disabled={currentStep === 1}
            className="flex items-center gap-1 text-xs border border-gray-200 text-gray-600 px-3 py-1.5 rounded hover:bg-gray-50 disabled:opacity-40">

            <ArrowLeftIcon className="w-3 h-3" /> Précédent
          </button>
          <span className="text-xs text-gray-400">
            {currentStep} / {steps.length}
          </span>
          {currentStep < steps.length ?
          <button
            onClick={() =>
            setCurrentStep((s) => Math.min(steps.length, s + 1))
            }
            className="flex items-center gap-1 text-xs bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700">

              Suivant <ChevronRightIcon className="w-3 h-3" />
            </button> :

          <button className="flex items-center gap-1 text-xs bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700">
              <CheckIcon className="w-3 h-3" /> Finaliser le contrat
            </button>
          }
        </div>
      </div>
    </div>);

}
export default NouveauContrat;