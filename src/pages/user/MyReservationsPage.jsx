import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import Swal from "sweetalert2"
import { getMyReservations, cancelReservation } from "../../services/memberService"
import { getDayLabel } from "../../utils/dateHelpers"
import { resolveSportName, resolveRoomName, getAssignmentNodeFromSchedule } from "../../utils/sportRoomHelpers"

const STATUS_LABELS = {
  active:    { label: "Activa",    bg: "rgba(19,134,144,0.2)",  color: "#22B6C2" },
  pending:   { label: "Pendiente", bg: "rgba(203,108,50,0.2)",  color: "#E58A52" },
  cancelled: { label: "Cancelada", bg: "rgba(220,53,69,0.15)",  color: "#f87171" },
}

function MyReservationsPage() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading]           = useState(true)

  const refresh = () => {
    setLoading(true)
    getMyReservations()
      .then((data) => setReservations(data.data ?? data))
      .catch((err) => Swal.fire({ title: "Error", text: err.message, icon: "error" }))
      .finally(() => setLoading(false))
  }

  useEffect(() => { refresh() }, [])

  const handleCancel = async (reservation) => {
    const result = await Swal.fire({
      title: "¿Cancelar reserva?",
      text: "Esta acción liberará tu cupo en la clase.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "Volver",
    })
    if (result.isConfirmed) {
      try {
        await cancelReservation(reservation.id)
        Swal.fire({ title: "Reserva cancelada", icon: "success" })
        refresh()
      } catch (err) {
        Swal.fire({ title: "Error", text: err.message, icon: "error" })
      }
    }
  }

  return (
    <div style={{ color: "#C9DCDC" }}>
      <h5 style={{ color: "#fff", fontWeight: 500, marginBottom: "16px" }}>Mis Reservas</h5>

      {loading ? (
        <Spinner animation="border" size="sm" />
      ) : reservations.length === 0 ? (
        <p style={{ color: "#8FB3B3" }}>No tienes reservas activas.</p>
      ) : (
        <div style={{ display: "grid", gap: "10px" }}>
          {reservations.map((r) => {
            const schedule     = r.classSchedule
            const assignment   = getAssignmentNodeFromSchedule(schedule)
            const statusInfo   = STATUS_LABELS[r.status] ?? { label: r.status, bg: "rgba(255,255,255,0.1)", color: "#C9DCDC" }

            return (
              <div
                key={r.id}
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px", padding: "14px 16px",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#fff", fontWeight: 500 }}>
                      {resolveSportName(assignment)}
                    </span>
                    <span style={{
                      fontSize: "10px", padding: "2px 9px", borderRadius: "6px",
                      background: statusInfo.bg, color: statusInfo.color, fontWeight: 500,
                    }}>
                      {statusInfo.label}
                    </span>
                  </div>
                  <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#8FB3B3" }}>
                    {resolveRoomName(assignment)} · {getDayLabel(schedule?.day_of_week)} · {schedule?.start_time?.slice(0, 5)} - {schedule?.end_time?.slice(0, 5)}
                  </p>
                </div>
                {r.status !== "cancelled" && (
                  <button
                    onClick={() => handleCancel(r)}
                    style={{
                      background: "rgba(220,53,69,0.15)", color: "#f87171", border: "none",
                      borderRadius: "8px", padding: "7px 16px", fontSize: "13px", cursor: "pointer",
                    }}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default MyReservationsPage
