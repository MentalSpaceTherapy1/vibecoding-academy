'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Star,
  BookOpen,
  CheckCircle2,
  Circle,
  Lock,
  Play,
  Pause,
  Menu,
  X,
  Sun,
  Moon,
  LogOut,
  User,
  Settings,
  Flame,
  Trophy,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useTheme } from 'next-themes'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'

// Lesson content data (will be replaced with database content)
const LESSON_CONTENT: Record<string, {
  phaseNumber: number
  chapterNumber: number
  title: string
  description: string
  duration: number
  xpReward: number
  content: string
  videoUrl?: string
  prevLesson?: string
  nextLesson?: string
}> = {
  '1-1': {
    phaseNumber: 1,
    chapterNumber: 1,
    title: 'Welcome to VibeCoding',
    description: 'Introduction to the course and what you will learn',
    duration: 10,
    xpReward: 50,
    content: `
# Welcome to VibeCoding Academy! 🎉

Congratulations on taking the first step towards becoming a **full-stack developer**! This course will transform you from a complete beginner into someone who can build and deploy real web and mobile applications.

## What Makes This Course Different?

Unlike traditional coding courses that spend months teaching you syntax and theory, VibeCoding Academy uses a revolutionary **AI-first approach**:

1. **Natural Language Coding** - You'll learn to describe what you want to build in plain English, and AI tools will generate the code for you.

2. **Learn by Building** - From day one, you'll be creating real projects, not just following tutorials.

3. **Modern Tools** - You'll master the same AI coding tools used by professional developers at top tech companies.

4. **Gamified Learning** - Earn XP, unlock badges, compete on leaderboards, and maintain streaks to stay motivated.

## What You'll Build

By the end of this course, you will have built:

- 📋 **Task Dashboard** - A full-featured task management web application
- 🎨 **Custom Web App** - Your own idea brought to life
- 📱 **Mobile App** - A cross-platform mobile application

## Course Structure

The course is divided into **10 phases** with **49 total lessons**:

| Phase | Focus |
|-------|-------|
| 1-2 | AI Tools & Setup |
| 3-4 | Web Development |
| 5-6 | Backend & First Project |
| 7-8 | Mobile & Advanced Topics |
| 9-10 | Deployment & Certification |

## Let's Get Started!

In the next lesson, we'll dive into what "vibe coding" really means and why it's changing how people learn to code.

Ready? Click **"Mark as Complete"** below and move on to the next lesson!
    `,
    nextLesson: '1-2'
  },
  '1-2': {
    phaseNumber: 1,
    chapterNumber: 2,
    title: 'What is Vibe Coding?',
    description: 'Understanding the AI-first approach to development',
    duration: 15,
    xpReward: 75,
    content: `
# What is Vibe Coding? 🤖

"Vibe coding" is a term coined by Andrej Karpathy (former Director of AI at Tesla) to describe a new way of programming where you **describe what you want in natural language** and let AI write the code.

## The Traditional Way vs. Vibe Coding

### Traditional Programming
\`\`\`javascript
// You need to know exact syntax
function calculateTotal(items) {
  return items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
}
\`\`\`

### Vibe Coding
> "Create a function that calculates the total price of a shopping cart by multiplying each item's price by its quantity and summing them up"

The AI generates the code for you! You focus on **what** you want, not **how** to write it.

## Why Vibe Coding Works

1. **Lower Barrier to Entry** - You don't need to memorize syntax to start building.

2. **Faster Development** - Describe features in seconds, get working code instantly.

3. **Learn as You Go** - AI explains the code it writes, teaching you along the way.

4. **Focus on Creativity** - Spend time on design and ideas, not debugging semicolons.

## The AI Tools You'll Master

| Tool | Best For |
|------|----------|
| **Claude Code** | Complex coding tasks, debugging |
| **Lovable** | Full web applications |
| **Bolt** | Quick prototypes |
| **Cursor** | Code editing with AI |
| **v0** | UI component generation |

## Important Mindset Shift

Vibe coding isn't about **not learning** - it's about learning **differently**:

- You'll understand **concepts** over syntax
- You'll learn **architecture** over implementation details
- You'll master **problem-solving** over memorization

## Try It Now!

Think of a simple program you'd like to create. In the next lessons, you'll learn to turn that idea into reality using AI tools.

**Challenge:** Write down 3 app ideas you'd like to build. Keep this list handy!
    `,
    prevLesson: '1-1',
    nextLesson: '1-3'
  },
  '1-3': {
    phaseNumber: 1,
    chapterNumber: 3,
    title: 'Setting Up Your Environment',
    description: 'Installing and configuring essential tools',
    duration: 20,
    xpReward: 100,
    content: `
# Setting Up Your Development Environment 🛠️

Before we start building, let's set up your workspace with the essential tools you'll need throughout this course.

## Required Tools

### 1. Web Browser (Chrome or Edge)
You likely already have this! Chrome is recommended for its developer tools.

- [Download Chrome](https://google.com/chrome)

### 2. AI Coding Assistant Accounts

Create free accounts for these AI tools:

| Tool | Link | Use Case |
|------|------|----------|
| **Claude** | [claude.ai](https://claude.ai) | Primary coding assistant |
| **Lovable** | [lovable.dev](https://lovable.dev) | Full-stack app builder |
| **Bolt** | [bolt.new](https://bolt.new) | Quick prototypes |

### 3. GitHub Account
You'll need GitHub to store your code and deploy projects.

1. Go to [github.com](https://github.com)
2. Click "Sign Up"
3. Follow the registration process
4. Verify your email

### 4. Vercel Account (for deployment)
Vercel will host your web projects for free.

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. **Connect with GitHub** (easiest option)

## Optional but Recommended

### Code Editor: VS Code
While we'll use AI tools for most coding, having VS Code installed helps:

- [Download VS Code](https://code.visualstudio.com)

After installing, add these extensions:
- **Prettier** - Code formatting
- **ES7+ React Snippets** - Quick snippets
- **Tailwind CSS IntelliSense** - CSS help

### Node.js
Required for running React and Next.js projects locally:

- [Download Node.js](https://nodejs.org) (LTS version)

Verify installation by opening a terminal and running:
\`\`\`bash
node --version
npm --version
\`\`\`

## Your Setup Checklist

- [ ] Chrome or Edge browser installed
- [ ] Claude account created
- [ ] Lovable account created
- [ ] GitHub account created
- [ ] Vercel account (connected to GitHub)
- [ ] VS Code installed (optional)
- [ ] Node.js installed (optional)

## Troubleshooting

**Can't create an account?**
- Make sure you're using a valid email
- Check your spam folder for verification emails
- Try a different browser if issues persist

**Node.js not recognized?**
- Restart your terminal/command prompt
- Make sure you selected "Add to PATH" during installation

## Next Steps

With your environment ready, you're all set to write your first AI-generated code in the next lesson!
    `,
    prevLesson: '1-2',
    nextLesson: '1-4'
  },
  '1-4': {
    phaseNumber: 1,
    chapterNumber: 4,
    title: 'Your First AI-Generated Code',
    description: 'Creating your first program using AI',
    duration: 25,
    xpReward: 100,
    content: `
# Your First AI-Generated Code! 🎯

Time to create something real! In this lesson, you'll use Claude to generate your first piece of code.

## The Project: Personal Greeting Generator

We'll build a simple web page that:
1. Asks for your name
2. Shows a personalized greeting
3. Displays the current time

## Step 1: Open Claude

1. Go to [claude.ai](https://claude.ai)
2. Sign in to your account
3. Start a new conversation

## Step 2: Write Your Prompt

Copy and paste this prompt:

> Create a simple HTML page with these features:
> - An input field where I can type my name
> - A button that says "Greet Me"
> - When I click the button, it shows "Hello, [name]! Welcome to VibeCoding!"
> - Also display the current date and time
> - Make it look nice with some basic CSS styling
> - Use a purple and blue color scheme

## Step 3: Get Your Code

Claude will generate HTML, CSS, and JavaScript code. It should look something like this:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Personal Greeting</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .container {
            background: white;
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            text-align: center;
        }
        input {
            padding: 0.75rem;
            font-size: 1rem;
            border: 2px solid #667eea;
            border-radius: 0.5rem;
            margin-right: 0.5rem;
        }
        button {
            padding: 0.75rem 1.5rem;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
        }
        button:hover {
            background: #764ba2;
        }
        #greeting {
            margin-top: 1.5rem;
            font-size: 1.5rem;
            color: #333;
        }
        #datetime {
            margin-top: 1rem;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome!</h1>
        <input type="text" id="nameInput" placeholder="Enter your name">
        <button onclick="greet()">Greet Me</button>
        <div id="greeting"></div>
        <div id="datetime"></div>
    </div>
    <script>
        function greet() {
            const name = document.getElementById('nameInput').value || 'Friend';
            document.getElementById('greeting').textContent =
                'Hello, ' + name + '! Welcome to VibeCoding!';
            document.getElementById('datetime').textContent =
                'Current time: ' + new Date().toLocaleString();
        }
    </script>
</body>
</html>
\`\`\`

## Step 4: Test Your Code

1. Create a new file called \`greeting.html\`
2. Paste the code from Claude
3. Open the file in your browser (double-click it)
4. Type your name and click the button!

## What Just Happened?

You described what you wanted in plain English, and Claude:
- Created the HTML structure
- Added CSS styling
- Wrote JavaScript for interactivity

**You didn't need to know any syntax!**

## Challenge: Customize It!

Try asking Claude to modify your code:
- "Add an emoji to the greeting"
- "Change the colors to green and teal"
- "Add a dark mode toggle"

## Key Takeaway

This is the power of vibe coding. You focus on **what** you want, and AI handles **how** to build it.

In the next lesson, we'll learn how to write even better prompts to get exactly what you want!
    `,
    prevLesson: '1-3',
    nextLesson: '1-5'
  },
  '1-5': {
    phaseNumber: 1,
    chapterNumber: 5,
    title: 'Understanding AI Prompts',
    description: 'How to communicate effectively with AI tools',
    duration: 15,
    xpReward: 75,
    content: `
# Mastering AI Prompts 💬

The quality of code you get from AI depends entirely on how well you communicate. Let's learn how to write prompts that get great results!

## The CLEAR Framework

Use this framework for every prompt:

| Letter | Meaning | Example |
|--------|---------|---------|
| **C** | Context | "I'm building a task management app..." |
| **L** | Language/Tools | "...using React and Tailwind CSS..." |
| **E** | Expected Output | "...that displays tasks in a card layout..." |
| **A** | Actions | "...with buttons to mark complete or delete..." |
| **R** | Requirements | "...mobile responsive with dark mode support" |

## Bad vs. Good Prompts

### ❌ Bad Prompt
> "Make a todo list"

**Why it's bad:** Too vague, no context, no specifications.

### ✅ Good Prompt
> "Create a todo list component in React with Tailwind CSS that:
> - Shows tasks as cards with title and due date
> - Has a checkbox to mark tasks complete
> - Completed tasks have a strikethrough style
> - Includes an 'Add Task' button that opens a modal
> - Works on mobile screens"

**Why it's good:** Specific, detailed, clear requirements.

## Prompt Templates

### For Components
> "Create a [component type] in [framework] that:
> - [Visual appearance]
> - [Interactive behavior]
> - [Data it handles]
> - [Responsive requirements]"

### For Full Features
> "Build a [feature name] for my [app type] that allows users to:
> 1. [Action 1]
> 2. [Action 2]
> 3. [Action 3]
>
> Technical requirements:
> - Framework: [React/Next.js/etc.]
> - Styling: [Tailwind/CSS/etc.]
> - State management: [useState/Zustand/etc.]"

### For Debugging
> "I'm getting this error: [paste error]
>
> Here's my code: [paste code]
>
> What I expected: [describe]
> What's happening: [describe]
>
> Please explain the issue and provide a fix."

## Pro Tips

### 1. Be Specific About Style
Instead of: "Make it look nice"
Say: "Use a modern design with rounded corners, subtle shadows, and a purple/blue color scheme"

### 2. Specify Edge Cases
> "Handle the case where the user submits an empty form"

### 3. Ask for Explanations
> "...and explain each section of the code with comments"

### 4. Iterate and Refine
First prompt → Get initial code → Ask for modifications:
> "Great! Now add form validation"
> "Change the button color to green"
> "Make it animate when items are added"

## Practice Exercise

Rewrite this bad prompt as a good one:

**Bad:** "Create a login page"

**Your Turn:** Write a CLEAR prompt for a login page. Include:
- Framework and styling
- Required fields
- Validation rules
- Error handling
- Visual design

## What's Next?

You've completed Phase 1! 🎉

In Phase 2, you'll dive deep into specific AI tools:
- Claude Code for complex projects
- Lovable for full applications
- Bolt for rapid prototyping

Keep your streak going and continue to Phase 2!
    `,
    prevLesson: '1-4',
    nextLesson: '2-1'
  },
  '2-1': {
    phaseNumber: 2,
    chapterNumber: 1,
    title: 'Introduction to Claude Code',
    description: 'Getting started with Anthropic Claude for coding',
    duration: 20,
    xpReward: 100,
    content: `
# Introduction to Claude Code 🤖

Claude, created by Anthropic, is one of the most powerful AI assistants for coding. In this lesson, you'll learn how to use Claude effectively for your development projects.

## What is Claude?

Claude is an AI assistant that can:
- Write code in any programming language
- Debug and fix errors
- Explain complex code concepts
- Help design system architecture
- Review and improve your code

## Getting Started

### 1. Access Claude
- Go to [claude.ai](https://claude.ai)
- Sign in with your account
- Choose Claude 3.5 Sonnet for best coding results

### 2. Understanding the Interface

The Claude interface is simple:
- **Text input** - Where you type your prompts
- **Conversation history** - Previous messages in the session
- **Copy button** - Easily copy code blocks
- **New chat** - Start a fresh conversation

## Your First Coding Session

Let's create a React component together!

### Prompt:
> Create a React component called "UserCard" that displays:
> - A user avatar (round image)
> - Username
> - Email
> - A "Follow" button that toggles to "Following" when clicked
>
> Use Tailwind CSS for styling with a clean, modern design.

Claude will generate complete, working code that you can use directly in your project!

## Tips for Using Claude for Code

### 1. Provide Context
Tell Claude about your project:
> "I'm building a task management app with Next.js and Supabase. I need a component that..."

### 2. Specify the Framework
> "Use React with TypeScript and Tailwind CSS"

### 3. Ask for Best Practices
> "Follow React best practices and include proper error handling"

### 4. Request Comments
> "Add comments explaining the key parts of the code"

## When to Use Claude

| Task | Claude is Great For |
|------|---------------------|
| ✅ | Writing functions and components |
| ✅ | Debugging error messages |
| ✅ | Explaining code concepts |
| ✅ | Code reviews and improvements |
| ✅ | Database schema design |
| ✅ | Writing tests |

## Practice Task

Use Claude to create a "Notification Badge" component:
- Shows a number inside a red circle
- Pulses when the number is greater than 0
- Use React and Tailwind

Try it now at [claude.ai](https://claude.ai)!

## Key Takeaway

Claude is your coding partner. The better you communicate what you need, the better code you'll get. In the next lesson, we'll master advanced Claude techniques!
    `,
    prevLesson: '1-5',
    nextLesson: '2-2'
  }
}

