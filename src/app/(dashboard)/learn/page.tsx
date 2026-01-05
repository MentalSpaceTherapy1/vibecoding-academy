'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Play,
  CheckCircle,
  Lock,
  Clock,
  Star,
  ChevronDown,
  ChevronRight,
  Filter,
  Search,
  Trophy,
  Flame,
  Sun,
  Moon,
  LogOut,
  Settings,
  User
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'

// Curriculum data structure
const CURRICULUM = [
  {
    id: 'phase-1',
    title: 'Phase 1: Foundation',
    description: 'Get started with AI-powered coding',
    chapters: [
      {
        id: 'ch-1',
        number: 1,
        title: 'Introduction to Vibe Coding',
        description: 'Learn what vibe coding is and how it will transform your development journey',
        duration: '10 min',
        xp: 50,
        status: 'completed',
        type: 'video',
      },
      {
        id: 'ch-2',
        number: 2,
        title: 'Setting Up Your AI Tools',
        description: 'Install and configure Claude Code, Cursor, and other essential tools',
        duration: '15 min',
        xp: 75,
        status: 'in_progress',
        progress: 60,
        type: 'interactive',
      },
      {
        id: 'ch-3',
        number: 3,
        title: 'Your First AI Prompt',
        description: 'Master the art of communicating with AI to generate code',
        duration: '20 min',
        xp: 100,
        status: 'locked',
        type: 'video',
      },
      {
        id: 'ch-4',
        number: 4,
        title: 'Understanding AI Responses',
        description: 'Learn to read, interpret, and refine AI-generated code',
        duration: '18 min',
        xp: 100,
        status: 'locked',
        type: 'text',
      },
      {
        id: 'ch-5',
        number: 5,
        title: 'Iterating with AI',
        description: 'Refine and improve code through conversation',
        duration: '25 min',
        xp: 125,
        status: 'locked',
        type: 'interactive',
      },
    ],
  },
  {
    id: 'phase-2',
    title: 'Phase 2: Web Development Basics',
    description: 'Build your first web applications',
    chapters: [
      {
        id: 'ch-6',
        number: 6,
        title: 'HTML & CSS with AI',
        description: 'Create beautiful web pages using AI assistance',
        duration: '30 min',
        xp: 150,
        status: 'locked',
        type: 'interactive',
      },
      {
        id: 'ch-7',
        number: 7,
        title: 'JavaScript Fundamentals',
        description: 'Learn JavaScript concepts through AI-guided examples',
        duration: '35 min',
        xp: 175,
        status: 'locked',
        type: 'video',
      },
      {
        id: 'ch-8',
        number: 8,
        title: 'React Introduction',
        description: 'Build interactive UIs with React and AI',
        duration: '40 min',
        xp: 200,
        status: 'locked',
        type: 'interactive',
      },
      {
        id: 'ch-9',
        number: 9,
        title: 'State Management',
        description: 'Manage application state effectively',
        duration: '30 min',
        xp: 175,
        status: 'locked',
        type: 'text',
      },
      {
        id: 'ch-10',
        number: 10,
        title: 'Styling with Tailwind',
        description: 'Create stunning designs with Tailwind CSS',
        duration: '25 min',
        xp: 150,
        status: 'locked',
        type: 'interactive',
      },
    ],
  },
  {
    id: 'phase-3',
    title: 'Phase 3: Backend Development',
    description: 'Learn server-side programming and databases',
    chapters: [
      {
        id: 'ch-11',
        number: 11,
        title: 'Introduction to Databases',
        description: 'Understand how data is stored and retrieved',
        duration: '35 min',
        xp: 175,
        status: 'locked',
        type: 'video',
      },
      {
        id: 'ch-12',
        number: 12,
        title: 'SQL Basics with AI',
        description: 'Write database queries using AI assistance',
        duration: '40 min',
        xp: 200,
        status: 'locked',
        type: 'interactive',
      },
      {
        id: 'ch-13',
        number: 13,
        title: 'API Development',
        description: 'Build RESTful APIs from scratch',
        duration: '45 min',
        xp: 225,
        status: 'locked',
        type: 'interactive',
      },
      {
        id: 'ch-14',
        number: 14,
        title: 'Authentication & Security',
        description: 'Implement secure user authentication',
        duration: '40 min',
        xp: 200,
        status: 'locked',
        type: 'video',
      },
      {
        id: 'ch-15',
        number: 15,
        title: 'Deployment Basics',
        description: 'Deploy your applications to the cloud',
        duration: '30 min',
        xp: 175,
        status: 'locked',
        type: 'interactive',
      },
    ],
  },
  {
    id: 'phase-4',
    title: 'Phase 4: Full-Stack Projects',
    description: 'Build complete applications from start to finish',
    chapters: [
      {
        id: 'ch-16',
        number: 16,
        title: 'Project Planning',
        description: 'Learn to plan and structure your projects',
        duration: '25 min',
        xp: 150,
        status: 'locked',
        type: 'text',
      },
      {
        id: 'ch-17',
        number: 17,
        title: 'Task Dashboard - Part 1',
        description: 'Build the frontend of a task management app',
        duration: '60 min',
        xp: 300,
        status: 'locked',
        type: 'project',
      },
      {
        id: 'ch-18',
        number: 18,
        title: 'Task Dashboard - Part 2',
        description: 'Add backend functionality and database',
        duration: '60 min',
        xp: 300,
        status: 'locked',
        type: 'project',
      },
      {
        id: 'ch-19',
        number: 19,
        title: 'Task Dashboard - Part 3',
        description: 'Deploy and polish your application',
        duration: '45 min',
        xp: 250,
        status: 'locked',
        type: 'project',
      },
    ],
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'border-l-emerald-500'
    case 'in_progress':
      return 'border-l-blue-500'
    case 'locked':
      return 'border-l-slate-300 dark:border-l-slate-600'
    default:
      return 'border-l-slate-300'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-5 h-5 text-emerald-500" />
    case 'in_progress':
      return <Play className="w-5 h-5 text-blue-500" />
    case 'locked':
      return <Lock className="w-4 h-4 text-muted-foreground" />
    default:
      return <Play className="w-5 h-5 text-muted-foreground" />
  }
}

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'video':
      return { label: 'Video', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' }
    case 'interactive':
      return { label: 'Interactive', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' }
    case 'text':
      return { label: 'Reading', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' }
    case 'project':
      return { label: 'Project', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' }
    default:
      return { label: 'Lesson', color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' }
  }
}

export default function LearnPage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState('')
  const [openPhases, setOpenPhases] = useState<string[]>(['phase-1', 'phase-2'])

  const togglePhase = (phaseId: string) => {
    setOpenPhases((prev) =>
      prev.includes(phaseId)
        ? prev.filter((id) => id !== phaseId)
        : [...prev, phaseId]
    )
  }

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    toast.success('Signed out successfully')
    router.push('/')
    router.refresh()
  }

  // Calculate overall progress
  const totalChapters = CURRICULUM.reduce((acc, phase) => acc + phase.chapters.length, 0)
  const completedChapters = CURRICULUM.reduce(
    (acc, phase) => acc + phase.chapters.filter((ch) => ch.status === 'completed').length,
    0
  )
  const overallProgress = Math.round((completedChapters / totalChapters) * 100)

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
            <Link href="/learn" className="text-sm font-medium text-primary">
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Learn</h1>
              <p className="text-muted-foreground">
                Master AI-powered coding through our comprehensive curriculum
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search lessons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Overall Progress Card */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm font-bold">{overallProgress}%</span>
                  </div>
                  <Progress value={overallProgress} className="h-3" />
                  <p className="text-sm text-muted-foreground mt-2">
                    {completedChapters} of {totalChapters} chapters completed
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="text-center px-4 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{completedChapters}</p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                  <div className="text-center px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</p>
                    <p className="text-xs text-muted-foreground">In Progress</p>
                  </div>
                  <div className="text-center px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <p className="text-2xl font-bold text-slate-600 dark:text-slate-400">{totalChapters - completedChapters - 1}</p>
                    <p className="text-xs text-muted-foreground">Remaining</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Curriculum */}
        <div className="space-y-6">
          {CURRICULUM.map((phase, phaseIndex) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: phaseIndex * 0.1 }}
            >
              <Collapsible
                open={openPhases.includes(phase.id)}
                onOpenChange={() => togglePhase(phase.id)}
              >
                <Card>
                  <CollapsibleTrigger asChild>
                    <div className="flex items-center justify-between p-6 cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center text-white font-bold">
                          {phaseIndex + 1}
                        </div>
                        <div>
                          <h2 className="text-xl font-bold">{phase.title}</h2>
                          <p className="text-sm text-muted-foreground">{phase.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="hidden md:block text-right">
                          <p className="text-sm font-medium">{phase.chapters.length} chapters</p>
                          <p className="text-xs text-muted-foreground">
                            {phase.chapters.filter((ch) => ch.status === 'completed').length} completed
                          </p>
                        </div>
                        {openPhases.includes(phase.id) ? (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-6 pb-6 space-y-3">
                      {phase.chapters.map((chapter, chapterIndex) => {
                        const typeInfo = getTypeLabel(chapter.type)
                        return (
                          <motion.div
                            key={chapter.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: chapterIndex * 0.05 }}
                          >
                            <div
                              className={`flex items-center gap-4 p-4 rounded-lg border border-l-4 ${getStatusColor(
                                chapter.status
                              )} ${
                                chapter.status === 'locked'
                                  ? 'opacity-60 cursor-not-allowed'
                                  : 'hover:bg-muted/50 cursor-pointer'
                              } transition-colors`}
                            >
                              <div className="flex-shrink-0">
                                {getStatusIcon(chapter.status)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm text-muted-foreground">
                                    Chapter {chapter.number}
                                  </span>
                                  <Badge variant="secondary" className={typeInfo.color}>
                                    {typeInfo.label}
                                  </Badge>
                                </div>
                                <h3 className="font-medium truncate">{chapter.title}</h3>
                                <p className="text-sm text-muted-foreground truncate">
                                  {chapter.description}
                                </p>
                                {chapter.status === 'in_progress' && chapter.progress && (
                                  <div className="mt-2">
                                    <Progress value={chapter.progress} className="h-1.5" />
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {chapter.progress}% complete
                                    </p>
                                  </div>
                                )}
                              </div>
                              <div className="flex-shrink-0 text-right">
                                <div className="flex items-center gap-1 text-sm font-medium text-yellow-600 dark:text-yellow-400">
                                  <Star className="w-4 h-4" />
                                  {chapter.xp} XP
                                </div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                  <Clock className="w-3 h-3" />
                                  {chapter.duration}
                                </div>
                              </div>
                              {chapter.status !== 'locked' && (
                                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                              )}
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}
