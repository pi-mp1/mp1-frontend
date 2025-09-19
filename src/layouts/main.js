/**
 * Renderiza el layout principal y coloca el contenido de la vista dentro de <main id="content">
 */
import { logout } from "../utils/auth.js";
import { Icons } from "../utils/icons.js";
import { isAuthenticated } from "../utils/isAuthenticated.js";
/**
 * Render the main application layout.
 *
 * This layout:
 *  - Displays a header with the app logo and navigation links.
 *  - Provides links for "Home", "Tasks", and "+ New Task".
 *  - Includes a logout button with an inline SVG icon that calls {@link logout}.
 *  - Wraps the main view content inside <main id="content">.
 *  - Adds a #modal-root container for rendering modals.
 *  - Displays a footer with app copyright.
 *
 * @function
 * @param {string} innerHtml - The HTML content of the current view to inject inside the <main> section.
 * @returns {string} The complete HTML string for the layout including header, main content, and footer.
 *
 * @example
 * // Render a task list view inside the main layout
 * const html = renderLayout("<h2>My Tasks</h2><ul><li>Task 1</li></ul>");
 * document.body.innerHTML = html;
 */

export async function renderLayout(innerHtml) {
  const logged = await isAuthenticated();
  if (!logged) {
    console.log("Redirigiendo a login");
    location.href = "/";
    return;
  }

  return `
    <div class="layout">
      <header class="navbar">
        <div>
          <a href="#/home">
            <img src="logo.jpg" alt="Logo" height="40" />
          </a>
        </div>
        <nav>
          <a href="#/home">Inicio</a>
          <a href="#/taskList">Tareas</a>
          <a href="#/taskNew" class="btn-new-task">+ Nueva Tarea</a>
          <a href="javascript:void(0)" 
              id="logout-btn" 
              class="logout-icon"
              title="Cerrar sesión" 
              onclick="logout()">
              ${Icons.logout}
              Cerrar sesión
          </a>
        </nav>
      </header>

      <main id="content">
        ${innerHtml} <!-- Aquí entra el HTML de la vista -->
      </main>

      <div id="modal-root"></div>

      <footer>
        © 2025 - Todos los derechos reservados
      </footer>
    </div>
  `;


}
