# 桐宝学习 - 开发规范文档（Development Guidelines）

# 1. 文档目标

本文件用于：

- 统一前端/后端开发规范
- 保证代码可维护、可扩展
- 支持团队协作
- 支撑 AI Coding 自动生成高质量代码

---

# 2. 技术栈规范

- 前端：React + Vite + TypeScript
- 样式：CSS（当前 MVP 落地）
- 动画：Framer Motion（扩展预留）
- 状态管理：Zustand + Context API
- 后端：Supabase / Firebase
- 数据格式：JSON / Markdown

---

# 3. 目录与文件规范

```text
src/
  app/
    App.tsx
    router.tsx
  pages/
    HomePage.tsx
    TasksPage.tsx
    PetPage.tsx
    WorldPage.tsx
    AchievementsPage.tsx
    ParentPage.tsx
  layouts/
  components/
    task/
    growth/
    pet/
    world/
    achievement/
    ai/
    parent/
    common/
  stores/
    userStore.ts
    taskStore.ts
    petStore.ts
    worldStore.ts
  mock/
  hooks/
  utils/

```


---
# 4. 命名规范
-    4.1 文件命名
-    PascalCase.jsx：组件文件
-    camelCase.js：工具/Hook/Store
-    kebab-case.css：样式文件
-    UPPER_CASE.json：配置文件
-    4.2 变量命名
-    React组件：PascalCase
-    函数/变量：camelCase
-    常量：UPPER_CASE
-    Store：xxxStore.js
-    4.3 Props / State
-    props尽量明确，避免嵌套过深
-    state命名对应 store 名称
# 5. 组件规范
-    组件尽量小，职责单一
-    所有 UI 组件引用 Design Tokens
-    支持多状态：normal, hover, active, disabled, completed
-    动画通过 props 或 Framer Motion Motion Values 控制
-    组件必须支持儿童端与家长端复用
# 6. 状态管理规范
-    store 分模块：user, task, growth, pet, world, achievement, parent
-    store 方法统一：add / update / remove / reset
-    所有状态变化必须触发对应动画与UI刷新
-    本地缓存 + 云端同步
# 7. Git与版本管理规范
-    分支策略：
-    main：稳定版本
-    develop：日常开发
-    feature/xxx：功能分支
-    hotfix/xxx：紧急修复
-    commit规范：
-    feat: 新功能
-    fix: Bug修复
-    refactor: 重构
-    docs: 文档
-    chore: 构建/依赖
-    Pull Request：
-    PR描述清晰
-    必须通过测试
-    代码review通过
# 8. AI Coding / 自动化规范
-    所有生成组件必须引用 Design Tokens
-    所有状态与 store 完全绑定
-    动画使用 motion token
-    避免写死逻辑，使用配置化内容
-    确保儿童端安全和低认知负担
# 9. 测试与调试规范
-    组件必须支持 Storybook / Playground
-    所有核心交互必须可单元测试
-    MVP阶段重点验证任务、XP、宠物、成就、streak
# 10. 最终目标

开发规范文档确保：

- 团队开发高效统一
- 代码可维护、可复用
- 组件、动画、状态与产品体系一致
- 为 AI Coding / 自动生成页面提供规范
- 支撑长期迭代和后期 AI 功能接入




下一步可以做：

# `DEPLOYMENT_GUIDELINES.md`

这个文档会定义：

- 前端打包部署
- 后端部署
- 数据库配置
- 本地开发与测试环境
- 云端同步配置
- MVP阶段上线流程

这是产品从文档走向真实运行环境的关键。
