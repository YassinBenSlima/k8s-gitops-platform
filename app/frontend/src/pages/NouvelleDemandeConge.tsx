import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  CalendarIcon,
  UserIcon,
  FileTextIcon,
  CheckIcon,
  ChevronRightIcon,
  SaveIcon,
  XIcon,
  ClipboardListIcon,
  InfoIcon } from
'lucide-react';
const steps = [
{
  id: 1,
  label: 'Demande',
  icon: CalendarIcon
},
{
  id: 2,
  label: 'Détails',
  icon: FileTextIcon
},
{
  id: 3,
  label: 'Validation',
  icon: CheckIcon
}];

const leaveTypes = [
{
  value: 'annuel',
  label: 'Congé annuel',
  color: 'bg-blue-100 text-blue-700',
  solde: 18
},
{
  value: 'maladie',
  label: 'Congé maladie',
  color: 'bg-red-100 text-red-700',
  solde: 15
},
{
  value: 'maternite',
  label: 'Congé maternité',
  color: 'bg-pink-100 text-pink-700',
  solde: 60
},
{
  value: 'paternite',
  label: 'Congé paternité',
  color: 'bg-indigo-100 text-indigo-700',
  solde: 3
},
{
  value: 'formation',
  label: 'Congé formation',
  color: 'bg-green-100 text-green-700',
  solde: 10
},
{
  value: 'sans_solde',
  label: 'Sans solde',
  color: 'bg-gray-100 text-gray-700',
  solde: 0
}];

