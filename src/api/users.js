const API = import.meta.env.VITE_API_URL;
 // ajusta según tu backend

export async function registerUser(user) {
  const res = await fetch(`${API}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error registrando usuario");
  }

  return res.json();
}

export async function loginUser(credentials) {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error iniciando sesión");
  }
  const data = await res.json();
  // 🔹 Guardar en localStorage solo aquí
  localStorage.setItem("token", data.token);

  return data;
}