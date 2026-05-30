import { motion } from 'framer-motion';
import { Send, PhoneCall, Mail, MessageCircle, ArrowRight } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';

const contactMethods = [
  {
    name: "Telegram",
    description: "Instant secure messaging",
    icon: <Send size={32} />,
    color: "from-[#229ED9] to-[#0088CC]",
    link: "https://t.me/+17869708366",
    delay: 0.1
  },
  {
    name: "WhatsApp",
    description: "Chat with our human team",
    icon: <MessageCircle size={32} />,
    color: "from-[#25D366] to-[#128C7E]",
    link: "https://wa.me/17869708366",
    delay: 0.2
  },
  {
    name: "Direct Call",
    description: "Speak to a strategist",
    icon: <PhoneCall size={32} />,
    color: "from-[#FF8A00] to-[#E55D00]",
    link: "tel:+17869708366",
    delay: 0.3
  },
  {
    name: "Enterprise Email",
    description: "Request an RFP or Free Audit",
    icon: <Mail size={32} />,
    color: "from-[#B600A8] to-[#7621B0]",
    link: "mailto:jasmelacosta@gmail.com",
    delay: 0.4
  }
];

export const OmnichannelContactSection = () => {
  return (
    <section className="py-32 bg-[#0C0C0C] relative overflow-hidden rounded-t-[40px] sm:rounded-t-[60px]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#B600A8]/5 blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <FadeIn delay={0.1} y={30}>
            <h2 className="hero-heading font-black uppercase text-[clamp(2.5rem,5vw,70px)] leading-none mb-6">
              Initiate <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B600A8] to-[#FF8A00]">Contact</span>
            </h2>
            <p className="font-medium text-xl md:text-2xl opacity-80 text-[#D7E2EA] mb-8">
              Ready to automate your Miami business? Reach out via your preferred encrypted channel or click the Voice Chatbot in the corner for an instant response.
            </p>
          </FadeIn>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method) => (
            <FadeIn key={method.name} delay={method.delay} y={20}>
              <a 
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block p-[1px] rounded-3xl overflow-hidden hover:scale-[1.02] transition-transform duration-300"
              >
                {/* Animated Border Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-30 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                <div className="relative h-full bg-[#151515] p-8 rounded-3xl flex flex-col items-center text-center">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 text-white bg-gradient-to-br ${method.color} shadow-lg shadow-black/50 group-hover:scale-110 transition-transform duration-300`}>
                    {method.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{method.name}</h3>
                  <p className="text-[#D7E2EA]/60 text-sm mb-6">{method.description}</p>
                  
                  <div className={`mt-auto flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-white group-hover:bg-white group-hover:text-black transition-colors`}>
                    <ArrowRight size={18} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
        
        <FadeIn delay={0.6} y={20} className="mt-20">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-[#FF8A00]/10 to-[#B600A8]/10 border border-[#FF8A00]/20 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,138,0,0.15),transparent)]"></div>
            <h3 className="relative z-10 text-2xl font-bold text-white mb-4">Want to test our response latency?</h3>
            <p className="relative z-10 text-[#D7E2EA]/70 mb-0">
              Click the glowing orange icon in the bottom right corner of your screen to immediately start a real-time Voice or Text conversation with our AI Dynamic Meta-Agent. It knows our pricing, services, and can schedule your free audit instantly.
            </p>
          </div>
        </FadeIn>

      </div>
    </section>
  );
};
