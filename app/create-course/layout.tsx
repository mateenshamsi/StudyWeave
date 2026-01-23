import React, { Children } from 'react'
import Header from '../_components/Header'

function CreateCourseLayout({children}: {children: React.ReactNode}) {
  return (
    <div>
        <Header/>
      {children}
    </div>
  )
}

export default CreateCourseLayout
