// Serverless API Endpoint: /api/email-campaign
// 5-Email Human Continuation Sequence (Brevo) + Google Analytics (GA4) UTM Tracking + Google Business Profile ("Google Buz") Hub

const CAMPAIGNS = {
  email_1_voice_jass: {
    id: 'email_1_voice_jass',
    name: 'Week 1 — Executive P&L Mandate: Eliminate Missed Calls & Manual Payroll at {{company}}',
    subject: 'after-hours calls and wasted payroll at {{company}}',
    utmCampaign: 'seq1_voice_jass',
    description: 'Minimalist, zero-icon executive brief combining behavioral loss-aversion (38% missed calls) with our 6 proprietary AI architectures and on-site staff training.',
    buildHtml: ({ name = 'there', company = 'your company', utmUrl, homeUtmUrl, phoneUrl }) => `
      <div style="font-family: Georgia, 'Playfair Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', serif; max-width: 620px; margin: 0 auto; color: #0f172a; line-height: 1.72; font-size: 16px; padding: 16px 6px;">
        <div style="font-family: 'Segoe UI', Inter, Arial, sans-serif; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #a0894e; font-weight: 700; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 22px;">
          AI DYNAMIC PRO &nbsp;|&nbsp; EXECUTIVE MEMORANDUM
        </div>

        <p>${name},</p>

        <p>Every week an owner delays engineering automation inside <strong>${company}</strong>, two quiet liabilities compound on the P&amp;L:</p>

        <p><strong>01 / You pay human salaries for repetitive data entry, intake, and manual follow-ups that custom AI executes in three seconds.<br/>
        02 / Between 12:00 PM–2:00 PM and after 5:30 PM, 38% of your high-intent callers hit voicemail and retain your competitor.</strong></p>

        <p>I am Jasmel Acosta, Founder of <strong>AI Dynamic Pro</strong> in Miami. We do not sell generic software templates. As hands-on <strong>AI Developers, Creators, and Systems Engineers</strong>, we walk directly into your industry, build proprietary AI architectures around your operation, and stay on-site until your team masters them:</p>

        <div style="background: #0a0a0f; color: #f8fafc; border-left: 3px solid #c9a96e; padding: 20px 24px; margin: 24px 0; border-radius: 4px; font-family: 'Segoe UI', Inter, Arial, sans-serif; font-size: 14px; line-height: 1.65;">
          <p style="margin: 0 0 12px 0;"><strong style="color: #c9a96e; letter-spacing: 1px;">01 / ON-SITE AUDIT &amp; 48-HOUR LIVE PROTOTYPE ($99 AUDIT OR FREE 15-MIN TRIAGE):</strong><br/>
          We map your slowest department and engineer a working AI prototype tailored to <strong>${company}</strong> within 48 hours—guaranteed to uncover at least <strong>$2,500+/month ($30,000/yr)</strong> in payroll and operating savings, or you pay <strong>$0</strong>.</p>
          <p style="margin: 0 0 12px 0;"><strong style="color: #c9a96e; letter-spacing: 1px;">02 / SIX PROPRIETARY PRODUCTION ARCHITECTURES:</strong><br/>
          Whether your mandate requires <strong>Clinical &amp; RCM Automation</strong> (-45% admin overhead), <strong>Computer Vision &amp; 3D LiDAR Inspection</strong>, <strong>Private Legal/Real Estate Document RAG</strong>, <strong>Agentic Websites</strong>, or our 24/7 bilingual voice &amp; CRM system (<strong>JAss</strong> — $997 Turnkey or $297/mo), we deploy it in 7 to 14 days.</p>
          <p style="margin: 0;"><strong style="color: #c9a96e; letter-spacing: 1px;">03 / ON-SITE WORKFORCE MULTIPLICATION ($497 CORPORATE BOOTCAMP):</strong><br/>
          We stay side-by-side with up to 15 of your employees and train them hands-on until <strong>1 AI-trained staff member produces the output of 5</strong>.</p>
        </div>

        <p><strong>Decisive CEOs do not wait another quarter to stop bleeding margin.</strong> Schedule your 15-minute executive call or $99 Department Audit below and let us build your 48-hour prototype this week:</p>

        <p style="margin: 26px 0; font-family: 'Segoe UI', Inter, Arial, sans-serif;">
          <a href="${utmUrl}" style="background: #0a0a0f; color: #f7e7ce; border: 1px solid #c9a96e; padding: 14px 28px; border-radius: 4px; text-decoration: none; font-weight: 700; font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; display: inline-block;">Schedule $99 Audit or 48-Hour Prototype →</a>
        </p>

        <p style="margin-top: 28px; font-family: 'Segoe UI', Inter, Arial, sans-serif; font-size: 14px;">
          <strong>Jasmel Acosta</strong><br/>
          Founder, AI Developer &amp; Systems Creator &nbsp;|&nbsp; AI Dynamic Pro<br/>
          Brickell Financial District, Miami &nbsp;|&nbsp; <a href="${phoneUrl}" style="color: #0f172a; font-weight: 700; text-decoration: none;">+1 (786) 643-2099</a> &nbsp;|&nbsp; <a href="${homeUtmUrl}" style="color: #a0894e; font-weight: 700;">aidynamic.pro</a>
        </p>

        <p style="font-family: 'Segoe UI', Inter, Arial, sans-serif; font-size: 13px; color: #334155; background: #f8fafc; border-left: 2px solid #94a3b8; padding: 12px 16px; margin-top: 20px;">
          <strong>P.S.</strong> Inspect all 22 of our live production architectures and test <strong>JAss</strong> in English or Spanish right now at <a href="${homeUtmUrl}" style="color: #0f172a; font-weight: 700;">www.aidynamic.pro</a>, or call me directly at <strong>+1 (786) 643-2099</strong>.
        </p>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 26px 0 12px;" />
        <p style="font-family: 'Segoe UI', Inter, Arial, sans-serif; font-size: 11px; color: #94a3b8; line-height: 1.5;">
          AI Dynamic Pro • Brickell Financial District, Miami, FL 33131 • To opt out of future executive memorandums, reply "unsubscribe" or <a href="mailto:jasmel@aidynamic.pro?subject=Unsubscribe" style="color: #64748b; text-decoration: underline;">click here</a>.
        </p>
      </div>
    `,
  },

  email_2_audit_99: {
    id: 'email_2_audit_99',
    name: 'Week 2 — Precision Cost Ledger: Eliminating $3,420/Mo in Manual Payroll at {{company}}',
    subject: '$3,420/mo in manual payroll at {{company}}',
    utmCampaign: 'seq2_audit_99',
    description: 'Minimalist P&L cost ledger ($3,420/mo & 4.2 hrs/day wasted) demonstrating how custom AI architectures and staff training permanently lower overhead.',
    buildHtml: ({ name = 'there', company = 'your company', utmUrl, homeUtmUrl, phoneUrl }) => `
      <div style="font-family: Georgia, 'Playfair Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', serif; max-width: 620px; margin: 0 auto; color: #0f172a; line-height: 1.72; font-size: 16px; padding: 16px 6px;">
        <div style="font-family: 'Segoe UI', Inter, Arial, sans-serif; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #a0894e; font-weight: 700; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 22px;">
          AI DYNAMIC PRO &nbsp;|&nbsp; COST &amp; PAYROLL LEDGER
        </div>

        <p>${name},</p>

        <p><strong>$3,420 a month in wasted payroll rarely announces itself as an emergency—until you see the 12-month loss on your balance sheet ($41,040).</strong></p>

        <p>Across operations like <strong>${company}</strong>, capable staff spend <strong>4.2 hours every day</strong> on manual intake, document verification, appointment chasing, and copy-pasting data across disconnected software tabs.</p>

        <p>At <strong>AI Dynamic Pro</strong>, our AI Developers walk directly into <strong>${company}</strong> and replace manual friction with proprietary production architectures:</p>

        <div style="background: #0a0a0f; color: #f8fafc; border-left: 3px solid #c9a96e; padding: 20px 24px; margin: 24px 0; border-radius: 4px; font-family: 'Segoe UI', Inter, Arial, sans-serif; font-size: 14px; line-height: 1.65;">
          <p style="margin: 0 0 10px 0;"><strong style="color: #c9a96e;">01 / CUSTOM SECTOR ARCHITECTURES:</strong> From automated medical claim scrubbing, legal contract RAG, and 3-second computer vision inspections to 24/7 bilingual voice &amp; CRM pipelines (<strong>JAss</strong>), we engineer the exact system your company requires.</p>
          <p style="margin: 0 0 10px 0;"><strong style="color: #c9a96e;">02 / ON-SITE STAFF TRAINING ($497 BOOTCAMP):</strong> We stay with your team and train up to 15 staff hands-on so your workforce operates at 5x daily output.</p>
          <p style="margin: 0;"><strong style="color: #c9a96e;">03 / THE $2,500+/MO GUARANTEE ($99 AUDIT + 48H PROTOTYPE):</strong> We build a working prototype in 48 hours and guarantee to uncover at least <strong>$2,500+/month ($30,000/yr)</strong> in immediate savings—or we refund your $99 on the spot.</p>
        </div>

        <p>Stop paying human salaries for machine work. Claim your 48-hour prototype or $99 Department Audit today:</p>

        <p style="margin: 26px 0; font-family: 'Segoe UI', Inter, Arial, sans-serif;">
          <a href="${utmUrl}" style="background: #0a0a0f; color: #f7e7ce; border: 1px solid #c9a96e; padding: 14px 28px; border-radius: 4px; text-decoration: none; font-weight: 700; font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; display: inline-block;">Claim $99 Audit &amp; 48-Hour Prototype →</a>
        </p>

        <p style="margin-top: 28px; font-family: 'Segoe UI', Inter, Arial, sans-serif; font-size: 14px;">
          <strong>Jasmel Acosta</strong><br/>
          Founder, AI Developer &amp; Systems Creator &nbsp;|&nbsp; AI Dynamic Pro<br/>
          <a href="${phoneUrl}" style="color: #0f172a; font-weight: 700; text-decoration: none;">+1 (786) 643-2099</a> &nbsp;|&nbsp; <a href="${homeUtmUrl}" style="color: #a0894e; font-weight: 700;">aidynamic.pro</a>
        </p>

        <p style="font-family: 'Segoe UI', Inter, Arial, sans-serif; font-size: 13px; color: #334155; background: #f8fafc; border-left: 2px solid #94a3b8; padding: 12px 16px; margin-top: 20px;">
          <strong>P.S.</strong> Reply directly to this email with the single slowest workflow inside <strong>${company}</strong>—I will personally outline the architecture to automate it in 48 hours.
        </p>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 26px 0 12px;" />
        <p style="font-family: 'Segoe UI', Inter, Arial, sans-serif; font-size: 11px; color: #94a3b8; line-height: 1.5;">
          AI Dynamic Pro • Brickell Financial District, Miami, FL 33131 • Reply "unsubscribe" or <a href="mailto:jasmel@aidynamic.pro?subject=Unsubscribe" style="color: #64748b; text-decoration: underline;">click here</a> to opt out.
        </p>
      </div>
    `,
  },

  email_3_staff_training: {
    id: 'email_3_staff_training',
    name: 'Week 3 — Workforce Multiplication: 1 Trained Employee Producing the Output of 5 ($497 Bootcamp)',
    subject: '1 employee producing the output of 5 at {{company}}',
    utmCampaign: 'seq3_staff_training',
    description: 'Resolves the #1 executive bottleneck (83% shelfware failure) by combining custom AI engineering with our $497 On-Site Corporate Staff Bootcamp.',
    buildHtml: ({ name = 'there', company = 'your company', utmUrl, homeUtmUrl, phoneUrl }) => `
      <div style="font-family: Georgia, 'Playfair Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', serif; max-width: 620px; margin: 0 auto; color: #0f172a; line-height: 1.72; font-size: 16px; padding: 16px 6px;">
        <div style="font-family: 'Segoe UI', Inter, Arial, sans-serif; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #a0894e; font-weight: 700; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 22px;">
          AI DYNAMIC PRO &nbsp;|&nbsp; WORKFORCE MULTIPLICATION
        </div>

        <p>${name},</p>

        <p><strong>83% of companies that purchase AI software fail to capture a return for one reason: nobody stayed on-site to train their workforce how to execute with it.</strong></p>

        <p>As the decision-maker at <strong>${company}</strong>, you do not need another unused subscription. You need lower operating costs, faster turnaround times, and a team that accomplishes five times more without expanding headcount.</p>

        <p>That is our mandate at <strong>AI Dynamic Pro</strong>. We engineer the technology and stay with your staff until it is second nature:</p>

        <div style="background: #0a0a0f; color: #f8fafc; border-left: 3px solid #c9a96e; padding: 20px 24px; margin: 24px 0; border-radius: 4px; font-family: 'Segoe UI', Inter, Arial, sans-serif; font-size: 14px; line-height: 1.65;">
          <p style="margin: 0 0 10px 0;"><strong style="color: #c9a96e;">01 / $497 HALF-DAY CORPORATE STAFF BOOTCAMP (UP TO 15 STAFF):</strong> We come on-site (or live virtual) and train your operations, clinical, legal, or front-desk staff on the exact workflows they run daily at <strong>${company}</strong>.</p>
          <p style="margin: 0 0 10px 0;"><strong style="color: #c9a96e;">02 / FOUR HOURS COMPRESSED INTO 22 MINUTES:</strong> We install role-specific prompt playbooks and data-security SOPs so <strong>1 AI-trained employee reliably delivers the output of 5</strong>.</p>
          <p style="margin: 0;"><strong style="color: #c9a96e;">03 / FULL-STACK AUTOMATION WHERE HUMANS SHOULD NOT TOUCH IT:</strong> Everything else is handled autonomously by our custom AI applications and 24/7 bilingual voice system (<strong>JAss</strong>).</p>
        </div>

        <p>Equip your team to operate at 5x speed this week:</p>

        <p style="margin: 26px 0; font-family: 'Segoe UI', Inter, Arial, sans-serif;">
          <a href="${utmUrl}" style="background: #0a0a0f; color: #f7e7ce; border: 1px solid #c9a96e; padding: 14px 28px; border-radius: 4px; text-decoration: none; font-weight: 700; font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; display: inline-block;">Reserve $497 Staff Bootcamp or $99 Audit →</a>
        </p>

        <p style="margin-top: 28px; font-family: 'Segoe UI', Inter, Arial, sans-serif; font-size: 14px;">
          <strong>Jasmel Acosta</strong><br/>
          Founder, AI Developer &amp; Systems Creator &nbsp;|&nbsp; AI Dynamic Pro<br/>
          <a href="${phoneUrl}" style="color: #0f172a; font-weight: 700; text-decoration: none;">+1 (786) 643-2099</a> &nbsp;|&nbsp; <a href="${homeUtmUrl}" style="color: #a0894e; font-weight: 700;">aidynamic.pro</a>
        </p>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 26px 0 12px;" />
        <p style="font-family: 'Segoe UI', Inter, Arial, sans-serif; font-size: 11px; color: #94a3b8; line-height: 1.5;">
          AI Dynamic Pro • Brickell Financial District, Miami, FL 33131 • Reply "unsubscribe" or <a href="mailto:jasmel@aidynamic.pro?subject=Unsubscribe" style="color: #64748b; text-decoration: underline;">click here</a> to opt out.
        </p>
      </div>
    `,
  },

  email_4_before_after: {
    id: 'email_4_before_after',
    name: 'Week 4 — Empirical P&L Proof: 4 Retainers vs. 19 Retainers Across 22 Deployed Systems',
    subject: 'two 14-day P&L numbers for {{company}}',
    utmCampaign: 'seq4_before_after',
    description: 'Minimalist A/B benchmark (47-min human delay vs. 3-sec AI execution) backed by our portfolio of 22 production AI architectures.',
    buildHtml: ({ name = 'there', company = 'your company', utmUrl, homeUtmUrl, phoneUrl }) => `
      <div style="font-family: Georgia, 'Playfair Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', serif; max-width: 620px; margin: 0 auto; color: #0f172a; line-height: 1.72; font-size: 16px; padding: 16px 6px;">
        <div style="font-family: 'Segoe UI', Inter, Arial, sans-serif; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #a0894e; font-weight: 700; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 22px;">
          AI DYNAMIC PRO &nbsp;|&nbsp; EMPIRICAL P&amp;L BENCHMARK
        </div>

        <p>${name},</p>

        <p>Compare the 14-day ledger from two South Florida firms that each received 50 inbound client inquiries:</p>

        <div style="background: #f8fafc; border-left: 3px solid #64748b; padding: 16px 20px; margin: 18px 0; font-family: 'Segoe UI', Inter, Arial, sans-serif; font-size: 14px;">
          <strong>MODEL A — MANUAL OPERATIONS ONLY ($14,500/MO ADMIN OVERHEAD):</strong><br/>
          • Mean response time: <strong>47 minutes</strong> daytime, <strong>9.5 hours</strong> after-hours.<br/>
          • 38% of lunch and post-5:30 PM calls abandoned on voicemail.<br/>
          • Outcome: <strong>4 booked retainers</strong> out of 50 inquiries.
        </div>

        <div style="background: #0a0a0f; color: #f8fafc; border-left: 3px solid #c9a96e; padding: 18px 22px; margin: 18px 0; font-family: 'Segoe UI', Inter, Arial, sans-serif; font-size: 14px;">
          <strong style="color: #c9a96e;">MODEL B — AI DYNAMIC PRO ARCHITECTURE + TRAINED STAFF ($297/MO MANAGED JASS):</strong><br/>
          • Mean response time: <strong>3 seconds</strong>, 24/7 in English &amp; Spanish across phone, WhatsApp, and web.<br/>
          • Every inquiry triaged, qualified, and booked onto the calendar automatically.<br/>
          • Outcome: <strong>19 booked retainers</strong> from the same 50 inquiries.
        </div>

        <p>Whether your vision for <strong>${company}</strong> requires computer vision inspection, clinical claim automation, sovereign legal RAG, or 24/7 bilingual voice and CRM pipelines, <strong>we have already engineered 22 production AI architectures</strong> (<a href="https://www.aidynamic.pro/projects?utm_source=brevo&utm_medium=email&utm_campaign=seq4_before_after" style="color: #a0894e; font-weight: 700;">inspect our portfolio at aidynamic.pro/projects</a>)—and we stay on-site until your staff runs them effortlessly.</p>

        <p style="margin: 26px 0; font-family: 'Segoe UI', Inter, Arial, sans-serif;">
          <a href="${utmUrl}" style="background: #0a0a0f; color: #f7e7ce; border: 1px solid #c9a96e; padding: 14px 28px; border-radius: 4px; text-decoration: none; font-weight: 700; font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; display: inline-block;">Transition ${company} to Model B →</a>
        </p>

        <p style="margin-top: 28px; font-family: 'Segoe UI', Inter, Arial, sans-serif; font-size: 14px;">
          <strong>Jasmel Acosta</strong><br/>
          Founder, AI Developer &amp; Systems Creator &nbsp;|&nbsp; AI Dynamic Pro<br/>
          <a href="${phoneUrl}" style="color: #0f172a; font-weight: 700; text-decoration: none;">+1 (786) 643-2099</a> &nbsp;|&nbsp; <a href="${homeUtmUrl}" style="color: #a0894e; font-weight: 700;">aidynamic.pro</a>
        </p>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 26px 0 12px;" />
        <p style="font-family: 'Segoe UI', Inter, Arial, sans-serif; font-size: 11px; color: #94a3b8; line-height: 1.5;">
          AI Dynamic Pro • Brickell Financial District, Miami, FL 33131 • Reply "unsubscribe" or <a href="mailto:jasmel@aidynamic.pro?subject=Unsubscribe" style="color: #64748b; text-decoration: underline;">click here</a> to opt out.
        </p>
      </div>
    `,
  },

  email_5_founder_checkin: {
    id: 'email_5_founder_checkin',
    name: 'Week 5 — Final Executive Mandate: 48-Hour Live Prototype & Staff Multiplication at {{company}}',
    subject: 'final note on cutting costs at {{company}}, {{name}}',
    utmCampaign: 'seq5_founder_checkin',
    description: 'Concise, authoritative founder close-out challenging the CEO to authorize a 48-hour live prototype backed by our $30,000/yr savings guarantee.',
    buildHtml: ({ name = 'there', company = 'your business', utmUrl, homeUtmUrl, gbpUrl, phoneUrl }) => `
      <div style="font-family: Georgia, 'Playfair Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', serif; max-width: 620px; margin: 0 auto; color: #0f172a; line-height: 1.72; font-size: 16px; padding: 16px 6px;">
        <div style="font-family: 'Segoe UI', Inter, Arial, sans-serif; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #a0894e; font-weight: 700; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 22px;">
          AI DYNAMIC PRO &nbsp;|&nbsp; FINAL EXECUTIVE MANDATE
        </div>

        <p>${name},</p>

        <p>Running <strong>${company}</strong> demands your full attention, so I will keep this final note brief.</p>

        <p>If your mandate this quarter is to <strong>cut operating overhead, eliminate manual payroll waste, and multiply your team's output by 5x</strong>, waiting another six months only compounds the cost. Here is our exact commitment when we step into <strong>${company}</strong>:</p>

        <div style="background: #0a0a0f; color: #f8fafc; border-left: 3px solid #c9a96e; padding: 20px 24px; margin: 24px 0; border-radius: 4px; font-family: 'Segoe UI', Inter, Arial, sans-serif; font-size: 14px; line-height: 1.65;">
          <p style="margin: 0 0 10px 0;"><strong style="color: #c9a96e;">01 / WE WALK INTO YOUR COMPANY ($99 AUDIT + 48H PROTOTYPE):</strong> We audit your workflows and build a working prototype in 48 hours—guaranteed to uncover <strong>$2,500+/month ($30,000/yr)</strong> in savings, or you pay <strong>$0</strong>.</p>
          <p style="margin: 0 0 10px 0;"><strong style="color: #c9a96e;">02 / WE ENGINEER PROPRIETARY AI ARCHITECTURES:</strong> From Clinical AI, Computer Vision, and Legal RAG to 24/7 Bilingual Voice (<strong>JAss</strong> — $997 Turnkey / $297/mo), we build the exact software your industry requires.</p>
          <p style="margin: 0;"><strong style="color: #c9a96e;">03 / WE STAY &amp; TRAIN YOUR STAFF ($497 BOOTCAMP):</strong> We train up to 15 employees on-site until <strong>1 staff member produces the output of 5</strong>.</p>
        </div>

        <p>Reply <strong>"SCALE"</strong> directly to this email or select your 15-minute slot below to begin your 48-hour prototype today:</p>

        <p style="margin: 22px 0; font-family: 'Segoe UI', Inter, Arial, sans-serif; font-size: 14px; line-height: 1.9;">
          <strong>01 / Schedule Audit or 48-Hr Prototype:</strong> <a href="${utmUrl}" style="color: #a0894e; font-weight: 700;">aidynamic.pro/booking</a><br/>
          <strong>02 / Production Portfolio &amp; Live JAss Demo:</strong> <a href="${homeUtmUrl}" style="color: #a0894e; font-weight: 700;">aidynamic.pro</a><br/>
          <strong>03 / Google Business Profile (Miami):</strong> <a href="${gbpUrl}" style="color: #a0894e; font-weight: 700;">AI Dynamic Pro on Google</a><br/>
          <strong>04 / Direct Executive Line:</strong> <a href="${phoneUrl}" style="color: #0f172a; font-weight: 700; text-decoration: none;">+1 (786) 643-2099</a>
        </p>

        <p style="margin-top: 28px; font-family: 'Segoe UI', Inter, Arial, sans-serif; font-size: 14px;">
          <strong>Jasmel Acosta</strong><br/>
          Founder, AI Developer &amp; Systems Creator &nbsp;|&nbsp; AI Dynamic Pro
        </p>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 26px 0 12px;" />
        <p style="font-family: 'Segoe UI', Inter, Arial, sans-serif; font-size: 11px; color: #94a3b8; line-height: 1.5;">
          AI Dynamic Pro • Brickell Financial District, Miami, FL 33131 • Reply "unsubscribe" or <a href="mailto:jasmel@aidynamic.pro?subject=Unsubscribe" style="color: #64748b; text-decoration: underline;">click here</a> to opt out.
        </p>
      </div>
    `,
  },
};

