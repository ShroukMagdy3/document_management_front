import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";
const VITE_API_URL = import.meta.env.VITE_API_URL;
export default function Logout() {


const handleLogout = async () => {
  try {
    await axios.post(
      `${VITE_API_URL}/api/v1/users/logout`,
      {},
      {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    localStorage.removeItem("accessToken");
    window.location.href = "/signin";
    toast.success("Logged!!")
  } catch (error) {
    console.error("Logout failed:", error);
    toast.error("failed to logout")
  }
};

  return (
    <div>
      <button
        onClick={handleLogout}
        className=" hover:bg-red-600 transition-colors px-4 py-2 rounded text-white"
      >
         <LogOut size={22} />
        <span className="text-xs mt-1">Logout</span>
      </button>
    </div>
  );
}
