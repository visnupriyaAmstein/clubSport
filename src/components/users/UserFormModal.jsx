// src/components/users/UserFormModal.jsx
// Reusable modal for creating and editing users (Admin role)
// Used by UsersPage — same component handles both create and edit

import { useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"

const initialForm = {
  full_name: "",
  email: "",
  role: "user",
  password: "",
}

// Dark style helpers — keeps JSX clean
const inputStyle = {
  background: "rgba(255,255,255,0.06)",
  border: "0.5px solid rgba(255,255,255,0.12)",
  color: "#fff",
  fontSize: "13px",
}

const labelStyle = {
  color: "#C2A294",
  fontSize: "12px",
  marginBottom: "4px",
}

function UserFormModal({ show, handleClose, handleSave, selectedUser }) {
  const [formData, setFormData] = useState(initialForm)

  // Pre-fill form when editing; reset when creating
  useEffect(() => {
    if (selectedUser) {
      setFormData({
        full_name: selectedUser.full_name || "",
        email:     selectedUser.email     || "",
        role:      selectedUser.role      || "user",
        password:  "",
      })
    } else {
      setFormData(initialForm)
    }
  }, [selectedUser, show])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    handleSave(formData)
  }

  return (
    <Modal show={show} onHide={handleClose} centered>

      {/* Header */}
      <Modal.Header
        closeButton
        style={{
          background: "#241712",
          borderBottom: "0.5px solid rgba(203,108,50,0.25)",
        }}
      >
        <Modal.Title style={{ color: "#fff", fontSize: "15px", fontWeight: 500 }}>
          <i
            className={`ti ${selectedUser ? "ti-pencil" : "ti-user-plus"}`}
            style={{ marginRight: "8px", color: "#CB6C32" }}
          />
          {selectedUser ? "Editar Usuario" : "Nuevo Usuario"}
        </Modal.Title>
      </Modal.Header>

      {/* Form */}
      <Form onSubmit={onSubmit}>
        <Modal.Body style={{ background: "#241712", padding: "20px" }}>

          <Form.Group className="mb-3">
            <Form.Label style={labelStyle}>Nombre Completo</Form.Label>
            <Form.Control
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Ej: María González"
              required
              style={inputStyle}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={labelStyle}>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              required
              style={inputStyle}
            />
          </Form.Group>

          {/* Password only shown when creating — not when editing */}
          {!selectedUser && (
            <Form.Group className="mb-3">
              <Form.Label style={labelStyle}>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mínimo 6 caracteres"
                required
                style={inputStyle}
              />
            </Form.Group>
          )}

          <Form.Group className="mb-1">
            <Form.Label style={labelStyle}>Rol</Form.Label>
            <Form.Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="user">Usuario</option>
              <option value="coach">Coach</option>
              <option value="admin">Administrador</option>
            </Form.Select>
          </Form.Group>

        </Modal.Body>

        <Modal.Footer
          style={{
            background: "#241712",
            borderTop: "0.5px solid rgba(203,108,50,0.25)",
            gap: "8px",
          }}
        >
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
            style={{
              background: "#CB6C32",
              border: "none",
              fontSize: "13px",
              padding: "6px 18px",
            }}
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
