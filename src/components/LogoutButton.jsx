import { useNavigate } from "react-router-dom"
import { logout } from "../services/authService"

function LogoutButton({ textColor = "#fff", bgColor = "rgba(255,255,255,0.15)" }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <button
      onClick={handleLogout}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "5px 12px",
        borderRadius: "8px",
        border: "none",
        background: bgColor,
        color: textColor,
        fontSize: "13px",
        cursor: "pointer",
      }}
    >
      <i className="ti ti-logout" aria-hidden="true" />
      Salir
    </button>
  )
}

export default LogoutButton
