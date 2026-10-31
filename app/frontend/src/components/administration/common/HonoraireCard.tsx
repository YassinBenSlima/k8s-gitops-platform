import React from 'react';
import {
  CheckCircleIcon,
  ClockIcon,
  AlertCircleIcon,
  XCircleIcon } from
'lucide-react';
interface HonoraireCardProps {
  status: 'paid' | 'pending' | 'partial' | 'overdue';
}
export function HonoraireCard({ status }: HonoraireCardProps) {
  const statusConfig = {
    paid: {
      label: 'Payé',
      icon: CheckCircleIcon,
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      textColor: 'text-green-800 dark:text-green-300',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    pending: {
      label: 'En attente',
      icon: ClockIcon,
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      textColor: 'text-blue-800 dark:text-blue-300',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    partial: {
      label: 'Partiel',
      icon: AlertCircleIcon,
      bgColor: 'bg-amber-100 dark:bg-amber-900/30',
      textColor: 'text-amber-800 dark:text-amber-300',
      iconColor: 'text-amber-600 dark:text-amber-400'
    },
    overdue: {
      label: 'En retard',
      icon: XCircleIcon,
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      textColor: 'text-red-800 dark:text-red-300',
      iconColor: 'text-red-600 dark:text-red-400'
    }
  };
  const config = statusConfig[status];
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}>

      <Icon className={`h-3 w-3 mr-1 ${config.iconColor}`} />
      {config.label}
    </span>);

}
export default HonoraireCard;