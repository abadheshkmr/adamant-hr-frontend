// src/components/Services.js

import React, { useEffect, useState, useCallback } from 'react';
import './Services.css';
import axios from 'axios';

// const services = [
//   {
//     title: 'Temporary Staffing',
//     description: 'As a Michigan-based staffing firm, we provide temporary staffing solutions across North America and India. Find skilled professionals for your short-term needs through our flexible workforce solutions and temp services.',
//     icon: '🤝',
//   },
//   {
//     title: 'Permanent Staffing',
//     description: 'From our Michigan headquarters, we deliver permanent placement services, connecting you with top talent throughout North America and India. Discover effective talent acquisition solutions with our direct hire recruiting expertise.',
//     icon: '👥',
//   },
//   {
//     title: 'Contract-to-Hire',
//     description: 'We offer contract-to-hire staffing solutions across North America and India. Based in Michigan, our agency helps you evaluate candidates through temp-to-perm jobs, ensuring the perfect fit with our evaluation hire services.',
//     icon: '📃',
//   },
//   {
//     title: 'On-Site Staffing Solutions',
//     description: 'Optimize your workforce with our on-site staffing solutions, available throughout North America and India. As a Michigan-based provider, our managed staffing services bring efficiency and innovation directly to your premises.',
//     icon: '🎯',
//   },
//   {
//     title: 'Remote Work Solutions',
//     description: 'We embrace the future of work with remote staffing solutions for businesses in North America and India. We specialize in virtual assistant staffing, connecting you with top remote talent and optimizing collaboration.',
//     icon: '🔗',
//   },
//   {
//     title: 'Specialized Skill Placement',
//     description: 'We provide specialized skill placement services across North America and India. Find the rare skills your projects demand through our niche staffing solutions.',
//     icon: '🚩',
//   },
// ];



const Services = ({url}) => {

const [services , setServices] = useState ([]);

  const fetchlist = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/api/service/list`);
      console.log(`${url}/api/service/list`);
      
      if (response.data.success) {
        setServices(response.data.data);
        console.log(response.data.data);
        
      } else {
        alert("Error fetching services");
      }
    } catch (error) {
      console.error("Axios error:", error);
      alert("Network or server error");
    }
  }, [url]);

  useEffect(()=>{
    fetchlist();
  }, [fetchlist]);

  return (
    <div className="services-section">
      <h1 className="section-title"> Services</h1>
      {/* Main Grid (6 services) */}
      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon"><img src={`${url}/images/${service.icon}`} alt="" /></div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>

      {/* RPO Section */}
      <div className="rpo-container">
        {/* Left Card */}
        <div className="rpo-card">
          <div className="service-icon">🖥️</div>
          <h3 className="service-title">Recruitment Process Outsourcing (RPO)</h3>
          <p className="service-description">
            Streamline your talent acquisition with Adamant HR's Recruitment Process Outsourcing (RPO) services.
            Our RPO solutions provide a scalable and efficient approach to hiring, managing every stage of the process
            from initial sourcing to successful onboarding. Gain access to a wider talent pool, reduce recruitment costs,
            and improve hiring consistency with our expert RPO support.
          </p>
        </div>

        {/* Right CTA */}
        <div className="rpo-highlight">
          <h2 style={{color:'white'}} >Optimize recruitment with Adamant HR's tech-driven RPO.</h2>
          <p style={{color:'white'}}>Efficient hiring, reduced costs, and expert talent solutions.</p>
          <a href="/contact" className="contact-link">Contact us</a>
        </div>
      </div>
    </div>
  );
};

export default Services;
