'use server'

import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { db } from "@/lib/auth"
import { ObjectId } from "mongodb"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL //http://localhost:5000

export const getUserPremiumById = async (userId: string) => {
  const res = await fetch(`${BASE_URL}/users/${userId}/premium`)
  return res.json()
}

/**
 * Server action to update a user's role.
 * Updates the `additionalFields.role` field directly in MongoDB.
 *
 * The admin must be authenticated (session cookies are passed via headers).
 */
export const updateUserRole = async (data: {
  userId: string
  role: "seeker" | "recruiter" | "admin"
}): Promise<{ modifiedCount: number }> => {
  const { userId, role } = data
  const result = await db.collection("user").updateOne(
    { _id: new ObjectId(userId) },
    { $set: { "additionalFields.role": role } }
  )

  if (result.matchedCount === 0) {
    throw new Error("User not found")
  }

  return { modifiedCount: result.modifiedCount }
}


