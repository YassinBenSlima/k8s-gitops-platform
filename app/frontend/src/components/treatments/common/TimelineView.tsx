import React from 'react';
import {
  CalendarIcon,
  ClockIcon,
  CheckIcon,
  MailIcon,
  PhoneIcon,
  BellIcon } from
'lucide-react';
interface TimelineEvent {
  id: number;
  title: string;
  date: string;
  type: string;
  status: string;
  content: string;
  channels: string[];
}
interface TimelineViewProps {
  events: TimelineEvent[];
}
const TimelineView: React.FC<TimelineViewProps> = ({ events }) => {
  // Sort events by date (assuming date format DD/MM/YYYY)
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = a.date.split('/').reverse().join('');
    const dateB = b.date.split('/').reverse().join('');
    return dateA.localeCompare(dateB);
  });
  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {sortedEvents.map((event, eventIdx) =>
        <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== sortedEvents.length - 1 ?
            <span
              className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
              aria-hidden="true" /> :

            null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                  className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${event.type === 'appointment' ? 'bg-blue-500' : event.type === 'treatment' ? 'bg-green-500' : 'bg-gray-500'}`}>

                    {event.type === 'appointment' ?
                  <CalendarIcon
                    className="h-5 w-5 text-white"
                    aria-hidden="true" /> :


                  <ClockIcon
                    className="h-5 w-5 text-white"
                    aria-hidden="true" />

                  }
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p className="text-sm text-gray-900 font-medium">
                      {event.title}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {event.content}
                    </p>
                  </div>
                  <div className="text-right text-sm whitespace-nowrap">
                    <div className="text-gray-900 font-medium">
                      {event.date}
                    </div>
                    <div className="flex items-center justify-end mt-1">
                      {event.channels.map((channel) =>
                    <span key={channel} className="mr-1">
                          {channel === 'email' &&
                      <MailIcon className="h-3 w-3 text-gray-400" />
                      }
                          {channel === 'sms' &&
                      <PhoneIcon className="h-3 w-3 text-gray-400" />
                      }
                          {channel === 'inApp' &&
                      <BellIcon className="h-3 w-3 text-gray-400" />
                      }
                        </span>
                    )}
                      <span
                      className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${event.status === 'sent' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>

                        {event.status === 'sent' ? 'Envoyée' : 'Programmée'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        )}
      </ul>
    </div>);

};
export default TimelineView;