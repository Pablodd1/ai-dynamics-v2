import { Sparkles, Mail, Phone, MapPin, Globe, MessageCircle, Code, Linkedin, Twitter } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'

const Footer = () => {
  const { t } = useI18n()

  const footerLinks = {
    services: [
      { label: t('services.service1.title'), href: '#services' },
      { label: t('services.service2.title'), href: '#services' },
      { label: t('services.service3.title'), href: '#services' },
      { label: t('services.service4.title'), href: '#services' },
      { label: t('services.service5.title'), href: '#services' },
      { label: t('services.service6.title'), href: '#services' },
    ],
    company: [
      { label: 'About Us', href: '#about' },
      { label: 'Case Studies', href: '#case-studies' },
      { label: 'Our Team', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Blog', href: '#' },
    ],
    resources: [
      { label: 'Documentation', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
  }

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Code, href: 'https://github.com', label: 'GitHub' },
  ]

  return (
    <footer className="relative border-t border-white/10">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-950/20 to-dark" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent rounded-lg" />
                <div className="absolute inset-1 bg-dark rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-400" />
                </div>
              </div>
              <span className="text-xl font-bold">
                <span className="text-white">AI</span>
                <span className="gradient-text"> Dynamics</span>
              </span>
            </a>
            <p className="text-gray-400 mb-6 max-w-sm">
              {t('footer.description')}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:jasmelacosta@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                jasmelacosta@gmail.com
              </a>
              <a href="tel:+17866432099" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                +1 (786) 643-2099
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-4 h-4" />
                Miami, FL
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.services')}</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label as string}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.label as string}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.company')}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.resources')}</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} AI Dynamics. {t('footer.rights')}
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
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
