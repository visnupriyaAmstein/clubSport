import { api } from "./apiClient"

export const getSportRooms    = ()         => api.get("/sport-rooms")
export const getSportRoomById = (id)       => api.get(`/sport-rooms/${id}`)
export const createSportRoom  = (data)     => api.post("/sport-rooms", data)
export const updateSportRoom  = (id, data) => api.put(`/sport-rooms/${id}`, data)
export const deleteSportRoom  = (id)       => api.delete(`/sport-rooms/${id}`)
