import React, { useEffect, useState } from "react";
import axios from "axios";

const IndustriesPage = ({ url }) => {
  const [categories, setCategories] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchList = async () => {
    try {
      const res = await axios.get(`${url}/api/industry/list`);
      if (res.data && res.data.success) setCategories(res.data.data || []);
      else {
        console.error("Fetch error:", res.data);
        alert("Error fetching industries");
      }
    } catch (err) {
      console.error("Axios error:", err);
      alert("Network or server error");
    }
  };

  const toggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const leftColumn = categories.filter((_, i) => i % 2 === 0);
  const rightColumn = categories.filter((_, i) => i % 2 === 1);

  return (
    <div className="yo-container">
      <style jsx="true">{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap");

        .yo-container {
          font-family: "Inter", sans-serif;
          background-color: #e6e6fa;
          padding: 2rem;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .yo-header {
          max-width: 1200px;
          width: 100%;
          margin-bottom: 2rem;
          text-align: center;
        }

        .yo-header h1 {
          font-size: 2rem;
          margin: 0 0 0.5rem 0;
          color: #1a1a40;
        }

        .yo-header p {
          margin: 0;
          color: #444;
        }

        .yo-columns {
          display: flex;
          gap: 1rem;
          width: 90%;
          align-items: flex-start;
          margin: auto;
          min-width: 320px;
        }

        .yo-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .yo-card {
          background: #fff;
          border: 1px solid #e8e8ee;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(20, 20, 50, 0.04);
          overflow: hidden;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }

        .yo-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 22px rgba(20, 20, 50, 0.07);
        }

        .yo-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.85rem 1rem;
          cursor: pointer;
          font-weight: 600;
          color: #333;
        }

        .yo-toggle {
          font-size: 1.2rem;
        }

        .yo-card-content {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.45s ease, padding 0.25s ease;
          padding: 0 1rem;
        }

        .yo-card.expanded .yo-card-content {
          max-height: 1600px;
          padding: 1rem;
        }

        .yo-image {
          width: 100%;
          height: 220px;
          object-fit: cover;
          display: block;
          border-radius: 6px;
          margin-bottom: 1rem;
        }

        .yo-desc {
          margin: 0 0 1rem 0;
          color: #555;
          line-height: 1.5;
          font-size: 0.95rem;
        }

        .yo-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .yo-list li {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
          color: #444;
          font-size: 0.95rem;
        }

        .yo-list li::before {
          content: "✔";
          margin-right: 0.6rem;
          color: #007bff;
          font-size: 1.05rem;
        }

        @media (max-width: 768px) {
          .yo-columns {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="yo-header">
        <h1>Adamant HR – Your Trusted Partner for IT Talent</h1>
        <p>
          We connect companies with skilled professionals across industries.
          Click a card to expand its details.
        </p>
      </div>

      <div className="yo-columns">
        <div className="yo-column" id="yo-left">
          {leftColumn.map((category, i) => {
            const id = category._id ?? `${category.name}-${i}`;
            const list = category.list ?? [];
            return (
              <div
                className={`yo-card ${expandedId === id ? "expanded" : ""}`}
                key={id}
              >
                <div className="yo-card-header" onClick={() => toggle(id)}>
                  <span>{category.name}</span>
                  <span className="yo-toggle">
                    {expandedId === id ? "−" : "+"}
                  </span>
                </div>

                {category.description && (
                  <div className="yo-card-content">
                    <img
                      src={`${url}/images/${category.image}`}
                      alt={category.name}
                      className="yo-image"
                    />
                    <p className="yo-desc">{category.description}</p>
                    <ul className="yo-list">
                      {list.map((li, idx) => (
                        <li key={idx}>{li}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="yo-column" id="yo-right">
          {rightColumn.map((category, i) => {
            const id = category._id ?? `${category.name}-${i + 1000}`;
            const list = category.list ?? [];
            return (
              <div
                className={`yo-card ${expandedId === id ? "expanded" : ""}`}
                key={id}
              >
                <div className="yo-card-header" onClick={() => toggle(id)}>
                  <span>{category.name}</span>
                  <span className="yo-toggle">
                    {expandedId === id ? "−" : "+"}
                  </span>
                </div>

                {category.description && (
                  <div className="yo-card-content">
                    <img
                      src={`${url}/images/${category.image}`}
                      alt={category.name}
                      className="yo-image"
                    />
                    <p className="yo-desc">{category.description}</p>
                    <ul className="yo-list">
                      {list.map((li, idx) => (
                        <li key={idx}>{li}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IndustriesPage;
