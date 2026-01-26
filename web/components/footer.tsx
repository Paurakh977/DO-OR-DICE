"use client"

import { motion } from "framer-motion"
import { Github, Heart, Flame } from "lucide-react"
import Image from "next/image"

const footerLinks = [
  { href: "#features", label: "Features" },
  { href: "#gameplay", label: "How to Play" },
  { href: "#rules", label: "Rules" },
]

export function Footer() {
  return (
    <footer className="py-20 px-4 border-t border-border/20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-10"
        >
          {/* Logo */}
          <div className="flex items-center gap-4 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Image
                src="/images/logo.png"
                alt="DO or DICE"
                width={48}
                height={48}
                className="relative opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <span
              className="text-xl font-bold text-foreground/80 group-hover:text-foreground transition-colors"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              DO <span className="text-primary/80 font-light italic">or</span> DICE
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-8">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://github.com/Paurakh977/DO-OR-DICE"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Github className="w-4 h-4" />
              Source
            </a>
          </div>

          {/* Divider with flame */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-border/50" />
            <Flame className="w-5 h-5 text-primary/40" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-border/50" />
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground/60 mb-2">
              © 2025 DO or DICE. Built with Python & Pygame.
            </p>
            <p className="text-xs text-muted-foreground/40 flex items-center justify-center gap-1">
              Made with <Heart className="w-3 h-3 text-red-500/60 fill-red-500/60" /> for dice enthusiasts
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
