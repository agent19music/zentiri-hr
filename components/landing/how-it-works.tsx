"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  CompassTool,
  Faders,
  Gauge,
  Handshake,
} from "@phosphor-icons/react"

const steps = [
  {
    title: "Map your people DNA",
    description: "Import policies, roles, and talent data to create Zentiri's unified people graph in minutes.",
    icon: CompassTool,
    badge: "Day 0",
  },
  {
    title: "Design connected workflows",
    description: "Drag-and-drop recruitment, onboarding, performance, and payroll journeys tailored to every team.",
    icon: Faders,
    badge: "Day 7",
  },
  {
    title: "Activate insights",
    description: "Surface actionable dashboards for leaders while employees receive personalized nudges and growth prompts.",
    icon: Gauge,
    badge: "Day 15",
  },
  {
    title: "Scale with partnership",
    description: "Our people scientists iterate with you—new policies, regions, and benefits launch with Zentiri guardrails.",
    icon: Handshake,
    badge: "Day 30",
  },
]

export function ZentiriHowItWorks() {
  return (
    <section className="border-t border-border/50 bg-muted py-24">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-primary">How Zentiri partners with you</p>
          <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">A guided rollout made for hybrid teams</h2>
          <p className="mt-4 text-base text-muted-foreground">
            We blend product, playbooks, and people expertise to unlock culture, compliance, and productivity across your workforce.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-4">
          {steps.map((step) => (
            <Card key={step.title} className="border-border bg-card shadow-sm">
              <CardContent className="space-y-4 p-6">
                <span className="inline-flex items-center rounded-full bg-[hsl(189,95%,92%)] px-3 py-1 text-xs font-semibold text-[hsl(189,95%,43%)]">
                  {step.badge}
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-primary">
                  <step.icon size={20} weight="duotone" />
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
