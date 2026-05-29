import { create } from "zustand";
import { mockTasks } from "../mock/mockTasks";
import { Task } from "../types/task";
import { useUserStore } from "./userStore";
import { usePetStore } from "./petStore";
import { useWorldStore } from "./worldStore";

interface TaskState {
  tasks: Task[];

  completeTask: (taskId: string) => void;
  resetTasks: () => void;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: mockTasks,

  completeTask: (taskId) => {
    const task = get().tasks.find((item) => item.id === taskId);

    if (!task || task.completed) return;

    set((state) => ({
      tasks: state.tasks.map((item) =>
        item.id === taskId
          ? {
              ...item,
              completed: true,
            }
          : item
      ),
    }));

    useUserStore.getState().addXp(task.xp);
    usePetStore.getState().gainGrowth(task.xp);
    useWorldStore.getState().syncUnlocks();
  },

  resetTasks: () => set({ tasks: mockTasks }),
}));
