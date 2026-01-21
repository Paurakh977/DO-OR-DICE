"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"

const gameplaySteps = [
  {
    step: "01",
    title: "Roll",
    subtitle: "the Dice",
    description: "On your turn, roll a standard 6-sided dice. Each face triggers a unique effect that could change everything.",
  },
  {
    step: "02",
    title: "Apply",
    subtitle: "Effects",
    description: "Execute your dice result - attack enemies, heal yourself, or steal victory points from opponents.",
  },
  {
    step: "03",
    title: "Survive",
    subtitle: "Rounds",
    description: "Earn +1 VP for surviving each round. Stay alive to maximize your points and dominate the leaderboard.",
  },
  {
    step: "04",
    title: "Become",
    subtitle: "Fallen",
    description: "At 0 HP, become a Fallen Player. Death isn't the end - you still roll and influence the living.",
  },
]

const vpMethods = [
  { method: "Survive a round", points: "+1", color: "from-green-500/20 to-green-500/5" },
  { method: "Eliminate player", points: "+2", color: "from-red-500/20 to-red-500/5" },
  { method: "Pickpocket roll", points: "+1", color: "from-yellow-500/20 to-yellow-500/5" },
  { method: "Power Move", points: "+3", color: "from-primary/20 to-primary/5" },
]

function StepCard({ step, index }: { step: typeof gameplaySteps[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="group relative p-8 rounded-3xl border border-border/30 bg-gradient-to-br from-card/50 to-transparent backdrop-blur-sm hover:border-primary/30 transition-all duration-500">
        {/* Step number with glow */}
        <div className="absolute -top-6 -left-2">
          <span
            className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-primary/40 to-transparent"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {step.step}
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 pt-8">
          <h3
            className="text-3xl md:text-4xl font-bold text-foreground mb-1"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {step.title}
          </h3>
          <span className="text-2xl md:text-3xl font-light text-primary">
            {step.subtitle}
          </span>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Corner decoration */}
        <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-primary/20 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  )
}

export function GameplaySection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.6], ["0%", "100%"])

  return (
    <section id="gameplay" className="py-32 px-4 relative overflow-hidden" ref={containerRef}>
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block text-primary text-sm tracking-[0.3em] uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            How to Play
          </motion.span>
          <motion.h2
            className="text-5xl md:text-7xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            The Flow
          </motion.h2>
        </motion.div>

        {/* Steps with animated line */}
        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/30 -translate-x-1/2 hidden lg:block">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary to-primary/20"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-8 lg:space-y-16">
            {gameplaySteps.map((step, index) => (
              <div
                key={step.step}
                className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-16' : 'lg:ml-auto lg:pl-16'}`}
              >
                <StepCard step={step} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* VP Earning section */}
        <motion.div
          className="mt-32"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h3
            className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Earning <span className="text-primary">Victory Points</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {vpMethods.map((item, index) => (
              <motion.div
                key={item.method}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`relative p-6 rounded-2xl border border-border/30 bg-gradient-to-br ${item.color} backdrop-blur-sm overflow-hidden group`}
              >
                <span
                  className="absolute -top-4 -right-4 text-7xl font-bold text-foreground/5 group-hover:text-primary/10 transition-colors"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  VP
                </span>
                <div className="relative z-10">
                  <span
                    className="text-4xl font-bold text-primary"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {item.points}
                  </span>
                  <p className="text-foreground mt-2 font-medium">{item.method}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
