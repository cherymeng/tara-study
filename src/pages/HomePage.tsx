import { useTaskStore } from "../stores/taskStore";
import { useUserStore } from "../stores/userStore";
import { usePetStore } from "../stores/petStore";
import { useWorldStore } from "../stores/worldStore";
import { useTodayProgress } from "../hooks/useTodayProgress";

export function HomePage() {
  const tasks = useTaskStore((state) => state.tasks);
  const completeTask = useTaskStore((state) => state.completeTask);
  const user = useUserStore();
  const pet = usePetStore();
  const regions = useWorldStore((state) => state.regions);
  const { completedCount, progress, totalXp } = useTodayProgress(tasks);

  return (
    <div className="stack">
      <section className="hero">
        <p className="eyebrow">欢迎回来</p>
        <h1 className="title">{user.name}，今天也要继续成长！</h1>
        <p className="subtitle">
          桐宝正在等你完成今日任务。完成学习、获得 XP、照顾宠物，再解锁新的世界。
        </p>
      </section>

      <section className="grid-3">
        <div className="metric-card metric-blue">
          <p className="card-label">今日任务进度</p>
          <p className="card-value value-blue">
            {completedCount}/{tasks.length}
          </p>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <p className="muted">完成度 {progress}%</p>
        </div>

        <div className="metric-card metric-amber">
          <p className="card-label">宠物状态</p>
          <div className="task-topline">
            <div className="pet-emoji">🐣</div>
            <div>
              <p className="card-value value-amber">{pet.name}</p>
              <p className="muted">心情：{pet.mood}</p>
            </div>
          </div>
        </div>

        <div className="metric-card metric-green">
          <p className="card-label">连续打卡</p>
          <p className="card-value value-green">{user.streakDays} 天</p>
          <p className="muted">坚持很棒，继续保持。</p>
        </div>
      </section>

      <section>
        <div className="section-head">
          <div>
            <h2 className="section-title">今日任务</h2>
            <p className="section-desc">点击卡片完成任务并获得 XP</p>
          </div>
          <div className="pill">今日奖励：XP +{totalXp}</div>
        </div>

        <div className="grid-2">
          {tasks.map((task) => (
            <button
              key={task.id}
              disabled={task.completed}
              onClick={() => completeTask(task.id)}
              className={["task-card", task.completed ? "is-completed" : ""]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="task-topline">
                <div className="task-icon">{task.completed ? "🎉" : "⭐"}</div>
                <div className="pill">XP +{task.xp}</div>
              </div>
              <h3 className="task-title">{task.title}</h3>
              <p className="task-desc">
                {task.completed ? "已完成，太棒啦！" : "点击完成这个成长任务"}
              </p>
            </button>
          ))}
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
