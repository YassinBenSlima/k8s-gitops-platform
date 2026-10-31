import React, { useState } from 'react';
import {
  UserIcon,
  SearchIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowLeftIcon,
  RefreshCwIcon } from
'lucide-react';
import { Link } from 'react-router-dom';
const VerificationDroits = () => {
  const [searchType, setSearchType] = useState('numero');
  const [searchValue, setSearchValue] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);
  // Mock patient data
  const patients = [
  {
    id: 1,
    name: 'Sophie Martin',
    birthDate: '15/04/1992',
    insuranceNumber: '2 92 04 75 123 456',
    mutuelle: 'CNAM',
    coverageType: 'Régime général',
    coverageRate: '60%',
    annualLimit: '1500 DT',
    remainingLimit: '1050 DT',
    expiryDate: '31/12/2023',
    status: 'active',
    lastVerification: '10/06/2023'
  },
  {
    id: 2,
    name: 'Thomas Bernard',
    birthDate: '23/09/1985',
    insuranceNumber: '1 85 09 23 234 567',
    mutuelle: 'CNRPS',
    coverageType: 'Fonctionnaire',
    coverageRate: '70%',
    annualLimit: '2000 DT',
    remainingLimit: '1280 DT',
    expiryDate: '31/12/2023',
    status: 'active',
    lastVerification: '05/06/2023'
  },
  {
    id: 3,
    name: 'Emma Petit',
    birthDate: '07/12/1998',
    insuranceNumber: '2 98 12 07 345 678',
    mutuelle: 'Assurance Carte',
    coverageType: 'Complémentaire',
    coverageRate: '60%',
    annualLimit: '1000 DT',
    remainingLimit: '730 DT',
    expiryDate: '31/12/2023',
    status: 'active',
    lastVerification: '08/06/2023'
  },
  {
    id: 4,
    name: 'Lucas Dubois',
    birthDate: '30/06/1976',
    insuranceNumber: '1 76 06 30 456 789',
    mutuelle: 'CNAM',
    coverageType: 'Régime général',
    coverageRate: '60%',
    annualLimit: '1500 DT',
    remainingLimit: '0 DT',
    expiryDate: '15/05/2023',
    status: 'expired',
    lastVerification: '16/05/2023'
  }];

  const handleSearch = () => {
    setSearching(true);
    setError(null);
    // Simulate API call with a timeout
    setTimeout(() => {
      let result = null;
      if (searchType === 'numero') {
        result = patients.find((p) =>
        p.insuranceNumber.
        replace(/\s+/g, '').
        includes(searchValue.replace(/\s+/g, ''))
        );
      } else if (searchType === 'nom') {
        result = patients.find((p) =>
        p.name.toLowerCase().includes(searchValue.toLowerCase())
        );
      }
      if (result) {
        setSearchResult(result);
      } else {
        setError('Aucun patient trouvé avec ces informations');
      }
      setSearching(false);
    }, 1500);
  };
  const handleRefresh = () => {
    setSearching(true);
    // Simulate API call with a timeout
    setTimeout(() => {
      // Update the verification date
      if (searchResult) {
        const today = new Date();
        const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
        setSearchResult({
          ...searchResult,
          lastVerification: formattedDate
        });
      }
      setSearching(false);
    }, 2000);
  };
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Active
          </span>);

      case 'expired':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircleIcon className="h-3 w-3 mr-1" />
            Expirée
          </span>);

      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>);

    }
  };
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            Vérification des droits d'assurance
          </h3>
          <Link
            to="/administration/mutuelles"
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">

            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Retour
          </Link>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <UserIcon className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Vérification en temps réel
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  Ce service permet de vérifier les droits d'un patient en temps
                  réel auprès des organismes d'assurance maladie. La
                  vérification des droits est recommandée avant chaque soin pour
                  éviter les rejets de demandes de remboursement.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <div className="flex space-x-4 mb-4">
            <div className="flex items-center">
              <input
                id="search-numero"
                name="search-type"
                type="radio"
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                checked={searchType === 'numero'}
                onChange={() => setSearchType('numero')} />

              <label
                htmlFor="search-numero"
                className="ml-2 block text-sm text-gray-700">

                Recherche par numéro d'assuré
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="search-nom"
                name="search-type"
                type="radio"
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                checked={searchType === 'nom'}
                onChange={() => setSearchType('nom')} />

              <label
                htmlFor="search-nom"
                className="ml-2 block text-sm text-gray-700">

                Recherche par nom
              </label>
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="relative flex-1 rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder={
                searchType === 'numero' ?
                "Numéro d'assuré (ex: 2 92 04 75 123 456)" :
                'Nom du patient'
                }
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)} />

            </div>
            <button
              onClick={handleSearch}
              disabled={!searchValue || searching}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">

              {searching ?
              <>
                  <RefreshCwIcon className="h-4 w-4 mr-2 animate-spin" />
                  Recherche...
                </> :

              'Vérifier'
              }
            </button>
          </div>
          {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
        </div>
        {searchResult &&
        <div className="border border-gray-200 rounded-md overflow-hidden">
            <div className="px-4 py-5 bg-gray-50 border-b border-gray-200 sm:px-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {searchResult.name}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Né(e) le {searchResult.birthDate} • N°{' '}
                    {searchResult.insuranceNumber}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  {getStatusBadge(searchResult.status)}
                  <button
                  onClick={handleRefresh}
                  disabled={searching}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">

                    {searching ?
                  <RefreshCwIcon className="h-4 w-4 animate-spin" /> :

                  <RefreshCwIcon className="h-4 w-4" />
                  }
                  </button>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Mutuelle
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {searchResult.mutuelle}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Type de couverture
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {searchResult.coverageType}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Taux de remboursement
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {searchResult.coverageRate}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Date d'expiration
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {searchResult.expiryDate}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
              <h4 className="text-sm font-medium text-gray-700 mb-4">
                Plafond annuel
              </h4>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">Plafond total:</span>
                <span className="text-sm font-medium text-gray-900">
                  {searchResult.annualLimit}
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">Reste à utiliser:</span>
                <span className="text-sm font-medium text-gray-900">
                  {searchResult.remainingLimit}
                </span>
              </div>
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-gray-200">
                  <div
                  style={{
                    width: `${parseInt(searchResult.remainingLimit) / parseInt(searchResult.annualLimit) * 100}%`
                  }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500">
                </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-5 sm:px-6">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Dernière vérification: {searchResult.lastVerification}
                </div>
                <div className="flex space-x-2">
                  <Link
                  to={`/administration/mutuelles/couverture/${searchResult.id}`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">

                    Voir les détails
                  </Link>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>);

};
export default VerificationDroits;