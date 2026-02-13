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

import React, { useState } from "react"
import { jwtDecode } from "jwt-decode"

const Dashboard = () => {

  const token = localStorage.getItem("token")

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-100">
        <h1 className="text-2xl font-semibold text-gray-700">
          Please Login First 🔐
        </h1>
      </div>
    )
  }

  const decoded = jwtDecode(token)
  const username = decoded.name

  const [queues, setQueues] = useState([
    { id: 1, name: "Bank Counter A", currentToken: 12, waitingTokens: [13, 14, 15] },
    { id: 2, name: "Document Verification", currentToken: 5, waitingTokens: [6, 7] }
  ])

  const nextToken = (queueId) => {
    setQueues(prevQueues =>
      prevQueues.map(queue => {
        if (queue.id === queueId && queue.waitingTokens.length > 0) {
          return {
            ...queue,
            currentToken: queue.waitingTokens[0],
            waitingTokens: queue.waitingTokens.slice(1)
          }
        }
        return queue
      })
    )
  }

  return (
    <div className="min-h-screen bg-yellow-100 p-6">

      {/* Header */}
      <div className="bg-white shadow-md rounded-xl p-5 flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-gray-800">
          Welcome, {username}
        </h1>

        <button
          onClick={() => {
            localStorage.removeItem("token")
            window.location.href = "/login"
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>

      {/* Section Title */}
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Active Queues
      </h2>

      {/* Queue Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {queues.map(queue => (
          <div
            key={queue.id}
            className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {queue.name}
            </h3>

            <p className="text-gray-600">
              <span className="font-semibold">Current Token:</span> {queue.currentToken}
            </p>

            <p className="text-gray-600 mt-1">
              <span className="font-semibold">Waiting:</span>{" "}
              {queue.waitingTokens.join(", ") || "None"}
            </p>

            <button
              onClick={() => nextToken(queue.id)}
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition"
            >
              Call Next Token
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
