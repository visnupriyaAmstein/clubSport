import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { registerUser } from "../../services/authService"
import AuthInput from "./AuthInput"
import AuthSubmitButton from "./AuthSubmitButton"
import Swal from "sweetalert2"

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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const RUT_RE   = /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/  

function validate(form) {
  const errors = {}

  if (!form.nombre.trim())
    errors.nombre = "El nombre es obligatorio."

  if (!form.apellido.trim())
    errors.apellido = "El apellido es obligatorio."

  if (!form.rut.trim())
    errors.rut = "El RUT es obligatorio."
  else if (!RUT_RE.test(form.rut.trim()))
    errors.rut = "Formato de RUT inválido (ej: 12.345.678-9)."

  if (!form.fechaNacimiento)
    errors.fechaNacimiento = "La fecha de nacimiento es obligatoria."

  if (!form.genero)
    errors.genero = "Selecciona un género."

  if (!form.email.trim())
    errors.email = "El correo es obligatorio."
  else if (!EMAIL_RE.test(form.email.trim()))
    errors.email = "El correo no tiene un formato válido."

  if (!form.password)
    errors.password = "La contraseña es obligatoria."
  else if (form.password.length < 6)
    errors.password = "La contraseña debe tener al menos 6 caracteres."

  if (!form.confirmPassword)
    errors.confirmPassword = "Debes confirmar la contraseña."
  else if (form.password !== form.confirmPassword)
    errors.confirmPassword = "Las contraseñas no coinciden."

  if (!form.terminosAceptados)
    errors.terminosAceptados = "Debes aceptar los términos y condiciones."

  return errors
}

//  Field error component 
function FieldError({ msg }) {
  if (!msg) return null
  return (
    <p className="field-error-msg" style={{ margin: "3px 0 0", fontSize: "11px", color: "#dc3545" }}>
      ⚠ {msg}
    </p>
  )
}

