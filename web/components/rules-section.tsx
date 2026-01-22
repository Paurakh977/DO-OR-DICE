"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react"

const diceEffects = [
  { face: 1, name: "BACKFIRE", effect: "-3 HP", target: "Self", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20", icon: Dice1 },
  { face: 2, name: "JAB", effect: "-2 HP", target: "Target", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", icon: Dice2 },
  { face: 3, name: "STEAL", effect: "+1 VP", target: "Pickpocket", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", icon: Dice3 },
  { face: 4, name: "STRIKE", effect: "-4 HP", target: "Target", color: "text-orange-500", bg: "bg-orange-600/10", border: "border-orange-600/20", icon: Dice4 },
  { face: 5, name: "RECOVER", effect: "+3 HP", target: "Heal", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", icon: Dice5 },
  { face: 6, name: "POWER", effect: "CLUTCH", target: "-6HP / +3VP", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", icon: Dice6 },
]

function DiceCard({ dice, index }: { dice: typeof diceEffects[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`group relative p-6 rounded-2xl border ${dice.border} ${dice.bg} overflow-hidden hover:scale-105 transition-transform duration-300`}
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <span className={`text-xs font-bold tracking-widest ${dice.color} mb-1 opacity-70`}>{dice.name}</span>
          <span className="text-2xl font-bold text-white mb-2">{dice.effect}</span>
          <span className="text-xs text-neutral-400 bg-neutral-900/50 px-2 py-1 rounded inline-block w-fit">{dice.target}</span>
        </div>
        <div className={`p-3 rounded-xl bg-black/20 ${dice.color}`}>
          <dice.icon size={24} />
        </div>
      </div>
      <div className={`absolute inset-0 bg-gradient-to-r ${dice.color.replace('text-', 'from-')}/0 via-transparent to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
    </motion.div>
  )
}

export function RulesSection() {
  const containerRef = useRef(null)

  return (
    <section id="rules" className="py-32 px-6 bg-[#0a0a0a] relative overflow-hidden text-neutral-200" ref={containerRef}>
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1"
          >
            <h2 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter" style={{ fontFamily: "var(--font-heading)" }}>
              THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">CODEX</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 space-y-6 pt-4"
          >
            <div className="flex gap-4 p-6 rounded-2xl bg-neutral-900 border border-neutral-800">
              <div className="space-y-1">
                <p className="text-sm text-neutral-500 uppercase tracking-widest">Victory Condition</p>
                <p className="text-xl font-medium text-white">Survivor or 12 Rounds</p>
              </div>
              <div className="w-px bg-neutral-800" />
              <div className="space-y-1">
                <p className="text-sm text-neutral-500 uppercase tracking-widest">Ranking</p>
                <p className="text-xl font-medium text-orange-500">VP &gt; HP &gt; Roll</p>
              </div>
            </div>
            <p className="text-neutral-500 leading-relaxed">
              Rules are simple: Roll high, act fast, and don't die. The game ends when only one player remains or the round limit is reached.
            </p>
          </motion.div>
        </div>

        {/* Dice Grid */}
        <div className="mb-20">
          <h3 className="text-sm font-mono text-neutral-500 mb-8 uppercase tracking-widest pl-2">Dice Permutations</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {diceEffects.map((dice, index) => (
              <DiceCard key={dice.face} dice={dice} index={index} />
            ))}
          </div>
        </div>

        {/* Fallen Mechanics */}
        <div className="rounded-3xl bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <h3 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-heading)" }}>Fallen Protocols</h3>
              <p className="text-neutral-400 max-w-lg">Even in death, you serve. Roll as a ghost to bless your allies or curve your enemies' fate.</p>
            </div>

            <div className="flex gap-4">
              <div className="text-center p-4 bg-black/40 rounded-xl border border-neutral-800 min-w-[100px]">
                <span className="block text-2xl font-bold text-emerald-500 mb-1">3-4</span>
                <span className="text-[10px] uppercase text-neutral-500 tracking-wider">Blessing</span>
              </div>
              <div className="text-center p-4 bg-black/40 rounded-xl border border-neutral-800 min-w-[100px]">
                <span className="block text-2xl font-bold text-red-500 mb-1">5-6</span>
                <span className="text-[10px] uppercase text-neutral-500 tracking-wider">Curse</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
