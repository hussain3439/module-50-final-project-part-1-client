"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import LogoImage from "@/app/assets/logo.png"

const NAV_LINKS = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
]

function Logo() {
  return (
    <Link href="/" aria-label="HireLoop home" className="shrink-0">
      <Image
        src={LogoImage}
        alt="HireLoop"
        className="h-7 w-auto"
        priority
      />
    </Link>
  )
}

export function Navbar() {
  const [open, setOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 md:px-4">
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between rounded-xl border bg-background/85 px-4 shadow-sm backdrop-blur-xl"
      >
        <Logo />

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted/60 hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Separator orientation="vertical" className="h-5 self-center" />
          <Link
            href="/sign-in"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-violet-600 transition-colors hover:bg-violet-500/10 hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300"
          >
            Sign In
          </Link>
          <Button
            render={<Link href="/sign-up" />}
            className="bg-violet-600 text-white hover:bg-violet-500"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              />
            }
          >
            <MenuIcon className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>
              <SheetDescription className="sr-only">
                Main navigation menu
              </SheetDescription>
            </SheetHeader>
            <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
              {NAV_LINKS.map((link) => (
                <SheetClose
                  key={link.href}
                  render={
                    <Link
                      href={link.href}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
                    />
                  }
                >
                  {link.label}
                </SheetClose>
              ))}
            </nav>
            <Separator className="mx-4" />
            <SheetFooter className="mt-auto">
              <SheetClose
                render={
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                }
              />
              <SheetClose
                render={
                  <Button className="w-full bg-violet-600 text-white hover:bg-violet-500">
                    Get Started
                  </Button>
                }
              />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
