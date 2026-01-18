import { useEffect } from 'react';

/**
 * SEO Component for React 19
 * Updates document head with meta tags, Open Graph, Twitter Cards, and structured data
 */
const SEO = ({
  title = 'Adamant HR - Premier Workforce Solutions in Noida, NCR India',
  description = 'Adamant HR Consulting Pvt. Ltd. provides end-to-end staffing, recruitment, payroll, BGV, security, and compliance solutions across India. Based in Noida, UP.',
  keywords = 'HR agency Noida, staffing solutions NCR, recruitment services India, payroll management, BGV services, workforce solutions Noida',
  image = 'https://adamanthr.com/images/logo.png',
  url = 'https://adamanthr.com',
  type = 'website',
  structuredData = null,
  canonical = null,
}) => {
  useEffect(() => {
    // Update title
    document.title = title;

    // Helper function to update or create meta tag
    const updateMetaTag = (name, content, attribute = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper function to update or create link tag
    const updateLinkTag = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'Adamant HR Consulting Pvt. Ltd.');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('googlebot', 'index, follow');
    updateMetaTag('language', 'English');
    updateMetaTag('revisit-after', '7 days');

    // Open Graph tags
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:image', image, 'property');
    updateMetaTag('og:url', url, 'property');
    updateMetaTag('og:type', type, 'property');
    updateMetaTag('og:site_name', 'Adamant HR', 'property');
    updateMetaTag('og:locale', 'en_IN', 'property');

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Canonical URL
    if (canonical) {
      updateLinkTag('canonical', canonical);
    } else {
      updateLinkTag('canonical', url);
    }

    // Structured Data (JSON-LD)
    if (structuredData) {
      // Remove existing structured data scripts
      const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
      existingScripts.forEach(script => script.remove());

      // Handle both single object and array of objects
      const dataArray = Array.isArray(structuredData) ? structuredData : [structuredData];
      
      // Add each structured data object
      dataArray.forEach(data => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(data);
        document.head.appendChild(script);
      });
    }

    // Cleanup function
    return () => {
      // Optionally clean up on unmount if needed
    };
  }, [title, description, keywords, image, url, type, structuredData, canonical]);

  return null; // This component doesn't render anything
};

export default SEO;

