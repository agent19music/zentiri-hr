"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Quotes } from "@phosphor-icons/react"

const testimonials = [
  {
    name: "Michael Njoiki",
    role: "Chief People Officer, Nurse Now",
    quote:
      "Zentiri gave us one rhythm for workforce planning, engagement, and compliance. Our managers finally have a voice in talent decisions, and employees feel it.",
  },
  {
    name: "Leftson Telo",
    role: "People Operations Lead, Univora",
    quote:
      "Our onboarding went from spreadsheets to curated journeys overnight. Zentiri's playbooks made scaling to five cities effortless.",
  },
  {
    name: "John Matonya",
    role: "Employee Experience Manager, Uniwell",
    quote:
      "The employee hub became the heartbeat of our culture program. Engagement sessions, benefits, and recognition finally live in one place.",
  },
]

export function ZentiriTestimonials() {
  return (
    <section className="bg-muted py-24">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">Voice of the teams we serve</p>
          <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">People outcomes you can measure</h2>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="bg-card shadow-sm">
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(189,95%,92%)] text-[hsl(189,95%,40%)]">
                    <Quotes size={20} weight="fill" />
                  </div>
                  <div>
                    <p className="text-base font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">“{testimonial.quote}”</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
