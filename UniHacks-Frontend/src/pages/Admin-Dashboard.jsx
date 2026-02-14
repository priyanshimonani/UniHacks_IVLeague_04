import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, Clock, Layers, Plus, Play, Pause, Settings } from "lucide-react";

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
    <div className="min-h-screen pt-24 pb-20 bg-linear-to-br from-[#feffe0] via-yellow-50 to-orange-50 relative overflow-hidden font-sans text-gray-800">

      {/* Background Blobs */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob -z-10"></div>
      <div className="fixed top-0 right-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000 -z-10"></div>
      <div className="fixed -bottom-32 left-20 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000 -z-10"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-[#10b981] text-xs font-bold uppercase tracking-wide mb-3">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
              Live System Status
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              Admin Workspace
            </h1>
            <p className="text-gray-500 font-medium mt-2 text-lg">
              Manage queues, call tokens, and monitor venue traffic.
            </p>
          </div>
          
          <div className="flex gap-3">
             <button className="p-3 bg-white/60 backdrop-blur-md border border-white/60 text-gray-600 rounded-xl shadow-sm hover:shadow-md hover:text-[#10b981] transition-all">
                <Settings className="w-5 h-5" />
             </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-14 h-14 bg-emerald-100 text-[#10b981] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Layers className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active</span>
            </div>
            <div className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-1">Active Queues</div>
            <h2 className="text-5xl font-black text-gray-800">{data.activeQueues}</h2>
          </div>

          <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-14 h-14 bg-indigo-100 text-indigo-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Waiting</span>
            </div>
            <div className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-1">Total Waiting</div>
            <h2 className="text-5xl font-black text-gray-800">{data.totalWaiting}</h2>
          </div>

          <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-14 h-14 bg-amber-100 text-amber-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Clock className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Time</span>
            </div>
            <div className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-1">Avg Service Time</div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-5xl font-black text-gray-800">{data.avgServiceTime}</h2>
              <span className="text-lg font-bold text-gray-400">min</span>
            </div>
          </div>

        </div>

        {/* Queue Controls */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[2rem] p-8 shadow-xl mb-10">
          
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#10b981] rounded-full"></span>
            Queue Controls
          </h2>

          <div className="flex flex-col sm:flex-row gap-4">
            
            {/* Call Next Button */}
            <button
              onClick={handleCallNext}
              className="flex-1 group relative overflow-hidden bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-gray-900/20 hover:bg-[#10b981] hover:shadow-emerald-500/30 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Play className="w-6 h-6 relative z-10 fill-current" />
              <span className="relative z-10">Call Next Token</span>
            </button>

            {/* Pause Queue Button */}
            <button
              onClick={handlePauseQueue}
              className={`flex-1 px-8 py-4 rounded-2xl font-bold text-lg shadow-sm border-2 transition-all duration-300 flex items-center justify-center gap-3 ${
                paused 
                  ? "bg-amber-500 text-white border-amber-500 hover:bg-amber-600 shadow-amber-500/30" 
                  : "bg-white text-amber-600 border-amber-200 hover:bg-amber-50 hover:border-amber-300"
              }`}
            >
              {paused ? (
                <>
                  <Play className="w-6 h-6" /> Resume Queue
                </>
              ) : (
                <>
                  <Pause className="w-6 h-6" /> Pause Queue
                </>
              )}
            </button>

          </div>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6">

          <div className="group bg-gradient-to-br from-[#10b981] to-emerald-500 text-white rounded-[2rem] p-8 shadow-xl shadow-emerald-500/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6">
                 <Layers className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Manage Queues</h3>
              <p className="text-emerald-50 font-medium">Control live queues, edit details, and oversee daily venue operations.</p>
            </div>
          </div>

          <div className="group bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-[2rem] p-8 shadow-xl shadow-gray-900/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gray-900/30 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl -mr-10 -mb-10 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6">
                   <Plus className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Add New Office</h3>
                <p className="text-gray-400 font-medium">Register a new office, bank, or hospital branch to the network.</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}