export function NouvelleDemandeConge() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    employe: '',
    typeConge: 'annuel',
    dateDebut: '',
    dateFin: '',
    motif: '',
    justificatif: false,
    commentaire: '',
    urgence: false,
    remplacant: ''
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
  const selectedType = leaveTypes.find((t) => t.value === formData.typeConge);
  const calcDays = () => {
    if (!formData.dateDebut || !formData.dateFin) return 0;
    const d1 = new Date(formData.dateDebut);
    const d2 = new Date(formData.dateFin);
    const diff =
    Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return Math.max(0, diff);
  };
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
              Nouvelle Demande de Congé
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

      <div className="p-3 max-w-3xl mx-auto">
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

        {/* Step 1 */}
        {currentStep === 1 &&
        <div className="space-y-3">
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className={sectionTitleCls}>Employé & Type de congé</p>
              <div className="grid grid-cols-2 gap-2 mb-3">
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
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer bg-red-50 border border-red-100 rounded px-2 py-1.5 w-full">
                    <input
                    type="checkbox"
                    className="w-3.5 h-3.5"
                    checked={formData.urgence}
                    onChange={(e) => update('urgence', e.target.checked)} />

                    <span className="text-xs text-red-700 font-medium">
                      Urgence
                    </span>
                  </label>
                </div>
              </div>
              <p className={labelCls}>Type de congé *</p>
              <div className="grid grid-cols-3 gap-2">
                {leaveTypes.map((type) =>
              <label
                key={type.value}
                className={`flex items-center justify-between cursor-pointer rounded p-2 border text-xs transition-colors ${formData.typeConge === type.value ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-gray-50 hover:border-gray-300'}`}>

                    <div className="flex items-center gap-1.5">
                      <input
                    type="radio"
                    name="typeConge"
                    value={type.value}
                    checked={formData.typeConge === type.value}
                    onChange={() => update('typeConge', type.value)}
                    className="w-3 h-3" />

                      <span
                    className={
                    formData.typeConge === type.value ?
                    'text-blue-700 font-medium' :
                    'text-gray-700'
                    }>

                        {type.label}
                      </span>
                    </div>
                    {type.solde > 0 &&
                <span
                  className={`text-xs px-1.5 py-0.5 rounded ${type.color}`}>

                        {type.solde}j
                      </span>
                }
                  </label>
              )}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className={sectionTitleCls}>Dates</p>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className={labelCls}>Date de début *</label>
                  <input
                  type="date"
                  className={inputCls}
                  value={formData.dateDebut}
                  onChange={(e) => update('dateDebut', e.target.value)} />

                </div>
                <div>
                  <label className={labelCls}>Date de fin *</label>
                  <input
                  type="date"
                  className={inputCls}
                  value={formData.dateFin}
                  onChange={(e) => update('dateFin', e.target.value)} />

                </div>
                <div className="flex items-end">
                  <div className="w-full bg-blue-50 border border-blue-100 rounded p-2 text-center">
                    <p className="text-lg font-bold text-blue-600">
                      {calcDays()}
                    </p>
                    <p className="text-xs text-blue-500">jours</p>
                  </div>
                </div>
              </div>
              {selectedType && selectedType.solde > 0 &&
            <div className="mt-2 flex items-center gap-1.5 bg-gray-50 rounded p-2">
                  <InfoIcon className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-600">
                    Solde disponible:{' '}
                    <strong>{selectedType.solde} jours</strong>
                  </span>
                  {calcDays() > 0 &&
              <span className="text-xs text-gray-500">
                      → Solde restant:{' '}
                      <strong>
                        {Math.max(0, selectedType.solde - calcDays())} jours
                      </strong>
                    </span>
              }
                </div>
            }
            </div>
          </div>
        }

        {/* Step 2 */}
        {currentStep === 2 &&
        <div className="space-y-3">
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className={sectionTitleCls}>Motif & Justificatif</p>
              <div className="space-y-2">
                <div>
                  <label className={labelCls}>Motif *</label>
                  <textarea
                  className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 h-16 focus:outline-none focus:border-blue-400 bg-white resize-none"
                  placeholder="Décrivez le motif de la demande..."
                  value={formData.motif}
                  onChange={(e) => update('motif', e.target.value)} />

                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                  type="checkbox"
                  className="w-3.5 h-3.5"
                  checked={formData.justificatif}
                  onChange={(e) => update('justificatif', e.target.checked)} />

                  <span className="text-xs text-gray-600">
                    Justificatif joint
                  </span>
                </label>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className={sectionTitleCls}>Organisation</p>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelCls}>Remplaçant</label>
                  <select
                  className={selectCls}
                  value={formData.remplacant}
                  onChange={(e) => update('remplacant', e.target.value)}>

                    <option value="">Aucun</option>
                    <option>Dr. Ahmed Ben Ali</option>
                    <option>Inf. Sara Mansouri</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Commentaire interne</label>
                  <input
                  className={inputCls}
                  placeholder="Note pour le responsable"
                  value={formData.commentaire}
                  onChange={(e) => update('commentaire', e.target.value)} />

                </div>
              </div>
            </div>
          </div>
        }

        {/* Step 3 */}
        {currentStep === 3 &&
        <div className="space-y-3">
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className={sectionTitleCls}>Récapitulatif</p>
              <div className="grid grid-cols-2 gap-2">
                {[
              {
                label: 'Employé',
                value: formData.employe || '—'
              },
              {
                label: 'Type',
                value: selectedType?.label || '—'
              },
              {
                label: 'Date début',
                value: formData.dateDebut || '—'
              },
              {
                label: 'Date fin',
                value: formData.dateFin || '—'
              },
              {
                label: 'Durée',
                value: `${calcDays()} jours`
              },
              {
                label: 'Motif',
                value: formData.motif || '—'
              }].
              map((item) =>
              <div key={item.label} className="bg-gray-50 rounded p-2">
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="text-xs font-medium text-gray-800">
                      {item.value}
                    </p>
                  </div>
              )}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className={sectionTitleCls}>Circuit de validation</p>
              <div className="space-y-2">
                {[
              'Responsable direct',
              'Direction RH',
              'Direction générale'].
              map((step, i) =>
              <div
                key={step}
                className="flex items-center gap-2 bg-gray-50 rounded p-2">

                    <div className="w-5 h-5 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </div>
                    <span className="text-xs text-gray-700">{step}</span>
                    <span className="ml-auto text-xs text-yellow-600 bg-yellow-50 px-1.5 py-0.5 rounded">
                      En attente
                    </span>
                  </div>
              )}
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
              <CheckIcon className="w-3 h-3" /> Soumettre la demande
            </button>
          }
        </div>
      </div>
    </div>);

}
export default NouvelleDemandeConge;