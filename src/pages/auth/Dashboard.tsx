import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, FolderKanban, CalendarDays, Settings,
  LogOut, ChevronRight, Loader2, Briefcase, Clock, CheckCircle2
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: FolderKanban, label: 'Projects', href: '/dashboard?tab=projects' },
  { icon: CalendarDays, label: 'Bookings', href: '/dashboard?tab=bookings' },
  { icon: Settings, label: 'Settings', href: '/profile' },
]

export default function Dashboard() {
  const { user, profile, isLoading, signOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login')
    }
  }, [user, isLoading, navigate])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    )
  }

  if (!user) return null

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
    : user.email?.[0].toUpperCase() || 'U'

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-50/50 border-r border-white/10 hidden lg:flex flex-col">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-white">AIDynamic</span>
            <span className="text-xs text-accent font-medium">Client Portal</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-luxury-silver hover:text-white hover:bg-white/5 transition-all"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => signOut()}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-luxury-silver hover:text-red-400 hover:bg-red-500/5 transition-all w-full"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-dark/80 backdrop-blur-xl border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-white">Dashboard</h1>
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="text-sm text-luxury-silver hover:text-white transition-colors"
              >
                Back to Website
              </Link>
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-semibold">
                {initials}
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 max-w-6xl mx-auto space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Projects', value: '0', icon: Briefcase, color: 'text-accent' },
              { label: 'Active', value: '0', icon: Clock, color: 'text-luxury-gold' },
              { label: 'Completed', value: '0', icon: CheckCircle2, color: 'text-green-400' },
              { label: 'Consultations', value: '0', icon: CalendarDays, color: 'text-purple-400' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-dark-50/50 backdrop-blur-xl border border-white/10 rounded-2xl p-5"
              >
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <ChevronRight className="w-4 h-4 text-luxury-silver" />
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-luxury-silver">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Profile Summary */}
          <div className="bg-dark-50/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Profile</h2>
              <Link
                to="/profile"
                className="text-sm text-accent hover:text-accent-300 transition-colors"
              >
                Edit
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-luxury-silver">Name:</span>
                <span className="text-white ml-2">{profile?.full_name || 'Not set'}</span>
              </div>
              <div>
                <span className="text-luxury-silver">Email:</span>
                <span className="text-white ml-2">{user.email}</span>
              </div>
              <div>
                <span className="text-luxury-silver">Company:</span>
                <span className="text-white ml-2">{profile?.company_name || 'Not set'}</span>
              </div>
              <div>
                <span className="text-luxury-silver">Role:</span>
                <span className="text-white ml-2 capitalize">{profile?.role || 'Client'}</span>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="bg-dark-50/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Projects</h2>
            <div className="text-center py-8 text-luxury-silver">
              <FolderKanban className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No projects yet. Book a consultation to get started.</p>
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-accent text-dark text-sm font-semibold hover:bg-accent-400 transition-all"
              >
                Book a Call
              </Link>
            </div>
          </div>

          {/* Bookings */}
          <div className="bg-dark-50/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Consultation Bookings</h2>
            <div className="text-center py-8 text-luxury-silver">
              <CalendarDays className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No bookings yet. Schedule your free consultation.</p>
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-accent text-dark text-sm font-semibold hover:bg-accent-400 transition-all"
              >
                Schedule Now
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
