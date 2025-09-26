import { getProfile, updateProfile } from "../api/users";
import { showToast } from "../utils/toasts";

export async function renderProfile() {
  try {
    const profile = await getProfile();
    console.log(profile);
    
    if (profile) {
      // Nombre completo
      document.getElementById(
        "name"
      ).textContent = `${profile.firstName} ${profile.lastName}`;

      // Email
      document.getElementById("email").textContent = profile.email;

      // Edad
      document.getElementById("age").textContent = profile.age;

      // Fecha de creación (formateada)
      const fecha = new Date(profile.createdAt);
      document.getElementById("create").textContent = fecha.toLocaleDateString(
        "es-CO",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );
    }
  } catch (error) {
    console.error("Error cargando perfil:", error);
  }

  const editBtn = document.querySelector(".btn-edit");
  const modal = document.getElementById("profileEditModal");
  const closeBtn = document.getElementById("closeModal");
  const editForm = document.getElementById("editProfileForm");


  // Abrir modal con datos actuales
  editBtn.addEventListener("click", async () => {
    const profile = await getProfile();

    document.getElementById("firstName").value = profile.firstName;
    document.getElementById("lastName").value = profile.lastName;
    document.getElementById("ageInput").value = profile.age;
    document.getElementById("emailEdit").value = profile.email;

    modal.classList.remove("hidden");
  });

  // Cerrar modal
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Guardar cambios
  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const updatedProfile = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      age: parseInt(document.getElementById("ageInput").value, 10),
      email:document.getElementById("emailEdit").value,
    };

    const result = await updateProfile(updatedProfile);
    showToast("Perfil editado exitosamente", "success")
    console.log(result);
    await renderProfile()
    modal.classList.add("hidden");


  });
}
