/**
 * Structured Data (JSON-LD) for Local Business
 * Helps search engines understand your business better
 */

export const getLocalBusinessStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Adamant HR Consulting Pvt. Ltd.',
    'alternateName': 'Adamant HR',
    'url': 'https://adamanthr.com',
    'logo': 'https://adamanthr.com/images/logo.png',
    'image': 'https://adamanthr.com/images/logo.png',
    'description': 'Premier workforce and compliance solutions organisation offering integrated HR, BGV, Payroll, Security, Facility, Legal, Health, and Construction services across India.',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'B1, Building No 50, Block-C Sec-6',
      'addressLocality': 'Noida',
      'addressRegion': 'Uttar Pradesh',
      'postalCode': '201301',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '28.5355',
      'longitude': '77.3910'
    },
    'telephone': '+91-9650481240',
    'email': 'info@adamanthr.com',
    'priceRange': '$$',
    'areaServed': {
      '@type': 'Country',
      'name': 'India'
    },
    'makesOffer': [
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Staffing Solutions',
          'description': 'End-to-end staffing and workforce management across India'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Recruitment Services',
          'description': 'High-quality hiring services for entry to senior-level positions'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Payroll Management',
          'description': '100% statutory-compliant payroll and HR outsourcing'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Background Verification',
          'description': 'Trusted background checks for a safe and reliable workforce'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Security & Facility Management',
          'description': 'Professional security guards and facility management services'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Legal Services',
          'description': 'Affordable legal and trademark services'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Construction Services',
          'description': 'Turnkey construction, renovation and civil work services'
        }
      }
    ],
    'sameAs': [
      'https://www.linkedin.com/company/adamanthr/'
    ],
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.5',
      'reviewCount': '100'
    }
  };
};

export const getOrganizationStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Adamant HR Consulting Pvt. Ltd.',
    'url': 'https://adamanthr.com',
    'logo': 'https://adamanthr.com/images/logo.png',
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+91-9650481240',
      'contactType': 'Customer Service',
      'email': 'info@adamanthr.com',
      'areaServed': 'IN',
      'availableLanguage': ['English', 'Hindi']
    },
    'sameAs': [
      'https://www.linkedin.com/company/adamanthr/'
    ]
  };
};

export const getBreadcrumbStructuredData = (items) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url
    }))
  };
};

export const getServiceStructuredData = (serviceName, description) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': serviceName,
    'provider': {
      '@type': 'LocalBusiness',
      'name': 'Adamant HR Consulting Pvt. Ltd.',
      'url': 'https://adamanthr.com'
    },
    'description': description,
    'areaServed': {
      '@type': 'Country',
      'name': 'India'
    }
  };
};

export const getBusinessPageStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': 'Business Solutions - Industries & Clients',
    'description': 'Adamant HR serves leading businesses across BFSI, NBFC, FMCG, Manufacturing, Retail, Pharma, IT, Logistics, Healthcare, and Service sectors. Trusted workforce solutions partner for 10+ years.',
    'url': 'https://adamanthr.com/business',
    'about': {
      '@type': 'ItemList',
      'name': 'Industries Served',
      'description': 'Industries and sectors where Adamant HR provides workforce solutions',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'BFSI (Banking, Financial Services & Insurance)'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'NBFC (Non-Banking Financial Companies)'
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': 'FMCG (Fast-Moving Consumer Goods)'
        },
        {
          '@type': 'ListItem',
          'position': 4,
          'name': 'Manufacturing'
        },
        {
          '@type': 'ListItem',
          'position': 5,
          'name': 'Retail'
        },
        {
          '@type': 'ListItem',
          'position': 6,
          'name': 'Pharmaceuticals'
        },
        {
          '@type': 'ListItem',
          'position': 7,
          'name': 'Information Technology (IT)'
        },
        {
          '@type': 'ListItem',
          'position': 8,
          'name': 'Logistics'
        },
        {
          '@type': 'ListItem',
          'position': 9,
          'name': 'Healthcare'
        },
        {
          '@type': 'ListItem',
          'position': 10,
          'name': 'Service Sector'
        }
      ]
    },
    'publisher': {
      '@type': 'LocalBusiness',
      'name': 'Adamant HR Consulting Pvt. Ltd.',
      'url': 'https://adamanthr.com'
    }
  };
};

export const getAboutPageStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': 'About Us - Adamant HR Consulting',
    'description': 'Learn about Adamant HR Consulting Pvt. Ltd. - A premier workforce and compliance solutions organisation with 10+ years of experience, 4500+ candidates placed, serving BFSI, NBFC, FMCG, Manufacturing, and Retail sectors across India.',
    'url': 'https://adamanthr.com/aboutus',
    'about': {
      '@type': 'Organization',
      'name': 'Adamant HR Consulting Pvt. Ltd.',
      'alternateName': 'Adamant HR',
      'url': 'https://adamanthr.com',
      'foundingDate': '2014',
      'numberOfEmployees': {
        '@type': 'QuantitativeValue',
        'value': '50-100'
      },
      'description': 'Premier workforce and compliance solutions organisation offering integrated HR, BGV, Payroll, Security, Facility, Legal, Health, and Construction services across India.',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'B1, Building No 50, Block-C Sec-6',
        'addressLocality': 'Noida',
        'addressRegion': 'Uttar Pradesh',
        'postalCode': '201301',
        'addressCountry': 'IN'
      },
      'knowsAbout': [
        'Workforce Solutions',
        'Recruitment Services',
        'Payroll Management',
        'Background Verification',
        'Compliance Solutions',
        'HR Consulting'
      ]
    },
    'publisher': {
      '@type': 'LocalBusiness',
      'name': 'Adamant HR Consulting Pvt. Ltd.',
      'url': 'https://adamanthr.com'
    }
  };
};

