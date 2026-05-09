import { motion } from 'framer-motion'

export default function ToolsBanner() {
  const year = new Date().getFullYear()

  return (
    <section className="relative lg:h-screen flex flex-col overflow-hidden px-6 md:px-12 lg:px-20 py-12 lg:py-0">

      {/* Main content — centered, takes all available space */}
      <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Web Platform
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            Flexkit{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #F59E0B, #F97316)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Tools
            </span>
          </h2>
          <p className="mt-3 text-sm md:text-base max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Powerful browser-based utilities. Always free, no install, no account needed.
          </p>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden group"
        >
          {/* Gradient border */}
          <div
            className="absolute -inset-px rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: 'linear-gradient(135deg, #F59E0B, #F97316, #EF4444)' }}
          />

          {/* Card inner */}
          <div
            className="relative rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center overflow-hidden"
            style={{ background: '#0b0b18' }}
          >
            {/* Background accent */}
            <div
              className="absolute right-0 top-0 w-[60%] h-full pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at right center, rgba(245,158,11,0.12) 0%, transparent 70%)' }}
            />
            <div className="dot-grid absolute inset-0 opacity-30" />

            {/* Left: text */}
            <div className="relative z-10 flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(249,115,22,0.15))',
                    border: '1px solid rgba(245,158,11,0.3)',
                  }}
                >
                  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="#F59E0B" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Flexkit Tools</h3>
                  <p className="text-sm font-medium" style={{ color: 'rgba(245,158,11,0.7)' }}>tools.flexkit.net</p>
                </div>
              </div>

              <p className="text-sm leading-relaxed max-w-md" style={{ color: 'rgba(255,255,255,0.55)' }}>
                A growing suite of web utilities built with the same care as our apps.
                Open your browser, get things done. Instantly, for free.
              </p>

              <motion.a
                href="https://tools.flexkit.net"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="self-start flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold text-sm"
                style={{
                  background: 'linear-gradient(135deg, #F59E0B, #F97316)',
                  color: '#000',
                  boxShadow: '0 0 28px rgba(245,158,11,0.3)',
                }}
              >
                Launch Web App
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.a>
            </div>

            {/* Right: feature pills */}
            <div className="relative z-10 hidden lg:flex flex-col gap-3">
              {[
                'Always Free',
                'No Account Needed',
                'Works in Any Browser',
                'New Tools Added Regularly',
              ].map((label, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl"
                  style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.12)' }}
                >
                  <span style={{ color: '#F59E0B' }} className="text-xs">✦</span>
                  <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.65)' }}>{label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer — pinned at bottom of this snap page */}
      <footer
        className="max-w-7xl mx-auto w-full py-6 flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <span className="gradient-text text-lg font-black tracking-tight">FLEXKIT</span>
        <span className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>
          © {year} All rights reserved
        </span>
        <div className="flex items-center gap-6">
          <a
            href="https://tools.flexkit.net"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-white transition-colors duration-200"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            Flexkit Tools
          </a>
          <a
            href="mailto:teamflexkit@gmail.com"
            className="text-sm hover:text-white transition-colors duration-200"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            Contact
          </a>
        </div>
      </footer>
    </section>
  )
}
