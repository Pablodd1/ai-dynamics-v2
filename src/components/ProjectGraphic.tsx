import React from 'react'

export type ProjectGraphicType = 
  | 'biomechanics'
  | 'spatial-3d'
  | 'telemetry'
  | 'data-pipeline'
  | 'voice-wave'
  | 'agentic-flow'
  | 'defect-vision'
  | 'marketplace'
  | 'crm-funnel'
  | 'simulation-matrix'

interface ProjectGraphicProps {
  type: ProjectGraphicType
  className?: string
  accentColor?: string
}

export const ProjectGraphic: React.FC<ProjectGraphicProps> = ({ 
  type, 
  className = 'w-full h-36',
  accentColor = '#c5a059'
}) => {
  switch (type) {
    case 'biomechanics':
      // Kinetic skeletal wireframe with joint angle callout
      return (
        <div className={`relative overflow-hidden rounded-lg bg-dark-50 border border-white/5 flex items-center justify-center p-3 ${className}`}>
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-luxury-gold/5" />
          <svg viewBox="0 0 320 120" className="w-full h-full relative z-10" fill="none">
            {/* Grid overlay */}
            <defs>
              <pattern id="bio-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="320" height="120" fill="url(#bio-grid)" />
            
            {/* Skeletal Pose Lines */}
            {/* Head */}
            <circle cx="160" cy="22" r="7" stroke={accentColor} strokeWidth="1.5" fill="#121218" />
            {/* Spine */}
            <line x1="160" y1="29" x2="160" y2="55" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
            {/* Shoulders */}
            <line x1="140" y1="36" x2="180" y2="36" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
            {/* Arms */}
            <line x1="140" y1="36" x2="128" y2="52" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
            <line x1="128" y1="52" x2="122" y2="68" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
            <line x1="180" y1="36" x2="194" y2="50" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
            <line x1="194" y1="50" x2="204" y2="62" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
            
            {/* Pelvis / Hips */}
            <line x1="148" y1="55" x2="172" y2="55" stroke={accentColor} strokeWidth="1.5" />
            {/* Left Leg (Stance / Flexed) */}
            <line x1="152" y1="55" x2="142" y2="82" stroke={accentColor} strokeWidth="1.5" />
            <line x1="142" y1="82" x2="136" y2="108" stroke={accentColor} strokeWidth="1.5" />
            <line x1="136" y1="108" x2="148" y2="110" stroke={accentColor} strokeWidth="2" />
            
            {/* Right Leg (Swing) */}
            <line x1="168" y1="55" x2="186" y2="78" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="186" y1="78" x2="198" y2="98" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="198" y1="98" x2="210" y2="96" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />

            {/* Joint Nodes */}
            <circle cx="142" cy="82" r="3.5" fill={accentColor} className="animate-pulse" />
            <circle cx="186" cy="78" r="3" fill="#ffffff" opacity="0.8" />
            <circle cx="136" cy="108" r="3" fill={accentColor} />

            {/* Kinetic Angle Vector Callout */}
            <path d="M 136 76 A 12 12 0 0 1 148 76" stroke={accentColor} strokeWidth="1" strokeDasharray="2 2" fill="none" />
            <text x="75" y="84" fill={accentColor} fontSize="9" fontFamily="monospace" fontWeight="600">
              KNEE FLEXION: 142.4°
            </text>
            <line x1="130" y1="82" x2="138" y2="82" stroke={accentColor} strokeWidth="0.8" />

            {/* Cadence Telemetry Pill */}
            <rect x="220" y="16" width="88" height="24" rx="4" fill="rgba(18,18,24,0.9)" stroke="rgba(197,160,89,0.3)" strokeWidth="0.8" />
            <text x="228" y="32" fill="#e2e8f0" fontSize="9" fontFamily="monospace">
              CAD: 178 SPM
            </text>

            <rect x="220" y="46" width="88" height="24" rx="4" fill="rgba(18,18,24,0.9)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
            <text x="228" y="62" fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="monospace">
              GCT: 218 ms
            </text>
          </svg>
        </div>
      )

    case 'spatial-3d':
      // 3D wireframe room with depth point cloud and laser measurement
      return (
        <div className={`relative overflow-hidden rounded-lg bg-dark-50 border border-white/5 flex items-center justify-center p-3 ${className}`}>
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-blue-500/5" />
          <svg viewBox="0 0 320 120" className="w-full h-full relative z-10" fill="none">
            {/* Perspective Room Lines */}
            <polygon points="40,20 280,20 250,95 70,95" stroke="rgba(34,211,238,0.35)" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="40" y1="20" x2="70" y2="95" stroke="rgba(34,211,238,0.6)" strokeWidth="1.2" />
            <line x1="280" y1="20" x2="250" y2="95" stroke="rgba(34,211,238,0.6)" strokeWidth="1.2" />
            <line x1="70" y1="95" x2="250" y2="95" stroke="rgba(34,211,238,0.8)" strokeWidth="1.5" />
            <line x1="40" y1="20" x2="280" y2="20" stroke="rgba(34,211,238,0.4)" strokeWidth="1" />

            {/* Depth LiDAR Point Cloud Nodes */}
            {[
              [90, 45], [115, 38], [140, 50], [160, 35], [190, 48], [215, 40], [235, 55],
              [85, 75], [110, 68], [145, 80], [175, 72], [205, 82], [230, 70], [160, 60]
            ].map(([x, y], idx) => (
              <circle key={idx} cx={x} cy={y} r="1.5" fill="#38bdf8" opacity={0.6 + (idx % 3) * 0.15} />
            ))}

            {/* Measurement Dimension Ray */}
            <line x1="70" y1="102" x2="250" y2="102" stroke="#22d3ee" strokeWidth="1" />
            <line x1="70" y1="98" x2="70" y2="106" stroke="#22d3ee" strokeWidth="1" />
            <line x1="250" y1="98" x2="250" y2="106" stroke="#22d3ee" strokeWidth="1" />
            <rect x="128" y="94" width="64" height="16" rx="3" fill="#0f172a" stroke="#22d3ee" strokeWidth="0.8" />
            <text x="135" y="106" fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="600">
              18' 4.5"
            </text>

            {/* Bounding Fixture Detection */}
            <rect x="175" y="32" width="45" height="32" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 2" fill="rgba(245,158,11,0.06)" />
            <text x="178" y="42" fill="#fbbf24" fontSize="7" fontFamily="monospace">
              HVAC: CONF 98%
            </text>
          </svg>
        </div>
      )

    case 'telemetry':
      // Clinical vital waveform & longitudinal health pulse
      return (
        <div className={`relative overflow-hidden rounded-lg bg-dark-50 border border-white/5 flex items-center justify-center p-3 ${className}`}>
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-teal-500/5" />
          <svg viewBox="0 0 320 120" className="w-full h-full relative z-10" fill="none">
            {/* Clinical ECG / Telemetry Line */}
            <path
              d="M 10 60 L 60 60 L 70 45 L 80 75 L 90 20 L 100 95 L 110 50 L 120 65 L 130 60 L 190 60 L 200 48 L 210 72 L 220 25 L 230 92 L 240 54 L 250 64 L 260 60 L 310 60"
              stroke="#10b981"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Glowing sweep node */}
            <circle cx="220" cy="25" r="4" fill="#34d399" className="animate-ping" opacity="0.6" />
            <circle cx="220" cy="25" r="3" fill="#10b981" />

            {/* Clinical Metrics Cards */}
            <rect x="20" y="12" width="70" height="26" rx="4" fill="rgba(18,18,24,0.9)" stroke="rgba(16,185,129,0.3)" strokeWidth="0.8" />
            <text x="26" y="24" fill="rgba(255,255,255,0.6)" fontSize="7" fontFamily="sans-serif">PULSE RATE</text>
            <text x="26" y="34" fill="#34d399" fontSize="9" fontFamily="monospace" fontWeight="600">62 BPM</text>

            <rect x="100" y="12" width="70" height="26" rx="4" fill="rgba(18,18,24,0.9)" stroke="rgba(16,185,129,0.3)" strokeWidth="0.8" />
            <text x="106" y="24" fill="rgba(255,255,255,0.6)" fontSize="7" fontFamily="sans-serif">BLOOD PRESS</text>
            <text x="106" y="34" fill="#34d399" fontSize="9" fontFamily="monospace" fontWeight="600">118/76 mmHg</text>

            <rect x="235" y="78" width="75" height="26" rx="4" fill="rgba(18,18,24,0.9)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
            <text x="241" y="90" fill="rgba(255,255,255,0.6)" fontSize="7" fontFamily="sans-serif">SpO2 OXYGEN</text>
            <text x="241" y="100" fill="#e2e8f0" fontSize="9" fontFamily="monospace" fontWeight="600">98.5% STABLE</text>
          </svg>
        </div>
      )

    case 'data-pipeline':
      // WatchFacts & enterprise ingestion matrix
      return (
        <div className={`relative overflow-hidden rounded-lg bg-dark-50 border border-white/5 flex items-center justify-center p-3 ${className}`}>
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-indigo-500/5" />
          <svg viewBox="0 0 320 120" className="w-full h-full relative z-10" fill="none">
            {/* Raw Ingestion Stream Nodes */}
            <rect x="15" y="20" width="65" height="22" rx="3" fill="#1e1b4b" stroke="#6366f1" strokeWidth="0.8" />
            <text x="22" y="34" fill="#a5b4fc" fontSize="8" fontFamily="monospace">TG/WA FEED</text>

            <rect x="15" y="50" width="65" height="22" rx="3" fill="#1e1b4b" stroke="#6366f1" strokeWidth="0.8" />
            <text x="22" y="64" fill="#a5b4fc" fontSize="8" fontFamily="monospace">HKD/USD/USDT</text>

            <rect x="15" y="80" width="65" height="22" rx="3" fill="#1e1b4b" stroke="#6366f1" strokeWidth="0.8" />
            <text x="22" y="94" fill="#a5b4fc" fontSize="8" fontFamily="monospace">IMAGE PIPELINE</text>

            {/* Connecting Convergence Rays */}
            <path d="M 80 31 L 130 55" stroke="rgba(99,102,241,0.5)" strokeWidth="1" strokeDasharray="3 2" />
            <path d="M 80 61 L 130 61" stroke="rgba(99,102,241,0.7)" strokeWidth="1.2" />
            <path d="M 80 91 L 130 67" stroke="rgba(99,102,241,0.5)" strokeWidth="1" strokeDasharray="3 2" />

            {/* Central Normalization & Matching Core */}
            <rect x="130" y="40" width="75" height="42" rx="5" fill="#0f172a" stroke={accentColor} strokeWidth="1.2" />
            <text x="137" y="56" fill={accentColor} fontSize="8" fontFamily="monospace" fontWeight="600">ENTITY MATCH</text>
            <text x="137" y="70" fill="rgba(255,255,255,0.7)" fontSize="7" fontFamily="sans-serif">REF RESOLUTION</text>

            {/* Output Verification Vector */}
            <line x1="205" y1="61" x2="245" y2="61" stroke={accentColor} strokeWidth="1.5" />
            <polygon points="245,61 240,58 240,64" fill={accentColor} />

            {/* Clean Structured Output Card */}
            <rect x="245" y="32" width="65" height="58" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
            <text x="252" y="46" fill="#10b981" fontSize="7" fontFamily="monospace">CONF: 99.4%</text>
            <text x="252" y="58" fill="#e4e4e7" fontSize="8" fontFamily="sans-serif" fontWeight="600">Rolex 116500</text>
            <text x="252" y="70" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">Clean Ref Match</text>
            <text x="252" y="82" fill={accentColor} fontSize="7" fontFamily="monospace">Normalized USD</text>
          </svg>
        </div>
      )

    case 'voice-wave':
      // Bilingual Voice AI soundwave & telephony synthesis
      return (
        <div className={`relative overflow-hidden rounded-lg bg-dark-50 border border-white/5 flex items-center justify-center p-3 ${className}`}>
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-amber-500/5" />
          <svg viewBox="0 0 320 120" className="w-full h-full relative z-10" fill="none">
            {/* Audio Waveform Equalizer Bars */}
            {[
              18, 35, 52, 24, 68, 85, 45, 95, 78, 60, 42, 88, 72, 38, 55, 70, 92, 48, 64, 32, 50, 75, 40, 20
            ].map((height, i) => (
              <rect
                key={i}
                x={40 + i * 10}
                y={60 - height / 2}
                width="4.5"
                height={height}
                rx="2"
                fill={i % 3 === 0 ? accentColor : i % 2 === 0 ? '#10b981' : 'rgba(255,255,255,0.4)'}
                opacity={0.8}
              />
            ))}

            {/* Bilingual Latency Pill */}
            <rect x="25" y="14" width="125" height="20" rx="3" fill="#18181b" stroke="rgba(16,185,129,0.4)" strokeWidth="0.8" />
            <circle cx="34" cy="24" r="3" fill="#10b981" />
            <text x="42" y="27" fill="#e4e4e7" fontSize="8" fontFamily="monospace">
              SYNTHESIS: &lt;580ms
            </text>

            <rect x="180" y="14" width="115" height="20" rx="3" fill="#18181b" stroke="rgba(197,160,89,0.4)" strokeWidth="0.8" />
            <text x="188" y="27" fill={accentColor} fontSize="8" fontFamily="monospace">
              EN/ES BILINGUAL
            </text>

            {/* PSTN / VoIP Route Indicator */}
            <text x="75" y="108" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="sans-serif">
              INBOUND CALL ➔ DEEPGRAM NOVA-2 ➔ ELEVENLABS ➔ CALENDAR
            </text>
          </svg>
        </div>
      )

    case 'defect-vision':
      // Computer vision surface defect detection & polygon mask
      return (
        <div className={`relative overflow-hidden rounded-lg bg-dark-50 border border-white/5 flex items-center justify-center p-3 ${className}`}>
          <div className="absolute inset-0 bg-gradient-to-tr from-red-500/10 via-transparent to-amber-500/5" />
          <svg viewBox="0 0 320 120" className="w-full h-full relative z-10" fill="none">
            {/* Simulated Wall / Surface Grid */}
            <rect x="30" y="15" width="260" height="90" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <line x1="30" y1="60" x2="290" y2="60" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            <line x1="160" y1="15" x2="160" y2="105" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />

            {/* Detected Crack Defect (Red Polygon) */}
            <path d="M 90 35 Q 110 50 125 75 T 140 85" stroke="#ef4444" strokeWidth="2" fill="none" />
            <rect x="80" y="28" width="70" height="65" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 2" fill="rgba(239,68,68,0.08)" />
            <rect x="80" y="18" width="62" height="12" fill="#ef4444" rx="2" />
            <text x="83" y="27" fill="#ffffff" fontSize="7" fontFamily="monospace" fontWeight="600">CRACK: 96.4%</text>

            {/* Moisture Stain Detection (Orange Polygon) */}
            <ellipse cx="225" cy="55" rx="35" ry="22" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" fill="rgba(245,158,11,0.08)" />
            <rect x="225" y="25" width="62" height="12" fill="#f59e0b" rx="2" />
            <text x="228" y="34" fill="#000000" fontSize="7" fontFamily="monospace" fontWeight="600">MOISTURE: 92%</text>

            {/* Auto-ticket badge */}
            <rect x="180" y="85" width="105" height="18" rx="3" fill="#09090b" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
            <text x="186" y="97" fill="#e4e4e7" fontSize="7" fontFamily="monospace">
              REPAIR TICKET DISPATCHED
            </text>
          </svg>
        </div>
      )

    case 'agentic-flow':
    default:
      // Distributed multi-agent decision & execution DAG
      return (
        <div className={`relative overflow-hidden rounded-lg bg-dark-50 border border-white/5 flex items-center justify-center p-3 ${className}`}>
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-luxury-gold/5" />
          <svg viewBox="0 0 320 120" className="w-full h-full relative z-10" fill="none">
            {/* Input Node */}
            <circle cx="45" cy="60" r="14" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.2" />
            <text x="36" y="63" fill="#c7d2fe" fontSize="8" fontFamily="monospace">IN</text>

            {/* Flow to Agent 1 & Agent 2 */}
            <path d="M 59 60 Q 85 30 115 35" stroke="rgba(197,160,89,0.5)" strokeWidth="1.2" strokeDasharray="3 2" />
            <path d="M 59 60 Q 85 90 115 85" stroke="rgba(197,160,89,0.5)" strokeWidth="1.2" strokeDasharray="3 2" />

            {/* Agent Nodes */}
            <rect x="115" y="22" width="70" height="26" rx="4" fill="#18181b" stroke={accentColor} strokeWidth="1" />
            <text x="122" y="38" fill={accentColor} fontSize="8" fontFamily="monospace">AGENT A: RAG</text>

            <rect x="115" y="72" width="70" height="26" rx="4" fill="#18181b" stroke="#a855f7" strokeWidth="1" />
            <text x="122" y="88" fill="#d8b4fe" fontSize="8" fontFamily="monospace">AGENT B: TOOL</text>

            {/* Convergence to Decision Node */}
            <path d="M 185 35 Q 210 45 225 60" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
            <path d="M 185 85 Q 210 75 225 60" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />

            {/* Arbiter / Synthesis Core */}
            <circle cx="230" cy="60" r="12" fill="#09090b" stroke="#10b981" strokeWidth="1.5" />
            <text x="222" y="63" fill="#34d399" fontSize="8" fontFamily="monospace">EXEC</text>

            {/* Output Result */}
            <line x1="242" y1="60" x2="275" y2="60" stroke="#10b981" strokeWidth="1.5" />
            <polygon points="275,60 270,57 270,63" fill="#10b981" />
            <rect x="275" y="47" width="38" height="26" rx="3" fill="#14532d" stroke="#22c55e" strokeWidth="0.8" />
            <text x="279" y="63" fill="#86efac" fontSize="8" fontFamily="monospace">DONE</text>
          </svg>
        </div>
      )
  }
}
