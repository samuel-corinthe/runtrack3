document.body.classList.add("loading");

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => {
      loader.classList.add("hidden");
      document.body.classList.remove("loading");
    }, 600);
  }
});

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const burger = $("#burger");
const nav = $("#primary-nav");
if (burger && nav) {
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

const themeToggle = $("#themeToggle");
const THEME_KEY = "pref-theme";

function setTheme(mode) {
  document.documentElement.dataset.theme = mode;
  localStorage.setItem(THEME_KEY, mode);
}
function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) setTheme(saved);
}
initTheme();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme || "dark";
    const next = current === "dark" ? "light" : "dark";
    setTheme(next);
  });
}

const typingEl = document.querySelector(".typing");
const words = ["Front-end", "Full-stack", "Accessible", "Performant"];
let wi = 0,
  ci = 0,
  deleting = false;

function typeLoop() {
  if (!typingEl) return;
  const word = words[wi];
  typingEl.textContent = word.slice(0, deleting ? ci-- : ci++);
  if (!deleting && ci === word.length + 1) {
    deleting = true;
    setTimeout(typeLoop, 600);
    return;
  }
  if (deleting && ci === 0) {
    deleting = false;
    wi = (wi + 1) % words.length;
    setTimeout(typeLoop, 300);
    return;
  }
  setTimeout(typeLoop, deleting ? 40 : 90);
}
if (typingEl) typeLoop();

const revealEls = $$(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => io.observe(el));

const form = document.querySelector(".contact-form");
function showErr(field, msg) {
  const small = field.closest(".field")?.querySelector(".error");
  if (small) small.textContent = msg || "";
}
function validEmail(val) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val);
}
if (form) {
  form.addEventListener("input", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement))
      return;
    if (t.hasAttribute("required") && !t.value.trim())
      showErr(t, "Ce champ est obligatoire.");
    else if (t.type === "email" && t.value && !validEmail(t.value))
      showErr(t, "Format email invalide.");
    else showErr(t, "");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.elements.namedItem("name");
    const email = form.elements.namedItem("email");
    const message = form.elements.namedItem("message");
    let ok = true;
    [name, email, message].forEach((f) => {
      const field = f;
      if (field.hasAttribute("required") && !field.value.trim()) {
        showErr(field, "Ce champ est obligatoire.");
        ok = false;
      }
      if (field.type === "email" && !validEmail(field.value)) {
        showErr(field, "Format email invalide.");
        ok = false;
      }
    });
    const status = $(".form-status");
    if (!ok) {
      if (status) status.textContent = "Merci de corriger les champs en rouge.";
      return;
    }
    if (status) status.textContent = "Message envoyé.";
    form.reset();
  });
}

const skillsGrid = $("#skillsGrid");
const paginationContainer = $("#skillsPagination");
const tabs = $$(".tab-btn");
let currentPage = 0;
const itemsPerPage = 3;

const skills = [
  {
    name: "React",
    cat: "main",
    img: "react",
    desc: "Front-end moderne — UI dynamique, composants réutilisables et intégration API REST/GraphQL.",
  },
  {
    name: "Symfony",
    cat: "main",
    img: "symfony",
    desc: "Back-end robuste — architecture MVC, sécurité, API Platform et gestion de données.",
  },
  {
    name: "Python",
    cat: "main",
    img: "python",
    desc: "Scripts, data & automatisation — FastAPI, IA, data science, tâches serveur et DevOps.",
  },

  {
    name: "HTML5",
    cat: "front",
    img: "html5",
    desc: "Structure sémantique et accessibilité des pages web.",
  },
  {
    name: "CSS3",
    cat: "front",
    img: "css3",
    desc: "Design responsive, animations, grid & flexbox, préprocesseurs (SASS).",
  },
  {
    name: "JavaScript",
    cat: "front",
    img: "javascript",
    desc: "Langage du web — manipulation du DOM, APIs, front-end dynamique.",
  },
  {
    name: "Next.js",
    cat: "front",
    img: "nextjs",
    desc: "Framework React — rendu SSR, SEO, et performances optimisées.",
  },

  {
    name: "Node.js",
    cat: "back",
    img: "nodejs",
    desc: "Serveur et API — Express, Socket.io, outils CLI, back-end léger.",
  },
  {
    name: "PHP",
    cat: "back",
    img: "php",
    desc: "Langage côté serveur — création de sites dynamiques, gestion de sessions et interactions avec MySQL.",
  },
  {
    name: "MySQL",
    cat: "back",
    img: "mysql",
    desc: "Bases de données relationnelles, requêtes optimisées, ORM (Doctrine).",
  },
  {
    name: "MongoDB",
    cat: "back",
    img: "mongodb",
    desc: "NoSQL, flexibilité de schéma, intégration avec Node.js.",
  },

  {
    name: "Docker",
    cat: "data",
    img: "docker",
    desc: "Conteneurisation, CI/CD, déploiement reproductible.",
  },
  {
    name: "Git",
    cat: "data",
    img: "git",
    desc: "Versioning, branches, intégration continue.",
  },

  {
    name: "Debian",
    cat: "sys",
    img: "debian",
    desc: "Admin système, scripting, hébergement, sécurité réseau.",
  },
  {
    name: "C++",
    cat: "sys",
    img: "cplusplus",
    desc: "Programmation bas-niveau, structures et performances optimisées.",
  },

  {
    name: "jQuery",
    cat: "autres",
    img: "jquery",
    desc: "Manipulation DOM rapide et animations fluides.",
  },
  {
    name: "O'clock",
    cat: "autres",
    img: "git",
    desc: "Formation intensive — bonnes pratiques, rigueur et autonomie.",
  },
];

