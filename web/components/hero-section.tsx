import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Users, Dices, Trophy } from "lucide-react"

export function HeroSection() {
    return (
        <section className="relative w-full overflow-hidden bg-background">
            {/* Calm, minimal background */}
            <div className="absolute inset-0 bg-linear-to-b from-background via-secondary/10 to-background" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,107,0,0.10),transparent_55%)]" />
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
                    backgroundSize: "84px 84px",
                }}
            />

            <div className="relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-12 sm:pt-28 sm:pb-16">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-card/25 px-5 py-2 text-sm font-medium text-muted-foreground">
                        <span>Strategic turn-based dice game</span>
                        <span className="text-primary">•</span>
                        <span>v0.1.0</span>
                    </div>

                    <h1
                        className="mt-6 text-5xl font-bold tracking-tight text-foreground sm:text-7xl"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        DO <span className="text-primary">or</span> DICE
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                        Survival is just the beginning. Roll the dice, choose your targets, and climb the leaderboard with smart plays.
                    </p>

                    <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Button size="lg" className="gap-2" asChild>
                            <a href="#download">
                                <Download className="h-4 w-4" />
                                Download
                            </a>
                        </Button>
                        <Button size="lg" variant="outline" className="gap-2" asChild>
                            <a href="#rules">
                                Read rules
                                <ArrowRight className="h-4 w-4" />
                            </a>
                        </Button>
                    </div>

                    <div className="mt-8 grid gap-3 sm:grid-cols-3">
                        {[
                            { label: "Players", value: "5", icon: Users },
                            { label: "Rounds", value: "12", icon: Trophy },
                            { label: "Dice faces", value: "6", icon: Dices },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className="flex items-center justify-center gap-3 rounded-2xl border border-border/30 bg-card/20 px-5 py-4"
                            >
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-card/60 border border-border/30">
                                    <item.icon className="h-5 w-5 text-primary" />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm text-muted-foreground">{item.label}</p>
                                    <p className="text-xl font-bold text-foreground tabular-nums">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="mt-7 text-base text-muted-foreground">
                        Designed for 5 players. No downtime — even fallen players still influence the outcome.
                    </p>
                </div>
            </div>
        </section>
    )
}