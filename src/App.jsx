import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Bell,
  BookOpenText,
  BrainCircuit,
  CalendarRange,
  ChartNoAxesCombined,
  CirclePlay,
  Home,
  Languages,
  Medal,
  MessageSquareMore,
  Rocket,
  Search,
  Sparkles,
  SquarePen,
  Star,
  Timer,
  Trophy,
  WandSparkles,
} from 'lucide-react'
import './App.css'

const subjectList = [
  {
    id: 'chinese',
    label: '语文',
    subtitle: '识字 · 阅读 · 表达',
    accent: '#44b7ff',
    soft: '#e7f7ff',
    progress: 78,
    focus: '完成阅读理解并补一段口头复述',
    tasks: [
      {
        id: 'hanzi',
        title: '识字训练',
        summary: '8 个生字卡片复习，附发音和例句。',
        progress: 46,
        duration: '12 min',
        energy: '轻松进入状态',
      },
      {
        id: 'reading',
        title: '阅读理解',
        summary: '完成短文阅读，提取人物、地点和事件线索。',
        progress: 72,
        duration: '18 min',
        energy: '今天主任务',
      },
      {
        id: 'expression',
        title: '口头表达',
        summary: '根据图片说一段完整描述，训练逻辑和词汇。',
        progress: 35,
        duration: '8 min',
        energy: '收尾强化',
      },
    ],
    insights: [
      '识字题完成后，阅读正确率会上升 9%。',
      '口头复述建议放在阅读后 5 分钟内完成。',
      'AI 已标记 2 处易混字，可优先复习。',
    ],
  },
  {
    id: 'math',
    label: '数学',
    subtitle: '口算 · 图形 · 思维',
    accent: '#75a9ff',
    soft: '#edf3ff',
    progress: 64,
    focus: '先完成 20 题口算，再做 1 题图形推理。',
    tasks: [
      {
        id: 'mental',
        title: '20 题口算',
        summary: '三组连加连减，重点控制计算速度。',
        progress: 62,
        duration: '10 min',
        energy: '热身任务',
      },
      {
        id: 'geometry',
        title: '图形观察',
        summary: '识别旋转和镜像变化，提升空间感知。',
        progress: 38,
        duration: '14 min',
        energy: '思维拉伸',
      },
      {
        id: 'reasoning',
        title: '数学思维',
        summary: '用 3 步法拆解应用题，找到数量关系。',
        progress: 24,
        duration: '20 min',
        energy: '挑战项',
      },
    ],
    insights: [
      '口算稳定度比昨天提升 12%。',
      '图形题建议使用“先看角度再看方向”的顺序。',
      'AI 检测到应用题审题停顿偏长，可先圈关键词。',
    ],
  },
  {
    id: 'english',
    label: '英语',
    subtitle: '单词 · 跟读 · 拼读',
    accent: '#66cde3',
    soft: '#e9fbff',
    progress: 83,
    focus: '保持跟读节奏，补 6 个高频词的自然拼读。',
    tasks: [
      {
        id: 'words',
        title: '单词跟读',
        summary: '跟读 12 个高频词，校正重音和尾音。',
        progress: 84,
        duration: '9 min',
        energy: '保持节奏',
      },
      {
        id: 'phonics',
        title: '自然拼读',
        summary: '练习 a_e、i_e 发音组合，识别发音规则。',
        progress: 68,
        duration: '12 min',
        energy: '今日重点',
      },
      {
        id: 'dialogue',
        title: '场景对话',
        summary: '完成一段问候对话，提升开口流畅度。',
        progress: 51,
        duration: '11 min',
        energy: '输出练习',
      },
    ],
    insights: [
      '今天的跟读节奏最适合放在晚上 7 点前。',
      '自然拼读完成后，新词记忆稳定度更高。',
      'AI 识别到 3 个尾音可以再压实一遍。',
    ],
  },
]

const navItems = [
  { id: 'overview', label: '概览', icon: Home },
  { id: 'chinese', label: '语文', icon: BookOpenText },
  { id: 'math', label: '数学', icon: ChartNoAxesCombined },
  { id: 'english', label: '英语', icon: Languages },
  { id: 'coach', label: 'AI', icon: Sparkles },
]

const summaryCards = [
  { label: '今日学习时长', value: '48', unit: 'min', tone: 'sky' },
  { label: '任务完成率', value: '74', unit: '%', tone: 'blue' },
  { label: '连续打卡', value: '12', unit: 'days', tone: 'mint' },
  { label: '成长星光', value: '+18', unit: 'pts', tone: 'gold' },
]

const activityFeed = [
  { time: '08:20', title: '晨读打卡完成', note: '语文模块已自动记录一段跟读。'},
  { time: '16:10', title: '数学错题复盘', note: 'AI 已整理出 2 个重复失分点。'},
  { time: '19:30', title: '英语朗读评分', note: '尾音清晰度比上次提高 14%。'},
]

const initialMessages = [
  {
    id: 'a-1',
    role: 'assistant',
    text: '今天建议从轻量任务开始，先把状态拉起来，再做主任务。',
  },
  {
    id: 'a-2',
    role: 'assistant',
    text: '我已经根据最近三次表现，给你排好了更顺手的学习顺序。',
  },
]

