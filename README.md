# Tara Study

儿童成长学习打卡产品（MVP）

---

# 项目简介

Tara Study 是一个面向 6~12 岁儿童的成长型学习产品。

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

- TailwindCSS
- Framer Motion

## 数据

MVP阶段：

- Mock Data
- LocalStorage

后续：

- Supabase

---

# 项目结构

```text
tara-study
├── docs
├── public
├── src
│
├── components
├── pages
├── stores
├── services
├── mock
├── hooks
├── constants
├── types
│
└── App.tsx
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
MVP V1
```

目标：

验证儿童成长循环是否成立。

优先级：

```text
成长循环
> 打卡
> 宠物成长
> 世界解锁
> 家长查看
```

AI能力暂不开发。

---

# 本地运行

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
