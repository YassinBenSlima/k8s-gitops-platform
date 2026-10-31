import { api } from './api';

export interface Appointment {
  id: number;
  patientId: number;
  doctorId: number;
  scheduledAt: string;
  duration: number;
  status: number;
  reason?: string;
  notes?: string;
  patient?: { firstName: string; lastName: string };
  doctor?: { firstName: string; lastName: string };
  createdAt: string;
  updatedAt: string;
}

export interface AppointmentCreate {
  patientId: number;
  doctorId: number;
  scheduledAt: string;
  duration: number;
  reason?: string;
  notes?: string;
}

export const AppointmentStatusLabels: Record<number, string> = {
  0: 'Pending',
  1: 'Confirmed',
  2: 'Cancelled',
  3: 'Rescheduled',
  4: 'Completed',
};

export const appointmentService = {
  getAll: (params?: { patientId?: number; doctorId?: number; from?: string; to?: string }) => {
    const qs = new URLSearchParams();
    if (params?.patientId) qs.set('patientId', String(params.patientId));
    if (params?.doctorId) qs.set('doctorId', String(params.doctorId));
    if (params?.from) qs.set('from', params.from);
    if (params?.to) qs.set('to', params.to);
    const q = qs.toString();
    return api.get<Appointment[]>(`/appointments${q ? `?${q}` : ''}`);
  },
  getById: (id: number) => api.get<Appointment>(`/appointments/${id}`),
  create: (data: AppointmentCreate) => api.post<Appointment>('/appointments', data),
  update: (id: number, data: Partial<Appointment>) => api.put<Appointment>(`/appointments/${id}`, data),
  delete: (id: number) => api.delete(`/appointments/${id}`),
};