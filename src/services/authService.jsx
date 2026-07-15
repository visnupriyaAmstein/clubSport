const API_URL = "http://localhost:3000/api/auth";

// Login
export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.message || "Error al iniciar sesión")
  return data
}

// Registrio
export async function registerUser(form) {
  const payload = {
    full_name: `${form.nombre} ${form.apellido}`,
    email: form.email,
    password: form.password,
    birth_date: form.fechaNacimiento,
    metadata: {
      sports: form.deportes.map((name) => ({ name, frequency_per_week: 1 })),
    },
  }

  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.message || "Error al registrarse")
  return data
}

// guardar la sesion en browser
export function saveSession(token, user) {
  localStorage.setItem("token", token)
  localStorage.setItem("user", JSON.stringify(user))
}

// Get token
export function getToken() {
  return localStorage.getItem("token")
}

// Get user
export function getUser() {
  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : null
}

// mirar si la sesion existe
export function isAuthenticated() {
  return Boolean(getToken())
}

// Logout
export function logout() {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
}