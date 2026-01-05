'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Users,
  MessageSquare,
  Trophy,
  Flame,
  Star,
  ThumbsUp,
  MessageCircle,
  Clock,
  TrendingUp,
  Search,
  Filter,
  Plus,
  Sun,
  Moon,
  LogOut,
  Settings,
  User,
  Crown,
  Medal,
  Award
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
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

// Forum posts
const FORUM_POSTS = [
  {
    id: '1',
    title: 'How to structure prompts for complex features?',
    author: { name: 'Sarah Chen', avatar: null, initials: 'SC', level: 8 },
    category: 'General',
    replies: 12,
    likes: 24,
    views: 156,
    lastActivity: '2 hours ago',
    isPinned: true,
  },
  {
    id: '2',
    title: 'Best practices for using Claude Code with React',
    author: { name: 'Mike Johnson', avatar: null, initials: 'MJ', level: 12 },
    category: 'Claude Code',
    replies: 8,
    likes: 31,
    views: 203,
    lastActivity: '4 hours ago',
    isPinned: true,
  },
  {
    id: '3',
    title: 'Stuck on Chapter 5 - Need help with API calls',
    author: { name: 'Emily Davis', avatar: null, initials: 'ED', level: 4 },
    category: 'Help',
    replies: 5,
    likes: 3,
    views: 45,
    lastActivity: '6 hours ago',
    isPinned: false,
  },
  {
    id: '4',
    title: 'Share your Task Dashboard project!',
    author: { name: 'Alex Kim', avatar: null, initials: 'AK', level: 15 },
    category: 'Projects',
    replies: 23,
    likes: 45,
    views: 312,
    lastActivity: '8 hours ago',
    isPinned: false,
  },
  {
    id: '5',
    title: 'Tips for maintaining a long streak',
    author: { name: 'Jordan Lee', avatar: null, initials: 'JL', level: 20 },
    category: 'General',
    replies: 15,
    likes: 67,
    views: 421,
    lastActivity: '1 day ago',
    isPinned: false,
  },
]

// Leaderboard data
const LEADERBOARD = [
  { rank: 1, name: 'Jordan Lee', initials: 'JL', xp: 15420, level: 20, streak: 45, badge: 'gold' },
  { rank: 2, name: 'Alex Kim', initials: 'AK', xp: 12350, level: 15, streak: 32, badge: 'silver' },
  { rank: 3, name: 'Mike Johnson', initials: 'MJ', xp: 9870, level: 12, streak: 28, badge: 'bronze' },
  { rank: 4, name: 'Sarah Chen', initials: 'SC', xp: 7650, level: 8, streak: 21, badge: null },
  { rank: 5, name: 'Emily Davis', initials: 'ED', xp: 5230, level: 6, streak: 14, badge: null },
  { rank: 6, name: 'Chris Wong', initials: 'CW', xp: 4120, level: 5, streak: 7, badge: null },
  { rank: 7, name: 'Taylor Brown', initials: 'TB', xp: 3540, level: 4, streak: 5, badge: null },
  { rank: 8, name: 'Sam Wilson', initials: 'SW', xp: 2890, level: 4, streak: 3, badge: null },
  { rank: 9, name: 'You', initials: 'EJ', xp: 1250, level: 5, streak: 7, badge: null, isCurrentUser: true },
  { rank: 10, name: 'Pat Miller', initials: 'PM', xp: 980, level: 2, streak: 2, badge: null },
]

// Study groups
const STUDY_GROUPS = [
  {
    id: '1',
    name: 'React Enthusiasts',
    description: 'Learn React together with AI tools',
    members: 24,
    lastActive: '1 hour ago',
    category: 'Technology',
  },
  {
    id: '2',
    name: 'Beginner Coders',
    description: 'Support group for those just starting out',
    members: 56,
    lastActive: '30 min ago',
    category: 'Skill Level',
  },
  {
    id: '3',
    name: 'Mobile Dev Squad',
    description: 'Building mobile apps with AI assistance',
    members: 18,
    lastActive: '3 hours ago',
    category: 'Technology',
  },
]

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'General':
      return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
    case 'Claude Code':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
    case 'Help':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
    case 'Projects':
      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
    default:
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
  }
}

