const BASE = "http://localhost:3000/api"

function getToken() {
  return localStorage.getItem("token")
}

function getHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  }
}


export async function getUsers() {
  const response = await fetch(`${BASE}/users`, {
    method: "GET",
    headers: getHeaders(),
  })
  if (!response.ok) throw new Error("Error al obtener usuarios")
  return response.json()
}

export async function getUserById(id) {
  const response = await fetch(`${BASE}/users/${id}`, {
    method: "GET",
    headers: getHeaders(),
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.message || "Error al obtener usuario")
  return data
}

export async function createUser(userData) {
  const response = await fetch(`${BASE}/users`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(userData),
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.message || "Error al crear usuario")
  return data
}

export async function updateUser(id, userData) {
  const response = await fetch(`${BASE}/users/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(userData),
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.message || "Error al actualizar usuario")
  return data
}

export async function deleteUser(id) {
  const response = await fetch(`${BASE}/users/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  })
  if (!response.ok) throw new Error("Error al eliminar usuario")
  return true
}

export async function getMyProfile() {
  const response = await fetch(`${BASE}/auth/me`, {
    method: "GET",
    headers: getHeaders(),
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.message || "Error al obtener perfil")
  return data
}

export async function updateMyProfile(userData) {
  
  const response = await fetch(`${BASE}/auth/me`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(userData),
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.message || "Error al actualizar perfil")
  return data
}

export async function updateMyPassword(passwords) {
  
  const response = await fetch(`${BASE}/auth/me/password`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(passwords),
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.message || "Error al cambiar contraseña")
  return data
}
