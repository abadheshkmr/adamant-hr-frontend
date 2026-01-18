import React from 'react';


// The image provided by the user is used as the background image for the left side.
// The image is hardcoded here to create a self-contained, runnable example.


const App = () => {
  return (
    <div className="landing-page-container">
      <style jsx="true">{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .landing-page-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 20px;
          box-sizing: border-box;
          background: #f0f2f5;
        }

        .content-card {
          display: flex;
        //   background: #fff;
          border-radius: 12px;
        //   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          max-width: 1200px;
          width: 100%;
          transition: all 0.3s ease-in-out;
        }

        .image-section {
          flex: 1;
        background-image: url('images/slide1o.jpg');
          background-size: cover;
          background-position: center;
          min-height: 400px; /* Fallback for when the image does not load */
        }

        .text-section {
          flex: 1;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: left;
        }

        .main-heading {
          font-size: 2.2rem;
          font-weight: 600;
          color: #2c3e50;
          margin: 0 0 10px 0;
        }

        .list-heading {
          font-size: 1.2rem;
          font-weight: 600;
          color: #34495e;
          margin-top: 25px;
          margin-bottom: 15px;
        }

        .list-item {
          display: flex;
          align-items: baseline;
          margin-bottom: 12px;
          line-height: 1.5;
        }

        .list-item-title {
          font-weight: 500;
          color: #2c3e50;
          margin-right: 5px;
        }

        .list-item-description {
          font-weight: 400;
          color: #7f8c8d;
        }

        .paragraph {
          font-size: 1rem;
          line-height: 1.6;
          color: #555;
          margin-top: 25px;
        }

        /* Responsive design */
        @media (max-width: 900px) {
          .content-card {
            flex-direction: column;
          }

          .image-section {
            min-height: 300px;
          }

          .text-section {
            padding: 30px;
          }

          .main-heading {
            font-size: 1.8rem;
          }

          .list-heading {
            font-size: 1.1rem;
          }
        }
      `}</style>
      <div className="content-card">
        <div className="image-section">
    
        </div>
        <div className="text-section">
          <h2 className="main-heading">How Adamant HR Supports You</h2>
          <h3 className="list-heading">Adamant HR provides:</h3>
          <ul className="list-container">
            <li className="list-item">
              <span className="list-item-title">Expertise:</span>
              <span className="list-item-description">Benefit from industry knowledge.</span>
            </li>
            <li className="list-item">
              <span className="list-item-title">Talent Access:</span>
              <span className="list-item-description">Connect with top professionals.</span>
            </li>
            <li className="list-item">
              <span className="list-item-title">Custom Solutions:</span>
              <span className="list-item-description">Tailored to your needs.</span>
            </li>
            <li className="list-item">
              <span className="list-item-title">Compliance Assurance:</span>
              <span className="list-item-description">Legal adherence.</span>
            </li>
            <li className="list-item">
              <span className="list-item-title">Tech Innovation:</span>
              <span className="list-item-description">Efficient processes.</span>
            </li>
            <li className="list-item">
              <span className="list-item-title">Ongoing Support:</span>
              <span className="list-item-description">Throughout your journey.</span>
            </li>
            <li className="list-item">
              <span className="list-item-title">Local Advantage:</span>
              <span className="list-item-description">Regional expertise.</span>
            </li>
            <li className="list-item">
              <span className="list-item-title">Success Focus:</span>
              <span className="list-item-description">Your goals, our priority.</span>
            </li>
          </ul>
          <p className="paragraph">
            Choose Adamant HR as Your Talent Solutions Partner and experience the advantage of a dedicated team committed to your success. We're here to help you build the workforce that drives your business forward.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
