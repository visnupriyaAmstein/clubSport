
function AuthInput({ label, icon, rightElement, ...inputProps }) {
  return (
    <div className="mb-3">
      {label && (
        <label
          className="form-label"
          style={{ fontSize: "12px", fontWeight: "500", color: "#6c757d", letterSpacing: "0.3px" }}
        >
          {label}
        </label>
      )}
      <div className="input-group">
        <span className="input-group-text" style={{ background: "#f8f9fa" }}>
          {icon}
        </span>
        <input className="form-control" style={{ fontSize: "14px" }} {...inputProps} />
        {rightElement && rightElement}
      </div>
    </div>
  )
}

export default AuthInput
