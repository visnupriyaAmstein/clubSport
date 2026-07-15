// src/pages/admin/AdminDashboard.jsx
// Dark terracota dashboard — matches screenshot + circular SVG charts

import { getUser } from "../../services/authService"
import { ROLES_CONFIG } from "../../config/roles"

const { colors } = ROLES_CONFIG.admin

const CIRC = 138.2

function DonutChart({ pct, value, sublabel, color, track = "rgba(255,255,255,0.1)" }) {
  const filled = CIRC * (pct / 100)
  return (
    <div style={{ textAlign: "center" }}>
      <svg width="72" height="72" viewBox="0 0 56 56" style={{ display: "block", margin: "0 auto" }}>
        <circle cx="28" cy="28" r="22" fill="none" stroke={track} strokeWidth="6" />
        <circle
          cx="28" cy="28" r="22" fill="none"
          stroke={color} strokeWidth="6"
          strokeDasharray={`${filled} ${CIRC - filled}`}
          strokeLinecap="round"
          transform="rotate(-90 28 28)"
        />
        <text x="28" y="24" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">{value}</text>
        <text x="28" y="34" textAnchor="middle" fontSize="7" fill={colors.textMuted}>{sublabel}</text>
      </svg>
    </div>
  )
}

function AdminDashboard() {
  const user    = getUser()
  const hour    = new Date().getHours()
  const greeting = hour < 12 ? "Buenos días" : hour < 19 ? "Buenas tardes" : "Buenas noches"
  const name    = user?.full_name?.split(" ")[0] ?? "Admin"

  const stats = [
    { value: "1.248", label: "Usuarios activos", color: colors.primary },
    { value: "32",    label: "Coaches",           color: colors.primary },
    { value: "186",   label: "Reservas hoy",      color: colors.primary },
  ]

  const charts = [
    { pct: 87, value: "87%", sublabel: "ocupación",  color: colors.primary,   label: "Ocupación general",    sub: "Todas las clases"     },
    { pct: 94, value: "94%", sublabel: "activos",    color: colors.secondary, label: "Usuarios activos",     sub: "Del total registrado" },
    { pct: 40, value: "3",   sublabel: "alertas",    color: "#f87171",        label: "Alertas pendientes",   sub: "Requieren atención"   },
  ]

  const lowAttendance = [
    { name: "Boxeo",    day: "Mar 07:00", pct: "42%" },
    { name: "Pilates",  day: "Vie 06:00", pct: "38%" },
    { name: "Spinning", day: "Sáb 19:00", pct: "55%" },
  ]

  const pending = [
    { icon: "ti-user-x",        text: "2 coaches sin clases asignadas" },
    { icon: "ti-message-report", text: "1 queja pendiente de resolución" },
    { icon: "ti-alert-circle",   text: "3 clases sin confirmar" },
  ]

  const card = {
    background: colors.surface,
    border: `0.5px solid ${colors.border}`,
    borderRadius: "12px",
    padding: "14px 16px",
  }

  return (
    <div style={{ color: colors.text }}>

      <p style={{ margin: "0 0 2px", fontSize: "18px", fontWeight: 500, color: "#fff" }}>
        {greeting}, {name} 👋
      </p>
      <p style={{ margin: "0 0 20px", fontSize: "13px", color: colors.textMuted }}>
        1.248 usuarios activos, 3 alertas pendientes
      </p>

      {/* Quick stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px", marginBottom: "16px" }}>
        {stats.map((s) => (
          <div key={s.label} style={card}>
            <p style={{ margin: 0, fontSize: "24px", fontWeight: 600, color: s.color }}>{s.value}</p>
            <p style={{ margin: "2px 0 0", fontSize: "12px", color: colors.textMuted }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Circular charts */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px", marginBottom: "16px" }}>
        {charts.map((c) => (
          <div key={c.label} style={{ ...card, textAlign: "center", padding: "16px 10px" }}>
            <DonutChart pct={c.pct} value={c.value} sublabel={c.sublabel} color={c.color} />
            <p style={{ margin: "10px 0 0", fontSize: "12px", fontWeight: 500, color: "#fff" }}>{c.label}</p>
            <p style={{ margin: "2px 0 0", fontSize: "11px", color: colors.textMuted }}>{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Lists */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>

        <div style={card}>
          <p style={{ margin: "0 0 10px", fontSize: "11px", color: colors.textMuted, fontWeight: 500, letterSpacing: "0.05em" }}>
            <i className="ti ti-chart-bar" style={{ marginRight: 6 }} />
            CLASES CON BAJA ASISTENCIA
          </p>
          {lowAttendance.map((c) => (
            <div key={c.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderTop: `0.5px solid ${colors.border}`, fontSize: "13px" }}>
              <div>
                <span style={{ color: "#fff" }}>{c.name}</span>
                <span style={{ color: colors.textMuted, marginLeft: 8, fontSize: "11px" }}>{c.day}</span>
              </div>
              <span style={{ color: "#f87171", fontWeight: 500 }}>{c.pct}</span>
            </div>
          ))}
        </div>

        <div style={card}>
          <p style={{ margin: "0 0 10px", fontSize: "11px", color: colors.textMuted, fontWeight: 500, letterSpacing: "0.05em" }}>
            <i className="ti ti-alert-triangle" style={{ marginRight: 6 }} />
            PENDIENTES ({pending.length})
          </p>
          {pending.map((p) => (
            <div key={p.text} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "7px 0", borderTop: `0.5px solid ${colors.border}`, fontSize: "13px" }}>
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
