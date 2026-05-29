import { useTaskStore } from "../stores/taskStore";

export function TasksPage() {
  const tasks = useTaskStore((state) => state.tasks);
  const completeTask = useTaskStore((state) => state.completeTask);
  const resetTasks = useTaskStore((state) => state.resetTasks);

  const completedTasks = tasks.filter((task) => task.completed);
  const unfinishedTasks = tasks.filter((task) => !task.completed);
  const totalXp = completedTasks.reduce((sum, task) => sum + task.xp, 0);

  return (
    <div className="space-y-8">
      <section className="rounded-[36px] bg-blue-50 p-8">
        <p className="text-lg font-medium text-blue-600">任务中心</p>
        <h1 className="mt-2 text-5xl font-bold text-slate-900">
          今天要完成哪些成长任务？
        </h1>
        <p className="mt-4 text-xl text-slate-600">
          每完成一个任务，都会获得 XP，并帮助宠物塔拉成长。
        </p>
      </section>

      <section className="grid grid-cols-3 gap-6">
        <div className="rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <p className="text-slate-500">今日任务</p>
          <p className="mt-3 text-4xl font-bold text-slate-900">
            {tasks.length} 个
          </p>
        </div>

        <div className="rounded-[32px] bg-emerald-50 p-6 shadow-sm">
          <p className="text-slate-500">已完成</p>
          <p className="mt-3 text-4xl font-bold text-emerald-700">
            {completedTasks.length} 个
          </p>
        </div>

        <div className="rounded-[32px] bg-amber-50 p-6 shadow-sm">
          <p className="text-slate-500">已获得 XP</p>
          <p className="mt-3 text-4xl font-bold text-amber-700">
            +{totalXp}
          </p>
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">待完成任务</h2>
            <p className="mt-1 text-slate-500">
              点击任务卡片即可完成打卡
            </p>
          </div>

          <button
            onClick={resetTasks}
            className="rounded-full bg-slate-100 px-6 py-3 font-bold text-slate-600 hover:bg-slate-200"
          >
            重置任务
          </button>
        </div>

        {unfinishedTasks.length === 0 ? (
          <div className="rounded-[32px] bg-emerald-50 p-10 text-center">
            <div className="text-7xl">🎉</div>
            <h3 className="mt-5 text-3xl font-bold text-emerald-700">
              今日任务全部完成！
            </h3>
            <p className="mt-3 text-lg text-slate-600">
              塔拉非常开心，明天继续加油。
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {unfinishedTasks.map((task) => (
              <button
                key={task.id}
                onClick={() => completeTask(task.id)}
                className="min-h-[170px] rounded-[32px] bg-white p-6 text-left shadow-sm ring-1 ring-slate-100 transition hover:scale-[1.02] hover:bg-blue-50"
              >
                <div className="flex items-start justify-between">
                  <div className="text-5xl">⭐</div>
                  <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
                    XP +{task.xp}
                  </div>
                </div>

                <h3 className="mt-6 text-2xl font-bold text-slate-900">
                  {task.title}
                </h3>
                <p className="mt-3 text-slate-500">
                  完成后可获得成长值，并推动宠物成长。
                </p>
              </button>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-5 text-3xl font-bold text-slate-900">已完成任务</h2>

        {completedTasks.length === 0 ? (
          <div className="rounded-[32px] bg-slate-50 p-8 text-slate-500">
            还没有完成任务，先从一个简单任务开始吧。
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="rounded-[32px] bg-emerald-50 p-6 shadow-sm"
              >
                <div className="text-5xl">✅</div>
                <h3 className="mt-5 text-2xl font-bold text-emerald-800">
                  {task.title}
                </h3>
                <p className="mt-3 text-slate-600">
                  已获得 XP +{task.xp}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
