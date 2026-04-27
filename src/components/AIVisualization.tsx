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
              {/* Self-hosted futuristic canvas animation - replaces broken external video */}
              <canvas
                id="ai-demo-canvas"
                className="w-full aspect-video object-cover"
                ref={(canvas) => {
                  if (!canvas) return
                  const ctx = canvas.getContext('2d')
                  if (!ctx) return

                  let animationId: number
                  let time = 0
                  const particles: Array<{
                    x: number
                    y: number
                    vx: number
                    vy: number
                    size: number
                    alpha: number
                    type: 'node' | 'pulse'
                  }> = []
                  const connections: Array<{from: number; to: number; strength: number}> = []

                  const resize = () => {
                    const rect = canvas.getBoundingClientRect()
                    canvas.width = rect.width * window.devicePixelRatio
                    canvas.height = rect.height * window.devicePixelRatio
                    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
                  }

                  const createParticles = () => {
                    particles.length = 0
                    const rect = canvas.getBoundingClientRect()
                    const count = 30
                    for (let i = 0; i < count; i++) {
                      particles.push({
                        x: Math.random() * rect.width,
                        y: Math.random() * rect.height,
                        vx: (Math.random() - 0.5) * 0.8,
                        vy: (Math.random() - 0.5) * 0.8,
                        size: Math.random() * 3 + 2,
                        alpha: Math.random() * 0.6 + 0.3,
                        type: Math.random() > 0.7 ? 'pulse' : 'node',
                      })
                    }
                    // Create some fixed connections
                    connections.length = 0
                    for (let i = 0; i < particles.length; i++) {
                      for (let j = i + 1; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x
                        const dy = particles[i].y - particles[j].y
                        const dist = Math.sqrt(dx * dx + dy * dy)
                        if (dist < 120 && Math.random() > 0.5) {
                          connections.push({ from: i, to: j, strength: Math.random() })
                        }
                      }
                    }
                  }

                  const draw = () => {
                    const rect = canvas.getBoundingClientRect()
                    ctx.clearRect(0, 0, rect.width, rect.height)
                    time += 0.016

                    // Draw dark background
                    ctx.fillStyle = '#0a0a0f'
                    ctx.fillRect(0, 0, rect.width, rect.height)

                    // Draw subtle grid
                    ctx.strokeStyle = 'rgba(201, 169, 110, 0.03)'
                    ctx.lineWidth = 0.5
                    const gridSize = 40
                    for (let x = 0; x < rect.width; x += gridSize) {
                      ctx.beginPath()
                      ctx.moveTo(x, 0)
                      ctx.lineTo(x, rect.height)
                      ctx.stroke()
                    }
                    for (let y = 0; y < rect.height; y += gridSize) {
                      ctx.beginPath()
                      ctx.moveTo(0, y)
                      ctx.lineTo(rect.width, y)
                      ctx.stroke()
                    }

                    // Update and draw connections
                    connections.forEach((conn) => {
                      const p1 = particles[conn.from]
                      const p2 = particles[conn.to]
                      const pulse = Math.sin(time * 2 + conn.strength * 10) * 0.5 + 0.5
                      ctx.beginPath()
                      ctx.moveTo(p1.x, p1.y)
                      ctx.lineTo(p2.x, p2.y)
                      ctx.strokeStyle = `rgba(201, 169, 110, ${0.15 * pulse * conn.strength})`
                      ctx.lineWidth = 0.8
                      ctx.stroke()

                      // Draw data packet traveling along connection
                      const t = (time * 0.5 + conn.strength) % 1
                      const packetX = p1.x + (p2.x - p1.x) * t
                      const packetY = p1.y + (p2.y - p1.y) * t
                      ctx.beginPath()
                      ctx.arc(packetX, packetY, 2, 0, Math.PI * 2)
                      ctx.fillStyle = `rgba(201, 169, 110, ${0.8 * pulse})`
                      ctx.fill()
                    })

                    // Update and draw particles
                    particles.forEach((p) => {
                      p.x += p.vx
                      p.y += p.vy

                      // Wrap around
                      if (p.x < -10) p.x = rect.width + 10
                      if (p.x > rect.width + 10) p.x = -10
                      if (p.y < -10) p.y = rect.height + 10
                      if (p.y > rect.height + 10) p.y = -10

                      if (p.type === 'pulse') {
                        const pulse = Math.sin(time * 3 + p.x * 0.01) * 0.5 + 0.5
                        ctx.beginPath()
                        ctx.arc(p.x, p.y, p.size * (1 + pulse * 0.5), 0, Math.PI * 2)
                        ctx.fillStyle = `rgba(201, 169, 110, ${p.alpha * pulse})`
                        ctx.fill()

                        // Glow ring
                        ctx.beginPath()
                        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2)
                        ctx.fillStyle = `rgba(201, 169, 110, ${0.05 * pulse})`
                        ctx.fill()
                      } else {
                        ctx.beginPath()
                        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                        ctx.fillStyle = `rgba(201, 169, 110, ${p.alpha})`
                        ctx.fill()
                      }
                    })

                    // Draw center core
                    const cx = rect.width / 2
                    const cy = rect.height / 2
                    const corePulse = Math.sin(time * 2) * 0.3 + 0.7
                    ctx.beginPath()
                    ctx.arc(cx, cy, 15 * corePulse, 0, Math.PI * 2)
                    ctx.fillStyle = `rgba(201, 169, 110, 0.2)`
                    ctx.fill()
                    ctx.beginPath()
                    ctx.arc(cx, cy, 8 * corePulse, 0, Math.PI * 2)
                    ctx.fillStyle = `rgba(201, 169, 110, 0.5)`
                    ctx.fill()
                    ctx.beginPath()
                    ctx.arc(cx, cy, 3, 0, Math.PI * 2)
                    ctx.fillStyle = `rgba(201, 169, 110, 1)`
                    ctx.fill()

                    // Orbiting ring
                    ctx.beginPath()
                    ctx.arc(cx, cy, 40 + Math.sin(time) * 5, 0, Math.PI * 2)
                    ctx.strokeStyle = `rgba(201, 169, 110, 0.1)`
                    ctx.lineWidth = 1
                    ctx.stroke()

                    animationId = requestAnimationFrame(draw)
                  }

                  resize()
                  createParticles()
                  draw()

                  const handleResize = () => {
                    resize()
                    createParticles()
                  }
                  window.addEventListener('resize', handleResize)

                  // Cleanup when component unmounts or ref changes
                  return () => {
                    cancelAnimationFrame(animationId)
                    window.removeEventListener('resize', handleResize)
                  }
                }}
              />
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
