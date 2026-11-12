"use client"

import { useState, type FormEvent } from "react"
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

type SignUpFormData = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const inputClasses =
  "h-10 w-full rounded-lg border border-white/10 bg-white/[0.03] text-sm text-white outline-none transition-colors placeholder:text-neutral-500 focus-visible:border-[#7a5af8]/60 focus-visible:ring-2 focus-visible:ring-[#7a5af8]/25"

const passwordInputClasses = inputClasses + " pl-9 pr-10"

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submittedData, setSubmittedData] = useState<SignUpFormData | null>(
    null
  )

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data: SignUpFormData = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      confirmPassword: String(formData.get("confirmPassword") ?? ""),
    }

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setError(null)

    // TODO: wire up real auth here, e.g. `await authClient.signUp.email(data)`
    console.log("Sign-up form data:", data)
    setSubmittedData(data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label
          htmlFor="signup-name"
          className="block text-xs font-medium text-neutral-300"
        >
          Full name
        </label>
        <div className="relative">
          <UserIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
          <input
            id="signup-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="John Doe"
            className={inputClasses + " pl-9"}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="signup-email"
          className="block text-xs font-medium text-neutral-300"
        >
          Email
        </label>
        <div className="relative">
          <MailIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
          <input
            id="signup-email"
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
        <label
          htmlFor="signup-password"
          className="block text-xs font-medium text-neutral-300"
        >
          Password
        </label>
        <div className="relative">
          <LockIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
          <input
            id="signup-password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="At least 8 characters"
            className={passwordInputClasses}
          />
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? "Hide passwords" : "Show passwords"}
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

      <div className="space-y-1.5">
        <label
          htmlFor="signup-confirm-password"
          className="block text-xs font-medium text-neutral-300"
        >
          Confirm password
        </label>
        <div className="relative">
          <LockIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
          <input
            id="signup-confirm-password"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="Re-enter your password"
            className={passwordInputClasses}
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="text-xs text-red-400">
          {error}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full bg-[#7a5af8] text-white hover:bg-[#6d4ff0]"
      >
        Create Account
      </Button>

      {submittedData && (
        <p role="status" className="text-center text-xs text-neutral-500">
          Form data captured — check the browser console.
        </p>
      )}
    </form>
  )
}
