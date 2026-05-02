'use client'
import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    let mx = -100, my = -100
    let ox = -100, oy = -100

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      inner.style.transform = `translate(${mx - 4}px, ${my - 4}px)`
    }

    let raf: number
    const lerp = () => {
      ox += (mx - ox) * 0.12
      oy += (my - oy) * 0.12
      outer.style.transform = `translate(${ox - 20}px, ${oy - 20}px)`
      raf = requestAnimationFrame(lerp)
    }

    const onEnter = () => { outer.style.opacity = '1'; inner.style.opacity = '1' }
    const onLeave = () => { outer.style.opacity = '0'; inner.style.opacity = '0' }
    const onDown  = () => { outer.style.transform += ' scale(0.8)' }
    const onUp    = () => { /* reset via lerp */ }

    document.addEventListener('mousemove',   onMove,  { passive: true })
    document.addEventListener('mouseenter',  onEnter)
    document.addEventListener('mouseleave',  onLeave)
    document.addEventListener('mousedown',   onDown)
    document.addEventListener('mouseup',     onUp)
    raf = requestAnimationFrame(lerp)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove',  onMove)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mousedown',  onDown)
      document.removeEventListener('mouseup',    onUp)
    }
  }, [])

  return (
    <>
      {/* Outer ring — lags behind */}
      <div
        ref={outerRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 40, height: 40,
          borderRadius: '50%',
          border: '1px solid rgba(184,151,90,0.5)',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0,
          transition: 'opacity 300ms ease',
          willChange: 'transform',
        }}
      />
      {/* Inner dot — instant */}
      <div
        ref={innerRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: '50%',
          background: 'var(--gold)',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0,
          transition: 'opacity 300ms ease',
          willChange: 'transform',
        }}
      />
    </>
  )
}
