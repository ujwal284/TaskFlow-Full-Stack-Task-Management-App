import { useEffect, useState } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import api from "../services/api";
import Loader from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";
import ConfirmModal from "../components/ConfirmModal";
import toast from "react-hot-toast";

function AdminTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/tasks");
      setTasks(response.data.tasks || []);
    } catch (error) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDeleteTask = async () => {
    try {
      await api.delete(`/admin/tasks/${selectedTaskId}`);
      toast.success("Task deleted successfully");
      setShowDeleteModal(false);
      setSelectedTaskId(null);
      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete task");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const query = search.toLowerCase();
    return (
      task.title?.toLowerCase().includes(query) ||
      task.description?.toLowerCase().includes(query) ||
      task.createdBy?.fullName?.toLowerCase().includes(query) ||
      task.createdBy?.email?.toLowerCase().includes(query)
    );
  });

  const getStatusColor = (status) => {
    if (status === "todo") return "bg-yellow-100 text-yellow-700";
    if (status === "in-progress") return "bg-blue-100 text-blue-700";
    if (status === "done") return "bg-green-100 text-green-700";
    return "bg-slate-100 text-slate-700";
  };

  const getPriorityColor = (priority) => {
    if (priority === "low") return "bg-emerald-100 text-emerald-700";
    if (priority === "medium") return "bg-orange-100 text-orange-700";
    if (priority === "high") return "bg-red-100 text-red-700";
    return "bg-slate-100 text-slate-700";
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">All Tasks</h2>
        <p className="text-slate-600 mt-2">
          Monitor and manage tasks created by all users.
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm p-5 mb-6">
        <input
          type="text"
          placeholder="Search by title, description, user name, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <Loader text="Loading tasks..." />
      ) : filteredTasks.length === 0 ? (
        <EmptyState
          title="No tasks found"
          message="No matching tasks are available."
        />
      ) : (
        <div className="grid gap-5">
          {filteredTasks.map((task) => (
            <div key={task._id} className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-800">
                    {task.title}
                  </h3>

                  <p className="text-slate-600 mt-2">
                    {task.description || "No description provided."}
                  </p>

                  <div className="mt-4 text-sm text-slate-500 space-y-1">
                    <p>
                      Created by:{" "}
                      <span className="font-medium text-slate-700">
                        {task.createdBy?.fullName || "Unknown User"}
                      </span>
                    </p>
                    <p>
                      Email:{" "}
                      <span className="font-medium text-slate-700">
                        {task.createdBy?.email || "N/A"}
                      </span>
                    </p>
                    {task.dueDate && (
                      <p>
                        Due Date:{" "}
                        <span className="font-medium text-slate-700">
                          {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-start md:items-end gap-3">
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      {task.priority}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedTaskId(task._id);
                      setShowDeleteModal(true);
                    }}
                    className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition"
                  >
                    Delete Task
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedTaskId(null);
        }}
        onConfirm={handleDeleteTask}
        title="Delete Task"
        message="Are you sure you want to delete this task?"
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="bg-red-500 hover:bg-red-600"
      />
    </AdminLayout>
  );
}

export default AdminTasks;