import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Users, Info } from "lucide-react";

export default function Confirm() {
  // Mock Data (In real app, fetch using ID from URL)
  const officeDetails = {
    id: "sbi-main",
    name: "SBI Main Branch",
    location: "MG Road, Ahmedabad",
    peopleAhead: 14,
    estimatedWait: "42 mins",
    distance: "1.2 km away"
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-[#feffe0] via-yellow-50 to-orange-50 relative overflow-hidden font-sans text-gray-800 flex items-center justify-center">

      {/* Background Blobs */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob -z-10"></div>
      <div className="fixed top-0 right-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000 -z-10"></div>
      <div className="fixed -bottom-32 left-20 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000 -z-10"></div>

      <div className="w-full max-w-lg px-6 relative z-10">

        {/* Back Button */}
        <Link to="/search" className="absolute -top-16 left-6 flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-bold text-sm">Cancel</span>
        </Link>

        {/* MAIN CARD */}
        <div className="bg-white/70 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
          
          {/* Decorative Top Gradient */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-400"></div>

          {/* Header */}
          <div className="text-center mb-8 pt-4">
            <div className="inline-block p-4 rounded-2xl bg-white shadow-lg mb-4">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/c/cc/SBI-logo.svg" 
                alt="Logo" 
                className="w-12 h-12 object-contain"
                onError={(e) => {e.target.style.display='none';}} // Fallback if image fails
              /> 
              {/* Fallback Icon if image fails/is blocked */}
              <div className="hidden w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl">
                 🏦
              </div>
            </div>
            
            <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
              {officeDetails.name}
            </h1>
            
            <div className="flex items-center justify-center gap-2 text-gray-500 font-medium bg-gray-100/50 py-1 px-3 rounded-full w-fit mx-auto">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{officeDetails.location}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {/* People Ahead */}
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 p-5 rounded-3xl border border-indigo-100 text-center relative group">
              <div className="absolute top-3 right-3 text-indigo-200 group-hover:text-indigo-300 transition-colors">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">Queue Size</div>
              <div className="text-4xl font-black text-indigo-600">{officeDetails.peopleAhead}</div>
              <div className="text-xs text-indigo-400 font-medium">People ahead</div>
            </div>

            {/* Estimated Wait */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-5 rounded-3xl border border-emerald-100 text-center relative group">
              <div className="absolute top-3 right-3 text-emerald-200 group-hover:text-emerald-300 transition-colors">
                <Clock className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-1">Est. Wait</div>
              <div className="text-4xl font-black text-[#10b981]">{officeDetails.estimatedWait}</div>
              <div className="text-xs text-emerald-500 font-medium">Minutes</div>
            </div>
          </div>

          {/* Info Note */}
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3 items-start mb-8">
            <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700 leading-relaxed">
              <strong>Note:</strong> You are <strong>{officeDetails.distance}</strong>. 
              Ensure you reach the venue before your turn to avoid cancellation.
            </p>
          </div>

          {/* Action Button */}
          <Link to="/joinqueue">
            <button className="w-full py-4 bg-gray-900 text-white text-lg font-bold rounded-2xl shadow-xl shadow-gray-900/20 hover:bg-[#10b981] hover:shadow-emerald-500/30 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group">
              Confirm & Join Queue
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
            </button>
          </Link>

          <div className="text-center mt-4">
            <p className="text-xs text-gray-400">
              By joining, you agree to the queue rules.
            </p>
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