import { create } from 'zustand'

interface StoreState {
  scrollProgress: number
  setScrollProgress: (v: number) => void
  canvasPhase: 'hero' | 'benchmark' | 'platform' | 'validation' | 'solutions'
  setCanvasPhase: (p: StoreState['canvasPhase']) => void
  cursorPos: { x: number; y: number }
  setCursorPos: (pos: { x: number; y: number }) => void
}

export const useStore = create<StoreState>((set) => ({
  scrollProgress: 0,
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),
  canvasPhase: 'hero',
  setCanvasPhase: (canvasPhase) => set({ canvasPhase }),
  cursorPos: { x: 0, y: 0 },
  setCursorPos: (cursorPos) => set({ cursorPos }),
}))
