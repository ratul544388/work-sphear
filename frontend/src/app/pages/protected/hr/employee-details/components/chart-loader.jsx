import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const ChartLoader = () => {
  return (
    <div className='w-full h-[300px]'>
      <Skeleton className='size-full'/>
    </div>
  )
}

export default ChartLoader
