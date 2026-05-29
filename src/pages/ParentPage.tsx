import { useTaskStore } from "../stores/taskStore";
import { useUserStore } from "../stores/userStore";
import { usePetStore } from "../stores/petStore";
import { useTodayProgress } from "../hooks/useTodayProgress";

export function ParentPage() {
  const tasks = useTaskStore((state) => state.tasks);
  const user = useUserStore();
  const pet = usePetStore();
  const { completedCount, progress, earnedXp } = useTodayProgress(tasks);

  return (
    <div className="stack">
      <section className="hero">
        <p className="eyebrow">家长看板</p>
        <h1 className="title">用温和的方式看见孩子的成长</h1>
        <p className="subtitle">
          MVP 阶段先提供今日进度、成长反馈和鼓励建议，后续再扩展任务派发与学习报告。
        </p>
      </section>

      <section className="grid-3">
        <div className="metric-card metric-blue">
          <p className="card-label">今日完成度</p>
          <p className="card-value value-blue">{progress}%</p>
          <p className="muted">完成 {completedCount}/{tasks.length} 项任务</p>
        </div>
        <div className="metric-card metric-amber">
          <p className="card-label">今日 XP</p>
          <p className="card-value value-amber">+{earnedXp}</p>
          <p className="muted">当前等级 Lv.{user.level}</p>
        </div>
        <div className="metric-card metric-green">
          <p className="card-label">宠物反馈</p>
          <p className="card-value value-green">{pet.mood}</p>
          <p className="muted">{pet.name} 的成长值 {pet.growth}/100</p>
        </div>
      </section>

      <section className="parent-card">
        <div className="section-head">
          <div>
            <h2 className="section-title">今日任务明细</h2>
            <p className="section-desc">家长端先以查看和鼓励为主</p>
          </div>
        </div>
        <ul className="list">
          {tasks.map((task) => (
            <li key={task.id} className="list-row">
              <span>{task.title}</span>
              <strong>{task.completed ? "已完成" : "待完成"}</strong>
            </li>
          ))}
        </ul>
      </section>

      <section className="parent-card">
        <h2 className="section-title">鼓励建议</h2>
        <p className="section-desc">
          优先肯定孩子已经完成的部分，再一起选择一个最容易继续完成的任务。
        </p>
      </section>
    </div>
  );
}
