import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import { cardiologyService, CardiologyReport, RiskLevelLabels, ECGInterpretationLabels } from '../services/cardiologyService';
import { FileHeart, Activity, Heart, Zap, Monitor } from 'lucide-react';

const riskColors: Record<number, string> = { 0: 'text-green-700 bg-green-50', 1: 'text-yellow-700 bg-yellow-50', 2: 'text-orange-700 bg-orange-50', 3: 'text-red-700 bg-red-50' };

const CardiologyReportDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<CardiologyReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    cardiologyService.getReport(parseInt(id))
      .then(setReport)
      .catch((e: any) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <AppLayout><div className="p-8 text-center text-gray-400">Loading...</div></AppLayout>;
  if (!report) return <AppLayout><div className="p-8 text-center text-red-500">{error || 'Not found'}</div></AppLayout>;

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FileHeart className="w-6 h-6" /> Cardiology Report #{report.id}
          </h1>
          <p className="text-gray-500 mt-1">
            {report.patient ? `${report.patient.firstName} ${report.patient.lastName}` : ''} — {new Date(report.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Overview */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500">Overall Risk</p>
              <span className={`inline-block mt-1 text-sm font-bold px-3 py-1 rounded-full ${riskColors[report.overallRiskLevel]}`}>
                {RiskLevelLabels[report.overallRiskLevel]}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Next Follow-up</p>
              <p className="text-sm font-medium mt-1">{report.nextFollowUpDate ? new Date(report.nextFollowUpDate).toLocaleDateString() : 'Not set'}</p>
            </div>
          </div>
          {report.summary && (
            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-1">Summary</p>
              <p className="text-sm text-gray-700">{report.summary}</p>
            </div>
          )}
          {report.recommendations && (
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-1">Recommendations</p>
              <p className="text-sm text-gray-700">{report.recommendations}</p>
            </div>
          )}
        </div>

        {/* ECG Records */}
        {report.ecgRecords && report.ecgRecords.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" /> ECG Records ({report.ecgRecords.length})
            </h2>
            <div className="space-y-3">
              {report.ecgRecords.map(ecg => (
                <div key={ecg.id} className="p-4 rounded-lg border border-gray-100 bg-gray-50">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    <div><p className="text-xs text-gray-500">Heart Rate</p><p className="text-sm font-bold">{ecg.heartRate} bpm</p></div>
                    <div><p className="text-xs text-gray-500">Rhythm</p><p className="text-sm font-medium">{ecg.rhythm || '-'}</p></div>
                    <div><p className="text-xs text-gray-500">PR Interval</p><p className="text-sm font-medium">{ecg.prInterval ? `${ecg.prInterval} ms` : '-'}</p></div>
                    <div><p className="text-xs text-gray-500">QRS Duration</p><p className="text-sm font-medium">{ecg.qrsDuration ? `${ecg.qrsDuration} ms` : '-'}</p></div>
                    <div><p className="text-xs text-gray-500">Interpretation</p><p className="text-sm font-medium">{ECGInterpretationLabels[ecg.interpretation]}</p></div>
                  </div>
                  {ecg.interpretationNotes && <p className="text-sm text-gray-600 mt-2">{ecg.interpretationNotes}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Echo Records */}
        {report.echocardiogramRecords && report.echocardiogramRecords.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Monitor className="w-5 h-5 text-purple-500" /> Echocardiogram Records ({report.echocardiogramRecords.length})
            </h2>
            {report.echocardiogramRecords.map(echo => (
              <div key={echo.id} className="p-4 rounded-lg border border-gray-100 bg-gray-50 mb-3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {echo.lvef != null && <div><p className="text-xs text-gray-500">LVEF</p><p className="text-sm font-bold">{echo.lvef}%</p></div>}
                  {echo.leftAtriumSize != null && <div><p className="text-xs text-gray-500">LA Size</p><p className="text-sm font-medium">{echo.leftAtriumSize} mm</p></div>}
                  {echo.aorticRootDiameter != null && <div><p className="text-xs text-gray-500">Aortic Root</p><p className="text-sm font-medium">{echo.aorticRootDiameter} mm</p></div>}
                  <div><p className="text-xs text-gray-500">Pericardial Effusion</p><p className="text-sm font-medium">{echo.pericardialEffusion ? 'Yes' : 'No'}</p></div>
                </div>
                {echo.interpretation && <p className="text-sm text-gray-600 mt-2">{echo.interpretation}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Cardiac Risk Assessment */}
        {report.cardiacRiskAssessment && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-red-500" /> Cardiac Risk Assessment
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {report.cardiacRiskAssessment.totalCholesterol != null && <div><p className="text-xs text-gray-500">Total Cholesterol</p><p className="text-sm font-medium">{report.cardiacRiskAssessment.totalCholesterol} mg/dL</p></div>}
              {report.cardiacRiskAssessment.ldl != null && <div><p className="text-xs text-gray-500">LDL</p><p className="text-sm font-medium">{report.cardiacRiskAssessment.ldl} mg/dL</p></div>}
              {report.cardiacRiskAssessment.hdl != null && <div><p className="text-xs text-gray-500">HDL</p><p className="text-sm font-medium">{report.cardiacRiskAssessment.hdl} mg/dL</p></div>}
              {report.cardiacRiskAssessment.framinghamScore != null && <div><p className="text-xs text-gray-500">Framingham Score</p><p className="text-sm font-bold">{report.cardiacRiskAssessment.framinghamScore}%</p></div>}
              <div><p className="text-xs text-gray-500">Smoker</p><p className="text-sm font-medium">{report.cardiacRiskAssessment.isSmoker ? 'Yes' : 'No'}</p></div>
              <div><p className="text-xs text-gray-500">Diabetic</p><p className="text-sm font-medium">{report.cardiacRiskAssessment.isDiabetic ? 'Yes' : 'No'}</p></div>
              <div><p className="text-xs text-gray-500">Hypertensive</p><p className="text-sm font-medium">{report.cardiacRiskAssessment.isHypertensive ? 'Yes' : 'No'}</p></div>
              <div><p className="text-xs text-gray-500">Family Hx CAD</p><p className="text-sm font-medium">{report.cardiacRiskAssessment.familyHistoryCAD ? 'Yes' : 'No'}</p></div>
            </div>
          </div>
        )}

        {/* Blood Pressure Logs */}
        {report.bloodPressureLogs && report.bloodPressureLogs.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" /> Blood Pressure Logs ({report.bloodPressureLogs.length})
            </h2>
            <table className="w-full text-sm">
              <thead><tr className="bg-gray-50"><th className="text-left py-2 px-3 text-xs text-gray-500">Date</th><th className="text-left py-2 px-3 text-xs text-gray-500">Systolic</th><th className="text-left py-2 px-3 text-xs text-gray-500">Diastolic</th><th className="text-left py-2 px-3 text-xs text-gray-500">HR</th></tr></thead>
              <tbody className="divide-y divide-gray-50">
                {report.bloodPressureLogs.map(bp => (
                  <tr key={bp.id}><td className="py-2 px-3">{bp.measuredAt ? new Date(bp.measuredAt).toLocaleString() : '-'}</td><td className="py-2 px-3 font-medium">{bp.systolic}</td><td className="py-2 px-3 font-medium">{bp.diastolic}</td><td className="py-2 px-3">{bp.heartRate || '-'}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Stress Tests */}
        {report.stressTestRecords && report.stressTestRecords.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Stress Tests</h2>
            {report.stressTestRecords.map(st => (
              <div key={st.id} className="p-4 rounded-lg bg-gray-50 mb-2">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <div><p className="text-xs text-gray-500">Protocol</p><p className="text-sm">{st.protocol || '-'}</p></div>
                  <div><p className="text-xs text-gray-500">Max HR</p><p className="text-sm font-bold">{st.maxHR || '-'} bpm</p></div>
                  <div><p className="text-xs text-gray-500">METs</p><p className="text-sm">{st.mets || '-'}</p></div>
                  <div><p className="text-xs text-gray-500">Positive</p><p className="text-sm font-medium">{st.isPositive ? 'Yes' : 'No'}</p></div>
                  <div><p className="text-xs text-gray-500">Duration</p><p className="text-sm">{st.exerciseDuration ? `${Math.floor(st.exerciseDuration / 60)}m${st.exerciseDuration % 60}s` : '-'}</p></div>
                </div>
                {st.interpretation && <p className="text-sm text-gray-600 mt-2">{st.interpretation}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Holter */}
        {report.holterRecords && report.holterRecords.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Holter Records</h2>
            {report.holterRecords.map(h => (
              <div key={h.id} className="p-4 rounded-lg bg-gray-50 mb-2">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <div><p className="text-xs text-gray-500">Duration</p><p className="text-sm font-bold">{h.durationHours}h</p></div>
                  <div><p className="text-xs text-gray-500">Avg HR</p><p className="text-sm">{h.avgHR || '-'} bpm</p></div>
                  <div><p className="text-xs text-gray-500">Min/Max HR</p><p className="text-sm">{h.minHR || '-'}/{h.maxHR || '-'} bpm</p></div>
                  <div><p className="text-xs text-gray-500">AF Detected</p><p className="text-sm font-medium">{h.afDetected ? 'Yes' : 'No'}</p></div>
                  <div><p className="text-xs text-gray-500">Total Beats</p><p className="text-sm">{h.totalBeats?.toLocaleString() || '-'}</p></div>
                </div>
                {h.interpretation && <p className="text-sm text-gray-600 mt-2">{h.interpretation}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default CardiologyReportDetail;