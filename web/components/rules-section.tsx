"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Users, Heart, Trophy, Target, Shield, Flame } from "lucide-react"

const diceEffects = [
  { face: 1, name: "Backfire", effect: "-3 HP", target: "Self", color: "text-red-400", bgColor: "from-red-500/20 to-red-500/5", borderColor: "hover:border-red-500/50", description: "You hurt yourself", icon: "💥" },
  { face: 2, name: "Jab", effect: "-2 HP", target: "Target", color: "text-orange-400", bgColor: "from-orange-500/20 to-orange-500/5", borderColor: "hover:border-orange-500/50", description: "Quick strike", icon: "👊" },
  { face: 3, name: "Pickpocket", effect: "+1 VP", target: "Steal", color: "text-yellow-400", bgColor: "from-yellow-500/20 to-yellow-500/5", borderColor: "hover:border-yellow-500/50", description: "Steal from any", icon: "💰" },
  { face: 4, name: "Strike", effect: "-4 HP", target: "Target", color: "text-primary", bgColor: "from-primary/20 to-primary/5", borderColor: "hover:border-primary/50", description: "Powerful blow", icon: "⚔️" },
  { face: 5, name: "Recover", effect: "+3 HP", target: "Self", color: "text-green-400", bgColor: "from-green-500/20 to-green-500/5", borderColor: "hover:border-green-500/50", description: "Heal yourself", icon: "💚" },
  { face: 6, name: "Power Move", effect: "Choice", target: "-6HP / +3VP", color: "text-amber-300", bgColor: "from-amber-500/20 to-amber-500/5", borderColor: "hover:border-amber-500/50", description: "Ultimate decision", icon: "⭐" },
]

const fallenEffects = [
  { roll: "1-2", effect: "Nothing", color: "text-muted-foreground", bgColor: "from-gray-500/10 to-transparent" },
  { roll: "3-4", effect: "+2 HP or +1 VP", color: "text-green-400", bgColor: "from-green-500/20 to-green-500/5" },
  { roll: "5-6", effect: "-2 HP or -1 VP", color: "text-red-400", bgColor: "from-red-500/20 to-red-500/5" },
]

