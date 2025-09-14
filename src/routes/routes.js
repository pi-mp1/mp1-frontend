import { renderLayout, renderAuthLayout } from "../layouts";
import { renderTaskList } from "../components/taskList";
import { renderRegister } from "../components/register";
import { renderLogin } from "../components/login";
import { openModal, closeModal } from "../components/modal";
import { setupTaskForm } from "../components/taskNew.js";
import { getTasks } from "../api/tasks.js";

const app = document.getElementById("app");

/**
 * @typedef {Object} Route
 * @property {string} file - The HTML file to load for this route.
 * @property {Function|null} init - Initialization function for the view (optional).
 * @property {Function} layout - Layout renderer function (wraps the view HTML).
 */

/**
 * Build a safe URL for fetching view fragments inside Vite (dev and build).
 *
 * @param {string} name - The name of the view (without extension).
 * @returns {URL} The resolved URL for the view HTML file.
 *
 * @example
 * const url = viewURL("login");
 * // => URL object pointing to ../views/login.html
 */

const viewURL = (name) => new URL(`../views/${name}.html`, import.meta.url);

/**
 * Map of available application routes.
 * Each route defines which HTML file to load, which layout to use, and an optional initializer.
 *
 * @type {Object.<string, Route>}
 */

export const routes = {
  home: {
    file: "home.html",
    init: initHome,
    layout: renderLayout,
  },
  taskList: {
    file: "taskList.html",
    init: initBoard,
    layout: renderLayout,
  },
  "login": {
    file: "login.html",
    init: renderLogin,
    layout: renderAuthLayout,
  },
  "register": {
    file: "register.html",
    init: renderRegister,
    layout: renderAuthLayout,
  },
  "reset-password": {
    file: "reset-password.html",
    init: null,
    layout: renderAuthLayout,
  },
  taskNew: {
    file: "taskNew.html",
    init: initTaskNew,
    layout: renderLayout,
  },
};

/**
 * Open the "new task" modal.
 *
 * This function:
 *  - Fetches the HTML fragment for the new task form.
 *  - Renders it inside a modal via {@link openModal}.
 *  - Sets up cancel and submit handlers.
 *
 * @async
 * @returns {Promise<void>}
 */

async function openTaskNewModal() {
  console.log("=== openTaskNewModal ejecutándose ===");
  // 1) Traer el HTML del formulario existente
  const res = await fetch(new URL(`../views/taskNew.html`, import.meta.url));
  const html = await res.text();

  openModal(html);

  const today = new Date().toISOString().split("T")[0];
  document.getElementById("date")?.setAttribute("min", today);

  // Cancel button handler
  const cancelBtn = document.getElementById("cancel-btn");
  console.log("Botón cancelar encontrado:", cancelBtn);

  if (cancelBtn) {
    cancelBtn.addEventListener("click", (e) => {
      e.preventDefault();
      closeModal();
    });
  } else {
    console.error("Botón cancel-btn no encontrado");
  }

  const form = document.getElementById("task-form");
  const { createTask } = await import("../api/tasks.js");
  const { showToast } = await import("../utils/toasts.js");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const taskData = {
      title: fd.get("title"),
      detail: fd.get("detail"),
      date: fd.get("date"),
      time: fd.get("time"),
      status: fd.get("status"),
      dueDate: new Date(`${fd.get("date")}T${fd.get("time")}`),
    };
    try {
      await createTask(taskData);
      showToast("Tarea creada exitosamente", "success");
      initBoard();
      closeModal();
    } catch {
      showToast("Error al crear la tarea", "error");
    }
  });

  cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal();
  });
}

/**
 * Load a given view into the #app container.
 *
 * @async
 * @param {string} name - Route name (must exist in {@link routes}).
 * @returns {Promise<void>}
 * @throws {Error} If the route or view file cannot be found.
 */

export async function loadView(name) {
  const route = routes[name];
  const app = document.getElementById("app");

  if (!route) {
    throw new Error(`Route not found: ${name}`);
  }

  try {
    // view HTML
    const res = await fetch(viewURL(name));
    if (!res.ok) throw new Error(`Failed to load view: ${name}`);
    const html = await res.text();

    // Render with layout
    app.innerHTML = route.layout ? route.layout(html) : html;
    

    // Run initializer
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

/**
 * Initialize the home view.
 * (Currently placeholder logic.)
 */

function initHome() {
  console.log("Home view initialized");
  // lógica específica para la vista de inicio
}

export async function initBoard() {
  const tasks = await getTasks()

  renderTaskList(tasks);
  console.log("Board view initialized");

  // Button inside the task list view
  const btn = document.getElementById("btn-new-task");
  if (btn)
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openTaskNewModal();
    });

  // Header link "+ New Task"
  const headerBtn = document.querySelector("a.btn-new-task");
  if (headerBtn)
    headerBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openTaskNewModal();
    });
}

/**
 * Initialize the hash-based router.
 * Attaches a hashchange listener and performs the first render.
 *
 * @function
 */
export function initRouter() {
  window.addEventListener("hashchange", handleRoute);
  handleRoute(); // first render
}

/**
 * Handle the current route based on location.hash.
 * Enforces authentication rules (redirects based on token presence).
 *
 * @private
 */
function handleRoute() {
  const path =
    (location.hash.startsWith("#/") ? location.hash.slice(2) : "") || "login";
  console.log(`Routing to: ${path}`);

  // Ya no verificamos localStorage, porque usamos cookies
  const route = routes[path] ? path : "login";

  loadView(route).catch((err) => {
    console.error(err);
    app.innerHTML = `<p style="color:#ffb4b4">Error loading the view.</p>`;
  });
}

/**
 * Initialize the "New Task" view directly (non-modal).
 */
function initTaskNew() {
  setupTaskForm();
}
