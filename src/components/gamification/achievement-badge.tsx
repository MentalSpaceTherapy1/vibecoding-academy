'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

type Rarity = 'common' | 'rare' | 'epic' | 'legendary'

interface AchievementBadgeProps {
  name: string
  description: string
  icon: React.ReactNode
  rarity: Rarity
  unlocked: boolean
  unlockedAt?: Date
  progress?: number
  progressMax?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const RARITY_STYLES = {
  common: {
    bg: 'from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-700',
    border: 'border-slate-300 dark:border-slate-600',
    glow: 'rgba(148, 163, 184, 0.4)',
    label: 'text-slate-600 dark:text-slate-400',
  },
  rare: {
    bg: 'from-blue-100 to-cyan-50 dark:from-blue-900 dark:to-cyan-900',
    border: 'border-blue-300 dark:border-blue-600',
    glow: 'rgba(59, 130, 246, 0.5)',
    label: 'text-blue-600 dark:text-blue-400',
  },
  epic: {
    bg: 'from-purple-100 to-pink-50 dark:from-purple-900 dark:to-pink-900',
    border: 'border-purple-300 dark:border-purple-600',
    glow: 'rgba(147, 51, 234, 0.5)',
    label: 'text-purple-600 dark:text-purple-400',
  },
  legendary: {
    bg: 'from-amber-100 to-yellow-50 dark:from-amber-900 dark:to-yellow-900',
    border: 'border-amber-400 dark:border-amber-500',
    glow: 'rgba(251, 191, 36, 0.6)',
    label: 'text-amber-600 dark:text-amber-400',
  },
}

export function AchievementBadge({
  name,
  description,
  icon,
  rarity,
  unlocked,
  unlockedAt,
  progress,
  progressMax,
  size = 'md',
  className,
}: AchievementBadgeProps) {
  const styles = RARITY_STYLES[rarity]

  const sizeClasses = {
    sm: { container: 'w-20', icon: 'w-10 h-10', text: 'text-xs' },
    md: { container: 'w-28', icon: 'w-14 h-14', text: 'text-sm' },
    lg: { container: 'w-36', icon: 'w-20 h-20', text: 'text-base' },
  }

  const sizes = sizeClasses[size]

  return (
    <motion.div
      className={cn(
        'flex flex-col items-center gap-2 p-3 rounded-xl',
        'bg-gradient-to-br border',
        styles.bg,
        styles.border,
        !unlocked && 'opacity-60 grayscale',
        className
      )}
      style={{
        boxShadow: unlocked ? `0 0 30px ${styles.glow}` : undefined,
      }}
      whileHover={unlocked ? { scale: 1.05, y: -4 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <div
        className={cn(
          'relative rounded-full flex items-center justify-center',
          'bg-white/50 dark:bg-black/20',
          sizes.icon
        )}
      >
        {icon}
        {!unlocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
            <Lock className="w-5 h-5 text-white" />
          </div>
        )}
        {unlocked && (
          <motion.div
            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[var(--success)] flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500 }}
          >
            <Check className="w-3 h-3 text-white" />
          </motion.div>
        )}
      </div>

      <div className="text-center">
        <h4 className={cn('font-semibold line-clamp-2', sizes.text)}>{name}</h4>
        <p className={cn('text-muted-foreground line-clamp-2 mt-0.5', sizes.text, 'text-xs')}>
          {description}
        </p>
      </div>

      {!unlocked && progress !== undefined && progressMax !== undefined && (
        <div className="w-full">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Progress</span>
            <span>
              {progress}/{progressMax}
            </span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--vibe-purple)] to-[var(--vibe-cyan)]"
              initial={{ width: 0 }}
              animate={{ width: `${(progress / progressMax) * 100}%` }}
            />
          </div>
        </div>
      )}

      {unlocked && unlockedAt && (
        <span className={cn('text-muted-foreground', sizes.text, 'text-xs')}>
          {unlockedAt.toLocaleDateString()}
        </span>
      )}

      <span className={cn('uppercase font-bold text-xs tracking-wider', styles.label)}>
        {rarity}
      </span>
    </motion.div>
  )
}

interface AchievementUnlockModalProps {
  achievement: {
    name: string
    description: string
    icon: React.ReactNode
    rarity: Rarity
  }
  isVisible: boolean
  onClose: () => void
}

export function AchievementUnlockModal({
  achievement,
  isVisible,
  onClose,
}: AchievementUnlockModalProps) {
  const styles = RARITY_STYLES[achievement.rarity]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={cn(
              'relative flex flex-col items-center gap-6 p-8 rounded-2xl',
              'bg-gradient-to-br border-2',
              styles.bg,
              styles.border
            )}
            style={{
              boxShadow: `0 0 60px ${styles.glow}`,
            }}
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="text-2xl font-bold text-gradient"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Achievement Unlocked!
            </motion.div>

            <motion.div
              className="w-24 h-24 rounded-full bg-white/50 dark:bg-black/20 flex items-center justify-center"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 400 }}
            >
              {achievement.icon}
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold">{achievement.name}</h3>
              <p className="text-muted-foreground mt-2">{achievement.description}</p>
            </motion.div>

            <motion.span
              className={cn('uppercase font-bold tracking-wider', styles.label)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {achievement.rarity}
            </motion.span>

            <motion.button
              className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-semibold"
              onClick={onClose}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