// Curriculum structure for sidebar
const CURRICULUM = [
  {
    phase: 1,
    title: 'Getting Started',
    chapters: [
      { id: '1-1', number: 1, title: 'Welcome to VibeCoding' },
      { id: '1-2', number: 2, title: 'What is Vibe Coding?' },
      { id: '1-3', number: 3, title: 'Setting Up Your Environment' },
      { id: '1-4', number: 4, title: 'Your First AI-Generated Code' },
      { id: '1-5', number: 5, title: 'Understanding AI Prompts' },
    ]
  },
  {
    phase: 2,
    title: 'AI Tool Mastery',
    chapters: [
      { id: '2-1', number: 1, title: 'Introduction to Claude Code' },
      { id: '2-2', number: 2, title: 'Mastering Claude Code' },
      { id: '2-3', number: 3, title: 'Lovable: AI Web App Builder' },
      { id: '2-4', number: 4, title: 'Bolt.new: Instant Prototypes' },
      { id: '2-5', number: 5, title: 'Cursor & Windsurf' },
      { id: '2-6', number: 6, title: 'Choosing the Right Tool' },
    ]
  },
  {
    phase: 3,
    title: 'Web Fundamentals',
    chapters: [
      { id: '3-1', number: 1, title: 'HTML Essentials' },
      { id: '3-2', number: 2, title: 'CSS Styling' },
      { id: '3-3', number: 3, title: 'JavaScript Basics' },
      { id: '3-4', number: 4, title: 'Responsive Design' },
      { id: '3-5', number: 5, title: 'Modern CSS with Tailwind' },
    ]
  },
]

