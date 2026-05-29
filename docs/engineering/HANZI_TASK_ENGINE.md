# 二年级生字任务引擎设计

## 1. 模块定位

`hanzi` 模块负责二年级语文生字的学习、复习、测验和打卡提交。

当前阶段它是任务系统的第一条深水区，不扩展到数学、英语或其他年级。

## 2. 核心数据模型

### HanziItem

```ts
export type HanziStatus =
  | "new"
  | "learning"
  | "review_due"
  | "mastered"
  | "fragile";

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
  masteryLevel: 0 | 1 | 2 | 3 | 4 | 5;
  status: HanziStatus;
  firstLearnedAt?: string;
  lastReviewedAt?: string;
  nextReviewAt?: string;
  reviewCount: number;
  wrongCount: number;
}
```

### HanziTask

```ts
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
```

### HanziSubmission

```ts
export interface HanziSubmission {
  id: string;
  taskId: string;
  type: HanziSubmissionType;
  fileName?: string;
  localPreviewUrl?: string;
  readingMinutes?: number;
  childNote?: string;
  createdAt: string;
}
```

### ParentReview

```ts
export type ParentReviewRating = "great" | "ok" | "practice_again";

export interface ParentReview {
  id: string;
  taskId: string;
  rating: ParentReviewRating;
  comment?: string;
  bonusXp: number;
  reviewedAt: string;
}
```

## 3. XP 与完成规则

孩子提交打卡后立即完成任务：

```text
submitHanziTask(taskId)
  ↓
保存 submission
  ↓
task.status = completed
  ↓
发放 baseXp
  ↓
更新用户 XP / 桐宝成长 / 家长报告
```

家长评价不参与基础完成判定：

```text
reviewHanziTask(taskId, rating)
  ↓
保存 ParentReview
  ↓
如果 rating = great，发放 bonusXp
  ↓
根据 rating 更新掌握度和复习计划
```

约束：

- `baseXp` 只发一次。
- `bonusXp` 只发一次。
- 家长评价不能撤销孩子已获得的基础 XP。
- `practice_again` 只影响后续复习计划，不把任务退回未完成。

## 4. 遗忘曲线规则

第一版使用固定间隔：

```ts
export const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14] as const;
```

更新规则：

| 结果 | 掌握度 | 状态 | 下次复习 |
|------|--------|------|----------|
| great | +1 | learning/mastered | 下一间隔 |
| ok | 0 或 +1 | learning | 下一间隔或 3 天内 |
| practice_again | -1 | fragile | 明天 |

当 `masteryLevel >= 5` 时，状态可置为 `mastered`。

## 5. 今日任务生成

推荐优先级：

1. 今天到期的 `review_due` 生字。
2. `fragile` 易忘字。
3. 新字。

生成策略：

```text
先取 5-8 个复习字
再取 3-5 个新字
如果复习字过多，减少新字数量
```

默认任务：

- `learn_new`：新学 3-5 个字。
- `review`：复习 5-8 个字。
- `quiz`：小测 3-5 题。

## 6. Store 拆分建议

新增 `hanziStore`：

```ts
interface HanziStore {
  items: HanziItem[];
  tasks: HanziTask[];
  submissions: HanziSubmission[];
  reviews: ParentReview[];
  generateTodayTasks: () => void;
  startTask: (taskId: string) => void;
  submitTask: (taskId: string, submission: HanziSubmissionInput) => void;
  reviewTask: (taskId: string, rating: ParentReviewRating, comment?: string) => void;
  getDueReviewItems: (date: string) => HanziItem[];
  getFragileItems: () => HanziItem[];
  getMasterySummary: () => HanziMasterySummary;
}
```

`hanziStore.submitTask` 需要调用：

- `userStore.addXp(baseXp)`
- `petStore.gainGrowth(baseXp)`
- `task/report` 相关更新

`hanziStore.reviewTask` 在 `rating = great` 时调用：

- `userStore.addXp(bonusXp)`
- `petStore.gainGrowth(bonusXp)`

## 7. 页面落地建议

### 儿童端

- 今日生字任务页。
- 生字学习卡片。
- 拍照/录音模拟提交。
- 复习队列。
- 桐宝小测。

### 家长模式

- 今日提交列表。
- 打卡效果评价。
- 追加 XP 展示。
- 易忘字和待复习字列表。

## 8. 验收标准

- 提交任务后，不等待家长评价即可获得基础 XP。
- 家长“很好”评价能追加 XP。
- 家长“再练一次”不扣 XP，只更新易忘字和复习计划。
- 刷新后本地状态可恢复。
- 今日任务生成能优先照顾待复习和易忘字。
