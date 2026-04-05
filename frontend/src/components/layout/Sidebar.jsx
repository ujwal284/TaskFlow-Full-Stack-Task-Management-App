import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../ui/Modal";

function Sidebar() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <aside className="w-64 min-h-screen bg-zinc-950 text-white flex flex-col p-6 shadow-xl">
        <h1 className="text-2xl font-bold mb-10 tracking-wide">TaskFlow</h1>

        <nav className="flex flex-col gap-3">
          <button className="text-left px-4 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition">
            Dashboard
          </button>

          <button className="text-left px-4 py-3 rounded-xl hover:bg-zinc-800 transition">
            Tasks
          </button>

          <button className="text-left px-4 py-3 rounded-xl hover:bg-zinc-800 transition">
            Analytics
          </button>

          <button className="text-left px-4 py-3 rounded-xl hover:bg-zinc-800 transition">
            Settings
          </button>
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