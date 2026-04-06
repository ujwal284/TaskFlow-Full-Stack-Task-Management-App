function StatsCards({ stats }) {
  const cards = [
    {
      title: "Total Tasks",
      value: stats?.total || 0,
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
      icon: "📋",
    },
    {
      title: "To Do",
      value: stats?.todo || 0,
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      border: "border-yellow-200",
      icon: "📝",
    },
    {
      title: "In Progress",
      value: stats?.inProgress || 0,
      bg: "bg-purple-50",
      text: "text-purple-700",
      border: "border-purple-200",
      icon: "⚡",
    },
    {
      title: "Done",
      value: stats?.done || 0,
      bg: "bg-green-50",
      text: "text-green-700",
      border: "border-green-200",
      icon: "✅",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.bg} ${card.border} border rounded-2xl p-6 shadow-sm hover:shadow-md transition`}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-slate-600 text-sm font-medium">{card.title}</h3>
            <span className="text-2xl">{card.icon}</span>
          </div>

          <p className={`text-4xl font-bold ${card.text}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;