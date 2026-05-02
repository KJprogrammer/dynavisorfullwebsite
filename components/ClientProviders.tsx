'use client'
import dynamic from 'next/dynamic'
import { LenisProvider } from '@/components/scroll/LenisProvider'
import { CustomCursor } from '@/components/ui/CustomCursor'

const DataFabricCanvas = dynamic(() => import('@/components/canvas/DataFabricCanvas'), { ssr: false })

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <DataFabricCanvas />
      <CustomCursor />
      {children}
    </LenisProvider>
  )
}
