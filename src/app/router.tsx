import { createBrowserRouter } from "react-router-dom";
import { TabletShell } from "../layouts/TabletShell";
import { HomePage } from "../pages/HomePage";
import { TasksPage } from "../pages/TasksPage";
import { PetPage } from "../pages/PetPage";
import { WorldPage } from "../pages/WorldPage";
import { AchievementsPage } from "../pages/AchievementsPage";
import { ParentPage } from "../pages/ParentPage";
import { ROUTES } from "../constants/routes";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <TabletShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTES.TASKS, element: <TasksPage /> },
      { path: ROUTES.PET, element: <PetPage /> },
      { path: ROUTES.WORLD, element: <WorldPage /> },
      { path: ROUTES.ACHIEVEMENTS, element: <AchievementsPage /> },
      { path: ROUTES.PARENT, element: <ParentPage /> },
    ],
  },
]);
