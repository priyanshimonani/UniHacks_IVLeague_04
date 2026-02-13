import React from "react";
import { Link } from "react-router-dom";
import { Bell, User, Moon } from "lucide-react";

export default function Navbar() {
  return (
    <div className="w-full flex justify-center mt-6">
      
      <nav className="flex justify-between items-center px-10 py-4 bg-[#F7F3C7] shadow-md rounded-full w-[92%] max-w-6xl">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[#10b981] tracking-wide">
          QueueNest
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-[#10b981] transition">
            Home
          </Link>

          <Link to="/search" className="hover:text-[#10b981] transition">
            Join Queue
          </Link>

          <Link to="/notifications" className="hover:text-[#10b981] transition">
            Notifications
          </Link>

          <Link to="/profile" className="hover:text-[#10b981] transition">
            Profile
          </Link>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-5 text-gray-700">

          {/* Dark mode icon (UI only) */}
          <button className="hover:text-[#10b981] transition">
            <Moon className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <Link to="/notifications" className="relative hover:text-[#10b981] transition">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full"></span>
          </Link>

          {/* Profile */}
          <Link to="/profile">
            <div className="bg-white p-2 rounded-full shadow hover:scale-105 transition">
              <User className="w-4 h-4" />
            </div>
          </Link>

        </div>

      </nav>

    </div>
  );
}
