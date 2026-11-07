#!/usr/bin/env node
/**
 * AI Dynamic Pro — Automated VisionOS Frosted-Glass Reel & Carousel Generator
 * Recreates the exact @olli.rasmussen ("6 Systems You Can Build") Apple VisionOS Glass Card
 * layout and outputs crisp SVG + HTML/PNG/Reel decks in public/social/vision-deck/
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.resolve(__dirname, '../public/social/vision-deck')

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true })
}

const SLIDES = [
  {
    step: 1,
    index: '01',
    title: 'JAss Voice Agent',
    line1: 'Picks up the phone in 3 seconds in English &',
    line2: 'Spanish, answers questions, and books the',
    line3: 'appointment so zero calls get missed.',
    iconEmoji: '📞',
    iconColors: ['#34d399', '#059669'],
    pills: ['✴️ JAss Voice AI', 'Bilingual EN / ES', 'Live Calendar Sync'],
  },
  {
    step: 2,
    index: '02',
    title: 'WhatsApp & SMS Agent',
    line1: 'Answers every message on your business',
    line2: 'WhatsApp, IG DM & web chat in 30 seconds,',
    line3: 'qualifies the client, and books them in.',
    iconEmoji: '💬',
    iconColors: ['#22c55e', '#15803d'],
    pills: ['✴️ JAss Chat', '30-Sec Closer Skill', 'WhatsApp + CRM'],
  },
  {
    step: 3,
    index: '03',
    title: 'Payroll & Admin Saver',
    line1: 'We walk into your company ($99 Audit) and',
    line2: 'automate intake forms, billing codes, and',
    line3: 'manual data entry wasting $3,420/month.',
    iconEmoji: '⚡',
    iconColors: ['#38bdf8', '#2563eb'],
    pills: ['✴️ $99 On-Site Audit', 'Zero Copy-Paste', '$2.5K/mo Guarantee'],
  },
  {
    step: 4,
    index: '04',
    title: 'Cold Email Machine',
    line1: 'Finds B2B decision-makers in your industry,',
    line2: 'writes and sends executive sequences, then',
    line3: 'routes hot replies directly to your calendar.',
    iconEmoji: '✉️',
    iconColors: ['#60a5fa', '#1d4ed8'],
    pills: ['✴️ AI Dynamic Engine', 'Brevo + CRM Sync', 'Verified B2B Leads'],
  },
  {
    step: 5,
    index: '05',
    title: '48-Hr Custom AI App',
    line1: 'Give us your #1 operational bottleneck and',
    line2: 'our AI Developers engineer a working custom',
    line3: 'application in 48 hours—or you pay $0.',
    iconEmoji: '🛠️',
    iconColors: ['#fbbf24', '#ea580c'],
    pills: ['✴️ Custom Code Build', '48-Hour Prototype', '$30K/yr Guarantee'],
  },
  {
    step: 6,
    index: '06',
    title: 'Staff AI Bootcamp',
    line1: 'We stay with your company and train up to 15',
    line2: 'employees hands-on ($497) so 1 AI-trained',
    line3: 'staff member produces the output of 5.',
    iconEmoji: '🎓',
    iconColors: ['#a855f7', '#c026d3'],
    pills: ['✴️ On-Site Training', 'Role Playbooks', '1 Staff = 5x Output'],
  },
]

function buildSlideSvg(slide) {
  const bars = [1, 2, 3, 4, 5, 6]
    .map((b, i) => {
      const x = 310 + i * 80
      const fill = b === slide.step ? 'url(#amberGrad)' : b < slide.step ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.22)'
      return `<rect x="${x}" y="502" width="64" height="9" rx="4.5" fill="${fill}" />`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1080" height="1920" viewBox="0 0 1080 1920" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1080" y2="1920" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#060a12"/>
      <stop offset="50%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#050811"/>
    </linearGradient>
    <linearGradient id="glassGrad" x1="82" y1="460" x2="998" y2="1350" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="rgba(255,255,255,0.18)"/>
      <stop offset="50%" stop-color="rgba(255,255,255,0.09)"/>
      <stop offset="100%" stop-color="rgba(15,23,42,0.55)"/>
    </linearGradient>
    <linearGradient id="amberGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#ea580c"/>
    </linearGradient>
    <linearGradient id="iconGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${slide.iconColors[0]}"/>
      <stop offset="100%" stop-color="${slide.iconColors[1]}"/>
    </linearGradient>
  </defs>

  <!-- Ambient Dark Executive Background -->
  <rect width="1080" height="1920" fill="url(#bgGrad)"/>
  <circle cx="540" cy="360" r="360" fill="#f59e0b" fill-opacity="0.11"/>
  <circle cx="820" cy="1280" r="420" fill="#38bdf8" fill-opacity="0.09"/>

  <!-- Top Hook Headline -->
  <rect x="380" y="175" width="140" height="64" rx="16" fill="url(#amberGrad)"/>
  <text x="450" y="218" text-anchor="middle" fill="#090d16" font-family="Inter, Arial, sans-serif" font-weight="900" font-size="30">AI PRO</text>
  <text x="565" y="236" fill="#ffffff" stroke="#000000" stroke-width="8" font-family="Inter, Arial, sans-serif" font-style="italic" font-weight="900" font-size="104">6</text>

  <text x="540" y="310" text-anchor="middle" fill="#ffffff" stroke="#000000" stroke-width="8" font-family="Inter, Arial, sans-serif" font-style="italic" font-weight="900" font-size="50">AI systems we build &amp; train</text>
  <text x="540" y="372" text-anchor="middle" fill="#ffffff" stroke="#000000" stroke-width="8" font-family="Inter, Arial, sans-serif" font-style="italic" font-weight="900" font-size="50">inside your company this week</text>

  <!-- Center VisionOS Frosted Glass Card -->
  <rect x="82" y="460" width="916" height="880" rx="48" fill="url(#glassGrad)" stroke="rgba(255,255,255,0.38)" stroke-width="2.5"/>

  <!-- Segmented 6-Step Progress Bar -->
  ${bars}

  <!-- Pill: System 0X of 6 -->
  <rect x="146" y="565" width="240" height="58" rx="29" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.28)" stroke-width="1.5"/>
  <text x="266" y="603" text-anchor="middle" fill="#ffffff" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="26">System ${slide.index} of 6</text>

  <!-- Thin Architectural Index Number -->
  <text x="930" y="638" text-anchor="end" fill="rgba(255,255,255,0.85)" font-family="Inter, Arial, sans-serif" font-weight="200" font-size="112">${slide.index}</text>

  <!-- 3D App Icon Box + Title -->
  <rect x="146" y="695" width="118" height="118" rx="30" fill="url(#iconGrad)" stroke="rgba(255,255,255,0.45)" stroke-width="2"/>
  <text x="205" y="775" text-anchor="middle" font-family="Segoe UI Emoji, Apple Color Emoji, sans-serif" font-size="56">${slide.iconEmoji}</text>
  <text x="298" y="774" fill="#ffffff" font-family="Inter, Arial, sans-serif" font-weight="800" font-size="56">${slide.title}</text>

  <!-- Outcome Description -->
  <text x="146" y="890" fill="rgba(255,255,255,0.95)" font-family="Inter, Arial, sans-serif" font-weight="500" font-size="38">${slide.line1}</text>
  <text x="146" y="946" fill="rgba(255,255,255,0.95)" font-family="Inter, Arial, sans-serif" font-weight="500" font-size="38">${slide.line2}</text>
  <text x="146" y="1002" fill="rgba(255,255,255,0.95)" font-family="Inter, Arial, sans-serif" font-weight="500" font-size="38">${slide.line3}</text>

  <!-- SETUP Section -->
  <text x="146" y="1115" fill="rgba(255,255,255,0.60)" font-family="Inter, Arial, sans-serif" font-weight="700" font-size="24" letter-spacing="2">SETUP</text>

  <!-- Pill 1 -->
  <rect x="146" y="1140" width="260" height="58" rx="18" fill="rgba(15,23,42,0.68)" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/>
  <text x="276" y="1178" text-anchor="middle" fill="#ffffff" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="25">${slide.pills[0]}</text>

  <text x="425" y="1178" fill="#ffffff" font-family="Inter, Arial, sans-serif" font-weight="700" font-size="28">+</text>

  <!-- Pill 2 -->
  <rect x="452" y="1140" width="265" height="58" rx="18" fill="rgba(15,23,42,0.68)" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/>
  <text x="584" y="1178" text-anchor="middle" fill="#ffffff" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="25">${slide.pills[1]}</text>

  <!-- Pill 3 (Second Row) -->
  <text x="156" y="1254" fill="#ffffff" font-family="Inter, Arial, sans-serif" font-weight="700" font-size="28">+</text>
  <rect x="186" y="1215" width="330" height="58" rx="18" fill="rgba(15,23,42,0.68)" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/>
  <text x="351" y="1253" text-anchor="middle" fill="#fbbf24" font-family="Inter, Arial, sans-serif" font-weight="700" font-size="25">${slide.pills[2]}</text>

  <!-- Footer Watermark -->
  <text x="540" y="1850" text-anchor="middle" fill="rgba(255,255,255,0.75)" font-family="Inter, Arial, sans-serif" font-weight="700" font-size="26">AI DYNAMIC PRO • aidynamic.pro • (786) 643-2099</text>
</svg>`
}

SLIDES.forEach((s) => {
  const filePath = path.join(OUT_DIR, `system-${s.index}.svg`)
  fs.writeFileSync(filePath, buildSlideSvg(s), 'utf8')
  console.log(`Generated: ${filePath}`)
})
