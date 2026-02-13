import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"

function Layout() {

  return (
    <>
      <div className="bg"></div>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* 🔐 PROTECTED ROUTE */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default App
