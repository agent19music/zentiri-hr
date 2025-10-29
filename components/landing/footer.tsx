'use client'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  ArrowUpRight,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  YoutubeLogo,
} from "@phosphor-icons/react"
import Image from "next/image"

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Workflows", href: "/platform/workflows" },
  { label: "Why Zentiri", href: "/why-zentiri" },
  { label: "Contact", href: "/contact" },
]

const employerLinks = [
  { label: "Recruitment", href: "/employer/recruitment" },
  { label: "People analytics", href: "/employer/analytics" },
  { label: "Payroll", href: "/employer/payroll" },
  { label: "Compliance", href: "/employer/compliance" },
]

const employeeLinks = [
  { label: "Employee hub", href: "/employee/dashboard" },
  { label: "Growth journeys", href: "/employee/growth" },
  { label: "Benefits", href: "/employee/benefits" },
  { label: "Support", href: "/support" },
]

const socialLinks = [
  { href: "https://www.linkedin.com", label: "LinkedIn", icon: LinkedinLogo },
  { href: "https://www.facebook.com", label: "Facebook", icon: FacebookLogo },
  { href: "https://www.instagram.com", label: "Instagram", icon: InstagramLogo },
  { href: "https://www.youtube.com", label: "YouTube", icon: YoutubeLogo },
]

export function ZentiriFooter() {
  return (
    <footer className="relative mt-32 md:mt-40 w-full border-t border-border/40 bg-primary text-primary-foreground">
      {/* SVG Mask for interesting footer shape */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] -translate-y-full">
        <svg 
          className="relative block w-full h-[60px] md:h-[100px]" 
          viewBox="0 0 1920 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0 120V40C320 10 640 0 960 15C1280 30 1600 60 1920 40V120H0Z" 
            className="fill-primary"
          />
        </svg>
      </div>
      <div className="container mx-auto px-4 py-24 md:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-20 px-4 sm:px-6 md:px-0">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div className="space-y-6 md:max-w-2xl">
              <p className="text-xs uppercase tracking-[0.4em] text-primary-foreground/60">
                People-first expertise
              </p>
              <h2 className="text-4xl leading-tight sm:text-5xl">
                How can we help your teams thrive?
              </h2>
              <p className="text-base text-primary-foreground/80">
                Tell us where you are in your people operations journey and our specialists will tailor a rollout plan that balances compliance, care, and velocity.
              </p>
            </div>
            <Button
              size="lg"
              className="self-start bg-[hsl(189,95%,43%)] text-white hover:bg-[hsl(189,95%,38%)]"
              asChild
            >
              <Link href="/contact">
                Start a conversation
                <ArrowUpRight size={18} className="ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-12 md:grid-cols-4">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white text-lg font-semibold">
                  <Image
                    src="/zentiri-logo.png"
                    alt="Zentiri HR Logo"
                    width={48}
                    height={48}
                  />
                </div>
                <div>
                  <p className="text-lg font-semibold">Zentiri HR</p>
                  <p className="text-xs text-primary-foreground/70">Scaling equitable workplaces across Africa and beyond.</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-primary-foreground/70">
                <p>Nairobi • Remote-first • SOC 2 Type II</p>
                <p>GDPR-ready • ISO 27001 aligned</p>
              </div>
              <div className="flex flex-col gap-1 text-sm text-primary-foreground/80">
                <a href="mailto:hello@zentiri.app" className="hover:text-white">hello@zentiri.app</a>
                <a href="tel:+254745071299" className="hover:text-white">+254 745 071 299</a>
              </div>
            </div>

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/70">
                Company
              </p>
              <ul className="space-y-3 text-sm text-primary-foreground/80">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/70">
                For employers
              </p>
              <ul className="space-y-3 text-sm text-primary-foreground/80">
                {employerLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/70">
                For employees
              </p>
              <ul className="space-y-3 text-sm text-primary-foreground/80">
                {employeeLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-8 border-t border-white/10 pt-10 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-6 text-xs uppercase tracking-[0.3em] text-primary-foreground/60">
              <Link href="/privacy" className="hover:text-white">Privacy</Link>
              <Link href="/terms" className="hover:text-white">Terms</Link>
              <Link href="/contact" className="hover:text-white">Support</Link>
            </div>
            <div className="flex items-center gap-4">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                >
                  <Icon size={18} weight="fill" />
                </Link>
              ))}
            </div>
          </div>

          <p className="text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} Zentiri HR. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
