"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Download, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#gameplay", label: "How to Play" },
  { href: "#rules", label: "Rules" },
  { href: "#download", label: "Download" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = navLinks.map(link => link.href.slice(1))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: "smooth" })
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-background/80 backdrop-blur-2xl border-b border-primary/10 shadow-lg shadow-primary/5"
            : "bg-transparent"
        )}
      >
        {/* Glow line at bottom when scrolled */}
        {isScrolled && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}

        <nav className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Image
                src="/images/logo.png"
                alt="DO or DICE"
                width={40}
                height={40}
                className="relative group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span
              className="font-bold text-foreground hidden sm:block tracking-tight text-lg group-hover:text-glow transition-all duration-300"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              DO <span className="text-primary font-light italic">or</span> DICE
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={cn(
                  "relative px-5 py-2.5 text-sm font-medium transition-all duration-300 rounded-lg",
                  activeSection === link.href.slice(1)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {activeSection === link.href.slice(1) && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-primary/10 rounded-lg -z-10 border border-primary/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
            <div className="w-px h-6 bg-border/50 mx-3" />
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-lg font-semibold px-5 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
              asChild
            >
              <a href="/DoOrDice.zip" download className="flex items-center">
                <Download className="w-4 h-4" />
                Get Game
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 text-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/10"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-2xl md:hidden"
          >
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />

            <nav className="relative flex flex-col items-center justify-center h-full gap-8 p-8">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  onClick={() => scrollToSection(link.href)}
                  className="text-4xl font-bold text-foreground hover:text-primary transition-all duration-300 hover:text-glow"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-8"
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground gap-3 px-10 py-7 text-xl rounded-2xl font-bold animate-pulse-glow"
                  asChild
                >
                  <a href="/DoOrDice.zip" download onClick={() => setIsMobileMenuOpen(false)} className="flex items-center">
                    <Download className="w-6 h-6" />
                    Download Game
                  </a>
                </Button>
              </motion.div>

              {/* Decorative flame */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
              >
                <Flame className="w-8 h-8 text-primary/30 animate-pulse" />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
