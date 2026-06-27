import { Link } from "react-router-dom"

function Unauthorized() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: "#f0f2f5" }}>
      <div className="text-center p-5 bg-white rounded-4 shadow-sm">
        <div style={{ fontSize: "48px" }}>🚫</div>
        <h4 className="fw-medium mt-3" style={{ color: "#1a1a1a" }}>Acceso no autorizado</h4>
        <p className="text-muted" style={{ fontSize: "14px" }}>No tienes permisos para acceder a esta sección.</p>
        <Link to="/login" className="btn mt-2" style={{ background: "#3cd16f", color: "#0a110c", borderRadius: "8px", fontSize: "14px" }}>
          Volver al login
        </Link>
      </div>
    </div>
  )
}

export default Unauthorized
