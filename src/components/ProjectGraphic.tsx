import React, { useState } from 'react'

export type ProjectGraphicType = 
  | 'biomechanics'
  | 'spatial-3d'
  | 'telemetry'
  | 'data-pipeline'
  | 'voice-wave'
  | 'agentic-flow'
  | 'defect-vision'
  | 'marketplace'
  | 'crm-funnel'
  | 'simulation-matrix'

interface ProjectVisualMeta {
  imageUrl: string
  fallbackUrl: string
  telemetryBadge: string
  metricBadge: string
  accentHex: string
}

export const PROJECT_VISUAL_REGISTRY: Record<string, ProjectVisualMeta> = {
  'luxury-watch-computer-vision-ai': {
    imageUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=85',
    fallbackUrl: '/images/projects/luxury-neural-dark.jpg',
    telemetryBadge: 'CV // YOLOv8 + DINOv2 MACRO OCR',
    metricBadge: 'DIAL · BEZEL · SERIAL AUTH',
    accentHex: '#c5a059',
  },
  'jmm-jas-miami-method': {
    imageUrl: '/images/projects/sports-biomechanics.jpg',
    fallbackUrl: '/images/projects/running-kinematics.jpg',
    telemetryBadge: 'BIOMETRICS // HRV + WEARABLE AI',
    metricBadge: 'ADAPTIVE DAILY LOAD',
    accentHex: '#f59e0b',
  },
  'runform-running-biomechanics': {
    imageUrl: '/images/projects/running-kinematics.jpg',
    fallbackUrl: '/images/projects/sports-biomechanics.jpg',
    telemetryBadge: 'POSE AI // 33-JOINT KINEMATICS',
    metricBadge: 'MARKERLESS VIDEO GAIT',
    accentHex: '#10b981',
  },
  'cycling-bike-fit-analysis': {
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=85',
    fallbackUrl: '/images/projects/sports-biomechanics.jpg',
    telemetryBadge: 'AERO CV // KNEE & HIP ANGLES',
    metricBadge: 'TT DRAG & FIT ENGINE',
    accentHex: '#0ea5e9',
  },
  'clinical-movement-ataxia-assessment': {
    imageUrl: '/images/projects/healthcare-clinical.jpg',
    fallbackUrl: '/images/projects/running-kinematics.jpg',
    telemetryBadge: 'NEURO CV // POSTURAL SWAY',
    metricBadge: 'CLINICAL GAIT TELEMETRY',
    accentHex: '#06b6d4',
  },
  'remote-patient-monitoring': {
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85',
    fallbackUrl: '/images/projects/healthcare-clinical.jpg',
    telemetryBadge: 'RPM // CELLULAR VITALS STREAM',
    metricBadge: 'CPT 99453/99454/99457',
    accentHex: '#10b981',
  },
  'remote-therapeutic-monitoring': {
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=85',
    fallbackUrl: '/images/projects/healthcare-clinical.jpg',
    telemetryBadge: 'RTM // MSK REHAB VISION',
    metricBadge: 'CPT 98975–98981 LOGGING',
    accentHex: '#14b8a6',
  },
  'ai-medical-scribe-pocketscribe': {
    imageUrl: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1200&q=85',
    fallbackUrl: '/images/projects/healthcare-clinical.jpg',
    telemetryBadge: 'AMBIENT NLP // SOAP + ICD-10',
    metricBadge: '-70% CHARTING TIME',
    accentHex: '#10b981',
  },
  'medical-billing-rcm-automation': {
    imageUrl: '/images/projects/workflow-automation.jpg',
    fallbackUrl: '/images/projects/healthcare-clinical.jpg',
    telemetryBadge: 'RCM EDI // 837/835 SCRUBBER',
    metricBadge: 'AUTOMATED CLAIM RULES',
    accentHex: '#3b82f6',
  },
  'adaptive-ai-marketplace': {
    imageUrl: '/images/projects/executive-solutions.jpg',
    fallbackUrl: '/images/projects/consulting-boardroom.jpg',
    telemetryBadge: 'VECTOR SEARCH // <120ms',
    metricBadge: 'INTENT CONCIERGE AI',
    accentHex: '#a855f7',
  },
  'ai-voice-receptionist': {
    imageUrl: '/images/projects/voice-ai-receptionist.jpg',
    fallbackUrl: '/images/projects/digital-assistants.jpg',
    telemetryBadge: 'VOICE AI // RING-1 (<600ms)',
    metricBadge: '24/7 EN/ES RECEPTIONIST',
    accentHex: '#c5a059',
  },
  'ai-chatbots-digital-assistants': {
    imageUrl: '/images/projects/digital-assistants.jpg',
    fallbackUrl: '/images/projects/voice-ai-receptionist.jpg',
    telemetryBadge: 'RAG AGENT // DETERMINISTIC TOOLS',
    metricBadge: 'WEB · WHATSAPP · CRM',
    accentHex: '#0ea5e9',
  },
  'crm-revenue-automation': {
    imageUrl: '/images/projects/crm-revops-pipeline.jpg',
    fallbackUrl: '/images/projects/workflow-automation.jpg',
    telemetryBadge: 'REVOPS // <45s SPEED-TO-LEAD',
    metricBadge: '+44% BOOKED MEETINGS',
    accentHex: '#10b981',
  },
  'agentic-self-learning-websites': {
    imageUrl: '/images/projects/agentic-web-growth.jpg',
    fallbackUrl: '/images/projects/executive-solutions.jpg',
    telemetryBadge: 'AGENTIC WEB // INTENT ROUTING',
    metricBadge: 'ADAPTIVE CONVERSION UI',
    accentHex: '#c5a059',
  },
  'ai-seo-aeo-search-optimization': {
    imageUrl: '/images/projects/ai-market-research.jpg',
    fallbackUrl: '/images/projects/agentic-web-growth.jpg',
    telemetryBadge: 'AEO // SCHEMA.ORG JSON-LD',
    metricBadge: 'GOOGLE + LLM CITATIONS',
    accentHex: '#f59e0b',
  },
  'rapid-digital-launch-urgent-web': {
    imageUrl: '/images/projects/corporate-training.jpg',
    fallbackUrl: '/images/projects/executive-boardroom.jpg',
    telemetryBadge: 'EDGE DEPLOY // 5–10 DAYS',
    metricBadge: '95+ LIGHTHOUSE + AI',
    accentHex: '#06b6d4',
  },
  'room-defect-monitoring-ai': {
    imageUrl: '/images/projects/room-defect-vision.jpg',
    fallbackUrl: '/images/projects/spatial-3d-mapping.jpg',
    telemetryBadge: 'DEFECT CV // YOLOv10 MASK',
    metricBadge: '12 SURFACE DAMAGE CLASSES',
    accentHex: '#ef4444',
  },
  '3d-room-mapping-spatial-ai': {
    imageUrl: '/images/projects/spatial-3d-mapping.jpg',
    fallbackUrl: '/images/projects/room-defect-vision.jpg',
    telemetryBadge: 'SPATIAL AI // LIDAR + WEBXR',
    metricBadge: '2D SVG & 3D DIGITAL TWIN',
    accentHex: '#0ea5e9',
  },
  'estate-match-real-estate-ai': {
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
    fallbackUrl: '/images/projects/executive-boardroom.jpg',
    telemetryBadge: 'PROPTECH // VECTOR MANDATES',
    metricBadge: 'OFF-MARKET DEAL MATCHING',
    accentHex: '#c5a059',
  },
  'ai-market-business-research': {
    imageUrl: '/images/projects/consulting-boardroom.jpg',
    fallbackUrl: '/images/projects/ai-market-research.jpg',
    telemetryBadge: 'INTEL ENGINE // MULTI-SOURCE',
    metricBadge: 'VERIFIED CITATION BRIEFS',
    accentHex: '#6366f1',
  },
  'zero-g-business-simulation': {
    imageUrl: '/miami-ai-neural-cube.jpg',
    fallbackUrl: '/images/projects/luxury-neural-dark.jpg',
    telemetryBadge: 'MONTE CARLO // MULTI-AGENT',
    metricBadge: 'STOCHASTIC STRATEGY LAB',
    accentHex: '#c5a059',
  },
}

