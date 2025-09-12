/**
 * Renderiza el layout principal y coloca el contenido de la vista dentro de <main id="content">
 */
export function renderLayout(innerHtml) {
  return `
    <div class="layout">
      <header>
        <h1>Mi Aplicación</h1>
        <nav>
          <a href="#/home">Inicio</a>
          <a href="#/taskList">Tareas</a>
          <a href="#/taskNew" class="btn-new-task">+ Nueva Tarea</a>
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