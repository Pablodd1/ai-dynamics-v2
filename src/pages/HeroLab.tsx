import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Play, Volume2, EyeOff, Eye, Sparkles } from 'lucide-react'
import SEO from '../components/SEO'

type HeroConceptId = 1 | 2 | 3 | 4 | 5

interface HeroConceptMeta {
  id: HeroConceptId
  code: string
  name: string
  inspiration: string
  eyebrow: string
  headlineTop: string
  headlineAccent: string
  subtitle: string
  primaryCta: string
  secondaryCta: string
  metrics: [string, string, string]
}

const HERO_CONCEPTS: HeroConceptMeta[] = [
  {
    id: 1,
    code: '01',
    name: 'Liquid Gold Singularity',
    inspiration: 'OpenAI Sora × Apple Pro Display',
    eyebrow: 'AI DYNAMIC PRO  ·  MIAMI & GLOBAL',
    headlineTop: 'Intelligence,',
    headlineAccent: 'Engineered.',
    subtitle:
      'Bespoke autonomous software, sub-second bilingual voice agents, and computer vision—architected by real AI engineers in days.',
    primaryCta: 'Begin With $99 Audit',
    secondaryCta: 'Hear Live Voice AI',
    metrics: ['21 Live Systems', '0.38s Voice Latency', '48h Custom Prototype'],
  },
  {
    id: 2,
    code: '02',
    name: 'Sovereign Tensor Monolith',
    inspiration: 'Palantir × Swiss Haute Horlogerie',
    eyebrow: 'APPLIED AI ARCHITECTURE STUDIO',
    headlineTop: 'Systems That Run',
    headlineAccent: 'Entire Companies.',
    subtitle:
      'We replace manual departments with sovereign AI software, 24/7 voice pipelines, and precision computer vision.',
    primaryCta: 'Schedule Executive Briefing',
    secondaryCta: 'Hear Live Voice AI',
    metrics: ['Zero Templates', 'HIPAA & SOC 2 Aligned', '5x Staff Output'],
  },
  {
    id: 3,
    code: '03',
    name: 'Couture Acoustic Silk',
    inspiration: 'RunwayML × Stripe Luxury Minimal',
    eyebrow: 'BESPOKE SOFTWARE  ·  AUTONOMOUS VOICE  ·  VISION',
    headlineTop: 'Where Pure Code',
    headlineAccent: 'Becomes Autonomous.',
    subtitle:
      'Ultra-clean full-stack AI platforms and natural human-grade voice intelligence tailored around your exact operation.',
    primaryCta: 'Claim 48-Hour Prototype',
    secondaryCta: 'Hear Live Voice AI',
    metrics: ['$2,500+/mo Guarantee', 'EN / ES Native Voice', '5–10 Day Delivery'],
  },
  {
    id: 4,
    code: '04',
    name: 'Architectural Code Lens',
    inspiration: 'Linear × Vercel Pro Engineering',
    eyebrow: 'ELITE FULL-STACK AI DEVELOPERS',
    headlineTop: 'Real AI Engineers.',
    headlineAccent: 'Zero Wrapper Fluff.',
    subtitle:
      'From YOLOv8 spatial vision and ambient clinical scribes to 24/7 voice webhooks—production code shipped at startup speed.',
    primaryCta: 'Inspect & Book $99 Audit',
    secondaryCta: 'Hear Live Voice AI',
    metrics: ['Custom LLM / RAG', 'WebRTC Voice <400ms', '21 Production Apps'],
  },
  {
    id: 5,
    code: '05',
    name: 'Golden Eclipse Horizon',
    inspiration: 'Porsche Design × Cinema Reveal',
    eyebrow: 'MIAMI  ·  NEW YORK  ·  LATAM',
    headlineTop: 'The Autonomous',
    headlineAccent: 'Enterprise.',
    subtitle:
      'Quietly eliminating 60% of repetitive payroll overhead through custom-built artificial intelligence.',
    primaryCta: 'Private 15-Min Consultation',
    secondaryCta: 'Hear Live Voice AI',
    metrics: ['Private Cloud AI', 'Turnkey From $997', '1 Employee = 5x'],
  },
]

