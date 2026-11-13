import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Play, Volume2, EyeOff, Eye, Sparkles, Pause, ChevronDown } from 'lucide-react'
import SEO from '../components/SEO'

type HeroConceptId = 1 | 2 | 3 | 4 | 5 | 6 | 7

interface ScrollStageCopy {
  stageLabel: string
  headlineTop: string
  headlineAccent: string
  subtitle: string
}

interface HeroConceptMeta {
  id: HeroConceptId
  code: string
  name: string
  badge?: string
  inspiration: string
  eyebrow: string
  headlineTop: string
  headlineAccent: string
  subtitle: string
  primaryCta: string
  secondaryCta: string
  metrics: [string, string, string]
  isScroll3D?: boolean
  stages?: [ScrollStageCopy, ScrollStageCopy, ScrollStageCopy]
}

const HERO_CONCEPTS: HeroConceptMeta[] = [
  {
    id: 6,
    code: '06',
    name: 'Singularity Odyssey',
    badge: 'NEW 3D SCROLL',
    inspiration: 'Fusion of 01 Orb + 05 Eclipse · WebGL + 1,200-Node Z-Flight',
    eyebrow: 'AI DYNAMIC PRO  ·  REAL-TIME 3D SCROLL ODYSSEY',
    headlineTop: 'Intelligence,',
    headlineAccent: 'Beyond the Horizon.',
    subtitle:
      'Scroll to fly through the 24K corona horizon into a 1,200-node neural singularity—engineered by real AI architects.',
    primaryCta: 'Begin With $99 Audit',
    secondaryCta: 'Hear Live Voice AI',
    metrics: ['21 Live Systems', '0.38s Voice Latency', '48h Custom Prototype'],
    isScroll3D: true,
    stages: [
      {
        stageLabel: 'STAGE 01 // HORIZON GENESIS',
        headlineTop: 'Intelligence,',
        headlineAccent: 'Beyond the Horizon.',
        subtitle:
          'Scroll to descend through the 24K eclipse corona into the living neural core.',
      },
      {
        stageLabel: 'STAGE 02 // RELATIVISTIC DIVE',
        headlineTop: '21 Autonomous Systems.',
        headlineAccent: 'One Neural Core.',
        subtitle:
          'Sub-second bilingual voice agents, clinical scribes, and YOLOv8 spatial vision synchronized in real time.',
      },
      {
        stageLabel: 'STAGE 03 // GEODESIC VAULT',
        headlineTop: 'Architect Your',
        headlineAccent: 'Autonomous Company.',
        subtitle:
          'Crystallized sovereign software deployed in 5–10 days with a $2,500+/mo payroll savings guarantee.',
      },
    ],
  },
  {
    id: 7,
    code: '07',
    name: 'Chronos Liquid SDF',
    badge: 'NEW 3D RAYMARCH',
    inspiration: 'Real-Time WebGL 3D SDF Raymarched 24K Molten Metal + 3D Orbit HUD',
    eyebrow: 'SOVEREIGN AI ENGINEERING  ·  3D RAYMARCHED SCULPTURE',
    headlineTop: 'Bespoke AI.',
    headlineAccent: 'Sculpted in Code.',
    subtitle:
      'Scroll to morph mirror-polished 24K liquid gold from molten singularity into an obsidian architectural monolith.',
    primaryCta: 'Commission 48h Prototype',
    secondaryCta: 'Hear Live Voice AI',
    metrics: ['Real-Time SDF', 'WebRTC Voice <400ms', 'Zero Templates'],
    isScroll3D: true,
    stages: [
      {
        stageLabel: 'STAGE 01 // MOLTEN GENESIS',
        headlineTop: 'Bespoke AI.',
        headlineAccent: 'Sculpted in Code.',
        subtitle:
          'Scroll to shape liquid-metal intelligence from raw orbital droplets into sovereign architecture.',
      },
      {
        stageLabel: 'STAGE 02 // GYROSCOPIC TORUS',
        headlineTop: 'Full-Stack Software.',
        headlineAccent: 'Sub-Second Voice & Vision.',
        subtitle:
          'Full-duplex EN/ES voice webhooks, private zero-training RAG, and real-time computer vision.',
      },
      {
        stageLabel: 'STAGE 03 // ECLIPSE MONOLITH',
        headlineTop: 'Built in Days.',
        headlineAccent: 'Owned Forever.',
        subtitle:
          'Eliminate 60% of repetitive admin overhead with production software tailored to your enterprise.',
      },
    ],
  },
  {
    id: 1,
    code: '01',
    name: 'Liquid Gold Orb',
    badge: 'FINALIST',
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
    id: 5,
    code: '05',
    name: 'Eclipse Horizon',
    badge: 'FINALIST',
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
  {
    id: 2,
    code: '02',
    name: 'Tensor Monolith',
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
    name: 'Acoustic Silk',
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
    name: 'Code Lens',
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
]

const CODE_TRACE_LINES = [
  'const agent = await AIDynamic.deploy({ mode: "sovereign", region: "us-east" });',
  'voice.onCall({ lang: ["en-US", "es-LA"], latencyMs: 340, crmSync: true });',
  'vision.analyzeBlueprint("tower-floorplan.pdf") // -> 99.4% precision takeoff',
  'scribe.captureClinicalSOAP({ hipaa: true, icd10AutoVerify: true });',
  'status: ● 21 PRODUCTION SYSTEMS ONLINE  |  SAVINGS GUARANTEE: ACTIVE',
]

const VERT_SHADER = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`

// CONCEPT 06 FRAGMENT SHADER: Volumetric 24K Eclipse Corona & Relativistic Accretion Halo
const FRAG_SHADER_06 = `
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform float uScroll;
uniform float uVelocity;
uniform vec2 uMouse;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  float minDim = min(uResolution.x, uResolution.y);
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / minDim;

  // Scroll moves eclipse center upward from low horizon (0.0) into center singularity (0.5+)
  vec2 center = vec2(uMouse.x * 0.04, mix(-0.72, 0.02, smoothstep(0.0, 0.58, uScroll)) + uMouse.y * 0.03);
  vec2 p = uv - center;
  float d = length(p);
  float ang = atan(p.y, p.x);

  // Sphere radius swells as camera flies in with scroll
  float baseR = mix(0.68, 0.25, smoothstep(0.0, 0.65, uScroll));
  baseR = mix(baseR, 0.16, smoothstep(0.65, 1.0, uScroll));

  // Volumetric plasma turbulence
  float sw = fbm(vec2(ang * 2.4 + uTime * 0.18, d * 5.0 - uTime * 0.35 - uScroll * 2.5));
  float ringDist = abs(d - baseR);

  // Razor-sharp 24K rim + relativistic corona
  float rim = exp(-ringDist * (28.0 - clamp(uVelocity * 18.0, 0.0, 12.0))) * (0.9 + 0.5 * sw);
  float halo = exp(-max(d - baseR, 0.0) * 4.5) * (0.35 + 0.65 * sw);

  // Subtle gravitational accretion streaks during Stage 2 dive
  float diveFactor = sin(clamp(uScroll, 0.0, 1.0) * 3.14159);
  float rays = pow(max(0.0, sin(ang * 6.0 + uTime * 0.6 + sw * 3.0)), 4.0) * diveFactor * 0.22 * exp(-d * 1.8);

  // Dark eclipse core occludes interior when close
  float occ = smoothstep(baseR - 0.015, baseR + 0.008, d);

  vec3 champagne = vec3(0.98, 0.90, 0.72);
  vec3 gold24k = vec3(0.83, 0.68, 0.22);
  vec3 amberDeep = vec3(0.45, 0.28, 0.07);

  vec3 col = vec3(0.015, 0.015, 0.028);
  col += amberDeep * halo * 1.1;
  col += gold24k * (rim * 1.15 + rays);
  col += champagne * pow(rim, 2.2) * 0.85;

  // Inner core obsidian shadow + Stage 3 subtle lattice warmth
  float vaultGlow = smoothstep(0.62, 1.0, uScroll) * exp(-d * 3.2) * 0.35;
  col = mix(vec3(0.012, 0.012, 0.022), col, occ);
  col += gold24k * vaultGlow;

  gl_FragColor = vec4(col, 1.0);
}
`

// CONCEPT 07 FRAGMENT SHADER: Real-Time 3D SDF Raymarched 24K Liquid-Metal Sculpture
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
  // Orbit rotation driven smoothly by scroll + time + cursor
  float yaw = uTime * 0.35 + uScroll * 4.2 + uMouse.x * 0.65;
  float pitch = sin(uTime * 0.28) * 0.18 + uScroll * 1.1 + uMouse.y * 0.45;
  vec3 q = p;
  q.xz *= rot(yaw);
  q.yz *= rot(pitch);

  // Subtle molten surface ripple scaled down in final architectural stage
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

  // Morph seamlessly across scrollProgress 0.0 -> 0.5 -> 1.0
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

  // Dynamic camera pushes slightly closer on scroll + velocity micro-zoom
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

  // Deep obsidian background + subtle golden eclipse backlight
  float backGlow = exp(-length(uv) * 2.1) * (0.28 + 0.12 * sin(uTime));
  vec3 col = vec3(0.015, 0.015, 0.026) + vec3(0.83, 0.68, 0.22) * backGlow * 0.45;

  if (hit) {
    vec3 p = ro + rd * dist;
    vec3 n = calcNormal(p);
    vec3 v = -rd;
    vec3 r = reflect(-v, n);

    // Studio key, rim, and obsidian fill lights
    vec3 l1 = normalize(vec3(1.6, 2.2, 1.8));
    vec3 l2 = normalize(vec3(-2.0, -0.6, 1.2));
    float diff1 = max(dot(n, l1), 0.0);
    float diff2 = max(dot(n, l2), 0.0);
    float spec1 = pow(max(dot(r, l1), 0.0), 42.0);
    float spec2 = pow(max(dot(r, l2), 0.0), 22.0);
    float fresnel = pow(1.0 - max(dot(n, v), 0.0), 3.2);

    // Procedural studio environment reflection bands
    float envBand = smoothstep(-0.2, 0.6, r.y) * 0.65 + pow(max(0.0, sin(r.x * 6.0 + r.y * 3.0)), 6.0) * 0.35;

    vec3 obsidianMetal = vec3(0.04, 0.04, 0.06);
    vec3 champagneGold = vec3(0.96, 0.87, 0.62);
    vec3 richGold = vec3(0.82, 0.65, 0.20);

    // Stage 3 blends sculptural obsidian core with 24K gold Fresnel rim
    float obsidianBlend = smoothstep(0.55, 0.95, uScroll) * 0.65;
    vec3 baseTint = mix(richGold, obsidianMetal, obsidianBlend);

    col = baseTint * (0.18 + 0.72 * diff1) + richGold * diff2 * 0.35;
    col += champagneGold * envBand * (0.55 - obsidianBlend * 0.2);
    col += vec3(1.0, 0.96, 0.86) * (spec1 * 1.25 + spec2 * 0.45);
    col += champagneGold * fresnel * (1.05 + obsidianBlend * 0.5);
  }

  // Soft golden floor horizon reflection at bottom
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

export default function HeroLab() {
  const [activeId, setActiveId] = useState<HeroConceptId>(6)
  const [hideSwitcher, setHideSwitcher] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [autoFly, setAutoFly] = useState(false)
  const [scrollUiPct, setScrollUiPct] = useState(0)
  const [typedLineIdx, setTypedLineIdx] = useState(0)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const webglCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const smoothScrollRef = useRef(0)
  const targetScrollRef = useRef(0)
  const velocityRef = useRef(0)
  const autoFlyRef = useRef(false)

  const activeConcept = HERO_CONCEPTS.find((c) => c.id === activeId) || HERO_CONCEPTS[0]
  const isScroll3D = Boolean(activeConcept.isScroll3D)

  useEffect(() => {
    autoFlyRef.current = autoFly
  }, [autoFly])

  // Reset scroll cleanly when switching concepts
  const handleSelectConcept = (id: HeroConceptId) => {
    setActiveId(id)
    setAutoFly(false)
    smoothScrollRef.current = 0
    targetScrollRef.current = 0
    velocityRef.current = 0
    setScrollUiPct(0)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

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

  const scrubToPercent = (pct: number) => {
    setAutoFly(false)
    const clamped = Math.max(0, Math.min(100, pct))
    const progress = clamped / 100
    targetScrollRef.current = progress
    if (scrollContainerRef.current) {
      const maxScroll = Math.max(scrollContainerRef.current.scrollHeight - window.innerHeight, 1)
      window.scrollTo({ top: progress * maxScroll, behavior: 'auto' })
    }
    setScrollUiPct(Math.round(clamped))
  }

  // Track native scroll progress over the 340vh container with smooth damping
  useEffect(() => {
    if (!isScroll3D) return

    const onScroll = () => {
      if (autoFlyRef.current) return
      const el = scrollContainerRef.current
      if (!el) return
      const maxScroll = Math.max(el.scrollHeight - window.innerHeight, 1)
      targetScrollRef.current = Math.max(0, Math.min(1, window.scrollY / maxScroll))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isScroll3D])

  // WebGL GPU Shader Engine for Concept 06 & Concept 07
  useEffect(() => {
    if (activeId !== 6 && activeId !== 7) return
    const glCanvas = webglCanvasRef.current
    if (!glCanvas) return

    const gl = glCanvas.getContext('webgl', { alpha: false, antialias: true, powerPreference: 'high-performance' })
    if (!gl) return

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERT_SHADER)
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, activeId === 6 ? FRAG_SHADER_06 : FRAG_SHADER_07)
    if (!vs || !fs) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('WebGL link error:', gl.getProgramInfoLog(program))
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
  }, [activeId])

  // Real-Time 60fps 3D Overlay & Procedural Engine (Supports 06, 07 + 01–05)
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

    // Precompute 1,200 3D Fibonacci Neural Orb + Geodesic Lattice morph coordinates for 01 & 06
    const nodeCount = 1100
    const neuralNodes = Array.from({ length: nodeCount }, (_, i) => {
      const y = 1 - (i / (nodeCount - 1)) * 2
      const radius = Math.sqrt(1 - y * y)
      const theta = Math.PI * (3 - Math.sqrt(5)) * i

      // Organic sphere position
      const sx = Math.cos(theta) * radius
      const sy = y
      const sz = Math.sin(theta) * radius

      // Crystallized Geodesic Tensor Octahedral-Lattice target for Stage 3 (scroll 0.67 -> 1.0)
      const bandY = Math.round(sy * 5) / 5
      const ringR = Math.max(0.22, Math.sqrt(Math.max(0, 1 - bandY * bandY)))
      const snapTheta = Math.round(theta / (Math.PI / 6)) * (Math.PI / 6)

      return {
        sx,
        sy,
        sz,
        gx: Math.cos(snapTheta) * ringR * 1.15,
        gy: bandY * 1.15,
        gz: Math.sin(snapTheta) * ringR * 1.15,
        starDepth: Math.random(),
        pulse: Math.random() * Math.PI * 2,
      }
    })

    // 3D Starfield streaks for Concept 06 Z-flight
    const warpStars = Array.from({ length: 180 }, () => ({
      x: (Math.random() - 0.5) * 2.4,
      y: (Math.random() - 0.5) * 2.4,
      z: Math.random(),
      size: 0.6 + Math.random() * 1.3,
    }))

    // Vertical Filaments for Concept 04
    const columns = Array.from({ length: 42 }, (_, i) => ({
      xRatio: (i + 0.5) / 42,
      speed: 0.35 + (i % 7) * 0.12,
      offset: Math.random() * 1000,
      gold: i % 3 === 0,
    }))

    // Starfield for Concept 05
    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: 0.5 + Math.random() * 1.4,
      speed: 0.00015 + Math.random() * 0.00035,
      alpha: 0.15 + Math.random() * 0.55,
    }))

    // Helper: 3D Gyroscope Ring renderer
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

        // Rotate Z then X then Y
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

    const render = () => {
      t += 0.012

      // Auto-Fly mode glides scroll target smoothly back and forth
      if (autoFlyRef.current && (activeId === 6 || activeId === 7)) {
        const wave = 0.5 - 0.5 * Math.cos(t * 0.36)
        targetScrollRef.current = wave
        if (scrollContainerRef.current) {
          const maxScroll = Math.max(scrollContainerRef.current.scrollHeight - window.innerHeight, 1)
          window.scrollTo({ top: wave * maxScroll, behavior: 'auto' })
        }
      }

      // Smooth damped scroll interpolation + velocity tracking
      const prevSmooth = smoothScrollRef.current
      smoothScrollRef.current += (targetScrollRef.current - smoothScrollRef.current) * 0.085
      const rawVel = Math.abs(smoothScrollRef.current - prevSmooth) * 28
      velocityRef.current = velocityRef.current * 0.88 + rawVel * 0.12

      const sp = smoothScrollRef.current
      const vel = velocityRef.current

      if ((activeId === 6 || activeId === 7) && t - lastUiSync > 0.08) {
        lastUiSync = t
        setScrollUiPct(Math.round(sp * 100))
      }

      const w = window.innerWidth
      const h = window.innerHeight
      const mx = (mouseRef.current.x - 0.5) * 2
      const my = (mouseRef.current.y - 0.5) * 2

      if (activeId === 6) {
        // Transparent overlay over WebGL Shader 06
        ctx.clearRect(0, 0, w, h)

        const minDim = Math.min(w, h)
        const centerX = w * 0.5 + mx * 26
        // Rises smoothly from low horizon (h * 0.85) in Stage 1 to center (h * 0.5) in Stage 2–3
        const horizonLift = Math.min(1, Math.max(0, sp / 0.52))
        const easeLift = horizonLift * horizonLift * (3 - 2 * horizonLift)
        const centerY = h * (0.86 - 0.36 * easeLift) + my * 20

        // Camera zoom progression across 3 stages
        const sphereScale = minDim * (0.31 + sp * 0.12 + Math.min(vel * 0.04, 0.06))
        const latticeMorph = Math.max(0, Math.min(1, (sp - 0.62) / 0.34))

        // Relativistic Z-warp star streaks driven by scroll depth & velocity
        for (let i = 0; i < warpStars.length; i++) {
          const st = warpStars[i]
          const zVal = ((st.z - sp * 1.4 - t * 0.03) % 1 + 1) % 1
          const depth = 0.15 + zVal * 1.8
          const sx = w * 0.5 + (st.x / depth) * minDim * 0.55
          const sy = h * 0.5 + (st.y / depth) * minDim * 0.55
          const streak = 1 + vel * 14
          const sxPrev = w * 0.5 + (st.x / (depth + 0.015 * streak)) * minDim * 0.55
          const syPrev = h * 0.5 + (st.y / (depth + 0.015 * streak)) * minDim * 0.55

          ctx.beginPath()
          ctx.moveTo(sxPrev, syPrev)
          ctx.lineTo(sx, sy)
          ctx.strokeStyle = `rgba(247, 231, 206, ${Math.max(0.08, (1 - zVal) * 0.45)})`
          ctx.lineWidth = st.size
          ctx.stroke()
        }

        // 1,100-node 3D Neural Singularity -> Crystallized Geodesic Lattice
        const rotY = t * 0.42 + sp * 3.8 + mx * 0.45
        const rotX = Math.sin(t * 0.25) * 0.22 + sp * 1.2 + my * 0.35
        const cosY = Math.cos(rotY)
        const sinY = Math.sin(rotY)
        const cosX = Math.cos(rotX)
        const sinX = Math.sin(rotX)

        const particleOpacity = Math.min(1, 0.28 + easeLift * 0.72)

        for (let i = 0; i < neuralNodes.length; i++) {
          const n = neuralNodes[i]
          const wave = 1 + (1 - latticeMorph * 0.7) * 0.065 * Math.sin(n.sx * 5 + t * 2.2 + sp * 4.0) * Math.cos(n.sy * 5 - t * 1.8)

          const px = (n.sx * (1 - latticeMorph) + n.gx * latticeMorph) * wave
          const py = (n.sy * (1 - latticeMorph) + n.gy * latticeMorph) * wave
          const pz = (n.sz * (1 - latticeMorph) + n.gz * latticeMorph) * wave

          const x1 = px * cosY - pz * sinY
          const z1 = pz * cosY + px * sinY
          const y2 = py * cosX - z1 * sinX
          const z2 = z1 * cosX + py * sinX

          const perspective = 2.6 / (2.6 - z2 * 0.85)
          const sx = centerX + x1 * sphereScale * perspective
          const sy = centerY + y2 * sphereScale * perspective

          const depthAlpha = Math.max(0.05, (z2 + 1.15) * 0.42) * particleOpacity
          const shimmer = 0.75 + 0.25 * Math.sin(t * 3 + n.pulse)
          const rSize = Math.max(0.65, (1.05 + z2 * 0.85) * perspective * 0.7)

          ctx.beginPath()
          ctx.arc(sx, sy, rSize, 0, Math.PI * 2)
          ctx.fillStyle =
            i % 5 === 0
              ? `rgba(255, 246, 224, ${depthAlpha * shimmer})`
              : `rgba(212, 175, 55, ${depthAlpha * shimmer * 0.9})`
          ctx.fill()
        }

        // 3 Interlocking 3D Gyroscopic Orbital Rings appear in Stage 2 & lock into precision frame in Stage 3
        const ringVis = Math.max(0, Math.min(1, (sp - 0.18) / 0.35))
        if (ringVis > 0.02) {
          drawGyroRing(centerX, centerY, sphereScale * 1.18, 0.95 + sp * 0.8, t * 0.35, t * 0.2 + sp, 0.26 * ringVis, false)
          drawGyroRing(centerX, centerY, sphereScale * 1.32, -0.75 + sp * 0.6, -t * 0.25 + sp, t * 0.15, 0.18 * ringVis, true)
          drawGyroRing(centerX, centerY, sphereScale * 1.46, 0.3 + sp * 1.1, t * 0.2, -t * 0.3, 0.14 * ringVis, false)
        }
      } else if (activeId === 7) {
        // Transparent HUD & Precision 3D Orbital Overlay over WebGL 3D SDF Shader 07
        ctx.clearRect(0, 0, w, h)
        const minDim = Math.min(w, h)
        const cx = w * 0.5 + mx * 18
        const cy = h * 0.5 + my * 14
        const orbitR = minDim * (0.37 - Math.sin(sp * Math.PI) * 0.04)

        drawGyroRing(cx, cy, orbitR, 1.05 + sp * 0.9, t * 0.25 + mx * 0.3, sp * 2.0, 0.24, true)
        drawGyroRing(cx, cy, orbitR * 1.16, -0.65 + sp * 0.5, -t * 0.2 + my * 0.2, -sp * 1.5, 0.14, false)

        // 3D Orbiting Engineering Telemetry Anchors
        const labels = ['0.34s VOICE ENGINE', 'YOLOv8 SPATIAL VISION', 'PRIVATE RAG CORE']
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

          ctx.font = '600 12px ui-monospace, SFMono-Regular, Menlo, monospace'
          ctx.fillStyle = `rgba(247, 231, 206, ${depthAlpha * 0.9})`
          ctx.fillText(labels[i], px + 10, py + 4)
        }
      } else {
        // Existing Obsidian Canvas for Concepts 01–05
        ctx.fillStyle = '#040407'
        ctx.fillRect(0, 0, w, h)

        if (activeId === 1) {
          const cx = w * 0.5 + mx * 28
          const cy = h * 0.5 + my * 22
          const baseR = Math.min(w, h) * 0.33

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

          for (let i = 0; i < 720; i++) {
            const p = neuralNodes[i]
            const wave = 1 + 0.065 * Math.sin(p.sx * 5 + t * 2.2) * Math.cos(p.sy * 5 - t * 1.8)
            const px = p.sx * wave
            const py = p.sy * wave
            const pz = p.sz * wave

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
          const cx = w > 1024 ? w * 0.72 : w * 0.5
          const cy = h * 0.52
          const scale = Math.min(w, h) * (w > 1024 ? 0.23 : 0.2)

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

          for (let ring = 0; ring < 12; ring++) {
            const v = (ring / 12) * Math.PI * 2
            ctx.beginPath()
            for (let s = 0; s <= 320; s++) {
              const u = (s / 320) * Math.PI * 2
              const r = Math.cos(3 * u) * 0.35 + 1.05
              const tube = 0.24
              const x0 = (r + tube * Math.cos(v)) * Math.cos(2 * u)
              const y0 = (r + tube * Math.cos(v)) * Math.sin(2 * u)
              const z0 = tube * Math.sin(v) + Math.sin(3 * u) * 0.35

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
            ctx.strokeStyle = ring % 3 === 0 ? 'rgba(212, 175, 55, 0.34)' : 'rgba(226, 232, 240, 0.11)'
            ctx.lineWidth = ring % 3 === 0 ? 1.15 : 0.7
            ctx.stroke()
          }
        } else if (activeId === 3) {
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
              const envelope = Math.sin(nx * Math.PI)
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
              r % 4 === 0 ? `rgba(247, 231, 206, ${alpha})` : `rgba(201, 169, 110, ${alpha * 0.85})`
            ctx.lineWidth = r % 4 === 0 ? 1.3 : 0.8
            ctx.stroke()
          }
        } else if (activeId === 4) {
          for (let i = 0; i < columns.length; i++) {
            const col = columns[i]
            const x = col.xRatio * w
            ctx.beginPath()
            ctx.moveTo(x, 0)
            ctx.lineTo(x, h)
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)'
            ctx.lineWidth = 1
            ctx.stroke()

            const pulseY = ((t * 140 * col.speed + col.offset) % (h + 260)) - 130
            const grad = ctx.createLinearGradient(x, pulseY - 110, x, pulseY + 30)
            grad.addColorStop(0, 'rgba(212, 175, 55, 0)')
            grad.addColorStop(0.8, col.gold ? 'rgba(212, 175, 55, 0.42)' : 'rgba(148, 163, 184, 0.25)')
            grad.addColorStop(1, 'rgba(255, 255, 255, 0.85)')

            ctx.beginPath()
            ctx.moveTo(x, pulseY - 110)
            ctx.lineTo(x, pulseY + 20)
            ctx.strokeStyle = grad
            ctx.lineWidth = col.gold ? 1.6 : 1
            ctx.stroke()
          }

          const vig = ctx.createRadialGradient(w * 0.5, h * 0.5, h * 0.12, w * 0.5, h * 0.5, w * 0.65)
          vig.addColorStop(0, 'rgba(4, 4, 7, 0.72)')
          vig.addColorStop(1, 'rgba(4, 4, 7, 0.25)')
          ctx.fillStyle = vig
          ctx.fillRect(0, 0, w, h)
        } else if (activeId === 5) {
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

          ctx.beginPath()
          ctx.arc(planetCx, planetCy, planetR, 0, Math.PI * 2)
          ctx.fillStyle = '#030306'
          ctx.fill()

          ctx.beginPath()
          ctx.arc(planetCx, planetCy, planetR, -Math.PI * 0.75, -Math.PI * 0.25)
          ctx.strokeStyle = 'rgba(255, 236, 179, 0.85)'
          ctx.lineWidth = 2.2
          ctx.stroke()
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
  }, [activeId])

  const isSplitLayout = activeId === 2
  const stageIdx: 0 | 1 | 2 = scrollUiPct < 34 ? 0 : scrollUiPct < 68 ? 1 : 2
  const currentStage = activeConcept.stages?.[stageIdx]

  const displayedEyebrow = currentStage ? currentStage.stageLabel : activeConcept.eyebrow
  const displayedTop = currentStage ? currentStage.headlineTop : activeConcept.headlineTop
  const displayedAccent = currentStage ? currentStage.headlineAccent : activeConcept.headlineAccent
  const displayedSubtitle = currentStage ? currentStage.subtitle : activeConcept.subtitle

  return (
    <div
      ref={scrollContainerRef}
      className={`relative w-full bg-[#040407] text-white select-none ${
        isScroll3D ? 'h-[340vh]' : 'min-h-screen overflow-hidden'
      }`}
    >
      <SEO
        title="Luxury AI Hero Lab (Finalists 01, 05, 06 & 07) | AI Dynamic Pro"
        description="Compare real-time 3D scroll-dynamic WebGL luxury AI Hero concepts alongside Finalists 01 and 05."
        canonical="https://www.aidynamic.pro/hero-lab"
        noindex
      />

      {/* Sticky 100vh Viewport Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Layer 1: GPU WebGL Fragment Shader (Active for 06 & 07) */}
        <canvas
          ref={webglCanvasRef}
          className={`absolute inset-0 w-full h-full z-0 transition-opacity duration-500 ${
            isScroll3D ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />

        {/* Layer 2: High-DPI 3D Particle & Telemetry Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[1] pointer-events-none" />

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
            {isScroll3D && (
              <button
                type="button"
                onClick={() => setAutoFly(!autoFly)}
                className={`px-3.5 py-1.5 rounded-full border text-xs font-mono flex items-center gap-1.5 backdrop-blur-md transition-all ${
                  autoFly
                    ? 'border-[#d4af37] bg-[#d4af37] text-black font-bold'
                    : 'border-[#d4af37]/40 bg-black/60 text-[#f7e7ce] hover:bg-[#d4af37]/15'
                }`}
              >
                {autoFly ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{autoFly ? 'Pause 3D Fly' : 'Auto-Fly 3D'}</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setHideSwitcher(!hideSwitcher)}
              className="px-3 py-1.5 rounded-full border border-white/15 bg-black/50 backdrop-blur-md text-xs font-mono text-white/75 hover:text-white flex items-center gap-1.5 transition-all"
              title="Toggle switcher UI to inspect pure fullscreen hero"
            >
              {hideSwitcher ? <Eye className="w-3.5 h-3.5 text-[#d4af37]" /> : <EyeOff className="w-3.5 h-3.5 text-[#d4af37]" />}
              <span>{hideSwitcher ? 'Show Concepts' : 'Pure View'}</span>
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
          className={`relative z-10 max-w-7xl mx-auto px-6 sm:px-10 h-[calc(100vh-88px)] flex flex-col justify-center pb-24 ${
            isSplitLayout ? 'items-start text-left' : 'items-center text-center'
          }`}
        >
          <div className={isSplitLayout ? 'max-w-xl' : 'max-w-3xl'}>
            {/* Whisper Eyebrow */}
            <div
              className={`inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full border border-white/15 bg-black/45 backdrop-blur-md mb-6 ${
                isSplitLayout ? '' : 'mx-auto'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
              <span className="text-xs font-mono tracking-[0.24em] uppercase text-[#e5d5b7]">
                {displayedEyebrow}
              </span>
            </div>

            {/* Monumental Luxury Headline */}
            <h1 className="text-5xl sm:text-7xl lg:text-[80px] font-light tracking-[-0.03em] leading-[1.03] text-white mb-6 drop-shadow-[0_10px_40px_rgba(0,0,0,0.85)] transition-all duration-300">
              <span className="block font-sans font-extralight text-white/95">
                {displayedTop}
              </span>
              <span className="block font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#f7e7ce] via-[#d4af37] to-[#fff6e5] pb-1">
                {displayedAccent}
              </span>
            </h1>

            {/* Restrained Single-Sentence Subtitle */}
            <p
              className={`text-base sm:text-lg text-white/75 font-light leading-relaxed mb-8 drop-shadow ${
                isSplitLayout ? 'max-w-lg' : 'max-w-xl mx-auto'
              }`}
            >
              {displayedSubtitle}
            </p>

            {/* Concept 04 Exclusive: Minimalist Floating Live Code Lens */}
            {activeId === 4 && (
              <div className="max-w-xl mx-auto mb-8 rounded-2xl border border-[#d4af37]/25 bg-black/70 backdrop-blur-2xl px-5 py-3.5 text-left shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
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
              className={`flex flex-col sm:flex-row items-center gap-4 mb-9 ${
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
                className="w-full sm:w-auto px-7 py-4 rounded-full border border-white/20 bg-black/50 hover:bg-white/[0.09] backdrop-blur-xl text-white text-sm font-light tracking-wide flex items-center justify-center gap-2.5 transition-all"
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
              className={`flex flex-wrap items-center gap-6 text-xs font-mono uppercase tracking-[0.2em] text-white/55 ${
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

        {/* Subtle Scroll Cue when at 0% on 3D Scroll Modes */}
        {isScroll3D && scrollUiPct < 8 && (
          <div className="fixed bottom-36 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-1 text-xs font-mono uppercase tracking-[0.25em] text-[#f7e7ce]/80 animate-bounce">
            <span>Scroll to Fly Through 3D Space</span>
            <ChevronDown className="w-4 h-4 text-[#d4af37]" />
          </div>
        )}
      </div>

      {/* Floating Luxury Concept Selector Dock (Bottom Center) */}
      {!hideSwitcher && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 w-[95%] max-w-4xl">
          <div className="rounded-2xl border border-[#d4af37]/35 bg-[#08080e]/92 backdrop-blur-2xl p-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.92)]">
            {/* Scroll Depth Telemetry Scrubber for 06 & 07 */}
            {isScroll3D && (
              <div className="flex items-center gap-3 px-2.5 pb-2 mb-2 border-b border-white/10">
                <span className="text-xs font-mono text-[#d4af37] shrink-0">
                  3D SCROLL DEPTH: {scrollUiPct}%
                </span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={scrollUiPct}
                  onChange={(e) => scrubToPercent(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/15 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
                  aria-label="3D Scroll Depth"
                />
                <span className="hidden sm:inline text-xs font-mono text-white/55 shrink-0">
                  Stage {stageIdx + 1}/3
                </span>
              </div>
            )}

            <div className="flex items-center justify-between px-2 py-0.5 text-xs font-mono text-[#e5d5b7]/80">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>COMPARE FINALISTS (06 &amp; 07 NEW 3D SCROLL · 01 &amp; 05 FAVORITES)</span>
              </span>
              <span className="hidden md:inline text-white/45 truncate max-w-xs">{activeConcept.inspiration}</span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 mt-1.5">
              {HERO_CONCEPTS.map((c) => {
                const selected = c.id === activeId
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleSelectConcept(c.id)}
                    className={`px-2 py-2 rounded-xl text-left transition-all ${
                      selected
                        ? 'bg-gradient-to-br from-[#f7e7ce] to-[#d4af37] text-[#050507] font-bold shadow-lg'
                        : c.isScroll3D
                          ? 'bg-[#d4af37]/10 hover:bg-[#d4af37]/20 text-[#f7e7ce] border border-[#d4af37]/30'
                          : 'bg-white/[0.04] hover:bg-white/[0.09] text-white/75 border border-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-mono opacity-85">{c.code}</span>
                      {c.badge && (
                        <span
                          className={`hidden sm:inline text-xs font-mono ${
                            selected ? 'text-black/70' : 'text-[#d4af37]'
                          }`}
                        >
                          {c.isScroll3D ? '3D' : '★'}
                        </span>
                      )}
                    </div>
                    <div className="text-xs truncate font-medium mt-0.5">{c.name}</div>
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
