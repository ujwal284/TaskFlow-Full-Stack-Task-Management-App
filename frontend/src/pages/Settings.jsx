import DashboardLayout from "../components/layout/DashboardLayout";

function Settings() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Settings</h2>
        <p className="text-slate-600 mt-2">
          Manage your account information.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 max-w-2xl">
        <h3 className="text-xl font-semibold mb-5">Profile Information</h3>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-500">Full Name</p>
            <p className="text-lg font-medium text-slate-800">{user?.fullName || "N/A"}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Email</p>
            <p className="text-lg font-medium text-slate-800">{user?.email || "N/A"}</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Settings;