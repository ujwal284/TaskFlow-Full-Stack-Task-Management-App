import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
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
    const response = await api.post("/users/register", formData);
    toast.success(response.data.message || "Registration successful!");
    navigate("/");
  } catch (error) {
    toast.error(error.response?.data?.message || "Registration failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm"
      >
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Create Account
        </h2>
        <p className="text-center text-slate-500 mb-8">
          Start managing your tasks today
        </p>

        <input
          type="text"
          name="fullName"
          placeholder="Enter full name"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full border border-slate-300 rounded-xl px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border border-slate-300 rounded-xl px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border border-slate-300 rounded-xl px-4 py-3 mb-6 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
        >
          Register
        </button>

        <p className="text-center text-slate-600 mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;