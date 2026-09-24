import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'
import AILogo from './AILogo'

const Footer = () => {
  const { t } = useI18n()

  const footerLinks = {
    services: [
      { label: 'AI Automation', href: '#services' },
      { label: 'Agentic Websites', href: '/agentic-website' },
      { label: 'AI SEO', href: '/ai-seo' },
      { label: 'Zero-G Platform', href: '/zero-g' },
      { label: 'Simulation', href: '/simulation' },
      { label: 'Research', href: '/research' },
    ],
    company: [
      { label: 'Founders', href: '/founders' },
      { label: 'Blog', href: '/blog' },
      { label: 'Case Studies', href: '#case-study' },
      { label: 'Contact', href: '#contact' },
    ],
    ecosystem: [
      { label: '305business', href: 'https://305business-llc.vercel.app', external: true },
      { label: 'Medical Billing Miami Beach', href: 'https://medicalbillingmb.com', external: true },
      { label: 'AI Medical Scriber', href: 'https://aimedicalscriber.com', external: true },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy', external: false },
      { label: 'Terms of Service', href: '/terms', external: false },
    ],
  }

  const socialLinks = [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/ai-dynamic-75983a407/',
      icon: ({ className = "w-4 h-4" }: { className?: string }) => (
        <svg viewBox="0 0 24 24" className={`${className} fill-current`}>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/aidynamicspro/',
      icon: ({ className = "w-4 h-4" }: { className?: string }) => (
        <svg viewBox="0 0 24 24" className={`${className} fill-current`}>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      )
    },
    {
      label: 'WhatsApp',
      href: 'https://wa.me/17866432099?text=Hello%20Jasmel!%20I%20am%20interested%20in%20AI%20automation%20for%20my%20business.',
      icon: ({ className = "w-4 h-4" }: { className?: string }) => (
        <svg viewBox="0 0 24 24" className={`${className} fill-current`}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      )
    },
  ]

  return (
    <footer className="relative border-t border-white/10 bg-gradient-to-t from-dark-50 to-dark">
      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-luxury-gold/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#" className="flex items-center gap-3 mb-6">
              <AILogo className="w-10 h-10" />
              <span className="text-xl font-bold font-serif">
                <span className="text-white">AI</span>
                <span className="text-luxury-gold"> Dynamics</span>
              </span>
            </a>
            <p className="text-luxury-silver mb-6 text-sm leading-relaxed">
              {t('footer.description') as string}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:jasmelacosta@gmail.com" className="flex items-center gap-3 text-luxury-silver hover:text-luxury-champagne transition-colors text-sm">
                <Mail className="w-4 h-4 text-luxury-gold/60" />
                jasmelacosta@gmail.com
              </a>
              <a href="tel:+17866432099" className="flex items-center gap-3 text-luxury-silver hover:text-luxury-champagne transition-colors text-sm">
                <Phone className="w-4 h-4 text-luxury-gold/60" />
                +1 (786) 643-2099
              </a>
              <div className="flex items-center gap-3 text-luxury-silver text-sm">
                <MapPin className="w-4 h-4 text-luxury-gold/60" />
                Miami, FL
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t('footer.services') as string}</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-luxury-silver hover:text-luxury-champagne transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t('footer.company') as string}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-luxury-silver hover:text-luxury-champagne transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Ecosystem</h4>
            <ul className="space-y-3">
              {footerLinks.ecosystem.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-luxury-silver hover:text-luxury-champagne transition-colors text-sm inline-flex items-center gap-1"
                  >
                    {link.label}
                    {link.external && <ExternalLink className="w-3 h-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-luxury-silver hover:text-luxury-champagne transition-colors text-sm inline-flex items-center gap-1"
                  >
                    {link.label}
                    {link.external && <ExternalLink className="w-3 h-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-luxury-silver/60">
            © {new Date().getFullYear()} AI Dynamics. {t('footer.rights') as string}
          </p>

          {/* Certifications */}
          <div className="flex items-center gap-4 text-xs text-luxury-silver/40">
            <span>HIPAA Compliant</span>
            <span className="w-1 h-1 rounded-full bg-luxury-gold/30" />
            <span>SOC 2 Type II</span>
            <span className="w-1 h-1 rounded-full bg-luxury-gold/30" />
            <span>GDPR Ready</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-luxury-silver hover:text-luxury-gold hover:border-luxury-gold/30 transition-all"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
