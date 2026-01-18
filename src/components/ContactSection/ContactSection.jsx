import React, { useState } from 'react';
import './ContactSection.css';

const ContactSection = () => {
  const formaction = process.env.REACT_APP_FORMACTION;
  const benefits = [
    'Integrity',
    'Commitment',
    'Teamwork',
    'Respect',
    'Professionalism',
    'Courage',
  ];

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?(\d[\d\s-()]{7,}\d)$/;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required.';
    if (!formData.email.trim() || !emailRegex.test(formData.email)) newErrors.email = 'A valid email is required.';
    if (formData.phone && !phoneRegex.test(formData.phone)) newErrors.phone = 'Please enter a valid phone number.';
    if (!formData.company.trim()) newErrors.company = 'Company/Organization is required.';
    if (!formData.message.trim()) newErrors.message = 'Message is required.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        console.log(formaction);
        
        const response = await fetch(`${formaction}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log('Form submitted successfully!');
          setIsSubmitted(true);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            company: '',
            message: '',
          });
          setErrors({});
        } else {
          alert('Something went wrong while submitting the form.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred. Please try again.');
      }
    } else {
      setIsSubmitted(false);
    }
  };

  return (
    <div className="ContactSession" id='contactsection'>
      <div className="hbar">
        <span>Contact Us</span>
        <h1>Partner with our industry expert for top talent</h1>
      </div>

      <div className="container">
        <div className="card">
          <div className="mb-8">
            <h1 className="section-title">Need additional explanations?</h1>
            <p className="section-subtitle">
              Our Applicant Tracking System (ATS): Better Value, Superior Candidates, and More Hires
            </p>
          </div>

          <div className="mb-8">
            <p className="call-us-title">Call us at:</p>
            <p className="phone-number">+91 9650481240</p>
            <p className="call-us-title">Mail us at:</p>
            <p className="phone-number">info@adamanthr.com</p>
          </div>

          <div>
            <h2 className="section-title mb-4">Benefits:</h2>
            <div className="benefits-grid">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="benefit-icon"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 0 0-1.22-.872l-3.236 4.53L9.53 12.293a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="benefit-text">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="form-container" id="form-container">
          <div className="header">
            <h1 className="header-title">Get in Touch</h1>
            <div className="header-line"></div>
            <img src="/images/arrow.png" alt="arrow" className="arrow-down" />
            <div className="header-line"></div>
          </div>

          <form className="form-grid" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="firstName" className="form-label">First name</label>
              <input type="text" id="firstName" className="form-input" value={formData.firstName} onChange={handleChange} />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="lastName" className="form-label">Last name</label>
              <input type="text" id="lastName" className="form-input" value={formData.lastName} onChange={handleChange} />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>

            <div className="form-field full-width">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" id="email" className="form-input" value={formData.email} onChange={handleChange} />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-field full-width">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input type="tel" id="phone" className="form-input" value={formData.phone} onChange={handleChange} />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-field full-width">
              <label htmlFor="company" className="form-label">Company/Organization</label>
              <input type="text" id="company" className="form-input" value={formData.company} onChange={handleChange} />
              {errors.company && <span className="error-message">{errors.company}</span>}
            </div>

            <div className="form-field full-width">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                className="form-textarea"
                placeholder="To better assist you, please describe how we can help..."
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            <div className="full-width">
              <button type="submit" className="submit-button">Submit</button>
            </div>
          </form>

          {isSubmitted && <div className="success-message">Form submitted successfully!</div>}
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
