'use client'

import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StreakBadgeProps {
  streak: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  animated?: boolean
  className?: string
}

export function StreakBadge({
  streak,
  size = 'md',
  showLabel = true,
  animated = true,
  className,
}: StreakBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-sm px-3 py-1 gap-1.5',
    lg: 'text-base px-4 py-1.5 gap-2',
  }

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 24,
  }

  // Intensity increases with streak length
  const intensity = Math.min(streak / 30, 1) // Max intensity at 30 days

  return (
    <motion.div
      className={cn(
        'inline-flex items-center rounded-full font-bold',
        'bg-gradient-to-r from-[var(--streak-orange)] to-[var(--streak-red)]',
        'text-white shadow-md',
        sizeClasses[size],
        className
      )}
      style={{
        boxShadow: `0 0 ${20 + intensity * 30}px rgba(245, 158, 11, ${0.3 + intensity * 0.3})`,
      }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        animate={
          animated
            ? {
                scale: [1, 1.2, 1],
                filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'],
              }
            : undefined
        }
        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Flame size={iconSizes[size]} className="fill-current" />
      </motion.div>
      <span>{streak}</span>
      {showLabel && <span className="opacity-80">day{streak !== 1 ? 's' : ''}</span>}
    </motion.div>
  )
}

interface StreakCalendarProps {
  currentStreak: number
  longestStreak: number
  recentDays: { date: string; completed: boolean }[]
}

export function StreakCalendar({ currentStreak, longestStreak, recentDays }: StreakCalendarProps) {
  return (
    <div className="bg-card rounded-xl p-4 shadow-md border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <StreakBadge streak={currentStreak} size="md" />
          <span className="text-sm text-muted-foreground">Current streak</span>
        </div>
        <div className="text-sm text-muted-foreground">
          Best: <span className="font-bold text-foreground">{longestStreak} days</span>
        </div>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-2">
        {recentDays.map((day, index) => (
          <motion.div
            key={day.date}
            className={cn(
              'w-8 h-8 rounded-md flex items-center justify-center text-xs font-medium',
              day.completed
                ? 'bg-gradient-to-br from-[var(--success)] to-[var(--vibe-cyan)] text-white'
                : 'bg-muted text-muted-foreground'
            )}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            {new Date(day.date).getDate()}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