const getRankBadge = (badge: string | null) => {
  switch (badge) {
    case 'gold':
      return <Crown className="w-5 h-5 text-yellow-500" />
    case 'silver':
      return <Medal className="w-5 h-5 text-slate-400" />
    case 'bronze':
      return <Award className="w-5 h-5 text-amber-600" />
    default:
      return null
  }
}

export default function CommunityPage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState('forum')
  const [searchQuery, setSearchQuery] = useState('')

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    toast.success('Signed out successfully')
    router.push('/')
    router.refresh()
  }

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
            <Link href="/community" className="text-sm font-medium text-primary">
              Community
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/30">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">1,250 XP</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-400/20 to-red-400/20 border border-orange-400/30">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-bold text-orange-600 dark:text-orange-400">7</span>
            </div>

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
                    <AvatarFallback className="gradient-hero text-white">EJ</AvatarFallback>
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Users className="w-8 h-8" />
            Community
          </h1>
          <p className="text-muted-foreground">
            Connect with fellow learners, share your progress, and get help
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="forum">Forum</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              <TabsTrigger value="groups">Study Groups</TabsTrigger>
            </TabsList>

            {activeTab === 'forum' && (
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search discussions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-64"
                  />
                </div>
                <Button className="gradient-hero border-0">
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </div>
            )}
          </div>

          {/* Forum Tab */}
          <TabsContent value="forum" className="space-y-4">
            {FORUM_POSTS.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="py-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {post.author.initials}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {post.isPinned && (
                            <Badge variant="secondary" className="text-xs">Pinned</Badge>
                          )}
                          <Badge className={getCategoryColor(post.category)}>
                            {post.category}
                          </Badge>
                        </div>
                        <h3 className="font-semibold mb-1 hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{post.author.name}</span>
                          <span>•</span>
                          <span>Level {post.author.level}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.lastActivity}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          {post.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {post.replies}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Weekly Leaderboard
                </CardTitle>
                <CardDescription>
                  Top performers this week. Rankings reset every Sunday.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {LEADERBOARD.map((user, index) => (
                    <motion.div
                      key={user.rank}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`flex items-center gap-4 p-3 rounded-lg ${
                        user.isCurrentUser
                          ? 'bg-primary/10 border border-primary/20'
                          : user.rank <= 3
                            ? 'bg-muted/50'
                            : ''
                      }`}
                    >
                      <div className="w-8 text-center font-bold text-lg">
                        {user.rank <= 3 ? getRankBadge(user.badge) : `#${user.rank}`}
                      </div>

                      <Avatar className="w-10 h-10">
                        <AvatarFallback className={user.isCurrentUser ? 'gradient-hero text-white' : 'bg-primary/10 text-primary'}>
                          {user.initials}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{user.name}</span>
                          {user.isCurrentUser && (
                            <Badge variant="secondary" className="text-xs">You</Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">Level {user.level}</span>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="font-bold text-yellow-600 dark:text-yellow-400">
                            {user.xp.toLocaleString()} XP
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-orange-500">
                          <Flame className="w-4 h-4" />
                          <span className="font-medium">{user.streak}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Study Groups Tab */}
          <TabsContent value="groups" className="space-y-6">
            <div className="flex justify-end">
              <Button className="gradient-hero border-0">
                <Plus className="w-4 h-4 mr-2" />
                Create Group
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {STUDY_GROUPS.map((group, index) => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="hover-lift">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{group.name}</CardTitle>
                          <CardDescription>{group.description}</CardDescription>
                        </div>
                        <Badge variant="secondary">{group.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {group.members} members
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {group.lastActive}
                          </span>
                        </div>
                        <Button size="sm">Join</Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
