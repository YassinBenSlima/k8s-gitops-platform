import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ActivityIcon,
  AlertTriangleIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  CreditCardIcon,
  DollarSignIcon,
  LayoutDashboardIcon,
  PackageIcon,
  TrendingUpIcon,
  UserIcon,
  UsersIcon,
  ZapIcon,
  ArrowUpRightIcon,
  ArrowDownRightIcon,
  RefreshCwIcon,
  FileTextIcon,
  MessageSquareIcon,
  SettingsIcon,
  BellIcon,
  HeartIcon } from
'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  Legend } from
'recharts';
import { useNavigate } from 'react-router-dom';
const hourlyFlowData = [
{
  time: '08:00',
  patients: 2
},
{
  time: '09:00',
  patients: 4
},
{
  time: '10:00',
  patients: 5
},
{
  time: '11:00',
  patients: 3
},
{
  time: '12:00',
  patients: 1
},
{
  time: '13:00',
  patients: 0
},
{
  time: '14:00',
  patients: 4
},
{
  time: '15:00',
  patients: 6
},
{
  time: '16:00',
  patients: 5
},
{
  time: '17:00',
  patients: 3
},
{
  time: '18:00',
  patients: 1
}];

const revenueData = [
{
  name: 'Obj.',
  value: 10000
},
{
  name: 'Réel',
  value: 8200
}];

const patientStatusData = [
{
  name: 'Suivi régulier',
  value: 180,
  color: '#3b82f6'
},
{
  name: 'Post-intervention',
  value: 65,
  color: '#10b981'
},
{
  name: 'Haute priorité',
  value: 23,
  color: '#ef4444'
},
{
  name: 'En attente bilan',
  value: 44,
  color: '#f59e0b'
}];

const appointments = [
{
  id: 1,
  time: '08:30',
  patient: 'Jean-Pierre Moreau',
  type: 'Consultation Initiale',
  status: 'done',
  duration: 30
},
{
  id: 2,
  time: '09:00',
  patient: 'Marie Lefevre',
  type: 'Échocardiographie',
  status: 'done',
  duration: 45
},
{
  id: 3,
  time: '10:15',
  patient: 'Robert Blanc',
  type: "Test d'Effort",
  status: 'in-progress',
  duration: 60
},
{
  id: 4,
  time: '10:30',
  patient: 'Sylvie Dupont',
  type: 'ECG Holter',
  status: 'waiting',
  duration: 30
},
{
  id: 5,
  time: '11:15',
  patient: 'Michel Bernard',
  type: 'Suivi Post-IM',
  status: 'scheduled',
  duration: 30
},
{
  id: 6,
  time: '14:00',
  patient: 'Françoise Martin',
  type: 'Bilan Cardiaque',
  status: 'scheduled',
  duration: 45
},
{
  id: 7,
  time: '14:45',
  patient: 'André Rousseau',
  type: 'Consultation',
  status: 'scheduled',
  duration: 30
},
{
  id: 8,
  time: '15:30',
  patient: 'Isabelle Petit',
  type: 'Écho de Stress',
  status: 'scheduled',
  duration: 60
}];

const alerts = [
{
  id: 1,
  type: 'danger',
  message: 'Patient à risque élevé AFib - Salle 2',
  time: '09:15'
},
{
  id: 2,
  type: 'warning',
  message: 'Résultats ECG en attente - M. Dupont',
  time: '08:00'
},
{
  id: 3,
  type: 'info',
  message: '5 ordonnances à renouveler',
  time: 'Hier'
}];

const staffStatus = [
{
  name: 'Dr. Martin',
  role: 'Cardiologue',
  status: 'present'
},
{
  name: 'Infirmière Sarah',
  role: 'Infirmière Cardio',
  status: 'present'
},
{
  name: 'Julie',
  role: 'Secrétaire',
  status: 'break'
},
{
  name: 'Marc',
  role: 'Technicien ECG',
  status: 'absent'
}];

