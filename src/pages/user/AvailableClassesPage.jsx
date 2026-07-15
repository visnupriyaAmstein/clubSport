import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import Swal from "sweetalert2"
import { getAvailableClasses, createReservation } from "../../services/memberService"
import { getDayLabel } from "../../utils/dateHelpers"
import { resolveSportName, resolveRoomName, resolveCoachLabel } from "../../utils/sportRoomHelpers"

function AvailableClassesPage() {
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading]         = useState(true)
  const [booking, setBooking]         = useState(null) 

  const refresh = () => {
    setLoading(true)
    getAvailableClasses()
      .then((data) => setAssignments(data.data ?? data))
      .catch((err) => Swal.fire({ title: "Error", text: err.message, icon: "error" }))
      .finally(() => setLoading(false))
  }

  useEffect(() => { refresh() }, [])

  const handleReserve = async (schedule) => {
    setBooking(schedule.id)
    try {
      await createReservation(schedule.id)
      await Swal.fire({ title: "¡Reserva creada!", text: "Tu clase fue reservada con éxito.", icon: "success" })
      refresh()
    } catch (err) {
      Swal.fire({ title: "No se pudo reservar", text: err.message, icon: "error" })
    } finally {
      setBooking(null)
    }
  }

  return (
    <div style={{ color: "#C9DCDC" }}>
      <h5 style={{ color: "#fff", fontWeight: 500, marginBottom: "16px" }}>Clases Disponibles</h5>

      {loading ? (
        <Spinner animation="border" size="sm" />
      ) : assignments.length === 0 ? (
        <p style={{ color: "#8FB3B3" }}>No hay clases disponibles por ahora.</p>
      ) : (
        <div style={{ display: "grid", gap: "12px" }}>
          {assignments.map((a) => (
            <div
              key={a.id}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "0.5px solid rgba(255,255,255,0.08)",
                borderRadius: "10px",
                padding: "14px 16px",
              }}
            >
              {/* Encabezado: deporte + sala + coach */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                <span style={{ color: "#fff", fontWeight: 500, fontSize: "14px" }}>
                  {resolveSportName(a)}
                </span>
                <span style={{ color: "#8FB3B3", fontSize: "12px" }}>
                  {resolveRoomName(a)} · Coach {resolveCoachLabel(a)}
                </span>
              </div>

              {/* Horarios de esta asignación */}
              {(!a.schedules || a.schedules.length === 0) ? (
                <p style={{ margin: 0, fontSize: "12px", color: "#8FB3B3", fontStyle: "italic" }}>
                  Sin horarios programados todavía.
                </p>
              ) : (
                <div style={{ display: "grid", gap: "6px" }}>
                  {a.schedules.map((s) => (
                    <div
                      key={s.id}
                      style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        background: "rgba(255,255,255,0.04)", borderRadius: "8px", padding: "8px 12px",
                      }}
                    >
                      <span style={{ fontSize: "13px", color: "#C9DCDC" }}>
                        {getDayLabel(s.day_of_week)} · {s.start_time?.slice(0, 5)} - {s.end_time?.slice(0, 5)}
                      </span>
                      <button
                        onClick={() => handleReserve(s)}
                        disabled={booking === s.id}
                        style={{
                          background: "#138690", color: "#fff", border: "none",
                          borderRadius: "8px", padding: "6px 14px", fontSize: "12px",
                          cursor: booking === s.id ? "wait" : "pointer",
                        }}
                      >
                        {booking === s.id ? "Reservando..." : "Reservar"}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AvailableClassesPage
