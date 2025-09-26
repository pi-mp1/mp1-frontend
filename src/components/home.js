import { taskStatistics } from "../api/tasks";

/**
 * Initializes the Home view by fetching task statistics and updating
 * the corresponding DOM elements with the retrieved values.
 *
 * @async
 * @function initHome
 * @returns {Promise<void>} Resolves when the DOM has been updated.
 *
 * @throws {Error} Logs an error if fetching task statistics fails.
 *
 * @example
 * // Typical usage on page load
 * document.addEventListener("DOMContentLoaded", () => {
 *   initHome();
 * });
 *
 * @description
 * This function performs the following steps:
 * 1. Calls the taskStatistics API to fetch task data.
 * 2. Extracts the total number of tasks and counts by status:
 *    - done → completed tasks
 *    - todo → pending tasks
 *    - in-progress → tasks currently in progress
 * 3. Updates the DOM elements with IDs:
 *    - total-tasks → total number of tasks
 *    - completed-tasks → number of completed tasks
 *    - pending-tasks → sum of pending and in-progress tasks
 */

export async function initHome() {
  try {
    const stats = await taskStatistics();

    if (stats) {
      // 👉 Obtaining Statistics
      const totalStats = stats.total || 0;
      const statisticsByStatus = stats.byStatus || [];
      const completedStats = statisticsByStatus.find((s) => s.status === "done")?.count || 0;
      const pendingStats = statisticsByStatus.find((s) => s.status === "todo")?.count || 0;
      const inProgressStats = statisticsByStatus.find((s) => s.status === "in-progress")?.count || 0;

      // 👉 Obtaining DOM elements
      const totalTasks = document.getElementById("total-tasks");
      const completedTasks = document.getElementById("completed-tasks");
      const pendingTasks = document.getElementById("pending-tasks");

      // 👉 DOM Manipulation
      totalTasks.textContent = totalStats;
      completedTasks.textContent = completedStats;
      pendingTasks.textContent = pendingStats + inProgressStats;
    }
  } catch (error) {
    console.error(error);
  }
}