import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PlusIcon,
  CalendarIcon,
  CheckCircle2Icon,
  XCircleIcon,
  ClockIcon,
  FilterIcon,
  ListIcon,
  GridIcon
} from
  'lucide-react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid/index.js';
import timeGridPlugin from '@fullcalendar/timegrid/index.js';
import interactionPlugin from '@fullcalendar/interaction/index.js';
import '@fullcalendar/core/locales/fr.js';
const VacationManagement = () => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState('list');
  const vacations = [
    {
      id: 1,
      employee: 'Emma Rousseau',
      type: 'Congés payés',
      startDate: '2025-01-10',
      endDate: '2025-01-17',
      days: 7,
      status: 'approved',
      requestDate: '5 Déc 2024',
      reason: 'Vacances familiales'
    },
    {
      id: 2,
      employee: 'Thomas Bernard',
      type: 'Congé maladie',
      startDate: '2025-01-08',
      endDate: '2025-01-09',
      days: 2,
      status: 'approved',
      requestDate: '7 Jan 2025',
      reason: 'Certificat médical fourni'
    },
    {
      id: 3,
      employee: 'Claire Petit',
      type: 'Congés payés',
      startDate: '2025-01-15',
      endDate: '2025-01-22',
      days: 7,
      status: 'pending',
      requestDate: '2 Jan 2025',
      reason: 'Voyage personnel'
    },
    {
      id: 4,
      employee: 'Marc Dubois',
      type: 'Congé sans solde',
      startDate: '2025-02-01',
      endDate: '2025-02-05',
      days: 5,
      status: 'rejected',
      requestDate: '10 Déc 2024',
      reason: 'Période de forte activité'
    },
    {
      id: 5,
      employee: 'Sarah Martin',
      type: 'Congés payés',
      startDate: '2025-01-20',
      endDate: '2025-01-27',
      days: 7,
      status: 'approved',
      requestDate: '15 Déc 2024',
      reason: 'Congés annuels'
    },
    {
      id: 6,
      employee: 'Lucas Moreau',
      type: 'Congé parental',
      startDate: '2025-02-10',
      endDate: '2025-02-14',
      days: 5,
      status: 'pending',
      requestDate: '8 Jan 2025',
      reason: 'Naissance'
    }];

  const filteredVacations = vacations.filter(
    (v) => filterStatus === 'all' || v.status === filterStatus
  );
  const calendarEvents = filteredVacations.map((v) => {
    const statusColors = {
      approved: {
        bg: '#10b981',
        border: '#059669'
      },
      pending: {
        bg: '#f59e0b',
        border: '#d97706'
      },
      rejected: {
        bg: '#ef4444',
        border: '#dc2626'
      }
    };
    return {
      id: v.id.toString(),
      title: `${v.employee} - ${v.type}`,
      start: v.startDate,
      end: new Date(new Date(v.endDate).getTime() + 86400000).
        toISOString().
        split('T')[0],
      backgroundColor:
        statusColors[v.status as keyof typeof statusColors]?.bg || '#6b7280',
      borderColor:
        statusColors[v.status as keyof typeof statusColors]?.border ||
        '#4b5563',
      extendedProps: {
        employee: v.employee,
        type: v.type,
        days: v.days,
        status: v.status,
        reason: v.reason,
        requestDate: v.requestDate
      }
    };
  });
  const handleEventClick = (info: any) =>
    console.log('Vacation clicked:', info.event.extendedProps);
  const statusBadge = (status: string) => {
    if (status === 'approved')
      return (
        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs bg-green-100 text-green-700">
          <CheckCircle2Icon size={10} />
          Approuvé
        </span>);

    if (status === 'pending')
      return (
        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs bg-amber-100 text-amber-700">
          <ClockIcon size={10} />
          En attente
        </span>);

    return (
      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs bg-red-100 text-red-700">
        <XCircleIcon size={10} />
        Refusé
      </span>);

  };
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short'
    });
  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex items-center gap-2">
        <div className="flex bg-gray-100 rounded-lg p-0.5">
          <button
            onClick={() => setViewMode('list')}
            className={`px-2 py-1 rounded text-xs font-medium transition-all ${viewMode === 'list' ? 'bg-white text-gray-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>

            <ListIcon size={12} />
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-2 py-1 rounded text-xs font-medium transition-all ${viewMode === 'calendar' ? 'bg-white text-gray-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>

            <GridIcon size={12} />
          </button>
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="py-1.5 px-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500">

          <option value="all">Tous les statuts</option>
          <option value="pending">En attente</option>
          <option value="approved">Approuvé</option>
          <option value="rejected">Refusé</option>
        </select>
        <button
          onClick={() => navigate('/hr/vacations/nouvelle')}
          className="flex items-center gap-1 px-3 py-1.5 text-xs bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium ml-auto">

          <PlusIcon size={12} />
          Nouvelle demande
        </button>
      </div>

      {/* List View */}
      {viewMode === 'list' &&
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
            <h2 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
              <CalendarIcon size={12} className="text-purple-500" />
              Demandes de congés ({filteredVacations.length})
            </h2>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                  Employé
                </th>
                <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                  Type
                </th>
                <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                  Dates
                </th>
                <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                  Jours
                </th>
                <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                  Demandé le
                </th>
                <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                  Statut
                </th>
                <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredVacations.map((v) =>
                <tr
                  key={v.id}
                  className="border-b border-gray-50 hover:bg-gray-50">

                  <td className="px-3 py-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {v.employee.charAt(0)}
                      </div>
                      <span className="text-xs font-medium text-gray-800">
                        {v.employee}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-1.5 text-xs text-gray-600">
                    {v.type}
                  </td>
                  <td className="px-3 py-1.5 text-xs text-gray-600">
                    {formatDate(v.startDate)} – {formatDate(v.endDate)}
                  </td>
                  <td className="px-3 py-1.5 text-xs font-medium text-gray-700">
                    {v.days}j
                  </td>
                  <td className="px-3 py-1.5 text-xs text-gray-500">
                    {v.requestDate}
                  </td>
                  <td className="px-3 py-1.5">{statusBadge(v.status)}</td>
                  <td className="px-3 py-1.5">
                    {v.status === 'pending' &&
                      <div className="flex items-center gap-1">
                        <button className="px-2 py-0.5 text-xs bg-green-600 text-white rounded hover:bg-green-700">
                          Approuver
                        </button>
                        <button className="px-2 py-0.5 text-xs bg-red-600 text-white rounded hover:bg-red-700">
                          Refuser
                        </button>
                      </div>
                    }
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      }

      {/* Calendar View */}
      {viewMode === 'calendar' &&
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <style>{`
            .fc { --fc-border-color: rgb(229 231 235); --fc-button-bg-color: rgb(147 51 234); --fc-button-border-color: rgb(147 51 234); --fc-button-hover-bg-color: rgb(126 34 206); --fc-button-hover-border-color: rgb(126 34 206); --fc-today-bg-color: rgb(243 232 255); }
            .fc .fc-toolbar-title { font-size: 1rem; font-weight: 700; color: rgb(17 24 39); }
            .fc .fc-button { padding: 0.25rem 0.75rem; border-radius: 0.375rem; font-weight: 600; font-size: 0.75rem; text-transform: capitalize; }
            .fc .fc-daygrid-day-number { color: rgb(75 85 99); font-weight: 600; padding: 0.25rem; font-size: 0.75rem; }
            .fc .fc-col-header-cell { background: rgb(249 250 251); font-weight: 700; text-transform: uppercase; font-size: 0.65rem; letter-spacing: 0.05em; padding: 0.5rem 0.25rem; color: rgb(75 85 99); }
            .fc .fc-event { border-radius: 0.25rem; padding: 0.125rem 0.25rem; margin: 0.0625rem; font-weight: 600; font-size: 0.7rem; cursor: pointer; }
            .fc-theme-standard td, .fc-theme-standard th { border-color: var(--fc-border-color); }
          `}</style>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            initialDate="2025-01-15"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,dayGridWeek'
            }}
            locale="fr"
            events={calendarEvents}
            eventClick={handleEventClick}
            height="auto"
            buttonText={{
              today: "Aujourd'hui",
              month: 'Mois',
              week: 'Semaine'
            }}
            eventContent={(eventInfo) => {
              const { extendedProps } = eventInfo.event;
              const statusIcons = {
                approved: '✓',
                pending: '⏳',
                rejected: '✗'
              };
              return (
                <div className="flex flex-col p-0.5 overflow-hidden">
                  <div className="flex items-center gap-0.5">
                    <span className="text-[10px] font-bold">
                      {
                        statusIcons[
                        extendedProps.status as keyof typeof statusIcons]

                      }
                    </span>
                    <div className="text-[10px] font-bold truncate">
                      {extendedProps.employee}
                    </div>
                  </div>
                  <div className="text-[10px] truncate opacity-90">
                    {extendedProps.type}
                  </div>
                </div>);

            }} />

        </div>
      }
    </div>);

};
export default VacationManagement;