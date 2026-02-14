import React, { useState } from "react";
import { ArrowLeft, Repeat, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { Link } from "react-router-dom";

/* Mock Data */

const office = {
  name: "SBI Main Branch",
  location: "MG Road, Ahmedabad"
};

const mockQueueUsers = [
  {
    tokenNumber: 145,
    position: 3,
    swapMessage: "Need to leave early"
  },
  {
    tokenNumber: 146,
    position: 4,
    swapMessage: "Flexible timing"
  }
];

export function TokenSwap() {
  const [acceptedSwap, setAcceptedSwap] = useState(null);

  const yourToken = 148;

  const handleAcceptSwap = (token) => {
    setAcceptedSwap(token);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#feffe0] via-yellow-50 to-orange-50 pt-24 px-6">

      {/* Back Button */}
      <Link to="/joinqueue">
        <button className="mb-6 flex items-center space-x-2 text-gray-700 hover:text-[#10b981]">
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>
      </Link>

      {/* Header */}
      <div className="text-center mb-10">
        <Repeat size={36} className="mx-auto text-[#10b981] mb-2" />
        <h1 className="text-4xl font-bold text-gray-900">
          Token Swap
        </h1>
        <p className="text-gray-500">
          {office.name} • {office.location}
        </p>
      </div>

      {/* Your Token */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6 mb-8 text-center">
        <p className="text-gray-400 text-sm">Your Token</p>
        <h2 className="text-5xl font-bold text-gray-800">#{yourToken}</h2>
      </div>

      {/* Swap List */}
      <div className="max-w-3xl mx-auto space-y-4">
        {mockQueueUsers.map((user) => (
          <div
            key={user.tokenNumber}
            className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-lg">
                Token #{user.tokenNumber}
              </h3>
              <p className="text-gray-500 text-sm">
                Position: {user.position}
              </p>
              <p className="text-gray-600 italic text-sm mt-1">
                "{user.swapMessage}"
              </p>
            </div>

            <button
              onClick={() => handleAcceptSwap(user.tokenNumber)}
              className="bg-[#10b981] hover:bg-emerald-600 text-white px-6 py-2 rounded-xl font-semibold"
            >
              Accept
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {acceptedSwap && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 text-center w-80 shadow-lg">
            <Check size={48} className="mx-auto text-green-600 mb-3" />
            <h2 className="text-xl font-bold">Swap Accepted</h2>
            <p className="text-gray-500 mb-4">
              Your new token: #{acceptedSwap}
            </p>

            <button
              onClick={() => setAcceptedSwap(null)}
              className="bg-[#10b981] text-white px-6 py-2 rounded-lg"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
