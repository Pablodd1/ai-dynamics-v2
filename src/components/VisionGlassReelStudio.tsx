import { useState, useRef, useEffect } from 'react'

export interface GlassSlideSpec {
  id: string
  stepNumber: number
  totalSteps: number
  indexLabel: string
  sectorHeader: string
  title: string
  description: string
  roiMetric: string
  setupPills: string[]
  isCtaSlide?: boolean
  ctaKeyword?: string
  ctaSubtext?: string
}

export interface WeeklyGlassDeckTheme {
  id: string
  weekLabel: string
  topKicker: string
  hookTextLine1: string
  hookTextLine2: string
  bgImage: string
  caption: string
  slides: GlassSlideSpec[]
}

export const WEEKLY_GLASS_DECKS: WeeklyGlassDeckTheme[] = [
  {
    id: 'week1_6_systems',
    weekLabel: 'Architecture Deck 01 — Six Production AI Systems Engineered Inside Your Company',
    topKicker: 'AI DYNAMIC PRO • EXECUTIVE ARCHITECTURE',
    hookTextLine1: 'Six Production AI Architectures',
    hookTextLine2: 'Engineered Inside Your Company',
    bgImage: '/social/week1-consulting.jpg',
    caption: `Comment "SCALE" — Six Production AI Architectures Engineered Inside Your Company.

Every week a CEO delays AI integration, manual payroll and missed calls quietly drain $3,420+ per department.

At AI Dynamic Pro, we do not sell generic software subscriptions. As hands-on AI Developers and Creators, we walk into your operation, engineer custom production architectures around your workflows in 48 hours, and stay on-site training your staff until 1 employee produces the output of 5:

01 / CLINICAL & HEALTHCARE AI — Ambient SOAP charting, automated 837 claim scrubbing, and bilingual patient intake (-45% admin overhead).
02 / COMPUTER VISION & SPATIAL AI — YOLOv8 + DINOv2 macro authentication, 12-class property defect vision, and 3D LiDAR digital twins.
03 / AUTONOMOUS REVOPS & VOICE (JAss) — 3-second Ring-1 bilingual voice and sub-minute multi-channel CRM conversion ($997 Turnkey / $297/mo).
04 / PRIVATE RAG & DEAL INTELLIGENCE — Sovereign legal contract screening, escrow deadline telemetry, and vector real estate deal matching.
05 / BIOMECHANICS & AGENTIC WEB — 33-joint markerless kinematics, daily biometric adaptation, and self-learning Agentic Websites built for LLM Answer Engines.
06 / ON-SITE WORKFORCE MULTIPLICATION — $99 60-Min Department Efficiency Audit + Free 48-Hr Prototype (guaranteed to uncover $2,500+/mo in savings or you pay $0) + $497 Corporate Staff Bootcamp.

Comment "SCALE" or schedule your $99 Audit / 48-Hour Prototype directly at https://www.aidynamic.pro/booking
Direct Executive Line: +1 (786) 643-2099`,
    slides: [
      {
        id: 's1',
        stepNumber: 1,
        totalSteps: 6,
        indexLabel: '01',
        sectorHeader: 'ARCHITECTURE 01 OF 06 • HEALTHCARE & CLINICAL',
        title: 'Clinical & RCM Intelligence',
        description:
          'We engineer ambient physician charting, automated 837 claim scrubbing, and insurance OCR intake—cutting 45% of clinical admin payroll while training your staff to handle 4x volume.',
        roiMetric: '-45% CLINICAL ADMIN OVERHEAD • ZERO MANUAL DATA ENTRY',
        setupPills: ['AMBIENT SOAP SCRIBE', '837 CLAIM ENGINE', 'ON-SITE STAFF TRAINING'],
      },
      {
        id: 's2',
        stepNumber: 2,
        totalSteps: 6,
        indexLabel: '02',
        sectorHeader: 'ARCHITECTURE 02 OF 06 • COMPUTER VISION & 3D',
        title: 'Neural Vision & Spatial AI',
        description:
          'Replace slow human inspections with 3-second computer vision. Custom YOLOv8 + DINOv2 macro luxury authentication, 12-class property defect detection, and 3D LiDAR floorplans.',
        roiMetric: '3-SECOND NEURAL INSPECTION • MILLIMETER LIDAR PRECISION',
        setupPills: ['YOLOv8 + DINOv2 CV', '3D LIDAR DIGITAL TWIN', 'AUTO PDF CERTIFICATION'],
      },
      {
        id: 's3',
        stepNumber: 3,
        totalSteps: 6,
        indexLabel: '03',
        sectorHeader: 'ARCHITECTURE 03 OF 06 • AUTONOMOUS REVOPS',
        title: 'JAss Voice & CRM Pipeline',
        description:
          '38% of callers hang up on voicemail and 47-minute human replies kill 78% of deals. JAss answers on Ring 1 in English and Spanish and books retainers into your CRM in 3 seconds.',
        roiMetric: '3-SECOND RING-1 ANSWER • $997 TURNKEY OR $297/MO',
        setupPills: ['JASS BILINGUAL VOICE', 'SUB-MINUTE REVOPS', 'LIVE CALENDAR SYNC'],
      },
      {
        id: 's4',
        stepNumber: 4,
        totalSteps: 6,
        indexLabel: '04',
        sectorHeader: 'ARCHITECTURE 04 OF 06 • LEGAL & REAL ESTATE',
        title: 'Private RAG & Deal Matching',
        description:
          'Eliminate 15+ hours a week of paralegal and brokerage admin. Sovereign document RAG screens contracts in seconds, tracks escrow cutoffs, and matches off-market mandates.',
        roiMetric: '-15 HRS/WK PARALEGAL & BROKER ADMIN • ZERO MISSED CUTOFFS',
        setupPills: ['SOVEREIGN DOCUMENT RAG', 'VECTOR DEAL MATCH', 'ESCROW TELEMETRY'],
      },
      {
        id: 's5',
        stepNumber: 5,
        totalSteps: 6,
        indexLabel: '05',
        sectorHeader: 'ARCHITECTURE 05 OF 06 • KINEMATICS & AGENTIC WEB',
        title: 'Biomechanics & Agentic Web',
        description:
          'From 33-joint smartphone gait kinematics and daily HRV coaching to self-learning Agentic Websites structured for Google and ChatGPT citations, we build category-defining platforms.',
        roiMetric: '33-JOINT POSE VISION • 5-10 DAY PRODUCTION LAUNCH',
        setupPills: ['33-JOINT KINEMATICS', 'SELF-LEARNING WEB UX', 'SCHEMA.ORG LLM GRAPH'],
      },
      {
        id: 's6',
        stepNumber: 6,
        totalSteps: 6,
        indexLabel: '06',
        sectorHeader: 'ARCHITECTURE 06 OF 06 • WORKFORCE MULTIPLICATION',
        title: '48-Hr Build & Staff Bootcamp',
        description:
          'We build a working AI prototype in 48 hours—guaranteed to uncover $2,500+/month ($30K/yr) in savings or you pay $0—and stay on-site training your staff so 1 employee equals 5.',
        roiMetric: '$99 60-MIN AUDIT • $497 CORPORATE BOOTCAMP (1 STAFF = 5X)',
        setupPills: ['48-HOUR LIVE PROTOTYPE', '$30,000/YR GUARANTEE', 'ON-SITE TEAM TRAINING'],
      },
      {
        id: 's7_cta',
        stepNumber: 6,
        totalSteps: 6,
        indexLabel: 'MANDATE',
        sectorHeader: 'EXECUTIVE DECISION PROTOCOL',
        title: 'Comment "SCALE"',
        description:
          'We will walk into your company, engineer a live 48-hour AI prototype guaranteed to save $2,500+/month—or you pay $0—and train your staff.',
        roiMetric: 'AIDYNAMIC.PRO/BOOKING • +1 (786) 643-2099',
        setupPills: ['AIDYNAMIC.PRO/BOOKING', '+1 (786) 643-2099'],
        isCtaSlide: true,
        ctaKeyword: '"SCALE"',
        ctaSubtext:
          'We will engineer a live 48-hour AI prototype for your company—guaranteed to uncover $2,500+/mo in savings or you pay $0—and train your team.',
      },
    ],
  },
]

