import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Play, Volume2, ChevronDown, PhoneCall } from 'lucide-react'

interface ScrollStageCopy {
  stageLabel: string
  headlineTop: string
  headlineAccent: string
  subtitle: string
}

const SCROLL_STAGES: [ScrollStageCopy, ScrollStageCopy, ScrollStageCopy] = [
  {
    stageLabel: 'AI DYNAMIC PRO  ·  SOVEREIGN AI ENGINEERING',
    headlineTop: 'Bespoke AI.',
    headlineAccent: 'Sculpted in Code.',
    subtitle:
      'Custom full-stack applications, sub-second bilingual voice agents, and computer vision—architected by real AI engineers in days.',
  },
  {
    stageLabel: 'STAGE 02  ·  AUTONOMOUS VOICE, VISION & RAG',
    headlineTop: 'Full-Stack Software.',
    headlineAccent: 'Sub-Second Voice & Vision.',
    subtitle:
      'Full-duplex EN/ES voice webhooks (<0.38s latency), private zero-training RAG, and YOLOv8 spatial vision wired directly into your stack.',
  },
  {
    stageLabel: 'STAGE 03  ·  5–10 DAY ENTERPRISE DEPLOYMENT',
    headlineTop: 'Built in Days.',
    headlineAccent: 'Owned Forever.',
    subtitle:
      'Eliminate 60% of repetitive admin overhead and multiply team output 5x—backed by our $2,500+/mo savings guarantee.',
  },
]

const PROOF_METRICS = [
  '21 Live Systems',
  '0.34s EN·ES Voice',
  '48h Custom Prototype',
  'HIPAA & SOC 2 Aligned',
]

const STAGE_PILLS = [
  { label: '01 Genesis', pct: 0 },
  { label: '02 Telemetry', pct: 0.5 },
  { label: '03 Monolith', pct: 0.95 },
]

const VERT_SHADER = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`

// Real-Time 3D SDF Raymarched 24K Liquid-Metal Sculpture (Concept 07: Chronos Liquid SDF)
const FRAG_SHADER_07 = `
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform float uScroll;
uniform float uVelocity;
uniform vec2 uMouse;

mat2 rot(float a) {
  float s = sin(a), c = cos(a);
  return mat2(c, -s, s, c);
}

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

float sdTorus(vec3 p, vec2 t) {
  vec2 q = vec2(length(p.xz) - t.x, p.y);
  return length(q) - t.y;
}

