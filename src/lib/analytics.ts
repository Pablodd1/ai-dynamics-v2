// Google Analytics (GA4) Event Tracking Utility
// Safely tracks conversion events for Google Analytics (gtag.js)

declare global {
  interface Window {
    dataLayer?: any[]
    gtag?: (...args: any[]) => void
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

export function getAttributionSource(defaultSource: string): string {
  if (typeof window === 'undefined') return defaultSource
  try {
    const raw = sessionStorage.getItem('aidynamic_attribution')
    if (!raw) return defaultSource
    const parsed = JSON.parse(raw)
    if (parsed.utm_source || parsed.utm_campaign) {
      return `${defaultSource} [${parsed.utm_source}/${parsed.utm_medium}/${parsed.utm_campaign}]`
    }
  } catch {}
  return defaultSource
}
