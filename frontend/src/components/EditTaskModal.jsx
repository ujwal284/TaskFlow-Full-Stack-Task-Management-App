import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

function EditTaskModal({ isOpen, onClose, task, fetchTasks, fetchStats }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    dueDate: "",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "todo",
        priority: task.priority || "medium",
        dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (!isOpen || !task) return null;

 const handleUpdate = async (e) => {
  e.preventDefault();

  try {
    await api.patch(`/tasks/${task._id}`, formData);
    toast.success("Task updated successfully!");
    fetchTasks();
    fetchStats();
    onClose();
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update task");
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
        <h2 className="text-2xl font-bold text-slate-800 mb-5">Edit Task</h2>

        <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Task title"
            value={formData.title}
            onChange={handleChange}
            required
            className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <textarea
            name="description"
            placeholder="Task description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="md:col-span-2 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="md:col-span-2 flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTaskModal;