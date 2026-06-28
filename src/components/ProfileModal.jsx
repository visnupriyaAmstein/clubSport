import { Modal } from "react-bootstrap"

// Formats a date string (YYYY-MM-DD) to DD / MM / YYYY
function formatDate(dateStr) {
  if (!dateStr) return "—"
  const [year, month, day] = dateStr.split("-")
  if (!year || !month || !day) return "—"
  return `${day} / ${month} / ${year}`
}

// Returns user initials from full_name
function getInitials(name = "") {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
}

function ProfileModal({ show, onHide, user, colors }) {
  if (!user) return null

  const initials = getInitials(user.full_name)

  return (
    <Modal show={show} onHide={onHide} centered>

      {/* Hero with role color */}
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
          {user.full_name}
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

      {/* Profile data */}
      <Modal.Body style={{ padding: "16px" }}>
        {[
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
              borderBottom: "0.5px solid #e9ecef",
              fontSize: "13px",
            }}
          >
            <i
              className={`ti ${icon}`}
              aria-hidden="true"
              style={{ fontSize: "16px", color: colors.primary, flexShrink: 0 }}
            />
            <span style={{ color: "#9ca3af", width: "85px", flexShrink: 0, fontSize: "12px" }}>
              {label}
            </span>
            <span style={{ color: "#1a1a1a" }}>{value}</span>
          </div>
        ))}
      </Modal.Body>

      {/* Footer */}
      <Modal.Footer style={{ padding: "12px 16px", gap: "8px" }}>
        <button
          onClick={onHide}
          style={{
            padding: "6px 14px",
            borderRadius: "8px",
            border: "0.5px solid #dee2e6",
            background: "#f8f9fa",
            color: "#6c757d",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Cerrar
        </button>
        <button
          style={{
            padding: "6px 16px",
            borderRadius: "8px",
            border: "none",
            background: colors.primary,
            color: "#fff",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Editar perfil
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default ProfileModal

