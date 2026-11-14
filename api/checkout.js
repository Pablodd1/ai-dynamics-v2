import { createClient } from '@supabase/supabase-js'
import crypto from 'node:crypto'
import {
  PROJECT_DOMAIN,
  normalizePhoneE164,
  resolveVerifiedBrevoSender,
  buildDirectConnectHubLetter,
  buildFounderFastActionAlertHtml,
} from './_directConnectEmail.js'

const FOUNDER_EMAIL = process.env.FOUNDER_NOTIFICATION_EMAIL || 'jasmelacosta@gmail.com'
const BREVO_LIST_ID = 36

export const OFFER_CATALOG = {
  audit_99: {
    id: 'audit_99',
    region: 'us',
    lang: 'en',
    segment: 'us_audit',
    priceUsd: 99,
    cents: 9900,
    stripeMode: 'payment',
    badge: '100% Risk-Free Audit',
    title: '48-Hour AI Workflow Audit + Live Prototype',
    titleEs: 'Auditoría IA 48h + Prototipo en Vivo',
    bookingService: 'Automation Blueprint',
    guarantee: 'Guaranteed $2,500+/mo in documented savings or 100% refunded ($0 cost)',
    guaranteeEs: 'Garantía: encontramos $2,500+ USD/mes en ahorros o devolvemos el 100%',
  },
  training_497: {
    id: 'training_497',
    region: 'us',
    lang: 'en',
    segment: 'us_bootcamp',
    priceUsd: 497,
    cents: 49700,
    stripeMode: 'payment',
    badge: '1 Employee = 5 Employees',
    title: 'Department AI Force-Multiplier Bootcamp (Up to 15 Staff)',
    titleEs: 'Bootcamp Corporativo IA (Hasta 15 Personas)',
    bookingService: 'AI Strategy Session',
    guarantee: '100% credited toward any Turnkey AI System build',
    guaranteeEs: '100% acreditable a cualquier sistema llave en mano',
  },
  turnkey_997: {
    id: 'turnkey_997',
    region: 'us',
    lang: 'en',
    segment: 'us_turnkey',
    priceUsd: 997,
    cents: 99700,
    stripeMode: 'payment',
    badge: 'Most Popular • Turnkey',
    title: 'Custom Private AI Agent & Workflow System Deployment',
    titleEs: 'Agente IA Privado y Flujo Llave en Mano',
    bookingService: 'Automation Blueprint',
    guarantee: 'Live production launch in 7–14 days with CRM/Voice integration',
    guaranteeEs: 'Lanzamiento en producción en 7–14 días con CRM y Voz IA',
  },
  enterprise_4900: {
    id: 'enterprise_4900',
    region: 'us',
    lang: 'en',
    segment: 'us_enterprise',
    priceUsd: 4900,
    cents: 490000,
    stripeMode: 'payment',
    badge: 'Enterprise Architecture',
    title: 'Full-Stack Enterprise AI Architecture Sprint',
    titleEs: 'Sprint de Arquitectura IA Empresarial Full-Stack',
    bookingService: 'AI Strategy Session',
    guarantee: 'Zero-data-retention private RAG, EDI/Voice & custom Computer Vision',
    guaranteeEs: 'RAG privado Zero-Training, EDI/Voz y Visión Computacional',
  },
  latam_medicos_29: {
    id: 'latam_medicos_29',
    region: 'latam',
    lang: 'es',
    segment: 'medical',
    priceUsd: 29,
    cents: 2900,
    stripeMode: 'subscription',
    interval: 'month',
    badge: 'Salud & Clínicas LATAM',
    title: 'Medical & Dental AI Receptionist SaaS ($29/mo)',
    titleEs: 'Recepcionista IA WhatsApp & Voz para Médicos ($29/mes)',
    bookingService: 'Automation Blueprint',
    guarantee: 'Cancela cuando quieras · Incluye Sofía Voz IA 24/7 y agenda Google Calendar',
    guaranteeEs: 'Cancela cuando quieras · Incluye Sofía Voz IA 24/7 y agenda Google Calendar',
  },
  latam_abogados_49: {
    id: 'latam_abogados_49',
    region: 'latam',
    lang: 'es',
    segment: 'legal',
    priceUsd: 49,
    cents: 4900,
    stripeMode: 'subscription',
    interval: 'month',
    badge: 'Legal & Inmobiliario LATAM',
    title: 'Legal & Real Estate AI Intake & Contract Audit ($49/mo)',
    titleEs: 'IA para Abogados e Inmobiliarias — Auditoría y Citas ($49/mes)',
    bookingService: 'Automation Blueprint',
    guarantee: 'Zero-Training RAG privado para contratos + calificación 24/7 por WhatsApp',
    guaranteeEs: 'Zero-Training RAG privado para contratos + calificación 24/7 por WhatsApp',
  },
  latam_arquitectos_69: {
    id: 'latam_arquitectos_69',
    region: 'latam',
    lang: 'es',
    segment: 'aec',
    priceUsd: 69,
    cents: 6900,
    stripeMode: 'subscription',
    interval: 'month',
    badge: 'Arquitectura & AEC LATAM',
    title: 'Architecture & Construction AI Vision & BOQ SaaS ($69/mo)',
    titleEs: 'IA para Arquitectos y Constructoras — Planos y Visión 3D ($69/mes)',
    bookingService: 'Automation Blueprint',
    guarantee: 'Cómputos métricos desde PDF/CAD + inspección visual de obra y cotizador',
    guaranteeEs: 'Cómputos métricos desde PDF/CAD + inspección visual de obra y cotizador',
  },
  latam_bootcamp_199: {
    id: 'latam_bootcamp_199',
    region: 'latam',
    lang: 'es',
    segment: 'latam_bootcamp',
    priceUsd: 199,
    cents: 19900,
    stripeMode: 'payment',
    badge: '1 Empleado = 5x • LATAM',
    title: 'LATAM SME AI Audit + Live Spanish Team Bootcamp',
    titleEs: 'Auditoría + Bootcamp IA PyME LATAM (Hasta 15 Personas)',
    bookingService: 'AI Strategy Session',
    guarantee: 'Encontramos $1,500+ USD/mes en ahorro o devolvemos el 100%',
    guaranteeEs: 'Encontramos $1,500+ USD/mes en ahorro o devolvemos el 100%',
  },
}

