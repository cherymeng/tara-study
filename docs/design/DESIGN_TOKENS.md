# Tara Study - 设计 Tokens 系统（Design Tokens）

# 1. 系统定位

Design Tokens 是前端工程化的基础：

- 统一颜色、字体、间距、圆角、阴影
- 支持全局组件复用
- 保证动画与界面风格一致
- 支持长期迭代与扩展

---

# 2. 颜色变量（Color Tokens）

| 名称 | HEX | 用途 |
|------|-----|------|
| brand-blue | #4A90E2 | 主色，核心成长模块、按钮 |
| warm-yellow | #F5C74B | XP奖励、成就 |
| explore-green | #7ED321 | 探索任务、阅读 |
| dream-purple | #9B51E0 | AI探索、稀有奖励 |
| bg-light | #FFF8F0 | 页面背景 |
| text-dark | #333333 | 正文文字 |
| text-muted | #666666 | 辅助文字 |

---

# 3. 间距（Spacing Tokens）

| 名称 | px | 用途 |
|------|----|------|
| spacing-xs | 4 | 小间距 |
| spacing-sm | 8 | 小组件间距 |
| spacing-md | 16 | 模块间距 |
| spacing-lg | 24 | 大模块间距 |
| spacing-xl | 32 | 页面边距 |
| spacing-xxl | 48 | 主要区域间距 |

---

# 4. 圆角（Radius Tokens）

| 名称 | px | 用途 |
|------|----|------|
| radius-sm | 8 | 小按钮、输入框 |
| radius-md | 16 | 普通按钮、卡片 |
| radius-lg | 24 | 弹窗、模态框 |
| radius-xl | 32 | 世界模块大卡片 |

---

# 5. 阴影（Shadow Tokens）

| 名称 | CSS | 用途 |
|------|-----|------|
| shadow-xs | 0 1px 3px rgba(0,0,0,0.1) | 小卡片 |
| shadow-sm | 0 2px 6px rgba(0,0,0,0.15) | 普通卡片 |
| shadow-md | 0 4px 12px rgba(0,0,0,0.2) | 弹窗 |
| shadow-lg | 0 8px 24px rgba(0,0,0,0.25) | 世界/全屏 |

---

# 6. 字体（Typography Tokens）

| 名称 | 字体 | 大小(px) | 用途 |
|------|-----|-----------|------|
| font-heading | 'Noto Sans SC', sans-serif | 28 | 一级标题 |
| font-subheading | 'Noto Sans SC', sans-serif | 20 | 二级标题 |
| font-body | 'Noto Sans SC', sans-serif | 16 | 正文 |
| font-small | 'Noto Sans SC', sans-serif | 14 | 辅助文本 |

---

# 7. 动画（Motion Tokens）

| 名称 | CSS / Framer Motion | 用途 |
|------|------------------|------|
| motion-fast | 0.2s ease-out | XP增量、按钮反馈 |
| motion-medium | 0.5s ease-out | 成长动画、宠物互动 |
| motion-slow | 0.8s ease-out | 世界解锁、升级 |
| motion-ease | cubic-bezier(0.4,0,0.2,1) | 通用缓动 |

---

# 8. Z-index（层级 Tokens）

| 名称 | 数值 | 用途 |
|------|-----|------|
| z-base | 0 | 基础层 |
| z-card | 10 | 卡片层 |
| z-modal | 50 | 弹窗层 |
| z-tooltip | 100 | 提示层 |
| z-fullscreen | 200 | 全屏动画层 |

---

# 9. 布局（Layout Tokens）

| 名称 | 数值 | 用途 |
|------|-----|------|
| layout-container | 1200px | 页面最大宽度 |
| layout-gutter | 16px | 页面边距 |
| layout-column | 8 | 栅格列数 |
| layout-row-gap | 16px | 栅格行间距 |
| layout-col-gap | 16px | 栅格列间距 |

---

# 10. 最终目标

Design Tokens 提供：

- 全局可复用设计标准
- 一致的视觉风格与动画节奏
- 高质量儿童界面体验
- 支持长期迭代与扩展

> 所有组件、动画、颜色、字体、间距必须统一引用 Tokens。
:::

下一步我建议做：

# `COMPONENT_LIBRARY.md`

这个文档会真正把 **前端组件库**和 **Design Tokens**结合起来：

- 按模块拆组件
- 定义接口、Props
- 定义状态变化
- 定义动画与正反馈
- 定义儿童端与家长端组件统一规范

这会让前端工程完全可执行。
