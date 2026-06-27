import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { registerUser } from "../services/authService"

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

function Register() {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(null)
  const [showPass, setShowPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)

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
      const payload = {
        nombre: form.nombre, apellido: form.apellido, rut: form.rut,
        fechaNacimiento: form.fechaNacimiento, telefono: form.telefono,
        genero: form.genero, email: form.email, password: form.password,
        deportes: form.deportes, rol: form.rol,
      }
      await registerUser(payload)
      navigate("/login")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const labelStyle = { fontSize: "11px", fontWeight: "500", color: "#6c757d", letterSpacing: "0.3px", marginBottom: "4px" }
  const sectionLabel = { fontSize: "11px", fontWeight: "500", color: "#9ca3af", letterSpacing: "0.6px", textTransform: "uppercase", borderBottom: "1px solid #e9ecef", paddingBottom: "6px", marginBottom: "12px" }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center py-4" style={{ background: "#f0f2f5" }}>
      <div className="card shadow-sm border-0 overflow-hidden w-100" style={{ maxWidth: "700px", borderRadius: "16px" }}>

        {/* Header */}
        <div className="d-flex align-items-center gap-2 p-3 px-4" style={{ background: "#0f1c14" }}>
          <div className="d-flex align-items-center justify-content-center" style={{ width: "36px", height: "36px", background: "#3cd16f", borderRadius: "8px", fontSize: "20px" }}>⚽</div>
          <div>
            <div className="fw-medium" style={{ color: "#f0f5f1", fontSize: "15px" }}>SportClub</div>
            <div style={{ color: "#5a9e6f", fontSize: "11px" }}>Registro de nuevo socio</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card-body p-4 bg-white">

          {error && (
            <div className="alert alert-danger py-2 mb-3" style={{ fontSize: "13px", borderRadius: "8px" }}>
              {error}
            </div>
          )}

          {/* Profile photo */}
          <p style={sectionLabel}>Foto de perfil</p>
          <div className="d-flex align-items-center gap-3 mb-4">
            <label htmlFor="fotoPerfil" style={{ cursor: "pointer" }}>
              <div className="d-flex align-items-center justify-content-center rounded-circle overflow-hidden" style={{ width: "60px", height: "60px", background: "#1a3a20", border: "2px dashed #3cd16f" }}>
                {preview ? <img src={preview} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: "24px" }}>📷</span>}
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
              <label style={labelStyle}>Nombre</label>
              <div className="input-group">
                <span className="input-group-text" style={{ background: "#f8f9fa" }}>👤</span>
                <input name="nombre" type="text" className="form-control" placeholder="Ej. María" value={form.nombre} onChange={handleChange} required style={{ fontSize: "14px" }} />
              </div>
            </div>
            <div className="col-6">
              <label style={labelStyle}>Apellido</label>
              <div className="input-group">
                <span className="input-group-text" style={{ background: "#f8f9fa" }}>👤</span>
                <input name="apellido" type="text" className="form-control" placeholder="Ej. González" value={form.apellido} onChange={handleChange} required style={{ fontSize: "14px" }} />
              </div>
            </div>
            <div className="col-6">
              <label style={labelStyle}>RUT / DNI</label>
              <div className="input-group">
                <span className="input-group-text" style={{ background: "#f8f9fa" }}>🪪</span>
                <input name="rut" type="text" className="form-control" placeholder="12.345.678-9" value={form.rut} onChange={handleChange} required style={{ fontSize: "14px" }} />
              </div>
            </div>
            <div className="col-6">
              <label style={labelStyle}>Fecha de nacimiento</label>
              <div className="input-group">
                <span className="input-group-text" style={{ background: "#f8f9fa" }}>📅</span>
                <input name="fechaNacimiento" type="date" className="form-control" value={form.fechaNacimiento} onChange={handleChange} required style={{ fontSize: "14px" }} />
              </div>
            </div>
            <div className="col-6">
              <label style={labelStyle}>Teléfono</label>
              <div className="input-group">
                <span className="input-group-text" style={{ background: "#f8f9fa" }}>📞</span>
                <input name="telefono" type="tel" className="form-control" placeholder="+56 9 XXXX XXXX" value={form.telefono} onChange={handleChange} style={{ fontSize: "14px" }} />
              </div>
            </div>
            <div className="col-6">
              <label style={labelStyle}>Género</label>
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
              <label style={labelStyle}>Correo electrónico</label>
              <div className="input-group">
                <span className="input-group-text" style={{ background: "#f8f9fa" }}>✉️</span>
                <input name="email" type="email" className="form-control" placeholder="tu@email.com" value={form.email} onChange={handleChange} required style={{ fontSize: "14px" }} />
              </div>
            </div>
            <div className="col-6">
              <label style={labelStyle}>Contraseña</label>
              <div className="input-group">
                <span className="input-group-text" style={{ background: "#f8f9fa" }}>🔒</span>
                <input name="password" type={showPass ? "text" : "password"} className="form-control" placeholder="••••••••" value={form.password} onChange={handleChange} required style={{ fontSize: "14px" }} />
                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPass(!showPass)} tabIndex={-1}>{showPass ? "🙈" : "👁️"}</button>
              </div>
            </div>
            <div className="col-6">
              <label style={labelStyle}>Confirmar contraseña</label>
              <div className="input-group">
                <span className="input-group-text" style={{ background: "#f8f9fa" }}>🔒</span>
                <input name="confirmPassword" type={showConfirmPass ? "text" : "password"} className="form-control" placeholder="••••••••" value={form.confirmPassword} onChange={handleChange} required style={{ fontSize: "14px" }} />
                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowConfirmPass(!showConfirmPass)} tabIndex={-1}>{showConfirmPass ? "🙈" : "👁️"}</button>
              </div>
            </div>
          </div>

          {/* Sports */}
          <p style={sectionLabel}>Deportes de interés</p>
          <div className="d-flex flex-wrap gap-2 mb-4">
            {SPORTS.map(({ id, label }) => {
              const selected = form.deportes.includes(id)
              return (
                <button key={id} type="button" onClick={() => toggleSport(id)} className="btn btn-sm"
                  style={{ borderRadius: "99px", fontSize: "12px", border: selected ? "1.5px solid #3cd16f" : "1px solid #dee2e6", color: selected ? "#27500A" : "#6c757d", background: selected ? "#EAF3DE" : "transparent", transition: "all 0.15s" }}>
                  {label}
                </button>
              )
            })}
          </div>

          {/* Terms */}
          <div className="form-check mb-4">
            <input className="form-check-input" type="checkbox" id="terminosAceptados" name="terminosAceptados" checked={form.terminosAceptados} onChange={handleChange} required style={{ accentColor: "#3cd16f" }} />
            <label className="form-check-label" htmlFor="terminosAceptados" style={{ fontSize: "12px", color: "#6c757d" }}>
              Acepto los <a href="#" style={{ color: "#3cd16f", textDecoration: "none" }}>términos y condiciones</a> y la <a href="#" style={{ color: "#3cd16f", textDecoration: "none" }}>política de privacidad</a> de SportClub.
            </label>
          </div>

          <button type="submit" className="btn w-100 fw-medium d-flex align-items-center justify-content-center gap-2" disabled={loading}
            style={{ height: "42px", background: "#3cd16f", color: "#0a110c", border: "none", borderRadius: "8px", fontSize: "14px" }}>
            {loading ? "Creando cuenta..." : "👤 Crear cuenta"}
          </button>

          <p className="text-center mt-3" style={{ fontSize: "12px", color: "#6c757d" }}>
            ¿Ya tienes cuenta? <Link to="/login" style={{ color: "#3cd16f", textDecoration: "none" }}>Inicia sesión</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register
