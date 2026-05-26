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

const studentProfile = {
  grade: '二年级',
  edition: '人教版',
  mathStage: '课内已学完，进入复习',
  chineseStage: '同步巩固',
  englishStage: '兴趣拓展',
}

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
    mode: '同步巩固',
    progress: 76,
    stars: 8,
    mission: '生字词回顾 + 课文朗读 + 看图表达',
    headline: '和熊猫老师一起把二年级语文课本里的重点字词再稳一遍。',
    focus: '先回顾本周生字词，再朗读课文，最后用自己的话说一句完整句子。',
    buddy: '熊猫老师会重点提醒你字音、词语搭配和句子表达。',
    sceneTitle: '语文同步巩固路线已经铺好',
    sceneNote: '按照“字词-课文-表达”三步走，更适合二年级人教版语文日常巩固。',
    scenePieces: ['🌳', '🍃', '📚'],
    rewards: ['森林朗读章', '识字小侦探'],
    tasks: [
      {
        id: 'hanzi',
        title: '本课生字回顾',
        description: '回顾课堂学过的 8 个生字词，重点看读音和组词。',
        duration: '8 分钟',
        reward: '+2 星',
      },
      {
        id: 'story',
        title: '课文朗读复习',
        description: '朗读本周课文，圈出容易停顿或读错的句子。',
        duration: '10 分钟',
        reward: '+3 星',
      },
      {
        id: 'speak',
        title: '看图说一句',
        description: '根据图片或课文内容，说一句完整、通顺的话。',
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
    mode: '单元复习',
    progress: 61,
    stars: 7,
    mission: '计算回顾 + 错题回放 + 综合闯关',
    headline: '课内内容已经学完，今天跟狐狸队长做一轮二年级数学复习闯关。',
    focus: '先回顾计算，再看错题，最后做一页综合小练习。',
    buddy: '狐狸队长会提醒你把口算、竖式和解决问题分开复习，不混在一起做。',
    sceneTitle: '数学复习跑道已经点亮',
    sceneNote: '按照“计算-错题-综合”三步走，更适合二年级人教版数学课内复习。',
    scenePieces: ['🚀', '⭐', '🔢'],
    rewards: ['复习冲刺章', '错题克星章'],
    tasks: [
      {
        id: 'mental',
        title: '计算热身回顾',
        description: '完成 20 题口算回顾，重点复习 100 以内加减和常见易错题。',
        duration: '8 分钟',
        reward: '+3 星',
      },
      {
        id: 'shape',
        title: '错题回放站',
        description: '把最近课堂错题再做一遍，重点看竖式、审题和单位。',
        duration: '9 分钟',
        reward: '+2 星',
      },
      {
        id: 'thinking',
        title: '综合小闯关',
        description: '做一页复习题，涵盖计算、应用题和常见知识点回顾。',
        duration: '12 分钟',
        reward: '+3 星',
      },
    ],
    prompts: ['数学今天先复习哪一块？', '错题总是重复怎么办？', '应用题怎么审题更稳？'],
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
    mode: '兴趣拓展',
    progress: 84,
    stars: 9,
    mission: '高频词跟读 + 拼读练习 + 日常句型',
    headline: '跟着小企鹅在海湾做一组轻量英语口语练习，当作二年级阶段的兴趣拓展。',
    focus: '先跟读高频词，再练拼读，最后开口说一句简单日常句型。',
    buddy: '小企鹅会陪你慢慢开口，不要求快，先把发音说清楚。',
    sceneTitle: '英语拓展练声台已经准备好',
    sceneNote: '用短时、高频、轻负担的方式练英语，更适合二年级当前节奏。',
    scenePieces: ['🌊', '🐚', '🎵'],
    rewards: ['海湾发音章', '勇敢开口章'],
    tasks: [
      {
        id: 'follow',
        title: '高频词跟读',
        description: '跟读 8 到 10 个高频词，让嘴巴先热起来。',
        duration: '7 分钟',
        reward: '+2 星',
      },
      {
        id: 'phonics',
        title: '拼读小练习',
        description: '练一组简单拼读，把声音连起来、读清楚。',
        duration: '9 分钟',
        reward: '+3 星',
      },
      {
        id: 'talk',
        title: '日常句型开口',
        description: '练一句打招呼或介绍自己的短句，先敢说出来。',
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

const rewardBurstBits = [
  { emoji: '⭐', top: '10%', left: '12%', delay: 0 },
  { emoji: '✨', top: '18%', right: '14%', delay: 0.08 },
  { emoji: '🌟', top: '34%', left: '6%', delay: 0.16 },
  { emoji: '💫', top: '32%', right: '8%', delay: 0.24 },
  { emoji: '⭐', bottom: '22%', left: '10%', delay: 0.32 },
  { emoji: '✨', bottom: '16%', right: '12%', delay: 0.4 },
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
        <div className="subject-card__mode">{subject.mode}</div>
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

function RewardTarget({ target }) {
  return (
    <div className="reward-target">
      <div className="reward-target__emoji">{target.emoji}</div>
      <div className="reward-target__body">
        <strong>{target.label}</strong>
        <span>{target.note}</span>
      </div>
      <div className={`reward-target__tag ${target.unlocked ? 'is-unlocked' : ''}`}>
        {target.unlocked ? '下一枚' : '待解锁'}
      </div>
    </div>
  )
}

function SceneStage({ subject, title, note, ribbon }) {
  return (
    <div className={`scene-stage theme-${subject.id}`}>
      <div className="scene-stage__content">
        <div className="scene-stage__ribbon">
          <Sparkles size={16} />
          {ribbon}
        </div>
        <div className="scene-stage__title">{title}</div>
        <div className="scene-stage__note">{note}</div>

        <div className="scene-stage__steps">
          {subject.tasks.map((task, index) => (
            <div key={task.id} className="scene-stage__step">
              <span>{index + 1}</span>
              <small>{task.title}</small>
            </div>
          ))}
        </div>
      </div>

      <div className="scene-stage__art">
        <div className="scene-stage__halo" />
        <div className="scene-stage__mascot">{subject.mascot}</div>
        <div className="scene-stage__pieces">
          {subject.scenePieces.map((piece, index) => (
            <motion.span
              key={`${piece}-${index}`}
              className={`scene-stage__piece piece-${index + 1}`}
              animate={{ y: [0, -8, 0], rotate: [0, index % 2 === 0 ? 4 : -4, 0] }}
              transition={{
                duration: 3.2 + index * 0.4,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeInOut',
                delay: index * 0.2,
              }}
            >
              {piece}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function StudyCheckinTabletPro() {
  const [page, setPage] = useState('home')
  const [activeSubjectId, setActiveSubjectId] = useState('math')
  const [messages, setMessages] = useState(starterMessages)
  const [draft, setDraft] = useState('')
  const [sceneIntro, setSceneIntro] = useState(null)
  const [taskSpark, setTaskSpark] = useState(null)
  const [rewardPopup, setRewardPopup] = useState(null)
  const [checkedMap, setCheckedMap] = useState({
    chinese: ['hanzi'],
    math: [],
    english: ['follow'],
  })
  const [earnedBadges, setEarnedBadges] = useState([
    { id: 'starter', label: '连续打卡 6 天', emoji: '🌟', category: 'milestone' },
    { id: 'voice', label: '勇敢开口', emoji: '🎤', category: 'milestone' },
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

  const earnedRewardIds = useMemo(
    () => new Set(earnedBadges.map((badge) => badge.id)),
    [earnedBadges],
  )

  const featuredBadges = useMemo(
    () => earnedBadges.filter((badge) => badge.category === 'subject').slice(-3).reverse(),
    [earnedBadges],
  )

  const collectionBadges = useMemo(
    () => earnedBadges.filter((badge) => badge.category !== 'subject'),
    [earnedBadges],
  )

  const nextRewardTargets = useMemo(
    () =>
      subjectList.map((subject) => {
        const unlockedPrimary = earnedRewardIds.has(`${subject.id}-reward`)
        return {
          id: subject.id,
          emoji: subject.sticker,
          label: unlockedPrimary ? subject.rewards[1] : subject.rewards[0],
          unlocked: unlockedPrimary,
          note: unlockedPrimary
            ? `继续打卡 ${subject.name}，下一枚会更厉害。`
            : `完成 ${subject.name} 全部任务就能点亮。`,
        }
      }),
    [earnedRewardIds],
  )

  const todayLabel = new Intl.DateTimeFormat('zh-CN', {
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
  }).format(new Date())

  function startSceneTransition(subjectId, nextPage, title) {
    const subject = subjectList.find((item) => item.id === subjectId)
    if (!subject) return

    setSceneIntro({
      subject,
      title,
    })

    window.setTimeout(() => {
      setActiveSubjectId(subjectId)
      setPage(nextPage)
      setSceneIntro(null)
    }, 620)
  }

  function openSubject(subjectId) {
    startSceneTransition(subjectId, 'subject', '出发去学科场景')
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
      return [
        ...current,
        {
          id: rewardId,
          label: rewardLabel,
          emoji: activeSubject.sticker,
          category: 'subject',
        },
      ]
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
        {sceneIntro && (
          <motion.div
            className={`scene-intro theme-${sceneIntro.subject.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="scene-intro__card"
              initial={{ opacity: 0, scale: 0.92, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.24 }}
            >
              <div className="scene-intro__eyebrow">{sceneIntro.title}</div>
              <div className="scene-intro__title">{sceneIntro.subject.name}</div>
              <div className="scene-intro__mascot">{sceneIntro.subject.mascot}</div>
              <div className="scene-intro__pieces">
                {sceneIntro.subject.scenePieces.map((piece, index) => (
                  <motion.span
                    key={`${sceneIntro.subject.id}-${piece}-${index}`}
                    className="scene-intro__piece"
                    initial={{ opacity: 0, y: 10, scale: 0.7 }}
                    animate={{ opacity: 1, y: [10, -8, 0], scale: 1 }}
                    transition={{ duration: 0.48, delay: index * 0.08 }}
                  >
                    {piece}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              <h1>{studentProfile.grade} · {studentProfile.edition} 打卡计划已经准备好</h1>
              <p>当前内容会按真实学习情况适配，数学默认进入课内复习，语文做同步巩固，英语做轻量拓展。</p>
            </div>
          </div>

          <div className="app-header__right">
            <div className="header-chip">
              <CalendarDays size={16} />
              {studentProfile.grade} · {studentProfile.edition}
            </div>
            <div className="header-chip">
              <Footprints size={16} />
              {studentProfile.mathStage}
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
                        当前已按学习进度适配
                      </div>
                      <div className="story-card__title">
                        {activeSubject.mascot} {activeSubject.headline}
                      </div>
                      <div className="story-card__text">{activeSubject.focus}</div>
                      <div className="study-profile">
                        <div className="study-profile__item">
                          <strong>语文</strong>
                          <span>{studentProfile.chineseStage}</span>
                        </div>
                        <div className="study-profile__item">
                          <strong>数学</strong>
                          <span>{studentProfile.mathStage}</span>
                        </div>
                        <div className="study-profile__item">
                          <strong>英语</strong>
                          <span>{studentProfile.englishStage}</span>
                        </div>
                      </div>
                      <div className="story-card__actions">
                        <button
                          type="button"
                          className="primary-cta"
                          onClick={() =>
                            startSceneTransition(activeSubjectId, 'subject', '出发去今日场景')
                          }
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
                <section className={`page page-subject theme-${activeSubject.id}`}>
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

                  <SceneStage
                    subject={activeSubject}
                    ribbon={`${activeSubject.short} 场景地图`}
                    title={activeSubject.sceneTitle}
                    note={activeSubject.sceneNote}
                  />

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
                        <button
                          type="button"
                          className="primary-cta"
                          onClick={() =>
                            startSceneTransition(activeSubjectId, 'checkin', '前往亮灯打卡台')
                          }
                        >
                          <CirclePlay size={18} />
                          去打卡
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {page === 'checkin' && (
                <section className={`page page-checkin theme-${activeSubject.id}`}>
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

                  <SceneStage
                    subject={activeSubject}
                    ribbon="终点灯牌"
                    title={`再往前一步，就能点亮 ${activeSubject.name} 的终点徽章`}
                    note={`现在已经完成 ${completedCount} 项，继续把路灯一盏盏点亮。`}
                  />

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
                <section className={`page page-buddy theme-${activeSubject.id}`}>
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

                  <SceneStage
                    subject={activeSubject}
                    ribbon="陪练舞台"
                    title={`${activeSubject.mascot} ${activeSubject.name} 的陪练舞台已经开灯`}
                    note={activeSubject.buddy}
                  />

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

                  <div className="reward-layout reward-layout--wall">
                    <div className="panel treasure-panel">
                      <div className="treasure-score">{totalStars}</div>
                      <div className="treasure-label">闪亮星星</div>
                      <div className="treasure-note">每完成一个小任务，就会多点亮 2 颗星。</div>
                    </div>

                    <div className="panel badges-panel badges-panel--wall">
                      <div className="reward-shelf">
                        <div className="panel__title">
                          <Gift size={18} />
                          今日点亮
                        </div>
                        <div className="badges-grid badges-grid--featured">
                          {featuredBadges.length > 0 ? (
                            featuredBadges.map((badge) => (
                              <RewardBadge key={badge.id} label={badge.label} emoji={badge.emoji} />
                            ))
                          ) : (
                            <div className="reward-empty">今天还没有新徽章，先去完成一个学科吧。</div>
                          )}
                        </div>
                      </div>

                      <div className="reward-shelf">
                        <div className="panel__title">
                          <Trophy size={18} />
                          成长收藏
                        </div>
                        <div className="badges-grid">
                          {collectionBadges.map((badge) => (
                            <RewardBadge key={badge.id} label={badge.label} emoji={badge.emoji} />
                          ))}
                        </div>
                      </div>

                      <div className="reward-shelf">
                        <div className="panel__title">
                          <Map size={18} />
                          下一站奖励
                        </div>
                        <div className="reward-targets">
                          {nextRewardTargets.map((target) => (
                            <RewardTarget key={target.id} target={target} />
                          ))}
                        </div>
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
              <div className="reward-popup__burst">
                {rewardBurstBits.map((bit) => (
                  <motion.span
                    key={`${bit.emoji}-${bit.top ?? bit.bottom}-${bit.left ?? bit.right}`}
                    className="reward-popup__burst-item"
                    style={bit}
                    initial={{ opacity: 0, scale: 0.6, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: [10, -8, 0] }}
                    transition={{ duration: 0.65, delay: bit.delay }}
                  >
                    {bit.emoji}
                  </motion.span>
                ))}
              </div>
              <div className="reward-popup__emoji">{rewardPopup.emoji}</div>
              <div className="reward-popup__title">恭喜你完成打卡</div>
              <div className="reward-popup__name">{rewardPopup.subjectName}</div>
              <motion.div
                className="reward-popup__badge-card"
                initial={{ rotateY: -90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 0.45, delay: 0.18 }}
              >
                <div className="reward-popup__badge-emoji">{rewardPopup.emoji}</div>
                <div className="reward-popup__badge-text">
                  <span>获得新徽章</span>
                  <strong>{rewardPopup.title}</strong>
                </div>
              </motion.div>
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
