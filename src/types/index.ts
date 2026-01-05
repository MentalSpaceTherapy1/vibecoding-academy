// User types
export interface User {
  id: string
  email: string
  displayName: string
  avatarUrl?: string
  bio?: string
  createdAt: Date
  updatedAt: Date
}

export interface UserProgress {
  id: string
  userId: string
  totalXp: number
  currentLevel: number
  currentStreak: number
  longestStreak: number
  lastActivityDate: Date
  streakFreezeCount: number
}

// Curriculum types
export interface Phase {
  id: string
  number: number
  title: string
  description: string
  durationWeeks: number
  chapters: Chapter[]
}

export interface Chapter {
  id: string
  phaseId: string
  number: number
  title: string
  description: string
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  chapterId: string
  orderIndex: number
  title: string
  description: string
  contentType: 'video' | 'text' | 'interactive'
  durationMinutes: number
  xpReward: number
  content?: LessonContent
}

export interface LessonContent {
  id: string
  lessonId: string
  videoUrl?: string
  transcriptUrl?: string
  markdownContent?: string
  codeExamples?: CodeExample[]
  quiz?: Quiz
  exercise?: Exercise
}

export interface CodeExample {
  id: string
  language: string
  title: string
  code: string
  explanation?: string
}

export interface Quiz {
  id: string
  questions: QuizQuestion[]
}

export interface QuizQuestion {
  id: string
  text: string
  type: 'multiple-choice' | 'true-false' | 'code-completion'
  options: string[]
  correctAnswer: number | number[]
  explanation: string
}

export interface Exercise {
  id: string
  title: string
  description: string
  acceptanceCriteria: string[]
  hints: string[]
  solutionCode: string
  starterCode?: string
}

// Progress types
export interface UserLessonProgress {
  id: string
  userId: string
  lessonId: string
  status: 'not_started' | 'in_progress' | 'completed'
  progressPercent: number
  xpEarned: number
  completedAt?: Date
  timeSpentSeconds: number
}

// Gamification types
export type BadgeRarity = 'common' | 'rare' | 'epic' | 'legendary'

export interface Badge {
  id: string
  name: string
  description: string
  iconUrl: string
  rarity: BadgeRarity
  criteria: BadgeCriteria
  xpReward: number
}

export interface BadgeCriteria {
  type: 'lesson_complete' | 'streak' | 'xp' | 'project' | 'quiz' | 'community'
  threshold: number
  additionalConditions?: Record<string, unknown>
}

export interface UserBadge {
  id: string
  userId: string
  badgeId: string
  earnedAt: Date
  badge: Badge
}

export type LeagueTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond'

export interface League {
  id: string
  tier: LeagueTier
  weekStart: Date
  weekEnd: Date
  users: LeagueUser[]
}

export interface LeagueUser {
  userId: string
  rank: number
  weeklyXp: number
  user: Pick<User, 'displayName' | 'avatarUrl'>
}

// Project types
export type ProjectType = 'web1' | 'web2' | 'mobile'
export type ProjectStatus = 'draft' | 'submitted' | 'approved' | 'rejected'

export interface Project {
  id: string
  userId: string
  type: ProjectType
  title: string
  description: string
  repositoryUrl?: string
  liveUrl?: string
  status: ProjectStatus
  submittedAt?: Date
  reviewedAt?: Date
  grade?: string
  feedback?: ProjectFeedback[]
}

export interface ProjectFeedback {
  id: string
  projectId: string
  reviewerId: string
  rating: number
  comment: string
  createdAt: Date
}

// Certificate types
export interface Certificate {
  id: string
  uniqueId: string
  userId: string
  issuedAt: Date
  verificationUrl: string
  pdfUrl: string
  projects: Pick<Project, 'id' | 'title' | 'liveUrl'>[]
}

// Community types
export interface ForumCategory {
  id: string
  name: string
  description: string
  icon: string
  threadCount: number
}

export interface ForumThread {
  id: string
  categoryId: string
  authorId: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
  replyCount: number
  viewCount: number
  isPinned: boolean
  isSolved: boolean
  author: Pick<User, 'displayName' | 'avatarUrl'>
}

export interface ForumReply {
  id: string
  threadId: string
  authorId: string
  content: string
  createdAt: Date
  updatedAt: Date
  upvotes: number
  isAccepted: boolean
  author: Pick<User, 'displayName' | 'avatarUrl'>
}

// XP Activity types
export interface XPActivity {
  id: string
  userId: string
  amount: number
  source: XPSource
  description: string
  createdAt: Date
}

export type XPSource =
  | 'lesson_complete'
  | 'quiz_complete'
  | 'quiz_perfect'
  | 'exercise_complete'
  | 'project_milestone'
  | 'daily_login'
  | 'streak_bonus'
  | 'community_help'
  | 'badge_earned'

// Notification types
export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  link?: string
  isRead: boolean
  createdAt: Date
}

export type NotificationType =
  | 'achievement'
  | 'level_up'
  | 'streak_warning'
  | 'streak_lost'
  | 'project_review'
  | 'forum_reply'
  | 'friend_activity'
  | 'system'
