import { NavLink } from "react-router-dom"

function getInitials(name = "") {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
}

function Sidebar({ user, colors, menuItems, roleLabel, onOpenProfile }) {
  const initials = user ? getInitials(user.full_name) : "?"

  return (
    <div
      style={{
        width: "210px",
        flexShrink: 0,
        background: "#fff",
        borderRight: "0.5px solid #e9ecef",
        display: "flex",
        flexDirection: "column",
        padding: "16px 0",
        height: "100%",
      }}
    >
      {/* User info */}
      <div style={{ padding: "0 16px 16px", borderBottom: "0.5px solid #e9ecef", marginBottom: "8px" }}>
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: colors.light,
            color: colors.textDark,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            fontWeight: "500",
            marginBottom: "8px",
          }}
        >
          {initials}
        </div>
        <div style={{ fontSize: "13px", fontWeight: "500", color: "#1a1a1a" }}>
          {user?.full_name || "Usuario"}
        </div>
        <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>
          {roleLabel}
        </div>
      </div>

      {/* Menu section label */}
      <span
        style={{
          fontSize: "10px",
          fontWeight: "500",
          color: "#9ca3af",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          padding: "8px 16px 4px",
        }}
      >
        Principal
      </span>

      {/* Menu items */}
      {menuItems.map(({ label, icon, path }) => (
        <NavLink
          key={path}
          to={path}
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            fontSize: "13px",
            textDecoration: "none",
            color: isActive ? colors.primary : "#6c757d",
            background: isActive ? colors.light : "transparent",
            fontWeight: isActive ? "500" : "400",
            borderLeft: isActive ? `3px solid ${colors.primary}` : "3px solid transparent",
            transition: "all 0.15s",
          })}
        >
          <i className={`ti ${icon}`} aria-hidden="true" style={{ fontSize: "16px" }} />
          {label}
        </NavLink>
      ))}

      {/* Divider */}
      <div style={{ height: "0.5px", background: "#e9ecef", margin: "8px 0" }} />

      {/* Account section */}
      <span
        style={{
          fontSize: "10px",
          fontWeight: "500",
          color: "#9ca3af",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          padding: "4px 16px",
        }}
      >
        Cuenta
      </span>

      <button
        onClick={onOpenProfile}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 16px",
          fontSize: "13px",
          color: colors.primary,
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          width: "100%",
          borderLeft: "3px solid transparent",
        }}
      >
        <i className="ti ti-user-circle" aria-hidden="true" style={{ fontSize: "16px" }} />
        Mi perfil
      </button>
    </div>
  )
}

export default Sidebar
