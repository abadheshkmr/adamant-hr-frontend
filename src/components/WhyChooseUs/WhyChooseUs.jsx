import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import "./WhyChooseUs.css";

const WhyChooseUs = () => {
  return (
    <section className="whychooseus" id="whychooseus">
      <div className="whychooseus-container">
        
        {/* Left Image */}
        <div className="whychooseus-image">
          <img src="/images/whychooseus.png" alt="Working professional" />
        </div>

        {/* Right Content */}
        <div className="whychooseus-content">
          <h2>WHY CHOOSE US</h2>
          <p className="whychooseus-description">
            Our vision is to grow further and become the most sought after HR
            consultancy in the world. We aim to become a one-stop shop for all
            the HR needs and provide brilliant quality service at affordable
            costs while placing the right people at the right jobs so that both
            the parties can be equally benefitted.
          </p>

          {/* Updated Points */}
          <div className="whychooseus-points">

            <div className="point">
              <FaCheckCircle className="point-icon" />
              <p>Zero-error documentation</p>
            </div>

            <div className="point">
              <FaCheckCircle className="point-icon" />
              <p>Verified manpower</p>
            </div>

            <div className="point">
              <FaCheckCircle className="point-icon" />
              <p>Fast replacement support</p>
            </div>

            <div className="point">
              <FaCheckCircle className="point-icon" />
              <p>Transparent MIS reporting</p>
            </div>

            <div className="point">
              <FaCheckCircle className="point-icon" />
              <p>Multi-location delivery</p>
            </div>

            <div className="point">
              <FaCheckCircle className="point-icon" />
              <p>Dedicated key account manager</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
