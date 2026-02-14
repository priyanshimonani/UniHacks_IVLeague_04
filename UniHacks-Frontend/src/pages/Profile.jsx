import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, User, LogOut, Settings, MapPin } from "lucide-react";

export default function UserProfile() {

  const userData = {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    memberSince: "January 2025",
    activeQueues: 2,
    totalQueues: 47,
    totalSwaps: 12
  };

  const activeQueues = [
    { id: "1", office: "Central Bank Branch", token: 31, position: 8, time: "~24 mins" },
    { id: "2", office: "University Admin Office", token: 15, position: 3, time: "~9 mins" }
  ];

  const queueHistory = [
    { id: "1", office: "City General Hospital", token: 45, date: "Feb 12, 2026", status: "Completed" },
    { id: "2", office: "DMV Office", token: 78, date: "Feb 10, 2026", status: "Completed" },
    { id: "3", office: "National Bank Express", token: 12, date: "Feb 8, 2026", status: "Completed" }
  ];

  return (
    <div className="min-h-screen pt-16 pb-20 bg-linear-to-br from-yellow-100 via-amber-100 to-orange-100">

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Back Button */}
        <Link to="/">
          <button className="mb-6 flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-12 h-12 text-white" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {userData.name}
          </h1>
          <p className="text-lg text-gray-600">{userData.email}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT COLUMN */}
          <div className="space-y-6">

            {/* Profile Details */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Profile Details
              </h2>

              <div className="space-y-3 text-gray-700">
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <div>{userData.phone}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">Member Since</div>
                  <div>{userData.memberSince}</div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Statistics
              </h2>

              <div className="space-y-4 text-gray-700">
                <div className="flex justify-between">
                  <span>Active Queues</span>
                  <span className="text-xl font-bold text-indigo-600">
                    {userData.activeQueues}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Total Queues</span>
                  <span className="text-xl font-bold text-purple-600">
                    {userData.totalQueues}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Total Swaps</span>
                  <span className="text-xl font-bold text-teal-600">
                    {userData.totalSwaps}
                  </span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <button className="w-full py-3 bg-gray-200 text-gray-800 rounded-full font-medium hover:bg-gray-300 transition flex items-center justify-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>

              <button className="w-full py-3 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition flex items-center justify-center space-x-2">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-2 space-y-6">

            {/* Active Queues */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Active Queues
              </h2>

              <div className="space-y-4">
                {activeQueues.map((queue) => (
                  <div
                    key={queue.id}
                    className="bg-indigo-50 rounded-xl p-6 hover:shadow-md transition"
                  >
                    <div className="flex justify-between mb-4">
                      <h3 className="font-semibold text-gray-800">
                        {queue.office}
                      </h3>
                      <span className="text-sm text-green-600 font-medium">
                        Live
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center mb-4">
                      <div>
                        <div className="text-sm text-gray-500">Token</div>
                        <div className="text-xl font-bold">#{queue.token}</div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-500">Position</div>
                        <div className="text-xl font-bold">{queue.position}</div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-500">Wait</div>
                        <div className="text-lg font-bold">{queue.time}</div>
                      </div>
                    </div>

                    <Link to={`/livequeue/${queue.id}`}>
                      <button className="w-full py-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:scale-105 transition">
                        View Live Queue
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Queue History */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Past Queues
              </h2>

              <div className="space-y-3">
                {queueHistory.map((queue) => (
                  <div
                    key={queue.id}
                    className="flex items-center justify-between p-4 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {queue.office}
                        </h3>
                        <div className="text-sm text-gray-500">
                          Token #{queue.token} • {queue.date}
                        </div>
                      </div>
                    </div>

                    <span className="px-3 py-1 bg-green-500 text-white text-sm rounded-full">
                      {queue.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
