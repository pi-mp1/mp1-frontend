/**
 * Renderiza el layout principal y coloca el contenido de la vista dentro de <main id="content">
 */
import { logout } from "../utils/auth.js";
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

export function renderLayout(innerHtml) {

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
              <svg fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
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
