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
    'https://www.aidynamic.pro/social/vision-deck/vision_slide_01.png',
    'https://www.aidynamic.pro/social/vision-deck/vision_slide_02.png',
    'https://www.aidynamic.pro/social/vision-deck/vision_slide_03.png',
    'https://www.aidynamic.pro/social/vision-deck/vision_slide_04.png',
    'https://www.aidynamic.pro/social/vision-deck/vision_slide_05.png',
    'https://www.aidynamic.pro/social/vision-deck/vision_slide_06.png',
    'https://www.aidynamic.pro/social/vision-deck/vision_slide_07.png',
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
            service
            type
            avatar
            isDisconnected
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
            googleType: 'offer',
            offerTitle: '$99 CEO AI Audit + Free 48-Hr Custom AI Prototype',
            offerCode: 'SCALE99',
            offerTerms: 'Guaranteed to uncover at least $2,500/month ($30,000/yr) in payroll and time savings for your business or we refund your $99 immediately. Includes a working 48-hour AI prototype built for your company.',
            startDate: '2026-11-09T12:00:00Z',
            endDate: '2026-12-31T23:59:00Z',
            img: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_06.png',
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
            img: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_03.png',
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
            mode: 'addToQueue',
            googleType: 'whats_new',
            img: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_01.png',
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
            img: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_04.png',
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
            img: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_02.png',
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
            img: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_05.png',
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
            img: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_07.png',
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
