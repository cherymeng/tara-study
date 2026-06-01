import { useUserStore } from "../stores/userStore";
import { usePetStore } from "../stores/petStore";

export function GrowthPanel() {
  const user = useUserStore();
  const pet = usePetStore();

  return (
    <aside className="growth-panel">
      <div className="pet-avatar">
        <div className="pet-emoji">🐣</div>
        <h2 className="pet-name">{pet.name}</h2>
        <p className="muted">心情：{pet.mood}</p>
      </div>

      <div className="panel-card panel-blue">
        <p className="card-label">当前等级</p>
        <p className="panel-big value-blue">Lv.{user.level}</p>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${user.xp}%` }}
          />
        </div>

        <p className="muted">积分：{user.xp}/100</p>
      </div>

      <div className="panel-card panel-amber">
        <p className="card-label">连续打卡</p>
        <p className="panel-big value-amber">
          {user.streakDays} 天
        </p>
      </div>

      <div className="panel-card panel-green">
        <p className="panel-title value-green">今日鼓励</p>
        <p className="muted">
          太棒啦，继续完成任务，桐宝会变得更强！
        </p>
      </div>
    </aside>
  );
}
