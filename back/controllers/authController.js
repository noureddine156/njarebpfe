const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// Inscription
const register = async (req, res) => {
  try {
    const { email, password, nom, prenom } = req.body;

    const userExists = User.findOne({ email });
    
    if (userExists) {
      return res.status(400).json({ 
        success: false,
        message: 'Un utilisateur avec cet email existe déjà' 
      });
    }

    const user = await User.create({ email, password, nom, prenom });

    if (user) {
      res.status(201).json({
        success: true,
        message: 'Inscription réussie',
        data: {
          _id: user._id,
          email: user.email,
          nom: user.nom,
          prenom: user.prenom,
          token: generateToken(user._id)
        }
      });
    }
  } catch (error) {
    res.status(400).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Connexion
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email et mot de passe sont requis' 
      });
    }

    const user = User.findOne({ email });

    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Email ou mot de passe incorrect' 
      });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false,
        message: 'Email ou mot de passe incorrect' 
      });
    }

    res.json({
      success: true,
      message: 'Connexion réussie',
      data: {
        _id: user._id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        token: generateToken(user._id)
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Profil
const getProfile = async (req, res) => {
  try {
    const user = User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    res.json({
      success: true,
      data: user.toJSON()
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

module.exports = { register, login, getProfile };
