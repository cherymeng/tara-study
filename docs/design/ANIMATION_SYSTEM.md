# Tara Study - 动画系统（Animation System）

# 1. 系统定位

动画系统是 Tara Study 核心体验之一。

目标：

* 强化成长感
* 提升孩子正反馈体验
* 保持长期兴趣
* 与前端组件库和 Design Tokens 完全统一

---

# 2. 动画核心原则

1. **成长感优先**
   所有动画都必须强化“我在成长”的感受
2. **短小精悍**
   避免冗长动画影响任务完成
3. **正反馈强化**
   XP、宠物、世界解锁、成就必须有可视化动画
4. **统一节奏**
   使用 motion tokens 统一速度、缓动、时长
5. **低干扰**
   不影响学习，避免闪烁、刺激过强
6. **可复用**
   所有动画可在不同组件中复用

---

# 3. 动画分类

## 3.1 XP增长动画

* 类型：数值增长 + 光效粒子
* 时长：motion-medium (0.5s)
* 触发时机：任务完成、复习任务完成
* 正反馈提示：宠物开心、奖励音效

---

## 3.2 等级升级动画

* 类型：全屏光效 + 宠物互动 + 世界小变化
* 时长：motion-slow (0.8s)
* 触发时机：升级时
* 音效：温暖轻快
* 目标：仪式感，强化成长

---

## 3.3 连续成长动画

* 类型：火焰、星星、轨迹动画
* 时长：motion-medium
* 触发时机：连续完成天数节点
* 正反馈提示：成就感 + XP加成

---

## 3.4 宠物动画

* 类型：打招呼、开心、互动、进化
* 时长：motion-fast / motion-medium
* 触发时机：任务完成、互动操作
* 目标：建立陪伴感

---

## 3.5 世界解锁动画

* 类型：云层散开、地图点亮、渐入元素
* 时长：motion-slow
* 触发时机：世界解锁、新任务开启
* 正反馈提示：探索仪式感

---

## 3.6 成就解锁动画

* 类型：徽章弹窗、光效、粒子
* 时长：motion-medium
* 触发时机：满足成就条件
* 正反馈提示：收藏感、XP奖励

---

# 4. 页面转场动画

* 类型：滑动、淡入淡出、模糊渐变
* 时长：motion-fast / motion-medium
* 原则：短小、连贯、低认知负担
* 避免：复杂3D动画或干扰元素

---

# 5. 动画与 Tokens 绑定

| 动画类型 | duration | easing       | token                |
| ---- | -------- | ------------ | -------------------- |
| XP增长 | 0.5s     | ease-out     | motion-medium        |
| 等级升级 | 0.8s     | cubic-bezier | motion-slow          |
| 连续成长 | 0.5s     | ease-in-out  | motion-medium        |
| 宠物互动 | 0.2~0.5s | ease-out     | motion-fast / medium |
| 世界解锁 | 0.8s     | ease-in      | motion-slow          |
| 成就解锁 | 0.5s     | ease-out     | motion-medium        |
| 页面转场 | 0.2~0.5s | ease-in-out  | motion-fast/medium   |

---

# 6. 音效绑定动画

* XP增长 → 温暖音效
* 升级 → 轻快庆祝音效
* 宠物互动 → 开心音效
* 世界解锁 → 探索音效
* 成就 → 成就提示音

---

# 7. 动画触发规则

1. 任务完成 → XP + 成就 + 宠物动画
2. 升级 → 等级升级 + 宠物互动 + 世界小动画
3. 连续成长 → streak动画 + XP加成
4. 世界解锁 → 地图动画 + 探索任务解锁
5. 成就解锁 → 徽章弹窗 + XP奖励

---

# 8. 可复用动画组件

* XPParticle.jsx
* LevelUpAnimation.jsx
* PetInteractionAnimation.jsx
* WorldUnlockAnimation.jsx
* AchievementAnimation.jsx
* PageTransition.jsx

所有组件都引用 Design Tokens 中的 motion、color、shadow、radius

---

# 9. 最终目标

动画系统确保：

* 每一次成长行为都有可视化反馈
* 孩子感受到成长乐趣
* 宠物与世界增强陪伴感
* 页面流畅、低认知负担
* 支持长期迭代与新内容动画接入
