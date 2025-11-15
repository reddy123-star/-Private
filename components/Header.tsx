
import React from 'react';
import { ChartBarIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <ChartBarIcon className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Mutual Fund Insight</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">Dashboard</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">Learn</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">Tools</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">Contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
