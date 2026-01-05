'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  User,
  Trophy,
  Flame,
  Star,
  Calendar,
  MapPin,
  Link as LinkIcon,
  Github,
  Twitter,
  Edit,
  Settings,
  Sun,
  Moon,
  LogOut,
  BookOpen,
  Code,
  Award,
  TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from 'next-themes'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'

// Mock user data
const USER_STATS = {
  totalXP: 1250,
  currentLevel: 5,
  xpToNextLevel: 250,
  xpForCurrentLevel: 1000,
  currentStreak: 7,
  longestStreak: 14,
  lessonsCompleted: 12,
  projectsCompleted: 0,
  badgesEarned: 4,
  joinDate: 'December 2024',
  location: 'New York, USA',
}

const ALL_BADGES = [
  { id: '1', name: 'First Steps', description: 'Complete your first lesson', icon: '🚀', rarity: 'common', earned: true, earnedDate: 'Dec 15, 2024' },
  { id: '2', name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '🔥', rarity: 'rare', earned: true, earnedDate: 'Dec 22, 2024' },
  { id: '3', name: 'Quick Learner', description: 'Complete 5 lessons in one day', icon: '⚡', rarity: 'common', earned: true, earnedDate: 'Dec 18, 2024' },
  { id: '4', name: 'Early Bird', description: 'Study before 7 AM', icon: '🌅', rarity: 'rare', earned: true, earnedDate: 'Dec 20, 2024' },
  { id: '5', name: 'Night Owl', description: 'Study after 11 PM', icon: '🦉', rarity: 'common', earned: false },
  { id: '6', name: 'Code Master', description: 'Complete 25 lessons', icon: '💻', rarity: 'epic', earned: false },
  { id: '7', name: 'Project Pro', description: 'Complete your first project', icon: '📦', rarity: 'rare', earned: false },
  { id: '8', name: 'Full Stack Hero', description: 'Complete all projects', icon: '🦸', rarity: 'legendary', earned: false },
  { id: '9', name: 'Month Master', description: 'Maintain a 30-day streak', icon: '📅', rarity: 'epic', earned: false },
  { id: '10', name: 'Community Champion', description: 'Help 10 other students', icon: '🤝', rarity: 'rare', earned: false },
  { id: '11', name: 'Bug Hunter', description: 'Report a bug that gets fixed', icon: '🐛', rarity: 'rare', earned: false },
  { id: '12', name: 'Certified Developer', description: 'Earn your certificate', icon: '🎓', rarity: 'legendary', earned: false },
]

const ACTIVITY_FEED = [
  { id: '1', type: 'lesson', title: 'Completed "Setting Up Your AI Tools"', xp: 75, date: '2 hours ago' },
  { id: '2', type: 'badge', title: 'Earned "Week Warrior" badge', date: 'Yesterday' },
  { id: '3', type: 'streak', title: 'Extended streak to 7 days', date: 'Yesterday' },
  { id: '4', type: 'lesson', title: 'Completed "Introduction to Vibe Coding"', xp: 50, date: '2 days ago' },
  { id: '5', type: 'badge', title: 'Earned "Quick Learner" badge', date: '3 days ago' },
]

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'common':
      return 'border-slate-300 dark:border-slate-600'
    case 'rare':
      return 'border-blue-400 dark:border-blue-500'
    case 'epic':
      return 'border-purple-400 dark:border-purple-500'
    case 'legendary':
      return 'border-yellow-400 dark:border-yellow-500'
    default:
      return 'border-slate-300'
  }
}

const getRarityBadge = (rarity: string) => {
  switch (rarity) {
    case 'common':
      return <Badge variant="secondary">Common</Badge>
    case 'rare':
      return <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">Rare</Badge>
    case 'epic':
      return <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">Epic</Badge>
    case 'legendary':
      return <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">Legendary</Badge>
    default:
      return <Badge variant="secondary">Common</Badge>
  }
}

