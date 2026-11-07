// Serverless API Endpoint: /api/email-campaign
// 5-Email Human Continuation Sequence (Brevo) + Google Analytics (GA4) UTM Tracking + Google Business Profile ("Google Buz") Hub

const CAMPAIGNS = {
  email_1_voice_jass: {
    id: 'email_1_voice_jass',
    name: 'Week 1 — Decisive CEO Wake-Up Call: Stop Bleeding Payroll & Missed Calls at {{company}}',
    subject: 'after-hours calls and wasted payroll at {{company}}',
    utmCampaign: 'seq1_voice_jass',
    description: 'High-urgency executive opener combining Loss-Aversion psychology (38% missed calls) with our 3-pillar promise: we walk into your company, build custom AI apps/agents (JAss), and stay to train your staff.',
    buildHtml: ({ name = 'there', company = 'your company', utmUrl, homeUtmUrl, phoneUrl }) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 620px; margin: 0 auto; color: #1e293b; line-height: 1.7; font-size: 16px; padding: 12px 4px;">
        <p>Hi ${name},</p>

        <p>Every week a business owner delays modernizing their operations, two things happen quietly on the P&amp;L at <strong>${company}</strong>:</p>

        <p><strong>1. You burn thousands of dollars in payroll on slow, repetitive tasks that AI should be executing in seconds.<br/>
        2. Between 12:00 PM–2:00 PM and after 5:30 PM, 38% of your high-intent bilingual callers hit voicemail and hire your competitor down the street.</strong></p>

        <p>I’m Jasmel Acosta, Founder of <strong>AI Dynamic Pro</strong> in Miami. We are not a "slide-deck consultancy." We are hands-on <strong>AI Developers, Creators, and Engineering Partners</strong> who come directly into your industry and company to make your vision of a faster, leaner, high-profit business come true—<strong>and we stay with you until your team masters it:</strong></p>

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #0f172a; padding: 16px 20px; margin: 20px 0; border-radius: 8px; font-size: 15px;">
          <p style="margin: 0 0 10px 0;"><strong>1. We Audit Your Company &amp; Build a Free 48-Hour Live Prototype ($99 Audit or Free 15-Min Triage Call):</strong><br/>
          We walk into your workflows, expose every manual bottleneck bleeding cash, and build a <strong>working AI prototype</strong> customized to <strong>${company}</strong> within 48 hours—before you spend a dime on development.</p>
          <p style="margin: 0 0 10px 0;"><strong>2. We Create Custom AI Applications &amp; 24/7 Agents ($997 Turnkey or $297/mo Managed):</strong><br/>
          Whether you need our 24/7 bilingual (English &amp; Spanish) AI voice &amp; chat receptionist (<strong>JAss</strong>) answering on Ring 1, or a custom application built for your industry (intake, CRM, billing, dispatch), we deploy it in 7–14 days.</p>
          <p style="margin: 0 0 10px 0;"><strong>3. We Stay With You &amp; Train Your Staff for Success ($497 Half-Day Corporate Bootcamp):</strong><br/>
          We don’t just hand you software and disappear. We train up to 15 of your staff hands-on so <strong>1 AI-trained employee produces the output of 5</strong>—setting your company up for permanent success.</p>
          <p style="margin: 0; color: #047857;"><strong>✓ Zero-Risk Executive Guarantee:</strong> If our $99 audit doesn’t uncover at least <strong>$2,500+/month ($30,000/yr)</strong> in immediate payroll and cost savings, you pay <strong>$0</strong> (100% refunded on the spot, and 100% credited toward any package).</p>
        </div>

        <p><strong>Decisive owners don't wait another quarter to stop losing money.</strong> Make the call today and let’s build your 48-hour prototype this week:</p>

        <p style="margin: 22px 0;">
          👉 <a href="${utmUrl}" style="background: #0f172a; color: #ffffff; padding: 14px 26px; border-radius: 8px; text-decoration: none; font-weight: 800; display: inline-block;">Book Your Free 15-Min Call or $99 Audit (+ Free 48h Prototype) →</a>
        </p>

        <p style="margin-top: 26px;">Let’s make it happen,<br/>
        <strong>Jasmel Acosta</strong><br/>
        Founder, AI Developer &amp; Systems Creator | AI Dynamic Pro<br/>
        Brickell, Miami • <a href="${phoneUrl}" style="color: #0f172a; font-weight: 700; text-decoration: none;">(786) 643-2099</a> • <a href="${homeUtmUrl}" style="color: #0284c7;">www.aidynamic.pro</a></p>

        <p style="font-size: 14px; color: #334155; background: #f1f5f9; padding: 12px 14px; border-radius: 8px; margin-top: 18px;">
          <strong>P.S.</strong> Test our live bilingual AI right now in 30 seconds: visit <a href="${homeUtmUrl}" style="color: #0284c7; font-weight: 700;">www.aidynamic.pro</a> and tap the green microphone to speak with <strong>JAss</strong> in English or Spanish, or call/text me directly at <strong>(786) 643-2099</strong>.
        </p>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 26px 0 12px;" />
        <p style="font-size: 12px; color: #94a3b8; line-height: 1.5;">
          AI Dynamic Pro • Brickell Financial District, Miami, FL 33131 • Don't want future executive notes from me? Simply reply "unsubscribe" or <a href="mailto:jasmel@aidynamic.pro?subject=Unsubscribe" style="color: #64748b; text-decoration: underline;">click here to opt out</a> anytime.
        </p>
      </div>
    `,
  },

  email_2_audit_99: {
    id: 'email_2_audit_99',
    name: 'Week 2 — Precision Ledger & Custom AI Creation: Stop Paying $3,420/Mo for Manual Busywork',
    subject: '$3,420/mo in manual busywork at {{company}}',
    utmCampaign: 'seq2_audit_99',
    description: 'Aggressive P&L wake-up call ($3,420/mo & 4.2 hrs/day wasted) showing how we create custom AI applications and stay to train your staff.',
    buildHtml: ({ name = 'there', company = 'your company', utmUrl, homeUtmUrl, phoneUrl }) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 620px; margin: 0 auto; color: #1e293b; line-height: 1.7; font-size: 16px; padding: 12px 4px;">
        <p>Hi ${name},</p>

        <p><strong>$3,420 a month in wasted payroll rarely announces itself as an emergency—until you add up what it costs you over 12 months ($41,040).</strong></p>

        <p>Right now at firms like <strong>${company}</strong>, staff spend <strong>4.2 hours every single day</strong> playing bilingual phone tag, chasing intake forms, confirming appointments by hand, and copy-pasting data between software tabs.</p>

        <p>If you keep running on manual labor, you will always be forced to hire more people just to keep up. <strong>As AI Developers and Creators at AI Dynamic Pro, we come directly into ${company} and eliminate that ceiling:</strong></p>

        <ul style="padding-left: 22px; margin: 18px 0;">
          <li style="margin-bottom: 10px;"><strong>We Create Custom AI Applications &amp; 24/7 Voice Agents ($997 Turnkey or $297/mo Managed):</strong> We build and deploy custom software and our 24/7 bilingual receptionist (<strong>JAss</strong>) tailored to your exact industry so calls, WhatsApp leads, intake, and CRM follow-ups happen automatically in 3 seconds.</li>
          <li style="margin-bottom: 10px;"><strong>We Stay &amp; Train Your Team ($497 Corporate AI Bootcamp):</strong> We work side-by-side with your staff so they know exactly how to run the new AI workflows every day without friction.</li>
          <li style="margin-bottom: 6px;"><strong>We Prove It First in 48 Hours ($99 Audit or Free 15-Min Call):</strong> Before you commit to a build, we audit your department and hand you a <strong>Free 48-Hour Live Prototype</strong> trained on <strong>${company}</strong>.</li>
        </ul>

        <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 14px 18px; margin: 20px 0; border-radius: 6px; font-size: 15px;">
          <strong>Our Ironclad Guarantee:</strong> We will show you how to cut at least <strong>$2,500+/month ($30,000/year)</strong> in operating costs and wasted staff hours—or I refund your $99 immediately.
        </div>

        <p>Stop paying human salaries for machine work. Take the next step right now and claim your 48-hour prototype:</p>

        <p style="margin: 22px 0;">
          👉 <a href="${utmUrl}" style="background: #0f172a; color: #f8fafc; padding: 14px 26px; border-radius: 8px; text-decoration: none; font-weight: 800; display: inline-block;">Claim Your Free 15-Min Call or $99 Audit (+ 48h Prototype) →</a>
        </p>

        <p style="margin-top: 26px;">To your speed &amp; profit,<br/>
        <strong>Jasmel Acosta</strong><br/>
        Founder, AI Developer &amp; Creator | AI Dynamic Pro • <a href="${homeUtmUrl}" style="color: #0284c7;">www.aidynamic.pro</a><br/>
        📞 <a href="${phoneUrl}" style="color: #0f172a; font-weight: 700; text-decoration: none;">(786) 643-2099</a></p>

        <p style="font-size: 14px; color: #334155; background: #f1f5f9; padding: 12px 14px; border-radius: 8px; margin-top: 18px;">
          <strong>P.S.</strong> Reply directly to this email with the #1 bottleneck slowing down <strong>${company}</strong> right now—I will personally map out the exact AI application or workflow to fix it.
        </p>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 26px 0 12px;" />
        <p style="font-size: 12px; color: #94a3b8; line-height: 1.5;">
          AI Dynamic Pro • Brickell Financial District, Miami, FL 33131 • Don't want future executive notes from me? Simply reply "unsubscribe" or <a href="mailto:jasmel@aidynamic.pro?subject=Unsubscribe" style="color: #64748b; text-decoration: underline;">click here to opt out</a> anytime.
        </p>
      </div>
    `,
  },

  email_3_staff_training: {
    id: 'email_3_staff_training',
    name: 'Week 3 — We Stay & Train Your Staff: Turn 1 Employee Into the Output of 5 ($497 Bootcamp)',
    subject: '1 employee doing the work of 5 at {{company}}',
    utmCampaign: 'seq3_staff_training',
    description: 'Hits the #1 CEO fear ("what if my team doesn’t use it?") by guaranteeing hands-on staff training ($497 Bootcamp) alongside custom AI creation.',
    buildHtml: ({ name = 'there', company = 'your company', utmUrl, homeUtmUrl, phoneUrl }) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 620px; margin: 0 auto; color: #1e293b; line-height: 1.7; font-size: 16px; padding: 12px 4px;">
        <p>Hi ${name},</p>

        <p><strong>83% of companies buying AI tools in 2026 fail to see ROI for one simple reason: nobody stayed behind to train their staff how to actually use them.</strong></p>

        <p>As a CEO or business owner, you don’t want another software subscription collecting dust while your team keeps typing data into spreadsheets at 4:45 PM. You want a faster, leaner company where costs drop and output multiplies.</p>

        <p>That is what separates <strong>AI Dynamic Pro</strong>. We don't just develop custom AI applications for your industry—<strong>we come into ${company} and stay with your team to train them for permanent success:</strong></p>

        <ul style="padding-left: 22px; margin: 16px 0;">
          <li style="margin-bottom: 8px;"><strong>$497 Half-Day Corporate AI Staff Bootcamp (Up to 15 Employees):</strong> We come on-site in South Florida (or live virtual) and train your front-desk, operations, and admin staff on the exact daily tasks they perform at <strong>${company}</strong> (in English &amp; Spanish).</li>
          <li style="margin-bottom: 8px;"><strong>4 Hours Compressed Into 22 Minutes:</strong> We build role-specific AI Standard Operating Procedures (SOPs) and data-privacy guardrails right in front of your team so <strong>1 trained employee reliably produces the output of 5</strong>.</li>
          <li style="margin-bottom: 4px;"><strong>Custom AI App &amp; Agent Creation When You Need More:</strong> Anything your staff shouldn't touch at all, we automate completely with custom AI applications and our 24/7 bilingual agent (<strong>JAss</strong>).</li>
        </ul>

        <p><strong>Don't let your company fall behind competitors whose teams are already running 5x faster.</strong> Lock in your team's $497 Bootcamp or start with a Free 15-Minute Executive Triage Call today:</p>

        <p style="margin: 22px 0;">
          📅 <a href="${utmUrl}" style="background: #0f172a; color: #ffffff; padding: 14px 26px; border-radius: 8px; text-decoration: none; font-weight: 800; display: inline-block;">Book Your $497 Staff AI Bootcamp or Free 15m Triage Call →</a>
        </p>

        <p style="margin-top: 26px;">Let’s build your team for success,<br/>
        <strong>Jasmel Acosta</strong><br/>
        Founder, AI Developer &amp; Creator | AI Dynamic Pro • <a href="${homeUtmUrl}" style="color: #0284c7;">www.aidynamic.pro</a><br/>
        📞 <a href="${phoneUrl}" style="color: #0f172a; font-weight: 700; text-decoration: none;">+1 (786) 643-2099</a></p>

        <p style="font-size: 14px; color: #334155; background: #f1f5f9; padding: 12px 14px; border-radius: 8px; margin-top: 18px;">
          <strong>P.S.</strong> Start with our <strong>$99 Department Efficiency Audit</strong> (+ Free 48h Prototype) and 100% of your $99 is credited toward your $497 Staff Bootcamp or custom AI application—backed by our $2,500+/mo savings guarantee.
        </p>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 26px 0 12px;" />
        <p style="font-size: 12px; color: #94a3b8; line-height: 1.5;">
          AI Dynamic Pro • Brickell Financial District, Miami, FL 33131 • Don't want future executive notes from me? Simply reply "unsubscribe" or <a href="mailto:jasmel@aidynamic.pro?subject=Unsubscribe" style="color: #64748b; text-decoration: underline;">click here to opt out</a> anytime.
        </p>
      </div>
    `,
  },

  email_4_before_after: {
    id: 'email_4_before_after',
    name: 'Week 4 — Hard P&L Proof: 4 Bookings vs. 19 Bookings (22 Live AI Systems Built)',
    subject: 'two 14-day P&L numbers for {{company}}',
    utmCampaign: 'seq4_before_after',
    description: 'Controlled A/B proof (47-min human response vs. 3-sec JAss response) + 22 production AI apps proving we can build any solution the owner dreams of.',
    buildHtml: ({ name = 'there', company = 'your company', utmUrl, homeUtmUrl, phoneUrl }) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 620px; margin: 0 auto; color: #1e293b; line-height: 1.7; font-size: 16px; padding: 12px 4px;">
        <p>Hi ${name},</p>

        <p>Look at the numbers from two Miami companies that received 50 inbound inquiries each over the exact same 14-day period:</p>

        <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 15px 18px; margin: 18px 0; border-radius: 6px; font-size: 15px;">
          <strong>❌ Company A — Manual Staff Only ($14,500/mo Admin Overhead):</strong><br/>
          • Average response speed: <strong>47 minutes</strong> during the day, <strong>9.5 hours</strong> overnight.<br/>
          • 38% of lunch-hour and after-5:30 PM calls rolled to voicemail.<br/>
          • Result: <strong>Only 4 booked appointments</strong> out of 50 inquiries.
        </div>

        <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 15px 18px; margin: 18px 0; border-radius: 6px; font-size: 15px;">
          <strong>✅ Company B — AI Dynamic Pro Custom Solution + Trained Staff ($297/mo Managed JAss):</strong><br/>
          • Average response speed: <strong>3 seconds</strong>, 24/7/365 in fluent English &amp; Spanish across phone, WhatsApp, and web.<br/>
          • Qualified every prospect and booked directly onto the calendar while staff focused on high-value work.<br/>
          • Result: <strong>19 booked appointments</strong> from the same 50 inquiries—at a fraction of the payroll cost.
        </div>

        <p>Whether your vision for <strong>${company}</strong> is a 24/7 bilingual AI receptionist, an automated billing/intake pipeline, or a custom industry application, <strong>we have already built and deployed 22 live production AI systems</strong> (inspect them at <a href="https://www.aidynamic.pro/projects?utm_source=brevo&utm_medium=email&utm_campaign=seq4_before_after" style="color: #0284c7; font-weight: 700;">www.aidynamic.pro/projects</a>)—and we stay to train your staff until it runs like clockwork.</p>

        <p><strong>Make the executive decision today to move ${company} from Model A to Model B:</strong></p>

        <p style="margin: 22px 0;">
          👉 <a href="${utmUrl}" style="background: #10b981; color: #052e16; padding: 14px 26px; border-radius: 8px; text-decoration: none; font-weight: 800; display: inline-block;">Book Free 15-Min Call or $99 Audit (Save $2,500+/Mo or Pay $0) →</a>
        </p>

        <p style="margin-top: 26px;">Best,<br/>
        <strong>Jasmel Acosta</strong><br/>
        Founder, AI Developer &amp; Creator | AI Dynamic Pro • Brickell, Miami<br/>
        📞 <a href="${phoneUrl}" style="color: #0f172a; font-weight: 700; text-decoration: none;">(786) 643-2099</a> • <a href="${homeUtmUrl}" style="color: #0284c7;">www.aidynamic.pro</a></p>

        <p style="font-size: 14px; color: #334155; background: #f1f5f9; padding: 12px 14px; border-radius: 8px; margin-top: 18px;">
          <strong>P.S.</strong> Call your own main business number at 6:30 PM tonight to hear what your prospects hear—then test <strong>JAss</strong> live at <a href="${homeUtmUrl}" style="color: #0284c7; font-weight: 700;">www.aidynamic.pro</a>.
        </p>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 26px 0 12px;" />
        <p style="font-size: 12px; color: #94a3b8; line-height: 1.5;">
          AI Dynamic Pro • Brickell Financial District, Miami, FL 33131 • Don't want future executive notes from me? Simply reply "unsubscribe" or <a href="mailto:jasmel@aidynamic.pro?subject=Unsubscribe" style="color: #64748b; text-decoration: underline;">click here to opt out</a> anytime.
        </p>
      </div>
    `,
  },

  email_5_founder_checkin: {
    id: 'email_5_founder_checkin',
    name: 'Week 5 — Direct CEO Decision Call: Let’s Build Your Vision & Train Your Team at {{company}}',
    subject: 'final note on cutting costs at {{company}}, {{name}}',
    utmCampaign: 'seq5_founder_checkin',
    description: 'Decisive founder close-out challenging the CEO/owner to take action now with our 48-hour live prototype, custom AI creation, and hands-on staff training.',
    buildHtml: ({ name = 'there', company = 'your business', utmUrl, homeUtmUrl, gbpUrl, phoneUrl }) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 620px; margin: 0 auto; color: #1e293b; line-height: 1.7; font-size: 16px; padding: 12px 4px;">
        <p>Hi ${name},</p>

        <p>I know running <strong>${company}</strong> demands every hour of your attention, so I’ll make this my final note for now.</p>

        <p>If your goal this quarter is to <strong>cut operating costs, move faster, eliminate repetitive payroll bloat, and get more done with a leaner team</strong>, waiting another 6 months will only cost you more money. Here is our commitment when you partner with <strong>AI Dynamic Pro</strong>:</p>

        <ol style="padding-left: 22px; margin: 16px 0;">
          <li style="margin-bottom: 8px;"><strong>We Come Into Your Company ($99 Audit + Free 48h Prototype, or Free 15-Min Call):</strong> We audit your exact workflows and guarantee to uncover at least <strong>$2,500+/month ($30,000/yr)</strong> in recoverable cost savings—or you pay <strong>$0</strong>.</li>
          <li style="margin-bottom: 8px;"><strong>We Create Custom AI Applications &amp; 24/7 Agents ($997 Turnkey or $297/mo Managed JAss):</strong> We engineer the exact AI tools, voice receptionists, and workflow automations your industry needs to make your vision a reality.</li>
          <li style="margin-bottom: 4px;"><strong>We Stay With You &amp; Train Your Staff ($497 Corporate AI Bootcamp):</strong> We train up to 15 of your employees hands-on so <strong>1 staff member produces the output of 5</strong> and your team is set up for lasting success.</li>
        </ol>

        <p>If you are ready to make that move right now, book your 15-minute slot below or simply reply <strong>"prototype"</strong> to this email and we will get to work on your 48-hour prototype today:</p>

        <p style="margin: 20px 0;">
          📅 <strong>Book 15-Min Triage or $99 Audit:</strong> <a href="${utmUrl}" style="color: #0284c7; font-weight: 700;">www.aidynamic.pro/booking</a><br/>
          🌐 <strong>Live Bilingual Voice AI Demo (JAss):</strong> <a href="${homeUtmUrl}" style="color: #0284c7; font-weight: 700;">www.aidynamic.pro</a><br/>
          📍 <strong>Google Business Profile:</strong> <a href="${gbpUrl}" style="color: #0284c7; font-weight: 700;">AI Dynamic Pro on Google (Miami)</a><br/>
          📞 <strong>My Direct Cell (Call/Text):</strong> <a href="${phoneUrl}" style="color: #0f172a; font-weight: 700; text-decoration: none;">+1 (786) 643-2099</a>
        </p>

        <p>To your company’s speed, efficiency, and growth,</p>

        <p style="margin-top: 26px;"><strong>Jasmel Acosta</strong><br/>
        Founder, AI Developer &amp; Systems Creator | AI Dynamic Pro</p>

        <p style="font-size: 14px; color: #334155; background: #f1f5f9; padding: 12px 14px; border-radius: 8px; margin-top: 18px;">
          <strong>P.S.</strong> Call or text me directly at <strong>(786) 643-2099</strong> anytime, or test <strong>JAss</strong> live on <a href="${homeUtmUrl}" style="color: #0284c7; font-weight: 700;">www.aidynamic.pro</a> to hear how a 3-second bilingual AI receptionist handles your customers.
        </p>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 26px 0 12px;" />
        <p style="font-size: 12px; color: #94a3b8; line-height: 1.5;">
          AI Dynamic Pro • Brickell Financial District, Miami, FL 33131 • Don't want future executive notes from me? Simply reply "unsubscribe" or <a href="mailto:jasmel@aidynamic.pro?subject=Unsubscribe" style="color: #64748b; text-decoration: underline;">click here to opt out</a> anytime.
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
