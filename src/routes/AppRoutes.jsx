import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home        from "../pages/Home"
import Login       from "../pages/Login"
import Register    from "../pages/Register"
import Unauthorized from "../pages/Unauthorized"

// Admin
import AdminDashboard from "../pages/admin/AdminDashboard"
import UsersPage      from "../pages/admin/UsersPage"
import RoomsPage      from "../pages/admin/RoomsPage"
import SportsPage     from "../pages/admin/SportsPage"
import SchedulesPage  from "../pages/admin/SchedulesPage"
import SportRoomsPage from "../pages/admin/SportRoomsPage"

// Coach
import CoachDashboard from "../pages/coach/CoachDashboard"
import MyClassesPage  from "../pages/coach/MyClassesPage"
import MySchedulePage from "../pages/coach/MySchedulePage"

// User
import UserDashboard         from "../pages/user/UserDashboard"
import AvailableClassesPage  from "../pages/user/AvailableClassesPage"
import MyReservationsPage    from "../pages/user/MyReservationsPage"

import AuthLayout  from "../layouts/AuthLayout"
import UserLayout  from "../layouts/UserLayout"
import CoachLayout from "../layouts/CoachLayout"
import AdminLayout from "../layouts/AdminLayout"

import RoleRoute from "./RoleRoute"

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/"              element={<Home />} />
        <Route path="/unauthorized"  element={<Unauthorized />} />

        {/* Auth — login / register */}
        <Route element={<AuthLayout />}>
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* User */}
        <Route
          path="/user"
          element={<RoleRoute allowedRoles={["user"]}><UserLayout /></RoleRoute>}
        >
          <Route path="dashboard"    element={<UserDashboard />} />
          <Route path="disponibles"  element={<AvailableClassesPage />} />
          <Route path="reservas"     element={<MyReservationsPage />} />
        </Route>

        {/* Coach */}
        <Route
          path="/coach"
          element={<RoleRoute allowedRoles={["coach"]}><CoachLayout /></RoleRoute>}
        >
          <Route path="dashboard" element={<CoachDashboard />} />
          <Route path="clases"    element={<MyClassesPage />} />
          <Route path="horarios"  element={<MySchedulePage />} />
        </Route>

        {/* Admin */}
        <Route
          path="/admin"
          element={<RoleRoute allowedRoles={["admin"]}><AdminLayout /></RoleRoute>}
        >
          <Route path="dashboard"    element={<AdminDashboard />} />
          <Route path="usuarios"     element={<UsersPage />} />
          <Route path="salas"        element={<RoomsPage />} />
          <Route path="deportes"     element={<SportsPage />} />
          <Route path="horarios"     element={<SchedulesPage />} />
          <Route path="asignaciones" element={<SportRoomsPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
