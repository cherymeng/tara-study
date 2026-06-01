# 桐宝学习 - 技术架构系统（Tech Architecture）

# 1. 系统定位

Tech Architecture 用于定义：

* 产品整体技术结构
* 前后端职责
* AI系统结构
* 数据流设计
* 内容系统
* 可扩展能力

目标：

# 支持 桐宝学习 从 MVP 平滑成长为长期儿童成长平台。

---

# 2. 技术架构核心原则

系统必须：

* 易开发
* 易扩展
* 易维护
* 支持长期成长
* 支持 AI 功能扩展

---

# 3. 总体架构

推荐采用：

# 前后端分离架构

结构：

```text
Frontend（React/Vite）
        ↓
API Layer
        ↓
Backend Services
        ↓
Database + Storage + AI Services
```

---

# 4. 前端架构（Frontend）

## 推荐技术栈

* React
* Vite
* TypeScript（后期）
* Tailwind CSS / CSS Modules
* Framer Motion

---

## 前端职责

负责：

* UI渲染
* 动画
* 成长反馈
* 页面状态
* 本地缓存
* 用户交互

---

## 核心模块

包括：

* 学习任务系统
* 积分成长系统
* 宠物系统
* 世界系统
* AI互动界面
* 家长端

---

# 5. 后端架构（Backend）

# MVP阶段建议：

先采用：

# 轻后端模式。

例如：

* Supabase
  或：
* Firebase

原因：

* 开发速度快
* 用户系统简单
* 数据结构清晰
* AI接入容易

---

# 6. 数据库架构

核心数据：

包括：

* 用户
* 任务
* 积分
* 等级
* 宠物
* 世界
* 成就
* AI探索任务
* 家长报告

详细结构：

见：

# DATABASE_SCHEMA.md

---

# 7. 内容系统架构（Content System）

# 内容必须可配置。

不能：

* 写死在代码中

---

## 内容结构

建议：

```text
content/
  curriculum/
    chinese/
    math/
    english/

  exploration/
    ai/
    science/
    creativity/

  worlds/
  pets/
  achievements/
```

---

## 内容格式

推荐：

* JSON
* Markdown
* CMS化结构（后期）

---

# 8. AI系统架构（AI Architecture）

# AI 是长期核心能力。

---

## MVP阶段

先采用：

# API调用模式。

例如：

* OpenAI API
* Claude API

---

## AI功能

包括：

* AI鼓励
* AI探索
* AI问答
* AI故事
* AI创造任务

---

## AI原则

AI：

不是：

* 搜索引擎

而是：

# 成长伙伴。

---

# 9. 本地存储策略

# MVP阶段：

优先：

* LocalStorage
* IndexedDB

缓存：

* 积分
* 连续成长
* 宠物状态
* 本地任务

---

# 10. 云端同步

后期支持：

* 多设备同步
* 家长端同步
* AI成长记录
* 云端成长档案

---

# 11. 动画系统架构

动画采用：

# Framer Motion

---

## 动画模块

包括：

* 积分增长
* 升级
* 宠物互动
* 世界解锁
* 成就反馈

---

## 动画原则

必须：

* 高性能
* 短反馈
* 不影响学习节奏

---

# 12. 状态管理

推荐：

## MVP阶段

采用：

* Context API
* Zustand

---

## 后期

如复杂度提高：

可采用：

* Redux Toolkit

---

# 13. API设计原则

API必须：

* 简洁
* 可扩展
* 模块化

---

## 核心API

包括：

* 用户系统
* 任务系统
* 积分系统
* 成长系统
* AI系统
* 家长系统

---

# 14. 安全原则

产品必须：

* 儿童安全
* 数据安全
* AI安全

---

## 禁止：

* 不安全AI内容
* 用户隐私泄露
* 强社交风险

---

# 15. 内容更新系统

后期支持：

* 热更新
* 新世界
* 新任务
* 新探索内容

无需：

* 强制更新客户端

---

# 16. 可扩展性设计

架构必须支持：

* 新世界
* 新宠物
* 新任务
* AI升级
* 多语言
* 国际化

---

# 17. 性能原则

儿童产品：

# 必须流畅。

---

## 页面原则

避免：

* 卡顿
* 长加载
* 高频闪烁

---

## 优化方向

包括：

* 图片懒加载
* 动画优化
* 本地缓存
* 请求缓存

---

# 18. MVP推荐技术方案

## 前端

* React
* Vite
* Framer Motion

---

## 后端

* Supabase

---

## 数据库

* PostgreSQL（Supabase）

---

## AI

* OpenAI API

---

## 存储

* Supabase Storage

---

# 19. 后期架构演进

未来：

逐步演进：

```text
MVP
↓
成长系统
↓
AI系统
↓
内容平台
↓
长期成长生态
```

---

# 20. 最终目标

技术架构最终需要支持：

# 一个长期儿童成长平台。

核心目标：

* 稳定
* 温暖
* 可扩展
* AI原生
* 支持长期成长体验
