"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Download, Github, Cpu, HardDrive, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function DownloadSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="download" className="py-24 sm:py-28 px-4 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-linear-to-t from-primary/8 via-background to-background" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-225 h-130 bg-primary/8 rounded-full blur-[170px] opacity-60" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center w-full flex flex-col items-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12 relative inline-block text-center"
          >
            <div className="absolute inset-0 bg-primary/15 rounded-full blur-3xl scale-150" />
            <Image
              src="/images/logo.png"
              alt="DO or DICE"
              width={140}
              height={140}
              className="relative mx-auto opacity-90"
            />
          </motion.div>

          {/* Kicker */}
          <motion.span
            className="inline-flex items-center justify-center gap-2 text-primary text-sm tracking-[0.22em] uppercase mb-4 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Download
          </motion.span>

          <motion.h2
            className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ready to roll?
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Download the latest build and start playing with your crew.
          </motion.p>

          {/* Download button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16 flex flex-col items-center"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold gap-3 rounded-full"
              asChild
            >
              <a href="/DoOrDice.zip" download className="flex items-center">
                <Download className="w-5 h-5" />
                Download (Windows)
              </a>
            </Button>
            <p className="text-sm text-muted-foreground mt-6 flex items-center justify-center gap-3">
              <span>v0.1.0</span>
              <span className="text-primary">•</span>
              <span className="text-green-400 font-medium">Free to play</span>
              <span className="text-primary">•</span>
              <span>~50MB</span>
            </p>
          </motion.div>

          {/* Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-6 mb-16"
          >
            {[
              { label: "Platform", value: "Windows 10+", icon: Monitor },
              { label: "Python", value: "3.13+ (bundled)", icon: Cpu },
              { label: "Storage", value: "~50 MB", icon: HardDrive },
            ].map((req, i) => (
              <motion.div
                key={req.label}
                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-card/30 border border-border/30 hover:border-primary/30 transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <req.icon className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{req.label}</p>
                  <p className="text-foreground font-medium">{req.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Source code card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="p-8 rounded-3xl border border-border/30 bg-linear-to-br from-card/40 to-transparent backdrop-blur-xl max-w-2xl mx-auto w-full"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Github className="w-6 h-6 text-foreground" />
              <h4
                className="font-bold text-foreground text-xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Build from Source
              </h4>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Clone and run with Python for development
            </p>
            <div className="bg-background/60 rounded-2xl p-5 text-left font-mono text-sm overflow-x-auto border border-border/30">
              <div className="space-y-2 text-muted-foreground">
                <p><span className="text-primary font-semibold">git</span> clone https://github.com/Paurakh977/DO-OR-DICE.git</p>
                <p><span className="text-primary font-semibold">cd</span> DO-OR-DICE</p>
                <p><span className="text-primary font-semibold">uv</span> sync</p>
                <p><span className="text-primary font-semibold">uv</span> run main.py</p>
              </div>
            </div>
            <a
              href="https://github.com/Paurakh977/DO-OR-DICE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" />
              View on GitHub →
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
