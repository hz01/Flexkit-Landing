interface StoreBadgeProps {
  type: 'google' | 'apple' | 'apple-soon'
  url?: string
}

function GooglePlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
      <path d="M3.5 2.27a1.1 1.1 0 0 0-.5.94v17.58c0 .4.18.75.5.94l.08.06 9.84-9.84v-.23L3.58 2.2l-.08.07Z" fill="#4285F4" />
      <path d="M16.7 15.8l-3.28-3.28v-.24l3.28-3.27.08.04 3.88 2.21c1.11.63 1.11 1.66 0 2.29L16.78 15.76l-.09.04Z" fill="#FBBC04" />
      <path d="M16.79 15.76L13.42 12.4 3.5 22.31c.37.39.97.44 1.65.05l11.64-6.6Z" fill="#34A853" />
      <path d="M16.79 8.24L5.15 1.64C4.47 1.25 3.87 1.3 3.5 1.69l9.92 9.91 3.37-3.36Z" fill="#EA4335" />
    </svg>
  )
}

function AppleIcon({ dimmed }: { dimmed?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill={dimmed ? 'rgba(255,255,255,0.3)' : 'white'}>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

export default function StoreBadge({ type, url }: StoreBadgeProps) {
  const isSoon = type === 'apple-soon'

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
      {isGoogle ? <GooglePlayIcon /> : <AppleIcon />}
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
