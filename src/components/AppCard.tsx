import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import StoreBadge from './StoreBadge'
import type { AppData } from '../data/apps'

/** Same glass card body as desktop grid (reused by mobile infinite carousel). */
export function AppCardContent({ app, emphasized }: { app: AppData; emphasized?: boolean }) {
  return (
    <div
      className="relative flex h-full min-h-0 flex-col items-center gap-4 overflow-hidden rounded-3xl p-6 transition-all duration-300"
      style={{
        transformStyle: 'preserve-3d',
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: emphasized ? `1px solid ${app.color}55` : '1px solid rgba(255,255,255,0.08)',
        boxShadow: emphasized ? `0 0 28px ${app.glowColor}` : '0 0 0 0 transparent',
      }}
      onMouseEnter={emphasized ? undefined : (e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = `${app.color}55`
        el.style.boxShadow = `0 0 28px ${app.glowColor}`
      })}
      onMouseLeave={emphasized ? undefined : (e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'rgba(255,255,255,0.08)'
        el.style.boxShadow = '0 0 0 0 transparent'
      })}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${app.color}60, transparent)` }}
      />

      <motion.div
        style={{ transform: 'translateZ(30px)' }}
        whileHover={{ scale: 1.08 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <img
          src={app.logo}
          alt={`${app.name} logo`}
          className="h-24 w-24 rounded-[22px]"
          style={{
            boxShadow: `0 12px 40px ${app.glowColor}, 0 0 0 1px rgba(255,255,255,0.06)`,
          }}
        />
      </motion.div>

      <div className="text-center" style={{ transform: 'translateZ(20px)' }}>
        <h3 className="text-2xl font-bold" style={{ color: app.color }}>
          {app.name}
        </h3>
        <p className="mt-1 text-sm font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>
          {app.tagline}
        </p>
      </div>

      <p className="text-center text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)' }}>
        {app.description}
      </p>

      <div className="mt-auto h-px w-full" style={{ background: 'rgba(255,255,255,0.06)' }} />

      <div className="flex w-full flex-col gap-2.5">
        <StoreBadge type="google" url={app.playStoreUrl} />
        {app.appStoreUrl
          ? <StoreBadge type="apple" url={app.appStoreUrl} />
          : <StoreBadge type="apple-soon" />}
      </div>
    </div>
  )
}

export default function AppCard({ app, index }: { app: AppData; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 20 })

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function onMouseLeave() {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, margin: '-40px' }}
      className="group relative w-full cursor-default lg:h-full"
    >
      <AppCardContent app={app} />
    </motion.div>
  )
}
