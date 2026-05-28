# Tara Study - 前端组件库（Component Library）

# 1. 系统定位

组件库文档将：

- 明确所有 UI 组件
- 定义 Props 与状态
- 与 Design Tokens 完全统一
- 支持儿童端与家长端
- 支持动画、正反馈与成长循环

目标：

# 提高前端开发效率，保证一致性和长期可维护性。

---

# 2. 核心原则

1. **统一引用 Tokens**
    - 颜色、字体、间距、圆角、阴影、动画全部使用 Design Tokens
2. **高复用性**
    - 可支持多场景（任务卡片、成就、宠物、世界、AI）
3. **状态可控**
    - 组件状态清晰（normal, hover, active, disabled, completed）
4. **动画绑定成长反馈**
    - XP增加、升级、宠物互动、世界解锁动画
5. **儿童端优先**
    - 易用、清晰、温暖、趣味

---

# 3. 组件列表

## 3.1 TaskCard

**用途**：展示单个任务信息

**Props**：

- `title` (string)
- `subject` (string)
- `xpReward` (number)
- `status` ('pending'|'in_progress'|'completed'|'review')
- `estimatedTime` (number, 分钟)
- `onStart` (function)
- `onComplete` (function)

**状态**：

- normal
- hover
- in_progress
- completed
- disabled

**动画**：

- 完成任务 → XP动画、宠物互动、光效粒子

---

## 3.2 XPBar

**用途**：展示成长进度

**Props**：

- `currentXP` (number)
- `nextLevelXP` (number)
- `level` (number)

**动画**：

- XP增加 → 数值增长 + 粒子效果

---

## 3.3 PetAvatar

**用途**：展示宠物状态与互动

**Props**：

- `petType` (string)
- `level` (number)
- `evolutionStage` (number)
- `mood` (string, 'happy'|'neutral'|'sad')
- `onInteract` (function)

**动画**：

- 互动 → 表情变化 + 成长动画

---

## 3.4 WorldMap

**用途**：展示世界解锁状态

**Props**：

- `worlds` (array)
- `unlockedWorlds` (array)
- `currentWorld` (string)
- `onUnlock` (function)

**动画**：

- 解锁世界 → 云层散开 + 地图点亮 + 成长音效

---

## 3.5 BadgeCard

**用途**：展示成就徽章

**Props**：

- `badgeName` (string)
- `description` (string)
- `unlocked` (boolean)
- `unlockDate` (date)

**动画**：

- 成就解锁 → 弹窗动画 + XP加成

---

## 3.6 Button

**用途**：全局按钮组件

**Props**：

- `label` (string)
- `variant` ('primary'|'secondary'|'disabled')
- `size` ('sm'|'md'|'lg')
- `onClick` (function)

**状态**：

- normal, hover, active, disabled

**样式**：

- 引用 Design Tokens: color, radius, shadow, spacing

---

## 3.7 Card

**用途**：通用卡片容器

**Props**：

- `children` (ReactNode)
- `padding` (spacing token)
- `shadow` (shadow token)
- `radius` (radius token)

**动画**：

- 出现动画 + hover动画

---

## 3.8 Modal

**用途**：弹窗

**Props**：

- `visible` (boolean)
- `title` (string)
- `onClose` (function)
- `children` (ReactNode)

**动画**：

- 弹出/关闭 → motion-slow + fade-in/out

---

## 3.9 ProgressBar

**用途**：展示任务、世界、成长进度

**Props**：

- `current` (number)
- `max` (number)
- `height` (px)
- `color` (color token)

**动画**：

- current变化 → smooth width transition + XP粒子

---

# 4. 组件使用原则

1. 所有组件必须支持**儿童端与家长端复用**
2. 所有状态必须清晰，可组合
3. 动画与音效必须可选，避免干扰学习
4. 所有视觉必须使用 Design Tokens
5. 组件尽量小，组合出复杂界面
6. 支持可扩展的 props，用于未来 AI 功能

---

# 5. 未来扩展组件

- AICompanionBubble
- ExplorationTaskCard
- LearningReportCard
- WorldUnlockCard
- PetInteractionPanel

这些组件会随着 AI 和探索功能上线逐步扩展。

---

# 6. 最终目标

组件库为前端团队提供：

- 完整 UI 构建块
- 可复用、可扩展、可维护
- 与成长循环、XP、宠物、世界、成就系统完全一致
- 支持儿童端和家长端
- 支持长期迭代和功能升级
  :::

下一步可以做：

# `MILESTONES_AND_TIMELINE.md`

用于：

- 把整个产品迭代阶段分解成具体里程碑
- 每个阶段明确功能、交付目标
- 确定开发顺序和优先级
- 支撑开发和项目管理团队执行

这是将所有文档落地开发的重要节点文档。
