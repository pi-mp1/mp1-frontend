import { TaskCard } from "./taskCard.js";

/**
 * Render list of tasks
 * @param {Array} tasks - lista de tareas
 */

export function renderTaskList(tasks) {

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
