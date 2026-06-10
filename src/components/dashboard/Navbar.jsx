import React from "react";
import { FaBars, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();

  return (
    <header
      className="
    fixed top-0 left-0 lg:left-64 right-0
    h-16 bg-white/90 backdrop-blur-md
    border-b border-gray-200
    shadow-sm z-30
  "
    >
      <div className="h-full px-4 lg:px-6 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-gray-700 hover:text-teal-600"
          >
            <FaBars size={22} />
          </button>

          <div>
            <h1 className="text-base sm:text-lg font-semibold text-gray-800">
              Admin Dashboard
            </h1>
            <p className="text-xs text-gray-500 hidden sm:block">
              Employee Management System
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* User Info */}
          <div className="hidden sm:flex items-center gap-2">
            <FaUserCircle size={32} className="text-gray-500" />

            <div>
              <p className="text-sm font-medium text-gray-800">{user?.name}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="
flex items-center gap-2
bg-red-500 hover:bg-red-600
text-white
px-3 sm:px-4
py-2
rounded-lg
transition
"
          >
            <FaSignOutAlt />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
