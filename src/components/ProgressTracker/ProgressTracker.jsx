import React, { useEffect, useState } from 'react';
import { useAgent } from '../../context/AgentContext';
import { useAuth } from '../../context/AuthContext';

const ProgressTracker = () => {
  const { getLearningProgress, loading, error } = useAgent();
  const { currentUser } = useAuth();
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!currentUser) return;
      
      try {
        const response = await getLearningProgress(currentUser.uid);
        if (response.status === 'success') {
          setProgress(response.data);
        }
      } catch (err) {
        console.error('Error fetching progress:', err);
      }
    };

    fetchProgress();
  }, [getLearningProgress, currentUser]);

  if (loading) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
        {error}
      </div>
    );
  }

  if (!progress) {
    return null;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Learning Progress</h2>
      
      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Overall Progress</span>
          <span className="text-gray-800 font-semibold">
            {progress.overallProgress}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-indigo-600 h-2.5 rounded-full"
            style={{ width: `${progress.overallProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Module Progress */}
      <div className="space-y-4">
        {progress.modules?.map((module) => (
          <div key={module.id} className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">{module.name}</span>
              <span className="text-gray-800 font-semibold">
                {module.progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-400 h-2 rounded-full"
                style={{ width: `${module.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      {progress.achievements?.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Achievements
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {progress.achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="p-3 bg-indigo-50 rounded-lg text-center"
              >
                <div className="text-indigo-600 font-semibold">
                  {achievement.name}
                </div>
                <div className="text-sm text-gray-600">
                  {achievement.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker; 