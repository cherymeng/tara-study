import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  BookOpenText,
  CalendarDays,
  Calculator,
  CheckCircle2,
  ChevronRight,
  CirclePlay,
  Clock3,
  Languages,
  Star,
} from 'lucide-react'
import './App.css'

const studentProfile = {
  grade: '二年级',
  edition: '人教版',
}

const subjectList = [
  {
    id: 'chinese',
    short: '语文',
    name: '语文',
    accent: '#ff9d7a',
    soft: '#fff1ea',
    icon: BookOpenText,
    focusTags: ['生字词', '朗读', '表达'],
    tasks: [
      {
        id: 'hanzi',
        title: '本课生字回顾',
        duration: '8分钟',
        brief: '8个生字词',
        blocks: [
          {
            type: 'word-grid',
            title: '生字词',
            items: [
              { main: '暖', sub: '温暖 暖和' },
              { main: '柳', sub: '柳树 柳枝' },
              { main: '荡', sub: '飘荡 晃荡' },
              { main: '员', sub: '队员 成员' },
              { main: '姨', sub: '阿姨 姨妈' },
              { main: '递', sub: '传递 递给' },
              { main: '邮', sub: '邮票 邮局' },
              { main: '原', sub: '原来 草原' },
            ],
          },
        ],
      },
      {
        id: 'story',
        title: '课文朗读复习',
        duration: '10分钟',
        brief: '1篇课文',
        blocks: [
          {
            type: 'reading',
            title: '朗读内容',
            lines: [
              '春风轻轻吹，柳枝慢慢摇。',
              '小朋友在草地上跑来跑去，脸上都带着笑。',
              '读一遍，圈出你觉得容易读错的字词。',
            ],
          },
        ],
      },
      {
        id: 'speak',
        title: '看图说一句',
        duration: '5分钟',
        brief: '3张图',
        blocks: [
          {
            type: 'prompt-cards',
            title: '开口练习',
            items: [
              '看到春天的公园，你能说一句完整的话。',
              '看到小朋友放风筝，你能说出“谁在做什么”。',
              '看到树和花，你能加上颜色词再说一句。',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'math',
    short: '数学',
    name: '数学',
    accent: '#79b8ff',
    soft: '#eef5ff',
    icon: Calculator,
    focusTags: ['100以内计算', '表内乘法', '有余数除法', '解决问题'],
    tasks: [
      {
        id: 'mental',
        title: '计算热身回顾',
        duration: '8分钟',
        brief: '20题口算',
        blocks: [
          {
            type: 'question-grid',
            title: '口算',
            items: [
              '36 + 27 =',
              '54 - 18 =',
              '47 + 26 =',
              '82 - 35 =',
              '7 × 6 =',
              '8 × 4 =',
              '48 ÷ 6 =',
              '35 ÷ 5 =',
            ],
          },
        ],
      },
      {
        id: 'error',
        title: '错题回放站',
        duration: '9分钟',
        brief: '3道错题',
        blocks: [
          {
            type: 'correction-list',
            title: '再做一遍',
            items: [
              { main: '47 + 38', sub: '先算个位 7 + 8，再看十位。' },
              { main: '63 - 28', sub: '不够减时，先从十位借 1。' },
              { main: '一盒彩笔 8 元，买 3 盒多少元？', sub: '先找一份量，再想求几份。' },
            ],
          },
        ],
      },
      {
        id: 'review',
        title: '综合小闯关',
        duration: '12分钟',
        brief: '4道综合题',
        blocks: [
          {
            type: 'problem-list',
            title: '综合题',
            items: [
              '2 个 6 相加是多少？',
              '56 里面有几个 7？',
              '小明有 28 张卡片，送给同学 9 张，还剩多少张？',
              '3 排花，每排 5 盆，一共有多少盆？',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'english',
    short: '英语',
    name: '英语',
    accent: '#63d8d3',
    soft: '#ebfffd',
    icon: Languages,
    focusTags: ['高频词', '拼读', '开口'],
    tasks: [
      {
        id: 'follow',
        title: '高频词跟读',
        duration: '7分钟',
        brief: '8个单词',
        blocks: [
          {
            type: 'word-grid',
            title: '跟读',
            items: [
              { main: 'school', sub: '学校' },
              { main: 'teacher', sub: '老师' },
              { main: 'window', sub: '窗户' },
              { main: 'yellow', sub: '黄色' },
              { main: 'happy', sub: '开心的' },
              { main: 'family', sub: '家庭' },
              { main: 'water', sub: '水' },
              { main: 'music', sub: '音乐' },
            ],
          },
        ],
      },
      {
        id: 'phonics',
        title: '拼读小练习',
        duration: '9分钟',
        brief: '6组发音',
        blocks: [
          {
            type: 'word-grid',
            title: '拼读',
            items: [
              { main: 'cake', sub: 'a-e' },
              { main: 'bike', sub: 'i-e' },
              { main: 'home', sub: 'o-e' },
              { main: 'cube', sub: 'u-e' },
              { main: 'lake', sub: 'a-e' },
              { main: 'nose', sub: 'o-e' },
            ],
          },
        ],
      },
      {
        id: 'talk',
        title: '日常句型开口',
        duration: '6分钟',
        brief: '3句开口',
        blocks: [
          {
            type: 'dialogue-list',
            title: '开口',
            items: [
              'Hello, I am Lily.',
              'This is my schoolbag.',
              'I like apples.',
            ],
          },
        ],
      },
    ],
  },
]

const historySeed = {
  '2026-05-20': [
    { subjectId: 'math', taskId: 'mental', title: '计算热身回顾', minutes: 8 },
    { subjectId: 'math', taskId: 'error', title: '错题回放站', minutes: 9 },
  ],
  '2026-05-21': [
    { subjectId: 'chinese', taskId: 'hanzi', title: '本课生字回顾', minutes: 8 },
    { subjectId: 'chinese', taskId: 'story', title: '课文朗读复习', minutes: 10 },
  ],
  '2026-05-22': [
    { subjectId: 'math', taskId: 'review', title: '综合小闯关', minutes: 12 },
  ],
  '2026-05-23': [
    { subjectId: 'english', taskId: 'follow', title: '高频词跟读', minutes: 7 },
    { subjectId: 'english', taskId: 'phonics', title: '拼读小练习', minutes: 9 },
  ],
  '2026-05-24': [
    { subjectId: 'math', taskId: 'mental', title: '计算热身回顾', minutes: 8 },
  ],
  '2026-05-25': [
    { subjectId: 'chinese', taskId: 'speak', title: '看图说一句', minutes: 5 },
    { subjectId: 'math', taskId: 'error', title: '错题回放站', minutes: 9 },
  ],
}

function formatDateKey(date) {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

function buildMonthCells(baseDate) {
  const year = baseDate.getFullYear()
  const month = baseDate.getMonth()
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  const startWeekday = (first.getDay() + 6) % 7
  const totalDays = last.getDate()
  const cells = []

  for (let i = 0; i < startWeekday; i += 1) {
    cells.push(null)
  }

  for (let day = 1; day <= totalDays; day += 1) {
    cells.push(new Date(year, month, day))
  }

  while (cells.length % 7 !== 0) {
    cells.push(null)
  }

  return cells
}

function renderTaskBlock(block) {
  switch (block.type) {
    case 'question-grid':
      return (
        <section key={block.title} className="study-block">
          <div className="study-block__title">{block.title}</div>
          <div className="question-grid">
            {block.items.map((item) => (
              <div key={item} className="question-card">
                <span>{item}</span>
                <div className="answer-line" />
              </div>
            ))}
          </div>
        </section>
      )

    case 'word-grid':
      return (
        <section key={block.title} className="study-block">
          <div className="study-block__title">{block.title}</div>
          <div className="word-grid">
            {block.items.map((item) => (
              <div key={item.main} className="word-card">
                <strong>{item.main}</strong>
                <span>{item.sub}</span>
              </div>
            ))}
          </div>
        </section>
      )

    case 'reading':
      return (
        <section key={block.title} className="study-block">
          <div className="study-block__title">{block.title}</div>
          <div className="reading-card">
            {block.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </section>
      )

    case 'prompt-cards':
      return (
        <section key={block.title} className="study-block">
          <div className="study-block__title">{block.title}</div>
          <div className="prompt-grid">
            {block.items.map((item) => (
              <div key={item} className="prompt-card">
                {item}
              </div>
            ))}
          </div>
        </section>
      )

    case 'correction-list':
      return (
        <section key={block.title} className="study-block">
          <div className="study-block__title">{block.title}</div>
          <div className="correction-list">
            {block.items.map((item) => (
              <div key={item.main} className="correction-row">
                <strong>{item.main}</strong>
                <span>{item.sub}</span>
              </div>
            ))}
          </div>
        </section>
      )

    case 'problem-list':
      return (
        <section key={block.title} className="study-block">
          <div className="study-block__title">{block.title}</div>
          <div className="problem-list">
            {block.items.map((item) => (
              <div key={item} className="problem-card">
                <span>{item}</span>
                <div className="answer-line" />
              </div>
            ))}
          </div>
        </section>
      )

    case 'dialogue-list':
      return (
        <section key={block.title} className="study-block">
          <div className="study-block__title">{block.title}</div>
          <div className="dialogue-list">
            {block.items.map((item) => (
              <div key={item} className="dialogue-card">
                {item}
              </div>
            ))}
          </div>
        </section>
      )

    default:
      return null
  }
}

export default function StudyCheckinTabletPro() {
  const today = useMemo(() => new Date(), [])
  const todayKey = useMemo(() => formatDateKey(today), [today])
  const [currentView, setCurrentView] = useState('home')
  const [activeSubjectId, setActiveSubjectId] = useState('math')
  const [activeTaskId, setActiveTaskId] = useState('mental')
  const [selectedDate, setSelectedDate] = useState(todayKey)
  const [historyRecords, setHistoryRecords] = useState(historySeed)
  const [checkedMap, setCheckedMap] = useState({
    chinese: [],
    math: [],
    english: [],
  })
  const [completionFlash, setCompletionFlash] = useState('')

  const activeSubject =
    subjectList.find((subject) => subject.id === activeSubjectId) ?? subjectList[1]
  const activeTask =
    activeSubject.tasks.find((task) => task.id === activeTaskId) ?? activeSubject.tasks[0]
  const monthCells = useMemo(() => buildMonthCells(today), [today])
  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat('zh-CN', {
        year: 'numeric',
        month: 'long',
      }).format(today),
    [today],
  )
  const titleDate = useMemo(
    () =>
      new Intl.DateTimeFormat('zh-CN', {
        month: 'numeric',
        day: 'numeric',
      }).format(today),
    [today],
  )

  useEffect(() => {
    if (!completionFlash) return undefined
    const timer = window.setTimeout(() => setCompletionFlash(''), 1200)
    return () => window.clearTimeout(timer)
  }, [completionFlash])

  const selectedHistory = historyRecords[selectedDate] ?? []
  const totalStars = useMemo(
    () =>
      Object.values(historyRecords).reduce(
        (sum, items) => sum + items.length * 2,
        0,
      ),
    [historyRecords],
  )

  function openSubject(subjectId) {
    const subject = subjectList.find((item) => item.id === subjectId)
    if (!subject) return
    setActiveSubjectId(subjectId)
    setActiveTaskId(subject.tasks[0].id)
    setCurrentView('subject')
  }

  function openTask(subjectId, taskId) {
    const subject = subjectList.find((item) => item.id === subjectId)
    if (!subject) return
    setActiveSubjectId(subjectId)
    setActiveTaskId(taskId)
    setCurrentView('task')
  }

  function handleBack() {
    if (currentView === 'task') {
      setCurrentView('subject')
      return
    }
    if (currentView === 'subject') {
      setCurrentView('home')
    }
  }

  function completeTask() {
    setCheckedMap((current) => {
      const doneList = current[activeSubjectId] ?? []
      if (doneList.includes(activeTaskId)) return current
      return {
        ...current,
        [activeSubjectId]: [...doneList, activeTaskId],
      }
    })

    setHistoryRecords((current) => {
      const todayItems = current[todayKey] ?? []
      if (todayItems.some((item) => item.subjectId === activeSubjectId && item.taskId === activeTaskId)) {
        return current
      }

      return {
        ...current,
        [todayKey]: [
          ...todayItems,
          {
            subjectId: activeSubjectId,
            taskId: activeTaskId,
            title: activeTask.title,
            minutes: Number(activeTask.duration.replace(/\D/g, '')) || 0,
          },
        ],
      }
    })

    setSelectedDate(todayKey)
    setCompletionFlash('已完成')
  }

  const weekHeaders = ['一', '二', '三', '四', '五', '六', '日']

  return (
    <div
      className="checkin-shell"
      style={{
        '--subject-accent': activeSubject.accent,
        '--subject-soft': activeSubject.soft,
      }}
    >
      {completionFlash ? <div className="flash-pill">{completionFlash}</div> : null}

      {currentView === 'home' && (
        <div className="home-page">
          <header className="topbar">
            <div className="topbar__profile">
              <div className="mini-tag">
                <CalendarDays size={14} />
                {studentProfile.grade} {studentProfile.edition}
              </div>
              <div className="topbar__title">{titleDate}</div>
            </div>
            <div className="topbar__stats">
              <div className="mini-tag">
                <Star size={14} />
                {totalStars}
              </div>
            </div>
          </header>

          <div className="dashboard">
            <section className="subject-board">
              <div className="subject-grid">
                {subjectList.map((subject) => {
                  const doneCount = checkedMap[subject.id]?.length ?? 0
                  const Icon = subject.icon

                  return (
                    <button
                      key={subject.id}
                      type="button"
                      className="subject-card"
                      style={{
                        '--card-soft': subject.soft,
                        '--card-accent': subject.accent,
                      }}
                      onClick={() => openSubject(subject.id)}
                    >
                      <div className="subject-card__head">
                        <div className="subject-card__icon">
                          <Icon size={18} />
                        </div>
                        <span className="subject-card__brief">{subject.tasks.length} 项</span>
                      </div>
                      <div className="subject-card__title">{subject.name}</div>
                      <div className="subject-card__tags">
                        {subject.focusTags.slice(0, 3).map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                      <div className="subject-card__foot">
                        <div>{doneCount}/{subject.tasks.length}</div>
                        <ChevronRight size={16} />
                      </div>
                    </button>
                  )
                })}
              </div>
            </section>

            <section className="history-board">
              <div className="calendar-card">
                <div className="calendar-card__month">{monthLabel}</div>
                <div className="calendar-head">
                  {weekHeaders.map((label) => (
                    <span key={label}>{label}</span>
                  ))}
                </div>
                <div className="calendar-grid">
                  {monthCells.map((cell, index) => {
                    if (!cell) {
                      return <div key={`empty-${index}`} className="calendar-cell is-empty" />
                    }

                    const key = formatDateKey(cell)
                    const dayHistory = historyRecords[key] ?? []
                    const isSelected = selectedDate === key
                    const isToday = todayKey === key

                    return (
                      <button
                        key={key}
                        type="button"
                        className={`calendar-cell ${isSelected ? 'is-selected' : ''} ${isToday ? 'is-today' : ''}`}
                        onClick={() => setSelectedDate(key)}
                      >
                        <span>{cell.getDate()}</span>
                        <small>{dayHistory.length > 0 ? dayHistory.length : ''}</small>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="history-card">
                <div className="history-card__date">{selectedDate}</div>
                <div className="history-list">
                  {selectedHistory.length > 0 ? (
                    selectedHistory.map((item) => {
                      const subject = subjectList.find((entry) => entry.id === item.subjectId)
                      return (
                        <div key={`${item.subjectId}-${item.taskId}-${selectedDate}`} className="history-row">
                          <strong>{subject?.short}</strong>
                          <span>{item.title}</span>
                          <small>{item.minutes}分</small>
                        </div>
                      )
                    })
                  ) : (
                    <div className="history-empty">--</div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      )}

      {currentView === 'subject' && (
        <div className="subject-page">
          <header className="page-bar">
            <button type="button" className="icon-back" aria-label="返回" onClick={handleBack}>
              <ArrowLeft size={20} />
            </button>
            <div className="page-bar__title">{activeSubject.name}</div>
          </header>

          <div className="topic-strip">
            {activeSubject.focusTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <div className="task-stack">
            {activeSubject.tasks.map((task) => {
              const done = checkedMap[activeSubject.id]?.includes(task.id)
              return (
                <button
                  key={task.id}
                  type="button"
                  className={`task-tile ${done ? 'is-done' : ''}`}
                  onClick={() => openTask(activeSubject.id, task.id)}
                >
                  <div className="task-tile__main">
                    <strong>{task.title}</strong>
                    <span>{task.brief}</span>
                  </div>
                  <div className="task-tile__side">
                    <small>{task.duration}</small>
                    {done ? <CheckCircle2 size={18} /> : <CirclePlay size={18} />}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {currentView === 'task' && (
        <div className="study-page">
          <header className="study-bar">
            <button type="button" className="icon-back" aria-label="返回" onClick={handleBack}>
              <ArrowLeft size={20} />
            </button>
            <div className="study-bar__title">{activeTask.title}</div>
            <div className="study-bar__time">
              <Clock3 size={14} />
              {activeTask.duration}
            </div>
          </header>

          <div className="study-sheet">
            {activeTask.blocks.map((block) => renderTaskBlock(block))}
          </div>

          <div className="study-actions">
            <button
              type="button"
              className={`complete-button ${checkedMap[activeSubject.id]?.includes(activeTask.id) ? 'is-done' : ''}`}
              onClick={completeTask}
            >
              {checkedMap[activeSubject.id]?.includes(activeTask.id) ? '已完成' : '完成打卡'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
