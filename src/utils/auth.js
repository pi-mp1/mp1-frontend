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

export async function logout() {
  try {
    await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
      method: "POST",
      credentials: "include", // manda la cookie
    });
  } catch (err) {
    console.error("Error al hacer logout:", err);
  }
  location.href = "/"; // redirigir después
}
window.logout = logout;
