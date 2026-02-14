import React, { useState } from "react";
import { Repeat, Check, X, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

/* ---------------- MOCK DATA ---------------- */

const yourToken = 31;
const swapsRemaining = 1;

const openSwapRequests = [
  {
    id: "1",
    name: "David Lee",
    token: 29,
    message: "Need to leave early for appointment",
    positionDiff: 2,
    time: "5 mins ago",
  },
  {
    id: "2",
    name: "Aisha Khan",
    token: 30,
    message: "Can come back in 30 mins",
    positionDiff: 1,
    time: "2 mins ago",
  }
];

const yourRequests = [
  {
    id: "3",
    name: "Rahul",
    token: 27,
    status: "Pending"
  }
];

/* ---------------- COMPONENT ---------------- */

export function TokenSwap() {

  const [activeTab, setActiveTab] = useState("open");
  const [acceptedSwap, setAcceptedSwap] = useState(null);

  const handleAccept = (token) => {
    setAcceptedSwap(token);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#feffe0] via-yellow-50 to-green-100 pt-24 px-6 text-gray-800">

      {/* Header */}
      <div className="text-center mb-10">
        <Repeat size={40} className="mx-auto mb-3 text-[#10b981]" />
        <h1 className="text-4xl font-bold text-gray-900">Token Swap</h1>
        <p className="text-gray-500">
          Exchange positions with consent and transparency
        </p>
      </div>

      {/* Token Card */}
      <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur border border-white rounded-3xl p-6 mb-8 flex justify-between items-center shadow-md">

        <div>
          <p className="text-gray-500 text-sm">Your Current Token</p>
          <h2 className="text-4xl font-bold text-gray-900">#{yourToken}</h2>
        </div>

        <div className="text-right">
          <p className="flex items-center gap-2 text-sm text-gray-500">
            <Sparkles size={16}/> Swaps Remaining Today
          </p>
          <div className="mt-2 bg-[#10b981] text-white w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold">
            {swapsRemaining}
          </div>
        </div>

      </div>

      {/* Tabs */}
      <div className="max-w-5xl mx-auto flex gap-4 mb-8">

        <button
          onClick={() => setActiveTab("open")}
          className={`flex-1 py-3 rounded-2xl font-semibold transition ${
            activeTab === "open"
              ? "bg-white shadow"
              : "bg-white/60 hover:bg-white"
          }`}
        >
          Open Swap Requests
        </button>

        <button
          onClick={() => setActiveTab("your")}
          className={`flex-1 py-3 rounded-2xl font-semibold transition relative ${
            activeTab === "your"
              ? "bg-white shadow"
              : "bg-white/60 hover:bg-white"
          }`}
        >
          Your Requests
          {yourRequests.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 w-6 h-6 rounded-full text-xs text-white flex items-center justify-center">
              {yourRequests.length}
            </span>
          )}
        </button>

      </div>

      {/* OPEN REQUESTS */}
      {activeTab === "open" && (
        <div className="max-w-5xl mx-auto space-y-4">

          {openSwapRequests.map((req) => (
            <div
              key={req.id}
              className="bg-white/70 backdrop-blur border border-white rounded-3xl p-6 flex justify-between items-center shadow-sm hover:shadow-md transition"
            >

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold">{req.name}</h3>
                  <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                    PENDING
                  </span>
                </div>

                <p className="text-sm text-gray-500">
                  Token #{req.token} → Your Token #{yourToken}
                </p>

                <p className="text-sm text-gray-500">
                  Position change: {req.positionDiff} places forward
                </p>

                <p className="text-sm text-gray-400">{req.time}</p>

                <div className="bg-gray-100 rounded-xl px-4 py-2 mt-3 italic text-sm">
                  "{req.message}"
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleAccept(req.token)}
                  className="bg-[#10b981] hover:bg-emerald-600 text-white px-5 py-2 rounded-xl flex items-center gap-2"
                >
                  <Check size={16}/> Accept
                </button>

                <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl flex items-center gap-2">
                  <X size={16}/> Decline
                </button>
              </div>

            </div>
          ))}

        </div>
      )}

      {/* YOUR REQUESTS */}
      {activeTab === "your" && (
        <div className="max-w-5xl mx-auto space-y-4">

          {yourRequests.map((req) => (
            <div
              key={req.id}
              className="bg-white/70 backdrop-blur border border-white rounded-3xl p-6 flex justify-between items-center shadow-sm"
            >
              <div>
                <h3 className="font-semibold text-lg">
                  Request sent to Token #{req.token}
                </h3>
                <p className="text-sm text-gray-500">
                  Status: {req.status}
                </p>
              </div>

              <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs">
                Pending
              </span>
            </div>
          ))}

        </div>
      )}

      {/* Success Modal */}
      {acceptedSwap && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 text-center w-80 shadow-xl">
            <Check size={50} className="mx-auto text-[#10b981] mb-3" />
            <h2 className="text-xl font-bold">Swap Accepted</h2>
            <p className="text-gray-500 mb-4">
              Your new token: #{acceptedSwap}
            </p>

            <button
              onClick={() => setAcceptedSwap(null)}
              className="bg-[#10b981] text-white px-6 py-2 rounded-lg hover:bg-emerald-600"
            >
              Continue
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
