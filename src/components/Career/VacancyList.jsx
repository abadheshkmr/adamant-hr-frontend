import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './VacancyList.css';

const VacancyList = ({ url }) => {
  const navigate = useNavigate();
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const fetchVacancies = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${url}/api/vacancy/list?page=${currentPage}&limit=10`);
        const result = await response.json();

        if (result.success) {
          setVacancies(result.data);
          setPagination(result.pagination);
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
  }, [url, currentPage]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleApply = (jobId) => {
    navigate(`/careers/apply/${jobId}`);
  };

  // Memoize vacancy cards to prevent unnecessary re-renders
  const vacancyCards = useMemo(() => {
    return vacancies.map((vacancy) => (
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
    ));
  }, [vacancies, navigate]);

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
        <>
          <div className="vacancy-grid">
            {vacancyCards}
          </div>
          {pagination && pagination.totalPages > 1 && (
            <div className="pagination" style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
              <button
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage(prev => prev - 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ padding: '8px 16px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
              >
                Previous
              </button>
              <span>
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                disabled={currentPage === pagination.totalPages}
                onClick={() => {
                  setCurrentPage(prev => prev + 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ padding: '8px 16px', cursor: currentPage === pagination.totalPages ? 'not-allowed' : 'pointer' }}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VacancyList;
