import React from "react";
import "./OfficeLocations.css";

const locations = [
  {
    image: "images/noida.jpg",
    name: "Noida, India",
    address: "B1, Building No 50, Block-C Sec-6, Noida, Uttar Pradesh – 201301"
  },
  {
    image: "images/delhi.jpg",
    name: "Delhi, India",
    address: "A-127, 3rd Floor, Mayur Vihar, Phase-III, Opp. Bank Of Baroda, New Delhi – 110096"
  },
  {
    image: "images/newyork.jpg",
    name: "Texas , US",
    address: "1520 Preston Rd. Plano, Texas – 75093"
  },
  // {
  //   image: "images/banglore.jpg",
  //   name: "Bangalore, India",
  // },
//   {
//     image: "images/pune.jpg",
//     name: "Pune, India",
//   },
];

const OfficeLocations = () => {
  return (
    <section className="office-section" id="office">
      <h2 className="office-title">Office Locations</h2>
      <div className="office-flex">
        {locations.map((loc, idx) => (
          <div className="office-card" key={idx}>
            <img src={loc.image} alt={loc.name} className="office-img" />
            <h3 className="office-name">{loc.name}</h3>
            <p> {loc.address} </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OfficeLocations;
