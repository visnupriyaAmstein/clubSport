import { Link } from "react-router-dom"

const STATS = [
  ["1.2k", "Socios activos"],
  ["48",   "Coaches"],
  ["120+", "Clases / mes"],
]

const FEATURES = [
  ["🏊", "Natación",   "Piscina temperada con horarios para todos los niveles"],
  ["🥊", "Boxeo",       "Clases grupales e individuales con coaches certificados"],
  ["🧘", "Yoga",        "Sesiones de bienestar y flexibilidad"],
  ["🚴", "Spinning",    "Cardio en sala equipada con bicicletas estáticas"],
]

function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f5" }}>

      {/* Header simple */}
      <header
        style={{
          background: "#0f1c14",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "38px", height: "38px", background: "#3cd16f",
              borderRadius: "10px", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "20px",
            }}
          >
            ⚽
          </div>
          <span style={{ color: "#f0f5f1", fontWeight: 500, fontSize: "18px" }}>SportClub</span>
        </div>

        <Link
          to="/login"
          className="btn"
          style={{
            background: "#3cd16f", color: "#0a110c", borderRadius: "8px",
            padding: "8px 20px", fontSize: "14px", fontWeight: 500, textDecoration: "none",
          }}
        >
          Iniciar sesión
        </Link>
      </header>

      {/* Hero de bienvenida */}
      <section style={{ textAlign: "center", padding: "64px 20px 48px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 600, color: "#1a1a1a", marginBottom: "12px" }}>
          Bienvenido a SportClub
        </h1>
        <p style={{ fontSize: "16px", color: "#6c757d", maxWidth: "480px", margin: "0 auto 28px" }}>
          Tu club deportivo de confianza. Reserva clases, sigue tu progreso y entrena
          con los mejores coaches, todo desde un mismo lugar.
        </p>
        <Link
          to="/login"
          className="btn"
          style={{
            background: "#3cd16f", color: "#0a110c", borderRadius: "8px",
            padding: "10px 28px", fontSize: "15px", fontWeight: 500, textDecoration: "none",
            display: "inline-block",
          }}
        >
          Ingresar →
        </Link>

        {/* Stats */}
        <div style={{ display: "flex", justifyContent: "center", gap: "40px", marginTop: "48px", flexWrap: "wrap" }}>
          {STATS.map(([val, lbl]) => (
            <div key={lbl}>
              <div style={{ fontSize: "26px", fontWeight: 600, color: "#0f1c14" }}>{val}</div>
              <div style={{ fontSize: "13px", color: "#8a8f98" }}>{lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Deportes / info del gimnasio */}
      <section style={{ maxWidth: "900px", margin: "0 auto", padding: "0 20px 64px" }}>
        <h2 style={{ textAlign: "center", fontSize: "20px", fontWeight: 500, color: "#1a1a1a", marginBottom: "28px" }}>
          Lo que encuentras en el club
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
          {FEATURES.map(([icon, title, desc]) => (
            <div
              key={title}
              style={{
                background: "#fff", borderRadius: "12px", padding: "20px",
                border: "0.5px solid #e9ecef", textAlign: "center",
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>{icon}</div>
              <div style={{ fontSize: "14px", fontWeight: 500, color: "#1a1a1a", marginBottom: "4px" }}>{title}</div>
              <div style={{ fontSize: "12px", color: "#8a8f98" }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer simple */}
      <footer style={{ textAlign: "center", padding: "20px", fontSize: "12px", color: "#adb5bd" }}>
        © 2026 SportClub — Sistema de gestión deportiva
      </footer>
    </div>
  )
}

export default Home
