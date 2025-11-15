
import React, { useState, useEffect } from 'react';
import { MutualFund, FundAnalysis, UserRole } from '../types';
import { generateFundAnalysis } from '../services/geminiService';
import { CheckCircleIcon, XCircleIcon } from './icons';

interface FundDetailsModalProps {
  fund: MutualFund | null;
  onClose: () => void;
  userRole: UserRole;
}

const FundDetailsModal: React.FC<FundDetailsModalProps> = ({ fund, onClose, userRole }) => {
  const [analysis, setAnalysis] = useState<FundAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (fund) {
      setAnalysis(null);
      setIsLoading(true);
      const fetchAnalysis = async () => {
        const result = await generateFundAnalysis(fund.name);
        setAnalysis(result);
        setIsLoading(false);
      };
      fetchAnalysis();
    }
  }, [fund]);

  if (!fund) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">{fund.name}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          
          <div className="mt-6 space-y-6">
            <p className="text-gray-600">{fund.description}</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-500">AUM (Cr)</p>
                <p className="font-semibold text-lg text-gray-800">₹{fund.aum.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Expense Ratio</p>
                <p className="font-semibold text-lg text-gray-800">{fund.expenseRatio}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Fund Manager</p>
                <p className="font-semibold text-md text-gray-800">{fund.fundManager}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-semibold text-md text-gray-800">{fund.category}</p>
              </div>
            </div>

            <div>
                <h4 className="font-semibold text-gray-800 mb-2">Top 5 Holdings</h4>
                <ul className="space-y-1 text-gray-600 list-disc list-inside">
                    {fund.topHoldings.map((holding, index) => <li key={index}>{holding}</li>)}
                </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">AI-Powered Analysis</h3>
              {isLoading ? (
                <div className="flex items-center justify-center p-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                   <p className="ml-4 text-gray-600">Generating analysis...</p>
                </div>
              ) : analysis ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-2">Pros</h4>
                    <ul className="space-y-2">
                      {analysis.pros.map((pro, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-800 mb-2">Cons</h4>
                    <ul className="space-y-2">
                      {analysis.cons.map((con, index) => (
                        <li key={index} className="flex items-start">
                          <XCircleIcon className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}
            </div>

            {userRole === UserRole.FinancialAdvisor && (
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Advisor Notes</h3>
                    <textarea
                        className="w-full h-24 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Add private notes for your client regarding this fund..."
                    ></textarea>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundDetailsModal;
