import { cn } from '@/lib/utils'
import React from 'react'

const PageHeader = ({label = "", className = ""}) => {
  return (
    <div className={cn("py-4 border-b", className)}>
      <h1 className='text-2xl sm:text-3xl font-semibold line-clamp-1'>
        {label}
      </h1>
    </div>
  )
}

export default PageHeader
