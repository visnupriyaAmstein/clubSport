import { useState } from "react"
import { Modal, Form, Spinner } from "react-bootstrap"
import { updateMyProfile } from "../services/userService"

function formatDate(dateStr) {
  if (!dateStr) return "—"
  const [year, month, day] = dateStr.split("-")
  if (!year || !month || !day) return "—"
  return `${day} / ${month} / ${year}`
}

function getInitials(name = "") {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
}

function ProfileModal({ show, onHide, user, colors, onUserUpdated }) {
  const [editing, setEditing]   = useState(false)
  const [saving, setSaving]     = useState(false)
  const [formData, setFormData] = useState({})
  const [error, setError]       = useState("")

  if (!user) return null

  const initials = getInitials(user.full_name)
  const handleStartEdit = () => {
    setFormData({
      full_name:  user.full_name  || "",
      email:      user.email      || "",
      birth_date: user.birth_date || "",
    })
    setError("")
    setEditing(true)
  }

  const handleCancel = () => {
    setEditing(false)
    setError("")
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    if (!formData.full_name.trim() || !formData.email.trim()) {
      setError("El nombre y el correo son obligatorios.")
      return
    }
    try {
      setSaving(true)
      setError("")
      const updated = await updateMyProfile(formData)
      const stored     = JSON.parse(localStorage.getItem("user") || "{}")
      const newUser    = { ...stored, ...(updated.data ?? formData) }
      localStorage.setItem("user", JSON.stringify(newUser))

      onUserUpdated?.(newUser)

      setEditing(false)
      onHide()
    } catch (err) {
      setError(err.message || "Error al guardar los cambios.")
    } finally {
      setSaving(false)
    }
  }

  const inputStyle = {
    background: "rgba(255,255,255,0.07)",
    border: "0.5px solid rgba(255,255,255,0.15)",
    color: "#fff",
    fontSize: "13px",
    borderRadius: "8px",
  }

  const labelStyle = {
    color: colors.textMuted ?? "#aaa",
    fontSize: "11px",
    marginBottom: "4px",
  }

  return (
    <Modal show={show} onHide={onHide} centered>

      <div
        style={{
          background: colors.primary,
          padding: "28px 20px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            border: "2px solid rgba(255,255,255,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
            fontWeight: "500",
            color: "#fff",
          }}
        >
          {initials}
        </div>
        <div style={{ fontSize: "17px", fontWeight: "500", color: "#fff" }}>
          {editing ? formData.full_name || user.full_name : user.full_name}
        </div>
        <div
          style={{
            fontSize: "11px",
            padding: "3px 12px",
            borderRadius: "99px",
            background: "rgba(255,255,255,0.2)",
            color: "#fff",
          }}
        >
          {user.role}
        </div>
      </div>

      <Modal.Body
        style={{
          padding: "16px",
          background: colors.bg ?? "#1a1a1a",
        }}
      >
        {editing ? (
          
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

            <Form.Group>
              <Form.Label style={labelStyle}>Nombre completo</Form.Label>
              <Form.Control
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                style={inputStyle}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label style={labelStyle}>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={inputStyle}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label style={labelStyle}>Fecha de nacimiento</Form.Label>
              <Form.Control
                type="date"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleChange}
                style={inputStyle}
              />
            </Form.Group>

            {error && (
              <p style={{ color: "#f87171", fontSize: "12px", margin: 0 }}>{error}</p>
            )}
          </div>
        ) : (
          [
            { icon: "ti-mail",     label: "Correo",     value: user.email },
            { icon: "ti-calendar", label: "Nacimiento", value: formatDate(user.birth_date) },
            { icon: "ti-id-badge", label: "ID",         value: `#${user.id}` },
          ].map(({ icon, label, value }) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "9px 0",
                borderBottom: `0.5px solid ${colors.border ?? "rgba(255,255,255,0.08)"}`,
                fontSize: "13px",
              }}
            >
              <i
                className={`ti ${icon}`}
                aria-hidden="true"
                style={{ fontSize: "16px", color: colors.primary, flexShrink: 0 }}
              />
              <span style={{ color: colors.textMuted, width: "85px", flexShrink: 0, fontSize: "12px" }}>
                {label}
              </span>
              <span style={{ color: colors.text ?? "#fff" }}>{value}</span>
            </div>
          ))
        )}
      </Modal.Body>

      {/* Footer*/}
      <Modal.Footer
        style={{
          padding: "12px 16px",
          gap: "8px",
          background: colors.bg ?? "#1a1a1a",
          borderTop: `0.5px solid ${colors.border ?? "rgba(255,255,255,0.08)"}`,
        }}
      >
        {editing ? (
          <>
            <button
              onClick={handleCancel}
              disabled={saving}
              style={{
                padding: "6px 14px",
                borderRadius: "8px",
                border: "0.5px solid rgba(255,255,255,0.15)",
                background: "transparent",
                color: colors.textMuted,
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                padding: "6px 18px",
                borderRadius: "8px",
                border: "none",
                background: colors.primary,
                color: "#fff",
                fontSize: "13px",
                cursor: saving ? "wait" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              {saving ? <Spinner animation="border" size="sm" /> : <i className="ti ti-check" />}
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onHide}
              style={{
                padding: "6px 14px",
                borderRadius: "8px",
                border: "0.5px solid rgba(255,255,255,0.15)",
                background: "transparent",
                color: colors.textMuted,
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              Cerrar
            </button>
            <button
              onClick={handleStartEdit}
              style={{
                padding: "6px 16px",
                borderRadius: "8px",
                border: "none",
                background: colors.primary,
                color: "#fff",
                fontSize: "13px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <i className="ti ti-pencil" />
              Editar perfil
            </button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default ProfileModal
