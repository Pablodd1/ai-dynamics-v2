import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ExternalLink,
  Globe,
  Layers,
  Lock,
  PhoneCall,
  Play,
  Scale,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
  Volume2,
} from 'lucide-react'

interface LatamPlan {
  id: string
  badge: string
  sector: string
  name: string
  price: string
  period: string
  localEstimate: string
  description: string
  icon: typeof Stethoscope
  accent: string
  popular?: boolean
  liveAppUrl: string
  liveAppLabel: string
  ctaText: string
  ctaLink: string
  features: string[]
}

const LATAM_PLANS: LatamPlan[] = [
  {
    id: 'latam_medicos_29',
    badge: 'SALUD & CLÍNICAS',
    sector: 'Médicos, Odontólogos y Centros Estéticos',
    name: 'Plan Clínico & Escriba IA',
    price: '$29',
    period: 'USD / mes',
    localEstimate: '≈ $28.000 CLP · $125.000 COP · S/ 109 PEN',
    description:
      'Elimina el tipeo clínico y las inasistencias de pacientes. Escriba médico ambiental en español latino + recepcionista automática por WhatsApp 24/7.',
    icon: Stethoscope,
    accent: 'emerald',
    liveAppUrl: 'https://www.pocketscribe.online',
    liveAppLabel: 'Probar PocketScribe.online en Vivo ↗',
    ctaText: 'Activar Plan Médicos ($29/mes)',
    ctaLink: '/connect?mode=virtual&segment=latam_medicos_29',
    features: [
      'Escriba Médico Ambiental en Español (Notas clínicas SOAP en 8 seg)',
      'Sugerencia automática de códigos CIE-10 / ICD-10 y resúmenes de consulta',
      'Recepcionista WhatsApp 24/7: agendamiento y confirmación de turnos (-65% ausentismo)',
      'Triaje previo de síntomas y envío automático de indicaciones post-consulta',
      'Privacidad clínica cifrada (estándar HIPAA / Ley de Datos Personales LATAM)',
    ],
  },
  {
    id: 'latam_abogados_49',
    badge: '★ MÁS ELEGIDO EN SUDAMÉRICA',
    sector: 'Abogados, Estudios Jurídicos y Corredoras Inmobiliarias',
    name: 'Plan Legal & Inmobiliario 24/7',
    price: '$49',
    period: 'USD / mes',
    localEstimate: '≈ $47.000 CLP · $210.000 COP · S/ 185 PEN',
    description:
      'Califica prospectos legales e inmobiliarios en 3 segundos por teléfono y WhatsApp, audita contratos con IA privada y controla plazos críticos.',
    icon: Scale,
    accent: 'gold',
    popular: true,
    liveAppUrl: 'https://www.realestatedates.com',
    liveAppLabel: 'Probar RealEstateDates.com en Vivo ↗',
    ctaText: 'Activar Plan Legal / Inmobiliario ($49/mes)',
    ctaLink: '/connect?mode=virtual&segment=latam_abogados_49',
    features: [
      'Agente de Voz y WhatsApp IA 24/7 (Sofía / JAss en español neutro y latino)',
      'Calificación de clientes en 3 segundos y agenda directa en Google Calendar',
      'Revisión y resumen de contratos, escrituras y promesas (RAG Privado sin entrenamiento externo)',
      'Calculadora y alertas automáticas de plazos legales, arras y cierres inmobiliarios',
      'Integración directa con CRM, WhatsApp Business y correo del estudio',
    ],
  },
  {
    id: 'latam_arquitectos_69',
    badge: 'ARQUITECTURA, DISEÑO & AEC',
    sector: 'Arquitectos, Diseñadores, Ingenieros y Constructoras',
    name: 'Plan Visión Espacial & Cómputos IA',
    price: '$69',
    period: 'USD / mes',
    localEstimate: '≈ $66.000 CLP · $295.000 COP · S/ 260 PEN',
    description:
      'Acelera presupuestos de obra, cómputos métricos desde planos PDF/CAD y control de calidad visual en obra mediante visión por computadora.',
    icon: Building2,
    accent: 'sky',
    liveAppUrl: 'https://www.chatbuildinginnovation.us',
    liveAppLabel: 'Probar ChatBuildingInnovation.us en Vivo ↗',
    ctaText: 'Activar Plan Arquitectos & AEC ($69/mes)',
    ctaLink: '/connect?mode=virtual&segment=latam_arquitectos_69',
    features: [
      'Asistente IA de Cómputos Métricos y Presupuestos desde planos PDF/CAD',
      'Mapeo espacial 3D e inspección visual de fisuras, humedad y defectos en obra',
      'Cotizador automático de remodelaciones, mobiliario y arquitectura modular',
      'Atención automática 24/7 a clientes y proveedores por WhatsApp y Web',
      'Exportación estructurada a Excel / CSV y reportes técnicos para clientes',
    ],
  },
  {
    id: 'latam_bootcamp_199',
    badge: 'PYMES & EQUIPOS CORPORATIVOS',
    sector: 'Empresas, Clínicas y Estudios de 5 a 50 Personas',
    name: 'Auditoría + Bootcamp IA In-Company',
    price: '$199',
    period: 'USD pago único',
    localEstimate: 'Incluye prototipo funcional en 48 horas + taller en vivo',
    description:
      'Auditamos tus cuellos de botella operativos y entrenamos a tu equipo en 1 tarde en español para que 1 colaborador produzca el resultado de 5.',
    icon: Users,
    accent: 'purple',
    liveAppUrl: 'https://www.aidynamic.pro/projects',
    liveAppLabel: 'Explorar los 21 Sistemas en Producción ↗',
    ctaText: 'Agendar Auditoría + Bootcamp ($199)',
    ctaLink: '/connect?mode=virtual&segment=latam_bootcamp_199',
    features: [
      'Auditoría ejecutiva de 60 min + Prototipo IA personalizado en 48 horas',
      'Taller práctico de medio día en español (hasta 15 integrantes del equipo)',
      'Flujos de trabajo IA listos para Administración, Ventas, Cobranzas y Operaciones',
      'Garantía de ROI: identificamos $1,500+ USD/mes en ahorro operativo o te devolvemos el 100%',
      '100% del valor abonado se acredita si contratas una implementación llave en mano',
    ],
  },
]

