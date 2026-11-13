import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check, ArrowRight, Globe } from 'lucide-react'
import { AnalyticsEvents } from '../lib/analytics'

const Pricing = () => {
  const [regionMode, setRegionMode] = useState<'us' | 'latam'>('us')

  const usPlans = [
    {
      id: 'audit_99',
      name: '1. AI Consultation & Efficiency Audit',
      price: '$99',
      oldPrice: '$500',
      priceNote: 'or Free 15-Min Triage Call',
      badge: 'Zero-Risk Entry',
      duration: '60-Min Audit + ROI Blueprint',
      description:
        'Get in the door first: start with a Free 15-Min Triage Call or lock in our full 60-minute Department AI Audit to pinpoint manual payroll waste.',
      accentColor: 'green',
      isPopular: false,
      cta: 'Book $99 Audit (or Free 15m Call)',
      ctaAction: '/booking',
      subGuarantee: '$0 Risk Guarantee: Pay $0 unless we uncover $2,500+/mo ($30k/yr) in payroll savings',
      features: [
        'Department-by-department workflow & payroll review',
        'Identify 3+ manual tasks/roles to automate this week',
        'Includes Free 48-Hour Live AI Voice/Workflow Prototype',
        '100% of $99 credited toward any build or training',
        'Guaranteed $2,500+/mo in found savings or you pay $0',
      ],
    },
    {
      id: 'training_497',
      name: '2. Corporate AI Staff Bootcamp',
      price: '$497',
      oldPrice: '$1,500',
      priceNote: 'half-day team workshop',
      badge: 'Fastest Team ROI',
      duration: '1 Employee = 5x Output',
      description:
        'Don’t hire more headcount. We train your existing staff in 1 afternoon on role-specific AI workflows so 1 employee produces the output of 5.',
      accentColor: 'amber',
      isPopular: false,
      cta: 'Book $497 Team AI Bootcamp',
      ctaAction: '/booking',
      subGuarantee: 'On-site in South Florida or Live Virtual • Up to 15 staff members included',
      features: [
        'Hands-on Corporate AI Workshop (English & Spanish)',
        'Role-specific AI SOPs for Admin, Sales, Ops & Billing',
        'Cut daily administrative busywork by 60% immediately',
        'Enterprise data privacy & security guardrails',
        'Custom prompt library & AI workflow templates for your team',
      ],
    },
    {
      id: 'turnkey_997',
      name: '3. Custom AI Solution & 24/7 Agent',
      price: '$997',
      oldPrice: '$2,500',
      priceNote: 'turnkey (or $297/mo managed)',
      badge: '★ Most Popular',
      duration: '14-Day Turnkey Launch',
      description:
        'We engineer and deploy your custom 24/7 bilingual AI voice/chat receptionist (JAss) or automated back-office workflow so you cut overhead immediately.',
      accentColor: 'blue',
      isPopular: true,
      cta: 'Deploy Custom AI Solution',
      ctaAction: '/booking',
      subGuarantee: 'Flexible Payment: $997 one-time turnkey build OR $297/mo all-inclusive managed AI',
      features: [
        '24/7 Bilingual AI Voice & Web Receptionist (JAss)',
        'Or 1 high-impact automated intake / CRM / billing workflow',
        'Direct integration with your Calendar, CRM, EHR, or ERP',
        'Eliminate missed calls, voicemail & manual data entry',
        '14-day production launch + 30 days engineering support',
        'Includes live staff handoff & onboarding session',
      ],
    },
    {
      id: 'enterprise_4900',
      name: '4. Full Enterprise AI Transformation',
      price: '$4,900',
      oldPrice: '',
      priceNote: '– $15,000 custom architecture',
      badge: 'Full Automation',
      duration: 'Multi-Department Scale',
      description:
        'Complete company-wide automation: custom AI software, computer vision, autonomous multi-agent pipelines, and full workforce transformation.',
      accentColor: 'purple',
      isPopular: false,
      cta: 'Book Executive Strategy Call',
      ctaAction: '/booking',
      subGuarantee: '70% more affordable & 4x faster than traditional $25k+ consulting agencies',
      features: [
        'Multi-department custom AI apps & full automation',
        'Computer Vision, 3D Spatial AI, or Custom LLM/RAG systems',
        'Full Corporate AI Staff Training Bootcamp included FREE',
        'Enterprise HIPAA / SOC2-aligned security architecture',
        'Scale company revenue without adding payroll bloat',
        'Dedicated AI Systems Architect & monthly ROI reviews',
      ],
    },
  ]

  const latamPlans = [
    {
      id: 'latam_medicos_29',
      name: '1. Médicos, Clínicas y Odontología',
      price: '$29',
      oldPrice: '$79',
      priceNote: 'USD / mes (SaaS Autogestionado)',
      badge: 'Salud & Clínicas',
      duration: 'PocketScribe + WhatsApp',
      description:
        'Escriba médico ambiental en español latino (notas clínicas SOAP en 8 segundos) y recepcionista automática de turnos por WhatsApp 24/7.',
      accentColor: 'green',
      isPopular: false,
      cta: 'Activar Plan Médicos ($29/mes)',
      ctaAction: '/connect?mode=virtual&segment=latam_medicos_29',
      subGuarantee: '≈ $28.000 CLP · $125.000 COP • Sin contratos forzosos',
      features: [
        'Escriba Médico Ambiental en Español (Notas SOAP + CIE-10 / ICD-10)',
        'Recepcionista WhatsApp 24/7: agenda y confirma citas (-65% inasistencias)',
        'Resúmenes post-consulta y órdenes médicas en segundos',
        'Acceso directo a PocketScribe.online en español e inglés',
        'Privacidad clínica cifrada para consultorios en Sudamérica',
      ],
    },
    {
      id: 'latam_abogados_49',
      name: '2. Abogados e Inmobiliarias',
      price: '$49',
      oldPrice: '$119',
      priceNote: 'USD / mes (Voz + WhatsApp IA)',
      badge: '★ Más Elegido LATAM',
      duration: 'JAss Legal & RealEstateDates',
      description:
        'Recepcionista IA 24/7 (Sofía / JAss en español latino) que califica clientes en 3 segundos, audita contratos y controla plazos críticos.',
      accentColor: 'blue',
      isPopular: true,
      cta: 'Activar Plan Legal / Inmobiliario ($49)',
      ctaAction: '/connect?mode=virtual&segment=latam_abogados_49',
      subGuarantee: '≈ $47.000 CLP · $210.000 COP • Incluye RealEstateDates.com',
      features: [
        'Agente de Voz y WhatsApp IA 24/7 en español neutro y latinoamericano',
        'Calificación de prospectos en 3 segundos y agenda en Google Calendar',
        'Auditoría de contratos, promesas y escrituras con IA privada (Zero-Training RAG)',
        'Control automático de plazos legales, arras y cierres inmobiliarios',
        'Integración inmediata con WhatsApp Business y CRM del estudio',
      ],
    },
    {
      id: 'latam_arquitectos_69',
      name: '3. Arquitectos, Diseñadores y Constructoras',
      price: '$69',
      oldPrice: '$149',
      priceNote: 'USD / mes (Visión AEC & Planos)',
      badge: 'Arquitectura & AEC',
      duration: 'Cómputos + Visión 3D',
      description:
        'Cómputos métricos y presupuestos de obra asistidos por IA desde planos PDF/CAD, mapeo espacial 3D y detección visual de defectos en obra.',
      accentColor: 'amber',
      isPopular: false,
      cta: 'Activar Plan Arquitectos & AEC ($69)',
      ctaAction: '/connect?mode=virtual&segment=latam_arquitectos_69',
      subGuarantee: '≈ $66.000 CLP · $295.000 COP • Incluye ChatBuildingInnovation.us',
      features: [
        'Asistente IA de Cómputos Métricos y Presupuestos desde planos PDF/CAD',
        'Mapeo espacial 3D e inspección de fisuras, humedad y defectos por foto/video',
        'Cotizador rápido de remodelaciones, diseño interior y arquitectura modular',
        'Atención automática 24/7 a clientes y proveedores por WhatsApp',
        'Exportación de presupuestos a Excel / CSV con marca de tu estudio',
      ],
    },
    {
      id: 'latam_bootcamp_199',
      name: '4. Auditoría + Bootcamp PyME LATAM',
      price: '$199',
      oldPrice: '$497',
      priceNote: 'USD pago único (Equipo completo)',
      badge: '1 Empleado = 5x',
      duration: 'Prototipo 48h + Taller',
      description:
        'Auditamos tu empresa y capacitamos a tu equipo en 1 tarde en español (hasta 15 personas) con flujos IA para multiplicar su productividad por 5.',
      accentColor: 'purple',
      isPopular: false,
      cta: 'Agendar Auditoría + Bootcamp ($199)',
      ctaAction: '/connect?mode=virtual&segment=latam_bootcamp_199',
      subGuarantee: 'Garantía: encontramos $1,500+ USD/mes en ahorro o devolvemos el 100%',
      features: [
        'Auditoría de procesos (60 min) + Prototipo IA funcional en 48 horas',
        'Bootcamp práctico en español en vivo (hasta 15 colaboradores)',
        'Plantillas y agentes listos para Ventas, Administración y Cobranzas',
        '100% acreditable a desarrollos llave en mano de software o apps',
        'Soporte directo con ingeniería bilingüe Miami ↔ Sudamérica',
      ],
    },
  ]

  const plans = regionMode === 'us' ? usPlans : latamPlans

  const accentStyles: Record<string, { border: string; bg: string; badgeBg: string; badgeText: string; dot: string }> = {
    green: {
      border: 'border-emerald-400/30',
      bg: 'bg-emerald-400/5',
      badgeBg: 'bg-emerald-400',
      badgeText: 'text-dark',
      dot: 'text-emerald-400',
    },
    amber: {
      border: 'border-amber-400/30',
      bg: 'bg-amber-400/5',
      badgeBg: 'bg-amber-400',
      badgeText: 'text-dark',
      dot: 'text-amber-400',
    },
    blue: {
      border: 'border-sky-400/30',
      bg: 'bg-sky-400/5',
      badgeBg: 'bg-sky-400',
      badgeText: 'text-dark',
      dot: 'text-sky-400',
    },
    purple: {
      border: 'border-purple-400/30',
      bg: 'bg-purple-400/5',
      badgeBg: 'bg-purple-400',
      badgeText: 'text-dark',
      dot: 'text-purple-400',
    },
  }

  return (
    <section id="pricing" className="section-padding relative overflow-hidden bg-gradient-to-b from-dark via-dark-50 to-dark">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(201,169,110,0.8) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-luxury-gold/30 bg-luxury-gold/5 text-luxury-gold text-xs uppercase tracking-[0.2em] font-medium mb-5">
            {regionMode === 'us'
              ? 'Transparent ROI-First Pricing • 60% Below Traditional Agencies'
              : 'Tarifas Localizadas para Sudamérica y Latinoamérica • Sin Contratos Forzosos'}
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-5 font-serif">
            {regionMode === 'us' ? (
              <>
                <span className="text-white">Cut Costs First. </span>
                <span className="text-luxury-gold">Scale With Zero Risk.</span>
              </>
            ) : (
              <>
                <span className="text-white">Planes Cloud SaaS LATAM </span>
                <span className="text-luxury-gold">($29 – $69 USD/mes)</span>
              </>
            )}
          </h2>
          <p className="text-base sm:text-xl text-luxury-silver max-w-3xl mx-auto mb-7">
            {regionMode === 'us' ? (
              <>
                Start with a <strong className="text-white">Free 15-Minute Triage Call</strong> or our <strong className="text-luxury-gold">$99 Efficiency Audit</strong> (guaranteed to uncover <strong className="text-emerald-400">$2,500+/mo in payroll savings</strong> or you pay $0).
              </>
            ) : (
              <>
                Suscripciones SaaS en español para <strong className="text-white">Médicos ($29/mes)</strong>, <strong className="text-luxury-gold">Abogados e Inmobiliarias ($49/mes)</strong> y <strong className="text-emerald-400">Arquitectos / Constructoras ($69/mes)</strong> en Chile, Colombia, Perú, Argentina, México y Venezuela.
              </>
            )}
          </p>

          {/* Market / Region Pricing Switcher (US Enterprise vs. LATAM Spanish SaaS) */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-black/70 border border-white/15 backdrop-blur-xl">
            <button
              type="button"
              onClick={() => setRegionMode('us')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all ${
                regionMode === 'us'
                  ? 'bg-luxury-gold text-dark shadow-lg'
                  : 'text-luxury-silver hover:text-white'
              }`}
            >
              🇺🇸 US &amp; Global Enterprise ($99 Audit / $497 Bootcamp / $997 Turnkey)
            </button>
            <button
              type="button"
              onClick={() => setRegionMode('latam')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all flex items-center gap-1.5 ${
                regionMode === 'latam'
                  ? 'bg-emerald-400 text-dark shadow-lg'
                  : 'text-emerald-300 hover:text-white bg-emerald-500/10 border border-emerald-500/25'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>🌎 LATAM &amp; Sudamérica SaaS en Español ($29–$69/mes)</span>
            </button>
            <Link
              to="/latam"
              className="px-3.5 py-2.5 rounded-xl text-xs font-mono text-luxury-champagne hover:text-luxury-gold border border-white/10 hover:border-luxury-gold/40 transition-all"
            >
              Abrir Portal /latam ↗
            </Link>
          </div>
        </motion.div>

        {/* Pricing Cards (4 Tiers) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan, index) => {
            const isPopular = plan.isPopular
            const accent = accentStyles[plan.accentColor]
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl flex flex-col justify-between p-6 sm:p-7 transition-all duration-300 ${
                  isPopular
                    ? 'border-2 border-luxury-gold/70 bg-gradient-to-b from-luxury-gold/[0.10] via-dark-50 to-dark shadow-[0_0_40px_rgba(201,169,110,0.18)] xl:-translate-y-2'
                    : `border ${accent.border} ${accent.bg} hover:border-luxury-gold/30`
                }`}
              >
                {/* Top Badge */}
                <div className="absolute -top-3.5 left-6 right-6 flex items-center justify-between gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-lg ${
                      isPopular
                        ? 'bg-gradient-to-r from-luxury-gold to-amber-500 text-dark'
                        : `${accent.badgeBg} ${accent.badgeText}`
                    }`}
                  >
                    {plan.badge}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-black/80 border border-white/15 text-[10px] font-mono text-luxury-silver">
                    {plan.duration}
                  </span>
                </div>

                <div>
                  {/* Plan Name */}
                  <h3 className="text-xl font-bold text-white mb-2 mt-2 font-serif leading-snug">{plan.name}</h3>
                  <p className="text-luxury-silver text-xs sm:text-sm mb-5 leading-relaxed">{plan.description}</p>

                  {/* Price Block */}
                  <div className="mb-6 p-4 rounded-xl bg-black/40 border border-white/10">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      {plan.oldPrice && (
                        <span className="text-lg text-luxury-silver/50 line-through font-semibold">
                          {plan.oldPrice}
                        </span>
                      )}
                      <span className={`text-4xl font-extrabold ${isPopular ? 'text-luxury-gold' : 'text-white'}`}>
                        {plan.price}
                      </span>
                      <span className="text-xs text-luxury-champagne font-medium">{plan.priceNote}</span>
                    </div>
                    <p className="text-[11px] text-emerald-400 mt-2 font-medium leading-snug">
                      {plan.subGuarantee}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <a
                    href={plan.ctaAction}
                    onClick={() => AnalyticsEvents.clickBooking(plan.name, 'pricing_card')}
                    className={`w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm transition-all mb-6 shadow-md ${
                      isPopular
                        ? 'btn-primary'
                        : `border ${accent.border} ${accent.bg} hover:bg-luxury-gold/15 text-white hover:border-luxury-gold/50`
                    }`}
                  >
                    <span>{plan.cta}</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </a>

                  {/* Features */}
                  <ul className="space-y-2.5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check
                          className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                            isPopular ? 'text-luxury-gold' : accent.dot
                          }`}
                        />
                        <span className="text-luxury-champagne text-xs leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Fast-Entry Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-black/80 via-dark-50 to-black/80 border border-luxury-gold/30 flex flex-col lg:flex-row items-center justify-between gap-6"
        >
          <div className="text-left max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1">
              ⚡ FASTEST WAY TO TEST US BEFORE PAYING A DIME
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
              Want to see a live AI prototype for your company first?
            </h3>
            <p className="text-sm text-luxury-silver mt-1">
              Book a <strong className="text-white">Free 15-Minute Executive Triage Call</strong>—we’ll show you 3 workflows you can automate immediately and configure a live 48-hour AI Voice/Chat demo for your team.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="/booking"
              onClick={() => AnalyticsEvents.clickBooking('discovery_consultation', 'pricing_bottom_cta')}
              className="btn-primary inline-flex items-center gap-2 text-sm px-6 py-4"
            >
              <span>Book Free 15-Min Triage or $99 Audit</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricing
