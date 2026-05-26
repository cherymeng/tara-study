import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  BadgeCheck,
  BookOpenText,
  BrainCircuit,
  CalendarDays,
  Calculator,
  CheckCircle2,
  ChevronRight,
  CirclePlay,
  Clock3,
  Footprints,
  Gift,
  House,
  Languages,
  Map,
  MessageCircle,
  SendHorizontal,
  Sparkles,
  Star,
  Sun,
  Trophy,
} from 'lucide-react'
import './App.css'

const subjectList = [
  {
    id: 'chinese',
    short: '语文',
    name: '语文森林',
    mascot: '🐼',
    sticker: '🍊',
    accent: '#ff9d7a',
    deep: '#ff7b59',
    soft: '#fff1ea',
    glow: 'rgba(255, 141, 105, 0.34)',
    icon: BookOpenText,
    progress: 76,
    stars: 8,
    mission: '认字卡 + 读故事 + 说一句',
    headline: '和熊猫老师一起去森林里找词语宝藏。',
    focus: '先认字，再读故事，最后大声说出来。',
    buddy: '熊猫老师最擅长帮助你把句子说完整。',
    rewards: ['森林朗读章', '识字小侦探'],
    tasks: [
      {
        id: 'hanzi',
        title: '字卡翻翻乐',
        description: '翻一翻 8 张字卡，认识今天的新朋友。',
        duration: '8 分钟',
        reward: '+2 星',
      },
      {
        id: 'story',
        title: '故事小阅读',
        description: '读一篇短故事，找到人物和发生的事情。',
        duration: '10 分钟',
        reward: '+3 星',
      },
      {
        id: 'speak',
        title: '大声说一句',
        description: '挑一句你最喜欢的话，读给熊猫老师听。',
        duration: '5 分钟',
        reward: '+2 星',
      },
    ],
    prompts: ['我先做什么？', '这个字怎么记得快？', '我读得不顺怎么办？'],
  },
  {
    id: 'math',
    short: '数学',
    name: '数学火箭站',
    mascot: '🦊',
    sticker: '🚀',
    accent: '#79b8ff',
    deep: '#4f93ff',
    soft: '#eef5ff',
    glow: 'rgba(90, 158, 255, 0.32)',
    icon: Calculator,
    progress: 61,
    stars: 7,
    mission: '口算冲刺 + 图形观察 + 小思考',
    headline: '狐狸队长在火箭站等你，一起点亮数学引擎。',
    focus: '先做口算热身，再挑战图形和思考题。',
    buddy: '狐狸队长会把难题拆成一步一步的小任务。',
    rewards: ['火箭加速章', '口算闪电章'],
    tasks: [
      {
        id: 'mental',
        title: '口算冲冲冲',
        description: '完成 20 题口算，让数字跑起来。',
        duration: '8 分钟',
        reward: '+3 星',
      },
      {
        id: 'shape',
        title: '图形找朋友',
        description: '看一看旋转和翻转，找出正确图形。',
        duration: '9 分钟',
        reward: '+2 星',
      },
      {
        id: 'thinking',
        title: '聪明脑袋题',
        description: '试着用 3 步想一想，把题目拆开做。',
        duration: '12 分钟',
        reward: '+3 星',
      },
    ],
    prompts: ['口算总算错怎么办？', '这道题太难了', '怎么做得更快？'],
  },
  {
    id: 'english',
    short: '英语',
    name: '英语海湾',
    mascot: '🐧',
    sticker: '🌊',
    accent: '#63d8d3',
    deep: '#2dbab3',
    soft: '#ebfffd',
    glow: 'rgba(82, 209, 202, 0.32)',
    icon: Languages,
    progress: 84,
    stars: 9,
    mission: '单词跟读 + 拼读练习 + 小对话',
    headline: '跟着小企鹅去海湾练口语，声音要像浪花一样亮。',
    focus: '先跟读，再拼读，最后试着说一句完整对话。',
    buddy: '小企鹅会陪你练开口，不着急，慢慢来。',
    rewards: ['海湾发音章', '勇敢开口章'],
    tasks: [
      {
        id: 'follow',
        title: '单词跟跟读',
        description: '跟读 10 个单词，让发音更清楚。',
        duration: '7 分钟',
        reward: '+2 星',
      },
      {
        id: 'phonics',
        title: '拼读小海浪',
        description: '练习自然拼读，把声音连起来。',
        duration: '9 分钟',
        reward: '+3 星',
      },
      {
        id: 'talk',
        title: '打招呼对话',
        description: '试着说一段简单问候，开口更自信。',
        duration: '6 分钟',
        reward: '+2 星',
      },
    ],
    prompts: ['我不敢开口怎么办？', '单词怎么读得更像？', '先练哪一个？'],
  },
]

const dockItems = [
  { id: 'home', label: '首页', icon: House },
  { id: 'buddy', label: 'AI伙伴', icon: MessageCircle },
  { id: 'rewards', label: '奖励屋', icon: Trophy },
]

const starterMessages = [
  {
    id: 'm-1',
    role: 'assistant',
    text: '你好呀，今天也来一起打卡吧。我已经帮你排好了舒服的学习顺序。',
  },
]

function buildBuddyReply(message, subject, firstTask) {
  if (message.includes('先') || message.includes('开始')) {
    return `我们先做「${firstTask.title}」，先热热身，做完会更有信心。`
  }

  if (message.includes('难') || message.includes('不会')) {
    return `没关系，我们把「${firstTask.title}」拆成小步。先做 1 题，再做 2 题，很快就能找到感觉。`
  }

  if (message.includes('奖励') || message.includes('星')) {
    return `完成今天的 ${subject.tasks.length} 个小任务，就可以拿到「${subject.rewards[0]}」和更多星星。`
  }

  return `我在呢。围绕「${subject.short}」，你可以先慢慢读一遍，再跟着我做第二遍，会更顺。`
}

function SubjectCard({ subject, onOpen }) {
  const Icon = subject.icon

  return (
    <motion.button
      type="button"
      className="subject-card"
      onClick={() => onOpen(subject.id)}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      style={{
        '--card-soft': subject.soft,
        '--card-accent': subject.accent,
        '--card-deep': subject.deep,
        '--card-glow': subject.glow,
      }}
    >
      <div className="subject-card__top">
        <div className="subject-card__icon-wrap">
          <span className="subject-card__mascot">{subject.mascot}</span>
          <span className="subject-card__sticker">{subject.sticker}</span>
        </div>
        <div className="subject-card__badge">
          <Icon size={16} />
          {subject.short}
        </div>
      </div>

      <div className="subject-card__body">
        <h3>{subject.name}</h3>
        <p>{subject.mission}</p>
      </div>

      <div className="subject-card__footer">
        <div className="subject-card__stars">
          <Star size={14} />
          {subject.stars} 颗星
        </div>
        <div className="subject-card__enter">
          去打卡
          <ChevronRight size={16} />
        </div>
      </div>
    </motion.button>
  )
}

function RewardBadge({ label, emoji }) {
  return (
    <div className="reward-badge">
      <span>{emoji}</span>
      <strong>{label}</strong>
    </div>
  )
}

