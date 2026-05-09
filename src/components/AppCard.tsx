import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import StoreBadge from './StoreBadge'
import type { AppData } from '../data/apps'

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
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, margin: '-80px' }}
      className="relative group cursor-default h-full"
    >
      {/* Card body */}
      <div
        className="relative rounded-3xl p-6 flex flex-col items-center gap-4 overflow-hidden transition-all duration-300 h-full"
        style={{
          transformStyle: 'preserve-3d',
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: `1px solid rgba(255,255,255,0.08)`,
          boxShadow: '0 0 0 0 transparent',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.borderColor = `${app.color}55`
          ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 28px ${app.glowColor}`
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'
          ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 0 transparent'
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{ background: `linear-gradient(to right, transparent, ${app.color}60, transparent)` }}
        />

        {/* App icon */}
        <motion.div
          style={{ transform: 'translateZ(30px)' }}
          whileHover={{ scale: 1.08 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <img
            src={app.logo}
            alt={`${app.name} logo`}
            className="w-24 h-24 rounded-[22px]"
            style={{
              boxShadow: `0 12px 40px ${app.glowColor}, 0 0 0 1px rgba(255,255,255,0.06)`,
            }}
          />
        </motion.div>

        {/* Name + tagline */}
        <div className="text-center" style={{ transform: 'translateZ(20px)' }}>
          <h3 className="text-2xl font-bold" style={{ color: app.color }}>
            {app.name}
          </h3>
          <p className="text-sm mt-1 font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {app.tagline}
          </p>
        </div>

        {/* Description */}
        <p className="text-center text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)' }}>
          {app.description}
        </p>

        {/* Divider — mt-auto pushes it (and badges) to the bottom */}
        <div className="w-full h-px mt-auto" style={{ background: 'rgba(255,255,255,0.06)' }} />

        {/* Badges */}
        <div className="flex flex-col gap-2.5 w-full">
          <StoreBadge type="google" url={app.playStoreUrl} />
          {app.appStoreUrl
            ? <StoreBadge type="apple" url={app.appStoreUrl} />
            : <StoreBadge type="apple-soon" />
          }
        </div>
      </div>
    </motion.div>
  )
}
