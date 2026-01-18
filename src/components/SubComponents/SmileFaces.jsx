import React from 'react';


// This is the new React component based on the second image.
const App = () => {
  return (
    <div className="landing-page-container">
      <style jsx="true">{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');


        .landing-page-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 40px 20px;
          box-sizing: border-box;
          background: #f0f2f5;
        }

        .content-card {
          display: flex;
          flex-direction: row;
        //   max-width: 1200px;
          width: 100%;
        //   background: #fff;
          border-radius: 12px;
        //   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          padding: 30px 50px;
          box-sizing: border-box;
          margin-top: 40px;
        }

        .text-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding-right: 40px;
        }

        .main-heading {
          font-size: 3.5rem;
          font-weight: 800;
          color: #2c3e50;
          line-height: 1.1;
          margin: 0 0 20px 0;
        }

        .paragraph {
          font-size: 1rem;
          line-height: 1.6;
          color: #555;
          margin-bottom: 30px;
        }

        .image-section {
          flex: 1.2;
          border-radius: 12px;
          overflow: hidden;
        }

        .image-section img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        
        .explore-industries-container {
        //   margin-top: 40px;
          display: flex;
          justify-content: center;
          width: 100%;
        }

        @media (max-width: 900px) {
          .content-card {
            flex-direction: column;
            padding: 40px;
          }

          .text-section {
            padding-right: 0;
            margin-bottom: 40px;
          }

          .main-heading {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 600px) {
          .content-card {
            padding: 20px;
          }

          .main-heading {
            font-size: 2rem;
          }
          
          .explore-industries-container {
            margin-top: 20px;
          }
        }
      `}</style>
      <div className="content-card">
        <div className="text-section">
          <h1 className="main-heading">
            We find the talent, so you can focus on your brilliance
          </h1>
          <p className="paragraph">
            With Adamant HR as your talent partner, you can shine brighter, innovate with confidence, and make a meaningful impact in your industry. Together, we'll create a future filled with success and endless possibilities. Contact Adamant HR today and let your brilliance shine through. We find the talent, so you can focus on your brilliance.
          </p>
          <button 
            type="button"
            className="btn"
            onClick={() => {
              document
                .getElementById("form-container")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >Schedule a Consultation</button>
        </div>
        <div className="image-section">
          <img src="images/smilingfaces.png" alt="A group of smiling professionals" />
        </div>
      </div>
      <div className="explore-industries-container">
        <button 
          type="button"
          className="btn"
          onClick={() => {
            window.location.href = '/business';
          }}
        >Explore Industries</button>
      </div>
    </div>
  );
};

export default App;
