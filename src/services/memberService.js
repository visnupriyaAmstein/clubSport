import { api } from "./apiClient"

// Clases y deportes disponibles 
export const getMemberDashboard = ()   => api.get("/member/dashboard")
export const getAvailableClasses = ()  => api.get("/member/classes")
export const getClassById        = (id) => api.get(`/member/classes/${id}`)
export const getAvailableSports  = ()  => api.get("/member/sports")
export const getAvailableRooms   = ()  => api.get("/member/rooms")

// Reservas
export const getMyReservations = () =>
  api.get("/reservations/my-reservations")

export const createReservation = (classScheduleId) =>
  api.post("/reservations", { class_schedule_id: classScheduleId })

export const cancelReservation = (id) =>
  api.patch(`/reservations/${id}/cancel`, {})
