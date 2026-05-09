interface StoreBadgeProps {
  type: 'google' | 'apple' | 'apple-soon'
  url?: string
  /** Icon-only chip for tight layouts */
  compact?: boolean
  /** Official black store badges */
  official?: boolean
  /** Dark gray pills on mobile carousel cards */
  carouselCard?: boolean
}

function GooglePlayIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d="M3.5 2.27a1.1 1.1 0 0 0-.5.94v17.58c0 .4.18.75.5.94l.08.06 9.84-9.84v-.23L3.58 2.2l-.08.07Z" fill="#4285F4" />
      <path d="M16.7 15.8l-3.28-3.28v-.24l3.28-3.27.08.04 3.88 2.21c1.11.63 1.11 1.66 0 2.29L16.78 15.76l-.09.04Z" fill="#FBBC04" />
      <path d="M16.79 15.76L13.42 12.4 3.5 22.31c.37.39.97.44 1.65.05l11.64-6.6Z" fill="#34A853" />
      <path d="M16.79 8.24L5.15 1.64C4.47 1.25 3.87 1.3 3.5 1.69l9.92 9.91 3.37-3.36Z" fill="#EA4335" />
    </svg>
  )
}

function AppleIcon({ dimmed, className = 'w-6 h-6' }: { dimmed?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={dimmed ? 'rgba(255,255,255,0.3)' : 'white'}>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

const compactChip =
  'flex items-center justify-center w-12 h-12 rounded-2xl shrink-0 transition-colors duration-200'

const officialShell =
  'flex items-center gap-3.5 w-full rounded-xl bg-black border-2 border-[#d0d0d0]/50 px-4 py-3.5 min-h-[54px] shrink-0'

const carouselShell =
  'flex items-center gap-3.5 w-full rounded-2xl bg-[#2c2c38] border border-white/[0.07] px-4 py-3.5 min-h-[52px] shrink-0 justify-start transition-opacity active:opacity-85'

export default function StoreBadge({ type, url, compact, official, carouselCard }: StoreBadgeProps) {
  const isSoon = type === 'apple-soon'

  if (carouselCard) {
    const labelSm = 'text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45'
    const labelLg = 'text-[16px] font-bold text-white tracking-tight -mt-0.5'

    if (type === 'google' && url) {
      return (
        <a href={url} target="_blank" rel="noopener noreferrer" className={carouselShell}>
          <GooglePlayIcon className="w-9 h-9 shrink-0" />
          <div className="text-left leading-tight min-w-0">
            <div className={labelSm}>GET IT ON</div>
            <div className={labelLg}>Google Play</div>
          </div>
        </a>
      )
    }
    if (type === 'apple' && url) {
      return (
        <a href={url} target="_blank" rel="noopener noreferrer" className={carouselShell}>
          <AppleIcon className="w-8 h-8 shrink-0 ml-0.5" />
          <div className="text-left leading-tight min-w-0">
            <div className={labelSm}>DOWNLOAD ON THE</div>
            <div className={labelLg}>App Store</div>
          </div>
        </a>
      )
    }
    if (isSoon) {
      return (
        <div
          className={`${carouselShell} cursor-default select-none opacity-75 border-dashed border-white/20`}
          title="App Store (coming soon)"
        >
          <AppleIcon dimmed className="w-8 h-8 shrink-0 ml-0.5" />
          <div className="text-left leading-tight min-w-0">
            <div className={`${labelSm} text-white/35`}>COMING SOON</div>
            <div className="text-[16px] font-bold text-white/50 tracking-tight -mt-0.5">App Store</div>
          </div>
        </div>
      )
    }
  }

  if (official) {
    if (type === 'google' && url) {
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${officialShell} justify-start active:opacity-90 transition-opacity`}
        >
          <GooglePlayIcon className="w-9 h-9 shrink-0" />
          <div className="text-left leading-tight min-w-0">
            <div className="text-[11px] font-semibold uppercase tracking-[0.07em] text-white">
              GET IT ON
            </div>
            <div className="text-[17px] font-semibold text-white tracking-tight -mt-0.5">
              Google Play
            </div>
          </div>
        </a>
      )
    }
    if (type === 'apple' && url) {
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${officialShell} justify-start active:opacity-90 transition-opacity`}
        >
          <AppleIcon className="w-8 h-8 shrink-0 ml-0.5" />
          <div className="text-left leading-tight min-w-0">
            <div className="text-[11px] font-semibold text-white/90 tracking-wide">
              Download on the
            </div>
            <div className="text-[17px] font-semibold text-white tracking-tight -mt-0.5">
              App Store
            </div>
          </div>
        </a>
      )
    }
    if (isSoon) {
      return (
        <div
          className={`${officialShell} cursor-default select-none justify-start opacity-[0.72] border-dashed border-white/35`}
          title="App Store (coming soon)"
        >
          <AppleIcon dimmed className="w-8 h-8 shrink-0 ml-0.5" />
          <div className="text-left leading-tight min-w-0">
            <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/45">
              Coming soon
            </div>
            <div className="text-[17px] font-semibold text-white/55 tracking-tight -mt-0.5">
              App Store
            </div>
          </div>
        </div>
      )
    }
  }

  if (compact && isSoon) {
    return (
      <div
        className={`${compactChip} cursor-default select-none`}
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px dashed rgba(255,255,255,0.12)',
        }}
        title="App Store (coming soon)"
      >
        <AppleIcon dimmed className="w-6 h-6" />
      </div>
    )
  }

  if (compact && type === 'google' && url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={compactChip}
        style={{
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.12)',
        }}
        title="Get it on Google Play"
      >
        <GooglePlayIcon className="w-6 h-6" />
      </a>
    )
  }

  if (compact && type === 'apple' && url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={compactChip}
        style={{
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.12)',
        }}
        title="Download on the App Store"
      >
        <AppleIcon className="w-6 h-6" />
      </a>
    )
  }

  if (isSoon) {
    return (
      <div
        className="flex items-center gap-3 rounded-2xl px-5 py-3 cursor-default select-none"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px dashed rgba(255,255,255,0.1)',
        }}
      >
        <AppleIcon dimmed />
        <div className="text-left leading-tight">
          <div className="text-[10px] font-medium uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Coming Soon
          </div>
          <div className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.35)' }}>
            App Store
          </div>
        </div>
        <div
          className="ml-auto text-[9px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full"
          style={{
            background: 'rgba(255,255,255,0.06)',
            color: 'rgba(255,255,255,0.3)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          iOS
        </div>
      </div>
    )
  }

  const isGoogle = type === 'google'

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-2xl px-5 py-3 transition-all duration-200"
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'
        ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'
        ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'
      }}
    >
      {isGoogle ? <GooglePlayIcon className="w-6 h-6" /> : <AppleIcon className="w-6 h-6" />}
      <div className="text-left leading-tight">
        <div className="text-[10px] font-medium uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.45)' }}>
          {isGoogle ? 'Get it on' : 'Download on the'}
        </div>
        <div className="text-sm font-semibold text-white">
          {isGoogle ? 'Google Play' : 'App Store'}
        </div>
      </div>
    </a>
  )
}
