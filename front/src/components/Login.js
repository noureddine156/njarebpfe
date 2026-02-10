import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nom: '',
    prenom: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const { email, password, nom, prenom } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        if (!nom || !prenom) {
          setError('Veuillez remplir tous les champs');
          setLoading(false);
          return;
        }
        await register({ email, password, nom, prenom });
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue');
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({ email: '', password: '', nom: '', prenom: '' });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>
          <p>{isLogin ? 'Content de vous revoir !' : 'Créez votre compte'}</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={onSubmit} className="login-form">
          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="nom">Nom</label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={nom}
                  onChange={onChange}
                  placeholder="Votre nom"
                  required={!isLogin}
                />
              </div>
              <div className="form-group">
                <label htmlFor="prenom">Prénom</label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={prenom}
                  onChange={onChange}
                  placeholder="Votre prénom"
                  required={!isLogin}
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="votre@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="••••••••"
              required
              minLength="6"
            />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Chargement...' : (isLogin ? 'Se connecter' : "S'inscrire")}
          </button>
        </form>

        <div className="toggle-mode">
          <p>
            {isLogin ? "Vous n'avez pas de compte ? " : 'Vous avez déjà un compte ? '}
            <button onClick={toggleMode} className="toggle-button">
              {isLogin ? "S'inscrire" : 'Se connecter'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
