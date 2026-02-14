import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [offices, setOffices] = useState([]);

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/offices");
        const data = await res.json();
        setOffices(data);
      } catch (err) {
        console.error("Error fetching offices:", err);
      }
    };

    fetchOffices();
  }, []);

  const filteredOffices = offices.filter((office) =>
    office.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    office.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    // MAIN PAGE CONTAINER: Full height, gradient background, vertical layout
    <div className="min-h-screen w-full bg-gradient-to-br from-[#feffe0] via-yellow-50 to-orange-50 text-gray-800 relative overflow-x-hidden flex flex-col">
      
      {/* Background Blobs (Decoration) */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob -z-10"></div>
      <div className="fixed top-0 right-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000 -z-10"></div>

      {/* CONTENT CONTAINER: Centered with padding */}
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-7xl relative z-10 flex flex-col items-center mt-30">
        
        {/* 1. HEADER SECTION (Stacked vertically) */}
        <div className="text-center w-full mb-12 animate-fade-in-down">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4 text-gray-900">
            Find Your <span className="text-[#10b981]">Office</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
            Search for banks, hospitals, colleges, and government offices below.
          </p>
        </div>

        {/* 2. SEARCH BAR (Wide and centered) */}
        <div className="w-full max-w-3xl mb-16 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="relative group">
            {/* Glow effect behind search bar */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            
            {/* Input Field */}
            <div className="relative flex items-center bg-white rounded-full shadow-xl p-2 transition-all duration-300 transform group-hover:scale-[1.01]">
              <span className="pl-6 text-gray-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </span>
              <input
                type="text"
                placeholder="Search office name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-4 text-lg text-gray-700 bg-transparent border-none outline-none focus:ring-0 placeholder-gray-400"
              />
              <button className="bg-[#10b981] text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-600 transition-colors shadow-md">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* 3. RESULTS GRID (Full width) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
          {filteredOffices.map((office, index) => (
            <div 
              key={office._id} 
              className="office-card group animate-slide-up flex flex-col"
              style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 group-hover:text-[#10b981] transition-colors">
                    {office.name}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium flex items-center mt-1">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    {office.location}
                  </p>
                </div>
                <div className="bg-emerald-50 text-emerald-600 p-2 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gray-50 p-3 rounded-xl text-center">
                  <span className="block text-xs text-gray-400 uppercase font-bold tracking-wider">Queue</span>
                  <strong className="text-lg text-gray-800">{office.queueLength}</strong>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl text-center">
                  <span className="block text-xs text-gray-400 uppercase font-bold tracking-wider">Wait</span>
                  <strong className="text-lg text-[#10b981]">~{office.estimatedWaitTime} min</strong>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl text-center col-span-2 flex justify-between items-center px-6">
                  <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Current Token</span>
                  <strong className="text-lg text-indigo-600">#{office.currentToken}</strong>
                </div>
              </div>

              {/* Push button to bottom */}
              <div className="mt-auto">
                <Link to={`/join/${office._id}`}>
                  <button className="w-full py-3 rounded-xl bg-gray-900 text-white font-bold text-lg hover:bg-[#10b981] hover:shadow-lg transition-all duration-300 transform group-hover:translate-y-[-2px]">
                    Join Queue
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 4. NO RESULTS MESSAGE (Centered below everything) */}
        {filteredOffices.length === 0 && (
          <div className="text-center mt-12 w-full animate-fade-in-down">
            <div className="bg-white/40 backdrop-blur-md p-8 rounded-3xl inline-block border border-white/50 shadow-lg">
              <svg className="w-24 h-24 mx-auto text-gray-400 mb-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">No offices found</h2>
              <p className="text-gray-500">
                We couldn't find "{searchQuery}". <br/> Try searching for a different location.
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .office-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          border-radius: 1.5rem;
          padding: 1.5rem;
          box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }
        
        .office-card:hover {
          background: rgba(255, 255, 255, 0.95);
          transform: translateY(-8px);
          box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.1);
          border-color: #10b981;
        }

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
        
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out forwards;
        }

        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          opacity: 0;
          animation: slide-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Search;