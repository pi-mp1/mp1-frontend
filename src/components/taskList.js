import { TaskCard } from "./taskCard.js";

/**
 * Render list of tasks
 * @param {Array} tasks - lista de tareas
 */
export function renderTaskList(tasks) {
  const container = document.getElementById("task-list");
  container.innerHTML = "";

  if (tasks.length === 0) {
    const noTasks = document.createElement("p");
    noTasks.textContent = "No tasks available.";
    container.appendChild(noTasks);
    return;
  }

  tasks.forEach((task) => {
    container.appendChild(TaskCard(task));
  });
}