"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  CalendarCheck,
  ChartLineUp,
  CirclesThreePlus,
  IdentificationBadge,
  Key,
  HeadCircuitIcon,
} from "@phosphor-icons/react"

const features = [
  {
    title: "Connected talent marketplace",
    description: "Broadcast roles internally and externally with AI matches, smart shortlists, and bias-aware screening.",
    icon: IdentificationBadge,
  },
  {
    title: "Engagement intelligence",
    description: "Blend surveys, sentiment, and usage data to pinpoint culture wins and wellbeing gaps.",
    icon: ChartLineUp,
  },
  {
    title: "Adaptive scheduling",
    description: "Coordinate shifts, hybrid patterns, and approvals with predictive demand cues and automated compliance.",
    icon: CalendarCheck,
  },
  {
    title: "Workflow guardrails",
    description: "Map policies into every step with version control, approvals, and audit-ready trails by default.",
    icon: Key,
  },
  {
    title: "Centred employee journeys",
    description: "Welcome new hires, recognise milestones, and guide promotions with curated touchpoints across teams.",
    icon: CirclesThreePlus,
  },
  {
    title: "Benefits intelligence",
    description: "Model uptake, performance, and ROI across benefits portfolios while recommending optimisations.",
    icon: HeadCircuitIcon,
  },
]

export function ZentiriFeatures() {
  return (
    <section className="bg-muted py-24">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-primary">Platform capabilities</p>
          <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">Everything you need to orchestrate people operations</h2>
          <p className="mt-4 text-base text-muted-foreground">
            We blueprint every phase—recruitment, growth, pay, wellbeing—into configurable journeys that keep teams focussed on people, not paperwork.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border bg-card shadow-sm transition-colors hover:border-primary/40">
              <CardContent className="space-y-4 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[hsl(258,90%,92%)] text-accent">
                  <feature.icon size={22} weight="duotone" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