const Panel = ({
  title,
  children,
  className = '',
  headerAction





}: {title: string;children: React.ReactNode;className?: string;headerAction?: React.ReactNode;}) =>
<div
  className={`bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col overflow-hidden ${className}`}>

    <div className="px-2.5 py-1.5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 border-l-2 border-red-500 pl-2">
        {title}
      </h3>
      {headerAction}
    </div>
    <div className="p-2.5 flex-1 min-h-0 overflow-auto">{children}</div>
  </div>;

const MetricCard = ({
  label,
  value,
  subtext,
  trend,
  trendValue,
  icon: Icon,
  color
}: any) =>
<div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-sm flex items-start justify-between relative overflow-hidden group hover:border-red-300 transition-colors">
    <div className={`absolute top-0 left-0 w-1 h-full bg-${color}-500`} />
    <div>
      <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide mb-1">
        {label}
      </p>
      <h4 className="text-xl font-bold text-slate-800 tabular-nums tracking-tight">
        {value}
      </h4>
      <div className="flex items-center mt-1 gap-2">
        {trend &&
      <span
        className={`text-xs font-bold flex items-center ${trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>

            {trend === 'up' ?
        <ArrowUpRightIcon className="w-3 h-3 mr-0.5" /> :

        <ArrowDownRightIcon className="w-3 h-3 mr-0.5" />
        }
            {trendValue}
          </span>
      }
        <span className="text-xs text-slate-400">{subtext}</span>
      </div>
    </div>
    <div
    className={`p-1.5 rounded-md bg-${color}-50 text-${color}-600 opacity-80 group-hover:scale-110 transition-transform`}>

      <Icon className="w-4 h-4" />
    </div>
  </div>;

const TimelineItem = ({ appt }: {appt: any;}) => {
  const getStatusColor = (s: string) => {
    switch (s) {
      case 'done':
        return 'bg-emerald-100 border-emerald-200 text-emerald-700';
      case 'in-progress':
        return 'bg-red-100 border-red-200 text-red-700 animate-pulse';
      case 'waiting':
        return 'bg-amber-100 border-amber-200 text-amber-700';
      default:
        return 'bg-slate-100 border-slate-200 text-slate-600';
    }
  };
  return (
    <div
      className={`flex-shrink-0 border rounded-md p-1.5 min-w-[132px] flex flex-col gap-0.5 ${getStatusColor(appt.status)}`}>

      <div className="flex justify-between items-start">
        <span className="font-bold text-xs">{appt.time}</span>
        <span className="text-[10px] uppercase font-bold opacity-70">
          {appt.duration}m
        </span>
      </div>
      <div className="font-medium text-xs truncate" title={appt.patient}>
        {appt.patient}
      </div>
      <div className="text-xs opacity-80 truncate">{appt.type}</div>
    </div>);

};
const QuickAction = ({ icon: Icon, label, onClick, color = 'red' }: any) =>
<button
  onClick={onClick}
  className={`flex flex-col items-center justify-center p-2.5 rounded-lg border border-slate-200 bg-white hover:bg-${color}-50 hover:border-${color}-200 transition-all group`}>

    <Icon
    className={`w-5 h-5 text-slate-400 group-hover:text-${color}-600 mb-1.5 transition-colors`} />

    <span className="text-xs font-medium text-slate-600 text-center">
      {label}
    </span>
  </button>;

export default function ConsolePraticien() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans p-1.5 md:p-3">
      {/* Top Bar */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 mb-3 bg-white border border-slate-200 p-2.5 rounded-lg shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="bg-red-600 p-1.5 rounded-md">
            <HeartIcon className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-800 leading-none">
              Console Cardiologue
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Vue d'ensemble journalière cardiologie •{' '}
              {currentTime.toLocaleDateString('fr-FR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 bg-slate-100 rounded-md border border-slate-200">
            <ClockIcon className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-mono font-bold text-slate-700">
              {currentTime.toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-xs font-medium text-emerald-600">
              Système opérationnel
            </span>
          </div>
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-red-600">
            <RefreshCwIcon className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-2.5 md:gap-3 auto-rows-min">
        {/* KPIs */}
        <div className="col-span-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
          <MetricCard
            label="Consultations"
            value="16"
            subtext="sur 18 créneaux"
            trend="up"
            trendValue="+2"
            icon={CalendarIcon}
            color="red" />

          <MetricCard
            label="Patients Vus"
            value="9"
            subtext="56% complété"
            icon={UsersIcon}
            color="emerald" />

          <MetricCard
            label="En Attente"
            value="4"
            subtext="Salle d'attente"
            trend="up"
            trendValue="+1"
            icon={ClockIcon}
            color="amber" />

          <MetricCard
            label="ECG Urgents"
            value="3"
            subtext="À analyser"
            icon={ActivityIcon}
            color="rose" />

          <MetricCard
            label="CA Estimé"
            value="8 200 €"
            subtext="Objectif: 10k"
            trend="down"
            trendValue="-18%"
            icon={DollarSignIcon}
            color="blue" />

          <MetricCard
            label="Taux Présence"
            value="96%"
            subtext="1 annulation"
            trend="up"
            trendValue="+2%"
            icon={TrendingUpIcon}
            color="violet" />

        </div>

        {/* Timeline & Charts */}
        <div className="col-span-12 lg:col-span-8 grid grid-cols-1 gap-2.5">
          <Panel title="Fil du Temps (Consultations)" className="h-36">
            <div className="flex gap-2 overflow-x-auto pb-2 h-full items-center px-1">
              {appointments.map((appt) =>
              <TimelineItem key={appt.id} appt={appt} />
              )}
              <div className="flex-shrink-0 border-2 border-dashed border-slate-200 rounded-md p-2 min-w-[100px] flex flex-col items-center justify-center text-slate-400 hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer">
                <span className="text-2xl font-light">+</span>
                <span className="text-xs font-medium">Ajouter</span>
              </div>
            </div>
          </Panel>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 h-56">
            <Panel title="Flux Patients (Heure par Heure)">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlyFlowData}>
                  <defs>
                    <linearGradient
                      id="colorPatients"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1">

                      <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e2e8f0" />

                  <XAxis
                    dataKey="time"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 10,
                      fill: '#64748b'
                    }} />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 10,
                      fill: '#64748b'
                    }} />

                  <Tooltip
                    contentStyle={{
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }} />

                  <Area
                    type="monotone"
                    dataKey="patients"
                    stroke="#dc2626"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorPatients)" />

                </AreaChart>
              </ResponsiveContainer>
            </Panel>

            <Panel title="Performance Financière (Jour)">
              <div className="flex h-full">
                <div className="w-1/2 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#e2e8f0" />

                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fontSize: 10,
                          fill: '#64748b'
                        }} />

                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fontSize: 10,
                          fill: '#64748b'
                        }} />

                      <Tooltip
                        cursor={{
                          fill: 'transparent'
                        }}
                        contentStyle={{
                          borderRadius: '8px',
                          border: 'none',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }} />

                      <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={24}>
                        {revenueData.map((entry, index) =>
                        <Cell
                          key={`cell-${index}`}
                          fill={index === 0 ? '#cbd5e1' : '#dc2626'} />

                        )}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-1/2 h-full flex flex-col justify-center pl-3 border-l border-slate-100">
                  <div className="mb-3">
                    <p className="text-xs text-slate-500 uppercase">
                      Chiffre d'affaires
                    </p>
                    <p className="text-xl font-bold text-slate-800">8 200 €</p>
                    <p className="text-xs text-rose-500 font-medium">
                      -1 800 € vs Obj.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase">
                      Panier Moyen
                    </p>
                    <p className="text-lg font-bold text-slate-800">512 €</p>
                    <p className="text-xs text-emerald-500 font-medium">
                      +18% vs Moy.
                    </p>
                  </div>
                </div>
              </div>
            </Panel>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-12 lg:col-span-4 grid grid-cols-1 gap-2.5">
          <Panel title="Alertes Cardiaques" className="h-44">
            <div className="flex flex-col gap-2">
              {alerts.map((alert) =>
              <div
                key={alert.id}
                className={`p-2 rounded border-l-4 flex justify-between items-start ${alert.type === 'danger' ? 'bg-rose-50 border-rose-500' : alert.type === 'warning' ? 'bg-amber-50 border-amber-500' : 'bg-blue-50 border-blue-500'}`}>

                  <p
                  className={`text-xs font-bold ${alert.type === 'danger' ? 'text-rose-700' : alert.type === 'warning' ? 'text-amber-700' : 'text-blue-700'}`}>

                    {alert.message}
                  </p>
                  <span className="text-[10px] font-mono text-slate-500 bg-white/50 px-1 rounded">
                    {alert.time}
                  </span>
                </div>
              )}
              <button className="text-xs text-center text-red-600 hover:underline mt-1">
                Voir toutes les alertes
              </button>
            </div>
          </Panel>

          <Panel title="Statut Équipe" className="h-36">
            <div className="grid grid-cols-2 gap-2">
              {staffStatus.map((staff, i) =>
              <div
                key={i}
                className="flex items-center gap-2 p-1.5 rounded bg-slate-50 border border-slate-100">

                  <div
                  className={`w-2 h-2 rounded-full ${staff.status === 'present' ? 'bg-emerald-500' : staff.status === 'break' ? 'bg-amber-500' : 'bg-slate-300'}`} />

                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-slate-700 truncate">
                      {staff.name}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate">
                      {staff.role}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Panel>

          <Panel title="État des Patients" className="h-44">
            <div className="flex items-center h-full">
              <div className="w-1/2 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={patientStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={24}
                      outerRadius={42}
                      paddingAngle={2}
                      dataKey="value">

                      {patientStatusData.map((entry, index) =>
                      <Cell key={`cell-${index}`} fill={entry.color} />
                      )}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-1/2 text-xs space-y-1">
                {patientStatusData.map((item, i) =>
                <div
                  key={i}
                  className="flex items-center justify-between pr-4">

                    <div className="flex items-center gap-1.5">
                      <span
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: item.color
                      }} />

                      <span className="text-slate-600">{item.name}</span>
                    </div>
                    <span className="font-bold text-slate-800">
                      {item.value}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Panel>
        </div>

        {/* Quick Actions */}
        <div className="col-span-12">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 pl-1">
            Navigation Rapide
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2.5">
            <QuickAction
              icon={UsersIcon}
              label="Patients"
              onClick={() => navigate('/patients')}
              color="red" />

            <QuickAction
              icon={CalendarIcon}
              label="Agenda"
              onClick={() => navigate('/appointments')}
              color="blue" />

            <QuickAction
              icon={ActivityIcon}
              label="ECG"
              onClick={() => navigate('/ecg-reports')}
              color="rose" />

            <QuickAction
              icon={FileTextIcon}
              label="Ordonnance"
              onClick={() => navigate('/administration/devis/nouveau')}
              color="amber" />

            <QuickAction
              icon={CreditCardIcon}
              label="Paiements"
              onClick={() => navigate('/cardiology-billing')}
              color="violet" />

            <QuickAction
              icon={PackageIcon}
              label="Stock"
              onClick={() => navigate('/stock')}
              color="orange" />

            <QuickAction
              icon={MessageSquareIcon}
              label="Message"
              onClick={() => navigate('/communication')}
              color="pink" />

            <QuickAction
              icon={SettingsIcon}
              label="Config"
              onClick={() => navigate('/settings')}
              color="slate" />

          </div>
        </div>
      </div>
    </div>);

}