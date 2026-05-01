import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface SEOProps {
  title?: string
  description?: string
  ogImage?: string
  ogType?: string
  canonical?: string
  noindex?: boolean
  schema?: object
}

const defaultDescription = "We help small and mid-sized businesses eliminate manual workflows with AI. Any industry. Fast results. Book a free consultation."

const defaultOgImage = "https://aidynamics.pro/og-image.jpg"

export function SEO({
  title = "AI Dynamics | Premium AI Consulting & Automation",
  description = defaultDescription,
  ogImage = defaultOgImage,
  ogType = "website",
  canonical,
  noindex = false,
  schema
}: SEOProps) {
  const location = useLocation()
  const url = `https://aidynamics.pro${location.pathname}`

  useEffect(() => {
    document.title = title

    const metaTags: Record<string, string> = {
      'description': description,
      'keywords': 'AI automation, small business automation, workflow automation, AI consulting, business process automation, AI for healthcare, AI for legal, AI for real estate, Miami AI consultant, free AI consultation, AI Dynamics, intelligent automation, custom AI solutions, reduce manual work, AI workflow builder',
      'author': 'AI Dynamics',
      'robots': noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      'googlebot': 'index, follow',
      'bingbot': 'index, follow',
      'viewport': 'width=device-width, initial-scale=1.0',
      'theme-color': '#0a0a0f',
      'format-detection': 'telephone=no',

      // Open Graph
      'og:title': title,
      'og:description': description,
      'og:type': ogType,
      'og:url': canonical || url,
      'og:image': ogImage,
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': title,
      'og:site_name': 'AI Dynamics',
      'og:locale': 'en_US',
      'og:locale:alternate': 'es_ES',

      // Twitter/X
      'twitter:card': 'summary_large_image',
      'twitter:site': '@aidynamics',
      'twitter:creator': '@aidynamics',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': ogImage,
      'twitter:image:alt': title,

      // AI SEO / LLM discoverability
      'ai-content-type': 'business-website',
      'ai-purpose': 'AI consulting and automation services for businesses',
      'ai-target-audience': 'small-to-medium businesses, healthcare practices, legal firms, marketing agencies',
      'ai-service-category': 'technology-consulting, ai-automation, process-optimization',
      'ai-region': 'Miami-Dade, Florida, United States',
      'ai-language': 'en, es',

      // Apple / iOS
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'apple-mobile-web-app-title': 'AI Dynamics',

      // Microsoft
      'msapplication-TileColor': '#0a0a0f',
      'msapplication-config': '/browserconfig.xml',

      // Canonical
      ...(canonical ? { 'canonical': canonical } : {})
    }

    // Update or create meta tags
    for (const [name, content] of Object.entries(metaTags)) {
      if (!content) continue

      let meta: HTMLMetaElement | null
      if (name.startsWith('og:')) {
        meta = document.querySelector(`meta[property="${name}"]`)
        if (!meta) {
          meta = document.createElement('meta')
          meta.setAttribute('property', name)
          document.head.appendChild(meta)
        }
      } else {
        meta = document.querySelector(`meta[name="${name}"]`)
        if (!meta) {
          meta = document.createElement('meta')
          meta.setAttribute('name', name)
          document.head.appendChild(meta)
        }
      }
      meta.setAttribute('content', content)
    }

    // Update canonical link
    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!linkCanonical) {
      linkCanonical = document.createElement('link')
      linkCanonical.setAttribute('rel', 'canonical')
      document.head.appendChild(linkCanonical)
    }
    linkCanonical.setAttribute('href', canonical || url)

    // Add JSON-LD schema
    if (schema) {
      let scriptTag = document.getElementById('json-ld-schema') as HTMLScriptElement | null
      if (!scriptTag) {
        scriptTag = document.createElement('script')
        scriptTag.id = 'json-ld-schema'
        scriptTag.setAttribute('type', 'application/ld+json')
        document.head.appendChild(scriptTag)
      }
      scriptTag.textContent = JSON.stringify(schema)
    }

    return () => {
      // Cleanup only our dynamically added tags on unmount
      document.querySelectorAll('meta[data-dynamic="seo"]').forEach(el => el.remove())
    }
  }, [title, description, ogImage, ogType, canonical, noindex, schema, url])

  return null
}

// Pre-built schemas for common pages
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://aidynamics.pro/#organization",
  "name": "AI Dynamics",
  "alternateName": "AI Dynamics.PRO",
  "url": "https://aidynamics.pro",
  "logo": {
    "@type": "ImageObject",
    "url": "https://aidynamics.pro/logo.png",
    "width": 512,
    "height": 512
  },
  "description": defaultDescription,
  "foundingDate": "2024",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Miami",
    "addressRegion": "FL",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-786-643-2099",
    "contactType": "customer service",
    "email": "jasmelacosta@gmail.com",
    "areaServed": "US-FL",
    "availableLanguage": ["English", "Spanish"]
  },
  "sameAs": [
    "https://github.com/Pablodd1",
    "https://linkedin.com/company/ai-dynamics"
  ],
  "areaServed": {
    "@type": "City",
    "name": "Miami",
    "containedInPlace": {
      "@type": "State",
      "name": "Florida"
    }
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "AI Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom AI Agents",
          "description": "Intelligent agents tailored to your business operations"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Workflow Automation",
          "description": "End-to-end process automation and optimization"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Integration",
          "description": "Seamless integration of AI into existing systems"
        }
      }
    ]
  }
}

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://aidynamics.pro/#business",
  "name": "AI Dynamics",
  "image": "https://aidynamics.pro/og-image.jpg",
  "url": "https://aidynamics.pro",
  "telephone": "+1-786-643-2099",
  "email": "jasmelacosta@gmail.com",
  "priceRange": "$$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Miami",
    "addressRegion": "FL",
    "postalCode": "33101",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 25.7617,
    "longitude": -80.1918
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "serviceType": [
    "AI Consulting",
    "Business Process Automation",
    "Machine Learning Integration",
    "Custom AI Development"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "47"
  }
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://aidynamics.pro/#website",
  "url": "https://aidynamics.pro",
  "name": "AI Dynamics",
  "alternateName": "AI Dynamics.PRO",
  "publisher": {
    "@id": "https://aidynamics.pro/#organization"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://aidynamics.pro/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "inLanguage": ["en-US", "es-ES"]
}

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "AI Consulting and Automation",
  "provider": {
    "@id": "https://aidynamics.pro/#organization"
  },
  "areaServed": {
    "@type": "State",
    "name": "Florida"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "AI Dynamics Services",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom AI Agents",
            "description": "Intelligent agents for customer service, scheduling, and operations"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Workflow Automation",
            "description": "Automate repetitive tasks and document processing"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Integration",
            "description": "Seamless AI integration into existing business systems"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Process Intelligence",
            "description": "AI-powered analytics and process optimization"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 5,
        "item": {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Strategy",
            "description": "Roadmap development for AI adoption and digital transformation"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 6,
        "item": {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Staff Augmentation",
            "description": "On-demand AI engineering and development resources"
          }
        }
      }
    ]
  }
}

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
})

export default SEO
