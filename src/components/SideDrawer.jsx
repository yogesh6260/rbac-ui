import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaUserShield, FaLock } from "react-icons/fa"; // Icons for each section

const SideDrawer = () => {
  const [isOpen, setIsOpen] = useState(true); // State to toggle sidebar

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`flex ${
        isOpen ? "w-64" : "w-20"
      } bg-gray-800 h-full fixed top-0 left-0 transition-all duration-300`}
    >
      <div className="flex flex-col w-full">
        {/* Sidebar Header with toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-900">
          <h2 className={`text-white font-bold ${isOpen ? "block" : "hidden"}`}>
            Admin Dashboard
          </h2>
          <button
            className="text-white text-2xl focus:outline-none"
            onClick={toggleSidebar}
          >
            {isOpen ? "←" : "→"} {/* Toggle icon */}
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex-grow p-4 space-y-4">
          <Link
            to="/users"
            className="text-white flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md"
          >
            <FaUsers className="text-xl" />
            <span className={`${isOpen ? "block" : "hidden"}`}>Users</span>
          </Link>

          <Link
            to="/roles"
            className="text-white flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md"
          >
            <FaUserShield className="text-xl" />
            <span className={`${isOpen ? "block" : "hidden"}`}>Roles</span>
          </Link>

          <Link
            to="/permissions"
            className="text-white flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md"
          >
            <FaLock className="text-xl" />
            <span className={`${isOpen ? "block" : "hidden"}`}>
              Permissions
            </span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default SideDrawer;
