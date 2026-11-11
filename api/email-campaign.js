// Serverless API Endpoint: /api/email-campaign
// Minimalistic 5-Option Mid-Email Direct Connect Hub Architecture (Brevo + GA4 UTM + /connect Fast-Action Card)

import { buildDirectConnectHubLetter } from './_directConnectEmail.js';

const CAMPAIGNS = {
  email_1_voice_jass: {
    id: 'email_1_voice_jass',
    name: 'Segment 1 — South Florida Business Owners & CEOs (5-Option Direct Connect Hub)',
    subject: 'quick question on missed calls & manual admin at {{company}}',
    utmCampaign: 'hub_seg1_ceo_owners',
    segment: 'ceo_owners',
    targetListIds: [36],
    rolloutScheduledAt: '2026-11-12T10:15:00-05:00',
    description: 'Plain-spoken founder note to Miami CEOs & owners featuring our Minimalistic 5-Option Direct Connect Hub ($99 Audit + Free 48-Hr Prototype).',
    buildHtml: ({ name = 'there', email = '', company = 'your business', isBrevoCampaignDraft = false }) => {
      const firstName = isBrevoCampaignDraft
        ? '{{ contact.FIRSTNAME | default: "there" }}'
        : String(name || 'there').trim().split(/\s+/)[0] || 'there';
      const comp = isBrevoCampaignDraft
        ? '{{ contact.COMPANY | default: "your business" }}'
        : company && company !== 'your company'
        ? company
        : 'your business';
      const emailParam = isBrevoCampaignDraft
        ? '{{ contact.EMAIL }}'
        : encodeURIComponent(email || '');

      return buildDirectConnectHubLetter({
        firstName,
        emailParam,
        segment: 'ceo_owners',
        utmCampaign: 'hub_seg1_ceo_owners',
        isBrevoCampaignDraft,
        openingPara1: `Most owners I visit here in Miami aren't short on demand—they're losing roughly <strong>$3,420 a month per department</strong> paying good people to copy-paste intake data, chase follow-ups, and return voicemails from callers who hung up between noon and 2pm or after 5:30pm.`,
        openingPara2: `I'm Jasmel, a local AI developer in Brickell. Instead of pitching you a bloated software contract, my team comes directly into <strong>${comp}</strong> for a <strong>$99 60-minute workflow audit</strong> and builds a <strong>working custom AI prototype in 48 hours</strong> around your slowest daily bottleneck.`,
        closingPara1: `Everything we do is flat and transparent: if that 48-hour prototype doesn't show you a clear path to saving at least <strong>$2,500+/month</strong> in payroll and wasted hours, I refund your $99 on the spot. And when you're ready, we stay on-site to train your staff ($497 half-day bootcamp for up to 15 people, English &amp; Español) so 1 employee handles the workload of 5.`,
      });
    },
  },

  email_2_audit_99: {
    id: 'email_2_audit_99',
    name: 'Segment 2 — Medical Clinics, Dental Practices & MedSpas (5-Option Direct Connect Hub)',
    subject: 'front-desk calls & claim denials at {{company}}',
    utmCampaign: 'hub_seg2_medical_dental',
    segment: 'medical_dental',
    targetListIds: [36],
    dedicatedSegmentListName: 'AI Dynamic Pro — Medical & MedSpa',
    rolloutScheduledAt: '2026-11-19T10:15:00-05:00',
    description: 'Tailored to Miami doctors, dental practices, and MedSpas (front-desk bilingual scheduling, mobile insurance intake & pre-claim scrubbing).',
    buildHtml: ({ name = 'there', email = '', company = 'your practice', isBrevoCampaignDraft = false }) => {
      const firstName = isBrevoCampaignDraft
        ? '{{ contact.FIRSTNAME | default: "there" }}'
        : String(name || 'there').trim().split(/\s+/)[0] || 'there';
      const comp = isBrevoCampaignDraft
        ? '{{ contact.COMPANY | default: "your practice" }}'
        : company && company !== 'your company'
        ? company
        : 'your practice';
      const emailParam = isBrevoCampaignDraft
        ? '{{ contact.EMAIL }}'
        : encodeURIComponent(email || '');

      return buildDirectConnectHubLetter({
        firstName,
        emailParam,
        segment: 'medical_dental',
        utmCampaign: 'hub_seg2_medical_dental',
        isBrevoCampaignDraft,
        openingPara1: `Across Miami clinics, dental offices, and MedSpas, two leaks eat margin every single week: <strong>38% of new-patient calls during lunch or after 5pm hit voicemail and book elsewhere</strong>, while doctors and billers lose evenings to manual charting and preventable claim denials.`,
        openingPara2: `I build custom clinical &amp; front-desk AI right here in Miami. For a flat <strong>$99 60-minute practice audit</strong>, I'll map your front desk and build a <strong>working 48-hour prototype</strong> for <strong>${comp}</strong>—covering Ring-1 English/Spanish phone &amp; WhatsApp scheduling, mobile insurance card capture, or pre-submission claim checks.`,
        closingPara1: `No long-term retainers and zero guesswork: if our 48-hour prototype doesn't uncover at least <strong>$2,500+/month</strong> in recovered appointments and admin time, you pay <strong>$0</strong>. Our turnkey bilingual receptionist starts at $997 ($297/mo managed), and our $497 on-site staff bootcamp gets your receptionists and billers comfortable on day one.`,
      });
    },
  },

  email_3_staff_training: {
    id: 'email_3_staff_training',
    name: 'Segment 3 — Contractors, Construction & Property Services (5-Option Direct Connect Hub)',
    subject: 'faster job quotes & missed field calls at {{company}}',
    utmCampaign: 'hub_seg3_contractors_gc',
    segment: 'contractors_gc',
    targetListIds: [31],
    rolloutScheduledAt: '2026-11-17T10:15:00-05:00',
    description: 'Tailored to General Contractors, trades, and property firms (smartphone photo-to-quote AI + 24/7 bilingual job intake & estimate follow-up).',
    buildHtml: ({ name = 'there', email = '', company = 'your crew', isBrevoCampaignDraft = false }) => {
      const firstName = isBrevoCampaignDraft
        ? '{{ contact.FIRSTNAME | default: "there" }}'
        : String(name || 'there').trim().split(/\s+/)[0] || 'there';
      const comp = isBrevoCampaignDraft
        ? '{{ contact.COMPANY | default: "your company" }}'
        : company && company !== 'your company'
        ? company
        : 'your company';
      const emailParam = isBrevoCampaignDraft
        ? '{{ contact.EMAIL }}'
        : encodeURIComponent(email || '');

      return buildDirectConnectHubLetter({
        firstName,
        emailParam,
        segment: 'contractors_gc',
        utmCampaign: 'hub_seg3_contractors_gc',
        isBrevoCampaignDraft,
        openingPara1: `When you're on a jobsite in South Florida, two things quietly kill good bids: estimators burning 12+ hours a week driving out to tire-kickers, and inbound calls or WhatsApp leads going unanswered for an hour while the homeowner hires whoever picked up first.`,
        openingPara2: `I'm a Miami AI developer who builds practical field tools for contractors and property operators. For a flat <strong>$99 60-minute audit</strong>, we'll build a <strong>working 48-hour custom prototype</strong> for <strong>${comp}</strong>—from instant smartphone photo-to-quote estimating to a 24/7 English/Spanish voice &amp; WhatsApp coordinator that answers on Ring 1 and chases every open estimate.`,
        closingPara1: `If the 48-hour prototype doesn't show you at least <strong>$2,500+/month</strong> in saved estimator hours and captured jobs, I hand your $99 right back. Plus, we run a <strong>$497 on-site bootcamp</strong> (English &amp; Español) so your office and field coordinators actually use the tools every day.`,
      });
    },
  },

  email_4_before_after: {
    id: 'email_4_before_after',
    name: 'Segment 4 — Law Firms, Real Estate Brokerages & Title (5-Option Direct Connect Hub)',
    subject: '3-second client intake & contract screening at {{company}}',
    utmCampaign: 'hub_seg4_legal_realestate',
    segment: 'legal_realestate',
    targetListIds: [36],
    dedicatedSegmentListName: 'AI Dynamic Pro — Legal & Real Estate',
    rolloutScheduledAt: '2026-11-24T10:15:00-05:00',
    description: 'Tailored to attorneys, brokers, and title teams (3-second bilingual intake + private cloud contract & escrow deadline review).',
    buildHtml: ({ name = 'there', email = '', company = 'your firm', isBrevoCampaignDraft = false }) => {
      const firstName = isBrevoCampaignDraft
        ? '{{ contact.FIRSTNAME | default: "there" }}'
        : String(name || 'there').trim().split(/\s+/)[0] || 'there';
      const comp = isBrevoCampaignDraft
        ? '{{ contact.COMPANY | default: "your firm" }}'
        : company && company !== 'your company'
        ? company
        : 'your firm';
      const emailParam = isBrevoCampaignDraft
        ? '{{ contact.EMAIL }}'
        : encodeURIComponent(email || '');

      return buildDirectConnectHubLetter({
        firstName,
        emailParam,
        segment: 'legal_realestate',
        utmCampaign: 'hub_seg4_legal_realestate',
        isBrevoCampaignDraft,
        openingPara1: `78% of legal inquiries and property buyers sign with the first firm that responds. When daytime follow-ups take 47 minutes—or a 7:00pm call goes to voicemail—high-value retainers and listings quietly walk across the street, while paralegals and coordinators spend 15+ hours a week reviewing routine agreements by hand.`,
        openingPara2: `My team at AI Dynamic Pro in Brickell builds private AI systems for South Florida law firms, brokerages, and title teams. Starting with a <strong>$99 60-minute intake &amp; workflow audit</strong>, we build a <strong>working 48-hour prototype</strong> for <strong>${comp}</strong>—handling 3-second 24/7 English/Spanish intake across phone/WhatsApp/IG and instant private-cloud contract or escrow deadline screening.`,
        closingPara1: `Simple guarantee: if that 48-hour prototype doesn't uncover at least <strong>$2,500+/month</strong> in saved admin time and captured retainers, you pay <strong>$0</strong>. No bloated consulting decks—just working software and hands-on training ($497 team bootcamp) for your staff.`,
      });
    },
  },

  email_5_founder_checkin: {
    id: 'email_5_founder_checkin',
    name: 'Segment 5 — On-Site Staff AI Bootcamp ($497 Workforce Multiplier · Direct Connect Hub)',
    subject: 'training your existing team at {{company}} (1 employee = 5)',
    utmCampaign: 'hub_seg5_staff_bootcamp',
    segment: 'staff_bootcamp',
    targetListIds: [36, 31],
    rolloutScheduledAt: '2026-12-01T10:15:00-05:00',
    description: 'Focused on our $497 Half-Day On-Site Corporate AI Bootcamp (up to 15 staff, English & Español) with the 5-Option Direct Connect Hub.',
    buildHtml: ({ name = 'there', email = '', company = 'your company', isBrevoCampaignDraft = false }) => {
      const firstName = isBrevoCampaignDraft
        ? '{{ contact.FIRSTNAME | default: "there" }}'
        : String(name || 'there').trim().split(/\s+/)[0] || 'there';
      const comp = isBrevoCampaignDraft
        ? '{{ contact.COMPANY | default: "your company" }}'
        : company && company !== 'your company'
        ? company
        : 'your company';
      const emailParam = isBrevoCampaignDraft
        ? '{{ contact.EMAIL }}'
        : encodeURIComponent(email || '');

      return buildDirectConnectHubLetter({
        firstName,
        emailParam,
        segment: 'staff_bootcamp',
        utmCampaign: 'hub_seg5_staff_bootcamp',
        isBrevoCampaignDraft,
        openingPara1: `83% of businesses that buy AI subscriptions never see a dime of return for one simple reason: nobody sits down next to their staff to show them how to cut their actual daily busywork with it, so by Monday morning everyone goes back to doing things the slow way.`,
        openingPara2: `Instead of selling you another login that collects dust, my team comes on-site to <strong>${comp}</strong> (or live virtual) for a <strong>$497 Half-Day Practical AI Staff Bootcamp</strong> for up to 15 employees—or starts with a <strong>$99 60-minute audit + free 48-hour custom AI prototype</strong>.`,
        closingPara1: `We build role-specific daily playbooks in plain English and Spanish for your receptionists, coordinators, estimators, and managers—turning 4 hours of repetitive admin into 22 minutes so <strong>1 trained employee reliably produces the output of 5</strong>.`,
      });
    },
  },
};

