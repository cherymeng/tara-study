import { useHanziStore } from "../stores/hanziStore";
import { useUserStore } from "../stores/userStore";
import { usePetStore } from "../stores/petStore";
import { ParentReviewRating } from "../types/hanzi";
import { summarizeHanziItems } from "../utils/hanzi";

const ratingCopy: Record<
  ParentReviewRating,
  { label: string; comment: string }
> = {
  great: {
    label: "很好，加 XP",
    comment: "今天读得认真，书写也有进步。",
  },
  ok: {
    label: "还可以",
    comment: "已经完成得不错，明天继续巩固。",
  },
  practice_again: {
    label: "再练一次",
    comment: "这个字还可以再熟一点，明天继续练。",
  },
};

export function ParentPage() {
  const user = useUserStore();
  const pet = usePetStore();
  const items = useHanziStore((state) => state.items);
  const tasks = useHanziStore((state) => state.tasks);
  const submissions = useHanziStore((state) => state.submissions);
  const reviews = useHanziStore((state) => state.reviews);
  const getTaskItems = useHanziStore((state) => state.getTaskItems);
  const getPendingReviewTasks = useHanziStore(
    (state) => state.getPendingReviewTasks,
  );
  const getFragileItems = useHanziStore((state) => state.getFragileItems);
  const summary = summarizeHanziItems(items);
  const reviewTask = useHanziStore((state) => state.reviewTask);

  const completedTasks = tasks.filter((task) => task.status === "completed");
  const pendingReviewTasks = getPendingReviewTasks();
  const fragileItems = getFragileItems();
  const baseXp = completedTasks.reduce((sum, task) => sum + task.baseXp, 0);
  const bonusXp = reviews.reduce((sum, review) => sum + review.bonusXp, 0);

  function handleReview(taskId: string, rating: ParentReviewRating) {
    reviewTask(taskId, rating, ratingCopy[rating].comment);
  }

  return (
    <div className="stack">
      <section className="hero">
        <p className="eyebrow">家长模式</p>
        <h1 className="title">看见孩子今天新认识了哪些字</h1>
        <p className="subtitle">
          孩子提交后已获得基础 XP。这里的评价用于鼓励、追加 XP 和安排复习，
          不会撤销孩子已经完成的打卡。
        </p>
      </section>

      <section className="grid-3">
        <div className="metric-card metric-blue">
          <p className="card-label">已学汉字</p>
          <p className="card-value value-blue">
            {summary.learned}/{summary.total}
          </p>
          <p className="muted">当前等级 Lv.{user.level}</p>
        </div>
        <div className="metric-card metric-amber">
          <p className="card-label">今日 XP</p>
          <p className="card-value value-amber">+{baseXp + bonusXp}</p>
          <p className="muted">
            基础 +{baseXp}，好评追加 +{bonusXp}
          </p>
        </div>
        <div className="metric-card metric-green">
          <p className="card-label">桐宝状态</p>
          <p className="card-value value-green">{pet.mood}</p>
          <p className="muted">{pet.name} 成长值 {pet.growth}/100</p>
        </div>
      </section>

      <section className="parent-card">
        <div className="section-head">
          <div>
            <h2 className="section-title">待评价打卡</h2>
            <p className="section-desc">
              好评会追加 XP；再练一次只进入复习计划，不扣 XP。
            </p>
          </div>
        </div>

        {pendingReviewTasks.length === 0 ? (
          <div className="empty-state">暂无待评价打卡。</div>
        ) : (
          <div className="stack">
            {pendingReviewTasks.map((task) => {
              const submission = submissions.find(
                (item) => item.taskId === task.id,
              );
              const items = getTaskItems(task.id);

              return (
                <article key={task.id} className="review-card">
                  <div className="task-topline">
                    <div>
                      <h3 className="task-title">{task.title}</h3>
                      <p className="task-desc">
                        生字：{items.map((item) => item.character).join("、")}
                      </p>
                      <p className="task-desc">
                        提交：
                        {submission?.fileName ??
                          `${submission?.readingMinutes ?? 5} 分钟认读确认`}
                      </p>
                    </div>
                    <div className="xp-badge">可追加 +{task.bonusXp}</div>
                  </div>

                  <div className="submission-actions">
                    {(["great", "ok", "practice_again"] as const).map(
                      (rating) => (
                        <button
                          key={rating}
                          type="button"
                          className={
                            rating === "great"
                              ? "primary-button"
                              : "toolbar-button"
                          }
                          onClick={() => handleReview(task.id, rating)}
                        >
                          {ratingCopy[rating].label}
                        </button>
                      ),
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="grid-2">
        <div className="parent-card">
          <h2 className="section-title">易忘字</h2>
          {fragileItems.length === 0 ? (
            <p className="section-desc">暂时没有易忘字。</p>
          ) : (
            <div className="hanzi-chip-list">
              {fragileItems.map((item) => (
                <span key={item.id} className="hanzi-chip">
                  {item.character} {item.pinyin}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="parent-card">
          <h2 className="section-title">已评价记录</h2>
          {reviews.length === 0 ? (
            <p className="section-desc">还没有评价记录。</p>
          ) : (
            <ul className="list">
              {reviews.map((review) => {
                const task = tasks.find((item) => item.id === review.taskId);
                return (
                  <li key={review.id} className="list-row">
                    <span>{task?.title}</span>
                    <strong>
                      {ratingCopy[review.rating].label}
                      {review.bonusXp ? ` +${review.bonusXp}XP` : ""}
                    </strong>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
