import { useTaskStore } from "../stores/taskStore";
import { useTodayProgress } from "../hooks/useTodayProgress";

export function TasksPage() {
  const tasks = useTaskStore((state) => state.tasks);
  const completeTask = useTaskStore((state) => state.completeTask);
  const resetTasks = useTaskStore((state) => state.resetTasks);
  const { completedTasks, unfinishedTasks, completedCount, earnedXp } =
    useTodayProgress(tasks);

  return (
    <div className="stack">
      <section className="hero">
        <p className="eyebrow">任务中心</p>
        <h1 className="title">今天要完成哪些成长任务？</h1>
        <p className="subtitle">
          每完成一个任务，都会获得 XP，并帮助宠物桐宝成长。
        </p>
      </section>

      <section className="grid-3">
        <div className="metric-card">
          <p className="card-label">今日任务</p>
          <p className="card-value">{tasks.length} 个</p>
        </div>
        <div className="metric-card metric-green">
          <p className="card-label">已完成</p>
          <p className="card-value value-green">{completedCount} 个</p>
        </div>
        <div className="metric-card metric-amber">
          <p className="card-label">已获得 XP</p>
          <p className="card-value value-amber">+{earnedXp}</p>
        </div>
      </section>

      <section>
        <div className="section-head">
          <div>
            <h2 className="section-title">待完成任务</h2>
            <p className="section-desc">点击任务卡片即可完成打卡</p>
          </div>
          <button type="button" className="toolbar-button" onClick={resetTasks}>
            重置任务
          </button>
        </div>

        {unfinishedTasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-emoji">🎉</div>
            <h3>今日任务全部完成！</h3>
            <p>桐宝非常开心，明天继续加油。</p>
          </div>
        ) : (
          <div className="grid-2">
            {unfinishedTasks.map((task) => (
              <button
                key={task.id}
                onClick={() => completeTask(task.id)}
                className="task-card"
              >
                <div className="task-topline">
                  <div className="task-icon">⭐</div>
                  <div className="pill">XP +{task.xp}</div>
                </div>
                <h3 className="task-title">{task.title}</h3>
                <p className="task-desc">
                  完成后可获得成长值，并推动宠物成长。
                </p>
              </button>
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="section-head">
          <h2 className="section-title">已完成任务</h2>
        </div>

        {completedTasks.length === 0 ? (
          <div className="empty-state">还没有完成任务，先从一个简单任务开始吧。</div>
        ) : (
          <div className="grid-2">
            {completedTasks.map((task) => (
              <div key={task.id} className="task-card is-completed">
                <div className="task-icon">✅</div>
                <h3 className="task-title">{task.title}</h3>
                <p className="task-desc">已获得 XP +{task.xp}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
