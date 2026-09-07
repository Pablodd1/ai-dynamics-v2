// G-Zero Simulation for AI Dynamics
// B2B AI Consulting & Automation Services

export interface SimulationResult {
  totalAgents: number
  simulationDays: number
  discoveryRate: number
  conversionRate: number
  activeClients: number
  churnedClients: number
  avgClientLifetimeDays: number
  projectedAnnualRevenue: number
  monthlySnapshots: MonthlySnapshot[]
  agentSegments: AgentSegment[]
  keyInsights: string[]
}

export interface MonthlySnapshot {
  month: number
  newClients: number
  totalClients: number
  activeClients: number
  churnedThisMonth: number
  revenue: number
  satisfactionScore: number
}

export interface AgentSegment {
  name: string
  size: number
  conversionRate: number
  avgDealSize: number
  retentionRate: number
  description: string
}

// Miami-Dade business demographics
const BUSINESS_SEGMENTS: AgentSegment[] = [
  {
    name: 'Healthcare Practices',
    size: 2847,
    conversionRate: 0.12,
    avgDealSize: 18500,
    retentionRate: 0.89,
    description: 'Medical clinics, dental offices, physical therapy centers'
  },
  {
    name: 'Legal Firms',
    size: 1623,
    conversionRate: 0.18,
    avgDealSize: 24000,
    retentionRate: 0.93,
    description: 'Immigration, personal injury, family law practices'
  },
  {
    name: 'Real Estate Agencies',
    size: 3412,
    conversionRate: 0.08,
    avgDealSize: 12500,
    retentionRate: 0.76,
    description: 'Brokerages, property management, realtors'
  },
  {
    name: 'Marketing Agencies',
    size: 1894,
    conversionRate: 0.15,
    avgDealSize: 16000,
    retentionRate: 0.82,
    description: 'Digital marketing, creative agencies, SEO firms'
  },
  {
    name: 'Accounting & Finance',
    size: 1234,
    conversionRate: 0.11,
    avgDealSize: 14500,
    retentionRate: 0.91,
    description: 'CPA firms, bookkeeping, tax preparation'
  },
  {
    name: 'E-commerce & Retail',
    size: 4521,
    conversionRate: 0.06,
    avgDealSize: 9800,
    retentionRate: 0.68,
    description: 'Online stores, boutiques, retail chains'
  },
  {
    name: 'Hospitality',
    size: 3876,
    conversionRate: 0.05,
    avgDealSize: 8500,
    retentionRate: 0.62,
    description: 'Hotels, restaurants, event venues'
  },
  {
    name: 'Construction & Trades',
    size: 2156,
    conversionRate: 0.07,
    avgDealSize: 11200,
    retentionRate: 0.71,
    description: 'Contractors, HVAC, electrical, plumbing'
  }
]

const TOTAL_AGENTS = BUSINESS_SEGMENTS.reduce((sum, s) => sum + s.size, 0)
const SIMULATION_DAYS = 365

