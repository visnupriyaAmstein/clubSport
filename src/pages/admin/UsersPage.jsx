import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import Swal from "sweetalert2"
import UserFormModal from "../../components/users/UserFormModal"
import { createUser, deleteUser, getUsers, updateUser } from "../../services/userService"

const swalDark = {
  background:         "#241712",
  color:              "#E3D2C8",
  confirmButtonColor: "#CB6C32",
}

const ROLE_BADGE = {
  admin: { label: "Admin",   bg: "#854F0B" },
  coach: { label: "Coach",   bg: "#1B5E20" },
  user:  { label: "Usuario", bg: "#0E4A7A" },
}

function UsersPage() {
  const [users, setUsers]               = useState([])
  const [loading, setLoading]           = useState(true)
  const [showModal, setShowModal]       = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  // ── Fetch
  useEffect(() => {
    let isMounted = true

    getUsers()
      .then((data) => {
        if (isMounted) setUsers(data.data ?? data)
      })
      .catch((err) => {
        if (isMounted) Swal.fire({ title: "Error", text: err.message, icon: "error", ...swalDark })
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => { isMounted = false }  
  }, [])

  const refresh = () => {
    setLoading(true)
    getUsers()
      .then((data) => setUsers(data.data ?? data))
      .catch((err) => Swal.fire({ title: "Error", text: err.message, icon: "error", ...swalDark }))
      .finally(() => setLoading(false))
  }

  //  Modal 
  const openCreateModal = () => { setSelectedUser(null); setShowModal(true) }
  const openEditModal   = (user) => { setSelectedUser(user); setShowModal(true) }
  const closeModal      = () => { setShowModal(false); setSelectedUser(null) }

  //  Save 
  const handleSave = async (formData) => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, formData)
        Swal.fire({ title: "¡Actualizado!", text: "Los datos del usuario fueron guardados.", icon: "success", ...swalDark })
      } else {
        await createUser(formData)
        Swal.fire({ title: "¡Usuario creado!", text: "El nuevo usuario fue registrado correctamente.", icon: "success", ...swalDark })
      }
      closeModal()
      refresh()
    } catch (error) {
      Swal.fire({ title: "Error", text: error.message, icon: "error", ...swalDark })
    }
  }

  //  Delete 
  const handleDelete = async (user) => {
    const result = await Swal.fire({
      title: "¿Eliminar usuario?",
      text: `Se eliminará a ${user.full_name}. Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      ...swalDark,
    })
    if (result.isConfirmed) {
      try {
        await deleteUser(user.id)
        Swal.fire({ title: "Eliminado", text: "El usuario fue eliminado.", icon: "success", ...swalDark })
        refresh()
      } catch (error) {
        Swal.fire({ title: "Error", text: error.message, icon: "error", ...swalDark })
      }
    }
  }

  //  Render
  return (
    <div style={{ color: "#E3D2C8" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <div>
          <h5 style={{ margin: 0, fontWeight: 500, color: "#fff" }}>Gestión de Usuarios</h5>
          <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#C2A294" }}>
            {loading ? "Cargando..." : `${users.length} usuarios en el sistema`}
          </p>
        </div>
        <button
          onClick={openCreateModal}
          style={{
            background: "#CB6C32", color: "#fff", border: "none",
            borderRadius: "8px", padding: "8px 16px", fontSize: "13px",
            cursor: "pointer", display: "flex", alignItems: "center", gap: "6px",
          }}
        >
          ＋ Nuevo Usuario
        </button>
      </div>

      {/* Table */}
      <div style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "12px", overflow: "hidden" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "48px", color: "#C2A294" }}>
            <Spinner animation="border" size="sm" style={{ color: "#CB6C32" }} />
            <p style={{ marginTop: "12px", fontSize: "13px" }}>Cargando usuarios...</p>
          </div>
        ) : users.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px", color: "#C2A294" }}>
            No hay usuarios registrados aún
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>
                {["ID", "Nombre", "Correo", "Nacimiento", "Rol", "Acciones"].map((h) => (
                  <th key={h} style={{ padding: "10px 14px", color: "#C2A294", fontWeight: 500, textAlign: "left", fontSize: "11px", letterSpacing: "0.03em" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const badge = ROLE_BADGE[user.role] ?? ROLE_BADGE.user
                return (
                  <tr key={user.id} style={{ borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
                    <td style={{ padding: "10px 14px", color: "#C2A294" }}>#{user.id}</td>
                    <td style={{ padding: "10px 14px", color: "#fff" }}>{user.full_name}</td>
                    <td style={{ padding: "10px 14px", color: "#C2A294" }}>{user.email}</td>
                    <td style={{ padding: "10px 14px", color: "#C2A294" }}>{user.birth_date ?? "—"}</td>
                    <td style={{ padding: "10px 14px" }}>
                      <span style={{ background: badge.bg, color: "#fff", fontSize: "10px", padding: "3px 9px", borderRadius: "6px", fontWeight: 500 }}>
                        {badge.label}
                      </span>
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      <div style={{ display: "flex", gap: "6px" }}>

                        {/* Pencil — edit */}
                        <button
                          onClick={() => openEditModal(user)}
                          title="Editar"
                          style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "none", borderRadius: "6px", padding: "5px 10px", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                          Editar
                        </button>

                        <button
                          onClick={() => handleDelete(user)}
                          title="Eliminar"
                          style={{ background: "rgba(203,108,50,0.15)", color: "#CB6C32", border: "none", borderRadius: "6px", padding: "5px 10px", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                            <path d="M10 11v6M14 11v6"/>
                            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                          </svg>
                          Eliminar
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

      <UserFormModal show={showModal} handleClose={closeModal} handleSave={handleSave} selectedUser={selectedUser} />
    </div>
  )
}

export default UsersPage
