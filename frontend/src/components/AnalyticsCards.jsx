function AnalyticsCards({ stats }) {
  const cards = [
    {
      title: "Total Tasks",
      value: stats.total || 0,
      color: "bg-blue-100 text-blue-700 border-blue-200",
      emoji: "📋",
    },
    {
      title: "To Do",
      value: stats.todo || 0,
      color: "bg-yellow-100 text-yellow-700 border-yellow-200",
      emoji: "📝",
    },
    {
      title: "In Progress",
      value: stats.inProgress || 0,
      color: "bg-purple-100 text-purple-700 border-purple-200",
      emoji: "⚡",
    },
    {
      title: "Completed",
      value: stats.done || 0,
      color: "bg-green-100 text-green-700 border-green-200",
      emoji: "✅",
    },
    {
      title: "High Priority",
      value: stats.high || 0,
      color: "bg-red-100 text-red-700 border-red-200",
      emoji: "🔥",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`rounded-2xl border p-5 shadow-sm ${card.color}`}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">{card.title}</h3>
            <span className="text-2xl">{card.emoji}</span>
          </div>
          <p className="text-3xl font-bold mt-4">{card.value}</p>
        </div>
      ))}
    </div>
  );
}

export default AnalyticsCards;