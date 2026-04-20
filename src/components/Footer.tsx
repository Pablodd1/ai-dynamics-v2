import { Mail, Phone, MapPin, Code, ExternalLink } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'
import AILogo from './AILogo'

const Footer = () => {
  const { t } = useI18n()

  const footerLinks = {
    services: [
      { label: t('services.service1.title') as string, href: '#services' },
      { label: t('services.service2.title') as string, href: '#services' },
      { label: t('services.service3.title') as string, href: '#services' },
      { label: t('services.service4.title') as string, href: '#services' },
      { label: t('services.service5.title') as string, href: '#services' },
      { label: t('services.service6.title') as string, href: '#services' },
    ],
    company: [
      { label: 'About Us', href: '#about' },
      { label: 'Case Studies', href: '#case-studies' },
      { label: 'Our Process', href: '#process' },
      { label: 'Contact', href: '#contact' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy', external: false },
      { label: 'Terms of Service', href: '/terms', external: false },
      { label: 'Cookie Policy', href: '#', external: false },
    ],
  }

  const socialLinks = [
    { icon: Code, href: 'https://github.com', label: 'GitHub' },
  ]

  return (
    <footer className="relative border-t border-white/10 bg-gradient-to-t from-dark-50 to-dark">
      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-luxury-gold/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
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
