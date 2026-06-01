import { Link } from "react-router-dom";
import { useHanziStore } from "../stores/hanziStore";
import { useUserStore } from "../stores/userStore";
import { useWorldStore } from "../stores/worldStore";
import { summarizeHanziItems } from "../utils/hanzi";
import { ROUTES } from "../constants/routes";

export function HomePage() {
  const tasks = useHanziStore((state) => state.tasks);
  const items = useHanziStore((state) => state.items);
  const getTaskItems = useHanziStore((state) => state.getTaskItems);
  const summary = summarizeHanziItems(items);
  const user = useUserStore();
  const regions = useWorldStore((state) => state.regions);

  const completedCount = tasks.filter((task) => task.status === "completed").length;
  const unfinishedCount = tasks.length - completedCount;
  const totalPoints = tasks.reduce((sum, task) => sum + task.baseXp, 0);

  return (
    <div className="stack">
      <section className="hero">
        <p className="eyebrow">欢迎回来</p>
        <h1 className="title">{user.name}，今天认识更多汉字！</h1>
        <p className="subtitle">
          今天先专注二年级语文生字：新学、复习和小测都会让桐宝一起成长。
        </p>
      </section>

      <section className="home-action-grid">
        <Link to={ROUTES.TASKS} className="home-action-button metric-blue">
          <span className="card-label">今日任务</span>
          <strong className="card-value value-blue">
            {unfinishedCount > 0 ? `未完成 ${unfinishedCount} 项` : "全部完成"}
          </strong>
          <span className="muted">
            已完成 {completedCount}/{tasks.length}
          </span>
        </Link>

        <Link
          to={ROUTES.HANZI_REPOSITORY}
          className="home-action-button metric-amber"
        >
          <span className="card-label">识字量</span>
          <strong className="card-value value-amber">
            {summary.learned}/{summary.total}
          </strong>
          <span className="muted">
            熟悉 {summary.mastered} 个，认识 {summary.learned} 个
          </span>
        </Link>
      </section>

      <section>
        <div className="section-head">
          <div>
            <h2 className="section-title">今日安排</h2>
            <p className="section-desc">
              提交打卡后立即获得基础积分，家长好评还能追加积分。
            </p>
          </div>
          <div className="pill">基础奖励：积分 +{totalPoints}</div>
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
                  <div className="pill">积分 +{task.baseXp}</div>
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
