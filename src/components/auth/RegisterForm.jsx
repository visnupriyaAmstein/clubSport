import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { registerUser } from "../../services/authService"
import AuthInput from "./AuthInput"
import AuthSubmitButton from "./AuthSubmitButton"

const SPORTS = [
  { id: "futbol",      label: "⚽ Fútbol" },
  { id: "natacion",    label: "🏊 Natación" },
  { id: "tenis",       label: "🎾 Tenis" },
  { id: "musculacion", label: "🏋️ Musculación" },
  { id: "ciclismo",    label: "🚴 Ciclismo" },
  { id: "yoga",        label: "🤸 Yoga" },
  { id: "boxeo",       label: "🥊 Boxeo" },
  { id: "basquetbol",  label: "🏀 Básquetbol" },
]

const sectionLabel = {
  fontSize: "11px", fontWeight: "500", color: "#9ca3af",
  letterSpacing: "0.6px", textTransform: "uppercase",
  borderBottom: "1px solid #e9ecef", paddingBottom: "6px", marginBottom: "12px",
}

const fieldLabel = {
  fontSize: "11px", fontWeight: "500", color: "#6c757d",
  letterSpacing: "0.3px", marginBottom: "4px",
}

function RegisterForm() {
  const navigate = useNavigate()
  const [error, setError]         = useState("")
  const [loading, setLoading]     = useState(false)
  const [preview, setPreview]     = useState(null)
  const [showPass, setShowPass]   = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const [form, setForm] = useState({
    nombre: "", apellido: "", rut: "", fechaNacimiento: "",
    telefono: "", genero: "", email: "", password: "",
    confirmPassword: "", deportes: [], fotoPerfil: null,
    terminosAceptados: false, rol: "user",
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
  }

  const handlePhoto = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setForm((prev) => ({ ...prev, fotoPerfil: file }))
    setPreview(URL.createObjectURL(file))
  }

  const toggleSport = (id) => {
    setForm((prev) => ({
      ...prev,
      deportes: prev.deportes.includes(id)
        ? prev.deportes.filter((d) => d !== id)
        : [...prev.deportes, id],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await registerUser(form)
      navigate("/login")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="col-md-7 card-body p-4 overflow-auto bg-white" style={{ maxHeight: "90vh" }}>

      {error && (
        <div className="alert alert-danger py-2 mb-3" style={{ fontSize: "13px", borderRadius: "8px" }}>
          {error}
        </div>
      )}

      {/* Profile photo */}
      <p style={sectionLabel}>Foto de perfil</p>
      <div className="d-flex align-items-center gap-3 mb-4">
        <label htmlFor="fotoPerfil" style={{ cursor: "pointer" }}>
          <div
            className="d-flex align-items-center justify-content-center rounded-circle overflow-hidden"
            style={{ width: "60px", height: "60px", background: "#1a3a20", border: "2px dashed #3cd16f" }}
          >
            {preview
              ? <img src={preview} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <span style={{ fontSize: "24px" }}>📷</span>
            }
          </div>
          <input id="fotoPerfil" type="file" accept="image/png, image/jpeg" onChange={handlePhoto} style={{ display: "none" }} />
        </label>
        <div style={{ fontSize: "12px", color: "#6c757d", lineHeight: "1.6" }}>
          <strong style={{ display: "block", fontSize: "13px", color: "#1a1a1a" }}>Subir foto</strong>
          PNG o JPG · máx. 2 MB · recomendado 200×200px
        </div>
      </div>

      {/* Personal data */}
      <p style={sectionLabel}>Datos personales</p>
      <div className="row g-3 mb-3">
        <div className="col-6">
          <label style={fieldLabel}>Nombre</label>
          <div className="input-group">
            <span className="input-group-text" style={{ background: "#f8f9fa" }}>👤</span>
            <input name="nombre" type="text" className="form-control" placeholder="Ej. María" value={form.nombre} onChange={handleChange} required style={{ fontSize: "14px" }} />
          </div>
        </div>
        <div className="col-6">
          <label style={fieldLabel}>Apellido</label>
          <div className="input-group">
            <span className="input-group-text" style={{ background: "#f8f9fa" }}>👤</span>
            <input name="apellido" type="text" className="form-control" placeholder="Ej. González" value={form.apellido} onChange={handleChange} required style={{ fontSize: "14px" }} />
          </div>
        </div>
        <div className="col-6">
          <label style={fieldLabel}>RUT / DNI</label>
          <div className="input-group">
            <span className="input-group-text" style={{ background: "#f8f9fa" }}>🪪</span>
            <input name="rut" type="text" className="form-control" placeholder="12.345.678-9" value={form.rut} onChange={handleChange} required style={{ fontSize: "14px" }} />
          </div>
        </div>
        <div className="col-6">
          <label style={fieldLabel}>Fecha de nacimiento</label>
          <div className="input-group">
            <span className="input-group-text" style={{ background: "#f8f9fa" }}>📅</span>
            <input name="fechaNacimiento" type="date" className="form-control" value={form.fechaNacimiento} onChange={handleChange} required style={{ fontSize: "14px" }} />
          </div>
        </div>
        <div className="col-6">
          <label style={fieldLabel}>Teléfono</label>
          <div className="input-group">
            <span className="input-group-text" style={{ background: "#f8f9fa" }}>📞</span>
            <input name="telefono" type="tel" className="form-control" placeholder="+56 9 XXXX XXXX" value={form.telefono} onChange={handleChange} style={{ fontSize: "14px" }} />
          </div>
        </div>
        <div className="col-6">
          <label style={fieldLabel}>Género</label>
          <select name="genero" className="form-select" value={form.genero} onChange={handleChange} required style={{ fontSize: "14px" }}>
            <option value="">Seleccionar...</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
            <option value="prefiero_no_decir">Prefiero no decir</option>
          </select>
        </div>
      </div>

      {/* Access */}
      <p style={sectionLabel}>Acceso al sistema</p>
      <div className="row g-3 mb-3">
        <div className="col-12">
          <AuthInput
            label="CORREO ELECTRÓNICO"
            icon="✉️"
            type="email"
            name="email"
            placeholder="tu@email.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-6">
          <AuthInput
            label="CONTRASEÑA"
            icon="🔒"
            type={showPass ? "text" : "password"}
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
            rightElement={
              <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPass(!showPass)} tabIndex={-1}>
                {showPass ? "🙈" : "👁️"}
              </button>
            }
          />
        </div>
        <div className="col-6">
          <AuthInput
            label="CONFIRMAR CONTRASEÑA"
            icon="🔒"
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            rightElement={
              <button type="button" className="btn btn-outline-secondary" onClick={() => setShowConfirm(!showConfirm)} tabIndex={-1}>
                {showConfirm ? "🙈" : "👁️"}
              </button>
            }
          />
        </div>
      </div>

      {/* Sports */}
      <p style={sectionLabel}>Deportes de interés</p>
      <div className="d-flex flex-wrap gap-2 mb-4">
        {SPORTS.map(({ id, label }) => {
          const selected = form.deportes.includes(id)
          return (
            <button
              key={id}
              type="button"
              onClick={() => toggleSport(id)}
              className="btn btn-sm"
              style={{
                borderRadius: "99px", fontSize: "12px",
                border: selected ? "1.5px solid #3cd16f" : "1px solid #dee2e6",
                color: selected ? "#27500A" : "#6c757d",
                background: selected ? "#EAF3DE" : "transparent",
                transition: "all 0.15s",
              }}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* Terms */}
      <div className="form-check mb-4">
        <input
          className="form-check-input"
          type="checkbox"
          id="terminosAceptados"
          name="terminosAceptados"
          checked={form.terminosAceptados}
          onChange={handleChange}
          required
          style={{ accentColor: "#3cd16f" }}
        />
        <label className="form-check-label" htmlFor="terminosAceptados" style={{ fontSize: "12px", color: "#6c757d" }}>
          Acepto los <a href="#" style={{ color: "#3cd16f", textDecoration: "none" }}>términos y condiciones</a> y la <a href="#" style={{ color: "#3cd16f", textDecoration: "none" }}>política de privacidad</a> de SportClub.
        </label>
      </div>

      <AuthSubmitButton loading={loading} label="👤 Crear cuenta" loadingLabel="Creando cuenta..." />

      <p className="text-center mt-3" style={{ fontSize: "12px", color: "#6c757d" }}>
        ¿Ya tienes cuenta?{" "}
        <Link to="/login" style={{ color: "#3cd16f", textDecoration: "none" }}>Inicia sesión</Link>
      </p>
    </div>
  )
}

export default RegisterForm
