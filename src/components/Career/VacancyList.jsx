import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VacancyList.css';

const VacancyList = ({ url }) => {
  const navigate = useNavigate(); // ✅ Move this to the top — before any returns
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await fetch(`${url}/api/vacancy/list`);
        const result = await response.json();

        if (result.success) {
          setVacancies(result.data);
        } else {
          setError('Failed to fetch vacancies');
        }
      } catch (err) {
        setError('Error fetching vacancies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVacancies();
  }, [url]);

  const handleApply = (jobId) => {
    navigate(`/careers/apply/${jobId}`);
  };

  if (loading) {
    return <div className="vacancy-loading">Loading vacancies...</div>;
  }

  if (error) {
    return <div className="vacancy-error">{error}</div>;
  }

  return (
    <div className="vacancy-list" id='vacancies'>
      <h2>Available Vacancies</h2>
      {vacancies.length === 0 ? (
        <p>No vacancies available at the moment.</p>
      ) : (
        <div className="vacancy-grid">
          {vacancies.map((vacancy) => (
            <div key={vacancy._id} className="vacancy-card">
              <h3>{vacancy.jobTitle}</h3>
              <p><strong>Job ID:</strong> {vacancy.jobId}</p>
              <p><strong>Description:</strong> {vacancy.description}</p>
              <p><strong>Qualification:</strong> {vacancy.qualification}</p>
              <button
                className="apply-btn"
                onClick={() => handleApply(vacancy.jobId)}
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VacancyList;
