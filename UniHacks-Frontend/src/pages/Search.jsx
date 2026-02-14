import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [offices, setOffices] = useState([]);

  // ✅ Dummy Data (All Mumbai + Tags AddState Bank of Indiaed)
  const dummyOffices = [
    { _id: "1", name: "SBI Main Branch", location: "Mumbai", tags: ["bank"], queueLength: 12, estimatedWaitTime: 25, currentToken: 104 },
    { _id: "2", name: "HDFC Bank Branch", location: "Mumbai", tags: ["bank"], queueLength: 8, estimatedWaitTime: 18, currentToken: 56 },
    { _id: "3", name: "ICICI Bank", location: "Mumbai", tags: ["bank"], queueLength: 15, estimatedWaitTime: 30, currentToken: 89 },
    { _id: "4", name: "City Care Hospital", location: "Mumbai", tags: ["hospital", "healthcare"], queueLength: 20, estimatedWaitTime: 40, currentToken: 210 },
    { _id: "5", name: "Apollo Clinic", location: "Mumbai", tags: ["hospital", "clinic"], queueLength: 6, estimatedWaitTime: 12, currentToken: 23 },
    { _id: "6", name: "Lilavati Hospital", location: "Mumbai", tags: ["hospital"], queueLength: 18, estimatedWaitTime: 35, currentToken: 145 },
    { _id: "7", name: "Passport Office Mumbai", location: "Mumbai", tags: ["government"], queueLength: 9, estimatedWaitTime: 20, currentToken: 72 },
    { _id: "8", name: "Municipal Corporation Office", location: "Mumbai", tags: ["government"], queueLength: 5, estimatedWaitTime: 10, currentToken: 34 },
    { _id: "9", name: "Income Tax Office", location: "Mumbai", tags: ["government"], queueLength: 14, estimatedWaitTime: 28, currentToken: 101 },
    { _id: "10", name: "RTO Mumbai Central", location: "Mumbai", tags: ["government", "transport"], queueLength: 10, estimatedWaitTime: 22, currentToken: 67 },
    { _id: "11", name: "Mumbai University", location: "Mumbai", tags: ["education", "college"], queueLength: 7, estimatedWaitTime: 15, currentToken: 48 },
    { _id: "12", name: "Government Engineering College", location: "Mumbai", tags: ["education", "college"], queueLength: 11, estimatedWaitTime: 24, currentToken: 76 },
    { _id: "13", name: "Central Library Mumbai", location: "Mumbai", tags: ["education", "library"], queueLength: 4, estimatedWaitTime: 8, currentToken: 12 },
    { _id: "14", name: "Police Station Andheri", location: "Mumbai", tags: ["government", "police"], queueLength: 3, estimatedWaitTime: 6, currentToken: 9 },
    { _id: "15", name: "Electricity Board Office", location: "Mumbai", tags: ["government", "utilities"], queueLength: 16, estimatedWaitTime: 32, currentToken: 120 },
    { _id: "16", name: "Water Supply Department", location: "Mumbai", tags: ["government", "utilities"], queueLength: 13, estimatedWaitTime: 27, currentToken: 88 },
    { _id: "17", name: "LIC Branch Mumbai", location: "Mumbai", tags: ["insurance"], queueLength: 6, estimatedWaitTime: 14, currentToken: 41 },
    { _id: "18", name: "Urban Health Center", location: "Mumbai", tags: ["hospital", "healthcare"], queueLength: 21, estimatedWaitTime: 45, currentToken: 167 },
    { _id: "19", name: "Post Office Bandra", location: "Mumbai", tags: ["government"], queueLength: 5, estimatedWaitTime: 9, currentToken: 19 },
    { _id: "20", name: "District Education Office", location: "Mumbai", tags: ["education", "government"], queueLength: 17, estimatedWaitTime: 33, currentToken: 132 }
  ];

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/offices");
        const data = await res.json();

        if (data && data.length > 0) {
          setOffices(data);
        } else {
          setOffices(dummyOffices);
        }
      } catch (err) {
        console.error("Error fetching offices:", err);
        setOffices(dummyOffices);
      }
    };

    fetchOffices();
  }, []);

  const filteredOffices = offices.filter((office) =>
    office.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    office.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    office.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#feffe0] via-yellow-50 to-orange-50 text-gray-800 relative   overflow-x-hidden flex flex-col">

      {/* Background Blobs */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob -z-10"></div>
      <div className="fixed top-0 right-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000 -z-10"></div>

      <div className="container mx-auto mt-30 px-4 py-16 md:py-24 max-w-7xl relative z-10 flex flex-col items-center">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center w-full mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4 text-gray-900">
            Find Your <span className="text-[#10b981]">Queue</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
            Search for banks, hospitals, colleges, and government offices below.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-3xl mb-16"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-300"></div>

            <div className="relative flex items-center bg-white/90 backdrop-blur-md border border-white rounded-full shadow-xl p-2 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#10b981]/50">
              <span className="pl-6 text-gray-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search office name, tag or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-4 text-lg text-gray-700 bg-transparent border-none outline-none focus:ring-0 placeholder-gray-400"
              />
              <button className="bg-[#10b981] text-white px-8 py-3 rounded-full font-bold shadow-md hover:bg-emerald-600 hover:shadow-lg transition-all active:scale-95">
                Search
              </button>
            </div>
          </div>
        </motion.div>

        {/* Grid Container */}
        <motion.div layout className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
          <AnimatePresence>
            {filteredOffices.map((office) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                key={office._id}
                className="group flex flex-col bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(16,185,129,0.15)] hover:-translate-y-1 hover:border-[#10b981]/30 transition-all duration-300"
              >
                {/* Card Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-[#10b981] transition-colors line-clamp-1">
                      {office.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      <p className="text-sm text-gray-500 font-medium flex items-center">
                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        {office.location}
                      </p>
                      <span className="text-gray-300">•</span>
                      {/* Show first tag */}
                      {office.tags && office.tags[0] && (
                        <span className="px-2.5 py-0.5 bg-emerald-100/70 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded-md border border-emerald-200">
                          {office.tags[0]}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-white/50 border border-white p-3 rounded-2xl text-center shadow-sm">
                    <span className="block text-xs text-gray-400 uppercase font-bold tracking-wider mb-0.5">Queue Size</span>
                    <strong className="text-xl text-gray-800">{office.queueLength}</strong>
                  </div>
                  <div className="bg-white/50 border border-white p-3 rounded-2xl text-center shadow-sm">
                    <span className="block text-xs text-gray-400 uppercase font-bold tracking-wider mb-0.5">Est. Wait</span>
                    <strong className="text-xl text-[#10b981]">~{office.estimatedWaitTime} <span className="text-sm">m</span></strong>
                  </div>
                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 p-3 rounded-2xl text-center col-span-2 flex justify-between items-center px-6">
                    <span className="text-xs text-indigo-400 uppercase font-bold tracking-wider">Serving Token</span>
                    <strong className="text-xl font-black text-indigo-600">#{office.currentToken}</strong>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-auto">
                  <button
                    onClick={() => {
                      const token = localStorage.getItem("token");
                      if (token) {
                        window.location.href = "/joinqueue";
                      } else {
                        window.location.href = "/login";
                      }
                    }}
                    className="w-full py-3.5 rounded-xl bg-gray-900 text-white font-bold text-lg shadow-lg shadow-gray-900/20 group-hover:bg-[#10b981] group-hover:shadow-emerald-500/30 transition-all duration-300 active:scale-[0.98]">
                    Join Queue
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        <AnimatePresence>
          {filteredOffices.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center mt-12 w-full max-w-md mx-auto bg-white/50 backdrop-blur-md rounded-3xl p-8 border border-white/60 shadow-lg"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                🔍
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">No offices found</h2>
              <p className="text-gray-500">
                We couldn't find anything matching <span className="font-semibold text-gray-700">"{searchQuery}"</span>.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

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
      `}</style>
    </div>
  );
};

export default Search;