// Main component 
function RegisterForm() {
  const navigate = useNavigate()
  const [serverError, setServerError] = useState("")
  const [loading, setLoading]         = useState(false)
  const [preview, setPreview]         = useState(null)
  const [showPass, setShowPass]       = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})   
  const [touched, setTouched]         = useState({})  

  const [form, setForm] = useState({
    nombre: "", apellido: "", rut: "", fechaNacimiento: "",
    telefono: "", genero: "", email: "", password: "",
    confirmPassword: "", deportes: [], fotoPerfil: null,
    terminosAceptados: false, rol: "user",
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const newForm = { ...form, [name]: type === "checkbox" ? checked : value }
    setForm(newForm)
    if (touched[name]) {
      const errs = validate(newForm)
      setFieldErrors((prev) => ({ ...prev, [name]: errs[name] }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const errs = validate(form)
    setFieldErrors((prev) => ({ ...prev, [name]: errs[name] }))
  }

  const handlePhoto = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      setFieldErrors((prev) => ({ ...prev, fotoPerfil: "La imagen no puede superar los 2 MB." }))
      return
    }
    setFieldErrors((prev) => ({ ...prev, fotoPerfil: undefined }))
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
    setServerError("")

    
    const allTouched = Object.keys(form).reduce((acc, k) => ({ ...acc, [k]: true }), {})
    setTouched(allTouched)

    const errs = validate(form)
    setFieldErrors(errs)

    if (Object.keys(errs).length > 0) {
      const firstErr = document.querySelector(".field-error-msg")
      firstErr?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }

    setLoading(true)
    try {
      await registerUser(form)
      await Swal.fire({
        title: "¡Cuenta creada!",
        text: `Bienvenido/a ${form.nombre}. Tu cuenta fue creada exitosamente.`,
        icon: "success",
        confirmButtonText: "Iniciar sesión",
        confirmButtonColor: "#3cd16f",
        background: "#0f1c14",
        color: "#f0f5f1",
      })
      navigate("/login")
    } catch (err) {
      setServerError(err.message || "Ocurrió un error al crear la cuenta. Intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  // border color helper
  const borderOf = (field) =>
    fieldErrors[field] ? "1.5px solid #dc3545" : touched[field] ? "1.5px solid #3cd16f" : undefined

  return (
    <div
      className="col-md-7 card-body p-4 overflow-auto bg-white"
      style={{ maxHeight: "90vh" }}
    >
      {/* Server error */}
      {serverError && (
        <div className="alert alert-danger py-2 mb-3" style={{ fontSize: "13px", borderRadius: "8px" }}>
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        {/* Foto de perfil  */}
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
            <FieldError msg={fieldErrors.fotoPerfil} />
          </div>
        </div>

        {/*  Datos personales*/}
        <p style={sectionLabel}>
          Datos personales
          <span style={{ color: "#dc3545", marginLeft: 4 }}>* campos obligatorios</span>
        </p>
        <div className="row g-3 mb-3">

          <div className="col-6">
            <label style={fieldLabel}>Nombre <span style={{ color: "#dc3545" }}>*</span></label>
            <div className="input-group">
              <span className="input-group-text" style={{ background: "#f8f9fa" }}>👤</span>
              <input
                name="nombre" type="text" className="form-control"
                placeholder="Ej. María" value={form.nombre}
                onChange={handleChange} onBlur={handleBlur}
                style={{ fontSize: "14px", borderColor: borderOf("nombre") }}
              />
            </div>
            <FieldError msg={fieldErrors.nombre} />
          </div>

          <div className="col-6">
            <label style={fieldLabel}>Apellido <span style={{ color: "#dc3545" }}>*</span></label>
            <div className="input-group">
              <span className="input-group-text" style={{ background: "#f8f9fa" }}>👤</span>
              <input
                name="apellido" type="text" className="form-control"
                placeholder="Ej. González" value={form.apellido}
                onChange={handleChange} onBlur={handleBlur}
                style={{ fontSize: "14px", borderColor: borderOf("apellido") }}
              />
            </div>
            <FieldError msg={fieldErrors.apellido} />
          </div>

          <div className="col-6">
            <label style={fieldLabel}>RUT / DNI <span style={{ color: "#dc3545" }}>*</span></label>
            <div className="input-group">
              <span className="input-group-text" style={{ background: "#f8f9fa" }}>🪪</span>
              <input
                name="rut" type="text" className="form-control"
                placeholder="12.345.678-9" value={form.rut}
                onChange={handleChange} onBlur={handleBlur}
                style={{ fontSize: "14px", borderColor: borderOf("rut") }}
              />
            </div>
            <FieldError msg={fieldErrors.rut} />
          </div>

          <div className="col-6">
            <label style={fieldLabel}>Fecha de nacimiento <span style={{ color: "#dc3545" }}>*</span></label>
            <div className="input-group">
              <span className="input-group-text" style={{ background: "#f8f9fa" }}>📅</span>
              <input
                name="fechaNacimiento" type="date" className="form-control"
                value={form.fechaNacimiento}
                onChange={handleChange} onBlur={handleBlur}
                style={{ fontSize: "14px", borderColor: borderOf("fechaNacimiento") }}
              />
            </div>
            <FieldError msg={fieldErrors.fechaNacimiento} />
          </div>

          <div className="col-6">
            <label style={fieldLabel}>Teléfono</label>
            <div className="input-group">
              <span className="input-group-text" style={{ background: "#f8f9fa" }}>📞</span>
              <input
                name="telefono" type="tel" className="form-control"
                placeholder="+56 9 XXXX XXXX" value={form.telefono}
                onChange={handleChange}
                style={{ fontSize: "14px" }}
              />
            </div>
          </div>

          <div className="col-6">
            <label style={fieldLabel}>Género <span style={{ color: "#dc3545" }}>*</span></label>
            <select
              name="genero" className="form-select"
              value={form.genero} onChange={handleChange} onBlur={handleBlur}
              style={{ fontSize: "14px", borderColor: borderOf("genero") }}
            >
              <option value="">Seleccionar...</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
              <option value="prefiero_no_decir">Prefiero no decir</option>
            </select>
            <FieldError msg={fieldErrors.genero} />
          </div>

        </div>

        {/* Acceso */}
        <p style={sectionLabel}>Acceso al sistema</p>
        <div className="row g-3 mb-3">

          <div className="col-12">
            <label style={fieldLabel}>Correo electrónico <span style={{ color: "#dc3545" }}>*</span></label>
            <div className="input-group">
              <span className="input-group-text" style={{ background: "#f8f9fa" }}>✉️</span>
              <input
                name="email" type="email" className="form-control"
                placeholder="tu@email.com" value={form.email}
                onChange={handleChange} onBlur={handleBlur}
                autoComplete="email"
                style={{ fontSize: "14px", borderColor: borderOf("email") }}
              />
            </div>
            <FieldError msg={fieldErrors.email} />
          </div>

          <div className="col-6">
            <AuthInput
              label={<>CONTRASEÑA <span style={{ color: "#dc3545" }}>*</span></>}
              icon="🔒"
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Mínimo 6 caracteres"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{ borderColor: borderOf("password") }}
              required
              rightElement={
                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPass(!showPass)} tabIndex={-1}>
                  {showPass ? "🙈" : "👁️"}
                </button>
              }
            />
            <FieldError msg={fieldErrors.password} />
          </div>

          <div className="col-6">
            <AuthInput
              label={<>CONFIRMAR CONTRASEÑA <span style={{ color: "#dc3545" }}>*</span></>}
              icon="🔒"
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Repetir contraseña"
              value={form.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{ borderColor: borderOf("confirmPassword") }}
              required
              rightElement={
                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowConfirm(!showConfirm)} tabIndex={-1}>
                  {showConfirm ? "🙈" : "👁️"}
                </button>
              }
            />
            <FieldError msg={fieldErrors.confirmPassword} />
          </div>

        </div>

        {/* Deportes */}
        <p style={sectionLabel}>Deportes de interés</p>
        <div className="d-flex flex-wrap gap-2 mb-4">
          {SPORTS.map(({ id, label }) => {
            const selected = form.deportes.includes(id)
            return (
              <button
                key={id} type="button"
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

        {/* Términos */}
        <div className="form-check mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            id="terminosAceptados"
            name="terminosAceptados"
            checked={form.terminosAceptados}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ accentColor: "#3cd16f" }}
          />
          <label className="form-check-label" htmlFor="terminosAceptados" style={{ fontSize: "12px", color: "#6c757d" }}>
            Acepto los{" "}
            <a href="#" style={{ color: "#3cd16f", textDecoration: "none" }}>términos y condiciones</a>
            {" "}y la{" "}
            <a href="#" style={{ color: "#3cd16f", textDecoration: "none" }}>política de privacidad</a>{" "}
            de SportClub. <span style={{ color: "#dc3545" }}>*</span>
          </label>
          <FieldError msg={fieldErrors.terminosAceptados} />
        </div>

        <AuthSubmitButton loading={loading} label="👤 Crear cuenta" loadingLabel="Creando cuenta..." />

        <p className="text-center mt-3" style={{ fontSize: "12px", color: "#6c757d" }}>
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" style={{ color: "#3cd16f", textDecoration: "none" }}>Inicia sesión</Link>
        </p>

      </form>
    </div>
  )
}

export default RegisterForm
