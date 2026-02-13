import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, Clock, Layers, Plus } from "lucide-react";

export default function AdminDashboard() {
  const [data, setData] = useState({
    activeQueues: 0,
    totalWaiting: 0,
    avgServiceTime: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setData(res.data);
    } catch (error) {
      console.error("Dashboard fetch error", error);
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

      {/* Stats Cards */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-10">

        {/* Active Queues */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-4">
            <Layers className="text-green-600" size={28} />
            <span className="text-sm text-gray-500">Active Queues</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">
            {data.activeQueues}
          </h2>
        </div>

        {/* Total Waiting */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-4">
            <Users className="text-green-600" size={28} />
            <span className="text-sm text-gray-500">Total Waiting</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">
            {data.totalWaiting}
          </h2>
        </div>

        {/* Avg Service Time */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-4">
            <Clock className="text-green-600" size={28} />
            <span className="text-sm text-gray-500">Avg Service Time</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">
            {data.avgServiceTime} min
          </h2>
        </div>

      </div>

      {/* Actions */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

        {/* Manage Queues */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-8 shadow-md hover:scale-[1.02] transition cursor-pointer">
          <h3 className="text-xl font-semibold mb-2">Manage Queues</h3>
          <p className="opacity-90">
            Control live queues and call next tokens
          </p>
        </div>

        {/* Add Office */}
        <div className="bg-gradient-to-r from-yellow-400 to-green-400 text-white rounded-2xl p-8 shadow-md hover:scale-[1.02] transition cursor-pointer flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">Add New Office</h3>
            <p className="opacity-90">
              Register a new office location
            </p>
          </div>
          <Plus size={30} />
        </div>

      </div>
    </div>
  );
}
