#!/usr/bin/env node
/**
 * Renders the Bespoke AI Dynamic Pro 7-Slide Obsidian & Champagne-Gold Architectural Deck
 * (#07070c Obsidian, #c9a96e Luxury Gold, #f7e7ce Champagne, #06b6d4 Cyan — ZERO icons/emojis)
 * into 1080x1920 PNGs via headless Chrome and compiles a 15s MP4 Reel via FFmpeg.
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
    sector: 'ARCHITECTURE 01 OF 06 • HEALTHCARE & CLINICAL',
    metric: '-45% CLINICAL ADMIN OVERHEAD • ZERO MANUAL DATA ENTRY',
    title: 'Clinical & RCM Intelligence',
    desc: 'We walk into medical practices and engineer ambient physician charting, automated 837 claim scrubbing, and insurance OCR intake—cutting 45% of admin payroll while training your staff to handle 4x volume.',
    pills: ['AMBIENT SOAP SCRIBE', '837 CLAIM ENGINE', 'ON-SITE STAFF TRAINING'],
  },
  {
    step: 2,
    index: '02',
    sector: 'ARCHITECTURE 02 OF 06 • COMPUTER VISION & 3D',
    metric: '3-SECOND NEURAL INSPECTION • MILLIMETER LIDAR PRECISION',
    title: 'Neural Vision & Spatial AI',
    desc: 'Replace slow human inspections with 3-second computer vision. We engineer custom YOLOv8 and DINOv2 models for macro luxury authentication, 12-class property defect vision, and 3D LiDAR floorplans.',
    pills: ['YOLOv8 + DINOv2 VISION', '3D LIDAR DIGITAL TWIN', 'AUTO PDF CERTIFICATION'],
  },
  {
    step: 3,
    index: '03',
    sector: 'ARCHITECTURE 03 OF 06 • AUTONOMOUS REVOPS',
    metric: '3-SECOND RING-1 ANSWER • $997 TURNKEY OR $297/MO',
    title: 'JAss Voice & CRM Pipeline',
    desc: '38% of callers hang up on voicemail and 47-minute human replies kill 78% of deals. Our JAss bilingual voice and CRM architecture answers on Ring 1 in English and Spanish and books retainers in 3 seconds.',
    pills: ['JASS BILINGUAL VOICE', 'SUB-MINUTE REVOPS', 'LIVE CALENDAR SYNC'],
  },
  {
    step: 4,
    index: '04',
    sector: 'ARCHITECTURE 04 OF 06 • LEGAL & REAL ESTATE',
    metric: '-15 HRS/WK PARALEGAL & BROKER ADMIN • ZERO MISSED CUTOFFS',
    title: 'Private RAG & Deal Matching',
    desc: 'Eliminate 15+ hours a week of paralegal and brokerage bottlenecks. Sovereign document RAG screens agreements for risk clauses in seconds, tracks escrow cutoffs, and matches off-market investor mandates.',
    pills: ['SOVEREIGN DOCUMENT RAG', 'VECTOR DEAL MATCH', 'ESCROW TELEMETRY'],
  },
  {
    step: 5,
    index: '05',
    sector: 'ARCHITECTURE 05 OF 06 • KINEMATICS & AGENTIC WEB',
    metric: '33-JOINT POSE VISION • 5-10 DAY PRODUCTION LAUNCH',
    title: 'Biomechanics & Agentic Web',
    desc: 'From 33-joint smartphone gait kinematics and daily biometric adaptation to self-learning Agentic Websites structured for Google and ChatGPT citations, we build category-defining proprietary software.',
    pills: ['33-JOINT KINEMATICS', 'SELF-LEARNING WEB UX', 'SCHEMA.ORG LLM GRAPH'],
  },
  {
    step: 6,
    index: '06',
    sector: 'ARCHITECTURE 06 OF 06 • WORKFORCE MULTIPLICATION',
    metric: '$99 60-MIN AUDIT • $497 CORPORATE BOOTCAMP (1 STAFF = 5X)',
    title: '48-Hr Build & Staff Bootcamp',
    desc: 'We build a working AI prototype in 48 hours—guaranteed to uncover $2,500+/month ($30K/yr) in savings or you pay $0—and stay on-site training your staff until 1 employee produces the output of 5.',
    pills: ['48-HOUR LIVE PROTOTYPE', '$30,000/YR GUARANTEE', 'ON-SITE TEAM TRAINING'],
  },
  {
    step: 6,
    index: 'MANDATE',
    isCta: true,
    ctaWord: '"SCALE"',
    ctaSub: 'We will walk into your company, engineer a live 48-hour AI prototype—guaranteed to uncover $2,500+/month in savings or you pay $0—and train your staff.',
  },
]

function buildHtml(slide) {
  const barsHtml = [1, 2, 3, 4, 5, 6]
    .map((b) => {
      const active = slide.isCta || b === slide.step
      const done = b < slide.step
      const bg = active
        ? '#c9a96e'
        : done
        ? 'rgba(247, 231, 206, 0.55)'
        : 'rgba(255, 255, 255, 0.16)'
      return `<div style="width:68px;height:5px;border-radius:99px;background:${bg};box-shadow:${
        active ? '0 0 14px rgba(201,169,110,0.85)' : 'none'
      };"></div>`
    })
    .join('')

  const cardInner = !slide.isCta
    ? `
      <div style="display:flex;align-items:flex-start;justify-content:space-between;padding-bottom:34px;margin-bottom:42px;border-bottom:1px solid rgba(255,255,255,0.12);">
        <div>
          <div style="font-size:20px;font-weight:600;letter-spacing:3.2px;color:#c9a96e;margin-bottom:12px;">
            ${slide.sector}
          </div>
          <div style="font-size:19px;font-weight:600;letter-spacing:1.8px;color:#22d3ee;">
            ${slide.metric}
          </div>
        </div>
        <div style="font-family:Georgia, 'Playfair Display', serif;font-size:112px;font-weight:300;color:rgba(247,231,206,0.92);line-height:0.82;letter-spacing:-3px;">
          ${slide.index}
        </div>
      </div>

      <div style="font-family:Georgia, 'Playfair Display', serif;font-size:62px;font-weight:700;color:#ffffff;letter-spacing:-1px;line-height:1.1;margin-bottom:34px;">
        ${slide.title}
      </div>

      <div style="font-size:36px;font-weight:400;color:rgba(232,232,232,0.94);line-height:1.46;margin-bottom:54px;">
        ${slide.desc}
      </div>

      <div style="margin-top:auto;">
        <div style="font-size:19px;font-weight:600;letter-spacing:3.5px;color:rgba(160,160,168,0.85);margin-bottom:22px;">
          PRODUCTION ARCHITECTURE &amp; DEPLOYMENT
        </div>
        <div style="display:flex;flex-wrap:wrap;align-items:center;gap:14px;">
          <div style="padding:14px 24px;border-radius:10px;background:rgba(7,7,12,0.88);border:1.2px solid rgba(255,255,255,0.22);font-size:22px;font-weight:600;letter-spacing:1.5px;color:#ffffff;">
            ${slide.pills[0]}
          </div>
          <span style="font-size:26px;font-weight:600;color:#c9a96e;">/</span>
          <div style="padding:14px 24px;border-radius:10px;background:rgba(7,7,12,0.88);border:1.2px solid rgba(255,255,255,0.22);font-size:22px;font-weight:600;letter-spacing:1.5px;color:#ffffff;">
            ${slide.pills[1]}
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:14px;margin-top:16px;">
          <span style="font-size:26px;font-weight:600;color:#c9a96e;padding-left:4px;">/</span>
          <div style="padding:14px 26px;border-radius:10px;background:rgba(201,169,110,0.12);border:1.2px solid rgba(201,169,110,0.65);font-size:22px;font-weight:600;letter-spacing:1.5px;color:#f7e7ce;">
            ${slide.pills[2]}
          </div>
        </div>
      </div>
    `
    : `
      <div style="margin:auto 0;text-align:center;">
        <div style="font-size:22px;font-weight:600;letter-spacing:4px;color:#c9a96e;margin-bottom:36px;">
          EXECUTIVE DECISION PROTOCOL — COMMENT BELOW
        </div>
        <div style="display:inline-block;padding:30px 84px;border-radius:18px;background:linear-gradient(135deg, #c9a96e 0%, #a0894e 100%);box-shadow:0 24px 60px rgba(201,169,110,0.35);font-family:Georgia, 'Playfair Display', serif;font-size:80px;font-weight:700;color:#07070c;letter-spacing:3px;margin-bottom:46px;">
          ${slide.ctaWord}
        </div>
        <div style="font-size:36px;font-weight:400;color:#ffffff;line-height:1.48;max-width:720px;margin:0 auto 38px auto;">
          ${slide.ctaSub}
        </div>
        <div style="display:inline-block;padding:14px 32px;border-radius:10px;border:1px solid rgba(201,169,110,0.5);background:rgba(7,7,12,0.8);font-size:21px;font-weight:600;letter-spacing:2.5px;color:#f7e7ce;">
          AIDYNAMIC.PRO/BOOKING   •   $99 AUDIT / 48-HR PROTOTYPE
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
    font-family: Inter, 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
    background: #07070c;
    position: relative;
  }
  .bg {
    position: absolute;
    inset: 0;
    background-image: url('${bgBase64}');
    background-size: cover;
    background-position: center;
    filter: brightness(0.32) contrast(1.15) saturate(0.85);
    transform: scale(1.04);
  }
  .vignette {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(7,7,12,0.88) 0%, rgba(10,10,15,0.45) 45%, rgba(5,5,10,0.94) 100%);
  }
  .hook {
    position: absolute;
    top: 170px;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 10;
  }
  .kicker {
    font-size: 21px;
    font-weight: 600;
    letter-spacing: 5px;
    color: #c9a96e;
    margin-bottom: 18px;
  }
  .gold-rule {
    width: 180px;
    height: 1.5px;
    background: rgba(201, 169, 110, 0.5);
    margin: 0 auto 24px auto;
  }
  .hook-line-1 {
    font-family: Georgia, 'Playfair Display', serif;
    font-size: 56px;
    font-weight: 700;
    color: #ffffff;
    line-height: 1.15;
    letter-spacing: -0.5px;
  }
  .hook-line-2 {
    font-family: Georgia, 'Playfair Display', serif;
    font-size: 52px;
    font-style: italic;
    font-weight: 400;
    color: #f7e7ce;
    line-height: 1.2;
    margin-top: 4px;
  }
  .glass-card {
    position: absolute;
    top: 445px;
    left: 76px;
    width: 928px;
    height: 940px;
    border-radius: 36px;
    background: linear-gradient(145deg, rgba(26,26,36,0.84) 0%, rgba(15,15,22,0.78) 55%, rgba(10,10,15,0.92) 100%);
    backdrop-filter: blur(36px);
    -webkit-backdrop-filter: blur(36px);
    border: 2px solid rgba(201,169,110,0.52);
    box-shadow: 0 40px 100px rgba(0,0,0,0.85), inset 0 1px 1px rgba(247,231,206,0.28);
    padding: 46px 68px 62px 68px;
    display: flex;
    flex-direction: column;
    z-index: 10;
  }
  .bars {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-bottom: 48px;
  }
  .footer {
    position: absolute;
    bottom: 68px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 22px;
    font-weight: 600;
    color: rgba(201,169,110,0.88);
    letter-spacing: 3.5px;
    z-index: 10;
  }
</style>
</head>
<body>
  <div class="bg"></div>
  <div class="vignette"></div>

  <div class="hook">
    <div class="kicker">AI DYNAMIC PRO • EXECUTIVE ARCHITECTURE</div>
    <div class="gold-rule"></div>
    <div class="hook-line-1">Six Production AI Architectures</div>
    <div class="hook-line-2">Engineered Inside Your Company</div>
  </div>

  <div class="glass-card">
    <div class="bars">${barsHtml}</div>
    ${cardInner}
  </div>

  <div class="footer">AI DYNAMIC PRO &nbsp;|&nbsp; AIDYNAMIC.PRO &nbsp;|&nbsp; +1 (786) 643-2099</div>
</body>
</html>`
}

for (let i = 0; i < SLIDES.length; i++) {
  const slide = SLIDES[i]
  const htmlPath = path.join(OUT_DIR, `temp_slide_${i + 1}.html`)
  const pngName = `vision_slide_0${i + 1}.png`
  const pngPath = path.join(OUT_DIR, pngName)
  const artifactPngPath = path.join(ARTIFACT_DIR, `bespoke_${pngName}`)

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
  console.log(`Rendered Bespoke PNG: ${pngPath}`)
}
