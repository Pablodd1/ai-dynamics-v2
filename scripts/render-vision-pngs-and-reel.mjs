#!/usr/bin/env node
/**
 * Renders the 7-Slide VisionOS Frosted-Glass Deck (01..06 + CTA "BUILD")
 * over our photorealistic executive background into 1080x1920 PNGs using headless Chrome,
 * and compiles a 14-second 1080x1920 MP4 Reel via FFmpeg.
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_DIR = path.resolve(ROOT, 'public/social/vision-deck')
const ARTIFACT_DIR = 'C:/Users/jasme/.gemini/antigravity/brain/27484f43-9086-42f6-97e8-7b5227184c22'
const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe'

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true })
}

const bgFile = path.resolve(ROOT, 'public/social/week1-consulting.jpg')
const bgBase64 = `data:image/jpeg;base64,${fs.readFileSync(bgFile).toString('base64')}`

const SLIDES = [
  {
    step: 1,
    index: '01',
    title: 'JAss Voice Agent',
    desc: 'Picks up the phone in 3 seconds in English & Spanish, answers the questions and books the appointment, so no call gets missed.',
    iconEmoji: '📞',
    iconBg: 'linear-gradient(135deg, #34d399 0%, #059669 100%)',
    pills: [
      { icon: '✴️', text: 'JAss Voice AI', accent: '#fcd34d' },
      { icon: '🌐', text: 'Bilingual EN / ES' },
      { icon: '📅', text: 'Live Calendar & CRM Sync' },
    ],
  },
  {
    step: 2,
    index: '02',
    title: 'WhatsApp Agent',
    desc: 'Answers every message on your business WhatsApp, IG DM & web chat in 30 seconds, qualifies the budget, then books the client in.',
    iconEmoji: '💬',
    iconBg: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)',
    pills: [
      { icon: '✴️', text: 'JAss Omnichannel', accent: '#6ee7b7' },
      { icon: '⚡', text: '30-Sec Closer Skill' },
      { icon: '📲', text: 'WhatsApp + IG + Web' },
    ],
  },
  {
    step: 3,
    index: '03',
    title: 'Payroll & Admin Saver',
    desc: 'We walk into your company ($99 Audit) and automate intake forms, billing codes, and manual copy-pasting wasting $3,420/month.',
    iconEmoji: '⚡',
    iconBg: 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)',
    pills: [
      { icon: '✴️', text: '$99 On-Site Audit', accent: '#7dd3fc' },
      { icon: '🧾', text: 'Zero Manual Data Entry' },
      { icon: '💰', text: '$2,500+/mo ROI Guarantee' },
    ],
  },
  {
    step: 4,
    index: '04',
    title: 'Cold Email Machine',
    desc: 'Finds B2B decision-makers in your industry, writes and sends executive outreach sequences, then drafts the hot replies for you.',
    iconEmoji: '✉️',
    iconBg: 'linear-gradient(135deg, #60a5fa 0%, #1d4ed8 100%)',
    pills: [
      { icon: '✴️', text: 'AI Dynamic Lead Engine', accent: '#93c5fd' },
      { icon: '📬', text: 'Brevo + CRM Sync' },
      { icon: '🎯', text: 'Verified Miami & US Leads' },
    ],
  },
  {
    step: 5,
    index: '05',
    title: '48-Hr Custom AI App',
    desc: 'Give us your #1 bottleneck and our AI Developers engineer a working custom application in 48 hours—or you pay $0.',
    iconEmoji: '🛠️',
    iconBg: 'linear-gradient(135deg, #fbbf24 0%, #ea580c 100%)',
    pills: [
      { icon: '✴️', text: 'AI Dynamic Engineers', accent: '#fcd34d' },
      { icon: '🚀', text: '48-Hour Live Prototype' },
      { icon: '🛡️', text: '$30,000/yr Savings Guarantee' },
    ],
  },
  {
    step: 6,
    index: '06',
    title: 'Staff AI Bootcamp',
    desc: 'We stay with your company and train up to 15 employees hands-on ($497) so 1 AI-trained staff member produces the output of 5.',
    iconEmoji: '🎓',
    iconBg: 'linear-gradient(135deg, #a855f7 0%, #c026d3 100%)',
    pills: [
      { icon: '✴️', text: 'On-Site Corporate Training', accent: '#d8b4fe' },
      { icon: '📘', text: 'Department Playbooks' },
      { icon: '🔥', text: '1 Employee = 5x Output' },
    ],
  },
  {
    step: 6,
    index: 'CTA',
    isCta: true,
    ctaWord: '"BUILD"',
    ctaSub: 'and we will engineer a live 48-hour AI prototype for your company + train your team 🔗',
  },
]

function buildHtml(slide) {
  const barsHtml = [1, 2, 3, 4, 5, 6]
    .map((b) => {
      const active = slide.isCta || b === slide.step
      const done = b < slide.step
      const bg = active
        ? 'linear-gradient(90deg, #fbbf24, #ea580c)'
        : done
        ? 'rgba(255,255,255,0.68)'
        : 'rgba(255,255,255,0.22)'
      return `<div style="width:66px;height:9px;border-radius:99px;background:${bg};box-shadow:${
        active ? '0 0 14px rgba(251,191,36,0.75)' : 'none'
      };"></div>`
    })
    .join('')

  const cardInner = !slide.isCta
    ? `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:44px;">
        <div style="padding:14px 28px;border-radius:999px;background:rgba(255,255,255,0.13);border:1.5px solid rgba(255,255,255,0.25);font-size:26px;font-weight:600;color:rgba(255,255,255,0.92);">
          System ${slide.index} of 6
        </div>
        <div style="font-size:108px;font-weight:200;color:rgba(255,255,255,0.85);line-height:0.9;letter-spacing:-3px;">
          ${slide.index}
        </div>
      </div>

      <div style="display:flex;align-items:center;gap:32px;margin-bottom:38px;">
        <div style="width:118px;height:118px;border-radius:30px;background:${slide.iconBg};display:flex;align-items:center;justify-content:center;font-size:58px;box-shadow:0 18px 35px rgba(0,0,0,0.45), inset 0 2px 3px rgba(255,255,255,0.45);border:2px solid rgba(255,255,255,0.35);flex-shrink:0;">
          ${slide.iconEmoji}
        </div>
        <div style="font-size:58px;font-weight:800;color:#ffffff;letter-spacing:-1.2px;line-height:1.08;">
          ${slide.title}
        </div>
      </div>

      <div style="font-size:39px;font-weight:500;color:rgba(255,255,255,0.96);line-height:1.38;margin-bottom:54px;">
        ${slide.desc}
      </div>

      <div style="margin-top:auto;">
        <div style="font-size:23px;font-weight:700;letter-spacing:3px;color:rgba(255,255,255,0.58);margin-bottom:22px;">
          SETUP
        </div>
        <div style="display:flex;flex-wrap:wrap;align-items:center;gap:14px;">
          <div style="padding:14px 24px;border-radius:18px;background:rgba(15,23,42,0.58);border:1.5px solid rgba(255,255,255,0.22);font-size:27px;font-weight:600;color:${slide.pills[0].accent || '#fff'};">
            ${slide.pills[0].icon} ${slide.pills[0].text}
          </div>
          <span style="font-size:30px;font-weight:700;color:rgba(255,255,255,0.8);">+</span>
          <div style="padding:14px 24px;border-radius:18px;background:rgba(15,23,42,0.58);border:1.5px solid rgba(255,255,255,0.22);font-size:27px;font-weight:600;color:#ffffff;">
            ${slide.pills[1].icon} ${slide.pills[1].text}
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:14px;margin-top:16px;">
          <span style="font-size:30px;font-weight:700;color:rgba(255,255,255,0.8);padding-left:6px;">+</span>
          <div style="padding:14px 24px;border-radius:18px;background:rgba(15,23,42,0.58);border:1.5px solid rgba(255,255,255,0.22);font-size:27px;font-weight:600;color:#fde68a;">
            ${slide.pills[2].icon} ${slide.pills[2].text}
          </div>
        </div>
      </div>
    `
    : `
      <div style="margin:auto 0;text-align:center;">
        <div style="font-size:42px;font-weight:600;color:rgba(255,255,255,0.92);margin-bottom:32px;">
          💬 Comment
        </div>
        <div style="display:inline-block;padding:28px 74px;border-radius:30px;background:linear-gradient(135deg, rgba(245,158,11,0.72), rgba(234,88,12,0.72));border:2.5px solid rgba(253,224,71,0.75);box-shadow:0 20px 50px rgba(245,158,11,0.4);font-size:78px;font-weight:900;color:#ffffff;letter-spacing:2px;margin-bottom:40px;">
          ${slide.ctaWord}
        </div>
        <div style="font-size:40px;font-weight:600;color:#ffffff;line-height:1.38;max-width:680px;margin:0 auto;">
          ${slide.ctaSub}
        </div>
      </div>
    `

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1080px;
    height: 1920px;
    overflow: hidden;
    font-family: 'Segoe UI', Inter, -apple-system, BlinkMacSystemFont, sans-serif;
    background: #070b14;
    position: relative;
  }
  .bg {
    position: absolute;
    inset: 0;
    background-image: url('${bgBase64}');
    background-size: cover;
    background-position: center;
    filter: brightness(0.46) contrast(1.08) saturate(1.12);
    transform: scale(1.04);
  }
  .vignette {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(5,8,18,0.68) 0%, rgba(5,8,18,0.22) 45%, rgba(5,8,18,0.82) 100%);
  }
  .hook {
    position: absolute;
    top: 175px;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 10;
  }
  .hook-top {
    display: inline-flex;
    align-items: center;
    gap: 18px;
    margin-bottom: 10px;
  }
  .robot-badge {
    padding: 10px 22px;
    border-radius: 16px;
    background: linear-gradient(135deg, #fbbf24, #ea580c);
    color: #090d16;
    font-weight: 900;
    font-size: 30px;
    letter-spacing: 1px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.6);
    border: 3px solid #000;
  }
  .big-six {
    font-size: 108px;
    font-weight: 900;
    font-style: italic;
    color: #ffffff;
    line-height: 0.9;
    -webkit-text-stroke: 7px #000000;
    paint-order: stroke fill;
    text-shadow: 0 6px 18px rgba(0,0,0,0.85);
  }
  .hook-line {
    font-size: 52px;
    font-weight: 900;
    font-style: italic;
    color: #ffffff;
    line-height: 1.16;
    -webkit-text-stroke: 8px #000000;
    paint-order: stroke fill;
    text-shadow: 0 4px 14px rgba(0,0,0,0.9);
  }
  .glass-card {
    position: absolute;
    top: 475px;
    left: 82px;
    width: 916px;
    height: 890px;
    border-radius: 52px;
    background: linear-gradient(145deg, rgba(255,255,255,0.19) 0%, rgba(255,255,255,0.10) 55%, rgba(15,23,42,0.48) 100%);
    backdrop-filter: blur(32px) saturate(140%);
    -webkit-backdrop-filter: blur(32px) saturate(140%);
    border: 2.5px solid rgba(255,255,255,0.34);
    box-shadow: 0 35px 90px rgba(0,0,0,0.65), inset 0 2px 2px rgba(255,255,255,0.42);
    padding: 46px 64px 58px 64px;
    display: flex;
    flex-direction: column;
    z-index: 10;
  }
  .bars {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-bottom: 42px;
  }
  .footer {
    position: absolute;
    bottom: 68px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 26px;
    font-weight: 700;
    color: rgba(255,255,255,0.78);
    letter-spacing: 1px;
    z-index: 10;
    text-shadow: 0 2px 10px rgba(0,0,0,0.9);
  }
</style>
</head>
<body>
  <div class="bg"></div>
  <div class="vignette"></div>

  <div class="hook">
    <div class="hook-top">
      <span class="robot-badge">AI PRO</span>
      <span class="big-six">6</span>
    </div>
    <div class="hook-line">AI systems we build &amp; train</div>
    <div class="hook-line">inside your company this week</div>
  </div>

  <div class="glass-card">
    <div class="bars">${barsHtml}</div>
    ${cardInner}
  </div>

  <div class="footer">AI DYNAMIC PRO • aidynamic.pro • (786) 643-2099</div>
</body>
</html>`
}

for (let i = 0; i < SLIDES.length; i++) {
  const slide = SLIDES[i]
  const htmlPath = path.join(OUT_DIR, `temp_slide_${i + 1}.html`)
  const pngName = `vision_slide_0${i + 1}.png`
  const pngPath = path.join(OUT_DIR, pngName)
  const artifactPngPath = path.join(ARTIFACT_DIR, pngName)

  fs.writeFileSync(htmlPath, buildHtml(slide), 'utf8')

  execFileSync(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--window-size=1080,1920',
    `--screenshot=${pngPath}`,
    `file:///${htmlPath.replace(/\\/g, '/')}`,
  ])

  fs.copyFileSync(pngPath, artifactPngPath)
  fs.unlinkSync(htmlPath)
  console.log(`Rendered PNG: ${pngPath}`)
}
