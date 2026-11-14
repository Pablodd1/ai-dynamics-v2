// Google Analytics (GA4) Event Tracking Utility
// Safely tracks conversion events for Google Analytics (gtag.js)

declare global {
  interface Window {
    dataLayer?: any[]
    gtag?: (...args: any[]) => void
    fbq?: ((...args: any[]) => void) & { callMethod?: (...args: any[]) => void; queue?: any[]; loaded?: boolean; version?: string; push?: (...args: any[]) => void }
    _fbq?: any
    clarity?: (...args: any[]) => void
    _linkedin_data_partner_ids?: string[]
    lintrk?: ((...args: any[]) => void) & { q?: any[] }
    __aidynamicBooted?: boolean
  }
}

export function trackEvent(
  eventName: string,
  eventParams?: Record<string, string | number | boolean>
) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, eventParams)
      console.log(`[GA4 Tracked] ${eventName}:`, eventParams)
    } catch (err) {
      console.warn('[GA4 Error]', err)
    }
  }
}

// Predefined High-Value Conversion Events
export const AnalyticsEvents = {
  // Call & Phone Interactions
  clickPhoneCall: (location: string) =>
    trackEvent('click_phone_call', {
      phone_number: '+17866432099',
      location: location,
      event_category: 'conversion',
    }),

  // WhatsApp Interactions
  clickWhatsApp: (location: string) =>
    trackEvent('click_whatsapp', {
      phone_number: '+17866432099',
      location: location,
      event_category: 'conversion',
    }),

  // Social Media Outbound Clicks (Instagram, LinkedIn, Telegram)
  clickSocialChannel: (platform: string, location: string) =>
    trackEvent('click_social_channel', {
      platform: platform,
      location: location,
      event_category: 'engagement',
    }),

  // Calendly / Discovery Booking Clicks
  clickBooking: (service: string, location: string) =>
    trackEvent('begin_booking', {
      service: service,
      location: location,
      event_category: 'conversion',
    }),

  // Lead Magnet Download
  downloadPlaybook: (source?: string) =>
    trackEvent('lead_magnet_download', {
      content_name: 'AI-Automation-Playbook-2026.pdf',
      method: source || 'direct_download',
      event_category: 'lead',
    }),

  // Contact Form Submission
  submitContactForm: (serviceInterest?: string) =>
    trackEvent('generate_lead', {
      lead_type: 'contact_form',
      service_interest: serviceInterest || 'general',
      event_category: 'lead',
    }),

  // Chatbot Widget Interactions
  openChatbot: () =>
    trackEvent('chatbot_open', {
      event_category: 'engagement',
    }),

  sendChatMessage: (messageLength: number) =>
    trackEvent('chatbot_message_sent', {
      message_length: messageLength,
      event_category: 'engagement',
    }),

  // Voice Demo Audio Plays
  playVoiceDemo: (industry: string) =>
    trackEvent('play_voice_demo', {
      industry: industry,
      event_category: 'engagement',
    }),

  // Project & Portfolio Interactions
  projectViewed: (projectId: string, projectTitle: string) =>
    trackEvent('project_viewed', {
      project_id: projectId,
      project_title: projectTitle,
      event_category: 'portfolio',
    }),

  projectDemoClicked: (projectId: string, demoUrl: string) =>
    trackEvent('project_demo_clicked', {
      project_id: projectId,
      demo_url: demoUrl,
      event_category: 'portfolio',
    }),

  partnerInquiryClicked: (projectId: string, stage: string) =>
    trackEvent('partner_inquiry_clicked', {
      project_id: projectId,
      stage: stage,
      event_category: 'conversion',
    }),

  contactConversion: (conversionType: string, projectId?: string) =>
    trackEvent('contact_conversion', {
      conversion_type: conversionType,
      project_id: projectId || 'general',
      event_category: 'conversion',
    }),

  // Google Business Profile ("Google Buz") Interactions
  clickGoogleBusiness: (location: string) =>
    trackEvent('click_google_business', {
      location,
      event_category: 'local_seo',
    }),

  copyGoogleBusinessPost: (postId: string) =>
    trackEvent('copy_gbp_post', {
      post_id: postId,
      event_category: 'marketing',
    }),

  // Email Campaign Dispatch Tracking
  emailCampaignSent: (campaignId: string, recipientCount: number) =>
    trackEvent('email_campaign_sent', {
      campaign_id: campaignId,
      recipient_count: recipientCount,
      event_category: 'marketing',
    }),
}

