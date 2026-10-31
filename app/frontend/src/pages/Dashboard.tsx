import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from '../../node_modules/react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import AppointmentList from '../components/appointments/AppointmentList';
import PatientList from '../components/patients/PatientList';
import DoctorLevel from '../components/gamification/DoctorLevel';
import BadgeShowcase from '../components/gamification/BadgeShowcase';
import StreakCounter from '../components/gamification/StreakCounter';
import {
  UsersIcon,
  CalendarIcon,
  ActivityIcon,
  TrendingUpIcon,
  HeartIcon,
  AwardIcon,
  TrophyIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  ArrowDownRightIcon,
  LightbulbIcon,
  AlertCircleIcon,
  ZapIcon
} from
  'lucide-react';
const MetricCard = ({
  label,
  value,
  subtext,
  trend,
  trendValue,
  icon: Icon,
  color
}: any) =>
  <div className="bg-white border border-slate-200 rounded-lg p-2 shadow-sm flex items-start justify-between relative overflow-hidden group hover:border-red-300 transition-colors">
    <div className={`absolute top-0 left-0 w-1 h-full bg-${color}-500`} />
    <div>
      <p className="text-[9px] font-bold uppercase tracking-wide text-slate-500 mb-0.5">
        {label}
      </p>
      <h4 className="text-base font-bold text-slate-800 tabular-nums tracking-tight">
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
        <span className="text-[11px] text-slate-400">{subtext}</span>
      </div>
    </div>
    <div
      className={`p-1 rounded-md bg-${color}-50 text-${color}-600 opacity-80 group-hover:scale-110 transition-transform`}>

      <Icon className="w-3.5 h-3.5" />
    </div>
  </div>;

