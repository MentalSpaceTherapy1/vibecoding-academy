'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface XPBadgeProps {
  amount: number
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
  animated?: boolean
  className?: string
}

export function XPBadge({
  amount,
  size = 'md',
  showIcon = true,
  animated = false,
  className,
}: XPBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-sm px-3 py-1 gap-1.5',
    lg: 'text-base px-4 py-1.5 gap-2',
  }

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 18,
  }

  return (
    <motion.div
      className={cn(
        'inline-flex items-center rounded-full font-bold',
        'bg-gradient-to-r from-[var(--xp-gold)] to-[var(--streak-orange)]',
        'text-slate-900 shadow-sm',
        sizeClasses[size],
        className
      )}
      initial={animated ? { scale: 0.8, opacity: 0 } : undefined}
      animate={animated ? { scale: 1, opacity: 1 } : undefined}
      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
    >
      {showIcon && <Zap size={iconSizes[size]} className="fill-current" />}
      <span>{amount.toLocaleString()} XP</span>
    </motion.div>
  )
}

interface XPGainAnimationProps {
  amount: number
  isVisible: boolean
  onComplete?: () => void
}

export function XPGainAnimation({ amount, isVisible, onComplete }: XPGainAnimationProps) {
  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 pointer-events-none flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ scale: 0.5, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <motion.div
              className="relative"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: 2 }}
            >
              <Star className="w-20 h-20 text-[var(--xp-gold)] fill-[var(--xp-gold)]" />
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(251, 191, 36, 0.4)',
                    '0 0 60px rgba(251, 191, 36, 0.8)',
                    '0 0 20px rgba(251, 191, 36, 0.4)',
                  ],
                }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>
            <motion.div
              className="text-4xl font-bold text-gradient"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              +{amount} XP
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
