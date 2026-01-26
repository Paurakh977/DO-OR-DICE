"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"
import { Users, Dices, Trophy, Skull, Clock, BarChart3 } from "lucide-react"

const features = [
  {
    title: "5 Player Battles",
    description: "Perfectly balanced for 5 players. Every roll matters, every decision counts.",
    number: "01",
    icon: Users,
    gradient: "from-blue-500/10 to-transparent",
  },
  {
    title: "Strategic Dice",
    description: "Six unique faces with different effects. Attack, heal, steal, or unleash power moves.",
    number: "02",
    icon: Dices,
    gradient: "from-primary/10 to-transparent",
  },
  {
    title: "Victory Points",
    description: "Earn points through survival, eliminations, and strategic plays. Highest VP wins.",
    number: "03",
    icon: Trophy,
    gradient: "from-yellow-500/10 to-transparent",
  },
  {
    title: "Fallen Players",
    description: "Death isn't the end. Eliminated players become kingmakers with shadow abilities.",
    number: "04",
    icon: Skull,
    gradient: "from-purple-500/10 to-transparent",
  },
  {
    title: "No Idle Moments",
    description: "Everyone plays until the end. Eliminated? You still roll and influence the game.",
    number: "05",
    icon: Clock,
    gradient: "from-green-500/10 to-transparent",
  },
  {
    title: "Dynamic Rankings",
    description: "Live rankings based on VP, HP, and survival. Anyone can clinch Top 3.",
    number: "06",
    icon: BarChart3,
    gradient: "from-red-500/10 to-transparent",
  },
]

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const Icon = feature.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -15 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.1
      }}
      className="group relative"
    >
      <div
        className={`relative h-full p-7 rounded-2xl border border-border/30 bg-gradient-to-br ${feature.gradient} bg-card/30 backdrop-blur-md overflow-hidden transition-all duration-300 group-hover:border-primary/30 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-primary/10`}
      >
        {/* Large number background */}
        <span
          className="absolute -top-8 -right-4 text-[120px] font-bold text-white/[0.02] leading-none select-none transition-all duration-500 group-hover:text-primary/8"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {feature.number}
        </span>

        {/* Top glow line on hover */}
        <motion.div
          className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent origin-center"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />

        <div className="relative z-10">
          <div className="mb-5 inline-block">
            <div className="w-12 h-12 rounded-xl bg-card/70 border border-border/40 flex items-center justify-center group-hover:border-primary/30 transition-colors duration-300">
              <Icon className="w-6 h-6 text-primary" />
            </div>
          </div>

          <h3
            className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {feature.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
            {feature.description}
          </p>
        </div>

        {/* Corner decoration */}
        <div className="absolute bottom-0 right-0 w-20 h-20 overflow-hidden">
          <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[50px] border-l-transparent border-b-[50px] border-b-white/5 group-hover:border-b-primary/30 transition-all duration-500" />
        </div>
      </div>
    </motion.div>
  )
}

export function FeaturesSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section id="features" className="py-24 sm:py-28 px-4 relative overflow-hidden" ref={containerRef}>
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-primary/4 rounded-full blur-[170px] pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div style={{ y, opacity }} className="text-center mb-14 sm:mb-16">
          <motion.span
            className="inline-block text-primary text-sm tracking-[0.3em] uppercase mb-4 font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Play
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            DO or <span className="text-primary">DICE</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-base sm:text-lg mt-4 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Every feature designed for maximum excitement and strategic depth
          </motion.p>
          <motion.div
            className="w-24 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent mx-auto mt-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
