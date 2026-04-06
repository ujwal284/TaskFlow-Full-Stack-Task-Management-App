import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Modal from "../ui/Modal";

function Sidebar() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    user = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
  } catch (error) {
    user = null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
          {/* ✅ User Routes — each points to its own path */}
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

          {/* ✅ Admin Routes — only shown to admins */}
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