// Sélection des éléments du DOM
const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');
const togglePasswordBtn = document.getElementById('togglePassword');

// Champs du formulaire
const fields = {
    fullname: document.getElementById('fullname'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    password: document.getElementById('password'),
    confirmPassword: document.getElementById('confirmPassword'),
    birthdate: document.getElementById('birthdate'),
    terms: document.getElementById('terms')
};

// État de validation
const validationState = {
    fullname: false,
    email: false,
    phone: true, // Optionnel
    password: false,
    confirmPassword: false,
    birthdate: false,
    terms: false
};

// Règles de validation
const validationRules = {
    fullname: {
        validate: (value) => {
            if (!value.trim()) return 'Le nom complet est requis';
            if (value.trim().length < 3) return 'Le nom doit contenir au moins 3 caractères';
            if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value)) return 'Le nom contient des caractères invalides';
            return true;
        }
    },
    email: {
        validate: (value) => {
            if (!value.trim()) return 'L\'adresse email est requise';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) return 'Format d\'email invalide';
            return true;
        }
    },
    phone: {
        validate: (value) => {
            if (!value.trim()) return true; // Champ optionnel
            const phoneRegex = /^[\d\s+()-]{10,}$/;
            if (!phoneRegex.test(value)) return 'Format de téléphone invalide';
            return true;
        }
    },
    password: {
        validate: (value) => {
            if (!value) return 'Le mot de passe est requis';
            if (value.length < 8) return 'Le mot de passe doit contenir au moins 8 caractères';
            if (!/[a-z]/.test(value)) return 'Le mot de passe doit contenir au moins une minuscule';
            if (!/[A-Z]/.test(value)) return 'Le mot de passe doit contenir au moins une majuscule';
            if (!/\d/.test(value)) return 'Le mot de passe doit contenir au moins un chiffre';
            return true;
        }
    },
    confirmPassword: {
        validate: (value) => {
            if (!value) return 'La confirmation est requise';
            if (value !== fields.password.value) return 'Les mots de passe ne correspondent pas';
            return true;
        }
    },
    birthdate: {
        validate: (value) => {
            if (!value) return 'La date de naissance est requise';
            const birthDate = new Date(value);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            if (age < 13) return 'Vous devez avoir au moins 13 ans';
            if (age > 120) return 'Date de naissance invalide';
            return true;
        }
    },
    terms: {
        validate: (checked) => {
            if (!checked) return 'Vous devez accepter les conditions d\'utilisation';
            return true;
        }
    }
};

// Fonction de validation d'un champ
function validateField(fieldName) {
    const field = fields[fieldName];
    const errorElement = document.getElementById(`${fieldName}-error`);
    const successIcon = field.parentElement.querySelector('.success-icon');
    
    let value;
    if (fieldName === 'terms') {
        value = field.checked;
    } else {
        value = field.value;
    }
    
    const result = validationRules[fieldName].validate(value);
    
    if (result === true) {
        // Validation réussie
        field.classList.remove('error');
        field.classList.add('success');
        errorElement.classList.remove('show');
        if (successIcon) successIcon.classList.add('show');
        validationState[fieldName] = true;
    } else {
        // Validation échouée
        field.classList.add('error');
        field.classList.remove('success');
        errorElement.textContent = result;
        errorElement.classList.add('show');
        if (successIcon) successIcon.classList.remove('show');
        validationState[fieldName] = false;
    }
    
    return result === true;
}

// Calculer la force du mot de passe
function calculatePasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    
    return Math.min(strength, 4);
}

