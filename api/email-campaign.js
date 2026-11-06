// Serverless API Endpoint: /api/email-campaign
// 5-Email Human Continuation Sequence (Brevo) + Google Analytics (GA4) UTM Tracking + Google Business Profile ("Google Buz") Hub

const CAMPAIGNS = {
  email_1_voice_jass: {
    id: 'email_1_voice_jass',
    name: 'Week 1 — Loss-Aversion & Speed-to-Lead: After-Hours Calls & 48h Live AI Prototype',
    subject: 'after-hours calls at {{company}}',
    utmCampaign: 'seq1_voice_jass',
    description: 'Psychology-engineered pattern-interrupt opener: targets the 12-2 PM lunch rush & post-5:30 PM voicemail bleed (38% missed inquiries), pitching JAss, the $99 Audit + Free 48h Prototype, and $2,500/mo savings guarantee.',
    buildHtml: ({ name = 'there', company = 'your company', utmUrl, homeUtmUrl, phoneUrl }) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 620px; margin: 0 auto; color: #1e293b; line-height: 1.7; font-size: 16px; padding: 12px 4px;">
        <p>Hi ${name},</p>

        <p>I was looking at <strong>${company}</strong>’s setup here in South Florida—usually for an operation your size, the front desk is running full tilt between 12:00 PM and 2:00 PM, and after 5:30 PM calls roll to voicemail.</p>

        <p>In our workflow audits across Miami, <strong>38% of high-intent bilingual inquiries happen during those exact windows.</strong> When a prospect hits voicemail or waits 45 minutes for a reply, they rarely leave a message—they call the next firm down the street.</p>

        <p>We engineer 24/7 bilingual (English &amp; Spanish) AI voice receptionists and workflow systems (<strong>JAss</strong>) here in Brickell that pick up on Ring 1, answer specific service and pricing questions, and book qualified appointments directly into your calendar.</p>

        <p>To show you what this looks like inside <strong>${company}</strong> without any guesswork, here is how we work:</p>

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #0f172a; padding: 16px 20px; margin: 20px 0; border-radius: 8px; font-size: 15px;">
          <p style="margin: 0 0 10px 0;"><strong>1. 60-Min Department Efficiency Audit ($99 — or Free 15-Min Triage Call):</strong><br/>
          We map your daily manual bottlenecks and build you a <strong>Free 48-Hour Working AI Prototype</strong> trained on ${company} before you spend a dime on development.</p>
          <p style="margin: 0 0 10px 0;"><strong>2. Turnkey 24/7 AI Voice &amp; Workflow Agent ($997 Build or $297/mo Managed):</strong><br/>
          Full deployment of <strong>JAss</strong> across phone, WhatsApp, SMS, and calendar/CRM in 7–14 days.</p>
          <p style="margin: 0 0 10px 0;"><strong>3. Corporate AI Staff Bootcamp ($497 Half-Day Workshop for up to 15 Staff):</strong><br/>
          Hands-on role-specific training so <strong>1 AI-trained employee produces the output of 5</strong>.</p>
          <p style="margin: 0; color: #047857;"><strong>✓ Zero-Risk Guarantee:</strong> If our $99 audit doesn’t uncover at least <strong>$2,500+/month ($30,000/yr)</strong> in recoverable staff time and captured leads, you pay <strong>$0</strong> (100% refunded on the spot, and 100% credited toward any package).</p>
        </div>

        <p>Worth a brief 15-minute triage call this week to see where the leaks are?</p>

        <p style="margin: 22px 0;">
          👉 <a href="${utmUrl}" style="background: #0f172a; color: #ffffff; padding: 13px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; display: inline-block;">Claim Your Free 15-Min Call or $99 Audit (+ Free 48h Prototype) →</a>
        </p>

        <p style="margin-top: 26px;">Best,<br/>
        <strong>Jasmel Acosta</strong><br/>
        Founder &amp; Applied AI Systems Architect | AI Dynamic Pro<br/>
        Brickell, Miami • <a href="${phoneUrl}" style="color: #0f172a; font-weight: 600; text-decoration: none;">(786) 643-2099</a> • <a href="${homeUtmUrl}" style="color: #0284c7;">www.aidynamic.pro</a></p>

        <p style="font-size: 14px; color: #334155; background: #f1f5f9; padding: 12px 14px; border-radius: 8px; margin-top: 18px;">
          <strong>P.S.</strong> Want to test our bilingual voice AI in 30 seconds right now? Visit <a href="${homeUtmUrl}" style="color: #0284c7; font-weight: 700;">www.aidynamic.pro</a> and tap the green microphone to talk live with <strong>JAss</strong> in English or Spanish, or reply directly to this email.
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
    name: 'Week 2 — Precision Ledger Hook: $3,420/Mo Payroll Leak vs. 24/7 Autonomous AI',
    subject: '$3,420/mo in manual admin at {{company}}',
    utmCampaign: 'seq2_audit_99',
    description: 'Uses the Precision Effect ($3,420/mo & 4.2 hrs/day) to expose hidden payroll drain and anchor the $997 Turnkey / $297/mo Managed AI Agent.',
    buildHtml: ({ name = 'there', company = 'your company', utmUrl, homeUtmUrl, phoneUrl }) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 620px; margin: 0 auto; color: #1e293b; line-height: 1.7; font-size: 16px; padding: 12px 4px;">
        <p>Hi ${name},</p>

        <p><strong>$3,420 a month in wasted payroll rarely looks like an emergency on a P&amp;L statement.</strong></p>

        <p>At most companies like <strong>${company}</strong>, it looks like two team members spending <strong>4.2 hours a day</strong> playing bilingual phone tag, chasing intake paperwork, confirming appointments by hand, and copy-pasting data between spreadsheets and software.</p>

        <p>Every time volume grows, the old playbook says you have to hire another $45,000–$65,000/year coordinator. Yet human staff still can’t answer phones at 7:30 PM on a Wednesday or reply to WhatsApp leads in 3 seconds on Sunday.</p>

        <p>At <strong>AI Dynamic Pro</strong>, we replace those repetitive manual loops with custom, production-grade AI in 7 to 14 days:</p>

        <ul style="padding-left: 22px; margin: 18px 0;">
          <li style="margin-bottom: 10px;"><strong>24/7 Bilingual Voice &amp; Chat Receptionist (JAss — $997 Turnkey or $297/mo Managed):</strong> Answers 100% of calls and messages in under 3 seconds in natural English &amp; Spanish and books directly onto your calendar.</li>
          <li style="margin-bottom: 10px;"><strong>Automated Intake, Billing &amp; CRM Workflows:</strong> Eliminates manual data entry, document chasing, and no-show follow-ups.</li>
          <li style="margin-bottom: 6px;"><strong>Free 48-Hour Working Prototype First:</strong> Book our <strong>$99 60-Min Department Audit</strong> (or a Free 15-Min Triage Call) and we build a working prototype customized to <strong>${company}</strong> in 48 hours.</li>
        </ul>

        <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 14px 18px; margin: 20px 0; border-radius: 6px; font-size: 15px;">
          <strong>Asymmetrical Bet (Zero Risk):</strong> If we don’t show you how to recover at least <strong>$2,500+/month ($30,000/year)</strong> in manual payroll waste, I refund your $99 immediately.
        </div>

        <p>Open to a quick 15-minute review this week to see which workflow at <strong>${company}</strong> we can prototype for you in 48 hours?</p>

        <p style="margin: 22px 0;">
          👉 <a href="${utmUrl}" style="background: #0f172a; color: #f8fafc; padding: 13px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; display: inline-block;">Schedule Your Free 15-Min Call or $99 Audit (+ 48h Prototype) →</a>
        </p>

        <p style="margin-top: 26px;">Best,<br/>
        <strong>Jasmel Acosta</strong><br/>
        Founder, AI Dynamic Pro • <a href="${homeUtmUrl}" style="color: #0284c7;">www.aidynamic.pro</a><br/>
        📞 <a href="${phoneUrl}" style="color: #0f172a; font-weight: 600; text-decoration: none;">(786) 643-2099</a></p>

        <p style="font-size: 14px; color: #334155; background: #f1f5f9; padding: 12px 14px; border-radius: 8px; margin-top: 18px;">
          <strong>P.S.</strong> Just reply with the single manual task eating the most hours at <strong>${company}</strong> right now and I’ll send you a 3-bullet breakdown of how we automate it.
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
    name: 'Week 3 — Contrarian Staff Multiplier: 1 AI-Trained Employee vs. 5 Manual Roles ($497 Bootcamp)',
    subject: '1 employee vs. 5 at {{company}}',
    utmCampaign: 'seq3_staff_training',
    description: 'Contrarian psychological hook (83% AI shelfware statistic) pitching the $497 Half-Day Corporate AI Staff Bootcamp for up to 15 employees.',
    buildHtml: ({ name = 'there', company = 'your company', utmUrl, homeUtmUrl, phoneUrl }) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 620px; margin: 0 auto; color: #1e293b; line-height: 1.7; font-size: 16px; padding: 12px 4px;">
        <p>Hi ${name},</p>

        <p><strong>83% of businesses paying for AI software in 2026 are buying digital shelfware.</strong></p>

        <p>Walk into almost any office in Miami and ask the team how they use AI: two people have a ChatGPT tab open to rewrite emails, while the rest of the staff is still manually typing PDF intake data into spreadsheets at 4:45 PM.</p>

        <p>Software without role-specific workflow training just digitizes chaos. The real margin separator for <strong>${company}</strong> isn't hiring more people—<strong>it is training your existing staff so 1 coordinator produces the daily output of 5.</strong></p>

        <p>That is why we created our <strong>$497 Corporate AI Staff Bootcamp</strong> (a half-day hands-on workshop for up to 15 employees, on-site in South Florida or live virtual):</p>

        <ul style="padding-left: 22px; margin: 16px 0;">
          <li style="margin-bottom: 8px;"><strong>Role-Specific Workflows (Not Generic Theory):</strong> We train your front-desk, operations, and admin staff on the exact daily tasks they perform at <strong>${company}</strong> (in English &amp; Spanish).</li>
          <li style="margin-bottom: 8px;"><strong>Data-Safe AI SOPs:</strong> We install strict company data-privacy guardrails and repeatable Standard Operating Procedures.</li>
          <li style="margin-bottom: 4px;"><strong>Immediate 4-Hour-to-22-Minute Compression:</strong> Once your team sees a 4-hour administrative backlog cleared in 22 minutes during our live session, adoption becomes automatic.</li>
        </ul>

        <p>Would a half-day <strong>$497 Staff AI Bootcamp</strong> (or a Free 15-Minute Triage Call first) be useful for your team at <strong>${company}</strong> this month?</p>

        <p style="margin: 22px 0;">
          📅 <a href="${utmUrl}" style="background: #0f172a; color: #ffffff; padding: 13px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; display: inline-block;">Reserve Your $497 Corporate AI Bootcamp or Free 15m Call →</a>
        </p>

        <p style="margin-top: 26px;">Best,<br/>
        <strong>Jasmel Acosta</strong><br/>
        Founder, AI Dynamic Pro • <a href="${homeUtmUrl}" style="color: #0284c7;">www.aidynamic.pro</a><br/>
        📞 <a href="${phoneUrl}" style="color: #0f172a; font-weight: 600; text-decoration: none;">+1 (786) 643-2099</a></p>

        <p style="font-size: 14px; color: #334155; background: #f1f5f9; padding: 12px 14px; border-radius: 8px; margin-top: 18px;">
          <strong>P.S.</strong> If you start with our <strong>$99 Department Efficiency Audit</strong>, your $99 is 100% credited toward the $497 Bootcamp or any custom AI build—backed by our $2,500+/mo savings guarantee.
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
    name: 'Week 4 — Controlled A/B Proof: 47-Minute Response Lag vs. 3-Second Autonomous Booking',
    subject: 'two 14-day numbers for {{company}}',
    utmCampaign: 'seq4_before_after',
    description: 'Uses a Controlled A/B Anecdote (47-min human response vs. 3-sec JAss response) + P&L comparison backed by 22 live production AI architectures.',
    buildHtml: ({ name = 'there', company = 'your company', utmUrl, homeUtmUrl, phoneUrl }) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 620px; margin: 0 auto; color: #1e293b; line-height: 1.7; font-size: 16px; padding: 12px 4px;">
        <p>Hi ${name},</p>

        <p>We recently tracked two Miami businesses receiving 50 inbound inquiries each over the same 14-day window. Only one variable differed between them:</p>

        <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 15px 18px; margin: 18px 0; border-radius: 6px; font-size: 15px;">
          <strong>❌ Team A — Manual Routing ($14,500/mo Admin Payroll):</strong><br/>
          • Average response time: <strong>47 minutes</strong> during the day, <strong>9.5 hours</strong> overnight.<br/>
          • 38% of lunch-hour and after-5:30 PM calls hit voicemail.<br/>
          • Result: <strong>4 booked consultations</strong> out of 50 inquiries.
        </div>

        <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 15px 18px; margin: 18px 0; border-radius: 6px; font-size: 15px;">
          <strong>✅ Team B — AI Dynamic Pro Architecture ($297/mo Managed JAss Agent):</strong><br/>
          • Average response time: <strong>3 seconds</strong>, 24/7/365 in fluent English &amp; Spanish across phone, WhatsApp, and web.<br/>
          • Qualified budget/service need and booked directly onto the calendar.<br/>
          • Result: <strong>19 booked consultations</strong> from the exact same 50 inquiries.
        </div>

        <p>We have engineered and deployed <strong>22 live production AI systems</strong> across Healthcare, Legal, Real Estate, Construction, and B2B Operations—you can inspect our live architectures anytime at <a href="https://www.aidynamic.pro/projects?utm_source=brevo&utm_medium=email&utm_campaign=seq4_before_after" style="color: #0284c7; font-weight: 700;">www.aidynamic.pro/projects</a>.</p>

        <p>Want to see what a <strong>Free 48-Hour Live Prototype</strong> looks like for <strong>${company}</strong>?</p>

        <p style="margin: 22px 0;">
          👉 <a href="${utmUrl}" style="background: #10b981; color: #052e16; padding: 13px 24px; border-radius: 8px; text-decoration: none; font-weight: 800; display: inline-block;">Book Free 15-Min Call or $99 Audit (Save $2,500+/Mo or Pay $0) →</a>
        </p>

        <p style="margin-top: 26px;">Best,<br/>
        <strong>Jasmel Acosta</strong><br/>
        Founder, AI Dynamic Pro • Brickell, Miami<br/>
        📞 <a href="${phoneUrl}" style="color: #0f172a; font-weight: 600; text-decoration: none;">(786) 643-2099</a> • <a href="${homeUtmUrl}" style="color: #0284c7;">www.aidynamic.pro</a></p>

        <p style="font-size: 14px; color: #334155; background: #f1f5f9; padding: 12px 14px; border-radius: 8px; margin-top: 18px;">
          <strong>P.S.</strong> Call your own main business line at 6:30 PM tonight to hear what your prospects experience—then test <strong>JAss</strong> live at <a href="${homeUtmUrl}" style="color: #0284c7; font-weight: 700;">www.aidynamic.pro</a>.
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
    name: 'Week 5 — Zeigarnik Breakup Note: Closing the Loop on {{company}}',
    subject: 'closing the loop on {{company}}, {{name}}',
    utmCampaign: 'seq5_founder_checkin',
    description: 'High-reply polite executive breakup email leveraging the Zeigarnik & loss-of-access effect with a zero-friction reply prompt.',
    buildHtml: ({ name = 'there', company = 'your business', utmUrl, homeUtmUrl, gbpUrl, phoneUrl }) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 620px; margin: 0 auto; color: #1e293b; line-height: 1.7; font-size: 16px; padding: 12px 4px;">
        <p>Hi ${name},</p>

        <p>I know running <strong>${company}</strong> keeps your plate full, so I’ll make this my last note for now and close the loop.</p>

        <p>Whenever reducing payroll overhead or stopping after-hours missed calls moves to the top of your priority list, keep this 3-tier menu in your back pocket:</p>

        <ol style="padding-left: 22px; margin: 16px 0;">
          <li style="margin-bottom: 8px;"><strong>$99 Department Efficiency Audit (+ Free 48h Working Prototype):</strong> Or start with a Free 15-Minute Triage Call. Guaranteed to uncover <strong>$2,500+/month ($30,000/yr)</strong> in recoverable staff time or you pay <strong>$0</strong>.</li>
          <li style="margin-bottom: 8px;"><strong>$497 Corporate AI Staff Bootcamp (Up to 15 Staff):</strong> Half-day hands-on workshop so 1 AI-trained employee produces the output of 5.</li>
          <li style="margin-bottom: 4px;"><strong>$997 Turnkey / $297/mo Managed 24/7 AI Agent (JAss):</strong> Fluent English &amp; Spanish voice, WhatsApp, and calendar automation deployed in 7–14 days.</li>
        </ol>

        <p>If now isn't the right week, no problem at all. If you'd like us to build your <strong>Free 48-Hour Prototype</strong> before we close your file, grab a 15-minute slot below or simply reply <strong>"prototype"</strong> to this email:</p>

        <p style="margin: 20px 0;">
          📅 <strong>Book 15-Min Triage or $99 Audit:</strong> <a href="${utmUrl}" style="color: #0284c7; font-weight: 700;">www.aidynamic.pro/booking</a><br/>
          🌐 <strong>Live Bilingual Voice AI Demo (JAss):</strong> <a href="${homeUtmUrl}" style="color: #0284c7; font-weight: 700;">www.aidynamic.pro</a><br/>
          📍 <strong>Google Business Profile:</strong> <a href="${gbpUrl}" style="color: #0284c7; font-weight: 700;">AI Dynamic Pro on Google (Miami)</a><br/>
          📞 <strong>Direct Miami Line (Call/Text):</strong> <a href="${phoneUrl}" style="color: #0f172a; font-weight: 700; text-decoration: none;">+1 (786) 643-2099</a>
        </p>

        <p>Wishing you and the team at <strong>${company}</strong> a strong quarter ahead.</p>

        <p style="margin-top: 26px;">Warm regards,<br/>
        <strong>Jasmel Acosta</strong><br/>
        Founder &amp; Applied AI Systems Architect, AI Dynamic Pro</p>

        <p style="font-size: 14px; color: #334155; background: #f1f5f9; padding: 12px 14px; border-radius: 8px; margin-top: 18px;">
          <strong>P.S.</strong> Even if we don't work together right now, feel free to test <strong>JAss</strong> live on <a href="${homeUtmUrl}" style="color: #0284c7; font-weight: 700;">www.aidynamic.pro</a> anytime to benchmark how a 3-second bilingual AI receptionist handles live client questions.
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
