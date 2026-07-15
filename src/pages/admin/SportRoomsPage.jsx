import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import Swal from "sweetalert2"
import SportRoomFormModal from "../../components/sportRooms/SportRoomFormModal"
import { createSportRoom, deleteSportRoom, getSportRooms, updateSportRoom } from "../../services/sportRoomService"
import { resolveSportName, resolveRoomName, resolveCoachLabel } from "../../utils/sportRoomHelpers"

const swalDark = {
  background:         "#241712",
  color:              "#E3D2C8",
  confirmButtonColor: "#CB6C32",
}

function SportRoomsPage() {
  const [assignments, setAssignments]       = useState([])
  const [loading, setLoading]               = useState(true)
  const [showModal, setShowModal]           = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState(null)

  const refresh = () => {
    setLoading(true)
    getSportRooms()
      .then((data) => setAssignments(data.data ?? data))
      .catch((err) => Swal.fire({ title: "Error", text: err.message, icon: "error", ...swalDark }))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    refresh()
  }, [])

  const openCreateModal = () => { setSelectedAssignment(null); setShowModal(true) }
  const openEditModal   = (assignment) => { setSelectedAssignment(assignment); setShowModal(true) }
  const closeModal      = () => { setShowModal(false); setSelectedAssignment(null) }

  const handleSave = async (formData) => {
    try {
      if (selectedAssignment) {
        await updateSportRoom(selectedAssignment.id, formData)
        Swal.fire({ title: "¡Actualizada!", text: "La asignación fue actualizada.", icon: "success", ...swalDark })
      } else {
        await createSportRoom(formData)
        Swal.fire({ title: "¡Asignación creada!", text: "La asignación fue registrada correctamente.", icon: "success", ...swalDark })
      }
      closeModal()
      refresh()
    } catch (error) {
      Swal.fire({ title: "Error", text: error.message, icon: "error", ...swalDark })
    }
  }

  const handleDelete = async (assignment) => {
    const result = await Swal.fire({
      title: "¿Eliminar asignación?",
      text: `Se eliminará la asignación de ${resolveSportName(assignment)}. Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      ...swalDark,
    })
    if (result.isConfirmed) {
      try {
        await deleteSportRoom(assignment.id)
        Swal.fire({ title: "Eliminada", text: "La asignación fue eliminada.", icon: "success", ...swalDark })
        refresh()
      } catch (error) {
        Swal.fire({ title: "Error", text: error.message, icon: "error", ...swalDark })
      }
    }
  }

  return (
    <div style={{ color: "#E3D2C8" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <div>
          <h5 style={{ margin: 0, fontWeight: 500, color: "#fff" }}>Gestión de Asignaciones</h5>
          <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#C2A294" }}>
            {loading ? "Cargando..." : `${assignments.length} asignaciones registradas`}
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
          ＋ Nueva Asignación
        </button>
      </div>

      {/* Table */}
      <div style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "12px", overflow: "hidden" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "48px", color: "#C2A294" }}>
            <Spinner animation="border" size="sm" style={{ color: "#CB6C32" }} />
            <p style={{ marginTop: "12px", fontSize: "13px" }}>Cargando asignaciones...</p>
          </div>
        ) : assignments.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px", color: "#C2A294" }}>
            No hay asignaciones registradas aún
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>
                {["ID", "Deporte", "Sala", "Coach", "Horarios", "Acciones"].map((h) => (
                  <th key={h} style={{ padding: "10px 14px", color: "#C2A294", fontWeight: 500, textAlign: "left", fontSize: "11px", letterSpacing: "0.03em" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment.id} style={{ borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
                  <td style={{ padding: "10px 14px", color: "#C2A294" }}>#{assignment.id}</td>
                  <td style={{ padding: "10px 14px", color: "#fff" }}>{resolveSportName(assignment)}</td>
                  <td style={{ padding: "10px 14px", color: "#C2A294" }}>{resolveRoomName(assignment)}</td>
                  <td style={{ padding: "10px 14px", color: "#C2A294" }}>{resolveCoachLabel(assignment)}</td>
                  <td style={{ padding: "10px 14px", color: "#C2A294" }}>
                    {assignment.schedules?.length ?? 0}
                  </td>
                  <td style={{ padding: "10px 14px" }}>
                    <div style={{ display: "flex", gap: "6px" }}>

                      <button
                        onClick={() => openEditModal(assignment)}
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
                        onClick={() => handleDelete(assignment)}
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
              ))}
            </tbody>
          </table>
        )}
      </div>

      <SportRoomFormModal show={showModal} handleClose={closeModal} handleSave={handleSave} selectedAssignment={selectedAssignment} />
    </div>
  )
}

export default SportRoomsPage
