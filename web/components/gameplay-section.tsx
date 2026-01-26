"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"
import { Dices, Zap, Heart, Skull } from "lucide-react"

const gameplaySteps = [
  {
    step: "01",
    title: "Roll",
    subtitle: "the Dice",
    description: "On your turn, roll a standard 6-sided dice. Each face triggers a unique effect that could change everything.",
    icon: Dices,
    color: "text-primary",
  },
  {
    step: "02",
    title: "Apply",
    subtitle: "Effects",
    description: "Execute your dice result - attack enemies, heal yourself, or steal victory points from opponents.",
    icon: Zap,
    color: "text-amber-400",
  },
  {
    step: "03",
    title: "Survive",
    subtitle: "Rounds",
    description: "Earn +1 VP for surviving each round. Stay alive to maximize your points and dominate the leaderboard.",
    icon: Heart,
    color: "text-green-400",
  },
  {
    step: "04",
    title: "Become",
    subtitle: "Fallen",
    description: "At 0 HP, become a Fallen Player. Death isn't the end - you still roll and influence the living.",
    icon: Skull,
    color: "text-purple-400",
  },
]

const vpMethods = [
  { method: "Survive a round", points: "+1", color: "from-green-500/30 to-green-500/5", borderColor: "border-green-500/30", textColor: "text-green-400" },
  { method: "Eliminate player", points: "+2", color: "from-red-500/30 to-red-500/5", borderColor: "border-red-500/30", textColor: "text-red-400" },
  { method: "Pickpocket roll", points: "+1", color: "from-yellow-500/30 to-yellow-500/5", borderColor: "border-yellow-500/30", textColor: "text-yellow-400" },
  { method: "Power Move", points: "+3", color: "from-primary/30 to-primary/5", borderColor: "border-primary/30", textColor: "text-primary" },
]

function StepCard({ step, index }: { step: typeof gameplaySteps[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const Icon = step.icon

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="group relative p-7 rounded-2xl border border-border/30 bg-card/30 backdrop-blur-md hover:border-primary/30 transition-all duration-300 overflow-hidden">

        {/* Step number with enhanced glow */}
        <div className="absolute -top-8 -left-4">
          <span
            className={`text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b ${step.color} to-transparent opacity-20 group-hover:opacity-35 transition-opacity duration-300`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {step.step}
          </span>
        </div>

        {/* Animated line connector */}
        <motion.div
          className="absolute top-1/2 -left-12 w-8 h-0.5 bg-gradient-to-r from-transparent to-primary hidden lg:block"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: index * 0.2 + 0.5 }}
          style={{ transformOrigin: "right" }}
        />

        {/* Content */}
        <div className="relative z-10 pt-7">
          {/* Icon */}
          <div className="mb-4 inline-block">
            <div className="w-12 h-12 rounded-xl bg-card/70 border border-border/40 flex items-center justify-center group-hover:border-primary/30 transition-colors duration-300">
              <Icon className={`w-6 h-6 ${step.color}`} />
            </div>
          </div>

          <h3
            className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-1"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {step.title}
          </h3>
          <span className={`text-2xl md:text-3xl font-light ${step.color}`}>
            {step.subtitle}
          </span>
          <p className="text-muted-foreground mt-4 leading-relaxed group-hover:text-foreground/80 transition-colors">
            {step.description}
          </p>
        </div>
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
    <section id="gameplay" className="py-24 sm:py-28 px-4 relative overflow-hidden" ref={containerRef}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14 sm:mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block text-primary text-sm tracking-[0.3em] uppercase mb-4 font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            How to Play
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            The <span className="text-primary">Flow</span>
          </motion.h2>
          <motion.div
            className="w-24 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent mx-auto mt-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Steps with animated line */}
        <div className="relative">
          {/* Vertical connecting line with pulse effect */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/20 -translate-x-1/2 hidden lg:block">
            {/* Animated fill */}
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-primary to-transparent"
              style={{ height: lineHeight }}
            />
            {/* Pulsing dot at the end of the line */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full"
              style={{ top: lineHeight }}
              animate={{
                boxShadow: [
                  "0 0 10px 2px rgba(255,107,0,0.3)",
                  "0 0 20px 4px rgba(255,107,0,0.5)",
                  "0 0 10px 2px rgba(255,107,0,0.3)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>

          <div className="space-y-8 lg:space-y-20">
            {gameplaySteps.map((step, index) => (
              <div
                key={step.step}
                className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-20' : 'lg:ml-auto lg:pl-20'}`}
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
            className="text-2xl md:text-3xl font-semibold text-center text-foreground mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Earning <span className="text-primary">Victory Points</span>
          </h3>
          <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">
            Multiple paths to victory. Master them all.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {vpMethods.map((item, index) => (
              <motion.div
                key={item.method}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className={`relative p-6 rounded-2xl border ${item.borderColor} bg-gradient-to-br ${item.color} backdrop-blur-md overflow-hidden group cursor-pointer transition-transform`}
              >
                {/* Hover glow */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${item.color} blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />

                <span
                  className="absolute -top-6 -right-6 text-8xl font-bold text-foreground/5 group-hover:text-primary/10 transition-colors duration-300"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  VP
                </span>
                <div className="relative z-10">
                  <span
                    className={`text-5xl font-bold ${item.textColor}`}
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {item.points}
                  </span>
                  <p className="text-foreground mt-2 font-medium group-hover:text-primary transition-colors">
                    {item.method}
                  </p>
                </div>

                {/* Animated border on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-primary/50 opacity-0 group-hover:opacity-100"
                  initial={false}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
