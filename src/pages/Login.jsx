import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { loginUser, saveSession } from "../services/authService"

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const data = await loginUser({ email, password })
      saveSession(data.data.token, data.data.user)
      const routes = { admin: "/admin/dashboard", coach: "/coach/dashboard", user: "/user/dashboard" }
      navigate(routes[data.data.user.role] || "/login")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: "#f0f2f5" }}>
      <div className="card shadow-sm border-0 overflow-hidden" style={{ width: "100%", maxWidth: "880px", borderRadius: "16px" }}>
        <div className="row g-0">

          {/* Left panel */}
          <div className="col-md-5 d-flex flex-column justify-content-between p-4" style={{ background: "#0f1c14", minHeight: "520px" }}>
            <div>
              <div className="d-flex align-items-center gap-2 mb-4">
                <div className="d-flex align-items-center justify-content-center" style={{ width: "42px", height: "42px", background: "#3cd16f", borderRadius: "10px", fontSize: "22px" }}>
                  ⚽
                </div>
                <span className="fw-medium fs-5" style={{ color: "#f0f5f1" }}>SportClub</span>
              </div>
              <p style={{ color: "#5a9e6f", fontSize: "13px" }}>Sistema de gestión deportiva</p>
            </div>
            <div className="d-flex gap-4">
              {[["1.2k", "Socios activos"], ["48", "Coaches"], ["120+", "Clases / mes"]].map(([val, lbl]) => (
                <div key={lbl}>
                  <div className="fw-medium" style={{ color: "#3cd16f", fontSize: "22px" }}>{val}</div>
                  <div style={{ color: "#5a9e6f", fontSize: "11px" }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div className="col-md-7 p-4 p-md-5 bg-white d-flex flex-column justify-content-center">
            <h5 className="fw-medium mb-1" style={{ color: "#1a1a1a" }}>Ingresa a tu cuenta</h5>
            <p className="text-muted mb-4" style={{ fontSize: "13px" }}>Accede con tu correo y contraseña</p>

            {error && (
              <div className="alert alert-danger py-2" style={{ fontSize: "13px", borderRadius: "8px" }}>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label" style={{ fontSize: "12px", fontWeight: "500", color: "#6c757d" }}>
                  CORREO ELECTRÓNICO
                </label>
                <div className="input-group">
                  <span className="input-group-text" style={{ background: "#f8f9fa" }}>✉️</span>
                  <input
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

              <div className="mb-3">
                <label className="form-label" style={{ fontSize: "12px", fontWeight: "500", color: "#6c757d" }}>
                  CONTRASEÑA
                </label>
                <div className="input-group">
                  <span className="input-group-text" style={{ background: "#f8f9fa" }}>🔒</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ fontSize: "14px" }}
                  />
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <div className="form-check mb-4">
                <input className="form-check-input" type="checkbox" id="remember" style={{ accentColor: "#3cd16f" }} />
                <label className="form-check-label text-muted" htmlFor="remember" style={{ fontSize: "13px" }}>
                  Recordar sesión en este dispositivo
                </label>
              </div>

              <button
                type="submit"
                className="btn w-100 fw-medium"
                disabled={loading}
                style={{ background: "#3cd16f", color: "#0a110c", borderRadius: "8px", height: "42px", fontSize: "14px", border: "none" }}
              >
                {loading ? "Ingresando..." : "Iniciar sesión →"}
              </button>
            </form>

            <div className="d-flex justify-content-between mt-3">
              <a href="#" className="text-decoration-none" style={{ fontSize: "12px", color: "#3cd16f" }}>¿Olvidaste tu contraseña?</a>
              <Link to="/register" className="text-decoration-none" style={{ fontSize: "12px", color: "#3cd16f" }}>Crear cuenta</Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login
