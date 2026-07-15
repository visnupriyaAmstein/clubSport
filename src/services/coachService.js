import { api } from "./apiClient"

export const getCoachDashboard = () => api.get("/coach/dashboard")
export const getMyClasses      = () => api.get("/coach/my-classes")
export const getMySchedules    = () => api.get("/coach/my-schedules")
export const getMyRooms        = () => api.get("/coach/my-rooms")