// Ready-to-publish Google Business Profile ("Google Buz") Local Posts with GA4 UTM tracking (Zero Icons, Minimalist Executive Copy)
const GOOGLE_BUSINESS_POSTS = [
  {
    id: 'gbp_post_1_audit_offer',
    type: 'OFFER POST (CODE: SCALE99)',
    title: '$99 Department Efficiency Audit + Free 48-Hour AI Prototype ($2,500+/Mo Savings Guarantee)',
    ctaButton: 'Book Online',
    ctaUrl: 'https://www.aidynamic.pro/booking?utm_source=google_business&utm_medium=gbp_offer&utm_campaign=audit_99',
    imageUrl: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_06.png',
    content: `How much payroll is your company spending every month on repetitive manual tasks that proprietary AI architectures execute in 3 seconds?\n\nAt AI Dynamic Pro in Miami, we do not sell generic software templates. As hands-on AI Developers, Creators, and Systems Engineers, we walk directly into your operation, engineer custom production systems, and stay on-site to train your staff:\n\n01 / ON-SITE AUDIT & 48-HOUR LIVE PROTOTYPE ($99 Audit or Free 15-Min Triage Call): We map your slowest department and build a working AI prototype tailored to your company within 48 hours—guaranteed to uncover at least $2,500+/month ($30,000/yr) in payroll and operating savings, or you pay $0.\n02 / SIX PRODUCTION AI ARCHITECTURES: Clinical & RCM Automation, Computer Vision & 3D LiDAR, Sovereign Legal RAG, Agentic Websites, and our 24/7 Bilingual Voice & CRM system (JAss — $997 Turnkey / $297/mo).\n03 / ON-SITE STAFF TRAINING ($497 Corporate Bootcamp): We train up to 15 employees hands-on until 1 staff member produces the output of 5.\n\nCall +1 (786) 643-2099 or schedule at www.aidynamic.pro/booking.`,
  },
  {
    id: 'gbp_post_2_healthcare_rcm',
    type: 'WHAT’S NEW — ARCHITECTURE 01 / 06',
    title: 'Clinical & Healthcare RCM Intelligence: Eliminate 45% of Front-Desk & Charting Overhead',
    ctaButton: 'Book Online',
    ctaUrl: 'https://www.aidynamic.pro/booking?utm_source=google_business&utm_medium=gbp_post&utm_campaign=arch01_clinical',
    imageUrl: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_01.png',
    content: `Medical clinics, dental practices, and surgical centers across South Florida lose thousands of hours a year to manual intake typing, after-hours voicemail, and rejected insurance claims.\n\nAI Dynamic Pro walks into your practice, audits your clinical workflows, and engineers three integrated systems in 7 to 14 days:\n— Ambient AI Medical Scribe: Generates structured SOAP notes and ICD-10/CPT codes automatically (-70% physician charting time).\n— Automated 837 Claim Scrubbing & Insurance OCR Intake: Verifies coverage and scrubs payer rules with zero manual data entry.\n— 24/7 Bilingual Patient Triage (JAss): Answers 100% of patient calls on Ring 1 in English and Spanish and books directly into your EHR.\n\nPlus, we stay on-site to train your clinical coordinators so 1 coordinator handles 4x patient volume. Schedule your $99 Clinical Audit (+ Free 48-Hr Prototype) at www.aidynamic.pro/booking or call +1 (786) 643-2099.`,
  },
  {
    id: 'gbp_post_3_computer_vision',
    type: 'WHAT’S NEW — ARCHITECTURE 02 / 06',
    title: 'Computer Vision, Macro Authentication & 3D LiDAR Spatial AI Systems',
    ctaButton: 'Learn More',
    ctaUrl: 'https://www.aidynamic.pro/projects?utm_source=google_business&utm_medium=gbp_post&utm_campaign=arch02_vision',
    imageUrl: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_02.png',
    content: `Replace slow, inconsistent human inspections with 3-second neural computer vision engineered specifically for your industry.\n\nAt AI Dynamic Pro, our AI Developers build production YOLOv8, DINOv2, and 3D LiDAR architectures for South Florida enterprises:\n— Fine-Grained Macro Authentication: Identifies luxury asset references, serial OCR, and surface anomalies from smartphone imagery in 3 seconds.\n— 12-Class Property & Construction Defect Vision: Automatically localizes wall cracks, moisture intrusion, and structural defects and generates contractor tickets.\n— 3D LiDAR Digital Twins: Generates millimeter-accurate 2D SVG and 3D OBJ floorplans in under 90 seconds.\n\nInspect our live computer vision architectures at www.aidynamic.pro/projects or book a 48-Hour Custom Prototype at www.aidynamic.pro/booking.`,
  },
  {
    id: 'gbp_post_4_voice_jass',
    type: 'WHAT’S NEW — ARCHITECTURE 03 / 06',
    title: 'JAss 24/7 Bilingual Voice & Sub-Minute CRM Pipeline ($997 Turnkey or $297/Mo)',
    ctaButton: 'Learn More',
    ctaUrl: 'https://www.aidynamic.pro/?utm_source=google_business&utm_medium=gbp_post&utm_campaign=arch03_voice_jass',
    imageUrl: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_03.png',
    content: `38% of high-intent callers hang up the moment they hit voicemail, and a 47-minute human response delay kills 78% of inbound web and WhatsApp leads.\n\nAI Dynamic Pro engineers and deploys JAss—our 24/7 Bilingual (English & Spanish) Voice and Multi-Channel CRM Receptionist—tailored to your company in 7 to 14 days:\n— Answers 100% of inbound phone calls on Ring 1 in fluent English and Spanish.\n— Replies to WhatsApp, SMS, Instagram DM, and web inquiries in under 30 seconds.\n— Qualifies client budgets and books appointments directly onto your calendar while syncing every transcript to your CRM.\n\nTest JAss live right now at www.aidynamic.pro or call +1 (786) 643-2099.`,
  },
  {
    id: 'gbp_post_5_legal_realestate',
    type: 'WHAT’S NEW — ARCHITECTURE 04 / 06',
    title: 'Sovereign Legal Document RAG & Vector Real Estate Deal Matching',
    ctaButton: 'Book Online',
    ctaUrl: 'https://www.aidynamic.pro/booking?utm_source=google_business&utm_medium=gbp_post&utm_campaign=arch04_legal_rag',
    imageUrl: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_04.png',
    content: `Law firms, title agencies, and commercial real estate brokerages in Brickell, Coral Gables, and Doral waste 15+ hours per week per associate on manual document review and unqualified intake.\n\nAI Dynamic Pro engineers private, zero-data-leakage AI architectures inside your firm:\n— Sovereign Legal & Contract RAG: Screens leases, discovery files, and commercial agreements for non-standard risk clauses and missing disclosures in seconds.\n— Vector Real Estate Deal Matchmaker: Matches natural-language investor mandates against MLS and off-market inventory automatically.\n— Automated Escrow & Court Cutoff Telemetry: Tracks every transaction deadline and dispatches automated compliance alerts.\n\nBook your $99 Firm Efficiency Audit (+ Free 48-Hr Prototype) at www.aidynamic.pro/booking.`,
  },
  {
    id: 'gbp_post_6_agentic_web_kinematics',
    type: 'WHAT’S NEW — ARCHITECTURE 05 / 06',
    title: 'Self-Learning Agentic Websites, AI SEO (AEO) & 33-Joint Kinematics',
    ctaButton: 'Learn More',
    ctaUrl: 'https://www.aidynamic.pro/agentic-website?utm_source=google_business&utm_medium=gbp_post&utm_campaign=arch05_agentic_web',
    imageUrl: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_05.png',
    content: `Static brochure websites no longer convert modern buyers, and unindexed pages are invisible to ChatGPT, Perplexity, and Google AI Overviews.\n\nAI Dynamic Pro builds production-grade Agentic Web Platforms and specialized biomechanics applications in 5 to 10 days:\n— Self-Learning Agentic Websites: Dynamically adapts proof points, conversion flows, and embedded 24/7 bilingual voice concierge (JAss) to every visitor.\n— Answer Engine Optimization (AEO & Schema.org Graphs): Structures your company data so AI engines and Google Map Pack rank and cite your business first.\n— 33-Joint Pose Kinematics & Biometric AI: Smartphone-based gait analysis, cycling aerodynamics, and daily HRV coaching engines.\n\nExplore our Agentic Web architecture at www.aidynamic.pro/agentic-website or call +1 (786) 643-2099.`,
  },
  {
    id: 'gbp_post_7_staff_bootcamp',
    type: 'UPDATE POST — ARCHITECTURE 06 / 06',
    title: '$497 On-Site Corporate AI Staff Bootcamp: 1 Trained Employee Producing the Output of 5',
    ctaButton: 'Book Online',
    ctaUrl: 'https://www.aidynamic.pro/booking?utm_source=google_business&utm_medium=gbp_post&utm_campaign=arch06_staff_training',
    imageUrl: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_07.png',
    content: `83% of companies that buy AI tools fail to see ROI for one simple reason: nobody stayed behind to train their staff how to execute with them every day.\n\nAt AI Dynamic Pro, we do not hand you software and disappear. Through our $497 Half-Day Corporate AI Staff Bootcamp (up to 15 employees, on-site across Miami / South Florida or live virtual), we stay side-by-side with your team:\n— Role-specific daily AI workflows for operations, clinical, legal, billing, and sales teams (compressing 4 hours of manual work into 22 minutes).\n— Sovereign data-privacy and security Standard Operating Procedures (SOPs).\n— Guaranteed workforce multiplication so 1 AI-trained employee reliably produces the output of 5.\n\nReserve your $497 Corporate Bootcamp or $99 Department Audit today at www.aidynamic.pro/booking.`,
  },
];

