export type HanziStatus =
  | "new"
  | "learning"
  | "review_due"
  | "mastered"
  | "fragile";

export type HanziMasteryLevel = 0 | 1 | 2 | 3 | 4 | 5;

export interface HanziItem {
  id: string;
  character: string;
  pinyin: string;
  words: string[];
  meaning: string;
  exampleSentence: string;
  strokeHint?: string;
  grade: 2;
  source: "system" | "parent";
  masteryLevel: HanziMasteryLevel;
  status: HanziStatus;
  firstLearnedAt?: string;
  lastReviewedAt?: string;
  nextReviewAt?: string;
  reviewCount: number;
  wrongCount: number;
}

export type HanziTaskType = "learn_new" | "review" | "quiz";

export type HanziSubmissionType = "photo" | "audio" | "reading";

export type HanziTaskStatus =
  | "not_started"
  | "in_progress"
  | "submitted"
  | "completed";

export interface HanziTask {
  id: string;
  type: HanziTaskType;
  title: string;
  description: string;
  hanziIds: string[];
  status: HanziTaskStatus;
  submissionTypes: HanziSubmissionType[];
  baseXp: number;
  bonusXp: number;
  createdBy: "system" | "parent";
  submittedAt?: string;
  completedAt?: string;
  parentReviewId?: string;
}

export interface HanziSubmission {
  id: string;
  taskId: string;
  type: HanziSubmissionType;
  fileName?: string;
  readingMinutes?: number;
  childNote?: string;
  createdAt: string;
}

export type ParentReviewRating = "great" | "ok" | "practice_again";

export interface ParentReview {
  id: string;
  taskId: string;
  rating: ParentReviewRating;
  comment?: string;
  bonusXp: number;
  reviewedAt: string;
}

export interface HanziMasterySummary {
  total: number;
  learned: number;
  mastered: number;
  fragile: number;
  dueReview: number;
}

export type HanziSubmissionInput = Omit<
  HanziSubmission,
  "id" | "createdAt"
>;
