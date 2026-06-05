import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, ArrowRight, CheckCircle2, User } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { motion, AnimatePresence } from 'framer-motion';

export const CalendarBookingSection = () => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingState, setBookingState] = useState<'idle' | 'booking' | 'success'>('idle');

  // Generate next 14 days
  const today = new Date();
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1); // Start tomorrow
    return {
      dateNum: d.getDate(),
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      fullDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      isWeekend: d.getDay() === 0 || d.getDay() === 6
    };
  }).filter(d => !d.isWeekend).slice(0, 7); // Get 7 weekdays

  const timeSlots = ['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM'];

  const handleBook = () => {
    setBookingState('booking');
    
    // Simulate API delay
    setTimeout(() => {
      setBookingState('success');
      
      // Construct mailto link
      const dateObj = dates.find(d => d.dateNum === selectedDate);
      const subject = encodeURIComponent(`AI Audit Booking - ${dateObj?.fullDate} at ${selectedTime}`);
      const body = encodeURIComponent(`Hello AI Dynamic Team,\n\nI would like to confirm my free AI audit for ${dateObj?.fullDate} at ${selectedTime}.\n\nLooking forward to speaking with you!`);
      
      // Open email client
      window.location.href = `mailto:jasmelacosta@gmail.com?subject=${subject}&body=${body}`;
    }, 1500);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#111111]">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Copy */}
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FF8A00]/30 bg-[#FF8A00]/10 text-[#FF8A00] text-sm font-bold uppercase tracking-widest mb-6">
              <CalendarIcon size={16} />
              Priority Scheduling
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#D7E2EA] uppercase tracking-tighter mb-6 leading-tight">
              Book Your Free <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A00] to-[#FF4500]">AI Audit</span>
            </h2>
            <p className="text-[#D7E2EA]/70 text-lg mb-8 leading-relaxed">
              Skip the waitlist. Select a time below to speak directly with our lead architect. We will map out exactly how to automate your workflows and cut operational costs by 30%.
            </p>
            
            <div className="space-y-4">
              {[
                "45-minute deep dive into your operations",
                "Custom LLM and automation strategy blueprint",
                "ROI timeline and pricing breakdown"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-[#D7E2EA]/90 font-medium">
                  <div className="w-6 h-6 rounded-full bg-[#FF8A00]/20 flex items-center justify-center">
                    <CheckCircle2 size={14} className="text-[#FF8A00]" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Right Side: Calendar UI */}
          <FadeIn delay={0.2}>
            <div className="bg-[#0A0A0A] border border-[#333333] rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <AnimatePresence mode="wait">
                {bookingState === 'idle' && (
                  <motion.div
                    key="calendar"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <h3 className="text-xl font-bold text-[#D7E2EA] mb-6 flex items-center gap-2">
                      <CalendarIcon className="text-[#FF8A00]" /> Select a Date
                    </h3>
                    
                    <div className="grid grid-cols-7 gap-2 mb-8">
                      {dates.map((d, i) => (
                        <button
                          key={i}
                          onClick={() => { setSelectedDate(d.dateNum); setSelectedTime(null); }}
                          className={`flex flex-col items-center p-2 rounded-xl transition-all ${
                            selectedDate === d.dateNum 
                              ? 'bg-[#FF8A00] text-black shadow-[0_0_15px_rgba(255,138,0,0.4)]' 
                              : 'bg-[#1A1A1A] text-[#D7E2EA] hover:bg-[#333333]'
                          }`}
                        >
                          <span className="text-xs uppercase font-bold opacity-70 mb-1">{d.dayName}</span>
                          <span className="text-lg font-black">{d.dateNum}</span>
                        </button>
                      ))}
                    </div>

                    <AnimatePresence>
                      {selectedDate && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <h3 className="text-xl font-bold text-[#D7E2EA] mb-4 flex items-center gap-2 mt-4 border-t border-[#333333] pt-6">
                            <Clock className="text-[#FF8A00]" /> Select a Time
                          </h3>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                            {timeSlots.map((time, i) => (
                              <button
                                key={i}
                                onClick={() => setSelectedTime(time)}
                                className={`py-3 rounded-xl border text-sm font-bold transition-all ${
                                  selectedTime === time
                                    ? 'border-[#FF8A00] bg-[#FF8A00]/10 text-[#FF8A00]'
                                    : 'border-[#333333] text-[#D7E2EA]/80 hover:border-[#D7E2EA]/50'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      disabled={!selectedDate || !selectedTime}
                      onClick={handleBook}
                      className="w-full bg-white text-black py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FF8A00] transition-colors"
                    >
                      Confirm Audit <ArrowRight size={20} />
                    </button>
                  </motion.div>
                )}

                {bookingState === 'booking' && (
                  <motion.div
                    key="booking"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-20 flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-16 h-16 border-4 border-[#333333] border-t-[#FF8A00] rounded-full animate-spin mb-6" />
                    <h3 className="text-2xl font-bold text-[#D7E2EA] mb-2">Reserving Time Slot...</h3>
                    <p className="text-[#D7E2EA]/60">Checking lead architect availability.</p>
                  </motion.div>
                )}

                {bookingState === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 size={40} className="text-green-500" />
                    </div>
                    <h3 className="text-3xl font-black text-[#D7E2EA] mb-4">Slot Reserved!</h3>
                    <p className="text-[#D7E2EA]/70 mb-8 max-w-sm">
                      Your email client has been opened to finalize the booking. Please send the pre-filled email to secure your spot.
                    </p>
                    <div className="flex items-center gap-3 bg-[#1A1A1A] p-4 rounded-xl border border-[#333333] w-full text-left mb-6">
                      <User className="text-[#FF8A00]" />
                      <div>
                        <div className="text-sm text-[#D7E2EA]/60 uppercase tracking-widest">Meeting With</div>
                        <div className="font-bold text-[#D7E2EA]">AI Dynamic Team</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setBookingState('idle')}
                      className="text-[#D7E2EA]/60 hover:text-[#D7E2EA] transition-colors underline"
                    >
                      Book another time
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
