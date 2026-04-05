import DashboardLayout from "../components/layout/DashboardLayout";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Welcome back 👋</h2>
        <p className="text-slate-600 mt-2">
          Hello, <span className="font-semibold">{user?.fullName || "User"}</span>
        </p>
      </div>

      {/* Stats Cards Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-slate-500 text-sm">Total Tasks</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-slate-500 text-sm">To Do</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-slate-500 text-sm">In Progress</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-slate-500 text-sm">Done</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-3">Dashboard Content</h3>
        <p className="text-slate-600">
          Your task form, filters, and task list will come here next.
        </p>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;