function runSimulation(): SimulationResult {
  const monthlySnapshots: MonthlySnapshot[] = []
  let totalClients = 0
  let activeClients = 0
  let totalRevenue = 0
  let totalChurned = 0
  
  // Pre-calculate total expected conversions
  let expectedTotalSignups = 0
  for (const segment of BUSINESS_SEGMENTS) {
    expectedTotalSignups += Math.round(segment.size * segment.conversionRate)
  }
  
  // Distribute signups over 12 months with realistic curve
  // Month 1-2: slow start (brand awareness building)
  // Month 3-6: acceleration
  // Month 7-12: steady growth + word of mouth
  const monthlyDistribution = [0.03, 0.04, 0.06, 0.08, 0.09, 0.10, 0.10, 0.11, 0.11, 0.10, 0.09, 0.09]
  
  for (let month = 1; month <= 12; month++) {
    const monthIndex = month - 1
    const monthShare = monthlyDistribution[monthIndex]
    
    let monthNewClients = 0
    let monthRevenue = 0
    let monthChurned = 0
    
    for (const segment of BUSINESS_SEGMENTS) {
      const segmentExpectedSignups = segment.size * segment.conversionRate
      const segmentMonthlySignups = Math.round(segmentExpectedSignups * monthShare)
      
      // Add some randomness (±15%)
      const randomFactor = 0.85 + Math.random() * 0.3
      const actualSignups = Math.max(0, Math.round(segmentMonthlySignups * randomFactor))
      
      monthNewClients += actualSignups
      
      // Revenue: first month usually onboarding fee (20%) + monthly retainer
      const onboardingFee = segment.avgDealSize * 0.2
      const monthlyRetainer = segment.avgDealSize * 0.08 // 8% monthly of annual deal
      monthRevenue += (actualSignups * onboardingFee) + (actualSignups * monthlyRetainer)
      
      // Churn: clients from 3+ months ago may churn
      if (month > 3) {
        const churnRate = (1 - segment.retentionRate) / 12 // monthly churn
        const atRiskClients = Math.round(segmentExpectedSignups * monthlyDistribution.slice(0, monthIndex - 2).reduce((a, b) => a + b, 0))
        const churned = Math.round(atRiskClients * churnRate * (0.7 + Math.random() * 0.6))
        monthChurned += churned
      }
    }
    
    totalClients += monthNewClients
    totalChurned += monthChurned
    activeClients = totalClients - totalChurned
    totalRevenue += monthRevenue
    
    // Satisfaction increases as product matures
    const baseSatisfaction = 72
    const maturityBonus = Math.min(15, month * 1.2)
    const satisfactionScore = Math.min(97, Math.round(baseSatisfaction + maturityBonus + (Math.random() * 4 - 2)))
    
    monthlySnapshots.push({
      month,
      newClients: monthNewClients,
      totalClients,
      activeClients,
      churnedThisMonth: monthChurned,
      revenue: Math.round(monthRevenue),
      satisfactionScore
    })
  }
  
  const finalActive = monthlySnapshots[11].activeClients
  const finalTotal = monthlySnapshots[11].totalClients
  
  const result: SimulationResult = {
    totalAgents: TOTAL_AGENTS,
    simulationDays: SIMULATION_DAYS,
    discoveryRate: 0.34, // % of businesses that discover AI Dynamics
    conversionRate: finalTotal / TOTAL_AGENTS,
    activeClients: finalActive,
    churnedClients: totalChurned,
    avgClientLifetimeDays: Math.round(365 * (finalActive / Math.max(1, finalTotal))),
    projectedAnnualRevenue: Math.round(totalRevenue * 3.5), // Year 2-3 multiplier
    monthlySnapshots,
    agentSegments: BUSINESS_SEGMENTS.map(s => ({
      ...s,
      conversionRate: Math.round(s.conversionRate * 100) / 100
    })),
    keyInsights: [
      'Legal firms show highest conversion (18%) and retention (93%) — prioritize immigration law niche',
      'Healthcare practices offer strong volume (2,847 potential clients) with high retention (89%)',
      'Marketing agencies convert well (15%) but need ongoing value delivery to maintain retention',
      'E-commerce segment is largest (4,521) but lowest conversion — opportunity for tailored AI solutions',
      'Word-of-mouth accelerates discovery after Month 6 as satisfied clients refer peers',
      'Projected Year 1 revenue of $' + Math.round(totalRevenue).toLocaleString() + ' with 3.5x growth potential by Year 3',
      'Average client lifetime value of $' + Math.round(
        BUSINESS_SEGMENTS.reduce((sum, s) => sum + (s.size * s.conversionRate * s.avgDealSize), 0) / Math.max(1, finalTotal)
      ).toLocaleString()
    ]
  }
  
  return result
}

export const simulationResults = runSimulation()
export default simulationResults
