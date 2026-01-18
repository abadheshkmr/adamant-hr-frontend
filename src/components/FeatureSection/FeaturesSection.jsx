import React from "react";
import "./FeaturesSection.css";

const features = [
  {
    icon: "💰",
    title: "Optimized Budgeting",
    description:
      "Achieve financial success with Adamant HR's optimized budgeting solutions. Our data-driven approach ensures realistic financial planning and strategic resource allocation. We focus on budget optimization to drive exceptional results.",
  },
  {
    icon: "💡",
    title: "Pioneering Solutions",
    description:
      "Drive long-term success with Adamant HR's pioneering business solutions. Our innovative strategies are based on industry analysis and efficient resource allocation. We deliver strategic solutions that provide outstanding and measurable results.",
  },
  {
    icon: "📘",
    title: "Sector Proficiency",
    description:
      "Benefit from Adamant HR's industry expertise across diverse sectors. We understand the specific challenges and needs of each industry, providing customized solutions that guarantee a perfect fit.",
  },
  {
    icon: "📦",
    title: "Expandability",
    description:
      "Unlock your potential for growth with Adamant HR's scalable services. Our flexible solutions are designed for expandability, meeting the needs of startups and large enterprises alike. Access the talent you need to propel your business growth.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <div className="features-container">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            {/* <div className="icon">{feature.icon}</div> */}
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
