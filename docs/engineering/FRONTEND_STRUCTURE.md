# 桐宝学习 - 前端工程结构设计（Frontend Structure）

# 1. 技术栈

当前推荐技术栈：

* React
* Vite
* TypeScript
* CSS（当前 MVP 落地）
* Framer Motion（动画扩展预留）
* Hanzi Writer（专项练习扩展预留）
* LocalStorage / IndexedDB
* 后续可接入 Supabase / Firebase

---

# 2. 前端设计目标

前端需要支持：

* 儿童端学习任务
* 成长系统展示
* 宠物互动
* 世界解锁
* 家长端报告
* AI探索任务
* 数据可视化

核心体验：

> 孩子每完成一个任务，都能立刻看到成长反馈。

---

# 3. 推荐目录结构

```text
src/
  app/
    App.tsx
    router.tsx

  pages/
    HomePage.tsx
    TasksPage.tsx
    PetPage.tsx
    WorldPage.tsx
    AchievementsPage.tsx
    ParentPage.tsx

  layouts/
    TabletShell.tsx
    SidebarNav.tsx
    GrowthPanel.tsx

  components/
    task/
      TaskCard.tsx
      TaskList.tsx
      TaskProgress.tsx

    growth/
      XPBar.jsx
      LevelBadge.jsx
      StreakCard.jsx
      GrowthTimeline.jsx

    pet/
      PetAvatar.jsx
      PetInteraction.jsx
      PetEvolutionCard.jsx

    world/
      WorldMap.jsx
      WorldCard.jsx
      UnlockAnimation.jsx

    achievement/
      BadgeCard.jsx
      BadgeWall.jsx

    ai/
      AICompanionBubble.jsx
      AIExploreTaskCard.jsx

    parent/
      LearningReportCard.jsx
      SubjectMasteryChart.jsx
      EncouragementPanel.jsx

    common/
      Button.jsx
      Card.jsx
      Modal.jsx
      PageHeader.jsx
      ProgressBar.jsx

  data/
    curriculum/
      grade1.js
      grade2.js
      grade3.js
      grade4.js
      grade5.js
      grade6.js

    tasks/
      dailyTasks.js
      explorationTasks.js

    growth/
      levels.js
      badges.js
      worlds.js
      pets.js

  hooks/
    useTasks.js
    useGrowth.js
    usePet.js
    useWorld.js
    useParentReport.js

  services/
    taskService.js
    growthService.js
    aiService.js
    parentService.js

  store/
    userStore.js
    taskStore.js
    growthStore.js

  styles/
    globals.css
    tokens.css

  utils/
    date.js
    xp.js
    grade.js
```

---

# 4. 页面模块

## 4.1 儿童端首页

首页需要展示：

* 今日成长状态
* 今日任务
* XP进度
* 宠物状态
* 连续成长天数
* 世界探索入口

首页核心感觉：

> 今天我又可以变强了。

---

## 4.2 今日任务页

展示：

* 语文任务
* 数学任务
* 英语任务
* 复习任务
* 探索任务

任务卡片包含：

* 任务名称
* 所属学科
* 难度
* XP奖励
* 完成状态
* 开始按钮

---

## 4.3 学科页

每个学科展示：

* 当前教材章节
* 知识点进度
* 今日练习
* 错题复习
* 掌握率

支持学科：

* 语文
* 数学
* 英语

---

## 4.4 成长页

展示：

* 当前等级
* XP进度
* 成长曲线
* 连续成长
* 能力值
* 成长时间线

---

## 4.5 宠物页

展示：

* 当前宠物
* 宠物等级
* 进化阶段
* 已解锁动作
* 互动按钮
* 宠物鼓励语

---

## 4.6 世界页

展示：

* 世界地图
* 已解锁世界
* 未解锁世界
* 解锁条件
* 世界任务

---

## 4.7 探索页

展示：

* AI探索任务
* 科学实验
* 创造力挑战
* 阅读挑战
* 动手任务

---

## 4.8 家长端首页

展示：

* 今日完成情况
* 本周学习趋势
* 教材掌握情况
* 连续成长记录
* 推荐鼓励语
* 奖励设置入口

---

# 5. 核心组件设计

## 5.1 TaskCard

用于展示单个学习任务。

字段：

* title
* subject
* difficulty
* xpReward
* status
* estimatedTime

---

## 5.2 XPBar

用于展示成长进度。

字段：

* currentXP
* nextLevelXP
* level

---

## 5.3 PetAvatar

用于展示宠物形象。

字段：

* petType
* level
* evolutionStage
* mood

---

## 5.4 WorldMap

用于展示世界解锁进度。

字段：

* worlds
* unlockedWorlds
* currentWorld

---

## 5.5 LearningReportCard

用于家长端展示学习报告。

字段：

* completedTasks
* totalTasks
* studyMinutes
* xpGained
* weakSubjects

---

# 6. 状态管理

推荐状态拆分：

* userStore：用户、年级、角色
* taskStore：每日任务、任务状态
* growthStore：XP、等级、连续成长
* petStore：宠物等级、宠物状态
* worldStore：世界解锁
* parentStore：家长报告

---

# 7. 数据流设计

任务完成流程：

```text
点击完成任务
→ 更新任务状态
→ 计算XP奖励
→ 更新成长值
→ 判断是否升级
→ 判断宠物是否成长
→ 判断世界是否解锁
→ 生成正反馈动画
→ 更新家长端报告
```

---

# 8. 动画设计接入点

推荐使用 Framer Motion：

* XP增长动画
* 任务完成动画
* 升级动画
* 宠物互动动画
* 世界解锁动画
* 徽章弹窗动画

---

# 9. 本地开发阶段数据策略

MVP阶段可以先使用：

* 静态 JSON
* LocalStorage
* 前端 mock 数据

后续再接入：

* Supabase
* Firebase
* 自建 Node.js 后端

---

# 10. 工程原则

前端实现必须：

* 组件清晰
* 数据与UI分离
* 成长逻辑可复用
* 学科内容可配置
* 年级内容可扩展
* 游戏化系统可渐进增强

---

# 11. 最终目标

前端工程要支持 桐宝学习 从 MVP 平滑演进到完整儿童成长系统。

核心目标：

> 每一次学习行为，都能在界面上转化为可见成长。
