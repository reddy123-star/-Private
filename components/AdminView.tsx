
import React from 'react';
import { MOCK_FUNDS } from '../constants';

const AdminView: React.FC = () => {
    const totalFunds = MOCK_FUNDS.length;
    const totalAUM = MOCK_FUNDS.reduce((acc, fund) => acc + fund.aum, 0);

    return (
        <div>
            <section id="admin-stats" className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-sm font-medium text-gray-500">Total Funds</h3>
                        <p className="mt-1 text-3xl font-semibold text-gray-900">{totalFunds}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-sm font-medium text-gray-500">Total Platform AUM</h3>
                        <p className="mt-1 text-3xl font-semibold text-gray-900">₹{Math.round(totalAUM / 1000).toFixed(2)} Lakh Cr</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-sm font-medium text-gray-500">Registered Users</h3>
                        <p className="mt-1 text-3xl font-semibold text-gray-900">1,427</p>
                    </div>
                </div>
            </section>
            <section id="fund-management">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Fund Management</h2>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fund Name</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AUM (Cr)</th>
                                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {MOCK_FUNDS.map((fund) => (
                                    <tr key={fund.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{fund.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fund.category}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{fund.aum.toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                                            <button onClick={() => alert('Edit functionality not implemented.')} className="text-blue-600 hover:text-blue-900">Edit</button>
                                            <button onClick={() => alert('Disable functionality not implemented.')} className="text-red-600 hover:text-red-900">Disable</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminView;