const TYPE_FALLBACK_VISUALS: Record<ProjectGraphicType, ProjectVisualMeta> = {
  'biomechanics': PROJECT_VISUAL_REGISTRY['runform-running-biomechanics'],
  'spatial-3d': PROJECT_VISUAL_REGISTRY['3d-room-mapping-spatial-ai'],
  'telemetry': PROJECT_VISUAL_REGISTRY['remote-patient-monitoring'],
  'data-pipeline': PROJECT_VISUAL_REGISTRY['ai-market-business-research'],
  'voice-wave': PROJECT_VISUAL_REGISTRY['ai-voice-receptionist'],
  'agentic-flow': PROJECT_VISUAL_REGISTRY['agentic-self-learning-websites'],
  'defect-vision': PROJECT_VISUAL_REGISTRY['luxury-watch-computer-vision-ai'],
  'marketplace': PROJECT_VISUAL_REGISTRY['adaptive-ai-marketplace'],
  'crm-funnel': PROJECT_VISUAL_REGISTRY['crm-revenue-automation'],
  'simulation-matrix': PROJECT_VISUAL_REGISTRY['zero-g-business-simulation'],
}

interface ProjectGraphicProps {
  type: ProjectGraphicType
  projectId?: string
  projectName?: string
  className?: string
  accentColor?: string
}

