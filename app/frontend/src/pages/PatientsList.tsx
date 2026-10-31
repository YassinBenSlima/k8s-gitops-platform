import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HeartIcon,
  UserIcon,
  PlusIcon,
  SearchIcon,
  EyeIcon,
  AlertTriangleIcon,
} from 'lucide-react';
import {
  patientService,
  PatientSummary,
  PatientStatsResponse,
} from '../services/patientService';
import NouveauPatient from '../components/patients/NouveauPatient';

const risqueColor = (r: string) => {
  if (r === 'Critique' || r === 'TresEleve') return 'bg-red-100 text-red-700';
  if (r === 'Eleve')   return 'bg-orange-100 text-orange-700';
  if (r === 'Modere')  return 'bg-yellow-100 text-yellow-700';
  return 'bg-green-100 text-green-700';
};
const risqueLabel = (r: string) => {
  if (r === 'Critique' || r === 'TresEleve') return 'Critique';
  if (r === 'Eleve')  return 'Élevé';
  if (r === 'Modere') return 'Modéré';
  if (r === 'Faible') return 'Faible';
  return r;
};

const PatientsList: React.FC = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<PatientSummary[]>([]);
  const [stats, setStats] = useState<PatientStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [showNewPatient, setShowNewPatient] = useState(false);

  const load = () => {
    setLoading(true);
    setError(null);
    Promise.all([
      patientService.getAll({ pageSize: 100 }),
      patientService.getStats(),
    ])
      .then(([paged, s]) => {
        setPatients(paged.items);
        setStats(s);
      })
      .catch(() => setError('Impossible de charger la liste des patients.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const filtered = patients.filter((p) =>
    p.nomComplet.toLowerCase().includes(search.toLowerCase()) ||
    p.numeroDossier.toLowerCase().includes(search.toLowerCase()) ||
    (p.telephone ?? '').includes(search) ||
    (p.ville ?? '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-3">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-red-600 rounded-lg flex items-center justify-center">
            <HeartIcon className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900">Gestion des Patients</h1>
            <p className="text-xs text-gray-500">
              Cardiologie — {stats?.totalPatients ?? patients.length} patients enregistrés
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="relative">
            <SearchIcon className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un patient..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white w-52 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>
          <button
            onClick={() => setShowNewPatient(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-sm font-medium">
            <PlusIcon className="w-3.5 h-3.5" />
            Nouveau Patient
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
          <AlertTriangleIcon className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        {[
          { label: 'Total patients',   value: stats?.totalPatients ?? patients.length, color: 'text-gray-900',   border: 'border-gray-200' },
          { label: 'Critiques',        value: stats?.risqueCritique ?? '—',            color: 'text-red-600',    border: 'border-red-200' },
          { label: 'Risque élevé',     value: stats?.risqueEleve ?? '—',               color: 'text-orange-600', border: 'border-orange-200' },
          { label: 'Nouveaux ce mois', value: stats?.nouveauxCeMois ?? '—',            color: 'text-blue-600',   border: 'border-blue-200' },
        ].map((s) => (
          <div key={s.label} className={`bg-white border ${s.border} rounded-lg p-2.5 shadow-sm`}>
            <p className="text-[10px] text-gray-500 mb-0.5">{s.label}</p>
            <p className={`text-xl font-bold ${s.color}`}>{loading ? '…' : s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {['Patient', 'N° Dossier', 'Niveau de risque', 'Ville', 'Dernière consultation', 'Consultations', 'Actions'].map((h) => (
                <th key={h} className="text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <UserIcon className="w-3.5 h-3.5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-900">{p.nomComplet}</p>
                      <p className="text-[10px] text-gray-500">{p.age} ans • {p.genre}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-2">
                  <span className="text-xs font-mono text-red-600 font-semibold">{p.numeroDossier}</span>
                </td>
                <td className="px-3 py-2">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${risqueColor(p.niveauRisque)}`}>
                    {risqueLabel(p.niveauRisque)}
                  </span>
                </td>
                <td className="px-3 py-2 text-xs text-gray-600">
                  {p.ville ?? <span className="text-gray-300">—</span>}
                </td>
                <td className="px-3 py-2 text-xs text-gray-600">
                  {p.derniereConsultation
                    ? new Date(p.derniereConsultation).toLocaleDateString('fr-FR')
                    : <span className="text-gray-300">—</span>}
                </td>
                <td className="px-3 py-2 text-xs text-gray-600 text-center">{p.nbConsultations}</td>
                <td className="px-3 py-2">
                  <button
                    onClick={() => navigate(`/patients/${p.id}/manage`)}
                    className="flex items-center gap-1 px-2.5 py-1 text-[10px] bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
                    <EyeIcon className="w-3 h-3" />
                    Voir dossier
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {loading && (
          <div className="text-center py-8 text-gray-400">
            <div className="animate-spin w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full mx-auto mb-2" />
            <p className="text-xs">Chargement des patients…</p>
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <UserIcon className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p className="text-xs">
              {patients.length === 0 ? 'Aucun patient enregistré' : 'Aucun résultat pour cette recherche'}
            </p>
          </div>
        )}
      </div>

      {showNewPatient && (
        <NouveauPatient
          onClose={() => setShowNewPatient(false)}
          onSave={() => { setShowNewPatient(false); load(); }}
        />
      )}
    </div>
  );
};

export default PatientsList;
