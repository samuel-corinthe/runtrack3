document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const fields = form.querySelectorAll("input");

  const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@laplateforme\.io$/;
  const PasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,;:+_#-]).{8,}$/;

  function showError(f, msg) {
    const err = f.parentNode.querySelector(".field-error");
    if (err) err.remove();
    const div = document.createElement("div");
    div.className = "field-error";
    div.textContent = msg;
    div.style.color = "#ef4444";
    div.style.fontSize = "0.875rem";
    f.parentNode.appendChild(div);
  }
  function clearError(f) {
    const e = f.parentNode.querySelector(".field-error");
    if (e) e.remove();
  }

  function validate(f) {
    let ok = true;
    clearError(f);
    if (!f.value.trim()) {
      showError(f, "Champ requis");
      ok = false;
    } else if (f.name === "email" && !strictEmailRegex.test(f.value)) {
      showError(f, "Email @laplateforme.io requis");
      ok = false;
    } else if (f.name === "password" && !PasswordRegex.test(f.value)) {
      showError(f, "8 caractères, majuscule, minuscule, chiffre, symbole");
      ok = false;
    } else if (f.name === "confirm" && f.value !== form.password.value) {
      showError(f, "Les mots de passe ne correspondent pas");
      ok = false;
    }
    f.style.borderColor = ok ? "#22c55e" : "#ef4444";
    f.style.backgroundColor = ok ? "#dcfce7" : "#fee2e2";
    return ok;
  }

  fields.forEach((f) => f.addEventListener("input", () => validate(f)));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    fields.forEach((f) => {
      if (!validate(f)) valid = false;
    });
    if (!valid) return;

    const data = readData();
    const email = form.email.value.trim().toLowerCase();
    const exists = (data.users || []).some((u) => u.email === email);
    if (exists) return alert("Un compte existe déjà avec cet email.");

    const newId = Math.max(0, ...data.users.map((u) => u.id)) + 1;
    const user = {
      id: newId,
      fullname: form.fullname.value.trim(),
      email,
      password: form.password.value.trim(),
      role: "user",
    };
    data.users.push(user);
    writeData(data);
    alert("Compte créé avec succès !");
    location.href = "login.html";
  });
});
