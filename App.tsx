
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FundCard from './components/FundCard';
import FundDetailsModal from './components/FundDetailsModal';
import ComparisonChart from './components/ComparisonChart';
import RoleSelector from './components/RoleSelector';
import AdminView from './components/AdminView';
import { MOCK_FUNDS, EDUCATIONAL_TOPICS } from './constants';
import { MutualFund, UserRole } from './types';
import { BookOpenIcon, PencilSquareIcon } from './components/icons';
import { generateEducationalContent } from './services/geminiService';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole>(UserRole.Investor);
  const [filters, setFilters] = useState({ query: '', category: 'All', risk: 'All' });
  const [selectedFund, setSelectedFund] = useState<MutualFund | null>(null);
  const [comparisonList, setComparisonList] = useState<MutualFund[]>([]);
  const [educationalContent, setEducationalContent] = useState('');
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [activeTopic, setActiveTopic] = useState('');

  const handleRoleChange = useCallback((role: UserRole) => {
    setUserRole(role);
    // Reset comparisons when changing roles for a cleaner experience
    setComparisonList([]);
  }, []);

  const handleFilterChange = useCallback((newFilters: { query: string; category: string; risk: string }) => {
    setFilters(newFilters);
  }, []);

  const filteredFunds = useMemo(() => {
    return MOCK_FUNDS.filter(fund => {
      const queryMatch = fund.name.toLowerCase().includes(filters.query.toLowerCase());
      const categoryMatch = filters.category === 'All' || fund.category === filters.category;
      const riskMatch = filters.risk === 'All' || fund.riskLevel === filters.risk;
      return queryMatch && categoryMatch && riskMatch;
    });
  }, [filters]);

  const handleViewDetails = (fund: MutualFund) => {
    setSelectedFund(fund);
  };

  const handleCloseModal = () => {
    setSelectedFund(null);
  };

  const handleAddToCompare = (fund: MutualFund) => {
    setComparisonList(prevList => {
      if (prevList.find(f => f.id === fund.id)) {
        return prevList.filter(f => f.id !== fund.id);
      }
      if (prevList.length < 4) {
        return [...prevList, fund];
      }
      return prevList;
    });
  };

  const handleFetchEducationalContent = useCallback(async (topic: {title: string, prompt: string}) => {
      setActiveTopic(topic.title);
      setIsLoadingContent(true);
      setEducationalContent('');
      const content = await generateEducationalContent(topic.prompt);
      setEducationalContent(content);
      setIsLoadingContent(false);
  }, []);

  useEffect(() => {
    handleFetchEducationalContent(EDUCATIONAL_TOPICS[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        
        <RoleSelector selectedRole={userRole} onSelectRole={handleRoleChange} />
        
        {userRole === UserRole.Admin ? (
          <AdminView />
        ) : (
          <>
            <section id="learn" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
                    <BookOpenIcon className="h-8 w-8 mr-3 text-blue-600" />
                    {userRole === UserRole.FinancialAdvisor ? "Content Hub" : "Investor's Corner"}
                </h2>
                <p className="text-gray-600 mb-6">Your quick guide to understanding mutual funds. Select a topic to learn more.</p>
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex flex-wrap gap-2">
                          {EDUCATIONAL_TOPICS.map(topic => (
                              <div key={topic.title} className="flex items-center">
                                  <button 
                                      onClick={() => handleFetchEducationalContent(topic)}
                                      className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${activeTopic === topic.title ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                  >
                                      {topic.title}
                                  </button>
                              </div>
                          ))}
                      </div>
                       {userRole === UserRole.FinancialAdvisor && (
                          <button 
                            onClick={() => alert('Content creation form not implemented.')}
                            className="flex-shrink-0 ml-4 px-4 py-2 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                          >
                            Create Content
                          </button>
                        )}
                    </div>
                    <div className="p-4 border border-gray-200 rounded-md bg-gray-50 min-h-[150px]">
                        {isLoadingContent ? (
                            <div className="flex items-center justify-center h-full">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                              <p className="ml-3 text-gray-500">Loading content...</p>
                            </div>
                        ) : (
                            <p className="text-gray-700 whitespace-pre-wrap">{educationalContent}</p>
                        )}
                    </div>
                </div>
            </section>

            <section id="compare" className="mb-12">
              <ComparisonChart funds={comparisonList} userRole={userRole} />
            </section>

            <section id="explore">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Explore Funds</h2>
              <SearchBar onFilterChange={handleFilterChange} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFunds.map(fund => (
                  <FundCard
                    key={fund.id}
                    fund={fund}
                    userRole={userRole}
                    onViewDetails={handleViewDetails}
                    onAddToCompare={handleAddToCompare}
                    isComparing={comparisonList.some(f => f.id === fund.id)}
                  />
                ))}
              </div>
              {filteredFunds.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <h3 className="text-xl font-semibold">No funds found</h3>
                  <p>Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </section>
          </>
        )}
      </main>
      {selectedFund && <FundDetailsModal fund={selectedFund} onClose={handleCloseModal} userRole={userRole} />}
    </div>
  );
};

export default App;