export const ProjectGraphic: React.FC<ProjectGraphicProps> = ({ 
  type, 
  projectId,
  projectName,
  className = 'w-full h-48',
}) => {
  const visual = (projectId && PROJECT_VISUAL_REGISTRY[projectId]) || TYPE_FALLBACK_VISUALS[type] || TYPE_FALLBACK_VISUALS['agentic-flow']
  const [imgSrc, setImgSrc] = useState(visual.imageUrl)

  return (
    <div className={`relative overflow-hidden rounded-xl bg-dark-50 border border-white/10 group/img ${className}`}>
      {/* Actual High-Resolution Photorealistic Image */}
      <img
        src={imgSrc}
        alt={projectName || visual.telemetryBadge}
        loading="lazy"
        onError={() => {
          if (imgSrc !== visual.fallbackUrl) {
            setImgSrc(visual.fallbackUrl)
          }
        }}
        className="w-full h-full object-cover object-center transform group-hover/img:scale-105 group-hover:scale-105 transition-transform duration-700 ease-out brightness-95 contrast-105"
      />

      {/* Cinematic Dark Luxury Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/25 to-black/30 pointer-events-none" />

      {/* Subtle AI Computer-Vision Corner Reticles */}
      <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-luxury-gold/60 pointer-events-none" />
      <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-luxury-gold/60 pointer-events-none" />
      <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-luxury-gold/60 pointer-events-none" />
      <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-luxury-gold/60 pointer-events-none" />

      {/* Top-Left Live Telemetry Pill */}
      <div className="absolute top-3 left-3.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/15">
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: visual.accentHex }}
        />
        <span className="text-[10px] font-mono font-bold tracking-wider text-white uppercase">
          {visual.telemetryBadge}
        </span>
      </div>

      {/* Bottom-Right Architecture Metric Pill */}
      <div className="absolute bottom-3 right-3.5 z-10 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-luxury-gold/40">
        <span className="text-[10px] font-mono font-semibold tracking-wider text-luxury-champagne uppercase">
          {visual.metricBadge}
        </span>
      </div>
    </div>
  )
}
