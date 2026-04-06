import { useEffect, useState } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import api from "../services/api";
import Loader from "../components/ui/Loader";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAdminStats = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/stats");
      setStats(response.data.stats);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminStats();
  }, []);

  return (
    <AdminLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Admin Dashboard</h2>
        <p className="text-slate-600 mt-2">
          Monitor platform activity, users, and tasks.
        </p>
      </div>

      {loading ? (
        <Loader text="Loading admin stats..." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <div className="bg-blue-100 text-blue-700 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-semibold">Total Users</h3>
            <p className="text-3xl font-bold mt-3">{stats.totalUsers}</p>
          </div>

          <div className="bg-green-100 text-green-700 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-semibold">Total Tasks</h3>
            <p className="text-3xl font-bold mt-3">{stats.totalTasks}</p>
          </div>

          <div className="bg-purple-100 text-purple-700 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-semibold">Admins</h3>
            <p className="text-3xl font-bold mt-3">{stats.totalAdmins}</p>
          </div>

          <div className="bg-orange-100 text-orange-700 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-semibold">Normal Users</h3>
            <p className="text-3xl font-bold mt-3">{stats.totalNormalUsers}</p>
          </div>

          <div className="bg-yellow-100 text-yellow-700 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-semibold">To Do</h3>
            <p className="text-3xl font-bold mt-3">{stats.todo}</p>
          </div>

          <div className="bg-indigo-100 text-indigo-700 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-semibold">In Progress</h3>
            <p className="text-3xl font-bold mt-3">{stats.inProgress}</p>
          </div>

          <div className="bg-emerald-100 text-emerald-700 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-semibold">Completed</h3>
            <p className="text-3xl font-bold mt-3">{stats.done}</p>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminDashboard;