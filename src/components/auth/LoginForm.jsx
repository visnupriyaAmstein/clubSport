import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { loginUser, saveSession } from "../../services/authService"
import AuthInput from "./AuthInput"
import AuthSubmitButton from "./AuthSubmitButton"

const ROLE_ROUTES = {
  admin: "/admin/dashboard",
  coach: "/coach/dashboard",
  user:  "/user/dashboard",
}

function LoginForm() {
  const navigate = useNavigate()
  const [email, setEmail]           = useState("")
  const [password, setPassword]     = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError]           = useState("")
  const [loading, setLoading]       = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const data = await loginUser({ email, password })
      saveSession(data.data.token, data.data.user)
      navigate(ROLE_ROUTES[data.data.user.role] || "/login")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="col-md-7 p-4 p-md-5 bg-white d-flex flex-column justify-content-center">
      <h5 className="fw-medium mb-1" style={{ color: "#1a1a1a" }}>Ingresa a tu cuenta</h5>
      <p className="text-muted mb-4" style={{ fontSize: "13px" }}>Accede con tu correo y contraseña</p>

      {error && (
        <div className="alert alert-danger py-2" style={{ fontSize: "13px", borderRadius: "8px" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <AuthInput
          label="CORREO ELECTRÓNICO"
          icon="✉️"
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <AuthInput
          label="CONTRASEÑA"
          icon="🔒"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          rightElement={
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          }
        />

        <div className="form-check mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            id="remember"
            style={{ accentColor: "#3cd16f" }}
          />
          <label className="form-check-label text-muted" htmlFor="remember" style={{ fontSize: "13px" }}>
            Recordar sesión en este dispositivo
          </label>
        </div>

        <AuthSubmitButton
          loading={loading}
          label="Iniciar sesión →"
          loadingLabel="Ingresando..."
        />
      </form>

      <div className="d-flex justify-content-between mt-3">
        <a href="#" className="text-decoration-none" style={{ fontSize: "12px", color: "#3cd16f" }}>
          ¿Olvidaste tu contraseña?
        </a>
        <Link to="/register" className="text-decoration-none" style={{ fontSize: "12px", color: "#3cd16f" }}>
          Crear cuenta
        </Link>
      </div>
    </div>
  )
}

export default LoginForm
