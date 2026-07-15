function AuthSubmitButton({ loading, label, loadingLabel }) {
  return (
    <button
      type="submit"
      className="btn w-100 fw-medium d-flex align-items-center justify-content-center gap-2"
      disabled={loading}
      style={{
        background: "#3cd16f",
        color: "#0a110c",
        borderRadius: "8px",
        height: "42px",
        fontSize: "14px",
        border: "none",
      }}
    >
      {loading ? loadingLabel : label}
    </button>
  )
}

export default AuthSubmitButton
