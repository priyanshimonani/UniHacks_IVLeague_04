import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QueueDemo from "./QueueDemo";

export function JoinQueue() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const organizationId = new URLSearchParams(location.search).get("organizationId");

  useEffect(() => {
    if (!organizationId) {
      navigate("/search");
      return;
    }

    if (!token) {
      // Redirect to login with return URL
      navigate(`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`);
      return;
    }

    // If user is logged in and has organizationId, proceed to QueueDemo
    // QueueDemo will handle the join logic
  }, [organizationId, token, navigate, location.pathname, location.search]);

  // Show loading or redirecting message while handling auth
  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fefce8] via-[#fffdf4] to-[#ecfdf5] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return <QueueDemo />;
}
