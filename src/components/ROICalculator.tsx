import { useState } from 'react'
import { Calculator, DollarSign, Clock, Users, ArrowRight, CheckCircle, TrendingUp } from 'lucide-react'

export default function ROICalculator() {
  const [employees, setEmployees] = useState<number>(3)
  const [hoursPerDay, setHoursPerDay] = useState<number>(4)
  const [hourlyWage, setHourlyWage] = useState<number>(25)
  const [missedCallsPerWeek, setMissedCallsPerWeek] = useState<number>(15)
  const [leadValue, setLeadValue] = useState<number>(350)

  // Calculations
  // Monthly manual hours cost = (employees * hoursPerDay * 22 working days * hourlyWage)
  const monthlyLaborCost = employees * hoursPerDay * 22 * hourlyWage
  // Monthly lost lead revenue = missedCallsPerWeek * 4.3 weeks * 0.25 (conservative 25% close rate) * leadValue
  const monthlyLostRevenue = Math.round(missedCallsPerWeek * 4.3 * 0.25 * leadValue)
  
  // With AI Dynamic: eliminates ~80% of repetitive admin time and recovers 90% of missed calls
  const monthlySavings = Math.round((monthlyLaborCost * 0.8) + (monthlyLostRevenue * 0.85))
  const annualSavings = monthlySavings * 12

  return (
    <section id="roi-calculator" className="py-24 relative overflow-hidden bg-gradient-to-b from-dark to-dark-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-luxury-gold/30 bg-luxury-gold/5 text-luxury-gold text-xs font-bold uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5" />
            Interactive ROI & Cost Elimination Estimator
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight mb-4">
            Calculate Exactly How Much Payroll & Leads <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold via-amber-300 to-luxury-gold">
              AI Dynamic Saves Your Business Every Month
            </span>
          </h2>
          <p className="text-luxury-silver text-base sm:text-lg">
            Move the sliders to reflect your current staff and daily call volume in South Florida.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-stretch">
          {/* Sliders Area (7 cols) */}
          <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-2xl p-7 sm:p-9 space-y-6 shadow-xl backdrop-blur-sm">
            {/* Slider 1: Staff count */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-luxury-gold" />
                  Staff Handling Calls & Repetitive Tasks
                </label>
                <span className="px-3 py-1 rounded-md bg-luxury-gold/10 text-luxury-gold font-bold text-sm">
                  {employees} {employees === 1 ? 'Person' : 'People'}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={20}
                value={employees}
                onChange={(e) => setEmployees(Number(e.target.value))}
                className="w-full h-2 bg-dark rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[11px] text-luxury-silver/50 mt-1">
                <span>1 staff</span>
                <span>10 staff</span>
                <span>20 staff</span>
              </div>
            </div>

            {/* Slider 2: Daily Hours Spent on Repetitive Work */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-luxury-gold" />
                  Hours per Person Spent on Admin & Scheduling Daily
                </label>
                <span className="px-3 py-1 rounded-md bg-luxury-gold/10 text-luxury-gold font-bold text-sm">
                  {hoursPerDay} hrs / day
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={8}
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(Number(e.target.value))}
                className="w-full h-2 bg-dark rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[11px] text-luxury-silver/50 mt-1">
                <span>1 hr</span>
                <span>4 hrs</span>
                <span>8 hrs (Full-time)</span>
              </div>
            </div>

            {/* Slider 3: Hourly Wage */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-white flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-luxury-gold" />
                  Average Hourly Wage (Including Taxes/Benefits)
                </label>
                <span className="px-3 py-1 rounded-md bg-luxury-gold/10 text-luxury-gold font-bold text-sm">
                  ${hourlyWage}/hr
                </span>
              </div>
              <input
                type="range"
                min={15}
                max={60}
                step={5}
                value={hourlyWage}
                onChange={(e) => setHourlyWage(Number(e.target.value))}
                className="w-full h-2 bg-dark rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[11px] text-luxury-silver/50 mt-1">
                <span>$15/hr</span>
                <span>$35/hr</span>
                <span>$60/hr</span>
              </div>
            </div>

            {/* Slider 4: Missed calls per week */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-luxury-gold" />
                  Missed / After-Hours Inquiries per Week
                </label>
                <span className="px-3 py-1 rounded-md bg-luxury-gold/10 text-luxury-gold font-bold text-sm">
                  {missedCallsPerWeek} Calls
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={50}
                value={missedCallsPerWeek}
                onChange={(e) => setMissedCallsPerWeek(Number(e.target.value))}
                className="w-full h-2 bg-dark rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[11px] text-luxury-silver/50 mt-1">
                <span>0 calls</span>
                <span>25 calls</span>
                <span>50 calls</span>
              </div>
            </div>

            {/* Slider 5: Average customer value */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-luxury-gold" />
                  Average Value of a New Client / Job
                </label>
                <span className="px-3 py-1 rounded-md bg-luxury-gold/10 text-luxury-gold font-bold text-sm">
                  ${leadValue}
                </span>
              </div>
              <input
                type="range"
                min={100}
                max={2500}
                step={50}
                value={leadValue}
                onChange={(e) => setLeadValue(Number(e.target.value))}
                className="w-full h-2 bg-dark rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[11px] text-luxury-silver/50 mt-1">
                <span>$100</span>
                <span>$1,000</span>
                <span>$2,500+</span>
              </div>
            </div>
          </div>

          {/* Results Card (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-luxury-gold/15 via-dark to-dark border-2 border-luxury-gold/40 p-8 flex flex-col justify-between shadow-[0_0_50px_rgba(212,175,55,0.15)]">
            <div>
              <span className="text-xs font-bold text-luxury-gold uppercase tracking-wider block mb-2">
                Estimated Net ROI Impact
              </span>
              <h3 className="text-2xl font-bold text-white mb-6">
                Your Projected Savings
              </h3>

              <div className="space-y-6">
                <div className="p-5 rounded-xl bg-black/40 border border-luxury-gold/20">
                  <span className="text-xs text-luxury-silver block">Monthly Value Recovered</span>
                  <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold via-amber-200 to-luxury-gold mt-1">
                    ${monthlySavings.toLocaleString()} <span className="text-base text-luxury-silver font-normal">/ month</span>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                  <span className="text-xs text-emerald-400 font-semibold block">12-Month Net Revenue Impact</span>
                  <div className="text-3xl font-black text-emerald-300 mt-1">
                    +${annualSavings.toLocaleString()} <span className="text-sm font-normal text-emerald-400/70">/ year</span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-luxury-silver/90 pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
                    <span>Replaces {Math.round(hoursPerDay * employees * 22 * 0.8)} hours of manual busywork monthly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
                    <span>Picks up 100% of missed after-hours calls 24/7/365</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
                    <span>Typical AI Dynamic deployment: 14 business days</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <a
                href="https://calendly.com/aidynamicpro/discovery"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-luxury-gold via-amber-300 to-luxury-gold text-dark flex items-center justify-center gap-2 hover:brightness-110 shadow-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all"
              >
                Claim Your Free Automation Audit <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-[11px] text-center text-luxury-silver/60 mt-2">
                30-min strategy session with Founder Jasmel Acosta • No commitment
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
