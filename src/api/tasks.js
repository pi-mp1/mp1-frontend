const API = import.meta.env.VITE_API_URL;

/**
 * Get all tasks
 * @returns {Promise<Array>}
 */
export async function getTasks() {
  const token = localStorage.getItem("token"); // o sessionStorage
  const res = await fetch(`${API}/tasks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, // 🔑 se envía el token aquí
    },
  });
  if (!res.ok) throw new Error("Error fetching tasks");
  return res.json();
}

/**
 * Create new task
 * @param {Object} task
 */
export async function createTask(task) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, // 🔑 igual aquí
    },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Error creating task");
  return res.json();
}
