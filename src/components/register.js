import { registerUser } from "../api/users";
import { showToast } from "../utils/toasts";

/**
 * Renders and manages the user registration form.
 *
 * This function:
 *  - Attaches a submit event listener to the form with id registerForm.
 *  - Validates user inputs:
 *    - Checks that the password matches the confirmation field.
 *    - Ensures the password includes at least one lowercase letter,
 *      one uppercase letter, one special character, and is at least 8 characters long.
 *  - Calls registerUser to send the user data to the backend.
 *  - Displays success or error messages using showToast or the #msg element.
 *  - Redirects to the login page (#/login) if registration succeeds.
 *
 * @function
 * @async
 * @returns {void} Does not return a value. Updates the DOM and may redirect the user.
 *
 * @throws {Error} Displays an error message in the UI if registration fails.
 *
 * @example
 * // HTML:
 * <form id="registerForm">
 *   <input id="nombres" type="text" required />
 *   <input id="apellidos" type="text" required />
 *   <input id="edad" type="number" required />
 *   <input id="email" type="email" required />
 *   <input id="password" type="password" required />
 *   <input id="confirmPassword" type="password" required />
 *   <button type="submit">Register</button>
 * </form>
 * <p id="msg"></p>
 *
 * // JS:
 * renderRegister();
 */

export function renderRegister() {
  document
    .getElementById("registerForm")
    .addEventListener("submit", async function (e) {
      e.preventDefault();
      const firstName = document.getElementById("nombres").value.trim();
      const lastName = document.getElementById("apellidos").value.trim();
      const age = parseInt(document.getElementById("edad").value);
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const msg = document.getElementById("msg");
      // Validations
      if (password !== confirmPassword) {
        showToast("Las contraseñas no coinciden", "error");
        return;
      }

      const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
      if (!regexPassword.test(password)) {
        showToast("La contraseña debe tener minúscula mayúscula y caracter especial", "error");
        return
      }

      try {
        const newUser = {
          firstName,
          lastName,
          age,
          email,
          password,
        };
        await registerUser(newUser);


        showToast("Usuario creado exitosamente", "success");
        window.location.href = "#/login";

      } catch (err) {
        msg.style.color = "red";
        msg.textContent = err.message || "Error en el registro";
        console.error(err);
      }
    });
}
