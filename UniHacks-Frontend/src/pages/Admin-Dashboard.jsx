import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, Clock, Layers, Plus, Play, Pause } from "lucide-react";

export default function AdminDashboard() {
  const [data, setData] = useState({
    activeQueues: 0,
    totalWaiting: 0,
    avgServiceTime: 0,
  });

  const [paused, setPaused] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/dashboard",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setData(res.data);
    } catch (error) {
      console.error("Dashboard fetch error", error);
    }
  };

  // CALL NEXT TOKEN
  const handleCallNext = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/admin/call-next",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Next token called");
      fetchDashboard();
    } catch (error) {
      console.error(error);
      alert("Failed to call next token");
    }
  };

  // PAUSE OR RESUME QUEUE
  const handlePauseQueue = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/admin/pause",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPaused(!paused);
      alert(paused ? "Queue resumed" : "Queue paused");
    } catch (error) {
      console.error(error);
      alert("Failed to toggle pause");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-yellow-50 to-green-100 px-6 py-10">

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-4xl font-bold text-green-700">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Manage queues and offices easily
        </p>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between mb-4">
            <Layers className="text-green-600" />
            <span className="text-sm text-gray-500">Active Queues</span>
          </div>
          <h2 className="text-3xl font-bold">{data.activeQueues}</h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between mb-4">
            <Users className="text-green-600" />
            <span className="text-sm text-gray-500">Total Waiting</span>
          </div>
          <h2 className="text-3xl font-bold">{data.totalWaiting}</h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between mb-4">
            <Clock className="text-green-600" />
            <span className="text-sm text-gray-500">Avg Service Time</span>
          </div>
          <h2 className="text-3xl font-bold">{data.avgServiceTime} min</h2>
        </div>

      </div>

      {/* Queue Controls */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-6 mb-10">

        <h2 className="text-xl font-semibold mb-6 text-gray-700">
          Queue Controls
        </h2>

        <div className="flex flex-wrap gap-4">

          {/* Call Next */}
          <button
            onClick={handleCallNext}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"
          >
            <Play size={18} />
            Call Next
          </button>

          {/* Pause Queue */}
          <button
            onClick={handlePauseQueue}
            className="flex items-center gap-2 bg-yellow-500 text-white px-6 py-3 rounded-xl hover:bg-yellow-600 transition"
          >
            <Pause size={18} />
            {paused ? "Resume Queue" : "Pause Queue"}
          </button>

        </div>
      </div>

      {/* Actions */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-8 shadow-md hover:scale-[1.02] transition cursor-pointer">
          <h3 className="text-xl font-semibold mb-2">Manage Queues</h3>
          <p>Control live queues and call next tokens</p>
        </div>

        <div className="bg-gradient-to-r from-yellow-400 to-green-400 text-white rounded-2xl p-8 shadow-md hover:scale-[1.02] transition cursor-pointer flex justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">Add New Office</h3>
            <p>Register a new office location</p>
          </div>
          <Plus size={30} />
        </div>

      </div>
    </div>
  );
}
