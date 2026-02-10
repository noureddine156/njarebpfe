import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <h1>Tableau de bord</h1>
          <button onClick={handleLogout} className="logout-button">
            Déconnexion
          </button>
        </div>
        
        <div className="user-info">
          <div className="user-avatar">
            {user?.prenom?.charAt(0)}{user?.nom?.charAt(0)}
          </div>
          <h2>Bienvenue, {user?.prenom} {user?.nom} !</h2>
          <p className="user-email">{user?.email}</p>
        </div>

        <div className="dashboard-content">
          <div className="info-card">
            <h3>📧 Email</h3>
            <p>{user?.email}</p>
          </div>
          <div className="info-card">
            <h3>👤 Nom complet</h3>
            <p>{user?.prenom} {user?.nom}</p>
          </div>
          <div className="info-card">
            <h3>🔐 Statut</h3>
            <p>Connecté</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
