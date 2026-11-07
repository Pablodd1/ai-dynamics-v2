/**
 * AI Dynamic Pro — Direct Buffer GraphQL Publishing & Channel Sync Endpoint
 * Allows 1-click syncing, scheduling, and publishing of VisionOS Reels, 7-Slide Carousels,
 * and 5-Week Synchronized Social Campaigns to Instagram, LinkedIn, and Google Business Profile.
 */

const DEFAULT_BUFFER_TOKEN =
  process.env.BUFFER_API_TOKEN ||
  process.env.VITE_BUFFER_API_TOKEN ||
  'e3Ytluvs-62AgoLM-OD_GlyNLEM862osjTZ8aQI3Ijn'

const DEFAULT_ORG_ID = '6ae611610f74184c45cd3ec7'

const VISION_DECK_CAROUSEL = {
  title: '7-SLIDE VISION-GLASS CAROUSEL — Comment "BUILD" • 6 AI Systems We Build & Train Inside Your Company',
  text: `Comment "BUILD" ✴️ 6 AI Systems We Build & Train Inside Your Company This Week

Most CEOs & business owners are losing $3,420+/month on missed after-hours calls and slow manual office workflows.

As hands-on AI Developers & Creators, we walk into your industry, engineer custom AI applications, and stay side-by-side training your staff so 1 employee produces the output of 5:

01 — JAss 24/7 Voice Agent: Picks up in 3s in English & Spanish, answers questions & books appointments ($997 Turnkey / $297/mo).
02 — WhatsApp & SMS Closer: Replies to every WhatsApp, IG DM & web message in 30 seconds and books the consultation.
03 — Back-Office Payroll Saver: $99 60-Min Department Efficiency Audit eliminating manual intake & billing data entry.
04 — Cold Email & Outbound Machine: Finds local B2B decision-makers, sends executive sequences & routes hot replies.
05 — 48-Hr Custom AI App Prototype: We build a working prototype in 48 hours—guaranteed to find $2,500+/mo ($30K/yr) in savings or you pay $0.
06 — On-Site Staff AI Bootcamp: We train up to 15 employees hands-on ($497) so 1 AI-trained staff member = 5.

💬 Comment "BUILD" and we'll send you the full blueprint + book your 48-hour prototype at https://www.aidynamic.pro/booking
📞 Call JAss Live 24/7: (786) 643-2099`,
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
      const data = await bufferGraphQL(
        q,
        { orgInput: { organizationId: DEFAULT_ORG_ID } },
        token
      )
      return res.status(200).json({
        connected: Boolean(data?.data?.account?.id),
        account: data?.data?.account || null,
        channels: data?.data?.channels || [],
        organizationId: DEFAULT_ORG_ID,
        visionDeck: VISION_DECK_CAROUSEL,
      })
    }

    if (req.method === 'POST') {
      const { action, channelIds, postType = 'carousel', mode = 'shareNow' } = req.body || {}

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
        const assets = isReel
          ? [{ video: { url: VISION_DECK_CAROUSEL.reelUrl, metadata: { title: '6 AI Systems We Build & Train Inside Your Company' } } }]
          : VISION_DECK_CAROUSEL.slides.map((url, i) => ({
              image: {
                url,
                metadata: { altText: `AI Dynamic Pro System Slide 0${i + 1}` },
              },
            }))

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
              button: 'book',
              link: 'https://www.aidynamic.pro/booking?utm_source=google_business&utm_medium=buffer_vision_deck',
            },
          }
        }

        const postRes = await bufferGraphQL(
          createPostMutation,
          {
            input: {
              channelId: ch.id,
              schedulingType: 'automatic',
              mode,
              text: VISION_DECK_CAROUSEL.text,
              assets,
              metadata,
            },
          },
          token
        )
        results.push({ channel: ch.name, service: ch.service, response: postRes?.data?.createPost })
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
