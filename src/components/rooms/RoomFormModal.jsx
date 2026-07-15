import { useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"

const initialForm = {
  name:        "",
  description: "",
  capacity:    "",
  location:    "",
  status:      true,
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

const labelStyle = { color: "#C2A294", fontSize: "12px", marginBottom: "4px" }

function RoomFormModal({ show, handleClose, handleSave, selectedRoom }) {
  const [formData, setFormData] = useState(initialForm)

  useEffect(() => {
    if (selectedRoom) {
      setFormData({
        name:        selectedRoom.name        || "",
        description: selectedRoom.description || "",
        capacity:    selectedRoom.capacity     ?? "",
        location:    selectedRoom.location     || "",
        status:      selectedRoom.status       ?? true,
      })
    } else {
      setFormData(initialForm)
    }
  }, [selectedRoom, show])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    handleSave({ ...formData, capacity: Number(formData.capacity) })
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton style={{ background: BG, borderBottom: BORDER }}>
        <Modal.Title style={{ color: "#fff", fontSize: "15px", fontWeight: 500 }}>
          {selectedRoom ? "Editar Sala" : "Nueva Sala"}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSubmit}>
        <Modal.Body style={{ background: BG, padding: "20px" }}>
          <Form.Group className="mb-3">
            <Form.Label style={labelStyle}>Nombre de la sala</Form.Label>
            <Form.Control
              type="text" name="name" value={formData.name}
              onChange={handleChange} placeholder="Ej: Sala A"
              required style={inputStyle}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={labelStyle}>Descripción</Form.Label>
            <Form.Control
              as="textarea" rows={2}
              name="description" value={formData.description}
              onChange={handleChange} placeholder="Ej: Sala techada con piso de madera"
              style={inputStyle}
            />
          </Form.Group>

          <div className="row g-3 mb-3">
            <div className="col-6">
              <Form.Group>
                <Form.Label style={labelStyle}>Capacidad</Form.Label>
                <Form.Control
                  type="number" name="capacity" value={formData.capacity}
                  onChange={handleChange} placeholder="Ej: 20"
                  min="1" required style={inputStyle}
                />
              </Form.Group>
            </div>
            <div className="col-6">
              <Form.Group>
                <Form.Label style={labelStyle}>Ubicación</Form.Label>
                <Form.Control
                  type="text" name="location" value={formData.location}
                  onChange={handleChange} placeholder="Ej: Piso 1"
                  style={inputStyle}
                />
              </Form.Group>
            </div>
          </div>

          <Form.Check
            type="switch"
            id="room-status-switch"
            name="status"
            label={<span style={{ color: "#C2A294", fontSize: "13px" }}>Sala activa</span>}
            checked={formData.status}
            onChange={handleChange}
          />
        </Modal.Body>

        <Modal.Footer style={{ background: BG, borderTop: BORDER, gap: "8px" }}>
          <Button variant="secondary" onClick={handleClose} size="sm" style={{ fontSize: "13px" }}>
            Cancelar
          </Button>
          <Button type="submit" size="sm" style={{ background: ACCENT, border: "none", fontSize: "13px", padding: "6px 18px" }}>
            Guardar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default RoomFormModal 
