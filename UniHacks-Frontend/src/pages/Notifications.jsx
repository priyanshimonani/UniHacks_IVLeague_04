import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  CheckCircle,
  Clock,
  AlertCircle,
  Repeat
} from "lucide-react";

export default function Notifications() {

  // Mock Data inside same file
  const mockNotifications = [
    {
      id: 1,
      type: "turn_soon",
      title: "Your turn is near",
      message: "Only 3 people ahead of you. Please be ready.",
      time: "2 mins ago",
      read: false
    },
    {
      id: 2,
      type: "swap_success",
      title: "Swap successful",
      message: "Your token swap request has been accepted.",
      time: "10 mins ago",
      read: true
    },
    {
      id: 3,
      type: "queue_paused",
      title: "Queue paused",
      message: "The queue has been temporarily paused by admin.",
      time: "30 mins ago",
      read: true
    }
  ];

  // Icon selector
  const getIcon = (type) => {
    switch (type) {
      case "swap_request":
      case "swap_success":
        return <Repeat className="w-6 h-6 text-purple-600" />;

      case "swap_accepted":
        return <CheckCircle className="w-6 h-6 text-green-600" />;

      case "turn_soon":
        return <Clock className="w-6 h-6 text-amber-600" />;

      case "queue_paused":
        return <AlertCircle className="w-6 h-6 text-red-600" />;

      default:
        return <Bell className="w-6 h-6 text-indigo-600" />;
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-20 bg-linear-to-br from-yellow-100 via-amber-100 to-orange-100">

      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Back Button */}
        <Link to="/">
          <button className="mb-6 flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <Bell className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Notifications
          </h1>
          <p className="text-lg text-gray-600">
            Stay updated with your queue status
          </p>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">

          {mockNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 ${
                !notification.read ? "border-l-4 border-indigo-600" : "opacity-80"
              }`}
            >
              <div className="flex items-start space-x-4">

                {/* Icon */}
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  {getIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-semibold text-gray-800">
                      {notification.title}
                    </h3>

                    {!notification.read && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    )}
                  </div>

                  <p className="text-gray-600 mb-2">
                    {notification.message}
                  </p>

                  <div className="text-sm text-gray-500">
                    {notification.time}
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>

        {/* Empty State */}
        {mockNotifications.length === 0 && (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-12 text-center mt-6">
            <div className="text-5xl mb-4">🔔</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Notifications
            </h3>
            <p className="text-gray-600">
              You're all caught up!
            </p>
          </div>
        )}

        {/* Mark All as Read */}
        {mockNotifications.some((n) => !n.read) && (
          <div className="mt-6 text-center">
            <button className="px-8 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition">
              Mark All as Read
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
