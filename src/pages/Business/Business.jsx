import React from 'react'
import './Business.css';
import SmileFaces from '../../components/SubComponents/SmileFaces';
import AllIndustries from '../../components/SubComponents/AllIndustries';
import ContactSection from '../../components/ContactSection/ContactSection';
import SEO from '../../components/SEO/SEO';
import { getBreadcrumbStructuredData, getBusinessPageStructuredData } from '../../components/SEO/StructuredData';

const Business = ({url}) => {
  const structuredData = [
    getBreadcrumbStructuredData([
      { name: 'Home', url: 'https://adamanthr.com' },
      { name: 'Business', url: 'https://adamanthr.com/business' }
    ]),
    getBusinessPageStructuredData()
  ];

  return (
    <div>
      <SEO
        title="Business Solutions - Industry Expertise & Client Success | Adamant HR"
        description="Partner with Adamant HR for comprehensive business solutions across BFSI, NBFC, FMCG, Manufacturing, Retail, Pharma, and Service sectors. Trusted by leading brands across India."
        keywords="business solutions, industry expertise, BFSI recruitment, NBFC staffing, FMCG hiring, manufacturing workforce, retail staffing, pharma recruitment"
        url="https://adamanthr.com/business"
        structuredData={structuredData}
      />
        <SmileFaces />
        <AllIndustries url={url} />
        <div className='box-client'>
          <h1 className='heading-client section-title'>Our Clients</h1>
          <img src="images/client.png" alt="clients" style={{width:"100%"}} />
        </div>
        <ContactSection />
    </div>
  )
}

export default Business