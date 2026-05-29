import { NavLink } from "react-router-dom";
import { ROUTES } from "../constants/routes";

const navItems = [
  { label: "首页", icon: "🏠", path: ROUTES.HOME },
  { label: "任务", icon: "✅", path: ROUTES.TASKS },
  { label: "宠物", icon: "🐣", path: ROUTES.PET },
  { label: "世界", icon: "🗺️", path: ROUTES.WORLD },
  { label: "成就", icon: "🏅", path: ROUTES.ACHIEVEMENTS },
  { label: "家长", icon: "👨‍👩‍👧", path: ROUTES.PARENT },
];

export function SidebarNav() {
  return (
    <aside className="flex flex-col items-center gap-4 rounded-[32px] bg-white p-4 shadow-sm">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            [
              "flex h-16 w-16 flex-col items-center justify-center rounded-3xl text-sm transition",
              isActive
                ? "bg-blue-100 text-blue-700"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200",
            ].join(" ")
          }
        >
          <span className="text-2xl">{item.icon}</span>
          <span className="mt-1 text-xs">{item.label}</span>
        </NavLink>
      ))}
    </aside>
  );
}
