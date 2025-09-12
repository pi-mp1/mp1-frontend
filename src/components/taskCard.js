import { Icons } from "../utils/icons";

/**
 * @typedef {Object} Task
 * @property {string} id - Unique identifier for the task.
 * @property {string} title - Task title.
 * @property {string} [detail] - Optional detailed description of the task.
 * @property {string} dueDate - Task due date as a string (parsable by Date).
 * @property {"todo"|"in-progress"|"done"} status - Current status of the task.
 */

/**
 * Render a task card element for the UI.#
 * 
 * This function creates a draggable card that displays task information,
 * including title, details, due date, and status. It also injects edit
 * and delete buttons with their corresponding icons.
 * 
 * @function
 * @param {Task} task - The task object containing task data.
 * @returns {HTMLElement} The rendered task card element.
 * 
 * @example
 * 
 * const task = {
 *   id: "1",
 *   title: "Finish project",
 *   detail: "Complete the final report",
 *   dueDate: "2025-09-15T10:00:00Z",
 *   status: "in-progress"
 * };
 * 
 * const card = TaskCard(task);
 * document.body.appendChild(card);
 */
export function TaskCard(task) {
  const card = document.createElement("div");
  card.className = "card";
  card.draggable = true; // Enable drag and drop

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
    <small>${new Date(task.dueDate).toLocaleString()}</small>
    <span class="status ${task.status}">
      ${formatStatus(task.status)}
    </span>
  </div>
`;

  // store the task ID in the dataset for reference
  card.dataset.id = task.id;

  return card;
}

/**
 * Convert a status code into a human-readable string.
 * 
 * @param {"todo"|"in-progress"|"done"|string} status - Task status code.
 * @returns {string} A user-friendly label for the status.
 * 
 * @example
 * formatStatus("todo"); // "To do"
 */

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