function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  center = false
): number {
  const words = text.split(' ')
  let line = ''
  let currentY = y

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' '
    const metrics = ctx.measureText(testLine)
    if (metrics.width > maxWidth && n > 0) {
      const drawX = center ? x - ctx.measureText(line.trim()).width / 2 : x
      ctx.fillText(line.trim(), drawX, currentY)
      line = words[n] + ' '
      currentY += lineHeight
    } else {
      line = testLine
    }
  }
  if (line.trim()) {
    const drawX = center ? x - ctx.measureText(line.trim()).width / 2 : x
    ctx.fillText(line.trim(), drawX, currentY)
    currentY += lineHeight
  }
  return currentY
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

export function renderVisionGlassSlideToCanvas(
  canvas: HTMLCanvasElement,
  deck: WeeklyGlassDeckTheme,
  slide: GlassSlideSpec,
  bgImg: HTMLImageElement | null,
  aspect: '9:16' | '4:5' = '9:16'
) {
  const W = 1080
  const H = aspect === '9:16' ? 1920 : 1350
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // 1. Deep Obsidian Luxury Background (#07070c)
  ctx.fillStyle = '#07070c'
  ctx.fillRect(0, 0, W, H)

  if (bgImg && bgImg.complete && bgImg.naturalWidth > 0) {
    const imgRatio = bgImg.naturalWidth / bgImg.naturalHeight
    const canvasRatio = W / H
    let drawW = W
    let drawH = H
    let offsetX = 0
    let offsetY = 0
    if (imgRatio > canvasRatio) {
      drawH = H
      drawW = H * imgRatio
      offsetX = -(drawW - W) / 2
    } else {
      drawW = W
      drawH = W / imgRatio
      offsetY = -(drawH - H) / 2
    }
    ctx.save()
    ctx.filter = 'brightness(0.95) contrast(1.06) saturate(1.16)'
    ctx.drawImage(bgImg, offsetX, offsetY, drawW, drawH)
    ctx.restore()
  }

  // Breathable Frosted-Glass Vignette so Background Photography Shines Through
  const grad = ctx.createLinearGradient(0, 0, 0, H)
  grad.addColorStop(0, 'rgba(10, 13, 24, 0.42)')
  grad.addColorStop(0.45, 'rgba(10, 13, 24, 0.14)')
  grad.addColorStop(1, 'rgba(10, 13, 24, 0.48)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, W, H)

  // 2. Editorial Top Header (Zero Cartoon Icons, Pure Luxury Gold + Playfair Serif)
  const topY = aspect === '9:16' ? 210 : 95

  ctx.save()
  ctx.fillStyle = '#c9a96e'
  ctx.font = '600 22px Inter, system-ui, sans-serif'
  const kickerW = ctx.measureText(deck.topKicker).width
  ctx.fillText(deck.topKicker, (W - kickerW) / 2, topY)

  // Thin Gold Horizontal Rule
  ctx.fillStyle = 'rgba(201, 169, 110, 0.45)'
  ctx.fillRect(W / 2 - 90, topY + 20, 180, 1.5)

  ctx.font = '700 54px Georgia, "Playfair Display", serif'
  ctx.fillStyle = '#ffffff'
  const l1W = ctx.measureText(deck.hookTextLine1).width
  ctx.fillText(deck.hookTextLine1, (W - l1W) / 2, topY + 86)

  ctx.font = 'italic 400 50px Georgia, "Playfair Display", serif'
  ctx.fillStyle = '#f7e7ce'
  const l2W = ctx.measureText(deck.hookTextLine2).width
  ctx.fillText(deck.hookTextLine2, (W - l2W) / 2, topY + 148)
  ctx.restore()

  // 3. Center Obsidian & Champagne-Gold Frosted Glass Card
  const cardX = 76
  const cardY = aspect === '9:16' ? 445 : 295
  const cardW = W - 152 // 928px
  const cardH = aspect === '9:16' ? 940 : 870

  ctx.save()
  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 36)
  ctx.clip()
  if (bgImg && bgImg.complete && bgImg.naturalWidth > 0) {
    ctx.filter = 'blur(22px) brightness(0.76) saturate(1.35)'
    ctx.drawImage(bgImg, 0, 0, W, H)
    ctx.filter = 'none'
  }
  const glassFill = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY + cardH)
  glassFill.addColorStop(0, 'rgba(18, 22, 36, 0.56)')
  glassFill.addColorStop(0.5, 'rgba(14, 17, 29, 0.52)')
  glassFill.addColorStop(1, 'rgba(12, 15, 26, 0.62)')
  ctx.fillStyle = glassFill
  ctx.fillRect(cardX, cardY, cardW, cardH)
  ctx.restore()

  // Champagne-Gold Specular Border
  ctx.save()
  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 36)
  ctx.lineWidth = 2
  const borderGrad = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY + cardH)
  borderGrad.addColorStop(0, 'rgba(201, 169, 110, 0.65)')
  borderGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)')
  borderGrad.addColorStop(1, 'rgba(201, 169, 110, 0.45)')
  ctx.strokeStyle = borderGrad
  ctx.stroke()
  ctx.restore()

  // Segmented 6-Step Champagne-Gold Progress Bar
  const totalBars = slide.totalSteps || 6
  const barGap = 16
  const barAreaW = 480
  const singleBarW = (barAreaW - barGap * (totalBars - 1)) / totalBars
  const barStartX = W / 2 - barAreaW / 2
  const barY = cardY + 46

  for (let i = 0; i < totalBars; i++) {
    const bx = barStartX + i * (singleBarW + barGap)
    drawRoundedRect(ctx, bx, barY, singleBarW, 6, 3)
    if (slide.isCtaSlide || i + 1 === slide.stepNumber) {
      ctx.fillStyle = '#c9a96e'
    } else if (i + 1 < slide.stepNumber) {
      ctx.fillStyle = 'rgba(247, 231, 206, 0.55)'
    } else {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.16)'
    }
    ctx.fill()
  }

  if (!slide.isCtaSlide) {
    const innerX = cardX + 68
    const innerRight = cardX + cardW - 68

    // Sector Kicker + Large Serif Architectural Index ("01")
    const topRowY = cardY + 130
    ctx.fillStyle = '#c9a96e'
    ctx.font = '600 21px Inter, system-ui, sans-serif'
    ctx.fillText(slide.sectorHeader, innerX, topRowY)

    ctx.fillStyle = '#22d3ee'
    ctx.font = '600 20px Inter, system-ui, sans-serif'
    ctx.fillText(slide.roiMetric, innerX, topRowY + 34)

    ctx.save()
    ctx.font = '300 116px Georgia, "Playfair Display", serif'
    ctx.fillStyle = 'rgba(247, 231, 206, 0.88)'
    const numW = ctx.measureText(slide.indexLabel).width
    ctx.fillText(slide.indexLabel, innerRight - numW, topRowY + 42)
    ctx.restore()

    // Thin Divider Line
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)'
    ctx.fillRect(innerX, topRowY + 68, cardW - 136, 1)

    // System Title (Editorial Serif, No Icons)
    ctx.fillStyle = '#ffffff'
    ctx.font = '700 62px Georgia, "Playfair Display", serif'
    ctx.fillText(slide.title, innerX, topRowY + 156)

    // Concise Executive Thesis Copy
    ctx.fillStyle = 'rgba(232, 232, 232, 0.94)'
    ctx.font = '400 36px Inter, system-ui, sans-serif'
    wrapCanvasText(ctx, slide.description, innerX, topRowY + 235, cardW - 136, 52, false)

    // PRODUCTION ARCHITECTURE Stack Row
    const setupY = cardY + cardH - 215
    ctx.fillStyle = 'rgba(160, 160, 168, 0.85)'
    ctx.font = '600 20px Inter, system-ui, sans-serif'
    ctx.fillText('PRODUCTION ARCHITECTURE & DEPLOYMENT', innerX, setupY)

    let pillCursorX = innerX
    let pillCursorY = setupY + 24
    ctx.font = '600 23px Inter, system-ui, sans-serif'

    slide.setupPills.forEach((pillText, idx) => {
      if (idx > 0) {
        const sepW = 28
        if (pillCursorX + sepW > innerRight) {
          pillCursorX = innerX
          pillCursorY += 68
        }
        ctx.fillStyle = '#c9a96e'
        ctx.fillText('/', pillCursorX + 8, pillCursorY + 36)
        pillCursorX += sepW
      }

      const textW = ctx.measureText(pillText).width
      const boxW = textW + 40
      if (pillCursorX + boxW > innerRight && pillCursorX > innerX) {
        pillCursorX = innerX
        pillCursorY += 68
      }

      drawRoundedRect(ctx, pillCursorX, pillCursorY, boxW, 52, 10)
      ctx.fillStyle = 'rgba(7, 7, 12, 0.85)'
      ctx.fill()
      ctx.lineWidth = 1.2
      ctx.strokeStyle =
        idx === 2 ? 'rgba(201, 169, 110, 0.65)' : 'rgba(255, 255, 255, 0.20)'
      ctx.stroke()

      ctx.fillStyle = idx === 2 ? '#f7e7ce' : '#ffffff'
      ctx.fillText(pillText, pillCursorX + 20, pillCursorY + 34)
      pillCursorX += boxW + 10
    })
  } else {
    // Minimalist Executive CTA Card ("SCALE")
    const centerY = cardY + cardH / 2 - 50

    ctx.fillStyle = '#c9a96e'
    ctx.font = '600 24px Inter, system-ui, sans-serif'
    const cLabel = 'EXECUTIVE DECISION PROTOCOL — COMMENT BELOW'
    const cLabelW = ctx.measureText(cLabel).width
    ctx.fillText(cLabel, (W - cLabelW) / 2, centerY - 105)

    const kw = slide.ctaKeyword || '"SCALE"'
    ctx.font = '700 82px Georgia, "Playfair Display", serif'
    const kwW = ctx.measureText(kw).width
    const boxW = kwW + 140
    const boxH = 140
    const boxX = (W - boxW) / 2
    const boxY = centerY - 65

    drawRoundedRect(ctx, boxX, boxY, boxW, boxH, 20)
    const ctaGrad = ctx.createLinearGradient(boxX, boxY, boxX + boxW, boxY + boxH)
    ctaGrad.addColorStop(0, '#c9a96e')
    ctaGrad.addColorStop(1, '#a0894e')
    ctx.fillStyle = ctaGrad
    ctx.fill()

    ctx.fillStyle = '#07070c'
    ctx.fillText(kw, (W - kwW) / 2, boxY + 96)

    ctx.fillStyle = '#ffffff'
    ctx.font = '400 36px Inter, system-ui, sans-serif'
    wrapCanvasText(
      ctx,
      slide.ctaSubtext ||
        'We will engineer a live 48-hour AI prototype for your company—guaranteed to uncover $2,500+/mo in savings or you pay $0—and train your team.',
      W / 2,
      boxY + boxH + 74,
      cardW - 150,
      52,
      true
    )
  }

  // 5. Minimalist Luxury Footer
  const footerY = H - 68
  ctx.fillStyle = 'rgba(201, 169, 110, 0.88)'
  ctx.font = '600 23px Inter, system-ui, sans-serif'
  const footerText = 'AI DYNAMIC PRO   |   AIDYNAMIC.PRO   |   +1 (786) 643-2099'
  const fW = ctx.measureText(footerText).width
  ctx.fillText(footerText, (W - fW) / 2, footerY)
}

