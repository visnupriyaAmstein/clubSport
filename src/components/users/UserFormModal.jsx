// src/components/users/UserFormModal.jsx
// Fixes: email never pre-filled, birth_date added, select options dark, all SweetAlerts terracota

import { useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"

const initialForm = {
  full_name:  "",
  email:      "",
  role:       "user",
  password:   "",
  birth_date: "",
}

const BG   = "#241712"
const BORDER = "0.5px solid rgba(203,108,50,0.25)"
const ACCENT = "#CB6C32"

const inputStyle = {
  background:  "rgba(255,255,255,0.06)",
  border:      "0.5px solid rgba(255,255,255,0.12)",
  color:       "#fff",
  fontSize:    "13px",
  borderRadius:"8px",
}

const labelStyle = {
  color:      "#C2A294",
  fontSize:   "12px",
  marginBottom: "4px",
}

// Forces option elements to be visible in dark selects
const selectStyle = {
  ...inputStyle,
  colorScheme: "dark",   // ← key fix for Firefox / Chrome dark mode
}

function UserFormModal({ show, handleClose, handleSave, selectedUser }) {
  const [formData, setFormData] = useState(initialForm)

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        full_name:  selectedUser.full_name  || "",
        email:      selectedUser.email      || "",
        role:       selectedUser.role       || "user",
        password:   "",                             // never carry old password
        birth_date: selectedUser.birth_date || "",
      })
    } else {
      setFormData(initialForm)                      // always blank for create
    }
  }, [selectedUser, show])

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

      {/* Header */}
      <Modal.Header closeButton style={{ background: BG, borderBottom: BORDER }}>
        <Modal.Title style={{ color: "#fff", fontSize: "15px", fontWeight: 500 }}>
          <i
            className={`ti ${selectedUser ? "ti-pencil" : "ti-user-plus"}`}
            style={{ marginRight: "8px", color: ACCENT }}
          />
          {selectedUser ? "Editar Usuario" : "Nuevo Usuario"}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSubmit}>
        <Modal.Body style={{ background: BG, padding: "20px" }}>

          {/* Full name */}
          <Form.Group className="mb-3">
            <Form.Label style={labelStyle}>Nombre Completo</Form.Label>
            <Form.Control
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Ej: María González"
              autoComplete="off"
              required
              style={inputStyle}
            />
          </Form.Group>

          {/* Email — autoComplete="new-password" prevents browser from filling admin's email */}
          <Form.Group className="mb-3">
            <Form.Label style={labelStyle}>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              autoComplete="new-password"
              required
              style={inputStyle}
            />
          </Form.Group>

          {/* Birth date */}
          <Form.Group className="mb-3">
            <Form.Label style={labelStyle}>Fecha de nacimiento</Form.Label>
            <Form.Control
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              style={inputStyle}
            />
          </Form.Group>

          {/* Password — only on create */}
          {!selectedUser && (
            <Form.Group className="mb-3">
              <Form.Label style={labelStyle}>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mínimo 6 caracteres"
                autoComplete="new-password"
                required
                style={inputStyle}
              />
            </Form.Group>
          )}

          {/* Role select — colorScheme dark keeps options readable */}
          <Form.Group className="mb-1">
            <Form.Label style={labelStyle}>Rol</Form.Label>
            <Form.Select name="role" value={formData.role} onChange={handleChange} style={selectStyle}>
              <option value="user"  style={{ background: "#2a1a12", color: "#fff" }}>Usuario</option>
              <option value="coach" style={{ background: "#2a1a12", color: "#fff" }}>Coach</option>
              <option value="admin" style={{ background: "#2a1a12", color: "#fff" }}>Administrador</option>
            </Form.Select>
          </Form.Group>

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

export default UserFormModal
