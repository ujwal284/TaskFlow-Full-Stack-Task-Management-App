import DashboardLayout from "../components/layout/DashboardLayout";

function Analytics() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Task Analytics</h2>
        <p className="text-slate-600 mt-2">
          View your task performance and productivity overview.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-4">Analytics Coming Soon</h3>
        <p className="text-slate-600">
          We will later add charts like:
        </p>

        <ul className="list-disc list-inside mt-4 text-slate-700 space-y-2">
          <li>Total tasks completed</li>
          <li>Tasks by status</li>
          <li>Priority breakdown</li>
          <li>Overdue tasks</li>
          <li>Weekly productivity chart</li>
        </ul>
      </div>
    </DashboardLayout>
  );
}

export default Analytics;