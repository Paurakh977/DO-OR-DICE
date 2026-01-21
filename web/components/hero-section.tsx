"use client"

import { DiceScene } from "@/components/dice-scene"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-white selection:bg-neutral-900 selection:text-white">
            
            {/* 3D Scene Container - Occupies the right side on desktop, center on mobile */}
            <div className="absolute inset-0 z-0 lg:left-[20%]">
                <DiceScene />
            </div>

            {/* Vignette for focus */}
            <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_60%_50%,transparent_20%,rgba(255,255,255,0.8)_80%,#ffffff_100%)]" />

            {/* Content Container */}
            <div className="relative z-20 flex h-full max-w-7xl mx-auto px-6 items-center">
                <div className="flex flex-col max-w-2xl gap-8 pt-10">
                    
                    {/* Badge */}
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/50 backdrop-blur-xl px-3 py-1 text-xs font-medium text-neutral-600 uppercase tracking-wider">
                            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
                            Early Access v1.0
                        </span>
                    </div>

                    {/* Typography */}
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-neutral-950">
                            Do or <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-950 via-neutral-600 to-neutral-950 animate-gradient">
                                Dice.
                            </span>
                        </h1>
                        <p className="text-xl text-neutral-500 max-w-md leading-relaxed">
                            A physics-based strategic survival game. 
                            <span className="hidden md:inline"> Define your fate with every roll in a world of pure chaos and chance.</span>
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        <Button 
                            className="h-12 px-8 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-medium transition-all hover:scale-105 active:scale-95"
                        >
                            Start Game
                            <Play className="ml-2 h-4 w-4 fill-current" />
                        </Button>
                        <Button 
                            variant="outline" 
                            className="h-12 px-8 rounded-full border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300 text-neutral-900 transition-all"
                        >
                            Read Rules
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>

                    {/* Stats / Social Proof */}
                    <div className="flex gap-8 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                        <div>
                            <p className="text-2xl font-bold text-neutral-900">10k+</p>
                            <p className="text-sm text-neutral-400 font-medium">Active Players</p>
                        </div>
                        <div className="w-px h-12 bg-neutral-100" />
                        <div>
                            <p className="text-2xl font-bold text-neutral-900">4.9</p>
                            <p className="text-sm text-neutral-400 font-medium">User Rating</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}