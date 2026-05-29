import { useHanziStore } from "../stores/hanziStore";
import { useUserStore } from "../stores/userStore";
import { usePetStore } from "../stores/petStore";
import { useWorldStore } from "../stores/worldStore";
import { summarizeHanziItems } from "../utils/hanzi";

export function HomePage() {
  const tasks = useHanziStore((state) => state.tasks);
  const items = useHanziStore((state) => state.items);
  const getTaskItems = useHanziStore((state) => state.getTaskItems);
  const summary = summarizeHanziItems(items);
  const user = useUserStore();
  const pet = usePetStore();
  const regions = useWorldStore((state) => state.regions);

  const completedCount = tasks.filter((task) => task.status === "completed").length;
  const progress = Math.round((completedCount / tasks.length) * 100);
  const totalXp = tasks.reduce((sum, task) => sum + task.baseXp, 0);

  return (
    <div className="stack">
      <section className="hero">
        <p className="eyebrow">欢迎回来</p>
        <h1 className="title">{user.name}，今天认识更多汉字！</h1>
        <p className="subtitle">
          今天先专注二年级语文生字：新学、复习和小测都会让桐宝一起成长。
        </p>
      </section>

      <section className="grid-3">
        <div className="metric-card metric-blue">
          <p className="card-label">今日生字任务</p>
          <p className="card-value value-blue">
            {completedCount}/{tasks.length}
          </p>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <p className="muted">完成度 {progress}%</p>
        </div>

        <div className="metric-card metric-amber">
          <p className="card-label">识字进度</p>
          <p className="card-value value-amber">
            {summary.learned}/{summary.total}
          </p>
          <p className="muted">
            易忘 {summary.fragile} 个，待复习 {summary.dueReview} 个
          </p>
        </div>

        <div className="metric-card metric-green">
          <p className="card-label">桐宝状态</p>
          <div className="task-topline">
            <div className="pet-emoji">🐣</div>
            <div>
              <p className="card-value value-green">{pet.name}</p>
              <p className="muted">心情：{pet.mood}</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="section-head">
          <div>
            <h2 className="section-title">今日安排</h2>
            <p className="section-desc">
              提交打卡后立即获得基础 XP，家长好评还能追加 XP。
            </p>
          </div>
          <div className="pill">基础奖励：XP +{totalXp}</div>
        </div>

        <div className="grid-3">
          {tasks.map((task) => {
            const items = getTaskItems(task.id);
            return (
              <article
                key={task.id}
                className={[
                  "task-card",
                  task.status === "completed" ? "is-completed" : "",
                ].join(" ")}
              >
                <div className="task-topline">
                  <div className="task-icon">
                    {task.status === "completed" ? "✅" : "字"}
                  </div>
                  <div className="pill">XP +{task.baseXp}</div>
                </div>
                <h3 className="task-title">{task.title}</h3>
                <p className="task-desc">
                  {items.map((item) => item.character).join("、")}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section>
        <div className="section-head">
          <div>
            <h2 className="section-title">世界探索</h2>
            <p className="section-desc">升级后会解锁新的冒险区域</p>
          </div>
        </div>

        <div className="grid-2">
          {regions.map((region) => (
            <div
              key={region.id}
              className={[
                "region-card",
                region.unlocked ? "is-unlocked" : "is-locked",
              ].join(" ")}
            >
              <div className="region-icon">{region.unlocked ? "🗺️" : "🔒"}</div>
              <h3 className="region-title">{region.name}</h3>
              <p className="region-desc">
                {region.unlocked
                  ? "已解锁，可以开始探索。"
                  : `达到 Lv.${region.requiredLevel} 后解锁`}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