export default function StudyCheckinTabletPro() {
  const [page, setPage] = useState('home')
  const [activeSubjectId, setActiveSubjectId] = useState('chinese')
  const [messages, setMessages] = useState(starterMessages)
  const [draft, setDraft] = useState('')
  const [taskSpark, setTaskSpark] = useState(null)
  const [rewardPopup, setRewardPopup] = useState(null)
  const [checkedMap, setCheckedMap] = useState({
    chinese: ['hanzi'],
    math: [],
    english: ['follow'],
  })
  const [earnedBadges, setEarnedBadges] = useState([
    { id: 'starter', label: '连续打卡 6 天', emoji: '🌟' },
    { id: 'voice', label: '勇敢开口', emoji: '🎤' },
  ])

  const activeSubject =
    subjectList.find((subject) => subject.id === activeSubjectId) ?? subjectList[0]
  const checkedTasks = checkedMap[activeSubjectId] ?? []
  const completedCount = checkedTasks.length
  const isSubjectDone = completedCount === activeSubject.tasks.length

  useEffect(() => {
    if (!taskSpark) return undefined

    const timer = window.setTimeout(() => {
      setTaskSpark(null)
    }, 1500)

    return () => window.clearTimeout(timer)
  }, [taskSpark])

  const totalStars = useMemo(() => {
    const base = subjectList.reduce((sum, subject) => sum + subject.stars, 0)
    const bonus = Object.values(checkedMap).reduce((sum, list) => sum + list.length * 2, 0)
    return base + bonus
  }, [checkedMap])

  const todayLabel = new Intl.DateTimeFormat('zh-CN', {
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
  }).format(new Date())

  function openSubject(subjectId) {
    setActiveSubjectId(subjectId)
    setPage('subject')
  }

  function toggleTask(taskId) {
    const task = activeSubject.tasks.find((item) => item.id === taskId)

    setCheckedMap((current) => {
      const doneList = current[activeSubjectId] ?? []
      const exists = doneList.includes(taskId)

      if (!exists && task) {
        setTaskSpark({
          id: Date.now(),
          text: `${task.reward} 已点亮`,
        })
      }

      return {
        ...current,
        [activeSubjectId]: exists
          ? doneList.filter((item) => item !== taskId)
          : [...doneList, taskId],
      }
    })
  }

  function handleQuickAsk(text) {
    setDraft(text)
  }

  function handleSendMessage() {
    const value = draft.trim()
    if (!value) return

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: value,
    }

    const assistantMessage = {
      id: `assistant-${Date.now() + 1}`,
      role: 'assistant',
      text: buildBuddyReply(value, activeSubject, activeSubject.tasks[0]),
    }

    setMessages((current) => [...current, userMessage, assistantMessage])
    setDraft('')
    setPage('buddy')
  }

  function handleFinishCheckin() {
    if (!isSubjectDone) return

    const rewardId = `${activeSubjectId}-reward`
    const rewardLabel = activeSubject.rewards[0]

    setEarnedBadges((current) => {
      if (current.some((item) => item.id === rewardId)) return current
      return [...current, { id: rewardId, label: rewardLabel, emoji: activeSubject.sticker }]
    })

    setMessages((current) => [
      ...current,
      {
        id: `assistant-finish-${Date.now()}`,
        role: 'assistant',
        text: `太棒了，你已经完成「${activeSubject.name}」的全部打卡，奖励已经放进奖励屋啦。`,
      },
    ])

    setRewardPopup({
      emoji: activeSubject.sticker,
      title: rewardLabel,
      subjectName: activeSubject.name,
      stars: activeSubject.tasks.length * 2,
    })
  }

  return (
    <div
      className="tablet-stage"
      style={{
        '--subject-accent': activeSubject.accent,
        '--subject-deep': activeSubject.deep,
        '--subject-soft': activeSubject.soft,
        '--subject-glow': activeSubject.glow,
      }}
    >
      <AnimatePresence>
        {taskSpark && (
          <motion.div
            key={taskSpark.id}
            className="task-spark"
            initial={{ opacity: 0, y: 18, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.94 }}
            transition={{ duration: 0.22 }}
          >
            <Sparkles size={16} />
            {taskSpark.text}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="float-sticker sticker-one">⭐</div>
      <div className="float-sticker sticker-two">🫧</div>
      <div className="float-sticker sticker-three">☁️</div>

      <div className="tablet-shell">
        <header className="app-header">
          <div className="app-header__left">
            <div className="app-badge">
              <Sun size={16} />
              {todayLabel}
            </div>
            <div>
              <h1>今天也来和小伙伴一起打卡吧</h1>
              <p>点一点大卡片就能开始，做完会拿到星星和徽章。</p>
            </div>
          </div>

          <div className="app-header__right">
            <div className="header-chip">
              <Footprints size={16} />
              连续打卡 6 天
            </div>
            <div className="header-chip header-chip--stars">
              <Star size={16} />
              {totalStars} 颗星
            </div>
            <div className="header-avatar">🧒</div>
          </div>
        </header>

        <div className="page-frame">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${page}-${activeSubjectId}`}
              className="page-scroll"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.24 }}
            >
              {page === 'home' && (
                <section className="page page-home">
                  <div className="home-hero">
                    <div className="story-card">
                      <div className="story-card__bubble">
                        <Sparkles size={16} />
                        今日任务地图已经亮起来啦
                      </div>
                      <div className="story-card__title">
                        {activeSubject.mascot} {activeSubject.headline}
                      </div>
                      <div className="story-card__text">{activeSubject.focus}</div>
                      <div className="story-card__actions">
                        <button
                          type="button"
                          className="primary-cta"
                          onClick={() => openSubject(activeSubjectId)}
                        >
                          <CirclePlay size={18} />
                          开始今天打卡
                        </button>
                        <button
                          type="button"
                          className="soft-cta"
                          onClick={() => setPage('buddy')}
                        >
                          <MessageCircle size={18} />
                          先问 AI
                        </button>
                      </div>
                    </div>

                    <div className="mascot-card">
                      <div className="mascot-card__bubble">今日带队伙伴</div>
                      <div className="mascot-card__emoji">{activeSubject.mascot}</div>
                      <div className="mascot-card__name">{activeSubject.name}</div>
                      <div className="mascot-card__note">{activeSubject.buddy}</div>
                    </div>
                  </div>

                  <div className="subject-grid">
                    {subjectList.map((subject) => (
                      <SubjectCard key={subject.id} subject={subject} onOpen={openSubject} />
                    ))}
                  </div>

                  <div className="home-bottom">
                    <div className="panel playful-panel">
                      <div className="panel__title">
                        <Map size={18} />
                        今天的闯关路线
                      </div>
                      <div className="route-list">
                        {subjectList.map((subject) => (
                          <div key={subject.id} className="route-item">
                            <div className="route-item__emoji">{subject.mascot}</div>
                            <div className="route-item__body">
                              <strong>{subject.name}</strong>
                              <span>{subject.mission}</span>
                            </div>
                            <div className="route-item__progress">{subject.progress}%</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="panel playful-panel playful-panel--reward">
                      <div className="panel__title">
                        <Gift size={18} />
                        马上能拿到
                      </div>
                      <div className="mini-rewards">
                        {activeSubject.rewards.map((reward) => (
                          <RewardBadge key={reward} label={reward} emoji={activeSubject.sticker} />
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {page === 'subject' && (
                <section className="page page-subject">
                  <div className="section-head">
                    <button type="button" className="back-button" onClick={() => setPage('home')}>
                      <ArrowLeft size={18} />
                      返回首页
                    </button>
                    <div className="section-head__title">
                      <span>{activeSubject.short} 打卡页</span>
                      <h2>
                        {activeSubject.mascot} {activeSubject.name}
                      </h2>
                    </div>
                  </div>

                  <div className="subject-layout">
                    <div className="panel mission-panel">
                      <div className="mission-card">
                        <div className="mission-card__tag">
                          <BadgeCheck size={16} />
                          今日任务
                        </div>
                        <div className="mission-card__title">{activeSubject.mission}</div>
                        <div className="mission-card__text">{activeSubject.focus}</div>
                        <div className="mission-meter">
                          <div style={{ width: `${activeSubject.progress}%` }} />
                        </div>
                        <div className="mission-card__footer">
                          <span>当前进度 {activeSubject.progress}%</span>
                          <strong>{completedCount}/{activeSubject.tasks.length} 项已点亮</strong>
                        </div>
                      </div>

                      <div className="mascot-speech">
                        <div className="mascot-speech__emoji">{activeSubject.mascot}</div>
                        <div className="mascot-speech__text">{activeSubject.buddy}</div>
                      </div>
                    </div>

                    <div className="panel task-panel">
                      <div className="panel__title">
                        <Clock3 size={18} />
                        小任务清单
                      </div>
                      <div className="task-list">
                        {activeSubject.tasks.map((task) => {
                          const done = checkedTasks.includes(task.id)
                          return (
                            <button
                              key={task.id}
                              type="button"
                              className={`task-row ${done ? 'is-done' : ''}`}
                              onClick={() => toggleTask(task.id)}
                            >
                              <div className="task-row__check">
                                <CheckCircle2 size={20} />
                              </div>
                              <div className="task-row__body">
                                <strong>{task.title}</strong>
                                <span>{task.description}</span>
                              </div>
                              <div className="task-row__meta">
                                <small>{task.duration}</small>
                                <span>{task.reward}</span>
                              </div>
                            </button>
                          )
                        })}
                      </div>

                      <div className="task-panel__actions">
                        <button type="button" className="soft-cta" onClick={() => setPage('buddy')}>
                          <BrainCircuit size={18} />
                          去问小伙伴
                        </button>
                        <button type="button" className="primary-cta" onClick={() => setPage('checkin')}>
                          <CirclePlay size={18} />
                          去打卡
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {page === 'checkin' && (
                <section className="page page-checkin">
                  <div className="section-head">
                    <button type="button" className="back-button" onClick={() => setPage('subject')}>
                      <ArrowLeft size={18} />
                      返回任务页
                    </button>
                    <div className="section-head__title">
                      <span>打卡确认</span>
                      <h2>{activeSubject.mascot} 亮灯打卡台</h2>
                    </div>
                  </div>

                  <div className="checkin-layout">
                    <div className="panel checkin-board">
                      <div className="checkin-lights">
                        {activeSubject.tasks.map((task) => {
                          const done = checkedTasks.includes(task.id)
                          return (
                            <div key={task.id} className={`light-dot ${done ? 'is-on' : ''}`}>
                              {done ? '⭐' : '○'}
                            </div>
                          )
                        })}
                      </div>

                      <div className="checkin-board__emoji">{activeSubject.mascot}</div>
                      <div className="checkin-board__title">
                        {isSubjectDone ? '全部点亮啦，马上领取奖励。' : '还差一点点，再把灯牌点亮吧。'}
                      </div>
                      <div className="checkin-board__text">
                        {isSubjectDone
                          ? `你已经完成 ${activeSubject.tasks.length} 个小任务，可以去奖励屋收下新的徽章。`
                          : `目前已经完成 ${completedCount} 项，还差 ${activeSubject.tasks.length - completedCount} 项。`}
                      </div>

                      <button
                        type="button"
                        className={`finish-button ${isSubjectDone ? 'is-ready' : ''}`}
                        onClick={handleFinishCheckin}
                      >
                        <Gift size={18} />
                        {isSubjectDone ? '完成打卡并领奖励' : '还不能领奖励'}
                      </button>
                    </div>

                    <div className="panel tip-panel">
                      <div className="panel__title">
                        <Sparkles size={18} />
                        打卡小提醒
                      </div>
                      <div className="tip-list">
                        <div className="tip-item">先做轻松题，心情会更好。</div>
                        <div className="tip-item">遇到难题可以先问 AI 小伙伴。</div>
                        <div className="tip-item">做完一项就回任务页点亮一颗星。</div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {page === 'buddy' && (
                <section className="page page-buddy">
                  <div className="section-head">
                    <button type="button" className="back-button" onClick={() => setPage('home')}>
                      <ArrowLeft size={18} />
                      返回首页
                    </button>
                    <div className="section-head__title">
                      <span>AI 小伙伴</span>
                      <h2>
                        {activeSubject.mascot} {activeSubject.name} 陪你一起练
                      </h2>
                    </div>
                  </div>

                  <div className="buddy-layout">
                    <div className="panel buddy-stage">
                      <div className="buddy-stage__header">
                        <div className="buddy-avatar">{activeSubject.mascot}</div>
                        <div>
                          <strong>{activeSubject.name} 小伙伴</strong>
                          <span>{activeSubject.buddy}</span>
                        </div>
                      </div>

                      <div className="buddy-messages">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`buddy-bubble buddy-bubble--${message.role}`}
                          >
                            {message.text}
                          </div>
                        ))}
                      </div>

                      <div className="buddy-composer">
                        <input
                          value={draft}
                          onChange={(event) => setDraft(event.target.value)}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                              event.preventDefault()
                              handleSendMessage()
                            }
                          }}
                          placeholder="告诉我：哪里不会？想先做什么？"
                        />
                        <button type="button" onClick={handleSendMessage}>
                          <SendHorizontal size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="panel prompt-panel">
                      <div className="panel__title">
                        <MessageCircle size={18} />
                        可以这样问
                      </div>
                      <div className="prompt-list">
                        {activeSubject.prompts.map((prompt) => (
                          <button
                            key={prompt}
                            type="button"
                            className="prompt-chip"
                            onClick={() => handleQuickAsk(prompt)}
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {page === 'rewards' && (
                <section className="page page-rewards">
                  <div className="section-head">
                    <button type="button" className="back-button" onClick={() => setPage('home')}>
                      <ArrowLeft size={18} />
                      返回首页
                    </button>
                    <div className="section-head__title">
                      <span>奖励屋</span>
                      <h2>今天的星星和徽章都在这里</h2>
                    </div>
                  </div>

                  <div className="reward-layout">
                    <div className="panel treasure-panel">
                      <div className="treasure-score">{totalStars}</div>
                      <div className="treasure-label">闪亮星星</div>
                      <div className="treasure-note">每完成一个小任务，就会多点亮 2 颗星。</div>
                    </div>

                    <div className="panel badges-panel">
                      <div className="panel__title">
                        <Trophy size={18} />
                        已获得徽章
                      </div>
                      <div className="badges-grid">
                        {earnedBadges.map((badge) => (
                          <RewardBadge key={badge.id} label={badge.label} emoji={badge.emoji} />
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <nav className="bottom-dock">
          {dockItems.map((item) => {
            const Icon = item.icon
            const isActive = page === item.id

            return (
              <button
                key={item.id}
                type="button"
                className={`dock-button ${isActive ? 'is-active' : ''}`}
                onClick={() => setPage(item.id)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      <AnimatePresence>
        {rewardPopup && (
          <motion.div
            className="reward-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="reward-popup"
              initial={{ opacity: 0, y: 28, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 22, scale: 0.96 }}
              transition={{ duration: 0.22 }}
            >
              <div className="reward-popup__stars">✨ ⭐ ✨</div>
              <div className="reward-popup__emoji">{rewardPopup.emoji}</div>
              <div className="reward-popup__title">恭喜你完成打卡</div>
              <div className="reward-popup__name">{rewardPopup.subjectName}</div>
              <div className="reward-popup__badge">获得新徽章：{rewardPopup.title}</div>
              <div className="reward-popup__bonus">本次额外获得 {rewardPopup.stars} 颗星星</div>

              <div className="reward-popup__actions">
                <button
                  type="button"
                  className="primary-cta"
                  onClick={() => {
                    setRewardPopup(null)
                    setPage('rewards')
                  }}
                >
                  <Gift size={18} />
                  去奖励屋看看
                </button>
                <button
                  type="button"
                  className="soft-cta"
                  onClick={() => {
                    setRewardPopup(null)
                    setPage('home')
                  }}
                >
                  <House size={18} />
                  回到首页
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