const LATAM_COUNTRIES = [
  { flag: '🇨🇱', name: 'Chile', hub: 'Santiago · Valparaíso · Concepción (Ecosistema Start-Up Chile / CORFO)' },
  { flag: '🇨🇴', name: 'Colombia', hub: 'Bogotá · Medellín · Cali (Ruta N / Apps.co / Cámaras de Comercio)' },
  { flag: '🇵🇪', name: 'Perú', hub: 'Lima · Arequipa (ProInnóvate / Clínicas y Estudios Jurídicos)' },
  { flag: '🇦🇷', name: 'Argentina', hub: 'Buenos Aires · Córdoba · Mendoza (Polos Tecnológicos & AEC)' },
  { flag: '🇲🇽', name: 'México', hub: 'CDMX · Monterrey · Guadalajara (PyMEs, Salud & Inmobiliarias)' },
  { flag: '🇻🇪', name: 'Venezuela y Caribe', hub: 'Caracas · Valencia · Panamá · República Dominicana · Miami Hub' },
]

export default function LatamSaaS() {
  const [isPlayingEs, setIsPlayingEs] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const toggleSpanishVoiceDemo = () => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio('/audio/sofia_services_es.mp3')
        audioRef.current.onended = () => setIsPlayingEs(false)
      }
      if (isPlayingEs) {
        audioRef.current.pause()
        setIsPlayingEs(false)
      } else {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch(() => {})
        setIsPlayingEs(true)
      }
    } catch {
      // ignore autoplay block
    }
  }

  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">
      <SEO
        title="IA para Médicos, Abogados y Arquitectos en Latinoamérica ($29–$69/mes) | AI Dynamic Pro LATAM"
        description="Plataforma SaaS de Inteligencia Artificial en español para Sudamérica y Latinoamérica (Chile, Colombia, Perú, Argentina, México): Escriba Médico IA ($29/mes), Recepcionista IA Legal e Inmobiliaria ($49/mes) y Visión Computacional para Arquitectos y Constructoras ($69/mes)."
        canonical="https://www.aidynamic.pro/latam"
      />
      <Navigation />

      <main className="pt-28 pb-24">
        {/* Top Institutional & Cross-Border Hub Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="rounded-2xl border border-luxury-gold/35 bg-gradient-to-r from-luxury-gold/10 via-[#0d101b] to-emerald-500/10 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-xs font-mono text-luxury-champagne">
              <Globe className="w-4 h-4 text-luxury-gold shrink-0" />
              <span>
                <strong>PUENTE TECNOLÓGICO MIAMI ↔ SUDAMÉRICA:</strong> 21 Sistemas IA en Producción (TRL-9) • Español Latino Nativo
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-300">
                ✓ Precios Localizados LATAM ($29–$69 USD/mes)
              </span>
              <Link
                to="/"
                className="px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white transition-colors"
              >
                🇺🇸 Switch to US Enterprise Pricing →
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-luxury-gold/30 bg-luxury-gold/10 text-luxury-gold text-xs font-mono uppercase tracking-wider mb-5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>División Sudamérica &amp; Latinoamérica • SaaS Autogestionado</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.08] mb-5">
                Inteligencia Artificial en Español para{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold via-amber-200 to-emerald-300">
                  Médicos, Abogados y Arquitectos
                </span>{' '}
                en Latinoamérica
              </h1>

              <p className="text-base sm:text-lg text-luxury-silver leading-relaxed mb-7 max-w-2xl">
                Desplegamos nuestras <strong className="text-white">21 arquitecturas de Inteligencia Artificial en producción</strong> con planes SaaS accesibles desde <strong className="text-luxury-gold">$29 a $69 USD/mes</strong> para profesionales, clínicas, estudios jurídicos, inmobiliarias y constructoras en <strong className="text-white">Chile, Colombia, Perú, Argentina, México y toda Sudamérica</strong>.
              </p>

              {/* CTA & Live Spanish Audio Demo */}
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 mb-7">
                <Link
                  to="/connect?mode=virtual&segment=latam_saas"
                  className="btn-primary py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(212,175,55,0.25)]"
                >
                  <span>Activar Prueba o Consulta Gratis de 15 Min</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={toggleSpanishVoiceDemo}
                  className={`px-5 py-3.5 rounded-xl border font-semibold text-sm flex items-center justify-center gap-2.5 transition-all ${
                    isPlayingEs
                      ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200'
                      : 'border-red-500/45 bg-black/80 hover:bg-red-500/15 text-white'
                  }`}
                >
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center">
                    {isPlayingEs ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <Play className="w-3 h-3 fill-current ml-0.5" />}
                  </span>
                  <span>
                    {isPlayingEs
                      ? 'Reproduciendo Voz IA Sofía (Pausar)'
                      : '🔊 Escuchar Demo de Voz IA en Español (Sofía)'}
                  </span>
                </button>
              </div>

              {/* Trust Pills */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sin Contratos Forzosos • Cancela Cuando Quieras</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-sky-300 bg-sky-500/10 border border-sky-500/30 px-3 py-1 rounded-full">
                  <Lock className="w-3.5 h-3.5 text-sky-400" />
                  <span>IA Privada Zero-Training (Tus Datos Nunca Entrenan Modelos Públicos)</span>
                </span>
              </div>
            </div>

            {/* Right Card: Why LATAM Professionals Choose AI Dynamic Pro */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-luxury-gold/35 bg-[#0b0d16]/90 p-6 sm:p-7 shadow-2xl">
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-luxury-gold font-bold">
                      IMPACTO MEDIBLE EN SUDAMÉRICA
                    </div>
                    <div className="text-sm text-white font-semibold mt-0.5">
                      Productividad 5x Desde el Primer Día
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono font-bold">
                    ● 24/7 EN VIVO
                  </span>
                </div>

                <div className="space-y-3.5 mb-6">
                  <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-emerald-300">🩺 Consultorios y Clínicas Médicas</span>
                      <span className="text-xs font-mono font-bold text-white">$29 USD/mes</span>
                    </div>
                    <p className="text-xs text-luxury-silver">
                      Ahorra 2.5 horas diarias de notas clínicas con <strong className="text-white">PocketScribe</strong> y reduce las inasistencias de pacientes en un 65% por WhatsApp.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-luxury-gold">⚖️ Estudios Jurídicos e Inmobiliarias</span>
                      <span className="text-xs font-mono font-bold text-white">$49 USD/mes</span>
                    </div>
                    <p className="text-xs text-luxury-silver">
                      Respuesta en 3 segundos a consultas entrantes 24/7, filtro de clientes calificados y control de fechas críticas con <strong className="text-white">RealEstateDates</strong>.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-sky-300">📐 Arquitectos, Diseñadores y Constructoras</span>
                      <span className="text-xs font-mono font-bold text-white">$69 USD/mes</span>
                    </div>
                    <p className="text-xs text-luxury-silver">
                      Presupuestos de obra y cómputos métricos 80% más rápidos con <strong className="text-white">ChatBuildingInnovation</strong> + visión computacional 3D.
                    </p>
                  </div>
                </div>

                <Link
                  to="/connect?mode=call&segment=latam_direct"
                  className="w-full py-3.5 px-5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-luxury-gold" />
                  <span>Conexión Directa en 10 Segundos (Llamada / WhatsApp / Video)</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* LATAM Pricing Cards ($29 - $69/mes + $199 Bootcamp) */}
        <section id="planes-latam" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-mono uppercase tracking-wider mb-3">
              Tarifas Oficiales para Sudamérica y Latinoamérica
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-4">
              Planes Cloud SaaS en Español <span className="text-luxury-gold">($29 – $69 USD/mes)</span>
            </h2>
            <p className="text-sm sm:text-base text-luxury-silver">
              Tecnología de nivel corporativo estadounidense adaptada al poder adquisitivo de profesionales independientes, estudios y PyMEs en América Latina.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
            {LATAM_PLANS.map((plan) => {
              const Icon = plan.icon
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl p-6 flex flex-col justify-between transition-all ${
                    plan.popular
                      ? 'border-2 border-luxury-gold bg-gradient-to-b from-luxury-gold/15 via-[#0c0e18] to-[#080910] shadow-[0_0_40px_rgba(212,175,55,0.18)] xl:-translate-y-2'
                      : 'border border-white/15 bg-[#0b0d16]/85 hover:border-luxury-gold/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                          plan.popular
                            ? 'bg-luxury-gold text-dark'
                            : 'bg-white/10 text-luxury-champagne border border-white/15'
                        }`}
                      >
                        {plan.badge}
                      </span>
                      <Icon className="w-5 h-5 text-luxury-gold shrink-0" />
                    </div>

                    <div className="text-xs font-mono text-luxury-gold mb-1">{plan.sector}</div>
                    <h3 className="text-xl font-serif font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-xs text-luxury-silver leading-relaxed mb-5">{plan.description}</p>

                    <div className="p-4 rounded-xl bg-black/50 border border-white/10 mb-5">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-4xl font-extrabold text-white tabular-nums">{plan.price}</span>
                        <span className="text-xs text-luxury-champagne font-mono">{plan.period}</span>
                      </div>
                      <div className="text-[11px] text-emerald-400 font-mono mt-1.5">{plan.localEstimate}</div>
                    </div>

                    <Link
                      to={plan.ctaLink}
                      className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 mb-3 transition-all ${
                        plan.popular
                          ? 'btn-primary'
                          : 'bg-white/10 hover:bg-luxury-gold hover:text-dark text-white border border-white/15'
                      }`}
                    >
                      <span>{plan.ctaText}</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </Link>

                    <a
                      href={plan.liveAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-[11px] font-mono flex items-center justify-center gap-1.5 mb-5 transition-all"
                    >
                      <span>{plan.liveAppLabel}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>

                    <ul className="space-y-2.5">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2 text-xs text-luxury-champagne leading-relaxed">
                          <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Regional Coverage & Grant / Institutional Ecosystem Proof */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="rounded-3xl border border-white/15 bg-[#0a0c14] p-7 sm:p-10">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <span className="text-xs font-mono uppercase tracking-wider text-luxury-gold block mb-2">
                  COBERTURA EN AMÉRICA LATINA &amp; EL CARIBE
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
                  Despliegue Inmediato en Toda Sudamérica
                </h3>
                <p className="text-xs sm:text-sm text-luxury-silver leading-relaxed mb-5">
                  Nuestras plataformas operan 100% en la nube con latencia inferior a 400ms, soporte nativo para <strong className="text-white">WhatsApp Business</strong>, facturación internacional en dólares o moneda local vía tarjeta, y adaptación al vocabulario médico, jurídico y técnico de cada país.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-luxury-gold/15 border border-luxury-gold/40 text-luxury-champagne text-xs font-mono font-semibold hover:bg-luxury-gold/25 transition-all"
                  >
                    <Layers className="w-4 h-4 text-luxury-gold" />
                    <span>Ver Catálogo de 21 Sistemas IA</span>
                  </Link>
                  <Link
                    to="/connect?mode=virtual&segment=latam_grant_partner"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-mono hover:bg-white/10 transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Contacto Institucional / Alianzas LATAM</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7 grid sm:grid-cols-2 gap-3.5">
                {LATAM_COUNTRIES.map((c) => (
                  <div
                    key={c.name}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-luxury-gold/30 transition-all"
                  >
                    <div className="flex items-center gap-2 font-bold text-sm text-white mb-1">
                      <span className="text-lg">{c.flag}</span>
                      <span>{c.name}</span>
                    </div>
                    <p className="text-[11px] text-luxury-silver leading-relaxed">{c.hub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
