import { Icons } from "../utils/icons";


/**
 * Render a task card
 * @param {Object} task
 * @param {string} task.title
 * @param {string} [task.detail]
 * @param {string} task.dateTime
 * @param {string} task.status
 * @returns {HTMLElement}
 */
export function TaskCard(task) {
  const card = document.createElement("div");
  card.className = "card";
  card.draggable = true; // 👈 importante

  card.innerHTML = `
  <div class="card-header">
    <h3>${task.title}</h3>
      <div class="card-actions">
        <button class="icon-btn edit-btn" title="Editar">
          ${Icons.edit}
        </button>
        <button class="icon-btn delete-btn" title="Eliminar">
          ${Icons.delete}
        </button>
      </div>
  </div>

  <p class="card-detail">${task.detail || ""}</p>

  <div class="card-footer">
    <small>${new Date(task.dateTime).toLocaleString()}</small>
    <span class="status ${task.status}">
      ${formatStatus(task.status)}
    </span>
  </div>
`;

  // Guardar id de la tarea en el dataset
  card.dataset.id = task.id;

  return card;
}

function formatStatus(status) {
  switch (status) {
    case "todo":
      return "Por hacer";
    case "in-progress":
      return "En progreso";
    case "done":
      return "Hecho";
    default:
      return status;
  }
}
