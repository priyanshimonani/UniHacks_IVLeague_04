import React from "react"
import { jwtDecode } from "jwt-decode"

const Dashboard = () => {

  const token = localStorage.getItem("token")

  if (!token) {
    return (
      <div style={{ color: "white", textAlign: "center", marginTop: "100px" }}>
        <h1>Please Login First 🔐</h1>
      </div>
    )
  }

  const decoded = jwtDecode(token)
  const username = decoded.name

  return (
    <div style={{ color: "white", textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome, {username} </h1>

      <button 
        onClick={() => {
          localStorage.removeItem("token")
          window.location.href = "/login"
        }}
        style={{ marginTop: "20px" }}
      >
        Logout
      </button>
    </div>
  )
}

export default Dashboard