const Panel = ({
  title,
  children,
  className = '',
  headerAction,
  borderColor = 'red'






}: { title: string; children: React.ReactNode; className?: string; headerAction?: React.ReactNode; borderColor?: string; }) =>
  <div
    className={`bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col overflow-hidden ${className}`}>

    <div className="px-2 py-1.5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
      <h3
        className={`text-[9px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5 border-l-2 border-${borderColor}-500 pl-1.5`}>

        {title}
      </h3>
      {headerAction}
    </div>
    <div className="p-2 flex-1 min-h-0 overflow-auto">{children}</div>
  </div>;

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const stats = [
    {
      name: 'Cardiac Patients',
      value: '312',
      change: '+8%',
      changeType: 'increase',
      icon: UsersIcon,
      color: 'red',
      description: 'Active patients'
    },
    {
      name: 'Consultations Today',
      value: '14',
      change: '+2',
      changeType: 'increase',
      icon: CalendarIcon,
      color: 'blue',
      description: 'Appointments'
    },
    {
      name: 'High Priority',
      value: '23',
      change: '-3',
      changeType: 'decrease',
      icon: AlertCircleIcon,
      color: 'rose',
      description: 'Critical patients'
    },
    {
      name: 'Follow-up Rate',
      value: '91%',
      change: '+1%',
      changeType: 'increase',
      icon: TrendingUpIcon,
      color: 'emerald',
      description: 'Protocols followed'
    },
    {
      name: 'ECGs Analyzed',
      value: '47',
      change: '',
      changeType: 'neutral',
      icon: ActivityIcon,
      color: 'purple',
      description: 'This month'
    },
    {
      name: 'AFib Detected',
      value: '8',
      change: '',
      changeType: 'neutral',
      icon: HeartIcon,
      color: 'amber',
      description: 'AI identified'
    }];

  const dailyAchievements = [
    {
      title: 'Consultations',
      progress: 70,
      current: 10,
      target: 14,
      icon: CheckCircleIcon,
      color: 'red'
    },
    {
      title: 'Revenue Target',
      progress: 65,
      current: '€6,500',
      target: '€10,000',
      icon: TrendingUpIcon,
      color: 'blue'
    }];

  const quickActions = [
    {
      title: 'New Patient',
      description: 'Add a patient',
      icon: UsersIcon,
      bgGradient: 'from-red-500 to-rose-500'
    },
    {
      title: 'Appointment',
      description: 'Schedule appointment',
      icon: CalendarIcon,
      bgGradient: 'from-blue-500 to-indigo-500'
    },
    {
      title: 'ECG',
      description: 'Record ECG',
      icon: ActivityIcon,
      bgGradient: 'from-amber-500 to-orange-500'
    }];

  return (
    <div className="min-h-screen bg-slate-100 p-1.5 md:p-2.5 font-sans text-slate-900">
      {/* Header Bar */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2 bg-white border border-slate-200 p-2 rounded-lg shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-red-600 p-1 rounded-md">
            <HeartIcon className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <h1 className="text-[13px] font-bold text-slate-800 leading-none">
              CardioSuite Professional
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
            {/*  Dr. {user?.firstName} {user?.lastName} - {user?.role} */}
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <span className="text-xs font-semibold text-slate-700 hidden md:block">
    {/*        {t('dashboard.welcome')}, Dr. {user?.firstName} {user?.lastName} */}
          </span>
          <div className="flex items-center gap-2">
            <div className="h-6 w-px bg-slate-200 hidden md:block" />
            <span className="text-xs font-medium text-slate-500 hidden md:block">
              {new Date().toLocaleDateString('fr-FR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long'
              })}
            </span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-2">
        {/* KPI Row */}
        <div className="col-span-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {stats.map((stat, index) =>
            <motion.div
              key={stat.name}
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: index * 0.05
              }}>

              <MetricCard
                label={stat.name}
                value={stat.value}
                subtext={stat.description}
                trend={
                  stat.change ?
                    stat.changeType === 'increase' ?
                      'up' :
                      'down' :
                    undefined
                }
                trendValue={stat.change}
                icon={stat.icon}
                color={stat.color} />

            </motion.div>
          )}
        </div>

        {/* Daily Achievements & Quick Actions */}
        <div className="col-span-12 grid grid-cols-1 lg:grid-cols-2 gap-2">
          <Panel title="Daily Goals" borderColor="red">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {dailyAchievements.map((achievement, index) =>
                <div key={index} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-xs mb-0.5">
                    <div className="flex items-center gap-1 font-medium text-slate-700">
                      <achievement.icon
                        className={`w-3 h-3 text-${achievement.color}-500`} />

                      {achievement.title}
                    </div>
                    <span className="font-bold text-slate-900">
                      {achievement.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1">
                    <motion.div
                      initial={{
                        width: 0
                      }}
                      animate={{
                        width: `${achievement.progress}%`
                      }}
                      transition={{
                        duration: 1,
                        delay: 0.2
                      }}
                      className={`bg-${achievement.color}-500 h-1 rounded-full`} />

                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                    <span>{achievement.current}</span>
                    <span>{achievement.target}</span>
                  </div>
                </div>
              )}
            </div>
          </Panel>

          <Panel title="Quick Actions" borderColor="blue">
            <div className="grid grid-cols-3 gap-2">
              {quickActions.map((action, index) =>
                <motion.button
                  key={index}
                  whileHover={{
                    y: -2
                  }}
                  whileTap={{
                    scale: 0.98
                  }}
                  className="flex flex-col items-center justify-center p-1.5 rounded-md border border-slate-200 bg-slate-50 hover:bg-red-50 hover:border-red-200 transition-all cursor-pointer group text-center">

                  <div
                    className={`h-6 w-6 rounded-md bg-gradient-to-br ${action.bgGradient} flex items-center justify-center mb-1 shadow-sm`}>

                    <action.icon className="h-3 w-3 text-white" />
                  </div>
                  <h3 className="text-[10px] font-bold text-slate-700 group-hover:text-red-700 mb-0 leading-tight">
                    {action.title}
                  </h3>
                </motion.button>
              )}
            </div>
          </Panel>
        </div>

        {/* Main Content Grid */}
        <div className="col-span-12 lg:col-span-8 space-y-2">
          <Panel
            title="Today's Appointments"
            borderColor="red"
            headerAction={
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 text-[9px] font-bold">
                  14 scheduled
                </span>
                <button className="text-[9px] font-medium text-red-600 hover:text-red-800 flex items-center">
                  View all <ArrowRightIcon className="h-2.5 w-2.5 ml-1" />
                </button>
              </div>
            }>

            <AppointmentList compact />
          </Panel>

          
        </div>

        </div>
      </div>
    );

};
export default Dashboard;