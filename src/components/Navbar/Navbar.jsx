import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos > prevScrollPos && currentScrollPos > 100) {
        setVisible(false); // scrolling down → hide navbar
      } else {
        setVisible(true);  // scrolling up → show navbar
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <nav
      className="navbar"
      style={{ top: visible ? "0" : "-100px" }}
    >
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <img src="images/logo.png" alt="" />
            {/* Yo<span>CHANA</span> */}
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          {/* <li className="dropdown"> */}
          {/* <Link to="/company">Company ▾</Link> */}
          {/* <div className="dropdown-menu-fullwidth"> */}
          {/* <div className="dropdown-menu-inner"> */}

          {/* Left Column */}
          {/* <div className="dropdown-col">
                  <h3>Streamlining Recruiting in an Overcoming Workforce Environment.</h3>
                </div> */}

          {/* Middle Column - vertical links */}
          {/* <div className="dropdown-col">
                  <Link to="/about">About Us</Link>
                  <Link to="/team">Why Us</Link>
                  {/* <Link to="/diverse">Diversity Equity & Inclusion</Link> */}
          {/* </div>  */}

          {/* Right Column */}
          {/* <div className="dropdown-col" id="dropdown-col-right">
                  <ul>
                    <li><span className="icon">🏫</span> University and College Partnerships</li>
                    <li><span className="icon">🏢</span> Industry Associations</li>
                    <li><span className="icon">🤝</span> Technology Partnerships</li>
                    <li><span className="icon">👥</span> Diversity and Inclusion Organizations</li>
                    <li><span className="icon">🏬</span> Local Business Chambers</li>
                  </ul>
                </div> */}


          {/* </div> */}
          {/* </div> */}
          {/* </li> */}
          <li><Link to='/aboutus'>About Us</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/business">Clients</Link></li>
          <li><Link to="/careers">Careers</Link></li>
          {/* <li><Link to="/blog">Blog</Link></li> */}
        </ul>

        {/* Right Buttons */}
        <div className="nav-buttons">
          <button className="support">Client Support</button>
          <a className="phone" href="tel:18882590537">+91 9650481240</a>
          <li
            onClick={() =>{
                navigate('/');
                setTimeout(() => {
                  document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
                }, 300);
              }
                }
            className="contact"
          >
            Contact Us
          </li>

        </div>

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={toggleMenu}>
          {isOpen ? "✕" : "☰"}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={toggleMenu}>Home</Link>
        {/* <details>
          <summary style={{ cursor: 'pointer' }}>Company</summary>

          <Link
            to="/about"
            onClick={toggleMenu}
            style={{ display: 'block', padding: '5px 0', textDecoration: 'none', color: '#000' }}
          >
            About Us
          </Link>
          <Link
            to="/whyus"
            onClick={toggleMenu}
            style={{ display: 'block', padding: '5px 0', textDecoration: 'none', color: '#000' }}
          >
            Why Us
          </Link>
        </details> */}
        <Link to="/services" onClick={toggleMenu}>Services</Link>
        <Link to="/business" onClick={toggleMenu}>Clients</Link>
        <Link to="/careers" onClick={toggleMenu}>Careers</Link>
        {/* <Link to="/blog" onClick={toggleMenu}>Blog</Link> */}
        <p className="mobilecontact"
          onClick={() =>{
                navigate('/');
                toggleMenu();
                setTimeout(() => {
                  document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
                }, 300);
              }
                }
        >
          Contact
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
