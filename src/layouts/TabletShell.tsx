import { Outlet } from "react-router-dom";
import { SidebarNav } from "./SidebarNav";
import { GrowthPanel } from "./GrowthPanel";

export function TabletShell() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="grid min-h-[calc(100vh-48px)] grid-cols-[96px_1fr_300px] gap-6">
        <SidebarNav />

        <main className="rounded-[32px] bg-white p-8 shadow-sm">
          <Outlet />
        </main>

        <GrowthPanel />
      </div>
    </div>
  );
}
