import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import Modal from "../ui/Modal";
import { clearAuth, getStoredUser } from "../../utils/auth";

function Sidebar() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const user = getStoredUser();

  const handleLogout = () => {
    clearAuth();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    `text-left px-4 py-3 rounded-xl transition font-medium ${
      isActive
        ? "bg-zinc-800 text-white"
        : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
    }`;

  return (
    <>
      <aside className="w-64 min-h-screen bg-zinc-950 text-white flex flex-col p-6 shadow-xl">
        <h1 className="text-2xl font-bold mb-10 tracking-wide">TaskFlow</h1>

        <nav className="flex flex-col gap-3">
          <NavLink to="/dashboard" end className={navLinkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/tasks" className={navLinkClass}>
            Tasks
          </NavLink>

          <NavLink to="/analytics" className={navLinkClass}>
            Analytics
          </NavLink>

          <NavLink to="/settings" className={navLinkClass}>
            Settings
          </NavLink>

          {user?.role === "admin" && (
            <>
              <div className="mt-6 mb-2 text-xs uppercase tracking-wider text-zinc-500 px-2">
                Admin Panel
              </div>

              <NavLink to="/admin/dashboard" className={navLinkClass}>
                Admin Dashboard
              </NavLink>

              <NavLink to="/admin/users" className={navLinkClass}>
                Manage Users
              </NavLink>

              <NavLink to="/admin/tasks" className={navLinkClass}>
                All Tasks
              </NavLink>
            </>
          )}
        </nav>

        <div className="mt-auto pt-10">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition"
          >
            Logout
          </button>
        </div>
      </aside>

      <Modal
        isOpen={showLogoutModal}
        title="Logout Confirmation"
        message="Are you sure you want to logout from your account?"
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
    </>
  );
}

export default Sidebar;