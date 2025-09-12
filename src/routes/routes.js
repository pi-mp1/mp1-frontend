import { renderLayout, renderAuthLayout } from "../layouts";
import { renderTaskList } from "../components/taskList";
import { renderRegister } from "../components/register";
import { renderLogin } from "../components/login";
import { openModal, closeModal } from "../components/modal";
import { setupTaskForm } from "../components/taskNew.js";
import { getTasks } from "../api/tasks.js";

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

async function openTaskNewModal() {
  console.log("=== openTaskNewModal ejecutándose ===");
  // 1) Traer el HTML del formulario existente
  const res = await fetch(new URL(`../views/taskNew.html`, import.meta.url));
  const html = await res.text();

  // 2) Abrir modal con ese HTML
  openModal(html);

  // 3) Inicializaciones mínimas con tu módulo actual
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("date")?.setAttribute("min", today);

  // Botón cancelar: cierra el modal sin navegar
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
      // Si necesitas refrescar la lista, vuelve a cargar la ruta o re-renderiza
      // location.hash = "#/taskList";
    } catch {
      showToast("Error al crear la tarea", "error");
    }
  });

  cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal();
  });
}

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
    app.innerHTML = route.layout ? route.layout(html) : html;

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

export async function initBoard() {
  const tasks = await getTasks()

  renderTaskList(tasks);
  console.log("Board view initialized");

  // Botón dentro de la vista de lista
  const btn = document.getElementById("btn-new-task");
  if (btn)
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openTaskNewModal();
    });

  // Enlace del header "+ Nueva Tarea"
  const headerBtn = document.querySelector("a.btn-new-task");
  if (headerBtn)
    headerBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openTaskNewModal();
    });
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
function initTaskNew() {
  setupTaskForm();
}
