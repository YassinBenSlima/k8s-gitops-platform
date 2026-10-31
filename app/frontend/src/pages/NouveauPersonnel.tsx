import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  UserIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  FileTextIcon,
  CheckIcon,
  ChevronRightIcon,
  SaveIcon,
  XIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  CalendarIcon,
  ShieldIcon,
  PlusIcon,
  TrashIcon,
  UploadIcon } from
'lucide-react';
const steps = [
{
  id: 1,
  label: 'Identité',
  icon: UserIcon
},
{
  id: 2,
  label: 'Poste',
  icon: BriefcaseIcon
},
{
  id: 3,
  label: 'Formation',
  icon: GraduationCapIcon
},
{
  id: 4,
  label: 'Documents',
  icon: FileTextIcon
},
{
  id: 5,
  label: 'Accès',
  icon: ShieldIcon
}];

export function NouveauPersonnel() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    civilite: 'M.',
    prenom: '',
    nom: '',
    dateNaissance: '',
    lieuNaissance: '',
    nationalite: 'Tunisienne',
    cin: '',
    cinExpiry: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelation: '',
    // Step 2
    poste: '',
    departement: '',
    specialite: '',
    grade: '',
    dateEmbauche: '',
    typeContrat: 'CDI',
    salaire: '',
    devise: 'TND',
    horaire: '8h-17h',
    joursConge: '30',
    periodeEssai: '3',
    superviseur: '',
    lieu: '',
    // Step 3
    diplome: '',
    etablissement: '',
    anneeObtention: '',
    specialiteDiplome: '',
    certifications: [
    {
      nom: '',
      organisme: '',
      annee: '',
      expiry: ''
    }],

    langues: [
    {
      langue: 'Arabe',
      niveau: 'Natif'
    }],

    // Step 4
    docs: [
    {
      type: 'CIN',
      status: 'pending'
    },
    {
      type: 'Diplôme',
      status: 'pending'
    },
    {
      type: 'CV',
      status: 'pending'
    },
    {
      type: 'Casier judiciaire',
      status: 'pending'
    },
    {
      type: 'Certificat médical',
      status: 'pending'
    }],

    // Step 5
    username: '',
    role: 'Médecin',
    permissions: [] as string[],
    twoFactor: false,
    sendCredentials: true
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
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="p-1 hover:bg-gray-100 rounded text-gray-500">

            <ArrowLeftIcon className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-sm font-semibold text-gray-900">
              Nouveau Personnel
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

      <div className="p-3 max-w-5xl mx-auto">
        {/* Step indicator */}
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
                    className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium transition-colors ${isActive ? 'bg-blue-50 text-blue-700' : isDone ? 'text-green-600' : 'text-gray-400'}`}>

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

        {/* Step 1: Identité */}
        {currentStep === 1 &&
        <div className="space-y-3">
            {/* Informations personnelles */}
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className={sectionTitleCls}>Informations personnelles</p>
              <div className="grid grid-cols-6 gap-2">
                <div>
                  <label className={labelCls}>Civilité</label>
                  <select
                  className={selectCls}
                  value={formData.civilite}
                  onChange={(e) => update('civilite', e.target.value)}>

                    <option>M.</option>
                    <option>Mme</option>
                    <option>Dr.</option>
                    <option>Pr.</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Prénom *</label>
                  <input
                  className={inputCls}
                  placeholder="Prénom"
                  value={formData.prenom}
                  onChange={(e) => update('prenom', e.target.value)} />

                </div>
                <div className="col-span-3">
                  <label className={labelCls}>Nom *</label>
                  <input
                  className={inputCls}
                  placeholder="Nom de famille"
                  value={formData.nom}
                  onChange={(e) => update('nom', e.target.value)} />

                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Date de naissance *</label>
                  <input
                  type="date"
                  className={inputCls}
                  value={formData.dateNaissance}
                  onChange={(e) => update('dateNaissance', e.target.value)} />

                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Lieu de naissance</label>
                  <input
                  className={inputCls}
                  placeholder="Ville"
                  value={formData.lieuNaissance}
                  onChange={(e) => update('lieuNaissance', e.target.value)} />

                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Nationalité</label>
                  <input
                  className={inputCls}
                  value={formData.nationalite}
                  onChange={(e) => update('nationalite', e.target.value)} />

                </div>
                <div className="col-span-2">
                  <label className={labelCls}>N° CIN *</label>
                  <input
                  className={inputCls}
                  placeholder="00000000"
                  value={formData.cin}
                  onChange={(e) => update('cin', e.target.value)} />

                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Expiration CIN</label>
                  <input
                  type="date"
                  className={inputCls}
                  value={formData.cinExpiry}
                  onChange={(e) => update('cinExpiry', e.target.value)} />

                </div>
              </div>
            </div>

            {/* Coordonnées */}
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className={sectionTitleCls}>Coordonnées</p>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className={labelCls}>Téléphone *</label>
                  <input
                  className={inputCls}
                  placeholder="+216 XX XXX XXX"
                  value={formData.phone}
                  onChange={(e) => update('phone', e.target.value)} />

                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Email *</label>
                  <input
                  type="email"
                  className={inputCls}
                  placeholder="email@exemple.com"
                  value={formData.email}
                  onChange={(e) => update('email', e.target.value)} />

                </div>
                <div className="col-span-3">
                  <label className={labelCls}>Adresse</label>
                  <input
                  className={inputCls}
                  placeholder="Rue, numéro..."
                  value={formData.address}
                  onChange={(e) => update('address', e.target.value)} />

                </div>
                <div>
                  <label className={labelCls}>Ville</label>
                  <input
                  className={inputCls}
                  placeholder="Tunis"
                  value={formData.city}
                  onChange={(e) => update('city', e.target.value)} />

                </div>
                <div>
                  <label className={labelCls}>Code postal</label>
                  <input
                  className={inputCls}
                  placeholder="1000"
                  value={formData.postalCode}
                  onChange={(e) => update('postalCode', e.target.value)} />

                </div>
              </div>
            </div>

            {/* Contact d'urgence */}
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className={sectionTitleCls}>Contact d'urgence</p>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className={labelCls}>Nom complet</label>
                  <input
                  className={inputCls}
                  placeholder="Nom"
                  value={formData.emergencyName}
                  onChange={(e) => update('emergencyName', e.target.value)} />

                </div>
                <div>
                  <label className={labelCls}>Téléphone</label>
                  <input
                  className={inputCls}
                  placeholder="+216 XX XXX XXX"
                  value={formData.emergencyPhone}
                  onChange={(e) => update('emergencyPhone', e.target.value)} />

                </div>
                <div>
                  <label className={labelCls}>Relation</label>
                  <select
                  className={selectCls}
                  value={formData.emergencyRelation}
                  onChange={(e) =>
                  update('emergencyRelation', e.target.value)
                  }>

                    <option value="">Sélectionner</option>
                    <option>Conjoint(e)</option>
                    <option>Parent</option>
                    <option>Enfant</option>
                    <option>Autre</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        }

        {/* Step 2: Poste */}
        {currentStep === 2 &&
        <div className="space-y-3">
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className={sectionTitleCls}>Informations du poste</p>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className={labelCls}>Poste *</label>
                  <select
                  className={selectCls}
                  value={formData.poste}
                  onChange={(e) => update('poste', e.target.value)}>

                    <option value="">Sélectionner</option>
                    <option>Médecin</option>
                    <option>Infirmier(e)</option>
                    <option>Technicien</option>
                    <option>Secrétaire</option>
                    <option>Administrateur</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Département *</label>
                  <select
                  className={selectCls}
                  value={formData.departement}
                  onChange={(e) => update('departement', e.target.value)}>

                    <option value="">Sélectionner</option>
                    <option>Médecine générale</option>
                    <option>Cardiologie</option>
                    <option>Urgences</option>
                    <option>Radiologie</option>
                    <option>Administration</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Spécialité</label>
                  <input
                  className={inputCls}
                  placeholder="Ex: Cardiologie"
                  value={formData.specialite}
                  onChange={(e) => update('specialite', e.target.value)} />

                </div>
                <div>
                  <label className={labelCls}>Grade</label>
                  <select
                  className={selectCls}
                  value={formData.grade}
                  onChange={(e) => update('grade', e.target.value)}>

                    <option value="">Sélectionner</option>
                    <option>Junior</option>
                    <option>Senior</option>
                    <option>Chef de service</option>
                    <option>Directeur</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Superviseur</label>
                  <input
                  className={inputCls}
                  placeholder="Nom du superviseur"
                  value={formData.superviseur}
                  onChange={(e) => update('superviseur', e.target.value)} />

                </div>
                <div>
                  <label className={labelCls}>Lieu de travail</label>
                  <input
                  className={inputCls}
                  placeholder="Clinique principale"
                  value={formData.lieu}
                  onChange={(e) => update('lieu', e.target.value)} />

                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className={sectionTitleCls}>Conditions d'emploi</p>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className={labelCls}>Date d'embauche *</label>
                  <input
                  type="date"
                  className={inputCls}
                  value={formData.dateEmbauche}
                  onChange={(e) => update('dateEmbauche', e.target.value)} />

                </div>
                <div>
                  <label className={labelCls}>Type de contrat</label>
                  <select
                  className={selectCls}
                  value={formData.typeContrat}
                  onChange={(e) => update('typeContrat', e.target.value)}>

                    <option>CDI</option>
                    <option>CDD</option>
                    <option>Temps partiel</option>
                    <option>Vacation</option>
                  </select>
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
                  <label className={labelCls}>Salaire brut</label>
                  <input
                  type="number"
                  className={inputCls}
                  placeholder="0.00"
                  value={formData.salaire}
                  onChange={(e) => update('salaire', e.target.value)} />

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
                  <label className={labelCls}>Horaire</label>
                  <select
                  className={selectCls}
                  value={formData.horaire}
                  onChange={(e) => update('horaire', e.target.value)}>

                    <option>8h-17h</option>
                    <option>7h-15h</option>
                    <option>15h-23h</option>
                    <option>Nuit</option>
                    <option>Garde</option>
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

        {/* Step 3: Formation */}
        {currentStep === 3 &&
        <div className="space-y-3">
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className={sectionTitleCls}>Diplôme principal</p>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelCls}>Diplôme *</label>
                  <select
                  className={selectCls}
                  value={formData.diplome}
                  onChange={(e) => update('diplome', e.target.value)}>

                    <option value="">Sélectionner</option>
                    <option>Doctorat en médecine</option>
                    <option>Licence en soins infirmiers</option>
                    <option>BTS Imagerie médicale</option>
                    <option>Master en santé publique</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Spécialité</label>
                  <input
                  className={inputCls}
                  placeholder="Spécialité du diplôme"
                  value={formData.specialiteDiplome}
                  onChange={(e) =>
                  update('specialiteDiplome', e.target.value)
                  } />

                </div>
                <div>
                  <label className={labelCls}>Établissement *</label>
                  <input
                  className={inputCls}
                  placeholder="Université / École"
                  value={formData.etablissement}
                  onChange={(e) => update('etablissement', e.target.value)} />

                </div>
                <div>
                  <label className={labelCls}>Année d'obtention</label>
                  <input
                  type="number"
                  className={inputCls}
                  placeholder="2020"
                  value={formData.anneeObtention}
                  onChange={(e) => update('anneeObtention', e.target.value)} />

                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <div className="flex items-center justify-between mb-2">
                <p className={sectionTitleCls}>Certifications</p>
                <button className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700">
                  <PlusIcon className="w-3 h-3" /> Ajouter
                </button>
              </div>
              <div className="space-y-2">
                {formData.certifications.map((cert, i) =>
              <div
                key={i}
                className="grid grid-cols-4 gap-2 bg-gray-50 rounded p-2">

                    <div>
                      <label className={labelCls}>Certification</label>
                      <input className={inputCls} placeholder="Nom" />
                    </div>
                    <div>
                      <label className={labelCls}>Organisme</label>
                      <input className={inputCls} placeholder="Organisme" />
                    </div>
                    <div>
                      <label className={labelCls}>Année</label>
                      <input
                    type="number"
                    className={inputCls}
                    placeholder="2023" />

                    </div>
                    <div>
                      <label className={labelCls}>Expiration</label>
                      <input type="date" className={inputCls} />
                    </div>
                  </div>
              )}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <div className="flex items-center justify-between mb-2">
                <p className={sectionTitleCls}>Langues</p>
                <button className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700">
                  <PlusIcon className="w-3 h-3" /> Ajouter
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {formData.langues.map((lang, i) =>
              <div
                key={i}
                className="grid grid-cols-2 gap-1 bg-gray-50 rounded p-2">

                    <div>
                      <label className={labelCls}>Langue</label>
                      <input className={inputCls} defaultValue={lang.langue} />
                    </div>
                    <div>
                      <label className={labelCls}>Niveau</label>
                      <select className={selectCls} defaultValue={lang.niveau}>
                        <option>Natif</option>
                        <option>Courant</option>
                        <option>Intermédiaire</option>
                        <option>Débutant</option>
                      </select>
                    </div>
                  </div>
              )}
              </div>
            </div>
          </div>
        }

        {/* Step 4: Documents */}
        {currentStep === 4 &&
        <div className="bg-white rounded-lg border border-gray-200 p-3">
            <p className={sectionTitleCls}>Documents requis</p>
            <div className="space-y-2">
              {formData.docs.map((doc, i) =>
            <div
              key={i}
              className="flex items-center justify-between bg-gray-50 rounded p-2">

                  <div className="flex items-center gap-2">
                    <FileTextIcon className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs text-gray-700">{doc.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-yellow-600 bg-yellow-50 px-1.5 py-0.5 rounded">
                      En attente
                    </span>
                    <button className="flex items-center gap-1 text-xs text-blue-600 border border-blue-200 rounded px-2 py-0.5 hover:bg-blue-50">
                      <UploadIcon className="w-3 h-3" /> Téléverser
                    </button>
                  </div>
                </div>
            )}
            </div>
            <div className="mt-3 border-2 border-dashed border-gray-200 rounded p-4 text-center">
              <UploadIcon className="w-6 h-6 text-gray-300 mx-auto mb-1" />
              <p className="text-xs text-gray-500">
                Glisser-déposer des fichiers ici
              </p>
              <p className="text-xs text-gray-400">PDF, JPG, PNG — max 10 Mo</p>
            </div>
          </div>
        }

        {/* Step 5: Accès */}
        {currentStep === 5 &&
        <div className="space-y-3">
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className={sectionTitleCls}>Compte utilisateur</p>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className={labelCls}>Nom d'utilisateur *</label>
                  <input
                  className={inputCls}
                  placeholder="prenom.nom"
                  value={formData.username}
                  onChange={(e) => update('username', e.target.value)} />

                </div>
                <div>
                  <label className={labelCls}>Rôle *</label>
                  <select
                  className={selectCls}
                  value={formData.role}
                  onChange={(e) => update('role', e.target.value)}>

                    <option>Médecin</option>
                    <option>Infirmier</option>
                    <option>Secrétaire</option>
                    <option>Technicien</option>
                    <option>Administrateur</option>
                  </select>
                </div>
                <div className="flex items-end gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                    type="checkbox"
                    className="w-3.5 h-3.5"
                    checked={formData.twoFactor}
                    onChange={(e) => update('twoFactor', e.target.checked)} />

                    <span className="text-xs text-gray-600">2FA activé</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className={sectionTitleCls}>Permissions</p>
              <div className="grid grid-cols-3 gap-2">
                {[
              'Patients',
              'Rendez-vous',
              'Prescriptions',
              'Dossiers médicaux',
              'Facturation',
              'Rapports',
              'Stock',
              'RH',
              'Administration'].
              map((perm) =>
              <label
                key={perm}
                className="flex items-center gap-2 cursor-pointer bg-gray-50 rounded p-2">

                    <input type="checkbox" className="w-3.5 h-3.5" />
                    <span className="text-xs text-gray-700">{perm}</span>
                  </label>
              )}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className={sectionTitleCls}>Notifications</p>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                type="checkbox"
                className="w-3.5 h-3.5"
                checked={formData.sendCredentials}
                onChange={(e) => update('sendCredentials', e.target.checked)} />

                <span className="text-xs text-gray-600">
                  Envoyer les identifiants par email
                </span>
              </label>
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
              <CheckIcon className="w-3 h-3" /> Créer le personnel
            </button>
          }
        </div>
      </div>
    </div>);

}
export default NouveauPersonnel;