function getSupabaseClient() {
  const url = process.env.VITE_SUPABASE_URL || 'https://elpgqgcynmefzjxbzlwb.supabase.co'
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || ''
  if (!url || !key) return null
  return createClient(url, key)
}

function sha256Hex(value) {
  if (!value) return undefined
  return crypto.createHash('sha256').update(String(value).trim().toLowerCase()).digest('hex')
}

function getRequestOrigin(req) {
  const host = req.headers['x-forwarded-host'] || req.headers.host || ''
  const proto = req.headers['x-forwarded-proto'] || 'https'
  if (host && (host.includes('aidynamic.pro') || host.includes('localhost') || host.includes('vercel.app'))) {
    return `${proto}://${host}`
  }
  return PROJECT_DOMAIN
}

async function saveLeadRecord({ name, email, phone, company, offerId, status, source, notes }) {
  try {
    const supabase = getSupabaseClient()
    if (!supabase) return
    await supabase.from('aidynamic_leads').insert([
      {
        name: name || email,
        email,
        phone: normalizePhoneE164(phone) || phone || null,
        company: company || null,
        service_interest: offerId || 'audit_99',
        status,
        source: source || 'Paid Ad Funnel',
        notes,
      },
    ])
  } catch (err) {
    console.error('[checkout] Supabase insert warning:', err?.message)
  }
}

async function upsertBrevoContact({ email, name, phone, company, offerId, segment }) {
  const brevoKey = process.env.BREVO_API_KEY
  if (!brevoKey || !email) return
  try {
    const parts = String(name || '').trim().split(/\s+/)
    const firstName = parts[0] || ''
    const lastName = parts.slice(1).join(' ')
    const normalizedPhone = normalizePhoneE164(phone)

    await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': brevoKey,
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        attributes: {
          FIRSTNAME: firstName,
          LASTNAME: lastName,
          COMPANY: company || '',
          ...(normalizedPhone ? { SMS: normalizedPhone } : {}),
          SERVICE_INTEREST: offerId || 'audit_99',
          SEGMENT: segment || 'paid_ads',
        },
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
      }),
    })
  } catch (err) {
    console.error('[checkout] Brevo contact warning:', err?.message)
  }
}

async function cancelBrevoBatch(batchId) {
  const brevoKey = process.env.BREVO_API_KEY
  if (!brevoKey || !batchId) return false
  try {
    const res = await fetch(`https://api.brevo.com/v3/smtp/email/${encodeURIComponent(batchId)}`, {
      method: 'DELETE',
      headers: { 'api-key': brevoKey },
    })
    return res.ok
  } catch {
    return false
  }
}

