import { loginUser } from "../api/users";

/**
 * Renders and manages the login form.
 *
 * This function attaches a submit event listener to the form with id loginForm.
 * On form submission:
 *  - Prevents the default browser behavior.
 *  - Retrieves the email and password values from the input fields.
 *  - Calls loginUser to authenticate the user.
 *  - Displays a success or error message using showToast.
 *  - Redirects to the task list view (#/taskList) if login is successful.
 *
 * @function
 * @async
 * @returns {void} Does not return a value. Redirects the user or displays a message in the DOM.
 *
 * @throws {Error} Displays the error message in the DOM if authentication fails.
 *
 * @example
 * // HTML:
 * <form id="loginForm">
 *   <input id="email" type="email" required />
 *   <input id="password" type="password" required />
 *   <button type="submit">Login</button>
 * </form>
 *
 * // JS:
 * renderLogin();
// Regex para validación RFC 5322
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * Renders and manages the login form with real-time validation.
 */
export function renderLogin() {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const submitBtn = document.getElementById("loginBtn");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  // Función de validación en tiempo real
  function validateForm() {
    let valid = true;

    // Validar email
    if (!emailRegex.test(emailInput.value)) {
      emailError.textContent = 'El correo no tiene un formato válido.';
      valid = false;
    } else {
      emailError.textContent = '';
    }

    // Validar password
    if (!passwordInput.value.trim()) {
      passwordError.textContent = 'La contraseña es obligatoria.';
      valid = false;
    } else {
      passwordError.textContent = '';
    }

    // Habilitar/deshabilitar botón
    submitBtn.disabled = !valid;
  }

  // Event listeners para validación en tiempo real
  emailInput.addEventListener('input', validateForm);
  emailInput.addEventListener('blur', validateForm);
  passwordInput.addEventListener('input', validateForm);
  passwordInput.addEventListener('blur', validateForm);

  // Validación inicial
  validateForm();

  // Event listener para el formulario
  document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    // Validar una vez más antes de enviar
    validateForm();
    if (submitBtn.disabled) return;

    // Mostrar spinner
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Procesando...';

    // Limpiar mensajes de error anteriores
    document.getElementById("msg").textContent = '';
    document.getElementById("msg").className = 'form-feedback';

    try {
      const email = emailInput.value;
      const password = passwordInput.value;

      const data = await loginUser({ email, password });
      
      // Almacenar token de forma segura
      if (data.token) {
        // Usar localStorage seguro (en producción usar HttpOnly cookies)
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userName', data.user?.name || 'Usuario');
      }

      // Mostrar mensaje de éxito
      document.getElementById("msg").textContent = 'Login exitoso';
      document.getElementById("msg").className = 'form-feedback is-success';

      // Redirigir después de un breve delay
      console.log("cargar lista de tareas");
      
      setTimeout(() => {
        window.location.href = "#/taskList";
      }, 500);

    } catch (error) {
      const serverMsg = error?.message || "";
      const friendly = /invalid|incorrect|not found|unauthorized/i.test(serverMsg)
        ? "Correo o contraseña incorrectos"
        : "No pudimos iniciar sesión. Intenta nuevamente.";
      
      document.getElementById("msg").textContent = friendly;
      document.getElementById("msg").className = 'form-feedback is-error';
    } finally {
      // Restaurar botón
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
        if (data.userId) {
          localStorage.setItem("userId", data.userId);
          // Redirect after login
          window.location.href = "#/home";
        }

      } catch (error) {
        showToast(error.message, "error");
      }
    });
}