export const GA4_MEASUREMENT_ID = 'G-M1RHKRVS9M'

// Automatically capture UTM parameters from Email Campaigns & Google Business Profile
export function initAttributionTracking() {
  if (typeof window === 'undefined') return
  try {
    const params = new URLSearchParams(window.location.search)
    const utmSource = params.get('utm_source')
    const utmMedium = params.get('utm_medium')
    const utmCampaign = params.get('utm_campaign')

    if (utmSource || utmMedium || utmCampaign) {
      const attribution = {
        utm_source: utmSource || 'direct',
        utm_medium: utmMedium || 'none',
        utm_campaign: utmCampaign || 'none',
        landing_page: window.location.pathname,
        timestamp: new Date().toISOString(),
      }
      sessionStorage.setItem('aidynamic_attribution', JSON.stringify(attribution))

      if (utmSource === 'google_business' || utmMedium?.includes('gbp')) {
        trackEvent('google_business_visit', {
          utm_medium: utmMedium || 'gbp_profile',
          utm_campaign: utmCampaign || 'local_miami',
          event_category: 'local_seo',
        })
      } else if (utmMedium === 'email' || utmSource === 'brevo') {
        trackEvent('email_campaign_visit', {
          utm_source: utmSource || 'brevo',
          utm_campaign: utmCampaign || 'general',
          event_category: 'email_marketing',
        })
      }
    }
  } catch (err) {
    console.warn('[GA4 Attribution Warning]', err)
  }
}

export interface AttributionTouch {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  fbclid?: string
  gclid?: string
  wbraid?: string
  gbraid?: string
  ttclid?: string
  li_fat_id?: string
  ref?: string
  landing_path?: string
  referrer?: string
  captured_at: string
  expires_at: number
}

export interface AttributionBundle {
  firstTouch: AttributionTouch | null
  lastTouch: AttributionTouch | null
  summary: string
}

export interface ConversionTrackingOptions {
  eventName: 'ViewContent' | 'Lead' | 'InitiateCheckout' | 'Schedule' | 'Purchase'
  gaEventName?: string
  eventId?: string
  value?: number
  currency?: string
  contentName?: string
  contentIds?: string[]
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
  externalId?: string
  transactionId?: string
  skipCapi?: boolean
}

const ATTRIBUTION_FIRST_KEY = 'aidynamic_first_touch_v1'
const ATTRIBUTION_LAST_KEY = 'aidynamic_last_touch_v1'
const ATTRIBUTION_TTL_MS = 30 * 24 * 60 * 60 * 1000
const ANALYTICS_API_BASE = ((import.meta as any).env?.VITE_API_BASE || '') as string

function readStoredTouch(key: string): AttributionTouch | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const parsed = JSON.parse(raw) as AttributionTouch
    if (parsed.expires_at && Date.now() > parsed.expires_at) {
      localStorage.removeItem(key)
      return null
    }
    return parsed
  } catch {
    return null
  }
}

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : undefined
}

