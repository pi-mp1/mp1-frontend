import { loginUser } from "../api/users";

export function renderLogin() {
  document
    .getElementById("loginForm")
    .addEventListener("submit", async function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const msg = document.getElementById("msg");

      try {
        const data = await loginUser({ email, password });
        msg.textContent = "Login exitoso 🚀";
        console.log("Usuario:", data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        // Redirigir después de login
        window.location.href = "#/taskList";
      } catch (error) {
        msg.textContent = error.message;
      }
    });
}
