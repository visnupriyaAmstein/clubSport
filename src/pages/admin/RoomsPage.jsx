import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import Swal from "sweetalert2"
import RoomFormModal from "../../components/rooms/RoomFormModal"
import { createRoom, deleteRoom, getRooms, updateRoom } from "../../services/roomService"

const swalDark = { background: "#241712", color: "#E3D2C8", confirmButtonColor: "#CB6C32" }

function RoomsPage() {
  const [rooms, setRooms]               = useState([])
  const [loading, setLoading]           = useState(true)
  const [showModal, setShowModal]       = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)

  const refresh = () => {
    setLoading(true)
    getRooms()
      .then((data) => setRooms(data.data ?? data))
      .catch((err) => Swal.fire({ title: "Error", text: err.message, icon: "error", ...swalDark }))
      .finally(() => setLoading(false))
  }

  useEffect(() => { refresh() }, [])

  const openCreateModal = () => { setSelectedRoom(null); setShowModal(true) }
  const openEditModal   = (room) => { setSelectedRoom(room); setShowModal(true) }
  const closeModal      = () => { setShowModal(false); setSelectedRoom(null) }

  const handleSave = async (formData) => {
    try {
      if (selectedRoom) {
        await updateRoom(selectedRoom.id, formData)
        Swal.fire({ title: "¡Actualizada!", text: "La sala fue actualizada.", icon: "success", ...swalDark })
      } else {
        await createRoom(formData)
        Swal.fire({ title: "¡Sala creada!", text: "La sala fue registrada correctamente.", icon: "success", ...swalDark })
      }
      closeModal()
      refresh()
    } catch (error) {
      Swal.fire({ title: "Error", text: error.message, icon: "error", ...swalDark })
    }
  }

  const handleDelete = async (room) => {
    const result = await Swal.fire({
      title: "¿Eliminar sala?",
      text: `Se eliminará "${room.name}". Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      ...swalDark,
    })
    if (result.isConfirmed) {
      try {
        await deleteRoom(room.id)
        Swal.fire({ title: "Eliminada", text: "La sala fue eliminada.", icon: "success", ...swalDark })
        refresh()
      } catch (error) {
        Swal.fire({ title: "Error", text: error.message, icon: "error", ...swalDark })
      }
    }
  }

  return (
    <div style={{ color: "#E3D2C8" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <div>
          <h5 style={{ margin: 0, fontWeight: 500, color: "#fff" }}>Gestión de Salas</h5>
          <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#C2A294" }}>
            {loading ? "Cargando..." : `${rooms.length} salas registradas`}
          </p>
        </div>
        <button
          onClick={openCreateModal}
          style={{ background: "#CB6C32", color: "#fff", border: "none", borderRadius: "8px", padding: "8px 16px", fontSize: "13px", cursor: "pointer" }}
        >
          ＋ Nueva Sala
        </button>
      </div>

      <div style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "12px", overflow: "hidden" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "48px" }}><Spinner animation="border" size="sm" /></div>
        ) : rooms.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px", color: "#C2A294" }}>No hay salas registradas aún</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>
                {["ID", "Nombre", "Capacidad", "Ubicación", "Estado", "Acciones"].map((h) => (
                  <th key={h} style={{ padding: "10px 14px", color: "#C2A294", fontSize: "11px", textAlign: "left" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id} style={{ borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
                  <td style={{ padding: "10px 14px", color: "#C2A294" }}>#{room.id}</td>
                  <td style={{ padding: "10px 14px", color: "#fff" }}>{room.name}</td>
                  <td style={{ padding: "10px 14px", color: "#C2A294" }}>{room.capacity}</td>
                  <td style={{ padding: "10px 14px", color: "#C2A294" }}>{room.location ?? "—"}</td>
                  <td style={{ padding: "10px 14px" }}>
                    <span style={{
                      background: room.status ? "rgba(46,125,50,0.2)" : "rgba(220,53,69,0.15)",
                      color: room.status ? "#43A047" : "#f87171",
                      fontSize: "10px", padding: "3px 9px", borderRadius: "6px", fontWeight: 500,
                    }}>
                      {room.status ? "Activa" : "Inactiva"}
                    </span>
                  </td>
                  <td style={{ padding: "10px 14px" }}>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button onClick={() => openEditModal(room)} style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "none", borderRadius: "6px", padding: "5px 10px", fontSize: "12px", cursor: "pointer" }}>Editar</button>
                      <button onClick={() => handleDelete(room)} style={{ background: "rgba(203,108,50,0.15)", color: "#CB6C32", border: "none", borderRadius: "6px", padding: "5px 10px", fontSize: "12px", cursor: "pointer" }}>Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <RoomFormModal show={showModal} handleClose={closeModal} handleSave={handleSave} selectedRoom={selectedRoom} />
    </div>
  )
}

export default RoomsPage
