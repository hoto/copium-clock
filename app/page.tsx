'use client'

import React from 'react'
import CopiumClock from '@/components/CopiumClock'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="flex items-center justify-center h-screen">
        <CopiumClock />
      </div>

    </main>
  )
}

