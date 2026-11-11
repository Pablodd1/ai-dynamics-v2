/**
 * AI Dynamic Pro — Direct Buffer GraphQL Publishing & Channel Sync Endpoint
 * Allows 1-click syncing, scheduling, and publishing of VisionOS Reels, 7-Slide Carousels,
 * and 5-Week Synchronized Social Campaigns to Instagram, LinkedIn, and Google Business Profile.
 */

const DEFAULT_BUFFER_TOKEN =
  process.env.BUFFER_API_TOKEN ||
  process.env.BUFFER_ACCESS_TOKEN ||
  process.env.BUFFER_KEY ||
  process.env.BUFFER_TOKEN ||
  process.env.VITE_BUFFER_API_TOKEN ||
  ''

const DEFAULT_ORG_ID =
  process.env.BUFFER_ORG_ID || '6af1e3f0aede2cd4287eac43'

const VISION_DECK_CAROUSEL = {
  title: 'AI DYNAMIC PRO — Six Production AI Architectures Engineered Inside Your Company (7-Slide Obsidian & Gold Deck)',
  text: `Comment "SCALE" — Six Production AI Architectures Engineered Inside Your Company.

Every week a CEO delays AI integration, manual payroll and missed calls quietly drain $3,420+ per department.

At AI Dynamic Pro, we do not sell generic software subscriptions. As hands-on AI Developers and Creators, we walk into your operation, engineer custom production architectures around your workflows in 48 hours, and stay on-site training your staff until 1 employee produces the output of 5:

01 / CLINICAL & HEALTHCARE AI — Ambient SOAP charting, automated 837 claim scrubbing, and bilingual patient intake (-45% admin overhead).
02 / COMPUTER VISION & SPATIAL AI — YOLOv8 + DINOv2 macro authentication, 12-class property defect vision, and 3D LiDAR digital twins.
03 / AUTONOMOUS REVOPS & VOICE (JAss) — 3-second Ring-1 bilingual voice and sub-minute multi-channel CRM conversion ($997 Turnkey / $297/mo).
04 / PRIVATE RAG & DEAL INTELLIGENCE — Sovereign legal contract screening, escrow deadline telemetry, and vector real estate deal matching.
05 / BIOMECHANICS & AGENTIC WEB — 33-joint markerless kinematics, daily biometric adaptation, and self-learning Agentic Websites built for LLM Answer Engines.
06 / ON-SITE WORKFORCE MULTIPLICATION — $99 60-Min Department Efficiency Audit + Free 48-Hr Prototype (guaranteed to uncover $2,500+/mo in savings or you pay $0) + $497 Corporate Staff Bootcamp.

Comment "SCALE" or schedule your $99 Audit / 48-Hour Prototype directly at https://www.aidynamic.pro/booking
Direct Executive Line: +1 (786) 643-2099`,
  slides: [
    'https://www.aidynamic.pro/social/vision-deck/vision_slide_01.png?v=bright3',
    'https://www.aidynamic.pro/social/vision-deck/vision_slide_02.png?v=bright3',
    'https://www.aidynamic.pro/social/vision-deck/vision_slide_03.png?v=bright3',
    'https://www.aidynamic.pro/social/vision-deck/vision_slide_04.png?v=bright3',
    'https://www.aidynamic.pro/social/vision-deck/vision_slide_05.png?v=bright3',
    'https://www.aidynamic.pro/social/vision-deck/vision_slide_06.png?v=bright3',
    'https://www.aidynamic.pro/social/vision-deck/vision_slide_07.png?v=bright3',
  ],
  reelUrl: 'https://www.aidynamic.pro/social/vision-deck/vision_reel_week1.mp4',
}

