import React, { useState, useEffect, useRef } from "react";
import "./Reviews.css";

const images = [
"/images/review1.png","images/review2.png",
];

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const timeoutRef = useRef(null);

  // Adjust slides based on screen width
  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth < 600) setSlidesToShow(1);
      else if (window.innerWidth < 900) setSlidesToShow(2);
      else setSlidesToShow(2);
    };
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    timeoutRef.current = setTimeout(nextSlide, 3000);
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex]);

  // Create circular list for infinite effect
  const getVisibleSlides = () => {
    const slides = [];
    for (let i = 0; i < slidesToShow; i++) {
      slides.push(images[(currentIndex + i) % images.length]);
    }
    return slides;
  };

  return (
    <div className="reviews-container">
        <h1 className="slider-title">What People Say About Us</h1>
      <button className="arrow left" onClick={prevSlide}>
        &#10094;
      </button>

      <div className="reviews-slide-wrapper">
        <div
          className="reviews-slide"
          style={{ gridTemplateColumns: `repeat(${slidesToShow}, 1fr)` }}
        >
          {getVisibleSlides().map((img, idx) => (
            <img key={idx} src={img} alt={`Review ${idx + 1}`} />
          ))}
        </div>
      </div>

      <button className="arrow right" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Reviews;
