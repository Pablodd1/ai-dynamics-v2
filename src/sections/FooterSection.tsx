import React from 'react';

export const FooterSection = () => {
  return (
    <footer className="bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-10 pt-20 pb-10 border-t border-[#D7E2EA]/10 relative z-30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-8 justify-between mb-20">
        
        <div className="flex flex-col max-w-xs">
          <span className="font-black tracking-widest text-2xl uppercase mb-6 text-white">Aidynamic.pro</span>
          <p className="opacity-60 leading-relaxed mb-6">
            AI consulting for Miami & Miami Beach businesses. Automate operations, cut costs, and reclaim your time.
          </p>
          <span className="font-bold text-[#B600A8] uppercase tracking-widest text-sm">Miami — Miami Beach, FL</span>
        </div>

        <div className="flex gap-12 md:gap-20 flex-wrap">
          <div className="flex flex-col gap-4">
            <h4 className="font-bold uppercase tracking-widest text-sm mb-2">Services</h4>
            <a href="#" className="opacity-60 hover:opacity-100 hover:text-[#B600A8] transition-colors text-sm">Free AI Audit</a>
            <a href="#" className="opacity-60 hover:opacity-100 hover:text-[#B600A8] transition-colors text-sm">Custom AI Build</a>
            <a href="#" className="opacity-60 hover:opacity-100 hover:text-[#B600A8] transition-colors text-sm">Monthly Retainer</a>
            <a href="#" className="opacity-60 hover:opacity-100 hover:text-[#B600A8] transition-colors text-sm">Pre-Built AI Apps</a>
            <a href="#" className="opacity-60 hover:opacity-100 hover:text-[#B600A8] transition-colors text-sm">AI Training</a>
            <a href="#" className="opacity-60 hover:opacity-100 hover:text-[#B600A8] transition-colors text-sm">HIPAA Compliance</a>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold uppercase tracking-widest text-sm mb-2">Industries</h4>
            <a href="#" className="opacity-60 hover:opacity-100 hover:text-[#B600A8] transition-colors text-sm">Real Estate</a>
            <a href="#" className="opacity-60 hover:opacity-100 hover:text-[#B600A8] transition-colors text-sm">Hospitality</a>
            <a href="#" className="opacity-60 hover:opacity-100 hover:text-[#B600A8] transition-colors text-sm">Trade & Logistics</a>
            <a href="#" className="opacity-60 hover:opacity-100 hover:text-[#B600A8] transition-colors text-sm">Healthcare</a>
            <a href="#" className="opacity-60 hover:opacity-100 hover:text-[#B600A8] transition-colors text-sm">Legal Services</a>
            <a href="#" className="opacity-60 hover:opacity-100 hover:text-[#B600A8] transition-colors text-sm">Finance & Retail</a>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold uppercase tracking-widest text-sm mb-2">Company</h4>
            <a href="#" className="opacity-60 hover:opacity-100 hover:text-[#B600A8] transition-colors text-sm">About Us</a>
            <a href="#" className="opacity-60 hover:opacity-100 hover:text-[#B600A8] transition-colors text-sm">Case Studies</a>
            <a href="#" className="opacity-60 hover:opacity-100 hover:text-[#B600A8] transition-colors text-sm">Blog / Resources</a>
            <a href="#" className="opacity-60 hover:opacity-100 hover:text-[#B600A8] transition-colors text-sm">Contact</a>
            <a href="#" className="opacity-60 hover:opacity-100 hover:text-[#B600A8] transition-colors text-sm">Privacy Policy</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-[#D7E2EA]/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs opacity-40 font-medium tracking-wider uppercase">
        <span>© 2025 Aidynamic.pro — All rights reserved.</span>
        <span>Serving Miami & Miami Beach, Florida.</span>
      </div>
    </footer>
  );
};
