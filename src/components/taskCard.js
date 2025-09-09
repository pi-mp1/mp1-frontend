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
  card.innerHTML = `
    <h3>${task.title}</h3>
    <p>${task.detail || ""}</p>
    <small>${new Date(task.dateTime).toLocaleString()} — ${task.status}</small>
  `;
  return card;
}