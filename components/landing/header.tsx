"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import Image from "next/image"
import {
  List,
  X,
  ArrowRight,
  UsersThree,
} from "@phosphor-icons/react"

const navigation = [
  { label: "Platform", href: "#platform" },
  { label: "Workflows", href: "#workflows" },
  { label: "Teams", href: "#teams" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
]

export function ZentiriHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur bg-background/70">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Image src="/zentiri-logo.png" alt="Zentiri HR" width={40} height={40} />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold">Zentiri HR</span>
            <span className="text-xs text-muted-foreground">People-led intelligence</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-muted-foreground">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-3">
          <ThemeToggle />
          <Button variant="ghost" size="sm" className="text-sm" asChild>
            <Link href="/auth/login">Sign in</Link>
          </Button>
          <Button size="sm" className="text-sm" asChild>
            <Link href="/onboarding/organization">
              Launch Zentiri
              <ArrowRight size={16} weight="bold" className="ml-2" />
            </Link>
          </Button>
        </div>

        <div className="flex md:hidden items-center space-x-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setOpen((prev) => !prev)} aria-label="Toggle menu">
            {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden w-full transition-all duration-300 overflow-hidden border-t border-border/40 bg-background/95 backdrop-blur",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <div className="container mx-auto px-4 py-4 space-y-4 md:px-6 lg:px-8">
          <nav className="flex flex-col space-y-3 text-sm text-muted-foreground">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col space-y-2">
            <Button variant="outline" asChild>
              <Link href="/auth/login" onClick={() => setOpen(false)}>
                Sign in
              </Link>
            </Button>
            <Button asChild>
              <Link href="/onboarding/organization" onClick={() => setOpen(false)}>
                Launch Zentiri
                <ArrowRight size={16} weight="bold" className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
