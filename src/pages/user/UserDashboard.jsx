// src/pages/user/UserDashboard.jsx
// Dark teal dashboard — matches screenshot + circular SVG charts

import { getUser } from "../../services/authService"
import { ROLES_CONFIG } from "../../config/roles"

const { colors } = ROLES_CONFIG.user

// ── Circular progress chart ───────────────────────────────────────────────────
// r=22 → circumference = 2π×22 ≈ 138.2
const CIRC = 138.2

function DonutChart({ pct, value, sublabel, color, track = "rgba(255,255,255,0.1)" }) {
  const filled = CIRC * (pct / 100)
  return (
    <div style={{ textAlign: "center" }}>
      <svg width="72" height="72" viewBox="0 0 56 56" style={{ display: "block", margin: "0 auto" }}>
        {/* Track */}
        <circle cx="28" cy="28" r="22" fill="none" stroke={track} strokeWidth="6" />
        {/* Progress */}
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

// ── Component ─────────────────────────────────────────────────────────────────
function UserDashboard() {
  const user    = getUser()
  const hour    = new Date().getHours()
  const greeting = hour < 12 ? "Buenos días" : hour < 19 ? "Buenas tardes" : "Buenas noches"
  const name    = user?.full_name?.split(" ")[0] ?? "María"

  const stats = [
    { value: "3",   label: "Reservas",    color: colors.secondary },
    { value: "12",  label: "Disponibles", color: colors.secondary },
    { value: "78%", label: "Asistencia",  color: colors.secondary },
  ]

  const charts = [
    { pct: 78, value: "78%", sublabel: "asistencia", color: colors.primary,   label: "Asistencia mensual",  sub: "7 de 9 clases" },
    { pct: 33, value: "3/9", sublabel: "reservas",   color: colors.secondary, label: "Meta del mes",         sub: "3 de 9 clases" },
    { pct: 25, value: "2/8", sublabel: "deportes",   color: "#0B8C8F",        label: "Deportes de interés",  sub: "Natación · Yoga" },
  ]

  const reservas = [
    { name: "Natación", day: "Lun 09:00", status: "Confirmada" },
    { name: "Yoga",     day: "Mié 18:00", status: "Confirmada" },
    { name: "Fútbol",   day: "Vie 17:00", status: "Pendiente"  },
  ]

  const disponibles = [
    { name: "Boxeo",       day: "Mar 07:00" },
    { name: "Ciclismo",    day: "Jue 08:00" },
    { name: "Musculación", day: "Sáb 10:00" },
  ]

  const card = {
    background: colors.surface,
    border: `0.5px solid ${colors.border}`,
    borderRadius: "12px",
    padding: "14px 16px",
  }

  return (
    <div style={{ color: colors.text }}>

      {/* Greeting */}
      <p style={{ margin: "0 0 2px", fontSize: "18px", fontWeight: 500, color: "#fff" }}>
        {greeting}, {name} 👋
      </p>
      <p style={{ margin: "0 0 20px", fontSize: "13px", color: colors.textMuted }}>
        Tienes 3 clases reservadas y 12 disponibles
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

        {/* My reservations */}
        <div style={card}>
          <p style={{ margin: "0 0 10px", fontSize: "11px", color: colors.textMuted, fontWeight: 500, letterSpacing: "0.05em" }}>
            <i className="ti ti-calendar" style={{ marginRight: 6 }} />
            MIS RESERVAS
          </p>
          {reservas.map((r) => (
            <div key={r.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderTop: `0.5px solid ${colors.border}`, fontSize: "13px" }}>
              <span style={{ color: "#fff" }}>{r.name} — {r.day}</span>
              <span style={{
                fontSize: "11px", padding: "2px 9px", borderRadius: "6px",
                background: r.status === "Confirmada" ? "rgba(19,134,144,0.2)" : "rgba(203,108,50,0.2)",
                color: r.status === "Confirmada" ? colors.secondary : "#E58A52",
              }}>
                {r.status}
              </span>
            </div>
          ))}
        </div>

        {/* Available */}
        <div style={card}>
          <p style={{ margin: "0 0 10px", fontSize: "11px", color: colors.textMuted, fontWeight: 500, letterSpacing: "0.05em" }}>
            <i className="ti ti-list-search" style={{ marginRight: 6 }} />
            CLASES DISPONIBLES
          </p>
          {disponibles.map((d) => (
            <div key={d.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderTop: `0.5px solid ${colors.border}`, fontSize: "13px" }}>
              <span style={{ color: "#fff" }}>{d.name} — {d.day}</span>
              <span style={{ color: colors.secondary, fontSize: "12px", cursor: "pointer" }}>Reservar</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default UserDashboard
