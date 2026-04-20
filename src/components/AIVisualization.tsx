import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

const AIVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      alpha: number
    }> = []

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    const createParticles = () => {
      particles = []
      const count = 50
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          alpha: Math.random() * 0.5 + 0.2,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Update and draw particles
      particles.forEach((particle, i) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around
        if (particle.x < 0) particle.x = canvas.offsetWidth
        if (particle.x > canvas.offsetWidth) particle.x = 0
        if (particle.y < 0) particle.y = canvas.offsetHeight
        if (particle.y > canvas.offsetHeight) particle.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201, 169, 110, ${particle.alpha})`
        ctx.fill()

        // Draw connections
        particles.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = `rgba(201, 169, 110, ${0.2 * (1 - distance / 150)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animationId = requestAnimationFrame(draw)
    }

    resize()
    createParticles()
    draw()

    window.addEventListener('resize', () => {
      resize()
      createParticles()
    })

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  const integrationSteps = [
    {
      step: '01',
      title: 'Discovery & Strategy',
      description: 'We analyze your business processes and identify high-impact AI opportunities.',
    },
    {
      step: '02',
      title: 'Solution Design',
      description: 'Our experts design a custom AI architecture tailored to your specific needs.',
    },
    {
      step: '03',
      title: 'Development & Training',
      description: 'We build and train AI models using your data, ensuring accuracy and relevance.',
    },
    {
      step: '04',
      title: 'Integration & Deployment',
      description: 'Seamless integration with your existing systems and infrastructure.',
    },
    {
      step: '05',
      title: 'Optimization & Support',
      description: 'Continuous monitoring, optimization, and dedicated support for peak performance.',
    },
  ]

  return (
    <section id="solutions" className="section-padding relative overflow-hidden bg-gradient-to-b from-dark to-dark-50">
      {/* Neural Network Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 rounded-full border border-luxury-gold/30 bg-luxury-gold/5 text-luxury-gold text-xs uppercase tracking-[0.2em] font-medium mb-6">
                Our Process
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
                <span className="text-white">How We Integrate</span>{' '}
                <span className="text-luxury-gold">AI Into Your Business</span>
              </h2>
              <p className="text-lg text-luxury-silver mb-8">
                Our proven 5-step methodology ensures successful AI implementation 
                that delivers measurable results from day one.
              </p>
            </motion.div>

            {/* Steps */}
            <div className="space-y-6">
              {integrationSteps.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl border border-luxury-gold/30 bg-luxury-gold/10 flex items-center justify-center font-bold text-luxury-gold group-hover:scale-110 transition-transform">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-luxury-silver">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02]">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full aspect-video object-cover"
              >
                <source 
                  src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-futuristic-devices-99786-large.mp4" 
                  type="video/mp4" 
                />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-4">
                  <div className="px-4 py-2 rounded-full bg-luxury-gold/10 backdrop-blur-sm border border-luxury-gold/30">
                    <span className="text-luxury-gold font-medium">AI Integration Demo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-4 px-4 py-3 rounded-xl border border-luxury-gold/20 bg-luxury-gold/5 backdrop-blur-sm"
            >
              <div className="text-2xl font-bold text-luxury-gold">99.9%</div>
              <div className="text-xs text-luxury-silver">Uptime</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -left-4 px-4 py-3 rounded-xl border border-luxury-gold/20 bg-luxury-gold/5 backdrop-blur-sm"
            >
              <div className="text-2xl font-bold text-luxury-gold">50ms</div>
              <div className="text-xs text-luxury-silver">Response Time</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AIVisualization