export function generateEventId(prefix = 'aid'): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}_${crypto.randomUUID()}`
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}

export function initPaidAttributionAndPixels() {
  if (typeof window === 'undefined') return

  try {
    const params = new URLSearchParams(window.location.search)
    const keys = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_content',
      'utm_term',
      'fbclid',
      'gclid',
      'wbraid',
      'gbraid',
      'ttclid',
      'li_fat_id',
      'ref',
    ] as const

    const touch: AttributionTouch = {
      landing_path: window.location.pathname + window.location.search,
      referrer: document.referrer || undefined,
      captured_at: new Date().toISOString(),
      expires_at: Date.now() + ATTRIBUTION_TTL_MS,
    }

    let hasPaidSignal = false
    for (const k of keys) {
      const val = params.get(k)
      if (val) {
        ;(touch as any)[k] = val
        hasPaidSignal = true
      }
    }

    if (hasPaidSignal) {
      if (!readStoredTouch(ATTRIBUTION_FIRST_KEY)) {
        localStorage.setItem(ATTRIBUTION_FIRST_KEY, JSON.stringify(touch))
      }
      localStorage.setItem(ATTRIBUTION_LAST_KEY, JSON.stringify(touch))
      sessionStorage.setItem(
        'aidynamic_attribution',
        JSON.stringify({
          utm_source: touch.utm_source || (touch.fbclid ? 'meta' : touch.gclid ? 'google' : touch.ref ? 'referral' : 'direct'),
          utm_medium: touch.utm_medium || (touch.fbclid || touch.gclid ? 'paid' : touch.ref ? 'partner_referral' : 'organic'),
          utm_campaign: touch.utm_campaign || touch.ref || '',
        })
      )
    } else if (!readStoredTouch(ATTRIBUTION_FIRST_KEY)) {
      localStorage.setItem(ATTRIBUTION_FIRST_KEY, JSON.stringify(touch))
    }
  } catch {
    // Ignore storage privacy restrictions
  }

  if (window.__aidynamicBooted) return
  window.__aidynamicBooted = true

  try {
    const env = (import.meta as any).env || {}
    const metaPixelId = env.VITE_META_PIXEL_ID as string | undefined
    const googleAdsId = env.VITE_GOOGLE_ADS_ID as string | undefined
    const clarityId = env.VITE_CLARITY_PROJECT_ID as string | undefined
    const linkedInPartnerId = env.VITE_LINKEDIN_PARTNER_ID as string | undefined

    if (googleAdsId && typeof window.gtag === 'function') {
      window.gtag('config', googleAdsId)
    }

    if (metaPixelId && !window.fbq) {
      const n: any = function (...args: any[]) {
        if (n.callMethod) {
          n.callMethod.apply(n, args)
        } else {
          n.queue.push(args)
        }
      }
      n.push = n
      n.loaded = true
      n.version = '2.0'
      n.queue = []
      window.fbq = n
      if (!window._fbq) window._fbq = n
      const script = document.createElement('script')
      script.async = true
      script.src = 'https://connect.facebook.net/en_US/fbevents.js'
      document.head.appendChild(script)
      n('init', metaPixelId)
      n('track', 'PageView')
    }

    if (clarityId && !window.clarity) {
      const c: any = function (...args: any[]) {
        ;(c.q = c.q || []).push(args)
      }
      window.clarity = c
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.clarity.ms/tag/${clarityId}`
      document.head.appendChild(script)
    }

    if (linkedInPartnerId && !window._linkedin_data_partner_ids) {
      window._linkedin_data_partner_ids = [linkedInPartnerId]
      if (!window.lintrk) {
        const l: any = function (...args: any[]) {
          l.q.push(args)
        }
        l.q = []
        window.lintrk = l
      }
      const script = document.createElement('script')
      script.async = true
      script.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js'
      document.head.appendChild(script)
    }
  } catch {
    // Non-blocking ad pixel bootstrap
  }
}

