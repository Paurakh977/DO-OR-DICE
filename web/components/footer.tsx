"use client"

import { motion } from "framer-motion"
import { Github, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-24 px-6 border-t border-neutral-900 bg-[#050505]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex flex-col items-center md:items-start gap-4">
          <span className="text-2xl font-black text-white tracking-tighter" style={{ fontFamily: "var(--font-heading)" }}>
            DO OR DICE.
          </span>
          <p className="text-neutral-500 text-sm">
            © 2026 Open Source Game.
          </p>
        </div>

        <div className="flex items-center gap-8">
          <a href="#features" className="text-neutral-400 hover:text-white transition-colors text-sm font-medium">Features</a>
          <a href="#rules" className="text-neutral-400 hover:text-white transition-colors text-sm font-medium">Rules</a>
          <a href="#download" className="text-neutral-400 hover:text-white transition-colors text-sm font-medium">Install</a>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Paurakh977/DO-OR-DICE"
            className="p-3 rounded-full bg-neutral-900 border border-neutral-800 text-white hover:bg-neutral-800 transition-colors"
          >
            <Github size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}
