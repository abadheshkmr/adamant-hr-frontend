import React from "react";
import "./AboutUs.css";
import SEO from "../../../components/SEO/SEO";
import { getOrganizationStructuredData, getBreadcrumbStructuredData, getAboutPageStructuredData } from "../../../components/SEO/StructuredData";

export default function AboutUs() {
    const structuredData = [
        getOrganizationStructuredData(),
        getAboutPageStructuredData(),
        getBreadcrumbStructuredData([
            { name: 'Home', url: 'https://adamanthr.com' },
            { name: 'About Us', url: 'https://adamanthr.com/aboutus' }
        ])
    ];

    return (
        <>
            <SEO
                title="About Us - Adamant HR Consulting | Leading HR Agency in Noida, NCR India"
                description="Learn about Adamant HR Consulting Pvt. Ltd. - A premier workforce and compliance solutions organisation with 10+ years of experience, 4500+ candidates placed, serving BFSI, NBFC, FMCG, Manufacturing, and Retail sectors across India."
                keywords="about Adamant HR, HR company Noida, workforce solutions company, HR consulting firm India, staffing company NCR, recruitment agency Noida"
                url="https://adamanthr.com/aboutus"
                structuredData={structuredData}
            />
            <div className="about-wrapper">
<div className="about-header">
<h1>Who We Are</h1>
<p>
Adamant HR Consulting Pvt. Ltd. is a premier workforce and compliance
solutions organisation offering integrated HR, BGV, Payroll, Security,
Facility, Legal, Health, and Construction services across India.
</p>
<p>
For over a decade, we have partnered with leading brands across BFSI,
NBFC, FMCG, Manufacturing, Logistics, Retail, Pharma, and Service
sectors, helping them build high-performing, verified, and compliant
teams.
</p>
</div>


<div className="about-section">
<h2>Our Mission</h2>
<p>
“To deliver world-class workforce, security, compliance, and
operational solutions that empower businesses to scale with
confidence, transparency, and trust.”
</p>
</div>


<div className="about-section">
<h2>Our Vision</h2>
<p>
“To be India’s most reliable and respected workforce solutions
partner, enabling organisations to grow through integrity, innovation,
and people excellence.”
</p>
</div>


<div className="about-values">
<h2>Our Core Values</h2>
<ul>
<li><strong>Integrity:</strong> Zero compromise on ethics.</li>
<li><strong>Compliance:</strong> 100% statutory adherence.</li>
<li><strong>People First:</strong> Empowering teams and clients.</li>
<li><strong>Commitment:</strong> Delivering more than expectations.</li>
<li>
<strong>Innovation:</strong> Digitised processes & modern HR
solutions.
</li>
</ul>
</div>


<div className="about-section">
<h2>Our Leadership Strength</h2>
<p>
Adamant HR is led by experienced professionals with deep expertise in
recruitment, compliance, statutory operations, and enterprise
workforce management.
</p>
<p className="leadership-quote">
“Deliver excellence. Build trust. Ensure results.”
</p>
</div>

<div className="about-deliver">
<h2>What We Deliver</h2>
<ul>
<li>✔ 4,500+ Deployed Workforce</li>
<li>✔ PAN India Delivery Network</li>
<li>✔ 10+ Years of Industry Experience</li>
<li>✔ 100% Statutory Compliance</li>
<li>✔ Trusted by BFSI, NBFC, FMCG, Manufacturing & Retail Leaders</li>
<li>✔ Dedicated Client Servicing Model</li>
</ul>
</div>

</div>
        </>
    );
}