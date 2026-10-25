// Serverless API Endpoint: /api/email-campaign
// 5-Email Human Continuation Sequence (Brevo) + Google Analytics (GA4) UTM Tracking + Google Business Profile ("Google Buz") Hub

const CAMPAIGNS = {
  email_1_voice_jass: {
    id: 'email_1_voice_jass',
    name: 'Email #1 (Matches Post #1): The 12:30 PM & 5:15 PM Missed-Call Test + Live JAss Demo',
    subject: 'quick question about {{company}}’s phone lines after 5pm',
    utmCampaign: 'seq1_voice_jass',
    description: 'Warm, conversational founder note inviting the prospect to test JAss live on aidynamic.pro and introducing the $99 Zero-Risk Audit.',
    buildHtml: ({ name = 'there', company = 'your office', utmUrl, homeUtmUrl, phoneUrl }) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; line-height: 1.7; font-size: 16px; padding: 12px 4px;">
        <p>Hey ${name},</p>

        <p>I’m Jasmel, founder of <strong>AI Dynamic Pro</strong> here in Miami. I was looking at how businesses like <strong>${company}</strong> handle incoming calls during the lunch rush (12:00 – 1:30 PM) and after 5:00 PM, and wanted to share something wild we’ve been seeing across South Florida:</p>

        <p><strong>38% of incoming calls hit voicemail</strong> during those windows—and 8 out of 10 people who get voicemail never leave a message. They just hang up and call the next company on Google.</p>

        <p>Instead of sending you a boring pitch deck, I put our 24/7 bilingual (English &amp; Spanish) AI Executive Assistant — <strong>JAss</strong> — live right on our website so you can test it yourself in 30 seconds:</p>

        <p style="margin: 22px 0;">
          👉 <a href="${homeUtmUrl}" style="color: #0284c7; font-weight: 700; text-decoration: underline;">Click here to visit www.aidynamic.pro and talk live with JAss</a> <em>(tap the green microphone or chat button in the corner and ask anything in English or Spanish)</em>.
        </p>

        <p>If you want us to wire a custom version into <strong>${company}</strong>’s phone line and calendar—or figure out which repetitive admin chores are quietly eating up your team’s week—we’re doing a <strong>$99 AI Workflow &amp; Feasibility Audit</strong> this month.</p>

        <div style="background: #f8fafc; border-left: 4px solid #0f172a; padding: 14px 18px; margin: 22px 0; border-radius: 6px; font-size: 15px;">
          <strong>Our Zero-Risk Promise:</strong> 100% of the $99 is credited toward any custom app or staff training we do for you—and <strong>if we don’t uncover at least 15+ hours/month of wasted time to save your team, you pay $0.</strong>
        </div>

        <p>You can grab a 15-minute spot on my calendar here:<br/>
        📅 <a href="${utmUrl}" style="color: #0284c7; font-weight: 700;">https://www.aidynamic.pro/booking</a></p>

        <p>Or just call/text me directly on my Miami line at <a href="${phoneUrl}" style="color: #0f172a; font-weight: 700; text-decoration: none;">+1 (786) 643-2099</a>.</p>

        <p style="margin-top: 28px;">Best,<br/>
        <strong>Jasmel Acosta</strong><br/>
        Founder, AI Dynamic Pro (Miami, FL)<br/>
        📞 <a href="${phoneUrl}" style="color: #64748b; text-decoration: none;">(786) 643-2099</a> • <a href="${homeUtmUrl}" style="color: #0284c7;">www.aidynamic.pro</a></p>
      </div>
    `,
  },

  email_2_audit_99: {
    id: 'email_2_audit_99',
    name: 'Email #2 (Matches Post #2): The "2 Hours a Day of Copy-Paste" Payroll Leak ($99 Audit)',
    subject: 'the 15-hour/week "spreadsheet tax" at {{company}}',
    utmCampaign: 'seq2_audit_99',
    description: 'Addresses manual spreadsheet copy-paste bottlenecks and pitches the $99 Zero-Risk Workflow Audit.',
    buildHtml: ({ name = 'there', company = 'your company', utmUrl, homeUtmUrl, phoneUrl }) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; line-height: 1.7; font-size: 16px; padding: 12px 4px;">
        <p>Hey ${name},</p>

        <p>Quick follow-up from my last note. Almost every business owner I sit down with in Miami tells me the exact same thing:</p>

        <p style="font-style: italic; color: #334155; padding-left: 14px; border-left: 3px solid #cbd5e1;">
          "Jasmel, I know we should be using AI, I just don't have time to figure out which part of my business is actually worth automating."
        </p>

        <p>Here’s the truth: you almost never need a massive $100,000 software overhaul. What hurts most companies are the <strong>2 or 3 repetitive daily bottlenecks</strong>—employees spending 2 hours a day copying data between spreadsheets, chasing intake forms, or manually following up with leads.</p>

        <p>That’s how we help at <strong>AI Dynamic Pro</strong>:</p>
        <ol style="padding-left: 22px; margin: 18px 0;">
          <li style="margin-bottom: 8px;"><strong>The $99 Workflow Audit:</strong> We map your team's manual processes and find where time and money are leaking.</li>
          <li style="margin-bottom: 8px;"><strong>Custom App &amp; AI Solutions:</strong> We build the exact automation or custom tool that connects to the software you already use.</li>
          <li style="margin-bottom: 4px;"><strong>Hands-On Staff Training:</strong> We train your people so they actually use it every day.</li>
        </ol>

        <p>Remember: <strong>if we don’t show you how to save at least 15+ hours a month during your audit, you pay $0.</strong></p>

        <p style="margin: 24px 0;">
          👉 <a href="${utmUrl}" style="background: #0f172a; color: #f8fafc; padding: 12px 22px; border-radius: 8px; text-decoration: none; font-weight: 700; display: inline-block;">Lock In Your $99 Workflow Audit Here →</a>
        </p>

        <p>Or reply directly to this email / text me at <a href="${phoneUrl}" style="color: #0f172a; font-weight: 700; text-decoration: none;">(786) 643-2099</a> and tell me the #1 manual task driving your team crazy right now.</p>

        <p style="margin-top: 28px;">Talk soon,<br/>
        <strong>Jasmel Acosta</strong><br/>
        AI Dynamic Pro • <a href="${homeUtmUrl}" style="color: #0284c7;">www.aidynamic.pro</a><br/>
        📞 (786) 643-2099</p>
      </div>
    `,
  },

  email_3_staff_training: {
    id: 'email_3_staff_training',
    name: 'Email #3 (Matches Post #3): Why Staff Secretly Avoid AI Tools (Corporate Training)',
    subject: 'why most employees secretly avoid using AI (and how to fix it)',
    utmCampaign: 'seq3_staff_training',
    description: 'Connects directly with Post #3 on Corporate Staff Training, AI adoption, and data security SOPs.',
    buildHtml: ({ name = 'there', company = 'your company', utmUrl, homeUtmUrl, phoneUrl }) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; line-height: 1.7; font-size: 16px; padding: 12px 4px;">
        <p>Hey ${name},</p>

        <p>Have you ever bought a great tool or software license for <strong>${company}</strong>, only to realize two months later that your team is still doing everything the old manual way?</p>

        <p>When we audit companies, we see this constantly. The #1 reason AI fails inside a business isn't the technology—<strong>it’s adoption</strong>.</p>

        <p>Usually, employees avoid using AI for two reasons:</p>
        <ul style="padding-left: 22px; margin: 16px 0;">
          <li style="margin-bottom: 8px;">They feel intimidated and nobody showed them how to use it for <em>their specific daily job</em>.</li>
          <li style="margin-bottom: 4px;">They’re worried about privacy and don't know what company or client data is safe to put into AI.</li>
        </ul>

        <p>That’s why alongside building custom apps, we run <strong>hands-on Corporate Staff AI Training Workshops</strong> (in-person in South Florida or live virtual). We give your team clear <strong>Standard Operating Procedures (SOPs)</strong>, privacy guardrails, and exact workflows so they operate at 5x speed from Day 1.</p>

        <p>Want to see what a tailored training session or workflow audit looks like for <strong>${company}</strong>?</p>

        <p style="margin: 22px 0;">
          📅 <a href="${utmUrl}" style="color: #0284c7; font-weight: 700;">Grab a quick 15-minute call on our calendar here</a> or check out our work at <a href="${homeUtmUrl}" style="color: #0284c7; font-weight: 700;">www.aidynamic.pro</a>.
        </p>

        <p style="margin-top: 28px;">Best,<br/>
        <strong>Jasmel Acosta</strong><br/>
        Founder, AI Dynamic Pro<br/>
        📞 <a href="${phoneUrl}" style="color: #0f172a; font-weight: 700; text-decoration: none;">+1 (786) 643-2099</a></p>
      </div>
    `,
  },

  email_4_before_after: {
    id: 'email_4_before_after',
    name: 'Email #4 (Matches Post #4 & #5): Monday Morning "Before vs. After" Custom Automation',
    subject: '6 hours to reply vs. 45 seconds at {{company}}',
    utmCampaign: 'seq4_before_after',
    description: 'Paints a vivid Before vs. After picture of Monday morning operations and showcases your 22 built systems.',
    buildHtml: ({ name = 'there', company = 'your office', utmUrl, homeUtmUrl, phoneUrl }) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; line-height: 1.7; font-size: 16px; padding: 12px 4px;">
        <p>Hey ${name},</p>

        <p>Picture two different versions of Monday morning at <strong>${company}</strong>:</p>

        <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 14px 18px; margin: 18px 0; border-radius: 6px; font-size: 15px;">
          <strong>❌ Version A (Before):</strong><br/>
          Your team walks in to a backlog of weekend emails and missed calls, spends 3 hours copying info between spreadsheets and CRMs, and realizes 3 warm prospects already booked with a competitor because follow-up took 6 hours.
        </div>

        <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 14px 18px; margin: 18px 0; border-radius: 6px; font-size: 15px;">
          <strong>✅ Version B (After):</strong><br/>
          Every inquiry was answered in under 45 seconds in English or Spanish, qualified, booked directly onto your calendar, and synced across your systems automatically with zero manual typing.
        </div>

        <p>Over the last 18 months, we’ve built and deployed <strong>22+ production AI platforms</strong> across Healthcare, Legal, Real Estate, Construction, and Logistics—you can inspect our live portfolio anytime at <a href="https://www.aidynamic.pro/projects?utm_source=brevo&utm_medium=email&utm_campaign=seq4_before_after" style="color: #0284c7; font-weight: 700;">www.aidynamic.pro/projects</a>.</p>

        <p>If you're ready to turn Version A into Version B, start with our <strong>$99 Zero-Risk Workflow Audit</strong>:</p>

        <p style="margin: 24px 0;">
          👉 <a href="${utmUrl}" style="background: #10b981; color: #052e16; padding: 12px 22px; border-radius: 8px; text-decoration: none; font-weight: 800; display: inline-block;">Book Your $99 Audit (Pay $0 Unless We Save You 15+ Hrs/Mo) →</a>
        </p>

        <p style="margin-top: 28px;">Best,<br/>
        <strong>Jasmel Acosta</strong><br/>
        AI Dynamic Pro • Miami, FL<br/>
        📞 <a href="${phoneUrl}" style="color: #0f172a; font-weight: 700; text-decoration: none;">(786) 643-2099</a> • <a href="${homeUtmUrl}" style="color: #0284c7;">www.aidynamic.pro</a></p>
      </div>
    `,
  },

  email_5_founder_checkin: {
    id: 'email_5_founder_checkin',
    name: 'Email #5 (Matches Post #6 + Google Biz): Personal Founder Check-In & Open Door',
    subject: 'keeping this on your radar for {{company}}, {{name}}',
    utmCampaign: 'seq5_founder_checkin',
    description: 'Warm, zero-pressure final touch leaving your direct phone, website chatbot JAss, and Google Business link.',
    buildHtml: ({ name = 'there', company = 'your business', utmUrl, homeUtmUrl, gbpUrl, phoneUrl }) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; line-height: 1.7; font-size: 16px; padding: 12px 4px;">
        <p>Hey ${name},</p>

        <p>I know how busy things get running <strong>${company}</strong>, so I’ll make this my last follow-up for now so I don't crowd your inbox.</p>

        <p>Whenever the timing makes sense for you to look at:</p>
        <ul style="padding-left: 22px; margin: 14px 0;">
          <li>Finding and fixing your biggest manual time-drains (<strong>$99 Zero-Risk Workflow Audit</strong>)</li>
          <li>Deploying a <strong>24/7 Bilingual AI Receptionist</strong> or custom internal app</li>
          <li>Running a <strong>Corporate Staff AI Training Workshop</strong> so your team works 5x faster</li>
        </ul>

        <p>...you have my direct Miami cell below, or you can test <strong>JAss</strong> live on our site anytime day or night:</p>

        <p style="margin: 20px 0;">
          🌐 <strong>Website &amp; Live AI Assistant:</strong> <a href="${homeUtmUrl}" style="color: #0284c7; font-weight: 700;">www.aidynamic.pro</a><br/>
          📅 <strong>Direct Booking Calendar:</strong> <a href="${utmUrl}" style="color: #0284c7; font-weight: 700;">www.aidynamic.pro/booking</a><br/>
          📍 <strong>Find Us on Google:</strong> <a href="${gbpUrl}" style="color: #0284c7; font-weight: 700;">AI Dynamic Pro on Google (Miami)</a><br/>
          📞 <strong>My Direct Line (Call/Text):</strong> <a href="${phoneUrl}" style="color: #0f172a; font-weight: 700; text-decoration: none;">+1 (786) 643-2099</a>
        </p>

        <p>Wishing you and the team at <strong>${company}</strong> a great rest of the week!</p>

        <p style="margin-top: 28px;">Warm regards,<br/>
        <strong>Jasmel Acosta</strong><br/>
        Founder, AI Dynamic Pro</p>
      </div>
    `,
  },
};

// Ready-to-publish Google Business Profile ("Google Buz") Local Posts with GA4 UTM tracking
const GOOGLE_BUSINESS_POSTS = [
  {
    id: 'gbp_audit_offer',
    type: 'OFFER POST',
    title: '$99 AI Workflow Audit — Zero-Risk Guarantee (Miami Special)',
    ctaButton: 'Book Online',
    ctaUrl: 'https://www.aidynamic.pro/booking?utm_source=google_business&utm_medium=gbp_offer&utm_campaign=audit_99',
    content: `Where is your business losing 15+ hours of payroll every single week? ⏱️⚡\n\nAt AI Dynamic Pro in Miami, we help businesses across Healthcare, Legal, Real Estate, Construction, and Logistics eliminate manual bottlenecks.\n\nOur 3 Core Pillars:\n1️⃣ $99 AI Workflow Audit ($0 if we don't find 15+ hrs/mo in savings!)\n2️⃣ Custom App & AI Solutions (including 24/7 bilingual voice & chat receptionists)\n3️⃣ Corporate Staff Training (hands-on workshops so your team operates at 5x speed)\n\n📞 Call/Text our Miami line: (786) 643-2099 or click "Book Online" to claim your $99 Audit!`,
  },
  {
    id: 'gbp_voice_jass',
    type: 'WHAT’S NEW POST',
    title: '24/7 Bilingual AI Receptionist (JAss) & Custom App Development',
    ctaButton: 'Learn More',
    ctaUrl: 'https://www.aidynamic.pro/?utm_source=google_business&utm_medium=gbp_post&utm_campaign=voice_jass',
    content: `38% of client calls happen during lunch or after 5:00 PM—and 80% of callers who hit voicemail immediately call a competitor. 📞📉\n\nAI Dynamic Pro engineers custom 24/7 Bilingual (English & Spanish) AI Receptionists and web apps that answer on Ring Zero, qualify leads, book appointments directly into your calendar, and notify your team instantly.\n\nTest JAss live on our website or call (786) 643-2099 today!`,
  },
  {
    id: 'gbp_staff_training',
    type: 'UPDATE POST',
    title: 'Corporate Staff AI Training Workshops in Miami & Virtual',
    ctaButton: 'Book Online',
    ctaUrl: 'https://www.aidynamic.pro/booking?utm_source=google_business&utm_medium=gbp_post&utm_campaign=staff_training',
    content: `Buying AI software won't help your company if your staff doesn't know how to use it safely and effectively. 💡👥\n\nAI Dynamic Pro conducts hands-on Corporate Staff Training workshops across South Florida:\n✔️ Industry-tailored prompt engineering\n✔️ Data security & privacy Standard Operating Procedures (SOPs)\n✔️ Daily workflow acceleration using custom AI tools\n\nBook a corporate training consultation or $99 Business Audit today!`,
  },
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

  // GET: Return campaign metadata, GA4 config, and Google Business Profile posts
  if (req.method === 'GET') {
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
      campaignId = 'email_1_voice_jass',
      mode = 'test', // 'test' | 'custom' | 'supabase_leads'
      statusFilter = 'all',
      customRecipients = [],
      customSubject = '',
    } = req.body || {};

    const campaign = CAMPAIGNS[campaignId] || CAMPAIGNS.email_1_voice_jass;

    if (!BREVO_API_KEY) {
      return res.status(400).json({
        error: 'BREVO_API_KEY / VITE_BREVO_API_KEY is not configured in environment variables.',
      });
    }

    let recipients = [];

    if (mode === 'test') {
      recipients = [
        {
          name: 'Jasmel',
          email: 'jasmelacosta@gmail.com',
          company: 'your company',
        },
      ];
    } else if (mode === 'custom' && Array.isArray(customRecipients)) {
      recipients = customRecipients
        .filter((r) => r && r.email && r.email.includes('@'))
        .map((r) => ({
          name: r.name || r.email.split('@')[0],
          email: r.email.trim().toLowerCase(),
          company: r.company || 'your organization',
        }));
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
          if (cleanEmail && cleanEmail.includes('@') && !seen.has(cleanEmail)) {
            seen.add(cleanEmail);
            recipients.push({
              name: r.name || cleanEmail.split('@')[0],
              email: cleanEmail,
              company: r.company || 'your company',
            });
          }
        }
      }
    }

    if (recipients.length === 0) {
      return res.status(400).json({
        error: 'No valid recipients found for this campaign dispatch.',
      });
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
        sender: { name: 'Jasmel Acosta — AI Dynamic Pro', email: 'jasmelacosta@gmail.com' },
        to: [{ email: recipient.email, name: recipient.name }],
        replyTo: { email: 'jasmelacosta@gmail.com', name: 'Jasmel Acosta' },
        subject: personalizedSubject,
        htmlContent,
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
      sentCount,
      totalAttempted: recipients.length,
      renderedPayloads: sentCount === 0 ? renderedPayloads : [],
      errors: errors.slice(0, 5),
    });
  } catch (error) {
    console.error('[Email Campaign API] Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
