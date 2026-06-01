import { usePetStore } from "../stores/petStore";
import { useUserStore } from "../stores/userStore";
import { getLevelProgressLabel } from "../utils/xp";

export function PetPage() {
  const pet = usePetStore();
  const user = useUserStore();

  return (
    <div className="stack">
      <section className="hero">
        <p className="eyebrow">宠物成长</p>
        <h1 className="title">照顾桐宝，让学习反馈变得可见</h1>
        <p className="subtitle">
          完成任务会推动宠物成长。MVP 阶段先建立成长反馈，后续可继续扩展喂养、装扮与互动。
        </p>
      </section>

      <section className="grid-3">
        <div className="metric-card metric-amber">
          <p className="card-label">宠物</p>
          <p className="card-value value-amber">{pet.name}</p>
          <p className="muted">当前心情：{pet.mood}</p>
        </div>
        <div className="metric-card metric-blue">
          <p className="card-label">宠物等级</p>
          <p className="card-value value-blue">Lv.{pet.level}</p>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${pet.growth}%` }} />
          </div>
          <p className="muted">成长值：{getLevelProgressLabel(pet.growth)}</p>
        </div>
        <div className="metric-card metric-green">
          <p className="card-label">学习者等级</p>
          <p className="card-value value-green">Lv.{user.level}</p>
          <p className="muted">积分：{getLevelProgressLabel(user.xp)}</p>
        </div>
      </section>

      <section className="info-card">
        <h2 className="section-title">下一步设计</h2>
        <ul className="list">
          <li className="list-row">
            <span>成长反馈</span>
            <strong>完成任务后提升成长值与心情</strong>
          </li>
          <li className="list-row">
            <span>长期激励</span>
            <strong>等级、外观、世界探索联动</strong>
          </li>
          <li className="list-row">
            <span>后续扩展</span>
            <strong>喂养、装扮、AI 陪伴</strong>
          </li>
        </ul>
      </section>
    </div>
  );
}
