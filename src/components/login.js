import { loginUser } from "../api/users";
import { showToast } from "../utils/toasts";

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
 */
export function renderLogin() {
  document
    .getElementById("loginForm")
    .addEventListener("submit", async function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const data = await loginUser({ email, password });
        showToast("Login exitoso", "success");

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
