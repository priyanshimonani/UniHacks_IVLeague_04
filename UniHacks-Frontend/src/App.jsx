import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import SignUpAdmin from "./pages/SignUpAdmin"
import LoginAdmin from "./pages/LoginAdmin"
import Search from "./pages/Search"
import { JoinQueue } from "./pages/User-JoinQueue"
<<<<<<< HEAD
=======
import Navbar from "./components/Navbar"
import AdminDashboard from "./pages/Admin-Dashboard"
>>>>>>> c9d8636431c27a817f9a6728788431eada3ebad7

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
<<<<<<< HEAD
         <Route path="/search" element={<Search />} />
=======
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
         <Route path="/joinqueue" element={<JoinQueue />} />
         <Route path="/admindashboard" element={<AdminDashboard />} />
>>>>>>> c9d8636431c27a817f9a6728788431eada3ebad7

        {/* 🔐 PROTECTED ROUTE */}
        {/* <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        /> */}

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
