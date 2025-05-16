import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AgentProvider } from './context/AgentContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AgentProvider>
      <App />
    </AgentProvider>
  </React.StrictMode>
); 