import { Briefcase, Delete, Home, User, Menu } from "lucide-react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logout from "../logout/logout";

export default function SideBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-900 text-amber-500 p-2 rounded-md shadow-lg"
        onClick={() => setOpen(!open)}
      >
        <Menu size={24} />
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-64 lg:w-40 bg-gray-900 text-white border-r border-gray-700 flex flex-col justify-between py-6 px-4 transition-transform z-40
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <h1 className="text-3xl font-signature text-amber-400 text-center">
          Keeply<span className="text-amber-600">.</span>
        </h1>
        <div className="flex flex-col items-center gap-8 mt-8">
          <NavItem to="/" icon={<Home size={20} />} label="Home" />
          <NavItem
            to="/workspace"
            icon={<Briefcase size={20} />}
            label="Workspace"
          />
          <NavItem to="/profile" icon={<User size={20} />} label="Profile" />
          <NavItem
            to="/cycleBin"
            icon={<Delete size={20} />}
            label="CycleBin"
          />
          {!localStorage.getItem("access_token") && (
            <NavItem to="/register" icon={<User size={20} />} label="Sign Up" />
          )}
        </div>

        <Logout />
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
}

function NavItem({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center text-sm transition duration-200 ${
          isActive
            ? "text-amber-400 font-semibold"
            : "text-gray-400 hover:text-amber-400"
        }`
      }
    >
      {icon}
      <span className="mt-1">{label}</span>
    </NavLink>
  );
}
