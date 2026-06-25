const API_URL = "http://localhost:3000/api/auth"

//Login contra el backend
export async function loginUser(credentials) {
    const response = await fetch(`${API_URL}/login`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials), 
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión")
    }
    return data 
}

//guardar sesión en el navegador
export const saveSession = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
};

//obtener token
export const getToken = () => {
    return localStorage.getItem("token");
}

//obtener usuario
export const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

//verificar si existe sesión 
export const isAuthenticated = () => {
    return Boolean(getToken());
}

//cerrar sesión
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}