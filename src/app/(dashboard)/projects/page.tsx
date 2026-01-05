'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  FolderKanban,
  Plus,
  ExternalLink,
  Github,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Flame,
  Sun,
  Moon,
  LogOut,
  Settings,
  User,
  Code,
  Smartphone,
  Globe,
  Lock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'

// Project data
const REQUIRED_PROJECTS = [
  {
    id: 'web-1',
    title: 'Task Dashboard',
    description: 'Build a full-stack task management application with authentication, CRUD operations, and real-time updates.',
    type: 'web',
    phase: 'Phase 4',
    status: 'locked',
    requirements: [
      'User authentication with Supabase',
      'Create, read, update, delete tasks',
      'Task categories and priorities',
      'Due date reminders',
      'Responsive design',
    ],
    xpReward: 2000,
    estimatedTime: '4-6 hours',
    techStack: ['Next.js', 'Supabase', 'Tailwind CSS'],
  },
  {
    id: 'web-2',
    title: 'Student Choice Project',
    description: 'Design and build your own web application based on your interests. Get creative and showcase your skills!',
    type: 'web',
    phase: 'Phase 5',
    status: 'locked',
    requirements: [
      'Original concept (approved by mentor)',
      'Full-stack implementation',
      'Database integration',
      'User authentication',
      'Deployed to production',
    ],
    xpReward: 3000,
    estimatedTime: '8-12 hours',
    techStack: ['Your Choice'],
  },
  {
    id: 'mobile-1',
    title: 'Mobile Companion App',
    description: 'Create a mobile application using React Native or Expo that complements your web projects.',
    type: 'mobile',
    phase: 'Phase 6',
    status: 'locked',
    requirements: [
      'React Native or Expo setup',
      'Cross-platform (iOS & Android)',
      'API integration',
      'Push notifications',
      'Published to app store or TestFlight',
    ],
    xpReward: 2500,
    estimatedTime: '6-8 hours',
    techStack: ['React Native', 'Expo'],
  },
]

const MY_PROJECTS = [
  {
    id: 'my-1',
    title: 'Portfolio Website',
    description: 'Personal portfolio showcasing my projects and skills',
    type: 'web',
    status: 'in_progress',
    progress: 65,
    lastUpdated: '2 hours ago',
    techStack: ['Next.js', 'Tailwind CSS'],
    liveUrl: null,
    githubUrl: 'https://github.com/user/portfolio',
  },
  {
    id: 'my-2',
    title: 'Weather App',
    description: 'Simple weather application using OpenWeather API',
    type: 'web',
    status: 'completed',
    progress: 100,
    lastUpdated: '3 days ago',
    techStack: ['React', 'API'],
    liveUrl: 'https://my-weather-app.vercel.app',
    githubUrl: 'https://github.com/user/weather-app',
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">Completed</Badge>
    case 'in_progress':
      return <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">In Progress</Badge>
    case 'submitted':
      return <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">Under Review</Badge>
    case 'locked':
      return <Badge variant="secondary"><Lock className="w-3 h-3 mr-1" />Locked</Badge>
    default:
      return <Badge variant="secondary">Not Started</Badge>
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'web':
      return <Globe className="w-5 h-5" />
    case 'mobile':
      return <Smartphone className="w-5 h-5" />
    default:
      return <Code className="w-5 h-5" />
  }
}

export default function ProjectsPage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState('required')

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
            <Link href="/projects" className="text-sm font-medium text-primary">
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <FolderKanban className="w-8 h-8" />
                Projects
              </h1>
              <p className="text-muted-foreground">
                Build real-world applications and showcase your skills
              </p>
            </div>
            <Button className="gradient-hero border-0">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="required">Required Projects</TabsTrigger>
            <TabsTrigger value="my-projects">My Projects</TabsTrigger>
          </TabsList>

          {/* Required Projects */}
          <TabsContent value="required" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
                      <FolderKanban className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">Complete 3 Required Projects</h3>
                      <p className="text-sm text-muted-foreground">
                        Finish all required projects to earn your VibeCoding Certificate
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">0/3</p>
                      <p className="text-xs text-muted-foreground">completed</p>
                    </div>
                  </div>
                  <Progress value={0} className="mt-4 h-2" />
                </CardContent>
              </Card>

              <div className="grid gap-6">
                {REQUIRED_PROJECTS.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className={project.status === 'locked' ? 'opacity-75' : ''}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                              project.type === 'web'
                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                            }`}>
                              {getTypeIcon(project.type)}
                            </div>
                            <div>
                              <CardTitle className="text-xl">{project.title}</CardTitle>
                              <CardDescription className="flex items-center gap-2 mt-1">
                                <Badge variant="outline">{project.phase}</Badge>
                                <span className="text-xs">•</span>
                                <span className="text-xs flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {project.estimatedTime}
                                </span>
                              </CardDescription>
                            </div>
                          </div>
                          {getStatusBadge(project.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">{project.description}</p>

                        <div>
                          <h4 className="text-sm font-medium mb-2">Requirements:</h4>
                          <ul className="space-y-1">
                            {project.requirements.map((req, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CheckCircle className="w-4 h-4 text-muted-foreground/50" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex items-center gap-2">
                            {project.techStack.map((tech) => (
                              <Badge key={tech} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400 font-medium">
                              <Star className="w-4 h-4" />
                              {project.xpReward.toLocaleString()} XP
                            </div>
                            <Button disabled={project.status === 'locked'}>
                              {project.status === 'locked' ? (
                                <>
                                  <Lock className="w-4 h-4 mr-2" />
                                  Locked
                                </>
                              ) : (
                                'Start Project'
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* My Projects */}
          <TabsContent value="my-projects" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {MY_PROJECTS.length === 0 ? (
                <Card className="p-12 text-center">
                  <FolderKanban className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start building your own projects to practice your skills
                  </p>
                  <Button className="gradient-hero border-0">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Project
                  </Button>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {MY_PROJECTS.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="hover-lift">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                                {getTypeIcon(project.type)}
                              </div>
                              <div>
                                <CardTitle>{project.title}</CardTitle>
                                <CardDescription className="text-xs">
                                  Updated {project.lastUpdated}
                                </CardDescription>
                              </div>
                            </div>
                            {getStatusBadge(project.status)}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm text-muted-foreground">{project.description}</p>

                          {project.status === 'in_progress' && (
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Progress</span>
                                <span className="font-medium">{project.progress}%</span>
                              </div>
                              <Progress value={project.progress} className="h-2" />
                            </div>
                          )}

                          <div className="flex items-center gap-2">
                            {project.techStack.map((tech) => (
                              <Badge key={tech} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center gap-2 pt-4 border-t">
                            {project.liveUrl && (
                              <Button variant="outline" size="sm" asChild>
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  Live Demo
                                </a>
                              </Button>
                            )}
                            {project.githubUrl && (
                              <Button variant="outline" size="sm" asChild>
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                  <Github className="w-4 h-4 mr-2" />
                                  Code
                                </a>
                              </Button>
                            )}
                            <Button size="sm" className="ml-auto">
                              Continue
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
