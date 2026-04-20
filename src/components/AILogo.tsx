const AILogo = ({ className = "w-10 h-10" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background hexagon with gold gradient */}
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c9a96e" />
          <stop offset="50%" stopColor="#d4b87a" />
          <stop offset="100%" stopColor="#a0894e" />
        </linearGradient>
        <linearGradient id="goldGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f7e7ce" />
          <stop offset="100%" stopColor="#c9a96e" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Hexagon frame */}
      <path
        d="M50 5 L93.3 30 V80 L50 95 L6.7 80 V30 Z"
        stroke="url(#goldGrad)"
        strokeWidth="2"
        fill="rgba(201, 169, 110, 0.08)"
        filter="url(#glow)"
      />
      
      {/* Inner circuit lines */}
      <path
        d="M50 20 L50 40 M35 32 L50 40 L65 32"
        stroke="url(#goldGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Circuit nodes */}
      <circle cx="50" cy="20" r="3" fill="url(#goldGrad)" filter="url(#glow)" />
      <circle cx="35" cy="32" r="2.5" fill="url(#goldGradLight)" />
      <circle cx="65" cy="32" r="2.5" fill="url(#goldGradLight)" />
      <circle cx="50" cy="40" r="3" fill="url(#goldGrad)" filter="url(#glow)" />
      
      {/* AI text inside */}
      <text
        x="50"
        y="72"
        textAnchor="middle"
        fill="url(#goldGrad)"
        fontSize="22"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
        letterSpacing="2"
        filter="url(#glow)"
      >
        AI
      </text>
      
      {/* Small decorative dots */}
      <circle cx="20" cy="50" r="1.5" fill="rgba(201, 169, 110, 0.6)" />
      <circle cx="80" cy="50" r="1.5" fill="rgba(201, 169, 110, 0.6)" />
      <circle cx="50" cy="88" r="1.5" fill="rgba(201, 169, 110, 0.6)" />
    </svg>
  )
}

export default AILogo