export default function LessonPage() {
  const router = useRouter()
  const params = useParams()
  const lessonId = params.lessonId as string
  const { theme, setTheme } = useTheme()
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [lessonCompleted, setLessonCompleted] = useState(false)
  const [showXPAnimation, setShowXPAnimation] = useState(false)
  const [completedLessons, setCompletedLessons] = useState<string[]>(['1-1'])

  const lesson = LESSON_CONTENT[lessonId]

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

  const handleMarkComplete = () => {
    if (!lessonCompleted) {
      setLessonCompleted(true)
      setShowXPAnimation(true)
      setCompletedLessons(prev => [...prev, lessonId])
      toast.success(`Lesson completed! +${lesson.xpReward} XP`)

      setTimeout(() => {
        setShowXPAnimation(false)
      }, 2000)
    }
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

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lesson not found</h1>
          <p className="text-muted-foreground mb-4">This lesson is coming soon!</p>
          <Link href="/learn">
            <Button>Back to Curriculum</Button>
          </Link>
        </div>
      </div>
    )
  }

  const userDisplayName = user?.user_metadata?.full_name || user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'Learner'
  const userInitials = userDisplayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="min-h-screen bg-background">
      {/* XP Animation */}
      <AnimatePresence>
        {showXPAnimation && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-yellow-400 text-yellow-900 font-bold text-2xl px-6 py-3 rounded-full shadow-2xl flex items-center gap-2"
              initial={{ scale: 0, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0, y: -100, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <Star className="w-6 h-6 fill-current" />
              +{lesson.xpReward} XP
              <Sparkles className="w-6 h-6" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <SheetHeader className="p-4 border-b">
                  <SheetTitle>Course Content</SheetTitle>
                </SheetHeader>
                <div className="overflow-y-auto h-[calc(100vh-80px)]">
                  {CURRICULUM.map((phase) => (
                    <div key={phase.phase} className="border-b">
                      <div className="p-4 bg-muted/50">
                        <h3 className="font-semibold">Phase {phase.phase}: {phase.title}</h3>
                      </div>
                      <div className="p-2">
                        {phase.chapters.map((chapter) => {
                          const isActive = chapter.id === lessonId
                          const isCompleted = completedLessons.includes(chapter.id)
                          return (
                            <Link
                              key={chapter.id}
                              href={`/learn/${chapter.id}`}
                              onClick={() => setSidebarOpen(false)}
                            >
                              <div className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                                isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                              }`}>
                                {isCompleted ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                ) : (
                                  <Circle className="w-5 h-5 text-muted-foreground" />
                                )}
                                <span className="text-sm">{chapter.number}. {chapter.title}</span>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            <Link href="/learn" className="flex items-center gap-2">
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Curriculum</span>
            </Link>
          </div>

          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <span className="font-bold text-xl hidden sm:block">
              <span className="text-gradient">Vibe</span>Coding
            </span>
          </Link>

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

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-80 border-r bg-muted/30 h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
          <div className="p-4">
            <h2 className="font-bold text-lg mb-4">Course Content</h2>
            {CURRICULUM.map((phase) => (
              <div key={phase.phase} className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">Phase {phase.phase}</Badge>
                  <span className="text-sm font-medium">{phase.title}</span>
                </div>
                <div className="space-y-1 ml-2">
                  {phase.chapters.map((chapter) => {
                    const isActive = chapter.id === lessonId
                    const isCompleted = completedLessons.includes(chapter.id)
                    const isLocked = !LESSON_CONTENT[chapter.id]
                    return (
                      <Link
                        key={chapter.id}
                        href={isLocked ? '#' : `/learn/${chapter.id}`}
                        className={isLocked ? 'cursor-not-allowed' : ''}
                      >
                        <div className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                          isActive ? 'bg-primary/10 text-primary border-l-2 border-primary' :
                          isLocked ? 'opacity-50' : 'hover:bg-muted'
                        }`}>
                          {isLocked ? (
                            <Lock className="w-4 h-4 text-muted-foreground" />
                          ) : isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Circle className="w-4 h-4 text-muted-foreground" />
                          )}
                          <span className="text-sm truncate">{chapter.title}</span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-64px)]">
          <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Lesson Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Badge variant="outline">Phase {lesson.phaseNumber}</Badge>
                <span>•</span>
                <span>Chapter {lesson.chapterNumber}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{lesson.title}</h1>
              <p className="text-xl text-muted-foreground mb-4">{lesson.description}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {lesson.duration} min
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  {lesson.xpReward} XP
                </span>
              </div>
            </motion.div>

            <Separator className="my-8" />

            {/* Lesson Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="prose prose-slate dark:prose-invert max-w-none"
            >
              <div
                className="lesson-content"
                dangerouslySetInnerHTML={{
                  __html: lesson.content
                    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
                    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mt-6 mb-3">$1</h2>')
                    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-medium mt-4 mb-2">$1</h3>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm">$1</code>')
                    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto my-4"><code>$2</code></pre>')
                    .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-primary pl-4 italic my-4">$1</blockquote>')
                    .replace(/^\- \[ \] (.*$)/gim, '<div class="flex items-center gap-2 my-1"><input type="checkbox" class="rounded" /> <span>$1</span></div>')
                    .replace(/^\- \[x\] (.*$)/gim, '<div class="flex items-center gap-2 my-1"><input type="checkbox" checked class="rounded" /> <span class="line-through">$1</span></div>')
                    .replace(/^\- (.*$)/gim, '<li class="ml-4">$1</li>')
                    .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal">$1</li>')
                    .replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" target="_blank" class="text-primary hover:underline">$1</a>')
                    .replace(/\n\n/g, '</p><p class="my-4">')
                    .replace(/\|(.+)\|/g, (match) => {
                      const cells = match.split('|').filter(c => c.trim())
                      if (cells.some(c => c.includes('---'))) return ''
                      return `<tr>${cells.map(c => `<td class="border px-4 py-2">${c.trim()}</td>`).join('')}</tr>`
                    })
                }}
              />
            </motion.div>

            <Separator className="my-8" />

            {/* Lesson Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* Complete Button */}
              <Card className={lessonCompleted ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' : ''}>
                <CardContent className="py-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {lessonCompleted ? (
                        <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                      ) : (
                        <Circle className="w-8 h-8 text-muted-foreground" />
                      )}
                      <div>
                        <p className="font-semibold">
                          {lessonCompleted ? 'Lesson Completed!' : 'Mark this lesson as complete'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {lessonCompleted ? `You earned ${lesson.xpReward} XP` : `Earn ${lesson.xpReward} XP`}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={handleMarkComplete}
                      disabled={lessonCompleted}
                      className={lessonCompleted ? 'bg-emerald-500' : 'gradient-hero'}
                    >
                      {lessonCompleted ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Completed
                        </>
                      ) : (
                        <>
                          <Star className="w-4 h-4 mr-2" />
                          Mark as Complete
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                {lesson.prevLesson ? (
                  <Link href={`/learn/${lesson.prevLesson}`}>
                    <Button variant="outline">
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous Lesson
                    </Button>
                  </Link>
                ) : (
                  <div />
                )}

                {lesson.nextLesson ? (
                  <Link href={`/learn/${lesson.nextLesson}`}>
                    <Button className="gradient-hero">
                      Next Lesson
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                ) : (
                  <Link href="/learn">
                    <Button className="gradient-hero">
                      Back to Curriculum
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