async function bufferGraphQL(query, variables = {}, token = DEFAULT_BUFFER_TOKEN) {
  const res = await fetch('https://api.buffer.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  })
  return res.json()
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const token = (req.body && req.body.token) || DEFAULT_BUFFER_TOKEN

  try {
    if (req.method === 'GET' || (req.body && req.body.action === 'status')) {
      const q = `
        query GetBufferStatus($orgInput: ChannelsInput!) {
          account {
            id
            email
            name
            organizations {
              id
              name
              channelCount
            }
          }
          channels(input: $orgInput) {
            id
            name
            displayName
            service
            serviceId
            type
            avatar
            isDisconnected
            externalLink
          }
          gbpPosts: posts(input: { organizationId: "6af1e3f0aede2cd4287eac43", filter: { channelIds: ["6af1e6aa62b70b94b0d12fb2"] } }, first: 12) {
            edges {
              node {
                id
                status
                dueAt
                sentAt
                createdAt
                externalLink
                text
              }
            }
          }
          linkedinPosts: posts(input: { organizationId: "6af1e3f0aede2cd4287eac43", filter: { channelIds: ["6af1e68862b70b94b0d12e71"] } }, first: 12) {
            edges {
              node {
                id
                status
                dueAt
                sentAt
                createdAt
                externalLink
                text
              }
            }
          }
          instagramPosts: posts(input: { organizationId: "6af1e3f0aede2cd4287eac43", filter: { channelIds: ["6af1e61262b70b94b0d1293c"] } }, first: 12) {
            edges {
              node {
                id
                status
                dueAt
                sentAt
                createdAt
                externalLink
                text
              }
            }
          }
        }
      `
      let data = await bufferGraphQL(
        q,
        { orgInput: { organizationId: DEFAULT_ORG_ID } },
        token
      )
      const detectedOrgId =
        data?.data?.account?.organizations?.[0]?.id || DEFAULT_ORG_ID
      if (detectedOrgId !== DEFAULT_ORG_ID) {
        data = await bufferGraphQL(
          q,
          { orgInput: { organizationId: detectedOrgId } },
          token
        )
      }
      return res.status(200).json({
        connected: Boolean(data?.data?.account?.id),
        account: data?.data?.account || null,
        channels: data?.data?.channels || [],
        gbpPosts: data?.data?.gbpPosts?.edges?.map((e) => e.node) || [],
        linkedinPosts: data?.data?.linkedinPosts?.edges?.map((e) => e.node) || [],
        instagramPosts: data?.data?.instagramPosts?.edges?.map((e) => e.node) || [],
        rawErrors: data?.errors || null,
        organizationId: detectedOrgId,
        visionDeck: VISION_DECK_CAROUSEL,
      })
    }

    if (req.method === 'POST') {
      const {
        action,
        channelIds,
        postType = 'carousel',
        mode = 'shareNow',
        dueAt,
        customText,
        customImageUrl,
        customButton = 'book',
        customLink = 'https://www.aidynamic.pro/booking?utm_source=google_business&utm_medium=buffer_vision_deck',
      } = req.body || {}

      // Fetch active channels if not explicitly passed
      const chQuery = `
        query ListOrgChannels($input: ChannelsInput!) {
          channels(input: $input) {
            id
            name
            service
            type
          }
        }
      `
      const chRes = await bufferGraphQL(
        chQuery,
        { input: { organizationId: DEFAULT_ORG_ID } },
        token
      )
      const allChannels = chRes?.data?.channels || []

      if (action === 'sync_omnichannel_campaign') {
        const gbpChannelId = '6af1e6aa62b70b94b0d12fb2'
        const linkedinChannelId = '6af1e68862b70b94b0d12e71'
        const instagramChannelId = '6af1e61262b70b94b0d1293c'

        const createPostMutation = `
          mutation PublishSocialPost($input: CreatePostInput!) {
            createPost(input: $input) {
              ... on PostActionSuccess {
                post {
                  id
                  status
                  dueAt
                  sentAt
                  externalLink
                  text
                }
              }
              ... on MutationError {
                message
              }
            }
          }
        `

        // 6 Founder-Grade Omnichannel Waves (Number-first 2026 Hooks, Zero AI Tells, Bright Visual Assets, Direct Connect Hub CTAs)
        const omnichannelWaves = [
          {
            waveId: 'wave_1_now_money_ledger',
            label: 'Wave 1 (Publish Now) — F7 Odd-Precision Money Ledger ($3,420/mo Admin Leak)',
            mode: 'shareNow',
            dueAt: null,
            image: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_06.png?v=bright3',
            carouselImages: [
              'https://www.aidynamic.pro/social/vision-deck/vision_slide_06.png?v=bright3',
              'https://www.aidynamic.pro/social/vision-deck/vision_slide_03.png?v=bright3',
              'https://www.aidynamic.pro/social/vision-deck/vision_slide_01.png?v=bright3',
              'https://www.aidynamic.pro/social/vision-deck/vision_slide_07.png?v=bright3',
            ],
            gbpButton: 'book',
            connectLink: 'https://www.aidynamic.pro/connect?mode=call&utm_source=social&utm_medium=buffer&utm_campaign=wave1_money_ledger',
            linkedinText: `$3,420 a month per department is what the average Miami business quietly burns on two habits: receptionists manually re-typing intake forms, and callers who hang up between 12:00 PM and 2:00 PM or after 5:30 PM.

Last month in Brickell, I sat next to an office coordinator who spent 3 hours and 40 minutes every afternoon copying WhatsApp messages, insurance photos, and estimate requests into their CRM by hand.

We did not sell them another software login that collects dust.

Over 48 hours, we wired a custom bilingual AI intake workflow directly into their phone line and WhatsApp, then sat with their front desk for a half-day until that 3-hour-40-minute block dropped to 19 minutes.

That is why we start every engagement the exact same way: a flat $99 60-minute workflow audit and a working 48-hour custom AI prototype built around your slowest bottleneck. If the prototype does not show a clear path to saving at least $2,500 a month in payroll and recovered leads, I refund the $99 on the spot.

Which single task in your office still eats 2+ hours of manual copy-pasting every day?

P.S. Test our 10-second Direct Connect card (Call Me, Text Me, or Free 15-Min Virtual Consult) at https://www.aidynamic.pro/connect`,
            instagramText: `$3,420/month per department is what most South Florida businesses lose to missed lunch-hour calls and manual copy-pasting.

Instead of pitching bloated software contracts, my team at AI Dynamic Pro comes into your business for a flat $99 60-minute workflow audit and builds a working custom AI prototype in 48 hours.

Swipe through to see how we combine:
• 48-Hour Custom AI Prototypes ($2,500+/mo savings guarantee or $0)
• JAss 24/7 Bilingual (EN/ES) Voice & WhatsApp Receptionist ($997 turnkey)
• Clinical, Legal, Real Estate & Contractor Vision Workflows
• $497 Half-Day On-Site Staff AI Bootcamp (1 trained employee = 5)

Tap the link in bio or visit aidynamic.pro/connect to have me call you, text you, or lock in a free 15-minute virtual consult in 10 seconds.

Which bottleneck in your business would you automate first?

#MiamiBusiness #Brickell #AIAutomation #SouthFloridaBusiness #AIDynamicPro`,
            gbpText: `STOP LOSING $3,420/MONTH PER DEPARTMENT TO MISSED CALLS & MANUAL ADMIN — Test Us With a $99 60-Min Audit + Free 48-Hour Custom AI Prototype.

Most Miami business owners are not short on demand—they are losing hours every day to manual data entry, slow estimate follow-ups, and after-hours voicemails.

How our Direct Connect Hub works in 10 seconds:
01. $99 60-Min Workflow Audit + Working 48-Hour Custom AI Prototype built for your company (save $2,500+/mo or pay $0).
02. JAss 24/7 Bilingual (English & Español) Voice & WhatsApp Receptionist ($997 turnkey).
03. $497 Half-Day On-Site Staff AI Bootcamp for up to 15 employees (1 trained employee = 5).

Click Book Below to choose Call Me, Text Me, or a Free 15-Min Virtual Consultation.`,
          },
          {
            waveId: 'wave_2_medical_dental_ab',
            label: 'Wave 2 (Thu Nov 12 @ 9:30 AM EST) — F17 Controlled A/B Clinic Comparison',
            mode: 'customScheduled',
            dueAt: '2026-11-12T09:30:00-05:00',
            image: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_01.png?v=bright3',
            gbpButton: 'book',
            connectLink: 'https://www.aidynamic.pro/connect?mode=virtual&segment=medical_dental&utm_source=social&utm_medium=buffer&utm_campaign=wave2_medical_ab',
            linkedinText: `38% of new-patient calls to Miami medical clinics, dental practices, and MedSpas happen when the front desk is checking someone out, on lunch, or closed after 5:00 PM.

Look at two 4-provider practices two blocks apart in Coral Gables running the exact same ad spend.

Practice A sends overflow calls to voicemail and has billers manually keying insurance cards and ICD-10/CPT checks at 6:00 PM. Four out of ten voicemail callers book with the next clinic on Google Maps before Practice A calls back at 9:15 AM.

Practice B answers every English and Spanish call on Ring 1 with JAss, captures a smartphone photo of the patient's insurance card via SMS in 14 seconds, and flags missing modifiers before the claim ever leaves the building.

Same doctors. Same neighborhood. Practice B recovered 19 high-value patient appointments in its first 30 days and cut front-desk overtime by 45%.

For $99, we run a 60-minute practice audit and build a live 48-hour prototype tuned to your specialty.

How many new-patient calls hit your clinic's voicemail between noon and 2:00 PM this week?

P.S. Use our 10-second Direct Connect hub at https://www.aidynamic.pro/connect?mode=virtual&segment=medical_dental to request a quick call, text, or 15-minute virtual walkthrough.`,
            instagramText: `38% of new-patient calls to Miami clinics, dental offices, and MedSpas hit voicemail during lunch or after 5:00 PM—and book somewhere else.

Here is what changes when we install our Clinical & Front-Desk AI inside your practice in 48 hours:
• Ring-1 Bilingual (English & Español) phone and WhatsApp scheduling 24/7
• 14-second mobile insurance card photo capture before the patient walks in
• Automated clinical notes and pre-submission claim scrubbing (-45% admin load)
• On-site $497 staff training so your front desk and billers run 4x faster without burnout

Start with our $99 60-Minute Practice Audit + Free 48-Hour Custom Prototype at aidynamic.pro/connect (guaranteed to uncover $2,500+/mo in savings or you pay $0).

How does your practice handle calls when the front desk is tied up with a patient?

#MiamiDoctors #CoralGables #MiamiMedSpa #DentalPractice #HealthcareAI`,
            gbpText: `FOR MIAMI MEDICAL CLINICS, DENTAL OFFICES & MEDSPAS: Stop Losing 38% of Lunch-Hour & After-Hours Patient Calls to Voicemail.

We build custom healthcare & front-desk AI around your practice in 48 hours and train your receptionists and billers on-site:
01. 24/7 Bilingual (EN/ES) Ring-1 Patient Scheduling across Phone, SMS & WhatsApp.
02. Instant Mobile Insurance Card Verification & Pre-Claim Scrubbing (-45% admin overhead).
03. $99 60-Min Practice Audit + Working 48-Hour Prototype ($2,500+/mo savings guarantee or $0).

Click Book Below to connect with our Miami engineering team via Call, Text, or 15-Min Virtual Consult.`,
          },
          {
            waveId: 'wave_3_contractors_vision',
            label: 'Wave 3 (Fri Nov 13 @ 9:30 AM EST) — F10 Contrarian + Field Estimating Receipts',
            mode: 'customScheduled',
            dueAt: '2026-11-13T09:30:00-05:00',
            image: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_02.png?v=bright3',
            gbpButton: 'learn_more',
            connectLink: 'https://www.aidynamic.pro/connect?mode=text&segment=contractors_gc&utm_source=social&utm_medium=buffer&utm_campaign=wave3_contractors_vision',
            linkedinText: `12.5 hours a week is what the average South Florida estimator loses driving across I-95 and the Palmetto to measure jobs that never close.

Most general contractors and property service owners think the only way to bid more work is to hire another $85,000/year estimator.

When we audited a Miami contracting crew in Doral, the bottleneck was not their pricing—it was the 48-hour gap between a homeowner's first call and the preliminary quote landing in their inbox.

We built a smartphone photo-to-quote computer vision workflow paired with a 24/7 English/Spanish WhatsApp coordinator:
1. The property owner texts 3 photos of the room or damage from their phone.
2. Our vision model flags scope items, calculates square-footage material bands, and drafts a branded PDF ballpark estimate in under 60 seconds.
3. Estimators only drive out to pre-qualified jobs where the client already approved the price range.

We build a working 48-hour prototype of this exact workflow for your company during our $99 60-minute audit.

What percentage of your in-person site visits actually turn into signed jobs right now?

P.S. Use our Direct Connect hub at https://www.aidynamic.pro/connect?mode=text&segment=contractors_gc if you want me to text you a live demo on your phone.`,
            instagramText: `12.5 hours a week is what South Florida contractors and estimators waste driving in Miami traffic to unqualified site visits.

Instead of hiring another estimator, we build a custom Photo-to-Quote AI & 24/7 Bilingual Job Coordinator for your crew in 48 hours:
• Customers text 3 smartphone photos of the space or repair
• Custom Computer Vision estimates scope & generates a branded PDF quote range in 60 seconds
• JAss follows up on every open estimate in English and Spanish until the job is booked

Test it on your own workflow with our $99 60-Min Audit + Free 48-Hour Prototype at aidynamic.pro/connect.

How fast does your team get a preliminary quote out after a lead calls?

#MiamiContractors #SouthFloridaConstruction #Doral #HomeServicesAI #AIDynamicPro`,
            gbpText: `FOR SOUTH FLORIDA CONTRACTORS, CONSTRUCTION & PROPERTY SERVICES — Turn Smartphone Photos & Calls Into Branded Quotes in 60 Seconds.

Stop burning 12+ estimator hours every week driving to unqualified jobs:
01. Photo-to-Quote Computer Vision: Clients send job photos from their phone and receive a pre-qualified estimate range in seconds.
02. 24/7 Bilingual (EN/ES) Call & WhatsApp Dispatch: Answers every job inquiry on Ring 1 and follows up on unpaid quotes automatically.
03. $99 60-Min Workflow Audit + Free 48-Hour Custom AI Prototype.

Click Learn More to connect with us by Call, Text, or 15-Min Virtual Consultation.`,
          },
          {
            waveId: 'wave_4_staff_bootcamp_497',
            label: 'Wave 4 (Tue Nov 17 @ 9:30 AM EST) — F15 Plain-English 1 Employee = 5 Breakdown',
            mode: 'customScheduled',
            dueAt: '2026-11-17T09:30:00-05:00',
            image: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_07.png?v=bright3',
            gbpButton: 'signup',
            connectLink: 'https://www.aidynamic.pro/connect?mode=call&segment=staff_bootcamp&utm_source=social&utm_medium=buffer&utm_campaign=wave4_staff_bootcamp',
            linkedinText: `83% of companies that buy AI licenses never see a dollar of ROI because nobody sits down next to their staff to rebuild their actual Tuesday morning checklist.

Buying your team logins without role-specific training is like parking a forklift in a warehouse and hoping people figure out the pedals between phone calls. By Monday at 10:00 AM, everyone quietly goes back to spreadsheets and sticky notes.

That is why we built our $497 Half-Day On-Site Corporate AI Bootcamp (for up to 15 employees, taught in plain English and Spanish right inside your Miami office or live virtual).

Here is what we do in those 4 hours:
• Sit with your receptionists, coordinators, paralegals, billers, and sales reps at their actual desks.
• Replace their 3 slowest daily tasks—inbox triage, proposal drafting, bilingual follow-ups, and spreadsheet cleanup—with custom 1-click playbooks.
• Leave every employee with a laminated daily SOP so 4 hours of repetitive busywork takes 22 minutes.

One trained employee reliably produces the output of five, without adding a dollar to your monthly payroll.

When was the last time someone trained your team hands-on instead of sending them a 40-minute webinar link?

P.S. Pick Call Me, Text Me, or a 15-Min Virtual slot at https://www.aidynamic.pro/connect?mode=call&segment=staff_bootcamp to reserve a bootcamp date for your team.`,
            instagramText: `83% of businesses that buy AI subscriptions never see a dime of return for one simple reason: nobody trains their staff on their actual daily tasks.

Our $497 Half-Day On-Site Corporate AI Bootcamp (up to 15 staff, in English & Español) fixes that in a single morning:
• Hands-on desk-by-desk training inside your Miami office (or live virtual)
• Custom role-specific playbooks for receptionists, coordinators, sales reps & managers
• Cuts 4 hours of daily admin down to 22 minutes so 1 trained employee = the output of 5

Lock in your team's date or start with a $99 Workflow Audit at aidynamic.pro/connect.

Which department in your company is drowning in the most repetitive busywork right now?

#MiamiCEO #CorporateTraining #WorkforceMultiplier #BrickellMiami #BusinessAutomation`,
            gbpText: `$497 ON-SITE CORPORATE AI STAFF BOOTCAMP (MIAMI & SOUTH FLORIDA) — Turn 1 Existing Employee Into the Output of 5.

83% of AI tools fail because nobody trains the staff step-by-step. Our bilingual (English & Español) engineering team comes directly to your office for a Half-Day Practical AI Bootcamp (up to 15 employees for $497 flat):
01. Role-Specific Playbooks for Receptionists, Sales Reps, Coordinators & Managers.
02. Turn 4 Hours of Daily Admin Into 22 Minutes Immediately.
03. Zero Technical Jargon — Real Hands-On Execution.

Click Sign Up Below to connect with Jasmel via Call, Text, or Virtual Consultation.`,
          },
          {
            waveId: 'wave_5_legal_realestate_rag',
            label: 'Wave 5 (Thu Nov 19 @ 9:30 AM EST) — F5 Self-Proving 3-Second Intake & Private RAG',
            mode: 'customScheduled',
            dueAt: '2026-11-19T09:30:00-05:00',
            image: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_04.png?v=bright3',
            gbpButton: 'book',
            connectLink: 'https://www.aidynamic.pro/connect?mode=virtual&segment=legal_realestate&utm_source=social&utm_medium=buffer&utm_campaign=wave5_legal_re',
            linkedinText: `47 minutes is the average daytime response time for South Florida law firms and real estate brokerages—even though 78% of clients sign with the first firm that speaks to them live.

If a high-value retainer inquiry or cash buyer messages at 7:15 PM on a Wednesday and waits until Thursday morning for a callback, that deal is already gone.

Inside our Brickell lab, we deploy two private systems for law firms, title companies, and real estate teams in 48 hours:

1. 3-Second Bilingual Intake (Phone, SMS, WhatsApp, Instagram): Qualifies case type or buyer budget in English or Spanish, checks conflict/property criteria, and books the consultation directly onto your calendar while your competitor's phone is still ringing.
2. Sovereign Private-Cloud Contract & Escrow Screening: Scans 120-page leases, HOA disclosures, and retainers in 11 seconds—flagging inspection deadlines, lien clauses, and missing signatures without a single document ever training a public model.

We prove it on your own intake flow during our $99 60-minute audit + free 48-hour prototype.

What happens right now when a prospect calls or texts your firm at 7:30 PM?

P.S. Test our 10-second Direct Connect hub at https://www.aidynamic.pro/connect?mode=virtual&segment=legal_realestate — tap Call Me, Text Me, or book a 15-minute virtual review.`,
            instagramText: `47 minutes is the average lead response time for law firms and real estate teams—yet 78% of clients hire the first firm that answers.

We engineer two private AI systems for South Florida attorneys, brokers, and title companies in 48 hours:
• 3-Second 24/7 Bilingual (EN/ES) Client Intake across Phone, WhatsApp, SMS & IG
• 11-Second Private-Cloud Contract, Lease & Escrow Deadline Screening (100% sovereign data privacy)
• On-site paralegal & coordinator training ($497 bootcamp) that saves 15+ hours a week

Claim your $99 60-Min Audit + Free 48-Hour Custom Prototype at aidynamic.pro/connect.

How fast does your firm respond to a 7:00 PM inquiry right now?

#MiamiRealEstate #MiamiLawFirm #BrickellLegal #CommercialRealEstateMiami #LegalTechAI`,
            gbpText: `FOR MIAMI LAW FIRMS, REAL ESTATE BROKERS & TITLE COMPANIES — 3-Second Bilingual Client Intake & Instant Private Contract Screening.

78% of clients hire the first firm that responds. We engineer private AI systems for South Florida legal and real estate teams:
01. 24/7 Bilingual (English/Spanish) Intake across Phone, WhatsApp, SMS & Instagram in under 3 seconds.
02. Private-Cloud Contract, Lease & Escrow Deadline Review in 11 seconds.
03. $99 60-Min Firm Audit + Free 48-Hour Custom AI Prototype.

Click Book Below to connect via Call, Text, or Free 15-Min Virtual Consultation.`,
          },
          {
            waveId: 'wave_6_agentic_web_diverging',
            label: 'Wave 6 (Tue Nov 24 @ 9:30 AM EST) — F20 Diverging-Curves Close (Static Brochure vs Self-Selling Agentic Web)',
            mode: 'customScheduled',
            dueAt: '2026-11-24T09:30:00-05:00',
            image: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_05.png?v=bright3',
            gbpButton: 'learn_more',
            connectLink: 'https://www.aidynamic.pro/connect?mode=virtual&segment=ceo_owners&utm_source=social&utm_medium=buffer&utm_campaign=wave6_agentic_web',
            linkedinText: `8.2 seconds is how long a prospect stays on a traditional brochure website before bouncing back to Google or ChatGPT.

Over the next 12 months, local businesses in Miami are splitting into two sharply diverging curves.

On the bottom curve are static websites built like 2019 digital flyers: a hero photo, three paragraphs of corporate slogans, and a 10-field "Contact Us" form that nobody fills out on a smartphone.

On the top curve are self-selling Agentic Websites and Direct Connect hubs that we build and launch in 5 to 10 days:
• Structured with machine-readable schema and llms.txt so ChatGPT, Perplexity, Gemini, and Google AI Overviews cite and recommend your business first.
• Equipped with live bilingual voice and chat (JAss) that answers pricing and availability questions in real time.
• Wired with a 10-second 5-Option Direct Connect Hub (You Call Me, I'll Call You, You Text Me, I'll Text You, or 15-Min Virtual Consult) that converts mobile traffic at 3x to 5x the rate of static forms.

Static websites wait for leads to do the work; agentic websites close the appointment while you sleep.

When you open your company's website on your phone right now, how many taps does it take to actually talk to you?

P.S. Experience our live 5-Option Direct Connect Hub at https://www.aidynamic.pro/connect and grab a $99 audit + 48-hour prototype for your brand.`,
            instagramText: `8.2 seconds is how long visitors stay on a static brochure website before bouncing.

In 5 to 10 days, we replace static sites with Self-Selling Agentic Websites built for Google Maps, ChatGPT, Gemini & Perplexity:
• AI Search Optimization (AEO/GEO) so AI engines recommend your Miami business first
• Built-in 24/7 Bilingual Voice & Chat Assistant (JAss)
• Our 10-second 5-Option Direct Connect Hub (Call Me, Dial Now, Text Me, Instant SMS, or 15-Min Virtual Consult)

Test the live experience right now at aidynamic.pro/connect and claim your $99 60-Min Audit + Free 48-Hour Prototype.

Does your current website actively book appointments while you sleep?

#AgenticWeb #AISearchOptimization #MiamiTech #WebDesignMiami #AIDynamicPro`,
            gbpText: `SELF-SELLING AGENTIC WEBSITES & DIRECT CONNECT HUBS LAUNCHED IN 5 TO 10 DAYS — Built to Rank on Google Maps, ChatGPT & Gemini.

Most websites are static brochures that visitors leave in 8 seconds. We build self-selling AI websites for Miami businesses:
01. AI Search Optimization (ChatGPT, Gemini, Perplexity & Google Local Pack) so your company is recommended first.
02. Built-In 24/7 Bilingual (EN/ES) Voice & Chat Receptionist.
03. 10-Second 5-Option Direct Connect Hub that turns mobile visitors into calls, texts, and calendar bookings immediately.

Click Learn More to test our Direct Connect Hub live.`,
          },
        ]

        const targetWaves = Array.isArray(req.body.waveIds) && req.body.waveIds.length > 0
          ? omnichannelWaves.filter((w) => req.body.waveIds.includes(w.waveId))
          : omnichannelWaves

        const onlyServices = Array.isArray(req.body.onlyServices) && req.body.onlyServices.length > 0
          ? req.body.onlyServices
          : ['linkedin', 'instagram', 'googlebusiness']

        const results = []
        for (const wave of targetWaves) {
          const isScheduled = wave.mode === 'customScheduled' && Boolean(wave.dueAt)

          let liRes = null
          if (onlyServices.includes('linkedin')) {
            const liInput = {
              channelId: linkedinChannelId,
              schedulingType: 'automatic',
              mode: wave.mode,
              ...(isScheduled ? { dueAt: wave.dueAt } : {}),
              text: wave.linkedinText,
              assets: [
                {
                  image: {
                    url: wave.image,
                    metadata: { altText: `AI Dynamic Pro — ${wave.label}` },
                  },
                },
              ],
              metadata: {
                linkedin: {},
              },
            }
            liRes = await bufferGraphQL(createPostMutation, { input: liInput }, token)
          }

          let igRes = null
          if (onlyServices.includes('instagram')) {
            const igAssets =
              Array.isArray(wave.carouselImages) && wave.carouselImages.length > 1
                ? wave.carouselImages.map((u, idx) => ({
                    image: {
                      url: u,
                      metadata: { altText: `AI Dynamic Pro Slide 0${idx + 1}` },
                    },
                  }))
                : [
                    {
                      image: {
                        url: wave.image,
                        metadata: { altText: `AI Dynamic Pro — ${wave.label}` },
                      },
                    },
                  ]

            const igInput = {
              channelId: instagramChannelId,
              schedulingType: 'automatic',
              mode: wave.mode,
              ...(isScheduled ? { dueAt: wave.dueAt } : {}),
              text: wave.instagramText,
              assets: igAssets,
              metadata: {
                instagram: {
                  type: 'post',
                  shouldShareToFeed: true,
                },
              },
            }
            igRes = await bufferGraphQL(createPostMutation, { input: igInput }, token)
          }

          let gbpRes = null
          if (onlyServices.includes('googlebusiness')) {
            const gbpInput = {
              channelId: gbpChannelId,
              schedulingType: 'automatic',
              mode: wave.mode,
              ...(isScheduled ? { dueAt: wave.dueAt } : {}),
              text: wave.gbpText,
              assets: [
                {
                  image: {
                    url: wave.image,
                    metadata: { altText: `AI Dynamic Pro — ${wave.label}` },
                  },
                },
              ],
              metadata: {
                google: {
                  type: 'whats_new',
                  detailsWhatsNew: {
                    button: wave.gbpButton,
                    link: wave.connectLink,
                  },
                },
              },
            }
            gbpRes = await bufferGraphQL(createPostMutation, { input: gbpInput }, token)
          }

          results.push({
            waveId: wave.waveId,
            label: wave.label,
            mode: wave.mode,
            dueAt: wave.dueAt,
            linkedin: liRes ? liRes?.data?.createPost || liRes?.errors || liRes : 'skipped',
            instagram: igRes ? igRes?.data?.createPost || igRes?.errors || igRes : 'skipped',
            googleBusiness: gbpRes ? gbpRes?.data?.createPost || gbpRes?.errors || gbpRes : 'skipped',
          })
        }

        return res.status(200).json({
          success: true,
          wavesProcessed: results.length,
          totalPostsCreated: results.length * onlyServices.length,
          results,
        })
      }

      if (action === 'sync_gbp_suite') {
        const gbpChannelId = '6af1e6aa62b70b94b0d12fb2'
        const deleteIds = req.body.deletePostIds || []
        const deleteMutation = `
          mutation DeletePost($input: DeletePostInput!) {
            deletePost(input: $input) {
              ... on DeletePostSuccess {
                id
              }
              ... on MutationError {
                message
              }
            }
          }
        `
        for (const pid of deleteIds) {
          await bufferGraphQL(deleteMutation, { input: { postId: pid } }, token).catch(() => null)
        }

        const gbpSuite = [
          {
            mode: 'shareNow',
            googleType: 'whats_new',
            img: 'https://www.aidynamic.pro/social/gbp-logos/gbp_official_logo_square.png?v=bright3',
            btn: 'book',
            link: 'https://www.aidynamic.pro/booking?utm_source=google_business&utm_medium=gbp_official_logo',
            txt: `AI DYNAMIC PRO — MIAMI & SOUTH FLORIDA OFFICIAL AI DEVELOPERS, CUSTOM APP CREATORS & CORPORATE STAFF TRAINERS (EN / ES).

We come directly into your business, audit your workflows ($99 60-Min Audit), build a working custom AI prototype in 48 hours, and stay with your staff to train them until 1 employee produces the output of 5.

01. 22+ Proven Systems for Medical & Dental Clinics, Law Firms, Real Estate Brokers, Contractors, and Retail.
02. JAss 24/7 Bilingual (English/Spanish) AI Phone & WhatsApp Receptionist ($997 turnkey).
03. On-Site Corporate Staff AI Bootcamp ($497 flat for up to 15 staff members).
04. $2,500+/Month ($30,000/yr) Savings Guarantee — or you pay $0.

Hablamos Español: Automatización con IA, aplicaciones a medida y capacitación de personal en tu empresa en Miami y el Sur de la Florida.`,
          },
          {
            mode: 'shareNow',
            googleType: 'whats_new',
            img: 'https://www.aidynamic.pro/social/gbp-logos/gbp_official_cover_1920x1080.png?v=bright3',
            btn: 'book',
            link: 'https://www.aidynamic.pro/booking?utm_source=google_business&utm_medium=gbp_official_cover',
            txt: `WE COME INTO YOUR BUSINESS, BUILD CUSTOM AI IN 48 HOURS & TRAIN YOUR STAFF — Save $2,500+/Mo in Payroll & Time or You Pay $0.

Why South Florida CEOs, Clinic Owners, Attorneys, Real Estate Brokers, and Contractors choose AI Dynamic Pro:

01. $99 60-Min Executive Audit + Free 48-Hour Live Custom AI Prototype built around your exact operations.
02. $497 On-Site Corporate AI Staff Bootcamp — we stay with your team and train them step-by-step so 1 employee performs like 5.
03. JAss 24/7 Bilingual (EN/ES) Voice & WhatsApp Receptionist ($997 turnkey) that answers every lead on Ring 1 and books your calendar automatically.

Click Book Below to claim your $99 Audit + Free 48-Hr Custom AI Prototype.`,
          },
          {
            mode: 'shareNow',
            googleType: 'offer',
            offerTitle: '$99 CEO AI Audit + Free 48-Hr Custom AI Prototype',
            offerCode: 'SCALE99',
            offerTerms: 'Guaranteed to uncover at least $2,500/month ($30,000/yr) in payroll and time savings for your business or we refund your $99 immediately. Includes a working 48-hour AI prototype built for your company.',
            startDate: '2026-11-09T12:00:00Z',
            endDate: '2026-12-31T23:59:00Z',
            img: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_06.png?v=bright3',
            btn: 'book',
            link: 'https://www.aidynamic.pro/booking?utm_source=google_business&utm_medium=gbp_offer_scale99',
            txt: `FOR MIAMI & SOUTH FLORIDA CEOS & BUSINESS OWNERS: Stop overpaying for slow manual work and missed calls.

As hands-on AI Developers & Creators, we come directly into your business, show you how to make your company faster and more profitable, build custom AI applications around your workflow in 48 hours, and stay with your staff to train them until 1 employee produces the output of 5.

WHAT YOU GET FOR $99 (USE CODE SCALE99):
01. 60-Min On-Site or Executive Department Efficiency Audit.
02. Free 48-Hour Live Custom AI Prototype built for your exact business.
03. $2,500+/Month ($30,000/yr) Savings Guarantee — or you pay $0.

EN ESPAÑOL: Vamos a tu empresa en Miami y el Sur de la Florida, creamos tu prototipo de Inteligencia Artificial en 48 horas y entrenamos a tu personal paso a paso para reducir costos y multiplicar tu productividad (1 empleado = 5).`,
          },
          {
            mode: 'shareNow',
            googleType: 'whats_new',
            img: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_03.png?v=bright3',
            btn: 'book',
            link: 'https://www.aidynamic.pro/booking?utm_source=google_business&utm_medium=gbp_ceo_vision',
            txt: `WHY SOUTH FLORIDA BUSINESS OWNERS CHOOSE AI DYNAMIC PRO — We Don't Just Sell Software. We Build Your Vision & Train Your Team.

Every week a business owner waits to automate, manual payroll and slow 47-minute lead replies quietly cost $3,420+ per department.

Whether you run a Medical Clinic, Law Firm, Real Estate Brokerage, Construction/Service Company, or Retail Brand, our AI Developers come to your business to:

01. BUILD CUSTOM AI APPS & AUTOMATION: From 24/7 Bilingual (English/Spanish) AI Phone & WhatsApp Receptionists (JAss — $997 turnkey) to automated quoting, billing, and custom web apps.
02. CUT PAYROLL WASTE IMMEDIATELY: Eliminate repetitive data entry, missed after-hours calls, and slow follow-ups.
03. TRAIN YOUR STAFF ON-SITE ($497 Bootcamp): We stay with your team and teach them how to use every tool daily so 1 trained employee performs like 5.

Make the decision today. Click Book Below to claim your $99 Audit + Free 48-Hour Prototype.`,
          },
          {
            mode: 'shareNow',
            googleType: 'whats_new',
            img: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_01.png?v=bright3',
            btn: 'learn_more',
            link: 'https://www.aidynamic.pro/projects?utm_source=google_business&utm_medium=gbp_medical_dental',
            txt: `FOR MEDICAL CLINICS, DENTAL PRACTICES & MEDSPAS IN MIAMI — Cut Front-Desk & Billing Overhead by 45%.

Doctors and clinic owners should not spend evenings finishing charts or losing revenue to preventable insurance claim denials and missed patient calls.

We come into your clinic, build custom healthcare AI around your practice, and train your front-desk and billing staff step-by-step:

01. 24/7 Bilingual (EN/ES) Patient Scheduling: Answers every call on Ring 1, verifies insurance cards via mobile photo, and books appointments automatically.
02. Automated Clinical Notes & Billing Review: Turns patient visits into structured notes and flags billing errors before claims are sent.
03. Hands-On Staff Training ($497 Bootcamp): Your existing receptionists and billers handle 4x the patient volume with zero burnout.

EN ESPAÑOL: Automatización con IA y entrenamiento de personal para clínicas médicas, dentales y estéticas en Miami. Reserva tu Auditoría de $99 hoy.`,
          },
          {
            mode: 'shareNow',
            googleType: 'whats_new',
            img: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_04.png?v=bright3',
            btn: 'book',
            link: 'https://www.aidynamic.pro/booking?utm_source=google_business&utm_medium=gbp_legal_realestate',
            txt: `FOR LAW FIRMS, REAL ESTATE BROKERS & PROPERTY MANAGERS — Close More Retainers & Deals in Under 3 Minutes.

78% of clients hire the first firm that responds. If a high-value legal inquiry or property buyer calls at 7:00 PM and hits voicemail, that deal goes to your competitor.

We engineer custom private AI systems for South Florida law firms, title companies, and real estate teams:

01. 24/7 Bilingual (English/Spanish) Client Intake: Qualifies cases and buyers in under 3 seconds across phone, SMS, WhatsApp, and Instagram, and books consultations directly into your calendar.
02. Instant Private Contract & Lease Review: Screens 100+ page agreements, inspection deadlines, and escrow contingencies in seconds inside your own secure private cloud.
03. On-Site Team Training: We teach your paralegals, agents, and coordinators how to save 15+ hours every week.

Click Book Below to schedule your $99 60-Min Department Efficiency Audit.`,
          },
          {
            mode: 'shareNow',
            googleType: 'whats_new',
            img: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_02.png?v=bright3',
            btn: 'learn_more',
            link: 'https://www.aidynamic.pro/projects?utm_source=google_business&utm_medium=gbp_contractors_retail',
            txt: `FOR CONTRACTORS, HOME SERVICES, LOGISTICS & LUXURY RETAIL — Custom AI Apps That Turn Photos & Calls Into Instant Quotes.

Your estimators and sales managers waste hours driving to unqualified jobs or manually checking inventory and property photos.

As AI Developers & Creators, we build custom applications tailored to your exact industry:

01. Instant Photo Inspection & Quoting: Customers upload a photo or room scan from their phone, and your custom AI detects defects, estimates repair/project costs, and generates a branded PDF quote in seconds.
02. 3D Virtual Showrooms & Property Walkthroughs: Let buyers explore spaces and inventory from their browser 24/7.
03. Automated Dispatch & Follow-Up: JAss follows up with every unpaid estimate in English and Spanish until the job is booked.

Click Learn More to see our 22 live systems or book your $99 Audit + Free 48-Hr Prototype.`,
          },
          {
            mode: 'shareNow',
            googleType: 'whats_new',
            img: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_05.png?v=bright3',
            btn: 'learn_more',
            link: 'https://www.aidynamic.pro/projects?utm_source=google_business&utm_medium=gbp_agentic_web',
            txt: `NEED A NEW WEBSITE OR CUSTOM APP IN 5 TO 10 DAYS? We Build Self-Selling AI Websites That Rank on Google & ChatGPT.

Most company websites are static brochures that visitors leave in 8 seconds. In 2026, your website must actively talk to visitors, answer their questions in English and Spanish, and book appointments automatically.

What we build and launch for your business in 5 to 10 days:

01. Self-Adapting AI Websites & Custom Web Apps: Tailors the message to each visitor and captures leads 24/7.
02. Google Maps & AI Search Optimization (ChatGPT / Gemini / Perplexity): Structured so when local customers ask AI who the best company in Miami is, your business gets recommended first.
03. Built-In Voice & Chat Assistant: Turns website traffic into confirmed calendar bookings day and night.

Click Learn More or book your $99 Audit to see a live 48-hour prototype for your brand.`,
          },
          {
            mode: 'shareNow',
            googleType: 'whats_new',
            img: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_07.png?v=bright3',
            btn: 'signup',
            link: 'https://www.aidynamic.pro/booking?utm_source=google_business&utm_medium=gbp_staff_bootcamp',
            txt: `ON-SITE CORPORATE AI STAFF TRAINING BOOTCAMP ($497) — Turn 1 Existing Employee Into the Output of 5.

The #1 reason businesses fail with AI is simple: someone buys a tool, nobody trains the staff, and by Monday morning everyone goes back to slow manual work.

At AI Dynamic Pro, we stay with you inside your company until your team is fast, confident, and self-sufficient:

01. Half-Day On-Site or Live Virtual Bootcamp ($497 flat for up to 15 staff members).
02. Custom AI Playbooks & Daily Checklists built specifically for your receptionists, sales reps, operations managers, and executives.
03. Immediate Productivity Multiplication: Cut 10 to 15 hours of busywork per employee every single week.

EN ESPAÑOL: Entrenamiento práctico de Inteligencia Artificial para tu equipo en inglés y español ($497). Haz clic en Registrarse para reservar tu fecha.`,
          },
        ]

        const createPostMutation = `
          mutation PublishSocialPost($input: CreatePostInput!) {
            createPost(input: $input) {
              ... on PostActionSuccess {
                post {
                  id
                  status
                  text
                }
              }
              ... on MutationError {
                message
              }
            }
          }
        `
        const gbpResults = []
        for (const item of gbpSuite) {
          const isDraft = item.mode === 'saveToDraft'
          const googleMeta =
            item.googleType === 'offer'
              ? {
                  type: 'offer',
                  detailsOffer: {
                    title: item.offerTitle,
                    code: item.offerCode,
                    terms: item.offerTerms,
                    link: item.link,
                    startDate: item.startDate,
                    endDate: item.endDate,
                  },
                }
              : {
                  type: 'whats_new',
                  detailsWhatsNew: {
                    button: item.btn,
                    link: item.link,
                  },
                }

          const postInput = {
            channelId: gbpChannelId,
            schedulingType: 'automatic',
            text: item.txt,
            assets: [
              {
                image: {
                  url: item.img,
                  metadata: { altText: 'AI Dynamic Pro — Miami Business AI & Staff Training' },
                },
              },
            ],
            metadata: {
              google: googleMeta,
            },
          }
          if (isDraft) {
            postInput.saveToDraft = true
          } else {
            postInput.mode = item.mode
          }

          const r = await bufferGraphQL(
            createPostMutation,
            { input: postInput },
            token
          )
          gbpResults.push(r?.data?.createPost || r?.errors || r)
        }
        return res.status(200).json({
          success: true,
          deletedCount: deleteIds.length,
          gbpPublished: gbpResults,
        })
      }

      if (action === 'create_idea') {
        const ideaMutation = `
          mutation CreateVisionIdea($input: CreateIdeaInput!) {
            createIdea(input: $input) {
              ... on Idea {
                id
                createdAt
              }
            }
          }
        `
        const ideaRes = await bufferGraphQL(
          ideaMutation,
          {
            input: {
              organizationId: DEFAULT_ORG_ID,
              content: {
                title: VISION_DECK_CAROUSEL.title,
                text: VISION_DECK_CAROUSEL.text,
                services: ['instagram', 'linkedin', 'googlebusiness'],
                media: VISION_DECK_CAROUSEL.slides.map((url, idx) => ({
                  url,
                  type: 'image',
                  alt: `AI Dynamic Pro VisionOS Slide 0${idx + 1}`,
                })),
              },
            },
          },
          token
        )
        return res.status(200).json({
          success: true,
          idea: ideaRes?.data?.createIdea || null,
          channelsCount: allChannels.length,
        })
      }

      // Publish / Schedule directly to connected channels (Instagram, LinkedIn, etc.)
      const targetChannels =
        Array.isArray(channelIds) && channelIds.length > 0
          ? allChannels.filter((c) => channelIds.includes(c.id))
          : allChannels

      if (targetChannels.length === 0) {
        return res.status(200).json({
          success: false,
          needsChannelAuthorization: true,
          connectUrl: 'https://publish.buffer.com/channels',
          message:
            'Your Buffer API key is connected (aimedicalassistance@gmail.com) and all 7 VisionOS Carousel Slides + 15s Reel are loaded into Buffer Ideas! Click "Connect Instagram & LinkedIn" on Buffer to authorize the final OAuth handshake so posts publish live.',
        })
      }

      const results = []
      const createPostMutation = `
        mutation PublishSocialPost($input: CreatePostInput!) {
          createPost(input: $input) {
            ... on PostActionSuccess {
              post {
                id
                status
                text
              }
            }
            ... on MutationError {
              message
            }
          }
        }
      `

      for (const ch of targetChannels) {
        const isReel = postType === 'reel'
        let assets = []
        if (customImageUrl) {
          assets = [
            {
              image: {
                url: customImageUrl,
                metadata: { altText: 'AI Dynamic Pro Executive Architecture Slide' },
              },
            },
          ]
        } else if (ch.service === 'googlebusiness') {
          // Google Business Profile accepts a single high-impact visual per What's New post
          assets = [
            {
              image: {
                url: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_06.png',
                metadata: {
                  altText: 'AI Dynamic Pro — $99 60-Min Department Efficiency Audit & 48-Hr Live Prototype',
                },
              },
            },
          ]
        } else if (isReel) {
          assets = [
            {
              video: {
                url: VISION_DECK_CAROUSEL.reelUrl,
                metadata: { title: '6 AI Systems We Build & Train Inside Your Company' },
              },
            },
          ]
        } else {
          assets = VISION_DECK_CAROUSEL.slides.map((url, i) => ({
            image: {
              url,
              metadata: { altText: `AI Dynamic Pro System Slide 0${i + 1}` },
            },
          }))
        }

        const metadata = {}
        if (ch.service === 'instagram') {
          metadata.instagram = {
            type: isReel ? 'reel' : 'post',
            shouldShareToFeed: true,
          }
        } else if (ch.service === 'linkedin') {
          metadata.linkedin = {}
        } else if (ch.service === 'googlebusiness') {
          metadata.google = {
            type: 'whats_new',
            detailsWhatsNew: {
              button: customButton,
              link: customLink,
            },
          }
        }

        const postInput = {
          channelId: ch.id,
          schedulingType: 'automatic',
          mode,
          text: customText || VISION_DECK_CAROUSEL.text,
          assets,
          metadata,
        }
        if (dueAt && mode === 'customScheduled') {
          postInput.dueAt = dueAt
        }

        const postRes = await bufferGraphQL(
          createPostMutation,
          { input: postInput },
          token
        )
        results.push({
          channel: ch.name,
          service: ch.service,
          response: postRes?.data?.createPost || postRes?.errors || postRes,
        })
      }

      return res.status(200).json({
        success: true,
        publishedTo: results,
      })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Buffer API error' })
  }
}
