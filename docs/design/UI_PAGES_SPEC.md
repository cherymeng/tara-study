# Tara Study - UI 页面规格文档（UI Pages Spec）

# 1. 系统定位

UI 页面规格文档用于：

- 明确每个页面结构
- 定义每个模块组件
- 明确状态与交互
- 定义动画触发点
- 定义数据来源与绑定
- 支撑前端开发与 AI 页面生成

目标：

> 让开发团队和 AI 可以直接根据文档生成高保真页面。

---

# 2. 儿童端页面规格

## 2.1 首页（HomePage）

### 结构

- 顶部成长栏（LevelBadge + XPBar + streak）
- 今日任务列表（TaskCard列表）
- 宠物状态栏（PetAvatar）
- 世界入口卡片（WorldCard）
- 成就快捷入口（BadgeCard小组件）

### 状态

- streak天数变化
- XP进度变化
- 宠物情绪变化
- 今日任务完成/未完成

### 动画

- XP增加 → XPBar粒子动画
- 宠物互动 → 打招呼动画
- streak变化 → 火焰/星星动画
- 页面进入 → fade-in + slide

### 数据来源

- userStore
- taskStore.todayTasks
- growthStore
- petStore
- worldStore
- achievementStore

---

## 2.2 今日任务页（TodayTasksPage）

### 结构

- 页面顶部标题
- 任务分类标签（语文/数学/英语/复习）
- 任务卡片列表（TaskCard）
- 完成按钮
- 空状态提示（今日无任务）

### 状态

- 任务状态：pending/in_progress/completed
- 任务选择态
- 完成态

### 动画

- 任务完成 → XP动画 + Pet互动
- 卡片状态切换 → smooth transition
- 页面进入 → fade-in

### 数据来源

- taskStore.todayTasks
- growthStore
- petStore

---

## 2.3 学科任务页（SubjectPage）

### 结构

- 页面标题（科目）
- 知识点进度条
- 今日任务卡片列表
- 错题复习入口
- 小奖励徽章（BadgeCard）

### 状态

- 当前章节进度
- 错题状态
- 任务完成状态

### 动画

- XP增加 → XPBar粒子动画
- 成就解锁 → 弹窗 + 光效

### 数据来源

- taskStore
- growthStore
- achievementStore

---

## 2.4 成长页（GrowthPage）

### 结构

- 当前等级 + XPBar
- 连续成长 streak
- 成长时间线（Timeline）
- 总任务数/完成比例
- 已解锁世界/宠物

### 状态

- 等级变化
- XP增加
- streak增加
- 新世界/宠物解锁

### 动画

- 升级 → 全屏光效 + Pet互动
- streak → 火焰/星星
- Timeline → fade-in + scroll动画

### 数据来源

- growthStore
- worldStore
- petStore
- achievementStore

---

## 2.5 宠物页（PetPage）

### 结构

- 宠物头像 + 状态栏
- 当前等级
- 当前进化阶段
- 可互动动作按钮
- 最近成长记录

### 状态

- 宠物情绪：happy/neutral/sad
- 宠物进化状态
- 互动状态

### 动画

- 互动 → 动作 + 表情变化
- 升级/进化 → 全屏动画 + 成长粒子
- 页面进入 → fade-in + slide

### 数据来源

- petStore
- growthStore

---

## 2.6 成就页（AchievementsPage）

### 结构

- 页面标题
- 已解锁成就列表（BadgeCard）
- 未解锁成就占位
- XP奖励提示

### 状态

- 成就解锁状态
- 徽章收藏状态
- 页面滚动状态

### 动画

- 成就解锁 → 弹窗动画 + 光效 + XP粒子
- 页面进入 → fade-in

### 数据来源

- achievementStore
- growthStore

---

## 2.7 世界页（WorldPage）（Phase2预留）

### 结构

- 世界地图展示
- 已解锁世界高亮
- 未解锁世界淡化
- 世界任务入口
- 解锁条件提示

### 状态

- 世界解锁状态
- 当前世界
- 任务完成状态

### 动画

- 解锁 → 云层散开 + 光效 + XP
- 页面进入 → fade-in + zoom-in

### 数据来源

- worldStore
- taskStore
- growthStore

---

# 3. 家长端页面规格

## 3.1 家长首页（ParentDashboardPage）

### 结构

- 今日完成率
- XP成长条
- 连续成长天数
- 各学科完成比例
- 鼓励按钮

### 状态

- 当日任务完成率
- streak天数
- 学科掌握进度

### 动画

- XP增长 → 粒子动画
- 切换学科 → smooth transition

### 数据来源

- parentStore
- taskStore
- growthStore

---

## 3.2 学习报告页（ReportPage）

### 结构

- 周报/月报切换
- 学科趋势折线图
- 任务完成柱状图
- 成就展示
- 鼓励记录

### 状态

- 报告周期切换
- 数据刷新
- 成就解锁标识

### 动画

- 图表数据更新 → smooth bar/line transition
- 成就解锁 → 弹窗 + 光效

### 数据来源

- parentStore
- taskStore
- growthStore
- achievementStore

---

# 4. 页面跳转与主流程

```text
首页
├─ 今日任务页 → 完成任务 → XP/成长反馈
├─ 学科任务页 → 错题复习 → XP/成长
├─ 成长页 → 查看成长曲线
├─ 宠物页 → 互动/升级
└─ 成就页 → 查看徽章/解锁
家长端
├─ 家长首页 → 今日进度 → 鼓励
└─ 学习报告页 → 周报/月报 → 查看趋势
```

---

# 5. 页面设计原则
-    单任务聚焦，降低认知负担
-    高频正反馈，及时显示成长感
-    动画统一节奏，保证儿童体验
-    所有文本与 UI 使用 Design Tokens
-    页面数据与状态直接绑定 store


# 6. 最终目标

页面规格文档确保：

-    每个页面可直接开发
-    每个模块状态、动画、数据来源清晰
-    前端开发或 AI 可生成高保真页面
-    儿童端与家长端体验一致、可扩展
-    成长循环、正反馈、长期留存落地



下一步建议：

# `TEST_PLAN_AND_METRICS.md`

这个文档会定义：

- MVP阶段测试策略
- 核心功能测试
- 用户留存与体验指标
- 动画、交互、任务系统验证
- 家长端报告正确性

这是保证产品上线可行性和迭代优化的关键。