async function sendMetaCapiEvent(req, payload) {
  const pixelId = process.env.META_PIXEL_ID || process.env.VITE_META_PIXEL_ID
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN
  if (!pixelId || !accessToken) {
    return { sent: false, reason: 'capi_not_configured' }
  }

  try {
    const forwardedFor = req.headers['x-forwarded-for']
    const clientIp = Array.isArray(forwardedFor)
      ? forwardedFor[0]
      : String(forwardedFor || '').split(',')[0].trim() || req.socket?.remoteAddress || undefined

    const phoneDigits = String(payload.phone || '').replace(/\D/g, '')
    const userData = {
      ...(payload.email ? { em: [sha256Hex(payload.email)] } : {}),
      ...(phoneDigits ? { ph: [sha256Hex(phoneDigits)] } : {}),
      ...(payload.first_name ? { fn: [sha256Hex(payload.first_name)] } : {}),
      ...(payload.last_name ? { ln: [sha256Hex(payload.last_name)] } : {}),
      ...(payload.external_id ? { external_id: [sha256Hex(payload.external_id)] } : {}),
      ...(payload.fbp ? { fbp: payload.fbp } : {}),
      ...(payload.fbc ? { fbc: payload.fbc } : {}),
      ...(clientIp ? { client_ip_address: clientIp } : {}),
      ...(req.headers['user-agent'] ? { client_user_agent: req.headers['user-agent'] } : {}),
    }

    const customData = {
      currency: payload.currency || 'USD',
      ...(typeof payload.value === 'number' ? { value: payload.value } : {}),
      ...(payload.content_name ? { content_name: payload.content_name } : {}),
      ...(Array.isArray(payload.content_ids) ? { content_ids: payload.content_ids } : {}),
      content_type: 'product',
    }

    const eventBody = {
      data: [
        {
          event_name: payload.event_name || 'Lead',
          event_time: Math.floor(Date.now() / 1000),
          event_id: payload.event_id || crypto.randomUUID(),
          action_source: 'website',
          event_source_url: payload.event_source_url || `${PROJECT_DOMAIN}/offer`,
          user_data: userData,
          custom_data: customData,
        },
      ],
    }

    const fbRes = await fetch(
      `https://graph.facebook.com/v21.0/${encodeURIComponent(pixelId)}/events?access_token=${encodeURIComponent(accessToken)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventBody),
      }
    )
    const fbData = await fbRes.json().catch(() => ({}))
    return { sent: fbRes.ok, status: fbRes.status, response: fbData }
  } catch (err) {
    return { sent: false, error: err?.message }
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  try {
    if (req.method === 'GET') {
      const action = req.query.action || 'catalog'

      if (action === 'catalog') {
        return res.status(200).json({
          success: true,
          stripe_ready: Boolean(process.env.STRIPE_SECRET_KEY),
          capi_ready: Boolean(
            (process.env.META_PIXEL_ID || process.env.VITE_META_PIXEL_ID) && process.env.META_CAPI_ACCESS_TOKEN
          ),
          catalog: OFFER_CATALOG,
        })
      }

      if (action === 'verify') {
        const sessionId = String(req.query.session_id || '').trim()
        const batchIdQuery = String(req.query.batch_id || '').trim()
        const stripeKey = process.env.STRIPE_SECRET_KEY

        if (!sessionId) {
          return res.status(400).json({ success: false, error: 'Missing session_id' })
        }

        if (!stripeKey) {
          return res.status(200).json({
            success: true,
            verified: false,
            stripe_ready: false,
            message: 'Stripe verification awaits STRIPE_SECRET_KEY in Vercel environment variables.',
          })
        }

        const stripeRes = await fetch(
          `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${stripeKey}`,
            },
          }
        )
        const sessionData = await stripeRes.json()
        if (!stripeRes.ok) {
          return res.status(400).json({
            success: false,
            verified: false,
            error: sessionData?.error?.message || 'Unable to verify checkout session',
          })
        }

        const paid =
          sessionData.payment_status === 'paid' ||
          sessionData.payment_status === 'no_payment_required' ||
          sessionData.status === 'complete'

        const meta = sessionData.metadata || {}
        const offerId = meta.offer_id || 'audit_99'
        const offer = OFFER_CATALOG[offerId] || OFFER_CATALOG.audit_99
        const amountUsd =
          typeof sessionData.amount_total === 'number' ? sessionData.amount_total / 100 : offer.priceUsd

        const batchToCancel = batchIdQuery || meta.abandon_batch_id
        if (paid && batchToCancel) {
          await cancelBrevoBatch(batchToCancel)
        }

        const customerEmail =
          sessionData.customer_details?.email || sessionData.customer_email || meta.email || ''
        const customerName =
          sessionData.customer_details?.name || meta.name || customerEmail || 'Verified Buyer'
        const customerPhone = sessionData.customer_details?.phone || meta.phone || ''

        if (paid && customerEmail) {
          await saveLeadRecord({
            name: customerName,
            email: customerEmail,
            phone: customerPhone,
            company: meta.company || '',
            offerId,
            status: 'converted_paid',
            source: meta.attribution || 'Stripe Checkout Verified',
            notes: `Stripe Session ${sessionId} PAID ($${amountUsd} USD). Ref: ${meta.ref_code || 'none'}`,
          })

          const brevoKey = process.env.BREVO_API_KEY
          if (brevoKey) {
            const sender = await resolveVerifiedBrevoSender(brevoKey)
            await fetch('https://api.brevo.com/v3/smtp/email', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'api-key': brevoKey,
              },
              body: JSON.stringify({
                sender,
                to: [{ email: FOUNDER_EMAIL, name: 'Jasmel Acosta' }],
                replyTo: { email: customerEmail, name: customerName },
                subject: `STRIPE SALE VERIFIED ($${amountUsd}) — ${customerName} (${offer.title})`,
                htmlContent: buildFounderFastActionAlertHtml({
                  badge: `STRIPE PAYMENT VERIFIED · $${amountUsd} USD`,
                  headline: offer.title,
                  name: customerName,
                  phone: customerPhone,
                  email: customerEmail,
                  company: meta.company || '',
                  mode: 'Stripe Checkout Paid',
                  topic: `${offer.id} · Attribution: ${meta.attribution || 'direct'}`,
                  detailRows: [
                    ['Amount Collected', `$${amountUsd} USD`],
                    ['Stripe Session ID', sessionId],
                    ['Referral Code', meta.ref_code || 'None'],
                  ],
                }),
              }),
            }).catch(() => {})
          }
        }

        return res.status(200).json({
          success: true,
          verified: paid,
          paid,
          session: {
            id: sessionData.id,
            amount_usd: amountUsd,
            currency: (sessionData.currency || 'usd').toUpperCase(),
            customer_email: customerEmail,
            customer_name: customerName,
            offer_id: offer.id,
            offer_title: offer.title,
            ref_code: meta.ref_code || '',
            mode: sessionData.mode || offer.stripeMode,
          },
        })
      }

      return res.status(400).json({ success: false, error: 'Unsupported action' })
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ success: false, error: 'Method not allowed' })
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
    const action = body.action || 'create_checkout'

    if (action === 'capi') {
      const result = await sendMetaCapiEvent(req, body)
      return res.status(200).json({ success: true, ...result })
    }

    if (action === 'cancel_abandon') {
      const cancelled = await cancelBrevoBatch(body.batch_id)
      return res.status(200).json({ success: true, cancelled })
    }

    const offer = OFFER_CATALOG[body.offer_id] || OFFER_CATALOG.audit_99
    const origin = getRequestOrigin(req)
    const email = String(body.email || '').trim().toLowerCase()
    const name = String(body.name || '').trim() || email.split('@')[0] || 'Executive'
    const phone = String(body.phone || '').trim()
    const company = String(body.company || '').trim()
    const attributionSummary = String(body.attribution_summary || body.source || 'direct').trim()
    const refCode = String(body.ref_code || '').trim()
    const isEs = body.lang === 'es' || offer.lang === 'es'

    if (action === 'abandon_step1') {
      if (!email) {
        return res.status(400).json({ success: false, error: 'Email is required for Step 1' })
      }

      await saveLeadRecord({
        name,
        email,
        phone,
        company,
        offerId: offer.id,
        status: 'checkout_step1_abandoned_armed',
        source: `Offer Funnel Step 1 [${attributionSummary}]`,
        notes: `15-min abandoned checkout armed for ${offer.title} ($${offer.priceUsd}). Ref: ${refCode || 'none'}`,
      })

      await upsertBrevoContact({
        email,
        name,
        phone,
        company,
        offerId: offer.id,
        segment: offer.segment,
      })

      let batchId = null
      let scheduledAt = null
      const brevoKey = process.env.BREVO_API_KEY
      if (brevoKey) {
        batchId = crypto.randomUUID()
        scheduledAt = new Date(Date.now() + 15 * 60 * 1000).toISOString()
        const sender = await resolveVerifiedBrevoSender(brevoKey)
        const firstName = name.split(/\s+/)[0] || name
        const resumeUrl = `${origin}/offer?offer=${encodeURIComponent(offer.id)}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&lang=${isEs ? 'es' : 'en'}&utm_source=brevo&utm_medium=abandon_recovery&utm_campaign=15min_step1_recovery`

        const extraBoxHtml = `
          <div style="margin:20px 0;padding:18px 20px;border:1px solid #d4af37;border-radius:12px;background:#111318;color:#f8fafc;">
            <p style="margin:0 0 8px;font-size:12px;letter-spacing:1.2px;text-transform:uppercase;color:#d4af37;font-weight:700;">
              ${isEs ? 'TU RESERVA PRIORITARIA SIGUE ACTIVA' : 'YOUR PRIORITY SLOT IS STILL HELD'}
            </p>
            <p style="margin:0 0 10px;font-size:16px;font-weight:700;color:#ffffff;">
              ${isEs ? offer.titleEs : offer.title} — $${offer.priceUsd} USD${offer.interval ? '/mo' : ''}
            </p>
            <p style="margin:0 0 14px;font-size:13px;color:#cbd5e1;line-height:1.5;">
              ${isEs ? offer.guaranteeEs : offer.guarantee}
            </p>
            <a href="${resumeUrl}" style="display:inline-block;padding:12px 22px;background:#d4af37;color:#0b0c10;font-weight:800;font-size:13px;border-radius:8px;text-decoration:none;">
              ${isEs ? 'Completar Activación Ahora ->' : 'Complete Your Priority Checkout ->'}
            </a>
          </div>
        `

        const htmlContent = buildDirectConnectHubLetter({
          firstName,
          emailParam: email,
          segment: offer.segment,
          utmCampaign: '15min_step1_recovery',
          openingPara1: isEs
            ? `Notamos que iniciaste el paso 1 para ${offer.titleEs} pero cerraste antes de confirmar tu espacio de ingeniería.`
            : `We noticed you completed Step 1 for ${offer.title} but paused before locking in your engineering slot.`,
          openingPara2: isEs
            ? `Como ya ingresaste tus datos, dejamos tu enlace prioritario abierto junto con acceso directo con Jasmel Acosta en Miami por llamada, WhatsApp o videollamada sin costo adicional.`
            : `Because you already started your request, we kept your priority checkout link open below along with direct access to Jasmel Acosta in Miami via phone, WhatsApp, or instant video call.`,
          extraBoxHtml,
          closingPara1: isEs
            ? `Si prefieres revisar tu flujo actual antes de pagar, responde este correo o agenda tu sesión directa en 1 clic.`
            : `Prefer to review your current workflow with our engineering lead before checking out? Reply to this email or launch our 1-click Direct Connect hub.`,
          closingPara2: isEs
            ? `Nos vemos del otro lado — AI Dynamic Pro (Miami ↔ LATAM).`
            : `Talk soon — AI Dynamic Pro Engineering (Miami, FL).`,
        })

        await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': brevoKey,
          },
          body: JSON.stringify({
            sender,
            to: [{ email, name }],
            subject: isEs
              ? `${firstName}, tu enlace prioritario para ${offer.titleEs} sigue reservado`
              : `${firstName}, your ${offer.title} slot is held (+ $0 guarantee)`,
            htmlContent,
            scheduledAt,
            batchId,
          }),
        }).catch((err) => {
          console.error('[checkout] Brevo scheduled email error:', err?.message)
        })
      }

      return res.status(200).json({
        success: true,
        batch_id: batchId,
        scheduled_at: scheduledAt,
      })
    }

    if (action === 'create_checkout') {
      if (!email) {
        return res.status(400).json({ success: false, error: 'Email is required to start checkout' })
      }

      const stripeKey = process.env.STRIPE_SECRET_KEY
      const abandonBatchId = String(body.abandon_batch_id || '').trim()

      await saveLeadRecord({
        name,
        email,
        phone,
        company,
        offerId: offer.id,
        status: stripeKey ? 'checkout_initiated' : 'priority_checkout_requested',
        source: `Paid Offer Page [${attributionSummary}]`,
        notes: `Initiated $${offer.priceUsd} ${offer.id}. Ref: ${refCode || 'none'}. Batch: ${abandonBatchId || 'none'}`,
      })

      await upsertBrevoContact({
        email,
        name,
        phone,
        company,
        offerId: offer.id,
        segment: offer.segment,
      })

      const brevoKey = process.env.BREVO_API_KEY
      if (brevoKey) {
        const sender = await resolveVerifiedBrevoSender(brevoKey)
        await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': brevoKey,
          },
          body: JSON.stringify({
            sender,
            to: [{ email: FOUNDER_EMAIL, name: 'Jasmel Acosta' }],
            replyTo: { email, name },
            subject: `HOT CHECKOUT ($${offer.priceUsd}) — ${name} (${company || offer.segment})`,
            htmlContent: buildFounderFastActionAlertHtml({
              badge: `HOT CHECKOUT · $${offer.priceUsd} USD`,
              headline: offer.title,
              name,
              phone,
              email,
              company,
              mode: stripeKey ? 'Stripe Session Launched' : 'Priority Booking Fallback',
              topic: `${offer.id} · Attribution: ${attributionSummary}`,
              detailRows: [
                ['Selected Tier', `${offer.title} ($${offer.priceUsd})`],
                ['Attribution', attributionSummary],
                ['Referral Code', refCode || 'None'],
              ],
            }),
          }),
        }).catch(() => {})
      }

      if (stripeKey) {
        const params = new URLSearchParams()
        params.append('mode', offer.stripeMode)
        params.append('payment_method_types[0]', 'card')
        params.append('customer_email', email)
        params.append('client_reference_id', `${offer.id}:${email}`)
        params.append('allow_promotion_codes', 'true')

        const priceEnvKey = `STRIPE_PRICE_${offer.id.toUpperCase()}`
        const configuredPriceId = process.env[priceEnvKey]

        if (configuredPriceId) {
          params.append('line_items[0][price]', configuredPriceId)
          params.append('line_items[0][quantity]', '1')
        } else {
          params.append('line_items[0][quantity]', '1')
          params.append('line_items[0][price_data][currency]', 'usd')
          params.append('line_items[0][price_data][unit_amount]', String(offer.cents))
          params.append('line_items[0][price_data][product_data][name]', isEs ? offer.titleEs : offer.title)
          params.append(
            'line_items[0][price_data][product_data][description]',
            isEs ? offer.guaranteeEs : offer.guarantee
          )
          if (offer.stripeMode === 'subscription') {
            params.append('line_items[0][price_data][recurring][interval]', offer.interval || 'month')
          }
        }

        const successUrl = `${origin}/success?session_id={CHECKOUT_SESSION_ID}&offer=${encodeURIComponent(offer.id)}&batch_id=${encodeURIComponent(abandonBatchId)}&lang=${isEs ? 'es' : 'en'}`
        const cancelUrl = `${origin}/offer?offer=${encodeURIComponent(offer.id)}&canceled=1&lang=${isEs ? 'es' : 'en'}`
        params.append('success_url', successUrl)
        params.append('cancel_url', cancelUrl)

        params.append('metadata[offer_id]', offer.id)
        params.append('metadata[name]', name)
        params.append('metadata[email]', email)
        params.append('metadata[phone]', phone)
        params.append('metadata[company]', company)
        params.append('metadata[attribution]', attributionSummary.slice(0, 450))
        params.append('metadata[ref_code]', refCode)
        params.append('metadata[abandon_batch_id]', abandonBatchId)

        const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${stripeKey}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params.toString(),
        })
        const stripeData = await stripeRes.json()
        if (!stripeRes.ok || !stripeData.url) {
          return res.status(400).json({
            success: false,
            error: stripeData?.error?.message || 'Unable to create Stripe Checkout session',
          })
        }

        return res.status(200).json({
          success: true,
          mode: 'stripe',
          checkout_url: stripeData.url,
          session_id: stripeData.id,
        })
      }

      const fallbackUrl = `${origin}/booking?intent=${encodeURIComponent(offer.id)}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&company=${encodeURIComponent(company)}&service=${encodeURIComponent(offer.bookingService)}&batch_id=${encodeURIComponent(abandonBatchId)}&ref=${encodeURIComponent(refCode)}`

      return res.status(200).json({
        success: true,
        mode: 'booking_fallback',
        fallback_url: fallbackUrl,
      })
    }

    return res.status(400).json({ success: false, error: 'Unsupported action' })
  } catch (err) {
    console.error('[checkout] Unhandled error:', err)
    return res.status(500).json({ success: false, error: err?.message || 'Internal checkout error' })
  }
}
