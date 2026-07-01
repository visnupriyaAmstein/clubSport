import { getUser } from "../../services/authService"
import { ROLES_CONFIG } from "../../config/roles"

const { colors } = ROLES_CONFIG.admin

function AdminDashboard() {
  const user = getUser()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Buenos días" : hour < 19 ? "Buenas tardes" : "Buenas noches"

  const stats = [
    { value: "1.248", label: "Usuarios activos",  trend: "+6% este mes", up: true },
    { value: "32",    label: "Coaches activos",    trend: "4 nuevos",     up: true },
    { value: "186",   label: "Reservas hoy",       trend: "87% ocupación",up: true },
  ]

  const lowAttendance = [
    { name: "Boxeo",    day: "Mar 07:00", pct: "42%" },
    { name: "Pilates",  day: "Vie 06:00", pct: "38%" },
    { name: "Spinning", day: "Sáb 19:00", pct: "55%" },
  ]

  const pending = [
    { icon: "ti-user-x",       text: "2 coaches sin clases asignadas" },
    { icon: "ti-message-report", text: "1 queja pendiente de resolución" },
    { icon: "ti-alert-circle",  text: "3 clases sin confirmar esta semana" },
  ]

  return (
    <div style={{ color: colors.text }}>

      {/* Greeting */}
      <p style={{ margin: "0 0 2px", fontSize: "17px", fontWeight: 500, color: "#fff" }}>
        {greeting}, {user?.full_name?.split(" ")[0] ?? "Admin"} 👋
      </p>
      <p style={{ margin: "0 0 20px", fontSize: "13px", color: colors.textMuted }}>
        Resumen general de la plataforma SportClub
      </p>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px", marginBottom: "16px" }}>
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              background: colors.surface,
              border: `0.5px solid ${colors.border}`,
              borderRadius: "12px",
              padding: "14px",
            }}
          >
            <p style={{ margin: 0, fontSize: "22px", fontWeight: 500, color: colors.primary }}>{s.value}</p>
            <p style={{ margin: "2px 0 6px", fontSize: "12px", color: colors.textMuted }}>{s.label}</p>
            <p style={{ margin: 0, fontSize: "11px", color: s.up ? "#4ADE80" : "#f87171" }}>
              <i className={`ti ${s.up ? "ti-trending-up" : "ti-trending-down"}`} style={{ marginRight: 4 }} />
              {s.trend}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom panels */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>

        {/* Low attendance */}
        <div
          style={{
            background: colors.surface,
            border: `0.5px solid ${colors.border}`,
            borderRadius: "12px",
            padding: "14px 16px",
          }}
        >
          <p style={{ margin: "0 0 10px", fontSize: "11px", color: colors.textMuted, fontWeight: 500, letterSpacing: "0.04em" }}>
            <i className="ti ti-chart-bar" style={{ marginRight: 6 }} />
            CLASES CON BAJA ASISTENCIA
          </p>
          {lowAttendance.map((c) => (
            <div
              key={c.name}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "7px 0",
                borderTop: `0.5px solid ${colors.border}`,
                fontSize: "13px",
              }}
            >
              <div>
                <span style={{ color: "#fff" }}>{c.name}</span>
                <span style={{ color: colors.textMuted, marginLeft: 8, fontSize: "11px" }}>{c.day}</span>
              </div>
              <span style={{ color: "#f87171", fontWeight: 500 }}>{c.pct}</span>
            </div>
          ))}
        </div>

        {/* Pending alerts */}
        <div
          style={{
            background: colors.surface,
            border: `0.5px solid ${colors.border}`,
            borderRadius: "12px",
            padding: "14px 16px",
          }}
        >
          <p style={{ margin: "0 0 10px", fontSize: "11px", color: colors.textMuted, fontWeight: 500, letterSpacing: "0.04em" }}>
            <i className="ti ti-alert-triangle" style={{ marginRight: 6 }} />
            PENDIENTES ({pending.length})
          </p>
          {pending.map((p) => (
            <div
              key={p.text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "7px 0",
                borderTop: `0.5px solid ${colors.border}`,
                fontSize: "13px",
              }}
            >
              <i className={`ti ${p.icon}`} style={{ color: colors.primary, fontSize: "15px", flexShrink: 0 }} />
              <span style={{ color: "#fff" }}>{p.text}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default AdminDashboard