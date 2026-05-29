import { useWorldStore } from "../stores/worldStore";
import { useUserStore } from "../stores/userStore";

export function WorldPage() {
  const user = useUserStore();
  const regions = useWorldStore((state) => state.regions);
  const unlockedCount = regions.filter((region) => region.unlocked).length;

  return (
    <div className="stack">
      <section className="hero">
        <p className="eyebrow">世界探索</p>
        <h1 className="title">把成长变成一张可探索的地图</h1>
        <p className="subtitle">
          世界系统用于承接长期目标。孩子升级后解锁新区域，形成“继续完成任务”的期待。
        </p>
      </section>

      <section className="grid-3">
        <div className="metric-card metric-indigo">
          <p className="card-label">当前等级</p>
          <p className="card-value">Lv.{user.level}</p>
        </div>
        <div className="metric-card metric-green">
          <p className="card-label">已解锁区域</p>
          <p className="card-value value-green">{unlockedCount} 个</p>
        </div>
        <div className="metric-card">
          <p className="card-label">全部区域</p>
          <p className="card-value">{regions.length} 个</p>
        </div>
      </section>

      <section>
        <div className="section-head">
          <div>
            <h2 className="section-title">探索区域</h2>
            <p className="section-desc">区域状态会随着用户等级自动同步</p>
          </div>
        </div>
        <div className="grid-2">
          {regions.map((region) => (
            <article
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
                  ? "已解锁，可以进入探索。"
                  : `需要达到 Lv.${region.requiredLevel}`}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
