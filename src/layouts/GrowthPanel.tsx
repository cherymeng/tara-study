import { useUserStore } from "../stores/userStore";
import { usePetStore } from "../stores/petStore";

export function GrowthPanel() {
  const user = useUserStore();
  const pet = usePetStore();

  return (
    <aside className="rounded-[32px] bg-white p-6 shadow-sm">
      <div className="text-center">
        <div className="text-7xl">🐣</div>
        <h2 className="mt-4 text-2xl font-bold">{pet.name}</h2>
        <p className="mt-1 text-slate-500">心情：{pet.mood}</p>
      </div>

      <div className="mt-8 rounded-3xl bg-blue-50 p-5">
        <p className="text-sm text-slate-500">当前等级</p>
        <p className="mt-1 text-3xl font-bold text-blue-700">Lv.{user.level}</p>

        <div className="mt-4 h-4 overflow-hidden rounded-full bg-white">
          <div
            className="h-full rounded-full bg-blue-500"
            style={{ width: `${user.xp}%` }}
          />
        </div>

        <p className="mt-2 text-sm text-slate-500">XP：{user.xp}/100</p>
      </div>

      <div className="mt-6 rounded-3xl bg-amber-50 p-5">
        <p className="text-sm text-slate-500">连续打卡</p>
        <p className="mt-1 text-3xl font-bold text-amber-700">
          {user.streakDays} 天
        </p>
      </div>

      <div className="mt-6 rounded-3xl bg-emerald-50 p-5">
        <p className="font-bold text-emerald-700">今日鼓励</p>
        <p className="mt-2 text-sm text-slate-600">
          太棒啦，继续完成任务，塔拉会变得更强！
        </p>
      </div>
    </aside>
  );
}
