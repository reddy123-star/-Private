
import React from 'react';
import { UserRole } from '../types';
import { UserGroupIcon, PresentationChartLineIcon, ShieldCheckIcon, CogIcon } from './icons';

interface RoleSelectorProps {
  selectedRole: UserRole;
  onSelectRole: (role: UserRole) => void;
}

const roles = [
  {
    role: UserRole.Investor,
    title: "I am an Investor",
    description: "Explore funds, track performance, and learn about investing.",
    icon: <UserGroupIcon className="h-8 w-8 text-blue-500" />
  },
  {
    role: UserRole.FinancialAdvisor,
    title: "I am a Financial Advisor",
    description: "Analyze funds, create client reports, and manage portfolios.",
    icon: <PresentationChartLineIcon className="h-8 w-8 text-green-500" />
  },
  {
    role: UserRole.DataAnalyst,
    title: "I am a Data Analyst",
    description: "Access deep analytics, quantitative metrics, and market data.",
    icon: <ShieldCheckIcon className="h-8 w-8 text-orange-500" />
  },
  {
    role: UserRole.Admin,
    title: "I am an Admin",
    description: "Manage platform content, users, and system settings.",
    icon: <CogIcon className="h-8 w-8 text-gray-500" />
  }
];

const RoleSelector: React.FC<RoleSelectorProps> = ({ selectedRole, onSelectRole }) => {
  return (
    <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Choose Your Role</h2>
        <p className="text-gray-600 mb-6">Select a role to personalize your experience on the platform.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {roles.map(({ role, title, description, icon }) => (
                <button
                    key={role}
                    onClick={() => onSelectRole(role)}
                    className={`p-6 text-left rounded-lg border-2 transition-all duration-200 ${selectedRole === role ? 'border-blue-500 bg-blue-50 shadow-lg scale-105' : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'}`}
                >
                    <div className="flex items-center mb-3">
                        {icon}
                        <h3 className="ml-3 text-lg font-bold text-gray-900">{title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{description}</p>
                </button>
            ))}
        </div>
    </section>
  );
};

export default RoleSelector;