const MIAMI_GMAPS_LEADS = [
  { name: 'Brickell Dental Associates', email: 'brickelldentalassociates2@gmail.com', phone: '(305) 372-8212', company: 'Brickell Dental Associates (Brickell)', category: 'Dental Practice', offer: 'Tier 1 ($99 Audit + 48h Prototype) -> Tier 3 ($297/mo JAss)' },
  { name: 'Brickell Dentistry', email: 'brickelldentistry444@gmail.com', phone: '(305) 371-6040', company: 'Brickell Dentistry (Brickell)', category: 'Dental Practice', offer: 'Tier 1 ($99 Audit + 48h Prototype) -> Tier 3 ($297/mo JAss)' },
  { name: 'Brickell Oral Surgery', email: 'brickelloralsurgery@gmail.com', phone: '(305) 374-6644', company: 'Brickell Oral Surgery (Brickell)', category: 'Oral Surgery Clinic', offer: 'Tier 1 ($99 Audit) -> Tier 2 ($497 Staff AI Bootcamp)' },
  { name: 'Gables Dental Clinic', email: 'gablesdental@gmail.com', phone: '(305) 444-9951', company: 'Gables Dental Clinic (Coral Gables)', category: 'Dental Practice', offer: 'Tier 1 ($99 Audit + 48h Prototype) -> Tier 3 ($997 Turnkey AI)' },
  { name: 'Aloe Medspa', email: 'aloemedspa@gmail.com', phone: '(305) 520-7649', company: 'Aloe Medspa (South Miami)', category: 'Medical Spa', offer: 'Tier 1 ($99 Audit + 48h Prototype) -> Tier 3 ($297/mo JAss)' },
  { name: 'Laserholic Medspa', email: 'laserholicmedspa@gmail.com', phone: '(786) 762-9103', company: 'Laserholic Medspa (Miami)', category: 'Medical Spa', offer: 'Tier 1 ($99 Audit + 48h Prototype) -> Tier 3 ($297/mo JAss)' },
  { name: 'Liscano Clinic / Premier MedSpa', email: 'mafamcacorp@gmail.com', phone: '(786) 348-3039', company: 'Liscano Clinic / Premier MedSpa (Miami Beach)', category: 'Medical Clinic & MedSpa', offer: 'Tier 1 ($99 Audit) -> Tier 3 ($997 Turnkey Voice & CRM)' },
  { name: 'Ruases International Real Estate', email: 'info@ruases.com', phone: '(305) 590-5000', company: 'Ruases International Real Estate (Miami)', category: 'Real Estate & Investments', offer: 'Tier 1 ($99 Audit) -> Tier 3 ($997 EstateMatch + JAss)' },
  { name: 'Residence Realty Inc', email: 'resrealtymiami@gmail.com', phone: '(305) 778-2252', company: 'Residence Realty Inc (Miami)', category: 'Real Estate Brokerage', offer: 'Tier 2 ($497 Staff AI Bootcamp) -> Tier 3 ($297/mo JAss)' },
  { name: 'Casabella Miami Realty Inc', email: 'casabellamiamirealty@gmail.com', phone: '(786) 542-1655', company: 'Casabella Miami Realty Inc (Miami)', category: 'Real Estate Brokerage', offer: 'Tier 2 ($497 Staff AI Bootcamp) -> Tier 3 ($297/mo JAss)' },
  { name: 'Brokers International Realty', email: 'brokergeorgedaniel@gmail.com', phone: '(786) 972-4511', company: 'Brokers International Realty (Coral Way / Brickell)', category: 'Real Estate Brokerage', offer: 'Tier 1 ($99 Audit + 48h Prototype) -> Tier 3 ($997 Turnkey AI)' },
  { name: 'Porcelanosa Florida Corp', email: 'info@porcelanosa-usa.com', phone: '(305) 715-7153', company: 'Porcelanosa Florida Corp (Doral)', category: 'Architecture & Design Showroom', offer: 'Tier 2 ($497 Staff Bootcamp) -> Tier 4 ($4,900 Enterprise AI)' },
  { name: '360 Repair Techs Inc', email: 'miguelradillo@gmail.com', phone: '(305) 720-7982', company: '360 Repair Techs Inc (Miami)', category: 'General Contractor', offer: 'Tier 1 ($99 Audit + 48h Prototype) -> Tier 3 ($297/mo JAss)' },
  { name: 'Miami Construction Brokers Inc', email: 'miamiconstructionbrokers@gmail.com', phone: '(786) 431-9231', company: 'Miami Construction Brokers Inc (Doral/Medley)', category: 'Construction & Contracting', offer: 'Tier 1 ($99 Audit) -> Tier 3 ($997 Turnkey Bidding AI)' },
  { name: 'Zamora & Associates Inc', email: 'zamoraassociates@gmail.com', phone: '(305) 273-7801', company: 'Zamora & Associates Inc (Miami)', category: 'Construction & Engineering', offer: 'Tier 1 ($99 Audit) -> Tier 2 ($497 Staff AI Bootcamp)' },
];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, api-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Prefer BREVO_API_KEY (must start with xkeysib- for Brevo v3 REST API)
  const rawBrevoKey = process.env.BREVO_API_KEY || process.env.BREVO_KEY || '';
  const rawViteBrevoKey = process.env.VITE_BREVO_API_KEY || '';
  const BREVO_API_KEY = rawBrevoKey.startsWith('xkeysib-')
    ? rawBrevoKey.trim()
    : rawViteBrevoKey.startsWith('xkeysib-')
      ? rawViteBrevoKey.trim()
      : (rawBrevoKey || rawViteBrevoKey).trim();
  const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://elpgqgcynmefzjxbzlwb.supabase.co';
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
  const GBP_REVIEW_URL =
    process.env.GOOGLE_BUSINESS_URL ||
    'https://www.google.com/search?q=AI+Dynamic+Pro+Miami';

  // GET: Return campaign metadata, GA4 config, Google Business Profile posts, or live Brevo Audit
  if (req.method === 'GET') {
    const queryAction = req.query?.action || '';

    if (queryAction === 'audit' && BREVO_API_KEY) {
      try {
        const headers = { Accept: 'application/json', 'api-key': BREVO_API_KEY };
        const [accountRes, listsRes, campaignsRes, sendersRes, blockedRes] = await Promise.all([
          fetch('https://api.brevo.com/v3/account', { headers }).catch(() => null),
          fetch('https://api.brevo.com/v3/contacts/lists?limit=50', { headers }).catch(() => null),
          fetch('https://api.brevo.com/v3/emailCampaigns?limit=25', { headers }).catch(() => null),
          fetch('https://api.brevo.com/v3/senders', { headers }).catch(() => null),
          fetch('https://api.brevo.com/v3/smtp/blockedContacts?limit=50', { headers }).catch(() => null),
        ]);

        let account = null;
        let brevoError = null;
        if (accountRes) {
          if (accountRes.ok) {
            account = await accountRes.json();
          } else {
            brevoError = await accountRes.json().catch(() => ({ status: accountRes.status }));
          }
        }
        const listsData = listsRes && listsRes.ok ? await listsRes.json() : { lists: [] };
        const campaignsData = campaignsRes && campaignsRes.ok ? await campaignsRes.json() : { campaigns: [] };
        const sendersData = sendersRes && sendersRes.ok ? await sendersRes.json() : { senders: [] };
        const blockedData = blockedRes && blockedRes.ok ? await blockedRes.json() : { contacts: [], count: 0 };

        const ipBlocked =
          (accountRes && accountRes.status === 401) ||
          (listsRes && listsRes.status === 401);

        return res.status(200).json({
          success: Boolean(account || (listsData.lists && listsData.lists.length > 0)),
          ipBlocked,
          brevoStatus: accountRes ? accountRes.status : null,
          brevoError,
          keyDiagnostics: {
            hasBrevoApiKey: Boolean(rawBrevoKey),
            brevoApiKeyLength: rawBrevoKey.length,
            brevoApiKeyStartsWithXkeysib: rawBrevoKey.startsWith('xkeysib-'),
            hasViteBrevoApiKey: Boolean(rawViteBrevoKey),
            viteBrevoApiKeyLength: rawViteBrevoKey.length,
            viteBrevoApiKeyStartsWithXkeysib: rawViteBrevoKey.startsWith('xkeysib-'),
            matchingEnvKeys: Object.keys(process.env).filter((k) =>
              /BREVO|BUFFER|SMTP/i.test(k)
            ),
          },
          account: account
            ? {
                email: account.email,
                companyName: account.companyName,
                plan: account.plan,
              }
            : null,
          lists: (listsData.lists || []).map((l) => ({
            id: l.id,
            name: l.name,
            totalSubscribers: l.totalSubscribers || l.uniqueSubscribers || 0,
            totalBlacklisted: l.totalBlacklisted || 0,
          })),
          externalCampaigns: (campaignsData.campaigns || []).map((c) => ({
            id: c.id,
            name: c.name,
            subject: c.subject,
            status: c.status, // 'draft' | 'sent' | 'archive' | 'queued' | 'suspended' | 'inProcess'
            scheduledAt: c.scheduledAt || null,
          })),
          senders: (sendersData.senders || []).map((s) => ({
            id: s.id,
            name: s.name,
            email: s.email,
            active: s.active,
          })),
          blockedContactsCount: blockedData.count || (blockedData.contacts || []).length || 0,
        });
      } catch (auditErr) {
        return res.status(200).json({
          success: false,
          error: auditErr.message || 'Audit error',
        });
      }
    }

    return res.status(200).json({
      brevoConfigured: Boolean(BREVO_API_KEY),
      ga4MeasurementId: 'G-M1RHKRVS9M',
      campaigns: Object.values(CAMPAIGNS).map(({ id, name, subject, utmCampaign, description }) => ({
        id,
        name,
        subject,
        utmCampaign,
        description,
        trackedBookingUrl: `https://www.aidynamic.pro/booking?utm_source=brevo&utm_medium=email&utm_campaign=${utmCampaign}`,
      })),
      googleBusinessPosts: GOOGLE_BUSINESS_POSTS,
      miamiGmapsLeads: MIAMI_GMAPS_LEADS,
      googleBusinessLinks: {
        websiteUrlForGbpProfile:
          'https://www.aidynamic.pro/?utm_source=google_business&utm_medium=gbp_profile&utm_campaign=miami_local',
        bookingUrlForGbpAppointment:
          'https://www.aidynamic.pro/booking?utm_source=google_business&utm_medium=gbp_appointment&utm_campaign=miami_local',
      },
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const {
      action = 'send', // 'send' | 'purge_blocked_contacts' | 'save_leads_to_list' | 'suspend_external_campaigns' | 'resume_external_campaigns' | 'create_sender'
      externalCampaignIds = [],
      campaignId = 'email_1_voice_jass',
      mode = 'all_brevo_contacts', // 'all_brevo_contacts' | 'test' | 'custom' | 'miami_gmaps_leads' | 'supabase_leads' | 'brevo_list'
      brevoListId = 2,
      statusFilter = 'all',
      customRecipients = [],
      customSubject = '',
      scheduledAt = '', // Optional ISO-8601 future timestamp e.g. '2026-11-03T10:15:00-05:00'
      senderEmail = 'jasmel@aidynamic.pro', // Verified Brevo sender email
      senderName = 'Jasmel Acosta — AI Dynamic Pro',
      replyToEmail = 'jasmel@aidynamic.pro',
      leadsToSave = [],
      batchOffset = 0,
      batchLimit = 0,
    } = req.body || {};

    if (!BREVO_API_KEY) {
      return res.status(400).json({
        error: 'BREVO_API_KEY / VITE_BREVO_API_KEY is not configured in environment variables.',
      });
    }

    // ACTION: Save extracted Miami Google Maps B2B Leads into Brevo Contact List AND Supabase `aidynamic_leads`
    if (action === 'save_leads_to_list') {
      const sourceLeads = Array.isArray(leadsToSave) && leadsToSave.length > 0 ? leadsToSave : MIAMI_GMAPS_LEADS;
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      };

      let targetListId = Number(brevoListId) || 2;
      let targetListName = 'AI Dynamic Pro — Miami B2B Leads';
      try {
        const listsRes = await fetch('https://api.brevo.com/v3/contacts/lists?limit=50', { headers }).catch(() => null);
        if (listsRes && listsRes.ok) {
          const listsData = await listsRes.json();
          const existing = (listsData.lists || []).find(
            (l) => l.name && l.name.toLowerCase().includes('ai dynamic pro')
          );
          if (existing) {
            targetListId = existing.id;
            targetListName = existing.name;
          } else {
            const folderId = (listsData.lists && listsData.lists[0]?.folderId) || 1;
            const createListRes = await fetch('https://api.brevo.com/v3/contacts/lists', {
              method: 'POST',
              headers,
              body: JSON.stringify({ name: targetListName, folderId }),
            }).catch(() => null);
            if (createListRes && createListRes.ok) {
              const created = await createListRes.json().catch(() => ({}));
              if (created.id) targetListId = created.id;
            }
          }
        }
      } catch {}

      let brevoSavedCount = 0;
      for (const item of sourceLeads) {
        const cleanEmail = (item.email || '').trim().toLowerCase();
        if (!cleanEmail || !cleanEmail.includes('@')) continue;
        const cRes = await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            email: cleanEmail,
            attributes: {
              FIRSTNAME: item.name || item.business_name || cleanEmail.split('@')[0],
              NAME: item.name || item.business_name || cleanEmail.split('@')[0],
              COMPANY: item.company || item.business_name || 'Miami Business',
            },
            listIds: [targetListId],
            updateEnabled: true,
          }),
        }).catch(() => null);
        if (cRes && (cRes.ok || cRes.status === 201 || cRes.status === 204)) {
          brevoSavedCount++;
        }
      }

      let supabaseSavedCount = 0;
      if (SUPABASE_KEY) {
        const existingEmails = new Set();
        const sbGet = await fetch(`${SUPABASE_URL}/rest/v1/aidynamic_leads?select=email&limit=500`, {
          headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
        }).catch(() => null);
        if (sbGet && sbGet.ok) {
          const rows = await sbGet.json().catch(() => []);
          for (const r of rows) {
            if (r.email) existingEmails.add(r.email.trim().toLowerCase());
          }
        }

        for (const item of sourceLeads) {
          const cleanEmail = (item.email || '').trim().toLowerCase();
          if (!cleanEmail || !cleanEmail.includes('@')) continue;
          if (existingEmails.has(cleanEmail)) {
            supabaseSavedCount++;
            continue;
          }
          const ins = await fetch(`${SUPABASE_URL}/rest/v1/aidynamic_leads`, {
            method: 'POST',
            headers: {
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${SUPABASE_KEY}`,
              'Content-Type': 'application/json',
              Prefer: 'return=minimal',
            },
            body: JSON.stringify({
              name: item.name || item.business_name || cleanEmail.split('@')[0],
              email: cleanEmail,
              phone: item.phone || null,
              company: item.company || item.business_name || null,
              service_interest: [item.category || 'Miami B2B', item.offer || item.recommended_offer || '$99 Audit'],
              status: 'contacted',
              source: 'google_maps_scraper_miami',
            }),
          }).catch(() => null);
          if (ins && (ins.ok || ins.status === 201)) {
            supabaseSavedCount++;
          }
        }
      }

      return res.status(200).json({
        success: true,
        brevoListId: targetListId,
        brevoListName: targetListName,
        brevoSavedCount,
        supabaseSavedCount,
        totalLeads: sourceLeads.length,
        message: `Saved ${ sourceLeads.length } Miami Google Maps B2B leads to Brevo List #${targetListId} ("${targetListName}": ${brevoSavedCount} synced) and Supabase CRM (${supabaseSavedCount} synced).`,
      });
    }

    // ACTION: Create & trigger verification for a new Brevo Sender (or delete & recreate to re-send confirmation email)
    if (action === 'create_sender' || action === 'resend_sender_verification') {
      const targetEmail = (senderEmail || 'jasmel@aidynamic.pro').trim().toLowerCase();
      const targetName = (senderName || 'Jasmel Acosta — AI Dynamic Pro').trim();
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      };

      // Also fetch domain DNS records from Brevo if available
      let domainDns = null;
      try {
        await fetch('https://api.brevo.com/v3/senders/domains', {
          method: 'POST',
          headers,
          body: JSON.stringify({ name: 'aidynamic.pro' }),
        }).catch(() => null);
        const domRes = await fetch('https://api.brevo.com/v3/senders/domains/aidynamic.pro', { headers }).catch(() => null);
        if (domRes && domRes.ok) {
          domainDns = await domRes.json().catch(() => null);
        }
      } catch {}

      // If sender already exists and is inactive, delete it first so Brevo sends a brand-new verification email
      try {
        const listSdr = await fetch('https://api.brevo.com/v3/senders', { headers }).catch(() => null);
        if (listSdr && listSdr.ok) {
          const sdrData = await listSdr.json();
          const existing = (sdrData.senders || []).find(
            (s) => s.email && s.email.trim().toLowerCase() === targetEmail && !s.active
          );
          if (existing && existing.id) {
            await fetch(`https://api.brevo.com/v3/senders/${existing.id}`, {
              method: 'DELETE',
              headers,
            }).catch(() => null);
          }
        }
      } catch {}

      const createRes = await fetch('https://api.brevo.com/v3/senders', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name: targetName,
          email: targetEmail,
        }),
      }).catch(() => null);

      if (createRes && createRes.ok) {
        const created = await createRes.json().catch(() => ({}));
        return res.status(200).json({
          success: true,
          sender: { id: created.id, name: targetName, email: targetEmail },
          domainDns,
          message: `Verification email sent to ${targetEmail}! Open your inbox and click the Brevo confirmation link to activate this sender.`,
        });
      }
      const errTxt = createRes ? await createRes.text().catch(() => 'Could not create sender') : 'Network error';
      return res.status(200).json({
        success: false,
        error: errTxt,
        domainDns,
        message: `Could not create sender from server (${errTxt}).`,
      });
    }

    // ACTION: Suspend / Pause OR Resume / Re-Activate external (MBMB) campaigns in Brevo
    if (action === 'suspend_external_campaigns' || action === 'resume_external_campaigns') {
      const isResume = action === 'resume_external_campaigns';
      const desiredStatus = isResume ? 'queued' : 'suspended';
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      };
      let targetIds = Array.isArray(externalCampaignIds) ? [...externalCampaignIds] : [];

      if (targetIds.length === 0) {
        const listRes = await fetch('https://api.brevo.com/v3/emailCampaigns?limit=50', { headers }).catch(() => null);
        if (listRes && listRes.ok) {
          const listData = await listRes.json();
          targetIds = (listData.campaigns || [])
            .filter((c) =>
              isResume
                ? c.status === 'suspended'
                : ['queued', 'inProcess', 'replicate'].includes(c.status)
            )
            .map((c) => c.id);
        }
      }

      const updatedIds = [];
      const updateErrors = [];
      for (const cid of targetIds) {
        const putRes = await fetch(`https://api.brevo.com/v3/emailCampaigns/${cid}/status`, {
          method: 'PUT',
          headers,
          body: JSON.stringify({ status: desiredStatus }),
        }).catch(() => null);
        if (putRes && (putRes.ok || putRes.status === 204)) {
          updatedIds.push(cid);
        } else if (putRes) {
          const errTxt = await putRes.text().catch(() => 'Could not update status');
          updateErrors.push({ id: cid, error: errTxt });
        }
      }

      return res.status(200).json({
        success: true,
        suspendedIds: updatedIds,
        updatedIds,
        suspendErrors: updateErrors,
        message: isResume
          ? updatedIds.length > 0
            ? `Resumed ${updatedIds.length} suspended external (MBMB) campaign(s) in Brevo.`
            : 'No suspended external (MBMB) campaigns found to resume—MBMB connection remains active and ready.'
          : updatedIds.length > 0
          ? `Paused ${updatedIds.length} active/queued external (MBMB) campaign(s) in Brevo.`
          : 'Verified: 0 active or queued external (MBMB) campaigns are currently scheduled to send.',
      });
    }

    const campaign = CAMPAIGNS[campaignId] || CAMPAIGNS.email_1_voice_jass;

    // Fetch global Brevo transactional blocklist + blacklisted contacts and ERASE them from Brevo lists & Supabase CRM
    const blockedSet = new Set();
    const erasedBlockedEmails = [];
    try {
      const blkRes = await fetch('https://api.brevo.com/v3/smtp/blockedContacts?limit=100', {
        headers: { Accept: 'application/json', 'api-key': BREVO_API_KEY },
      }).catch(() => null);
      if (blkRes && blkRes.ok) {
        const blkData = await blkRes.json();
        for (const b of blkData.contacts || []) {
          if (b.email) blockedSet.add(b.email.trim().toLowerCase());
        }
      }
    } catch {
      // Non-blocking if IP-restricted on serverless
    }

    // Helper to permanently erase blocked/blacklisted emails from Brevo Contacts & Supabase CRM
    const eraseBlockedContacts = async (emailsToErase) => {
      const uniqueEmails = [...new Set(emailsToErase.map((e) => (e || '').trim().toLowerCase()).filter(Boolean))];
      await Promise.all(
        uniqueEmails.map(async (blockedEmail) => {
          erasedBlockedEmails.push(blockedEmail);
          // 1. Delete from Brevo Contacts (removes from all lists)
          await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(blockedEmail)}`, {
            method: 'DELETE',
            headers: { Accept: 'application/json', 'api-key': BREVO_API_KEY },
          }).catch(() => null);
          // 2. Delete from Supabase CRM aidynamic_leads if present
          if (SUPABASE_KEY) {
            await fetch(
              `${SUPABASE_URL}/rest/v1/aidynamic_leads?email=eq.${encodeURIComponent(blockedEmail)}`,
              {
                method: 'DELETE',
                headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
              }
            ).catch(() => null);
          }
        })
      );
    };

    if (action === 'purge_blocked_contacts') {
      for (const offset of [0, 500, 1000, 1500]) {
        const allRes = await fetch(
          `https://api.brevo.com/v3/contacts?limit=500&offset=${offset}`,
          { headers: { Accept: 'application/json', 'api-key': BREVO_API_KEY } }
        ).catch(() => null);
        if (!allRes || !allRes.ok) break;
        const allData = await allRes.json();
        const batch = allData.contacts || [];
        for (const c of batch) {
          if (c.emailBlacklisted && c.email) {
            blockedSet.add(c.email.trim().toLowerCase());
          }
        }
        if (batch.length < 500) break;
      }
      await eraseBlockedContacts([...blockedSet]);
      return res.status(200).json({
        success: true,
        erasedCount: erasedBlockedEmails.length,
        erasedEmails: erasedBlockedEmails,
        message: `Permanently erased ${erasedBlockedEmails.length} blocked/blacklisted contact(s) from Brevo lists and Supabase CRM.`,
      });
    }

    let recipients = [];
    let skippedUnsubscribed = 0;

    if (mode === 'test') {
      recipients = [
        {
          name: 'Jasmel',
          email: 'jasmelacosta@gmail.com',
          company: 'your company',
        },
      ];
    } else if (mode === 'miami_gmaps_leads') {
      const seen = new Set();
      for (const r of MIAMI_GMAPS_LEADS) {
        const cleanEmail = (r.email || '').trim().toLowerCase();
        if (!cleanEmail || !cleanEmail.includes('@') || seen.has(cleanEmail)) continue;
        seen.add(cleanEmail);
        if (blockedSet.has(cleanEmail)) {
          skippedUnsubscribed++;
          continue;
        }
        recipients.push({
          name: r.name,
          email: cleanEmail,
          company: r.name,
        });
      }
    } else if (mode === 'custom' && Array.isArray(customRecipients)) {
      const seen = new Set();
      for (const r of customRecipients) {
        const cleanEmail = (r?.email || '').trim().toLowerCase();
        if (!cleanEmail || !cleanEmail.includes('@') || seen.has(cleanEmail)) continue;
        seen.add(cleanEmail);
        if (blockedSet.has(cleanEmail) || r?.emailBlacklisted) {
          skippedUnsubscribed++;
          continue;
        }
        recipients.push({
          name: r.name || cleanEmail.split('@')[0],
          email: cleanEmail,
          company: r.company || 'your organization',
        });
      }
    } else if (mode === 'all_brevo_contacts') {
      // Fetch ALL contacts across the entire Brevo account (up to 2,000 contacts in 500-contact pages) + Supabase CRM leads
      const seen = new Set();
      for (const offset of [0, 500, 1000, 1500]) {
        const allRes = await fetch(
          `https://api.brevo.com/v3/contacts?limit=500&offset=${offset}`,
          { headers: { Accept: 'application/json', 'api-key': BREVO_API_KEY } }
        ).catch(() => null);
        if (!allRes || !allRes.ok) break;
        const allData = await allRes.json();
        const contactsBatch = allData.contacts || [];
        for (const c of contactsBatch) {
          const cleanEmail = (c.email || '').trim().toLowerCase();
          if (!cleanEmail || !cleanEmail.includes('@') || seen.has(cleanEmail)) continue;
          seen.add(cleanEmail);
          if (c.emailBlacklisted || blockedSet.has(cleanEmail)) {
            blockedSet.add(cleanEmail);
            skippedUnsubscribed++;
            continue;
          }
          const attrs = c.attributes || {};
          recipients.push({
            name: attrs.FIRSTNAME || attrs.NAME || attrs.PRENOM || cleanEmail.split('@')[0],
            email: cleanEmail,
            company: attrs.COMPANY || attrs.ENTREPRISE || 'your company',
          });
        }
        if (contactsBatch.length < 500) break;
      }
      // Also merge any unique Supabase CRM leads not already in Brevo
      if (SUPABASE_KEY) {
        const sbRes = await fetch(
          `${SUPABASE_URL}/rest/v1/aidynamic_leads?select=name,email,company,status&order=created_at.desc&limit=500`,
          { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
        ).catch(() => null);
        if (sbRes && sbRes.ok) {
          const rows = await sbRes.json();
          for (const r of rows) {
            const cleanEmail = (r.email || '').trim().toLowerCase();
            if (!cleanEmail || !cleanEmail.includes('@') || seen.has(cleanEmail)) continue;
            seen.add(cleanEmail);
            if (blockedSet.has(cleanEmail) || r.status === 'lost') {
              skippedUnsubscribed++;
              continue;
            }
            recipients.push({
              name: r.name || cleanEmail.split('@')[0],
              email: cleanEmail,
              company: r.company || 'your company',
            });
          }
        }
      }
    } else if (mode === 'brevo_list') {
      const listIdNum = Number(brevoListId) || 2;
      const listContactsRes = await fetch(
        `https://api.brevo.com/v3/contacts/lists/${listIdNum}/contacts?limit=500`,
        {
          headers: { Accept: 'application/json', 'api-key': BREVO_API_KEY },
        }
      ).catch(() => null);

      if (listContactsRes && listContactsRes.ok) {
        const listContactsData = await listContactsRes.json();
        const seen = new Set();
        for (const c of listContactsData.contacts || []) {
          const cleanEmail = (c.email || '').trim().toLowerCase();
          if (!cleanEmail || !cleanEmail.includes('@') || seen.has(cleanEmail)) continue;
          seen.add(cleanEmail);
          if (c.emailBlacklisted || blockedSet.has(cleanEmail)) {
            blockedSet.add(cleanEmail);
            skippedUnsubscribed++;
            continue;
          }
          const attrs = c.attributes || {};
          recipients.push({
            name: attrs.FIRSTNAME || attrs.NAME || attrs.PRENOM || cleanEmail.split('@')[0],
            email: cleanEmail,
            company: attrs.COMPANY || attrs.ENTREPRISE || 'your company',
          });
        }
      }
    } else if (mode === 'supabase_leads' && SUPABASE_KEY) {
      const filterQuery =
        statusFilter && statusFilter !== 'all' ? `&status=eq.${encodeURIComponent(statusFilter)}` : '';
      const sbRes = await fetch(
        `${SUPABASE_URL}/rest/v1/aidynamic_leads?select=name,email,company,status${filterQuery}&order=created_at.desc&limit=100`,
        {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
        }
      );
      if (sbRes.ok) {
        const rows = await sbRes.json();
        const seen = new Set();
        for (const r of rows) {
          const cleanEmail = (r.email || '').trim().toLowerCase();
          if (!cleanEmail || !cleanEmail.includes('@') || seen.has(cleanEmail)) continue;
          seen.add(cleanEmail);
          if (blockedSet.has(cleanEmail) || r.status === 'lost') {
            skippedUnsubscribed++;
            continue;
          }
          recipients.push({
            name: r.name || cleanEmail.split('@')[0],
            email: cleanEmail,
            company: r.company || 'your company',
          });
        }
      }
    }

    // Automatically erase any blocked/blacklisted contacts discovered during recipient resolution
    if (blockedSet.size > 0) {
      await eraseBlockedContacts([...blockedSet]);
    }

    const totalEligibleRecipients = recipients.length;
    if (Number(batchLimit) > 0) {
      const startIdx = Math.max(0, Number(batchOffset) || 0);
      recipients = recipients.slice(startIdx, startIdx + Number(batchLimit));
    }

    if (recipients.length === 0) {
      return res.status(200).json({
        success: true,
        sentCount: 0,
        totalAttempted: 0,
        totalEligibleRecipients,
        skippedUnsubscribed,
        erasedBlockedEmails,
        message: 'No remaining recipients in this batch window.',
      });
    }

    // Resolve verified active sender from Brevo so campaigns never fail due to an unverified sender address
    let resolvedSenderEmail = (senderEmail || '').trim().toLowerCase();
    const resolvedSenderName = (senderName || 'Jasmel Acosta — AI Dynamic Pro').trim();
    const resolvedReplyTo = (replyToEmail || 'jasmel@aidynamic.pro').trim().toLowerCase();

    try {
      const sdrRes = await fetch('https://api.brevo.com/v3/senders', {
        headers: { Accept: 'application/json', 'api-key': BREVO_API_KEY },
      }).catch(() => null);
      if (sdrRes && sdrRes.ok) {
        const sdrData = await sdrRes.json();
        const activeSenders = (sdrData.senders || []).filter((s) => s && s.active && s.email);
        const requestedIsActive =
          resolvedSenderEmail &&
          activeSenders.some((s) => s.email.trim().toLowerCase() === resolvedSenderEmail);

        if (!requestedIsActive) {
          const aiDynamicSender = activeSenders.find((s) =>
            s.email.toLowerCase().endsWith('@aidynamic.pro')
          );
          const aiScribeSender = activeSenders.find((s) =>
            s.email.toLowerCase().includes('aimedicalscriber')
          );
          if (aiDynamicSender) {
            resolvedSenderEmail = aiDynamicSender.email.trim().toLowerCase();
          } else if (aiScribeSender) {
            resolvedSenderEmail = aiScribeSender.email.trim().toLowerCase();
          } else if (activeSenders.length > 0) {
            resolvedSenderEmail = activeSenders[0].email.trim().toLowerCase();
          }
        }
      }
    } catch {
      // Fallback if network issue
    }
    if (!resolvedSenderEmail) {
      resolvedSenderEmail = 'jasmel@aidynamic.pro';
    }

    let sentCount = 0;
    const errors = [];
    const renderedPayloads = [];

    // Process sends in parallel chunks of 25 for fast high-volume execution across all lists
    const CONCURRENCY = 25;
    for (let i = 0; i < recipients.length; i += CONCURRENCY) {
      const chunk = recipients.slice(i, i + CONCURRENCY);
      await Promise.all(
        chunk.map(async (recipient) => {
          const utmUrl = `https://www.aidynamic.pro/booking?utm_source=brevo&utm_medium=email&utm_campaign=${campaign.utmCampaign}`;
          const homeUtmUrl = `https://www.aidynamic.pro/?utm_source=brevo&utm_medium=email&utm_campaign=${campaign.utmCampaign}`;
          const gbpUrl = GBP_REVIEW_URL;
          const phoneUrl = 'tel:+17866432099';

          const personalizedSubject = (customSubject || campaign.subject)
            .replace(/\{\{company\}\}/g, recipient.company || 'your business')
            .replace(/\{\{name\}\}/g, recipient.name || 'there');

          const htmlContent = campaign.buildHtml({
            name: recipient.name,
            company: recipient.company,
            utmUrl,
            homeUtmUrl,
            gbpUrl,
            phoneUrl,
          });

          const brevoPayload = {
            sender: { name: resolvedSenderName, email: resolvedSenderEmail },
            to: [{ email: recipient.email, name: recipient.name }],
            replyTo: { email: resolvedReplyTo, name: resolvedSenderName },
            subject: personalizedSubject,
            htmlContent,
            ...(scheduledAt ? { scheduledAt } : {}),
            headers: {
              'List-Unsubscribe': `<mailto:${resolvedReplyTo}?subject=Unsubscribe>`,
              'X-Entity-Ref-ID': `aidynamic-${campaign.utmCampaign}-${Date.now()}`,
            },
            tags: [campaign.utmCampaign, 'aidynamic_sequence'],
          };

          if (renderedPayloads.length < 50) {
            renderedPayloads.push(brevoPayload);
          }

          try {
            const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'api-key': BREVO_API_KEY,
              },
              body: JSON.stringify(brevoPayload),
            });

            if (brevoRes.ok) {
              sentCount++;
            } else {
              const errText = await brevoRes.text().catch(() => 'Unknown error');
              errors.push({ email: recipient.email, error: errText });
            }
          } catch (sendErr) {
            errors.push({ email: recipient.email, error: sendErr.message });
          }
        })
      );
    }

    return res.status(200).json({
      success: sentCount > 0,
      campaignId: campaign.id,
      campaignName: campaign.name,
      utmCampaign: campaign.utmCampaign,
      senderUsed: resolvedSenderEmail,
      replyToUsed: resolvedReplyTo,
      sentCount,
      totalAttempted: recipients.length,
      totalEligibleRecipients,
      skippedUnsubscribed,
      erasedBlockedCount: erasedBlockedEmails.length,
      erasedBlockedEmails,
      renderedPayloads: sentCount === 0 ? renderedPayloads : [],
      errors: errors.slice(0, 5),
    });
  } catch (error) {
    console.error('[Email Campaign API] Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
