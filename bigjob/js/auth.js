function guard(roles = []) {
  const u = getCurrentUser();
  if (!u) return (location.href = "login.html");
  if (roles.length && !roles.includes(u.role))
    return (location.href = "index.html");
  const badge = document.getElementById("userBadge");
  if (badge) badge.textContent = `${u.fullname} · ${u.role}`;
  const modLink = document.getElementById("modLink");
  if (modLink && (u.role === "moderator" || u.role === "admin"))
    modLink.style.display = "";
  const adminLink = document.getElementById("adminLink");
  if (adminLink && u.role === "admin") adminLink.style.display = "";
  const lo = document.getElementById("logoutBtn");
  if (lo) lo.addEventListener("click", logout);
}

/* ---- Validation helpers ---- */
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
  const err = field.parentNode.querySelector(".field-error");
  if (err) err.remove();
}

function validateField(field, form) {
  let valid = true;
  hideFieldError(field);

  // Vide
  if (field.hasAttribute("required") && !field.value.trim()) {
    showFieldError(field, "Ce champ est obligatoire");
    valid = false;
  }

  // Email
  const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@laplateforme\.io$/;
  if (
    field.name === "email" &&
    field.value &&
    !strictEmailRegex.test(field.value)
  ) {
    showFieldError(field, "Adresse email invalide (ex : nom@domaine.io)");
    valid = false;
  }

  // Mot de passe
  if (field.name === "password") {
    const PasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,;:+_#-]).{8,}$/;
    if (field.value && !PasswordRegex.test(field.value)) {
      showFieldError(
        field,
        "8 caractères min, majuscule, minuscule, chiffre et symbole requis"
      );
      valid = false;
    }
  }

  // Confirmation
  if (field.name === "confirm") {
    const pw = form.querySelector('input[name="password"]').value;
    if (pw && field.value !== pw) {
      showFieldError(field, "Les mots de passe ne correspondent pas");
      valid = false;
    }
  }

  // Styles visuels
  field.style.borderColor = valid ? "#22c55e" : "#ef4444";
  field.style.backgroundColor = valid ? "#dcfce7" : "#fee2e2";
  return valid;
}

/* ---- Gestion du formulaire ---- */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("authForm");
  if (!form) {
    guard();
    return;
  }

  const fields = form.querySelectorAll("input");
  fields.forEach((f) =>
    f.addEventListener("input", () => validateField(f, form))
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let allValid = true;
    fields.forEach((f) => {
      if (!validateField(f, form)) allValid = false;
    });
    if (!allValid) return;

    const fullname = form.fullname.value.trim();
    const email = form.email.value.trim().toLowerCase();
    const password = form.password.value.trim();

    const data = readData();
    const domain = email.split("@")[1] || "";
    const allowed = (data.allowedDomains || []).includes(domain);
    if (!allowed) {
      return alert(`Domaine non autorisé: @${domain}`);
    }

    // Création / mise à jour de l'utilisateur
    let user = (data.users || []).find((u) => u.email === email);
    if (!user) {
      const newId = Math.max(0, ...data.users.map((u) => u.id)) + 1;
      user = { id: newId, email, fullname, role: "user", password };
      data.users.push(user);
      writeData(data);
    } else {
      if (fullname && user.fullname !== fullname) user.fullname = fullname;
      if (password) user.password = password;
      writeData(data);
    }

    setCurrentUser(user);
    location.href = "index.html";
  });
});
