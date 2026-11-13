import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Shield,
  Settings,
  ChevronDown,
  Cpu,
  Layers,
  PhoneCall,
  Coins,
  Workflow,
  BookOpen,
  Users2,
  MapPin,
  Lock,
  ArrowRight
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import LanguageToggle from '../i18n/LanguageToggle'
import { useAuth } from '../context/AuthContext'
import AILogo from './AILogo'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [activeMenu, setActiveMenu] = useState<'solutions' | 'company' | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const menuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { user, profile, isAdmin, signOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    await signOut()
    setShowDropdown(false)
    navigate('/')
  }

  const handleMouseEnter = (menu: 'solutions' | 'company') => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current)
    setActiveMenu(menu)
  }

  const handleMouseLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null)
    }, 180)
  }

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
    : user?.email?.[0].toUpperCase() || 'U'

  // Divided Top Menu Groups (Group 1: Solutions & Systems | Group 2: Company & Process)
  const solutionsGroup = [
    {
      title: 'Services & AI Consulting',
      desc: 'Cost-reduction audits, workflow automation & staff training',
      href: '/#services',
      icon: Cpu,
    },
    {
      title: '21 Deployed AI Systems',
      desc: 'Computer vision, autonomous agents, IoT & enterprise apps',
      href: '/projects',
      icon: Layers,
    },
    {
      title: '24/7 AI Voice Demo (JAss)',
      desc: 'Test our sub-second bilingual receptionist live in browser',
      href: '/#call-simulator',
      icon: PhoneCall,
    },
    {
      title: 'Pricing & $99 Feasibility Audit',
      desc: 'Transparent ROI packages from turnkey to enterprise builds',
      href: '/#pricing',
      icon: Coins,
    },
  ]

  const companyGroup = [
    {
      title: 'Our 3-Step Process',
      desc: 'How we audit, prototype, and deploy custom AI in 14-30 days',
      href: '/process',
      icon: Workflow,
    },
    {
      title: 'Blog & Market Intel',
      desc: 'Latest applied AI playbooks, ROI calculations & tech breakdowns',
      href: '/blog',
      icon: BookOpen,
    },
    {
      title: 'Leadership & Founders',
      desc: 'Systems architecture & enterprise track record in Miami',
      href: '/founders',
      icon: Users2,
    },
    {
      title: 'Contact Miami HQ',
      desc: 'Brickell Financial District office, direct line & inquiries',
      href: '/#contact',
      icon: MapPin,
    },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            isScrolled ? 'bg-dark/85 backdrop-blur-xl border-b border-white/10' : ''
          }`}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <AILogo className="w-10 h-10" showText showTagline />
            </Link>

            {/* Streamlined Desktop Navigation (Divided in Two Clean Dropdown Groups + Pricing) */}
            <nav className="hidden md:flex items-center gap-6" onMouseLeave={handleMouseLeave}>
              {/* Group 1: Solutions & Systems Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('solutions')}
              >
                <button
                  type="button"
                  onClick={() => setActiveMenu(activeMenu === 'solutions' ? null : 'solutions')}
                  className={`flex items-center gap-1.5 py-2 text-sm font-medium transition-colors ${
                    activeMenu === 'solutions' ? 'text-luxury-champagne' : 'text-luxury-silver hover:text-white'
                  }`}
                >
                  <span>Solutions & Systems</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeMenu === 'solutions' ? 'rotate-180 text-luxury-gold' : 'text-luxury-silver/60'
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {activeMenu === 'solutions' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.16 }}
                      className="absolute top-full -left-6 pt-2 w-[420px]"
                    >
                      <div className="p-3.5 rounded-2xl bg-[#090a10]/95 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)] grid gap-2">
                        <div className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-luxury-gold flex items-center justify-between border-b border-white/10 pb-2">
                          <span>AI Solutions & 21 Systems</span>
                          <span className="text-[10px] text-luxury-silver/60">Live Production</span>
                        </div>
                        {solutionsGroup.map((item) => {
                          const isInternal = item.href.startsWith('/') && !item.href.includes('#')
                          const ItemIcon = item.icon
                          const content = (
                            <div className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all group">
                              <div className="w-8 h-8 rounded-lg bg-luxury-gold/10 border border-luxury-gold/20 flex items-center justify-center text-luxury-gold group-hover:scale-105 group-hover:bg-luxury-gold group-hover:text-dark transition-all shrink-0">
                                <ItemIcon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-white group-hover:text-luxury-champagne transition-colors">
                                  {item.title}
                                </div>
                                <div className="text-xs text-luxury-silver/80 line-clamp-1">
                                  {item.desc}
                                </div>
                              </div>
                            </div>
                          )
                          return isInternal ? (
                            <Link
                              key={item.href}
                              to={item.href}
                              onClick={() => setActiveMenu(null)}
                            >
                              {content}
                            </Link>
                          ) : (
                            <a
                              key={item.href}
                              href={item.href}
                              onClick={() => setActiveMenu(null)}
                            >
                              {content}
                            </a>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Group 2: Company & Process Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('company')}
              >
                <button
                  type="button"
                  onClick={() => setActiveMenu(activeMenu === 'company' ? null : 'company')}
                  className={`flex items-center gap-1.5 py-2 text-sm font-medium transition-colors ${
                    activeMenu === 'company' ? 'text-luxury-champagne' : 'text-luxury-silver hover:text-white'
                  }`}
                >
                  <span>Company & Process</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeMenu === 'company' ? 'rotate-180 text-luxury-gold' : 'text-luxury-silver/60'
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {activeMenu === 'company' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.16 }}
                      className="absolute top-full -left-6 pt-2 w-[400px]"
                    >
                      <div className="p-3.5 rounded-2xl bg-[#090a10]/95 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)] grid gap-2">
                        <div className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-luxury-gold flex items-center justify-between border-b border-white/10 pb-2">
                          <span>Methodology & Intel</span>
                          <span className="text-[10px] text-luxury-silver/60">Miami, FL</span>
                        </div>
                        {companyGroup.map((item) => {
                          const isInternal = item.href.startsWith('/') && !item.href.includes('#')
                          const ItemIcon = item.icon
                          const content = (
                            <div className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all group">
                              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-luxury-silver group-hover:scale-105 group-hover:bg-accent group-hover:text-dark transition-all shrink-0">
                                <ItemIcon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-white group-hover:text-luxury-champagne transition-colors">
                                  {item.title}
                                </div>
                                <div className="text-xs text-luxury-silver/80 line-clamp-1">
                                  {item.desc}
                                </div>
                              </div>
                            </div>
                          )
                          return isInternal ? (
                            <Link
                              key={item.href}
                              to={item.href}
                              onClick={() => setActiveMenu(null)}
                            >
                              {content}
                            </Link>
                          ) : (
                            <a
                              key={item.href}
                              href={item.href}
                              onClick={() => setActiveMenu(null)}
                            >
                              {content}
                            </a>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Direct Quick Link: Pricing */}
              <a
                href="/#pricing"
                className="text-sm text-luxury-silver hover:text-luxury-champagne transition-colors relative group py-2"
              >
                Pricing
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-luxury-gold group-hover:w-full transition-all duration-300" />
              </a>

              {/* Direct Quick Link: LATAM Spanish SaaS ($29-$69/mo) */}
              <Link
                to="/latam"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-500/35 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-mono font-semibold transition-all"
              >
                <span>🌎 LATAM ($29–$69)</span>
              </Link>
            </nav>

            {/* Right Side (Language + Get Started CTA; "Log In" moved to bottom footer menu) */}
            <div className="flex items-center gap-3.5">
              <LanguageToggle />

              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-semibold hover:bg-accent/30 transition-all border border-accent/30"
                  >
                    {initials}
                  </button>

                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 rounded-xl bg-dark-50 border border-white/10 shadow-2xl overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-white/10">
                          <p className="text-white font-medium text-sm truncate">
                            {profile?.full_name || user.email}
                          </p>
                          <p className="text-luxury-silver text-xs truncate">
                            {user.email}
                          </p>
                        </div>
                        <div className="py-1">
                          <Link
                            to="/dashboard"
                            onClick={() => setShowDropdown(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-luxury-silver hover:text-white hover:bg-white/5 transition-colors"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                          </Link>
                          <Link
                            to="/profile"
                            onClick={() => setShowDropdown(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-luxury-silver hover:text-white hover:bg-white/5 transition-colors"
                          >
                            <Settings className="w-4 h-4" />
                            Settings
                          </Link>
                          {isAdmin && (
                            <Link
                              to="/admin"
                              onClick={() => setShowDropdown(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-luxury-silver hover:text-white hover:bg-white/5 transition-colors"
                            >
                              <Shield className="w-4 h-4" />
                              Admin
                            </Link>
                          )}
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/booking"
                  className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-dark text-sm font-bold hover:bg-accent-400 hover:shadow-[0_0_20px_rgba(56,189,248,0.35)] transition-all"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white hover:border-luxury-gold/30 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu (Divided Cleanly into Two Categories) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            <div
              className="absolute inset-0 bg-dark/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-20 right-4 left-4 max-h-[85vh] overflow-y-auto p-6 rounded-2xl border border-white/10 bg-[#090a10]/95 backdrop-blur-xl space-y-6 shadow-2xl"
            >
              {/* Category 1: Solutions & Systems */}
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-luxury-gold pb-2 border-b border-white/10 mb-2">
                  Solutions & Systems
                </div>
                <div className="flex flex-col gap-1">
                  {solutionsGroup.map((item) => {
                    const isInternal = item.href.startsWith('/') && !item.href.includes('#')
                    return isInternal ? (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-base text-white hover:text-luxury-champagne transition-colors py-2 block font-medium"
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-base text-white hover:text-luxury-champagne transition-colors py-2 block font-medium"
                      >
                        {item.title}
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* Category 2: Company & Process */}
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-luxury-gold pb-2 border-b border-white/10 mb-2">
                  Company & Process
                </div>
                <div className="flex flex-col gap-1">
                  {companyGroup.map((item) => {
                    const isInternal = item.href.startsWith('/') && !item.href.includes('#')
                    return isInternal ? (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-base text-white hover:text-luxury-champagne transition-colors py-2 block font-medium"
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-base text-white hover:text-luxury-champagne transition-colors py-2 block font-medium"
                      >
                        {item.title}
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* Mobile Actions & Login Link at Bottom */}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <Link
                  to="/latam"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-center py-2.5 rounded-xl border border-emerald-500/35 bg-emerald-500/10 text-emerald-300 font-mono text-xs font-bold hover:bg-emerald-500/20 transition-all"
                >
                  🌎 Planes LATAM en Español ($29–$69 USD/mes)
                </Link>
                <Link
                  to="/booking"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-center py-3 rounded-xl bg-accent text-dark font-bold hover:bg-accent-400 transition-all"
                >
                  Get Started (Book Discovery)
                </Link>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-center py-2.5 rounded-xl border border-white/10 text-luxury-silver hover:text-white hover:bg-white/5 transition-all text-sm flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 text-luxury-gold" />
                  <span>Client & Staff Log In</span>
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation
