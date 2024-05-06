import { Skeleton } from '@mui/material'
import React from 'react'

const DetailSkeleton = () => {
  return (
    <div style={{
        display: 'flex',
        gap: '15px',
    }}>
        <Skeleton variant='rounded' width={550} height={500}/>
        <div>
            <Skeleton width={300} height={24}/>
            <Skeleton width={300} height={48}/>
            <br />
            <Skeleton width={100} height={18}/>
            <Skeleton width={100} height={50}/>
            <br />
            <Skeleton width={100} height={18}/>
            <Skeleton width={100} height={50}/>
            <br />
            <Skeleton width={100} height={18}/>
            <Skeleton width={100} height={50}/>

        </div>
    </div>
  )
}

export default DetailSkeleton