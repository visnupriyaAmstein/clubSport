import { getUser } from "../../services/authService"
import { ROLES_CONFIG } from "../../config/roles"

const { colors } = ROLES_CONFIG.coach

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

function CoachDashboard() {
  const user    = getUser()
  const hour    = new Date().getHours()
  const greeting = hour < 12 ? "Buenos días" : hour < 19 ? "Buenas tardes" : "Buenas noches"
  const name    = user?.full_name?.split(" ")[0] ?? "Juan"

  const stats = [
    { value: "5",   label: "Clases semana", color: colors.primary },
    { value: "18",  label: "Alumnos",       color: colors.primary },
    { value: "90%", label: "Satisfacción",  color: colors.primary },
  ]

  const charts = [
    { pct: 90, value: "90%", sublabel: "satisfacción", color: colors.primary,   label: "Satisfacción",       sub: "Promedio del mes"      },
    { pct: 72, value: "13/18",sublabel: "asistentes",  color: colors.secondary, label: "Asistencia alumnos", sub: "13 de 18 alumnos"      },
    { pct: 60, value: "3/5",  sublabel: "clases",      color: "#2FA84F",        label: "Clases completadas", sub: "Esta semana"           },
  ]

  const horarios = [
    { name: "Natación", days: "Lun/Mié 09:00" },
    { name: "Yoga",     days: "Mar/Jue 18:00" },
    { name: "Boxeo",    days: "Vie 07:00"     },
  ]

  const alumnos = [
    { name: "María González", clase: "Natación" },
    { name: "Carlos López",   clase: "Yoga"     },
    { name: "Ana Martínez",   clase: "Boxeo"    },
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
        5 clases esta semana, 18 alumnos inscritos
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
            <i className="ti ti-clock" style={{ marginRight: 6 }} />
            HORARIOS
          </p>
          {horarios.map((h) => (
            <div key={h.name} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderTop: `0.5px solid ${colors.border}`, fontSize: "13px" }}>
              <span style={{ color: "#fff" }}>{h.name}</span>
              <span style={{ color: colors.textMuted }}>{h.days}</span>
            </div>
          ))}
        </div>

        <div style={card}>
          <p style={{ margin: "0 0 10px", fontSize: "11px", color: colors.textMuted, fontWeight: 500, letterSpacing: "0.05em" }}>
            <i className="ti ti-users" style={{ marginRight: 6 }} />
            ALUMNOS DESTACADOS
          </p>
          {alumnos.map((a) => (
            <div key={a.name} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderTop: `0.5px solid ${colors.border}`, fontSize: "13px" }}>
              <span style={{ color: "#fff" }}>{a.name}</span>
              <span style={{ color: colors.textMuted }}>{a.clase}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default CoachDashboard