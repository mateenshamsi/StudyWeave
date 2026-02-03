'use client'
import { useParams } from 'next/navigation'
import React from 'react'

function page() {
    const params = useParams();
    const { courseId } = params;

    return (
    <div>
      
    </div>
  )
}

export default page
