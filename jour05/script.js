/**
 * Valide un formulaire
 */
function validateForm(form) {
    let isValid = true;
    
    // Validation des champs requis
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(function(field) {
        if (!field.value.trim()) {
            showFieldError(field, 'Ce champ est obligatoire');
            isValid = false;
        } else {
            hideFieldError(field);
        }
    });
    
    // Validation des emails
    const emailFields = form.querySelectorAll('input[type="email"]');
    emailFields.forEach(function(field) {
        if (field.value && !isValidEmail(field.value)) {
            showFieldError(field, 'Adresse email invalide');
            isValid = false;
        }
    });
    
    // Validation des mots de passe
    const passwordField = form.querySelector('input[name="password"]');
    const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$.!%(+;)\*\/\-_{}#~$*%:!,<²°>ù^`|@[\]*?&]).{8,}$/;
    
    if (PasswordRegex && passwordField && 
        PasswordRegex.value !== passwordField.value) {
        showFieldError(confirmPasswordField, 'Le mot de passe doit contenir au moins 8 caractères une majuscule et une minuscule');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Affiche une erreur sur un champ
 */
function showFieldError(field, message) {
    hideFieldError(field);
    
    const error = document.createElement('div');
    error.className = 'field-error';
    error.textContent = message;
    error.style.color = '#ef4444';
    error.style.fontSize = '0.875rem';
    error.style.marginTop = '0.25rem';
    
    field.style.borderColor = '#ef4444';
    field.parentNode.appendChild(error);
}

/**
 * Valide une adresse email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}