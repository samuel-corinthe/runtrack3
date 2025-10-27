document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.email.value.trim().toLowerCase();
    const password = form.password.value.trim();
    const data = readData();

    const user = (data.users || []).find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      alert("Email ou mot de passe incorrect");
      return;
    }

    setCurrentUser(user);
    location.href = "index.html";
  });
});
