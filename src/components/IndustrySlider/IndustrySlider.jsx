import React, { useState, useEffect, useRef } from 'react';
import './IndustrySlider.css';

const cardData = [
  {
    title: 'Automotive',
    description:
      'Your trusted Automotive industry partner. We understand automotive dynamics and connect you with top talent in engineering, management, and more. Count on us to drive your business to new heights.',
    image: 'automative.png',
    alt: 'A man standing in a large, clean automotive garage with a sports car.',
  },
  {
    title: 'Construction',
    description:
      'Discover your reliable source for top-tier construction talent. Our specialization encompasses skilled professionals across various roles, ensuring efficient project execution. Partner with us to establish a strong foundation for your construction endeavors and grow your team with confidence.',
    image: 'construction.png',
    alt: 'Two construction workers in hard hats and safety vests looking at blueprints.',
  },
  {
    title: 'Creative',
    description:
      'We are your creative talent partner, specializing in exceptional professionals in roles such as Animator, Copywriter, Creative Director, Graphic Designer, UX Designer, and Web Designer. Let us fuel your creativity and innovation, turning your ideas into captivating visuals and unforgettable experiences.',
    image: 'creative.png',
    alt: 'A person wearing a VR headset, with a digital, futuristic landscape in the background.',
  },
  {
    title: 'Customer Service',
    description:
      "Our customer service talent solution is here. We understand the pivotal role customer service plays in today's business landscape. Count on us to connect you with skilled professionals who elevate customer experiences, drive satisfaction, and build lasting customer relationships.",
    image: 'customerservice.png',
    alt: 'A customer service representative wearing a headset and smiling at the camera.',
  },
  {
    title: 'Technology',
    description:
      'Accelerate your digital transformation with top technology talent. We connect you with software engineers, data scientists, cybersecurity experts, and IT professionals to build innovative solutions that scale your business.',
    image: 'engineering.png',
    alt: 'A laptop screen displaying lines of code in a futuristic setting.',
  },
  {
    title: 'Finance',
    description:
      'Secure your financial future with our expert financial talent solutions. We provide access to experienced accountants, financial analysts, and strategists who can help you optimize your operations and achieve your business goals.',
    image: 'finance.png',
    alt: 'A hand writing on a document with a chart and calculator on the desk.',
  },
];

const App = () => {
  const [visibleCards, setVisibleCards] = useState(4);
  const [index, setIndex] = useState(4);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const trackRef = useRef(null);

  // Adjust visible cards based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCards(1);
      else if (window.innerWidth < 768) setVisibleCards(2);
      else if (window.innerWidth < 1024) setVisibleCards(3);
      else setVisibleCards(4);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Recalculate extended cards whenever visibleCards changes
  const extendedCards = [
    ...cardData.slice(-visibleCards),
    ...cardData,
    ...cardData.slice(0, visibleCards),
  ];

  useEffect(() => {
    setIndex(visibleCards);
  }, [visibleCards]);

  const totalCards = cardData.length;

  const next = () => setIndex((prev) => prev + 1);
  const prev = () => setIndex((prev) => prev - 1);

  // Autoplay
  useEffect(() => {
    const interval = setInterval(next, 3000);
    return () => clearInterval(interval);
  }, []);

  // Handle circular reset
  useEffect(() => {
    if (index >= totalCards + visibleCards) {
      const id = setTimeout(() => {
        setTransitionEnabled(false);
        setIndex(visibleCards);
      }, 500);
      return () => clearTimeout(id);
    } else if (index <= 0) {
      const id = setTimeout(() => {
        setTransitionEnabled(false);
        setIndex(totalCards);
      }, 500);
      return () => clearTimeout(id);
    }
    setTransitionEnabled(true);
  }, [index, totalCards, visibleCards]);

  return (
    <div className="app-container">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />
      <div className="slider-container">
        <h1 className="slider-title">Industries we work with</h1>
        <div className="slider-wrapper">
          <div
            ref={trackRef}
            className="slider-track"
            style={{
              transform: `translateX(-${index * (100 / visibleCards)}%)`,
              transition: transitionEnabled ? 'transform 0.5s ease-in-out' : 'none',
            }}
          >
            {extendedCards.map((card, idx) => (
              <div key={idx} className="card">
                <div className="card-content">
                  <img
                    src={`images/${card.image}`}
                    alt={card.alt}
                    className="card-image"
                  />
                  <div className="card-body">
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-description">{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={prev} className="slider-button prev-button">
          <i className="fas fa-chevron-left"></i>
        </button>
        <button onClick={next} className="slider-button next-button">
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      <div className="view-all-container">
        <a href="/business#industries">
        <button className="view-all-button">View All Industries</button>
        </a>
      </div>

    </div>
  );
};

export default App;
