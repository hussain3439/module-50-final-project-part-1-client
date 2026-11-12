"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "cn"
import Image from "next/image"

import LogoImage from "@/app/assets/logo.png"

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
]

const navLinkBase =
  "rounded-lg px-3 py-2 text-sm text-neutral-300 outline-none transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/50"

function isActivePath(pathname: string, href: string) {
  return href === "/"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteNavbar() {
  const pathname = usePathname()

  return (
    <header
      data-slot="navbar"
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#191919]"
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="HireLoop home" className="shrink-0">
          <Image
            src={LogoImage}
            alt="HireLoop"
            className="h-7 w-auto"
            priority
          />
        </Link>

        {/* Desktop */}
        <div className="flex items-center justify-end">
          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const active = isActivePath(pathname, link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    navLinkBase,
                    active && "bg-white/10 text-white"
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
            <Separator
              orientation="vertical"
              className="mx-2 h-5 bg-white/20"
            />
            <Link
              href="/sign-in"
              className={cn(navLinkBase, "font-medium text-[#9d8bff]")}
            >
              Sign In
            </Link>
          </nav>

          <Button
            render={<Link href="/sign-up" />}
            size="lg"
            className="ms-2 hidden bg-[#7a5af8] font-medium text-white hover:bg-[#6d4ff0] md:inline-flex"
          >
            Sign Up
          </Button>

          {/* Mobile version*/}
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-lg"
                  aria-label="Open menu"
                  className="-me-2 text-white hover:bg-white/10 hover:text-white md:hidden"
                />
              }
            >
              <MenuIcon />
              <span className="sr-only">Toggle menu</span>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 gap-0 border-white/10 bg-[#191919] text-white [&_[data-slot=sheet-close]]:hover:bg-white/10 [&_[data-slot=sheet-close]]:hover:text-white"
            >
              <SheetHeader className="border-b border-white/10">
                <SheetTitle className="sr-only">Main menu</SheetTitle>
                <Link href="/" aria-label="HireLoop home" className="shrink-0">
                  <Image
                    src={LogoImage}
                    alt="HireLoop"
                    className="h-7 w-auto"
                    priority
                  />
                </Link>
              </SheetHeader>
              {/* mobile menu */}
              <nav aria-label="Main" className="flex flex-col gap-1 p-3">
                {navLinks.map((link) => (
                  <SheetClose
                    key={link.href}
                    render={
                      <Link
                        href={link.href}
                        className="rounded-lg px-3 py-2.5 text-sm text-neutral-300 hover:bg-white/10 hover:text-white"
                      />
                    }
                  >
                    {link.label}
                  </SheetClose>
                ))}
              </nav>
              <SheetFooter className="gap-2 border-t border-white/10 p-3">
                <SheetClose
                  render={
                    <Link
                      href="/sign-in"
                      className="rounded-lg px-3 py-2.5 text-center text-sm font-medium text-[#9d8bff] hover:bg-white/10 hover:text-[#9d8bff]"
                    />
                  }
                >
                  Sign In
                </SheetClose>
                <SheetClose
                  render={
                    <Button
                      size="lg"
                      className="w-full bg-[#7a5af8] font-medium text-white hover:bg-[#6d4ff0]"
                    />
                  }
                >
                  Sign Up
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
