// Left panel shared by Login and Register
function AuthLeftPanel() {
  const stats = [
    ["1.2k", "Socios activos"],
    ["48",   "Coaches"],
    ["120+", "Clases / mes"],
  ]

  return (
    <div
      className="col-md-5 d-flex flex-column justify-content-between p-4"
      style={{ background: "#0f1c14", minHeight: "520px" }}
    >
      <div>
        <div className="d-flex align-items-center gap-2 mb-4">
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ width: "42px", height: "42px", background: "#3cd16f", borderRadius: "10px", fontSize: "22px" }}
          >
            ⚽
          </div>
          <span className="fw-medium fs-5" style={{ color: "#f0f5f1" }}>SportClub</span>
        </div>
        <p style={{ color: "#5a9e6f", fontSize: "13px" }}>Sistema de gestión deportiva</p>
      </div>

      <div className="d-flex gap-4">
        {stats.map(([val, lbl]) => (
          <div key={lbl}>
            <div className="fw-medium" style={{ color: "#3cd16f", fontSize: "22px" }}>{val}</div>
            <div style={{ color: "#5a9e6f", fontSize: "11px" }}>{lbl}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AuthLeftPanel
