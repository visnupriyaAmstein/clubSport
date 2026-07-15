import { api } from "./apiClient"

export const getSports    = ()         => api.get("/sports")
export const getSportById = (id)       => api.get(`/sports/${id}`)
export const createSport  = (data)     => api.post("/sports", data)
export const updateSport  = (id, data) => api.put(`/sports/${id}`, data)
export const deleteSport  = (id)       => api.delete(`/sports/${id}`)
