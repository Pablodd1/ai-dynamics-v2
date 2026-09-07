import { useEffect, useRef } from 'react'
import { ArrowLeft, Globe, Building2, Stethoscope, Briefcase, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const founders = [
  {
    name: 'Jasmel Acosta',
    role: 'Founder & CEO',
    bio: 'Serial entrepreneur with 15+ years building tech solutions for healthcare and small businesses. Founded AI Dynamics to bridge cutting-edge AI with real-world business results.',
    image: '/founder-3d.jpg',
    linkedin: 'https://www.linkedin.com/in/jasmel-acosta/',
    email: 'hello@aidynamic.pro',
    specialties: ['AI Strategy', 'Healthcare Tech', 'Business Automation'],
    stats: { projects: '150+', experience: '15+ yrs', revenue: '$2M+' }
  },
  {
    name: 'Juan Diaz',
    role: 'Co-Founder & CTO',
    bio: 'Technical architect and strategic leader with deep expertise in logistics, construction, and business development. Co-founder of Unitec USA and Building Innovation. Leads the engineering team building intelligent automation solutions.',
    image: '/juan-diaz.jpg',
    linkedin: '#',
    email: 'juan@aidynamic.pro',
    specialties: ['Machine Learning', 'System Architecture', 'Business Strategy'],
    stats: { projects: '80+', experience: '10+ yrs', companies: '2' }
  }
];

const companies = [
  {
    name: 'AI Dynamics Pro',
    description: 'AI automation and digital transformation for businesses of all sizes.',
    icon: Globe,
    color: 'from-cyan-500 to-blue-600',
    url: 'https://aidynamic.pro',
  },
  {
    name: 'Medical Billing Miami Beach',
    description: 'AI-powered medical billing and revenue cycle management for healthcare practices.',
    icon: Stethoscope,
    color: 'from-blue-500 to-indigo-600',
    url: 'https://medicalbillingmb.com',
  },
  {
    name: '305business.llc',
    description: 'Business marketplace and acquisition platform for Miami entrepreneurs.',
    icon: Briefcase,
    color: 'from-orange-500 to-red-600',
    url: 'https://305business-llc.vercel.app',
  },
]

export default function Founders() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0)
    
    // 3D Neural Network Animation
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const nodes: { x: number; y: number; z: number; vx: number; vy: number; vz: number }[] = [];
    const nodeCount = 80;
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000 - 500,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 0.5
      });
    }
    
    let animationId: number;
    
    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update nodes
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;
        
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        if (node.z < -500 || node.z > 500) node.vz *= -1;
      });
      
      // Draw connections
      nodes.forEach((node, i) => {
        nodes.slice(i + 1).forEach(other => {
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dz = node.z - other.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          if (dist < 200) {
            const alpha = (1 - dist / 200) * 0.3;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(147, 51, 234, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      
      // Draw nodes
      nodes.forEach(node => {
        const scale = (node.z + 500) / 1000;
        const size = 2 + scale * 3;
        const alpha = 0.3 + scale * 0.7;
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${alpha})`;
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(animate);
    }
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      <SEO
        title="Our Founders — AI Dynamics Pro"
        description="Meet Jasmel Acosta and Juan, founders of AI Dynamics Pro — building AI-powered solutions for business growth."
      />

      {/* 3D Neural Network Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back to Home</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/" className="text-white/70 hover:text-white transition-colors text-sm">
                Home
              </Link>
              <Link to="/booking" className="text-white/70 hover:text-white transition-colors text-sm">
                Book a Call
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-8">
            <Building2 className="w-4 h-4" />
            Meet the Founders
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-white">
            The Minds Behind{' '}
            <span className="text-purple-400">AI Dynamics</span>
          </h1>

          <p className="text-xl text-white/60 mb-12 max-w-3xl mx-auto">
            Two founders, one vision: making AI work for real businesses. 
            No buzzwords, just results.
          </p>
        </div>
      </section>

      {/* Founders Grid */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {founders.map((founder) => (
              <div key={founder.name} className="group">
                <div className="relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-500">
                  {/* Image */}
                  <div className="relative h-80 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0f] z-10" />
                    <img 
                      src={founder.image} 
                      alt={founder.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-1">{founder.name}</h2>
                        <p className="text-purple-400 font-medium">{founder.role}</p>
                      </div>
                      <div className="flex gap-2">
                        <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" 
                           className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                          <svg className="w-5 h-5 text-white/70" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.14-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                        <a href={`mailto:${founder.email}`}
                           className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                          <Mail className="w-5 h-5 text-white/70" />
                        </a>
                      </div>
                    </div>
                    
                    <p className="text-white/60 leading-relaxed mb-6">{founder.bio}</p>
                    
                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {founder.specialties.map(specialty => (
                        <span key={specialty} className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm">
                          {specialty}
                        </span>
                      ))}
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                      {Object.entries(founder.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-2xl font-bold text-white">{value}</div>
                          <div className="text-xs text-white/50 uppercase tracking-wider">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interconnected Visualization */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Shared Expertise</h2>
          <p className="text-white/60 mb-12">Our combined skills create a complete AI solution stack</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'AI Strategy', founders: ['Jasmel', 'Juan'] },
              { label: 'Machine Learning', founders: ['Juan'] },
              { label: 'Business Automation', founders: ['Jasmel'] },
              { label: 'System Architecture', founders: ['Juan'] },
              { label: 'Healthcare Tech', founders: ['Jasmel'] },
              { label: 'Neural Networks', founders: ['Juan'] },
              { label: 'Client Relations', founders: ['Jasmel'] },
              { label: 'Full-Stack Dev', founders: ['Juan'] },
            ].map((skill) => (
              <div key={skill.label} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-purple-500/50 transition-colors">
                <div className="text-white font-medium mb-2">{skill.label}</div>
                <div className="flex gap-1 justify-center">
                  {skill.founders.map(f => (
                    <span key={f} className={`w-2 h-2 rounded-full ${f === 'Jasmel' ? 'bg-purple-400' : 'bg-blue-400'}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-white">
            The{' '}
            <span className="text-purple-400">Ecosystem</span>
          </h2>
          <p className="text-center text-white/50 mb-16 max-w-2xl mx-auto">
            AI-powered solutions across healthcare, business automation, and local marketplaces
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {companies.map((company) => (
              <a
                key={company.name}
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${company.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <company.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-purple-400 transition-colors">
                  {company.name}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {company.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-purple-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Visit Site
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
            Ready to{' '}
            <span className="text-purple-400">Transform Your Business?</span>
          </h2>
          <p className="text-white/50 mb-10 max-w-2xl mx-auto">
            Book a free consultation and discover how AI can automate your workflows,
            reduce costs, and accelerate growth.
          </p>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all"
          >
            Book Free Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}
