import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell } from
'recharts';
const FinancialChart = () => {
  const [chartType, setChartType] = useState('revenue');
  // Mock data for revenue over time
  const revenueData = [
  {
    name: 'Jan',
    revenue: 38000,
    expenses: 32000,
    profit: 6000
  },
  {
    name: 'Fév',
    revenue: 42000,
    expenses: 33000,
    profit: 9000
  },
  {
    name: 'Mar',
    revenue: 45000,
    expenses: 34000,
    profit: 11000
  },
  {
    name: 'Avr',
    revenue: 42800,
    expenses: 33500,
    profit: 9300
  },
  {
    name: 'Mai',
    revenue: 45600,
    expenses: 35000,
    profit: 10600
  },
  {
    name: 'Juin',
    revenue: 47000,
    expenses: 36000,
    profit: 11000
  }];

  // Mock data for revenue by source
  const sourceData = [
  {
    name: 'Traitements orthodontiques',
    value: 65,
    color: '#3b82f6'
  },
  {
    name: 'Consultations',
    value: 20,
    color: '#10b981'
  },
  {
    name: "Produits d'hygiène",
    value: 10,
    color: '#f59e0b'
  },
  {
    name: 'Autres',
    value: 5,
    color: '#6366f1'
  }];

  const formatMoney = (amount) => {
    return new Intl.NumberFormat('fr-TN', {
      style: 'currency',
      currency: 'TND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  const renderRevenueChart = () =>
  <ResponsiveContainer width="100%" height={300}>
      <LineChart
      data={revenueData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}>

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={formatMoney} />
        <Tooltip formatter={(value) => formatMoney(value)} />
        <Legend />
        <Line
        type="monotone"
        dataKey="revenue"
        stroke="#3b82f6"
        activeDot={{
          r: 8
        }}
        name="Chiffre d'affaires" />

        <Line
        type="monotone"
        dataKey="expenses"
        stroke="#ef4444"
        name="Dépenses" />

        <Line
        type="monotone"
        dataKey="profit"
        stroke="#10b981"
        name="Bénéfices" />

      </LineChart>
    </ResponsiveContainer>;

  const renderSourceChart = () =>
  <ResponsiveContainer width="100%" height={300}>
      <BarChart
      data={sourceData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}>

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => `${value}%`} />
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
        <Bar dataKey="value" name="Pourcentage" radius={[4, 4, 0, 0]}>
          {sourceData.map((entry, index) =>
        <Cell key={`cell-${index}`} fill={entry.color} />
        )}
        </Bar>
      </BarChart>
    </ResponsiveContainer>;

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <div className="space-x-2">
          <button
            onClick={() => setChartType('revenue')}
            className={`inline-flex items-center px-3 py-1.5 border ${chartType === 'revenue' ? 'border-blue-500 text-blue-700 bg-blue-50' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'} text-xs font-medium rounded-md`}>

            Évolution financière
          </button>
          <button
            onClick={() => setChartType('source')}
            className={`inline-flex items-center px-3 py-1.5 border ${chartType === 'source' ? 'border-blue-500 text-blue-700 bg-blue-50' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'} text-xs font-medium rounded-md`}>

            Sources de revenus
          </button>
        </div>
      </div>
      {chartType === 'revenue' ? renderRevenueChart() : renderSourceChart()}
    </div>);

};
export default FinancialChart;