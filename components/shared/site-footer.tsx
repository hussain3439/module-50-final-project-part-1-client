import Image from "next/image"
import Link from "next/link"
import type { ComponentProps, ComponentType } from "react"

import LogoImage from "@/app/assets/logo.png"

type IconProps = ComponentProps<"svg">

/* lucide-react no longer ships brand icons, so they are defined inline
   using the same 24x24 stroke style as the rest of the icon set. */
function FacebookIcon({ className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function InstagramIcon({ className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function LinkedinIcon({ className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const footerGroups = [
  {
    title: "Product",
    links: [
      { label: "Job discovery", href: "/jobs" },
      { label: "Worker AI", href: "#" },
      { label: "Companies", href: "/company" },
      { label: "Salary data", href: "#" },
    ],
  },
  {
    title: "Navigations",
    links: [
      { label: "Help center", href: "#" },
      { label: "Career library", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Brand Guideline", href: "#" },
      { label: "Newsroom", href: "#" },
    ],
  },
]

const socialLinks: {
  label: string
  href: string
  icon: ComponentType<ComponentProps<"svg">>
}[] = [
  { label: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedinIcon },
]

export function SiteFooter() {
  return (
    <footer data-slot="footer" className="bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        {/* Top: brand + link columns */}
        <div className="flex flex-col justify-between gap-12 lg:flex-row">
          <div className="max-w-xs">
            <Link href="/" aria-label="HireLoop home" className="inline-block">
              <Image src={LogoImage} alt="HireLoop" className="h-8 w-auto" />
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-neutral-400">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-16 lg:gap-28"
          >
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-medium text-[#9d8bff]">
                  {group.title}
                </h3>
                <ul className="mt-5 space-y-3.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-neutral-400 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="grid size-8 place-items-center rounded-md bg-white/[0.06] text-neutral-300 transition-colors hover:bg-[#7a5af8] hover:text-white"
              >
                <social.icon className="size-3.5" />
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2 text-xs text-neutral-500 sm:flex-row sm:items-center sm:gap-6">
            <p>Copyright 2024 - Programming Hero</p>
            <p>
              <Link href="#" className="transition-colors hover:text-white">
                Terms &amp; Policy
              </Link>
              {" - "}
              <Link href="#" className="transition-colors hover:text-white">
                Privacy Guideline
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
