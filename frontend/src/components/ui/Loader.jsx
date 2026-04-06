function Loader({ text = "Loading..." }) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex items-center gap-3">
        <div className="h-6 w-6 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600"></div>
        <p className="text-slate-600 font-medium">{text}</p>
      </div>
    </div>
  );
}

export default Loader;