import { resetPassword, resetPasswordWithToken } from "../api/users";
import { showToast } from "../utils/toasts";

/**
 * Initializes the password reset workflow.
 *
 * @function initRestablePassword
 * @returns {void} This function does not return a value; it sets up event listeners
 *                 and handles password reset logic.
 *
 * @example
 * // Typical usage on page load
 * document.addEventListener("DOMContentLoaded", () => {
 *   initRestablePassword();
 * });
 *
 * @description
 * Depending on the presence of a token in the URL hash:
 *
 * 1. *If a reset token exists* (#/reset-password?token=...):
 *    - Hides the email request form and displays the new password form.
 *    - Validates the password fields:
 *      - Passwords must match.
 *      - Password must include at least:
 *        - one lowercase letter
 *        - one uppercase letter
 *        - one special character
 *        - minimum length of 8 characters
 *    - Calls resetPasswordWithToken(token, password) to update the password.
 *    - Displays a success toast and redirects the user to the login page.
 *
 * 2. *If no reset token is provided*:
 *    - Displays the email request form and hides the new password form.
 *    - On submission:
 *      - Validates the email field.
 *      - Calls resetPassword(email) to send a reset email.
 *      - Displays a success toast and redirects to the login page.
 *
 * @throws {Error} Any network or API errors are not rethrown but may log to console
 *                 depending on the implementation of resetPassword and resetPasswordWithToken.
 */

export function initRestablePassword() {
  console.log("=== initRestablePassword ejecutándose ===");
  const hash = window.location.hash.slice(2);

  // Separate route and query
  const [routePath, queryString] = hash.split("?");
  const params = new URLSearchParams(queryString);
  const token = params.get("token");

  const requestForm = document.getElementById("resetPasswordForm");
  console.log("requestForm:", requestForm);

  const newPasswordForm = document.getElementById("new-password-form");

  if (token) {
    // Show new password form
    requestForm.style.display = "none";
    newPasswordForm.style.display = "block";

    // Event to change password
    document
      .getElementById("newPasswordForm")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document
          .getElementById("confirmPassword")
          .value.trim();

        if (!password || password !== confirmPassword) {
          showToast("Las contraseñas no coinciden", "error");
          return;
        }

        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
        if (!regexPassword.test(password)) {
          showToast(
            "La contraseña debe tener minúscula mayúscula y caracter especial",
            "error"
          );
          return;
        }

        await resetPasswordWithToken(token, password);
        showToast("Contraseña cambiada exitosamente", "success");
        window.location.href = "#/login";
      });
  } else {
    // Show email sending form
    requestForm.style.display = "block";
    newPasswordForm.style.display = "none";

    // Current code to send email
    document
      .getElementById("resetPasswordForm")
      .addEventListener("submit", async function (e) {
        e.preventDefault();
        const email = document.getElementById("email").value.trim();
        if (!email) {
          showToast("Por favor, ingresa un correo electrónico válido.", "error");
          return;
        }
        showToast("Email de cambio de contraseña enviado exitosamente", "success");
        await resetPassword(email);
        window.location.href = "#/login";
      });
  }
}
