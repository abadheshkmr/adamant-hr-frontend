import React, { useState, useEffect } from 'react';
import './Carousel.css';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 0,
    image: '/images/slide5.jpg',
    title: 'Simplifying Business',
    subtitle: 'India’s Trusted Partner for Staffing, Compliance, Security, BGV & Integrated Workforce Solutions',
  },
  {
    id: 1,
    image: '/images/slide1.jpg',
    title: 'Technology Recruitment & Digital Staffing Solutions',
    subtitle: 'Digital staffing and recruitment are at the forefront of our approach, leveraging cutting-edge technology to match exceptional talent with industry-leading innovations.',
  },
  {
    id: 2,
    image: '/images/slide2.jpg',
    title: 'Empowering Businesses with Top Talent',
    subtitle: 'We connect businesses with professionals who drive transformation and innovation.',
  },
  {
    id: 3,
    image: '/images/slide3.jpg',
    title: 'Your Partner in Digital Transformation',
    subtitle: 'Helping organizations scale with the right talent and digital strategy.',
  },
  {
    id: 4,
    image: '/images/slide4.jpg',
    title: 'Your Partner in Digital Transformation',
    subtitle: 'Helping organizations scale with the right talent and digital strategy.',
  },
  
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <div className="carousel">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="carousel-overlay">
            <h1>{slide.title}</h1>
            <p>{slide.subtitle}</p>
            <Link to="/contact">   
            <button className="contacta-btn">
            Contact Us <span className="arrowa">→</span>
            </button>
             </Link>

          </div>
        </div>
      ))}

      <div className="carousel-controls">
        <button onClick={prevSlide}>&lt;</button>
        <button onClick={nextSlide}>&gt;</button>
      </div>

      <div className="carousel-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
