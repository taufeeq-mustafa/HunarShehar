import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AgentProvider } from './context/AgentContext';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import DomainSelection from './components/DomainSelection/DomainSelection';
import LearningModule from './components/LearningModule/LearningModule';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AgentProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/domains"
              element={
                <PrivateRoute>
                  <DomainSelection />
                </PrivateRoute>
              }
            />
            <Route
              path="/module/:moduleId"
              element={
                <PrivateRoute>
                  <LearningModule />
                </PrivateRoute>
              }
            />
          </Routes>
        </AgentProvider>
      </AuthProvider>
    </Router>
  );
}

export default App; 