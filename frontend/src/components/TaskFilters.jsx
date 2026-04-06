function TaskFilters({
  searchInput,
  setSearchInput,
  handleSearch,
  handleClearFilters,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
        <h3 className="text-xl font-semibold">Search & Filter Tasks</h3>

        <div className="flex gap-3">
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition"
          >
            Search
          </button>

          <button
            onClick={handleClearFilters}
            className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-5 py-2.5 rounded-xl font-medium transition"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search by task title..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
    </div>
  );
}

export default TaskFilters;