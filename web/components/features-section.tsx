"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const features = [
  {
    title: "5 Player Battles",
    description: "Perfectly balanced for 5 players. Every roll matters, every decision counts.",
    number: "01",
  },
  {
    title: "Strategic Dice",
    description: "Six unique faces with different effects. Attack, heal, steal, or unleash power moves.",
    number: "02",
  },
  {
    title: "Victory Points",
    description: "Earn points through survival, eliminations, and strategic plays. Highest VP wins.",
    number: "03",
  },
  {
    title: "Fallen Players",
    description: "Death isn't the end. Eliminated players become kingmakers with shadow abilities.",
    number: "04",
  },
  {
    title: "No Idle Moments",
    description: "Everyone plays until the end. Eliminated? You still roll and influence the game.",
    number: "05",
  },
  {
    title: "Dynamic Rankings",
    description: "Live rankings based on VP, HP, and survival. Anyone can clinch Top 3.",
    number: "06",
  },
]

// Floating ember particle component
function FloatingEmber({ delay }: { delay: number }) {
  const [mounted, setMounted] = useState(false)
  const [left, setLeft] = useState("50%")

  useEffect(() => {
    setLeft(`${Math.random() * 100}%`)
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-primary/60 pointer-events-none"
      style={{
        left: left,
        bottom: "-10%",
      }}
      animate={{
        y: [0, -800],
        x: [0, Math.random() * 100 - 50],
        opacity: [0, 1, 1, 0],
        scale: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        repeat: Infinity,
        delay: delay,
        ease: "linear",
      }}
    />
  )
}

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, rotate: index % 2 === 0 ? -5 : 5 }}
      animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: index % 2 === 0 ? -5 : 5 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.1
      }}
      className="group relative"
    >
      {/* Animated border/glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 will-change-transform" />

      <div
        className="relative h-full p-8 rounded-2xl border border-white/10 bg-card/40 backdrop-blur-md overflow-hidden hover:border-primary/50 transition-colors duration-500 group-hover:-translate-y-2"
      >
        {/* Large number background */}
        <span
          className="absolute -top-6 -right-4 text-[140px] font-bold text-white/[0.03] leading-none select-none transition-all duration-500 group-hover:text-primary/[0.05] group-hover:scale-110"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {feature.number}
        </span>

        {/* Magma line on hover */}
        <motion.div
          className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          whileHover={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        />

        <div className="relative z-10">
          <h3
            className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {feature.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">
            {feature.description}
          </p>
        </div>

        {/* Corner shards */}
        <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-b-[30px] border-b-white/5 group-hover:border-b-primary/30 transition-all duration-500" />
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
    <section id="features" className="py-32 px-4 relative overflow-hidden" ref={containerRef}>
      {/* Floating embers background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <FloatingEmber key={i} delay={i * 0.5} />
        ))}
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          style={{ y, opacity }}
          className="text-center mb-20"
        >
          <motion.span
            className="inline-block text-primary text-sm tracking-[0.3em] uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Play
          </motion.span>
          <motion.h2
            className="text-5xl md:text-7xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            DO or DICE
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6"
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
