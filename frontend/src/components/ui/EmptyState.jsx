function EmptyState({
  title = "No data found",
  message = "There is nothing to show right now.",
}) {
  return (
    <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-10 text-center shadow-sm">
      <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
      <p className="text-slate-500 mt-3">{message}</p>
    </div>
  );
}

export default EmptyState;