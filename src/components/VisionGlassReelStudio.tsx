import { useState, useRef, useEffect } from 'react'
import { Download, Play, Sparkles, Layers, Film, Copy, Check, Send, ExternalLink, CheckCircle2 } from 'lucide-react'

export interface GlassSlideSpec {
  id: string
  stepNumber: number
  totalSteps: number
  indexLabel: string
  title: string
  description: string
  iconEmoji: string
  iconGradient: [string, string]
  setupPills: string[]
  isCtaSlide?: boolean
  ctaKeyword?: string
  ctaSubtext?: string
}

export interface WeeklyGlassDeckTheme {
  id: string
  weekLabel: string
  hookNumber: string
  hookTextLine1: string
  hookTextLine2: string
  bgImage: string
  caption: string
  slides: GlassSlideSpec[]
}

export const WEEKLY_GLASS_DECKS: WeeklyGlassDeckTheme[] = [
  {
    id: 'week1_6_systems',
    weekLabel: 'Master Reel & Carousel #1 — 6 AI Systems We Build & Train Inside Your Company',
    hookNumber: '6',
    hookTextLine1: 'AI systems we build & train',
    hookTextLine2: 'inside your company this week',
    bgImage: '/social/week1-consulting.jpg',
    caption: `Comment "BUILD" ✴️ 6 AI Systems We Deploy & Train Inside Your Company

Most CEOs & business owners are bleeding $3,420+/month on missed calls and slow manual admin work.

As hands-on AI Developers & Creators, we walk into your industry, engineer custom AI applications, and stay side-by-side training your staff so 1 employee produces the output of 5:

01 — JAss 24/7 Voice Agent ($997 Turnkey / $297/mo)
02 — WhatsApp & SMS Instant Closer (30-sec response)
03 — Back-Office Payroll & Billing Automator ($99 Audit)
04 — B2B Outbound Lead & Cold Email Machine
05 — 48-Hour Custom AI Application Prototype
06 — On-Site Corporate Staff AI Bootcamp ($497 for up to 15 staff)

💬 Comment "BUILD" or book your $99 60-Min Efficiency Audit / Free 48-Hr Prototype at https://www.aidynamic.pro/booking
📞 Call JAss Live 24/7: (786) 643-2099`,
    slides: [
      {
        id: 's1',
        stepNumber: 1,
        totalSteps: 6,
        indexLabel: '01',
        title: 'JAss Voice Agent',
        description:
          'Picks up the phone in 3 seconds in English & Spanish, answers every client question, and books the appointment so zero calls get missed.',
        iconEmoji: '📞',
        iconGradient: ['#34d399', '#059669'],
        setupPills: ['✴️ JAss Voice AI', 'Bilingual EN/ES', 'Live Calendar Sync'],
      },
      {
        id: 's2',
        stepNumber: 2,
        totalSteps: 6,
        indexLabel: '02',
        title: 'WhatsApp & SMS Agent',
        description:
          'Answers every message on your business WhatsApp, IG DM & web chat in 30 seconds, qualifies the budget, and books the client in.',
        iconEmoji: '💬',
        iconGradient: ['#22c55e', '#15803d'],
        setupPills: ['✴️ JAss Chat', '30-Sec Closer Skill', 'WhatsApp + CRM'],
      },
      {
        id: 's3',
        stepNumber: 3,
        totalSteps: 6,
        indexLabel: '03',
        title: 'Payroll & Admin Saver',
        description:
          'We audit your slowest department ($99) and automate intake forms, billing codes, and manual data entry that waste $3,420/month.',
        iconEmoji: '⚡',
        iconGradient: ['#38bdf8', '#2563eb'],
        setupPills: ['✴️ $99 On-Site Audit', 'Zero Copy-Paste', '$2.5K/mo ROI Guarantee'],
      },
      {
        id: 's4',
        stepNumber: 4,
        totalSteps: 6,
        indexLabel: '04',
        title: 'Cold Email Machine',
        description:
          'Finds B2B decision-makers in your industry, writes and sends executive outreach sequences, and routes hot replies to your calendar.',
        iconEmoji: '✉️',
        iconGradient: ['#60a5fa', '#1d4ed8'],
        setupPills: ['✴️ AI Dynamic Engine', 'Brevo + CRM Sync', 'Verified B2B Leads'],
      },
      {
        id: 's5',
        stepNumber: 5,
        totalSteps: 6,
        indexLabel: '05',
        title: '48-Hr Custom AI App',
        description:
          'Give us your #1 bottleneck and our AI Developers engineer a working custom application in 48 hours—or you pay $0.',
        iconEmoji: '🛠️',
        iconGradient: ['#fbbf24', '#ea580c'],
        setupPills: ['✴️ Custom Code Build', '48-Hour Prototype', '$30K/yr Guarantee'],
      },
      {
        id: 's6',
        stepNumber: 6,
        totalSteps: 6,
        indexLabel: '06',
        title: 'Staff AI Bootcamp',
        description:
          'We stay with your company and train up to 15 employees hands-on ($497) so 1 AI-trained staff member produces the output of 5.',
        iconEmoji: '🎓',
        iconGradient: ['#a855f7', '#c026d3'],
        setupPills: ['✴️ On-Site Training', 'Role Playbooks', '1 Staff = 5x Output'],
      },
      {
        id: 's7_cta',
        stepNumber: 6,
        totalSteps: 6,
        indexLabel: 'CTA',
        title: 'Comment "BUILD"',
        description: 'and we will build a live 48-hour AI prototype for your company + train your team 🔗',
        iconEmoji: '💬',
        iconGradient: ['#f59e0b', '#ea580c'],
        setupPills: ['aidynamic.pro/booking', '(786) 643-2099'],
        isCtaSlide: true,
        ctaKeyword: '"BUILD"',
        ctaSubtext: "and we'll build a live 48-hour AI prototype for your company 🔗",
      },
    ],
  },
  {
    id: 'week2_payroll_leaks',
    weekLabel: 'Master Reel & Carousel #2 — 6 Hidden Payroll Leaks CEOs Eliminate With AI',
    hookNumber: '6',
    hookTextLine1: 'Payroll leaks CEOs eliminate',
    hookTextLine2: 'in 48 hours with custom AI',
    bgImage: '/social/week2-workflow.jpg',
    caption: `Comment "AUDIT" ✴️ 6 Hidden Payroll Leaks CEOs Eliminate in 48 Hours

Why pay staff $22–$35/hr to copy-paste spreadsheets, chase unconfirmed appointments, and miss 38% of after-hours calls?

For $99, our AI Developers walk into your company, map your slowest department in 60 minutes, and guarantee to uncover $2,500+/month ($30,000/yr) in immediate savings—or we refund your $99 on the spot.

💬 Comment "AUDIT" or book at https://www.aidynamic.pro/booking`,
    slides: [
      {
        id: 'w2_1',
        stepNumber: 1,
        totalSteps: 6,
        indexLabel: '01',
        title: 'After-Hours Voicemail',
        description:
          '38% of high-ticket callers hang up on voicemail. JAss answers in 3 seconds 24/7 in English & Spanish and locks in the booking.',
        iconEmoji: '📵',
        iconGradient: ['#ef4444', '#b91c1c'],
        setupPills: ['✴️ JAss 24/7 Voice', 'Zero Missed Calls', '$997 Turnkey'],
      },
      {
        id: 'w2_2',
        stepNumber: 2,
        totalSteps: 6,
        indexLabel: '02',
        title: '47-Min Lead Follow-Up',
        description:
          'Waiting 47 minutes to reply to a web form kills 78% of deals. Our AI texts & calls every new lead back within 3 seconds.',
        iconEmoji: '⏱️',
        iconGradient: ['#f59e0b', '#d97706'],
        setupPills: ['✴️ Instant Speed-to-Lead', 'SMS + Voice Call', '3.4x More Bookings'],
      },
      {
        id: 'w2_3',
        stepNumber: 3,
        totalSteps: 6,
        indexLabel: '03',
        title: 'Manual Intake & PDFs',
        description:
          'Re-typing client PDFs into your CRM wastes 9 hrs/week ($1,170/mo). Our custom extractor syncs intake forms in 4 seconds.',
        iconEmoji: '📄',
        iconGradient: ['#38bdf8', '#0284c7'],
        setupPills: ['✴️ Document AI', 'Auto CRM Entry', 'Saves $1,170/mo'],
      },
      {
        id: 'w2_4',
        stepNumber: 4,
        totalSteps: 6,
        indexLabel: '04',
        title: 'No-Show Appointments',
        description:
          'Automated bilingual voice & WhatsApp confirmations reschedule conflicts automatically and cut calendar no-shows by 64%.',
        iconEmoji: '📅',
        iconGradient: ['#10b981', '#047857'],
        setupPills: ['✴️ Smart Reminders', 'Auto-Reschedule', '-64% No-Shows'],
      },
      {
        id: 'w2_5',
        stepNumber: 5,
        totalSteps: 6,
        indexLabel: '05',
        title: 'Untrained Staff Bottlenecks',
        description:
          '83% of AI tools fail because staff never learn them. Our $497 Corporate Bootcamp trains 15 employees so 1 staff = 5.',
        iconEmoji: '🚀',
        iconGradient: ['#a855f7', '#7e22ce'],
        setupPills: ['✴️ $497 Staff Bootcamp', 'Hands-On Coaching', '5x Team Output'],
      },
      {
        id: 'w2_6',
        stepNumber: 6,
        totalSteps: 6,
        indexLabel: '06',
        title: ' CEO Morning Blindness',
        description:
          'Wake up to an automated 7:00 AM executive brief showing every call answered, lead booked, and invoice processed overnight.',
        iconEmoji: '📊',
        iconGradient: ['#fbbf24', '#b45309'],
        setupPills: ['✴️ CEO Command Brief', 'Live ROI Ledger', 'Full Visibility'],
      },
      {
        id: 'w2_cta',
        stepNumber: 6,
        totalSteps: 6,
        indexLabel: 'CTA',
        title: 'Comment "AUDIT"',
        description: 'and we will find $2,500+/mo in payroll savings inside your company or you pay $0 🔗',
        iconEmoji: '💬',
        iconGradient: ['#f59e0b', '#ea580c'],
        setupPills: ['aidynamic.pro/booking', '$99 60-Min Audit'],
        isCtaSlide: true,
        ctaKeyword: '"AUDIT"',
        ctaSubtext: "and we'll uncover $2,500+/mo in savings or you pay $0 🔗",
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

  // 1. Background Image or Dark Executive Gradient
  ctx.fillStyle = '#070b14'
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
    ctx.filter = 'brightness(0.45) contrast(1.08) saturate(1.1)'
    ctx.drawImage(bgImg, offsetX, offsetY, drawW, drawH)
    ctx.restore()
  }

  // Dark vignette overlay
  const grad = ctx.createLinearGradient(0, 0, 0, H)
  grad.addColorStop(0, 'rgba(5, 8, 18, 0.72)')
  grad.addColorStop(0.45, 'rgba(5, 8, 18, 0.35)')
  grad.addColorStop(1, 'rgba(5, 8, 18, 0.85)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, W, H)

  // 2. Top Hook Header (Exact Olli Rasmussen style)
  const topY = aspect === '9:16' ? 250 : 120

  // Pixel Robot / Brand Badge + Big Number "6"
  ctx.save()
  drawRoundedRect(ctx, W / 2 - 145, topY - 68, 128, 66, 16)
  const badgeGrad = ctx.createLinearGradient(W / 2 - 145, topY - 68, W / 2 - 17, topY)
  badgeGrad.addColorStop(0, '#f59e0b')
  badgeGrad.addColorStop(1, '#ea580c')
  ctx.fillStyle = badgeGrad
  ctx.fill()

  ctx.fillStyle = '#090d16'
  ctx.font = '900 30px Inter, system-ui, sans-serif'
  ctx.fillText('AI PRO', W / 2 - 128, topY - 24)

  ctx.font = 'italic 900 104px Inter, system-ui, sans-serif'
  ctx.fillStyle = '#ffffff'
  ctx.lineWidth = 10
  ctx.strokeStyle = '#000000'
  ctx.strokeText(deck.hookNumber, W / 2 + 12, topY - 4)
  ctx.fillText(deck.hookNumber, W / 2 + 12, topY - 4)
  ctx.restore()

  // Hook Lines with thick black stroke + white fill
  ctx.save()
  ctx.font = 'italic 900 50px Inter, system-ui, sans-serif'
  ctx.lineWidth = 11
  ctx.strokeStyle = 'rgba(0,0,0,0.92)'
  ctx.fillStyle = '#ffffff'

  const l1W = ctx.measureText(deck.hookTextLine1).width
  ctx.strokeText(deck.hookTextLine1, (W - l1W) / 2, topY + 64)
  ctx.fillText(deck.hookTextLine1, (W - l1W) / 2, topY + 64)

  const l2W = ctx.measureText(deck.hookTextLine2).width
  ctx.strokeText(deck.hookTextLine2, (W - l2W) / 2, topY + 126)
  ctx.fillText(deck.hookTextLine2, (W - l2W) / 2, topY + 126)
  ctx.restore()

  // 3. Center VisionOS Frosted-Glass HUD Card
  const cardX = 82
  const cardY = aspect === '9:16' ? 460 : 310
  const cardW = W - 164 // 916px
  const cardH = aspect === '9:16' ? 890 : 840

  // Blurred glass backdrop inside the card
  ctx.save()
  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 48)
  ctx.clip()
  if (bgImg && bgImg.complete && bgImg.naturalWidth > 0) {
    ctx.filter = 'blur(28px) brightness(0.55) saturate(1.25)'
    ctx.drawImage(bgImg, 0, 0, W, H)
    ctx.filter = 'none'
  }
  const glassFill = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY + cardH)
  glassFill.addColorStop(0, 'rgba(255, 255, 255, 0.17)')
  glassFill.addColorStop(0.5, 'rgba(255, 255, 255, 0.10)')
  glassFill.addColorStop(1, 'rgba(15, 23, 42, 0.42)')
  ctx.fillStyle = glassFill
  ctx.fillRect(cardX, cardY, cardW, cardH)
  ctx.restore()

  // Glass Specular Border
  ctx.save()
  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 48)
  ctx.lineWidth = 2.5
  const borderGrad = ctx.createLinearGradient(cardX, cardY, cardX, cardY + cardH)
  borderGrad.addColorStop(0, 'rgba(255, 255, 255, 0.48)')
  borderGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.18)')
  borderGrad.addColorStop(1, 'rgba(255, 255, 255, 0.32)')
  ctx.strokeStyle = borderGrad
  ctx.stroke()
  ctx.restore()

  // Segmented 6-Step Progress Bar at top inside of Glass Card
  const totalBars = slide.totalSteps || 6
  const barGap = 16
  const barAreaW = 460
  const singleBarW = (barAreaW - barGap * (totalBars - 1)) / totalBars
  const barStartX = W / 2 - barAreaW / 2
  const barY = cardY + 42

  for (let i = 0; i < totalBars; i++) {
    const bx = barStartX + i * (singleBarW + barGap)
    drawRoundedRect(ctx, bx, barY, singleBarW, 9, 5)
    if (slide.isCtaSlide || i + 1 === slide.stepNumber) {
      const pGrad = ctx.createLinearGradient(bx, barY, bx + singleBarW, barY)
      pGrad.addColorStop(0, '#fbbf24')
      pGrad.addColorStop(1, '#ea580c')
      ctx.fillStyle = pGrad
    } else if (i + 1 < slide.stepNumber) {
      ctx.fillStyle = 'rgba(255,255,255,0.65)'
    } else {
      ctx.fillStyle = 'rgba(255,255,255,0.22)'
    }
    ctx.fill()
  }

  if (!slide.isCtaSlide) {
    // 4A. Standard System Card Layout (01 to 06)
    const innerX = cardX + 64
    const innerRight = cardX + cardW - 64

    // Pill: "System 01 of 6"
    const pillY = cardY + 105
    drawRoundedRect(ctx, innerX, pillY, 235, 58, 29)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.14)'
    ctx.fill()
    ctx.lineWidth = 1.5
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)'
    ctx.stroke()

    ctx.fillStyle = 'rgba(255, 255, 255, 0.92)'
    ctx.font = '600 26px Inter, system-ui, sans-serif'
    ctx.fillText(`System ${slide.indexLabel} of ${slide.totalSteps}`, innerX + 26, pillY + 38)

    // Thin Architectural Number "01" on top right
    ctx.save()
    ctx.font = '200 112px Inter, system-ui, sans-serif'
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)'
    const numW = ctx.measureText(slide.indexLabel).width
    ctx.fillText(slide.indexLabel, innerRight - numW, pillY + 72)
    ctx.restore()

    // 3D App Icon Box + Bold Title
    const iconY = cardY + 235
    const iconSize = 118
    ctx.save()
    drawRoundedRect(ctx, innerX, iconY, iconSize, iconSize, 30)
    const icGrad = ctx.createLinearGradient(innerX, iconY, innerX + iconSize, iconY + iconSize)
    icGrad.addColorStop(0, slide.iconGradient[0])
    icGrad.addColorStop(1, slide.iconGradient[1])
    ctx.fillStyle = icGrad
    ctx.fill()
    ctx.lineWidth = 2
    ctx.strokeStyle = 'rgba(255,255,255,0.4)'
    ctx.stroke()

    ctx.font = '56px Inter, system-ui, sans-serif'
    const emW = ctx.measureText(slide.iconEmoji).width
    ctx.fillText(slide.iconEmoji, innerX + (iconSize - emW) / 2, iconY + 78)
    ctx.restore()

    // Title next to Icon
    ctx.fillStyle = '#ffffff'
    ctx.font = '800 58px Inter, system-ui, sans-serif'
    ctx.fillText(slide.title, innerX + iconSize + 34, iconY + 78)

    // Plain-English Description (2-3 crisp lines)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
    ctx.font = '500 39px Inter, system-ui, sans-serif'
    wrapCanvasText(ctx, slide.description, innerX, iconY + 195, cardW - 128, 54, false)

    // SETUP Label
    const setupY = cardY + cardH - 225
    ctx.fillStyle = 'rgba(255, 255, 255, 0.60)'
    ctx.font = '700 24px Inter, system-ui, sans-serif'
    ctx.fillText('SETUP', innerX, setupY)

    // SETUP Pills with "+" Connectors
    let pillCursorX = innerX
    let pillCursorY = setupY + 24
    ctx.font = '600 27px Inter, system-ui, sans-serif'

    slide.setupPills.forEach((pillText, idx) => {
      if (idx > 0) {
        const plusW = 34
        if (pillCursorX + plusW > innerRight) {
          pillCursorX = innerX
          pillCursorY += 74
        }
        ctx.fillStyle = 'rgba(255,255,255,0.85)'
        ctx.fillText('+', pillCursorX + 6, pillCursorY + 41)
        pillCursorX += plusW
      }

      const textW = ctx.measureText(pillText).width
      const boxW = textW + 44
      if (pillCursorX + boxW > innerRight && pillCursorX > innerX) {
        pillCursorX = innerX
        pillCursorY += 74
      }

      drawRoundedRect(ctx, pillCursorX, pillCursorY, boxW, 58, 18)
      ctx.fillStyle = 'rgba(15, 23, 42, 0.62)'
      ctx.fill()
      ctx.lineWidth = 1.5
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.24)'
      ctx.stroke()

      ctx.fillStyle = '#ffffff'
      ctx.fillText(pillText, pillCursorX + 22, pillCursorY + 39)
      pillCursorX += boxW + 12
    })
  } else {
    // 4B. Final Comment-Gate CTA Slide ("BUILD" / "AUDIT")
    const centerY = cardY + cardH / 2 - 40

    ctx.fillStyle = 'rgba(255, 255, 255, 0.92)'
    ctx.font = '600 42px Inter, system-ui, sans-serif'
    const cLabel = '💬 Comment'
    const cLabelW = ctx.measureText(cLabel).width
    ctx.fillText(cLabel, (W - cLabelW) / 2, centerY - 95)

    // Glowing Orange/Amber Pill Box with "BUILD"
    const kw = slide.ctaKeyword || '"BUILD"'
    ctx.font = '900 74px Inter, system-ui, sans-serif'
    const kwW = ctx.measureText(kw).width
    const boxW = kwW + 130
    const boxH = 135
    const boxX = (W - boxW) / 2
    const boxY = centerY - 55

    drawRoundedRect(ctx, boxX, boxY, boxW, boxH, 32)
    const ctaGrad = ctx.createLinearGradient(boxX, boxY, boxX + boxW, boxY + boxH)
    ctaGrad.addColorStop(0, 'rgba(245, 158, 11, 0.72)')
    ctaGrad.addColorStop(1, 'rgba(234, 88, 12, 0.72)')
    ctx.fillStyle = ctaGrad
    ctx.fill()
    ctx.lineWidth = 3
    ctx.strokeStyle = 'rgba(253, 224, 71, 0.75)'
    ctx.stroke()

    ctx.fillStyle = '#ffffff'
    ctx.fillText(kw, (W - kwW) / 2, boxY + 92)

    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
    ctx.font = '600 38px Inter, system-ui, sans-serif'
    wrapCanvasText(
      ctx,
      slide.ctaSubtext || "and we'll build a live 48-hour AI prototype for your company 🔗",
      W / 2,
      boxY + boxH + 78,
      cardW - 160,
      52,
      true
    )
  }

  // 5. Subtle Executive Watermark Footer
  const footerY = H - 70
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)'
  ctx.font = '700 26px Inter, system-ui, sans-serif'
  const footerText = 'AI DYNAMIC PRO • aidynamic.pro • (786) 643-2099'
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
          `✓ Published ${postType.toUpperCase()} directly to ${data.publishedTo
            .map((p: any) => p.channel)
            .join(', ')}!`
        )
      } else if (data.needsChannelAuthorization) {
        setBufferStatusMsg(data.message)
      } else {
        setBufferStatusMsg(data.error || 'Synced to Buffer Ideas workspace.')
      }
    } catch (e: any) {
      setBufferStatusMsg(e.message || 'Network error connecting to Buffer API.')
    } finally {
      setPublishingBuffer(false)
    }
  }

  const currentDeck =
    WEEKLY_GLASS_DECKS.find((d) => d.id === selectedDeckId) || WEEKLY_GLASS_DECKS[0]
  const currentSlide = currentDeck.slides[activeSlideIdx] || currentDeck.slides[0]

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
        a.download = `${currentDeck.id}_vision_reel.webm`
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
    <div className="bg-dark-50/60 border border-white/15 rounded-2xl p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-extrabold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Automated VisionOS Frosted-Glass Reel &amp; Carousel Studio
          </span>
          <h3 className="text-xl font-extrabold text-white">
            1-Click Instagram Reel &amp; LinkedIn Glass-Card Generator (@olli.rasmussen Style)
          </h3>
          <p className="text-xs text-luxury-silver mt-1">
            Automatically renders high-converting 1080×1920 Reels and 1080×1350 Carousels with segmented progress bars, 3D system icons, and SETUP stack pills.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => downloadSingleSlidePng(activeSlideIdx)}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-amber-400" />
            Download Current Slide (PNG)
          </button>
          <button
            onClick={downloadAllCarouselSlides}
            className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 hover:bg-amber-300 text-xs font-extrabold flex items-center gap-1.5 shadow-lg"
          >
            <Layers className="w-4 h-4" />
            Download All 7 Slides (Batch)
          </button>
          <button
            onClick={recordFullReelVideo}
            disabled={recordingVideo}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-green-500 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-lg disabled:opacity-50"
          >
            <Film className="w-4 h-4" />
            {recordingVideo ? 'Recording 14s Reel...' : 'Auto-Record 14s Reel Video'}
          </button>
          <button
            onClick={() => handlePublishToBuffer('carousel')}
            disabled={publishingBuffer}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-lg disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            {publishingBuffer
              ? 'Syncing Buffer...'
              : `Auto-Publish to Buffer (${bufferConnectedChannels} Channels)`}
          </button>
        </div>
      </div>

      {/* Live Buffer API Connection Banner */}
      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-white font-semibold">
            Buffer API Key Connected (<code className="text-emerald-300">aimedicalassistance@gmail.com</code> • Org <code className="text-amber-300">6ae611610f74184c45cd3ec7</code>) — 7-Slide VisionOS Carousel &amp; 15s Reel Loaded!
          </span>
        </div>
        <a
          href="https://publish.buffer.com/channels"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-400 text-slate-950 font-extrabold text-xs hover:bg-emerald-300 transition-colors"
        >
          Link IG &amp; LinkedIn Channels ({bufferConnectedChannels}/3)
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {bufferStatusMsg && (
        <div className="p-3.5 rounded-xl bg-amber-500/15 border border-amber-400/40 text-xs text-amber-200 font-semibold">
          {bufferStatusMsg}
        </div>
      )}

      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Left Controls */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-luxury-silver mb-1.5">
                Select Campaign Deck Template
              </label>
              <select
                value={selectedDeckId}
                onChange={(e) => {
                  setSelectedDeckId(e.target.value)
                  setActiveSlideIdx(0)
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs font-semibold text-white"
              >
                {WEEKLY_GLASS_DECKS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.weekLabel}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-luxury-silver mb-1.5">
                Format / Aspect Ratio
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setAspect('9:16')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold border ${
                    aspect === '9:16'
                      ? 'bg-amber-400 text-black border-amber-400'
                      : 'bg-black/40 text-white border-white/15'
                  }`}
                >
                  9:16 Instagram Reel (1080×1920)
                </button>
                <button
                  onClick={() => setAspect('4:5')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold border ${
                    aspect === '4:5'
                      ? 'bg-amber-400 text-black border-amber-400'
                      : 'bg-black/40 text-white border-white/15'
                  }`}
                >
                  4:5 Feed Carousel (1080×1350)
                </button>
              </div>
            </div>
          </div>

          {/* Slide Selector Buttons */}
          <div>
            <div className="text-xs font-bold text-luxury-silver mb-2">
              Click Any Slide to Preview or Download ({currentDeck.slides.length} Total Cards):
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {currentDeck.slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSlideIdx(idx)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    idx === activeSlideIdx
                      ? 'bg-amber-400/20 border-amber-400 text-white'
                      : 'bg-black/40 border-white/10 text-luxury-silver hover:text-white'
                  }`}
                >
                  <div className="text-[10px] font-mono uppercase text-amber-300">
                    Slide {idx + 1} • {s.indexLabel}
                  </div>
                  <div className="text-xs font-bold truncate mt-0.5">{s.title}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Synchronized Caption Box */}
          <div className="p-4 rounded-xl bg-black/45 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">
                Synchronized Instagram &amp; LinkedIn Caption (Comment-Gate Hook)
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(currentDeck.caption)
                  setCopiedCaption(true)
                  setTimeout(() => setCopiedCaption(false), 2000)
                }}
                className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-amber-300 flex items-center gap-1"
              >
                {copiedCaption ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedCaption ? 'Copied!' : 'Copy Caption'}
              </button>
            </div>
            <pre className="text-xs text-luxury-silver whitespace-pre-wrap font-sans leading-relaxed max-h-48 overflow-y-auto">
              {currentDeck.caption}
            </pre>
          </div>
        </div>

        {/* Right Live High-Res Canvas Preview */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-[300px] rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl bg-black">
            <canvas
              ref={canvasRef}
              className="w-full h-auto block"
            />
          </div>
          <div className="mt-2 text-[11px] text-luxury-silver flex items-center gap-1.5">
            <Play className="w-3.5 h-3.5 text-amber-400" />
            Live 1080p Canvas Render • Ready for Instagram Reels &amp; LinkedIn
          </div>
        </div>
      </div>
    </div>
  )
}
