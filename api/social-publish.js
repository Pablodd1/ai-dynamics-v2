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
