import { NavLink, useNavigate } from "react-router-dom";

function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
          <h1 className="text-2xl font-bold">TaskFlow</h1>
          <p className="text-slate-400 text-sm mt-1">Productivity Dashboard</p>
        </div>

        <div className="p-6 border-b border-slate-800">
          <p className="text-sm text-slate-400">Logged in as</p>
          <h2 className="text-lg font-semibold mt-1">{user?.fullName || "User"}</h2>
          <p className="text-sm text-slate-400">{user?.email || ""}</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavLink to="/dashboard" end className={navLinkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/dashboard/analytics" className={navLinkClass}>
            Task Analytics
          </NavLink>

          <NavLink to="/dashboard/settings" className={navLinkClass}>
            Settings
          </NavLink>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 h-screen overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;