import { useEffect, useRef } from 'react'

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let columns: number[] = []
    let drops: number[] = []

    const chars = '01AIÐ¥₿€£¥§¶†‡‰¦¨ªº«»©®™℠∞∑∆∏√∂∫≈≠≤≥÷×±∞∴∵∷~!@#$%^&*()_+-=[]{}|;:,.<>?'

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      
      const fontSize = 14
      columns = Array(Math.floor(canvas.width / fontSize)).fill(0)
      drops = Array(columns.length).fill(1)
    }

    const draw = () => {
      // Semi-transparent black to create trail effect
      ctx.fillStyle = 'rgba(10, 10, 15, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const fontSize = 14
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = chars[Math.floor(Math.random() * chars.length)]
        
        // Gold/luxury color with varying opacity
        const opacity = Math.random() * 0.5 + 0.3
        const isBright = Math.random() > 0.95
        
        if (isBright) {
          ctx.fillStyle = `rgba(247, 231, 206, ${opacity + 0.3})` // bright champagne
          ctx.shadowColor = 'rgba(201, 169, 110, 0.8)'
          ctx.shadowBlur = 8
        } else {
          ctx.fillStyle = `rgba(201, 169, 110, ${opacity})` // gold
          ctx.shadowBlur = 0
        }

        const x = i * fontSize
        const y = drops[i] * fontSize

        ctx.fillText(char, x, y)

        // Reset drop to top randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }

      animationId = requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6, zIndex: 1 }}
    />
  )
}

export default MatrixRain
