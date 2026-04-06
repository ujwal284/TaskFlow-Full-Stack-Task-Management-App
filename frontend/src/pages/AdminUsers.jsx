import { useEffect, useState } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import api from "../services/api";
import Loader from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";
import ConfirmModal from "../components/ConfirmModal";
import toast from "react-hot-toast";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  let currentUser = null;
  try {
    const storedUser = localStorage.getItem("user");
    currentUser =
      storedUser && storedUser !== "undefined"
        ? JSON.parse(storedUser)
        : null;
  } catch (error) {
    currentUser = null;
  }

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/users");
      setUsers(response.data.users || []);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.patch(`/admin/users/${userId}/role`, { role: newRole });
      toast.success("User role updated successfully");
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update role");
    }
  };

  const handleDeleteUser = async () => {
    try {
      await api.delete(`/admin/users/${selectedUserId}`);
      toast.success("User deleted successfully");
      setShowDeleteModal(false);
      setSelectedUserId(null);
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  const filteredUsers = users.filter((user) => {
    const query = search.toLowerCase();
    return (
      user.fullName?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query)
    );
  });

  return (
    <AdminLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">All Users</h2>
        <p className="text-slate-600 mt-2">
          View, manage roles, and delete users.
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm p-5 mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <Loader text="Loading users..." />
      ) : filteredUsers.length === 0 ? (
        <EmptyState
          title="No users found"
          message="There are no matching users right now."
        />
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-slate-100 text-slate-700 text-sm">
                <tr>
                  <th className="px-6 py-4">Full Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Joined</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const isCurrentAdmin = currentUser?._id === user._id;

                  return (
                    <tr
                      key={user._id}
                      className="border-t border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-6 py-4 font-medium text-slate-800">
                        {user.fullName}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {user.email}
                      </td>

                      <td className="px-6 py-4">
                        <select
                          value={user.role}
                          disabled={isCurrentAdmin}
                          onChange={(e) =>
                            handleRoleChange(user._id, e.target.value)
                          }
                          className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
                        >
                          <option value="user">user</option>
                          <option value="admin">admin</option>
                        </select>
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4">
                        <button
                          disabled={isCurrentAdmin}
                          onClick={() => {
                            setSelectedUserId(user._id);
                            setShowDeleteModal(true);
                          }}
                          className={`px-4 py-2 rounded-lg text-white text-sm font-medium ${
                            isCurrentAdmin
                              ? "bg-slate-300 cursor-not-allowed"
                              : "bg-red-500 hover:bg-red-600"
                          }`}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedUserId(null);
        }}
        onConfirm={handleDeleteUser}
        title="Delete User"
        message="Are you sure you want to delete this user? This will also delete all tasks created by them."
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="bg-red-500 hover:bg-red-600"
      />
    </AdminLayout>
  );
}

export default AdminUsers;