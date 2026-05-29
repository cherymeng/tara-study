import { Task } from "../types/task";
import { getProgressPercent } from "../utils/xp";

export function useTodayProgress(tasks: Task[]) {
  const completedTasks = tasks.filter((task) => task.completed);
  const unfinishedTasks = tasks.filter((task) => !task.completed);
  const completedCount = completedTasks.length;
  const totalXp = tasks.reduce((sum, task) => sum + task.xp, 0);
  const earnedXp = completedTasks.reduce((sum, task) => sum + task.xp, 0);
  const progress = getProgressPercent(completedCount, tasks.length);

  return {
    completedTasks,
    unfinishedTasks,
    completedCount,
    totalXp,
    earnedXp,
    progress,
  };
}
