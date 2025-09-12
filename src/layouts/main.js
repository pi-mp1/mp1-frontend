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
      <header class="header">
        <div class="logo-container">
          <h1>TASKIO</h1>
        </div>
        <nav>
          <a href="#/home">Inicio</a>
          <a href="#/taskList">Tareas</a>
          <a href="#/taskNew" class="btn-new-task">+ Nueva Tarea</a>
          <!-- Icono Logout con SVG -->
            <a href="javascript:void(0)" 
              id="logout-btn" 
              class="logout-icon" 
              title="Cerrar sesión" 
              onclick="logout()">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                  stroke-width="1.5" stroke="currentColor" width="24" height="24">
                <path stroke-linecap="round" stroke-linejoin="round" 
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 
                    005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 
                    002.25-2.25V15M18 12H9m9 0l-3-3m3 3l-3 3" />
              </svg>
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
