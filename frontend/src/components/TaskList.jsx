import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import EditTaskModal from "./EditTaskModal";
import ConfirmModal from "./ConfirmModal";

function TaskList({ tasks, fetchTasks, fetchStats }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const openEditModal = (task) => {
    setSelectedTask(task);
    setShowEditModal(true);
  };

  const openDeleteModal = (task) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!taskToDelete) return;

    try {
      await api.delete(`/tasks/${taskToDelete._id}`);
      fetchTasks();
      fetchStats();
      toast.success("Task deleted successfully!");
      setShowDeleteModal(false);
      setTaskToDelete(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete task");
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "todo":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "in-progress":
        return "bg-purple-100 text-purple-800 border border-purple-200";
      case "done":
        return "bg-green-100 text-green-800 border border-green-200";
      default:
        return "bg-slate-100 text-slate-700 border border-slate-200";
    }
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border border-red-200";
      case "medium":
        return "bg-orange-100 text-orange-800 border border-orange-200";
      case "low":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      default:
        return "bg-slate-100 text-slate-700 border border-slate-200";
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <p className="text-slate-500">No tasks found yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="space-y-5">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-5 hover:shadow-md transition bg-slate-50"
            >
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-slate-800">{task.title}</h4>
                <p className="text-slate-600 mt-2">
                  {task.description || "No description"}
                </p>

                <div className="flex flex-wrap gap-3 mt-4 text-sm">
                  <span className={`px-3 py-1.5 rounded-full font-medium ${getStatusStyles(task.status)}`}>
                    {task.status === "todo"
                      ? "📝 To Do"
                      : task.status === "in-progress"
                      ? "⚡ In Progress"
                      : "✅ Done"}
                  </span>

                  <span className={`px-3 py-1.5 rounded-full font-medium ${getPriorityStyles(task.priority)}`}>
                    {task.priority === "high"
                      ? "🔴 High Priority"
                      : task.priority === "medium"
                      ? "🟠 Medium Priority"
                      : "🔵 Low Priority"}
                  </span>

                  {task.dueDate && (
                    <span className="px-3 py-1.5 rounded-full font-medium bg-pink-100 text-pink-800 border border-pink-200">
                      📅 Due: {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-3 flex-wrap self-start md:self-center">
                <button
                  onClick={() => openEditModal(task)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => openDeleteModal(task)}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-medium transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <EditTaskModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        task={selectedTask}
        fetchTasks={fetchTasks}
        fetchStats={fetchStats}
      />

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setTaskToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Task"
        message={`Are you sure you want to delete "${taskToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="bg-red-500 hover:bg-red-600"
      />
    </>
  );
}

export default TaskList;