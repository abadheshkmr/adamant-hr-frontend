import React from "react";
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import "./MinimalFooter.css";

const MinimalFooter = () => {
  return (
    <footer className="minimal-footer">
      <div className="minimal-footer-content">
        <div className="minimal-footer-left">
          <p>© 2025 Adamant HR. All rights reserved.</p>
        </div>
        
        <div className="minimal-footer-center">
          <a href="/">Privacy Policy</a>
          <span className="separator">•</span>
          <a href="/">Terms & Conditions</a>
        </div>
        
        <div className="minimal-footer-right">
          <a
            href="https://www.linkedin.com/company/adamanthr/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <button 
            type="button" 
            aria-label="Twitter"
            className="social-btn"
          >
            <FaTwitter />
          </button>
          <button 
            type="button" 
            aria-label="Facebook"
            className="social-btn"
          >
            <FaFacebook />
          </button>
          <button 
            type="button" 
            aria-label="Instagram"
            className="social-btn"
          >
            <FaInstagram />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default MinimalFooter;
