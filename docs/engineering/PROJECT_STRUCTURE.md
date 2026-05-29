**# 项目结构说明**

本项目最终面向 iPad / 平板端使用，因此前端结构采用：

\`\`\`text
平板优先
横屏优先
三栏布局
触控优先
组件模块化
Mock Data 先行
Zustand 状态集中管理
\`\`\`

---

# 1. 推荐目录结构

\`\`\`text
src
├── app
│   ├── App.tsx
│   └── router.tsx
│
├── layouts
│   ├── TabletShell.tsx
│   ├── SidebarNav.tsx
│   └── GrowthPanel.tsx
│
├── pages
│   ├── HomePage.tsx
│   ├── TasksPage.tsx
│   ├── PetPage.tsx
│   ├── WorldPage.tsx
│   ├── AchievementsPage.tsx
│   └── ParentPage.tsx
│
├── components
│   ├── common
│   ├── task
│   ├── pet
│   ├── growth
│   ├── world
│   └── parent
│
├── stores
│   ├── userStore.ts
│   ├── taskStore.ts
│   ├── petStore.ts
│   └── worldStore.ts
│
├── mock
│   ├── mockUser.ts
│   ├── mockTasks.ts
│   ├── mockPet.ts
│   └── mockWorld.ts
│
├── types
│   ├── user.ts
│   ├── task.ts
│   ├── pet.ts
│   └── world.ts
│
├── constants
│   ├── routes.ts
│   └── designTokens.ts
│
├── hooks
│   └── useTodayProgress.ts
│
├── utils
│   ├── storage.ts
│   └── xp.ts
│
└── main.tsx
\`\`\`

---

# 2. 平板端页面结构

MVP 使用统一的平板壳布局：

\`\`\`text
TabletShell
├── SidebarNav
├── MainContent
└── GrowthPanel
\`\`\`

视觉结构：

\`\`\`text
┌──────────────────────────────────────────────┐
│ Sidebar │        Main Content       │ Growth │
│         │                           │ Panel  │
└──────────────────────────────────────────────┘
\`\`\`

---

# 3. layouts 说明

## TabletShell.tsx

负责平板三栏布局。

职责：

- 页面整体 grid
- 左侧导航
- 中间内容
- 右侧成长反馈
- 横屏优先适配

推荐布局：

\`\`\`tsx

<div className="min-h-screen grid grid-cols-[96px\_1fr\_300px] gap-6 p-6">
  <SidebarNav />
  <main>
    <Outlet />
  </main>
  <GrowthPanel />
</div>
\`\`\`

---

## SidebarNav.tsx

负责主导航。

包含：

\`\`\`text
首页
任务
宠物
世界
成就
家长
\`\`\`

特点：

\`\`\`text
大图标
少文字
大点击区域
不使用复杂二级菜单
\`\`\`

---

## GrowthPanel.tsx

右侧成长反馈区。

显示：

\`\`\`text
宠物状态
用户等级
XP 进度
连续打卡
今日鼓励
\`\`\`

---

# 4. pages 说明

## HomePage.tsx

首页。

包含：

\`\`\`text
今日任务
今日成长目标
宠物提示
世界解锁提示
\`\`\`

---

## TasksPage.tsx

任务页。

包含：

\`\`\`text
任务卡片网格
任务完成按钮
奖励预览
\`\`\`

---

## PetPage.tsx

宠物页。

包含：

\`\`\`text
宠物大展示
宠物等级
宠物心情
宠物成长记录
\`\`\`

---

## WorldPage.tsx

世界页。

包含：

\`\`\`text
世界地图
区域解锁状态
解锁条件
\`\`\`

---

## AchievementsPage.tsx

成就页。

包含：

\`\`\`text
徽章
连续打卡成就
成长里程碑
\`\`\`

---

## ParentPage.tsx

家长页。

包含：

\`\`\`text
本周学习摘要
任务完成情况
成长值变化
连续打卡情况
\`\`\`

---

# 5. components 说明

## common

通用组件：

\`\`\`text
Button
Card
ProgressBar
Badge
PageTitle
\`\`\`

---

## task

任务相关组件：

\`\`\`text
TaskCard
TaskGrid
TaskReward
\`\`\`

---

## pet

宠物相关组件：

\`\`\`text
PetAvatar
PetMoodBubble
PetLevelCard
\`\`\`

---

## growth

成长相关组件：

\`\`\`text
XPBar
LevelBadge
StreakCard
GrowthSummary
\`\`\`

---

## world

世界相关组件：

\`\`\`text
WorldMap
WorldRegionCard
UnlockBadge
\`\`\`

---

## parent

家长端组件：

\`\`\`text
ParentSummaryCard
WeeklyReportCard
TaskCompletionChart
\`\`\`

---

# 6. stores 说明

MVP 使用 Zustand。

## userStore

管理：

\`\`\`text
用户名称
等级
XP
连续打卡天数
\`\`\`

---

## taskStore

管理：

\`\`\`text
每日任务
任务完成状态
完成任务动作
\`\`\`

---

## petStore

管理：

\`\`\`text
宠物名称
宠物等级
宠物心情
宠物成长
\`\`\`

---

## worldStore

管理：

\`\`\`text
世界区域
解锁状态
当前区域
\`\`\`

---

# 7. mock 说明

MVP 阶段不接真实后端。

所有初始数据来自：

\`\`\`text
src/mock
\`\`\`

后续可替换为 Supabase 或 API 服务。

---

# 8. types 说明

所有核心数据结构必须先定义类型。

示例：

\`\`\`ts
export interface Task {
id: string
title: string
description: string
xp: number
completed: boolean
}
\`\`\`

---

# 9. 平板适配要求

所有页面必须满足：

\`\`\`text
横屏优先
主功能一屏可见
点击区域足够大
避免小字号
避免复杂表格
避免深层级菜单
\`\`\`

推荐尺寸：

\`\`\`text
按钮高度：56px+
任务卡片高度：140px+
右侧反馈区宽度：300px
左侧导航宽度：96px
页面 padding：24px
\`\`\`

---

# 10. MVP 开发顺序

推荐顺序：

\`\`\`text

1. 目录结构
2. Mock Data
3. Zustand Store
4. TabletShell
5. SidebarNav
6. GrowthPanel
7. HomePage
8. TasksPage
9. PetPage
10. WorldPage
11. ParentPage
12. AchievementsPage
    \`\`\`

---

# 11. 非目标

MVP 阶段暂不实现：

\`\`\`text
AI聊天
AI陪伴
AI老师
真实支付
订阅系统
复杂后台
多账户系统
\`\`\`

仅保留扩展空间。
