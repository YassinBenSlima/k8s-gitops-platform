import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PlusIcon,
  FileTextIcon,
  CalendarIcon,
  AlertCircleIcon,
  CheckCircle2Icon,
  DownloadIcon,
  EditIcon,
  ChevronDownIcon,
  ChevronUpIcon } from
'lucide-react';
const ContractManagement = () => {
  const navigate = useNavigate();
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const contracts = [
  {
    id: 1,
    employee: 'Sarah Martin',
    type: 'CDI',
    startDate: '15 Mar 2020',
    endDate: null,
    salary: '2 500 DT',
    status: 'active',
    renewalDate: null,
    documents: ['Contrat initial', 'Avenant 2023']
  },
  {
    id: 2,
    employee: 'Marc Dubois',
    type: 'CDI',
    startDate: '10 Jan 2021',
    endDate: null,
    salary: '2 200 DT',
    status: 'active',
    renewalDate: null,
    documents: ['Contrat initial']
  },
  {
    id: 3,
    employee: 'Julie Leroy',
    type: 'CDI',
    startDate: '20 Jun 2019',
    endDate: null,
    salary: '2 800 DT',
    status: 'active',
    renewalDate: null,
    documents: ['Contrat initial', 'Avenant 2021', 'Avenant 2023']
  },
  {
    id: 4,
    employee: 'Emma Rousseau',
    type: 'CDD',
    startDate: '5 Sep 2021',
    endDate: '5 Sep 2025',
    salary: '2 400 DT',
    status: 'expiring',
    renewalDate: '5 Sep 2025',
    documents: ['Contrat initial', 'Renouvellement 2023']
  }];

  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
    prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  const handleEditContract = (contract: (typeof contracts)[0]) => {
    navigate('/hr/contracts/nouveau', {
      state: {
        contractData: {
          employee: contract.employee,
          type: contract.type,
          contractType: contract.type,
          startDate: contract.startDate,
          endDate: contract.endDate || '',
          salary: contract.salary,
          position: '',
          department: '',
          workingHours: '40',
          trialPeriod: '0',
          benefits: '',
          notes: ''
        }
      }
    });
  };
  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex items-center justify-end">
        <button
          onClick={() => navigate('/hr/contracts/nouveau')}
          className="flex items-center gap-1 px-3 py-1.5 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">

          <PlusIcon size={12} />
          Nouveau contrat
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
          <h2 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
            <FileTextIcon size={12} className="text-red-500" />
            Contrats de travail ({contracts.length})
          </h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Employé
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Type
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Salaire
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Début
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Fin
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Statut
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Documents
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract) => {
              const isExpanded = expandedRows.includes(contract.id);
              return (
                <Fragment key={contract.id}>
                  <tr
                    className={`border-b border-gray-50 hover:bg-gray-50 ${contract.status === 'expiring' ? 'bg-amber-50' : ''}`}>

                    <td className="px-3 py-1.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {contract.employee.charAt(0)}
                        </div>
                        <span className="text-xs font-medium text-gray-800">
                          {contract.employee}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-1.5">
                      <span
                        className={`px-1.5 py-0.5 rounded text-xs ${contract.type === 'CDI' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>

                        {contract.type}
                      </span>
                    </td>
                    <td className="px-3 py-1.5 text-xs font-medium text-gray-700">
                      {contract.salary}/mois
                    </td>
                    <td className="px-3 py-1.5 text-xs text-gray-600">
                      {contract.startDate}
                    </td>
                    <td className="px-3 py-1.5 text-xs text-gray-600">
                      {contract.endDate ||
                      <span className="text-gray-400">Indéterminé</span>
                      }
                    </td>
                    <td className="px-3 py-1.5">
                      {contract.status === 'active' ?
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs bg-green-100 text-green-700">
                          <CheckCircle2Icon size={10} />
                          Actif
                        </span> :

                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs bg-amber-100 text-amber-700">
                          <AlertCircleIcon size={10} />À renouveler
                        </span>
                      }
                    </td>
                    <td className="px-3 py-1.5">
                      <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                        {contract.documents.length} doc
                        {contract.documents.length > 1 ? 's' : ''}
                      </span>
                    </td>
                    <td className="px-3 py-1.5">
                      <div className="flex items-center gap-0.5">
                        <button
                          onClick={() => handleEditContract(contract)}
                          className="p-1 hover:bg-blue-50 rounded text-gray-400 hover:text-blue-600"
                          title="Modifier">

                          <EditIcon size={11} />
                        </button>
                        <button
                          onClick={() => toggleRow(contract.id)}
                          className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600">

                          {isExpanded ?
                          <ChevronUpIcon size={11} /> :

                          <ChevronDownIcon size={11} />
                          }
                        </button>
                      </div>
                    </td>
                  </tr>
                  {isExpanded &&
                  <tr className="border-b border-gray-100 bg-gray-50">
                      <td colSpan={8} className="px-3 py-2">
                        <div className="text-xs font-medium text-gray-600 mb-1.5">
                          Documents ({contract.documents.length})
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {contract.documents.map((doc, idx) =>
                        <div
                          key={idx}
                          className="flex items-center gap-1.5 px-2 py-1 bg-white border border-gray-200 rounded text-xs text-gray-700">

                              <FileTextIcon
                            size={11}
                            className="text-red-500" />

                              {doc}
                              <button className="text-blue-500 hover:text-blue-700">
                                <DownloadIcon size={10} />
                              </button>
                            </div>
                        )}
                        </div>
                        {contract.renewalDate &&
                      <div className="mt-1.5 flex items-center gap-1 px-2 py-1 bg-amber-50 border border-amber-200 rounded text-xs text-amber-700">
                            <AlertCircleIcon size={11} />
                            Renouvellement à prévoir avant le{' '}
                            {contract.renewalDate}
                          </div>
                      }
                      </td>
                    </tr>
                  }
                </Fragment>);

            })}
          </tbody>
        </table>
      </div>
    </div>);

};
export default ContractManagement;