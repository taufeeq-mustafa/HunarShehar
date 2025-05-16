import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

export const AgentContext = createContext();

export function useAgent() {
  return useContext(AgentContext);
}

export function AgentProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const processLearningRequest = async (userInput, context = null) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post('http://localhost:8000/api/learning/process', {
        userInput,
        context
      });
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getLearningProgress = async (userId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`http://localhost:8000/api/learning/progress/${userId}`);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    loading,
    error,
    processLearningRequest,
    getLearningProgress
  };

  return (
    <AgentContext.Provider value={value}>
      {children}
    </AgentContext.Provider>
  );
} 