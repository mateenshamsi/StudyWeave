import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/app/config/db'
import { courses } from '@/app/config/schema'
import { auth } from '@clerk/nextjs/server'

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { message: 'Unauthorized: User not authenticated' },
        { status: 401 }
      )
    }

    const body = await request.json()

    // Validate required fields
    const { topic, readingLevel, age, language, learningStyle, curriculum, priorKnowledge } = body

    if (!topic || !readingLevel || !age || !language || !learningStyle || !curriculum) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Insert course data into database
    const result = await db
      .insert(courses)
      .values({
        topic,
        readingLevel,
        age,
        language,
        learningStyle,
        priorKnowledge: priorKnowledge || null,
        curriculum,
        createdBy: userId,
        userName: '', // You can get this from Clerk user session if needed
        userProfileImage: '', // You can get this from Clerk user session if needed
      })
      .returning()

    return NextResponse.json(
      {
        message: 'Course saved successfully',
        courseId: result[0]?.id,
        data: result[0],
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error saving course to database:', error)
    return NextResponse.json(
      { message: 'Failed to save course', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
