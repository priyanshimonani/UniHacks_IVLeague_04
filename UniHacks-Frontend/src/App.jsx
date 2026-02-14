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
import Navbar from "./components/Navbar"
import AdminDashboard from "./pages/Admin-Dashboard"
import Notifications from "./pages/Notifications"
import { TokenSwap } from "./pages/User-TokenSwap"


function Layout() {

  return (
    <>
      <div className="bg"></div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signupadmin" element={<SignUpAdmin />} />
        <Route path="/loginadmin" element={<LoginAdmin />} />
        <Route path="/search" element={<Search />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/notifications" element={<Notifications />} />
         <Route path="/joinqueue" element={<JoinQueue />} />
         <Route path="/tokenswap" element={<TokenSwap />} />
         <Route path="/admindashboard" element={<AdminDashboard />} />

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
