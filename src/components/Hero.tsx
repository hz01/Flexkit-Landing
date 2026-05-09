import { motion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { apps } from '../data/apps'

const HeroScene = lazy(() => import('./HeroScene'))

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

export default function Hero() {
  return (
    <section className="relative lg:h-screen flex items-center overflow-hidden py-24 lg:py-0">
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-20 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left: text */}
        <div className="flex flex-col gap-6 z-10">
          {/* Badge */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 self-start"
          >
            <span
              className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              3 apps · 1 ecosystem
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="gradient-text font-black leading-none"
            style={{ fontSize: 'clamp(4rem, 10vw, 9rem)' }}
          >
            FLEX
            <br />
            KIT
          </motion.h1>

          {/* Tagline */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-lg md:text-xl font-light max-w-md"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            Beautifully simple apps built for everyday life, crafted with care, shipped for everyone.
          </motion.p>

          {/* CTA scroll hint */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex items-center gap-3 mt-2"
          >
            <div className="flex -space-x-2">
              {apps.map((app) => (
                <img
                  key={app.id}
                  src={app.logo}
                  alt={app.name}
                  className="w-8 h-8 rounded-full border-2 border-[#06060f] object-cover"
                />
              ))}
            </div>
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Available on Android &amp; iOS
            </span>
          </motion.div>
        </div>

        {/* Right: 3D scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="hidden lg:block h-[520px] relative"
        >
          {/* Glow behind the 3D scene */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(74,108,247,0.15) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-[11px] uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Scroll
        </span>
        <motion.div
          className="w-px h-10 origin-top"
          style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)' }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
