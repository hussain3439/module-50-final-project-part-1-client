import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
// Type-only import so server code (the MongoDB client in lib/auth.ts) is never bundled for the browser.
import type { auth } from "@/lib/auth"

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.BETTER_AUTH_URL,
  // Makes user.additionalFields (e.g. `role`) available to the client's types.
  plugins: [inferAdditionalFields<typeof auth>()],
})

export const {
  signIn,
  signUp,
  signOut,
  updateUser,
  changePassword,
  useSession,
} = authClient
