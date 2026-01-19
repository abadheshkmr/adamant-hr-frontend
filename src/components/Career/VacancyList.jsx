import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './VacancyList.css';

const VacancyList = ({ url }) => {
  const navigate = useNavigate();
  const [vacancies, setVacancies] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'title'
  
  // Filter state
  const [filters, setFilters] = useState({
    search: '',
    industry: '',
    employmentType: '',
    experienceLevel: '',
    city: '',
    state: '',
    isRemote: false
  });

  // Fetch industries
  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await fetch(`${url}/api/industry/list`);
        const result = await response.json();
        if (result.success) {
          setIndustries(result.data);
        }
      } catch (err) {
        console.error('Error fetching industries:', err);
      }
    };
    fetchIndustries();
  }, [url]);

  // Build query string from filters
  const buildQueryString = useMemo(() => {
    const params = new URLSearchParams();
    params.append('page', currentPage);
    params.append('limit', '10');
    
    if (filters.search) params.append('search', filters.search);
    if (filters.industry) params.append('industry', filters.industry);
    if (filters.employmentType) params.append('employmentType', filters.employmentType);
    if (filters.experienceLevel) params.append('experienceLevel', filters.experienceLevel);
    if (filters.city) params.append('city', filters.city);
    if (filters.state) params.append('state', filters.state);
    if (filters.isRemote) params.append('isRemote', 'true');
    
    return params.toString();
  }, [currentPage, filters]);

  useEffect(() => {
    const fetchVacancies = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${url}/api/vacancy/list?${buildQueryString}`);
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
  }, [url, buildQueryString]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.search, filters.industry, filters.employmentType, filters.experienceLevel, filters.city, filters.state, filters.isRemote]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleApply = (vacancyId) => {
    navigate(`/careers/apply/${vacancyId}`);
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      industry: '',
      employmentType: '',
      experienceLevel: '',
      city: '',
      state: '',
      isRemote: false
    });
  };

  // Sort vacancies
  const sortedVacancies = useMemo(() => {
    const sorted = [...vacancies];
    switch (sortBy) {
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'title':
        return sorted.sort((a, b) => a.jobTitle.localeCompare(b.jobTitle));
      case 'newest':
      default:
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  }, [vacancies, sortBy]);

  // Memoize vacancy cards to prevent unnecessary re-renders
  const vacancyCards = useMemo(() => {
    return sortedVacancies.map((vacancy) => (
      <div key={vacancy._id} className="vacancy-card">
        {/* Header Section - Job Title and Industry */}
        <div className="vacancy-header">
          <div className="vacancy-title-section">
            <h3 className="vacancy-title">{vacancy.jobTitle}</h3>
            {vacancy.industry && (
              <span className="vacancy-industry">{vacancy.industry.name}</span>
            )}
          </div>
          <span className="vacancy-job-id">#{vacancy.jobId}</span>
        </div>

        {/* Quick Info Badges - Compact Row */}
        <div className="vacancy-quick-info">
          {vacancy.location && (vacancy.location.city || vacancy.location.state) && (
            <span className="info-badge location">
              <span className="icon">📍</span>
              <span>{vacancy.location.city}{vacancy.location.city && vacancy.location.state ? ', ' : ''}{vacancy.location.state}</span>
              {vacancy.location.isRemote && <span className="remote-tag">Remote</span>}
            </span>
          )}
          {vacancy.employmentType && (
            <span className="info-badge">
              <span className="icon">💼</span>
              {vacancy.employmentType}
            </span>
          )}
          {vacancy.experienceLevel && (
            <span className="info-badge">
              <span className="icon">⭐</span>
              {vacancy.experienceLevel}
            </span>
          )}
        </div>

        {/* Salary - Prominent Display */}
        {vacancy.salary && (vacancy.salary.min || vacancy.salary.max) && (
          <div className="vacancy-salary">
            <span className="salary-label">Salary:</span>
            <span className="salary-amount">
              {vacancy.salary.min && vacancy.salary.max 
                ? `₹${vacancy.salary.min.toLocaleString()} - ₹${vacancy.salary.max.toLocaleString()}`
                : vacancy.salary.min 
                  ? `₹${vacancy.salary.min.toLocaleString()}+`
                  : `Up to ₹${vacancy.salary.max.toLocaleString()}`
              }
            </span>
            {vacancy.salary.isNegotiable && <span className="negotiable-tag">Negotiable</span>}
          </div>
        )}

        {/* Skills - Compact Tags */}
        {vacancy.skills && vacancy.skills.length > 0 && (
          <div className="vacancy-skills">
            {vacancy.skills.slice(0, 4).map((skill, idx) => (
              <span key={idx} className="skill-tag">
                {skill}
              </span>
            ))}
            {vacancy.skills.length > 4 && (
              <span className="skill-more">+{vacancy.skills.length - 4} more</span>
            )}
          </div>
        )}

        {/* Description - Compact Preview */}
        <p className="vacancy-description">
          {vacancy.description.length > 120 ? vacancy.description.substring(0, 120) + '...' : vacancy.description}
        </p>

        {/* Footer - Apply Button */}
        <div className="vacancy-footer">
          <button
            className="apply-btn"
            onClick={() => handleApply(vacancy._id)}
          >
            Apply Now
          </button>
        </div>
      </div>
    ));
  }, [sortedVacancies, navigate]);

  if (loading) {
    return <div className="vacancy-loading">Loading vacancies...</div>;
  }

  if (error) {
    return <div className="vacancy-error">{error}</div>;
  }

  return (
    <div className="vacancy-list" id='vacancies'>
      {/* Elegant Page Header */}
      <div className="vacancy-page-header">
        <div className="header-content">
          <div className="header-title-section">
            <h1 className="page-title">Open Roles</h1>
            {pagination && (
              <span className="count-pill">
                {pagination.totalItems} {pagination.totalItems === 1 ? 'role' : 'roles'}
              </span>
            )}
          </div>
          <p className="page-subtitle">Browse and apply in minutes</p>
        </div>
        
        {/* Sort and View Toggle */}
        <div className="header-controls">
          <div className="sort-control">
            <label htmlFor="sort-select" className="control-label">Sort by</label>
            <select 
              id="sort-select"
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="control-select"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>
          
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="3" width="12" height="2" rx="1" fill="currentColor"/>
                <rect x="2" y="7" width="12" height="2" rx="1" fill="currentColor"/>
                <rect x="2" y="11" width="12" height="2" rx="1" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Filter Section */}
      <div className="filter-section">
        <h3 className="filter-title">Filter Jobs</h3>
        
        <div>
          {/* Search */}
          <div>
            <label>Search</label>
            <input
              type="text"
              placeholder="Job title or description..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>

          {/* Industry */}
          <div>
            <label>Industry</label>
            <select
              value={filters.industry}
              onChange={(e) => handleFilterChange('industry', e.target.value)}
            >
              <option value="">All Industries</option>
              {industries.map(industry => (
                <option key={industry._id} value={industry._id}>{industry.name}</option>
              ))}
            </select>
          </div>

          {/* Employment Type */}
          <div>
            <label>Employment Type</label>
            <select
              value={filters.employmentType}
              onChange={(e) => handleFilterChange('employmentType', e.target.value)}
            >
              <option value="">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>

          {/* Experience Level */}
          <div>
            <label>Experience</label>
            <select
              value={filters.experienceLevel}
              onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
            >
              <option value="">All Levels</option>
              <option value="Fresher">Fresher</option>
              <option value="0-2 years">0-2 years</option>
              <option value="2-5 years">2-5 years</option>
              <option value="5-10 years">5-10 years</option>
              <option value="10+ years">10+ years</option>
            </select>
          </div>

          {/* City */}
          <div>
            <label>City</label>
            <input
              type="text"
              placeholder="e.g., Noida"
              value={filters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
            />
          </div>

          {/* State */}
          <div>
            <label>State</label>
            <input
              type="text"
              placeholder="e.g., Uttar Pradesh"
              value={filters.state}
              onChange={(e) => handleFilterChange('state', e.target.value)}
            />
          </div>

          {/* Remote */}
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', paddingBottom: '8px' }}>
              <input
                type="checkbox"
                checked={filters.isRemote}
                onChange={(e) => handleFilterChange('isRemote', e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span style={{ fontWeight: '500', fontSize: '14px' }}>Remote Only</span>
            </label>
          </div>
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={clearFilters}
          className="clear-filters-btn"
        >
          Clear All Filters
        </button>
      </div>

      {loading ? (
        <div className="vacancy-loading">Loading vacancies...</div>
      ) : error ? (
        <div className="vacancy-error">{error}</div>
      ) : vacancies.length === 0 ? (
        <div className="no-results">
          <p>No vacancies found matching your filters.</p>
        </div>
      ) : (
        <>
          <div className={`vacancy-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
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
