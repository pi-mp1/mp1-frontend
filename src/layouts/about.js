/**
 * Render the about page layout (standalone page without dashboard navigation).
 *
 * This layout:
 *  - Displays a simple header with logo and navigation back to main app
 *  - Shows the about content without dashboard menu
 *  - Includes a footer
 *
 * @function
 * @param {string} innerHtml - The HTML content of the about page
 * @returns {string} The complete HTML string for the about layout
 *
 * @example
 * const html = renderAboutLayout("<h1>About Us</h1><p>Content here</p>");
 * document.body.innerHTML = html;
 */
export function renderAboutLayout(innerHtml) {
  return `
    <div class="about-layout">
      <header class="about-header">
        <div class="about-logo">
          <img src="logo.png" alt="Taskio logo" width="120" height="30">
          <h1>TASKIO</h1>
        </div>
        <nav class="about-nav">
          <a href="#/login" class="btn-login">Iniciar Sesión</a>
          <a href="#/register" class="btn-register">Registrarse</a>
        </nav>
      </header>

      <main class="about-main">
        ${innerHtml}
      </main>

      <footer class="about-footer">
        <p>© 2025 Taskio - Todos los derechos reservados</p>
        <div class="footer-links">
          <a href="#/about">Sobre Nosotros</a>
          <a href="#/login">Iniciar Sesión</a>
          <a href="#/register">Registrarse</a>
        </div>
      </footer>
    </div>
  `;
}
