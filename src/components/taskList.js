import { TaskCard } from "./taskCard.js";

/**
 * Render list of tasks
 * @param {Array} tasks - lista de tareas
 */

export function renderTaskList(tasks) {
  const openModalBtn = document.getElementById("openModalBtn");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const taskModal = document.getElementById("taskModal");
  const taskForm = document.getElementById("taskForm");
  
  openModalBtn.addEventListener("click", () => {
    taskModal.classList.remove("hidden");
  });

  closeModalBtn.addEventListener("click", () => {
    taskModal.classList.add("hidden");
  });

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("taskTitle").value;
    const detail = document.getElementById("taskDetail").value;
    const status = document.getElementById("taskStatus").value;

    // Crear la tarea
    const task = document.createElement("div");
    task.className = "task";
    task.textContent = title;

    document.getElementById(status).appendChild(task);

    // Resetear y cerrar modal
    taskForm.reset();
    taskModal.classList.add("hidden");
  });

  const columns = {
    todo: document.getElementById("todo"),
    "in-progress": document.getElementById("in-progress"),
    done: document.getElementById("done"),
  };

  // 🔄 Renderizar cards
  function render() {
    Object.values(columns).forEach((col) => (col.innerHTML = "")); // limpiar

    tasks.forEach((task) => {
      const card = TaskCard(task);
      columns[task.status].appendChild(card);

      // 👇 volver a añadir eventos al card nuevo
      card.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", task.id);
      });
    });
  }

  // ⚡ Eventos en columnas
  Object.entries(columns).forEach(([status, col]) => {
    const parent = col.parentElement; // 👈 columna entera

    parent.addEventListener("dragover", (e) => {
      e.preventDefault();
      col.classList.add("highlight");
    });

    parent.addEventListener("dragleave", () => {
      col.classList.remove("highlight");
    });

    parent.addEventListener("drop", (e) => {
      e.preventDefault();
      col.classList.remove("highlight");

      const id = e.dataTransfer.getData("text/plain");
      const task = tasks.find((t) => t.id == id);
      if (task) {
        task.status = status;
        render();
      }
    });
  });

  render();
}
