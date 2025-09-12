/**
 * Log the user out of the application.
 *
 * This function:
 *  - Removes the authentication token from localStorage.
 *  - Redirects the user to the root path (/).
 *
 * @function
 * @returns {void} Does not return a value. Redirects the user to the home page.
 *
 * @example
 * // Trigger logout when clicking a button
 * document.getElementById("logoutBtn").addEventListener("click", logout);
 */

export function logout() {
  localStorage.removeItem("token");
  location.href = "/";
}
window.logout = logout;
