"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Ember particles for the download section
function DownloadEmber({ delay }: { delay: number }) {
  const [mounted, setMounted] = useState(false)
  const [left, setLeft] = useState("50%")

  useEffect(() => {
    setLeft(`${30 + Math.random() * 40}%`)
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.div
      className="absolute w-1.5 h-1.5 rounded-full bg-primary pointer-events-none"
      style={{ left: left, bottom: "20%" }}
      animate={{
        y: [0, -200],
        x: [0, (Math.random() - 0.5) * 60],
        opacity: [0, 1, 1, 0],
        scale: [0.5, 1.2, 0.5],
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        repeat: Infinity,
        delay: delay,
        ease: "easeOut",
      }}
    />
  )
}

export function DownloadSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="download" className="py-32 px-4 relative overflow-hidden">
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-50" />

      {/* Floating embers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <DownloadEmber key={i} delay={i * 0.3} />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Floating logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/images/logo.png"
                alt="DO or DICE"
                width={160}
                height={160}
                className="mx-auto drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.span
            className="inline-block text-primary text-sm tracking-[0.3em] uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Get Started
          </motion.span>

          <motion.h2
            className="text-5xl md:text-7xl font-bold text-foreground mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ready to Roll?
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground max-w-xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Download now and let the dice decide your fate.
            Gather your crew - it's time to prove who rules the table.
          </motion.p>

          {/* Download button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-8 text-xl font-semibold gap-3 group rounded-full shadow-2xl shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="/DoOrDice.zip" download>
                <Download className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
                Download for Windows
              </a>
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              v0.1.0 <span className="text-primary">•</span> Free to play <span className="text-primary">•</span> ~50MB
            </p>
          </motion.div>

          {/* Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-8 mb-16"
          >
            {[
              { label: "Platform", value: "Windows 10+" },
              { label: "Python", value: "3.13+ (bundled)" },
              { label: "Storage", value: "~50 MB" },
            ].map((req) => (
              <div key={req.label} className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{req.label}</p>
                <p className="text-foreground font-medium">{req.value}</p>
              </div>
            ))}
          </motion.div>

          {/* Source code */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="p-8 rounded-3xl border border-border/30 bg-card/20 backdrop-blur-sm"
          >
            <h4
              className="font-semibold text-foreground mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Build from Source
            </h4>
            <p className="text-sm text-muted-foreground mb-6">
              Clone and run with Python for development
            </p>
            <div className="bg-background/50 rounded-xl p-4 text-left font-mono text-sm overflow-x-auto">
              <div className="space-y-1 text-muted-foreground">
                <p><span className="text-primary">git</span> clone https://github.com/Paurakh977/DO-OR-DICE.git</p>
                <p><span className="text-primary">cd</span> DO-OR-DICE</p>
                <p><span className="text-primary">uv</span> sync</p>
                <p><span className="text-primary">uv</span> run main.py</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
