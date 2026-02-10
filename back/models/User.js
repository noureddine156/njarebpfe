const bcrypt = require('bcryptjs');

// Stockage en mémoire
let users = [];
let userIdCounter = 1;

class User {
  constructor(email, password, nom, prenom) {
    this._id = userIdCounter++;
    this.email = email.toLowerCase().trim();
    this.password = password;
    this.nom = nom.trim();
    this.prenom = prenom.trim();
    this.createdAt = new Date();
  }

  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  async comparePassword(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  }

  toJSON() {
    return {
      _id: this._id,
      email: this.email,
      nom: this.nom,
      prenom: this.prenom,
      createdAt: this.createdAt
    };
  }
}

const UserModel = {
  async create(userData) {
    const { email, password, nom, prenom } = userData;

    if (!email || !password || !nom || !prenom) {
      throw new Error('Tous les champs sont requis');
    }

    if (password.length < 6) {
      throw new Error('Le mot de passe doit contenir au moins 6 caractères');
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Email invalide');
    }

    const user = new User(email, password, nom, prenom);
    await user.hashPassword();
    users.push(user);
    return user;
  },

  findOne(query) {
    if (query.email) {
      return users.find(u => u.email === query.email.toLowerCase());
    }
    return null;
  },

  findById(id) {
    return users.find(u => u._id === parseInt(id));
  },

  getAllUsers() {
    return users;
  }
};

module.exports = UserModel;
