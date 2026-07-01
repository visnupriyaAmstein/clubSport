// src/pages/admin/UsersPage.jsx
// Admin CRUD — lists, creates, edits and deletes users
// Uses UserFormModal for create/edit, SweetAlert2 for delete confirmation

import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import Swal from "sweetalert2"
import UserFormModal from "../../components/users/UserFormModal"
import { createUser, deleteUser, getUsers, updateUser } from "../../services/userService"

// Role badge config
const ROLE_BADGE = {
  admin: { label: "Admin",   bg: "#854F0B" },
  coach: { label: "Coach",   bg: "#2A5E1A" },
  user:  { label: "Usuario", bg: "#0E4A7A" },
}

function UsersPage() {
  const [users, setUsers]           = useState([])
  const [loading, setLoading]       = useState(true)
  const [showModal, setShowModal]   = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  // ── Load ──────────────────────────────────────────────────
  const loadUsers = async () => {
    try {
      setLoading(true)
      const data = await getUsers()
      // Backend may return { data: [...] } or directly [...]
      setUsers(data.data ?? data)
    } catch (error) {
      Swal.fire("Error", error.message, "error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadUsers() }, [])

  // ── Modal helpers ─────────────────────────────────────────
  const openCreateModal = () => { setSelectedUser(null); setShowModal(true) }
  const openEditModal   = (user) => { setSelectedUser(user); setShowModal(true) }
  const closeModal      = () => { setShowModal(false); setSelectedUser(null) }

  // ── Create / Edit ─────────────────────────────────────────
  const handleSave = async (formData) => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, formData)
        Swal.fire("Actualizado", "Usuario actualizado correctamente", "success")
      } else {
        await createUser(formData)
        Swal.fire("Creado", "Usuario creado correctamente", "success")
      }
      closeModal()
      loadUsers()
    } catch (error) {
      Swal.fire("Error", error.message, "error")
    }
  }

  // ── Delete ────────────────────────────────────────────────
  const handleDelete = async (user) => {
    const result = await Swal.fire({
      title: "¿Eliminar usuario?",
      text: `Se eliminará a ${user.full_name}. Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#CB6C32",
      background: "#241712",
      color: "#E3D2C8",
    })

    if (result.isConfirmed) {
      try {
        await deleteUser(user.id)
        Swal.fire({
          title: "Eliminado",
          text: "Usuario eliminado correctamente",
          icon: "success",
          background: "#241712",
          color: "#E3D2C8",
          confirmButtonColor: "#CB6C32",
        })
        loadUsers()
      } catch (error) {
        Swal.fire("Error", error.message, "error")
      }
    }
  }

  // ── Render ────────────────────────────────────────────────
  return (
    <div style={{ color: "#E3D2C8" }}>

      {/* Page header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <div>
          <h5 style={{ margin: 0, fontWeight: 500, color: "#fff" }}>Gestión de Usuarios</h5>
          <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#C2A294" }}>
            {users.length} usuarios registrados en el sistema
          </p>
        </div>
        <button
          onClick={openCreateModal}
          style={{
            background: "#CB6C32",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "8px 16px",
            fontSize: "13px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <i className="ti ti-user-plus" aria-hidden="true" />
          Nuevo Usuario
        </button>
      </div>

      {/* Table card */}
      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "0.5px solid rgba(255,255,255,0.08)",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {loading ? (
          <div style={{ textAlign: "center", padding: "48px", color: "#C2A294" }}>
            <Spinner animation="border" size="sm" style={{ color: "#CB6C32" }} />
            <p style={{ marginTop: "12px", fontSize: "13px" }}>Cargando usuarios...</p>
          </div>
        ) : users.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px", color: "#C2A294" }}>
            <i className="ti ti-users-off" style={{ fontSize: "32px", display: "block", marginBottom: "8px" }} />
            No hay usuarios registrados aún
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>
                {["ID", "Nombre", "Correo", "Rol", "Acciones"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "10px 14px",
                      color: "#C2A294",
                      fontWeight: 500,
                      textAlign: "left",
                      fontSize: "11px",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const badge = ROLE_BADGE[user.role] ?? ROLE_BADGE.user
                return (
                  <tr
                    key={user.id}
                    style={{ borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}
                  >
                    <td style={{ padding: "10px 14px", color: "#C2A294" }}>#{user.id}</td>
                    <td style={{ padding: "10px 14px", color: "#fff" }}>{user.full_name}</td>
                    <td style={{ padding: "10px 14px", color: "#C2A294" }}>{user.email}</td>
                    <td style={{ padding: "10px 14px" }}>
                      <span
                        style={{
                          background: badge.bg,
                          color: "#fff",
                          fontSize: "10px",
                          padding: "3px 9px",
                          borderRadius: "6px",
                          fontWeight: 500,
                        }}
                      >
                        {badge.label}
                      </span>
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button
                          onClick={() => openEditModal(user)}
                          title="Editar usuario"
                          style={{
                            background: "rgba(255,255,255,0.08)",
                            color: "#fff",
                            border: "none",
                            borderRadius: "6px",
                            padding: "5px 10px",
                            fontSize: "13px",
                            cursor: "pointer",
                          }}
                        >
                          <i className="ti ti-pencil" aria-hidden="true" />
                        </button>
                        <button
                          onClick={() => handleDelete(user)}
                          title="Eliminar usuario"
                          style={{
                            background: "rgba(203,108,50,0.15)",
                            color: "#CB6C32",
                            border: "none",
                            borderRadius: "6px",
                            padding: "5px 10px",
                            fontSize: "13px",
                            cursor: "pointer",
                          }}
                        >
                          <i className="ti ti-trash" aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal — same component for create and edit */}
      <UserFormModal
        show={showModal}
        handleClose={closeModal}
        handleSave={handleSave}
        selectedUser={selectedUser}
      />
    </div>
  )
}

export default UsersPage
