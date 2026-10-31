import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import { consultationService, Consultation, ConsultationStatusLabels, ConsultationTypeLabels } from '../services/consultationService';
import { Stethoscope, Heart, FileText, Save } from 'lucide-react';

const ConsultationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [edit, setEdit] = useState({
    status: 0,
    historyOfPresentIllness: '',
    physicalExamination: '',
    assessment: '',
    plan: '',
    notes: '',
  });

  useEffect(() => {
    if (!id) return;
    consultationService.getById(parseInt(id))
      .then(c => {
        setConsultation(c);
        setEdit({
          status: c.status,
          historyOfPresentIllness: c.historyOfPresentIllness || '',
          physicalExamination: c.physicalExamination || '',
          assessment: c.assessment || '',
          plan: c.plan || '',
          notes: c.notes || '',
        });
      })
      .catch((e: any) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSave = async () => {
    if (!consultation) return;
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const updated = await consultationService.update(consultation.id, {
        ...edit,
        chiefComplaint: consultation.chiefComplaint,
        endedAt: edit.status === 2 ? new Date().toISOString() : undefined,
      } as any);
      setConsultation(prev => prev ? { ...prev, ...updated } : null);
      setSuccess('Saved successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AppLayout><div className="p-8 text-center text-gray-400">Loading...</div></AppLayout>;
  if (!consultation) return <AppLayout><div className="p-8 text-center text-red-500">{error || 'Not found'}</div></AppLayout>;

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Stethoscope className="w-6 h-6" /> Consultation #{consultation.id}
            </h1>
            <p className="text-gray-500 mt-1">
              {consultation.patient ? `${consultation.patient.firstName} ${consultation.patient.lastName}` : ''} — {ConsultationTypeLabels[consultation.type]}
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save'}
          </button>
        </div>

        {error && <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div>}
        {success && <div className="p-3 rounded-lg bg-green-50 text-green-700 text-sm">{success}</div>}

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-500">Status</p>
              <select
                value={edit.status}
                onChange={e => setEdit({ ...edit, status: parseInt(e.target.value) })}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                {Object.entries(ConsultationStatusLabels).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
            <div>
              <p className="text-xs text-gray-500">Started</p>
              <p className="text-sm font-medium mt-1">{new Date(consultation.startedAt).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Chief Complaint</p>
              <p className="text-sm font-medium mt-1">{consultation.chiefComplaint}</p>
            </div>
          </div>
        </div>

        {consultation.vitalSigns && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" /> Vital Signs
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {consultation.vitalSigns.heartRate && <VitalCard label="Heart Rate" value={`${consultation.vitalSigns.heartRate} bpm`} />}
              {consultation.vitalSigns.systolicBP && <VitalCard label="Blood Pressure" value={`${consultation.vitalSigns.systolicBP}/${consultation.vitalSigns.diastolicBP} mmHg`} />}
              {consultation.vitalSigns.temperature && <VitalCard label="Temperature" value={`${consultation.vitalSigns.temperature} °C`} />}
              {consultation.vitalSigns.oxygenSaturation && <VitalCard label="SpO₂" value={`${consultation.vitalSigns.oxygenSaturation}%`} />}
              {consultation.vitalSigns.weight && <VitalCard label="Weight" value={`${consultation.vitalSigns.weight} kg`} />}
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5" /> Clinical Notes
          </h2>
          <Field label="History of Present Illness" value={edit.historyOfPresentIllness} onChange={v => setEdit({ ...edit, historyOfPresentIllness: v })} />
          <Field label="Physical Examination" value={edit.physicalExamination} onChange={v => setEdit({ ...edit, physicalExamination: v })} />
          <Field label="Assessment" value={edit.assessment} onChange={v => setEdit({ ...edit, assessment: v })} />
          <Field label="Plan" value={edit.plan} onChange={v => setEdit({ ...edit, plan: v })} />
          <Field label="Notes" value={edit.notes} onChange={v => setEdit({ ...edit, notes: v })} />
        </div>

        {consultation.diagnoses && consultation.diagnoses.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Diagnoses</h2>
            <div className="space-y-2">
              {consultation.diagnoses.map(d => (
                <div key={d.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <span className="text-xs font-mono bg-blue-100 text-blue-700 px-2 py-1 rounded">{d.icdCode}</span>
                  <span className="text-sm text-gray-900">{d.description}</span>
                  {d.isPrimary && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Primary</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {consultation.prescriptions && consultation.prescriptions.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Prescriptions</h2>
            {consultation.prescriptions.map(rx => (
              <div key={rx.id} className="mb-4 last:mb-0">
                {rx.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 mb-1">
                    <span className="text-sm font-medium text-gray-900">{item.medicationName}</span>
                    <span className="text-sm text-gray-600">{item.dosage}</span>
                    <span className="text-sm text-gray-500">{item.frequency}</span>
                    {item.duration && <span className="text-xs text-gray-400">{item.duration}</span>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

const VitalCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="p-3 rounded-lg bg-gray-50">
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-lg font-bold text-gray-900 mt-1">{value}</p>
  </div>
);

const Field: React.FC<{ label: string; value: string; onChange: (v: string) => void }> = ({ label, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
      rows={3}
    />
  </div>
);

export default ConsultationDetail;