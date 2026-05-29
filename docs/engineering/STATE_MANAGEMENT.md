# 桐宝学习 - 应用状态管理（State Management）

# 1. 系统定位

状态管理文档定义：

-   前端全局状态
-   数据流向
-   状态更新逻辑
-   与任务、XP、宠物、世界、成就、家长端的绑定

目标：

# 确保成长循环、正反馈、长期留存功能在前端稳定可用。

---

# 2. 状态管理原则

1.  **单一来源**
    -   所有成长相关状态集中管理
2.  **可追踪**
    -   任务、XP、等级、宠物变化可记录
3.  **可恢复**
    -   本地缓存 + 云端同步
4.  **分模块**
    -   儿童端与家长端状态分开
5.  **可扩展**
    -   为未来 AI 功能预留状态

---

# 3. 核心状态拆分

## 3.1 userStore

存储：

-   userId
-   username
-   grade
-   role ('child'|'parent')
-   avatar
-   lastLogin
-   preferences

---

## 3.2 taskStore

存储：

-   todayTasks: array
-   taskHistory: array
-   currentTaskId
-   completedTasks: array
-   streakTasks: array

操作：

-   startTask(taskId)
-   completeTask(taskId)
-   resetTask(taskId)
-   updateTaskProgress(taskId, progress)

---

## 3.3 growthStore

存储：

-   currentXP
-   level
-   streakDays
-   totalTasksCompleted
-   growthTimeline: array

操作：

-   addXP(amount)
-   checkLevelUp()
-   updateStreak()
-   resetStreak()

---

## 3.4 petStore

存储：

-   petId
-   petType
-   level
-   evolutionStage
-   unlockedSkills: array
-   mood

操作：

-   petInteract()
-   levelUpPet()
-   evolvePet()
-   updatePetMood()

---

## 3.5 worldStore

存储：

-   worlds: array
-   unlockedWorlds: array
-   currentWorld
-   worldProgress: object

操作：

-   unlockWorld(worldId)
-   updateWorldProgress(worldId, progress)
-   setCurrentWorld(worldId)

---

## 3.6 achievementStore

存储：

-   achievements: array
-   unlockedAchievements: array

操作：

-   unlockAchievement(achievementId)
-   getAchievementStatus(achievementId)

---

## 3.7 parentStore

存储：

-   childId
-   dailyReport
-   weeklyReport
-   monthlyReport
-   encouragementLogs

操作：

-   updateDailyReport(report)
-   addEncouragement(entry)
-   getGrowthTrend()
-   getWeakSubjects()

---

# 4. 状态更新流程示例

### 完成任务

```text
completeTask(taskId)
↓
taskStore.completedTasks更新
↓
growthStore.addXP(task.xpReward)
↓
growthStore.checkLevelUp()
↓
petStore.levelUpPet()
↓
worldStore.updateWorldProgress(task.worldId)
↓
achievementStore.unlockAchievement(if condition)
↓
parentStore.updateDailyReport()
↓
触发动画/正反馈
```

---

# 5. 本地缓存与同步
-   LocalStorage / IndexedDB 用于缓存儿童端关键状态
-   MVP阶段先用本地缓存
-   后期云端同步 (Supabase/Firebase)
-   家长端同步读取最新状态


# 6. 状态管理工具推荐
-   MVP阶段：Zustand + Context API
-   中期：Redux Toolkit（可选）
-   动画状态：Framer Motion + Motion Values
-   XP与成长循环：独立模块，和UI解耦


# 7. 最终目标

状态管理确保：

-   所有成长循环动作可追踪、可重放
-   数据与UI一致
-   宠物、世界、XP、成就、家长报告同步
-   前端易开发、易扩展
-   后期可平滑接入 AI 功能



下一步可以做：

# `LOCALIZATION_AND_CONFIG.md`

这个文档会定义：

- 文本国际化（i18n）预留结构  
- 年级学科内容配置  
- 任务配置  
- XP、等级、宠物、世界参数可调  

这是保证产品可持续迭代、快速上线不同年级/版本的关键文档。
```
