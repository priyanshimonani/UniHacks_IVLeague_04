import React from "react";
import { Link } from "react-router-dom";
import { Bell, LogOut } from "lucide-react";

export default function Navbar() {
  return (
    // changed: position fixed, high z-index, pointer-events trickery
    <div className="fixed top-0 left-0 right-0 z-100 flex justify-center pt-6 pointer-events-none">

      <nav className="pointer-events-auto flex justify-between items-center px-6 py-3 md:px-10 md:py-4 bg-[#F7F3C7]/85 backdrop-blur-md  rounded-full w-[92%] max-w-6xl border border-white/50 transition-all duration-300">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[#10b981] tracking-wide hover:scale-105 transition-transform">
          QueueNest
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 text-sm font-bold text-gray-700">
          <Link to="/search" className="hover:text-[#10b981] transition hover:scale-105">
            Home
          </Link>
          <Link to="/ar" className="hover:text-[#10b981] transition hover:scale-105">
            Activity Room
          </Link>

        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-5 text-gray-700">
          {/* Notifications */}
          <Link to="/notifications" className="relative hover:text-[#10b981] transition hover:-translate-y-1">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full border border-[#F7F3C7]"></span>
          </Link>

          {/* Profile */}
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            className="relative hover:text-[#10b981] transition hover:-translate-y-1 bg-transparent border-none cursor-pointer">
            <LogOut className="w-5 h-5" />
          </button>


        </div>

      </nav>

    </div>
  );
}