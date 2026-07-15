import { useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"

const initialForm = {
  name:      "",
  objective: "",
  duration:  "",
  status:    true,
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

const labelStyle = {
  color:        "#C2A294",
  fontSize:     "12px",
  marginBottom: "4px",
}

function SportFormModal({ show, handleClose, handleSave, selectedSport }) {
  const [formData, setFormData] = useState(initialForm)

  useEffect(() => {
    if (selectedSport) {
      setFormData({
        name:      selectedSport.name      || "",
        objective: selectedSport.objective || "",
        duration:  selectedSport.duration  ?? "",
        status:    selectedSport.status    ?? true,
      })
    } else {
      setFormData(initialForm)
    }
  }, [selectedSport, show])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    
    handleSave({ ...formData, duration: Number(formData.duration) })
  }

  return (
    <Modal show={show} onHide={handleClose} centered>

      <Modal.Header closeButton style={{ background: BG, borderBottom: BORDER }}>
        <Modal.Title style={{ color: "#fff", fontSize: "15px", fontWeight: 500 }}>
          <i
            className={`ti ${selectedSport ? "ti-pencil" : "ti-whistle"}`}
            style={{ marginRight: "8px", color: ACCENT }}
          />
          {selectedSport ? "Editar Deporte" : "Nuevo Deporte"}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSubmit}>
        <Modal.Body style={{ background: BG, padding: "20px" }}>

          <Form.Group className="mb-3">
            <Form.Label style={labelStyle}>Nombre del deporte</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Natación"
              autoComplete="off"
              required
              style={inputStyle}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={labelStyle}>Objetivo</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="objective"
              value={formData.objective}
              onChange={handleChange}
              placeholder="Ej: Mejorar resistencia cardiovascular"
              style={inputStyle}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={labelStyle}>Duración (minutos)</Form.Label>
            <Form.Control
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Ej: 60"
              min="1"
              required
              style={inputStyle}
            />
          </Form.Group>

          <Form.Check
            type="switch"
            id="sport-status-switch"
            name="status"
            label={<span style={{ color: "#C2A294", fontSize: "13px" }}>Deporte activo</span>}
            checked={formData.status}
            onChange={handleChange}
          />

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

export default SportFormModal 
