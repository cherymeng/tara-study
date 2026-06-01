import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BookOpenCheck,
  CheckCircle2,
  Clock3,
} from "lucide-react";
import { useHanziStore } from "../stores/hanziStore";
import { HanziTask } from "../types/hanzi";

const taskTypeLabels: Record<HanziTask["type"], string> = {
  learn_new: "新学",
  review: "复习",
  quiz: "小测",
};

const taskTitleLabels: Record<HanziTask["type"], string> = {
  learn_new: "认新字",
  review: "增强识字量",
  quiz: "识字小测",
};

const taskActionLabels: Record<HanziTask["type"], string> = {
  learn_new: "开始学习",
  review: "开始复习",
  quiz: "开始小测",
};

type TaskFilter = "all" | "chinese" | "math" | "english" | "unfinished";

const taskFilters: Array<{ id: TaskFilter; label: string }> = [
  { id: "all", label: "全部" },
  { id: "chinese", label: "语文" },
  { id: "math", label: "数学" },
  { id: "english", label: "英语" },
  { id: "unfinished", label: "未完成" },
];

export function TasksPage() {
  const [activeFilter, setActiveFilter] = useState<TaskFilter>("all");
  const tasks = useHanziStore((state) => state.tasks);

  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === "unfinished") return task.status !== "completed";
    if (activeFilter === "math" || activeFilter === "english") return false;
    return true;
  });

  const getFilterCount = (filter: TaskFilter) => {
    if (filter === "unfinished") {
      return tasks.filter((task) => task.status !== "completed").length;
    }
    if (filter === "math" || filter === "english") return 0;
    return tasks.length;
  };

  return (
    <div className="full-task-page">
      <header className="full-task-header">
        <Link to="/" className="icon-link" aria-label="返回首页">
          <ArrowLeft size={22} />
        </Link>
        <div>
          <h1 className="tasks-plan-title">我的学习计划</h1>
        </div>
      </header>

      <main className="full-task-main">
        <section className="task-filter-bar" aria-label="学习计划筛选">
          {taskFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={[
                "task-filter-button",
                activeFilter === filter.id ? "is-active" : "",
              ].join(" ")}
              onClick={() => setActiveFilter(filter.id)}
            >
              <span>{filter.label}</span>
              <span className="task-filter-count">{getFilterCount(filter.id)}</span>
            </button>
          ))}
        </section>

        <section className="daily-task-list">
          {filteredTasks.length === 0 ? (
            <div className="daily-task-empty">
              <BookOpenCheck size={30} />
              <p>这个分类下暂时没有学习任务</p>
            </div>
          ) : null}

          {filteredTasks.map((task) => {
            const completed = task.status === "completed";

            return (
              <Link
                key={task.id}
                to={`/tasks/${task.id}`}
                className={[
                  "daily-task-card",
                  `daily-task-card--${task.type}`,
                  completed ? "is-completed" : "",
                ].join(" ")}
              >
                <div className="daily-task-card__subject">
                  <BookOpenCheck size={24} />
                  <span>语文</span>
                </div>
                <div className="daily-task-card__main">
                  <div className="task-plan-line">
                    <h2>{taskTitleLabels[task.type]}</h2>
                    <span className="plan-badge">{taskTypeLabels[task.type]}</span>
                    {completed ? (
                      <span className="plan-badge is-done">已完成</span>
                    ) : null}
                  </div>
                  <p>{task.description}</p>
                  <div className="task-meta-line">
                    <span>
                      <Clock3 size={15} />
                      19:00 - 20:30
                    </span>
                  </div>
                </div>
                <div className="daily-task-card__side">
                  <span className="plan-primary-action">
                    <CheckCircle2 size={17} />
                    {completed ? "查看记录" : taskActionLabels[task.type]}
                  </span>
                </div>
              </Link>
            );
          })}
        </section>
      </main>
    </div>
  );
}
