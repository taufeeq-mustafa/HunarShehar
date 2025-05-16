import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">HunarSheher</Link>
      </div>
      
      <div className="navbar-menu">
        {currentUser ? (
          <>
            <Link to="/dashboard" className="navbar-item">Dashboard</Link>
            <button onClick={handleLogout} className="navbar-item logout-button">
              Log Out
            </button>
          </>
        ) : (
          <Link to="/login" className="navbar-item">Log In</Link>
        )}
      </div>
    </nav>
  );
} 