import { useHanziStore } from "../stores/hanziStore";
import { useUserStore } from "../stores/userStore";
import { summarizeHanziItems } from "../utils/hanzi";

export function AchievementsPage() {
  const tasks = useHanziStore((state) => state.tasks);
  const items = useHanziStore((state) => state.items);
  const reviews = useHanziStore((state) => state.reviews);
  const summary = summarizeHanziItems(items);
  const user = useUserStore();

  const completedCount = tasks.filter((task) => task.status === "completed").length;
  const greatReviewCount = reviews.filter(
    (review) => review.rating === "great",
  ).length;

  const achievements = [
    {
      id: "first-hanzi-task",
      icon: "字",
      title: "认识新字",
      desc: "完成任意一个生字任务",
      unlocked: completedCount > 0,
    },
    {
      id: "today-hanzi-all",
      icon: "✓",
      title: "今日生字全勤",
      desc: "完成今天全部生字任务",
      unlocked: completedCount === tasks.length,
    },
    {
      id: "parent-great",
      icon: "+",
      title: "好评鼓励",
      desc: "获得一次家长很好评价",
      unlocked: greatReviewCount > 0,
    },
    {
      id: "ten-learned",
      icon: "10",
      title: "识字小达人",
      desc: "累计学习 10 个生字",
      unlocked: summary.learned >= 10,
    },
    {
      id: "level-up",
      icon: "Lv",
      title: "成长升级",
      desc: "学习者等级达到 Lv.2",
      unlocked: user.level >= 2,
    },
  ];

  return (
    <div className="stack">
      <section className="hero">
        <p className="eyebrow">成长成就</p>
        <h1 className="title">每多认识一个字，都是看得见的成长</h1>
        <p className="subtitle">
          成就先围绕二年级生字增长设计：完成任务、获得好评、提高识字量。
        </p>
      </section>

      <section className="grid-3">
        <div className="metric-card metric-green">
          <p className="card-label">今日完成</p>
          <p className="card-value value-green">{completedCount} 个</p>
        </div>
        <div className="metric-card metric-amber">
          <p className="card-label">已学汉字</p>
          <p className="card-value value-amber">{summary.learned} 个</p>
        </div>
        <div className="metric-card metric-blue">
          <p className="card-label">阶段掌握</p>
          <p className="card-value value-blue">{summary.mastered} 个</p>
        </div>
      </section>

      <section>
        <div className="section-head">
          <h2 className="section-title">生字成就</h2>
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
