import { GeneratedCurriculum } from '@/app/create-course/page'

import {uuid} from 'uuidv4'

export interface CourseFormData {
  topic: string
  readingLevel: string
  age: string
  language: string
  priorKnowledge?: string
  learningStyle: string
  curriculum: GeneratedCurriculum
}

/**
 * Saves course data to the database
 * @param courseData - The complete course data including form inputs and generated curriculum
 * @returns Promise with the saved course data
 */

export async function saveLayoutInDb(courseData: CourseFormData) {
  const { db } = await import('@/app/config/db')
  const { courses } = await import('@/app/config/schema')
  const { auth, clerkClient } = await import('@clerk/nextjs/server')

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

