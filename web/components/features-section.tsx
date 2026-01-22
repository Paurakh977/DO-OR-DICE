"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"
import { Flame, Star, Shield, Skull, Zap, Trophy, Users, Dna, Activity } from "lucide-react"

const features = [
  {
    title: "5-Player Chaos",
    description: "Balanced ecosystem. Every decision creates ripples. 1 vs 4 or free-for-all?",
    icon: Users,
    color: "from-orange-400 to-red-600"
  },
  {
    title: "Tactical Dice",
    description: "Six unique faces. Attack, heal, steal, or risk it all for a Power Move.",
    icon: Dna,
    color: "from-amber-400 to-orange-600"
  },
  {
    title: "Victory Points",
    description: "Survival is currency. Eliminate foes or outlast them to stack VP.",
    icon: Trophy,
    color: "from-yellow-400 to-amber-600"
  },
  {
    title: "Fallen Ghosts",
    description: "Death awaits, but it is not the end. Haunt the living from the shadows.",
    icon: Skull,
    color: "from-red-500 to-rose-900"
  },
  {
    title: "Live Reaction",
    description: "No downtime. Defend yourself even when it's not your turn.",
    icon: Activity,
    color: "from-orange-300 to-red-500"
  },
  {
    title: "Kingmaker",
    description: "The Fallen decide the winner. Bargain for your life.",
    icon: Star,
    color: "from-rose-400 to-red-700"
  },
]

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className="group relative h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative h-full p-8 rounded-3xl bg-[#0a0a0a] border border-neutral-800/50 hover:border-orange-500/30 transition-colors duration-500 overflow-hidden">
        {/* Hover Glow */}
        <div className="absolute top-0 right-0 p-20 bg-orange-500/5 blur-[100px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Header */}
        <div className="flex items-start justify-between mb-8 relative z-10">
          <div className={`p-3 rounded-2xl bg-neutral-900/50 border border-neutral-800 text-white group-hover:scale-110 transition-transform duration-500`}>
            <feature.icon className="w-6 h-6" />
          </div>
          <span className="text-neutral-700 font-mono text-xs tracking-widest group-hover:text-orange-500/50 transition-colors">
            0{index + 1}
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-4">
          <h3
            className="text-2xl font-bold text-neutral-100 group-hover:text-orange-50 transition-colors duration-300"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {feature.title}
          </h3>
          <p className="text-neutral-500 text-sm leading-relaxed group-hover:text-neutral-400 transition-colors duration-300">
            {feature.description}
          </p>
        </div>

        {/* Bottom Gradient Line */}
        <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${feature.color} group-hover:w-full transition-all duration-700 ease-out`} />
      </div>
    </motion.div>
  )
}

export function FeaturesSection() {
  const containerRef = useRef(null)

  return (
    <section id="features" className="py-32 px-6 relative bg-black overflow-hidden" ref={containerRef}>
      {/* Ambient Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-orange-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-red-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="max-w-xl">
            <span className="text-orange-500 font-mono text-xs tracking-[0.2em] uppercase mb-4 block">
              Core Mechanics
            </span>
            <h2
              className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[0.9]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              ENGINEERED FOR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
                CHAOS.
              </span>
            </h2>
          </div>
          <p className="text-neutral-500 max-w-sm text-sm leading-relaxed md:text-right">
            Minimal luck. Maximum psychology. The dice decide the action, but you decide the outcome.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
