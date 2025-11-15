
import React from 'react';
import { FundCategory, RiskLevel } from '../types';

interface SearchBarProps {
  onFilterChange: (filters: { query: string; category: string; risk: string }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onFilterChange }) => {
  const [query, setQuery] = React.useState('');
  const [category, setCategory] = React.useState('All');
  const [risk, setRisk] = React.useState('All');

  React.useEffect(() => {
    onFilterChange({ query, category, risk });
  }, [query, category, risk, onFilterChange]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="search-fund" className="block text-sm font-medium text-gray-700">
            Search Fund
          </label>
          <input
            type="text"
            id="search-fund"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., Parag Parikh Flexi Cap"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category-filter"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option>All</option>
            {Object.values(FundCategory).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="risk-filter" className="block text-sm font-medium text-gray-700">
            Risk Level
          </label>
          <select
            id="risk-filter"
            value={risk}
            onChange={(e) => setRisk(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option>All</option>
            {Object.values(RiskLevel).map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
