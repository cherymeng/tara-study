import { useTaskStore } from "../stores/taskStore";
import { useUserStore } from "../stores/userStore";
import { usePetStore } from "../stores/petStore";
import { useWorldStore } from "../stores/worldStore";

export function HomePage() {
  const tasks = useTaskStore((state) => state.tasks);
  const completeTask = useTaskStore((state) => state.completeTask);

  const user = useUserStore();
  const pet = usePetStore();
  const regions = useWorldStore((state) => state.regions);

  const completedTasks = tasks.filter((task) => task.completed);
  const completedCount = completedTasks.length;
  const progress = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="space-y-8">
      <section className="rounded-[36px] bg-gradient-to-r from-blue-50 to-indigo-50 p-8">
        <p className="text-lg font-medium text-blue-600">欢迎回来</p>
        <h1 className="mt-2 text-5xl font-bold text-slate-900">
          {user.name}，今天也要继续成长！
        </h1>
        <p className="mt-4 text-xl text-slate-600">
          塔拉正在等你完成今日任务，一起解锁新的世界吧。
        </p>
      </section>

      <section className="grid grid-cols-3 gap-6">
        <div className="rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <p className="text-slate-500">今日任务进度</p>
          <p className="mt-3 text-4xl font-bold text-blue-700">
            {completedCount}/{tasks.length}
          </p>
          <div className="mt-5 h-5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-3 text-sm text-slate-500">完成度 {progress}%</p>
        </div>

        <div className="rounded-[32px] bg-amber-50 p-6 shadow-sm">
          <p className="text-slate-500">宠物状态</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="text-6xl">🐣</div>
            <div>
              <p className="text-3xl font-bold text-amber-700">{pet.name}</p>
              <p className="mt-1 text-slate-600">心情：{pet.mood}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] bg-emerald-50 p-6 shadow-sm">
          <p className="text-slate-500">连续打卡</p>
          <p className="mt-3 text-5xl font-bold text-emerald-700">
            {user.streakDays} 天
          </p>
          <p className="mt-3 text-slate-600">坚持很棒，继续保持！</p>
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">今日任务</h2>
            <p className="mt-1 text-slate-500">点击卡片完成任务并获得 XP</p>
          </div>
          <div className="rounded-full bg-blue-50 px-5 py-3 font-bold text-blue-700">
            今日奖励：XP +{tasks.reduce((sum, task) => sum + task.xp, 0)}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {tasks.map((task) => (
            <button
              key={task.id}
              disabled={task.completed}
              onClick={() => completeTask(task.id)}
              className={[
                "min-h-[160px] rounded-[32px] p-6 text-left shadow-sm transition",
                task.completed
                  ? "bg-emerald-100 text-emerald-800 ring-2 ring-emerald-200"
                  : "bg-slate-50 text-slate-800 hover:scale-[1.02] hover:bg-blue-50",
              ].join(" ")}
            >
              <div className="flex items-start justify-between">
                <div className="text-4xl">{task.completed ? "🎉" : "⭐"}</div>
                <div className="rounded-full bg-white px-4 py-2 text-sm font-bold">
                  XP +{task.xp}
                </div>
              </div>

              <h3 className="mt-5 text-2xl font-bold">{task.title}</h3>
              <p className="mt-3 text-base">
                {task.completed ? "已完成，太棒啦！" : "点击完成这个成长任务"}
              </p>
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-5">
          <h2 className="text-3xl font-bold text-slate-900">世界探索</h2>
          <p className="mt-1 text-slate-500">升级后会解锁新的冒险区域</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {regions.map((region) => (
            <div
              key={region.id}
              className={[
                "rounded-[32px] p-6 shadow-sm",
                region.unlocked
                  ? "bg-indigo-50 text-indigo-800"
                  : "bg-slate-100 text-slate-500",
              ].join(" ")}
            >
              <div className="text-5xl">{region.unlocked ? "🗺️" : "🔒"}</div>
              <h3 className="mt-4 text-2xl font-bold">{region.name}</h3>
              <p className="mt-2">
                {region.unlocked
                  ? "已解锁，可以开始探索。"
                  : `达到 Lv.${region.requiredLevel} 后解锁`}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
