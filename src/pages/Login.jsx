import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("user")
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const roleRoutes = {
    user: "/user/dashboard",
    coach: "/coach/dashboard",
    admin: "/admin/dashboard",
  }

  const handleLogin = (e) => {
    e.preventDefault()
    navigate(roleRoutes[role])
  }

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ background: "#f0f2f5" }}
    >
      <div
        className="card shadow-sm border-0 overflow-hidden"
        style={{ width: "100%", maxWidth: "880px", borderRadius: "16px" }}
      >
        <div className="row g-0">

          {/* Panel izquierdo */}
          <div
            className="col-md-5 d-flex flex-column justify-content-between p-4"
            style={{ background: "#0f1c14", minHeight: "520px" }}
          >
            <div>
              {/* Logo */}
              <div className="d-flex align-items-center gap-2 mb-4">
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "42px",
                    height: "42px",
                    background: "#3cd16f",
                    borderRadius: "10px",
                    fontSize: "22px",
                  }}
                >
                  ⚽
                </div>
                <span
                  className="fw-medium fs-5"
                  style={{ color: "#f0f5f1", letterSpacing: "0.5px" }}
                >
                  SportClub
                </span>
              </div>

              <p style={{ color: "#5a9e6f", fontSize: "13px" }}>
                Sistema de gestión deportiva
              </p>
            </div>

            {/* Stats */}
            <div className="d-flex gap-4">
              <div>
                <div
                  className="fw-medium"
                  style={{ color: "#3cd16f", fontSize: "22px" }}
                >
                  1.2k
                </div>
                <div style={{ color: "#5a9e6f", fontSize: "11px" }}>
                  Socios activos
                </div>
              </div>
              <div>
                <div
                  className="fw-medium"
                  style={{ color: "#3cd16f", fontSize: "22px" }}
                >
                  48
                </div>
                <div style={{ color: "#5a9e6f", fontSize: "11px" }}>
                  Coaches
                </div>
              </div>
              <div>
                <div
                  className="fw-medium"
                  style={{ color: "#3cd16f", fontSize: "22px" }}
                >
                  120+
                </div>
                <div style={{ color: "#5a9e6f", fontSize: "11px" }}>
                  Clases / mes
                </div>
              </div>
            </div>
          </div>

          {/* Panel derecho — formulario */}
          <div className="col-md-7 p-4 p-md-5 bg-white d-flex flex-column justify-content-center">
            <h5 className="fw-medium mb-1" style={{ color: "#1a1a1a" }}>
              Ingresa a tu cuenta
            </h5>
            <p className="text-muted mb-4" style={{ fontSize: "13px" }}>
              Elige tu perfil y accede al sistema
            </p>

            {/* Selector de rol */}
            <div className="d-flex gap-2 mb-4">
              {[
                { key: "user", label: "Usuario", icon: "👤" },
                { key: "coach", label: "Coach", icon: "🏋️" },
                { key: "admin", label: "Admin", icon: "🛡️" },
              ].map(({ key, label, icon }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setRole(key)}
                  className="btn flex-fill"
                  style={{
                    fontSize: "13px",
                    border: role === key
                      ? "1.5px solid #3cd16f"
                      : "1px solid #dee2e6",
                    color: role === key ? "#3cd16f" : "#6c757d",
                    background: role === key
                      ? "rgba(60,209,111,0.07)"
                      : "transparent",
                    borderRadius: "8px",
                    padding: "6px 4px",
                    transition: "all 0.15s",
                  }}
                >
                  {icon} {label}
                </button>
              ))}
            </div>

            <form onSubmit={handleLogin}>
              {/* Email */}
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="form-label"
                  style={{ fontSize: "12px", fontWeight: "500", color: "#6c757d", letterSpacing: "0.3px" }}
                >
                  CORREO ELECTRÓNICO
                </label>
                <div className="input-group">
                  <span className="input-group-text" style={{ background: "#f8f9fa", border: "1px solid #dee2e6" }}>
                    ✉️
                  </span>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ fontSize: "14px" }}
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="form-label"
                  style={{ fontSize: "12px", fontWeight: "500", color: "#6c757d", letterSpacing: "0.3px" }}
                >
                  CONTRASEÑA
                </label>
                <div className="input-group">
                  <span className="input-group-text" style={{ background: "#f8f9fa", border: "1px solid #dee2e6" }}>
                    🔒
                  </span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ fontSize: "14px" }}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    style={{ fontSize: "13px" }}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* Recordar sesión */}
              <div className="form-check mb-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="remember"
                  style={{ accentColor: "#3cd16f" }}
                />
                <label
                  className="form-check-label text-muted"
                  htmlFor="remember"
                  style={{ fontSize: "13px" }}
                >
                  Recordar sesión en este dispositivo
                </label>
              </div>

              {/* Botón */}
              <button
                type="submit"
                className="btn w-100 fw-medium"
                style={{
                  background: "#3cd16f",
                  color: "#0a110c",
                  borderRadius: "8px",
                  height: "42px",
                  fontSize: "14px",
                  border: "none",
                }}
              >
                Iniciar sesión →
              </button>
            </form>

            {/* Links */}
            <div className="d-flex justify-content-between mt-3">
            <a href="#" className="text-decoration-none" style={{ fontSize: "12px", color: "#3cd16f" }}>
                ¿Olvidaste tu contraseña?
            </a>
            <Link to="/register" className="text-decoration-none" style={{ fontSize: "12px", color: "#3cd16f" }}>
                Crear cuenta
            </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login
