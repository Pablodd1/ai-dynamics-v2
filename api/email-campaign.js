// Serverless API Endpoint: /api/email-campaign
// B2B Email Campaign Engine (Brevo) + Google Analytics (GA4) UTM Tracking + Google Business Profile ("Google Buz") Integration

const CAMPAIGNS = {
  audit_99: {
    id: 'audit_99',
    name: '$99 AI Workflow & Feasibility Audit',
    subject: 'Where is {{company}} losing 15+ hours of payroll every week?',
    utmCampaign: 'audit_99_special',
    description: 'High-converting B2B offer pitching the $99 Comprehensive AI Business Audit to eliminate manual bottlenecks.',
    buildHtml: ({ name = 'Executive', company = 'your company', utmUrl, phoneUrl }) => `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #0a0a0f; color: #f8fafc; border-radius: 16px; overflow: hidden; border: 1px solid #1e293b;">
        <div style="background: linear-gradient(135deg, #0a192f 0%, #0f172a 100%); padding: 32px 28px; border-bottom: 2px solid #c9a96e; text-align: center;">
          <div style="display: inline-block; background: #f97316; color: #ffffff; font-size: 11px; font-weight: 800; letter-spacing: 1px; padding: 5px 14px; border-radius: 999px; text-transform: uppercase; margin-bottom: 12px;">
            $99 Discount Audit Special
          </div>
          <h1 style="margin: 0; font-size: 24px; color: #ffffff; letter-spacing: -0.5px;">AI DYNAMIC PRO</h1>
          <p style="margin: 6px 0 0; font-size: 13px; color: #c9a96e; text-transform: uppercase; letter-spacing: 1.5px;">AI Consulting • Custom App Solutions • Staff Training</p>
        </div>

        <div style="padding: 32px 28px; background: #0f172a; color: #e2e8f0; line-height: 1.65; font-size: 15px;">
          <p style="margin-top: 0;">Hi <strong>${name}</strong>,</p>
          <p>If your team at <strong>${company}</strong> spends more than 2 hours a day copying data between spreadsheets, chasing missed calls, or handling repetitive manual workflows, you are quietly losing tens of thousands every year in wasted payroll.</p>

          <div style="background: #1e293b; border-left: 4px solid #c9a96e; padding: 18px 20px; border-radius: 8px; margin: 24px 0;">
            <p style="margin: 0 0 10px; font-weight: 700; color: #ffffff;">Our 3-Step Methodology at AI Dynamic Pro:</p>
            <p style="margin: 6px 0;">1️⃣ <strong>The $99 Workflow Audit:</strong> We map your manual processes to pinpoint bottlenecks and error traps.</p>
            <p style="margin: 6px 0;">2️⃣ <strong>Custom App & AI Architecture:</strong> We engineer bespoke AI pipelines, CRM automations, and 24/7 voice/chat receptionists.</p>
            <p style="margin: 6px 0;">3️⃣ <strong>Corporate Staff Training:</strong> We train your team hands-on to operate at 5x speed with complete data security.</p>
          </div>

          <p>Stop guessing where AI fits into your operation. Start measuring hard ROI.</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${utmUrl}" style="display: inline-block; background: linear-gradient(90deg, #c9a96e, #eab308); color: #0a0a0f; font-weight: 800; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-size: 15px;">
              Claim Your $99 Workflow Audit →
            </a>
          </div>

          <p style="font-size: 14px; color: #94a3b8; text-align: center; margin-bottom: 0;">
            Prefer to speak right now? Call or text our Miami office at <a href="${phoneUrl}" style="color: #38bdf8; text-decoration: none; font-weight: 700;">+1 (786) 643-2099</a> or talk live with <strong>JAss</strong>, our AI Executive Assistant, at <a href="${utmUrl}" style="color: #c9a96e;">www.aidynamic.pro</a>.
          </p>
        </div>

        <div style="padding: 20px 28px; background: #0a0a0f; border-top: 1px solid #1e293b; text-align: center; font-size: 12px; color: #64748b;">
          <p style="margin: 0;">AI Dynamic Pro • Brickell Financial District, Miami, FL 33131</p>
          <p style="margin: 6px 0 0;">Direct: +1 (786) 643-2099 • <a href="${utmUrl}" style="color: #94a3b8;">www.aidynamic.pro</a></p>
        </div>
      </div>
    `,
  },

  voice_jass: {
    id: 'voice_jass',
    name: '24/7 Bilingual AI Receptionist (JAss) & Custom Apps',
    subject: 'Stop losing 38% of calls during lunch & after 5 PM at {{company}}',
    utmCampaign: 'voice_ai_jass',
    description: 'Demonstrates 24/7 bilingual voice/chat receptionist capabilities and custom app solutions.',
    buildHtml: ({ name = 'Executive', company = 'your business', utmUrl, phoneUrl }) => `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #0a0a0f; color: #f8fafc; border-radius: 16px; overflow: hidden; border: 1px solid #1e293b;">
        <div style="background: linear-gradient(135deg, #064e3b 0%, #0f172a 100%); padding: 32px 28px; border-bottom: 2px solid #10b981; text-align: center;">
          <div style="display: inline-block; background: #10b981; color: #052e16; font-size: 11px; font-weight: 800; letter-spacing: 1px; padding: 5px 14px; border-radius: 999px; text-transform: uppercase; margin-bottom: 12px;">
            24/7 Bilingual Voice & Chat AI
          </div>
          <h1 style="margin: 0; font-size: 24px; color: #ffffff;">Never Miss Another Client Call</h1>
          <p style="margin: 6px 0 0; font-size: 13px; color: #6ee7b7;">AI Dynamic Pro • Miami Enterprise AI Studio</p>
        </div>

        <div style="padding: 32px 28px; background: #0f172a; color: #e2e8f0; line-height: 1.65; font-size: 15px;">
          <p style="margin-top: 0;">Hi <strong>${name}</strong>,</p>
          <p>In South Florida, <strong>38% of incoming client calls</strong> happen between 12:00 PM – 1:30 PM or after 5:00 PM. When callers hit voicemail, <strong>80% hang up and immediately call a competitor</strong>.</p>

          <p>At <strong>AI Dynamic Pro</strong>, we engineer custom 24/7 Bilingual (English & Spanish) AI Receptionists and bespoke web applications tailored to <strong>${company}</strong>:</p>

          <ul style="background: #1e293b; padding: 20px 20px 20px 36px; border-radius: 10px; margin: 22px 0;">
            <li style="margin-bottom: 8px;"><strong>Answers on Ring Zero:</strong> Instant, natural human voice in English and Spanish.</li>
            <li style="margin-bottom: 8px;"><strong>Qualifies & Schedules Live:</strong> Answers complex service FAQs and books directly into your calendar.</li>
            <li style="margin-bottom: 0;"><strong>Instant Staff Escalation:</strong> Texts and emails your team a full summary within 5 seconds.</li>
          </ul>

          <p>Don't take our word for it—test <strong>JAss</strong>, our live AI Executive Assistant, right now on our website or book a $99 Audit to wire this into your operation:</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${utmUrl}" style="display: inline-block; background: #10b981; color: #052e16; font-weight: 800; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-size: 15px;">
              Test JAss Live & Book Your $99 Audit →
            </a>
          </div>

          <p style="font-size: 14px; color: #94a3b8; text-align: center; margin-bottom: 0;">
            Direct Miami Line: <a href="${phoneUrl}" style="color: #6ee7b7; font-weight: 700; text-decoration: none;">+1 (786) 643-2099</a>
          </p>
        </div>

        <div style="padding: 20px 28px; background: #0a0a0f; border-top: 1px solid #1e293b; text-align: center; font-size: 12px; color: #64748b;">
          <p style="margin: 0;">AI Dynamic Pro • Miami, FL • <a href="${utmUrl}" style="color: #94a3b8;">www.aidynamic.pro</a></p>
        </div>
      </div>
    `,
  },

  staff_training: {
    id: 'staff_training',
    name: 'Corporate Staff AI Training & Adoption Workshop',
    subject: 'Equipping {{company}}’s workforce to operate at 5x speed with AI',
    utmCampaign: 'corporate_staff_training',
    description: 'Focused on corporate workshops, AI SOPs, data privacy guardrails, and department-specific upskilling.',
    buildHtml: ({ name = 'Executive', company = 'your organization', utmUrl, phoneUrl }) => `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #0a0a0f; color: #f8fafc; border-radius: 16px; overflow: hidden; border: 1px solid #1e293b;">
        <div style="background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%); padding: 32px 28px; border-bottom: 2px solid #818cf8; text-align: center;">
          <div style="display: inline-block; background: #6366f1; color: #ffffff; font-size: 11px; font-weight: 800; letter-spacing: 1px; padding: 5px 14px; border-radius: 999px; text-transform: uppercase; margin-bottom: 12px;">
            Corporate Upskilling & AI SOPs
          </div>
          <h1 style="margin: 0; font-size: 24px; color: #ffffff;">Enterprise Staff AI Training</h1>
          <p style="margin: 6px 0 0; font-size: 13px; color: #a5b4fc;">Turn Your Existing Team Into an AI-Powered Workforce</p>
        </div>

        <div style="padding: 32px 28px; background: #0f172a; color: #e2e8f0; line-height: 1.65; font-size: 15px;">
          <p style="margin-top: 0;">Hi <strong>${name}</strong>,</p>
          <p>The #1 reason AI initiatives fail inside growing companies isn't the software—<strong>it's staff adoption</strong>.</p>
          <p>Buying AI licenses won't move the needle if your employees at <strong>${company}</strong> are overwhelmed, unsure what company data is safe to share, or stuck in manual habits.</p>

          <div style="background: #1e293b; border-left: 4px solid #818cf8; padding: 18px 20px; border-radius: 8px; margin: 24px 0;">
            <p style="margin: 0 0 10px; font-weight: 700; color: #ffffff;">What Our Hands-On Corporate Workshops Deliver:</p>
            <p style="margin: 6px 0;">✔️ <strong>Role-Specific Prompt Engineering:</strong> Built around your actual daily operations.</p>
            <p style="margin: 6px 0;">✔️ <strong>Data Security & Privacy SOPs:</strong> Ironclad guardrails so confidential client data stays protected.</p>
            <p style="margin: 6px 0;">✔️ <strong>Custom App & Workflow Integration:</strong> Training your staff on bespoke automation tools we build for you.</p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${utmUrl}" style="display: inline-block; background: #6366f1; color: #ffffff; font-weight: 800; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-size: 15px;">
              Schedule a Corporate Training Consultation →
            </a>
          </div>

          <p style="font-size: 14px; color: #94a3b8; text-align: center; margin-bottom: 0;">
            Or start with our <strong>$99 Workflow Audit</strong> • Call/Text Miami: <a href="${phoneUrl}" style="color: #a5b4fc; font-weight: 700; text-decoration: none;">+1 (786) 643-2099</a>
          </p>
        </div>

        <div style="padding: 20px 28px; background: #0a0a0f; border-top: 1px solid #1e293b; text-align: center; font-size: 12px; color: #64748b;">
          <p style="margin: 0;">AI Dynamic Pro • Miami, FL • <a href="${utmUrl}" style="color: #94a3b8;">www.aidynamic.pro</a></p>
        </div>
      </div>
    `,
  },

  google_business: {
    id: 'google_business',
    name: 'Google Business Profile ("Google Buz") Review & Local Check-In',
    subject: 'Quick favor from Jasmel at AI Dynamic Pro (Google Business Profile) ⭐',
    utmCampaign: 'google_business_review',
    description: 'Drives 5-star reviews and local Miami authority on your Google Business Profile with GA4 UTM tracking.',
    buildHtml: ({ name = 'Valued Partner', utmUrl, gbpUrl, phoneUrl }) => `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #0a0a0f; color: #f8fafc; border-radius: 16px; overflow: hidden; border: 1px solid #1e293b;">
        <div style="background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%); padding: 32px 28px; border-bottom: 2px solid #38bdf8; text-align: center;">
          <div style="display: inline-block; background: #38bdf8; color: #082f49; font-size: 11px; font-weight: 800; letter-spacing: 1px; padding: 5px 14px; border-radius: 999px; text-transform: uppercase; margin-bottom: 12px;">
            Google Business Profile • Miami, FL
          </div>
          <h1 style="margin: 0; font-size: 24px; color: #ffffff;">Thank You for Connecting with AI Dynamic Pro</h1>
          <p style="margin: 6px 0 0; font-size: 13px; color: #bae6fd;">Helping Miami Businesses Automate & Scale with AI</p>
        </div>

        <div style="padding: 32px 28px; background: #0f172a; color: #e2e8f0; line-height: 1.65; font-size: 15px;">
          <p style="margin-top: 0;">Hi <strong>${name}</strong>,</p>
          <p>Thank you for connecting with <strong>AI Dynamic Pro</strong>! As we expand our local Miami presence helping businesses with <strong>$99 AI Workflow Audits, Custom App Development, and Corporate Staff Training</strong>, local feedback on Google means the world to our team.</p>

          <p>Could you spare 30 seconds to check out our <strong>Google Business Profile</strong> or leave us a quick 5-star review?</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${gbpUrl}" style="display: inline-block; background: #38bdf8; color: #082f49; font-weight: 800; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-size: 15px;">
              ⭐⭐⭐⭐⭐ View & Review Us on Google Business →
            </a>
          </div>

          <p>Need help automating a workflow or training your staff this month? Book your session directly at <a href="${utmUrl}" style="color: #c9a96e; font-weight: 700;">aidynamic.pro/booking</a> or call <a href="${phoneUrl}" style="color: #38bdf8; font-weight: 700; text-decoration: none;">+1 (786) 643-2099</a>.</p>
          <p style="margin-bottom: 0;">Warm regards,<br/><strong>Jasmel Acosta</strong><br/>Founder, AI Dynamic Pro</p>
        </div>

        <div style="padding: 20px 28px; background: #0a0a0f; border-top: 1px solid #1e293b; text-align: center; font-size: 12px; color: #64748b;">
          <p style="margin: 0;">AI Dynamic Pro • Brickell Financial District, Miami, FL 33131</p>
        </div>
      </div>
    `,
  },
};

