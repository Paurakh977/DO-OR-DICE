"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"

const gameplaySteps = [
  {
    step: "01",
    title: "The Roll",
    subtitle: "Fate is cast",
    description: "Roll the 6-sided obsidian die. Every face holds a different power. Will you Strike, Heal, or Gamble?",
  },
  {
    step: "02",
    title: "The Action",
    subtitle: "Execute your will",
    description: "Target your enemies or bolster your defenses. The choice is yours, but the consequences are shared.",
  },
  {
    step: "03",
    title: "The Survival",
    subtitle: "Outlast the chaos",
    description: "Survive the round to earn Victory Points via passive income. Staying alive is the most profitable strategy.",
  },
  {
    step: "04",
    title: "The Afterlife",
    subtitle: "Death is power",
    description: "If you fall, you rise as a Fallen. Roll to buf allies or curse your killers. You decide who wins.",
  },
]

function GameplayStep({ step, index, isLast }: { step: typeof gameplaySteps[0]; index: number; isLast: boolean }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref} className="relative flex gap-8 md:gap-16">
      {/* Timeline Line */}
      <div className="flex flex-col items-center">
        <div className="w-px h-full bg-neutral-800 relative">
          {!isLast && (
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-orange-500 to-transparent"
              initial={{ height: "0%" }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          )}
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="pb-24 w-full"
        initial={{ opacity: 0, x: 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex items-start gap-6">
          <span className="text-6xl md:text-8xl font-black text-neutral-800/50 select-none leading-none absolute -left-4 md:-left-8 -top-4 -z-10" style={{ fontFamily: "var(--font-heading)" }}>
            {step.step}
          </span>
          <div className="relative z-10 w-full">
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              {step.title}
            </h3>
            <p className="text-orange-500 text-lg md:text-xl font-medium mb-6 italic font-serif">
              {step.subtitle}
            </p>
            <div className="p-6 md:p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm hover:border-orange-500/30 transition-colors duration-500 max-w-2xl">
              <p className="text-neutral-400 text-base leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Node */}
      <motion.div
        className="absolute left-[0px] -translate-x-1/2 top-2 w-4 h-4 rounded-full bg-neutral-900 border-2 border-neutral-700 z-20"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1, borderColor: "#f97316" }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 rounded-full bg-orange-500 opacity-20 animate-ping" />
      </motion.div>
    </div>
  )
}

export function GameplaySection() {
  const containerRef = useRef(null)

  return (
    <section id="gameplay" className="py-32 px-6 bg-[#050505] relative overflow-hidden" ref={containerRef}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="mb-32 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-neutral-100 to-neutral-800" style={{ fontFamily: "var(--font-heading)" }}>
            THE FLOW
          </h2>
        </motion.div>

        <div className="relative pl-4 md:pl-20">
          {gameplaySteps.map((step, index) => (
            <GameplayStep
              key={step.step}
              step={step}
              index={index}
              isLast={index === gameplaySteps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