const CODE_TRACE_LINES = [
  'const agent = await AIDynamic.deploy({ mode: "sovereign", region: "us-east" });',
  'voice.onCall({ lang: ["en-US", "es-LA"], latencyMs: 340, crmSync: true });',
  'vision.analyzeBlueprint("tower-floorplan.pdf") // -> 99.4% precision takeoff',
  'scribe.captureClinicalSOAP({ hipaa: true, icd10AutoVerify: true });',
  'status: ● 21 PRODUCTION SYSTEMS ONLINE  |  SAVINGS GUARANTEE: ACTIVE',
]

export default function HeroLab() {
  const [activeId, setActiveId] = useState<HeroConceptId>(1)
  const [hideSwitcher, setHideSwitcher] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [typedLineIdx, setTypedLineIdx] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  const activeConcept = HERO_CONCEPTS.find((c) => c.id === activeId) || HERO_CONCEPTS[0]

  // Cycle minimalist live code trace in Concept 04
  useEffect(() => {
    const interval = setInterval(() => {
      setTypedLineIdx((prev) => (prev + 1) % CODE_TRACE_LINES.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  const toggleVoiceDemo = () => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio('/audio/sofia_services_en.mp3')
        audioRef.current.onended = () => setIsPlayingAudio(false)
      }
      if (isPlayingAudio) {
        audioRef.current.pause()
        setIsPlayingAudio(false)
      } else {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch(() => {})
        setIsPlayingAudio(true)
      }
    } catch {
      // ignore autoplay block
    }
  }

  // Real-time 60fps Procedural Luxury AI Video/Cinema Engine per Concept
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId = 0
    let t = 0

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / Math.max(window.innerWidth, 1),
        y: e.clientY / Math.max(window.innerHeight, 1),
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    // Precompute Fibonacci Sphere points for Concept 01
    const sphereCount = 720
    const spherePoints = Array.from({ length: sphereCount }, (_, i) => {
      const y = 1 - (i / (sphereCount - 1)) * 2
      const radius = Math.sqrt(1 - y * y)
      const theta = ((Math.PI * (3 - Math.sqrt(5))) * i)
      return {
        x: Math.cos(theta) * radius,
        y,
        z: Math.sin(theta) * radius,
        pulse: Math.random() * Math.PI * 2,
      }
    })

    // Precompute Torus-Knot vertices for Concept 02
    const torusSegments = 340
    const torusRings = 12

    // Precompute Vertical Filaments for Concept 04
    const columns = Array.from({ length: 42 }, (_, i) => ({
      xRatio: (i + 0.5) / 42,
      speed: 0.35 + (i % 7) * 0.12,
      offset: Math.random() * 1000,
      gold: i % 3 === 0,
    }))

    // Precompute Dust Stars for Concept 05
    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: 0.5 + Math.random() * 1.4,
      speed: 0.00015 + Math.random() * 0.00035,
      alpha: 0.15 + Math.random() * 0.55,
    }))

    const render = () => {
      t += 0.012
      const w = window.innerWidth
      const h = window.innerHeight
      const mx = (mouseRef.current.x - 0.5) * 2
      const my = (mouseRef.current.y - 0.5) * 2

      // Base obsidian canvas clear
      ctx.fillStyle = '#040407'
      ctx.fillRect(0, 0, w, h)

      if (activeId === 1) {
        // CONCEPT 01: LIQUID GOLD SINGULARITY (3D Fibonacci Neural Orb)
        const cx = w * 0.5 + mx * 28
        const cy = h * 0.5 + my * 22
        const baseR = Math.min(w, h) * 0.33

        // Soft ambient champagne halo
        const glow = ctx.createRadialGradient(cx, cy, baseR * 0.1, cx, cy, baseR * 1.65)
        glow.addColorStop(0, 'rgba(212, 175, 55, 0.16)')
        glow.addColorStop(0.5, 'rgba(197, 160, 89, 0.05)')
        glow.addColorStop(1, 'rgba(4, 4, 7, 0)')
        ctx.fillStyle = glow
        ctx.fillRect(0, 0, w, h)

        const rotY = t * 0.45 + mx * 0.45
        const rotX = Math.sin(t * 0.25) * 0.25 + my * 0.35
        const cosY = Math.cos(rotY)
        const sinY = Math.sin(rotY)
        const cosX = Math.cos(rotX)
        const sinX = Math.sin(rotX)

        for (let i = 0; i < spherePoints.length; i++) {
          const p = spherePoints[i]
          // Organic liquid ripple on sphere surface
          const wave = 1 + 0.065 * Math.sin(p.x * 5 + t * 2.2) * Math.cos(p.y * 5 - t * 1.8)
          const px = p.x * wave
          const py = p.y * wave
          const pz = p.z * wave

          // Rotate Y then X
          const x1 = px * cosY - pz * sinY
          const z1 = pz * cosY + px * sinY
          const y2 = py * cosX - z1 * sinX
          const z2 = z1 * cosX + py * sinX

          const perspective = 2.6 / (2.6 - z2 * 0.85)
          const sx = cx + x1 * baseR * perspective
          const sy = cy + y2 * baseR * perspective

          const depthAlpha = Math.max(0.06, (z2 + 1.15) * 0.44)
          const shimmer = 0.75 + 0.25 * Math.sin(t * 3 + p.pulse)
          const rSize = Math.max(0.7, (1.1 + z2 * 0.9) * perspective * 0.7)

          ctx.beginPath()
          ctx.arc(sx, sy, rSize, 0, Math.PI * 2)
          ctx.fillStyle =
            i % 5 === 0
              ? `rgba(255, 245, 220, ${depthAlpha * shimmer})`
              : `rgba(212, 175, 55, ${depthAlpha * shimmer * 0.88})`
          ctx.fill()
        }
      } else if (activeId === 2) {
        // CONCEPT 02: SOVEREIGN TENSOR MONOLITH (Asymmetric Right-Side 3D Architectural Torus)
        const cx = w > 1024 ? w * 0.72 : w * 0.5
        const cy = h * 0.52
        const scale = Math.min(w, h) * (w > 1024 ? 0.23 : 0.2)

        // Subtle architectural blueprint grid
        ctx.strokeStyle = 'rgba(255,255,255,0.025)'
        ctx.lineWidth = 1
        const gridStep = 72
        for (let gx = 0; gx < w; gx += gridStep) {
          ctx.beginPath()
          ctx.moveTo(gx, 0)
          ctx.lineTo(gx, h)
          ctx.stroke()
        }
        for (let gy = 0; gy < h; gy += gridStep) {
          ctx.beginPath()
          ctx.moveTo(0, gy)
          ctx.lineTo(w, gy)
          ctx.stroke()
        }

        const halo = ctx.createRadialGradient(cx, cy, 10, cx, cy, scale * 2.2)
        halo.addColorStop(0, 'rgba(201, 169, 110, 0.14)')
        halo.addColorStop(1, 'rgba(4, 4, 7, 0)')
        ctx.fillStyle = halo
        ctx.fillRect(0, 0, w, h)

        const aY = t * 0.55 + mx * 0.5
        const aX = 0.55 + my * 0.35

        for (let ring = 0; ring < torusRings; ring++) {
          const v = (ring / torusRings) * Math.PI * 2
          ctx.beginPath()
          for (let s = 0; s <= torusSegments; s++) {
            const u = (s / torusSegments) * Math.PI * 2
            // 3D Torus-Knot parametric geometry (p=2, q=3)
            const r = Math.cos(3 * u) * 0.35 + 1.05
            const tube = 0.24
            const x0 = (r + tube * Math.cos(v)) * Math.cos(2 * u)
            const y0 = (r + tube * Math.cos(v)) * Math.sin(2 * u)
            const z0 = tube * Math.sin(v) + Math.sin(3 * u) * 0.35

            // Rotate
            const x1 = x0 * Math.cos(aY) - z0 * Math.sin(aY)
            const z1 = z0 * Math.cos(aY) + x0 * Math.sin(aY)
            const y2 = y0 * Math.cos(aX) - z1 * Math.sin(aX)
            const z2 = z1 * Math.cos(aX) + y0 * Math.sin(aX)

            const persp = 3.2 / (3.2 - z2 * 0.65)
            const sx = cx + x1 * scale * persp
            const sy = cy + y2 * scale * persp

            if (s === 0) ctx.moveTo(sx, sy)
            else ctx.lineTo(sx, sy)
          }
          ctx.strokeStyle =
            ring % 3 === 0
              ? 'rgba(212, 175, 55, 0.34)'
              : 'rgba(226, 232, 240, 0.11)'
          ctx.lineWidth = ring % 3 === 0 ? 1.15 : 0.7
          ctx.stroke()
        }
      } else if (activeId === 3) {
        // CONCEPT 03: COUTURE ACOUSTIC SILK (Harmonic Liquid Gold & Platinum Ribbons)
        const midY = h * 0.54
        const ribbonCount = 26

        const bgGlow = ctx.createRadialGradient(w * 0.5, midY, 20, w * 0.5, midY, w * 0.55)
        bgGlow.addColorStop(0, 'rgba(212, 175, 55, 0.11)')
        bgGlow.addColorStop(0.6, 'rgba(56, 189, 248, 0.03)')
        bgGlow.addColorStop(1, 'rgba(4, 4, 7, 0)')
        ctx.fillStyle = bgGlow
        ctx.fillRect(0, 0, w, h)

        for (let r = 0; r < ribbonCount; r++) {
          const norm = r / ribbonCount
          ctx.beginPath()
          for (let x = 0; x <= w; x += 14) {
            const nx = x / w
            const envelope = Math.sin(nx * Math.PI) // tapered cleanly at edges
            const y =
              midY +
              envelope *
                (Math.sin(nx * 4.5 + t * 1.1 + r * 0.22 + mx) * (75 + r * 2.2) +
                  Math.cos(nx * 8.2 - t * 0.85 + r * 0.15) * 32 +
                  my * 40 * (norm - 0.5))
            if (x === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          const alpha = 0.08 + Math.sin(norm * Math.PI) * 0.32
          ctx.strokeStyle =
            r % 4 === 0
              ? `rgba(247, 231, 206, ${alpha})`
              : `rgba(201, 169, 110, ${alpha * 0.85})`
          ctx.lineWidth = r % 4 === 0 ? 1.3 : 0.8
          ctx.stroke()
        }
      } else if (activeId === 4) {
        // CONCEPT 04: ARCHITECTURAL CODE LENS (Minimalist Vertical Light Filaments)
        for (let i = 0; i < columns.length; i++) {
          const col = columns[i]
          const x = col.xRatio * w
          // Subtle guide filament
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, h)
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)'
          ctx.lineWidth = 1
          ctx.stroke()

          // Falling / rising photon pulse
          const pulseY = ((t * 140 * col.speed + col.offset) % (h + 260)) - 130
          const grad = ctx.createLinearGradient(x, pulseY - 110, x, pulseY + 30)
          grad.addColorStop(0, 'rgba(212, 175, 55, 0)')
          grad.addColorStop(
            0.8,
            col.gold ? 'rgba(212, 175, 55, 0.42)' : 'rgba(148, 163, 184, 0.25)'
          )
          grad.addColorStop(1, 'rgba(255, 255, 255, 0.85)')

          ctx.beginPath()
          ctx.moveTo(x, pulseY - 110)
          ctx.lineTo(x, pulseY + 20)
          ctx.strokeStyle = grad
          ctx.lineWidth = col.gold ? 1.6 : 1
          ctx.stroke()
        }

        // Vignette mask for crisp center readability
        const vig = ctx.createRadialGradient(w * 0.5, h * 0.5, h * 0.12, w * 0.5, h * 0.5, w * 0.65)
        vig.addColorStop(0, 'rgba(4, 4, 7, 0.72)')
        vig.addColorStop(1, 'rgba(4, 4, 7, 0.25)')
        ctx.fillStyle = vig
        ctx.fillRect(0, 0, w, h)
      } else if (activeId === 5) {
        // CONCEPT 05: GOLDEN ECLIPSE HORIZON (Planetary Rim-Light & Rising Starfield)
        for (let i = 0; i < stars.length; i++) {
          const s = stars[i]
          s.y -= s.speed
          if (s.y < 0) s.y = 1
          ctx.beginPath()
          ctx.arc(s.x * w, s.y * h, s.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(247, 231, 206, ${s.alpha * (0.6 + 0.4 * Math.sin(t * 2 + i))})`
          ctx.fill()
        }

        const planetR = Math.max(w, h) * 1.18
        const planetCx = w * 0.5 + mx * 18
        const planetCy = h * 0.79 + planetR

        // Corona atmospheric glow
        const corona = ctx.createRadialGradient(
          planetCx,
          planetCy,
          planetR * 0.985,
          planetCx,
          planetCy,
          planetR * 1.14
        )
        corona.addColorStop(0, 'rgba(255, 238, 195, 0.92)')
        corona.addColorStop(0.14, 'rgba(212, 175, 55, 0.52)')
        corona.addColorStop(0.45, 'rgba(180, 120, 35, 0.12)')
        corona.addColorStop(1, 'rgba(4, 4, 7, 0)')
        ctx.fillStyle = corona
        ctx.fillRect(0, 0, w, h)

        // Eclipse dark planet body
        ctx.beginPath()
        ctx.arc(planetCx, planetCy, planetR, 0, Math.PI * 2)
        ctx.fillStyle = '#030306'
        ctx.fill()

        // Razor-sharp 24K rim light arc
        ctx.beginPath()
        ctx.arc(planetCx, planetCy, planetR, -Math.PI * 0.75, -Math.PI * 0.25)
        ctx.strokeStyle = 'rgba(255, 236, 179, 0.85)'
        ctx.lineWidth = 2.2
        ctx.stroke()
      }

      animId = requestAnimationFrame(render)
    }

    render()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [activeId])

  const isSplitLayout = activeId === 2

  return (
    <div className="relative min-h-screen w-full bg-[#040407] text-white overflow-hidden select-none">
      <SEO
        title="Luxury AI Hero Lab (5 Minimalist Concepts) | AI Dynamic Pro"
        description="Interactive preview lab of 5 ultra-luxury, minimalistic procedural AI hero sections for AI Dynamic Pro."
        canonical="https://www.aidynamic.pro/hero-lab"
        noindex
      />

      {/* Fullscreen 60fps Procedural AI Cinema Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Ultra-Minimalist Top Brand Bar */}
      <header className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 pt-7 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full border border-[#d4af37]/60 bg-black/60 backdrop-blur-md flex items-center justify-center text-xs font-serif font-bold text-[#f7e7ce] tracking-widest">
            AI
          </div>
          <span className="text-xs font-mono uppercase tracking-[0.28em] text-white/90 group-hover:text-[#f7e7ce] transition-colors">
            AI DYNAMIC PRO
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setHideSwitcher(!hideSwitcher)}
            className="px-3 py-1.5 rounded-full border border-white/15 bg-black/50 backdrop-blur-md text-xs font-mono text-white/75 hover:text-white flex items-center gap-1.5 transition-all"
            title="Toggle switcher UI to inspect pure fullscreen hero"
          >
            {hideSwitcher ? <Eye className="w-3.5 h-3.5 text-[#d4af37]" /> : <EyeOff className="w-3.5 h-3.5 text-[#d4af37]" />}
            <span>{hideSwitcher ? 'Show 5 Concepts' : 'Pure View'}</span>
          </button>
          <Link
            to="/booking"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/45 bg-[#d4af37]/10 hover:bg-[#d4af37] hover:text-black text-xs font-mono uppercase tracking-widest text-[#f7e7ce] transition-all"
          >
            <span>Inquire</span>
          </Link>
        </div>
      </header>

      {/* Main Minimalist Luxury Hero Content */}
      <main
        className={`relative z-10 max-w-7xl mx-auto px-6 sm:px-10 min-h-[calc(100vh-88px)] flex flex-col justify-center ${
          isSplitLayout ? 'items-start text-left' : 'items-center text-center'
        }`}
      >
        <div className={isSplitLayout ? 'max-w-xl' : 'max-w-3xl'}>
          {/* Whisper Eyebrow */}
          <div
            className={`inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-7 ${
              isSplitLayout ? '' : 'mx-auto'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
            <span className="text-xs font-mono tracking-[0.26em] uppercase text-[#e5d5b7]">
              {activeConcept.eyebrow}
            </span>
          </div>

          {/* Monumental Luxury Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-[82px] font-light tracking-[-0.03em] leading-[1.02] text-white mb-6">
            <span className="block font-sans font-extralight text-white/95">
              {activeConcept.headlineTop}
            </span>
            <span className="block font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#f7e7ce] via-[#d4af37] to-[#fff6e5] pb-1">
              {activeConcept.headlineAccent}
            </span>
          </h1>

          {/* Restrained Single-Sentence Subtitle */}
          <p
            className={`text-base sm:text-lg text-white/65 font-light leading-relaxed mb-9 ${
              isSplitLayout ? 'max-w-lg' : 'max-w-xl mx-auto'
            }`}
          >
            {activeConcept.subtitle}
          </p>

          {/* Concept 04 Exclusive: Minimalist Floating Live Code Lens */}
          {activeId === 4 && (
            <div className="max-w-xl mx-auto mb-9 rounded-2xl border border-[#d4af37]/25 bg-black/70 backdrop-blur-2xl px-5 py-3.5 text-left shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
              <div className="flex items-center justify-between text-xs font-mono text-white/40 pb-2 mb-2 border-b border-white/10">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
                  <span>aidynamic-core // live-runtime.ts</span>
                </span>
                <span className="text-emerald-400">● 0.34s</span>
              </div>
              <div className="font-mono text-xs sm:text-sm text-[#f7e7ce] truncate">
                <span className="text-[#d4af37] mr-2">❯</span>
                {CODE_TRACE_LINES[typedLineIdx]}
              </div>
            </div>
          )}

          {/* Jewel-Like Minimalist CTA Pair */}
          <div
            className={`flex flex-col sm:flex-row items-center gap-4 mb-12 ${
              isSplitLayout ? 'justify-start' : 'justify-center'
            }`}
          >
            <Link
              to="/booking"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#f7e7ce] via-[#d4af37] to-[#e6c675] text-[#050507] font-semibold text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-[0_0_40px_rgba(212,175,55,0.28)] hover:brightness-110 transition-all"
            >
              <span>{activeConcept.primaryCta}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={toggleVoiceDemo}
              className="w-full sm:w-auto px-7 py-4 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/[0.09] backdrop-blur-xl text-white text-sm font-light tracking-wide flex items-center justify-center gap-2.5 transition-all"
            >
              {isPlayingAudio ? (
                <Volume2 className="w-4 h-4 text-[#d4af37] animate-pulse" />
              ) : (
                <Play className="w-3.5 h-3.5 text-[#d4af37] fill-current" />
              )}
              <span>{isPlayingAudio ? 'Playing JAss Voice (Pause)' : activeConcept.secondaryCta}</span>
            </button>
          </div>

          {/* Whisper-Quiet 3-Metric Proof Line */}
          <div
            className={`flex flex-wrap items-center gap-6 text-xs font-mono uppercase tracking-[0.2em] text-white/45 ${
              isSplitLayout ? 'justify-start' : 'justify-center'
            }`}
          >
            {activeConcept.metrics.map((metric, idx) => (
              <div key={metric} className="flex items-center gap-6">
                {idx > 0 && <span className="text-[#d4af37]/40">/</span>}
                <span>{metric}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Floating Luxury Concept Selector Dock (Bottom Center) */}
      {!hideSwitcher && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-[94%] max-w-3xl">
          <div className="rounded-2xl border border-[#d4af37]/35 bg-[#08080e]/90 backdrop-blur-2xl p-2 shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
            <div className="flex items-center justify-between px-3 py-1 text-xs font-mono text-[#e5d5b7]/80">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>SELECT LUXURY HERO CONCEPT (1–5)</span>
              </span>
              <span className="hidden sm:inline text-white/45">{activeConcept.inspiration}</span>
            </div>
            <div className="grid grid-cols-5 gap-1.5 mt-1">
              {HERO_CONCEPTS.map((c) => {
                const selected = c.id === activeId
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveId(c.id)}
                    className={`px-2.5 py-2.5 rounded-xl text-left transition-all ${
                      selected
                        ? 'bg-gradient-to-br from-[#f7e7ce] to-[#d4af37] text-[#050507] font-bold shadow-lg'
                        : 'bg-white/[0.04] hover:bg-white/[0.09] text-white/75 border border-white/5'
                    }`}
                  >
                    <div className="text-xs font-mono opacity-80">{c.code}</div>
                    <div className="text-xs truncate font-medium">{c.name}</div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