function buildCoachReply(message, subject, task) {
  if (message.includes('先做什么')) {
    return `先做「${subject.tasks[0].title}」，大约 ${subject.tasks[0].duration}，更容易进入状态。`
  }

  if (message.includes('难') || message.includes('不会')) {
    return `如果「${task.title}」感觉偏难，先拆成 2 段完成。第一段只做基础部分，第二段再补完整。`
  }

  if (message.includes('快') || message.includes('效率')) {
    return `想提效的话，今天可以按「${subject.tasks[0].title} → ${subject.tasks[1].title} → ${subject.tasks[2].title}」的顺序走。`
  }

  return `收到。围绕「${task.title}」，我建议先看题干关键词，再用 1 分钟做一遍口头预演，这样会更稳。`
}

export default function StudyCheckinTabletPro() {
  const [activeSection, setActiveSection] = useState('overview')
  const [activeSubjectId, setActiveSubjectId] = useState('chinese')
  const [activeTaskId, setActiveTaskId] = useState('hanzi')
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState(initialMessages)

  const activeSubject =
    subjectList.find((subject) => subject.id === activeSubjectId) ?? subjectList[0]
  const activeTask =
    activeSubject.tasks.find((task) => task.id === activeTaskId) ?? activeSubject.tasks[0]
  const todayLabel = new Intl.DateTimeFormat('zh-CN', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(new Date())

  function switchSubject(subjectId, sectionId = subjectId) {
    const target = subjectList.find((subject) => subject.id === subjectId)
    if (!target) return

    setActiveSection(sectionId)
    setActiveSubjectId(subjectId)
    setActiveTaskId(target.tasks[0].id)
  }

  function handleSendMessage() {
    const value = draft.trim()
    if (!value) return

    const userMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: value,
    }

    const assistantMessage = {
      id: `a-${Date.now() + 1}`,
      role: 'assistant',
      text: buildCoachReply(value, activeSubject, activeTask),
    }

    setMessages((current) => [...current, userMessage, assistantMessage])
    setDraft('')
  }

  return (
    <div
      className="study-shell"
      style={{
        '--subject-accent': activeSubject.accent,
        '--subject-soft': activeSubject.soft,
      }}
    >
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />

      <aside className="rail">
        <div className="rail__brand">
          <div className="rail__brand-icon">
            <Sparkles size={20} />
          </div>
          <div>
            <div className="rail__brand-title">学习岛</div>
            <div className="rail__brand-subtitle">Pro</div>
          </div>
        </div>

        <div className="rail__menu">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <button
                key={item.id}
                type="button"
                className={`rail__button ${isActive ? 'is-active' : ''}`}
                onClick={() => {
                  if (item.id === 'overview' || item.id === 'coach') {
                    setActiveSection(item.id)
                    return
                  }
                  switchSubject(item.id)
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>

        <div className="rail__footer">
          <div className="rail__avatar">Q</div>
          <div>
            <div className="rail__name">QIU</div>
            <div className="rail__level">Lv.12</div>
          </div>
        </div>
      </aside>

      <main className="workspace">
        <header className="workspace__topbar">
          <div>
            <div className="workspace__eyebrow">{todayLabel}</div>
            <h1>今日学习节奏已经排好，可以直接开始。</h1>
          </div>

          <div className="workspace__actions">
            <label className="searchbox">
              <Search size={16} />
              <input placeholder="搜索任务、错题、单词" />
            </label>

            <button type="button" className="icon-chip">
              <Bell size={18} />
            </button>
          </div>
        </header>

        <section className="hero-grid">
          <motion.article
            className="hero-card"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="hero-card__content">
              <div className="hero-card__tag">
                <WandSparkles size={16} />
                AI 已重排今日路线
              </div>

              <div className="hero-card__title">
                先把轻量任务做完，再进入今天的主任务。
              </div>

              <div className="hero-card__text">
                当前推荐学科是「{activeSubject.label}」，建议先完成
                「{activeSubject.tasks[0].title}」，然后衔接
                「{activeSubject.tasks[1].title}」。
              </div>

              <div className="hero-card__buttons">
                <button
                  type="button"
                  className="primary-button"
                  onClick={() => switchSubject(activeSubject.id)}
                >
                  <CirclePlay size={18} />
                  立即开始
                </button>

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setActiveSection('coach')}
                >
                  <MessageSquareMore size={18} />
                  问 AI
                </button>
              </div>
            </div>

            <div className="hero-card__aside">
              <div
                className="hero-orbit"
                style={{ '--orbit-progress': `${activeSubject.progress}%` }}
              >
                <div className="hero-orbit__core">{activeSubject.progress}%</div>
              </div>
              <div className="hero-pill">
                <Rocket size={15} />
                今日重点：{activeSubject.focus}
              </div>
            </div>
          </motion.article>

          <div className="summary-grid">
            {summaryCards.map((card, index) => (
              <motion.div
                key={card.label}
                className={`summary-card tone-${card.tone}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.08 * index }}
              >
                <div className="summary-card__label">{card.label}</div>
                <div className="summary-card__value">
                  {card.value}
                  <span>{card.unit}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="content-grid">
          <section className="panel subject-panel">
            <div className="panel__header">
              <div>
                <div className="panel__eyebrow">Subject board</div>
                <h2>今日任务</h2>
              </div>
              <button
                type="button"
                className="ghost-button"
                onClick={() => switchSubject(activeSubject.id)}
              >
                查看学科详情
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="subject-switcher">
              {subjectList.map((subject) => (
                <button
                  key={subject.id}
                  type="button"
                  className={`subject-chip ${activeSubjectId === subject.id ? 'is-active' : ''}`}
                  onClick={() => switchSubject(subject.id)}
                >
                  <span>{subject.label}</span>
                  <small>{subject.subtitle}</small>
                </button>
              ))}
            </div>

            <div className="subject-board">
              <div className="task-list">
                {activeSubject.tasks.map((task) => (
                  <motion.button
                    key={task.id}
                    type="button"
                    layout
                    className={`task-card ${activeTaskId === task.id ? 'is-active' : ''}`}
                    onClick={() => setActiveTaskId(task.id)}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.18 }}
                  >
                    <div className="task-card__topline">
                      <span>{task.title}</span>
                      <strong>{task.duration}</strong>
                    </div>
                    <p>{task.summary}</p>
                    <div className="task-card__meta">{task.energy}</div>
                    <div className="task-progress">
                      <div style={{ width: `${task.progress}%` }} />
                    </div>
                  </motion.button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.article
                  key={activeTask.id}
                  className="detail-card"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="detail-card__heading">
                    <div>
                      <div className="detail-card__tag">{activeSubject.label}</div>
                      <h3>{activeTask.title}</h3>
                    </div>

                    <div
                      className="progress-ring"
                      style={{ '--progress': `${activeTask.progress}%` }}
                    >
                      <div className="progress-ring__inner">{activeTask.progress}%</div>
                    </div>
                  </div>

                  <p className="detail-card__summary">{activeTask.summary}</p>

                  <div className="detail-metrics">
                    <div>
                      <Timer size={16} />
                      <span>{activeTask.duration}</span>
                    </div>
                    <div>
                      <BrainCircuit size={16} />
                      <span>{activeTask.energy}</span>
                    </div>
                    <div>
                      <SquarePen size={16} />
                      <span>支持 AI 批改</span>
                    </div>
                  </div>

                  <div className="insight-block">
                    {activeSubject.insights.map((insight) => (
                      <div key={insight} className="insight-row">
                        <Star size={14} />
                        <span>{insight}</span>
                      </div>
                    ))}
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </section>

          <aside className="panel coach-panel">
            <div className="panel__header">
              <div>
                <div className="panel__eyebrow">AI coach</div>
                <h2>陪练助手</h2>
              </div>
              <div className="panel__badge">在线</div>
            </div>

            <div className="coach-highlights">
              <div className="coach-highlight">
                <CalendarRange size={16} />
                今日路线已同步
              </div>
              <div className="coach-highlight">
                <Medal size={16} />
                推荐完成度 92%
              </div>
              <div className="coach-highlight">
                <Trophy size={16} />
                已追踪近 7 天表现
              </div>
            </div>

            <div className="message-list">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`message-bubble role-${message.role}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {message.text}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="chat-composer">
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    handleSendMessage()
                  }
                }}
                placeholder={`试试问我：${activeTask.title} 先做什么？`}
              />
              <button type="button" onClick={handleSendMessage}>
                <Sparkles size={16} />
              </button>
            </div>
          </aside>
        </section>

        <section className="bottom-grid">
          <section className="panel">
            <div className="panel__header">
              <div>
                <div className="panel__eyebrow">Progress line</div>
                <h2>今日动态</h2>
              </div>
            </div>

            <div className="activity-list">
              {activityFeed.map((item) => (
                <div key={item.time} className="activity-row">
                  <div className="activity-row__time">{item.time}</div>
                  <div className="activity-row__body">
                    <div className="activity-row__title">{item.title}</div>
                    <div className="activity-row__note">{item.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="panel mini-panel">
            <div className="panel__header">
              <div>
                <div className="panel__eyebrow">Highlights</div>
                <h2>今日亮点</h2>
              </div>
            </div>

            <div className="highlight-list">
              <div className="highlight-card">
                <Sparkles size={18} />
                <div>
                  <strong>学习顺序已优化</strong>
                  <span>先轻后重，减少中途停顿。</span>
                </div>
              </div>
              <div className="highlight-card">
                <BrainCircuit size={18} />
                <div>
                  <strong>AI 捕捉到 2 个错因</strong>
                  <span>可以在晚间复盘时集中修正。</span>
                </div>
              </div>
              <div className="highlight-card">
                <BookOpenText size={18} />
                <div>
                  <strong>阅读状态最好</strong>
                  <span>当前适合安排阅读理解主任务。</span>
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>
    </div>
  )
}
