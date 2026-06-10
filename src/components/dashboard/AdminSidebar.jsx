import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUsers,
  FaTimes,
} from "react-icons/fa";

const AdminSidebar = ({ sidebarOpen, closeSidebar }) => {
  const navLinkStyle = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
   ${
     isActive
       ? "bg-teal-600 text-white shadow-md"
       : "text-gray-300 hover:bg-slate-800"
   }`;

  return (
    <aside
      className={`
    fixed top-0 left-0 z-50
    w-64 h-screen
    bg-slate-900
    transition-transform duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0
    flex flex-col
    shadow-2xl
  `}
    >
      {/* Header */}
      <div className="h-16 bg-gradient-to-r from-teal-600 to-teal-700 flex items-center justify-between px-5">
        <h2 className="text-xl font-bold text-white">Employee MS</h2>

        <button onClick={closeSidebar} className="lg:hidden text-white">
          <FaTimes size={20} />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-3">
        <nav className="space-y-2">
          <NavLink to="/admin-dashboard" end className={navLinkStyle}>
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/admin-dashboard/employee" className={navLinkStyle}>
            <FaUsers />
            <span>Employees</span>
          </NavLink>

          <NavLink to="/admin-dashboard/department" className={navLinkStyle}>
            <FaBuilding />
            <span>Departments</span>
          </NavLink>

          <NavLink to="/admin-dashboard/leaves" className={navLinkStyle}>
            <FaCalendarAlt />
            <span>Leaves</span>
          </NavLink>

          <NavLink to="/admin-dashboard/salary" className={navLinkStyle}>
            <FaMoneyBillWave />
            <span>Salary</span>
          </NavLink>

          <NavLink to="/admin-dashboard/settings" className={navLinkStyle}>
            <FaCogs />
            <span>Settings</span>
          </NavLink>
        </nav>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-700 p-4 text-center flex-shrink-0">
        <p className="text-xs text-gray-400">Employee Management System</p>
      </div>
    </aside>
  );
};

export default AdminSidebar;
