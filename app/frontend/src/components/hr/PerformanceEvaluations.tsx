import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PlusIcon,
  StarIcon,
  CalendarIcon,
  FileTextIcon,
  CheckCircle2Icon,
  ClockIcon,
  ChevronDownIcon,
  ChevronUpIcon } from
'lucide-react';
const PerformanceEvaluations = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState('2024');
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const evaluations = [
  {
    id: 1,
    employee: 'Sarah Martin',
    role: 'Assistante dentaire',
    period: 'Q4 2024',
    date: '15 Déc 2024',
    score: 4.5,
    status: 'completed',
    categories: {
      technical: 4.5,
      communication: 4.8,
      teamwork: 4.3,
      punctuality: 4.6
    }
  },
  {
    id: 2,
    employee: 'Marc Dubois',
    role: 'Réceptionniste',
    period: 'Q4 2024',
    date: '20 Jan 2025',
    score: null,
    status: 'pending',
    categories: null
  },
  {
    id: 3,
    employee: 'Julie Leroy',
    role: 'Assistante dentaire',
    period: 'Q4 2024',
    date: '10 Déc 2024',
    score: 4.8,
    status: 'completed',
    categories: {
      technical: 4.9,
      communication: 4.7,
      teamwork: 4.8,
      punctuality: 4.8
    }
  }];

  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
    prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex items-center gap-2">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="py-1.5 px-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500">

          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
        <button
          onClick={() => navigate('/hr/performance/nouvelle')}
          className="flex items-center gap-1 px-3 py-1.5 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium ml-auto">

          <PlusIcon size={12} />
          Nouvelle évaluation
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
          <h2 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
            <StarIcon size={12} className="text-amber-500" />
            Évaluations de performance — {selectedYear}
          </h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Employé
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Rôle
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Période
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Date
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Score
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Statut
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {evaluations.map((ev) => {
              const isExpanded = expandedRows.includes(ev.id);
              return (
                <Fragment key={ev.id}>
                  <tr className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-3 py-1.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {ev.employee.charAt(0)}
                        </div>
                        <span className="text-xs font-medium text-gray-800">
                          {ev.employee}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-1.5 text-xs text-gray-600">
                      {ev.role}
                    </td>
                    <td className="px-3 py-1.5 text-xs text-gray-600">
                      {ev.period}
                    </td>
                    <td className="px-3 py-1.5 text-xs text-gray-500">
                      {ev.date}
                    </td>
                    <td className="px-3 py-1.5">
                      {ev.score !== null ?
                      <div className="flex items-center gap-0.5">
                          <StarIcon
                          size={11}
                          className="text-amber-500 fill-amber-500" />

                          <span className="text-xs font-bold text-gray-900">
                            {ev.score}/5
                          </span>
                        </div> :

                      <span className="text-xs text-gray-400">—</span>
                      }
                    </td>
                    <td className="px-3 py-1.5">
                      <span
                        className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs ${ev.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>

                        {ev.status === 'completed' ?
                        <>
                            <CheckCircle2Icon size={10} />
                            Complétée
                          </> :

                        <>
                            <ClockIcon size={10} />
                            En attente
                          </>
                        }
                      </span>
                    </td>
                    <td className="px-3 py-1.5">
                      <div className="flex items-center gap-1">
                        <button className="px-2 py-0.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                          {ev.status === 'completed' ? 'Voir' : 'Compléter'}
                        </button>
                        {ev.categories &&
                        <button
                          onClick={() => toggleRow(ev.id)}
                          className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600">

                            {isExpanded ?
                          <ChevronUpIcon size={11} /> :

                          <ChevronDownIcon size={11} />
                          }
                          </button>
                        }
                      </div>
                    </td>
                  </tr>
                  {isExpanded && ev.categories &&
                  <tr className="border-b border-gray-100 bg-gray-50">
                      <td colSpan={7} className="px-3 py-2">
                        <div className="text-xs font-medium text-gray-600 mb-1.5">
                          Détails de l'évaluation
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          <div className="bg-white border border-gray-200 rounded p-2">
                            <div className="text-xs text-gray-500 mb-0.5">
                              Compétences techniques
                            </div>
                            <div className="text-sm font-bold text-gray-900">
                              {ev.categories.technical}/5
                            </div>
                          </div>
                          <div className="bg-white border border-gray-200 rounded p-2">
                            <div className="text-xs text-gray-500 mb-0.5">
                              Communication
                            </div>
                            <div className="text-sm font-bold text-gray-900">
                              {ev.categories.communication}/5
                            </div>
                          </div>
                          <div className="bg-white border border-gray-200 rounded p-2">
                            <div className="text-xs text-gray-500 mb-0.5">
                              Travail d'équipe
                            </div>
                            <div className="text-sm font-bold text-gray-900">
                              {ev.categories.teamwork}/5
                            </div>
                          </div>
                          <div className="bg-white border border-gray-200 rounded p-2">
                            <div className="text-xs text-gray-500 mb-0.5">
                              Ponctualité
                            </div>
                            <div className="text-sm font-bold text-gray-900">
                              {ev.categories.punctuality}/5
                            </div>
                          </div>
                        </div>
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
export default PerformanceEvaluations;