import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import { patientService, Patient } from '../services/patientService';
import { consultationService, Consultation } from '../services/consultationService';
import { cardiologyService, BloodPressureLog } from '../services/cardiologyService';
import { User, Stethoscope, Activity } from 'lucide-react';

const GenderLabels: Record<number, string> = { 0: 'Male', 1: 'Female', 2: 'Other' };
const BloodTypeLabels: Record<number, string> = { 0: 'A+', 1: 'A-', 2: 'B+', 3: 'B-', 4: 'AB+', 5: 'AB-', 6: 'O+', 7: 'O-' };

const PatientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [bpLogs, setBpLogs] = useState<BloodPressureLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    const pid = parseInt(id);

    Promise.all([
      patientService.getById(pid),
      consultationService.getAll({ patientId: pid }).catch(() => []),
      cardiologyService.getBPByPatient(pid).catch(() => []),
    ])
      .then(([p, c, bp]) => { setPatient(p); setConsultations(c); setBpLogs(bp); })
      .catch((e: any) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <AppLayout><div className="p-8 text-center text-gray-400">Loading...</div></AppLayout>;
  if (error || !patient) return <AppLayout><div className="p-8 text-center text-red-500">{error || 'Patient not found'}</div></AppLayout>;

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <User className="w-6 h-6" /> {patient.firstName} {patient.lastName}
          </h1>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Info label="Gender" value={GenderLabels[patient.gender]} />
            <Info label="Date of Birth" value={new Date(patient.dateOfBirth).toLocaleDateString()} />
            <Info label="Blood Type" value={patient.bloodType != null ? BloodTypeLabels[patient.bloodType] : '-'} />
            <Info label="Phone" value={patient.phoneNumber || '-'} />
            <Info label="Email" value={patient.email || '-'} />
            <Info label="City" value={patient.city || '-'} />
            <Info label="Allergies" value={patient.allergies || 'None'} />
            <Info label="Chronic Conditions" value={patient.chronicConditions || 'None'} />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Stethoscope className="w-5 h-5" /> Consultations ({consultations.length})
          </h2>
          {consultations.length === 0 ? (
            <p className="text-gray-400 text-sm">No consultations yet</p>
          ) : (
            <div className="space-y-2">
              {consultations.slice(0, 10).map(c => (
                <Link
                  key={c.id}
                  to={`/consultations/${c.id}`}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition"
                >
                  <div>
                    <span className="text-sm font-medium text-gray-900">{c.chiefComplaint}</span>
                    <span className="text-xs text-gray-400 ml-3">{new Date(c.startedAt).toLocaleDateString()}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${c.status === 2 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {c.status === 2 ? 'Completed' : 'Open'}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5" /> Blood Pressure History ({bpLogs.length})
          </h2>
          {bpLogs.length === 0 ? (
            <p className="text-gray-400 text-sm">No BP logs recorded</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500">Date</th>
                    <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500">Systolic</th>
                    <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500">Diastolic</th>
                    <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500">HR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {bpLogs.slice(0, 20).map(bp => (
                    <tr key={bp.id}>
                      <td className="py-2 px-3 text-gray-600">{bp.measuredAt ? new Date(bp.measuredAt).toLocaleString() : '-'}</td>
                      <td className="py-2 px-3 font-medium text-gray-900">{bp.systolic}</td>
                      <td className="py-2 px-3 font-medium text-gray-900">{bp.diastolic}</td>
                      <td className="py-2 px-3 text-gray-600">{bp.heartRate || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

const Info: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm font-medium text-gray-900">{value}</p>
  </div>
);

export default PatientDetail;