// app/actions/courseActions.ts
'use server'

import { db } from '@/app/config/db'
import { courses } from '@/app/config/schema'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { GeneratedCurriculum } from '@/app/create-course/page'

export interface CourseFormData {
  topic: string
  readingLevel: string
  age: string
  language: string
  priorKnowledge?: string
  learningStyle: string
  curriculum: GeneratedCurriculum
}

export async function saveLayoutInDb(courseData: CourseFormData) {
  const { userId } = await auth()
  
  if (!userId) {
    throw new Error('Unauthorized')
  }

  const resolvedClerkClient = await clerkClient()
  const user = await resolvedClerkClient.users.getUser(userId)

  const age = Number(courseData.age)
  if (Number.isNaN(age)) {
    throw new Error('Invalid age')
  }

  const [savedCourse] = await db
    .insert(courses)
    .values({
      topic: courseData.topic,
      readingLevel: courseData.readingLevel,
      age,
      language: courseData.language,
      priorKnowledge: courseData.priorKnowledge ?? null,
      learningStyle: courseData.learningStyle,
      curriculum: courseData.curriculum,
      createdBy: userId,
      userName: user.username || user.firstName || '',
      userProfileImage: user.imageUrl || '',
    })
    .returning()

  return savedCourse
}