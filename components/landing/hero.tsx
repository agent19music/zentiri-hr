"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  CirclesThreePlus,
  Gauge,
  Handshake,
  Sparkle,
} from "@phosphor-icons/react"

const highlights = [
  {
    title: "Hire with confidence",
    description: "Match every role to the right talent in days, not weeks.",
    icon: CirclesThreePlus,
    metric: "7 day avg.",
  },
  {
    title: "Pulse-ready analytics",
    description: "Real-time dashboards that surface retention and engagement risks.",
    icon: Gauge,
    metric: "360° visibility",
  },
  {
    title: "Human-centered workflows",
    description: "Blend automation with personal touchpoints employees actually love.",
    icon: Handshake,
    metric: "+34 NPS",
  },
]

export function ZentiriHero() {
  return (
    <section className="border-b bg-background" id="hero">
      <div className="container px-4 pb-24 pt-24 md:px-6">
        <div className="mx-auto flex min-h-[80vh] max-w-5xl flex-col items-center justify-center text-center">
         
          <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Build <span className="italic text-[hsl(189,95%,43%)]">people-first</span> organizations with Zentiri HR
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground sm:text-xl">
            Zentiri connects employers and employees through guided workflows, predictive insights, and curated growth journeys that make every interaction feel intentional.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="bg-[hsl(189,95%,43%)] text-white hover:bg-[hsl(189,95%,38%)]"
              asChild
            >
              <Link href="/onboarding/organization">
                Start onboarding
                <ArrowRight size={18} weight="bold" className="ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:bg-accent"
              asChild
            >
              <Link href="/demo">Explore employer suite</Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Guided rollouts for teams between 20 and 5,000 employees.
          </p>

          {/* Hero Image */}
          <div className="mt-16 w-full max-w-4xl">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border shadow-2xl">
              <Image
                src="/dashboard.png"
                alt="Zentiri HR platform dashboard showing analytics and employee engagement metrics"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3" id="platform">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-card p-6 text-left shadow-sm transition-colors hover:border-primary/40"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(189,95%,92%)] text-[hsl(189,95%,43%)]">
                <item.icon size={24} weight="duotone" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
              <span className="mt-6 inline-flex items-center text-sm font-medium text-[hsl(189,95%,43%)]">
                {item.metric}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}