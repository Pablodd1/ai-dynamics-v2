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
}
