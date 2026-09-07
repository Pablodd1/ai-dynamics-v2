import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

const Testimonials = () => {
  const testimonials = [
    {
      quote: "AI Dynamics transformed our operations with their innovative solutions. The AI implementation reduced our processing time by 80% and the team's expertise made the entire process seamless.",
      author: 'Sarah Johnson',
      role: 'CTO',
      company: 'TechCorp',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
      rating: 5,
    },
    {
      quote: "Their AI integration helped us reduce costs by 40% while improving our service quality significantly. The ROI was visible within the first quarter. Highly recommend their services.",
      author: 'Michael Chen',
      role: 'CEO',
      company: 'GlobalTech',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
      rating: 5,
    },
    {
      quote: "The team's expertise and dedication to our success made all the difference in our digital transformation. They didn't just build AI; they built a competitive advantage for us.",
      author: 'Emily Rodriguez',
      role: 'COO',
      company: 'InnovateNow',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80',
      rating: 5,
    },
    {
      quote: "Working with AI Dynamics was a game-changer. Their custom AI solution for fraud detection saved us millions and their ongoing support is exceptional.",
      author: 'David Park',
      role: 'VP of Operations',
      company: 'FinanceHub',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      rating: 5,
    },
    {
      quote: "The AI-powered customer service bot they built handles 70% of our inquiries automatically. Our customer satisfaction scores have never been higher.",
      author: 'Lisa Thompson',
      role: 'Head of Customer Experience',
      company: 'RetailPlus',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
      rating: 5,
    },
    {
      quote: "From concept to deployment, AI Dynamics delivered beyond expectations. Their AI recommendation engine increased our sales by 35% in just two months.",
      author: 'James Wilson',
      role: 'Director of Digital',
      company: 'ShopSmart',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
      rating: 5,
    },
  ]

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm text-gray-300 mb-6">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">What Our</span>{' '}
            <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Do not just take our word for it. Here is what industry leaders have to say 
            about working with AI Dynamics.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-8 rounded-2xl glass hover:bg-white/10 transition-all duration-300">
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote className="w-10 h-10 text-primary-500/50" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    <div className="text-sm text-gray-400">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