function renderSkills(cat = "main") {
  const filtered = skills.filter((s) => s.cat === cat);
  skillsGrid.innerHTML = "";
  filtered.forEach((s, i) => {
    const el = document.createElement("article");
    el.className = `skill-item${cat === "main" ? " big" : ""}`;
    el.dataset.cat = s.cat;
    el.innerHTML = `
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${s.img}/${s.img}-original.svg" alt="${s.name}">
      <h3>${s.name}</h3>
      <p>${s.desc}</p>
    `;
    skillsGrid.appendChild(el);
  });
  currentPage = 0;
  renderPagination();
  updateSkillsDisplay();
}

function renderPagination() {
  paginationContainer.innerHTML = "";
  const total = Math.ceil(skillsGrid.children.length / itemsPerPage);
  if (total <= 1) {
    paginationContainer.style.display = "none";
    return;
  } else {
    paginationContainer.style.display = "flex";
  }

  for (let i = 0; i < total; i++) {
    const b = document.createElement("button");
    b.textContent = i + 1;
    b.classList.toggle("active", i === currentPage);
    b.onclick = () => {
      currentPage = i;
      updateSkillsDisplay();
      renderPagination();
    };
    paginationContainer.appendChild(b);
  }
}

function updateSkillsDisplay() {
  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;
  Array.from(skillsGrid.children).forEach((item, i) => {
    item.style.display = i >= start && i < end ? "block" : "none";
    setTimeout(
      () => item.classList.toggle("visible", i >= start && i < end),
      30
    );
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    renderSkills(tab.dataset.cat);
  });
});

if (skillsGrid) {
  skillsGrid.addEventListener(
    "wheel",
    (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) e.preventDefault();
    },
    { passive: false }
  );
}

window.addEventListener("load", () => renderSkills("main"));

const projects = [
  {
    title: "Voyages",
    tech: ["HTML5", "CSS3"],
    img: "IMG/Voyage.png",
    desc: "Un site de voyage moderne présentant des destinations avec un design responsive.",
    link: "https://samuel-corinthe.students-laplateforme.io/voyages/",
    code: "https://github.com/samuel-corinthe/voyages",
  },
  {
    title: "Memory",
    tech: ["HTML5", "CSS3", "PHP"],
    img: "IMG/Memory.png",
    desc: "Jeu Memory développé en PHP et JavaScript avec gestion des scores.",
    link: "https://samuel-corinthe.students-laplateforme.io/memory/public/index.php?action=register",
    code: "https://github.com/samuel-corinthe/memory",
  },
  {
    title: "Médiathèque",
    tech: ["HTML5", "CSS3", "PHP", "JavaScript"],
    img: "IMG/Mediateque.png",
    desc: "Application de gestion de livres, films et albums avec ajout et suppression dynamiques.",
    link: "https://samuel-corinthe.students-laplateforme.io/mediatheque_paris_grp3/public/",
    code: "https://github.com/samuel-corinthe/mediatheque_paris_grp3",
  },
  {
    title: "Module de connexion",
    tech: ["PHP", "HTML5", "CSS3"],
    img: "IMG/Module.png",
    desc: "Module d’authentification sécurisé avec gestion de session et hash des mots de passe.",
    link: "https://samuel-corinthe.students-laplateforme.io/Module%20Connexion/",
    code: "https://github.com/samuel-corinthe/module-connexion",
  },
  {
    title: "LaPlateforme_",
    tech: ["HTML5", "CSS3"],
    img: "IMG/Laplateforme.png",
    desc: "Site vitrine présentant LaPlateforme_, respectant la charte graphique et les bonnes pratiques HTML/CSS.",
    link: "https://samuel-corinthe.students-laplateforme.io/Laplateforme_/accueil.html",
    code: "https://github.com/samuel-corinthe/laplateforme_",
  },
  {
    title: "Fansite",
    tech: ["HTML5", "CSS3"],
    img: "IMG/Fansite.png",
    desc: "Fansite sur un artiste ou univers, intégrant design immersif et responsive.",
    link: "https://samuel-corinthe.students-laplateforme.io/fansite/runtrack1-jour-5/",
    code: "https://github.com/samuel-corinthe/fansite",
  },
  {
    title: "AppFavorites",
    tech: ["HTML5", "CSS3"],
    img: "IMG/AppFavorites.png",
    desc: "Mini application de gestion de favoris dans un design épuré.",
    link: "https://samuel-corinthe.students-laplateforme.io/appfavorite/runtrack1-applisfavorites/",
    code: "https://github.com/samuel-corinthe/appfavorite",
  },
  {
    title: "Livre d’or",
    tech: ["HTML5", "CSS3", "PHP"],
    img: "IMG/Livreor.png",
    desc: "Application web permettant aux visiteurs de laisser un message et de consulter les témoignages.",
    link: "https://samuel-corinthe.students-laplateforme.io/livreor/",
    code: "https://github.com/samuel-corinthe/livre-or",
  },
];

