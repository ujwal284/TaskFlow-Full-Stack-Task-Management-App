import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import AnalyticsCards from "../components/AnalyticsCards";
import AnalyticsCharts from "../components/AnalyticsCharts";
import api from "../services/api";

function Analytics() {
  const [stats, setStats] = useState({});

  const fetchStats = async () => {
    try {
      const response = await api.get("/tasks/stats");
      setStats(response.data.stats);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Task Analytics</h2>
        <p className="text-slate-600 mt-2">
          Track your productivity and task performance visually.
        </p>
      </div>

      <AnalyticsCards stats={stats} />
      <AnalyticsCharts stats={stats} />
    </DashboardLayout>
  );
}

export default Analytics;