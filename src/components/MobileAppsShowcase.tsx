import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { AppData } from '../data/apps'
import { appsInShowcaseOrder } from '../data/apps'
import { AppCardContent } from './AppCard'

/** [cloneLast, ...apps, cloneFirst] for seamless infinite horizontal scroll */
function extendSlides(apps: AppData[]): AppData[] {
  const n = apps.length
  if (n === 0) return []
  return [apps[n - 1]!, ...apps, apps[0]!]
}

function logicalFromExtended(ei: number, n: number): number {
  if (ei === 0) return n - 1
  if (ei === n + 1) return 0
  return ei - 1
}

/** Infinite horizontal carousel + cover-flow (center hero, prev/next peeking). */
export default function MobileAppsShowcase() {
  const orderedApps = useMemo(() => appsInShowcaseOrder(), [])
  const extended = useMemo(() => extendSlides(orderedApps), [orderedApps])
  const n = orderedApps.length
  const extLen = extended.length

  const scrollerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const boundaryTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const suppressBoundaryRef = useRef(false)

  const [scrollLeft, setScrollLeft] = useState(0)

  const scrollToExtendedIndex = useCallback((ei: number, instant: boolean) => {
    const sc = scrollerRef.current
    const el = itemRefs.current[ei]
    if (!sc || !el) return
    const left = el.offsetLeft + el.offsetWidth / 2 - sc.clientWidth / 2
    const clamped = Math.max(0, Math.round(left))
    suppressBoundaryRef.current = true
    if (instant) {
      /* Snap + instant scrollLeft fight each other at clone boundaries — brief snap:none avoids flicker */
      sc.style.scrollSnapType = 'none'
      sc.scrollLeft = clamped
      requestAnimationFrame(() => {
        sc.scrollLeft = clamped
        requestAnimationFrame(() => {
          sc.style.removeProperty('scroll-snap-type')
          suppressBoundaryRef.current = false
          setScrollLeft(sc.scrollLeft)
        })
      })
    } else {
      sc.scrollTo({ left: clamped, behavior: 'smooth' })
      window.setTimeout(() => {
        suppressBoundaryRef.current = false
        setScrollLeft(sc.scrollLeft)
      }, 420)
    }
  }, [])

  useLayoutEffect(() => {
    if (extLen < 3 || n === 0) return
    const sc = scrollerRef.current
    if (!sc) return

    let frame = 0
    const tick = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setScrollLeft(sc.scrollLeft))
    }

    const runBoundaryCheck = () => {
      if (suppressBoundaryRef.current || !sc || extLen < 3) return
      const viewportMid = sc.scrollLeft + sc.clientWidth / 2
      let bestEi = 0
      let bestDist = Infinity
      for (let ei = 0; ei < extLen; ei++) {
        const slideEl = itemRefs.current[ei]
        if (!slideEl) continue
        const mid = slideEl.offsetLeft + slideEl.offsetWidth / 2
        const d = Math.abs(viewportMid - mid)
        if (d < bestDist) {
          bestDist = d
          bestEi = ei
        }
      }
      if (bestEi === 0) scrollToExtendedIndex(n, true)
      else if (bestEi === n + 1) scrollToExtendedIndex(1, true)
    }

    const scheduleBoundaryCheck = () => {
      clearTimeout(boundaryTimerRef.current)
      boundaryTimerRef.current = setTimeout(runBoundaryCheck, 160)
    }

    const onScrollEnd = () => {
      clearTimeout(boundaryTimerRef.current)
      runBoundaryCheck()
    }

    tick()
    const onScroll = () => {
      tick()
      scheduleBoundaryCheck()
    }
    sc.addEventListener('scroll', onScroll, { passive: true })
    sc.addEventListener('scrollend', onScrollEnd as EventListener)
    const ro = new ResizeObserver(() => {
      tick()
      scrollToExtendedIndex(1, true)
    })
    ro.observe(sc)
    window.addEventListener('resize', tick)

    scrollToExtendedIndex(1, true)
    requestAnimationFrame(() => scrollToExtendedIndex(1, true))

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(boundaryTimerRef.current)
      sc.removeEventListener('scroll', onScroll)
      sc.removeEventListener('scrollend', onScrollEnd as EventListener)
      window.removeEventListener('resize', tick)
      ro.disconnect()
    }
  }, [extLen, n, scrollToExtendedIndex])

  const { transforms, nearestExtended, logicalNearest } = useMemo(() => {
    const sc = scrollerRef.current
    const idle = {
      transforms: extended.map(() => ({ scale: 1, opacity: 1, zIndex: 50, rotateY: 0 })),
      nearestExtended: 1,
      logicalNearest: 0,
    }
    if (!sc || extLen === 0) return idle

    const viewportMid = scrollLeft + sc.clientWidth / 2
    /* Distance between consecutive slides; viewport-based falloff was shorter than one
       pitch, so prev/next sat at t=0 when snapped and only “woke up” while scrolling. */
    const el0 = itemRefs.current[0]
    const el1 = itemRefs.current[1]
    const slidePitch =
      el0 && el1 ? Math.abs(el1.offsetLeft - el0.offsetLeft) : sc.clientWidth * 0.92
    const falloff = slidePitch * 1.62

    let bestEi = 0
    let bestD = Infinity

    const transforms = extended.map((_, ei) => {
      const el = itemRefs.current[ei]
      if (!el) return { scale: 1, opacity: 1, zIndex: 50, rotateY: 0 }
      const cardMid = el.offsetLeft + el.offsetWidth / 2
      const signed = viewportMid - cardMid
      const dist = Math.abs(signed)
      const t = Math.max(0, Math.min(1, 1 - dist / falloff))
      if (dist < bestD) {
        bestD = dist
        bestEi = ei
      }
      return {
        scale: 0.88 + 0.12 * t,
        opacity: 0.58 + 0.42 * t,
        zIndex: Math.round(10 + t * 90),
        rotateY: Math.max(-8, Math.min(8, -(signed / sc.clientWidth) * 18)),
      }
    })

    return {
      transforms,
      nearestExtended: bestEi,
      logicalNearest: logicalFromExtended(bestEi, n),
    }
  }, [scrollLeft, extended, extLen, n])

  const scrollToLogical = (logicalIdx: number) => {
    scrollToExtendedIndex(logicalIdx + 1, false)
  }

  return (
    <div className="flex w-full shrink-0 flex-col gap-1 overflow-visible">
      {/* Moderate bottom padding inside scrollport for glow; keep dots visually tied to the card */}
      <div className="relative w-full overflow-visible pt-1 pb-0 [transform-style:preserve-3d] sm:pt-2" style={{ perspective: '1200px' }}>
        <div
          ref={scrollerRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Flexkit apps"
          className="no-scrollbar flex snap-x snap-mandatory flex-row gap-2 overflow-x-auto overflow-y-visible px-[max(0.75rem,calc(50vw-min(44vw,12rem)))] pb-8 pt-4 sm:gap-2.5 sm:pb-9 sm:pt-5"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {extended.map((app, ei) => {
            const tf = transforms[ei] ?? { scale: 1, opacity: 1, zIndex: 50, rotateY: 0 }
            const focused = ei === nearestExtended
            return (
              <div
                key={`${app.id}-${ei}`}
                ref={(el) => {
                  itemRefs.current[ei] = el
                }}
                className="flex shrink-0 snap-center snap-always items-center justify-center [transform-style:preserve-3d]"
                style={{
                  transform: `scale(${tf.scale}) rotateY(${tf.rotateY}deg)`,
                  opacity: tf.opacity,
                  zIndex: tf.zIndex,
                }}
              >
                <div className="w-[min(88vw,24rem)]">
                  <AppCardContent app={app} emphasized={focused} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col items-center gap-1.5 pt-0 pb-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-white/28">Swipe cards</p>
        <div className="flex gap-2">
          {orderedApps.map((a, i) => (
            <button
              key={a.id}
              type="button"
              aria-label={`Go to ${a.name}`}
              aria-current={i === logicalNearest ? true : undefined}
              onClick={() => scrollToLogical(i)}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === logicalNearest ? 28 : 7,
                background: i === logicalNearest ? a.color : 'rgba(255,255,255,0.16)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
