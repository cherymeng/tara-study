import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function StudyCheckinTabletPro() {
  const [currentPage, setCurrentPage] = useState('home')
  // home | chinese | math | english
  // 模拟页面路由切换
  const [currentTab, setCurrentTab] = useState('语文')

  const chineseTasks = [
    {
      title: '识字训练',
      icon: '🀄',
      progress: 40,
      status: '未完成'
    },
    {
      title: '阅读理解',
      icon: '📚',
      progress: 70,
      status: '进行中'
    }
  ]

  const mathTasks = [
    {
      title: '20题口算',
      icon: '➕',
      progress: 55,
      status: '进行中'
    },
    {
      title: '数学思维',
      icon: '🧠',
      progress: 20,
      status: '未完成'
    }
  ]

  const englishTasks = [
    {
      title: '单词跟读',
      icon: '🔤',
      progress: 30,
      status: '未完成'
    },
    {
      title: '自然拼读',
      icon: '🎧',
      progress: 80,
      status: '进行中'
    }
  ]

  const tabs = [
    {
      name: '语文',
      icon: '📖',
      unfinished: 2,
      color: 'bg-orange-500',
      task: '识字 + 阅读'
    },
    {
      name: '数学',
      icon: '➗',
      unfinished: 1,
      color: 'bg-blue-500',
      task: '20题口算'
    },
    {
      name: '英语',
      icon: '🔤',
      unfinished: 3,
      color: 'bg-green-500',
      task: '单词跟读'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-yellow-50 overflow-hidden">
      {/* 平板导航 */}
      <div className="h-[88px] bg-white/90 backdrop-blur border-b border-sky-100 px-8 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-3xl bg-sky-500 flex items-center justify-center text-3xl shadow-lg">
            🌈
          </div>

          <div>
            <div className="text-2xl font-black text-sky-700">
              今日学习岛
            </div>
            <div className="text-gray-500">
              二年级成长系统
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-yellow-100 px-5 py-3 rounded-2xl text-lg font-bold text-yellow-700">
            ⭐ 128
          </div>

          <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center text-2xl">
            🐼
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-88px)]">
        {/* 左侧菜单 */}
        <div className="w-[110px] bg-white/70 backdrop-blur border-r border-sky-100 flex flex-col items-center py-6 gap-5">
          {[
            { icon: '🏠', name: '主页', page: 'home' },
            { icon: '📖', name: '语文', page: 'chinese' },
            { icon: '➗', name: '数学', page: 'math' },
            { icon: '🔤', name: '英语', page: 'english' },
            { icon: '🏆', name: '成就', page: 'achievement' },
            { icon: '📝', name: '作业', page: 'homework' },
            { icon: '⚙️', name: '设置' }
          ].map((item) => (
            <button
              onClick={() => item.page && setCurrentPage(item.page)}
              key={item.name}
              className={`w-[78px] h-[78px] rounded-3xl flex flex-col items-center justify-center transition-all ${
                currentPage === item.page
                  ? 'bg-sky-500 text-white shadow-xl scale-105'
                  : 'bg-white text-gray-600 hover:scale-105 shadow-md'
              }`}
            >
              <div className="text-3xl mb-1">{item.icon}</div>
              <div className="text-sm font-bold">{item.name}</div>
            </button>
          ))}
        </div>

        {/* 主屏幕 */}
        {currentPage === 'home' && (
          <div className="flex-1 overflow-auto p-8">
            {/* 顶部统计 */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-[32px] p-6 shadow-xl border border-sky-100">
                <div className="text-gray-500 mb-3 text-lg">今日学习时长</div>
                <div className="text-5xl font-black text-sky-700 mb-2">48</div>
                <div className="text-gray-500">分钟</div>
              </div>

              <div className="bg-white rounded-[32px] p-6 shadow-xl border border-yellow-100">
                <div className="text-gray-500 mb-3 text-lg">今日完成率</div>
                <div className="text-5xl font-black text-yellow-500 mb-2">74%</div>
                <div className="text-gray-500">还差 3 个任务</div>
              </div>

              <div className="bg-white rounded-[32px] p-6 shadow-xl border border-green-100">
                <div className="text-gray-500 mb-3 text-lg">连续打卡</div>
                <div className="text-5xl font-black text-green-500 mb-2">12</div>
                <div className="text-gray-500">学习日</div>
              </div>

              <div className="bg-white rounded-[32px] p-6 shadow-xl border border-purple-100">
                <div className="text-gray-500 mb-3 text-lg">AI 鼓励值</div>
                <div className="text-5xl font-black text-purple-500 mb-2">+18</div>
                <div className="text-gray-500">今日成长</div>
              </div>
            </div>

            {/* 今日任务岛 */}
            <div className="bg-white rounded-[36px] shadow-2xl border border-white overflow-hidden mb-8">
              <div className="px-8 pt-8 pb-5 flex items-center justify-between">
                <div>
                  <div className="text-4xl font-black text-sky-700 mb-2">
                    🌈 今日学习岛
                  </div>
                  <div className="text-gray-500 text-lg">
                    点击学科进入对应学习任务
                  </div>
                </div>

                <button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-4 rounded-2xl text-lg font-black shadow-lg transition-all">
                  AI 推荐学习路线
                </button>
              </div>

              {/* Tab */}
              <div className="px-8 flex gap-4 border-b border-gray-100 pb-5 overflow-x-auto">
                {tabs.map((item) => (
                  <button
                    onClick={() => setCurrentTab(item.name)}
                    key={item.name}
                    className={`relative px-7 py-5 rounded-3xl min-w-[220px] transition-all shadow-md ${
                      currentTab === item.name
                        ? 'bg-sky-500 text-white scale-105'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {/* 未完成角标 */}
                    {item.unfinished > 0 && (
                      <div className="absolute -top-2 -right-2 w-9 h-9 rounded-full bg-red-500 text-white text-sm font-black flex items-center justify-center shadow-lg">
                        {item.unfinished}
                      </div>
                    )}

                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{item.icon}</div>

                      <div className="text-left">
                        <div className="text-2xl font-black mb-1">
                          {item.name}
                        </div>
                        <div className="text-sm opacity-80">
                          {item.task}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* 当前tab内容 */}
              <div className="p-8">
                <div className="grid grid-cols-3 gap-6">
                  <button
                    onClick={() => setCurrentPage('chinese')}
                    className="bg-orange-50 rounded-[32px] p-6 text-left hover:scale-[1.02] transition-all shadow-lg border border-orange-100">
                    <div className="flex justify-between items-start mb-6">
                      <div className="text-6xl">🀄</div>

                      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        未完成
                      </div>
                    </div>

                    <div className="text-3xl font-black text-gray-800 mb-3">
                      识字训练
                    </div>

                    <div className="text-gray-600 text-lg mb-5">
                      学习 8 个新汉字
                    </div>

                    <div className="w-full h-4 bg-white rounded-full overflow-hidden mb-5">
                      <div className="h-full w-[40%] bg-orange-400 rounded-full" />
                    </div>

                    <div className="text-orange-600 font-bold mb-5">
                      已完成 3 / 8
                    </div>

                    <div className="bg-orange-500 text-white text-center py-4 rounded-2xl text-xl font-black shadow-lg">
                      开始学习
                    </div>
                  </button>

                  <button
                    onClick={() => setCurrentPage('chinese')}
                    className="bg-orange-50 rounded-[32px] p-6 text-left hover:scale-[1.02] transition-all shadow-lg border border-orange-100">
                    <div className="flex justify-between items-start mb-6">
                      <div className="text-6xl">📚</div>

                      <div className="bg-yellow-400 text-white px-3 py-1 rounded-full text-sm font-bold">
                        进行中
                      </div>
                    </div>

                    <div className="text-3xl font-black text-gray-800 mb-3">
                      阅读理解
                    </div>

                    <div className="text-gray-600 text-lg mb-5">
                      小短文阅读练习
                    </div>

                    <div className="w-full h-4 bg-white rounded-full overflow-hidden mb-5">
                      <div className="h-full w-[70%] bg-orange-400 rounded-full" />
                    </div>

                    <div className="text-orange-600 font-bold mb-5">
                      已完成 7 / 10
                    </div>

                    <div className="bg-white text-orange-500 border-2 border-orange-400 text-center py-4 rounded-2xl text-xl font-black shadow-sm">
                      继续学习
                    </div>
                  </button>

                  <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-[32px] p-7 text-white shadow-2xl flex flex-col justify-between">
                    <div>
                      <div className="text-5xl mb-4">🐼</div>

                      <div className="text-3xl font-black mb-3">
                        AI 学习伙伴
                      </div>

                      <div className="text-sky-100 text-lg leading-relaxed">
                        今天识字进步很快，继续加油，还可以获得新的星星奖励。
                      </div>
                    </div>

                    <button className="mt-8 bg-white text-sky-600 rounded-2xl py-4 text-xl font-black shadow-lg">
                      和小团子互动
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 底部数据 */}
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white rounded-[32px] p-8 shadow-xl border border-sky-100">
                <div className="text-3xl font-black text-gray-800 mb-6">
                  📈 学习数据
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2 text-lg">
                      <span className="text-gray-600">专注度</span>
                      <span className="font-black text-sky-600">84%</span>
                    </div>
                    <div className="h-5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full w-[84%] bg-sky-400 rounded-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2 text-lg">
                      <span className="text-gray-600">正确率</span>
                      <span className="font-black text-green-600">92%</span>
                    </div>
                    <div className="h-5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full w-[92%] bg-green-400 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-sky-600 to-sky-700 rounded-[32px] p-8 text-white shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-3xl font-black">
                    👨‍👩‍👧 家长报告
                  </div>

                  <div className="bg-white/20 px-4 py-2 rounded-full font-bold">
                    本周进步中
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm">
                    <div className="text-sky-100 mb-2">阅读能力</div>
                    <div className="text-5xl font-black mb-2">+12%</div>
                    <div className="text-sky-100">比上周提升明显</div>
                  </div>

                  <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm">
                    <div className="text-sky-100 mb-2">数学速度</div>
                    <div className="text-5xl font-black mb-2">3.1秒</div>
                    <div className="text-sky-100">计算能力持续增强</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 语文子页面 */}
        {currentPage === 'chinese' && (
          <div className="flex-1 overflow-auto p-8">
            <div className="bg-white rounded-[36px] shadow-2xl border border-orange-100 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-yellow-400 p-8 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-5xl font-black mb-3">
                      📖 语文学习中心
                    </div>
                    <div className="text-orange-100 text-xl">
                      识字 · 阅读 · 表达训练
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentPage('home')}
                    className="bg-white text-orange-500 px-6 py-4 rounded-2xl text-lg font-black shadow-lg hover:scale-105 transition-all">
                    返回主页
                  </button>
                </div>
              </div>

              <div className="p-8 grid grid-cols-2 gap-8">
                <div className="bg-orange-50 rounded-[32px] p-8 border border-orange-100 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-6xl">🀄</div>
                    <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold">
                      今日任务
                    </div>
                  </div>

                  <div className="text-4xl font-black text-gray-800 mb-4">
                    AI 识字训练
                  </div>

                  <div className="text-xl text-gray-600 mb-6 leading-relaxed">
                    学习今天的新汉字，并完成拼音与组词训练。
                  </div>

                  <div className="bg-white rounded-3xl p-8 text-center shadow-sm mb-6">
                    <div className="text-8xl font-black text-orange-500 mb-4">
                      森
                    </div>

                    <div className="text-3xl text-gray-600 mb-3">
                      sēn
                    </div>

                    <div className="text-lg text-gray-500">
                      森林 · 森系 · 阴森
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button className="bg-orange-500 text-white py-5 rounded-2xl text-2xl font-black shadow-lg hover:scale-105 transition-all">
                      跟读
                    </button>

                    <button className="bg-white border-2 border-orange-300 text-orange-500 py-5 rounded-2xl text-2xl font-black hover:bg-orange-50 transition-all">
                      下一题
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white border border-orange-100 rounded-[32px] p-6 shadow-lg">
                    <div className="text-2xl font-black text-gray-800 mb-5">
                      📈 今日识字进度
                    </div>

                    <div className="space-y-5">
                      <div>
                        <div className="flex justify-between mb-2 text-lg">
                          <span className="text-gray-600">识字完成率</span>
                          <span className="font-black text-orange-500">40%</span>
                        </div>
                        <div className="h-5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full w-[40%] bg-orange-400 rounded-full" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2 text-lg">
                          <span className="text-gray-600">阅读理解</span>
                          <span className="font-black text-green-500">70%</span>
                        </div>
                        <div className="h-5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full w-[70%] bg-green-400 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-400 to-yellow-400 rounded-[32px] p-8 text-white shadow-2xl">
                    <div className="text-5xl mb-5">🐼</div>

                    <div className="text-3xl font-black mb-4">
                      AI 学习鼓励
                    </div>

                    <div className="text-orange-50 text-lg leading-relaxed mb-6">
                      今天已经掌握了 3 个新汉字，再坚持一下就能完成今日挑战。
                    </div>

                    <button className="bg-white text-orange-500 px-6 py-4 rounded-2xl text-xl font-black shadow-lg">
                      继续挑战
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 英语子页面 */}
        {currentPage === 'english' && (
          <div className="flex-1 overflow-auto p-8">
            <div className="bg-white rounded-[36px] shadow-2xl border border-green-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-emerald-400 p-8 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-5xl font-black mb-3">
                      🔤 英语学习中心
                    </div>
                    <div className="text-green-100 text-xl">
                      单词 · 跟读 · 自然拼读
                    </div>
                  </div>

                  <button className="bg-white text-green-500 px-6 py-4 rounded-2xl text-lg font-black shadow-lg">
                    返回主页
                  </button>
                </div>
              </div>

              <div className="p-10 grid grid-cols-[1.2fr_0.8fr] gap-8">
                <div className="bg-green-50 rounded-[36px] p-10 shadow-lg border border-green-100">
                  <div className="text-center mb-10">
                    <div className="text-8xl mb-6">🍎</div>

                    <div className="text-7xl font-black text-green-600 mb-4">
                      apple
                    </div>

                    <div className="text-3xl text-gray-500 mb-6">
                      /ˈæp.əl/
                    </div>

                    <div className="text-2xl text-gray-600">
                      苹果
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <button className="bg-green-500 text-white rounded-3xl py-6 text-2xl font-black shadow-xl hover:scale-105 transition-all">
                      ▶ 跟读发音
                    </button>

                    <button className="bg-white border-2 border-green-300 text-green-600 rounded-3xl py-6 text-2xl font-black hover:bg-green-100 transition-all">
                      下一单词
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white border border-green-100 rounded-[32px] p-6 shadow-lg">
                    <div className="text-2xl font-black text-gray-800 mb-6">
                      📚 今日词汇
                    </div>

                    <div className="space-y-4">
                      {['apple', 'banana', 'orange', 'grape'].map((word) => (
                        <div
                          key={word}
                          className="bg-green-50 rounded-2xl p-4 flex items-center justify-between"
                        >
                          <div className="text-2xl font-black text-green-700">
                            {word}
                          </div>

                          <div className="text-green-500 font-bold">
                            已学习
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-500 to-emerald-400 rounded-[32px] p-8 text-white shadow-2xl">
                    <div className="text-3xl font-black mb-4">
                      🎧 AI 跟读评分
                    </div>

                    <div className="text-7xl font-black mb-4">
                      92
                    </div>

                    <div className="text-green-100 text-lg mb-6">
                      发音非常标准，继续保持。
                    </div>

                    <button className="bg-white text-green-600 px-6 py-4 rounded-2xl text-xl font-black shadow-lg w-full">
                      开始下一组训练
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 成就页面 */}
        {currentPage === 'achievement' && (
          <div className="flex-1 overflow-auto p-8">
            <div className="bg-white rounded-[36px] shadow-2xl border border-yellow-100 overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-8 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-5xl font-black mb-3">🏆 学习成就中心</div>
                    <div className="text-yellow-100 text-xl">每一次坚持都会获得成长奖励</div>
                  </div>

                  <button
                    onClick={() => setCurrentPage('home')}
                    className="bg-white text-orange-500 px-6 py-4 rounded-2xl text-lg font-black shadow-lg"
                  >
                    返回主页
                  </button>
                </div>
              </div>

              <div className="p-8 grid grid-cols-4 gap-6">
                {[
                  { icon: '🔥', title: '连续打卡', value: '12天' },
                  { icon: '⭐', title: '累计星星', value: '128' },
                  { icon: '📚', title: '阅读达人', value: 'Lv.3' },
                  { icon: '🧠', title: '数学达人', value: 'Lv.2' }
                ].map((item) => (
                  <div
                    key={item.title}
                    className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-[32px] p-6 text-white shadow-xl"
                  >
                    <div className="text-6xl mb-5">{item.icon}</div>
                    <div className="text-xl opacity-90 mb-2">{item.title}</div>
                    <div className="text-5xl font-black">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 家长作业页面 */}
        {currentPage === 'homework' && (
          <div className="flex-1 overflow-auto p-8">
            <div className="bg-white rounded-[36px] shadow-2xl border border-sky-100 overflow-hidden">
              <div className="bg-gradient-to-r from-sky-500 to-indigo-500 p-8 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-5xl font-black mb-3">📝 家长作业中心</div>
                    <div className="text-sky-100 text-xl">为孩子发布每日学习任务</div>
                  </div>

                  <button
                    onClick={() => setCurrentPage('home')}
                    className="bg-white text-sky-600 px-6 py-4 rounded-2xl text-lg font-black shadow-lg"
                  >
                    返回主页
                  </button>
                </div>
              </div>

              <div className="p-8 grid grid-cols-3 gap-6">
                {[
                  {
                    icon: '📖',
                    title: '语文题库',
                    desc: '识字 / 阅读 / 古诗'
                  },
                  {
                    icon: '➗',
                    title: '数学题库',
                    desc: '口算 / 思维训练'
                  },
                  {
                    icon: '🔤',
                    title: '英语题库',
                    desc: '单词 / 跟读 / 拼读'
                  }
                ].map((item) => (
                  <button
                    key={item.title}
                    className="bg-sky-50 rounded-[32px] p-8 text-left shadow-lg hover:scale-[1.02] transition-all border border-sky-100"
                  >
                    <div className="text-6xl mb-5">{item.icon}</div>
                    <div className="text-3xl font-black text-gray-800 mb-3">{item.title}</div>
                    <div className="text-gray-500 text-lg">{item.desc}</div>
                  </button>
                ))}
              </div>

              <div className="px-8 pb-8 grid grid-cols-[1fr_420px] gap-8">
                <div className="bg-white border border-sky-100 rounded-[32px] p-8 shadow-lg">
                  <div className="text-3xl font-black text-gray-800 mb-6">✏️ 作业配置</div>

                  <div className="space-y-6">
                    <input
                      placeholder="输入作业标题"
                      className="w-full h-16 rounded-2xl border border-gray-200 px-5 text-lg outline-none"
                    />

                    <textarea
                      placeholder="输入作业说明"
                      className="w-full h-40 rounded-2xl border border-gray-200 p-5 text-lg outline-none resize-none"
                    />

                    <div className="flex gap-4 flex-wrap">
                      {['基础版', '提高版', '挑战版'].map((item) => (
                        <button
                          key={item}
                          className="px-6 py-4 rounded-2xl bg-sky-50 hover:bg-sky-500 hover:text-white transition-all font-black"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-[36px] p-8 text-white shadow-2xl">
                  <div className="text-4xl font-black mb-6">🚀 作业预览</div>

                  <div className="space-y-4 mb-8">
                    {['📖 识字训练', '➗ 20题口算', '🔤 单词跟读'].map((item) => (
                      <div
                        key={item}
                        className="bg-white/10 rounded-2xl p-5 text-xl font-bold"
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <button className="w-full bg-white text-sky-600 py-5 rounded-3xl text-2xl font-black shadow-xl">
                    发布今日作业
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 数学子页面 */}
        {currentPage === 'math' && (
          <div className="flex-1 p-8 overflow-auto">
            <div className="bg-white rounded-[36px] shadow-2xl p-8 border border-blue-100">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="text-5xl font-black text-blue-700 mb-3">
                    ➗ 数学 · 口算挑战
                  </div>

                  <div className="text-gray-500 text-xl">
                    完成今日 20 道口算训练
                  </div>
                </div>

                <button
                  onClick={() => setCurrentPage('home')}
                  className="bg-gray-100 hover:bg-gray-200 px-6 py-4 rounded-2xl text-lg font-bold transition-all">
                  返回主页
                </button>
              </div>

              <div className="bg-blue-50 rounded-[36px] p-12 text-center">
                <div className="text-gray-500 text-xl mb-5">
                  请快速回答
                </div>

                <div className="text-8xl font-black text-blue-700 mb-10">
                  48 + 27 = ?
                </div>

                <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto">
                  {[65, 75, 72, 69].map((num) => (
                    <button
                      key={num}
                      className="bg-white rounded-[28px] py-8 text-5xl font-black shadow-xl hover:scale-105 hover:bg-blue-600 hover:text-white transition-all"
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
