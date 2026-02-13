import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Users, MapPin, ArrowRight, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { mockOffices } from "../../data/mockData";

/* Light Glass Card */
function GlassCard({ children, className = "" }) {
  return (
    <div className={`bg-white/80 backdrop-blur-md rounded-2xl shadow-lg ${className}`}>
      {children}
    </div>
  );
}

export default function JoinQueue() {
  const { officeId } = useParams();
  const [joined, setJoined] = useState(false);

  const office = mockOffices.find((o) => o.id === officeId);
  const yourToken = office ? office.currentToken + office.queueLength + 1 : 0;

  if (!office) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-yellow-100 via-amber-100 to-orange-100">
        <div className="text-gray-800 text-2xl font-semibold">Office not found</div>
      </div>
    );
  }

  const handleJoinQueue = () => {
    setJoined(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  /* SUCCESS SCREEN */
  if (joined) {
    return (
      <div className="min-h-screen pt-16 bg-linear-to-br from-yellow-100 via-amber-100 to-orange-100">
        <div className="max-w-4xl mx-auto px-4 py-12">

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >

            {/* Success */}
            <div className="text-center mb-8">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                You're In! 🎉
              </h1>
              <p className="text-gray-600">
                Successfully joined the queue
              </p>
            </div>

            {/* Token Card */}
            <GlassCard className="p-8 mb-6">

              <div className="text-center mb-6">
                <div className="text-sm text-gray-600 mb-2">{office.name}</div>
                <div className="text-sm text-gray-500 flex items-center justify-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {office.location}
                </div>
              </div>

              {/* Token Number */}
              <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 text-center text-white mb-8">
                <div className="text-sm uppercase tracking-wide mb-2">
                  Your Token Number
                </div>
                <div className="text-7xl font-bold">#{yourToken}</div>
              </div>

              {/* Queue Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-100 rounded-2xl">
                  <div className="text-sm text-gray-600">Currently Serving</div>
                  <div className="text-2xl font-bold text-gray-800">
                    #{office.currentToken}
                  </div>
                </div>

                <div className="text-center p-4 bg-gray-100 rounded-2xl">
                  <div className="text-sm text-gray-600">People Ahead</div>
                  <div className="text-2xl font-bold text-gray-800">
                    {office.queueLength}
                  </div>
                </div>
              </div>

              {/* Estimated Wait */}
              <div className="text-center p-6 bg-indigo-50 rounded-2xl mb-6">
                <div className="flex items-center justify-center mb-2 text-gray-600">
                  <Clock className="w-5 h-5 mr-2" />
                  Estimated Wait Time
                </div>
                <div className="text-3xl font-bold text-gray-800">
                  ~{office.estimatedWaitTime + 5} mins
                </div>
              </div>

              {/* Button */}
              <Link to={`/queue/${office.id}`}>
                <button className="w-full py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold flex items-center justify-center space-x-2 shadow-lg hover:scale-105 transition">
                  <span>View Live Queue</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>

            </GlassCard>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <GlassCard className="p-4 text-center">
                <Sparkles className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-sm text-gray-600">
                  Token swap available
                </div>
              </GlassCard>

              <GlassCard className="p-4 text-center">
                <Users className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <div className="text-sm text-gray-600">
                  Real-time position tracking
                </div>
              </GlassCard>

              <GlassCard className="p-4 text-center">
                <Clock className="w-8 h-8 text-teal-500 mx-auto mb-2" />
                <div className="text-sm text-gray-600">
                  Smart ETA predictions
                </div>
              </GlassCard>
            </div>

          </motion.div>
        </div>
      </div>
    );
  }

  /* CONFIRM SCREEN */
  return (
    <div className="min-h-screen pt-16 bg-linear-to-br from-yellow-100 via-amber-100 to-orange-100">
      <div className="max-w-4xl mx-auto px-4 py-12">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

          <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Confirm Queue Details
          </h1>

          <GlassCard className="p-8">

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {office.name}
            </h2>

            <div className="space-y-4 mb-8 text-gray-600">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3" />
                {office.location}
              </div>

              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-3" />
                {office.operatingHours}
              </div>

              <div className="flex items-center">
                <Users className="w-5 h-5 mr-3" />
                {office.queueLength} people currently waiting
              </div>
            </div>

            {/* Token Preview */}
            <div className="bg-indigo-50 rounded-2xl p-6 mb-8 text-center">
              <div className="text-sm text-gray-600 mb-2">
                You will receive token number
              </div>
              <div className="text-5xl font-bold text-gray-800 mb-2">
                #{yourToken}
              </div>
              <div className="text-sm text-gray-600">
                Estimated wait: ~{office.estimatedWaitTime + 5} minutes
              </div>
            </div>

            <button
              onClick={handleJoinQueue}
              className="w-full py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:scale-105 transition"
            >
              Confirm & Join Queue
            </button>

          </GlassCard>

        </motion.div>
      </div>
    </div>
  );
}
