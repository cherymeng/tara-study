import { useHanziStore } from "../stores/hanziStore";
import { summarizeHanziItems } from "../utils/hanzi";

const statusLabels = {
  new: "未认识",
  learning: "认识中",
  review_due: "待复习",
  mastered: "熟悉",
  fragile: "易忘",
} as const;

export function HanziRepositoryPage() {
  const items = useHanziStore((state) => state.items);
  const summary = summarizeHanziItems(items);
  const familiarCount = items.filter((item) => item.masteryLevel >= 3).length;

  return (
    <div className="stack">
      <section className="hero">
        <p className="eyebrow">识字量仓库</p>
        <h1 className="title">已经认识的生字，都收在这里</h1>
        <p className="subtitle">
          认识、熟悉、待复习和易忘的字会一起汇总，方便随时回看。
        </p>
      </section>

      <section className="grid-3">
        <div className="metric-card metric-amber">
          <p className="card-label">认识生字</p>
          <p className="card-value value-amber">
            {summary.learned}/{summary.total}
          </p>
        </div>
        <div className="metric-card metric-green">
          <p className="card-label">熟悉生字</p>
          <p className="card-value value-green">{familiarCount}</p>
        </div>
        <div className="metric-card metric-blue">
          <p className="card-label">待加强</p>
          <p className="card-value value-blue">
            {summary.fragile + summary.dueReview}
          </p>
        </div>
      </section>

      <section>
        <div className="section-head">
          <div>
            <h2 className="section-title">全部生字</h2>
            <p className="section-desc">按当前掌握状态展示。</p>
          </div>
        </div>

        <div className="hanzi-repository-grid">
          {items.map((item) => (
            <article key={item.id} className="hanzi-repository-card">
              <div className="hanzi-repository-char">{item.character}</div>
              <div>
                <div className="task-topline">
                  <span className="pinyin-tag">{item.pinyin}</span>
                  <span className="pill">{statusLabels[item.status]}</span>
                </div>
                <p className="hanzi-words">{item.words.join(" / ")}</p>
                <p className="task-desc">{item.meaning}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