function DiceEffectCard({ dice, index }: { dice: typeof diceEffects[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50, rotateY: -10 }}
      animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: -50, rotateY: -10 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Hover glow */}
      <div className={`absolute -inset-1 rounded-2xl bg-linear-to-r ${dice.bgColor} blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`} />

      <div className={cn(
        `relative flex items-center gap-5 p-5 rounded-2xl border border-border/30 bg-linear-to-br ${dice.bgColor} backdrop-blur-md transition-all duration-300`,
        dice.borderColor,
        isHovered && "scale-[1.02] -translate-y-1 shadow-xl"
      )}>
        {/* Dice face number with glow */}
        <div className="relative">
          <div className={cn(
            "absolute inset-0 rounded-xl blur-lg transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )} style={{ backgroundColor: `color-mix(in oklch, currentColor 30%, transparent)` }} />
          <div className={cn(
            "relative w-16 h-16 rounded-xl flex items-center justify-center text-3xl font-bold transition-all duration-300",
            "bg-card/80 border border-border/50",
            isHovered && "border-primary/50 scale-110"
          )} style={{ fontFamily: "var(--font-heading)" }}>
            <span className={dice.color}>{dice.face}</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <span className={cn("text-xl font-bold", dice.color)} style={{ fontFamily: "var(--font-heading)" }}>
              {dice.name}
            </span>
            <span className="text-2xl">{dice.icon}</span>
          </div>
          <span className="text-sm text-muted-foreground block">{dice.target}</span>
          <span className="text-xs text-foreground/60 hidden sm:block mt-1">{dice.description}</span>
        </div>

        {/* Effect */}
        <div className="text-right">
          <span className={cn("text-2xl font-bold tabular-nums", dice.color)} style={{ fontFamily: "var(--font-heading)" }}>
            {dice.effect}
          </span>
        </div>

        {/* Animated border line */}
        <motion.div
          className={`absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-transparent ${dice.bgColor.replace('from-', 'via-').replace('/20', '/60').replace('to-', '')} to-transparent`}
          style={{ width: isHovered ? "100%" : "0%" }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )
}

export function RulesSection() {
  const containerRef = useRef(null)

  return (
    <section id="rules" className="py-24 sm:py-28 px-4 relative overflow-hidden" ref={containerRef}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-secondary/20 to-background" />

      {/* Ambient glows */}
      <div className="absolute top-1/4 right-0 w-125 h-125 bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-100 h-100 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

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
            Master the Game
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            The <span className="text-primary">Rules</span>
          </motion.h2>
          <motion.div
            className="w-24 h-px bg-linear-to-r from-transparent via-primary/70 to-transparent mx-auto mt-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Setup & Win */}
          <div className="space-y-12">
            {/* Setup */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3
                className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <span className="w-10 h-0.5 bg-linear-to-r from-primary to-transparent" />
                Setup
              </h3>

              <div className="space-y-4">
                {[
                  { label: "Players", value: "5", desc: "Exactly", icon: Users, color: "from-blue-500/20 to-blue-500/5" },
                  { label: "Starting HP", value: "20", desc: "Each", icon: Heart, color: "from-red-500/20 to-red-500/5" },
                  { label: "Starting VP", value: "0", desc: "Earn through play", icon: Trophy, color: "from-yellow-500/20 to-yellow-500/5" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`group flex items-center gap-5 p-5 rounded-2xl bg-linear-to-br ${item.color} border border-border/30 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-card/80 border border-border/50 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span
                      className="text-5xl font-bold text-primary w-20"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {item.value}
                    </span>
                    <div>
                      <p className="font-medium text-foreground text-lg">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Win condition */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3
                className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <span className="w-10 h-0.5 bg-linear-to-r from-primary to-transparent" />
                Victory
              </h3>

              <div className="p-8 rounded-3xl border border-border/30 bg-linear-to-br from-primary/10 to-transparent backdrop-blur-md">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-6 h-6 text-primary" />
                  <p className="text-foreground font-semibold text-lg">Game ends when:</p>
                </div>
                <ul className="space-y-3 text-muted-foreground mb-8 ml-2">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-foreground/80">Only 1 player remains alive</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-foreground/80">12 rounds completed</span>
                  </li>
                </ul>
                <div className="pt-6 border-t border-border/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-5 h-5 text-primary" />
                    <p className="text-sm text-primary font-semibold uppercase tracking-wider">Ranking Priority</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <span className="text-primary font-medium">VP</span> → HP at elimination → Fewer fallen rounds → Final roll
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Dice effects */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3
                className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <span className="w-10 h-0.5 bg-linear-to-r from-primary to-transparent" />
                <Flame className="w-6 h-6 text-primary" />
                Dice Effects
              </h3>

              <div className="space-y-3">
                {diceEffects.map((dice, index) => (
                  <DiceEffectCard key={dice.face} dice={dice} index={index} />
                ))}
              </div>
            </motion.div>

          </div>
        </div>

        {/* Shadow Effects - centered full width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 sm:mt-20"
        >
          <h3
            className="text-2xl font-bold text-foreground mb-8 text-center"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="inline-flex items-center gap-3">
              <span className="w-10 h-0.5 bg-linear-to-r from-purple-500/50 to-transparent" />
              Shadow Effects
              <span className="text-sm font-normal text-purple-400">(Fallen Players)</span>
            </span>
          </h3>

          <div className="mx-auto max-w-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {fallenEffects.map((effect, i) => (
                <motion.div
                  key={effect.roll}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -3 }}
                  className={`p-5 rounded-2xl border border-purple-500/20 bg-linear-to-br ${effect.bgColor} text-center backdrop-blur-md cursor-pointer hover:border-purple-500/35 transition-all duration-300`}
                >
                  <span
                    className="text-3xl font-bold text-foreground block mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {effect.roll}
                  </span>
                  <span className={cn("text-sm font-medium", effect.color)}>{effect.effect}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-6 italic text-center">
              ⚠️ Cannot affect the same player two rounds in a row
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
