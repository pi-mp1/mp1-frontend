import { deleteUser, getProfile, updateProfile } from "../api/users";
import { showToast } from "../utils/toasts";

/**
 * @typedef {Object} UserProfile
 * @property {string} firstName - User's first name.
 * @property {string} lastName - User's last name.
 * @property {number} age - User's age.
 * @property {string} email - User's email address.
 * @property {string|Date} createdAt - ISO string or Date representing the account creation date.
 */

/**
 * Renders the profile section, sets up modal edit functionality,
 * and handles profile deletion events.
 *
 * @async
 * @function renderProfile
 * @returns {Promise<void>} Resolves when the profile view has been rendered and listeners attached.
 *
 * @throws {Error} Logs an error if the profile cannot be fetched from the API.
 *
 * @example
 * // Typical usage on page load
 * document.addEventListener("DOMContentLoaded", () => {
 *   renderProfile();
 * });
 *
 * @description
 * The function performs the following:
 * 1. Fetches the current user profile via getProfile() and updates the DOM with:
 *    - Full name
 *    - Email
 *    - Age
 *    - Creation date (localized to es-CO)
 * 2. Handles *Edit Profile modal*:
 *    - Opens modal and pre-fills current profile data.
 *    - Submits updated profile via updateProfile().
 *    - Displays a success toast and re-renders profile info.
 * 3. Handles *Delete Profile modal*:
 *    - Opens modal when the delete button is clicked.
 *    - Validates password input before calling deleteUser().
 *    - Shows appropriate toasts for success/error.
 *    - On success, redirects user to login after short delay.
 */

export async function renderProfile() {
  try {
    const profile = await getProfile();
    
    if (profile) {
      document.getElementById("profile-loader").classList.add("hidden");
      document.getElementById("profile-info").classList.remove("hidden");
      // Full name
      document.getElementById(
        "profile-name"
      ).textContent = `${profile.firstName} ${profile.lastName}`;

      // Email
      document.getElementById("profile-email").textContent = profile.email;

      // Age
      document.getElementById("profile-age").textContent = profile.age;

      // Creation date (formatted)
      const fecha = new Date(profile.createdAt);
      document.getElementById("profile-create").textContent = fecha.toLocaleDateString(
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
  const updateBtn = document.getElementById("update-profile-btn");

  // Open modal with current data
  editBtn.addEventListener("click", async () => {
    const profile = await getProfile();

    document.getElementById("firstName").value = profile.firstName;
    document.getElementById("lastName").value = profile.lastName;
    document.getElementById("ageInput").value = profile.age;
    document.getElementById("emailEdit").value = profile.email;

    modal.classList.remove("hidden");
  });

  // Close modal
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Save changes
  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const updatedProfile = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      age: parseInt(document.getElementById("ageInput").value, 10),
      email:document.getElementById("emailEdit").value,
    };
    

    const originalText = updateBtn.textContent;
    updateBtn.disabled = true;
    updateBtn.innerHTML = '<span class="spinner"></span> Guardando...';
    
    const result = await updateProfile(updatedProfile);
    showToast("Perfil editado exitosamente", "success")
    console.log(result);
    await renderProfile()
    modal.classList.add("hidden");
    updateBtn.disabled = false;
    updateBtn.innerHTML = originalText;

  });

  const modalProfile = document.getElementById("modal-delete-profile");
  const btnDeleteProfile = document.querySelector(".btn-logout");
  const btnCancel = document.getElementById("cancel-delete");
  const btnConfirm = document.getElementById("confirm-delete");
  const inputPassword = document.getElementById("delete-password");

  // Open modal
  btnDeleteProfile.addEventListener("click", () => {
    modalProfile.style.display = "flex";
  });

  // Close modal
  btnCancel.addEventListener("click", () => {
    modalProfile.style.display = "none";
    inputPassword.value = "";
  });

  // Confirm deletion
  btnConfirm.addEventListener("click", async ()=> {
    const password = inputPassword.value.trim();
    if (!password) {
      showToast("Por favor ingresa tu contraseña.","error")
      return;
    }
    const msg = await deleteUser(password);

    if (!msg) {
      showToast("Contraseña incorrecta", "error");
    } else {
      showToast("Perfil eliminado con éxito", "success");
      modalProfile.style.display = "none";
      inputPassword.value = "";

      setTimeout(() => {
        window.location.href = "/#/login";
      }, 1500);
    }
  });
}
