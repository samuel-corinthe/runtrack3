const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!fullname || !email || !password) {
      alert("Tous les champs sont requis !");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((u) => u.email === email)) {
      alert("Un compte existe déjà avec cet email.");
      return;
    }

    users.push({ fullname, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Compte créé avec succès !");
    window.location.href = "login.html";
  });
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      sessionStorage.setItem("loggedUser", JSON.stringify(user));
      alert(`Bienvenue ${user.fullname} !`);
      window.location.href = "dashboard.html";
    } else {
      alert("Identifiants incorrects !");
    }
  });
}

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  const user = JSON.parse(sessionStorage.getItem("loggedUser"));
  if (!user) {
    window.location.href = "login.html";
  }

  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("loggedUser");
    window.location.href = "index.html";
  });
}
