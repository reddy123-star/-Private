
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MutualFund, UserRole } from '../types';

interface ComparisonChartProps {
  funds: MutualFund[];
  userRole: UserRole;
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ funds, userRole }) => {
  if (funds.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm text-center text-gray-500">
        <h3 className="text-xl font-semibold mb-2">Compare Fund Performance</h3>
        <p>Select up to 4 funds by clicking the 'Add to Compare' button on a fund card to see a performance comparison here.</p>
      </div>
    );
  }

  const data = funds.map(fund => ({
    name: fund.name.split(' ').slice(0, 2).join(' '),
    '1 Year Return': fund.returns['1yr'],
    '3 Year Return': fund.returns['3yr'],
    '5 Year Return': fund.returns['5yr'],
  }));

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Fund Performance Comparison (%)</h3>
        {(userRole === UserRole.FinancialAdvisor || userRole === UserRole.DataAnalyst) && (
            <button 
                onClick={() => alert('PDF export functionality is not implemented.')}
                className="px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
                Export as PDF
            </button>
        )}
      </div>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value: number) => `${value.toFixed(2)}%`}
              cursor={{ fill: 'rgba(239, 246, 255, 0.5)' }}
            />
            <Legend />
            <Bar dataKey="1 Year Return" fill="#3b82f6" />
            <Bar dataKey="3 Year Return" fill="#16a34a" />
            <Bar dataKey="5 Year Return" fill="#f97316" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ComparisonChart;