// Ready-to-publish Google Business Profile ("Google Buz") Local Posts adapted for Miami & South Florida CEOs & Business Owners (EN/ES, Zero Phone Numbers in Body per Google Policy)
const GOOGLE_BUSINESS_POSTS = [
  {
    id: 'gbp_post_1_audit_offer',
    type: 'OFFER POST (CODE: SCALE99)',
    title: '$99 CEO AI Audit + Free 48-Hr Custom Prototype (Save $2,500+/mo or Pay $0)',
    ctaButton: 'Book Online',
    ctaUrl: 'https://www.aidynamic.pro/booking?utm_source=google_business&utm_medium=gbp_offer&utm_campaign=scale99',
    imageUrl: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_06.png',
    content: `FOR MIAMI & SOUTH FLORIDA CEOS & BUSINESS OWNERS: Stop overpaying for slow manual work and missed calls.\n\nAs hands-on AI Developers & Creators, we come directly into your business, show you how to make your company faster and more profitable, build custom AI applications around your workflow in 48 hours, and stay with your staff to train them until 1 employee produces the output of 5.\n\nWHAT YOU GET FOR $99 (USE CODE SCALE99):\n01. 60-Min On-Site or Executive Department Efficiency Audit.\n02. Free 48-Hour Live Custom AI Prototype built for your exact business.\n03. $2,500+/Month ($30,000/yr) Savings Guarantee — or you pay $0.\n\nEN ESPAÑOL: Vamos a tu empresa en Miami y el Sur de la Florida, creamos tu prototipo de Inteligencia Artificial en 48 horas y entrenamos a tu personal paso a paso para reducir costos y multiplicar tu productividad (1 empleado = 5).`,
  },
  {
    id: 'gbp_post_2_ceo_vision',
    type: 'WHAT’S NEW — EXECUTIVE MANDATE (EN/ES)',
    title: 'Why South Florida Business Owners Choose AI Dynamic Pro: We Build Your Vision & Train Your Staff',
    ctaButton: 'Book Online',
    ctaUrl: 'https://www.aidynamic.pro/booking?utm_source=google_business&utm_medium=gbp_post&utm_campaign=ceo_vision',
    imageUrl: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_03.png',
    content: `WHY SOUTH FLORIDA BUSINESS OWNERS CHOOSE AI DYNAMIC PRO — We Don't Just Sell Software. We Build Your Vision & Train Your Team.\n\nEvery week a business owner waits to automate, manual payroll and slow 47-minute lead replies quietly cost $3,420+ per department.\n\nWhether you run a Medical Clinic, Law Firm, Real Estate Brokerage, Construction/Service Company, or Retail Brand, our AI Developers come to your business to:\n01. BUILD CUSTOM AI APPS & AUTOMATION: From 24/7 Bilingual (English/Spanish) AI Phone & WhatsApp Receptionists (JAss — $997 turnkey) to automated quoting, billing, and custom web apps.\n02. CUT PAYROLL WASTE IMMEDIATELY: Eliminate repetitive data entry, missed after-hours calls, and slow follow-ups.\n03. TRAIN YOUR STAFF ON-SITE ($497 Bootcamp): We stay with your team and teach them how to use every tool daily so 1 trained employee performs like 5.\n\nClick Book Below to claim your $99 Audit + Free 48-Hour Prototype.`,
  },
  {
    id: 'gbp_post_3_medical_dental',
    type: 'WHAT’S NEW — MEDICAL, DENTAL & MEDSPAS',
    title: 'For Medical Clinics, Dental Practices & MedSpas in Miami: Cut Admin & Billing Costs by 45%',
    ctaButton: 'Learn More',
    ctaUrl: 'https://www.aidynamic.pro/projects?utm_source=google_business&utm_medium=gbp_post&utm_campaign=medical_dental',
    imageUrl: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_01.png',
    content: `FOR MEDICAL CLINICS, DENTAL PRACTICES & MEDSPAS IN MIAMI — Cut Front-Desk & Billing Overhead by 45%.\n\nDoctors and clinic owners should not spend evenings finishing charts or losing revenue to preventable insurance claim denials and missed patient calls.\n\nWe come into your clinic, build custom healthcare AI around your practice, and train your front-desk and billing staff step-by-step:\n01. 24/7 Bilingual (EN/ES) Patient Scheduling: Answers every call on Ring 1, verifies insurance cards via mobile photo, and books appointments automatically.\n02. Automated Clinical Notes & Billing Review: Turns patient visits into structured notes and flags billing errors before claims are sent.\n03. Hands-On Staff Training ($497 Bootcamp): Your existing receptionists and billers handle 4x the patient volume with zero burnout.\n\nEN ESPAÑOL: Automatización con IA y entrenamiento de personal para clínicas médicas, dentales y estéticas en Miami. Reserva tu Auditoría de $99 hoy.`,
  },
  {
    id: 'gbp_post_4_legal_realestate',
    type: 'WHAT’S NEW — LAW FIRMS & REAL ESTATE',
    title: 'For Law Firms, Real Estate Brokers & Property Managers: Close More Clients in Under 3 Minutes',
    ctaButton: 'Book Online',
    ctaUrl: 'https://www.aidynamic.pro/booking?utm_source=google_business&utm_medium=gbp_post&utm_campaign=legal_realestate',
    imageUrl: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_04.png',
    content: `FOR LAW FIRMS, REAL ESTATE BROKERS & PROPERTY MANAGERS — Close More Retainers & Deals in Under 3 Minutes.\n\n78% of clients hire the first firm that responds. If a high-value legal inquiry or property buyer calls at 7:00 PM and hits voicemail, that deal goes to your competitor.\n\nWe engineer custom private AI systems for South Florida law firms, title companies, and real estate teams:\n01. 24/7 Bilingual (English/Spanish) Client Intake: Qualifies cases and buyers in under 3 seconds across phone, SMS, WhatsApp, and Instagram, and books consultations directly into your calendar.\n02. Instant Private Contract & Lease Review: Screens 100+ page agreements, inspection deadlines, and escrow contingencies in seconds inside your own secure private cloud.\n03. On-Site Team Training: We teach your paralegals, agents, and coordinators how to save 15+ hours every week.\n\nClick Book Below to schedule your $99 60-Min Department Efficiency Audit.`,
  },
  {
    id: 'gbp_post_5_contractors_retail',
    type: 'WHAT’S NEW — CONTRACTORS, SERVICES & RETAIL',
    title: 'For Contractors, Home Services, Logistics & Retail: Custom AI Apps That Turn Photos Into Instant Quotes',
    ctaButton: 'Learn More',
    ctaUrl: 'https://www.aidynamic.pro/projects?utm_source=google_business&utm_medium=gbp_post&utm_campaign=contractors_retail',
    imageUrl: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_02.png',
    content: `FOR CONTRACTORS, HOME SERVICES, LOGISTICS & LUXURY RETAIL — Custom AI Apps That Turn Photos & Calls Into Instant Quotes.\n\nYour estimators and sales managers waste hours driving to unqualified jobs or manually checking inventory and property photos.\n\nAs AI Developers & Creators, we build custom applications tailored to your exact industry:\n01. Instant Photo Inspection & Quoting: Customers upload a photo or room scan from their phone, and your custom AI detects defects, estimates repair/project costs, and generates a branded PDF quote in seconds.\n02. 3D Virtual Showrooms & Property Walkthroughs: Let buyers explore spaces and inventory from their browser 24/7.\n03. Automated Dispatch & Follow-Up: JAss follows up with every unpaid estimate in English and Spanish until the job is booked.\n\nClick Learn More to see our 22 live systems or book your $99 Audit + Free 48-Hr Prototype.`,
  },
  {
    id: 'gbp_post_6_agentic_web',
    type: 'WHAT’S NEW — SELF-SELLING AI WEBSITES & APPS',
    title: 'Need a New Website or Custom App in 5 to 10 Days? Self-Selling AI Websites Built for Google & ChatGPT',
    ctaButton: 'Learn More',
    ctaUrl: 'https://www.aidynamic.pro/projects?utm_source=google_business&utm_medium=gbp_post&utm_campaign=agentic_web',
    imageUrl: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_05.png',
    content: `NEED A NEW WEBSITE OR CUSTOM APP IN 5 TO 10 DAYS? We Build Self-Selling AI Websites That Rank on Google & ChatGPT.\n\nMost company websites are static brochures that visitors leave in 8 seconds. In 2026, your website must actively talk to visitors, answer their questions in English and Spanish, and book appointments automatically.\n\nWhat we build and launch for your business in 5 to 10 days:\n01. Self-Adapting AI Websites & Custom Web Apps: Tailors the message to each visitor and captures leads 24/7.\n02. Google Maps & AI Search Optimization (ChatGPT / Gemini / Perplexity): Structured so when local customers ask AI who the best company in Miami is, your business gets recommended first.\n03. Built-In Voice & Chat Assistant: Turns website traffic into confirmed calendar bookings day and night.\n\nClick Learn More or book your $99 Audit to see a live 48-hour prototype for your brand.`,
  },
  {
    id: 'gbp_post_7_staff_bootcamp',
    type: 'UPDATE POST — $497 ON-SITE STAFF BOOTCAMP (EN/ES)',
    title: '$497 On-Site Corporate AI Staff Training Bootcamp: Turn 1 Existing Employee Into 5',
    ctaButton: 'Sign Up',
    ctaUrl: 'https://www.aidynamic.pro/booking?utm_source=google_business&utm_medium=gbp_post&utm_campaign=staff_bootcamp',
    imageUrl: 'https://www.aidynamic.pro/social/vision-deck/vision_slide_07.png',
    content: `ON-SITE CORPORATE AI STAFF TRAINING BOOTCAMP ($497) — Turn 1 Existing Employee Into the Output of 5.\n\nThe #1 reason businesses fail with AI is simple: someone buys a tool, nobody trains the staff, and by Monday morning everyone goes back to slow manual work.\n\nAt AI Dynamic Pro, we stay with you inside your company until your team is fast, confident, and self-sufficient:\n01. Half-Day On-Site or Live Virtual Bootcamp ($497 flat for up to 15 staff members).\n02. Custom AI Playbooks & Daily Checklists built specifically for your receptionists, sales reps, operations managers, and executives.\n03. Immediate Productivity Multiplication: Cut 10 to 15 hours of busywork per employee every single week.\n\nEN ESPAÑOL: Entrenamiento práctico de Inteligencia Artificial para tu equipo en inglés y español ($497). Haz clic en Registrarse para reservar tu fecha.`,
  },
];

