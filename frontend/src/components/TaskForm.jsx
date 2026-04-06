import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

function TaskForm({ fetchTasks, fetchStats }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    dueDate: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await api.post("/tasks", formData);

    toast.success("Task created successfully!");

    setFormData({
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      dueDate: "",
    });

    fetchTasks();
    fetchStats();
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to create task");
  }
};

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
      <h3 className="text-xl font-semibold mb-5">Create New Task</h3>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <button
          type="submit"
          className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;