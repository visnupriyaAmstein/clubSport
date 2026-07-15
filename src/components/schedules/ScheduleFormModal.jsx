import { useEffect, useState } from "react"
import { Button, Form, Modal, Spinner } from "react-bootstrap"
import { getSportRooms } from "../../services/sportRoomService"
import { DAYS } from "../../utils/dateHelpers"
import { resolveSportName, resolveRoomName, resolveCoachLabel } from "../../utils/sportRoomHelpers"

const initialForm = {
  sport_room_id: "",
  day_of_week:   "",
  start_time:    "",
  end_time:      "",
}

const BG     = "#241712"
const BORDER = "0.5px solid rgba(203,108,50,0.25)"
const ACCENT = "#CB6C32"

const inputStyle = {
  background:   "rgba(255,255,255,0.06)",
  border:       "0.5px solid rgba(255,255,255,0.12)",
  color:        "#fff",
  fontSize:     "13px",
  borderRadius: "8px",
}

const selectStyle = { ...inputStyle, colorScheme: "dark" }

const labelStyle = {
  color:        "#C2A294",
  fontSize:     "12px",
  marginBottom: "4px",
}

function ScheduleFormModal({ show, handleClose, handleSave, selectedSchedule }) {
  const [formData, setFormData]           = useState(initialForm)
  const [assignments, setAssignments]     = useState([])   
  const [loadingOpts, setLoadingOpts]     = useState(false)
  const [optsError, setOptsError]         = useState("")

  useEffect(() => {
    if (!show) return
    setLoadingOpts(true)
    setOptsError("")
    getSportRooms()
      .then((data) => {
        const sportRoomsList = data.data ?? data
        const enriched = sportRoomsList.map((sr) => ({
          id: sr.id,
          label: `${resolveSportName(sr)} · ${resolveRoomName(sr)} · Coach ${resolveCoachLabel(sr)}`,
        }))
        setAssignments(enriched)
      })
      .catch((err) => setOptsError(err.message || "Error al cargar asignaciones"))
      .finally(() => setLoadingOpts(false))
  }, [show])

  useEffect(() => {
    if (selectedSchedule) {
      setFormData({
        sport_room_id: selectedSchedule.sport_room_id ?? "",
        day_of_week:   selectedSchedule.day_of_week    ?? "",
        start_time:    selectedSchedule.start_time     ?? "",
        end_time:      selectedSchedule.end_time       ?? "",
      })
    } else {
      setFormData(initialForm)
    }
  }, [selectedSchedule, show])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    // day_of_week debe ir como número (int en el backend)
    handleSave({ ...formData, day_of_week: Number(formData.day_of_week) })
  }

  return (
    <Modal show={show} onHide={handleClose} centered>

      <Modal.Header closeButton style={{ background: BG, borderBottom: BORDER }}>
        <Modal.Title style={{ color: "#fff", fontSize: "15px", fontWeight: 500 }}>
          <i
            className={`ti ${selectedSchedule ? "ti-pencil" : "ti-calendar-plus"}`}
            style={{ marginRight: "8px", color: ACCENT }}
          />
          {selectedSchedule ? "Editar Horario" : "Nuevo Horario"}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSubmit}>
        <Modal.Body style={{ background: BG, padding: "20px" }}>

          {loadingOpts ? (
            <div style={{ textAlign: "center", padding: "24px" }}>
              <Spinner animation="border" size="sm" style={{ color: ACCENT }} />
              <p style={{ color: "#C2A294", fontSize: "13px", marginTop: "8px" }}>Cargando asignaciones...</p>
            </div>
          ) : optsError ? (
            <p style={{ color: "#f87171", fontSize: "13px" }}>{optsError}</p>
          ) : assignments.length === 0 ? (
            <p style={{ color: "#C2A294", fontSize: "13px" }}>
              No hay asignaciones (Deporte + Sala + Coach) creadas todavía.
              Primero debes crear una en "Gestión de Asignaciones".
            </p>
          ) : (
            <>
              {/* Asignación (sport_room_id) */}
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>Asignación (Deporte · Sala · Coach)</Form.Label>
                <Form.Select
                  name="sport_room_id"
                  value={formData.sport_room_id}
                  onChange={handleChange}
                  required
                  style={selectStyle}
                >
                  <option value="" style={{ background: "#2a1a12" }}>Seleccionar asignación...</option>
                  {assignments.map((a) => (
                    <option key={a.id} value={a.id} style={{ background: "#2a1a12", color: "#fff" }}>
                      {a.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* Día */}
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>Día de la semana</Form.Label>
                <Form.Select
                  name="day_of_week"
                  value={formData.day_of_week}
                  onChange={handleChange}
                  required
                  style={selectStyle}
                >
                  <option value="" style={{ background: "#2a1a12" }}>Seleccionar día...</option>
                  {DAYS.map((d) => (
                    <option key={d.value} value={d.value} style={{ background: "#2a1a12", color: "#fff" }}>
                      {d.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* Horas */}
              <div className="row g-3 mb-1">
                <div className="col-6">
                  <Form.Group>
                    <Form.Label style={labelStyle}>Hora inicio</Form.Label>
                    <Form.Control
                      type="time"
                      name="start_time"
                      value={formData.start_time}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                    />
                  </Form.Group>
                </div>
                <div className="col-6">
                  <Form.Group>
                    <Form.Label style={labelStyle}>Hora término</Form.Label>
                    <Form.Control
                      type="time"
                      name="end_time"
                      value={formData.end_time}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                    />
                  </Form.Group>
                </div>
              </div>
            </>
          )}

        </Modal.Body>

        <Modal.Footer style={{ background: BG, borderTop: BORDER, gap: "8px" }}>
          <Button
            variant="secondary"
            onClick={handleClose}
            size="sm"
            style={{ fontSize: "13px" }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            size="sm"
            disabled={loadingOpts || !!optsError || assignments.length === 0}
            style={{ background: ACCENT, border: "none", fontSize: "13px", padding: "6px 18px" }}
          >
            <i className="ti ti-check" style={{ marginRight: "5px" }} />
            Guardar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default ScheduleFormModal  
