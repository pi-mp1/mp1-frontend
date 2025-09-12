import { createTask } from "../api/tasks.js";
import { showToast } from "../utils/toasts.js";

export function setupFormValidation() {
    const form = document.getElementById("task-form");
    const titleInput = document.getElementById("title");

  // Validación en tiempo real
    titleInput.addEventListener("input", validateTitle);
}

export function setupFormSubmission() {
    const form = document.getElementById("task-form");
    const cancelBtn = document.getElementById("cancel-btn");

    form.addEventListener("submit", handleSubmit);
    cancelBtn.addEventListener("click", handleCancel);
}

export function setupCharacterCounters() {
    const titleInput = document.getElementById("title");
    const detailInput = document.getElementById("detail");
    const titleCount = document.getElementById("title-count");
    const detailCount = document.getElementById("detail-count");

    titleInput.addEventListener("input", () => {
    titleCount.textContent = `${titleInput.value.length}/50`;
    });

    detailInput.addEventListener("input", () => {
    detailCount.textContent = `${detailInput.value.length}/500`;
    });
}

async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const taskData = {
    title: formData.get("title"),
    detail: formData.get("detail"),
    date: formData.get("date"),
    time: formData.get("time"),
    status: formData.get("status"),
    dateTime: new Date(
        `${formData.get("date")}T${formData.get("time")}`
    ).getTime(),
    };

    try {
    await createTask(taskData);
    showToast("Tarea creada exitosamente", "success");
    location.hash = "#/taskList";
    } catch (error) {
    showToast("Error al crear la tarea", "error");
    }
}

function handleCancel() {
    location.hash = "#/taskList";
}

function validateTitle() {
    const titleInput = document.getElementById("title");
    const isValid = titleInput.value.length > 0 && titleInput.value.length <= 50;
    titleInput.setCustomValidity(
    isValid ? "" : "El título debe tener entre 1 y 50 caracteres"
    );
}