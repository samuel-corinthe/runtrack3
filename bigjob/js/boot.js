const LS_KEYS = {
  DATA: "lp_data_v1",
  CURRENT_USER: "lp_current_user_v1",
};

async function loadSeedIfNeeded() {
  if (!localStorage.getItem(LS_KEYS.DATA)) {
    const res = await fetch("assets/data.json");
    const json = await res.json();
    localStorage.setItem(LS_KEYS.DATA, JSON.stringify(json));
  }
}

function readData() {
  return JSON.parse(localStorage.getItem(LS_KEYS.DATA) || "{}");
}
function writeData(data) {
  localStorage.setItem(LS_KEYS.DATA, JSON.stringify(data));
}
function getCurrentUser() {
  return JSON.parse(localStorage.getItem(LS_KEYS.CURRENT_USER) || "null");
}
function setCurrentUser(u) {
  localStorage.setItem(LS_KEYS.CURRENT_USER, JSON.stringify(u));
}
function logout() {
  localStorage.removeItem(LS_KEYS.CURRENT_USER);
  location.href = "login.html";
}

(async () => {
  await loadSeedIfNeeded();
})();
