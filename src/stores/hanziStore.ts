import { create } from "zustand";
import { mockHanziItems, mockHanziTasks } from "../mock/mockHanzi";
import {
  HanziItem,
  HanziMasteryLevel,
  HanziMasterySummary,
  HanziStatus,
  HanziSubmission,
  HanziSubmissionInput,
  HanziTask,
  ParentReview,
  ParentReviewRating,
} from "../types/hanzi";
import { readJson, writeJson } from "../utils/storage";
import { usePetStore } from "./petStore";
import { useUserStore } from "./userStore";
import { useWorldStore } from "./worldStore";

interface HanziState {
  items: HanziItem[];
  tasks: HanziTask[];
  submissions: HanziSubmission[];
  reviews: ParentReview[];

  startTask: (taskId: string) => void;
  submitTask: (
    taskId: string,
    submission: HanziSubmissionInput,
    awardAmount?: number,
  ) => void;
  reviewTask: (
    taskId: string,
    rating: ParentReviewRating,
    comment?: string,
  ) => void;
  resetHanzi: () => void;
  getTaskItems: (taskId: string) => HanziItem[];
  getMasterySummary: () => HanziMasterySummary;
  getPendingReviewTasks: () => HanziTask[];
  getDueReviewItems: () => HanziItem[];
  getFragileItems: () => HanziItem[];
}

const STORAGE_KEY = "tongbao-hanzi-state-v1";
const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14] as const;

type PersistedHanziState = Pick<
  HanziState,
  "items" | "tasks" | "submissions" | "reviews"
>;

const initialState: PersistedHanziState = {
  items: mockHanziItems,
  tasks: mockHanziTasks,
  submissions: [],
  reviews: [],
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function addDays(dateKey: string, days: number) {
  const date = new Date(`${dateKey}T00:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function clampMastery(value: number): HanziMasteryLevel {
  return Math.max(0, Math.min(5, value)) as HanziMasteryLevel;
}

function nextReviewDate(item: HanziItem, rating: ParentReviewRating) {
  if (rating === "practice_again") return addDays(todayKey(), 1);

  const intervalIndex = Math.min(
    item.reviewCount,
    REVIEW_INTERVAL_DAYS.length - 1,
  );
  return addDays(todayKey(), REVIEW_INTERVAL_DAYS[intervalIndex]);
}

function persist(state: PersistedHanziState) {
  writeJson(STORAGE_KEY, state);
}

function awardXp(amount: number) {
  if (amount <= 0) return;
  useUserStore.getState().addXp(amount);
  usePetStore.getState().gainGrowth(amount);
  useWorldStore.getState().syncUnlocks();
}

function updateItemsAfterSubmit(items: HanziItem[], task: HanziTask) {
  const now = todayKey();

  return items.map((item) => {
    if (!task.hanziIds.includes(item.id)) return item;

    const reviewCount = item.reviewCount + 1;
    const masteryLevel = clampMastery(
      item.masteryLevel + (task.type === "learn_new" ? 1 : 0),
    );

    const status: HanziStatus = masteryLevel >= 5 ? "mastered" : "learning";

    return {
      ...item,
      firstLearnedAt: item.firstLearnedAt ?? now,
      lastReviewedAt: now,
      nextReviewAt: addDays(now, REVIEW_INTERVAL_DAYS[0]),
      reviewCount,
      masteryLevel,
      status,
    };
  });
}

function updateItemsAfterReview(
  items: HanziItem[],
  task: HanziTask,
  rating: ParentReviewRating,
) {
  const now = todayKey();

  return items.map((item) => {
    if (!task.hanziIds.includes(item.id)) return item;

    const masteryDelta =
      rating === "great" ? 1 : rating === "practice_again" ? -1 : 0;
    const masteryLevel = clampMastery(item.masteryLevel + masteryDelta);
    const wrongCount =
      rating === "practice_again" ? item.wrongCount + 1 : item.wrongCount;
    const status: HanziStatus =
      rating === "practice_again"
        ? "fragile"
        : masteryLevel >= 5
          ? "mastered"
          : "learning";

    return {
      ...item,
      masteryLevel,
      wrongCount,
      status,
      lastReviewedAt: now,
      nextReviewAt: nextReviewDate(item, rating),
    };
  });
}

const persistedState = readJson<PersistedHanziState>(
  STORAGE_KEY,
  initialState,
);

export const useHanziStore = create<HanziState>((set, get) => ({
  ...persistedState,

  startTask: (taskId) =>
    set((state) => {
      const tasks = state.tasks.map((task) =>
        task.id === taskId && task.status === "not_started"
          ? { ...task, status: "in_progress" as const }
          : task,
      );

      persist({ ...state, tasks });
      return { tasks };
    }),

  submitTask: (taskId, submissionInput, awardAmount) => {
    const task = get().tasks.find((item) => item.id === taskId);
    if (!task || task.status === "completed") return;

    const now = new Date().toISOString();
    const submission: HanziSubmission = {
      ...submissionInput,
      id: `submission-${taskId}-${Date.now()}`,
      createdAt: now,
    };

    set((state) => {
      const tasks = state.tasks.map((item) =>
        item.id === taskId
          ? {
              ...item,
              status: "completed" as const,
              submittedAt: now,
              completedAt: now,
            }
          : item,
      );
      const submissions = [...state.submissions, submission];
      const items = updateItemsAfterSubmit(state.items, task);

      persist({ items, tasks, submissions, reviews: state.reviews });
      return { items, tasks, submissions };
    });

    awardXp(awardAmount ?? task.baseXp);
  },

  reviewTask: (taskId, rating, comment) => {
    const state = get();
    const task = state.tasks.find((item) => item.id === taskId);
    if (!task || state.reviews.some((review) => review.taskId === taskId)) {
      return;
    }

    const bonusXp = rating === "great" ? task.bonusXp : 0;
    const review: ParentReview = {
      id: `review-${taskId}-${Date.now()}`,
      taskId,
      rating,
      comment,
      bonusXp,
      reviewedAt: new Date().toISOString(),
    };

    set((current) => {
      const items = updateItemsAfterReview(current.items, task, rating);
      const reviews = [...current.reviews, review];
      const tasks = current.tasks.map((item) =>
        item.id === taskId ? { ...item, parentReviewId: review.id } : item,
      );

      persist({ items, tasks, submissions: current.submissions, reviews });
      return { items, tasks, reviews };
    });

    awardXp(bonusXp);
  },

  resetHanzi: () => {
    persist(initialState);
    set(initialState);
  },

  getTaskItems: (taskId) => {
    const task = get().tasks.find((item) => item.id === taskId);
    if (!task) return [];
    return get().items.filter((item) => task.hanziIds.includes(item.id));
  },

  getMasterySummary: () => {
    const items = get().items;

    return {
      total: items.length,
      learned: items.filter((item) => item.masteryLevel > 0).length,
      mastered: items.filter((item) => item.status === "mastered").length,
      fragile: items.filter((item) => item.status === "fragile").length,
      dueReview: get().getDueReviewItems().length,
    };
  },

  getPendingReviewTasks: () =>
    get().tasks.filter(
      (task) =>
        task.status === "completed" &&
        !get().reviews.some((review) => review.taskId === task.id),
    ),

  getDueReviewItems: () => {
    const today = todayKey();
    return get().items.filter(
      (item) =>
        item.status === "review_due" ||
        Boolean(item.nextReviewAt && item.nextReviewAt <= today),
    );
  },

  getFragileItems: () =>
    get().items.filter((item) => item.status === "fragile"),
}));
