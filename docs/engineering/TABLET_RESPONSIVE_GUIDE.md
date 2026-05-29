# Tablet Responsive Guide

本阶段已经移除一阶段单文件原型，当前运行入口为：

```text
index.html -> src/main.tsx -> src/app/App.tsx -> src/app/router.tsx
```

## 当前落地原则

- 平板优先：默认布局为左侧导航、中间内容、右侧成长面板。
- 小屏降级：窄屏下成长面板下移，导航横向排列。
- 样式显式化：当前不依赖 Tailwind 构建链，统一由 `src/index.css` 提供语义化 class。
- 核心闭环优先：任务完成后同步 XP、宠物成长、世界解锁。

## 后续组件化方向

- `TaskCard`：抽出任务卡片，复用到首页、任务页、家长端。
- `ProgressSummary`：抽出今日完成度、XP、连续打卡统计。
- `WorldRegionCard`：抽出世界区域展示和解锁状态。
- `AchievementCard`：抽出成就卡，后续接入成就配置。

## 验证命令

```bash
npm run build
npm run typecheck
npm run lint
```
