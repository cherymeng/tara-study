import { Outlet } from "react-router-dom";
import { SidebarNav } from "./SidebarNav";
import { GrowthPanel } from "./GrowthPanel";

export function TabletShell() {
  return (
    <div className="app-shell">
      <div className="tablet-grid">
        <SidebarNav />

        <main className="main-panel">
          <Outlet />
        </main>

        <GrowthPanel />
      </div>
    </div>
  );
}
