'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Trophy,
  Flame,
  Star,
  ChevronRight,
  Play,
  Clock,
  Target,
  TrendingUp,
  LogOut,
  Settings,
  User,
  Sun,
  Moon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { useTheme } from 'next-themes'
import type { User as SupabaseUser } from '@supabase/supabase-js'

// Mock data for demonstration
const MOCK_STATS = {
  totalXP: 1250,
  currentLevel: 5,
  currentStreak: 7,
  lessonsCompleted: 12,
  totalLessons: 49,
  badgesEarned: 4,
  weeklyGoal: 500,
  weeklyProgress: 350,
}

const RECENT_LESSONS = [
  {
    id: '1',
    title: 'Introduction to Vibe Coding',
    phase: 'Phase 1',
    chapter: 'Chapter 1',
    progress: 100,
    xp: 50,
    duration: '10 min',
  },
  {
    id: '2',
    title: 'Setting Up Your AI Tools',
    phase: 'Phase 1',
    chapter: 'Chapter 2',
    progress: 75,
    xp: 75,
    duration: '15 min',
  },
  {
    id: '3',
    title: 'Your First Prompt',
    phase: 'Phase 1',
    chapter: 'Chapter 3',
    progress: 0,
    xp: 100,
    duration: '20 min',
  },
]

const RECENT_BADGES = [
  { id: '1', name: 'First Steps', icon: '🚀', rarity: 'common' },
  { id: '2', name: 'Week Warrior', icon: '🔥', rarity: 'rare' },
  { id: '3', name: 'Quick Learner', icon: '⚡', rarity: 'common' },
  { id: '4', name: 'Early Bird', icon: '🌅', rarity: 'rare' },
]

export default function DashboardPage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      setUser(user)
      setLoading(false)
    }

    checkUser()
  }, [router])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    toast.success('Signed out successfully')
    router.push('/')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    )
  }

  const userDisplayName = user?.user_metadata?.full_name || user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'Learner'
  const userInitials = userDisplayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <span className="font-bold text-xl hidden sm:block">
              <span className="text-gradient">Vibe</span>Coding
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-primary">
              Dashboard
            </Link>
            <Link href="/learn" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Learn
            </Link>
            <Link href="/projects" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link href="/community" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Community
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {/* XP Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/30">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">{MOCK_STATS.totalXP.toLocaleString()} XP</span>
            </div>

            {/* Streak Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-400/20 to-red-400/20 border border-orange-400/30">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-bold text-orange-600 dark:text-orange-400">{MOCK_STATS.currentStreak}</span>
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.user_metadata?.avatar_url} alt={userDisplayName} />
                    <AvatarFallback className="gradient-hero text-white">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userDisplayName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {userDisplayName.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground">
            You&apos;re on a {MOCK_STATS.currentStreak}-day streak! Keep up the great work.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="hover-lift">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-400/20">
                  <Star className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{MOCK_STATS.totalXP.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total XP</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20">
                  <TrendingUp className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">Level {MOCK_STATS.currentLevel}</p>
                  <p className="text-sm text-muted-foreground">Current Level</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-gradient-to-br from-orange-400/20 to-red-400/20">
                  <Flame className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{MOCK_STATS.currentStreak} days</p>
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-gradient-to-br from-emerald-400/20 to-cyan-400/20">
                  <Trophy className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{MOCK_STATS.badgesEarned}</p>
                  <p className="text-sm text-muted-foreground">Badges Earned</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Continue Learning */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Course Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Course Progress
                </CardTitle>
                <CardDescription>
                  {MOCK_STATS.lessonsCompleted} of {MOCK_STATS.totalLessons} lessons completed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Progress</span>
                      <span className="font-medium">{Math.round((MOCK_STATS.lessonsCompleted / MOCK_STATS.totalLessons) * 100)}%</span>
                    </div>
                    <Progress value={(MOCK_STATS.lessonsCompleted / MOCK_STATS.totalLessons) * 100} className="h-3" />
                  </div>
                  <Button className="w-full gradient-hero border-0" size="lg">
                    <Play className="w-5 h-5 mr-2" />
                    Continue Learning
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Lessons */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Lessons</CardTitle>
                  <Link href="/learn">
                    <Button variant="ghost" size="sm">
                      View All
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {RECENT_LESSONS.map((lesson, index) => (
                  <motion.div
                    key={lesson.id}
                    className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      lesson.progress === 100
                        ? 'bg-emerald-100 dark:bg-emerald-900/30'
                        : lesson.progress > 0
                          ? 'bg-blue-100 dark:bg-blue-900/30'
                          : 'bg-muted'
                    }`}>
                      {lesson.progress === 100 ? (
                        <Trophy className="w-6 h-6 text-emerald-600" />
                      ) : (
                        <Play className={`w-6 h-6 ${lesson.progress > 0 ? 'text-blue-600' : 'text-muted-foreground'}`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{lesson.title}</h4>
                      <p className="text-sm text-muted-foreground">{lesson.phase} • {lesson.chapter}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm font-medium text-yellow-600">
                        <Star className="w-4 h-4" />
                        {lesson.xp} XP
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {lesson.duration}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Sidebar */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Weekly Goal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Weekly Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold">{MOCK_STATS.weeklyProgress}</p>
                    <p className="text-sm text-muted-foreground">of {MOCK_STATS.weeklyGoal} XP</p>
                  </div>
                  <Progress value={(MOCK_STATS.weeklyProgress / MOCK_STATS.weeklyGoal) * 100} className="h-3" />
                  <p className="text-sm text-center text-muted-foreground">
                    {MOCK_STATS.weeklyGoal - MOCK_STATS.weeklyProgress} XP to reach your weekly goal
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Badges */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Recent Badges
                  </CardTitle>
                  <Link href="/profile?tab=badges">
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {RECENT_BADGES.map((badge, index) => (
                    <motion.div
                      key={badge.id}
                      className="flex flex-col items-center p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <span className="text-3xl mb-2">{badge.icon}</span>
                      <span className="text-sm font-medium text-center">{badge.name}</span>
                      <span className={`text-xs capitalize ${
                        badge.rarity === 'rare' ? 'text-blue-500' : 'text-muted-foreground'
                      }`}>
                        {badge.rarity}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