const projectsGrid = $("#projectsGrid");
const projectsPagination = $("#projectsPagination");
let filteredProjects = projects;
let projectPage = 0;
let projectsPerPage = getProjectsPerPage();

function getProjectsPerPage() {
  return window.innerWidth < 1024 ? 1 : 3;
}

function renderProjects(techFilter = null) {
  filteredProjects = techFilter
    ? projects.filter((p) => p.tech.includes(techFilter))
    : projects;

  projectPage = 0;
  projectsPerPage = getProjectsPerPage();
  displayProjects();
  renderProjectPagination();

  const section = document.getElementById("projects");
  if (section) section.scrollIntoView({ behavior: "smooth" });
}

function displayProjects() {
  projectsGrid.innerHTML = "";
  const start = projectPage * projectsPerPage;
  const end = start + projectsPerPage;
  const current = filteredProjects.slice(start, end);

  if (current.length === 0) {
    projectsGrid.innerHTML =
      "<p>Aucun projet trouvé pour cette technologie.</p>";
    return;
  }

  current.forEach((p) => {
    const el = document.createElement("article");
    el.className = "project-card reveal";
    el.innerHTML = `
  <div class="project-media"><img src="${p.img}" alt="${p.title}"></div>
  <div class="project-body">
    <h3>${p.title}</h3>
    <p>${p.desc}</p>
    <p class="text-sm muted">Tech : ${p.tech.join(", ")}</p>
    <div class="project-actions">
      <a href="${
        p.link
      }" class="btn" target="_blank" rel="noopener noreferrer">Voir le projet</a>
      ${
        p.code
          ? `<a href="${p.code}" class="btn btn-ghost" target="_blank" rel="noopener noreferrer">Voir le code</a>`
          : ""
      }
    </div>
  </div>
`;
    projectsGrid.appendChild(el);
    setTimeout(() => el.classList.add("visible"), 30);
  });
}

function renderProjectPagination() {
  projectsPagination.innerHTML = "";
  const total = Math.ceil(filteredProjects.length / projectsPerPage);

  if (total <= 1) {
    projectsPagination.style.display = "none";
    return;
  }

  projectsPagination.style.display = "flex";
  for (let i = 0; i < total; i++) {
    const b = document.createElement("button");
    b.textContent = i + 1;
    b.classList.toggle("active", i === projectPage);
    b.onclick = () => {
      projectPage = i;
      displayProjects();
      renderProjectPagination();
    };
    projectsPagination.appendChild(b);
  }
}

window.addEventListener("resize", () => {
  const newCount = getProjectsPerPage();
  if (newCount !== projectsPerPage) {
    projectsPerPage = newCount;
    projectPage = 0;
    displayProjects();
    renderProjectPagination();
  }
});

document.addEventListener("click", (e) => {
  const skillEl = e.target.closest(".skill-item img");
  if (!skillEl) return;
  const techName = skillEl.alt.trim();
  renderProjects(techName);
});

const projectFilterButtons = $$(".filter-btn");
projectFilterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    projectFilterButtons.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    const filter = btn.dataset.filter;

    if (filter === "all") {
      renderProjects();
    } else if (filter === "front") {
      filteredProjects = projects.filter((p) =>
        p.tech.some((t) =>
          ["HTML5", "CSS3", "JavaScript", "React", "Next.js"].includes(t)
        )
      );
      projectPage = 0;
      displayProjects();
      renderProjectPagination();
    } else if (filter === "fullstack") {
      filteredProjects = projects.filter((p) =>
        p.tech.some((t) =>
          ["Node.js", "Symfony", "Python", "MongoDB", "MySQL"].includes(t)
        )
      );
      projectPage = 0;
      displayProjects();
      renderProjectPagination();
    }
  });
});

window.addEventListener("load", () => renderProjects());

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
