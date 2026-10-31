import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import { consultationService, Consultation, ConsultationStatusLabels, ConsultationTypeLabels } from '../services/consultationService';
import { patientService, Patient } from '../services/patientService';
import { Stethoscope, Plus, X, Eye } from 'lucide-react';

const statusColors: Record<number, string> = {
  0: 'bg-yellow-100 text-yellow-700',
  1: 'bg-blue-100 text-blue-700',
  2: 'bg-green-100 text-green-700',
  3: 'bg-red-100 text-red-700',
  4: 'bg-gray-100 text-gray-700',
};

const Consultations: React.FC = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({ patientId: '', doctorId: '1', type: '0', chiefComplaint: '' });

  useEffect(() => {
    Promise.all([
      consultationService.getAll(),
      patientService.getAll().catch(() => []),
    ])
      .then(([c, p]) => { setConsultations(c); setPatients(p); })
      .catch((e: any) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const newC = await consultationService.create({
        patientId: parseInt(form.patientId),
        doctorId: parseInt(form.doctorId),
        type: parseInt(form.type),
        chiefComplaint: form.chiefComplaint,
        startedAt: new Date().toISOString(),
      });
      setConsultations(prev => [newC, ...prev]);
      setShowCreate(false);
      setForm({ patientId: '', doctorId: '1', type: '0', chiefComplaint: '' });
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Stethoscope className="w-6 h-6" /> Consultations
            </h1>
            <p className="text-gray-500 mt-1">{consultations.length} total</p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
          >
            <Plus className="w-4 h-4" /> New Consultation
          </button>
        </div>

        {error && <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div>}

        {showCreate && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">New Consultation</h2>
                <button onClick={() => setShowCreate(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
                  <select value={form.patientId} onChange={e => setForm({ ...form, patientId: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" required>
                    <option value="">Select patient...</option>
                    {patients.map(p => <option key={p.id} value={p.id}>{p.firstName} {p.lastName}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    {Object.entries(ConsultationTypeLabels).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Chief Complaint</label>
                  <textarea value={form.chiefComplaint} onChange={e => setForm({ ...form, chiefComplaint: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows={3} required />
                </div>
                <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Start Consultation</button>
              </form>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-400">Loading...</div>
          ) : consultations.length === 0 ? (
            <div className="p-8 text-center text-gray-400">No consultations</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Patient</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Type</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Chief Complaint</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {consultations.map(c => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      {c.patient ? `${c.patient.firstName} ${c.patient.lastName}` : `#${c.patientId}`}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{ConsultationTypeLabels[c.type]}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 max-w-xs truncate">{c.chiefComplaint}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{new Date(c.startedAt).toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[c.status] || ''}`}>
                        {ConsultationStatusLabels[c.status]}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link to={`/consultations/${c.id}`} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition inline-block">
                        <Eye className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Consultations;