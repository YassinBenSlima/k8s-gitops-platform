import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import { cardiologyService, CardiologyReport, RiskLevelLabels } from '../services/cardiologyService';
import { FileHeart, Eye } from 'lucide-react';

const riskColors: Record<number, string> = {
  0: 'bg-green-100 text-green-700',
  1: 'bg-yellow-100 text-yellow-700',
  2: 'bg-orange-100 text-orange-700',
  3: 'bg-red-100 text-red-700',
};

const CardiologyReports: React.FC = () => {
  const [reports, setReports] = useState<CardiologyReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    cardiologyService.getReports()
      .then(setReports)
      .catch((e: any) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FileHeart className="w-6 h-6" /> Cardiology Reports
          </h1>
          <p className="text-gray-500 mt-1">{reports.length} reports</p>
        </div>

        {error && <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div>}

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-400">Loading...</div>
          ) : reports.length === 0 ? (
            <div className="p-8 text-center text-gray-400">No cardiology reports yet</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Patient</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Risk Level</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Summary</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">ECGs</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reports.map(r => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      {r.patient ? `${r.patient.firstName} ${r.patient.lastName}` : `#${r.patientId}`}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${riskColors[r.overallRiskLevel] || ''}`}>
                        {RiskLevelLabels[r.overallRiskLevel]}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 max-w-xs truncate">{r.summary || '-'}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{r.ecgRecords?.length || 0}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{new Date(r.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-right">
                      <Link to={`/cardiology/reports/${r.id}`} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition inline-block">
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

export default CardiologyReports;