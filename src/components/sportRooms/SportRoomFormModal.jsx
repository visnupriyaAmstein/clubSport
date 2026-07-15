import { useEffect, useState } from "react"
import { Button, Form, Modal, Spinner } from "react-bootstrap"
import { getSports } from "../../services/sportService"
import { getRooms } from "../../services/roomService"
import { getUsers } from "../../services/userService"

const initialForm = {
  sport_id: "",
  room_id:  "",
  coach_id: "",
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

const selectStyle = {
  ...inputStyle,
  colorScheme: "dark",
}

const labelStyle = {
  color:        "#C2A294",
  fontSize:     "12px",
  marginBottom: "4px",
}

function SportRoomFormModal({ show, handleClose, handleSave, selectedAssignment }) {
  const [formData, setFormData]       = useState(initialForm)
  const [sports, setSports]           = useState([])
  const [rooms, setRooms]             = useState([])
  const [coaches, setCoaches]         = useState([])
  const [loadingOpts, setLoadingOpts] = useState(false)
  const [optsError, setOptsError]     = useState("")

  useEffect(() => {
    if (!show) return
    setLoadingOpts(true)
    setOptsError("")
    Promise.all([getSports(), getRooms(), getUsers()])
      .then(([sportsData, roomsData, usersData]) => {
        setSports(sportsData.data ?? sportsData)
        setRooms(roomsData.data ?? roomsData)

        const allUsers = usersData.data ?? usersData
        setCoaches(allUsers.filter((u) => u.role === "coach"))
      })
      .catch((err) => setOptsError(err.message || "Error al cargar deportes/salas/coaches"))
      .finally(() => setLoadingOpts(false))
  }, [show])

  useEffect(() => {
    if (selectedAssignment) {
      setFormData({
        sport_id: selectedAssignment.sport_id ?? "",
        room_id:  selectedAssignment.room_id  ?? "",
        coach_id: selectedAssignment.coach_id ?? "",
      })
    } else {
      setFormData(initialForm)
    }
  }, [selectedAssignment, show])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    handleSave(formData)
  }

  return (
    <Modal show={show} onHide={handleClose} centered>

      <Modal.Header closeButton style={{ background: BG, borderBottom: BORDER }}>
        <Modal.Title style={{ color: "#fff", fontSize: "15px", fontWeight: 500 }}>
          <i
            className={`ti ${selectedAssignment ? "ti-pencil" : "ti-clipboard-list"}`}
            style={{ marginRight: "8px", color: ACCENT }}
          />
          {selectedAssignment ? "Editar Asignación" : "Nueva Asignación"}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSubmit}>
        <Modal.Body style={{ background: BG, padding: "20px" }}>

          {loadingOpts ? (
            <div style={{ textAlign: "center", padding: "24px" }}>
              <Spinner animation="border" size="sm" style={{ color: ACCENT }} />
              <p style={{ color: "#C2A294", fontSize: "13px", marginTop: "8px" }}>Cargando opciones...</p>
            </div>
          ) : optsError ? (
            <p style={{ color: "#f87171", fontSize: "13px" }}>{optsError}</p>
          ) : (
            <>
              {/* Deporte */}
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>Deporte</Form.Label>
                <Form.Select
                  name="sport_id"
                  value={formData.sport_id}
                  onChange={handleChange}
                  required
                  style={selectStyle}
                >
                  <option value="" style={{ background: "#2a1a12" }}>Seleccionar deporte...</option>
                  {sports.map((s) => (
                    <option key={s.id} value={s.id} style={{ background: "#2a1a12", color: "#fff" }}>
                      {s.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* Sala */}
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>Sala</Form.Label>
                <Form.Select
                  name="room_id"
                  value={formData.room_id}
                  onChange={handleChange}
                  required
                  style={selectStyle}
                >
                  <option value="" style={{ background: "#2a1a12" }}>Seleccionar sala...</option>
                  {rooms.map((r) => (
                    <option key={r.id} value={r.id} style={{ background: "#2a1a12", color: "#fff" }}>
                      {r.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* Coach */}
              <Form.Group className="mb-1">
                <Form.Label style={labelStyle}>Coach</Form.Label>
                <Form.Select
                  name="coach_id"
                  value={formData.coach_id}
                  onChange={handleChange}
                  required
                  style={selectStyle}
                >
                  <option value="" style={{ background: "#2a1a12" }}>Seleccionar coach...</option>
                  {coaches.length === 0 ? (
                    <option value="" disabled style={{ background: "#2a1a12", color: "#C2A294" }}>
                      No hay coaches registrados
                    </option>
                  ) : (
                    coaches.map((c) => (
                      <option key={c.id} value={c.id} style={{ background: "#2a1a12", color: "#fff" }}>
                        {c.full_name}
                      </option>
                    ))
                  )}
                </Form.Select>
              </Form.Group>
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
            disabled={loadingOpts || !!optsError}
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

export default SportRoomFormModal
