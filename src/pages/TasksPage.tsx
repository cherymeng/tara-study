import { ChangeEvent, useState } from "react";
import { useHanziStore } from "../stores/hanziStore";
import { HanziSubmissionType, HanziTask } from "../types/hanzi";
import { summarizeHanziItems } from "../utils/hanzi";

const submissionLabels: Record<HanziSubmissionType, string> = {
  audio: "录音打卡",
  photo: "拍照上传",
  reading: "阅读确认",
};

const taskTypeLabels: Record<HanziTask["type"], string> = {
  learn_new: "新学",
  review: "复习",
  quiz: "小测",
};

export function TasksPage() {
  const tasks = useHanziStore((state) => state.tasks);
  const items = useHanziStore((state) => state.items);
  const submissions = useHanziStore((state) => state.submissions);
  const startTask = useHanziStore((state) => state.startTask);
  const submitTask = useHanziStore((state) => state.submitTask);
  const resetHanzi = useHanziStore((state) => state.resetHanzi);
  const getTaskItems = useHanziStore((state) => state.getTaskItems);
  const summary = summarizeHanziItems(items);
  const [notesByTask, setNotesByTask] = useState<Record<string, string>>({});
  const [readingMinutesByTask, setReadingMinutesByTask] = useState<
    Record<string, number>
  >({});

  const completedCount = tasks.filter((task) => task.status === "completed").length;
  const earnedXp = tasks
    .filter((task) => task.status === "completed")
    .reduce((sum, task) => sum + task.baseXp, 0);

  function handleSubmitWithType(
    task: HanziTask,
    type: HanziSubmissionType,
    event?: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event?.target.files?.[0];

    submitTask(task.id, {
      taskId: task.id,
      type,
      fileName: file?.name,
      readingMinutes: readingMinutesByTask[task.id] || undefined,
      childNote: notesByTask[task.id],
    });
  }

  return (
    <div className="stack">
      <section className="hero">
        <p className="eyebrow">二年级语文</p>
        <h1 className="title">今日生字增长任务</h1>
        <p className="subtitle">
          新学、复习和小测都会帮助你认识更多汉字。提交打卡后马上获得 XP，
          家长的好评还会额外加 XP。
        </p>
      </section>

      <section className="grid-3">
        <div className="metric-card metric-blue">
          <p className="card-label">今日生字任务</p>
          <p className="card-value value-blue">{tasks.length} 个</p>
          <p className="muted">已完成 {completedCount} 个</p>
        </div>
        <div className="metric-card metric-amber">
          <p className="card-label">今日基础 XP</p>
          <p className="card-value value-amber">+{earnedXp}</p>
          <p className="muted">家长好评可再加 XP</p>
        </div>
        <div className="metric-card metric-green">
          <p className="card-label">识字进度</p>
          <p className="card-value value-green">
            {summary.learned}/{summary.total}
          </p>
          <p className="muted">
            易忘 {summary.fragile} 个，待复习 {summary.dueReview} 个
          </p>
        </div>
      </section>

      <section>
        <div className="section-head">
          <div>
            <h2 className="section-title">今日任务</h2>
            <p className="section-desc">
              先开始任务，再选择录音、照片或阅读确认来模拟提交。
            </p>
          </div>
          <button type="button" className="toolbar-button" onClick={resetHanzi}>
            重置生字进度
          </button>
        </div>

        <div className="stack">
          {tasks.map((task) => {
            const items = getTaskItems(task.id);
            const submission = submissions.find(
              (item) => item.taskId === task.id,
            );
            const completed = task.status === "completed";

            return (
              <article
                key={task.id}
                className={[
                  "hanzi-task-card",
                  completed ? "is-completed" : "",
                ].join(" ")}
              >
                <div className="task-topline">
                  <div>
                    <span className="pill">{taskTypeLabels[task.type]}</span>
                    <h3 className="task-title">{task.title}</h3>
                    <p className="task-desc">{task.description}</p>
                  </div>
                  <div className="xp-badge">XP +{task.baseXp}</div>
                </div>

                <div className="hanzi-grid">
                  {items.map((item) => (
                    <div key={item.id} className="hanzi-card">
                      <div className="hanzi-char">{item.character}</div>
                      <div className="hanzi-pinyin">{item.pinyin}</div>
                      <div className="hanzi-words">{item.words.join(" / ")}</div>
                      <p>{item.exampleSentence}</p>
                      <small>{item.strokeHint}</small>
                    </div>
                  ))}
                </div>

                <div className="submission-panel">
                  <label className="field-label" htmlFor={`${task.id}-note`}>
                    打卡备注
                  </label>
                  <textarea
                    id={`${task.id}-note`}
                    disabled={completed}
                    value={notesByTask[task.id] ?? ""}
                    onChange={(event) =>
                      setNotesByTask((current) => ({
                        ...current,
                        [task.id]: event.target.value,
                      }))
                    }
                    placeholder="可以写：我读了两遍，写了两行。"
                  />

                  {task.submissionTypes.includes("reading") ? (
                    <label className="inline-field">
                      阅读/认读分钟
                      <input
                        type="number"
                        min="1"
                        max="30"
                        disabled={completed}
                        value={readingMinutesByTask[task.id] ?? 5}
                        onChange={(event) =>
                          setReadingMinutesByTask((current) => ({
                            ...current,
                            [task.id]: Number(event.target.value),
                          }))
                        }
                      />
                    </label>
                  ) : null}

                  <div className="submission-actions">
                    {task.status === "not_started" ? (
                      <button
                        type="button"
                        className="primary-button"
                        onClick={() => startTask(task.id)}
                      >
                        开始任务
                      </button>
                    ) : null}

                    {task.submissionTypes.map((type) =>
                      type === "reading" ? (
                        <button
                          key={type}
                          type="button"
                          className="toolbar-button"
                          disabled={completed}
                          onClick={() => handleSubmitWithType(task, type)}
                        >
                          {submissionLabels[type]}
                        </button>
                      ) : (
                        <label
                          key={type}
                          className={[
                            "file-button",
                            completed ? "is-disabled" : "",
                          ].join(" ")}
                        >
                          {submissionLabels[type]}
                          <input
                            type="file"
                            disabled={completed}
                            accept={type === "photo" ? "image/*" : "audio/*"}
                            onChange={(event) =>
                              handleSubmitWithType(task, type, event)
                            }
                          />
                        </label>
                      ),
                    )}
                  </div>

                  {completed ? (
                    <div className="submission-result">
                      <strong>已完成，基础 XP 已发放。</strong>
                      <span>
                        {submission?.fileName
                          ? `提交材料：${submission.fileName}`
                          : "提交方式：阅读确认"}
                      </span>
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
