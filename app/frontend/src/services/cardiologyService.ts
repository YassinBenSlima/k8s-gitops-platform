import { api } from './api';

export interface CardiologyReport {
  id: number;
  consultationId: number;
  patientId: number;
  doctorId: number;
  overallRiskLevel: number;
  summary?: string;
  recommendations?: string;
  nextFollowUpDate?: string;
  patient?: { firstName: string; lastName: string };
  doctor?: { firstName: string; lastName: string };
  ecgRecords?: ECGRecord[];
  echocardiogramRecords?: EchoRecord[];
  cardiacRiskAssessment?: CardiacRiskAssessment;
  stressTestRecords?: StressTestRecord[];
  holterRecords?: HolterRecord[];
  bloodPressureLogs?: BloodPressureLog[];
  createdAt: string;
}

export interface ECGRecord {
  id?: number;
  cardiologyReportId: number;
  patientId: number;
  recordedAt?: string;
  heartRate: number;
  prInterval?: number;
  qrsDuration?: number;
  qtInterval?: number;
  qtcInterval?: number;
  rhythm?: string;
  axis?: string;
  interpretation: number;
  interpretationNotes?: string;
  rawDataPath?: string;
  pdfReportPath?: string;
}

export interface EchoRecord {
  id?: number;
  cardiologyReportId: number;
  patientId: number;
  recordedAt?: string;
  lvef?: number;
  lvidD?: number;
  lvidS?: number;
  ivsd?: number;
  lvpwD?: number;
  leftAtriumSize?: number;
  aorticRootDiameter?: number;
  mitralValveStatus?: string;
  aorticValveStatus?: string;
  tricuspidValveStatus?: string;
  pulmonaryValveStatus?: string;
  wallMotionAbnormalities?: string;
  pericardialEffusion: boolean;
  interpretation?: string;
}

export interface BloodPressureLog {
  id?: number;
  patientId: number;
  cardiologyReportId?: number;
  systolic: number;
  diastolic: number;
  heartRate?: number;
  measuredAt?: string;
  position?: string;
  arm?: string;
  notes?: string;
}

export interface CardiacRiskAssessment {
  id?: number;
  cardiologyReportId: number;
  patientId: number;
  totalCholesterol?: number;
  ldl?: number;
  hdl?: number;
  triglycerides?: number;
  fastingGlucose?: number;
  hbA1c?: number;
  isSmoker: boolean;
  isDiabetic: boolean;
  isHypertensive: boolean;
  familyHistoryCAD: boolean;
  framinghamScore?: number;
  score2Risk?: number;
  calculatedRiskLevel: number;
}

export interface StressTestRecord {
  id?: number;
  cardiologyReportId: number;
  patientId: number;
  testDate?: string;
  protocol?: string;
  baselineHR?: number;
  maxHR?: number;
  targetHR?: number;
  maxSystolicBP?: number;
  maxDiastolicBP?: number;
  exerciseDuration?: number;
  mets?: number;
  stChanges?: string;
  symptoms?: string;
  isPositive: boolean;
  interpretation?: string;
}

export interface HolterRecord {
  id?: number;
  cardiologyReportId: number;
  patientId: number;
  startDate: string;
  endDate: string;
  durationHours: number;
  minHR?: number;
  maxHR?: number;
  avgHR?: number;
  totalBeats?: number;
  supraventricularBeats?: number;
  ventricularBeats?: number;
  pauses?: number;
  longestPause?: number;
  afDetected: boolean;
  interpretation?: string;
}

export const RiskLevelLabels: Record<number, string> = {
  0: 'Low',
  1: 'Moderate',
  2: 'High',
  3: 'Critical',
};

export const ECGInterpretationLabels: Record<number, string> = {
  0: 'Normal',
  1: 'Abnormal',
  2: 'Borderline',
  3: 'Inconclusive',
};

export const cardiologyService = {
  // Reports
  getReports: (patientId?: number) => {
    const q = patientId ? `?patientId=${patientId}` : '';
    return api.get<CardiologyReport[]>(`/cardiology/reports${q}`);
  },
  getReport: (id: number) => api.get<CardiologyReport>(`/cardiology/reports/${id}`),
  createReport: (data: Partial<CardiologyReport>) => api.post<CardiologyReport>('/cardiology/reports', data),

  // ECG
  createECG: (data: ECGRecord) => api.post<ECGRecord>('/cardiology/ecg', data),
  getECGsByPatient: (patientId: number) => api.get<ECGRecord[]>(`/cardiology/ecg/patient/${patientId}`),

  // Echo
  createEcho: (data: EchoRecord) => api.post<EchoRecord>('/cardiology/echo', data),
  getEchosByPatient: (patientId: number) => api.get<EchoRecord[]>(`/cardiology/echo/patient/${patientId}`),

  // Blood Pressure
  createBP: (data: BloodPressureLog) => api.post<BloodPressureLog>('/cardiology/bp', data),
  getBPByPatient: (patientId: number) => api.get<BloodPressureLog[]>(`/cardiology/bp/patient/${patientId}`),

  // Risk
  createRisk: (data: CardiacRiskAssessment) => api.post<CardiacRiskAssessment>('/cardiology/risk', data),

  // Stress Test
  createStressTest: (data: StressTestRecord) => api.post<StressTestRecord>('/cardiology/stress-test', data),

  // Holter
  createHolter: (data: HolterRecord) => api.post<HolterRecord>('/cardiology/holter', data),
  getHolterByPatient: (patientId: number) => api.get<HolterRecord[]>(`/cardiology/holter/patient/${patientId}`),
};