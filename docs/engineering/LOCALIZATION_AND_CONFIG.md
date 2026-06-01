# 桐宝学习 - 配置与国际化系统（Localization & Config）

# 1. 文档目标

本文件用于定义：

* 配置化系统
* 国际化预留
* 内容配置
* 成长参数配置
* 世界/宠物/任务配置

目标：

# 让产品长期可扩展、可调整、可运营。

---

# 2. 核心设计原则

系统必须：

* 配置化
* 可扩展
* 易运营
* 易调整
* 支持长期成长

避免：

* 大量写死逻辑
* 难以调整积分
* 难以增加新世界

---

# 3. 国际化（i18n）设计

# 当前阶段：

主语言：

# 中文（简体）

---

# 后期预留：

支持：

* 英文
* 日文
* 韩文
* 多语言

---

# 4. 文本结构设计

推荐结构：

```text id="k0p5pb"
src/locales/
  zh-CN/
    common.json
    tasks.json
    growth.json
    worlds.json
    pets.json

  en-US/
```

---

# 5. 文本命名原则

采用：

# 模块化命名。

例如：

```json id="l9gdr8"
{
  "task.complete": "完成任务",
  "growth.level_up": "升级啦！",
  "pet.happy": "你的宠物很开心！"
}
```

---

# 6. 配置系统目标

所有核心成长规则：

# 必须配置化。

包括：

* 积分
* 等级
* 宠物
* 世界
* 成就
* 任务

---

# 7. 积分 配置系统

推荐结构：

```json id="jz7j2l"
{
  "task": {
    "basic": 10,
    "review": 20,
    "exploration": 50
  },

  "streak_bonus": {
    "3_days": 10,
    "7_days": 30
  }
}
```

---

# 8. 等级配置系统

推荐结构：

```json id="uwqfjm"
{
  "levels": [
    { "level": 1, "required积分": 0 },
    { "level": 2, "required积分": 100 },
    { "level": 3, "required积分": 250 }
  ]
}
```

---

# 9. 宠物配置系统

推荐结构：

```json id="1l8e8k"
{
  "pet_types": [
    {
      "id": "dragon",
      "name": "小龙",
      "evolutionStages": 3
    }
  ]
}
```

---

# 10. 世界配置系统

推荐结构：

```json id="4pg3tc"
{
  "worlds": [
    {
      "id": "forest_world",
      "name": "森林世界",
      "unlockLevel": 5
    }
  ]
}
```

---

# 11. 成就配置系统

推荐结构：

```json id="rmn7ib"
{
  "achievements": [
    {
      "id": "first_task",
      "name": "第一次成长",
      "condition": "complete_1_task"
    }
  ]
}
```

---

# 12. 任务配置系统

任务：

不能：

# 写死在代码里。

---

## 推荐结构

```json id="kqehkk"
{
  "grade_1": {
    "math": [
      {
        "id": "math_addition_001",
        "title": "10以内加法",
        "xp": 10
      }
    ]
  }
}
```

---

# 13. 学科配置系统

支持：

* 年级
* 学科
* 单元
* 知识点

---

## 推荐结构

```text id="pd53ik"
curriculum/
  grade1/
    chinese.json
    math.json
    english.json
```

---

# 14. UI 配置系统

UI部分：

也需要配置化。

---

## 包括：

* 动画速度
* 主题颜色
* 节日活动
* 世界主题

---

# 15. 节日活动配置

后期支持：

* 春节
* 儿童节
* 圣诞节
* 暑假成长活动

---

## 推荐结构

```json id="h2m60m"
{
  "event": {
    "name": "儿童节活动",
    "startDate": "2026-06-01",
    "endDate": "2026-06-07"
  }
}
```

---

# 16. AI 配置预留

当前阶段：

# 只预留。

---

## 后期支持

包括：

* AI鼓励语
* AI角色
* AI探索任务
* AI对话配置

---

# 17. 配置热更新

后期支持：

# 不发版更新内容。

例如：

* 新任务
* 新世界
* 新活动
* 新奖励

---

# 18. 配置系统原则

配置系统必须：

* 清晰
* 可读
* 可扩展
* 易运营

---

# 19. MVP阶段建议

当前阶段：

优先：

* JSON配置
* 本地配置文件

后期：

再升级：

* CMS
* 云端配置系统

---

# 20. 最终目标

最终形成：

# “成长型内容配置平台”

支持：

* 长期扩展
* 内容快速更新
* AI能力接入
* 世界长期成长
* 多年级长期运营
