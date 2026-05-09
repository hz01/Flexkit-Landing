import { useRef, useEffect } from 'react'
import Background from './components/Background'
import Hero from './components/Hero'
import AppsSection from './components/AppsSection'
import ToolsBanner from './components/ToolsBanner'

const SECTIONS = 3
const COOLDOWN = 850 // ms — time to wait before allowing next snap

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const indexRef = useRef(0)
  const locked = useRef(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el || window.innerWidth < 1024) return

    const goTo = (next: number) => {
      const clamped = Math.max(0, Math.min(SECTIONS - 1, next))
      if (clamped === indexRef.current) { locked.current = false; return }
      indexRef.current = clamped
      el.scrollTo({ top: clamped * window.innerHeight, behavior: 'smooth' })
      setTimeout(() => { locked.current = false }, COOLDOWN)
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (locked.current) return
      locked.current = true
      goTo(indexRef.current + (e.deltaY > 0 ? 1 : -1))
    }

    const onKey = (e: KeyboardEvent) => {
      if (locked.current) return
      if (e.key === 'ArrowDown' || e.key === 'PageDown') { locked.current = true; goTo(indexRef.current + 1) }
      if (e.key === 'ArrowUp'   || e.key === 'PageUp')   { locked.current = true; goTo(indexRef.current - 1) }
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    return () => {
      el.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <div className="bg-[#06060f] text-white">
      <Background />
      <main
        ref={containerRef}
        className="relative z-10 lg:h-screen lg:overflow-y-scroll no-scrollbar"
      >
        <Hero />
        <AppsSection />
        <ToolsBanner />
      </main>
    </div>
  )
}
