import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import { getMyClasses } from "../../services/coachService"
import { getDayLabel } from "../../utils/dateHelpers"
import { resolveSportName, resolveRoomName } from "../../utils/sportRoomHelpers"

function MyClassesPage() {
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState("")

  useEffect(() => {
    getMyClasses()
      .then((data) => setAssignments(data.data ?? data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={{ color: "#C8DBC9" }}>
      <h5 style={{ color: "#fff", fontWeight: 500, marginBottom: "16px" }}>Mis Clases</h5>

      {loading ? (
        <Spinner animation="border" size="sm" />
      ) : error ? (
        <p style={{ color: "#f87171" }}>{error}</p>
      ) : assignments.length === 0 ? (
        <p style={{ color: "#8BAE8C" }}>No tienes clases asignadas.</p>
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
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "#fff", fontWeight: 500, fontSize: "14px" }}>
                  {resolveSportName(a)}
                </span>
                <span style={{ color: "#43A047", fontSize: "12px" }}>
                  {resolveRoomName(a)}
                </span>
              </div>

              {(!a.schedules || a.schedules.length === 0) ? (
                <p style={{ margin: 0, fontSize: "12px", color: "#8BAE8C", fontStyle: "italic" }}>
                  Sin horarios asignados todavía.
                </p>
              ) : (
                <div style={{ display: "grid", gap: "6px" }}>
                  {a.schedules.map((s) => (
                    <div
                      key={s.id}
                      style={{
                        fontSize: "13px", color: "#C8DBC9",
                        background: "rgba(255,255,255,0.04)", borderRadius: "8px", padding: "8px 12px",
                      }}
                    >
                      {getDayLabel(s.day_of_week)} · {s.start_time?.slice(0, 5)} - {s.end_time?.slice(0, 5)}
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

export default MyClassesPage
