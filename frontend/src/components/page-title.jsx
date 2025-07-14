import { cn } from '@/lib/utils'
import React from 'react'

const PageTitle = ({children, className = ""}) => {
  return (
    <h1 className={cn("font-semibold text-2xl sm:text-3xl", className)}>
      {children}
    </h1>
  )
}

export default PageTitle
