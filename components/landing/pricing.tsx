"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "@phosphor-icons/react"
import Link from "next/link"

const plans = [
  {
    name: "Launch",
    price: "$8",
    cadence: "per employee / month",
    description: "For people teams formalising their workflows and policies.",
    features: [
      "Core recruitment workflows",
      "Employee hub & mobile access",
      "Payroll and benefits sync",
      "Standard insights dashboards",
      "Email & chat support",
    ],
    cta: "Start free trial",
    highlighted: false,
  },
  {
    name: "Scale",
    price: "$18",
    cadence: "per employee / month",
    description: "For multi-location teams needing deeper analytics and automation.",
    features: [
      "Everything in Launch",
      "Advanced people analytics",
      "Scenario planning & forecasting",
      "Custom branding & journeys",
      "Priority success partner",
    ],
    cta: "Talk to sales",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "tailored program",
    description: "For regulated industries and global rollouts with complex policies.",
    features: [
      "Dedicated people scientist",
      "Regional compliance packs",
      "On-premise & private cloud",
      "HRIS and payroll integrations",
      "Enterprise support SLA",
    ],
    cta: "Design your program",
    highlighted: false,
  },
]

export function ZentiriPricing() {
  return (
    <section className="bg-background py-24" id="pricing">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-primary">Pricing</p>
          <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">Flexible plans for HR teams at every growth stage</h2>
          <p className="mt-4 text-base text-muted-foreground">
            All plans include secure infrastructure, policy guardrails, and an employee experience that feels personal from day one.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={plan.highlighted ? "shadow-sm border-0" : "shadow-sm border-0"}
            >
              {plan.highlighted && (
                <div className="rounded-t-xl bg-primary px-4 py-2 text-center text-xs font-semibold text-primary-foreground">
                  Most selected
                </div>
              )}
              <CardContent className="space-y-6 p-8">
                <div className="space-y-3 text-center">
                  <h3 className="text-2xl font-semibold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-xs uppercase tracking-wide text-muted-foreground">{plan.cadence}</span>
                  </div>
                </div>

                <Button
                  className={`w-full ${plan.highlighted ? "bg-[hsl(189,95%,43%)] text-white hover:bg-[hsl(189,95%,38%)]" : "bg-[hsl(25,95%,53%)] text-white hover:bg-[hsl(25,95%,48%)]"}`}
                  variant="default"
                  asChild
                >
                  <Link href="/contact">{plan.cta}</Link>
                </Button>

                <ul className="space-y-3 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle size={16} weight="fill" className="mt-0.5 text-[hsl(189,95%,43%)]" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
