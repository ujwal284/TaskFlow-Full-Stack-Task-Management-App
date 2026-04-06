import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

function AnalyticsCharts({ stats }) {
  const statusData = [
    { name: "To Do", value: stats.todo || 0 },
    { name: "In Progress", value: stats.inProgress || 0 },
    { name: "Completed", value: stats.done || 0 },
  ];

  const priorityData = [
    { name: "High", value: stats.high || 0 },
    { name: "Medium", value: stats.medium || 0 },
    { name: "Low", value: stats.low || 0 },
  ];

  const pieColors = ["#facc15", "#a855f7", "#22c55e"];
  const barColors = ["#ef4444", "#f97316", "#3b82f6"];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {/* Pie Chart */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-5 text-slate-800">
          Task Status Breakdown
        </h3>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-5 text-slate-800">
          Task Priority Breakdown
        </h3>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value">
                {priorityData.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={barColors[index % barColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsCharts;