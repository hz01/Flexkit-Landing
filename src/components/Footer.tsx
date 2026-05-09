export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="border-t px-6 md:px-12 lg:px-20 py-10"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="gradient-text text-xl font-black tracking-tight">FLEXKIT</span>
          <span className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
            © {year}
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://tools.flexkit.net"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors duration-200 hover:text-white"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            Flexkit Tools
          </a>
          <a
            href="mailto:hello@flexkit.net"
            className="text-sm transition-colors duration-200 hover:text-white"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}
