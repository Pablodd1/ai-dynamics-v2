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
            img: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_06.png',
            btn: 'book',
            link: 'https://www.aidynamic.pro/booking?utm_source=google_business&utm_medium=gbp_post_1_audit_offer',
            txt: `DECISION BRIEFING FOR SOUTH FLORIDA CEOS & FOUNDERS — Six Production AI Architectures Engineered Inside Your Company.

Every week your team spends on manual intake, repetitive quoting, clinical charting, or contract review is payroll you never recover.

As hands-on AI Developers and Creators, AI Dynamic Pro walks into your operation, audits one department in 60 minutes ($99), and builds a live custom AI prototype for your business in 48 hours:

01 / WE AUDIT & PROTOTYPE — Guaranteed to uncover at least $2,500/mo ($30,000/yr) in wasted payroll and software bloat, or you pay $0.
02 / WE ENGINEER CUSTOM AI — 22+ deployed production systems across Clinical SOAP & 837 Claim Scrubbing, YOLOv8 + DINOv2 Computer Vision, 3D LiDAR Digital Twins, Sovereign Legal RAG, Self-Learning Agentic Websites, and JAss 24/7 Bilingual Voice & CRM ($997 turnkey).
03 / WE TRAIN YOUR STAFF ON-SITE — Our $497 Corporate AI Staff Bootcamp turns 1 existing employee into the output of 5.

Click Book Below to lock in your $99 60-Min Department Efficiency Audit and Free 48-Hour Live Prototype at aidynamic.pro/booking`,
          },
          {
            mode: 'addToQueue',
            img: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_01.png',
            btn: 'learn_more',
            link: 'https://www.aidynamic.pro/projects?utm_source=google_business&utm_medium=gbp_post_2_clinical_rcm',
            txt: `ARCHITECTURE 01 // CLINICAL & RCM INTELLIGENCE

Medical practices and surgical centers lose thousands per week to post-visit charting fatigue and preventable insurance claim denials.

AI Dynamic Pro engineers autonomous clinical operations that cut administrative overhead by 45% without adding headcount:

01. Ambient Consultation Capture: Multi-speaker dialogue converted directly into structured SOAP notes and ICD-10/CPT codes in seconds.
02. Pre-Submission 837 Claim Scrubbing: Automated detection of payer-specific denial triggers and missing modifiers prior to clearinghouse dispatch.
03. Instant Insurance OCR Intake: Sub-second mobile card capture with real-time eligibility verification before the patient enters the exam room.

We deploy the architecture and train your front-desk and billing staff on-site ($497 Corporate Bootcamp). Click Learn More to start with our $99 60-Min Department Efficiency Audit.`,
          },
          {
            mode: 'addToQueue',
            img: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_02.png',
            btn: 'learn_more',
            link: 'https://www.aidynamic.pro/projects?utm_source=google_business&utm_medium=gbp_post_3_neural_vision',
            txt: `ARCHITECTURE 02 // NEURAL VISION & SPATIAL AI

Real-Time Computer Vision, Automated Property Defect Inspection, and 3D LiDAR Digital Twins.

We engineer production computer vision systems that inspect physical assets, properties, and high-value inventory with sub-millimeter precision:

01. YOLOv8 + DINOv2 Surface Authentication: Micro-surface anomaly detection, serial OCR, and counterfeit verification in under 800ms.
02. 12-Class Property Defect Vision: Instant structural, roofing, moisture, and finish defect classification with automated repair cost estimation.
03. 3D LiDAR & WebGL Spatial Twins: Interactive volumetric floorplans and virtual architectural staging rendered directly in the browser.

Click Learn More to explore our 22 live architectures or book a $99 60-Min Efficiency Audit.`,
          },
          {
            mode: 'addToQueue',
            img: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_03.png',
            btn: 'book',
            link: 'https://www.aidynamic.pro/booking?utm_source=google_business&utm_medium=gbp_post_4_jass_voice',
            txt: `ARCHITECTURE 03 // JASS VOICE & CRM PIPELINE

78% of high-ticket contracts go to the company that responds in under 5 minutes. Every missed call after 5:00 PM is revenue handed to your competitor.

We deploy JAss—your autonomous 24/7 Bilingual (EN/ES) Voice & Multi-Channel Intake Engine ($997 Turnkey Setup | $297/mo Managed):

01. 3-Second Ring-1 Voice Pickup: Natural English and Spanish phone reception that qualifies urgency, budget, and scope without hold music.
02. Sub-Minute Multi-Channel Sync: Unified autonomous response across SMS, WhatsApp, Instagram DM, and Web Chat in under 60 seconds.
03. Direct Calendar & CRM Lock: Real-time slot verification, automated confirmation, and instant pipeline write-back.

Click Book Below to claim your $99 Audit + Free 48-Hr Live Prototype.`,
          },
          {
            mode: 'addToQueue',
            img: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_04.png',
            btn: 'book',
            link: 'https://www.aidynamic.pro/booking?utm_source=google_business&utm_medium=gbp_post_5_private_rag',
            txt: `ARCHITECTURE 04 // PRIVATE RAG & DEAL MATCHING

Zero-Training Sovereign Legal Document RAG & Vector Real Estate Deal Matching.

Law firms, escrow agencies, and real estate brokerages cannot upload sensitive contracts to public consumer AI models. We deploy isolated, zero-training RAG pipelines inside your own cloud perimeter:

01. Contract Risk & Clause Screening: Instant citation-backed redlining across 100+ page agreements, leases, and compliance disclosures.
02. Escrow & Deadline Telemetry: Automated extraction of contingencies, inspection windows, and statutory filing deadlines.
03. Vector Deal Matching: Semantic matching between buyer mandates, off-market property data, and zoning parameters.

Click Book Below for a $99 60-Min Department Efficiency Audit.`,
          },
          {
            mode: 'addToQueue',
            img: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_05.png',
            btn: 'learn_more',
            link: 'https://www.aidynamic.pro/projects?utm_source=google_business&utm_medium=gbp_post_6_agentic_web',
            txt: `ARCHITECTURE 05 // BIOMECHANICS & AGENTIC WEB

Self-Learning Agentic Websites, AI Search Optimization (AEO), and 33-Joint Kinematic Vision.

Static brochures do not convert in 2026. When executives search on ChatGPT, Perplexity, Gemini, or Google, your digital infrastructure must dynamically adapt and capture the lead:

01. Self-Learning Agentic Websites: Interfaces that dynamically rewrite hero propositions and CTAs based on visitor industry and scroll velocity.
02. AI Citation & Schema Graphs (AEO): Deep JSON-LD entity architecture engineered so LLMs cite and recommend your firm first.
03. 33-Joint Markerless Kinematics: Sub-millimeter biomechanical gait and posture tracking from standard smartphone video.

Click Learn More to inspect our 22 deployed systems or book a $99 60-Min Efficiency Audit.`,
          },
          {
            mode: 'addToQueue',
            img: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_07.png',
            btn: 'signup',
            link: 'https://www.aidynamic.pro/booking?utm_source=google_business&utm_medium=gbp_post_7_staff_bootcamp',
            txt: `ARCHITECTURE 06 // ON-SITE CORPORATE AI STAFF BOOTCAMP ($497)

Software alone fails if your team reverts to old habits on Monday morning. 1 Trained Employee = 5.

We do not hand you a login and disappear. As AI Developers and Creators, we stay inside your operation to train your executives, operations managers, and front-desk staff on the exact custom workflows we engineer for you:

01. Prompt Engineering & Custom SOPs tailored to your industry.
02. Supervising JAss Voice/CRM Pipelines and Automated Dispatch.
03. Quality Control, Exception Handling, and Daily AI Output Multiplication.

Click Sign Up to reserve your On-Site or Virtual Corporate Staff Bootcamp ($497) or start with the $99 60-Min Department Audit.`,
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
          const r = await bufferGraphQL(
            createPostMutation,
            {
              input: {
                channelId: gbpChannelId,
                schedulingType: 'automatic',
                mode: item.mode,
                text: item.txt,
                assets: [
                  {
                    image: {
                      url: item.img,
                      metadata: { altText: 'AI Dynamic Pro Executive Architecture Slide' },
                    },
                  },
                ],
                metadata: {
                  google: {
                    type: 'whats_new',
                    detailsWhatsNew: {
                      button: item.btn,
                      link: item.link,
                    },
                  },
                },
              },
            },
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
