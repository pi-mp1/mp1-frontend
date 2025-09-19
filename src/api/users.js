const API = import.meta.env.VITE_API_URL;

/**
 * @typedef {Object} UserData
 * @property {string} firstName - The user's first name.
 * @property {string} lastName - The user's last name.
 * @property {number} age - The user's age.
 * @property {string} email - The user's email address.
 * @property {string} password - The user's password.
 */

/**
 * @typedef {Object} Credentials
 * @property {string} email - The user's email.
 * @property {string} password - The user's password.
 */

/**
 * Register a new user in the system.
 *
 * @async
 * @function
 * @param {UserData} user - The user data to register.
 * @returns {Promise<Object>} A promise that resolves to the created user data (structure depends on backend).
 * @throws {Error} If the registration fails.
 *
 * @example
 * try {
 *   const user = await registerUser({
 *     firstName: "Alice",
 *     lastName: "Doe",
 *     age: 25,
 *     email: "alice@example.com",
 *     password: "StrongPass!23"
 *   });
 *   console.log("User registered:", user);
 * } catch (err) {
 *   console.error(err.message);
 * }
 */

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

/**
 * Authenticate a user and store their token in localStorage.
 *
 * @async
 * @function
 * @param {Credentials} credentials - The user's login credentials.
 * @returns {Promise<Object>} A promise that resolves to the login response (typically includes a JWT token).
 * @throws {Error} If login fails.
 *
 * @example
 * try {
 *   const session = await loginUser({
 *     email: "alice@example.com",
 *     password: "StrongPass!23"
 *   });
 *   console.log("Login successful:", session.token);
 * } catch (err) {
 *   console.error(err.message);
 * }
 */
export async function loginUser(credentials) {
  console.log("Logging in with credentials:", credentials);
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
    credentials: "include", // MUY IMPORTANTE
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error iniciando sesión");
  }

  return res.json(); // no guardes nada en localStorage
}

export async function resetPassword(email) {
  return await fetch(`${API}/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
}

export async function resetPasswordWithToken(token, newPassword) {
  return await fetch(`${API}/reset-password/${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({password: newPassword }),
  });
}

export async function session(){
    return await fetch(`${API}/session`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include"
  });
}