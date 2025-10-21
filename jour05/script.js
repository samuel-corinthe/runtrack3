document.querySelectorAll("form").forEach(form => {
  form.addEventListener("submit", e => {
    if (!validateForm(form)) e.preventDefault();
  });

  form.querySelectorAll("input").forEach(field => {
    field.addEventListener("input", () => validateField(field, form));
  });
});

function validateField(field, form) {
  let valid = true;
  hideFieldError(field);

  if (field.hasAttribute("required") && !field.value.trim()) {
    showFieldError(field, "Ce champ est obligatoire");
    valid = false;
  }

  if (field.type === "email") {
    const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (field.value && !strictEmailRegex.test(field.value)) {
      showFieldError(field, "Adresse email invalide (ex : nom@domaine.fr)");
      valid = false;
    }
  }

  if (field.name === "password") {
    const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,;:+_#-]).{8,}$/;
    if (field.value && !PasswordRegex.test(field.value)) {
      showFieldError(field, "8 caractères min, majuscule, minuscule, chiffre et symbole requis");
      valid = false;
    }
  }

  if (field.name === "confirm") {
    const passwordField = form.querySelector('input[name="password"]');
    if (passwordField && field.value !== passwordField.value) {
      showFieldError(field, "Les mots de passe ne correspondent pas");
      valid = false;
    }
  }

  field.style.borderColor = valid ? "#22c55e" : "#ef4444";
  field.style.backgroundColor = valid ? "#dcfce7" : "#fee2e2";
  return valid;
}

function validateForm(form) {
  let isValid = true;
  form.querySelectorAll("input").forEach(field => {
    if (!validateField(field, form)) isValid = false;
  });
  return isValid;
}

function showFieldError(field, message) {
  hideFieldError(field);
  const error = document.createElement("div");
  error.className = "field-error";
  error.textContent = message;
  error.style.color = "#ef4444";
  error.style.fontSize = "0.875rem";
  error.style.marginTop = "0.25rem";
  if (!field.parentNode.querySelector(".field-error")) {
    field.parentNode.appendChild(error);
  }
}

function hideFieldError(field) {
  const error = field.parentNode.querySelector(".field-error");
  if (error) error.remove();
}

function isValidEmail(email) {
  const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return strictEmailRegex.test(email);
}
