# Tara Study - 部署规范文档（Deployment Guidelines）

## 1. 文档目标

本文件用于定义：

- 前端打包与部署流程
- 后端部署与配置
- 数据库初始化与管理
- 本地开发环境搭建
- 云端同步配置
- MVP 上线流程

目标：

> 确保团队可以快速搭建完整运行环境，支持 MVP 测试与后期迭代。

---

## 2. 前端部署

### 2.1 技术栈

- React + Vite
- Tailwind CSS / CSS Modules
- Framer Motion
- TypeScript（可选）

### 2.2 本地开发

```bash
# 安装依赖
npm install

# 本地启动
npm run dev
```

### 2.3 构建生产包

```bash
# 构建生产环境
npm run build

# 本地预览生产包
npm run preview
```

### 2.4 部署

- 推荐静态托管：Vercel / Netlify / Firebase Hosting
- 打包输出目录：`dist/`
- 环境变量管理：`.env` 文件

---

## 3. 后端部署

### 3.1 技术栈

- Supabase 或 Firebase（MVP 阶段轻量级）
- Node.js / Express（可选后端服务）
- PostgreSQL（Supabase 内置）

### 3.2 本地开发

```bash
# 安装依赖
npm install

# 启动后端服务
npm run dev
```

### 3.3 部署生产

- Supabase / Firebase 自动托管
- Node.js 后端可部署在：
  - Vercel Serverless
  - Railway
  - Render

---

## 4. 数据库管理

### 4.1 表结构

- 用户表（`user`）
- 任务表（`task`）
- XP / 等级表（`growth`）
- 宠物表（`pet`）
- 世界表（`world`）
- 成就表（`achievement`）
- 家长报告表（`parent_report`）

### 4.2 初始化脚本

```sql
-- 示例：创建用户表
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  grade INT NOT NULL,
  role TEXT NOT NULL,
  last_login TIMESTAMP
);
```

### 4.3 数据同步

- 本地缓存同步到云端（LocalStorage -> Supabase）
- 云端数据下发到前端（首次加载 / 刷新）

---

## 5. 本地环境配置

### 5.1 前端

```bash
# 安装依赖
npm install

# 启动开发环境
npm run dev
```

### 5.2 后端

```bash
# 安装依赖
npm install

# 启动本地服务
npm run dev
```

### 5.3 环境变量

```dotenv
VITE_API_BASE_URL=http://localhost:3000/api
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=xxxx
```

## 6. 云端环境配置

### 6.1 服务选择

- Supabase / Firebase

### 6.2 前端生产环境 `.env` 配置

```dotenv
VITE_API_BASE_URL=https://prod-api.tara-study.com
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=xxxx
```

### 6.3 权限策略

- 儿童端只能操作自己的数据
- 家长端可查看孩子数据
- 数据安全与隐私必须保障

## 7. MVP 上线流程

### 7.1 确认功能完成

- 任务系统
- XP / 等级系统
- 宠物系统
- 成就系统
- 家长报告系统

### 7.2 执行本地测试

- UI 测试
- 动画测试
- 成长循环验证

### 7.3 上线步骤

1. 构建前端生产包
2. 部署前端到 Vercel / Netlify
3. 配置后端云端服务
4. 初始化数据库
5. 配置环境变量
6. 运行 MVP 测试用户
7. 收集反馈，迭代优化

## 8. 环境监控与日志

- 前端错误收集：Sentry / LogRocket
- 后端日志：Supabase Logs / Node.js Logging
- 数据统计：GA / 自定义事件埋点
- 核心监控：任务完成率、XP 变化、Streak 形成

## 9. 部署规范总结

- 所有环境变量必须独立管理
- 前端构建必须使用 Vite 生产模式
- 后端服务必须支持热更新（开发阶段）
- 数据库必须先初始化再上线
- MVP 阶段先小范围上线测试
- 生产环境保证儿童数据安全和隐私

## 10. 最终目标

通过部署规范：

- 团队可以快速搭建本地和生产环境
- MVP 阶段可以安全上线
- 支撑后续迭代和长期运营
- 为未来 AI 功能和全球多语言扩展打基础

## 11. 下一步建议

- `DOCUMENTATION_INDEX.md`

这是一个文档索引，用于把前面所有 Markdown 文档整理成一份**可直接推送到 GitHub 的完整目录导航**，方便团队快速查阅。