const MIAMI_GMAPS_LEADS = [
  { name: 'Brickell Dental Associates', email: 'brickelldentalassociates2@gmail.com', phone: '(305) 372-8212', company: 'Brickell Dental Associates (Brickell)', category: 'Dental Practice', offer: 'Tier 1 ($99 Audit + 48h Prototype) -> Tier 3 ($297/mo JAss)' },
  { name: 'Brickell Dentistry', email: 'brickelldentistry444@gmail.com', phone: '(305) 371-6040', company: 'Brickell Dentistry (Brickell)', category: 'Dental Practice', offer: 'Tier 1 ($99 Audit + 48h Prototype) -> Tier 3 ($297/mo JAss)' },
  { name: 'Brickell Oral Surgery', email: 'brickelloralsurgery@gmail.com', phone: '(305) 374-6644', company: 'Brickell Oral Surgery (Brickell)', category: 'Oral Surgery Clinic', offer: 'Tier 1 ($99 Audit) -> Tier 2 ($497 Staff AI Bootcamp)' },
  { name: 'Gables Dental Clinic', email: 'gablesdental@gmail.com', phone: '(305) 444-9951', company: 'Gables Dental Clinic (Coral Gables)', category: 'Dental Practice', offer: 'Tier 1 ($99 Audit + 48h Prototype) -> Tier 3 ($997 Turnkey AI)' },
  { name: 'Aloe Medspa', email: 'aloemedspa@gmail.com', phone: '(305) 520-7649', company: 'Aloe Medspa (South Miami)', category: 'Medical Spa', offer: 'Tier 1 ($99 Audit + 48h Prototype) -> Tier 3 ($297/mo JAss)' },
  { name: 'Laserholic Medspa', email: 'laserholicmedspa@gmail.com', phone: '(786) 762-9103', company: 'Laserholic Medspa (Miami)', category: 'Medical Spa', offer: 'Tier 1 ($99 Audit + 48h Prototype) -> Tier 3 ($297/mo JAss)' },
  { name: 'Liscano Clinic / Premier MedSpa', email: 'mafamcacorp@gmail.com', phone: '(786) 348-3039', company: 'Liscano Clinic / Premier MedSpa (Miami Beach)', category: 'Medical Clinic & MedSpa', offer: 'Tier 1 ($99 Audit) -> Tier 3 ($997 Turnkey Voice & CRM)' },
  { name: 'Ruases International Real Estate', email: 'info@ruases.com', phone: '(305) 590-5000', company: 'Ruases International Real Estate (Miami)', category: 'Real Estate & Investments', offer: 'Tier 1 ($99 Audit) -> Tier 3 ($997 EstateMatch + JAss)' },
  { name: 'Residence Realty Inc', email: 'resrealtymiami@gmail.com', phone: '(305) 778-2252', company: 'Residence Realty Inc (Miami)', category: 'Real Estate Brokerage', offer: 'Tier 2 ($497 Staff AI Bootcamp) -> Tier 3 ($297/mo JAss)' },
  { name: 'Casabella Miami Realty Inc', email: 'casabellamiamirealty@gmail.com', phone: '(786) 542-1655', company: 'Casabella Miami Realty Inc (Miami)', category: 'Real Estate Brokerage', offer: 'Tier 2 ($497 Staff AI Bootcamp) -> Tier 3 ($297/mo JAss)' },
  { name: 'Brokers International Realty', email: 'brokergeorgedaniel@gmail.com', phone: '(786) 972-4511', company: 'Brokers International Realty (Coral Way / Brickell)', category: 'Real Estate Brokerage', offer: 'Tier 1 ($99 Audit + 48h Prototype) -> Tier 3 ($997 Turnkey AI)' },
  { name: 'Porcelanosa Florida Corp', email: 'info@porcelanosa-usa.com', phone: '(305) 715-7153', company: 'Porcelanosa Florida Corp (Doral)', category: 'Architecture & Design Showroom', offer: 'Tier 2 ($497 Staff Bootcamp) -> Tier 4 ($4,900 Enterprise AI)' },
  { name: '360 Repair Techs Inc', email: 'miguelradillo@gmail.com', phone: '(305) 720-7982', company: '360 Repair Techs Inc (Miami)', category: 'General Contractor', offer: 'Tier 1 ($99 Audit + 48h Prototype) -> Tier 3 ($297/mo JAss)' },
  { name: 'Miami Construction Brokers Inc', email: 'miamiconstructionbrokers@gmail.com', phone: '(786) 431-9231', company: 'Miami Construction Brokers Inc (Doral/Medley)', category: 'Construction & Contracting', offer: 'Tier 1 ($99 Audit) -> Tier 3 ($997 Turnkey Bidding AI)' },
  { name: 'Zamora & Associates Inc', email: 'zamoraassociates@gmail.com', phone: '(305) 273-7801', company: 'Zamora & Associates Inc (Miami)', category: 'Construction & Engineering', offer: 'Tier 1 ($99 Audit) -> Tier 2 ($497 Staff AI Bootcamp)' },
];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, api-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Prefer BREVO_API_KEY (must start with xkeysib- for Brevo v3 REST API)
  const rawBrevoKey = process.env.BREVO_API_KEY || process.env.BREVO_KEY || '';
  const rawViteBrevoKey = process.env.VITE_BREVO_API_KEY || '';
  const BREVO_API_KEY = rawBrevoKey.startsWith('xkeysib-')
    ? rawBrevoKey.trim()
    : rawViteBrevoKey.startsWith('xkeysib-')
      ? rawViteBrevoKey.trim()
      : (rawBrevoKey || rawViteBrevoKey).trim();
  const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://elpgqgcynmefzjxbzlwb.supabase.co';
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
  const GBP_REVIEW_URL =
    process.env.GOOGLE_BUSINESS_URL ||
    'https://www.google.com/search?q=AI+Dynamic+Pro+Miami';

  // GET: Return campaign metadata, GA4 config, Google Business Profile posts, or live Brevo Audit
  if (req.method === 'GET') {
    const queryAction = req.query?.action || '';

    if (queryAction === 'audit' && BREVO_API_KEY) {
      try {
        const headers = { Accept: 'application/json', 'api-key': BREVO_API_KEY };
        const [accountRes, listsRes, campaignsRes, sendersRes, blockedRes] = await Promise.all([
          fetch('https://api.brevo.com/v3/account', { headers }).catch(() => null),
          fetch('https://api.brevo.com/v3/contacts/lists?limit=50', { headers }).catch(() => null),
          fetch('https://api.brevo.com/v3/emailCampaigns?limit=25', { headers }).catch(() => null),
          fetch('https://api.brevo.com/v3/senders', { headers }).catch(() => null),
          fetch('https://api.brevo.com/v3/smtp/blockedContacts?limit=50', { headers }).catch(() => null),
        ]);

        let account = null;
        let brevoError = null;
        if (accountRes) {
          if (accountRes.ok) {
            account = await accountRes.json();
          } else {
            brevoError = await accountRes.json().catch(() => ({ status: accountRes.status }));
          }
        }
        const listsData = listsRes && listsRes.ok ? await listsRes.json() : { lists: [] };
        const campaignsData = campaignsRes && campaignsRes.ok ? await campaignsRes.json() : { campaigns: [] };
        const sendersData = sendersRes && sendersRes.ok ? await sendersRes.json() : { senders: [] };
        const blockedData = blockedRes && blockedRes.ok ? await blockedRes.json() : { contacts: [], count: 0 };

        const ipBlocked =
          (accountRes && accountRes.status === 401) ||
          (listsRes && listsRes.status === 401);

        return res.status(200).json({
          success: Boolean(account || (listsData.lists && listsData.lists.length > 0)),
          ipBlocked,
          brevoStatus: accountRes ? accountRes.status : null,
          brevoError,
          keyDiagnostics: {
            hasBrevoApiKey: Boolean(rawBrevoKey),
            brevoApiKeyLength: rawBrevoKey.length,
            brevoApiKeyStartsWithXkeysib: rawBrevoKey.startsWith('xkeysib-'),
            hasViteBrevoApiKey: Boolean(rawViteBrevoKey),
            viteBrevoApiKeyLength: rawViteBrevoKey.length,
            viteBrevoApiKeyStartsWithXkeysib: rawViteBrevoKey.startsWith('xkeysib-'),
            matchingEnvKeys: Object.keys(process.env).filter((k) =>
              /BREVO|BUFFER|SMTP/i.test(k)
            ),
          },
          account: account
            ? {
                email: account.email,
                companyName: account.companyName,
                plan: account.plan,
              }
            : null,
          lists: (listsData.lists || []).map((l) => ({
            id: l.id,
            name: l.name,
            totalSubscribers: l.totalSubscribers || l.uniqueSubscribers || 0,
            totalBlacklisted: l.totalBlacklisted || 0,
          })),
          externalCampaigns: (campaignsData.campaigns || []).map((c) => ({
            id: c.id,
            name: c.name,
            subject: c.subject,
            status: c.status, // 'draft' | 'sent' | 'archive' | 'queued' | 'suspended' | 'inProcess'
            scheduledAt: c.scheduledAt || null,
          })),
          senders: (sendersData.senders || []).map((s) => ({
            id: s.id,
            name: s.name,
            email: s.email,
            active: s.active,
          })),
          blockedContactsCount: blockedData.count || (blockedData.contacts || []).length || 0,
        });
      } catch (auditErr) {
        return res.status(200).json({
          success: false,
          error: auditErr.message || 'Audit error',
        });
      }
    }

    return res.status(200).json({
      brevoConfigured: Boolean(BREVO_API_KEY),
      ga4MeasurementId: 'G-M1RHKRVS9M',
      campaigns: Object.values(CAMPAIGNS).map(({ id, name, subject, utmCampaign, segment, targetListIds, description }) => ({
        id,
        name,
        subject,
        utmCampaign,
        segment,
        targetListIds,
        description,
        trackedBookingUrl: `https://www.aidynamic.pro/connect?mode=virtual&utm_source=brevo&utm_medium=email&utm_campaign=${utmCampaign}`,
      })),
      googleBusinessPosts: GOOGLE_BUSINESS_POSTS,
      miamiGmapsLeads: MIAMI_GMAPS_LEADS,
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
      action = 'send', // 'send' | 'purge_blocked_contacts' | 'save_leads_to_list' | 'suspend_external_campaigns' | 'resume_external_campaigns' | 'create_sender'
      externalCampaignIds = [],
      campaignId = 'email_1_voice_jass',
      mode = 'all_brevo_contacts', // 'all_brevo_contacts' | 'test' | 'custom' | 'miami_gmaps_leads' | 'supabase_leads' | 'brevo_list'
      brevoListId = 2,
      statusFilter = 'all',
      customRecipients = [],
      customSubject = '',
      scheduledAt = '', // Optional ISO-8601 future timestamp e.g. '2026-11-03T10:15:00-05:00'
      senderEmail = 'jasmel@aidynamic.pro', // Verified Brevo sender email
      senderName = 'Jasmel Acosta — AI Dynamic Pro',
      replyToEmail = 'jasmel@aidynamic.pro',
      leadsToSave = [],
      batchOffset = 0,
      batchLimit = 0,
    } = req.body || {};

    if (!BREVO_API_KEY) {
      return res.status(400).json({
        error: 'BREVO_API_KEY / VITE_BREVO_API_KEY is not configured in environment variables.',
      });
    }

    // ACTION: Save extracted Miami Google Maps B2B Leads into Brevo Contact List AND Supabase `aidynamic_leads`
    if (action === 'save_leads_to_list') {
      const sourceLeads = Array.isArray(leadsToSave) && leadsToSave.length > 0 ? leadsToSave : MIAMI_GMAPS_LEADS;
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      };

      let targetListId = Number(brevoListId) || 2;
      let targetListName = 'AI Dynamic Pro — Miami B2B Leads';
      try {
        const listsRes = await fetch('https://api.brevo.com/v3/contacts/lists?limit=50', { headers }).catch(() => null);
        if (listsRes && listsRes.ok) {
          const listsData = await listsRes.json();
          const existing = (listsData.lists || []).find(
            (l) => l.name && l.name.toLowerCase().includes('ai dynamic pro')
          );
          if (existing) {
            targetListId = existing.id;
            targetListName = existing.name;
          } else {
            const folderId = (listsData.lists && listsData.lists[0]?.folderId) || 1;
            const createListRes = await fetch('https://api.brevo.com/v3/contacts/lists', {
              method: 'POST',
              headers,
              body: JSON.stringify({ name: targetListName, folderId }),
            }).catch(() => null);
            if (createListRes && createListRes.ok) {
              const created = await createListRes.json().catch(() => ({}));
              if (created.id) targetListId = created.id;
            }
          }
        }
      } catch {}

      let brevoSavedCount = 0;
      for (const item of sourceLeads) {
        const cleanEmail = (item.email || '').trim().toLowerCase();
        if (!cleanEmail || !cleanEmail.includes('@')) continue;
        const cRes = await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            email: cleanEmail,
            attributes: {
              FIRSTNAME: item.name || item.business_name || cleanEmail.split('@')[0],
              NAME: item.name || item.business_name || cleanEmail.split('@')[0],
              COMPANY: item.company || item.business_name || 'Miami Business',
            },
            listIds: [targetListId],
            updateEnabled: true,
          }),
        }).catch(() => null);
        if (cRes && (cRes.ok || cRes.status === 201 || cRes.status === 204)) {
          brevoSavedCount++;
        }
      }

      let supabaseSavedCount = 0;
      if (SUPABASE_KEY) {
        const existingEmails = new Set();
        const sbGet = await fetch(`${SUPABASE_URL}/rest/v1/aidynamic_leads?select=email&limit=500`, {
          headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
        }).catch(() => null);
        if (sbGet && sbGet.ok) {
          const rows = await sbGet.json().catch(() => []);
          for (const r of rows) {
            if (r.email) existingEmails.add(r.email.trim().toLowerCase());
          }
        }

        for (const item of sourceLeads) {
          const cleanEmail = (item.email || '').trim().toLowerCase();
          if (!cleanEmail || !cleanEmail.includes('@')) continue;
          if (existingEmails.has(cleanEmail)) {
            supabaseSavedCount++;
            continue;
          }
          const ins = await fetch(`${SUPABASE_URL}/rest/v1/aidynamic_leads`, {
            method: 'POST',
            headers: {
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${SUPABASE_KEY}`,
              'Content-Type': 'application/json',
              Prefer: 'return=minimal',
            },
            body: JSON.stringify({
              name: item.name || item.business_name || cleanEmail.split('@')[0],
              email: cleanEmail,
              phone: item.phone || null,
              company: item.company || item.business_name || null,
              service_interest: [item.category || 'Miami B2B', item.offer || item.recommended_offer || '$99 Audit'],
              status: 'contacted',
              source: 'google_maps_scraper_miami',
            }),
          }).catch(() => null);
          if (ins && (ins.ok || ins.status === 201)) {
            supabaseSavedCount++;
          }
        }
      }

      return res.status(200).json({
        success: true,
        brevoListId: targetListId,
        brevoListName: targetListName,
        brevoSavedCount,
        supabaseSavedCount,
        totalLeads: sourceLeads.length,
        message: `Saved ${ sourceLeads.length } Miami Google Maps B2B leads to Brevo List #${targetListId} ("${targetListName}": ${brevoSavedCount} synced) and Supabase CRM (${supabaseSavedCount} synced).`,
      });
    }

    // ACTION: Create & trigger verification for a new Brevo Sender (or delete & recreate to re-send confirmation email)
    if (action === 'create_sender' || action === 'resend_sender_verification') {
      const targetEmail = (senderEmail || 'jasmel@aidynamic.pro').trim().toLowerCase();
      const targetName = (senderName || 'Jasmel Acosta — AI Dynamic Pro').trim();
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      };

      // Also fetch domain DNS records from Brevo if available
      let domainDns = null;
      try {
        await fetch('https://api.brevo.com/v3/senders/domains', {
          method: 'POST',
          headers,
          body: JSON.stringify({ name: 'aidynamic.pro' }),
        }).catch(() => null);
        const domRes = await fetch('https://api.brevo.com/v3/senders/domains/aidynamic.pro', { headers }).catch(() => null);
        if (domRes && domRes.ok) {
          domainDns = await domRes.json().catch(() => null);
        }
      } catch {}

      // If sender already exists and is inactive, delete it first so Brevo sends a brand-new verification email
      try {
        const listSdr = await fetch('https://api.brevo.com/v3/senders', { headers }).catch(() => null);
        if (listSdr && listSdr.ok) {
          const sdrData = await listSdr.json();
          const existing = (sdrData.senders || []).find(
            (s) => s.email && s.email.trim().toLowerCase() === targetEmail && !s.active
          );
          if (existing && existing.id) {
            await fetch(`https://api.brevo.com/v3/senders/${existing.id}`, {
              method: 'DELETE',
              headers,
            }).catch(() => null);
          }
        }
      } catch {}

      const createRes = await fetch('https://api.brevo.com/v3/senders', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name: targetName,
          email: targetEmail,
        }),
      }).catch(() => null);

      if (createRes && createRes.ok) {
        const created = await createRes.json().catch(() => ({}));
        return res.status(200).json({
          success: true,
          sender: { id: created.id, name: targetName, email: targetEmail },
          domainDns,
          message: `Verification email sent to ${targetEmail}! Open your inbox and click the Brevo confirmation link to activate this sender.`,
        });
      }
      const errTxt = createRes ? await createRes.text().catch(() => 'Could not create sender') : 'Network error';
      return res.status(200).json({
        success: false,
        error: errTxt,
        domainDns,
        message: `Could not create sender from server (${errTxt}).`,
      });
    }

    // ACTION: Suspend / Pause OR Resume / Re-Activate external (MBMB) campaigns in Brevo
    if (action === 'suspend_external_campaigns' || action === 'resume_external_campaigns') {
      const isResume = action === 'resume_external_campaigns';
      const desiredStatus = isResume ? 'queued' : 'suspended';
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      };
      let targetIds = Array.isArray(externalCampaignIds) ? [...externalCampaignIds] : [];

      if (targetIds.length === 0) {
        const listRes = await fetch('https://api.brevo.com/v3/emailCampaigns?limit=50', { headers }).catch(() => null);
        if (listRes && listRes.ok) {
          const listData = await listRes.json();
          targetIds = (listData.campaigns || [])
            .filter((c) =>
              isResume
                ? c.status === 'suspended'
                : ['queued', 'inProcess', 'replicate'].includes(c.status)
            )
            .map((c) => c.id);
        }
      }

      const updatedIds = [];
      const updateErrors = [];
      for (const cid of targetIds) {
        const putRes = await fetch(`https://api.brevo.com/v3/emailCampaigns/${cid}/status`, {
          method: 'PUT',
          headers,
          body: JSON.stringify({ status: desiredStatus }),
        }).catch(() => null);
        if (putRes && (putRes.ok || putRes.status === 204)) {
          updatedIds.push(cid);
        } else if (putRes) {
          const errTxt = await putRes.text().catch(() => 'Could not update status');
          updateErrors.push({ id: cid, error: errTxt });
        }
      }

      return res.status(200).json({
        success: true,
        suspendedIds: updatedIds,
        updatedIds,
        suspendErrors: updateErrors,
        message: isResume
          ? updatedIds.length > 0
            ? `Resumed ${updatedIds.length} suspended external (MBMB) campaign(s) in Brevo.`
            : 'No suspended external (MBMB) campaigns found to resume—MBMB connection remains active and ready.'
          : updatedIds.length > 0
          ? `Paused ${updatedIds.length} active/queued external (MBMB) campaign(s) in Brevo.`
          : 'Verified: 0 active or queued external (MBMB) campaigns are currently scheduled to send.',
      });
    }

    // ACTION: Stage OR Schedule the 5-Option Direct Connect Hub segment campaigns in Brevo (100% AI Dynamic Pro lists only — zero MBMB overlap)
    if (action === 'stage_brevo_drafts' || action === 'schedule_hub_rollout') {
      const shouldSchedule = action === 'schedule_hub_rollout' || Boolean(req.body?.scheduleRollout);
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      };

      // Resolve active verified Brevo sender
      let draftSenderEmail = (senderEmail || 'jasmel@aidynamic.pro').trim().toLowerCase();
      let draftSenderName = 'Jasmel Acosta - AI Dynamic Pro';
      try {
        const sdrRes = await fetch('https://api.brevo.com/v3/senders', { headers }).catch(() => null);
        if (sdrRes && sdrRes.ok) {
          const sdrData = await sdrRes.json();
          const activeSenders = (sdrData.senders || []).filter((s) => s && s.active && s.email);
          const exact = activeSenders.find((s) => s.email.trim().toLowerCase() === draftSenderEmail);
          const domainMatch = activeSenders.find((s) => s.email.toLowerCase().endsWith('@aidynamic.pro'));
          const chosen = exact || domainMatch || activeSenders[0];
          if (chosen) {
            draftSenderEmail = chosen.email.trim().toLowerCase();
            if (chosen.name) draftSenderName = chosen.name;
          }
        }
      } catch {}

      // Ensure dedicated AI Dynamic Pro vertical Brevo lists exist & are populated cleanly (strictly separate from MBMB)
      const listByName = new Map();
      let defaultFolderId = 1;
      try {
        const listsRes = await fetch('https://api.brevo.com/v3/contacts/lists?limit=50', { headers }).catch(() => null);
        if (listsRes && listsRes.ok) {
          const listsData = await listsRes.json();
          for (const l of listsData.lists || []) {
            if (l.name) listByName.set(l.name.trim(), l.id);
            if (l.folderId) defaultFolderId = l.folderId;
          }
        }
      } catch {}

      const ensureSegmentList = async (listName, categoryMatcher) => {
        let lid = listByName.get(listName);
        if (!lid) {
          const createRes = await fetch('https://api.brevo.com/v3/contacts/lists', {
            method: 'POST',
            headers,
            body: JSON.stringify({ name: listName, folderId: defaultFolderId }),
          }).catch(() => null);
          if (createRes && createRes.ok) {
            const created = await createRes.json().catch(() => ({}));
            if (created.id) {
              lid = created.id;
              listByName.set(listName, lid);
            }
          }
        }
        if (lid) {
          const matchingLeads = MIAMI_GMAPS_LEADS.filter((item) => categoryMatcher(item.category || ''));
          for (const item of matchingLeads) {
            await fetch('https://api.brevo.com/v3/contacts', {
              method: 'POST',
              headers,
              body: JSON.stringify({
                email: item.email.trim().toLowerCase(),
                attributes: {
                  FIRSTNAME: item.name,
                  NAME: item.name,
                  COMPANY: item.company,
                },
                listIds: [lid, 36],
                updateEnabled: true,
              }),
            }).catch(() => null);
          }
        }
        return lid;
      };

      const medicalListId = await ensureSegmentList(
        'AI Dynamic Pro — Medical & MedSpa',
        (cat) => /dental|oral|medspa|medical|clinic/i.test(cat)
      );
      const legalReListId = await ensureSegmentList(
        'AI Dynamic Pro — Legal & Real Estate',
        (cat) => /real estate|legal|law|broker/i.test(cat)
      );

      // Inspect existing Brevo campaigns (draft or suspended) so we update in-place instead of creating duplicates
      const existingHubMap = new Map();
      try {
        const listRes = await fetch('https://api.brevo.com/v3/emailCampaigns?type=classic&limit=50', {
          headers,
        }).catch(() => null);
        if (listRes && listRes.ok) {
          const listData = await listRes.json();
          for (const dc of listData.campaigns || []) {
            if (dc.name && ['draft', 'suspended', 'queued'].includes(dc.status)) {
              if (!existingHubMap.has(dc.name.trim())) {
                existingHubMap.set(dc.name.trim(), { id: dc.id, status: dc.status });
              }
            }
          }
        }
      } catch {}

      const stagedDrafts = [];
      const draftErrors = [];

      for (const c of Object.values(CAMPAIGNS)) {
        const draftCampaignName = `[Direct Connect Hub] ${c.name}`;
        const draftSubject = c.subject
          .replace(/\{\{company\}\}/g, '{{ contact.COMPANY | default: "your company" }}')
          .replace(/\{\{name\}\}/g, '{{ contact.FIRSTNAME | default: "there" }}');

        const htmlContent = c.buildHtml({
          isBrevoCampaignDraft: true,
        });

        let resolvedListIds = Array.isArray(c.targetListIds) && c.targetListIds.length > 0 ? [...c.targetListIds] : [36];
        if (c.segment === 'medical_dental' && medicalListId) {
          resolvedListIds = [medicalListId];
        } else if (c.segment === 'legal_realestate' && legalReListId) {
          resolvedListIds = [legalReListId];
        }

        const payload = {
          name: draftCampaignName,
          subject: draftSubject,
          sender: { name: draftSenderName, email: draftSenderEmail },
          replyTo: 'jasmel@aidynamic.pro',
          type: 'classic',
          htmlContent,
          recipients: { listIds: resolvedListIds },
          ...(shouldSchedule && c.rolloutScheduledAt ? { scheduledAt: c.rolloutScheduledAt } : {}),
        };

        const existingEntry = existingHubMap.get(draftCampaignName);
        if (existingEntry && existingEntry.id) {
          if (existingEntry.status === 'queued') {
            await fetch(`https://api.brevo.com/v3/emailCampaigns/${existingEntry.id}/status`, {
              method: 'PUT',
              headers,
              body: JSON.stringify({ status: 'suspended' }),
            }).catch(() => null);
          }

          const putRes = await fetch(`https://api.brevo.com/v3/emailCampaigns/${existingEntry.id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(payload),
          }).catch(() => null);

          if (putRes && (putRes.ok || putRes.status === 204)) {
            stagedDrafts.push({
              brevoCampaignId: existingEntry.id,
              campaignKey: c.id,
              name: draftCampaignName,
              subject: draftSubject,
              segment: c.segment,
              listIds: resolvedListIds,
              status: shouldSchedule ? 'queued' : 'draft',
              scheduledAt: shouldSchedule ? c.rolloutScheduledAt : null,
              operation: shouldSchedule ? 'scheduled_for_rollout' : 'updated_existing_draft',
            });
          } else {
            const errTxt = putRes ? await putRes.text().catch(() => 'PUT error') : 'Network error';
            draftErrors.push({ campaignKey: c.id, error: errTxt });
          }
        } else {
          const postRes = await fetch('https://api.brevo.com/v3/emailCampaigns', {
            method: 'POST',
            headers,
            body: JSON.stringify(payload),
          }).catch(() => null);
          if (postRes && postRes.ok) {
            const created = await postRes.json().catch(() => ({}));
            stagedDrafts.push({
              brevoCampaignId: created.id,
              campaignKey: c.id,
              name: draftCampaignName,
              subject: draftSubject,
              segment: c.segment,
              listIds: resolvedListIds,
              status: shouldSchedule ? 'queued' : 'draft',
              scheduledAt: shouldSchedule ? c.rolloutScheduledAt : null,
              operation: shouldSchedule ? 'created_and_scheduled' : 'created_new_draft',
            });
          } else {
            const errTxt = postRes ? await postRes.text().catch(() => 'POST error') : 'Network error';
            draftErrors.push({ campaignKey: c.id, error: errTxt });
          }
        }
      }

      return res.status(200).json({
        success: stagedDrafts.length > 0,
        senderUsed: { name: draftSenderName, email: draftSenderEmail },
        medicalListId,
        legalReListId,
        stagedCount: stagedDrafts.length,
        stagedDrafts,
        draftErrors,
        message: shouldSchedule
          ? `Scheduled ${stagedDrafts.length} Direct Connect Hub campaign(s) onto Tue/Thu 10:15 AM EST rollout in Brevo!`
          : `Staged ${stagedDrafts.length} Direct Connect Hub campaign(s) as SAFE DRAFTS in Brevo (status: draft — NOT sent).`,
      });
    }

    const campaign = CAMPAIGNS[campaignId] || CAMPAIGNS.email_1_voice_jass;

    // Fetch global Brevo transactional blocklist + blacklisted contacts and ERASE them from Brevo lists & Supabase CRM
    const blockedSet = new Set();
    const erasedBlockedEmails = [];
    try {
      const blkRes = await fetch('https://api.brevo.com/v3/smtp/blockedContacts?limit=100', {
        headers: { Accept: 'application/json', 'api-key': BREVO_API_KEY },
      }).catch(() => null);
      if (blkRes && blkRes.ok) {
        const blkData = await blkRes.json();
        for (const b of blkData.contacts || []) {
          if (b.email) blockedSet.add(b.email.trim().toLowerCase());
        }
      }
    } catch {
      // Non-blocking if IP-restricted on serverless
    }

    // Helper to permanently erase blocked/blacklisted emails from Brevo Contacts & Supabase CRM
    const eraseBlockedContacts = async (emailsToErase) => {
      const uniqueEmails = [...new Set(emailsToErase.map((e) => (e || '').trim().toLowerCase()).filter(Boolean))];
      await Promise.all(
        uniqueEmails.map(async (blockedEmail) => {
          erasedBlockedEmails.push(blockedEmail);
          // 1. Delete from Brevo Contacts (removes from all lists)
          await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(blockedEmail)}`, {
            method: 'DELETE',
            headers: { Accept: 'application/json', 'api-key': BREVO_API_KEY },
          }).catch(() => null);
          // 2. Delete from Supabase CRM aidynamic_leads if present
          if (SUPABASE_KEY) {
            await fetch(
              `${SUPABASE_URL}/rest/v1/aidynamic_leads?email=eq.${encodeURIComponent(blockedEmail)}`,
              {
                method: 'DELETE',
                headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
              }
            ).catch(() => null);
          }
        })
      );
    };

    if (action === 'purge_blocked_contacts') {
      for (const offset of [0, 500, 1000, 1500]) {
        const allRes = await fetch(
          `https://api.brevo.com/v3/contacts?limit=500&offset=${offset}`,
          { headers: { Accept: 'application/json', 'api-key': BREVO_API_KEY } }
        ).catch(() => null);
        if (!allRes || !allRes.ok) break;
        const allData = await allRes.json();
        const batch = allData.contacts || [];
        for (const c of batch) {
          if (c.emailBlacklisted && c.email) {
            blockedSet.add(c.email.trim().toLowerCase());
          }
        }
        if (batch.length < 500) break;
      }
      await eraseBlockedContacts([...blockedSet]);
      return res.status(200).json({
        success: true,
        erasedCount: erasedBlockedEmails.length,
        erasedEmails: erasedBlockedEmails,
        message: `Permanently erased ${erasedBlockedEmails.length} blocked/blacklisted contact(s) from Brevo lists and Supabase CRM.`,
      });
    }

    let recipients = [];
    let skippedUnsubscribed = 0;

    if (mode === 'test') {
      recipients = [
        {
          name: 'Jasmel',
          email: 'jasmelacosta@gmail.com',
          company: 'your company',
        },
      ];
    } else if (mode === 'miami_gmaps_leads') {
      const seen = new Set();
      for (const r of MIAMI_GMAPS_LEADS) {
        const cleanEmail = (r.email || '').trim().toLowerCase();
        if (!cleanEmail || !cleanEmail.includes('@') || seen.has(cleanEmail)) continue;
        seen.add(cleanEmail);
        if (blockedSet.has(cleanEmail)) {
          skippedUnsubscribed++;
          continue;
        }
        recipients.push({
          name: r.name,
          email: cleanEmail,
          company: r.name,
        });
      }
    } else if (mode === 'custom' && Array.isArray(customRecipients)) {
      const seen = new Set();
      for (const r of customRecipients) {
        const cleanEmail = (r?.email || '').trim().toLowerCase();
        if (!cleanEmail || !cleanEmail.includes('@') || seen.has(cleanEmail)) continue;
        seen.add(cleanEmail);
        if (blockedSet.has(cleanEmail) || r?.emailBlacklisted) {
          skippedUnsubscribed++;
          continue;
        }
        recipients.push({
          name: r.name || cleanEmail.split('@')[0],
          email: cleanEmail,
          company: r.company || 'your organization',
        });
      }
    } else if (mode === 'all_brevo_contacts') {
      // Fetch ALL contacts across the entire Brevo account (up to 2,000 contacts in 500-contact pages) + Supabase CRM leads
      const seen = new Set();
      for (const offset of [0, 500, 1000, 1500]) {
        const allRes = await fetch(
          `https://api.brevo.com/v3/contacts?limit=500&offset=${offset}`,
          { headers: { Accept: 'application/json', 'api-key': BREVO_API_KEY } }
        ).catch(() => null);
        if (!allRes || !allRes.ok) break;
        const allData = await allRes.json();
        const contactsBatch = allData.contacts || [];
        for (const c of contactsBatch) {
          const cleanEmail = (c.email || '').trim().toLowerCase();
          if (!cleanEmail || !cleanEmail.includes('@') || seen.has(cleanEmail)) continue;
          seen.add(cleanEmail);
          if (c.emailBlacklisted || blockedSet.has(cleanEmail)) {
            blockedSet.add(cleanEmail);
            skippedUnsubscribed++;
            continue;
          }
          const attrs = c.attributes || {};
          recipients.push({
            name: attrs.FIRSTNAME || attrs.NAME || attrs.PRENOM || cleanEmail.split('@')[0],
            email: cleanEmail,
            company: attrs.COMPANY || attrs.ENTREPRISE || 'your company',
          });
        }
        if (contactsBatch.length < 500) break;
      }
      // Also merge any unique Supabase CRM leads not already in Brevo
      if (SUPABASE_KEY) {
        const sbRes = await fetch(
          `${SUPABASE_URL}/rest/v1/aidynamic_leads?select=name,email,company,status&order=created_at.desc&limit=500`,
          { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
        ).catch(() => null);
        if (sbRes && sbRes.ok) {
          const rows = await sbRes.json();
          for (const r of rows) {
            const cleanEmail = (r.email || '').trim().toLowerCase();
            if (!cleanEmail || !cleanEmail.includes('@') || seen.has(cleanEmail)) continue;
            seen.add(cleanEmail);
            if (blockedSet.has(cleanEmail) || r.status === 'lost') {
              skippedUnsubscribed++;
              continue;
            }
            recipients.push({
              name: r.name || cleanEmail.split('@')[0],
              email: cleanEmail,
              company: r.company || 'your company',
            });
          }
        }
      }
    } else if (mode === 'brevo_list') {
      const listIdNum = Number(brevoListId) || 2;
      const listContactsRes = await fetch(
        `https://api.brevo.com/v3/contacts/lists/${listIdNum}/contacts?limit=500`,
        {
          headers: { Accept: 'application/json', 'api-key': BREVO_API_KEY },
        }
      ).catch(() => null);

      if (listContactsRes && listContactsRes.ok) {
        const listContactsData = await listContactsRes.json();
        const seen = new Set();
        for (const c of listContactsData.contacts || []) {
          const cleanEmail = (c.email || '').trim().toLowerCase();
          if (!cleanEmail || !cleanEmail.includes('@') || seen.has(cleanEmail)) continue;
          seen.add(cleanEmail);
          if (c.emailBlacklisted || blockedSet.has(cleanEmail)) {
            blockedSet.add(cleanEmail);
            skippedUnsubscribed++;
            continue;
          }
          const attrs = c.attributes || {};
          recipients.push({
            name: attrs.FIRSTNAME || attrs.NAME || attrs.PRENOM || cleanEmail.split('@')[0],
            email: cleanEmail,
            company: attrs.COMPANY || attrs.ENTREPRISE || 'your company',
          });
        }
      }
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
          if (!cleanEmail || !cleanEmail.includes('@') || seen.has(cleanEmail)) continue;
          seen.add(cleanEmail);
          if (blockedSet.has(cleanEmail) || r.status === 'lost') {
            skippedUnsubscribed++;
            continue;
          }
          recipients.push({
            name: r.name || cleanEmail.split('@')[0],
            email: cleanEmail,
            company: r.company || 'your company',
          });
        }
      }
    }

    // Automatically erase any blocked/blacklisted contacts discovered during recipient resolution
    if (blockedSet.size > 0) {
      await eraseBlockedContacts([...blockedSet]);
    }

    const totalEligibleRecipients = recipients.length;
    if (Number(batchLimit) > 0) {
      const startIdx = Math.max(0, Number(batchOffset) || 0);
      recipients = recipients.slice(startIdx, startIdx + Number(batchLimit));
    }

    if (recipients.length === 0) {
      return res.status(200).json({
        success: true,
        sentCount: 0,
        totalAttempted: 0,
        totalEligibleRecipients,
        skippedUnsubscribed,
        erasedBlockedEmails,
        message: 'No remaining recipients in this batch window.',
      });
    }

    // Resolve verified active sender from Brevo so campaigns never fail due to an unverified sender address
    let resolvedSenderEmail = (senderEmail || '').trim().toLowerCase();
    const resolvedSenderName = (senderName || 'Jasmel Acosta — AI Dynamic Pro').trim();
    const resolvedReplyTo = (replyToEmail || 'jasmel@aidynamic.pro').trim().toLowerCase();

    try {
      const sdrRes = await fetch('https://api.brevo.com/v3/senders', {
        headers: { Accept: 'application/json', 'api-key': BREVO_API_KEY },
      }).catch(() => null);
      if (sdrRes && sdrRes.ok) {
        const sdrData = await sdrRes.json();
        const activeSenders = (sdrData.senders || []).filter((s) => s && s.active && s.email);
        const requestedIsActive =
          resolvedSenderEmail &&
          activeSenders.some((s) => s.email.trim().toLowerCase() === resolvedSenderEmail);

        if (!requestedIsActive) {
          const aiDynamicSender = activeSenders.find((s) =>
            s.email.toLowerCase().endsWith('@aidynamic.pro')
          );
          const aiScribeSender = activeSenders.find((s) =>
            s.email.toLowerCase().includes('aimedicalscriber')
          );
          if (aiDynamicSender) {
            resolvedSenderEmail = aiDynamicSender.email.trim().toLowerCase();
          } else if (aiScribeSender) {
            resolvedSenderEmail = aiScribeSender.email.trim().toLowerCase();
          } else if (activeSenders.length > 0) {
            resolvedSenderEmail = activeSenders[0].email.trim().toLowerCase();
          }
        }
      }
    } catch {
      // Fallback if network issue
    }
    if (!resolvedSenderEmail) {
      resolvedSenderEmail = 'jasmel@aidynamic.pro';
    }

    let sentCount = 0;
    const errors = [];
    const renderedPayloads = [];

    // Process sends in parallel chunks of 25 for fast high-volume execution across all lists
    const CONCURRENCY = 25;
    for (let i = 0; i < recipients.length; i += CONCURRENCY) {
      const chunk = recipients.slice(i, i + CONCURRENCY);
      await Promise.all(
        chunk.map(async (recipient) => {
          const utmUrl = `https://www.aidynamic.pro/booking?utm_source=brevo&utm_medium=email&utm_campaign=${campaign.utmCampaign}`;
          const homeUtmUrl = `https://www.aidynamic.pro/?utm_source=brevo&utm_medium=email&utm_campaign=${campaign.utmCampaign}`;
          const gbpUrl = GBP_REVIEW_URL;
          const phoneUrl = 'tel:+17866432099';

          const personalizedSubject = (customSubject || campaign.subject)
            .replace(/\{\{company\}\}/g, recipient.company || 'your business')
            .replace(/\{\{name\}\}/g, recipient.name || 'there');

          const htmlContent = campaign.buildHtml({
            name: recipient.name,
            email: recipient.email,
            company: recipient.company,
            utmUrl,
            homeUtmUrl,
            gbpUrl,
            phoneUrl,
          });

          const brevoPayload = {
            sender: { name: resolvedSenderName, email: resolvedSenderEmail },
            to: [{ email: recipient.email, name: recipient.name }],
            replyTo: { email: resolvedReplyTo, name: resolvedSenderName },
            subject: personalizedSubject,
            htmlContent,
            ...(scheduledAt ? { scheduledAt } : {}),
            headers: {
              'List-Unsubscribe': `<mailto:${resolvedReplyTo}?subject=Unsubscribe>`,
              'X-Entity-Ref-ID': `aidynamic-${campaign.utmCampaign}-${Date.now()}`,
            },
            tags: [campaign.utmCampaign, 'aidynamic_sequence'],
          };

          if (renderedPayloads.length < 50) {
            renderedPayloads.push(brevoPayload);
          }

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
        })
      );
    }

    return res.status(200).json({
      success: sentCount > 0,
      campaignId: campaign.id,
      campaignName: campaign.name,
      utmCampaign: campaign.utmCampaign,
      senderUsed: resolvedSenderEmail,
      replyToUsed: resolvedReplyTo,
      sentCount,
      totalAttempted: recipients.length,
      totalEligibleRecipients,
      skippedUnsubscribed,
      erasedBlockedCount: erasedBlockedEmails.length,
      erasedBlockedEmails,
      renderedPayloads: sentCount === 0 ? renderedPayloads : [],
      errors: errors.slice(0, 5),
    });
  } catch (error) {
    console.error('[Email Campaign API] Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