// Mettre à jour l'indicateur de force du mot de passe
function updatePasswordStrength() {
    const password = fields.password.value;
    const strength = calculatePasswordStrength(password);
    const bars = document.querySelectorAll('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    // Réinitialiser toutes les barres
    bars.forEach(bar => {
        bar.classList.remove('active', 'medium', 'strong');
    });
    
    // Activer les barres selon la force
    for (let i = 0; i < strength; i++) {
        bars[i].classList.add('active');
        
        if (strength <= 2) {
            bars[i].classList.add('weak');
        } else if (strength === 3) {
            bars[i].classList.add('medium');
        } else {
            bars[i].classList.add('strong');
        }
    }
    
    // Mettre à jour le texte
    const strengthLabels = ['Très faible', 'Faible', 'Moyen', 'Fort', 'Très fort'];
    strengthText.textContent = password ? strengthLabels[strength] : 'Force du mot de passe';
}

// Basculer la visibilité du mot de passe
togglePasswordBtn.addEventListener('click', () => {
    const passwordField = fields.password;
    const type = passwordField.type === 'password' ? 'text' : 'password';
    passwordField.type = type;
    togglePasswordBtn.querySelector('.eye-icon').textContent = type === 'password' ? '👁️' : '🙈';
});

// Ajouter les écouteurs d'événements pour la validation en temps réel
Object.keys(fields).forEach(fieldName => {
    const field = fields[fieldName];
    
    if (fieldName === 'terms') {
        field.addEventListener('change', () => validateField(fieldName));
    } else {
        // Validation au blur (perte de focus)
        field.addEventListener('blur', () => {
            if (field.value.trim() || fieldName === 'birthdate') {
                validateField(fieldName);
            }
        });
        
        // Validation en temps réel pendant la saisie
        field.addEventListener('input', () => {
            // Pour le mot de passe, mettre à jour la force
            if (fieldName === 'password') {
                updatePasswordStrength();
                // Revalider la confirmation si elle a été remplie
                if (fields.confirmPassword.value) {
                    validateField('confirmPassword');
                }
            }
            
            // Revalider si le champ a déjà été validé ou invalidé
            if (field.classList.contains('error') || field.classList.contains('success')) {
                validateField(fieldName);
            }
        });
    }
});

// Vérifier si tous les champs requis sont valides
function isFormValid() {
    return validationState.fullname &&
           validationState.email &&
           validationState.phone &&
           validationState.password &&
           validationState.confirmPassword &&
           validationState.birthdate &&
           validationState.terms;
}

// Gérer la soumission du formulaire
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Valider tous les champs
    let allValid = true;
    Object.keys(fields).forEach(fieldName => {
        if (!validateField(fieldName)) {
            allValid = false;
        }
    });
    
    if (!allValid) {
        // Faire défiler vers le premier champ en erreur
        const firstError = form.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
        }
        return;
    }
    
    // Simuler l'envoi des données
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    
    try {
        // Simule une requête API
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Afficher le message de succès
        successMessage.classList.add('show');
        form.classList.add('submitted');
        
        // Optionnel: Réinitialiser le formulaire après quelques secondes
        setTimeout(() => {
            form.reset();
            successMessage.classList.remove('show');
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            
            // Réinitialiser l'état de validation
            Object.keys(validationState).forEach(key => {
                validationState[key] = key === 'phone'; // phone est optionnel
            });
            
            // Supprimer les classes de validation
            Object.values(fields).forEach(field => {
                field.classList.remove('error', 'success');
            });
            
            // Masquer les icônes de succès
            document.querySelectorAll('.success-icon').forEach(icon => {
                icon.classList.remove('show');
            });
            
            // Réinitialiser la force du mot de passe
            document.querySelectorAll('.strength-bar').forEach(bar => {
                bar.classList.remove('active', 'medium', 'strong');
            });
            document.querySelector('.strength-text').textContent = 'Force du mot de passe';
            
        }, 3000);
        
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
    }
});

// Empêcher les espaces au début des champs texte
['fullname', 'email'].forEach(fieldName => {
    fields[fieldName].addEventListener('keydown', (e) => {
        if (e.key === ' ' && e.target.selectionStart === 0) {
            e.preventDefault();
        }
    });
});

// Définir la date maximale pour le champ de naissance (aujourd'hui)
const today = new Date();
const maxDate = today.toISOString().split('T')[0];
fields.birthdate.setAttribute('max', maxDate);

// Définir la date minimale (il y a 120 ans)
const minDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
fields.birthdate.setAttribute('min', minDate.toISOString().split('T')[0]);

// Animation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    console.log('Formulaire d\'inscription chargé avec succès!');
    
    // Focus automatique sur le premier champ
    fields.fullname.focus();
});