export default function ProfilePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { theme, setTheme } = useTheme()
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview')

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
  const levelProgress = ((USER_STATS.totalXP - USER_STATS.xpForCurrentLevel) / USER_STATS.xpToNextLevel) * 100

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
            <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.user_metadata?.avatar_url} alt={userDisplayName} />
                    <AvatarFallback className="gradient-hero text-white">{userInitials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile"><User className="mr-2 h-4 w-4" />Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings"><Settings className="mr-2 h-4 w-4" />Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Profile Header */}
      <div className="border-b bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            className="flex flex-col md:flex-row items-center md:items-start gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-background shadow-xl">
              <AvatarImage src={user?.user_metadata?.avatar_url} alt={userDisplayName} />
              <AvatarFallback className="gradient-hero text-white text-3xl font-bold">{userInitials}</AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                <h1 className="text-3xl font-bold">{userDisplayName}</h1>
                <Badge className="w-fit mx-auto md:mx-0 gradient-hero text-white border-0">
                  Level {USER_STATS.currentLevel}
                </Badge>
              </div>
              <p className="text-muted-foreground mb-4">{user?.email}</p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {USER_STATS.joinDate}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {USER_STATS.location}
                </span>
              </div>

              <div className="flex justify-center md:justify-start gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/settings">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Link>
                </Button>
              </div>
            </div>

            {/* Stats Summary */}
            <div className="flex gap-6 mt-4 md:mt-0">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{USER_STATS.totalXP.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total XP</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{USER_STATS.currentStreak}</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{USER_STATS.badgesEarned}</p>
                <p className="text-xs text-muted-foreground">Badges</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-lg grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Level Progress */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Level Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Level {USER_STATS.currentLevel}</span>
                      <span className="text-sm">Level {USER_STATS.currentLevel + 1}</span>
                    </div>
                    <Progress value={levelProgress} className="h-3 mb-2" />
                    <p className="text-sm text-muted-foreground text-center">
                      {USER_STATS.xpToNextLevel - (USER_STATS.totalXP - USER_STATS.xpForCurrentLevel)} XP to next level
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                        <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xl font-bold">{USER_STATS.lessonsCompleted}</p>
                        <p className="text-xs text-muted-foreground">Lessons</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                        <Code className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-xl font-bold">{USER_STATS.projectsCompleted}</p>
                        <p className="text-xs text-muted-foreground">Projects</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                        <Flame className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <p className="text-xl font-bold">{USER_STATS.longestStreak}</p>
                        <p className="text-xs text-muted-foreground">Best Streak</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                        <Trophy className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-xl font-bold">{USER_STATS.badgesEarned}</p>
                        <p className="text-xs text-muted-foreground">Badges</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Featured Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5" />
                      Featured Badges
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab('badges')}>
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {ALL_BADGES.filter((b) => b.earned).slice(0, 4).map((badge) => (
                      <div
                        key={badge.id}
                        className={`flex flex-col items-center p-4 rounded-lg border-2 ${getRarityColor(badge.rarity)}`}
                      >
                        <span className="text-4xl mb-2">{badge.icon}</span>
                        <span className="text-sm font-medium text-center">{badge.name}</span>
                        {getRarityBadge(badge.rarity)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {ALL_BADGES.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className={`${!badge.earned ? 'opacity-50 grayscale' : ''} ${getRarityColor(badge.rarity)} border-2`}>
                    <CardContent className="pt-6 text-center">
                      <span className="text-5xl block mb-3">{badge.icon}</span>
                      <h3 className="font-semibold mb-1">{badge.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
                      {getRarityBadge(badge.rarity)}
                      {badge.earned && badge.earnedDate && (
                        <p className="text-xs text-muted-foreground mt-2">Earned {badge.earnedDate}</p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-4">
            {ACTIVITY_FEED.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card>
                  <CardContent className="py-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'lesson' ? 'bg-blue-100 dark:bg-blue-900/30' :
                        activity.type === 'badge' ? 'bg-purple-100 dark:bg-purple-900/30' :
                        'bg-orange-100 dark:bg-orange-900/30'
                      }`}>
                        {activity.type === 'lesson' ? <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" /> :
                         activity.type === 'badge' ? <Trophy className="w-5 h-5 text-purple-600 dark:text-purple-400" /> :
                         <Flame className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.date}</p>
                      </div>
                      {activity.xp && (
                        <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
                          +{activity.xp} XP
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
