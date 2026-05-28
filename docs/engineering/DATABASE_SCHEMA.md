# Tara Study - 数据库与数据结构设计（Database Schema）

# 1. 用户表（Users）

| 字段 | 类型 | 描述 |
|------|------|------|
| user_id | UUID | 唯一用户ID |
| username | varchar | 用户名 |
| grade | int | 年级 |
| role | enum('child','parent') | 角色类型 |
| avatar | varchar | 头像 |
| created_at | timestamp | 创建时间 |
| updated_at | timestamp | 更新时间 |

---

# 2. XP与等级表（Growth System）

| 字段 | 类型 | 描述 |
|------|------|------|
| growth_id | UUID | 成长记录ID |
| user_id | UUID | 对应用户 |
| xp | int | 当前经验值 |
| level | int | 当前等级 |
| streak_days | int | 连续学习天数 |
| updated_at | timestamp | 更新时间 |

---

# 3. 学习任务表（Learning Tasks）

| 字段 | 类型 | 描述 |
|------|------|------|
| task_id | UUID | 任务ID |
| user_id | UUID | 对应用户 |
| task_type | enum('school','exploration') | 任务类型 |
| subject | enum('chinese','math','english','ai','experiment','creative') | 学科或探索类型 |
| grade | int | 年级 |
| content | text | 任务内容/题目描述 |
| xp_reward | int | 完成奖励XP |
| status | enum('pending','in_progress','completed','review') | 任务状态 |
| created_at | timestamp | 创建时间 |
| updated_at | timestamp | 更新时间 |
| due_date | timestamp | 截止日期（可选） |

---

# 4. 宠物系统表（Pets）

| 字段 | 类型 | 描述 |
|------|------|------|
| pet_id | UUID | 宠物ID |
| user_id | UUID | 对应用户 |
| type | varchar | 宠物类型 |
| level | int | 宠物等级 |
| evolution_stage | int | 宠物进化阶段 |
| unlocked_skills | json | 已解锁技能 |
| last_interaction | timestamp | 最近互动时间 |
| created_at | timestamp | 创建时间 |

---

# 5. 世界解锁表（Worlds）

| 字段 | 类型 | 描述 |
|------|------|------|
| world_id | UUID | 世界ID |
| user_id | UUID | 对应用户 |
| world_name | varchar | 世界名称 |
| unlocked | boolean | 是否解锁 |
| unlock_date | timestamp | 解锁时间 |
| progress | json | 世界内任务进度 |
| created_at | timestamp | 创建时间 |

---

# 6. AI探索任务表（AI_Exploration_Tasks）

| 字段 | 类型 | 描述 |
|------|------|------|
| ai_task_id | UUID | AI任务ID |
| user_id | UUID | 对应用户 |
| task_name | varchar | 任务名称 |
| description | text | 任务描述 |
| xp_reward | int | 完成奖励XP |
| status | enum('pending','in_progress','completed') | 状态 |
| created_at | timestamp | 创建时间 |
| updated_at | timestamp | 更新时间 |

---

# 7. 成就与徽章表（Achievements）

| 字段 | 类型 | 描述 |
|------|------|------|
| achievement_id | UUID | 成就ID |
| user_id | UUID | 对应用户 |
| name | varchar | 成就名称 |
| description | text | 成就描述 |
| type | enum('learning','streak','exploration','creative') | 成就类型 |
| reward_xp | int | 奖励XP |
| unlocked | boolean | 是否解锁 |
| unlock_date | timestamp | 解锁时间 |
| created_at | timestamp | 创建时间 |

---

# 8. 家长端数据表（Parent_System）

| 字段 | 类型 | 描述 |
|------|------|------|
| parent_id | UUID | 家长ID |
| child_id | UUID | 对应孩子ID |
| report_date | date | 报告日期 |
| daily_progress | json | 每日学习情况 |
| weekly_report | json | 每周成长报告 |
| monthly_report | json | 每月成长报告 |
| encouragement_logs | json | 家长鼓励记录 |
| created_at | timestamp | 创建时间 |
| updated_at | timestamp | 更新时间 |

---

# 9. 数据结构原则

- 所有成长行为统一绑定 XP 系统
- 校内/校外任务统一进入成长循环
- 宠物/世界/成就/AI探索均与成长循环挂钩
- 家长端实时获取孩子成长数据
- 支持多年级、多学科、多任务类型
- 易扩展：可添加新的任务类型/世界/宠物/探索内容

---

# 10. 最终目标

数据库结构保证：

- 产品可持续迭代
- 成长体系完整可追踪
- 家长和孩子数据统一
- 支持长期沉浸体验  
