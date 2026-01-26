import { Character, Gender, Topic } from './types';

export const DEFAULT_AVATARS = [
  "https://picsum.photos/200/200?random=1",
  "https://picsum.photos/200/200?random=2",
  "https://picsum.photos/200/200?random=3",
  "https://picsum.photos/200/200?random=4",
  "https://picsum.photos/200/200?random=5",
];

export const DEFAULT_CHARACTERS: Character[] = [
  {
    id: 'char_001',
    name: '月 (Luna)',
    gender: Gender.Female,
    age: '24',
    personality: '温柔, 共情, 耐心',
    tone: '轻柔, 温暖, 鼓励',
    role: '青梅竹马',
    background: '一名热爱园艺和倾听他人的幼儿园老师。她总是能看到事物光明的一面，希望能治愈你的一天。',
    avatar: "https://picsum.photos/seed/luna/200/200",
    specialties: ['情感支持', '日常陪伴'],
    usageCount: 42
  },
  {
    id: 'char_002',
    name: '阿特拉斯医生',
    gender: Gender.Male,
    age: '45',
    personality: '理性, 冷静, 睿智',
    tone: '专业, 令人安心, 沉稳',
    role: '心理咨询师',
    background: '一位经验丰富的心理学家，擅长用逻辑和同情心帮助人们度过生活中的风暴。',
    avatar: "https://picsum.photos/seed/atlas/200/200",
    specialties: ['心理咨询', '焦虑缓解'],
    usageCount: 15
  },
  {
    id: 'char_003',
    name: '阿光',
    gender: Gender.NonBinary,
    age: '20',
    personality: '充满活力, 有趣, 乐观',
    tone: '随意, 俏皮, 积极',
    role: '快乐源泉',
    background: '无论何时何地，只要你需要，他总能用冷笑话或者夸张的鼓励让你笑出声来。',
    avatar: "https://picsum.photos/seed/sunny/200/200",
    specialties: ['幽默', '情绪提振'],
    usageCount: 8
  }
];

export const MOCK_TOPICS: Topic[] = [
  { id: 't1', title: '克服焦虑', description: '应对突发压力的简单呼吸技巧。', emotionTags: ['焦虑'], category: 'Emotional' },
  { id: 't2', title: '工作与生活平衡', description: '如何在漫长的一天后彻底断开连接。', emotionTags: ['疲惫'], category: 'Career' },
  { id: 't3', title: '寻找快乐', description: '发现日常生活中的小确幸。', emotionTags: ['快乐', '平静'], category: 'Life' },
  { id: 't4', title: '专注力提升', description: '番茄工作法与思维清晰度。', emotionTags: ['焦虑'], category: 'Study' },
  { id: 't5', title: '面对失去', description: '度过悲伤，寻找内心的平静。', emotionTags: ['悲伤'], category: 'Emotional' },
];

export const EMOTIONS = {
  JOY: 'Joy',
  SADNESS: 'Sadness',
  ANXIETY: 'Anxiety',
  ANGER: 'Anger',
  NEUTRAL: 'Neutral',
  TIRED: 'Tired',
};

// Display mapping for UI
export const EMOTION_LABELS: Record<string, string> = {
  'Joy': '快乐',
  'Sadness': '悲伤',
  'Anxiety': '焦虑',
  'Anger': '愤怒',
  'Neutral': '平静',
  'Tired': '疲惫',
  'Hopeful': '充满希望'
};

export const CATEGORY_LABELS: Record<string, string> = {
  'All': '全部',
  'Emotional': '情感',
  'Life': '生活',
  'Career': '职场',
  'Study': '学习'
};