export default function VisionGlassReelStudio() {
  const [selectedDeckId, setSelectedDeckId] = useState(WEEKLY_GLASS_DECKS[0].id)
  const [activeSlideIdx, setActiveSlideIdx] = useState(0)
  const [aspect, setAspect] = useState<'9:16' | '4:5'>('9:16')
  const [recordingVideo, setRecordingVideo] = useState(false)
  const [copiedCaption, setCopiedCaption] = useState(false)
  const [publishingBuffer, setPublishingBuffer] = useState(false)
  const [bufferStatusMsg, setBufferStatusMsg] = useState<string | null>(null)
  const [bufferConnectedChannels, setBufferConnectedChannels] = useState<number>(0)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const bgImageRef = useRef<HTMLImageElement | null>(null)

  const currentDeck =
    WEEKLY_GLASS_DECKS.find((d) => d.id === selectedDeckId) || WEEKLY_GLASS_DECKS[0]
  const currentSlide = currentDeck.slides[activeSlideIdx] || currentDeck.slides[0]

  useEffect(() => {
    fetch('/api/social-publish')
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d?.channels)) {
          setBufferConnectedChannels(d.channels.length)
        }
      })
      .catch(() => {})
  }, [])

  const handlePublishToBuffer = async (postType: 'carousel' | 'reel') => {
    setPublishingBuffer(true)
    setBufferStatusMsg(null)
    try {
      const res = await fetch('/api/social-publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'publish',
          postType,
          mode: 'shareNow',
        }),
      })
      const data = await res.json()
      if (data.success && Array.isArray(data.publishedTo) && data.publishedTo.length > 0) {
        setBufferStatusMsg(
          `Published ${postType.toUpperCase()} directly to ${data.publishedTo
            .map((p: any) => p.channel)
            .join(', ')}.`
        )
      } else if (data.needsChannelAuthorization) {
        setBufferStatusMsg(data.message)
      } else {
        setBufferStatusMsg(data.error || 'Synced to Buffer workspace.')
      }
    } catch (e: any) {
      setBufferStatusMsg(e.message || 'Network error connecting to Buffer API.')
    } finally {
      setPublishingBuffer(false)
    }
  }

  useEffect(() => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = currentDeck.bgImage
    img.onload = () => {
      bgImageRef.current = img
      if (canvasRef.current) {
        renderVisionGlassSlideToCanvas(
          canvasRef.current,
          currentDeck,
          currentSlide,
          img,
          aspect
        )
      }
    }
  }, [currentDeck, currentSlide, aspect])

  useEffect(() => {
    if (canvasRef.current) {
      renderVisionGlassSlideToCanvas(
        canvasRef.current,
        currentDeck,
        currentSlide,
        bgImageRef.current,
        aspect
      )
    }
  }, [currentDeck, currentSlide, aspect])

  const downloadSingleSlidePng = (slideIndex: number) => {
    const offscreen = document.createElement('canvas')
    const targetSlide = currentDeck.slides[slideIndex]
    renderVisionGlassSlideToCanvas(
      offscreen,
      currentDeck,
      targetSlide,
      bgImageRef.current,
      aspect
    )
    const link = document.createElement('a')
    link.download = `${currentDeck.id}_slide_${slideIndex + 1}_${aspect.replace(':', 'x')}.png`
    link.href = offscreen.toDataURL('image/png')
    link.click()
  }

  const downloadAllCarouselSlides = () => {
    currentDeck.slides.forEach((_, idx) => {
      setTimeout(() => downloadSingleSlidePng(idx), idx * 280)
    })
  }

  const recordFullReelVideo = async () => {
    if (!canvasRef.current || recordingVideo) return
    setRecordingVideo(true)
    try {
      const stream = canvasRef.current.captureStream(30)
      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : 'video/webm'
      const recorder = new MediaRecorder(stream, {
        mimeType,
        videoBitsPerSecond: 8_000_000,
      })
      const chunks: BlobPart[] = []
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data)
      }
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: mimeType })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${currentDeck.id}_executive_reel.webm`
        a.click()
        setRecordingVideo(false)
      }

      recorder.start()
      for (let i = 0; i < currentDeck.slides.length; i++) {
        setActiveSlideIdx(i)
        renderVisionGlassSlideToCanvas(
          canvasRef.current,
          currentDeck,
          currentDeck.slides[i],
          bgImageRef.current,
          '9:16'
        )
        await new Promise((r) => setTimeout(r, 2000))
      }
      recorder.stop()
    } catch {
      setRecordingVideo(false)
    }
  }

  return (
    <div className="bg-[#0d0d14] border border-luxury-gold/30 rounded-2xl p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-luxury-gold/15 border border-luxury-gold/40 text-luxury-gold text-[10px] font-mono uppercase tracking-[0.2em] mb-2">
            AI DYNAMIC PRO — BESPOKE ARCHITECTURAL REEL &amp; CAROUSEL STUDIO
          </span>
          <h3 className="text-xl font-serif font-bold text-white">
            Minimalist Obsidian &amp; Champagne-Gold Executive Studio (Zero Icons)
          </h3>
          <p className="text-xs text-luxury-silver mt-1">
            Original AI Dynamic Pro typography and color architecture (#0a0a0f Obsidian, #c9a96e Champagne Gold, #06b6d4 Cyan) showcasing our 6 industry platforms.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => downloadSingleSlidePng(activeSlideIdx)}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider font-bold"
          >
            Download Slide (PNG)
          </button>
          <button
            onClick={downloadAllCarouselSlides}
            className="px-4 py-2 rounded-xl bg-luxury-gold text-dark hover:bg-luxury-champagne text-xs font-mono uppercase tracking-wider font-extrabold shadow-lg"
          >
            Download All 7 Slides
          </button>
          <button
            onClick={recordFullReelVideo}
            disabled={recordingVideo}
            className="px-4 py-2 rounded-xl bg-white text-dark font-mono uppercase tracking-wider font-extrabold text-xs shadow-lg disabled:opacity-50"
          >
            {recordingVideo ? 'Recording 14s Reel...' : 'Record 14s Reel Video'}
          </button>
          <button
            onClick={() => handlePublishToBuffer('carousel')}
            disabled={publishingBuffer}
            className="px-4 py-2 rounded-xl bg-accent text-dark font-mono uppercase tracking-wider font-extrabold text-xs shadow-lg disabled:opacity-50"
          >
            {publishingBuffer
              ? 'Syncing Buffer...'
              : `Publish to Buffer (${bufferConnectedChannels} Channels)`}
          </button>
        </div>
      </div>

      {/* Live Buffer API Connection Banner */}
      <div className="p-4 rounded-xl bg-luxury-gold/10 border border-luxury-gold/30 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-white font-mono">
          BUFFER API CONNECTED (<span className="text-luxury-gold">aimedicalassistance@gmail.com</span>) — 7-SLIDE ARCHITECTURAL DECK &amp; 15S REEL READY
        </div>
        <a
          href="https://publish.buffer.com/channels"
          target="_blank"
          rel="noreferrer"
          className="px-3.5 py-1.5 rounded-lg bg-luxury-gold text-dark font-mono uppercase tracking-wider font-extrabold text-xs hover:bg-luxury-champagne transition-colors"
        >
          Authorize IG, LinkedIn &amp; Google Business ({bufferConnectedChannels}/3) →
        </a>
      </div>

      {bufferStatusMsg && (
        <div className="p-3.5 rounded-xl bg-white/5 border border-luxury-gold/40 text-xs text-luxury-champagne font-mono">
          {bufferStatusMsg}
        </div>
      )}

      <div className="grid lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-luxury-silver mb-1.5">
                Architecture Deck
              </label>
              <select
                value={selectedDeckId}
                onChange={(e) => {
                  setSelectedDeckId(e.target.value)
                  setActiveSlideIdx(0)
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs font-mono text-white"
              >
                {WEEKLY_GLASS_DECKS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.weekLabel}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-luxury-silver mb-1.5">
                Output Dimensions
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setAspect('9:16')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-mono font-bold border ${
                    aspect === '9:16'
                      ? 'bg-luxury-gold text-dark border-luxury-gold'
                      : 'bg-black/40 text-white border-white/15'
                  }`}
                >
                  9:16 Reel (1080×1920)
                </button>
                <button
                  onClick={() => setAspect('4:5')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-mono font-bold border ${
                    aspect === '4:5'
                      ? 'bg-luxury-gold text-dark border-luxury-gold'
                      : 'bg-black/40 text-white border-white/15'
                  }`}
                >
                  4:5 Feed (1080×1350)
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-luxury-silver mb-2">
              Select Slide Card ({currentDeck.slides.length} Total):
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {currentDeck.slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSlideIdx(idx)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    idx === activeSlideIdx
                      ? 'bg-luxury-gold/20 border-luxury-gold text-white'
                      : 'bg-black/40 border-white/10 text-luxury-silver hover:text-white'
                  }`}
                >
                  <div className="text-[10px] font-mono uppercase text-luxury-gold">
                    SLIDE 0{idx + 1} • {s.indexLabel}
                  </div>
                  <div className="text-xs font-serif font-bold truncate mt-0.5">{s.title}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-luxury-gold">
                Omnichannel Executive Caption (IG • LinkedIn • Google Business)
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(currentDeck.caption)
                  setCopiedCaption(true)
                  setTimeout(() => setCopiedCaption(false), 2000)
                }}
                className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-luxury-champagne"
              >
                {copiedCaption ? 'COPIED' : 'COPY CAPTION'}
              </button>
            </div>
            <pre className="text-xs text-luxury-silver whitespace-pre-wrap font-sans leading-relaxed max-h-48 overflow-y-auto">
              {currentDeck.caption}
            </pre>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-[300px] rounded-2xl overflow-hidden border border-luxury-gold/40 shadow-2xl bg-black">
            <canvas ref={canvasRef} className="w-full h-auto block" />
          </div>
          <div className="mt-2 text-[10px] font-mono uppercase tracking-widest text-luxury-gold">
            Bespoke Obsidian &amp; Champagne-Gold 1080p Render
          </div>
        </div>
      </div>
    </div>
  )
}
