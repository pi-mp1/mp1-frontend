import { registerUser } from "../api/users";

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
      // 🔹 Validaciones extra
      if (password !== confirmPassword) {
        msg.textContent = "Las contraseñas no coinciden";
        return;
      }

      const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
      if (!regexPassword.test(password)) {
        msg.textContent =
          "La contraseña debe tener minúscula, mayúscula y caracter especial";
        return;
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

        // ✅ Mostrar modal
        const modal = document.getElementById("successModal");
        modal.style.display = "flex";


        // Redirigir automáticamente en 3s si no hace clic
        setTimeout(() => {
          if (modal.style.display === "flex") {
            modal.style.display = "none";
            window.location.href = "#/login";
          }
        }, 1500);

      } catch (err) {
        msg.style.color = "red";
        msg.textContent = err.message || "Error en el registro";
        console.error(err);
      }
    });
}
