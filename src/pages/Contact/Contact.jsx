import React from "react";
import { useLocation } from "react-router-dom";
import SEO from "../../components/SEO/SEO";
import { getBreadcrumbStructuredData } from "../../components/SEO/StructuredData";
import './Contact.css';

const App = () => {
  const location = useLocation();
  // Only show SEO when Contact is a standalone page (not embedded in Home)
  const isStandalonePage = location.pathname === '/contact';

  const structuredData = [
    getBreadcrumbStructuredData([
      { name: 'Home', url: 'https://adamanthr.com' },
      { name: 'Contact', url: 'https://adamanthr.com/contact' }
    ])
  ];

  return (
    <>
      {isStandalonePage && (
        <SEO
          title="Contact Us - Get in Touch | Adamant HR Noida"
          description="Contact Adamant HR Consulting Pvt. Ltd. in Noida, UP. Call +91 9650481240 or email info@adamanthr.com. Get expert HR, staffing, and recruitment solutions consultation."
          keywords="contact Adamant HR, HR agency contact Noida, staffing services contact, recruitment consultation, HR services Noida"
          url="https://adamanthr.com/contact"
          structuredData={structuredData}
        />
      )}

      <div className="talent-page" id="contact">
        <div className="talent-container">
          <h1 className="talent-heading">We're here to help</h1>
          <p className="talent-subheading">
            Resolve Your Talent Acquisition Challenges
          </p>

          <div className="talent-box">
            <h2 className="talent-box-title">
              Expand Your Business with Top Talent Partner with Adamant HR IT
              Solutions Inc.
            </h2>
            <p className="talent-text">
              Are you looking to grow your business and build a high-performing
              team? At Adamant HR IT Solutions Inc., we specialize in talent
              acquisition, workforce solutions, and strategic hiring to connect
              you with highly qualified professionals.
            </p>

            <p className="talent-text">
              We provide expert hiring solutions across multiple industries,
              including:
            </p>

            <ul className="talent-list">
              {[
                "Information Technology (IT talent solutions)",
                "BFSI & NBFC",
                "FMCG & Retail",
                "Manufacturing & Engineering",
                "Logistics",
                "Healthcare",
                "Tiles/Ceramics",
                "Automobile",
                "Pharmaceuticals",
                "Education",
                "E-commerce",
                "ELV Industry",
                "Telecom Industry",
              ].map((item, i) => (
                <li className="talent-list-item" key={i}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="talent-icon"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="talent-text">
              Whether you need contract professionals, project-based talent, or
              full-time hires, we customize our solutions to meet your
              business's unique needs.
            </p>

            <p className="talent-text">
              <strong>
                Boost productivity and scale your workforce with top-tier
                professionals.
              </strong>{" "}
              Contact us today to discover how our expertise can drive your
              company's success.
            </p>
          </div>
          <a href="/Adamantprofile.pdf" download className="download-btn">
  Download Company Profile
</a>
        </div>
      </div>

    </>
  );
};

export default App;
