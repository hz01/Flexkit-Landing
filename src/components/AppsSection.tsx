import { motion } from 'framer-motion'
import AppCard from './AppCard'
import { apps } from '../data/apps'

export default function AppsSection() {
  return (
    <section className="relative lg:h-screen flex flex-col justify-center overflow-hidden px-6 md:px-12 lg:px-20 py-12 lg:py-0">
      <div className="max-w-7xl mx-auto w-full">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Our Apps
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            The{' '}
            <span className="gradient-text">lineup</span>
          </h2>
          <p className="mt-3 text-sm md:text-base max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Three apps. Each one does one thing, and does it well.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {apps.map((app, i) => (
            <AppCard key={app.id} app={app} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
