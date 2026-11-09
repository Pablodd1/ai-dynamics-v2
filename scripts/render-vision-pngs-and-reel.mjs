#!/usr/bin/env node
/**
 * Renders:
 * 1) Official Google Business Profile Square Logo (1080x1080), Crest Card (1080x1080),
 *    and 16:9 Cover Banner (1920x1080) in AI Dynamic Pro's Obsidian & Champagne-Gold palette.
 * 2) All 7 VisionOS Architecture Slides (1080x1920) stamped with the Official AI Dynamic Pro Logo Crest.
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_DIR = path.resolve(ROOT, 'public/social/vision-deck')
const LOGO_DIR = path.resolve(ROOT, 'public/social/gbp-logos')
const ARTIFACT_DIR = 'C:/Users/jasme/.gemini/antigravity/brain/27484f43-9086-42f6-97e8-7b5227184c22'
const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe'

for (const d of [OUT_DIR, LOGO_DIR]) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true })
}

const bgFile = path.resolve(ROOT, 'public/social/week1-consulting.jpg')
const bgBase64 = `data:image/jpeg;base64,${fs.readFileSync(bgFile).toString('base64')}`

const AI_LOGO_SVG = (size = 84) => `
<svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f7e7ce" />
      <stop offset="45%" stop-color="#c9a96e" />
      <stop offset="100%" stop-color="#9a7b3e" />
    </linearGradient>
    <linearGradient id="goldGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#f7e7ce" />
    </linearGradient>
  </defs>
  <path d="M50 5 L93.3 30 V80 L50 95 L6.7 80 V30 Z" stroke="url(#goldGrad)" stroke-width="3.2" fill="rgba(201, 169, 110, 0.14)" />
  <path d="M50 18 L50 40 M33 31 L50 40 L67 31" stroke="url(#goldGrad)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  <circle cx="50" cy="18" r="3.8" fill="url(#goldGradLight)" />
  <circle cx="33" cy="31" r="3.2" fill="url(#goldGradLight)" />
  <circle cx="67" cy="31" r="3.2" fill="url(#goldGradLight)" />
  <circle cx="50" cy="40" r="3.8" fill="url(#goldGrad)" />
  <text x="50" y="73" text-anchor="middle" fill="url(#goldGrad)" font-size="25" font-weight="800" font-family="Georgia, 'Playfair Display', serif" letter-spacing="2">AI</text>
  <circle cx="20" cy="52" r="2" fill="rgba(247, 231, 206, 0.75)" />
  <circle cx="80" cy="52" r="2" fill="rgba(247, 231, 206, 0.75)" />
  <circle cx="50" cy="87" r="2" fill="rgba(247, 231, 206, 0.75)" />
</svg>`

// 1. Render Official Google Business Profile Square Avatar Logo (1080x1080)
function buildSquareLogoHtml() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1080px;
    height: 1080px;
    overflow: hidden;
    background: radial-gradient(circle at 50% 42%, #171726 0%, #090910 58%, #050509 100%);
    font-family: Inter, 'Segoe UI', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .ring-outer {
    position: absolute;
    width: 940px;
    height: 940px;
    border-radius: 50%;
    border: 2px solid rgba(201, 169, 110, 0.35);
    box-shadow: 0 0 90px rgba(201, 169, 110, 0.14), inset 0 0 70px rgba(201, 169, 110, 0.08);
  }
  .ring-inner {
    position: absolute;
    width: 880px;
    height: 880px;
    border-radius: 50%;
    border: 1px solid rgba(247, 231, 206, 0.18);
  }
  .crest-wrap {
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .brand-name {
    margin-top: 34px;
    font-family: Georgia, 'Playfair Display', serif;
    font-size: 76px;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.5px;
    line-height: 1.05;
  }
  .brand-name span {
    color: #c9a96e;
  }
  .rule {
    width: 220px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #c9a96e, transparent);
    margin: 22px auto 18px auto;
  }
  .tagline {
    font-size: 23px;
    font-weight: 700;
    letter-spacing: 5.5px;
    color: #f7e7ce;
    text-transform: uppercase;
  }
  .sub-city {
    margin-top: 12px;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 4px;
    color: #22d3ee;
    text-transform: uppercase;
  }
</style>
</head>
<body>
  <div class="ring-outer"></div>
  <div class="ring-inner"></div>
  <div class="crest-wrap">
    ${AI_LOGO_SVG(430)}
    <div class="brand-name">AI Dynamic<span>.PRO</span></div>
    <div class="rule"></div>
    <div class="tagline">AI DEVELOPERS &bull; APPS &bull; TRAINING</div>
    <div class="sub-city">MIAMI &bull; SOUTH FLORIDA</div>
  </div>
</body>
</html>`
}

// 2. Render Official Google Business Profile 16:9 Cover Photo (1920x1080)
function buildCoverPhotoHtml() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1920px;
    height: 1080px;
    overflow: hidden;
    background: #07070c;
    font-family: Inter, 'Segoe UI', sans-serif;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 84px 110px;
  }
  .bg {
    position: absolute;
    inset: 0;
    background-image: url('${bgBase64}');
    background-size: cover;
    background-position: center;
    filter: brightness(0.26) contrast(1.18) saturate(0.85);
  }
  .vignette {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(7,7,12,0.96) 0%, rgba(7,7,12,0.82) 58%, rgba(10,10,18,0.92) 100%);
  }
  .border-frame {
    position: absolute;
    inset: 34px;
    border: 1.5px solid rgba(201,169,110,0.42);
    border-radius: 28px;
    pointer-events: none;
    z-index: 5;
  }
  .left-col {
    position: relative;
    z-index: 10;
    max-width: 1080px;
  }
  .logo-bar {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-bottom: 36px;
  }
  .logo-title {
    font-family: Georgia, 'Playfair Display', serif;
    font-size: 46px;
    font-weight: 700;
    color: #ffffff;
  }
  .logo-title span { color: #c9a96e; }
  .logo-sub {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 4px;
    color: #c9a96e;
    margin-top: 4px;
  }
  .headline {
    font-family: Georgia, 'Playfair Display', serif;
    font-size: 64px;
    font-weight: 700;
    color: #ffffff;
    line-height: 1.12;
    margin-bottom: 26px;
  }
  .headline em {
    color: #f7e7ce;
    font-style: italic;
    font-weight: 400;
  }
  .subtext {
    font-size: 27px;
    color: rgba(232,232,238,0.92);
    line-height: 1.45;
    margin-bottom: 42px;
  }
  .pills {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  .pill {
    padding: 16px 28px;
    border-radius: 12px;
    background: rgba(201,169,110,0.14);
    border: 1.5px solid rgba(201,169,110,0.6);
    color: #f7e7ce;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 1.5px;
  }
  .pill-cyan {
    padding: 16px 28px;
    border-radius: 12px;
    background: rgba(34,211,238,0.1);
    border: 1.5px solid rgba(34,211,238,0.55);
    color: #22d3ee;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 1.5px;
  }
  .right-card {
    position: relative;
    z-index: 10;
    width: 520px;
    padding: 48px 42px;
    border-radius: 30px;
    background: linear-gradient(145deg, rgba(24,24,36,0.92) 0%, rgba(10,10,16,0.96) 100%);
    border: 2px solid rgba(201,169,110,0.58);
    box-shadow: 0 36px 90px rgba(0,0,0,0.85);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .right-tag {
    margin-top: 22px;
    font-size: 17px;
    font-weight: 700;
    letter-spacing: 3.5px;
    color: #c9a96e;
  }
  .right-guarantee {
    margin-top: 18px;
    font-family: Georgia, 'Playfair Display', serif;
    font-size: 34px;
    font-weight: 700;
    color: #ffffff;
    line-height: 1.25;
  }
  .right-es {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid rgba(255,255,255,0.14);
    font-size: 19px;
    color: #f7e7ce;
    line-height: 1.4;
  }
</style>
</head>
<body>
  <div class="bg"></div>
  <div class="vignette"></div>
  <div class="border-frame"></div>

  <div class="left-col">
    <div class="logo-bar">
      ${AI_LOGO_SVG(96)}
      <div>
        <div class="logo-title">AI Dynamic<span>.PRO</span></div>
        <div class="logo-sub">MIAMI &bull; SOUTH FLORIDA &bull; EN / ES</div>
      </div>
    </div>
    <div class="headline">
      We Come Into Your Business, Build Custom AI in 48 Hours &amp; <em>Train Your Staff.</em>
    </div>
    <div class="subtext">
      22+ Proven Systems for CEOs, Medical &amp; Dental Clinics, Law Firms, Real Estate Brokers, and Contractors. Turn 1 Existing Employee Into the Output of 5.
    </div>
    <div class="pills">
      <div class="pill">$99 CEO AUDIT + FREE 48-HR PROTOTYPE</div>
      <div class="pill">$497 ON-SITE STAFF BOOTCAMP</div>
      <div class="pill-cyan">JASS 24/7 BILINGUAL VOICE ($997)</div>
    </div>
  </div>

  <div class="right-card">
    ${AI_LOGO_SVG(210)}
    <div class="right-tag">EXECUTIVE GUARANTEE</div>
    <div class="right-guarantee">Save $2,500+/Mo in Payroll &amp; Time — Or You Pay $0.</div>
    <div class="right-es">Hablamos Espa&ntilde;ol &bull; Automatizaci&oacute;n con IA y Capacitaci&oacute;n en tu Empresa</div>
  </div>
</body>
</html>`
}

function renderHtmlToPng(htmlContent, outPath, width, height) {
  const tmpHtml = `${outPath}.tmp.html`
  fs.writeFileSync(tmpHtml, htmlContent, 'utf8')
  execFileSync(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    `--window-size=${width},${height}`,
    `--screenshot=${outPath}`,
    `file:///${tmpHtml.replace(/\\/g, '/')}`,
  ])
  fs.unlinkSync(tmpHtml)
}

const squareLogoPath = path.join(LOGO_DIR, 'gbp_official_logo_square.png')
const coverPhotoPath = path.join(LOGO_DIR, 'gbp_official_cover_1920x1080.png')

renderHtmlToPng(buildSquareLogoHtml(), squareLogoPath, 1080, 1080)
fs.copyFileSync(squareLogoPath, path.join(ARTIFACT_DIR, 'gbp_official_logo_square.png'))
console.log(`Rendered Official Square Logo: ${squareLogoPath}`)

renderHtmlToPng(buildCoverPhotoHtml(), coverPhotoPath, 1920, 1080)
fs.copyFileSync(coverPhotoPath, path.join(ARTIFACT_DIR, 'gbp_official_cover_1920x1080.png'))
console.log(`Rendered Official 16:9 Cover Photo: ${coverPhotoPath}`)

// 3. Re-render all 7 VisionOS Architecture Slides with the Official AI Dynamic Pro Logo Crest at Top
const SLIDES = [
  {
    step: 1,
    index: '01',
    sector: 'HEALTHCARE, DENTAL & MEDSPAS • EN / ES',
    metric: '-45% FRONT-DESK & BILLING OVERHEAD • ZERO MANUAL ENTRY',
    title: 'Clinical & RCM Intelligence',
    desc: 'We come into your clinic, automate 24/7 bilingual patient scheduling, mobile insurance card verification, clinical SOAP notes, and pre-submission claim checks—and train your staff to handle 4x volume.',
    pills: ['24/7 BILINGUAL SCHEDULING', 'AUTOMATED CLAIM REVIEW', 'ON-SITE STAFF TRAINING'],
  },
  {
    step: 2,
    index: '02',
    sector: 'CONTRACTORS, PROPERTY & LUXURY RETAIL',
    metric: '3-SECOND PHOTO-TO-QUOTE • 3D VIRTUAL WALKTHROUGHS',
    title: 'Custom Vision & Spatial Apps',
    desc: 'Stop wasting hours on manual inspections and estimates. Customers upload a smartphone photo or room scan and your custom AI detects defects, calculates repair costs, and sends a branded PDF quote.',
    pills: ['PHOTO-TO-QUOTE AI APP', '3D LIDAR WALKTHROUGHS', 'AUTO ESTIMATE FOLLOW-UP'],
  },
  {
    step: 3,
    index: '03',
    sector: '24/7 BILINGUAL PHONE & WHATSAPP RECEPTIONIST',
    metric: '3-SECOND RING-1 PICKUP • $997 TURNKEY OR $297/MO',
    title: 'JAss Voice & CRM Pipeline',
    desc: '78% of clients hire the first business that answers. JAss answers 100% of calls on Ring 1 in fluent English and Spanish, replies to WhatsApp/SMS/Instagram in seconds, and books your calendar 24/7.',
    pills: ['ENGLISH & SPANISH VOICE', 'WHATSAPP & DM AUTO-BOOK', 'LIVE CALENDAR & CRM SYNC'],
  },
  {
    step: 4,
    index: '04',
    sector: 'LAW FIRMS, REAL ESTATE BROKERS & TITLE',
    metric: '-15 HRS/WK ADMIN • 100-PAGE CONTRACT REVIEW IN SECONDS',
    title: 'Private Legal & Deal AI',
    desc: 'Qualify legal cases and property buyers in under 3 minutes 24/7, screen 100+ page contracts and leases inside your own private cloud, track escrow deadlines, and match buyers to listings automatically.',
    pills: ['PRIVATE CONTRACT REVIEW', 'ESCROW DEADLINE ALERTS', 'AUTOMATED BUYER MATCHING'],
  },
  {
    step: 5,
    index: '05',
    sector: 'SELF-SELLING WEBSITES & AI SEARCH (5-10 DAYS)',
    metric: 'RANK ON GOOGLE MAPS, CHATGPT & GEMINI • 24/7 CONVERSION',
    title: 'Agentic Websites & Custom Apps',
    desc: 'Static brochure websites lose 92% of visitors. In 5 to 10 days we build custom apps and self-adapting AI websites that talk to visitors in English and Spanish and turn traffic into booked appointments.',
    pills: ['5-10 DAY CUSTOM LAUNCH', 'GOOGLE & CHATGPT AEO', 'BUILT-IN VOICE CONCIERGE'],
  },
  {
    step: 6,
    index: '06',
    sector: 'ON-SITE AUDIT, 48-HR PROTOTYPE & STAFF BOOTCAMP',
    metric: '$99 60-MIN AUDIT • $497 STAFF BOOTCAMP (1 EMPLOYEE = 5)',
    title: '48-Hr Build & Staff Training',
    desc: 'We come to your business, build a working custom AI prototype in 48 hours—guaranteed to save $2,500+/month ($30K/yr) or you pay $0—and stay on-site training your staff until 1 employee equals 5.',
    pills: ['48-HOUR LIVE PROTOTYPE', '$2,500+/MO GUARANTEE', 'ON-SITE TEAM BOOTCAMP'],
  },
  {
    step: 6,
    index: 'MANDATE',
    isCta: true,
    ctaWord: 'CODE: SCALE99',
    ctaSub: 'We come into your business, build a working 48-hour AI prototype—guaranteed to uncover $2,500+/mo in payroll savings or you pay $0—and train your staff (English & Español).',
  },
]

function buildSlideHtml(slide) {
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
      <div style="display:flex;align-items:flex-start;justify-content:space-between;padding-bottom:30px;margin-bottom:36px;border-bottom:1px solid rgba(255,255,255,0.12);">
        <div>
          <div style="font-size:20px;font-weight:700;letter-spacing:3px;color:#c9a96e;margin-bottom:12px;">
            ${slide.sector}
          </div>
          <div style="font-size:19px;font-weight:700;letter-spacing:1.6px;color:#22d3ee;">
            ${slide.metric}
          </div>
        </div>
        <div style="font-family:Georgia, 'Playfair Display', serif;font-size:106px;font-weight:300;color:rgba(247,231,206,0.92);line-height:0.82;letter-spacing:-3px;">
          ${slide.index}
        </div>
      </div>

      <div style="font-family:Georgia, 'Playfair Display', serif;font-size:60px;font-weight:700;color:#ffffff;letter-spacing:-1px;line-height:1.1;margin-bottom:30px;">
        ${slide.title}
      </div>

      <div style="font-size:35px;font-weight:400;color:rgba(232,232,232,0.94);line-height:1.45;margin-bottom:46px;">
        ${slide.desc}
      </div>

      <div style="margin-top:auto;">
        <div style="font-size:18px;font-weight:700;letter-spacing:3.2px;color:rgba(201,169,110,0.85);margin-bottom:20px;">
          DEPLOYED INSIDE YOUR COMPANY &bull; HABLAMOS ESPA&Ntilde;OL
        </div>
        <div style="display:flex;flex-wrap:wrap;align-items:center;gap:14px;">
          <div style="padding:14px 24px;border-radius:10px;background:rgba(7,7,12,0.88);border:1.2px solid rgba(255,255,255,0.22);font-size:21px;font-weight:600;letter-spacing:1.5px;color:#ffffff;">
            ${slide.pills[0]}
          </div>
          <span style="font-size:26px;font-weight:600;color:#c9a96e;">/</span>
          <div style="padding:14px 24px;border-radius:10px;background:rgba(7,7,12,0.88);border:1.2px solid rgba(255,255,255,0.22);font-size:21px;font-weight:600;letter-spacing:1.5px;color:#ffffff;">
            ${slide.pills[1]}
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:14px;margin-top:16px;">
          <span style="font-size:26px;font-weight:600;color:#c9a96e;padding-left:4px;">/</span>
          <div style="padding:14px 26px;border-radius:10px;background:rgba(201,169,110,0.14);border:1.2px solid rgba(201,169,110,0.68);font-size:21px;font-weight:700;letter-spacing:1.5px;color:#f7e7ce;">
            ${slide.pills[2]}
          </div>
        </div>
      </div>
    `
    : `
      <div style="margin:auto 0;text-align:center;">
        <div style="display:flex;justify-content:center;margin-bottom:24px;">
          ${AI_LOGO_SVG(128)}
        </div>
        <div style="font-size:21px;font-weight:700;letter-spacing:4px;color:#c9a96e;margin-bottom:28px;">
          MIAMI &amp; SOUTH FLORIDA CEO OFFER
        </div>
        <div style="display:inline-block;padding:26px 68px;border-radius:18px;background:linear-gradient(135deg, #c9a96e 0%, #a0894e 100%);box-shadow:0 24px 60px rgba(201,169,110,0.35);font-family:Georgia, 'Playfair Display', serif;font-size:66px;font-weight:700;color:#07070c;letter-spacing:2px;margin-bottom:38px;">
          ${slide.ctaWord}
        </div>
        <div style="font-size:34px;font-weight:400;color:#ffffff;line-height:1.45;max-width:740px;margin:0 auto 34px auto;">
          ${slide.ctaSub}
        </div>
        <div style="display:inline-block;padding:14px 32px;border-radius:10px;border:1px solid rgba(201,169,110,0.55);background:rgba(7,7,12,0.85);font-size:21px;font-weight:700;letter-spacing:2.5px;color:#f7e7ce;">
          AIDYNAMIC.PRO/BOOKING &bull; $99 AUDIT + 48-HR PROTOTYPE
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
    filter: brightness(0.30) contrast(1.16) saturate(0.85);
    transform: scale(1.04);
  }
  .vignette {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(7,7,12,0.92) 0%, rgba(10,10,15,0.48) 45%, rgba(5,5,10,0.95) 100%);
  }
  .brand-header {
    position: absolute;
    top: 88px;
    left: 76px;
    right: 76px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 30px;
    border-radius: 20px;
    background: rgba(10, 10, 16, 0.82);
    border: 1.5px solid rgba(201, 169, 110, 0.48);
    z-index: 12;
  }
  .brand-left {
    display: flex;
    align-items: center;
    gap: 18px;
  }
  .brand-wordmark {
    font-family: Georgia, 'Playfair Display', serif;
    font-size: 34px;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.5px;
  }
  .brand-wordmark span {
    color: #c9a96e;
  }
  .brand-tag {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 3px;
    color: #f7e7ce;
    margin-top: 2px;
  }
  .brand-badge {
    padding: 10px 20px;
    border-radius: 99px;
    background: rgba(201, 169, 110, 0.16);
    border: 1px solid rgba(201, 169, 110, 0.55);
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 2.5px;
    color: #c9a96e;
  }
  .hook {
    position: absolute;
    top: 248px;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 10;
  }
  .hook-line-1 {
    font-family: Georgia, 'Playfair Display', serif;
    font-size: 52px;
    font-weight: 700;
    color: #ffffff;
    line-height: 1.14;
    letter-spacing: -0.5px;
  }
  .hook-line-2 {
    font-family: Georgia, 'Playfair Display', serif;
    font-size: 46px;
    font-style: italic;
    font-weight: 400;
    color: #f7e7ce;
    line-height: 1.2;
    margin-top: 6px;
  }
  .glass-card {
    position: absolute;
    top: 430px;
    left: 76px;
    width: 928px;
    height: 980px;
    border-radius: 36px;
    background: linear-gradient(145deg, rgba(26,26,36,0.88) 0%, rgba(15,15,22,0.82) 55%, rgba(10,10,15,0.94) 100%);
    border: 2px solid rgba(201,169,110,0.55);
    box-shadow: 0 40px 100px rgba(0,0,0,0.85), inset 0 1px 1px rgba(247,231,206,0.28);
    padding: 44px 64px 56px 64px;
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
    bottom: 64px;
    left: 76px;
    right: 76px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    font-size: 21px;
    font-weight: 700;
    color: rgba(247,231,206,0.92);
    letter-spacing: 3px;
    z-index: 10;
  }
</style>
</head>
<body>
  <div class="bg"></div>
  <div class="vignette"></div>

  <div class="brand-header">
    <div class="brand-left">
      ${AI_LOGO_SVG(68)}
      <div>
        <div class="brand-wordmark">AI Dynamic<span>.PRO</span></div>
        <div class="brand-tag">AI DEVELOPERS &bull; CUSTOM APPS &bull; STAFF TRAINING</div>
      </div>
    </div>
    <div class="brand-badge">MIAMI &bull; EN / ES</div>
  </div>

  <div class="hook">
    <div class="hook-line-1">We Build Custom AI In Your Business</div>
    <div class="hook-line-2">&amp; Train Your Staff So 1 Employee = 5</div>
  </div>

  <div class="glass-card">
    <div class="bars">${barsHtml}</div>
    ${cardInner}
  </div>

  <div class="footer">
    ${AI_LOGO_SVG(38)}
    <span>AI DYNAMIC PRO &nbsp;|&nbsp; AIDYNAMIC.PRO/BOOKING &nbsp;|&nbsp; MIAMI, FL</span>
  </div>
</body>
</html>`
}

for (let i = 0; i < SLIDES.length; i++) {
  const slide = SLIDES[i]
  const pngName = `vision_slide_0${i + 1}.png`
  const pngPath = path.join(OUT_DIR, pngName)
  const artifactPngPath = path.join(ARTIFACT_DIR, `bespoke_${pngName}`)

  renderHtmlToPng(buildSlideHtml(slide), pngPath, 1080, 1920)
  fs.copyFileSync(pngPath, artifactPngPath)
  console.log(`Rendered Logo-Branded Slide PNG: ${pngPath}`)
}
