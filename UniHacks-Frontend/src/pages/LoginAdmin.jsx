import React, { useState } from 'react'
import axios from "axios"

const Login = () => {

  // 🔹 STATE
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // 🔹 HANDLE LOGIN
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/loginadmin",
        {
          email,
          password
        }
      )

      localStorage.setItem("token", res.data.token)
window.location.href = "/"

      // Optional redirect
      // window.location.href = "/dashboard"

    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials")
    }
  }

  return (
    <div className='mr-2 ml-2'>
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
          <h3 className='title1'>Login</h3>

          <label>Email</label>
          <input
            type='text'
            placeholder='Email'
            className='container'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

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
            onClick={handleLogin}
          >
            Login
          </button>

          <label>
            To add organisation Click <a href='/SignupAdmin'><u>here</u></a>
          </label>
        </form>
      </div>
    </div>
  )
}

export default Login
