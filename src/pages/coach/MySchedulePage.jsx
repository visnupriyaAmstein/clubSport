import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import { getMySchedules } from "../../services/coachService"
import { getDayLabel } from "../../utils/dateHelpers"
import { resolveSportName, resolveRoomName, getAssignmentNodeFromSchedule } from "../../utils/sportRoomHelpers"

function MySchedulePage() {
  const [schedules, setSchedules] = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState("")

  useEffect(() => {
    getMySchedules()
      .then((data) => setSchedules(data.data ?? data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={{ color: "#C8DBC9" }}>
      <h5 style={{ color: "#fff", fontWeight: 500, marginBottom: "16px" }}>Mi Horario</h5>

      {loading ? (
        <Spinner animation="border" size="sm" />
      ) : error ? (
        <p style={{ color: "#f87171" }}>{error}</p>
      ) : schedules.length === 0 ? (
        <p style={{ color: "#8BAE8C" }}>No tienes horarios asignados.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>
              {["Día", "Deporte", "Sala", "Horario"].map((h) => (
                <th key={h} style={{ padding: "10px 14px", color: "#8BAE8C", textAlign: "left", fontSize: "11px" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {schedules.map((s) => {
              const assignment = getAssignmentNodeFromSchedule(s)
              return (
                <tr key={s.id} style={{ borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
                  <td style={{ padding: "10px 14px", color: "#fff" }}>{getDayLabel(s.day_of_week)}</td>
                  <td style={{ padding: "10px 14px", color: "#C8DBC9" }}>{resolveSportName(assignment)}</td>
                  <td style={{ padding: "10px 14px", color: "#C8DBC9" }}>{resolveRoomName(assignment)}</td>
                  <td style={{ padding: "10px 14px", color: "#C8DBC9" }}>
                    {s.start_time?.slice(0, 5)} - {s.end_time?.slice(0, 5)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default MySchedulePage
