import { TaskCard } from "../components/taskCard";
import { renderTaskList } from "../components/taskList";
import { renderLayout } from "../layouts/main";

const app = document.getElementById("app");

/**
 * Build a safe URL for fetching view fragments inside Vite (dev and build).
 * @param {string} name - The name of the view (without extension).
 * @returns {URL} The resolved URL for the view HTML file.
 */

const viewURL = (name) => new URL(`../views/${name}.html`, import.meta.url);

export const routes = {
  home: {
    file: "home.html",
    init: initHome,
    layout: true,
  },
  taskList: {
    file: "taskList.html",
    init: initBoard,
    layout: true,
  },
  login: {
    file: "login.html",
    init: null,
    layout: false,
  },
  register: {
    file: "register.html",
    init: null,
    layout: false,
  },
};

export async function loadView(name) {
  const route = routes[name];
  const app = document.getElementById("app");

  if (!route) {
    throw new Error(`Route not found: ${name}`);
  }

  try {
    // 1. Cargar HTML de la vista
    const res = await fetch(viewURL(name));
    if (!res.ok) throw new Error(`Failed to load view: ${name}`);
    const html = await res.text();

    // 2. Renderizar con o sin layout
    app.innerHTML = route.layout ? renderLayout(html) : html;

    // 3. Ejecutar inicializador (si existe)
    if (typeof route.init === "function") {
      route.init();
    }
  } catch (err) {
    console.error(err);
    app.innerHTML = `
      <p style="color:#ffb4b4">Error loading the view "${name}"</p>
    `;
  }
}

function initHome() {
  console.log("Home view initialized");
  // Aquí puedes agregar lógica específica para la vista de inicio
}

function initBoard() {
  const tasks = [
    {
      id: 1,
      title: "Configurar proyecto",
      detail: "Crear estructura con Vite y rutas.",
      status: "todo",
      dateTime: Date.now(),
    },
    {
      id: 2,
      title: "Diseñar base de datos",
      detail: "Definir tablas y relaciones.",
      status: "in-progress",
      dateTime: Date.now(),
    },
    {
      id: 3,
      title: "Configurar router",
      detail: "Crear manejador de rutas hash.",
      status: "done",
      dateTime: Date.now(),
    },
  ];
  renderTaskList(tasks);
}

/**
 * Initialize the hash-based router.
 * Attaches an event listener for URL changes and triggers the first render.
 */
export function initRouter() {
  window.addEventListener("hashchange", handleRoute);
  handleRoute(); // first render
}

/**
 * Handle the current route based on the location hash.
 * Fallback to 'home' if the route is unknown.
 */
function handleRoute() {
  const path =
    (location.hash.startsWith("#/") ? location.hash.slice(2) : "") || "login";
  console.log(`Routing to: ${path}`);

  const route = routes[path] ? path : "login";

  loadView(route).catch((err) => {
    console.error(err);
    app.innerHTML = `<p style="color:#ffb4b4">Error loading the view.</p>`;
  });
}
