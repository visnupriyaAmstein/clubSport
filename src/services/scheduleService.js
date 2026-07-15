import { api } from "./apiClient"

export const getSchedules    = ()         => api.get("/class-schedules")
export const getScheduleById = (id)       => api.get(`/class-schedules/${id}`)
export const createSchedule  = (data)     => api.post("/class-schedules", data)
export const updateSchedule  = (id, data) => api.put(`/class-schedules/${id}`, data)
export const deleteSchedule  = (id)       => api.delete(`/class-schedules/${id}`)
