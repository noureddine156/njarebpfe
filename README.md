# Application Login - React + Node.js

Application complète de connexion avec **React** pour le frontend et **Node.js** pour le backend.

## ✨ Caractéristiques

- ✅ Page de connexion et inscription
- ✅ Authentification JWT
- ✅ Dashboard protégé
- ✅ Hashage des mots de passe (bcrypt)
- ✅ Design moderne et responsive
- ✅ **Stockage en mémoire (pas de base de données)**

## 📁 Structure

```
njarebpfe/
├── back/          # Backend Node.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
└── front/         # Frontend React
    ├── public/
    └── src/
        ├── components/
        ├── context/
        └── services/
```

## 🚀 Installation

### Option 1: Installation rapide

```bash
# À la racine du projet
npm install
npm run install-all
```

### Option 2: Installation manuelle

```bash
# Backend
cd back
npm install

# Frontend
cd front
npm install
```

## ▶️ Démarrage

### Option 1: Tout démarrer ensemble

```bash
npm run dev
```

### Option 2: Démarrer séparément

```bash
# Terminal 1 - Backend
cd back
npm run dev

# Terminal 2 - Frontend
cd front
npm start
```

## 🌐 Accès

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📋 API Endpoints

- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/profile` - Profil (protégé)

## ⚠️ Important

**Les données sont stockées en mémoire:**
- Les utilisateurs sont supprimés au redémarrage du serveur
- Pas besoin de configurer une base de données
- Idéal pour le développement et les tests

## 🔧 Technologies

**Backend:**
- Express.js
- JWT (jsonwebtoken)
- bcryptjs
- CORS

**Frontend:**
- React 18
- React Router
- Axios
- Context API

## 📝 Première utilisation

1. Installez les dépendances: `npm run install-all`
2. Démarrez les serveurs: `npm run dev`
3. Ouvrez http://localhost:3000
4. Cliquez sur "S'inscrire"
5. Créez un compte et connectez-vous!

## 📄 Licence

MIT
