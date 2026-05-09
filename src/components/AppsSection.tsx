import { useMemo } from 'react'
import { motion } from 'framer-motion'
import AppCard from './AppCard'
import MobileAppsShowcase from './MobileAppsShowcase'
import { appsInShowcaseOrder } from '../data/apps'

export default function AppsSection() {
  const showcaseApps = useMemo(() => appsInShowcaseOrder(), [])
  return (
    <section className="relative h-screen snap-start snap-always shrink-0 flex flex-col overflow-hidden px-4 sm:px-6 md:px-12 lg:px-20 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:pb-0 lg:py-0">
      <div className="max-w-7xl mx-auto w-full flex flex-col flex-1 min-h-0 lg:justify-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex-shrink-0 text-center mb-4 sm:mb-5 lg:mb-10"
        >
          <p
            className="text-[9px] sm:text-[10px] lg:text-xs font-semibold uppercase tracking-[0.35em] mb-0.5 lg:mb-3"
            style={{ color: 'rgba(255,255,255,0.32)' }}
          >
            Our Apps
          </p>
          <h2 className="text-[1.65rem] sm:text-3xl md:text-5xl font-black tracking-tight leading-none lg:leading-tight">
            The{' '}
            <span className="gradient-text">lineup</span>
          </h2>
          <p
            className="hidden sm:block mt-1.5 lg:mt-3 text-[11px] sm:text-xs lg:text-base max-w-md mx-auto leading-relaxed lg:leading-normal px-1 lg:px-0"
            style={{ color: 'rgba(255,255,255,0.42)' }}
          >
            Three apps. Each one does one thing, and does it well.
          </p>
          <p
            className="sm:hidden mt-1 text-[11px] max-w-[18rem] mx-auto leading-snug"
            style={{ color: 'rgba(255,255,255,0.38)' }}
          >
            One job each, done right.
          </p>
        </motion.div>

        {/* Mobile: horizontal cover-flow carousel · Desktop: grid */}
        <div className="flex flex-col flex-1 min-h-0 justify-start w-full lg:flex-none">
          <div className="lg:hidden w-full shrink-0 flex flex-col justify-start min-h-0 overflow-visible">
            <MobileAppsShowcase />
          </div>
          <div className="hidden lg:grid lg:grid-cols-3 lg:gap-5 lg:items-stretch w-full">
            {showcaseApps.map((app, i) => (
              <div key={app.id} className="w-full">
                <AppCard app={app} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
