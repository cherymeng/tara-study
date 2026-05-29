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
    <aside className="sidebar">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            ["nav-item", isActive ? "active" : ""].filter(Boolean).join(" ")
          }
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </NavLink>
      ))}
    </aside>
  );
}
