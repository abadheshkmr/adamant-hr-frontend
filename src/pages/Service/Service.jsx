import React from 'react';
import './Service.css';
import ContactSection from '../../components/ContactSection/ContactSection';
import Services from '../../components/Services/Services';
import AllServices from '../../components/SubComponents/AllServices';
import SEO from '../../components/SEO/SEO';
import { getServiceStructuredData, getBreadcrumbStructuredData } from '../../components/SEO/StructuredData';

const Service = ({url}) => {
    const structuredData = [
        getServiceStructuredData(
            'Workforce Solutions',
            'Comprehensive HR services including staffing, recruitment, payroll management, background verification, security & facility management, legal services, construction, and home nursing. Pan-India delivery with 100% statutory compliance. Serving Noida, NCR, and across India with 10+ years experience and 4500+ successful placements.'
        ),
        getBreadcrumbStructuredData([
            { name: 'Home', url: 'https://adamanthr.com' },
            { name: 'Services', url: 'https://adamanthr.com/services' }
        ])
    ];

    return (
        <div>
            <SEO
                title="Workforce Solutions Services - Staffing, Recruitment & HR Services | Adamant HR Noida"
                description="Comprehensive workforce solutions from Adamant HR Noida: staffing, recruitment, payroll management, BGV, security & facility management, legal services, construction, and home nursing. Pan-India delivery with 100% statutory compliance. 10+ years experience, 4500+ placements. Based in Noida, NCR."
                keywords="workforce solutions, staffing services Noida, recruitment services, payroll management, BGV services, HR outsourcing, talent acquisition, workforce management India, background verification Noida, security services, facility management, legal services, construction services, home nursing services"
                url="https://adamanthr.com/services"
                structuredData={structuredData}
            />
            <section className="wf-hero">
                <div className="wf-content">
                    {/* <span className="wf-badge">SERVICES</span> */}
                    <h1 className="wf-title">Workforce Solutions</h1>
                    <p className="wf-subtitle">
                        Elevate Your Business with Reliable and Efficient Technology-Driven
                        Talent Solutions in the India, and USA
                    </p>
                    <button className="wf-button"
                        onClick={() => {
                            document
                                .getElementById("form-container")
                                ?.scrollIntoView({ behavior: "smooth" });
                        }}
                    >Schedule a Free Consultation</button>
                </div>
                {/* Decorative overlay */}
                <div className="wf-pattern" aria-hidden="true"></div>
            </section>
            <Services url={url} />
            <AllServices />
            <ContactSection />
        </div>


    )
}

export default Service