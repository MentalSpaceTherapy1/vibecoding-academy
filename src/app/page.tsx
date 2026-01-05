'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Trophy,
  Code2,
  Award,
  Users,
  Smartphone,
  Play,
  ArrowRight,
  Check,
  Zap,
  BookOpen,
  Flame,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const FEATURES = [
  {
    icon: Sparkles,
    title: 'AI-First Learning',
    description:
      'Master modern AI tools like Claude Code, Lovable, Bolt, and v0 to build apps through natural language.',
    color: 'from-purple-500 to-violet-600',
  },
  {
    icon: Trophy,
    title: 'Gamified Experience',
    description:
      'Earn XP, unlock badges, compete on leaderboards, and maintain streaks that keep you motivated.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: Code2,
    title: 'Real Projects',
    description:
      'Build and deploy 2 web apps and 1 mobile app. Create a portfolio that proves your skills.',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    icon: Award,
    title: 'Official Certificate',
    description:
      'Earn a verifiable certificate upon completion. Add it to LinkedIn and showcase your achievement.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Users,
    title: 'Community Support',
    description:
      'Join study groups, get help in forums, and connect with fellow learners on your journey.',
    color: 'from-rose-500 to-pink-600',
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description:
      'Learn React Native and Expo to build cross-platform mobile apps from scratch.',
    color: 'from-indigo-500 to-purple-600',
  },
]

const STATS = [
  { value: '10,000+', label: 'Students Enrolled' },
  { value: '49', label: 'Comprehensive Lessons' },
  { value: '3', label: 'Real Projects' },
  { value: '8', label: 'AI Tools Mastered' },
]

const TOOLS = [
  { name: 'Claude Code', logo: '🤖' },
  { name: 'Lovable', logo: '💜' },
  { name: 'Bolt', logo: '⚡' },
  { name: 'Replit', logo: '🔮' },
  { name: 'Vercel v0', logo: '▲' },
  { name: 'Cursor', logo: '🔷' },
]

const PRICING = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Get started with the basics',
    features: [
      'Phase 1-2 content (10 lessons)',
      'Basic exercises',
      'Community access (read-only)',
      'Limited AI playground',
    ],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'Full access to everything',
    features: [
      'All 49 lessons',
      'Unlimited exercises',
      'Project submissions',
      'Certificate upon completion',
      'Full community access',
      'Priority support',
    ],
    cta: 'Start Pro',
    popular: true,
  },
  {
    name: 'Lifetime',
    price: '$299',
    period: 'one-time',
    description: 'Forever access',
    features: [
      'Everything in Pro',
      'Lifetime access',
      'Future content updates',
      'Priority community',
      'Annual AI tool credits',
      'Exclusive workshops',
    ],
    cta: 'Get Lifetime',
    popular: false,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 animated-gradient opacity-90" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
          
          {/* Floating Elements */}
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm"
            animate={{ y: [0, 20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-40 right-20 w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm"
            animate={{ y: [0, -30, 0], rotate: [0, -15, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="container relative z-10 px-4 py-20 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                <Zap className="w-3 h-3 mr-1" />
                No coding experience required
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Learn to Build Apps
              <br />
              <span className="text-white/90">with AI</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Transform from complete beginner to full-stack developer. Just describe what you want
              to build — AI does the coding.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/signup">
                <Button size="lg" className="bg-white text-[var(--vibe-purple)] hover:bg-white/90 font-bold text-lg px-8 h-14 shadow-xl">
                  Start Learning Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 font-semibold text-lg px-8 h-14"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {STATS.map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Wave Divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                className="fill-background"
              />
            </svg>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-16 border-b">
          <div className="container px-4">
            <p className="text-center text-muted-foreground mb-8">
              Master the most powerful AI coding tools
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {TOOLS.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  className="flex items-center gap-2 text-lg font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-2xl">{tool.logo}</span>
                  <span>{tool.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24">
          <div className="container px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4">Features</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything you need to become a developer
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our comprehensive platform combines cutting-edge AI tools with proven learning
                methods to transform you into a skilled developer.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover-lift border-2 hover:border-primary/20">
                    <CardHeader>
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}
                      >
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-muted/30">
          <div className="container px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4">How It Works</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Your journey from beginner to developer
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { icon: BookOpen, title: 'Learn', desc: 'Follow interactive lessons at your pace' },
                { icon: Code2, title: 'Build', desc: 'Create real projects with AI assistance' },
                { icon: Flame, title: 'Practice', desc: 'Maintain streaks and earn XP daily' },
                { icon: Award, title: 'Certify', desc: 'Get certified and showcase your skills' },
              ].map((step, index) => (
                <motion.div
                  key={step.title}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative inline-block mb-4">
                    <div className="w-16 h-16 rounded-full gradient-hero flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-24">
          <div className="container px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4">Pricing</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Simple, transparent pricing
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that works for you. Start free, upgrade when you&apos;re ready.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {PRICING.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className={`relative h-full ${
                      plan.popular ? 'border-primary shadow-lg scale-105' : ''
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="gradient-hero text-white border-0">Most Popular</Badge>
                      </div>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">{plan.price}</span>
                        <span className="text-muted-foreground">{plan.period}</span>
                      </div>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-[var(--success)] flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className={`w-full ${plan.popular ? 'gradient-hero border-0' : ''}`}
                        variant={plan.popular ? 'default' : 'outline'}
                      >
                        {plan.cta}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 gradient-hero text-white relative overflow-hidden">
          <motion.div
            className="absolute top-10 left-10 w-24 h-24 rounded-full bg-white/10"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white/10"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />

          <div className="container px-4 text-center relative z-10">
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ready to start your coding journey?
            </motion.h2>
            <motion.p
              className="text-xl text-white/80 max-w-2xl mx-auto mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Join thousands of students who have transformed their careers with VibeCoding Academy.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link href="/signup">
                <Button size="lg" className="bg-white text-[var(--vibe-purple)] hover:bg-white/90 font-bold text-lg px-8 h-14 shadow-xl">
                  Start Learning Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
