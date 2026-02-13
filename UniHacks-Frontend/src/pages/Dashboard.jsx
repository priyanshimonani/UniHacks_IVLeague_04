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
    <div className="min-h-screen bg-gradient-to-br from-[#f7f8c8] via-yellow-100 to-amber-100 text-gray-800 overflow-hidden">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-5 bg-white/50 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all">
        <h1 className="text-2xl font-bold text-[#10b981] tracking-wide">
          QueueNest
        </h1>

        <div className="flex gap-8 font-medium">
          <button className="hover:text-[#10b981] transition">Home</button>
          <button className="hover:text-[#10b981] transition">Features</button>
          <button className="hover:text-[#10b981] transition">About</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center px-6 py-32 max-w-5xl mx-auto animate-fadeIn">
        
        <h1 className="title1 text-6xl font-extrabold mb-6 tracking-tight text-gray-900 animate-slideUp">
          QueueNest
        </h1>

        <p className="text-2xl text-[#10b981] font-semibold mb-4 animate-fadeInDelay">
          Wait Smart. Not Long.
        </p>

        <p className="text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
          Join virtual queues for banks, hospitals, colleges, and government
          offices. Track live token updates, request swaps securely,
          and experience modern queue management.
        </p>

        <div className="flex justify-center gap-6">
          <button className="bg-[#10b981] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-2xl hover:scale-110 transition duration-300">
            Join Queue →
          </button>

          <button className="border border-[#10b981] text-[#10b981] px-8 py-3 rounded-full font-semibold hover:bg-[#10b981] hover:text-white transition duration-300">
            View Dashboard
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="px-10 pb-28 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">
          Powerful Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {[
            {
              title: "Real-time Updates",
              desc: "Live queue tracking with accurate wait time prediction."
            },
            {
              title: "Smart Queue",
              desc: "Optimized digital queue flow for better efficiency."
            },
            {
              title: "Token Swap",
              desc: "Secure, transparent position exchange system."
            },
            {
              title: "Multiple Venues",
              desc: "Banks, hospitals, colleges and public offices."
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-3 transition duration-300"
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
      <section className="px-8 pb-28 max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl p-12 grid md:grid-cols-3 gap-10 text-center shadow-xl">

          <div>
            <h2 className="text-4xl font-bold text-[#10b981]">10,000+</h2>
            <p className="text-gray-500">Active Users</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-emerald-500">500+</h2>
            <p className="text-gray-500">Partner Offices</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-green-600">45 min</h2>
            <p className="text-gray-500">Average Time Saved</p>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center pb-28 px-6">
        <div className="bg-[#10b981] text-white rounded-3xl py-14 px-10 max-w-3xl mx-auto shadow-2xl hover:scale-105 transition duration-300">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Skip the Queue?
          </h2>
          <p className="opacity-90 mb-6">
            Join thousands saving time every day.
          </p>
          <button className="bg-white text-[#10b981] px-8 py-3 rounded-full font-semibold hover:scale-110 transition">
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
