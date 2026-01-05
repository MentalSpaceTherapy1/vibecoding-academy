'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LevelBadgeProps {
  level: number
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showTitle?: boolean
  className?: string
}

const LEVEL_TIERS = [
  { min: 1, max: 5, title: 'Curious Explorer', color: 'from-slate-400 to-slate-500' },
  { min: 6, max: 10, title: 'Code Apprentice', color: 'from-blue-400 to-blue-600' },
  { min: 11, max: 20, title: 'Vibe Builder', color: 'from-purple-400 to-purple-600' },
  { min: 21, max: 35, title: 'Digital Craftsman', color: 'from-amber-400 to-orange-500' },
  { min: 36, max: 50, title: 'Full-Stack Creator', color: 'from-emerald-400 to-teal-500' },
  { min: 51, max: Infinity, title: 'Vibe Master', color: 'from-rose-400 to-pink-600' },
]

function getTier(level: number) {
  return LEVEL_TIERS.find((tier) => level >= tier.min && level <= tier.max) || LEVEL_TIERS[0]
}

export function LevelBadge({
  level,
  title,
  size = 'md',
  showTitle = false,
  className,
}: LevelBadgeProps) {
  const tier = getTier(level)
  const displayTitle = title || tier.title

  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-2xl',
  }

  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <motion.div
        className={cn(
          'rounded-full font-bold text-white shadow-lg',
          'bg-gradient-to-br',
          tier.color,
          'flex items-center justify-center',
          sizeClasses[size]
        )}
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        {level}
      </motion.div>
      {showTitle && (
        <span className="text-sm font-medium text-muted-foreground">{displayTitle}</span>
      )}
    </div>
  )
}

interface LevelProgressProps {
  currentXP: number
  xpForNextLevel: number
  level: number
  className?: string
}

export function LevelProgress({ currentXP, xpForNextLevel, level, className }: LevelProgressProps) {
  const progress = (currentXP / xpForNextLevel) * 100
  const tier = getTier(level)

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <LevelBadge level={level} size="sm" />
          <span className="font-medium">{tier.title}</span>
        </div>
        <span className="text-muted-foreground">
          {currentXP.toLocaleString()} / {xpForNextLevel.toLocaleString()} XP
        </span>
      </div>
      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={cn('absolute inset-y-0 left-0 rounded-full bg-gradient-to-r', tier.color)}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-white/30"
          style={{ width: `${progress}%` }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </div>
  )
}

interface LevelUpAnimationProps {
  newLevel: number
  isVisible: boolean
  onComplete?: () => void
}

export function LevelUpAnimation({ newLevel, isVisible, onComplete }: LevelUpAnimationProps) {
  const tier = getTier(newLevel)

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="flex flex-col items-center gap-6 p-8"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <motion.div
              className="text-6xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              🎉
            </motion.div>

            <motion.h2
              className="text-4xl font-bold text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Level Up!
            </motion.h2>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 400 }}
            >
              <LevelBadge level={newLevel} size="xl" />
            </motion.div>

            <motion.p
              className="text-xl text-white/80"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              You are now a <span className="font-bold text-white">{tier.title}</span>
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
