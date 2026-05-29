# 桐宝学习

儿童成长学习打卡产品（MVP）

---

# 项目简介

桐宝学习 是一个面向 6~12 岁儿童的成长型学习产品。

产品通过：

- 每日任务
- 学习打卡
- 成长反馈
- 虚拟宠物
- 世界探索
- 家长协同

构建正向成长循环。

核心目标：

让孩子获得持续成长动力，而不是被动完成学习任务。

---

# 产品定位

## 用户

### 儿童

年龄：

6~12岁

特点：

- 注意力有限
- 喜欢即时反馈
- 喜欢养成和收集
- 对成长感有强烈需求

### 家长

需求：

- 监督学习
- 查看成长情况
- 进行鼓励和引导

---

# MVP目标

第一阶段只验证：

## 成长循环

```text
任务
 ↓
完成
 ↓
获得奖励
 ↓
宠物成长
 ↓
世界解锁
 ↓
获得成就感
 ↓
继续完成任务
```

---

## MVP范围

包含：

- 每日任务
- 打卡
- 成长值
- 等级系统
- 宠物成长
- 世界地图
- 家长查看端

暂不包含：

- AI陪伴
- AI老师
- AI聊天
- AI内容生成
- 付费系统
- 订阅系统

仅预留扩展能力。

---

# 技术栈

## 前端

- React
- TypeScript
- Vite
- Zustand
- React Router

## UI

- CSS
- Framer Motion（预留）

## 数据

MVP阶段：

- Mock Data
- LocalStorage

后续：

- Supabase

---

# 项目结构

```text
tongbao-study
├── docs
├── public
├── src
│
├── app
├── layouts
├── pages
├── stores
├── mock
├── hooks
├── utils
├── constants
├── types
│
└── main.tsx
```

详细说明：

```text
docs/engineering/PROJECT_STRUCTURE.md
```

---

# 文档导航

## 产品文档

```text
docs/prd/
```

## 设计文档

```text
docs/design/
```

## 工程文档

```text
docs/engineering/
```

## 路线图

```text
docs/roadmap/
```

完整索引：

```text
docs/DOCUMENTATION_INDEX.md
```

---

# 当前开发阶段

当前阶段：

```text
MVP V1 - 二年级语文生字增长系统
```

目标：

在已完成基础成长循环后，优先把“二年级语文生字任务打卡”做深，形成可交付的学习闭环。

优先级：

```text
生字新学
> 遗忘曲线复习
> 生字小测验
> 本地模拟上传打卡
> 家长评价与追加 XP
```

当前规则：

- 孩子提交打卡后，任务立即完成并获得基础 XP。
- 家长评价不阻塞任务完成，也不阻塞基础 XP。
- 家长评价很好时，可追加 XP。
- 家长评价需要再练时，不扣 XP，只进入后续复习计划。
- 第一版只做本地模拟上传，不接真实云存储。
- 其他年级和其他学科先预留，不进入本阶段实现范围。

AI能力暂不开发。

---

# 本地运行

```bash
npm install
npm run dev
```

质量检查：

```bash
npm run build
npm run typecheck
npm run lint
```

安装依赖：

```bash
npm install
```

启动开发环境：

```bash
npm run dev
```

构建：

```bash
npm run build
```

预览：

```bash
npm run preview
```

---

# 开发规范

提交代码前：

```bash
npm run lint
```

新增页面：

- 页面放入 pages
- 组件放入 components
- 状态统一进入 stores
- Mock 数据统一进入 mock

---

# 产品路线图

## MVP

成长循环验证

## V2

课程体系

## V3

成长世界扩展

## V4

AI陪伴能力

## V5

家长成长报告

---

# License

MIT
