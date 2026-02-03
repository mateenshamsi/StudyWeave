'use server'

import { db } from '@/app/config/db'
import { courses } from '@/app/config/schema'
import { and, eq } from 'drizzle-orm'
import { auth } from '@clerk/nextjs/server'

export async function getCourse(courseId: string) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  const res = await db
    .select()
    .from(courses)
    .where(
      and(
        eq(courses.id, courseId),
        eq(courses.createdBy, userId) // ✅ CORRECT COLUMN
      )
    )
    console.log("Result".res)
  return res
}
