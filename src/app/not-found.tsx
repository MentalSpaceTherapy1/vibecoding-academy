'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Search, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 gradient-hero opacity-5" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Number */}
          <motion.h1
            className="text-[150px] md:text-[200px] font-bold text-gradient leading-none"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          >
            404
          </motion.h1>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Page Not Found
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              Oops! Looks like this page took a wrong turn. Let's get you back on track to your coding journey.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/">
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                <Home className="w-5 h-5" />
                Back to Home
              </Button>
            </Link>

            <Link href="/learn">
              <Button size="lg" variant="outline" className="gap-2">
                <BookOpen className="w-5 h-5" />
                Start Learning
              </Button>
            </Link>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="mt-12 pt-8 border-t border-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-sm text-muted-foreground mb-4">Or try these popular pages:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/login" className="text-sm text-primary hover:underline">
                Login
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link href="/signup" className="text-sm text-primary hover:underline">
                Sign Up
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link href="/#pricing" className="text-sm text-primary hover:underline">
                Pricing
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link href="/#features" className="text-sm text-primary hover:underline">
                Features
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
