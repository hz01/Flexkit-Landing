export default function Background() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-100" />

      {/* Teal orb (Swipr) */}
      <div
        className="absolute rounded-full"
        style={{
          width: 700,
          height: 700,
          top: '-15%',
          right: '-10%',
          background: 'radial-gradient(circle, rgba(32,201,151,0.18) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'orb1 18s ease-in-out infinite',
        }}
      />

      {/* Blue orb (SubTrakr) */}
      <div
        className="absolute rounded-full"
        style={{
          width: 600,
          height: 600,
          bottom: '10%',
          left: '-8%',
          background: 'radial-gradient(circle, rgba(74,108,247,0.18) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'orb2 22s ease-in-out infinite',
        }}
      />

      {/* Purple orb (Scribr) */}
      <div
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          top: '40%',
          right: '20%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'orb3 26s ease-in-out infinite',
        }}
      />

      {/* Bottom gradient fade */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#06060f] to-transparent" />
    </div>
  )
}
