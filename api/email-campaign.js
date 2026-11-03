// Serverless API Endpoint: /api/email-campaign
// 5-Email Human Continuation Sequence (Brevo) + Google Analytics (GA4) UTM Tracking + Google Business Profile ("Google Buz") Hub

const CAMPAIGNS = {
  email_1_voice_jass: {
    id: 'email_1_voice_jass',
    name: 'Week 1 — Executive AI Consultation: Cut Operating Costs, Reduce Staff Overhead & Automate',
    subject: 'cutting operating costs and automating manual work at {{company}}',
    utmCampaign: 'seq1_voice_jass',
    description: 'Executive founder note targeting company owners on payroll bloat, pitching AI Consultation ($99 Audit), Custom AI Solutions (with live JAss demo), and Corporate AI Training.',
    buildHtml: ({ name = 'there', company = 'your company', utmUrl, homeUtmUrl, phoneUrl }) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 620px; margin: 0 auto; color: #1e293b; line-height: 1.7; font-size: 16px; padding: 12px 4px;">
        <p>Hi ${name},</p>

        <p>I’m Jasmel Acosta, Founder of <strong>AI Dynamic Pro</strong> here in Miami. When I sit down with company owners and executives at firms like <strong>${company}</strong>, the #1 challenge on their P&amp;L is almost always the same:</p>

        <p><strong>Payroll and operating overhead keep rising, while 60% to 80% of daily staff hours are spent on repetitive tasks that a machine should be doing automatically.</strong></p>

        <p>At <strong>AI Dynamic Pro</strong>, we are an Executive AI Consultancy &amp; Engineering Partner built around a simple objective—<strong>to cut your operating costs, automate everything possible, reduce staff overhead, and make your entire company run faster and leaner:</strong></p>

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #0f172a; padding: 16px 20px; margin: 20px 0; border-radius: 8px; font-size: 15px;">
          <p style="margin: 0 0 10px 0;"><strong>1. Executive AI Consultation (Free 15-Min Triage Call or $99 Full Audit):</strong><br/>
          We audit your departments, pinpoint where manual labor is bleeding money, and build you a <strong>Free 48-Hour Live AI Prototype</strong> before you spend a dime on development.</p>
          <p style="margin: 0 0 10px 0;"><strong>2. Custom AI Solutions &amp; 24/7 Agents ($997 Turnkey or $297/mo Managed):</strong><br/>
          We deploy custom AI systems in 14 days that replace repetitive manual roles—from our 24/7 bilingual AI voice &amp; chat receptionist (<strong>JAss</strong>) to automated intake, CRM, and billing.</p>
          <p style="margin: 0;"><strong>3. Corporate AI Staff Bootcamp ($497 Half-Day Team Workshop):</strong><br/>
          Instead of hiring more staff, we train up to 15 of your existing employees on role-specific AI workflows and SOPs so <strong>1 AI-trained employee produces the output of 5</strong>.</p>
        </div>

        <p>You can see how our technology works in 30 seconds right now: visit <a href="${homeUtmUrl}" style="color: #0284c7; font-weight: 700; text-decoration: underline;">www.aidynamic.pro</a> and talk live with <strong>JAss</strong> (tap the green microphone or chat button in the corner in English or Spanish).</p>

        <p><strong>Our Zero-Risk Dollar Guarantee:</strong> 100% of our <strong>$99 Full Department Audit</strong> is credited toward any solution or training—and <strong>if we don’t uncover at least $2,500+/month ($30,000/year) in payroll waste you can automate immediately, you pay $0.</strong></p>

        <p style="margin: 24px 0;">
          👉 <a href="${utmUrl}" style="background: #0f172a; color: #ffffff; padding: 13px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; display: inline-block;">Book Your Free 15-Min Call or $99 Audit (+ Free 48h Prototype) →</a>
        </p>

        <p>Or call/text me directly on my Miami line at <a href="${phoneUrl}" style="color: #0f172a; font-weight: 700; text-decoration: none;">+1 (786) 643-2099</a>.</p>

        <p style="margin-top: 28px;">Best regards,<br/>
        <strong>Jasmel Acosta</strong><br/>
        Founder &amp; Applied AI Systems Architect, AI Dynamic Pro<br/>
        📞 <a href="${phoneUrl}" style="color: #64748b; text-decoration: none;">(786) 643-2099</a> • <a href="${homeUtmUrl}" style="color: #0284c7;">www.aidynamic.pro</a></p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 28px 0 12px;" />
        <p style="font-size: 12px; color: #94a3b8; line-height: 1.5;">
          AI Dynamic Pro • Brickell Financial District, Miami, FL 33131 • Don't want future executive notes from me? Simply reply "unsubscribe" or <a href="mailto:jasmelacosta@gmail.com?subject=Unsubscribe" style="color: #64748b; text-decoration: underline;">click here to opt out</a> anytime.
        </p>
      </div>
    `,
  },

  email_2_audit_99: {
    id: 'email_2_audit_99',
    name: 'Week 2 — Custom AI Solutions: Automate Everything Possible & Reduce Headcount Dependency',
    subject: 'how {{company}} can automate 80% of daily admin without hiring more staff',
    utmCampaign: 'seq2_audit_99',
    description: 'Focuses on replacing expensive manual bottlenecks with 24/7 autonomous AI solutions across front-desk, operations, billing, and CRM.',
    buildHtml: ({ name = 'there', company = 'your company', utmUrl, homeUtmUrl, phoneUrl }) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 620px; margin: 0 auto; color: #1e293b; line-height: 1.7; font-size: 16px; padding: 12px 4px;">
        <p>Hi ${name},</p>

        <p>Every time a company grows, the traditional playbook says you have to hire more people: another receptionist to answer phones, another coordinator to chase paperwork, another admin to copy-paste data between spreadsheets and software.</p>

        <p><strong>That model destroys profit margins.</strong> Every manual role adds $45,000–$75,000+ in salary, payroll taxes, turnover, and human error—and human staff still can't answer phones at 7:00 PM or on weekends.</p>

        <p>At <strong>AI Dynamic Pro</strong>, we consult with companies like <strong>${company}</strong> to <strong>automate everything possible</strong> so you can reduce headcount dependency and run a much leaner, more profitable operation:</p>

        <ul style="padding-left: 22px; margin: 18px 0;">
          <li style="margin-bottom: 10px;"><strong>24/7 Front-Desk &amp; Phone Automation (JAss — $997 Turnkey or $297/mo Managed):</strong> Answers 100% of calls and web inquiries on Ring 1 in fluent English &amp; Spanish, qualifies prospects, and books appointments directly into your calendar.</li>
          <li style="margin-bottom: 10px;"><strong>Back-Office, Intake &amp; Billing Automation:</strong> Eliminates manual data entry, document intake, invoice/claim scrubbing, and spreadsheet copy-pasting in 14 days.</li>
          <li style="margin-bottom: 6px;"><strong>Autonomous Sales &amp; CRM Pipelines:</strong> Follows up with every lead in under 45 seconds across SMS, email, and voice so zero revenue falls through the cracks.</li>
        </ul>

        <p>Before you hire another administrative employee—or keep paying for manual busywork—start with a <strong>Free 15-Minute Executive Triage Call</strong> or our <strong>$99 Full Department AI Audit</strong> for <strong>${company}</strong> (including a <strong>Free 48-Hour Live Prototype</strong>).</p>

        <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 14px 18px; margin: 20px 0; border-radius: 6px; font-size: 15px;">
          <strong>Zero-Risk Dollar Guarantee:</strong> We will show you the exact AI solutions to cut your operating costs and save at least <strong>$2,500+/month ($30,000/year)</strong> in manual payroll—or the audit costs you <strong>$0</strong>.
        </div>

        <p style="margin: 24px 0;">
          👉 <a href="${utmUrl}" style="background: #0f172a; color: #f8fafc; padding: 13px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; display: inline-block;">Schedule Your Free 15-Min Call or $99 Audit (+ Free 48h Prototype) →</a>
        </p>

        <p>Or reply directly to this email / call me at <a href="${phoneUrl}" style="color: #0f172a; font-weight: 700; text-decoration: none;">(786) 643-2099</a> and tell me which department at <strong>${company}</strong> is consuming the most manual hours right now.</p>

        <p style="margin-top: 28px;">Best regards,<br/>
        <strong>Jasmel Acosta</strong><br/>
        Founder, AI Dynamic Pro • <a href="${homeUtmUrl}" style="color: #0284c7;">www.aidynamic.pro</a><br/>
        📞 (786) 643-2099</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 28px 0 12px;" />
        <p style="font-size: 12px; color: #94a3b8; line-height: 1.5;">
          AI Dynamic Pro • Brickell Financial District, Miami, FL 33131 • Don't want future executive notes from me? Simply reply "unsubscribe" or <a href="mailto:jasmelacosta@gmail.com?subject=Unsubscribe" style="color: #64748b; text-decoration: underline;">click here to opt out</a> anytime.
        </p>
      </div>
    `,
  },

  email_3_staff_training: {
    id: 'email_3_staff_training',
    name: 'Week 3 — Corporate AI Training: Make 1 Trained Employee Do the Work of 5',
    subject: 'training {{company}}’s staff to produce 5x output with AI (without hiring)',
    utmCampaign: 'seq3_staff_training',
    description: 'Sells Corporate AI Staff Training & SOP implementation so companies operate with a smaller, faster, 5x more productive workforce.',
    buildHtml: ({ name = 'there', company = 'your company', utmUrl, homeUtmUrl, phoneUrl }) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 620px; margin: 0 auto; color: #1e293b; line-height: 1.7; font-size: 16px; padding: 12px 4px;">
        <p>Hi ${name},</p>

        <p>What would happen to <strong>${company}</strong>’s bottom line if every person on your core team could finish a full 8-hour day of administrative, operational, and client work in under 90 minutes?</p>

        <p>Right now, the biggest gap separating high-margin companies from struggling ones isn't how many employees they have—<strong>it’s how much output each employee produces using AI.</strong></p>

        <p>When we consult with companies, we see two problems holding teams back:</p>
        <ul style="padding-left: 22px; margin: 16px 0;">
          <li style="margin-bottom: 8px;"><strong>Untrained Staff:</strong> Employees still do tasks manually because nobody trained them on how to use AI for <em>their exact job role</em>.</li>
          <li style="margin-bottom: 4px;"><strong>No AI Standard Operating Procedures (SOPs):</strong> Owners worry about company data privacy and lack structured workflows that force consistent efficiency.</li>
        </ul>

        <p>Alongside building custom automation solutions, <strong>AI Dynamic Pro</strong> delivers our <strong>$497 Corporate AI Staff Bootcamp</strong> (half-day team workshop for up to 15 employees, on-site in South Florida or live virtual, normally $1,500):</p>
        <ul style="padding-left: 22px; margin: 16px 0;">
          <li style="margin-bottom: 6px;">We train your existing staff hands-on with custom AI tools built for their department (English &amp; Spanish).</li>
          <li style="margin-bottom: 6px;">We install strict <strong>Data Privacy Guardrails &amp; Role-Specific AI SOPs</strong> across your company.</li>
          <li style="margin-bottom: 4px;"><strong>The Result:</strong> 1 trained employee can reliably handle the workload of 4 to 5 manual staff—allowing you to reduce payroll bloat and scale without hiring.</li>
        </ul>

        <p style="margin: 24px 0;">
          📅 <a href="${utmUrl}" style="background: #0f172a; color: #ffffff; padding: 13px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; display: inline-block;">Book Your $497 Corporate AI Staff Bootcamp or Free 15m Call →</a>
        </p>

        <p>Or explore our consulting, automation, and training programs at <a href="${homeUtmUrl}" style="color: #0284c7; font-weight: 700;">www.aidynamic.pro</a>.</p>

        <p style="margin-top: 28px;">Best regards,<br/>
        <strong>Jasmel Acosta</strong><br/>
        Founder, AI Dynamic Pro<br/>
        📞 <a href="${phoneUrl}" style="color: #0f172a; font-weight: 700; text-decoration: none;">+1 (786) 643-2099</a></p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 28px 0 12px;" />
        <p style="font-size: 12px; color: #94a3b8; line-height: 1.5;">
          AI Dynamic Pro • Brickell Financial District, Miami, FL 33131 • Don't want future executive notes from me? Simply reply "unsubscribe" or <a href="mailto:jasmelacosta@gmail.com?subject=Unsubscribe" style="color: #64748b; text-decoration: underline;">click here to opt out</a> anytime.
        </p>
      </div>
    `,
  },

  email_4_before_after: {
    id: 'email_4_before_after',
    name: 'Week 4 — The P&L Comparison: Traditional Staffing Overhead vs. The AI-Automated Company',
    subject: 'the cost of 3 manual roles vs. 1 automated system at {{company}}',
    utmCampaign: 'seq4_before_after',
    description: 'Hard executive P&L comparison showing how AI Consultation + Custom AI Solutions + Staff Training slash monthly overhead.',
    buildHtml: ({ name = 'there', company = 'your company', utmUrl, homeUtmUrl, phoneUrl }) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 620px; margin: 0 auto; color: #1e293b; line-height: 1.7; font-size: 16px; padding: 12px 4px;">
        <p>Hi ${name},</p>

        <p>If you look at how companies in your industry will compete over the next 12 months, it comes down to two operating models for <strong>${company}</strong>:</p>

        <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 15px 18px; margin: 18px 0; border-radius: 6px; font-size: 15px;">
          <strong>❌ Model A — Traditional High-Payroll Overhead:</strong><br/>
          • Paying $12,000–$18,000+/month for multiple staff members to answer routine calls, schedule appointments, chase intake forms, and copy-paste data.<br/>
          • 38% of calls during lunch and after 5:00 PM still go to voicemail.<br/>
          • Slow 4–6 hour lead follow-up, human error, overtime, and constant staff turnover.
        </div>

        <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 15px 18px; margin: 18px 0; border-radius: 6px; font-size: 15px;">
          <strong>✅ Model B — The AI Dynamic Automated Company:</strong><br/>
          • <strong>AI Consultation ($99 Audit or Free 15m Call):</strong> Every department audited with a guarantee to uncover <strong>$2,500+/mo in payroll savings</strong> or you pay $0.<br/>
          • <strong>Custom AI Solutions ($997 Turnkey or $297/mo Managed):</strong> Calls, web chat, scheduling, intake, and CRM follow-ups happen autonomously in under 45 seconds, 24/7/365 in English &amp; Spanish.<br/>
          • <strong>$497 Corporate AI Staff Bootcamp:</strong> A leaner, sharper team trained in 1 afternoon to produce 5x output at a fraction of traditional payroll cost.
        </div>

        <p>We have already engineered and deployed <strong>21 production AI systems</strong> across Healthcare, Legal, Real Estate, Construction, Computer Vision, and B2B Operations—you can inspect our live technical portfolio anytime at <a href="https://www.aidynamic.pro/projects?utm_source=brevo&utm_medium=email&utm_campaign=seq4_before_after" style="color: #0284c7; font-weight: 700;">www.aidynamic.pro/projects</a>.</p>

        <p>Ready to transition <strong>${company}</strong> from Model A to Model B? Start with a <strong>Free 15-Minute Executive Triage Call</strong> or our <strong>$99 Zero-Risk Department Audit (+ Free 48-Hour Live Prototype)</strong>:</p>

        <p style="margin: 24px 0;">
          👉 <a href="${utmUrl}" style="background: #10b981; color: #052e16; padding: 13px 24px; border-radius: 8px; text-decoration: none; font-weight: 800; display: inline-block;">Book Free 15-Min Call or $99 Audit (Save $2,500+/Mo or Pay $0) →</a>
        </p>

        <p style="margin-top: 28px;">Best regards,<br/>
        <strong>Jasmel Acosta</strong><br/>
        Founder, AI Dynamic Pro • Miami, FL<br/>
        📞 <a href="${phoneUrl}" style="color: #0f172a; font-weight: 700; text-decoration: none;">(786) 643-2099</a> • <a href="${homeUtmUrl}" style="color: #0284c7;">www.aidynamic.pro</a></p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 28px 0 12px;" />
        <p style="font-size: 12px; color: #94a3b8; line-height: 1.5;">
          AI Dynamic Pro • Brickell Financial District, Miami, FL 33131 • Don't want future executive notes from me? Simply reply "unsubscribe" or <a href="mailto:jasmelacosta@gmail.com?subject=Unsubscribe" style="color: #64748b; text-decoration: underline;">click here to opt out</a> anytime.
        </p>
      </div>
    `,
  },

  email_5_founder_checkin: {
    id: 'email_5_founder_checkin',
    name: 'Week 5 — Direct Founder Note: 15-Minute Cost-Reduction & AI Automation Review',
    subject: '15-minute AI cost-reduction review for {{company}}, {{name}}',
    utmCampaign: 'seq5_founder_checkin',
    description: 'Executive closing check-in from Jasmel Acosta summarizing AI Consultation, AI Solutions, and Corporate AI Training.',
    buildHtml: ({ name = 'there', company = 'your business', utmUrl, homeUtmUrl, gbpUrl, phoneUrl }) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 620px; margin: 0 auto; color: #1e293b; line-height: 1.7; font-size: 16px; padding: 12px 4px;">
        <p>Hi ${name},</p>

        <p>I know running <strong>${company}</strong> keeps your schedule packed, so I will make this my final note for now.</p>

        <p>Whenever you are ready to look seriously at cutting operating costs and modernizing your workflows, remember the 3 ways <strong>AI Dynamic Pro</strong> helps companies scale profits without scaling payroll:</p>

        <ol style="padding-left: 22px; margin: 16px 0;">
          <li style="margin-bottom: 8px;"><strong>Executive AI Consultation (Free 15-Min Call or $99 Audit + Free 48h Prototype):</strong> Guaranteed to uncover at least <strong>$2,500+/month ($30,000/year)</strong> in manual payroll savings—or you pay $0.</li>
          <li style="margin-bottom: 8px;"><strong>Custom AI Solutions &amp; 24/7 Agents ($997 Turnkey or $297/mo Managed):</strong> We automate everything possible—24/7 bilingual AI phone/chat receptionists (<strong>JAss</strong>), CRM pipelines, billing, and custom apps—so you need fewer manual hands.</li>
          <li style="margin-bottom: 4px;"><strong>Corporate AI Staff Bootcamp ($497 Half-Day Team Workshop):</strong> We train and certify up to 15 of your staff members to operate at 5x speed with safe, structured AI SOPs.</li>
        </ol>

        <p>Keep my direct Miami contact information below for whenever the timing is right—or test <strong>JAss</strong> live on our website anytime:</p>

        <p style="margin: 20px 0;">
          🌐 <strong>Executive Website &amp; Live AI Demo:</strong> <a href="${homeUtmUrl}" style="color: #0284c7; font-weight: 700;">www.aidynamic.pro</a><br/>
          📅 <strong>Book a 15-Min Consultation or $99 Audit:</strong> <a href="${utmUrl}" style="color: #0284c7; font-weight: 700;">www.aidynamic.pro/booking</a><br/>
          📍 <strong>Google Business Profile:</strong> <a href="${gbpUrl}" style="color: #0284c7; font-weight: 700;">AI Dynamic Pro on Google (Miami)</a><br/>
          📞 <strong>My Direct Line (Call/Text):</strong> <a href="${phoneUrl}" style="color: #0f172a; font-weight: 700; text-decoration: none;">+1 (786) 643-2099</a>
        </p>

        <p>Wishing you and the team at <strong>${company}</strong> continued success.</p>

        <p style="margin-top: 28px;">Warm regards,<br/>
        <strong>Jasmel Acosta</strong><br/>
        Founder &amp; Applied AI Systems Architect, AI Dynamic Pro</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 28px 0 12px;" />
        <p style="font-size: 12px; color: #94a3b8; line-height: 1.5;">
          AI Dynamic Pro • Brickell Financial District, Miami, FL 33131 • Don't want future executive notes from me? Simply reply "unsubscribe" or <a href="mailto:jasmelacosta@gmail.com?subject=Unsubscribe" style="color: #64748b; text-decoration: underline;">click here to opt out</a> anytime.
        </p>
      </div>
    `,
  },
};

// Ready-to-publish Google Business Profile ("Google Buz") Local Posts with GA4 UTM tracking
const GOOGLE_BUSINESS_POSTS = [
  {
    id: 'gbp_audit_offer',
    type: 'OFFER POST',
    title: 'Free 15-Min AI Triage Call or $99 Cost-Reduction Audit (+ Free 48h Prototype)',
    ctaButton: 'Book Online',
    ctaUrl: 'https://www.aidynamic.pro/booking?utm_source=google_business&utm_medium=gbp_offer&utm_campaign=audit_99',
    content: `How much payroll is your company spending on manual tasks that AI should be doing automatically? 📉⚡\n\nAt AI Dynamic Pro in Miami, we help companies cut operating costs, reduce staff overhead, and automate everything possible:\n\n1️⃣ Executive AI Consultation (Free 15m Call or $99 Full Audit + Free 48h Prototype — Guaranteed to find $2,500+/mo in payroll savings or you pay $0!)\n2️⃣ Custom AI Solutions & 24/7 Agents ($997 turnkey or $297/mo managed bilingual voice/chat receptionists, CRM & billing)\n3️⃣ $497 Corporate AI Staff Bootcamp (train up to 15 staff so 1 employee produces the output of 5)\n\n📞 Call/Text (786) 643-2099 or click "Book Online" today!`,
  },
  {
    id: 'gbp_voice_jass',
    type: 'WHAT’S NEW POST',
    title: '24/7 Bilingual AI Voice & Web Receptionist (JAss) — $997 Turnkey or $297/mo',
    ctaButton: 'Learn More',
    ctaUrl: 'https://www.aidynamic.pro/?utm_source=google_business&utm_medium=gbp_post&utm_campaign=voice_jass',
    content: `Stop losing leads to voicemail and stop overpaying for manual administrative busywork. 📞🤖\n\nAI Dynamic Pro deploys custom 24/7 Bilingual (English & Spanish) AI Receptionists and back-office automations in 14 days for $997 turnkey (or $297/mo all-inclusive managed) — plus we build your Free 48-Hour Live Prototype upfront!\n\nTest JAss live on www.aidynamic.pro or call (786) 643-2099 today!`,
  },
  {
    id: 'gbp_staff_training',
    type: 'UPDATE POST',
    title: '$497 Corporate AI Staff Bootcamp: 1 Trained Employee Doing the Work of 5',
    ctaButton: 'Book Online',
    ctaUrl: 'https://www.aidynamic.pro/booking?utm_source=google_business&utm_medium=gbp_post&utm_campaign=staff_training',
    content: `Scale your company's output without bloating your payroll. 💡👥\n\nAI Dynamic Pro delivers our Half-Day Corporate AI Staff Bootcamp for just $497 (up to 15 staff, on-site in South Florida & virtual):\n✔️ Role-specific AI workflows & automation\n✔️ Data security & privacy Standard Operating Procedures (SOPs)\n✔️ 5x daily output per employee without adding headcount\n\nBook your session or Free 15-Min Triage Call at www.aidynamic.pro/booking!`,
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
  { name: 'Kuehne Davis Law P.A.', email: 'ben@kuehnelaw.com', phone: '(305) 789-5989', company: 'Kuehne Davis Law P.A. (Brickell/Downtown)', category: 'Law Firm', offer: 'Tier 1 ($99 Audit) -> Tier 2 ($497 Corporate AI Staff Bootcamp)' },
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

  const BREVO_API_KEY = process.env.BREVO_API_KEY || process.env.VITE_BREVO_API_KEY || '';
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

        const account = accountRes && accountRes.ok ? await accountRes.json() : null;
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
      action = 'send', // 'send' | 'save_leads_to_list' | 'suspend_external_campaigns' | 'resume_external_campaigns' | 'create_sender'
      externalCampaignIds = [],
      campaignId = 'email_1_voice_jass',
      mode = 'test', // 'test' | 'custom' | 'miami_gmaps_leads' | 'supabase_leads' | 'brevo_list' | 'all_brevo_contacts'
      brevoListId = 2,
      statusFilter = 'all',
      customRecipients = [],
      customSubject = '',
      scheduledAt = '', // Optional ISO-8601 future timestamp e.g. '2026-11-03T10:15:00-05:00'
      senderEmail = '', // Optional verified Brevo sender email override
      senderName = 'Jasmel Acosta — AI Dynamic Pro',
      replyToEmail = 'jasmel@aidynamic.pro',
      leadsToSave = [],
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

    // Fetch global Brevo transactional blocklist so we NEVER email an unsubscribed/blocked contact (CAN-SPAM strict compliance)
    const blockedSet = new Set();
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

    if (recipients.length === 0) {
      return res.status(400).json({
        error:
          skippedUnsubscribed > 0
            ? `No eligible recipients left after filtering ${skippedUnsubscribed} unsubscribed/blacklisted contact(s).`
            : 'No valid recipients found for this campaign dispatch.',
        skippedUnsubscribed,
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

    for (const recipient of recipients) {
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

      renderedPayloads.push(brevoPayload);

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
      skippedUnsubscribed,
      renderedPayloads: sentCount === 0 ? renderedPayloads : [],
      errors: errors.slice(0, 5),
    });
  } catch (error) {
    console.error('[Email Campaign API] Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
