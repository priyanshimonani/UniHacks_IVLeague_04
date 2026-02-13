import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import SignUpAdmin from "./pages/SignUpAdmin"
import LoginAdmin from "./pages/LoginAdmin"
import Search from "./pages/Search"

function Layout() {

  return (
    <>
      <div className="bg"></div>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signupadmin" element={<SignUpAdmin />} />
        <Route path="/loginadmin" element={<LoginAdmin />} />
        <Route path="/search" element={<Search />} />

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
