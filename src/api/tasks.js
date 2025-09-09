const API = import.meta.env.VITE_API_URL;

/**
 * Get all tasks
 * @returns {Promise<Array>}
 */
export async function getTasks() {
  const res = await fetch(`${API}/tasks`, { method: "GET" });
  if (!res.ok) throw new Error("Error fetching tasks");
  return res.json();
}

/**
 * Create new task
 * @param {Object} task
 */
export async function createTask(task) {
  const res = await fetch(`${API}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Error creating task");
  return res.json();
}
