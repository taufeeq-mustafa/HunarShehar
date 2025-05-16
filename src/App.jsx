import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PointsProvider } from './context/PointsContext';
import AuthPage from './components/Auth/AuthPage';
import Dashboard from './components/Dashboard/Dashboard';
import DomainSelection from './components/DomainSelection/DomainSelection';
import ModulePage from './components/Modules/ModulePage';
import Register from './components/Login/register';

function App() {
  return (
    <AuthProvider>
      <PointsProvider>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Routes>
              <Route path="/" element={<AuthPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/domains" element={<DomainSelection />} />
              <Route path="/module/:domain" element={<ModulePage />} />
              <Route path="/register" element={Register}/>
            </Routes>
          </div>
        </Router>
      </PointsProvider>
    </AuthProvider>
  );
}

export default App; 