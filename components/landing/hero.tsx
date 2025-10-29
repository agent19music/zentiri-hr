"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CirclesThreePlus,
  Gauge,
  Handshake,
  Sparkle,
} from "@phosphor-icons/react";

const highlights = [
  {
    title: "Hire with confidence",
    description: "Match every role to the right talent in days, not weeks.",
    icon: CirclesThreePlus,
    metric: "7 day avg.",
  },
  {
    title: "Pulse-ready analytics",
    description:
      "Real-time dashboards that surface retention and engagement risks.",
    icon: Gauge,
    metric: "360° visibility",
  },
  {
    title: "Human-centered workflows",
    description:
      "Blend automation with personal touchpoints employees actually love.",
    icon: Handshake,
    metric: "+34 NPS",
  },
];

export function ZentiriHero() {
  return (
    <section className="border-b bg-background w-full" id="hero">
      <div className="container mx-auto px-4 pb-24 pt-24 md:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[70vh] w-full max-w-5xl flex-col items-center justify-center text-center">
          <div className="relative z-10 w-full px-4 sm:px-6 md:px-8">
            <h1 className="font-helvetica mx-auto text-3xl font-bold leading-tight text-hero-text sm:text-4xl lg:text-5xl">
              Build{" "}
              <span className="italic text-[hsl(189,95%,43%)]">
                people-first
              </span>{" "}
              organizations with Zentiri HR
            </h1>
            <p className="font-helvetica mx-auto mt-6 max-w-3xl text-base text-muted-foreground sm:text-lg">
              Zentiri connects employers and employees through guided workflows,
              predictive insights, and curated growth journeys that make every
              interaction feel intentional.
            </p>
            <div className="mx-auto mt-8 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
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
            <p className="mx-auto mt-4 text-sm text-muted-foreground">
              Guided rollouts for teams between 20 and 5,000 employees.
            </p>
          </div>

          {/* Hero Image */}
          <div className="mt-12 w-full max-w-5xl px-4 sm:px-6 md:mt-16 md:px-0">
            {/* Mobile Image - Full Aspect Ratio */}
            <div className="relative w-full overflow-hidden rounded-2xl border border-border shadow-2xl md:hidden">
              <Image
                src="/dashboard-mobile.png"
                alt="Zentiri HR platform dashboard showing analytics and employee engagement metrics"
                width={800}
                height={1200}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
            {/* Desktop Image - 16:9 Aspect Ratio */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border shadow-2xl hidden md:block">
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

        <div
          className="mx-auto mt-16 grid w-full max-w-5xl gap-6 px-4 sm:px-6 md:grid-cols-3 md:px-0"
          id="platform"
        >
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-card p-6 text-left shadow-sm transition-colors border-0"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl text">
                <item.icon size={24} />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                {item.description}
              </p>
              <span className="mt-6 inline-flex items-center text-sm font-medium text">
                {item.metric}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
