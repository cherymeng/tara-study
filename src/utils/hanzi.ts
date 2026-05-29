import { HanziItem, HanziMasterySummary } from "../types/hanzi";

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function summarizeHanziItems(items: HanziItem[]): HanziMasterySummary {
  const today = todayKey();

  return {
    total: items.length,
    learned: items.filter((item) => item.masteryLevel > 0).length,
    mastered: items.filter((item) => item.status === "mastered").length,
    fragile: items.filter((item) => item.status === "fragile").length,
    dueReview: items.filter(
      (item) =>
        item.status === "review_due" ||
        Boolean(item.nextReviewAt && item.nextReviewAt <= today),
    ).length,
  };
}
