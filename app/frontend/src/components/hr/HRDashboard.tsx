import React from 'react';
import {
  UsersIcon,
  TrendingUpIcon,
  CalendarDaysIcon,
  AlertCircleIcon,
  CheckCircle2Icon,
  ClockIcon } from
'lucide-react';
import { Link } from 'react-router-dom';
const HRDashboard = () => {
  const stats = [
  {
    name: 'Personnel Total',
    value: '12',
    change: '+2 ce mois',
    icon: UsersIcon,
    borderColor: 'border-blue-200',
    textColor: 'text-blue-600',
    iconColor: 'text-blue-500'
  },
  {
    name: 'Évaluations en attente',
    value: '3',
    change: 'À compléter',
    icon: AlertCircleIcon,
    borderColor: 'border-amber-200',
    textColor: 'text-amber-600',
    iconColor: 'text-amber-500'
  },
  {
    name: 'Congés ce mois',
    value: '5',
    change: '2 en cours',
    icon: CalendarDaysIcon,
    borderColor: 'border-purple-200',
    textColor: 'text-purple-600',
    iconColor: 'text-purple-500'
  },
  {
    name: 'Performance moyenne',
    value: '4.2/5',
    change: '+0.3 vs dernier trim.',
    icon: TrendingUpIcon,
    borderColor: 'border-green-200',
    textColor: 'text-green-600',
    iconColor: 'text-green-500'
  }];

  const upcomingEvaluations = [
  {
    name: 'Sarah Martin',
    role: 'Assistante dentaire',
    date: '15 Jan 2025',
    status: 'pending'
  },
  {
    name: 'Marc Dubois',
    role: 'Réceptionniste',
    date: '20 Jan 2025',
    status: 'pending'
  },
  {
    name: 'Julie Leroy',
    role: 'Assistante dentaire',
    date: '25 Jan 2025',
    status: 'scheduled'
  }];

  const recentVacations = [
  {
    name: 'Emma Rousseau',
    type: 'Congés payés',
    dates: '10-17 Jan 2025',
    status: 'approved'
  },
  {
    name: 'Thomas Bernard',
    type: 'Congé maladie',
    dates: '8-9 Jan 2025',
    status: 'approved'
  },
  {
    name: 'Claire Petit',
    type: 'Congés payés',
    dates: '15-22 Jan 2025',
    status: 'pending'
  }];

  return (
    <div className="space-y-3">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {stats.map((stat) =>
        <div
          key={stat.name}
          className={`bg-white border ${stat.borderColor} rounded-lg p-3`}>

            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">{stat.name}</span>
              <stat.icon size={14} className={stat.iconColor} />
            </div>
            <div className={`text-xl font-bold ${stat.textColor}`}>
              {stat.value}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">{stat.change}</div>
          </div>
        )}
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-2 gap-2">
        {/* Upcoming Evaluations */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-gray-50">
            <h3 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
              <AlertCircleIcon size={12} className="text-amber-500" />
              Évaluations à venir
            </h3>
            <Link
              to="/hr/performance/nouvelle"
              className="text-xs text-blue-600 hover:underline">

              Voir tout
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {upcomingEvaluations.map((ev, i) =>
            <div
              key={i}
              className="flex items-center justify-between px-3 py-2">

                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {ev.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-800">
                      {ev.name}
                    </div>
                    <div className="text-xs text-gray-400">{ev.role}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-600">{ev.date}</div>
                  <span
                  className={`px-1.5 py-0.5 rounded text-xs ${ev.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>

                    {ev.status === 'pending' ? 'En attente' : 'Planifiée'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Vacations */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-gray-50">
            <h3 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
              <CalendarDaysIcon size={12} className="text-purple-500" />
              Congés récents
            </h3>
            <Link
              to="/hr/vacations/nouvelle"
              className="text-xs text-blue-600 hover:underline">

              Voir tout
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentVacations.map((vac, i) =>
            <div
              key={i}
              className="flex items-center justify-between px-3 py-2">

                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {vac.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-800">
                      {vac.name}
                    </div>
                    <div className="text-xs text-gray-400">{vac.type}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-600">{vac.dates}</div>
                  <span
                  className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs ${vac.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>

                    {vac.status === 'approved' ?
                  <>
                        <CheckCircle2Icon size={10} />
                        Approuvé
                      </> :

                  <>
                        <ClockIcon size={10} />
                        En attente
                      </>
                  }
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

};
export default HRDashboard;