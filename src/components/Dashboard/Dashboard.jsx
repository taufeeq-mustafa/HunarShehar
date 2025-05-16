import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import ProgressTracker from '../ProgressTracker/ProgressTracker';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Welcome to HunarSheher
              </h1>
              <p className="text-gray-600 mb-6">
                Your personalized learning journey begins here. Choose a domain to
                start learning or continue where you left off.
              </p>
              <button
                onClick={() => navigate('/domains')}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Start Learning
              </button>
            </div>

            {/* Recent Activity */}
            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {/* Add recent activity items here */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">
                    No recent activity. Start learning to see your progress!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProgressTracker />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;