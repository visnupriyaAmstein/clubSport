import { Outlet } from "react-router-dom"
import AuthLeftPanel from "../components/auth/AuthLeftPanel"

function AuthLayout() {
  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center py-4"
      style={{ background: "#f0f2f5" }}
    >
      <div
        className="card shadow-sm border-0 overflow-hidden w-100"
        style={{ maxWidth: "880px", borderRadius: "16px" }}
      >
        <div className="row g-0">
          <AuthLeftPanel />
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
