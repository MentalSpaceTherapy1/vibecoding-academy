'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin, Youtube, MessageCircle } from 'lucide-react'

const FOOTER_LINKS = {
  Product: [
    { href: '/features', label: 'Features' },
    { href: '/curriculum', label: 'Curriculum' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/certificate', label: 'Certificate' },
  ],
  Resources: [
    { href: '/blog', label: 'Blog' },
    { href: '/docs', label: 'Documentation' },
    { href: '/community', label: 'Community' },
    { href: '/support', label: 'Support' },
  ],
  Company: [
    { href: '/about', label: 'About' },
    { href: '/careers', label: 'Careers' },
    { href: '/contact', label: 'Contact' },
    { href: '/press', label: 'Press Kit' },
  ],
  Legal: [
    { href: '/terms', label: 'Terms of Service' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/cookies', label: 'Cookie Policy' },
  ],
}

const SOCIAL_LINKS = [
  { href: 'https://twitter.com/vibecoding', icon: Twitter, label: 'Twitter' },
  { href: 'https://github.com/vibecoding', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com/company/vibecoding', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://youtube.com/@vibecoding', icon: Youtube, label: 'YouTube' },
  { href: 'https://discord.gg/vibecoding', icon: MessageCircle, label: 'Discord' },
]

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 lg:grid-cols-6">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <motion.div
                className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <span className="text-white font-bold text-xl">V</span>
              </motion.div>
              <span className="font-bold text-2xl">
                <span className="text-gradient">Vibe</span>Coding
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Transform from complete beginner to full-stack developer using AI-powered coding
              tools. No prior experience needed.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 mt-8 border-t">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} VibeCoding Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/cookies"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
