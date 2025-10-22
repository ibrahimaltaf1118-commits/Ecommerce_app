// src/components/admin/Header.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin } from "../../store/slices/authSlice";

const Header = ({ setSidebarOpen }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutAdmin());
    // Optional: Redirect to login page after logout
    window.location.href = "/admin/login";
  };

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left Section */}
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className="ml-4 lg:ml-0">
            <h1 className="text-xl font-semibold text-gray-800">
              Admin Dashboard
            </h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 text-gray-600 hover:text-gray-900 relative">
            <i className="fas fa-bell"></i>
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.name?.charAt(0) || "A"}
              </span>
            </div>
            <span className="text-sm text-gray-700 hidden md:block">
              {user?.name || "Admin"}
            </span>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
