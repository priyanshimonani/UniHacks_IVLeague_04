// import React from "react"
// import { jwtDecode } from "jwt-decode"

// const Dashboard = () => {

//   const token = localStorage.getItem("token")

//   if (!token) {
//     return (
//       <div style={{ color: "white", textAlign: "center", marginTop: "100px" }}>
//         <h1>Please Login First 🔐</h1>
//       </div>
//     )
//   }

//   const decoded = jwtDecode(token)
//   const username = decoded.name

//   return (
//     <div style={{ color: "white", textAlign: "center", marginTop: "100px" }}>
//       <h1>Welcome, {username} </h1>

//       <button 
//         onClick={() => {
//           localStorage.removeItem("token")
//           window.location.href = "/login"
//         }}
//         style={{ marginTop: "20px" }}
//       >
//         Logout
//       </button>
//     </div>
//   )
// }

// export default Dashboard

import React from "react"

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-amber-100 to-orange-100 text-gray-800">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white/60 backdrop-blur-lg shadow-sm sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-indigo-600">QueueNest</h1>

        <div className="flex gap-8 font-medium">
          <button className="hover:text-indigo-600 transition">Home</button>
          <button className="hover:text-indigo-600 transition">Features</button>
          <button className="hover:text-indigo-600 transition">About</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center px-6 py-24 max-w-4xl mx-auto">
        <h1 className="text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
          QueueNest
        </h1>

        <p className="text-2xl text-indigo-600 font-medium mb-4">
          Wait Smart. Not Long.
        </p>

        <p className="text-gray-600 mb-10 leading-relaxed">
          Skip the physical line. Join virtual queues for banks, hospitals,
          colleges, and government offices. Get real-time updates and smart
          token swap features.
        </p>

        <div className="flex justify-center gap-6">
          <button className="bg-indigo-600 text-white px-7 py-3 rounded-full font-semibold shadow-lg hover:bg-indigo-700 hover:scale-105 transition">
            Join Queue →
          </button>

          <button className="border border-indigo-600 text-indigo-600 px-7 py-3 rounded-full font-semibold hover:bg-indigo-600 hover:text-white transition">
            View Dashboard
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="px-8 pb-24 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Powerful Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {[
            {
              title: "Real-time Updates",
              desc: "Track your position with live updates and accurate wait predictions."
            },
            {
              title: "Smart Queue",
              desc: "Optimized queue handling for faster and fair service."
            },
            {
              title: "Token Swap",
              desc: "Exchange positions securely with consent."
            },
            {
              title: "Multiple Venues",
              desc: "Banks, hospitals, colleges, and government offices."
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300"
            >
              <h3 className="font-semibold text-lg mb-3 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-8 pb-24 max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl p-10 grid md:grid-cols-3 gap-8 text-center shadow-lg">

          <div>
            <h2 className="text-4xl font-bold text-indigo-600">10,000+</h2>
            <p className="text-gray-500">Active Users</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-purple-600">500+</h2>
            <p className="text-gray-500">Partner Offices</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-teal-600">45 min</h2>
            <p className="text-gray-500">Average Time Saved</p>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center pb-24 px-6">
        <div className="bg-indigo-600 text-white rounded-3xl py-12 px-6 max-w-3xl mx-auto shadow-xl">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Skip the Queue?
          </h2>
          <p className="opacity-90 mb-6">
            Join thousands of users saving time every day.
          </p>
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:scale-105 transition">
            Get Started
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center pb-6 text-gray-500">
        © 2025 QueueNest. All rights reserved.
      </footer>

    </div>
  )
}

export default Dashboard
