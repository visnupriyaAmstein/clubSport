import { useState } from "react"
import { Outlet } from "react-router-dom"
import { getUser } from "../services/authService"
import { ROLES_CONFIG } from "../config/roles"
import TopBar from "../components/TopBar"
import Sidebar from "../components/Sidebar"
import ProfileModal from "../components/ProfileModal"

const { colors, menuItems, label } = ROLES_CONFIG.user

function UserLayout() {
  const user = getUser()
  const [showProfile, setShowProfile] = useState(false)

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <TopBar
        user={user}
        colors={colors}
        onOpenProfile={() => setShowProfile(true)}
      />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar
          user={user}
          colors={colors}
          menuItems={menuItems}
          roleLabel={label}
          onOpenProfile={() => setShowProfile(true)}
        />
        <main style={{ flex: 1, padding: "24px", background: "#f0f2f5" }}>
          <Outlet />
        </main>
      </div>
      <ProfileModal
        show={showProfile}
        onHide={() => setShowProfile(false)}
        user={user}
        colors={colors}
      />
    </div>
  )
}

export default UserLayout
