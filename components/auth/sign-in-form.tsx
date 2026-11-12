"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

type SignInFormData = {
  email: string
  password: string
}

const inputClasses =
  "h-10 w-full rounded-lg border border-white/10 bg-white/[0.03] text-sm text-white outline-none transition-colors placeholder:text-neutral-500 focus-visible:border-[#7a5af8]/60 focus-visible:ring-2 focus-visible:ring-[#7a5af8]/25"

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [submittedData, setSubmittedData] = useState<SignInFormData | null>(
    null
  )

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data: SignInFormData = {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    }

    // TODO: wire up real auth here, e.g. `await authClient.signIn.email(data)`
    console.log("Sign-in form data:", data)
    setSubmittedData(data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label
          htmlFor="signin-email"
          className="block text-xs font-medium text-neutral-300"
        >
          Email
        </label>
        <div className="relative">
          <MailIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
          <input
            id="signin-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClasses + " pl-9"}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="signin-password"
            className="block text-xs font-medium text-neutral-300"
          >
            Password
          </label>
          <Link
            href="#"
            className="text-xs font-medium text-[#9d8bff] transition-colors hover:text-[#b3a5ff]"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <LockIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
          <input
            id="signin-password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            placeholder="Enter your password"
            className={inputClasses + " pr-10 pl-9"}
          />
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute top-1/2 right-2.5 -translate-y-1/2 text-neutral-500 transition-colors hover:text-white"
          >
            {showPassword ? (
              <EyeOffIcon className="size-4" />
            ) : (
              <EyeIcon className="size-4" />
            )}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-[#7a5af8] text-white hover:bg-[#6d4ff0]"
      >
        Sign In
      </Button>

      {submittedData && (
        <p role="status" className="text-center text-xs text-neutral-500">
          Form data captured — check the browser console.
        </p>
      )}
    </form>
  )
}
