'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Menu,
  X,
  Search,
  Bell,
  ChevronDown,
  BookOpen,
  Trophy,
  Users,
  FolderGit2,
  Settings,
  LogOut,
  User,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { XPBadge, StreakBadge, LevelBadge } from '@/components/gamification'
import { cn } from '@/lib/utils'

interface HeaderProps {
  user?: {
    name: string
    email: string
    avatar?: string
    level: number
    xp: number
    streak: number
  }
}

const NAV_LINKS = [
  { href: '/dashboard', label: 'Dashboard', icon: BookOpen },
  { href: '/learn', label: 'Learn', icon: BookOpen },
  { href: '/projects', label: 'Projects', icon: FolderGit2 },
  { href: '/community', label: 'Community', icon: Users },
  { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
]

export function Header({ user }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:h-18">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <span className="text-white font-bold text-lg">V</span>
          </motion.div>
          <span className="hidden font-bold text-xl md:inline-block">
            <span className="text-gradient">Vibe</span>Coding
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button variant="ghost" className="gap-2">
                <link.icon className="w-4 h-4" />
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Search */}
          <motion.div
            className="hidden md:flex items-center"
            animate={{ width: isSearchOpen ? 240 : 40 }}
          >
            {isSearchOpen ? (
              <div className="relative flex items-center">
                <Input
                  placeholder="Search lessons, projects..."
                  className="pr-8"
                  autoFocus
                  onBlur={() => setIsSearchOpen(false)}
                />
                <X
                  className="absolute right-2 w-4 h-4 cursor-pointer text-muted-foreground"
                  onClick={() => setIsSearchOpen(false)}
                />
              </div>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                <Search className="w-5 h-5" />
              </Button>
            )}
          </motion.div>

          {user ? (
            <>
              {/* XP Badge */}
              <div className="hidden lg:block">
                <XPBadge amount={user.xp} size="sm" />
              </div>

              {/* Streak Badge */}
              <div className="hidden md:block">
                <StreakBadge streak={user.streak} size="sm" showLabel={false} />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[var(--error)]" />
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="gradient-hero text-white">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-0.5 -right-0.5">
                      <LevelBadge level={user.level} size="sm" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
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
                  <DropdownMenuItem className="text-destructive cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button className="gradient-hero border-0">Start Learning</Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-6 mt-6">
                {user && (
                  <div className="flex items-center gap-3 pb-4 border-b">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="gradient-hero text-white">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <LevelBadge level={user.level} size="sm" />
                        <XPBadge amount={user.xp} size="sm" />
                      </div>
                    </div>
                  </div>
                )}

                <nav className="flex flex-col gap-2">
                  {NAV_LINKS.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <Button variant="ghost" className="w-full justify-start gap-3">
                        <link.icon className="w-5 h-5" />
                        {link.label}
                      </Button>
                    </Link>
                  ))}
                </nav>

                {!user && (
                  <div className="flex flex-col gap-2 pt-4 border-t">
                    <Link href="/login">
                      <Button variant="outline" className="w-full">
                        Log in
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button className="w-full gradient-hero border-0">Start Learning</Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
