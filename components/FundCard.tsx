
import React from 'react';
import { MutualFund, RiskLevel, UserRole } from '../types';
import { InfoIcon, PlusCircleIcon } from './icons';

interface FundCardProps {
  fund: MutualFund;
  userRole: UserRole;
  onViewDetails: (fund: MutualFund) => void;
  onAddToCompare: (fund: MutualFund) => void;
  isComparing: boolean;
}

const getRiskColor = (risk: RiskLevel) => {
  switch (risk) {
    case RiskLevel.Low: return 'bg-green-100 text-green-800';
    case RiskLevel.Medium: return 'bg-yellow-100 text-yellow-800';
    case RiskLevel.High: return 'bg-orange-100 text-orange-800';
    case RiskLevel.VeryHigh: return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const FundCard: React.FC<FundCardProps> = ({ fund, userRole, onViewDetails, onAddToCompare, isComparing }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between p-6">
      <div>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-900 pr-2">{fund.name}</h3>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(fund.riskLevel)}`}>
            {fund.riskLevel}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1">{fund.category}</p>
        <div className="my-4 border-t border-gray-100"></div>
        <div className="grid grid-cols-3 text-center gap-2">
          <div>
            <p className="text-sm text-gray-500">1Y Return</p>
            <p className="font-semibold text-lg text-green-600">{fund.returns['1yr']}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">3Y Return</p>
            <p className="font-semibold text-gray-700">{fund.returns['3yr']}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">5Y Return</p>
            <p className="font-semibold text-gray-700">{fund.returns['5yr']}%</p>
          </div>
        </div>
        {userRole === UserRole.DataAnalyst && (
             <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-500">Sharpe Ratio</p>
                <p className="font-semibold text-lg text-indigo-600">{fund.sharpeRatio.toFixed(2)}</p>
            </div>
        )}
      </div>
      <div className="mt-6 flex flex-col sm:flex-row gap-2">
        <button
          onClick={() => onViewDetails(fund)}
          className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <InfoIcon className="h-5 w-5 mr-2" />
          View Details
        </button>
        <button
          onClick={() => onAddToCompare(fund)}
          disabled={isComparing}
          className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-200 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          {isComparing ? 'Selected' : 'Compare'}
        </button>
      </div>
    </div>
  );
};

export default FundCard;
