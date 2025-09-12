/**
 * Renderiza el layout de autenticación (pantalla dividida: formulario a la izquierda, imagen a la derecha)
 * @param {string} innerHtml - Contenido HTML que se colocará en la parte izquierda (login, registro, etc.)
 */
export function renderAuthLayout(innerHtml) {
  return `
    <section class="auth-container">
      <section class="auth-card">
        <div class="logo">
          <img src="logo.jpg" alt="Taskio logo">
        </div>

        <main id="content">
          ${innerHtml} <!-- Aquí entra el formulario (login, registro, etc.) -->
        </main>
      </section>

      <section class="image-box">
        <img src="login_photo.png" alt="Taskio ilustración">
      </section>
    </section>
  `;
}
