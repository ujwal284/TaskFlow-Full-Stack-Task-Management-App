import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ConfirmModal from "../ConfirmModal";
import { clearAuth, getStoredUser } from "../../utils/auth";

function AdminLayout({ children }) {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const user = getStoredUser();

  const handleLogout = () => {
    clearAuth();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-xl transition font-medium ${
      isActive
        ? "bg-white/10 text-white"
        : "text-slate-300 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <div className="h-screen flex bg-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold">TaskFlow Admin</h1>
          <p className="text-slate-400 text-sm mt-1">Admin Control Panel</p>
        </div>

        <div className="p-6 border-b border-slate-800">
          <p className="text-sm text-slate-400">Logged in as</p>
          <h2 className="text-lg font-semibold mt-1">
            {user?.fullName || "Admin"}
          </h2>
          <p className="text-sm text-slate-400">{user?.email || ""}</p>
          <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium bg-purple-600/20 text-purple-300 border border-purple-500/20">
            {user?.role || "admin"}
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="mb-2 text-xs uppercase tracking-wider text-slate-500 px-2">
            Admin Panel
          </div>

          <NavLink to="/admin/dashboard" end className={navLinkClass}>
            Admin Dashboard
          </NavLink>

          <NavLink to="/admin/users" className={navLinkClass}>
            Manage Users
          </NavLink>

          <NavLink to="/admin/tasks" className={navLinkClass}>
            All Tasks
          </NavLink>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 h-screen overflow-y-auto p-6">{children}</main>

      <ConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Logout"
        message="Are you sure you want to logout from your admin account?"
        confirmText="Logout"
        cancelText="Cancel"
        confirmColor="bg-red-500 hover:bg-red-600"
      />
    </div>
  );
}

export default AdminLayout;