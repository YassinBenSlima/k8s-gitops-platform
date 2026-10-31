import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  XIcon,
  SaveIcon,
  UserIcon,
  CalendarIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  FileTextIcon,
  ArrowLeftIcon,
  ActivityIcon,
  AwardIcon,
  ClockIcon,
  TrendingUpIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  SparklesIcon,
  ShieldIcon } from
'lucide-react';
const PatientEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    dateNaissance: '',
    email: '',
    telephone: '',
    adresse: '',
    ville: '',
    codePostal: '',
    profession: '',
    mutuelle: '',
    numeroDossier: '',
    medecin: '',
    antecedents: '',
    allergies: '',
    notes: '',
    treatment: '',
    startDate: '',
    duration: '',
    progress: 0
  });
  const mutuelles = [
  {
    id: 1,
    name: 'CNAM',
    type: 'Régime général'
  },
  {
    id: 2,
    name: 'CNRPS',
    type: 'Fonctionnaire'
  },
  {
    id: 3,
    name: 'Assurance Carte',
    type: 'Complémentaire'
  },
  {
    id: 4,
    name: 'MGPTT',
    type: 'Complémentaire'
  },
  {
    id: 5,
    name: 'MDS',
    type: 'Complémentaire'
  },
  {
    id: 6,
    name: 'Aucune',
    type: ''
  }];

  const treatmentOptions = [
  'Appareil fixe',
  'Aligneurs',
  'Appareil fixe + élastiques',
  'Appareil amovible',
  "Phase d'observation"];

  useEffect(() => {
    setTimeout(() => {
      const mockPatient = {
        prenom: 'Sophie',
        nom: 'Martin',
        dateNaissance: '2009-05-12',
        email: 'parent.martin@email.com',
        telephone: '06 12 34 56 78',
        adresse: "123 Rue de l'Orthodontie",
        ville: 'Paris',
        codePostal: '75000',
        profession: 'Étudiante',
        mutuelle: 'CNAM',
        numeroDossier: '12345',
        medecin: 'Dr. Dupont',
        antecedents: 'Aucun antécédent particulier',
        allergies: 'Aucune allergie connue',
        notes: 'Patiente coopérative',
        treatment: 'Appareil fixe',
        startDate: '2023-01-01',
        duration: '18',
        progress: 45
      };
      setFormData(mockPatient);
      setIsLoading(false);
    }, 500);
  }, [id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saving patient data:', formData);
    alert('Informations du patient mises à jour avec succès');
    navigate(`/patients/${id}`);
  };
  const handleCancel = () => {
    navigate(`/patients/${id}`);
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <motion.div
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />

      </div>);

  }
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
        className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <motion.button
              whileHover={{
                scale: 1.1,
                x: -5
              }}
              whileTap={{
                scale: 0.9
              }}
              onClick={handleCancel}
              className="mr-4 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all">

              <ArrowLeftIcon className="h-5 w-5 text-white" />
            </motion.button>
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

              <UserIcon className="h-8 w-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold">Modifier le patient</h1>
              <p className="text-indigo-100 text-sm mt-1">
                {formData.prenom} {formData.nom}
              </p>
            </div>
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
              onClick={handleCancel}
              className="inline-flex items-center px-6 py-3 bg-white bg-opacity-20 backdrop-blur-sm text-white rounded-xl font-semibold shadow-lg hover:bg-opacity-30 transition-all">

              <XIcon className="h-5 w-5 mr-2" />
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
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">

              <SaveIcon className="h-5 w-5 mr-2" />
              Enregistrer
            </motion.button>
          </div>
        </div>
      </motion.div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informations personnelles */}
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
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border-2 border-blue-100 overflow-hidden">

          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 text-white">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-xl bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mr-4">
                <UserIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Informations personnelles</h3>
                <p className="text-blue-100 text-sm mt-1">
                  Informations d'identité du patient
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="prenom"
                  className="block text-sm font-bold text-gray-700 mb-2">

                  Prénom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="prenom"
                  id="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-2 border-gray-200 rounded-xl py-3 px-4 transition-all" />

              </div>
              <div>
                <label
                  htmlFor="nom"
                  className="block text-sm font-bold text-gray-700 mb-2">

                  Nom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nom"
                  id="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-2 border-gray-200 rounded-xl py-3 px-4 transition-all" />

              </div>
              <div>
                <label
                  htmlFor="dateNaissance"
                  className="block text-sm font-bold text-gray-700 mb-2">

                  Date de naissance <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="dateNaissance"
                    id="dateNaissance"
                    value={formData.dateNaissance}
                    onChange={handleChange}
                    className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-2 border-gray-200 rounded-xl py-3 transition-all" />

                </div>
              </div>
              <div>
                <label
                  htmlFor="profession"
                  className="block text-sm font-bold text-gray-700 mb-2">

                  Profession
                </label>
                <input
                  type="text"
                  name="profession"
                  id="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-2 border-gray-200 rounded-xl py-3 px-4 transition-all" />

              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border-2 border-blue-100">
              <h4 className="text-md font-bold text-gray-900 mb-4 flex items-center">
                <PhoneIcon className="h-5 w-5 text-blue-500 mr-2" />
                Coordonnées
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold text-gray-700 mb-2">

                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MailIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-2 border-gray-200 rounded-xl py-3 transition-all" />

                  </div>
                </div>
                <div>
                  <label
                    htmlFor="telephone"
                    className="block text-sm font-bold text-gray-700 mb-2">

                    Téléphone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <PhoneIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="telephone"
                      id="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-2 border-gray-200 rounded-xl py-3 transition-all" />

                  </div>
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="adresse"
                    className="block text-sm font-bold text-gray-700 mb-2">

                    Adresse
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPinIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="adresse"
                      id="adresse"
                      value={formData.adresse}
                      onChange={handleChange}
                      className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-2 border-gray-200 rounded-xl py-3 transition-all" />

                  </div>
                </div>
                <div>
                  <label
                    htmlFor="ville"
                    className="block text-sm font-bold text-gray-700 mb-2">

                    Ville
                  </label>
                  <input
                    type="text"
                    name="ville"
                    id="ville"
                    value={formData.ville}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-2 border-gray-200 rounded-xl py-3 px-4 transition-all" />

                </div>
                <div>
                  <label
                    htmlFor="codePostal"
                    className="block text-sm font-bold text-gray-700 mb-2">

                    Code postal
                  </label>
                  <input
                    type="text"
                    name="codePostal"
                    id="codePostal"
                    value={formData.codePostal}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-2 border-gray-200 rounded-xl py-3 px-4 transition-all" />

                </div>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Informations médicales */}
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
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg border-2 border-green-100 overflow-hidden">

          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-xl bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mr-4">
                <ShieldIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Informations médicales</h3>
                <p className="text-green-100 text-sm mt-1">
                  Informations de santé et couverture
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="mutuelle"
                  className="block text-sm font-bold text-gray-700 mb-2">

                  Mutuelle
                </label>
                <select
                  id="mutuelle"
                  name="mutuelle"
                  value={formData.mutuelle}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-2 border-gray-200 rounded-xl py-3 px-4 transition-all">

                  <option value="">Sélectionner une mutuelle</option>
                  {mutuelles.map((mutuelle) =>
                  <option key={mutuelle.id} value={mutuelle.name}>
                      {mutuelle.name}{' '}
                      {mutuelle.type ? `- ${mutuelle.type}` : ''}
                    </option>
                  )}
                </select>
              </div>
              <div>
                <label
                  htmlFor="numeroDossier"
                  className="block text-sm font-bold text-gray-700 mb-2">

                  Numéro de dossier
                </label>
                <input
                  type="text"
                  name="numeroDossier"
                  id="numeroDossier"
                  value={formData.numeroDossier}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-2 border-gray-200 rounded-xl py-3 px-4 transition-all" />

              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="medecin"
                  className="block text-sm font-bold text-gray-700 mb-2">

                  Médecin traitant
                </label>
                <input
                  type="text"
                  name="medecin"
                  id="medecin"
                  value={formData.medecin}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-2 border-gray-200 rounded-xl py-3 px-4 transition-all" />

              </div>
            </div>
            <div>
              <label
                htmlFor="antecedents"
                className="block text-sm font-bold text-gray-700 mb-2">

                Antécédents médicaux
              </label>
              <textarea
                id="antecedents"
                name="antecedents"
                rows={3}
                value={formData.antecedents}
                onChange={handleChange}
                className="shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-2 border-gray-200 rounded-xl py-3 px-4 transition-all" />

            </div>
            <div>
              <label
                htmlFor="allergies"
                className="block text-sm font-bold text-gray-700 mb-2">

                Allergies
              </label>
              <textarea
                id="allergies"
                name="allergies"
                rows={2}
                value={formData.allergies}
                onChange={handleChange}
                className="shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-2 border-gray-200 rounded-xl py-3 px-4 transition-all" />

            </div>
          </div>
        </motion.div>
        {/* Informations de traitement */}
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
          className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg border-2 border-purple-100 overflow-hidden">

          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-xl bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mr-4">
                <ActivityIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  Informations de traitement
                </h3>
                <p className="text-purple-100 text-sm mt-1">
                  Détails du traitement en cours
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="treatment"
                  className="block text-sm font-bold text-gray-700 mb-2">

                  Type de traitement
                </label>
                <select
                  id="treatment"
                  name="treatment"
                  value={formData.treatment}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-2 border-gray-200 rounded-xl py-3 px-4 transition-all">

                  <option value="">Sélectionner un traitement</option>
                  {treatmentOptions.map((option, index) =>
                  <option key={index} value={option}>
                      {option}
                    </option>
                  )}
                </select>
              </div>
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-bold text-gray-700 mb-2">

                  Date de début
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="focus:ring-2 focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-2 border-gray-200 rounded-xl py-3 transition-all" />

                </div>
              </div>
              <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-bold text-gray-700 mb-2">

                  Durée estimée (mois)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ClockIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="duration"
                    id="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="focus:ring-2 focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-2 border-gray-200 rounded-xl py-3 transition-all" />

                </div>
              </div>
              <div>
                <label
                  htmlFor="progress"
                  className="block text-sm font-bold text-gray-700 mb-2">

                  Progression (%)
                </label>
                <input
                  type="number"
                  name="progress"
                  id="progress"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-2 border-gray-200 rounded-xl py-3 px-4 transition-all" />

              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border-2 border-purple-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-gray-700">
                  Progression du traitement
                </span>
                <span className="text-sm font-bold text-purple-600">
                  {formData.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <motion.div
                  initial={{
                    width: 0
                  }}
                  animate={{
                    width: `${formData.progress}%`
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.5
                  }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full shadow-lg" />

              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Début</span>
                <span>Terminé</span>
              </div>
            </div>
            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-bold text-gray-700 mb-2">

                Notes additionnelles
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                className="shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-2 border-gray-200 rounded-xl py-3 px-4 transition-all"
                placeholder="Ajoutez des notes sur le patient..." />

            </div>
          </div>
        </motion.div>
        {/* Action Buttons */}
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
          className="flex justify-end space-x-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-100 shadow-lg">

          <motion.button
            whileHover={{
              scale: 1.05,
              y: -2
            }}
            whileTap={{
              scale: 0.95
            }}
            type="button"
            onClick={handleCancel}
            className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-sm font-bold rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 shadow-md hover:shadow-lg transition-all">

            <XIcon className="h-5 w-5 mr-2" />
            Annuler
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.05,
              y: -2
            }}
            whileTap={{
              scale: 0.95
            }}
            type="submit"
            className="inline-flex items-center px-8 py-4 border-2 border-transparent text-sm font-bold rounded-xl shadow-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:shadow-xl transition-all">

            <SaveIcon className="h-5 w-5 mr-2" />
            Enregistrer les modifications
          </motion.button>
        </motion.div>
      </form>
    </div>);

};
export default PatientEdit;