import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  StarIcon,
  TargetIcon,
  TrendingUpIcon,
  CheckIcon,
  ChevronRightIcon,
  SaveIcon,
  XIcon,
  PlusIcon,
  UserIcon,
  CalendarIcon,
  ClipboardListIcon,
  BarChart2Icon } from
'lucide-react';
const steps = [
{
  id: 1,
  label: 'Employé',
  icon: UserIcon
},
{
  id: 2,
  label: 'Critères',
  icon: ClipboardListIcon
},
{
  id: 3,
  label: 'Objectifs',
  icon: TargetIcon
},
{
  id: 4,
  label: 'Synthèse',
  icon: BarChart2Icon
}];

const criteriaGroups = [
{
  group: 'Compétences cliniques',
  items: [
  'Qualité des soins',
  'Respect des protocoles',
  'Gestion des urgences',
  'Documentation médicale']

},
{
  group: 'Comportement professionnel',
  items: [
  'Ponctualité',
  'Communication',
  'Travail en équipe',
  'Respect des patients']

},
{
  group: 'Performance',
  items: [
  'Productivité',
  'Gestion du temps',
  'Atteinte des objectifs',
  'Initiative']

}];

export function NouvelleEvaluation() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [formData, setFormData] = useState({
    employe: '',
    periode: 'T1 2025',
    evaluateur: '',
    dateEval: '',
    typeEval: 'Annuelle',
    commentaireGeneral: '',
    recommandation: '',
    objectifs: [
    {
      titre: '',
      description: '',
      echeance: '',
      poids: '20'
    }]

  });
  const update = (field: string, value: string) =>
  setFormData((prev) => ({
    ...prev,
    [field]: value
  }));
  const setRating = (item: string, val: number) =>
  setRatings((prev) => ({
    ...prev,
    [item]: val
  }));
  const inputCls =
  'w-full text-xs border border-gray-200 rounded px-2 py-1 h-7 focus:outline-none focus:border-blue-400 bg-white';
  const selectCls =
  'w-full text-xs border border-gray-200 rounded px-2 py-1 h-7 focus:outline-none focus:border-blue-400 bg-white';
  const labelCls = 'text-xs text-gray-500 mb-0.5 block';
  const sectionTitleCls =
  'text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2';
  const avgScore = Object.values(ratings).length ?
  (
  Object.values(ratings).reduce((a, b) => a + b, 0) /
  Object.values(ratings).length).
  toFixed(1) :
  '—';
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
              Nouvelle Évaluation
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

        {/* Step 1 */}
        {currentStep === 1 &&
        <div className="bg-white rounded-lg border border-gray-200 p-3">
            <p className={sectionTitleCls}>Informations de l'évaluation</p>
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
                <label className={labelCls}>Type d'évaluation</label>
                <select
                className={selectCls}
                value={formData.typeEval}
                onChange={(e) => update('typeEval', e.target.value)}>

                  <option>Annuelle</option>
                  <option>Semestrielle</option>
                  <option>Fin de période d'essai</option>
                  <option>Ponctuelle</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Période</label>
                <select
                className={selectCls}
                value={formData.periode}
                onChange={(e) => update('periode', e.target.value)}>

                  <option>T1 2025</option>
                  <option>T2 2025</option>
                  <option>T3 2025</option>
                  <option>T4 2025</option>
                  <option>Annuel 2024</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Évaluateur *</label>
                <input
                className={inputCls}
                placeholder="Nom de l'évaluateur"
                value={formData.evaluateur}
                onChange={(e) => update('evaluateur', e.target.value)} />

              </div>
              <div>
                <label className={labelCls}>Date d'évaluation *</label>
                <input
                type="date"
                className={inputCls}
                value={formData.dateEval}
                onChange={(e) => update('dateEval', e.target.value)} />

              </div>
            </div>
          </div>
        }

        {/* Step 2 */}
        {currentStep === 2 &&
        <div className="space-y-3">
            {criteriaGroups.map((group) =>
          <div
            key={group.group}
            className="bg-white rounded-lg border border-gray-200 p-3">

                <p className={sectionTitleCls}>{group.group}</p>
                <div className="space-y-2">
                  {group.items.map((item) =>
              <div
                key={item}
                className="flex items-center justify-between bg-gray-50 rounded p-2">

                      <span className="text-xs text-gray-700">{item}</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) =>
                  <button
                    key={star}
                    onClick={() => setRating(item, star)}
                    className={`w-5 h-5 ${(ratings[item] || 0) >= star ? 'text-yellow-400' : 'text-gray-200'}`}>

                            <StarIcon className="w-4 h-4 fill-current" />
                          </button>
                  )}
                        <span className="text-xs text-gray-500 w-6 text-right">
                          {ratings[item] ? `${ratings[item]}/5` : '—'}
                        </span>
                      </div>
                    </div>
              )}
                </div>
              </div>
          )}
          </div>
        }

        {/* Step 3 */}
        {currentStep === 3 &&
        <div className="space-y-3">
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <div className="flex items-center justify-between mb-2">
                <p className={sectionTitleCls}>
                  Objectifs pour la prochaine période
                </p>
                <button
                onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  objectifs: [
                  ...prev.objectifs,
                  {
                    titre: '',
                    description: '',
                    echeance: '',
                    poids: '20'
                  }]

                }))
                }
                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700">

                  <PlusIcon className="w-3 h-3" /> Ajouter
                </button>
              </div>
              <div className="space-y-2">
                {formData.objectifs.map((obj, i) =>
              <div
                key={i}
                className="bg-gray-50 rounded p-2 grid grid-cols-4 gap-2">

                    <div className="col-span-2">
                      <label className={labelCls}>Titre de l'objectif</label>
                      <input
                    className={inputCls}
                    placeholder="Ex: Réduire les délais..." />

                    </div>
                    <div>
                      <label className={labelCls}>Échéance</label>
                      <input type="date" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Poids (%)</label>
                      <input
                    type="number"
                    className={inputCls}
                    defaultValue={obj.poids} />

                    </div>
                    <div className="col-span-4">
                      <label className={labelCls}>Description</label>
                      <textarea
                    className="w-full text-xs border border-gray-200 rounded px-2 py-1 h-12 focus:outline-none focus:border-blue-400 bg-white resize-none"
                    placeholder="Détails de l'objectif..." />

                    </div>
                  </div>
              )}
              </div>
            </div>
          </div>
        }

        {/* Step 4 */}
        {currentStep === 4 &&
        <div className="space-y-3">
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className={sectionTitleCls}>Score global</p>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">{avgScore}</p>
                  <p className="text-xs text-gray-500">/ 5.0</p>
                </div>
                <div className="flex-1">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{
                      width: `${avgScore !== '—' ? parseFloat(avgScore) / 5 * 100 : 0}%`
                    }} />

                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {Object.keys(ratings).length} critères évalués
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className={sectionTitleCls}>Commentaire général</p>
              <textarea
              className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 h-16 focus:outline-none focus:border-blue-400 bg-white resize-none"
              placeholder="Commentaire général sur la performance..."
              value={formData.commentaireGeneral}
              onChange={(e) => update('commentaireGeneral', e.target.value)} />

            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className={sectionTitleCls}>Recommandation</p>
              <div className="grid grid-cols-3 gap-2">
                {[
              'Promotion',
              'Augmentation',
              'Formation requise',
              'Maintien du poste',
              'Avertissement',
              'Licenciement'].
              map((rec) =>
              <label
                key={rec}
                className={`flex items-center gap-2 cursor-pointer rounded p-2 border text-xs ${formData.recommandation === rec ? 'border-blue-400 bg-blue-50 text-blue-700' : 'border-gray-200 bg-gray-50 text-gray-600'}`}>

                    <input
                  type="radio"
                  name="recommandation"
                  value={rec}
                  checked={formData.recommandation === rec}
                  onChange={() => update('recommandation', rec)}
                  className="w-3 h-3" />

                    {rec}
                  </label>
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
              <CheckIcon className="w-3 h-3" /> Soumettre l'évaluation
            </button>
          }
        </div>
      </div>
    </div>);

}
export default NouvelleEvaluation;