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
        background: colors.bg,
        borderRight: `0.5px solid ${colors.border}`,
        display: "flex",
        flexDirection: "column",
        padding: "16px 0",
        alignSelf: "stretch",
      }}
    >
      {/* User info */}
      <div style={{ padding: "0 16px 16px", borderBottom: `0.5px solid ${colors.border}`, marginBottom: "8px" }}>
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: colors.primary,
            color: "#fff",
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
        <div style={{ fontSize: "13px", fontWeight: "500", color: colors.text }}>
          {user?.full_name || "Usuario"}
        </div>
        <div style={{ fontSize: "11px", color: colors.textMuted, marginTop: "2px" }}>
          {roleLabel}
        </div>
      </div>

      {/* Menu section label */}
      <span
        style={{
          fontSize: "10px",
          fontWeight: "500",
          color: colors.textMuted,
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          padding: "8px 16px 4px",
        }}
      >
        Principal
      </span>

      {/* Menu items  */}
      {menuItems.map(({ label, icon, path }) => (
        <NavLink
          key={path}
          to={path}
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            gap: "8px",
            margin: "2px 10px",
            padding: "8px 10px",
            borderRadius: "8px",
            fontSize: "13px",
            textDecoration: "none",
            color: isActive ? "#fff" : colors.textMuted,
            background: isActive ? colors.primary : "transparent",
            fontWeight: isActive ? "500" : "400",
            transition: "all 0.15s",
          })}
        >
          <i className={`ti ${icon}`} aria-hidden="true" style={{ fontSize: "16px" }} />
          {label}
        </NavLink>
      ))}

      {/* Divider */}
      <div style={{ height: "0.5px", background: colors.border, margin: "8px 0" }} />

      {/* Account section */}
      <span
        style={{
          fontSize: "10px",
          fontWeight: "500",
          color: colors.textMuted,
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
          margin: "2px 10px",
          padding: "8px 10px",
          borderRadius: "8px",
          fontSize: "13px",
          color: colors.secondary,
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          width: "calc(100% - 20px)",
        }}
      >
        <i className="ti ti-user-circle" aria-hidden="true" style={{ fontSize: "16px" }} />
        Mi perfil
      </button>
    </div>
  )
}

export default Sidebar
