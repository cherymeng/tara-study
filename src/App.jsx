import { useEffect, useMemo, useRef, useState } from 'react'
import HanziWriter from 'hanzi-writer'
import {
  ArrowLeft,
  BookOpenText,
  CalendarDays,
  Calculator,
  Camera,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  Check,
  Disc3,
  Languages,
  Mic,
  RefreshCw,
  Star,
  Volume2,
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
    focusTags: ['生字', '听写', '好词好句', '看图写话', '挑战'],
    tasks: [
      {
        id: 'hanzi',
        title: '生字',
        duration: '10分钟',
        brief: '10个生字',
        blocks: [
          {
            type: 'word-grid',
            title: '生字词',
            items: [
              { main: '搬', sub: '搬家 搬运' },
              { main: '疲', sub: '疲劳 疲倦' },
              { main: '愿', sub: '愿望 心愿' },
              { main: '冒', sub: '冒险 冒雨' },
              { main: '城', sub: '城市 长城' },
              { main: '商', sub: '商店 商量' },
              { main: '店', sub: '书店 店员' },
              { main: '整', sub: '整齐 完整' },
              { main: '拾', sub: '收拾 拾起' },
              { main: '净', sub: '干净 洁净' },
            ],
          },
        ],
      },
      {
        id: 'dictation',
        title: '词语听写',
        duration: '12分钟',
        brief: '8组词语',
        blocks: [
          {
            type: 'correction-list',
            title: '听写内容',
            items: [
              { main: '整齐', sub: '先听词语，再写在田字格本上。' },
              { main: '愿望', sub: '注意“愿”字里面的心字底。' },
              { main: '干净', sub: '“净”右边最后一笔是竖钩。' },
              { main: '收拾', sub: '两个词连起来完整听写。' },
              { main: '商店', sub: '区分“商”和“摘”的偏旁。' },
              { main: '城市', sub: '“城”右边是成。' },
              { main: '冒雨', sub: '先想意思，再动笔。' },
              { main: '搬家', sub: '“搬”字左边是提手旁。' },
            ],
          },
        ],
      },
      {
        id: 'phrases',
        title: '好词好句分享',
        duration: '8分钟',
        brief: '4组表达',
        blocks: [
          {
            type: 'prompt-cards',
            title: '好词好句',
            items: [
              '阳光明媚，可以用来写天气。',
              '井井有条，可以用来夸教室很整齐。',
              '一边……一边……，说一句完整的话。',
              '虽然……但是……，试着说一个自己的句子。',
            ],
          },
        ],
      },
      {
        id: 'picture-writing',
        title: '看图写话',
        duration: '12分钟',
        brief: '2幅图',
        blocks: [
          {
            type: 'prompt-cards',
            title: '写话提示',
            items: [
              '图一：教室值日，先写谁在做什么，再写教室变成了什么样。',
              '图二：雨天送伞，写清楚人物、天气和心情。',
            ],
          },
        ],
      },
      {
        id: 'challenge',
        title: '挑战区',
        duration: '10分钟',
        brief: '3个挑战',
        blocks: [
          {
            type: 'problem-list',
            title: '挑战任务',
            items: [
              '用“整齐”“高兴”各说一句话。',
              '把“值日生把教室打扫得很干净”改成更生动的句子。',
              '写一句带有“因为……所以……”的句子。',
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
    focusTags: ['100以内加减', '1-9乘法', '9×9乘除', '除不尽口算', '挑战'],
    tasks: [
      {
        id: 'mix-add-sub',
        title: '100以内加减法',
        duration: '12分钟',
        brief: '10题',
        blocks: [
          {
            type: 'question-grid',
            title: '口算',
            items: [
              '37 + 25 =',
              '84 - 29 =',
              '46 + 18 =',
              '90 - 37 =',
              '58 + 16 =',
              '73 - 28 =',
              '24 + 39 =',
              '65 - 17 =',
              '48 + 27 =',
              '81 - 36 =',
            ],
          },
        ],
      },
      {
        id: 'table-1-9',
        title: '1-9乘法表口算题',
        duration: '10分钟',
        brief: '10题',
        blocks: [
          {
            type: 'question-grid',
            title: '乘法口算',
            items: [
              '7 × 8 =',
              '9 × 6 =',
              '4 × 7 =',
              '8 × 3 =',
              '6 × 6 =',
              '5 × 9 =',
              '3 × 8 =',
              '2 × 9 =',
            ],
          },
        ],
      },
      {
        id: 'mul-div-99',
        title: '9×9乘除法口算题',
        duration: '10分钟',
        brief: '10题',
        blocks: [
          {
            type: 'question-grid',
            title: '乘除口算',
            items: [
              '56 ÷ 7 =',
              '63 ÷ 9 =',
              '8 × 9 =',
              '54 ÷ 6 =',
              '49 ÷ 7 =',
              '7 × 7 =',
              '72 ÷ 8 =',
              '9 × 4 =',
            ],
          },
        ],
      },
      {
        id: 'remainders',
        title: '100以内除不尽的口算题',
        duration: '12分钟',
        brief: '10题',
        blocks: [
          {
            type: 'problem-list',
            title: '有余数口算',
            items: [
              '23 ÷ 4 = （ ）……（ ）',
              '38 ÷ 5 = （ ）……（ ）',
              '57 ÷ 8 = （ ）……（ ）',
              '74 ÷ 9 = （ ）……（ ）',
              '46 ÷ 7 = （ ）……（ ）',
              '91 ÷ 10 = （ ）……（ ）',
            ],
          },
        ],
      },
      {
        id: 'math-challenge',
        title: '挑战区',
        duration: '10分钟',
        brief: '3题',
        blocks: [
          {
            type: 'problem-list',
            title: '数学挑战',
            items: [
              '19 × 8 =',
              '17 × 6 =',
              '18 × 9 =',
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
    focusTags: ['字母', '单词', '句子', '阅读理解', '挑战'],
    tasks: [
      {
        id: 'letters',
        title: '字母',
        duration: '8分钟',
        brief: '大小写配对',
        blocks: [
          {
            type: 'word-grid',
            title: '字母练习',
            items: [
              { main: 'A a', sub: 'apple' },
              { main: 'B b', sub: 'book' },
              { main: 'C c', sub: 'cat' },
              { main: 'D d', sub: 'dog' },
              { main: 'E e', sub: 'egg' },
              { main: 'F f', sub: 'fish' },
            ],
          },
        ],
      },
      {
        id: 'words',
        title: '单词',
        duration: '9分钟',
        brief: '8个单词',
        blocks: [
          {
            type: 'word-grid',
            title: '单词卡',
            items: [
              { main: 'teacher', sub: '老师' },
              { main: 'pencil', sub: '铅笔' },
              { main: 'window', sub: '窗户' },
              { main: 'banana', sub: '香蕉' },
              { main: 'family', sub: '家庭' },
              { main: 'rabbit', sub: '兔子' },
              { main: 'yellow', sub: '黄色' },
              { main: 'music', sub: '音乐' },
            ],
          },
        ],
      },
      {
        id: 'sentences',
        title: '句子',
        duration: '8分钟',
        brief: '4个句型',
        blocks: [
          {
            type: 'dialogue-list',
            title: '句子练习',
            items: [
              'This is my English book.',
              'I have a blue schoolbag.',
              'She is my good friend.',
              'We can sing and dance.',
            ],
          },
        ],
      },
      {
        id: 'reading',
        title: '阅读理解',
        duration: '12分钟',
        brief: '1篇短文',
        blocks: [
          {
            type: 'reading',
            title: '短文',
            lines: [
              'Tom has a small dog. The dog is white and brown.',
              'Every morning, Tom gives the dog water and food.',
              'After school, Tom plays ball with the dog in the park.',
            ],
          },
          {
            type: 'prompt-cards',
            title: '想一想',
            items: [
              'What color is the dog?',
              'When does Tom give the dog food?',
              'Where do Tom and the dog play ball?',
            ],
          },
        ],
      },
      {
        id: 'english-challenge',
        title: '挑战区',
        duration: '10分钟',
        brief: '3个挑战',
        blocks: [
          {
            type: 'prompt-cards',
            title: '英语挑战',
            items: [
              '用 I have... 说一句关于自己书包的话。',
              '从 teacher、banana、rabbit 里任选 2 个词造句。',
              '读短文后，用英文回答：What does Tom do after school?',
            ],
          },
        ],
      },
    ],
  },
]

const historySeed = {
  '2026-05-20': [
    { subjectId: 'math', taskId: 'mix-add-sub', title: '100以内加减法', minutes: 12 },
    { subjectId: 'math', taskId: 'table-1-9', title: '1-9乘法表口算题', minutes: 10 },
  ],
  '2026-05-21': [
    { subjectId: 'chinese', taskId: 'hanzi', title: '生字', minutes: 10 },
    { subjectId: 'chinese', taskId: 'dictation', title: '词语听写', minutes: 12 },
  ],
  '2026-05-22': [
    { subjectId: 'math', taskId: 'mul-div-99', title: '9×9乘除法口算题', minutes: 10 },
  ],
  '2026-05-23': [
    { subjectId: 'english', taskId: 'letters', title: '字母', minutes: 8 },
    { subjectId: 'english', taskId: 'words', title: '单词', minutes: 9 },
  ],
  '2026-05-24': [
    { subjectId: 'math', taskId: 'remainders', title: '100以内除不尽的口算题', minutes: 12 },
  ],
  '2026-05-25': [
    { subjectId: 'chinese', taskId: 'picture-writing', title: '看图写话', minutes: 12 },
    { subjectId: 'english', taskId: 'reading', title: '阅读理解', minutes: 12 },
  ],
}

const defaultAssignments = Object.fromEntries(
  subjectList.map((subject) => [
    subject.id,
    subject.tasks.map((task) => task.id),
  ]),
)

function createBanks(taskId, banks) {
  return banks.map(([name, count], index) => ({
    id: `${taskId}-bank-${index + 1}`,
    name,
    count,
  }))
}

const taskBankCatalog = {
  hanzi: createBanks('hanzi', [
    ['课内生字库', 36],
    ['辨字听写库', 24],
    ['错题回炉库', 18],
  ]),
  dictation: createBanks('dictation', [
    ['课堂听写库', 32],
    ['词语默写库', 20],
    ['错词回放库', 16],
  ]),
  phrases: createBanks('phrases', [
    ['好词好句库', 28],
    ['关联词训练库', 18],
    ['表达升级库', 14],
  ]),
  'picture-writing': createBanks('picture-writing', [
    ['看图写话基础库', 18],
    ['场景描写库', 12],
    ['句段拔高库', 10],
  ]),
  challenge: createBanks('challenge', [
    ['语文挑战库', 16],
    ['综合应用库', 12],
    ['表达冲刺库', 8],
  ]),
  'mix-add-sub': createBanks('mix-add-sub', [
    ['百内加减库', 40],
    ['进退位口算库', 28],
    ['错题回炉库', 20],
  ]),
  'table-1-9': createBanks('table-1-9', [
    ['乘法表基础库', 45],
    ['乘法快算库', 30],
    ['背诵冲刺库', 18],
  ]),
  'mul-div-99': createBanks('mul-div-99', [
    ['乘除互逆库', 36],
    ['九九综合库', 26],
    ['应用快答库', 18],
  ]),
  remainders: createBanks('remainders', [
    ['有余数除法库', 30],
    ['余数判断库', 20],
    ['错题巩固库', 14],
  ]),
  'math-challenge': createBanks('math-challenge', [
    ['数学挑战库', 20],
    ['应用题冲刺库', 16],
    ['思维提升库', 10],
  ]),
  letters: createBanks('letters', [
    ['字母配对库', 26],
    ['字母书写库', 18],
    ['发音辨识库', 12],
  ]),
  words: createBanks('words', [
    ['高频单词库', 30],
    ['图词配对库', 20],
    ['拼写回顾库', 16],
  ]),
  sentences: createBanks('sentences', [
    ['句型基础库', 24],
    ['口语表达库', 18],
    ['替换练习库', 12],
  ]),
  reading: createBanks('reading', [
    ['短文理解库', 18],
    ['问答训练库', 12],
    ['阅读冲刺库', 8],
  ]),
  'english-challenge': createBanks('english-challenge', [
    ['英语挑战库', 14],
    ['造句提升库', 10],
    ['综合表达库', 8],
  ]),
}

const taskPerformanceCatalog = {
  hanzi: {
    solid: ['搬、城、商', '店、拾'],
    risky: ['疲、愿', '整、净'],
    frequent: ['“愿”心字底漏点', '“整”右上结构易错'],
  },
  dictation: {
    solid: ['整齐、搬家', '商店、城市'],
    risky: ['愿望、干净', '收拾、冒雨'],
    frequent: ['“愿望”易写成别字', '“净”最后一笔常写错'],
  },
  phrases: {
    solid: ['阳光明媚', '井井有条'],
    risky: ['一边……一边……', '虽然……但是……'],
    frequent: ['关联词顺序常反', '句子后半段容易缺失'],
  },
  'picture-writing': {
    solid: ['会写时间地点', '能写人物动作'],
    risky: ['心情描写偏少', '句子衔接偏弱'],
    frequent: ['结尾总结常漏写', '容易只写一两句话'],
  },
  challenge: {
    solid: ['能独立造句', '会用因果句'],
    risky: ['词语使用重复', '句子不够生动'],
    frequent: ['标点常漏', '主语常写不清'],
  },
  'mix-add-sub': {
    solid: ['整十加减', '基础进位加法'],
    risky: ['借位减法', '连续进退位'],
    frequent: ['末位忘记进位', '减法借位后漏减'],
  },
  'table-1-9': {
    solid: ['2-5 乘法', '6×6'],
    risky: ['7×8', '9×6'],
    frequent: ['8×7 与 7×8混淆', '9 的乘法尾数易错'],
  },
  'mul-div-99': {
    solid: ['56÷7', '49÷7'],
    risky: ['54÷6', '72÷8'],
    frequent: ['乘除互逆转换慢', '除法答案位置常写错'],
  },
  remainders: {
    solid: ['23÷4', '38÷5'],
    risky: ['74÷9', '91÷10'],
    frequent: ['余数大于除数', '商和余数位置颠倒'],
  },
  'math-challenge': {
    solid: ['两步列式', '乘除互推'],
    risky: ['自编应用题', '有余数情境'],
    frequent: ['单位名称常漏', '列式后不写答'],
  },
  letters: {
    solid: ['A-F 配对', '大小写辨认'],
    risky: ['b/d 区分', 'g/j 发音'],
    frequent: ['字母书写占格不稳', '大小写混写'],
  },
  words: {
    solid: ['teacher', 'banana'],
    risky: ['window', 'yellow'],
    frequent: ['双写字母漏写', '发音和拼写对不上'],
  },
  sentences: {
    solid: ['This is...', 'I have...'],
    risky: ['She is...', 'We can...'],
    frequent: ['句首大写常漏', 'be 动词搭配易错'],
  },
  reading: {
    solid: ['能找颜色信息', '能找地点信息'],
    risky: ['时间信息定位慢', '英文问句理解慢'],
    frequent: ['直接抄原句不作答', '疑问词判断不准'],
  },
  'english-challenge': {
    solid: ['能仿写简单句', '能口头回答'],
    risky: ['组合两词造句', '完整英文回答'],
    frequent: ['单词顺序颠倒', '句尾标点常漏'],
  },
}

const defaultSelectedBanks = Object.fromEntries(
  Object.entries(taskBankCatalog).map(([taskId, banks]) => [taskId, banks[0]?.id ?? '']),
)

function twemojiAsset(code, alt) {
  return {
    url: `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${code}.svg`,
    alt,
  }
}

function defineHanziWords(items) {
  return items.map(([text, explanation]) => ({
    text,
    explanation,
  }))
}

const hanziLessonPages = [
  {
    id: 'ban',
    character: '搬',
    score: 97,
    imageTitle: '搬家小熊',
    imageText: '小熊搬着箱子去新家。',
    sceneAccent: '#ffb36c',
    sceneSoft: '#fff3dd',
    sceneAssets: [twemojiAsset('1f4e6', '纸箱'), twemojiAsset('1f3e0', '房子'), twemojiAsset('2728', '星光')],
    radical: '扌',
    structure: '左右结构',
    strokes: ['横', '竖钩', '提', '撇', '撇', '横折钩', '点', '横', '撇', '横折弯'],
    pronunciations: [
      {
        id: 'ban-1',
        pinyin: 'bān',
        words: defineHanziWords([
          ['搬家', '从一个住处换到另一个住处，把家里的东西一起搬过去。'],
          ['搬运', '把货物或东西从一个地方运到另一个地方。'],
          ['搬桌子', '把桌子挪动到新的位置。'],
        ]),
        usage: '表示把东西从一个地方移到另一个地方。',
        speakText: '搬家',
      },
    ],
  },
  {
    id: 'pi',
    character: '疲',
    score: 95,
    imageTitle: '跑步后休息',
    imageText: '小朋友运动后有点疲倦。',
    sceneAccent: '#8ed7ff',
    sceneSoft: '#eef8ff',
    sceneAssets: [twemojiAsset('1f62a', '困倦表情'), twemojiAsset('1f6cc', '小床'), twemojiAsset('2728', '星光')],
    radical: '疒',
    structure: '半包围结构',
    strokes: ['点', '横', '撇', '点', '提', '横撇', '撇', '竖', '横', '撇', '捺'],
    pronunciations: [
      {
        id: 'pi-1',
        pinyin: 'pí',
        words: defineHanziWords([
          ['疲劳', '身体或脑子用力太久，觉得很累。'],
          ['疲倦', '没有精神，想休息。'],
          ['疲惫', '非常累，力气都快没有了。'],
        ]),
        usage: '表示身体或精神很累。',
        speakText: '疲劳',
      },
    ],
  },
  {
    id: 'yuan',
    character: '愿',
    score: 94,
    imageTitle: '生日愿望',
    imageText: '许下一个闪闪发亮的小心愿。',
    sceneAccent: '#c999ff',
    sceneSoft: '#f4ebff',
    sceneAssets: [twemojiAsset('1f320', '流星'), twemojiAsset('1f381', '礼物'), twemojiAsset('2728', '星光')],
    radical: '心',
    structure: '半包围结构',
    strokes: ['横', '撇', '竖', '横折', '横', '撇', '竖弯钩', '点', '斜钩', '点', '点'],
    pronunciations: [
      {
        id: 'yuan-1',
        pinyin: 'yuàn',
        words: defineHanziWords([
          ['愿望', '心里希望实现的事情。'],
          ['心愿', '藏在心里的愿望。'],
          ['愿意', '自己同意去做某件事。'],
        ]),
        usage: '表示希望、想法，也可以表示愿意去做。',
        speakText: '愿望',
      },
    ],
  },
  {
    id: 'mao',
    character: '冒',
    score: 96,
    imageTitle: '冒雨出发',
    imageText: '下雨天也勇敢去上学。',
    sceneAccent: '#6ec2ff',
    sceneSoft: '#e9f8ff',
    sceneAssets: [twemojiAsset('2614', '雨伞'), twemojiAsset('1f327', '下雨云朵'), twemojiAsset('2728', '星光')],
    radical: '冂',
    structure: '上下结构',
    strokes: ['竖', '横折', '横', '横', '竖', '横折', '横', '横', '横'],
    pronunciations: [
      {
        id: 'mao-1',
        pinyin: 'mào',
        words: defineHanziWords([
          ['冒雨', '顶着雨继续做事或赶路。'],
          ['冒险', '去做有一定危险但值得尝试的事情。'],
          ['感冒', '身体受凉后生病，不太舒服。'],
        ]),
        usage: '表示顶着某种情况去做，或者突然出现。',
        speakText: '冒雨',
      },
    ],
  },
  {
    id: 'cheng',
    character: '城',
    score: 98,
    imageTitle: '城市城堡',
    imageText: '高高的城墙守护着城市。',
    sceneAccent: '#ff9b8d',
    sceneSoft: '#fff0eb',
    sceneAssets: [twemojiAsset('1f3ef', '城堡'), twemojiAsset('1f3e0', '房子'), twemojiAsset('2728', '星光')],
    radical: '土',
    structure: '左右结构',
    strokes: ['横', '竖', '提', '横', '撇', '横折钩', '斜钩', '撇', '点'],
    pronunciations: [
      {
        id: 'cheng-1',
        pinyin: 'chéng',
        words: defineHanziWords([
          ['城市', '人口和房屋很多、比较热闹的地方。'],
          ['长城', '我国古代修建的很长很长的城墙。'],
          ['城门', '城墙上供人进出的门。'],
        ]),
        usage: '表示城市，或者围着城市的高墙。',
        speakText: '城市',
      },
    ],
  },
  {
    id: 'shang',
    character: '商',
    score: 95,
    imageTitle: '热闹商店',
    imageText: '商店里有好多有趣的小玩意。',
    sceneAccent: '#ffa8c3',
    sceneSoft: '#fff0f6',
    sceneAssets: [twemojiAsset('1f3ea', '商店'), twemojiAsset('1f6cd', '购物袋'), twemojiAsset('2728', '星光')],
    radical: '口',
    structure: '上下结构',
    strokes: ['点', '横', '点', '撇', '竖', '横折', '横', '竖', '横折', '横'],
    pronunciations: [
      {
        id: 'shang-1',
        pinyin: 'shāng',
        words: defineHanziWords([
          ['商店', '卖东西给大家的地方。'],
          ['商量', '大家一起讨论怎么做。'],
          ['商品', '摆出来卖的东西。'],
        ]),
        usage: '和买卖、讨论有关。',
        speakText: '商店',
      },
    ],
  },
  {
    id: 'dian',
    character: '店',
    score: 96,
    imageTitle: '小店开门',
    imageText: '小店门口挂着彩旗欢迎大家。',
    sceneAccent: '#ffd06f',
    sceneSoft: '#fff7df',
    sceneAssets: [twemojiAsset('1f3ea', '店铺'), twemojiAsset('1f6cd', '购物袋'), twemojiAsset('1f381', '装饰礼物')],
    radical: '广',
    structure: '半包围结构',
    strokes: ['点', '横', '撇', '竖', '横', '竖', '横折', '横'],
    pronunciations: [
      {
        id: 'dian-1',
        pinyin: 'diàn',
        words: defineHanziWords([
          ['书店', '专门卖书的店。'],
          ['店员', '在店里工作、接待顾客的人。'],
          ['商店', '卖各种东西的店铺。'],
        ]),
        usage: '指卖东西或者提供服务的地方。',
        speakText: '书店',
      },
    ],
  },
  {
    id: 'zheng',
    character: '整',
    score: 97,
    imageTitle: '整理教室',
    imageText: '值日后，桌椅摆得整整齐齐。',
    sceneAccent: '#84ddaa',
    sceneSoft: '#effff4',
    sceneAssets: [twemojiAsset('1f9f9', '扫把'), twemojiAsset('2728', '闪光'), twemojiAsset('1f3e0', '整齐房间')],
    radical: '攵',
    structure: '上下结构',
    strokes: ['横', '竖', '横折', '横', '竖', '撇', '点', '横', '撇', '捺', '横', '横', '竖', '横'],
    pronunciations: [
      {
        id: 'zheng-1',
        pinyin: 'zhěng',
        words: defineHanziWords([
          ['整齐', '排得很有顺序，一点也不乱。'],
          ['完整', '没有缺少，全部都在。'],
          ['整理', '把东西收拾得有条理。'],
        ]),
        usage: '表示有条理、没有缺少，也表示收拾好。',
        speakText: '整齐',
      },
    ],
  },
  {
    id: 'shi',
    character: '拾',
    score: 93,
    imageTitle: '拾起树叶',
    imageText: '秋天把掉下来的树叶轻轻拾起。',
    sceneAccent: '#ffbe78',
    sceneSoft: '#fff3e6',
    sceneAssets: [twemojiAsset('1f342', '落叶'), twemojiAsset('1f381', '捡到的物品'), twemojiAsset('2728', '星光')],
    radical: '扌',
    structure: '左右结构',
    strokes: ['横', '竖钩', '提', '撇', '捺', '横', '竖', '横折', '横'],
    pronunciations: [
      {
        id: 'shi-1',
        pinyin: 'shí',
        words: defineHanziWords([
          ['拾起', '把掉在地上的东西捡起来。'],
          ['收拾', '把东西整理好、放整齐。'],
          ['拾金不昧', '捡到别人的东西也不自己留下。'],
        ]),
        usage: '表示捡起来，或者整理、收好。',
        speakText: '拾起',
      },
      {
        id: 'she-1',
        pinyin: 'shè',
        words: defineHanziWords([
          ['拾级而上', '沿着一层一层的台阶往上走。'],
          ['拾阶', '顺着台阶一级一级地走。'],
        ]),
        usage: '常用在“拾级而上”，表示一级一级地往上走。',
        speakText: '拾级而上',
      },
    ],
  },
  {
    id: 'jing',
    character: '净',
    score: 98,
    imageTitle: '干净泡泡',
    imageText: '洗完手以后，泡泡把小手变得真干净。',
    sceneAccent: '#79d9ff',
    sceneSoft: '#ebfaff',
    sceneAssets: [twemojiAsset('1f9fc', '肥皂'), twemojiAsset('1fae7', '泡泡'), twemojiAsset('2728', '闪光')],
    radical: '冫',
    structure: '左右结构',
    strokes: ['点', '提', '撇', '横撇', '横折', '横', '横', '竖钩'],
    pronunciations: [
      {
        id: 'jing-1',
        pinyin: 'jìng',
        words: defineHanziWords([
          ['干净', '没有灰尘和脏东西，很清爽。'],
          ['洁净', '特别干净、整洁。'],
          ['净手', '把手洗干净。'],
        ]),
        usage: '表示没有灰尘、很清爽，也有“全部”的意思。',
        speakText: '干净',
      },
    ],
  },
]

const dictationWordPool = [
  {
    id: 'dict-zhengqi',
    word: '整齐',
    pinyin: 'zhěng qí',
    prompt: '整齐',
    meaning: '东西摆放得很有条理，很不乱。',
    wrongText: '整青',
  },
  {
    id: 'dict-yuanwang',
    word: '愿望',
    pinyin: 'yuàn wàng',
    prompt: '愿望',
    meaning: '心里特别想实现的事情。',
    wrongText: '原望',
  },
  {
    id: 'dict-ganjing',
    word: '干净',
    pinyin: 'gān jìng',
    prompt: '干净',
    meaning: '没有灰尘，很清爽。',
    wrongText: '千净',
  },
  {
    id: 'dict-shoushi',
    word: '收拾',
    pinyin: 'shōu shi',
    prompt: '收拾',
    meaning: '把东西整理好，放整齐。',
    wrongText: '手拾',
  },
  {
    id: 'dict-shangdian',
    word: '商店',
    pinyin: 'shāng diàn',
    prompt: '商店',
    meaning: '卖东西的地方。',
    wrongText: '伤店',
  },
  {
    id: 'dict-chengshi',
    word: '城市',
    pinyin: 'chéng shì',
    prompt: '城市',
    meaning: '很多人一起生活的地方。',
    wrongText: '成市',
  },
  {
    id: 'dict-maoyu',
    word: '冒雨',
    pinyin: 'mào yǔ',
    prompt: '冒雨',
    meaning: '顶着下雨去做事情。',
    wrongText: '帽雨',
  },
  {
    id: 'dict-banjia',
    word: '搬家',
    pinyin: 'bān jiā',
    prompt: '搬家',
    meaning: '从一个家搬到另一个家。',
    wrongText: '班家',
  },
]

const phraseShareItems = [
  { id: 'phrase-1', title: '阳光明媚', example: '今天阳光明媚，操场亮晶晶的。' },
  { id: 'phrase-2', title: '井井有条', example: '值日后，图书角变得井井有条。' },
  { id: 'phrase-3', title: '一边……一边……', example: '我一边唱歌，一边整理书包。' },
  { id: 'phrase-4', title: '虽然……但是……', example: '虽然下雨了，但是我们还是准时到校。' },
]

const pictureWritingPrompts = [
  {
    id: 'picture-clean',
    title: '教室值日',
    question: '谁在做什么？教室后来变成了什么样？',
    image:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'picture-rain',
    title: '雨天送伞',
    question: '天气怎么样？谁帮助了谁？他们的心情会是什么？',
    image:
      'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=format&fit=crop&w=1200&q=80',
  },
]

const diaryChallengePrompt = {
  title: '小日记',
  question: '写一写今天最开心的一件小事，再拍照上传。',
}

const mathAddSubQuestions = [
  { id: 'math-add-sub-1', expression: '37 + 25 =', answer: '62' },
  { id: 'math-add-sub-2', expression: '84 - 29 =', answer: '55' },
  { id: 'math-add-sub-3', expression: '46 + 18 =', answer: '64' },
  { id: 'math-add-sub-4', expression: '90 - 37 =', answer: '53' },
  { id: 'math-add-sub-5', expression: '58 + 16 =', answer: '74' },
  { id: 'math-add-sub-6', expression: '73 - 28 =', answer: '45' },
  { id: 'math-add-sub-7', expression: '24 + 39 =', answer: '63' },
  { id: 'math-add-sub-8', expression: '65 - 17 =', answer: '48' },
  { id: 'math-add-sub-9', expression: '48 + 27 =', answer: '75' },
  { id: 'math-add-sub-10', expression: '81 - 36 =', answer: '45' },
]

const tablePracticeQuestions = [
  { id: 'table-1-9-1', expression: '7 × 8 =', answer: '56' },
  { id: 'table-1-9-2', expression: '9 × 6 =', answer: '54' },
  { id: 'table-1-9-3', expression: '4 × 7 =', answer: '28' },
  { id: 'table-1-9-4', expression: '8 × 3 =', answer: '24' },
  { id: 'table-1-9-5', expression: '6 × 6 =', answer: '36' },
  { id: 'table-1-9-6', expression: '5 × 9 =', answer: '45' },
  { id: 'table-1-9-7', expression: '3 × 8 =', answer: '24' },
  { id: 'table-1-9-8', expression: '2 × 9 =', answer: '18' },
  { id: 'table-1-9-9', expression: '9 × 9 =', answer: '81' },
  { id: 'table-1-9-10', expression: '7 × 6 =', answer: '42' },
]

const mulDivPracticeQuestions = [
  { id: 'mul-div-99-1', expression: '56 ÷ 7 =', answer: '8' },
  { id: 'mul-div-99-2', expression: '63 ÷ 9 =', answer: '7' },
  { id: 'mul-div-99-3', expression: '8 × 9 =', answer: '72' },
  { id: 'mul-div-99-4', expression: '54 ÷ 6 =', answer: '9' },
  { id: 'mul-div-99-5', expression: '49 ÷ 7 =', answer: '7' },
  { id: 'mul-div-99-6', expression: '7 × 7 =', answer: '49' },
  { id: 'mul-div-99-7', expression: '72 ÷ 8 =', answer: '9' },
  { id: 'mul-div-99-8', expression: '9 × 4 =', answer: '36' },
  { id: 'mul-div-99-9', expression: '42 ÷ 6 =', answer: '7' },
  { id: 'mul-div-99-10', expression: '6 × 8 =', answer: '48' },
]

const remainderQuestions = [
  { id: 'remainder-1', dividend: 23, divisor: 4, quotient: '5', remainder: '3' },
  { id: 'remainder-2', dividend: 38, divisor: 5, quotient: '7', remainder: '3' },
  { id: 'remainder-3', dividend: 57, divisor: 8, quotient: '7', remainder: '1' },
  { id: 'remainder-4', dividend: 74, divisor: 9, quotient: '8', remainder: '2' },
  { id: 'remainder-5', dividend: 46, divisor: 7, quotient: '6', remainder: '4' },
  { id: 'remainder-6', dividend: 91, divisor: 10, quotient: '9', remainder: '1' },
  { id: 'remainder-7', dividend: 35, divisor: 6, quotient: '5', remainder: '5' },
  { id: 'remainder-8', dividend: 68, divisor: 9, quotient: '7', remainder: '5' },
  { id: 'remainder-9', dividend: 52, divisor: 7, quotient: '7', remainder: '3' },
  { id: 'remainder-10', dividend: 87, divisor: 8, quotient: '10', remainder: '7' },
]

const mathChallengeQuestions = [
  { id: 'math-challenge-1', expression: '19 × 8 =', answer: '152' },
  { id: 'math-challenge-2', expression: '17 × 6 =', answer: '102' },
  { id: 'math-challenge-3', expression: '18 × 9 =', answer: '162' },
]

const mathPracticeCatalog = {
  'mix-add-sub': {
    title: '100以内加减法',
    questions: mathAddSubQuestions,
    answerType: 'single',
  },
  'table-1-9': {
    title: '1-9乘法表口算题',
    questions: tablePracticeQuestions,
    answerType: 'single',
  },
  'mul-div-99': {
    title: '9×9乘除法口算题',
    questions: mulDivPracticeQuestions,
    answerType: 'single',
  },
  remainders: {
    title: '100以内除不尽的口算题',
    questions: remainderQuestions,
    answerType: 'remainder',
  },
}

const englishLetterLessons = [
  { id: 'letter-a', upper: 'A', lower: 'a', word: 'apple', meaning: '苹果', phonics: '/ae/', art: '🍎', sentence: 'A is for apple.' },
  { id: 'letter-b', upper: 'B', lower: 'b', word: 'book', meaning: '书本', phonics: '/b/', art: '📘', sentence: 'B is for book.' },
  { id: 'letter-c', upper: 'C', lower: 'c', word: 'cat', meaning: '小猫', phonics: '/k/', art: '🐱', sentence: 'C is for cat.' },
  { id: 'letter-d', upper: 'D', lower: 'd', word: 'dog', meaning: '小狗', phonics: '/d/', art: '🐶', sentence: 'D is for dog.' },
  { id: 'letter-e', upper: 'E', lower: 'e', word: 'egg', meaning: '鸡蛋', phonics: '/e/', art: '🥚', sentence: 'E is for egg.' },
  { id: 'letter-f', upper: 'F', lower: 'f', word: 'fish', meaning: '小鱼', phonics: '/f/', art: '🐟', sentence: 'F is for fish.' },
]

const englishWordLessons = [
  { id: 'word-teacher', word: 'teacher', meaning: '老师', art: '👩‍🏫', sentence: 'My teacher is kind.' },
  { id: 'word-pencil', word: 'pencil', meaning: '铅笔', art: '✏️', sentence: 'I have a yellow pencil.' },
  { id: 'word-window', word: 'window', meaning: '窗户', art: '🪟', sentence: 'The window is open.' },
  { id: 'word-banana', word: 'banana', meaning: '香蕉', art: '🍌', sentence: 'The banana is sweet.' },
  { id: 'word-family', word: 'family', meaning: '家庭', art: '👨‍👩‍👧', sentence: 'I love my family.' },
  { id: 'word-rabbit', word: 'rabbit', meaning: '兔子', art: '🐰', sentence: 'The rabbit can jump.' },
]

const englishSentenceLessons = [
  { id: 'sentence-1', scene: '📘', sentence: 'This is my English book.', meaning: '这是我的英语书。', hint: '指一指自己的书，再跟读。' },
  { id: 'sentence-2', scene: '🎒', sentence: 'I have a blue schoolbag.', meaning: '我有一个蓝色书包。', hint: '说出 schoolbag 的颜色。' },
  { id: 'sentence-3', scene: '🧒', sentence: 'She is my good friend.', meaning: '她是我的好朋友。', hint: '想一想你的好朋友是谁。' },
  { id: 'sentence-4', scene: '🎵', sentence: 'We can sing and dance.', meaning: '我们会唱歌和跳舞。', hint: '边做动作边读更容易记住。' },
]

const englishReadingLesson = {
  title: 'Tom and the Dog',
  scene: '🐶',
  image:
    'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80',
  lines: [
    'Tom has a small dog. The dog is white and brown.',
    'Every morning, Tom gives the dog water and food.',
    'After school, Tom plays ball with the dog in the park.',
  ],
  questions: [
    'What color is the dog?',
    'When does Tom give the dog food?',
    'Where do Tom and the dog play ball?',
  ],
}

const englishChallengePrompts = [
  { id: 'english-challenge-1', emoji: '🌈', title: 'I have...', prompt: '用 I have... 说一句关于自己书包的话。', speakText: 'Say one sentence with I have about your schoolbag.' },
  { id: 'english-challenge-2', emoji: '🧩', title: 'Make a sentence', prompt: '从 teacher、banana、rabbit 里任选 2 个词造句。', speakText: 'Choose two words and make your own sentence.' },
  { id: 'english-challenge-3', emoji: '🎤', title: 'Answer aloud', prompt: '读完短文后，用英文回答：What does Tom do after school?', speakText: 'Answer in English. What does Tom do after school?' },
]

function pickDictationWordsByDate(date) {
  const start = date.getDate() % dictationWordPool.length
  return Array.from({ length: 5 }, (_, index) => dictationWordPool[(start + index) % dictationWordPool.length])
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

function getProgressStatus(done, total) {
  if (total <= 0) return 'idle'
  if (done <= 0) return 'todo'
  if (done >= total) return 'done'
  return 'active'
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
  const [activeTaskId, setActiveTaskId] = useState('mix-add-sub')
  const [taskOriginView, setTaskOriginView] = useState('subject')
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(todayKey)
  const [historyRecords, setHistoryRecords] = useState(historySeed)
  const [parentAssignments, setParentAssignments] = useState(defaultAssignments)
  const [selectedBankByTask, setSelectedBankByTask] = useState(defaultSelectedBanks)
  const [hanziPageIndex, setHanziPageIndex] = useState(0)
  const [hanziTraceReplayNonce, setHanziTraceReplayNonce] = useState(0)
  const [hanziVisitedIds, setHanziVisitedIds] = useState([])
  const [dictationSessionWords, setDictationSessionWords] = useState([])
  const [dictationPhase, setDictationPhase] = useState('idle')
  const [dictationCurrentWordIndex, setDictationCurrentWordIndex] = useState(-1)
  const [dictationCurrentRepeat, setDictationCurrentRepeat] = useState(0)
  const [dictationStatusText, setDictationStatusText] = useState('')
  const [dictationUploadMode, setDictationUploadMode] = useState('initial')
  const [dictationActiveWordId, setDictationActiveWordId] = useState('')
  const [dictationUploadFile, setDictationUploadFile] = useState(null)
  const [dictationUploadPreview, setDictationUploadPreview] = useState('')
  const [dictationRecognizing, setDictationRecognizing] = useState(false)
  const [dictationRevealById, setDictationRevealById] = useState({})
  const [dictationResultById, setDictationResultById] = useState({})
  const [selectedHanziReadingById, setSelectedHanziReadingById] = useState({})
  const [selectedHanziWordByReadingId, setSelectedHanziWordByReadingId] = useState({})
  const [phraseCheckedIds, setPhraseCheckedIds] = useState([])
  const [pictureWritingPromptId, setPictureWritingPromptId] = useState(pictureWritingPrompts[0].id)
  const [taskUploadNameById, setTaskUploadNameById] = useState({})
  const [mathPageIndex, setMathPageIndex] = useState(0)
  const [mathAnswerById, setMathAnswerById] = useState({})
  const [remainderAnswerById, setRemainderAnswerById] = useState({})
  const [mathChallengeAnswerById, setMathChallengeAnswerById] = useState({})
  const [englishLetterIndex, setEnglishLetterIndex] = useState(0)
  const [englishWordIndex, setEnglishWordIndex] = useState(0)
  const [englishSentenceIndex, setEnglishSentenceIndex] = useState(0)
  const [hanziRecordingStatus, setHanziRecordingStatus] = useState('idle')
  const [hanziPlaybackStatus, setHanziPlaybackStatus] = useState('idle')
  const [hanziRecordingError, setHanziRecordingError] = useState('')
  const [hanziRecordingById, setHanziRecordingById] = useState({})
  const [speakingChineseKey, setSpeakingChineseKey] = useState('')
  const [checkedMap, setCheckedMap] = useState({
    chinese: [],
    math: [],
    english: [],
  })
  const [completionFlash, setCompletionFlash] = useState('')
  const dictationPlaybackTokenRef = useRef(0)
  const hanziWriterContainerRef = useRef(null)
  const hanziWriterRef = useRef(null)
  const hanziMediaRecorderRef = useRef(null)
  const hanziMediaChunksRef = useRef([])
  const hanziMediaStreamRef = useRef(null)
  const hanziRecordingTargetIdRef = useRef('')
  const hanziRecordingByIdRef = useRef({})
  const hanziPreviewAudioRef = useRef(null)

  const activeSubject =
    subjectList.find((subject) => subject.id === activeSubjectId) ?? subjectList[1]
  const activeTask =
    activeSubject.tasks.find((task) => task.id === activeTaskId) ?? activeSubject.tasks[0]
  const currentHanziPage = hanziLessonPages[Math.min(hanziPageIndex, hanziLessonPages.length - 1)]
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
  const weekdayLabel = useMemo(
    () =>
      new Intl.DateTimeFormat('zh-CN', {
        weekday: 'long',
      }).format(today),
    [today],
  )

  useEffect(() => {
    if (!completionFlash) return undefined
    const timer = window.setTimeout(() => setCompletionFlash(''), 1200)
    return () => window.clearTimeout(timer)
  }, [completionFlash])

  useEffect(() => {
    hanziRecordingByIdRef.current = hanziRecordingById
  }, [hanziRecordingById])

  useEffect(
    () => () => {
      dictationPlaybackTokenRef.current += 1
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
      if (dictationUploadPreview) {
        URL.revokeObjectURL(dictationUploadPreview)
      }
    },
    [dictationUploadPreview],
  )

  useEffect(
    () => () => {
      if (hanziMediaRecorderRef.current?.state === 'recording') {
        hanziMediaRecorderRef.current.stop()
      }
      if (hanziMediaStreamRef.current) {
        hanziMediaStreamRef.current.getTracks().forEach((track) => track.stop())
        hanziMediaStreamRef.current = null
      }
      Object.values(hanziRecordingByIdRef.current).forEach((item) => {
        if (item?.url) {
          URL.revokeObjectURL(item.url)
        }
      })
      if (hanziPreviewAudioRef.current) {
        hanziPreviewAudioRef.current.pause()
        hanziPreviewAudioRef.current = null
      }
    },
    [],
  )

  useEffect(() => {
    if (currentView !== 'task' || activeTaskId !== 'hanzi' || !currentHanziPage || !hanziWriterContainerRef.current) {
      return undefined
    }

    let isDisposed = false

    const runAnimation = async () => {
      const width = hanziWriterContainerRef.current?.clientWidth ?? 420
      const height = hanziWriterContainerRef.current?.clientHeight ?? 320

      if (!hanziWriterRef.current) {
        hanziWriterRef.current = HanziWriter.create(hanziWriterContainerRef.current, currentHanziPage.character, {
          width,
          height,
          padding: 18,
          showCharacter: false,
          showOutline: false,
          strokeAnimationSpeed: 0.9,
          delayBetweenStrokes: 140,
          strokeWidth: 3.2,
          outlineWidth: 0,
          strokeColor: '#3b261a',
          radicalColor: '#6e3d22',
          outlineColor: 'rgba(122, 92, 73, 0)',
          drawingColor: '#3b261a',
        })
      } else {
        hanziWriterRef.current.updateDimensions({ width, height, padding: 18 })
        await hanziWriterRef.current.setCharacter(currentHanziPage.character)
      }

      for (let loop = 0; loop < 3; loop += 1) {
        if (isDisposed) return
        await hanziWriterRef.current.hideCharacter({ duration: 0 })
        await hanziWriterRef.current.animateCharacter()
      }
    }

    void runAnimation()

    return () => {
      isDisposed = true
    }
  }, [activeTaskId, currentHanziPage, currentView, hanziTraceReplayNonce])

  useEffect(
    () => () => {
      if (hanziWriterRef.current) {
        hanziWriterRef.current = null
      }
    },
    [],
  )

  const selectedHistory = historyRecords[selectedDate] ?? []
  const totalTaskCount = Object.values(parentAssignments).reduce((sum, items) => sum + items.length, 0)
  const totalCompletedCount = Object.entries(parentAssignments).reduce((sum, [subjectId, items]) => {
    const completed = checkedMap[subjectId]?.filter((taskId) => items.includes(taskId)).length ?? 0
    return sum + completed
  }, 0)
  const completedDays = Object.values(historyRecords).filter((items) => items.length > 0).length
  const todayStatus = getProgressStatus(totalCompletedCount, totalTaskCount)
  const totalStars = useMemo(
    () =>
      Object.values(historyRecords).reduce(
        (sum, items) => sum + items.length * 2,
        0,
      ),
    [historyRecords],
  )

  function getSubjectProgress(subjectId) {
    const subject = subjectList.find((item) => item.id === subjectId)
    if (!subject) {
      return {
        done: 0,
        total: 0,
        status: 'idle',
      }
    }

    const assignedIds = parentAssignments[subjectId] ?? []
    const done = checkedMap[subjectId]?.filter((taskId) => assignedIds.includes(taskId)).length ?? 0
    const total = assignedIds.length

    return {
      done,
      total,
      status: getProgressStatus(done, total),
    }
  }

  const chineseProgress = getSubjectProgress('chinese')
  const mathProgress = getSubjectProgress('math')
  const englishProgress = getSubjectProgress('english')

  const summaryTiles = [
    {
      id: 'reward-pool',
      title: '奖励池',
      value: `${totalStars}`,
      caption: '颗星星',
      glyph: '🎁',
      mascot: '🧸',
      stickers: ['✨', '🍬'],
      badge: '宝箱',
      soft: '#fff3de',
      accent: '#f2b763',
    },
    {
      id: 'history-medal',
      title: '历史成就',
      value: `${completedDays}`,
      caption: '天记录',
      glyph: '🏆',
      mascot: '🦁',
      stickers: ['🌟', '🎗️'],
      badge: '徽章',
      soft: '#fff0f1',
      accent: '#ff8fa3',
    },
    {
      id: 'quiz-result',
      title: '测验结果',
      value: '92',
      caption: '最近得分',
      glyph: '📝',
      mascot: '🐥',
      stickers: ['✏️', '📚'],
      badge: '测验',
      soft: '#eef5ff',
      accent: '#72a9ff',
    },
    {
      id: 'parent-assign',
      title: '家长派发',
      value: `${totalTaskCount}`,
      caption: '语数英作业',
      glyph: '🫧',
      mascot: '👩',
      stickers: ['📚', '✅'],
      badge: '布置',
      soft: '#f3f7fb',
      accent: '#9ab6cc',
      onClick: () => {
        setCalendarOpen(false)
        setCurrentView('assign')
      },
    },
  ]

  const learningTiles = [
    {
      id: 'today-tasks',
      title: '今日任务',
      value: `${totalCompletedCount}/${totalTaskCount}`,
      caption: '去打卡',
      glyph: '⭐',
      mascot: '🚀',
      stickers: ['☀️', '🌈'],
      badge: '出发',
      soft: '#fff7e7',
      accent: '#f2c14f',
      status: todayStatus,
      onClick: () => {
        setCalendarOpen(false)
        setCurrentView('today')
      },
    },
    {
      id: 'chinese-map',
      title: '语文地图',
      value: `${chineseProgress.done}/${chineseProgress.total}`,
      caption: '生字 听写',
      glyph: '📖',
      mascot: '🐼',
      stickers: ['🪁', '🌸'],
      badge: '冒险',
      soft: '#fff1ea',
      accent: '#ff9d7a',
      status: chineseProgress.status,
      onClick: () => openSubject('chinese'),
    },
    {
      id: 'math-zoo',
      title: '数学动物园',
      value: `${mathProgress.done}/${mathProgress.total}`,
      caption: '加减 乘除',
      glyph: '🦒',
      mascot: '🦒',
      stickers: ['🔢', '🍀'],
      badge: '冲关',
      soft: '#eef5ff',
      accent: '#79b8ff',
      status: mathProgress.status,
      onClick: () => openSubject('math'),
    },
    {
      id: 'english-world',
      title: '英语世界',
      value: `${englishProgress.done}/${englishProgress.total}`,
      caption: '字母 单词',
      glyph: '🌍',
      mascot: '🦜',
      stickers: ['🔤', '🎵'],
      badge: '游学',
      soft: '#ebfffd',
      accent: '#63d8d3',
      status: englishProgress.status,
      onClick: () => openSubject('english'),
    },
  ]

  function openSubject(subjectId) {
    cancelDictationPlayback()
    const subject = subjectList.find((item) => item.id === subjectId)
    if (!subject) return
    setCalendarOpen(false)
    setActiveSubjectId(subjectId)
    setActiveTaskId(subject.tasks[0].id)
    setCurrentView('subject')
  }

  function openTask(subjectId, taskId, originView = 'subject') {
    const subject = subjectList.find((item) => item.id === subjectId)
    if (!subject) return
    cancelDictationPlayback()
    setCalendarOpen(false)
    setTaskOriginView(originView)
    setActiveSubjectId(subjectId)
    setActiveTaskId(taskId)
    if (taskId === 'hanzi') {
      setHanziPageIndex(0)
      setHanziTraceReplayNonce(0)
      setHanziVisitedIds([hanziLessonPages[0].id])
      setHanziRecordingError('')
    }
    if (taskId === 'dictation') {
      const nextWords = pickDictationWordsByDate(today)
      prepareDictationSession(nextWords)
      window.setTimeout(() => {
        startDictationPlayback(nextWords)
      }, 320)
    }
    if (taskId in mathPracticeCatalog) {
      setMathPageIndex(0)
    }
    if (taskId === 'picture-writing') {
      setPictureWritingPromptId(pictureWritingPrompts[0].id)
    }
    if (taskId === 'letters') {
      setEnglishLetterIndex(0)
    }
    if (taskId === 'words') {
      setEnglishWordIndex(0)
    }
    if (taskId === 'sentences') {
      setEnglishSentenceIndex(0)
    }
    setCurrentView('task')
  }

  function handleBack() {
    cancelDictationPlayback()
    stopHanziRecording()
    clearHanziPreviewAudio()
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setSpeakingChineseKey('')
    }
    if (currentView === 'task') {
      setCurrentView(taskOriginView)
      return
    }
    if (currentView === 'subject' || currentView === 'today' || currentView === 'assign') {
      setCurrentView('home')
    }
  }

  function toggleAssignedTask(subjectId, taskId) {
    setParentAssignments((current) => {
      const currentItems = current[subjectId] ?? []
      const nextItems = currentItems.includes(taskId)
        ? currentItems.filter((item) => item !== taskId)
        : [...currentItems, taskId]

      return {
        ...current,
        [subjectId]: nextItems,
      }
    })
  }

  function selectTaskBank(taskId, bankId) {
    setSelectedBankByTask((current) => ({
      ...current,
      [taskId]: bankId,
    }))
  }

  function getTaskBanks(taskId) {
    return taskBankCatalog[taskId] ?? []
  }

  function getTaskPerformance(taskId) {
    return (
      taskPerformanceCatalog[taskId] ?? {
        solid: [],
        risky: [],
        frequent: [],
      }
    )
  }

  function getSelectedHanziReading(characterId, pronunciations) {
    const selectedId = selectedHanziReadingById[characterId]
    return pronunciations.find((item) => item.id === selectedId) ?? pronunciations[0]
  }

  function selectHanziReading(characterId, readingId) {
    setSelectedHanziReadingById((current) => ({
      ...current,
      [characterId]: readingId,
    }))
  }

  function selectHanziWord(readingId, wordText) {
    setSelectedHanziWordByReadingId((current) => ({
      ...current,
      [readingId]: current[readingId] === wordText ? '' : wordText,
    }))
  }

  function clearHanziPreviewAudio() {
    if (hanziPreviewAudioRef.current) {
      hanziPreviewAudioRef.current.pause()
      hanziPreviewAudioRef.current.currentTime = 0
      hanziPreviewAudioRef.current = null
    }
    setHanziPlaybackStatus('idle')
  }

  function speakChinese(text, speakerKey = '') {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || !text) return
    clearHanziPreviewAudio()
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'zh-CN'
    utterance.rate = 0.82
    utterance.pitch = 1.02
    setSpeakingChineseKey(speakerKey)
    utterance.onend = () => setSpeakingChineseKey('')
    utterance.onerror = () => setSpeakingChineseKey('')
    window.speechSynthesis.speak(utterance)
  }

  function speakEnglish(text) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || !text) return
    setSpeakingChineseKey('')
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = 0.86
    utterance.pitch = 1.04
    window.speechSynthesis.speak(utterance)
  }

  function stopHanziMediaStream() {
    if (hanziMediaStreamRef.current) {
      hanziMediaStreamRef.current.getTracks().forEach((track) => track.stop())
      hanziMediaStreamRef.current = null
    }
  }

  async function startHanziRecording() {
    if (!currentHanziPage) return
    if (typeof window === 'undefined' || !navigator.mediaDevices?.getUserMedia || typeof window.MediaRecorder === 'undefined') {
      setHanziRecordingError('当前设备暂不支持录音')
      return
    }

    if (hanziMediaRecorderRef.current?.state === 'recording') return

    try {
      setHanziRecordingError('')
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
        setSpeakingChineseKey('')
      }
      clearHanziPreviewAudio()
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorderOptions =
        window.MediaRecorder.isTypeSupported?.('audio/webm;codecs=opus')
          ? { mimeType: 'audio/webm;codecs=opus' }
          : undefined
      const recorder = new window.MediaRecorder(stream, recorderOptions)

      hanziMediaStreamRef.current = stream
      hanziMediaRecorderRef.current = recorder
      hanziMediaChunksRef.current = []
      hanziRecordingTargetIdRef.current = currentHanziPage.id

      recorder.ondataavailable = (event) => {
        if (event.data?.size) {
          hanziMediaChunksRef.current.push(event.data)
        }
      }

      recorder.onstop = () => {
        const targetId = hanziRecordingTargetIdRef.current
        const blob = new Blob(hanziMediaChunksRef.current, {
          type: recorder.mimeType || 'audio/webm',
        })

        if (blob.size && targetId) {
          const nextUrl = URL.createObjectURL(blob)
          setHanziRecordingById((current) => {
            if (current[targetId]?.url) {
              URL.revokeObjectURL(current[targetId].url)
            }
            return {
              ...current,
              [targetId]: {
                url: nextUrl,
                recordedAt: new Intl.DateTimeFormat('zh-CN', {
                  hour: '2-digit',
                  minute: '2-digit',
                }).format(new Date()),
              },
            }
          })
        }

        hanziMediaChunksRef.current = []
        hanziMediaRecorderRef.current = null
        hanziRecordingTargetIdRef.current = ''
        stopHanziMediaStream()
        setHanziRecordingStatus('idle')
      }

      recorder.start()
      setHanziRecordingStatus('recording')
    } catch {
      stopHanziMediaStream()
      hanziMediaRecorderRef.current = null
      hanziMediaChunksRef.current = []
      hanziRecordingTargetIdRef.current = ''
      setHanziRecordingStatus('idle')
      setHanziRecordingError('录音权限未开启')
    }
  }

  function stopHanziRecording() {
    if (hanziMediaRecorderRef.current?.state === 'recording') {
      hanziMediaRecorderRef.current.stop()
    }
  }

  function toggleHanziRecording() {
    if (hanziRecordingStatus === 'recording') {
      stopHanziRecording()
      return
    }
    void startHanziRecording()
  }

  function playCurrentHanziRecording() {
    if (!currentHanziRecording?.url || typeof window === 'undefined' || typeof window.Audio === 'undefined') return
    if (hanziPlaybackStatus === 'playing') {
      clearHanziPreviewAudio()
      return
    }
    setHanziRecordingError('')
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setSpeakingChineseKey('')
    }
    clearHanziPreviewAudio()
    const audio = new window.Audio(currentHanziRecording.url)
    hanziPreviewAudioRef.current = audio
    setHanziPlaybackStatus('playing')
    audio.onended = () => {
      hanziPreviewAudioRef.current = null
      setHanziPlaybackStatus('idle')
    }
    audio.onpause = () => {
      if (hanziPreviewAudioRef.current === audio) {
        hanziPreviewAudioRef.current = null
      }
      setHanziPlaybackStatus('idle')
    }
    void audio.play().catch(() => {
      hanziPreviewAudioRef.current = null
      setHanziPlaybackStatus('idle')
      setHanziRecordingError('暂时无法回放')
    })
  }

  function speakChineseAsync(text) {
    return new Promise((resolve) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window) || !text) {
        resolve()
        return
      }
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'zh-CN'
      utterance.rate = 0.82
      utterance.pitch = 1.02
      utterance.onend = () => resolve()
      utterance.onerror = () => resolve()
      window.speechSynthesis.speak(utterance)
    })
  }

  function waitWithPlaybackToken(ms, token) {
    return new Promise((resolve) => {
      window.setTimeout(() => {
        resolve(token === dictationPlaybackTokenRef.current)
      }, ms)
    })
  }

  function cancelDictationPlayback() {
    dictationPlaybackTokenRef.current += 1
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    if (activeTaskId === 'dictation') {
      setDictationCurrentWordIndex(-1)
      setDictationCurrentRepeat(0)
      setDictationStatusText((current) => (current ? current : ''))
      setDictationPhase((current) => (current === 'playing' ? 'ready' : current))
    }
  }

  function buildDictationResultMap(words) {
    return Object.fromEntries(
      words.map((word) => [
        word.id,
        {
          status: 'pending',
          recognizedText: '',
        },
      ]),
    )
  }

  function clearDictationUpload() {
    if (dictationUploadPreview) {
      URL.revokeObjectURL(dictationUploadPreview)
    }
    setDictationUploadFile(null)
    setDictationUploadPreview('')
  }

  function prepareDictationSession(words) {
    clearDictationUpload()
    setDictationSessionWords(words)
    setDictationPhase('ready')
    setDictationCurrentWordIndex(-1)
    setDictationCurrentRepeat(0)
    setDictationStatusText('准备开始听写')
    setDictationUploadMode('initial')
    setDictationActiveWordId('')
    setDictationRecognizing(false)
    setDictationRevealById({})
    setDictationResultById(buildDictationResultMap(words))
  }

  function restartDictationSession(words = dictationSessionWords) {
    const nextWords = words.length ? words : pickDictationWordsByDate(today)
    prepareDictationSession(nextWords)
    window.setTimeout(() => {
      startDictationPlayback(nextWords)
    }, 120)
  }

  async function playWordThreeTimes(word, wordIndex, token) {
    for (let repeat = 1; repeat <= 3; repeat += 1) {
      if (token !== dictationPlaybackTokenRef.current) return false
      setDictationCurrentRepeat(repeat)
      setDictationStatusText(`第 ${wordIndex + 1} 个词，第 ${repeat} 遍`)
      await speakChineseAsync(word.prompt)
      if (token !== dictationPlaybackTokenRef.current) return false
      if (repeat < 3) {
        const keepGoing = await waitWithPlaybackToken(5000, token)
        if (!keepGoing) return false
      }
    }
    return true
  }

  async function startDictationPlayback(words = dictationSessionWords) {
    if (!words.length) return
    const token = dictationPlaybackTokenRef.current + 1
    dictationPlaybackTokenRef.current = token
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    clearDictationUpload()
    setDictationUploadMode('initial')
    setDictationActiveWordId('')
    setDictationPhase('playing')
    setDictationCurrentWordIndex(-1)
    setDictationCurrentRepeat(0)
    setDictationStatusText('要开始听写啦')
    await speakChineseAsync('要开始听写啦，请准备好纸、笔、橡皮。三，二，一，开始。')
    if (token !== dictationPlaybackTokenRef.current) return

    for (let index = 0; index < words.length; index += 1) {
      if (token !== dictationPlaybackTokenRef.current) return
      setDictationCurrentWordIndex(index)
      const keepPlaying = await playWordThreeTimes(words[index], index, token)
      if (!keepPlaying) return
      if (index < words.length - 1) {
        setDictationStatusText('下一个词语 20 秒后开始')
        const keepGoing = await waitWithPlaybackToken(20000, token)
        if (!keepGoing) return
      }
    }

    if (token !== dictationPlaybackTokenRef.current) return
    setDictationCurrentWordIndex(-1)
    setDictationCurrentRepeat(0)
    setDictationPhase('upload')
    setDictationStatusText('听写结束，请拍照上传')
  }

  async function replaySingleDictationWord(wordId) {
    const targetWord = dictationSessionWords.find((item) => item.id === wordId)
    if (!targetWord) return
    const targetIndex = dictationSessionWords.findIndex((item) => item.id === wordId)
    const token = dictationPlaybackTokenRef.current + 1
    dictationPlaybackTokenRef.current = token
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    clearDictationUpload()
    setDictationUploadMode('correction')
    setDictationActiveWordId(wordId)
    setDictationPhase('playing')
    setDictationCurrentWordIndex(targetIndex)
    setDictationCurrentRepeat(0)
    setDictationStatusText('开始重听订正')
    const keepPlaying = await playWordThreeTimes(targetWord, targetIndex, token)
    if (!keepPlaying) return
    if (token !== dictationPlaybackTokenRef.current) return
    setDictationCurrentWordIndex(-1)
    setDictationCurrentRepeat(0)
    setDictationPhase('upload')
    setDictationStatusText('请拍照上传订正内容')
  }

  function markDictationAsUnknown(wordId) {
    cancelDictationPlayback()
    clearDictationUpload()
    setDictationUploadMode('copy')
    setDictationActiveWordId(wordId)
    setDictationPhase('upload')
    setDictationStatusText('翻转查看后，抄写 3 遍再拍照上传')
    setDictationResultById((current) => ({
      ...current,
      [wordId]: {
        ...current[wordId],
        status: 'copy',
      },
    }))
  }

  function toggleDictationReveal(wordId) {
    setDictationRevealById((current) => ({
      ...current,
      [wordId]: !current[wordId],
    }))
  }

  function handleDictationUploadChange(event) {
    const file = event.target.files?.[0]
    if (!file) return
    if (dictationUploadPreview) {
      URL.revokeObjectURL(dictationUploadPreview)
    }
    setDictationUploadFile(file)
    setDictationUploadPreview(URL.createObjectURL(file))
  }

  function getDictationTargetWord() {
    return dictationSessionWords.find((item) => item.id === dictationActiveWordId) ?? null
  }

  async function recognizeDictationUpload() {
    if (!dictationUploadFile) return
    setDictationRecognizing(true)
    setDictationStatusText('OCR 识别中')
    await waitWithPlaybackToken(1400, dictationPlaybackTokenRef.current)

    if (dictationUploadMode === 'initial') {
      setDictationResultById((current) =>
        Object.fromEntries(
          dictationSessionWords.map((word, index) => [
            word.id,
            {
              ...current[word.id],
              status: index < 3 ? 'correct' : 'wrong',
              recognizedText: index < 3 ? word.word : word.wrongText,
            },
          ]),
        ),
      )
      setDictationPhase('review')
      setDictationStatusText('识别完成，请查看结果')
    }

    if (dictationUploadMode === 'correction' && dictationActiveWordId) {
      const targetWord = getDictationTargetWord()
      if (targetWord) {
        setDictationResultById((current) => ({
          ...current,
          [targetWord.id]: {
            ...current[targetWord.id],
            status: 'correct',
            recognizedText: targetWord.word,
          },
        }))
      }
      setDictationPhase('review')
      setDictationStatusText('订正完成')
    }

    if (dictationUploadMode === 'copy' && dictationActiveWordId) {
      const targetWord = getDictationTargetWord()
      if (targetWord) {
        setDictationResultById((current) => ({
          ...current,
          [targetWord.id]: {
            ...current[targetWord.id],
            status: 'copied',
            recognizedText: targetWord.word,
          },
        }))
      }
      setDictationPhase('review')
      setDictationStatusText('抄写完成')
    }

    setDictationRecognizing(false)
    setDictationActiveWordId('')
    setDictationUploadMode('initial')
    clearDictationUpload()
  }

  function handleTaskUploadChange(taskId, event) {
    const file = event.target.files?.[0]
    if (!file) return
    setTaskUploadNameById((current) => ({
      ...current,
      [taskId]: file.name,
    }))
  }

  function markPhraseComplete(itemId) {
    if (phraseCheckedIds.includes(itemId)) return
    setPhraseCheckedIds((current) => [...current, itemId])
    setCompletionFlash('获得星星5颗')
  }

  function updateMathAnswer(questionId, value) {
    if (!/^\d*$/.test(value)) return
    setMathAnswerById((current) => ({
      ...current,
      [questionId]: value,
    }))
  }

  function updateRemainderAnswer(questionId, field, value) {
    if (!/^\d*$/.test(value)) return
    setRemainderAnswerById((current) => ({
      ...current,
      [questionId]: {
        ...current[questionId],
        [field]: value,
      },
    }))
  }

  function updateMathChallengeAnswer(questionId, value) {
    if (!/^\d*$/.test(value)) return
    setMathChallengeAnswerById((current) => ({
      ...current,
      [questionId]: value,
    }))
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
  const currentHanziReading =
    currentHanziPage &&
    getSelectedHanziReading(currentHanziPage.id, currentHanziPage.pronunciations)
  const currentHanziRecording =
    currentHanziPage ? (hanziRecordingById[currentHanziPage.id] ?? null) : null
  const currentSelectedHanziWord =
    currentHanziReading?.words.find((word) => word.text === selectedHanziWordByReadingId[currentHanziReading.id]) ?? null
  const isCurrentHanziSpeaking = speakingChineseKey === `hanzi-hero:${currentHanziPage?.id ?? ''}`
  const hanziCompletionPercent = Math.round((hanziVisitedIds.length / hanziLessonPages.length) * 100)
  const hanziAverageScore =
    hanziVisitedIds.length > 0
      ? Math.round(
          hanziVisitedIds.reduce((sum, pageId) => {
            const page = hanziLessonPages.find((item) => item.id === pageId)
            return sum + (page?.score ?? 0)
          }, 0) / hanziVisitedIds.length,
        )
      : 0
  const dictationResolvedCount = dictationSessionWords.filter((word) => {
    const result = dictationResultById[word.id]
    return result?.status === 'correct' || result?.status === 'copied'
  }).length
  const dictationReadyToFinish =
    dictationSessionWords.length > 0 && dictationResolvedCount === dictationSessionWords.length
  const dictationTargetWord = getDictationTargetWord()
  const currentPictureWritingPrompt =
    pictureWritingPrompts.find((item) => item.id === pictureWritingPromptId) ?? pictureWritingPrompts[0]
  const currentEnglishLetter =
    englishLetterLessons[Math.min(englishLetterIndex, englishLetterLessons.length - 1)] ?? englishLetterLessons[0]
  const currentEnglishWord =
    englishWordLessons[Math.min(englishWordIndex, englishWordLessons.length - 1)] ?? englishWordLessons[0]
  const currentEnglishSentence =
    englishSentenceLessons[Math.min(englishSentenceIndex, englishSentenceLessons.length - 1)] ?? englishSentenceLessons[0]
  const currentMathPractice = mathPracticeCatalog[activeTask.id] ?? null
  const currentMathQuestion =
    currentMathPractice?.questions[Math.min(mathPageIndex, (currentMathPractice?.questions.length ?? 1) - 1)] ?? null
  const mathAnsweredCount =
    currentMathPractice?.answerType === 'single'
      ? currentMathPractice.questions.filter((question) => mathAnswerById[question.id]?.trim()).length
      : 0
  const mathAverageScore =
    currentMathPractice?.answerType === 'single' && currentMathPractice.questions.length > 0
      ? Math.round(
          (currentMathPractice.questions.filter((question) => mathAnswerById[question.id] === question.answer).length /
            currentMathPractice.questions.length) *
            100,
        )
      : 0
  const mathReadyToFinish =
    currentMathPractice?.answerType === 'single'
      ? mathAnsweredCount === currentMathPractice.questions.length
      : false
  const phraseReadyToFinish = phraseCheckedIds.length === phraseShareItems.length
  const pictureWritingReadyToFinish = Boolean(taskUploadNameById['picture-writing'])
  const chineseChallengeReadyToFinish = Boolean(taskUploadNameById.challenge)
  const remainderReadyToFinish = remainderQuestions.every(
    (question) =>
      remainderAnswerById[question.id]?.quotient?.trim() && remainderAnswerById[question.id]?.remainder?.trim(),
  )
  const remainderAnsweredCount = remainderQuestions.filter(
    (question) =>
      remainderAnswerById[question.id]?.quotient?.trim() && remainderAnswerById[question.id]?.remainder?.trim(),
  ).length
  const remainderAverageScore =
    remainderQuestions.length > 0
      ? Math.round(
          (remainderQuestions.filter(
            (question) =>
              remainderAnswerById[question.id]?.quotient === question.quotient &&
              remainderAnswerById[question.id]?.remainder === question.remainder,
          ).length /
            remainderQuestions.length) *
            100,
        )
      : 0
  const mathChallengeReadyToFinish = mathChallengeQuestions.every(
    (question) => mathChallengeAnswerById[question.id]?.trim(),
  )

  function goToHanziPage(nextIndex) {
    stopHanziRecording()
    clearHanziPreviewAudio()
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setSpeakingChineseKey('')
    }
    setHanziRecordingError('')
    const safeIndex = Math.max(0, Math.min(hanziLessonPages.length - 1, nextIndex))
    const nextPage = hanziLessonPages[safeIndex]
    if (nextPage) {
      setHanziVisitedIds((current) =>
        current.includes(nextPage.id) ? current : [...current, nextPage.id],
      )
    }
    setHanziPageIndex(safeIndex)
  }

  function renderHanziStudy() {
    if (!currentHanziPage || !currentHanziReading) return null
    const isLastHanziPage = hanziPageIndex === hanziLessonPages.length - 1

    return (
      <section className="hanzi-study">
        <div
          className="hanzi-study__scene"
          style={{
            '--hanzi-scene-accent': currentHanziPage.sceneAccent,
            '--hanzi-scene-soft': currentHanziPage.sceneSoft,
          }}
        >
          <div className="hanzi-scene-collage">
            {currentHanziPage.sceneAssets.map((asset, index) => (
              <img
                key={`${currentHanziPage.id}-${asset.alt}`}
                className={`hanzi-scene-asset hanzi-scene-asset--${index === 0 ? 'main' : index === 1 ? 'side' : 'spark'}`}
                src={asset.url}
                alt={asset.alt}
              />
            ))}
          </div>
          <div className="hanzi-study__scene-title">{currentHanziPage.imageTitle}</div>
          <div className="hanzi-study__scene-text">{currentHanziPage.imageText}</div>

          <div className="hanzi-scene-record">
            <button
              type="button"
              className={`hanzi-record-toggle ${hanziRecordingStatus === 'recording' ? 'is-recording' : ''}`}
              aria-label={hanziRecordingStatus === 'recording' ? '停止录音' : '开始录音'}
              title={
                hanziRecordingStatus === 'recording'
                  ? '点击停止录音'
                  : currentHanziRecording
                    ? '点击重新录音'
                    : '点击开始录音'
              }
              onClick={toggleHanziRecording}
            >
              {hanziRecordingStatus === 'recording' ? (
                <Disc3 size={18} className="hanzi-record-toggle__icon is-spinning" />
              ) : (
                <Mic size={18} className="hanzi-record-toggle__icon" />
              )}
            </button>

            <button
              type="button"
              className={`hanzi-record-toggle hanzi-record-playback ${
                hanziPlaybackStatus === 'playing' ? 'is-playing' : ''
              } ${currentHanziRecording ? '' : 'is-disabled'}`}
              aria-label="回放录音"
              title={
                currentHanziRecording
                  ? hanziPlaybackStatus === 'playing'
                    ? '点击停止回放'
                    : `回放录音 ${currentHanziRecording.recordedAt}`
                  : '暂无录音'
              }
              onClick={playCurrentHanziRecording}
              disabled={!currentHanziRecording}
            >
              {hanziPlaybackStatus === 'playing' ? (
                <Volume2 size={18} className="hanzi-record-toggle__icon is-speaking" />
              ) : (
                <CirclePlay size={18} className="hanzi-record-toggle__icon" />
              )}
            </button>

            {hanziRecordingError ? (
              <div className="hanzi-record-error-badge">{hanziRecordingError}</div>
            ) : null}
          </div>
        </div>

        <div className="hanzi-study__panel">
          <div className="hanzi-study__top">
            <div className="hanzi-study__detail">
              <div className="hanzi-study__hero">
                <button
                  type="button"
                  className={`hanzi-character-button ${isCurrentHanziSpeaking ? 'is-speaking' : ''}`}
                  onClick={() =>
                    speakChinese(
                      currentHanziReading.speakText || currentHanziPage.character,
                      `hanzi-hero:${currentHanziPage.id}`,
                    )
                  }
                >
                  <span className="hanzi-character-button__text">{currentHanziPage.character}</span>
                  <span className={`hanzi-character-button__audio ${isCurrentHanziSpeaking ? 'is-speaking' : ''}`}>
                    <Volume2 size={22} />
                  </span>
                </button>

                <div className="hanzi-meta">
                  <span>{currentHanziPage.radical}</span>
                  <span>{currentHanziPage.structure}</span>
                </div>
              </div>

              <div className="hanzi-reading-list">
                {currentHanziPage.pronunciations.map((reading) => (
                  <button
                    key={reading.id}
                    type="button"
                    className={`hanzi-reading ${currentHanziReading.id === reading.id ? 'is-active' : ''}`}
                    onClick={() => {
                      selectHanziReading(currentHanziPage.id, reading.id)
                      speakChinese(reading.speakText || currentHanziPage.character)
                    }}
                  >
                    {reading.pinyin}
                  </button>
                ))}
              </div>

              <div className="hanzi-word-list">
                {currentHanziReading.words.map((word) => (
                  <button
                    key={word.text}
                    type="button"
                    className={`hanzi-word-chip ${
                      currentSelectedHanziWord?.text === word.text ? 'is-active' : ''
                    }`}
                    onClick={() => selectHanziWord(currentHanziReading.id, word.text)}
                  >
                    {word.text}
                  </button>
                ))}
              </div>
            </div>

            <div className="hanzi-trace-board">
              <div className="hanzi-trace-board__head">
                <div className="hanzi-trace-board__hint">描红动画</div>
                <button
                  type="button"
                  className="hanzi-trace-replay"
                  onClick={() => setHanziTraceReplayNonce((current) => current + 1)}
                >
                  <CirclePlay size={16} />
                  点一下重播动画
                </button>
              </div>
              <div className="hanzi-trace-stage" aria-label={`${currentHanziPage.character} 描红动画`}>
                <div className="hanzi-trace-grid" />
                <div
                  ref={hanziWriterContainerRef}
                  className="hanzi-writer-container"
                />
              </div>
            </div>
          </div>

          <div className={`hanzi-support-grid ${isLastHanziPage ? 'is-final' : ''}`}>
            <div className={`hanzi-usage-card ${isLastHanziPage ? 'is-final' : ''}`}>
              <div>{currentHanziReading.usage}</div>
              {currentSelectedHanziWord ? (
                <div className="hanzi-word-explanation">
                  <strong>{currentSelectedHanziWord.text}</strong>
                  <span>{currentSelectedHanziWord.explanation}</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    )
  }

  function renderDictationStudy() {
    return (
      <section className="dictation-study">
        <div className="dictation-hero">
          <div className="dictation-hero__head">
            <div className="dictation-hero__title">今日听写 5 个词语</div>
            <div className="dictation-phase-chip">
              {dictationPhase === 'playing'
                ? '正在播报'
                : dictationPhase === 'upload'
                  ? '等待上传'
                  : dictationPhase === 'review'
                    ? '查看结果'
                    : '准备开始'}
            </div>
          </div>
          <div className="dictation-hero__status">{dictationStatusText || '准备开始听写'}</div>
          <div className="dictation-hero__strip">
            {dictationSessionWords.map((word, index) => {
              const result = dictationResultById[word.id]
              const isCurrent = dictationCurrentWordIndex === index
              return (
                <div
                  key={word.id}
                  className={`dictation-pill ${isCurrent ? 'is-current' : ''} ${
                    result?.status === 'correct' || result?.status === 'copied'
                      ? 'is-correct'
                      : result?.status === 'wrong' || result?.status === 'copy'
                        ? 'is-wrong'
                        : ''
                  }`}
                >
                  <strong>{`词语 ${index + 1}`}</strong>
                  <span>
                    {result?.status === 'correct' || result?.status === 'copied'
                      ? word.word
                      : isCurrent
                        ? `第 ${dictationCurrentRepeat || 1} 遍`
                        : '--'}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="dictation-hero__actions">
            <button
              type="button"
              className="dictation-action-button"
              onClick={() => restartDictationSession(dictationSessionWords)}
            >
              <RefreshCw size={16} />
              重新听写本轮 5 词
            </button>
          </div>
        </div>

        <div className="dictation-layout">
          <div className="dictation-upload-card">
            <div className="dictation-card__title">
              {dictationUploadMode === 'initial'
                ? '拍照上传'
                : dictationUploadMode === 'correction'
                  ? '上传订正内容'
                  : '上传抄写内容'}
            </div>

            {dictationTargetWord ? (
              <div className="dictation-target-chip">
                {dictationUploadMode === 'correction' ? '当前订正' : '当前抄写'} {dictationTargetWord.word}
              </div>
            ) : null}

            <label className="dictation-upload-box">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleDictationUploadChange}
              />
              {dictationUploadPreview ? (
                <img src={dictationUploadPreview} alt="听写上传预览" className="dictation-upload-preview" />
              ) : (
                <div className="dictation-upload-placeholder">
                  <Camera size={22} />
                  <span>拍照上传听写纸</span>
                </div>
              )}
            </label>

            <button
              type="button"
              className="dictation-recognize-button"
              disabled={!dictationUploadFile || dictationRecognizing}
              onClick={recognizeDictationUpload}
            >
              {dictationRecognizing ? '识别中...' : '开始 OCR 识别'}
            </button>
          </div>

          <div className="dictation-result-panel">
            <div className="dictation-card__title">{`识别结果 ${dictationResolvedCount}/${dictationSessionWords.length}`}</div>

            <div className="dictation-result-list">
              {dictationSessionWords.map((word, index) => {
                const result = dictationResultById[word.id] ?? { status: 'pending' }
                const revealed = Boolean(dictationRevealById[word.id])

                return (
                  <article
                    key={word.id}
                    className={`dictation-result-card ${
                      result.status === 'correct' || result.status === 'copied'
                        ? 'is-correct'
                        : result.status === 'wrong' || result.status === 'copy'
                          ? 'is-wrong'
                          : ''
                    }`}
                  >
                    <div className="dictation-result-card__head">
                      <strong>{`词语 ${index + 1}`}</strong>
                      <span>
                        {result.status === 'correct' || result.status === 'copied'
                          ? '正确'
                          : result.status === 'wrong'
                            ? '需要订正'
                            : result.status === 'copy'
                              ? '抄写中'
                              : '待识别'}
                      </span>
                    </div>

                    {result.status === 'correct' || result.status === 'copied' ? (
                      <div className="dictation-correct-word">
                        <span>{word.word}</span>
                        <small>{word.pinyin}</small>
                      </div>
                    ) : null}

                    {result.status === 'wrong' ? (
                      <div className="dictation-wrong-box">
                        <div className="dictation-wrong-text">{`识别结果：${result.recognizedText}`}</div>
                        <div className="dictation-inline-actions">
                          <button
                            type="button"
                            className="dictation-mini-button"
                            onClick={() => {
                              void replaySingleDictationWord(word.id)
                            }}
                          >
                            继续听写订正
                          </button>
                          <button
                            type="button"
                            className="dictation-mini-button is-soft"
                            onClick={() => markDictationAsUnknown(word.id)}
                          >
                            标记不会
                          </button>
                        </div>
                      </div>
                    ) : null}

                    {result.status === 'copy' ? (
                      <div className={`dictation-flip-card ${revealed ? 'is-revealed' : ''}`}>
                        <div className="dictation-flip-card__inner">
                          <div className="dictation-flip-face">
                            <div className="dictation-flip-card__hint">先翻转，再抄写 3 遍</div>
                            <button
                              type="button"
                              className="dictation-mini-button"
                              onClick={() => toggleDictationReveal(word.id)}
                            >
                              翻转看答案
                            </button>
                          </div>
                          <div className="dictation-flip-face dictation-flip-face--back">
                            <strong>{word.word}</strong>
                            <span>{word.pinyin}</span>
                            <small>{word.meaning}</small>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    )
  }

  function renderPhraseStudy() {
    return (
      <section className="study-block study-block--compact">
        <div className="study-block__title">好词好句</div>
        <div className="phrase-list">
          {phraseShareItems.map((item) => {
            const checked = phraseCheckedIds.includes(item.id)
            return (
              <button
                key={item.id}
                type="button"
                className={`phrase-card ${checked ? 'is-done' : ''}`}
                onClick={() => markPhraseComplete(item.id)}
              >
                <div className="phrase-card__text">
                  <strong>{item.title}</strong>
                  <span>{item.example}</span>
                </div>
                <div className="phrase-card__check">
                  <span className={`phrase-checkmark ${checked ? 'is-done' : ''}`}>
                    <Check size={16} />
                  </span>
                  <small>完成啦</small>
                </div>
              </button>
            )
          })}
        </div>
      </section>
    )
  }

  function renderPictureWritingStudy() {
    return (
      <section className="picture-writing-study">
        <div className="picture-writing-picker">
          {pictureWritingPrompts.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`picture-writing-thumb ${pictureWritingPromptId === item.id ? 'is-active' : ''}`}
              onClick={() => setPictureWritingPromptId(item.id)}
            >
              <img src={item.image} alt={item.title} />
              <span>{item.title}</span>
            </button>
          ))}
        </div>

        <div className="picture-writing-panel">
          <div className="picture-writing-preview">
            <img src={currentPictureWritingPrompt.image} alt={currentPictureWritingPrompt.title} />
          </div>
          <div className="picture-writing-side">
            <div className="picture-writing-question">{currentPictureWritingPrompt.question}</div>
            <label className="task-upload-card">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(event) => handleTaskUploadChange('picture-writing', event)}
              />
              <Camera size={26} />
              <span>{taskUploadNameById['picture-writing'] || '拍照上传'}</span>
            </label>
          </div>
        </div>
      </section>
    )
  }

  function renderChineseChallengeStudy() {
    return (
      <section className="study-block study-block--compact diary-study">
        <div className="study-block__title">{diaryChallengePrompt.title}</div>
        <div className="diary-card">
          <div className="diary-card__question">{diaryChallengePrompt.question}</div>
          <div className="diary-card__paper">
            <span />
            <span />
            <span />
            <span />
          </div>
          <label className="task-upload-card task-upload-card--wide">
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(event) => handleTaskUploadChange('challenge', event)}
            />
            <Camera size={26} />
            <span>{taskUploadNameById.challenge || '拍照上传'}</span>
          </label>
        </div>
      </section>
    )
  }

  function renderEnglishLettersStudy() {
    return (
      <section className="english-study">
        <div className="english-study__scene english-study__scene--mint">
          <div className="english-study__badge">{`${currentEnglishLetter.upper}${currentEnglishLetter.lower}`}</div>
          <div className="english-study__emoji">{currentEnglishLetter.art}</div>
          <div className="english-study__scene-title">{currentEnglishLetter.word}</div>
          <div className="english-study__scene-text">{currentEnglishLetter.meaning}</div>
        </div>

        <div className="english-study__panel">
          <div className="english-study__hero">
            <button
              type="button"
              className="english-hero-button"
              onClick={() => speakEnglish(`${currentEnglishLetter.upper}. ${currentEnglishLetter.lower}. ${currentEnglishLetter.word}.`)}
            >
              <span>{`${currentEnglishLetter.upper}${currentEnglishLetter.lower}`}</span>
              <Volume2 size={22} />
            </button>

            <div className="english-meta">
              <span>{currentEnglishLetter.phonics}</span>
              <span>{currentEnglishLetter.word}</span>
            </div>
          </div>

          <div className="english-chip-list">
            {englishLetterLessons.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`english-chip ${englishLetterIndex === index ? 'is-active' : ''}`}
                onClick={() => {
                  setEnglishLetterIndex(index)
                  speakEnglish(`${item.upper}. ${item.lower}. ${item.word}.`)
                }}
              >
                {`${item.upper}${item.lower}`}
              </button>
            ))}
          </div>

          <div className="english-usage-card">{currentEnglishLetter.sentence}</div>
        </div>
      </section>
    )
  }

  function renderEnglishWordsStudy() {
    return (
      <section className="english-study">
        <div className="english-study__scene english-study__scene--sky">
          <div className="english-study__badge">{currentEnglishWord.meaning}</div>
          <div className="english-study__emoji">{currentEnglishWord.art}</div>
          <div className="english-study__scene-title">{currentEnglishWord.word}</div>
          <div className="english-study__scene-text">{currentEnglishWord.sentence}</div>
        </div>

        <div className="english-study__panel">
          <button
            type="button"
            className="english-word-button"
            onClick={() => speakEnglish(currentEnglishWord.word)}
          >
            <span>{currentEnglishWord.word}</span>
            <Volume2 size={20} />
          </button>

          <div className="english-word-grid">
            {englishWordLessons.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`english-word-card ${englishWordIndex === index ? 'is-active' : ''}`}
                onClick={() => {
                  setEnglishWordIndex(index)
                  speakEnglish(item.word)
                }}
              >
                <strong>{item.word}</strong>
                <span>{item.meaning}</span>
              </button>
            ))}
          </div>

          <div className="english-usage-card">{currentEnglishWord.sentence}</div>
        </div>
      </section>
    )
  }

  function renderEnglishSentencesStudy() {
    return (
      <section className="english-study">
        <div className="english-study__scene english-study__scene--peach">
          <div className="english-study__badge">Say it</div>
          <div className="english-study__emoji">{currentEnglishSentence.scene}</div>
          <div className="english-study__scene-title">{currentEnglishSentence.meaning}</div>
          <div className="english-study__scene-text">{currentEnglishSentence.hint}</div>
        </div>

        <div className="english-study__panel">
          <button
            type="button"
            className="english-sentence-hero"
            onClick={() => speakEnglish(currentEnglishSentence.sentence)}
          >
            <span>{currentEnglishSentence.sentence}</span>
            <Volume2 size={20} />
          </button>

          <div className="english-sentence-list">
            {englishSentenceLessons.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`english-sentence-option ${englishSentenceIndex === index ? 'is-active' : ''}`}
                onClick={() => {
                  setEnglishSentenceIndex(index)
                  speakEnglish(item.sentence)
                }}
              >
                {item.sentence}
              </button>
            ))}
          </div>
        </div>
      </section>
    )
  }

  function renderEnglishReadingStudy() {
    return (
      <section className="english-reading-study">
        <div className="english-reading-card">
          <div className="english-reading-image">
            <img src={englishReadingLesson.image} alt={englishReadingLesson.title} />
          </div>
          <div className="english-reading-head">
            <strong>{englishReadingLesson.title}</strong>
            <button
              type="button"
              className="english-audio-button"
              onClick={() => speakEnglish(englishReadingLesson.lines.join(' '))}
            >
              <Volume2 size={18} />
              跟读
            </button>
          </div>
          <div className="english-reading-text">
            {englishReadingLesson.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>

        <div className="english-reading-qa">
          <div className="study-block__title">想一想</div>
          <div className="english-question-list">
            {englishReadingLesson.questions.map((question) => (
              <button
                key={question}
                type="button"
                className="english-question-card"
                onClick={() => speakEnglish(question)}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </section>
    )
  }

  function renderEnglishChallengeStudy() {
    return (
      <section className="study-block study-block--compact">
        <div className="study-block__title">英语挑战</div>
        <div className="english-challenge-grid">
          {englishChallengePrompts.map((item) => (
            <button
              key={item.id}
              type="button"
              className="english-challenge-card"
              onClick={() => speakEnglish(item.speakText)}
            >
              <div className="english-challenge-card__head">
                <span>{item.emoji}</span>
                <strong>{item.title}</strong>
              </div>
              <p>{item.prompt}</p>
            </button>
          ))}
        </div>
      </section>
    )
  }

  function renderMathPracticeStudy() {
    if (!currentMathPractice || !currentMathQuestion) return null

    return (
      <section className="math-drill">
        <div className="math-drill__sheet">
          <div className="math-drill__bubble">{`${mathPageIndex + 1} / ${currentMathPractice.questions.length}`}</div>
          <div className="math-drill__title">{currentMathPractice.title}</div>

          {currentMathPractice.answerType === 'single' ? (
            <div className="math-drill__problem">
              <span>{currentMathQuestion.expression}</span>
              <input
                type="text"
                inputMode="numeric"
                value={mathAnswerById[currentMathQuestion.id] ?? ''}
                onChange={(event) => updateMathAnswer(currentMathQuestion.id, event.target.value)}
                aria-label={`${currentMathPractice.title}答案`}
              />
            </div>
          ) : (
            <div className="math-drill__problem math-drill__problem--remainder">
              <span>{`${currentMathQuestion.dividend} ÷ ${currentMathQuestion.divisor} =`}</span>
              <input
                type="text"
                inputMode="numeric"
                value={remainderAnswerById[currentMathQuestion.id]?.quotient ?? ''}
                onChange={(event) => updateRemainderAnswer(currentMathQuestion.id, 'quotient', event.target.value)}
                aria-label="商"
              />
              <span>余</span>
              <input
                type="text"
                inputMode="numeric"
                value={remainderAnswerById[currentMathQuestion.id]?.remainder ?? ''}
                onChange={(event) => updateRemainderAnswer(currentMathQuestion.id, 'remainder', event.target.value)}
                aria-label="余数"
              />
            </div>
          )}
        </div>
      </section>
    )
  }

  function renderMathChallengeStudy() {
    return (
      <section className="study-block">
        <div className="study-block__title">挑战区</div>
        <div className="math-challenge-list">
          {mathChallengeQuestions.map((question, index) => (
            <div key={question.id} className="math-challenge-card">
              <strong>{`挑战 ${index + 1}`}</strong>
              <div className="math-challenge-card__line">
                <span>{question.expression}</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={mathChallengeAnswerById[question.id] ?? ''}
                  onChange={(event) => updateMathChallengeAnswer(question.id, event.target.value)}
                  aria-label={`挑战 ${index + 1} 答案`}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  function renderActiveStudyContent() {
    if (activeTask.id === 'hanzi') return renderHanziStudy()
    if (activeTask.id === 'dictation') return renderDictationStudy()
    if (activeTask.id === 'phrases') return renderPhraseStudy()
    if (activeTask.id === 'picture-writing') return renderPictureWritingStudy()
    if (activeTask.id === 'challenge') return renderChineseChallengeStudy()
    if (activeTask.id === 'letters') return renderEnglishLettersStudy()
    if (activeTask.id === 'words') return renderEnglishWordsStudy()
    if (activeTask.id === 'sentences') return renderEnglishSentencesStudy()
    if (activeTask.id === 'reading') return renderEnglishReadingStudy()
    if (activeTask.id === 'english-challenge') return renderEnglishChallengeStudy()
    if (activeTask.id in mathPracticeCatalog) return renderMathPracticeStudy()
    if (activeTask.id === 'math-challenge') return renderMathChallengeStudy()
    return activeTask.blocks.map((block) => renderTaskBlock(block))
  }

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
              <div className="topbar__title-wrap">
                <div className="topbar__title">{titleDate}</div>
                <div className="topbar__weekday">{weekdayLabel}</div>
              </div>
            </div>
            <div className="topbar__stats topbar__stats--home">
              <button
                type="button"
                className="calendar-toggle"
                aria-expanded={calendarOpen}
                onClick={() => setCalendarOpen((current) => !current)}
              >
                <span className={`status-dot status-dot--${todayStatus}`} />
                <CalendarDays size={14} />
                任务日历
              </button>
              <div className="mini-tag">
                <Star size={14} />
                {totalStars}
              </div>

              {calendarOpen && (
                <div className="calendar-flyout">
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
                        const isSelected = selectedDate === key
                        const isToday = todayKey === key
                        const hasHistory = (historyRecords[key] ?? []).length > 0
                        const cellStatus = isToday ? todayStatus : hasHistory ? 'done' : 'idle'

                        return (
                          <button
                            key={key}
                            type="button"
                            className={`calendar-cell ${isSelected ? 'is-selected' : ''} ${isToday ? 'is-today' : ''}`}
                            onClick={() => setSelectedDate(key)}
                          >
                            <span>{cell.getDate()}</span>
                            {cellStatus !== 'idle' ? (
                              <small className={`calendar-dot calendar-dot--${cellStatus}`} />
                            ) : (
                              <small />
                            )}
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
                </div>
              )}
            </div>
          </header>

          <div className="home-layout">
            <section className="home-section">
              <div className="home-section__title">成长角</div>
              <div className="home-section__grid">
                {summaryTiles.map((tile) => {
                  const content = (
                    <>
                      <div className="home-tile__top">
                        <span className="home-tile__glyph">{tile.glyph}</span>
                        <span className="home-tile__chip">{tile.badge}</span>
                      </div>
                      <div className="home-tile__art">
                        <span className="home-tile__mascot">{tile.mascot}</span>
                        <span className="home-tile__sticker home-tile__sticker--one">
                          {tile.stickers[0]}
                        </span>
                        <span className="home-tile__sticker home-tile__sticker--two">
                          {tile.stickers[1]}
                        </span>
                      </div>
                      <div className="home-tile__title">{tile.title}</div>
                      <div className="home-tile__value">{tile.value}</div>
                      <div className="home-tile__foot">
                        <span>{tile.caption}</span>
                        {tile.onClick ? <ChevronRight size={16} /> : null}
                      </div>
                    </>
                  )

                  if (tile.onClick) {
                    return (
                      <button
                        key={tile.id}
                        type="button"
                        className="home-tile home-tile--action"
                        style={{
                          '--tile-soft': tile.soft,
                          '--tile-accent': tile.accent,
                        }}
                        onClick={tile.onClick}
                      >
                        {content}
                      </button>
                    )
                  }

                  return (
                    <div
                      key={tile.id}
                      className="home-tile"
                      style={{
                        '--tile-soft': tile.soft,
                        '--tile-accent': tile.accent,
                      }}
                    >
                      {content}
                    </div>
                  )
                })}
              </div>
            </section>

            <section className="home-section">
              <div className="home-section__title">学习区</div>
              <div className="home-section__grid">
                {learningTiles.map((tile) => (
                  <button
                    key={tile.id}
                    type="button"
                    className="home-tile home-tile--action"
                    style={{
                      '--tile-soft': tile.soft,
                      '--tile-accent': tile.accent,
                    }}
                    onClick={tile.onClick}
                  >
                    <div className="home-tile__top">
                      <span className="home-tile__glyph">{tile.glyph}</span>
                      <div className="home-tile__meta">
                        <span className="home-tile__chip">{tile.badge}</span>
                        <span className={`status-dot status-dot--${tile.status}`} />
                      </div>
                    </div>
                    <div className="home-tile__art">
                      <span className="home-tile__mascot">{tile.mascot}</span>
                      <span className="home-tile__sticker home-tile__sticker--one">
                        {tile.stickers[0]}
                      </span>
                      <span className="home-tile__sticker home-tile__sticker--two">
                        {tile.stickers[1]}
                      </span>
                    </div>
                    <div className="home-tile__title">{tile.title}</div>
                    <div className="home-tile__value">{tile.value}</div>
                    <div className="home-tile__foot">
                      <span>{tile.caption}</span>
                      <ChevronRight size={16} />
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}

      {currentView === 'today' && (
        <div className="subject-page">
          <header className="page-bar">
            <button type="button" className="icon-back" aria-label="返回" onClick={handleBack}>
              <ArrowLeft size={20} />
            </button>
            <div className="page-bar__title">今日任务</div>
          </header>

          <div className="today-board">
            {subjectList.map((subject) => {
              const assignedIds = parentAssignments[subject.id] ?? []
              const assignedTasks = subject.tasks.filter((task) => assignedIds.includes(task.id))

              return (
                <section key={subject.id} className="today-section">
                  <div className="today-section__head">
                    <strong>{subject.name}</strong>
                    <span>{assignedTasks.length} 项</span>
                  </div>

                  <div className="task-stack">
                    {assignedTasks.length > 0 ? (
                      assignedTasks.map((task) => {
                        const done = checkedMap[subject.id]?.includes(task.id)
                        return (
                          <button
                            key={task.id}
                            type="button"
                            className={`task-tile ${done ? 'is-done' : ''}`}
                            onClick={() => openTask(subject.id, task.id, 'today')}
                          >
                            <div className="task-tile__main">
                              <strong>{task.title}</strong>
                              <span>{task.brief}</span>
                            </div>
                            <div className="task-tile__side">
                              {done ? null : <CirclePlay size={18} />}
                            </div>
                            {done ? <span className="task-tile__stamp">毕</span> : null}
                          </button>
                        )
                      })
                    ) : (
                      <div className="today-empty">暂无作业</div>
                    )}
                  </div>
                </section>
              )
            })}
          </div>
        </div>
      )}

      {currentView === 'assign' && (
        <div className="subject-page">
          <header className="page-bar">
            <button type="button" className="icon-back" aria-label="返回" onClick={handleBack}>
              <ArrowLeft size={20} />
            </button>
            <div className="page-bar__title">家长派发</div>
          </header>

          <div className="assign-board">
            {subjectList.map((subject) => (
              <section key={subject.id} className="assign-section">
                <div className="assign-section__head">
                  <strong>{subject.name}</strong>
                  <span>{(parentAssignments[subject.id] ?? []).length} 项作业</span>
                </div>

                <div className="assign-list">
                  {subject.tasks.map((task) => {
                    const active = (parentAssignments[subject.id] ?? []).includes(task.id)
                    const banks = getTaskBanks(task.id)
                    const performance = getTaskPerformance(task.id)
                    const selectedBankId = selectedBankByTask[task.id] ?? banks[0]?.id ?? ''

                    return (
                      <article
                        key={task.id}
                        className={`assign-card ${active ? 'is-active' : ''}`}
                        style={{
                          '--assign-accent': subject.accent,
                          '--assign-soft': subject.soft,
                        }}
                      >
                        <div className="assign-card__head">
                          <div className="assign-card__title-wrap">
                            <strong>{task.title}</strong>
                            <span>{task.brief}</span>
                          </div>
                          <button
                            type="button"
                            className={`assign-toggle ${active ? 'is-active' : ''}`}
                            onClick={() => toggleAssignedTask(subject.id, task.id)}
                          >
                            {active ? '已布置' : '未布置'}
                          </button>
                        </div>

                        <div className="assign-bank-list">
                          {banks.map((bank) => (
                            <button
                              key={bank.id}
                              type="button"
                              className={`assign-bank ${selectedBankId === bank.id ? 'is-active' : ''}`}
                              onClick={() => selectTaskBank(task.id, bank.id)}
                            >
                              <span>{bank.name}</span>
                              <small>{bank.count}题</small>
                            </button>
                          ))}
                        </div>

                        <div className="assign-insights">
                          <section className="assign-insight">
                            <div className="assign-insight__title">一直不会错的</div>
                            <div className="assign-tag-list">
                              {performance.solid.map((item) => (
                                <span key={item} className="assign-tag assign-tag--solid">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </section>

                          <section className="assign-insight">
                            <div className="assign-insight__title">易错的</div>
                            <div className="assign-tag-list">
                              {performance.risky.map((item) => (
                                <span key={item} className="assign-tag assign-tag--risky">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </section>

                          <section className="assign-insight">
                            <div className="assign-insight__title">高频错误</div>
                            <div className="assign-tag-list">
                              {performance.frequent.map((item) => (
                                <span key={item} className="assign-tag assign-tag--frequent">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </section>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </section>
            ))}
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
                    {done ? null : <CirclePlay size={18} />}
                  </div>
                  {done ? <span className="task-tile__stamp">毕</span> : null}
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
          </header>

          <div className="study-sheet">{renderActiveStudyContent()}</div>

          <div className="study-actions">
            {activeTask.id === 'hanzi' ? (
              <div className={`hanzi-actions ${hanziPageIndex === hanziLessonPages.length - 1 ? 'is-final' : ''}`}>
                {hanziPageIndex === hanziLessonPages.length - 1 ? (
                  <div className="hanzi-footer-final">
                    <button
                      type="button"
                      className="hanzi-nav__button"
                      aria-label="上一个字"
                      onClick={() => goToHanziPage(hanziPageIndex - 1)}
                    >
                      <ChevronLeft size={18} />
                    </button>

                    <div className="hanzi-page-indicator">
                      {`${hanziPageIndex + 1} / ${hanziLessonPages.length}`}
                    </div>

                    <div className="hanzi-submit-panel">
                      <div className="hanzi-submit-stats">
                        <span>{`完成进度 ${hanziCompletionPercent}%`}</span>
                        <span>{`平均评分 ${hanziAverageScore}分`}</span>
                      </div>
                      <button
                        type="button"
                        className={`complete-button ${checkedMap[activeSubject.id]?.includes(activeTask.id) ? 'is-done' : ''}`}
                        onClick={completeTask}
                      >
                        {checkedMap[activeSubject.id]?.includes(activeTask.id) ? '已提交' : '提交'}
                      </button>
                    </div>

                    <button
                      type="button"
                      className="hanzi-nav__button"
                      aria-label="下一个字"
                      disabled
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="hanzi-nav">
                    <button
                      type="button"
                      className="hanzi-nav__button"
                      aria-label="上一个字"
                      disabled={hanziPageIndex === 0}
                      onClick={() => goToHanziPage(hanziPageIndex - 1)}
                    >
                      <ChevronLeft size={18} />
                    </button>

                    <div className="hanzi-page-indicator">
                      {`${hanziPageIndex + 1} / ${hanziLessonPages.length}`}
                    </div>

                    <button
                      type="button"
                      className="hanzi-nav__button"
                      aria-label="下一个字"
                      disabled={hanziPageIndex === hanziLessonPages.length - 1}
                      onClick={() => goToHanziPage(hanziPageIndex + 1)}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </div>
            ) : activeTask.id in mathPracticeCatalog ? (
              <div className="hanzi-actions">
                <div className="hanzi-nav">
                  <button
                    type="button"
                    className="hanzi-nav__button"
                    aria-label="上一题"
                    disabled={mathPageIndex === 0}
                    onClick={() => setMathPageIndex((current) => Math.max(0, current - 1))}
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <div className="hanzi-page-indicator">
                    {`${mathPageIndex + 1} / ${currentMathPractice?.questions.length ?? 0}`}
                  </div>

                  <button
                    type="button"
                    className="hanzi-nav__button"
                    aria-label="下一题"
                    disabled={mathPageIndex === (currentMathPractice?.questions.length ?? 1) - 1}
                    onClick={() =>
                      setMathPageIndex((current) =>
                        Math.min((currentMathPractice?.questions.length ?? 1) - 1, current + 1),
                      )
                    }
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                {mathPageIndex === (currentMathPractice?.questions.length ?? 1) - 1 ? (
                  <div className="hanzi-submit-panel">
                    <div className="hanzi-submit-stats">
                      {currentMathPractice?.answerType === 'single' ? (
                        <>
                          <span>{`完成进度 ${mathAnsweredCount}/${currentMathPractice?.questions.length ?? 0}`}</span>
                          <span>{`平均评分 ${mathAverageScore}分`}</span>
                        </>
                      ) : (
                        <>
                          <span>{`完成进度 ${remainderAnsweredCount}/${currentMathPractice?.questions.length ?? 0}`}</span>
                          <span>{`平均评分 ${remainderAverageScore}分`}</span>
                        </>
                      )}
                    </div>
                    <button
                      type="button"
                      className={`complete-button ${checkedMap[activeSubject.id]?.includes(activeTask.id) ? 'is-done' : ''}`}
                      disabled={currentMathPractice?.answerType === 'single' ? !mathReadyToFinish : !remainderReadyToFinish}
                      onClick={completeTask}
                    >
                      {checkedMap[activeSubject.id]?.includes(activeTask.id)
                        ? '已完成'
                        : currentMathPractice?.answerType === 'single'
                          ? mathReadyToFinish
                            ? '完成打卡'
                            : `答完${currentMathPractice?.questions.length ?? 0}题后可打卡`
                          : remainderReadyToFinish
                            ? '完成打卡'
                            : `答完${currentMathPractice?.questions.length ?? 0}题后可打卡`}
                    </button>
                  </div>
                ) : null}
              </div>
            ) : activeTask.id === 'dictation' ? (
              <button
                type="button"
                className={`complete-button ${checkedMap[activeSubject.id]?.includes(activeTask.id) ? 'is-done' : ''}`}
                disabled={!dictationReadyToFinish}
                onClick={completeTask}
              >
                {checkedMap[activeSubject.id]?.includes(activeTask.id)
                  ? '已完成'
                  : dictationReadyToFinish
                    ? '完成打卡'
                    : '完成全部听写后可打卡'}
              </button>
            ) : activeTask.id === 'phrases' ? (
              <button
                type="button"
                className={`complete-button ${checkedMap[activeSubject.id]?.includes(activeTask.id) ? 'is-done' : ''}`}
                disabled={!phraseReadyToFinish}
                onClick={completeTask}
              >
                {checkedMap[activeSubject.id]?.includes(activeTask.id)
                  ? '已完成'
                  : phraseReadyToFinish
                    ? '完成打卡'
                    : '全部打钩后可打卡'}
              </button>
            ) : activeTask.id === 'picture-writing' ? (
              <button
                type="button"
                className={`complete-button ${checkedMap[activeSubject.id]?.includes(activeTask.id) ? 'is-done' : ''}`}
                disabled={!pictureWritingReadyToFinish}
                onClick={completeTask}
              >
                {checkedMap[activeSubject.id]?.includes(activeTask.id)
                  ? '已完成'
                  : pictureWritingReadyToFinish
                    ? '完成打卡'
                    : '上传后可打卡'}
              </button>
            ) : activeTask.id === 'challenge' ? (
              <button
                type="button"
                className={`complete-button ${checkedMap[activeSubject.id]?.includes(activeTask.id) ? 'is-done' : ''}`}
                disabled={!chineseChallengeReadyToFinish}
                onClick={completeTask}
              >
                {checkedMap[activeSubject.id]?.includes(activeTask.id)
                  ? '已完成'
                  : chineseChallengeReadyToFinish
                    ? '完成打卡'
                    : '上传后可打卡'}
              </button>
            ) : activeTask.id === 'math-challenge' ? (
              <button
                type="button"
                className={`complete-button ${checkedMap[activeSubject.id]?.includes(activeTask.id) ? 'is-done' : ''}`}
                disabled={!mathChallengeReadyToFinish}
                onClick={completeTask}
              >
                {checkedMap[activeSubject.id]?.includes(activeTask.id)
                  ? '已完成'
                  : mathChallengeReadyToFinish
                    ? '完成打卡'
                    : '答完3题后可打卡'}
              </button>
            ) : (
              <button
                type="button"
                className={`complete-button ${checkedMap[activeSubject.id]?.includes(activeTask.id) ? 'is-done' : ''}`}
                onClick={completeTask}
              >
                {checkedMap[activeSubject.id]?.includes(activeTask.id) ? '已完成' : '完成打卡'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