// Ready-to-publish Google Business Profile ("Google Buz") Local Posts with GA4 UTM tracking
const GOOGLE_BUSINESS_POSTS = [
  {
    id: 'gbp_audit_offer',
    type: 'OFFER POST',
    title: '$99 AI Workflow & Feasibility Audit (Miami Special)',
    ctaButton: 'Book Online',
    ctaUrl: 'https://www.aidynamic.pro/booking?utm_source=google_business&utm_medium=gbp_offer&utm_campaign=audit_99',
    content: `Where is your business losing 15+ hours of payroll every single week? ⏱️⚡\n\nAt AI Dynamic Pro in Miami, we help businesses across Healthcare, Legal, Real Estate, Construction, and Logistics eliminate manual bottlenecks.\n\nOur 3 Core Pillars:\n1️⃣ $99 AI Workflow Audit: We map your manual processes and deliver an actionable ROI roadmap.\n2️⃣ Custom App & AI Solutions: We build bespoke automations and 24/7 bilingual (EN/ES) AI voice & chat receptionists.\n3️⃣ Corporate Staff Training: Hands-on workshops so your team operates at 5x speed.\n\n📞 Call/Text our Miami line: (786) 643-2099 or click "Book Online" to claim your $99 Audit!`,
  },
  {
    id: 'gbp_voice_jass',
    type: 'WHAT’S NEW POST',
    title: '24/7 Bilingual AI Receptionist & Custom App Development',
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
      campaignId = 'audit_99',
      mode = 'test', // 'test' | 'custom' | 'supabase_leads'
      statusFilter = 'all',
      customRecipients = [],
      customSubject = '',
    } = req.body || {};

    const campaign = CAMPAIGNS[campaignId] || CAMPAIGNS.audit_99;

    if (!BREVO_API_KEY) {
      return res.status(400).json({
        error: 'BREVO_API_KEY / VITE_BREVO_API_KEY is not configured in environment variables.',
      });
    }

    let recipients = [];

    if (mode === 'test') {
      recipients = [
        {
          name: 'Jasmel Acosta',
          email: 'jasmelacosta@gmail.com',
          company: 'AI Dynamic Pro (Test Preview)',
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

    for (const recipient of recipients) {
      const utmUrl = `https://www.aidynamic.pro/booking?utm_source=brevo&utm_medium=email&utm_campaign=${campaign.utmCampaign}`;
      const gbpUrl = GBP_REVIEW_URL;
      const phoneUrl = 'tel:+17866432099';

      const personalizedSubject = (customSubject || campaign.subject).replace(
        /\{\{company\}\}/g,
        recipient.company || 'your business'
      );

      const htmlContent = campaign.buildHtml({
        name: recipient.name,
        company: recipient.company,
        utmUrl,
        gbpUrl,
        phoneUrl,
      });

      try {
        const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'api-key': BREVO_API_KEY,
          },
          body: JSON.stringify({
            sender: { name: 'Jasmel Acosta — AI Dynamic Pro', email: 'jasmelacosta@gmail.com' },
            to: [{ email: recipient.email, name: recipient.name }],
            replyTo: { email: 'jasmelacosta@gmail.com', name: 'Jasmel Acosta' },
            subject: personalizedSubject,
            htmlContent,
            tags: [campaign.utmCampaign, 'aidynamic_campaign'],
          }),
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
      errors: errors.slice(0, 5),
    });
  } catch (error) {
    console.error('[Email Campaign API] Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
