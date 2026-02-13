import React, { useState } from 'react'
import axios from "axios"

const SignUp = () => {

  // 🔹 STATE
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // 🔹 HANDLE SIGNUP
  const handleSignup = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          name,
          email,
          password
        }
      )

      alert("Signup successful ✅ Please login")
window.location.href = "/login"


    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <div>
      <div className='flex justify-center split-text-container'>
        <h1 className="title1 mb-4 text-part left mr-2"> Uni </h1>
        <h1 className="title1 mb-4 text-part right text-white!"> Hacks</h1><br/>
      </div>

      <div id='new login'>
        <div className="backgroundlogin">
          <div className="shapelogin"></div>
          <div className="shapelogin"></div>
        </div>

        <form id='loginform'>
          <h3 className='title1'>Sign Up</h3>

          {/* 🔹 NAME */}
          <label>Username</label>
          <input
            type='text'
            placeholder='Username'
            className='container'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* 🔹 EMAIL */}
          <label>Email</label>
          <input
            type='text'
            placeholder='Email'
            className='container'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* 🔹 PASSWORD */}
          <label>Password</label>
          <input
            type='password'
            placeholder='Password'
            className='container'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type='button'
            className='admin-btn'
            onClick={handleSignup}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
