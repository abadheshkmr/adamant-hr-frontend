import React from 'react'
import './Home.css';
import Carousel from '../../components/Carousel/Carousel'
import TalentSection from '../../components/TalentSection/TalentSection';
import FeaturesSection from '../../components/FeatureSection/FeaturesSection';
import Services from '../../components/Services/Services';
import IndustrySlider from '../../components/IndustrySlider/IndustrySlider';
import OfficeLocations from '../../components/OfficeLocations/OfficeLocations';
import ContactSection from '../../components/ContactSection/ContactSection';
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs';
import Contact from '../Contact/Contact';
import SEO from '../../components/SEO/SEO';
import { getLocalBusinessStructuredData, getOrganizationStructuredData } from '../../components/SEO/StructuredData';

const Home = ({url}) => {
  const structuredData = [
    getLocalBusinessStructuredData(),
    getOrganizationStructuredData()
  ];

  return (
    <div>
      <SEO
        title="Adamant HR - Premier Workforce Solutions in Noida, NCR India | Staffing & Recruitment"
        description="Adamant HR Consulting Pvt. Ltd. - Leading HR agency in Noida, NCR providing end-to-end staffing, recruitment, payroll, BGV, security, and compliance solutions across India. 10+ years experience, 4500+ candidates placed, 100% statutory compliance."
        keywords="HR agency Noida, staffing solutions NCR, recruitment services India, payroll management Noida, BGV services, workforce solutions, HR consulting Noida, talent acquisition India, background verification services, compliance solutions India, Noida HR services"
        url="https://adamanthr.com"
        structuredData={structuredData}
      />
        <Carousel />

        <section className="partner-section">
            <h2>Partner with a Premier Executive Talent Firm</h2>
            <div className="partner-buttons">
            <button className="partner-btn">Employers</button>
            <button className="partner-btn">Careers</button>
            </div>
        </section>

        <section className="chamber-section">
            {/* <div className="chamber-logo">
                <img src="/images/chamber.png" alt="Windsor Essex Chamber of Commerce" />
            </div> */}

            <div className="chamber-stats">
                <div className="stat">
                <h3>10+ <span>Years</span></h3>
                <p>Experience in helping businesses</p>
                </div>
                <div className="stat">
                <h3>100 <span>%</span></h3>
                <p>Statutory Compliance</p>
                </div>
                <div className="stat">
                <h3>4.5K+</h3>
                <p>Candidates Placed</p>
                </div>
                <div className="stat">
                <h3>20+</h3>
                <p>States Connectivity in India</p>
                </div>
            </div>
         </section>

        <TalentSection />

        <FeaturesSection />

        <Services url={url} />

        <IndustrySlider />

        {/* <Reviews /> */}


        <WhyChooseUs />
        <Contact />
        <OfficeLocations />
        <ContactSection />

    </div>

  )
}

export default Home