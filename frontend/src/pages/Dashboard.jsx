import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import StatsCards from "../components/StatsCards";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskFilters from "../components/TaskFilters";
import api from "../services/api";

function Dashboard() {
  let user = null;

try {
  const storedUser = localStorage.getItem("user");
  user = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
} catch (error) {
  user = null;
}

  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({});

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get("/tasks/stats");
      setStats(response.data.stats);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, []);

  const handleSearch = () => {
    setSearch(searchInput);
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setSearch("");
    setStatusFilter("all");
    setPriorityFilter("all");
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const isSearching =
    search.trim() !== "" || statusFilter !== "all" || priorityFilter !== "all";

  return (
    <DashboardLayout>
      {/* Welcome */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Welcome back 👋</h2>
        <p className="text-slate-600 mt-2">
          Hello, <span className="font-semibold">{user?.fullName || "User"}</span>
        </p>
      </div>

      {/* Stats */}
      <StatsCards stats={stats} />

      {/* Search & Filter */}
      <TaskFilters
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
        handleClearFilters={handleClearFilters}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
      />

      {/* Search Results */}
      {isSearching && (
        <div className="mb-10 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-slate-800">Search Results</h3>
              <p className="text-slate-600 text-sm mt-1">
                Showing filtered tasks based on your search.
              </p>
            </div>

            <span className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-full font-medium">
              {filteredTasks.length} Result{filteredTasks.length !== 1 ? "s" : ""}
            </span>
          </div>

          {filteredTasks.length > 0 ? (
            <TaskList
              tasks={filteredTasks}
              fetchTasks={fetchTasks}
              fetchStats={fetchStats}
            />
          ) : (
            <div className="bg-white rounded-2xl p-6 border border-dashed border-blue-200 text-center">
              <p className="text-lg font-semibold text-slate-700">No matching tasks found</p>
              <p className="text-slate-500 mt-2">
                Try another keyword, status, or priority filter.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Create New Task */}
      <TaskForm fetchTasks={fetchTasks} fetchStats={fetchStats} />

      {/* All Tasks */}
      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-slate-800">Your Tasks</h3>
            <p className="text-slate-600 text-sm mt-1">
              All tasks you have created are shown here.
            </p>
          </div>

          <span className="text-sm bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full font-medium">
            {tasks.length} Task{tasks.length !== 1 ? "s" : ""}
          </span>
        </div>

        <TaskList
          tasks={tasks}
          fetchTasks={fetchTasks}
          fetchStats={fetchStats}
        />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;