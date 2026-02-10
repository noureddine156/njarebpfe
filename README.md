# njarebpfe
njareb 5edmet pfe

Ce projet contient deux applications de gestion d'utilisateurs :

---

## 📋 1. Page d'Inscription Dynamique (HTML/CSS/JS)

Une page d'inscription moderne et interactive avec validation en temps réel.

### ✨ Fonctionnalités

✅ **Validation dynamique en temps réel**
- Validation instantanée des champs pendant la saisie
- Messages d'erreur clairs et précis
- Indicateurs visuels de succès

✅ **Sécurité du mot de passe**
- Indicateur de force du mot de passe
- Bouton pour afficher/masquer le mot de passe
- Validation stricte (majuscules, minuscules, chiffres)

✅ **Expérience utilisateur optimale**
- Design moderne et responsive
- Animations fluides
- Interface intuitive
- Compatible mobile, tablette et desktop

✅ **Validation complète**
- Nom complet (lettres et espaces uniquement)
- Email (format valide)
- Téléphone (optionnel)
- Mot de passe (minimum 8 caractères avec règles strictes)
- Date de naissance (âge minimum 13 ans)
- Conditions d'utilisation obligatoires

### 📁 Fichiers

- `inscription.html` - Structure du formulaire
- `style.css` - Styles et animations
- `script.js` - Logique de validation dynamique

### 🚀 Utilisation

Ouvrez simplement le fichier `inscription.html` dans votre navigateur.

### 🔧 Technologies

- HTML5
- CSS3 (avec variables CSS et animations)
- JavaScript vanilla (ES6+)

---

## 🔐 2. Application Login - React + Node.js

Application complète de connexion avec **React** pour le frontend et **Node.js** pour le backend.

### ✨ Caractéristiques

- ✅ Page de connexion et inscription
- ✅ Authentification JWT
- ✅ Dashboard protégé
- ✅ Hashage des mots de passe (bcrypt)
- ✅ Design moderne et responsive
- ✅ **Stockage en mémoire (pas de base de données)**

### 📁 Structure

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

### 🚀 Installation

#### Option 1: Installation rapide

```bash
# À la racine du projet
npm install
npm run install-all
```

#### Option 2: Installation manuelle

```bash
# Backend
cd back
npm install

# Frontend
cd front
npm install
```

### ▶️ Démarrage

#### Option 1: Tout démarrer ensemble

```bash
npm run dev
```

#### Option 2: Démarrer séparément

```bash
# Terminal 1 - Backend
cd back
npm run dev

# Terminal 2 - Frontend
cd front
npm start
```

### 🌐 Accès

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

### 📋 API Endpoints

- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/profile` - Profil (protégé)

### ⚠️ Important

**Les données sont stockées en mémoire:**
- Les utilisateurs sont supprimés au redémarrage du serveur
- Pas besoin de configurer une base de données
- Idéal pour le développement et les tests

### 🔧 Technologies

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

### 📝 Première utilisation

1. Installez les dépendances: `npm run install-all`
2. Démarrez les serveurs: `npm run dev`
3. Ouvrez http://localhost:3000
4. Cliquez sur "S'inscrire"
5. Créez un compte et connectez-vous!

---

## 📄 Licence

MIT
