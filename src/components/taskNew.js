import { createTask } from "../api/tasks.js";
import { initBoard } from "../routes/routes.js";
import { showToast } from "../utils/toasts.js";

export function setupTaskForm() {
  const form = document.getElementById("task-form");
  const titleInput = document.getElementById("title");
  const detailInput = document.getElementById("detail");
  const titleCount = document.getElementById("title-count");
  const detailCount = document.getElementById("detail-count");
  const cancelBtn = document.getElementById("cancel-btn");
  const taskModal = document.getElementById("modal-task");

  log;
  // Validación en tiempo real del título
  titleInput.addEventListener("input", () => {
    validateTitle(titleInput);
    titleCount.textContent = `${titleInput.value.length}/50`;
  });

  // Contador de caracteres en detalle
  detailInput.addEventListener("input", () => {
    detailCount.textContent = `${detailInput.value.length}/500`;
  });

  // Manejo del submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const taskData = {
      title: formData.get("title"),
      detail: formData.get("detail"),
      date: formData.get("date"),
      time: formData.get("time"),
      status: formData.get("status"),
      dueDate: new Date(`${formData.get("date")}T${formData.get("time")}`),
    };

    try {
      await createTask(taskData);
      console.log("Refrescando el tablero...");
      showToast("Tarea creada exitosamente", "success");
      location.reload();
      

    } catch (error) {
      showToast("Error al crear la tarea", "error");
    }
  });

  // Manejo del botón cancelar
  cancelBtn.addEventListener("click", () => {
    taskModal.classList.add("hidden");
  });

  // Función interna de validación del título
  function validateTitle(input) {
    const isValid = input.value.length > 0 && input.value.length <= 50;
    input.setCustomValidity(
      isValid ? "" : "El título debe tener entre 1 y 50 caracteres"
    );
  }
}
