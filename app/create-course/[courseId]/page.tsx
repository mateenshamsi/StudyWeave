'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getCourse } from '@/app/actions/getCourse'

export default function Page() {
  const params = useParams<{ courseId: string }>()
  const courseId = params?.courseId

  const [course, setCourse] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!courseId) return // 🔴 CRITICAL GUARD

    getCourse(courseId)
      .then(res => {
        if (!res || res.length === 0) {
          setError('Course not found')
          return
        }
        setCourse(res[0])
      })
      .catch(err => {
        console.error(err)
        setError('Failed to load course')
      })
  }, [courseId])

  if (error) return <div>{error}</div>
  if (!course) return <div>Loading...</div>

  return <div>{course.topic}</div>
}
