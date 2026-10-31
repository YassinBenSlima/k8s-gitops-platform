import { api } from './api';

export interface VitalSigns {
  id?: number;
  consultationId?: number;
  heartRate?: number;
  systolicBP?: number;
  diastolicBP?: number;
  temperature?: number;
  respiratoryRate?: number;
  oxygenSaturation?: number;
  weight?: number;
  height?: number;
  bmi?: number;
  recordedAt?: string;
}

export interface Diagnosis {
  id?: number;
  consultationId?: number;
  icdCode: string;
  description: string;
  isPrimary: boolean;
  notes?: string;
}

export interface PrescriptionItem {
  id?: number;
  prescriptionId?: number;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration?: string;
  route?: string;
  instructions?: string;
}

export interface Prescription {
  id?: number;
  consultationId?: number;
  patientId: number;
  doctorId: number;
  status: number;
  notes?: string;
  items: PrescriptionItem[];
}

export interface Consultation {
  id: number;
  patientId: number;
  doctorId: number;
  appointmentId?: number;
  type: number;
  status: number;
  startedAt: string;
  endedAt?: string;
  chiefComplaint: string;
  historyOfPresentIllness?: string;
  physicalExamination?: string;
  assessment?: string;
  plan?: string;
  notes?: string;
  patient?: { firstName: string; lastName: string };
  doctor?: { firstName: string; lastName: string };
  vitalSigns?: VitalSigns;
  diagnoses?: Diagnosis[];
  prescriptions?: Prescription[];
  cardiologyReport?: unknown;
  createdAt: string;
  updatedAt: string;
}

export const ConsultationStatusLabels: Record<number, string> = {
  0: 'Scheduled',
  1: 'In Progress',
  2: 'Completed',
  3: 'Cancelled',
  4: 'No Show',
};

export const ConsultationTypeLabels: Record<number, string> = {
  0: 'Initial',
  1: 'Follow-Up',
  2: 'Emergency',
  3: 'Pre-Operative',
  4: 'Post-Operative',
};

export interface ConsultationCreate {
  patientId: number;
  doctorId: number;
  appointmentId?: number;
  type: number;
  chiefComplaint: string;
  startedAt: string;
}

export const consultationService = {
  getAll: (params?: { patientId?: number; doctorId?: number }) => {
    const qs = new URLSearchParams();
    if (params?.patientId) qs.set('patientId', String(params.patientId));
    if (params?.doctorId) qs.set('doctorId', String(params.doctorId));
    const q = qs.toString();
    return api.get<Consultation[]>(`/consultations${q ? `?${q}` : ''}`);
  },
  getById: (id: number) => api.get<Consultation>(`/consultations/${id}`),
  create: (data: ConsultationCreate) => api.post<Consultation>('/consultations', data),
  update: (id: number, data: Partial<Consultation>) => api.put<Consultation>(`/consultations/${id}`, data),
};