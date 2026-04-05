import Sidebar from "./Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}

export default DashboardLayout;