/**
 * AI Dynamics & Innovation Ecosystem — Universal Cross-Marketing Widget
 * (C) 2026 AI Dynamics Pro | https://www.aidynamic.pro
 * 
 * Usage:
 * Paste this single script tag before </body> on any ecosystem website:
 * <script src="https://www.aidynamic.pro/ecosystem-widget.js" defer></script>
 */

(function () {
  'use strict';

  if (window.__AID_ECOSYSTEM_LOADED__) return;
  window.__AID_ECOSYSTEM_LOADED__ = true;

  const ECOSYSTEM = [
    {
      id: "ai-dynamics",
      name: "AI Dynamic Pro",
      url: "https://www.aidynamic.pro/",
      domains: ["aidynamic.pro", "www.aidynamic.pro"],
      tagline: "Bespoke Enterprise AI Engineering, Automation & Voice Systems",
      category: "Applied AI & Automation",
      badge: "AI Flagship",
      description: "Custom autonomous AI agents, 24/7 bilingual voice receptionists, computer vision quality inspection, and enterprise workflows.",
      color: "#c5a059"
    },
    {
      id: "chat-building-innovation",
      name: "Chat Building Innovation",
      url: "https://www.chatbuildinginnovation.us/",
      domains: ["chatbuildinginnovation.us", "www.chatbuildinginnovation.us"],
      tagline: "AI-Powered Construction, Architecture & Permit Intelligence",
      category: "Construction & AEC Tech",
      badge: "AEC Intelligence",
      description: "Intelligent blueprints processing, contractor workflows, real-time code compliance, and construction document automation.",
      color: "#0ea5e9"
    },
    {
      id: "pocketscribe",
      name: "PocketScribe",
      url: "https://pocketscribe.online/",
      domains: ["pocketscribe.online", "www.pocketscribe.online"],
      tagline: "Ambient AI Clinical Scribe & Medical Documentation Assistant",
      category: "Clinical AI & HealthTech",
      badge: "Clinical AI",
      description: "Converts natural clinical encounters into structured SOAP notes, reducing charting burden and automating EHR data entry.",
      color: "#10b981"
    },
    {
      id: "real-estate-dates",
      name: "Real Estate Dates",
      url: "https://realestatedates.com/",
      domains: ["realestatedates.com", "www.realestatedates.com"],
      tagline: "AI Transaction Timeline & Deadline Orchestration for Real Estate",
      category: "Real Estate & PropTech",
      badge: "PropTech",
      description: "Automated contract milestone tracking, escrow deadline alerts, and closing coordination for top real estate professionals.",
      color: "#f59e0b"
    },
    {
      id: "jas-miami-method",
      name: "JAS Miami Method",
      url: "https://jasmiamimethod.fit/",
      domains: ["jasmiamimethod.fit", "www.jasmiamimethod.fit"],
      tagline: "AI-Driven Endurance Coaching & Biometric Performance Adaptation",
      category: "Sports & Human Performance",
      badge: "Athletic Biometrics",
      description: "Daily adaptive training algorithms using HRV, wearable biometric streams, and computer vision biomechanics for athletes.",
      color: "#8b5cf6"
    },
    {
      id: "unitec-usa-design",
      name: "Unitec USA Design",
      url: "https://www.unitecusadesign.com/",
      domains: ["unitecusadesign.com", "www.unitecusadesign.com"],
      tagline: "Architectural Millwork, Luxury Commercial Interiors & 3D Engineering",
      category: "Design & Architectural Engineering",
      badge: "Design & 3D",
      description: "High-end commercial architectural millwork, parametric drafting, and custom luxury fabrication across South Florida.",
      color: "#d97706"
    },
    {
      id: "305business",
      name: "305business",
      url: "https://305business-llc.vercel.app/",
      domains: ["305business-llc.vercel.app"],
      tagline: "Miami Business Formation, Growth & Operational Scaling",
      category: "Business Advisory",
      badge: "Enterprise Services",
      description: "Strategic advisory, corporate infrastructure, and digital transformation consulting for South Florida businesses.",
      color: "#6366f1"
    },
    {
      id: "medical-billing-mb",
      name: "Medical Billing Miami Beach",
      url: "https://medicalbillingmb.com/",
      domains: ["medicalbillingmb.com", "www.medicalbillingmb.com"],
      tagline: "HIPAA-Compliant Revenue Cycle Management & Medical Billing",
      category: "Healthcare Operations",
      badge: "Healthcare RevOps",
      description: "Comprehensive billing, claims submission, denial management, and patient payment automation for medical clinics.",
      color: "#06b6d4"
    }
  ];

  const currentHost = window.location.hostname.toLowerCase();

  // Create isolated container
  const hostDiv = document.createElement('div');
  hostDiv.id = 'aid-ecosystem-root';
  document.body.appendChild(hostDiv);

  const shadow = hostDiv.attachShadow({ mode: 'open' });

  // Styles
  const style = document.createElement('style');
  style.textContent = `
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }

    /* Floating Pill Button */
    .aid-pill-btn {
      position: fixed;
      bottom: 24px;
      left: 24px;
      z-index: 999999;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(10, 10, 15, 0.92);
      color: #f1f1f5;
      padding: 10px 18px;
      border-radius: 9999px;
      border: 1px solid rgba(197, 160, 89, 0.4);
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 0 20px rgba(197, 160, 89, 0.15);
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      user-select: none;
    }

    .aid-pill-btn:hover {
      background: rgba(18, 18, 28, 0.98);
      border-color: #c5a059;
      box-shadow: 0 12px 30px -5px rgba(0, 0, 0, 0.8), 0 0 25px rgba(197, 160, 89, 0.3);
      transform: translateY(-2px);
    }

    .aid-pulse-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #c5a059;
      box-shadow: 0 0 8px #c5a059;
      animation: aidPulse 2s infinite;
    }

    @keyframes aidPulse {
      0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(197, 160, 89, 0.7); }
      70% { transform: scale(1.1); box-shadow: 0 0 0 6px rgba(197, 160, 89, 0); }
      100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(197, 160, 89, 0); }
    }

    .aid-pill-title {
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.02em;
      color: #fff;
    }

    .aid-pill-sub {
      font-size: 10px;
      color: #c5a059;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    /* Modal Backdrop */
    .aid-backdrop {
      position: fixed;
      inset: 0;
      z-index: 9999999;
      background: rgba(4, 4, 8, 0.75);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease;
    }

    .aid-backdrop.active {
      opacity: 1;
      pointer-events: auto;
    }

    /* Modal Window */
    .aid-modal {
      width: 100%;
      max-width: 900px;
      max-height: 90vh;
      background: #0d0d14;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 20px;
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(197, 160, 89, 0.1);
      display: flex;
      flex-col;
      flex-direction: column;
      overflow: hidden;
      transform: scale(0.96) translateY(10px);
      transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .aid-backdrop.active .aid-modal {
      transform: scale(1) translateY(0);
    }

    /* Header */
    .aid-modal-header {
      padding: 24px 28px 20px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 100%);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
    }

    .aid-header-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-weight: 600;
      color: #c5a059;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      margin-bottom: 6px;
    }

    .aid-modal-title {
      font-size: 22px;
      font-weight: 700;
      color: #fff;
      letter-spacing: -0.01em;
    }

    .aid-modal-desc {
      font-size: 13px;
      color: #9ca3af;
      margin-top: 4px;
      line-height: 1.5;
    }

    .aid-close-btn {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #9ca3af;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 16px;
    }

    .aid-close-btn:hover {
      background: rgba(255, 255, 255, 0.12);
      color: #fff;
      transform: rotate(90deg);
    }

    /* Grid Body */
    .aid-modal-body {
      padding: 24px 28px;
      overflow-y: auto;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
      max-height: calc(90vh - 160px);
    }

    @media (max-width: 680px) {
      .aid-modal-body {
        grid-template-columns: 1fr;
        padding: 16px;
      }
      .aid-pill-btn {
        bottom: 16px;
        left: 16px;
        padding: 8px 14px;
      }
    }

    /* Cards */
    .aid-card {
      background: rgba(255, 255, 255, 0.025);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 16px 18px;
      text-decoration: none;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.25s ease;
      position: relative;
    }

    .aid-card:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(197, 160, 89, 0.4);
      transform: translateY(-2px);
      box-shadow: 0 8px 20px -4px rgba(0, 0, 0, 0.5);
    }

    .aid-card.active-site {
      border-color: #c5a059;
      background: rgba(197, 160, 89, 0.06);
    }

    .aid-card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .aid-card-badge {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding: 2px 8px;
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #d1d5db;
    }

    .aid-card.active-site .aid-card-badge {
      background: rgba(197, 160, 89, 0.15);
      border-color: rgba(197, 160, 89, 0.4);
      color: #c5a059;
    }

    .aid-current-tag {
      font-size: 10px;
      color: #10b981;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .aid-card-name {
      font-size: 15px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .aid-card-tagline {
      font-size: 12px;
      color: #9ca3af;
      line-height: 1.4;
      margin-bottom: 10px;
    }

    .aid-card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 11px;
      color: #c5a059;
      font-weight: 600;
      padding-top: 8px;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
    }

    .aid-card-arrow {
      transition: transform 0.2s ease;
    }

    .aid-card:hover .aid-card-arrow {
      transform: translateX(4px);
    }

    /* Modal Footer */
    .aid-modal-footer {
      padding: 14px 28px;
      background: rgba(0, 0, 0, 0.3);
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 11px;
      color: #6b7280;
    }

    .aid-modal-footer a {
      color: #c5a059;
      text-decoration: none;
      font-weight: 600;
    }

    .aid-modal-footer a:hover {
      text-decoration: underline;
    }
  `;

  shadow.appendChild(style);

  // Trigger Button
  const btn = document.createElement('div');
  btn.className = 'aid-pill-btn';
  btn.innerHTML = `
    <div class="aid-pulse-dot"></div>
    <div>
      <div class="aid-pill-title">Innovation Ecosystem</div>
      <div class="aid-pill-sub">8 Connected Platforms</div>
    </div>
  `;
  shadow.appendChild(btn);

  // Modal Backdrop & Window
  const backdrop = document.createElement('div');
  backdrop.className = 'aid-backdrop';
  backdrop.innerHTML = `
    <div class="aid-modal" role="dialog" aria-modal="true">
      <div class="aid-modal-header">
        <div>
          <div class="aid-header-badge">
            <span>✦</span> Connected Technology Network
          </div>
          <div class="aid-modal-title">Innovation & AI Ecosystem</div>
          <div class="aid-modal-desc">
            Explore the cross-industry technology, digital health, and architectural platforms developed by our venture lab.
          </div>
        </div>
        <button class="aid-close-btn" aria-label="Close modal">✕</button>
      </div>

      <div class="aid-modal-body">
        ${ECOSYSTEM.map(item => {
          const isCurrent = item.domains.some(d => currentHost.includes(d));
          const targetUrl = item.url + (item.url.includes('?') ? '&' : '?') + 'utm_source=ecosystem_network&utm_medium=cross_promo&utm_campaign=shared_network';
          
          return `
            <a 
              href="${targetUrl}" 
              target="${isCurrent ? '_self' : '_blank'}" 
              rel="noopener noreferrer"
              class="aid-card ${isCurrent ? 'active-site' : ''}"
            >
              <div>
                <div class="aid-card-top">
                  <span class="aid-card-badge">${item.badge}</span>
                  ${isCurrent ? '<span class="aid-current-tag">● You are here</span>' : ''}
                </div>
                <div class="aid-card-name" style="color: ${item.color || '#fff'}">
                  ${item.name}
                </div>
                <div class="aid-card-tagline">
                  ${item.tagline}
                </div>
              </div>
              <div class="aid-card-footer">
                <span>${item.category}</span>
                <span class="aid-card-arrow">${isCurrent ? 'Current' : 'Launch →'}</span>
              </div>
            </a>
          `;
        }).join('')}
      </div>

      <div class="aid-modal-footer">
        <span>Powered by <a href="https://www.aidynamic.pro/?utm_source=ecosystem_widget&utm_medium=footer" target="_blank" rel="noopener">AI Dynamic Pro</a></span>
        <span>Miami • South Florida Innovation</span>
      </div>
    </div>
  `;
  shadow.appendChild(backdrop);

  // Event Listeners
  const openModal = () => backdrop.classList.add('active');
  const closeModal = () => backdrop.classList.remove('active');

  btn.addEventListener('click', openModal);
  backdrop.querySelector('.aid-close-btn').addEventListener('click', closeModal);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('active')) {
      closeModal();
    }
  });

})();
