import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"

export function JoinQueue() {

  const [currentToken, setCurrentToken] = useState(142)
  const yourToken = 148
  const [showSwap, setShowSwap] = useState(false)
  const [showLeave, setShowLeave] = useState(false)

  const peopleAhead = Math.max(yourToken - currentToken, 0)
  const estimatedWait = peopleAhead * 3
  const isYourTurn = currentToken >= yourToken

  /* Simulated Queue Movement */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentToken(prev =>
        prev < yourToken ? prev + 1 : prev
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  /* Confetti when turn */
  useEffect(() => {
    if (isYourTurn) {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 }
      })
    }
  }, [isYourTurn])

  /* Progress Calculation */
  const progress =
    ((yourToken - currentToken) / (yourToken - (yourToken - 20))) * 100

  const getStatusMessage = () => {
    if (isYourTurn) return "🎉 It’s your turn! Please proceed."
    if (peopleAhead <= 2) return "⚡ Almost your turn. Please be nearby."
    if (peopleAhead <= 5) return "⏳ You’re getting close."
    return "🕒 Sit back and relax."
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f8c8] via-yellow-100 to-amber-100 pt-24 px-6 relative overflow-hidden">

      {/* Sticky Bar */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xl px-6 py-2 rounded-full shadow-lg z-50 text-sm font-medium"
      >
        Token #{yourToken} | {peopleAhead} ahead | ~{estimatedWait} mins
      </motion.div>

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            SBI Main Branch
          </h1>
          <p className="text-gray-600">
            MG Road, Ahmedabad
          </p>
        </motion.div>

        {/* Token Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={`relative bg-white/80 backdrop-blur-xl rounded-3xl p-12 text-center shadow-2xl mb-12 ${isYourTurn ? "ring-4 ring-[#10b981]" : ""
            }`}
        >

          <div className="text-sm uppercase text-gray-500 mb-4">
            Your Token
          </div>

          <motion.div
            key={currentToken}
            initial={{ rotateX: 90 }}
            animate={{ rotateX: 0 }}
            transition={{ duration: 0.5 }}
            className="text-8xl font-extrabold text-[#10b981]"
          >
            #{yourToken}
          </motion.div>

          {/* Progress Bar */}
          <div className="mt-10 max-w-xl mx-auto">
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${100 - progress}%` }}
                transition={{ duration: 0.8 }}
                className="h-full bg-[#10b981]"
              />
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Queue Progress
            </div>
          </div>

        </motion.div>

        {/* Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-xl font-semibold text-gray-800 mb-12"
        >
          {getStatusMessage()}
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">

          {[
            { label: "Currently Serving", value: currentToken },
            { label: "People Ahead", value: peopleAhead },
            { label: "Estimated Wait", value: `~${estimatedWait} mins` }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition"
            >
              <div className="text-sm text-gray-500 mb-2">
                {item.label}
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {item.value}
              </div>
            </motion.div>
          ))}

        </div>

        {/* Buttons (Smaller + Cleaner) */}
        <div className="flex justify-center gap-6">

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSwap(true)}
            className="px-6 py-2 bg-[#10b981] text-white rounded-full font-medium shadow-md mb-5"
          >
            Request Swap
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowLeave(true)}
            className="px-6 py-2 bg-red-500 text-white rounded-full font-medium shadow-md mb-5"
          >
            Leave Queue
          </motion.button>

        </div>

      </div>

      {/* Swap Modal */}
      {showSwap && (
        <div className="modal-overlay">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="modal-card"
          >
            <h2 className="text-xl font-bold mb-4">
              Request Token Swap
            </h2>

            <textarea
              placeholder="Add a message"
              className="w-full p-3 border rounded-lg mb-4"
            />

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowSwap(false)}
                className="px-4 py-2 border rounded-full"
              >
                Cancel
              </button>

              <button className="px-4 py-2 bg-[#10b981] text-white rounded-full">
                Send
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Leave Modal */}
      {showLeave && (
        <div className="modal-overlay">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="modal-card text-center"
          >
            <h2 className="text-xl font-bold mb-4">
              Leave Queue?
            </h2>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowLeave(false)}
                className="px-4 py-2 border rounded-full"
              >
                Cancel
              </button>

              <button className="px-4 py-2 bg-red-500 text-white rounded-full">
                Confirm
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.3);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
        }

        .modal-card {
          background: white;
          border-radius: 1.5rem;
          padding: 2rem;
          width: 90%;
          max-width: 400px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        }
      `}</style>

    </div>
  )
}