float sdBox(vec3 p, vec3 b) {
  vec3 q = abs(p) - b;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

float mapScene(vec3 p) {
  float yaw = uTime * 0.35 + uScroll * 4.2 + uMouse.x * 0.65;
  float pitch = sin(uTime * 0.28) * 0.18 + uScroll * 1.1 + uMouse.y * 0.45;
  vec3 q = p;
  q.xz *= rot(yaw);
  q.yz *= rot(pitch);

  float rippleAmt = mix(0.045, 0.012, smoothstep(0.6, 1.0, uScroll));
  float wave = sin(q.x * 4.5 + uTime * 1.8) * sin(q.y * 4.5 - uTime * 1.4) * sin(q.z * 4.5 + uTime);

  // Stage 1: Molten Liquid Sphere + Orbiting Droplets
  float sCore = length(q) - 0.66 + wave * rippleAmt;
  vec3 d1Pos = q - vec3(sin(uTime * 1.1) * 0.78, cos(uTime * 0.9) * 0.42, cos(uTime * 1.1) * 0.78);
  vec3 d2Pos = q - vec3(-cos(uTime * 0.85) * 0.72, sin(uTime * 1.2) * 0.48, sin(uTime * 0.85) * 0.72);
  float droplets = min(length(d1Pos) - 0.21, length(d2Pos) - 0.17);
  float stage1 = smin(sCore, droplets, 0.38);

  // Stage 2: Interlocking 3D Gyroscopic Liquid-Gold Torus
  vec3 t1p = q;
  t1p.xy *= rot(0.55 + uScroll * 2.0);
  vec3 t2p = q;
  t2p.yz *= rot(-0.75 + uScroll * 1.6);
  float torusA = sdTorus(t1p, vec2(0.76, 0.16));
  float torusB = sdTorus(t2p, vec2(0.58, 0.13));
  float innerOrb = length(q) - 0.28;
  float stage2 = smin(smin(torusA, torusB, 0.22), innerOrb, 0.28);

  // Stage 3: Precision Obsidian & 24K Architectural Monolith + Ring
  vec3 mp = q;
  mp.xz *= rot(0.4);
  float monolith = sdBox(mp, vec3(0.46, 0.78, 0.46)) - 0.06;
  float haloRing = sdTorus(vec3(mp.x, mp.y * 0.9, mp.z), vec2(0.88, 0.055));
  float stage3 = smin(monolith, haloRing, 0.14);

  float m12 = mix(stage1, stage2, smoothstep(0.05, 0.52, uScroll));
  return mix(m12, stage3, smoothstep(0.52, 0.96, uScroll));
}

vec3 calcNormal(vec3 p) {
  vec2 e = vec2(0.002, 0.0);
  return normalize(vec3(
    mapScene(p + e.xyy) - mapScene(p - e.xyy),
    mapScene(p + e.yxy) - mapScene(p - e.yxy),
    mapScene(p + e.yyx) - mapScene(p - e.yyx)
  ));
}

void main() {
  float minDim = min(uResolution.x, uResolution.y);
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / minDim;

  float camZ = mix(3.35, 2.72, sin(clamp(uScroll, 0.0, 1.0) * 3.14159) * 0.7) - clamp(uVelocity * 0.35, 0.0, 0.25);
  vec3 ro = vec3(uMouse.x * 0.12, uMouse.y * 0.08, camZ);
  vec3 rd = normalize(vec3(uv, -1.55));

  float dist = 0.0;
  bool hit = false;
  for (int i = 0; i < 64; i++) {
    vec3 p = ro + rd * dist;
    float d = mapScene(p);
    if (d < 0.0018) {
      hit = true;
      break;
    }
    if (dist > 6.5) break;
    dist += d * 0.88;
  }

  float backGlow = exp(-length(uv) * 2.1) * (0.28 + 0.12 * sin(uTime));
  vec3 col = vec3(0.015, 0.015, 0.026) + vec3(0.83, 0.68, 0.22) * backGlow * 0.45;

  if (hit) {
    vec3 p = ro + rd * dist;
    vec3 n = calcNormal(p);
    vec3 v = -rd;
    vec3 r = reflect(-v, n);

    vec3 l1 = normalize(vec3(1.6, 2.2, 1.8));
    vec3 l2 = normalize(vec3(-2.0, -0.6, 1.2));
    float diff1 = max(dot(n, l1), 0.0);
    float diff2 = max(dot(n, l2), 0.0);
    float spec1 = pow(max(dot(r, l1), 0.0), 42.0);
    float spec2 = pow(max(dot(r, l2), 0.0), 22.0);
    float fresnel = pow(1.0 - max(dot(n, v), 0.0), 3.2);

    float envBand = smoothstep(-0.2, 0.6, r.y) * 0.65 + pow(max(0.0, sin(r.x * 6.0 + r.y * 3.0)), 6.0) * 0.35;

    vec3 obsidianMetal = vec3(0.04, 0.04, 0.06);
    vec3 champagneGold = vec3(0.96, 0.87, 0.62);
    vec3 richGold = vec3(0.82, 0.65, 0.20);

    float obsidianBlend = smoothstep(0.55, 0.95, uScroll) * 0.65;
    vec3 baseTint = mix(richGold, obsidianMetal, obsidianBlend);

    col = baseTint * (0.18 + 0.72 * diff1) + richGold * diff2 * 0.35;
    col += champagneGold * envBand * (0.55 - obsidianBlend * 0.2);
    col += vec3(1.0, 0.96, 0.86) * (spec1 * 1.25 + spec2 * 0.45);
    col += champagneGold * fresnel * (1.05 + obsidianBlend * 0.5);
  }

  float horizon = exp(-abs(uv.y + 0.48) * 14.0) * 0.16;
  col += vec3(0.83, 0.68, 0.22) * horizon;

  gl_FragColor = vec4(col, 1.0);
}
`

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn('WebGL shader compile warning:', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export default function Hero() {
  const [scrollUiPct, setScrollUiPct] = useState(0)
  const [voiceLang, setVoiceLang] = useState<'en' | 'es'>('en')
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)

  const sectionRef = useRef<HTMLElement | null>(null)
  const webglCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const smoothScrollRef = useRef(0)
  const targetScrollRef = useRef(0)
  const velocityRef = useRef(0)
  const isHeroVisibleRef = useRef(true)
  const webglSupportedRef = useRef(true)

  const playVoiceSrc = (lang: 'en' | 'es') => {
    const src = lang === 'en' ? '/audio/sofia_services_en.mp3' : '/audio/sofia_services_es.mp3'
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(src)
      } else if (!audioRef.current.src.endsWith(src)) {
        audioRef.current.pause()
        audioRef.current.src = src
      }
      audioRef.current.onended = () => setIsPlayingAudio(false)
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => setIsPlayingAudio(false))
      setIsPlayingAudio(true)
    } catch {
      setIsPlayingAudio(false)
    }
  }

  const toggleVoiceDemo = () => {
    if (isPlayingAudio && audioRef.current) {
      audioRef.current.pause()
      setIsPlayingAudio(false)
      return
    }
    playVoiceSrc(voiceLang)
  }

  const switchVoiceLang = (lang: 'en' | 'es') => {
    setVoiceLang(lang)
    if (isPlayingAudio) {
      playVoiceSrc(lang)
    }
  }

  const scrollToStagePct = (pct: number) => {
    const el = sectionRef.current
    if (!el) return
    const sectionTop = el.getBoundingClientRect().top + window.scrollY
    const scrollable = Math.max(el.offsetHeight - window.innerHeight, 1)
    window.scrollTo({
      top: sectionTop + pct * scrollable,
      behavior: 'smooth',
    })
  }

  const scrollToServices = () => {
    const target = document.getElementById('services')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Stop audio if component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Track scroll progress strictly relative to sectionRef
  useEffect(() => {
    const updateScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const scrollable = Math.max(el.offsetHeight - window.innerHeight, 1)
      const rawProgress = -rect.top / scrollable
      targetScrollRef.current = Math.max(0, Math.min(1, rawProgress))
      isHeroVisibleRef.current = rect.bottom > 0 && rect.top < window.innerHeight
    }

    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
    window.addEventListener('resize', updateScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', updateScroll)
      window.removeEventListener('resize', updateScroll)
    }
  }, [])

  // Layer 1: WebGL GPU 3D SDF Raymarched 24K Liquid-Metal Sculpture
  useEffect(() => {
    const glCanvas = webglCanvasRef.current
    if (!glCanvas) return

    const gl = glCanvas.getContext('webgl', {
      alpha: false,
      antialias: true,
      powerPreference: 'high-performance',
    })
    if (!gl) {
      webglSupportedRef.current = false
      return
    }

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERT_SHADER)
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG_SHADER_07)
    if (!vs || !fs) {
      if (vs) gl.deleteShader(vs)
      if (fs) gl.deleteShader(fs)
      webglSupportedRef.current = false
      return
    }

    const program = gl.createProgram()
    if (!program) {
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      webglSupportedRef.current = false
      return
    }

    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('WebGL link error:', gl.getProgramInfoLog(program))
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      webglSupportedRef.current = false
      return
    }

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

    const aPos = gl.getAttribLocation(program, 'aPos')
    const uRes = gl.getUniformLocation(program, 'uResolution')
    const uTime = gl.getUniformLocation(program, 'uTime')
    const uScroll = gl.getUniformLocation(program, 'uScroll')
    const uVelocity = gl.getUniformLocation(program, 'uVelocity')
    const uMouse = gl.getUniformLocation(program, 'uMouse')

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      glCanvas.width = Math.floor(window.innerWidth * dpr)
      glCanvas.height = Math.floor(window.innerHeight * dpr)
      gl.viewport(0, 0, glCanvas.width, glCanvas.height)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    let animId = 0
    const startTime = performance.now()

    const drawGl = () => {
      if (isHeroVisibleRef.current) {
        const elapsed = (performance.now() - startTime) * 0.001
        gl.useProgram(program)
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.enableVertexAttribArray(aPos)
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

        gl.uniform2f(uRes, glCanvas.width, glCanvas.height)
        gl.uniform1f(uTime, elapsed)
        gl.uniform1f(uScroll, smoothScrollRef.current)
        gl.uniform1f(uVelocity, velocityRef.current)
        gl.uniform2f(uMouse, (mouseRef.current.x - 0.5) * 2, -(mouseRef.current.y - 0.5) * 2)

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      }
      animId = requestAnimationFrame(drawGl)
    }

    drawGl()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [])

  // Layer 2: High-DPI 3D Gyroscopic Rings & Engineering Telemetry HUD
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId = 0
    let t = 0
    let lastUiSync = 0

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

    const drawGyroRing = (
      cx: number,
      cy: number,
      r: number,
      tiltX: number,
      tiltY: number,
      rotZ: number,
      alpha: number,
      dashed: boolean
    ) => {
      ctx.save()
      ctx.beginPath()
      const segs = 96
      for (let i = 0; i <= segs; i++) {
        const a = (i / segs) * Math.PI * 2
        const x0 = Math.cos(a) * r
        const y0 = Math.sin(a) * r
        const z0 = 0

        const x1 = x0 * Math.cos(rotZ) - y0 * Math.sin(rotZ)
        const y1 = x0 * Math.sin(rotZ) + y0 * Math.cos(rotZ)
        const y2 = y1 * Math.cos(tiltX) - z0 * Math.sin(tiltX)
        const z2 = z0 * Math.cos(tiltX) + y1 * Math.sin(tiltX)
        const x3 = x1 * Math.cos(tiltY) - z2 * Math.sin(tiltY)
        const z3 = z2 * Math.cos(tiltY) + x1 * Math.sin(tiltY)

        const persp = 900 / (900 - z3)
        const px = cx + x3 * persp
        const py = cy + y2 * persp
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      if (dashed) ctx.setLineDash([4, 9])
      ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`
      ctx.lineWidth = 1.15
      ctx.stroke()
      ctx.restore()
    }

    const labels = ['0.34s VOICE ENGINE', 'YOLOv8 SPATIAL VISION', 'PRIVATE RAG CORE']

    const render = () => {
      if (isHeroVisibleRef.current) {
        t += 0.012

        const prevSmooth = smoothScrollRef.current
        smoothScrollRef.current += (targetScrollRef.current - smoothScrollRef.current) * 0.095
        const rawVel = Math.abs(smoothScrollRef.current - prevSmooth) * 28
        velocityRef.current = velocityRef.current * 0.88 + rawVel * 0.12

        const sp = smoothScrollRef.current
        if (t - lastUiSync > 0.06) {
          lastUiSync = t
          setScrollUiPct(Math.round(sp * 100))
        }

        const w = window.innerWidth
        const h = window.innerHeight
        const mx = (mouseRef.current.x - 0.5) * 2
        const my = (mouseRef.current.y - 0.5) * 2

        if (!webglSupportedRef.current) {
          const fallback = ctx.createRadialGradient(w * 0.5, h * 0.5, 20, w * 0.5, h * 0.5, Math.max(w, h) * 0.55)
          fallback.addColorStop(0, 'rgba(212, 175, 55, 0.22)')
          fallback.addColorStop(0.45, 'rgba(130, 95, 28, 0.08)')
          fallback.addColorStop(1, '#040407')
          ctx.fillStyle = fallback
          ctx.fillRect(0, 0, w, h)
        } else {
          ctx.clearRect(0, 0, w, h)
        }

        const minDim = Math.min(w, h)
        const cx = w * 0.5 + mx * 18
        const cy = h * 0.5 + my * 14
        const orbitR = minDim * (0.37 - Math.sin(sp * Math.PI) * 0.04)

        drawGyroRing(cx, cy, orbitR, 1.05 + sp * 0.9, t * 0.25 + mx * 0.3, sp * 2.0, 0.24, true)
        drawGyroRing(cx, cy, orbitR * 1.16, -0.65 + sp * 0.5, -t * 0.2 + my * 0.2, -sp * 1.5, 0.14, false)

        const showLabels = w >= 480
        ctx.font = w < 768
          ? '600 10px ui-monospace, SFMono-Regular, Menlo, monospace'
          : '600 12px ui-monospace, SFMono-Regular, Menlo, monospace'

        for (let i = 0; i < labels.length; i++) {
          const ang = t * 0.38 + sp * 3.14 + (i * Math.PI * 2) / 3
          const ox = Math.cos(ang) * orbitR * 1.08
          const oz = Math.sin(ang) * orbitR * 1.08
          const oy = Math.sin(ang * 2.0 + t * 0.5) * minDim * 0.11

          const persp = 900 / (900 - oz)
          const px = cx + ox * persp
          const py = cy + oy * persp
          const depthAlpha = Math.max(0.18, Math.min(0.88, (oz / orbitR + 1.2) * 0.42))

          ctx.beginPath()
          ctx.arc(px, py, 2.5 * persp, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(247, 231, 206, ${depthAlpha})`
          ctx.fill()

          if (showLabels) {
            ctx.fillStyle = `rgba(247, 231, 206, ${depthAlpha * 0.9})`
            ctx.fillText(labels[i], px + 10, py + 4)
          }
        }
      }

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const stageIdx: 0 | 1 | 2 = scrollUiPct < 34 ? 0 : scrollUiPct < 68 ? 1 : 2
  const currentStage = SCROLL_STAGES[stageIdx]

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-[250vh] bg-[#040407] text-white select-none"
    >
      {/* Sticky 100vh Viewport Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Layer 1: GPU WebGL 3D SDF Fragment Shader */}
        <canvas
          ref={webglCanvasRef}
          className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        />

        {/* Layer 2: High-DPI 3D Gyroscopic Rings & Telemetry HUD */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-[1] pointer-events-none"
        />

        {/* Radial Obsidian Scrim for High-Contrast Editorial Legibility */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(4,4,7,0.52)_0%,rgba(4,4,7,0.18)_55%,rgba(4,4,7,0.72)_100%)]"
        />

        {/* Centered Minimalist Luxury Editorial Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 h-full pt-20 pb-24 flex flex-col items-center justify-center text-center">
          <div className="max-w-3xl">
            {/* Whisper Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full border border-[#d4af37]/30 bg-black/55 backdrop-blur-md mb-6 mx-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-mono tracking-[0.22em] uppercase text-[#e5d5b7]">
                {currentStage.stageLabel}
              </span>
            </div>

            {/* Monumental Luxury Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-[78px] font-light tracking-[-0.03em] leading-[1.03] text-white mb-6 drop-shadow-[0_12px_40px_rgba(0,0,0,0.9)] transition-all duration-300">
              <span className="block font-sans font-extralight text-white/95">
                {currentStage.headlineTop}
              </span>
              <span className="block font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#f7e7ce] via-[#d4af37] to-[#fff6e5] pb-1">
                {currentStage.headlineAccent}
              </span>
            </h1>

            {/* Single-Sentence Architectural Subtitle */}
            <p className="text-base sm:text-lg text-white/75 font-light leading-relaxed mb-8 max-w-2xl mx-auto drop-shadow">
              {currentStage.subtitle}
            </p>

            {/* Jewel-Like CTA Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8">
              <Link
                to="/booking"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#f7e7ce] via-[#d4af37] to-[#e6c675] text-[#050507] font-semibold text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-[0_0_40px_rgba(212,175,55,0.28)] hover:brightness-110 transition-all"
              >
                <span>Begin With $99 Audit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Bilingual Sofía Voice Demo Control */}
              <div className="w-full sm:w-auto inline-flex items-center rounded-full border border-white/20 bg-black/60 backdrop-blur-xl p-1">
                <button
                  type="button"
                  onClick={toggleVoiceDemo}
                  className="flex-1 sm:flex-initial px-5 py-3 rounded-full hover:bg-white/[0.08] text-white text-sm font-light tracking-wide flex items-center justify-center gap-2.5 transition-all"
                >
                  {isPlayingAudio ? (
                    <Volume2 className="w-4 h-4 text-[#d4af37] animate-pulse" />
                  ) : (
                    <Play className="w-3.5 h-3.5 text-[#d4af37] fill-current" />
                  )}
                  <span>{isPlayingAudio ? 'Playing Sofía AI' : 'Hear Live Voice AI'}</span>
                </button>
                <div className="flex items-center gap-0.5 pr-1.5 pl-1 border-l border-white/15">
                  {(['en', 'es'] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => switchVoiceLang(lang)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-mono uppercase transition-all ${
                        voiceLang === lang
                          ? 'bg-[#d4af37] text-[#050507] font-bold'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              <Link
                to="/connect"
                className="w-full sm:w-auto px-5 py-3.5 rounded-full border border-[#d4af37]/30 bg-black/45 hover:bg-[#d4af37]/15 text-[#f7e7ce] text-xs font-mono uppercase tracking-[0.16em] flex items-center justify-center gap-2 backdrop-blur-md transition-all"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>10-Sec Direct Connect</span>
              </Link>
            </div>

            {/* Whisper-Quiet 4-Metric Proof Line */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] sm:text-xs font-mono uppercase tracking-[0.18em] text-white/55">
              {PROOF_METRICS.map((metric, idx) => (
                <div key={metric} className="flex items-center gap-5">
                  {idx > 0 && <span className="text-[#d4af37]/40 hidden sm:inline">/</span>}
                  <span>{metric}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Stage HUD Pill */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-max max-w-[94vw]">
          <div className="flex items-center gap-1 sm:gap-2 px-2.5 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#06060b]/85 backdrop-blur-2xl shadow-[0_15px_45px_rgba(0,0,0,0.9)]">
            {STAGE_PILLS.map((stage, idx) => {
              const active = stageIdx === idx
              return (
                <button
                  key={stage.label}
                  type="button"
                  onClick={() => scrollToStagePct(stage.pct)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider transition-all whitespace-nowrap ${
                    active
                      ? 'bg-[#d4af37] text-[#050507] font-bold'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {stage.label}
                </button>
              )
            })}
            <span className="w-px h-4 bg-white/15 mx-0.5" />
            <button
              type="button"
              onClick={scrollToServices}
              className="px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider text-[#f7e7ce] hover:bg-white/[0.08] flex items-center gap-1 transition-all whitespace-nowrap"
            >
              <span>Explore</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#d4af37]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
