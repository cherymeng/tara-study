import { useTaskStore } from "../stores/taskStore";
import { useUserStore } from "../stores/userStore";
import { useTodayProgress } from "../hooks/useTodayProgress";

export function AchievementsPage() {
  const tasks = useTaskStore((state) => state.tasks);
  const user = useUserStore();
  const { completedCount, progress, earnedXp } = useTodayProgress(tasks);

  const achievements = [
    {
      id: "first-task",
      icon: "🌟",
      title: "迈出第一步",
      desc: "完成任意一个今日任务",
      unlocked: completedCount > 0,
    },
    {
      id: "all-tasks",
      icon: "🏅",
      title: "今日全勤",
      desc: "完成全部今日任务",
      unlocked: progress === 100,
    },
    {
      id: "level-up",
      icon: "🚀",
      title: "成长升级",
      desc: "学习者等级达到 Lv.2",
      unlocked: user.level >= 2,
    },
  ];

  return (
    <div className="stack">
      <section className="hero">
        <p className="eyebrow">成长成就</p>
        <h1 className="title">记录每一次完成带来的正反馈</h1>
        <p className="subtitle">
          成就系统先围绕 MVP 成长循环落地，后续可以扩展长期徽章、阶段目标与收藏。
        </p>
      </section>

      <section className="grid-3">
        <div className="metric-card metric-green">
          <p className="card-label">今日完成</p>
          <p className="card-value value-green">{completedCount} 个</p>
        </div>
        <div className="metric-card metric-amber">
          <p className="card-label">获得 XP</p>
          <p className="card-value value-amber">+{earnedXp}</p>
        </div>
        <div className="metric-card metric-blue">
          <p className="card-label">完成度</p>
          <p className="card-value value-blue">{progress}%</p>
        </div>
      </section>

      <section>
        <div className="section-head">
          <h2 className="section-title">MVP 成就</h2>
        </div>
        <div className="grid-3">
          {achievements.map((achievement) => (
            <article key={achievement.id} className="achievement-card">
              <div className="achievement-icon">{achievement.icon}</div>
              <h3 className="achievement-title">{achievement.title}</h3>
              <p className="achievement-desc">{achievement.desc}</p>
              <p className="pill">{achievement.unlocked ? "已点亮" : "待完成"}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
