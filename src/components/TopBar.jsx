import LogoutButton from "./LogoutButton"

function getInitials(name = "") {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
}

function TopBar({ user, colors, onOpenProfile }) {
  const initials = user ? getInitials(user.full_name) : "?"

  return (
    <div
      style={{
        background: colors.primary,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        height: "52px",
        flexShrink: 0,
      }}
    >
      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            width: "32px",
            height: "32px",
            background: colors.secondary,
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
          }}
        >
          ⚽
        </div>
        <span style={{ color: colors.text, fontWeight: "500", fontSize: "15px" }}>
          SportClub
        </span>
      </div>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button
          onClick={onOpenProfile}
          aria-label="Ver perfil"
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: colors.secondary,
            color: colors.text,
            border: "none",
            fontSize: "12px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          {initials}
        </button>
        <LogoutButton textColor={colors.text} bgColor="rgba(255,255,255,0.15)" />
      </div>
    </div>
  )
}

export default TopBar