export function getAttributionData(): AttributionBundle {
  const firstTouch = readStoredTouch(ATTRIBUTION_FIRST_KEY)
  const lastTouch = readStoredTouch(ATTRIBUTION_LAST_KEY)
  const primary = lastTouch || firstTouch
  const parts = [
    primary?.utm_source || (primary?.fbclid ? 'meta' : primary?.gclid ? 'google' : undefined),
    primary?.utm_medium,
    primary?.utm_campaign,
    primary?.ref ? `ref=${primary.ref}` : undefined,
  ].filter(Boolean)

  return {
    firstTouch,
    lastTouch,
    summary: parts.length > 0 ? parts.join('/') : 'direct',
  }
}

export function trackConversionEvent(options: ConversionTrackingOptions): { eventId: string } {
  const eventId = options.eventId || generateEventId(options.eventName.toLowerCase())
  if (typeof window === 'undefined') return { eventId }

  const env = (import.meta as any).env || {}
  const value = typeof options.value === 'number' ? options.value : undefined
  const currency = options.currency || 'USD'
  const gaName =
    options.gaEventName ||
    (options.eventName === 'Purchase'
      ? 'purchase'
      : options.eventName === 'InitiateCheckout'
        ? 'begin_checkout'
        : options.eventName === 'Lead'
          ? 'generate_lead'
          : options.eventName === 'Schedule'
            ? 'schedule_consultation'
            : 'view_item')

  if (typeof window.gtag === 'function') {
    window.gtag('event', gaName, {
      event_id: eventId,
      transaction_id: options.transactionId || eventId,
      value,
      currency,
      item_name: options.contentName,
    })

    const googleAdsId = env.VITE_GOOGLE_ADS_ID as string | undefined
    const conversionLabel = env.VITE_GOOGLE_ADS_CONVERSION_LABEL as string | undefined
    if (
      googleAdsId &&
      conversionLabel &&
      (options.eventName === 'Purchase' || options.eventName === 'Schedule' || options.eventName === 'Lead')
    ) {
      window.gtag('event', 'conversion', {
        send_to: `${googleAdsId}/${conversionLabel}`,
        value: value ?? 0,
        currency,
        transaction_id: options.transactionId || eventId,
      })
    }
  }

  if (typeof window.fbq === 'function') {
    window.fbq(
      'track',
      options.eventName,
      {
        value,
        currency,
        content_name: options.contentName,
        content_ids: options.contentIds,
        content_type: 'product',
      },
      { eventID: eventId }
    )
  }

  if (!options.skipCapi) {
    try {
      const attr = getAttributionData()
      fetch(`${ANALYTICS_API_BASE}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: JSON.stringify({
          action: 'capi',
          event_name: options.eventName,
          event_id: eventId,
          event_source_url: window.location.href,
          value,
          currency,
          content_name: options.contentName,
          content_ids: options.contentIds,
          email: options.email,
          phone: options.phone,
          first_name: options.firstName,
          last_name: options.lastName,
          fbp: getCookie('_fbp'),
          fbc: getCookie('_fbc'),
          external_id: options.externalId || options.email,
          attribution: attr.lastTouch || attr.firstTouch,
        }),
      }).catch(() => {})
    } catch {
      // Never block UI on background telemetry
    }
  }

  return { eventId }
}

if (typeof window !== 'undefined') {
  initPaidAttributionAndPixels()
}

export function getAttributionSource(defaultSource: string): string {
  if (typeof window === 'undefined') return defaultSource
  try {
    const bundle = getAttributionData()
    const touch = bundle.lastTouch || bundle.firstTouch
    if (touch && (touch.utm_source || touch.utm_campaign || touch.fbclid || touch.gclid || touch.ref)) {
      return `${defaultSource} [${bundle.summary}]`
    }
    const raw = sessionStorage.getItem('aidynamic_attribution')
    if (!raw) return defaultSource
    const parsed = JSON.parse(raw)
    if (parsed.utm_source || parsed.utm_campaign) {
      return `${defaultSource} [${parsed.utm_source}/${parsed.utm_medium}/${parsed.utm_campaign}]`
    }
  } catch {}
  return defaultSource
}
