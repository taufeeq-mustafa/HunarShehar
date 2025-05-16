import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAgent } from '../../context/AgentContext';
import Navbar from '../Navbar/Navbar';

const domains = [
  { id: 'soft-skills', name: 'Soft Skills', description: 'Develop essential interpersonal and communication skills' },
  { id: 'finance', name: 'Finance', description: 'Learn about financial management and basic accounting' },
  { id: 'retail', name: 'Retail', description: 'Master customer service and retail operations' },
  { id: 'supply-chain', name: 'Supply Chain', description: 'Understand logistics and supply chain management' }
];

const DomainSelection = () => {
  const navigate = useNavigate();
  const { processLearningRequest, loading, error } = useAgent();
  const [recommendations, setRecommendations] = useState({});

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await processLearningRequest("What domains should I focus on based on my profile?");
        if (response.status === "success") {
          setRecommendations(response.data.recommendations || {});
        }
      } catch (err) {
        console.error("Error fetching recommendations:", err);
      }
    };

    fetchRecommendations();
  }, [processLearningRequest]);

  const handleDomainSelect = async (domain) => {
    try {
      await processLearningRequest(`I want to learn about ${domain.name}`);
      navigate(`/module/${domain.id}`);
    } catch (err) {
      console.error("Error selecting domain:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-4 pt-16">
        <h1 className="text-2xl font-bold mb-4">Select a Domain</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {domains.map((domain) => (
            <div
              key={domain.id}
              className={`p-4 bg-white rounded shadow cursor-pointer hover:bg-gray-50 transition-all duration-200 ${
                recommendations[domain.id] ? 'border-2 border-indigo-500' : ''
              }`}
              onClick={() => handleDomainSelect(domain)}
            >
              <h2 className="text-xl font-bold">{domain.name}</h2>
              <p className="text-gray-600 mt-2">{domain.description}</p>
              {recommendations[domain.id] && (
                <div className="mt-2 text-sm text-indigo-600">
                  Recommended based on your profile
                </div>
              )}
            </div>
          ))}
        </div>
        {loading && (
          <div className="fixed bottom-4 right-4 bg-white p-4 rounded shadow">
            Loading recommendations...
          </div>
        )}
      </div>
    </div>
  );
};

export default DomainSelection;