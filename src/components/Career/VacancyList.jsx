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
  const [viewMode, setViewMode] = useState('list'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'title'
  const [showAllJobs, setShowAllJobs] = useState(false); // Toggle to show all jobs vs promoted only
  const [applicationCounts, setApplicationCounts] = useState({}); // Store counts: { jobId: count }
  
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
    
    // Add showAll parameter if user wants to see all jobs
    if (showAllJobs) params.append('showAll', 'true');
    
    if (filters.search) params.append('search', filters.search);
    if (filters.industry) params.append('industry', filters.industry);
    if (filters.employmentType) params.append('employmentType', filters.employmentType);
    if (filters.experienceLevel) params.append('experienceLevel', filters.experienceLevel);
    if (filters.city) params.append('city', filters.city);
    if (filters.state) params.append('state', filters.state);
    if (filters.isRemote) params.append('isRemote', 'true');
    
    return params.toString();
  }, [currentPage, filters, showAllJobs]);

  useEffect(() => {
    const fetchVacancies = async () => {
      setLoading(true);
      try {
        // Check if this is initial load (no filters, page 1, showing promoted jobs)
        const isInitialLoad = !showAllJobs && 
          !filters.search && 
          !filters.industry && 
          !filters.employmentType && 
          !filters.experienceLevel && 
          !filters.city && 
          !filters.state && 
          !filters.isRemote &&
          currentPage === 1;

        let response;
        let result;

        if (isInitialLoad) {
          // First, try to fetch promoted jobs only
          const promotedParams = new URLSearchParams();
          promotedParams.append('page', '1');
          promotedParams.append('limit', '10');
          // Don't add showAll - backend will return promoted jobs by default
          
          response = await fetch(`${url}/api/vacancy/list?${promotedParams.toString()}`);
          result = await response.json();

          // If no promoted jobs found, fallback to latest 5 active jobs
          if (result.success && (!result.data || result.data.length === 0)) {
            const fallbackParams = new URLSearchParams();
            fallbackParams.append('page', '1');
            fallbackParams.append('limit', '5');
            fallbackParams.append('showAll', 'true'); // Get all active jobs (not just promoted)
            
            response = await fetch(`${url}/api/vacancy/list?${fallbackParams.toString()}`);
            result = await response.json();
            
            // Sort by created date descending (newest first) and limit to 5
            if (result.success && result.data && result.data.length > 0) {
              result.data = result.data
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 5);
              
              // Update pagination to reflect we're showing max 5 jobs
              result.pagination = {
                currentPage: 1,
                totalPages: 1,
                totalItems: result.data.length,
                itemsPerPage: 5
              };
            }
          }
        } else {
          // Normal fetch with filters/showAllJobs/pagination
          response = await fetch(`${url}/api/vacancy/list?${buildQueryString}`);
          result = await response.json();
        }

        if (result.success) {
          setVacancies(result.data || []);
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
  }, [url, buildQueryString, showAllJobs, filters.search, filters.industry, filters.employmentType, filters.experienceLevel, filters.city, filters.state, filters.isRemote, currentPage]);

  // Fetch application counts for all vacancies
  useEffect(() => {
    const fetchApplicationCounts = async () => {
      if (!vacancies || vacancies.length === 0) return;
      
      try {
        const jobIds = vacancies.map(v => v.jobId.toString());
        const response = await fetch(`${url}/api/cv/counts/batch`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ jobIds })
        });
        
        const result = await response.json();
        if (result.success && result.counts) {
          setApplicationCounts(result.counts);
        }
      } catch (err) {
        console.error('Error fetching application counts:', err);
      }
    };

    fetchApplicationCounts();
  }, [vacancies, url]);

  // Reset to page 1 when filters or showAllJobs change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.search, filters.industry, filters.employmentType, filters.experienceLevel, filters.city, filters.state, filters.isRemote, showAllJobs]);

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
    return sortedVacancies.map((vacancy) => {
      // Get first letter of job title for icon
      const iconLetter = vacancy.jobTitle ? vacancy.jobTitle.charAt(0).toUpperCase() : 'J';
      
      return (
        <div key={vacancy._id} className="vacancy-card">
          {/* Icon/Logo */}
          <div className="vacancy-icon">
            <span>{iconLetter}</span>
          </div>

          {/* Main Content Area */}
          <div className="vacancy-card-main">
            {/* Header Section */}
            <div className="vacancy-header">
              <div className="vacancy-title-section">
                <h3 className="vacancy-title">{vacancy.jobTitle}</h3>
                <div className="vacancy-meta">
                  {vacancy.industry && (
                    <span className="vacancy-department">{vacancy.industry.name}</span>
                  )}
                  {vacancy.location && (vacancy.location.city || vacancy.location.state) && (
                    <>
                      {vacancy.industry && <span className="meta-separator">•</span>}
                      <span className="vacancy-location-text">
                        {vacancy.location.city}{vacancy.location.city && vacancy.location.state ? ', ' : ''}{vacancy.location.state}
                        {vacancy.location.isRemote && ' / Remote'}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Tags/Badges */}
            <div className="vacancy-tags">
              {vacancy.employmentType && (
                <span className="tag tag-fulltime">{vacancy.employmentType}</span>
              )}
              {vacancy.location?.isRemote && (
                <span className="tag tag-remote">Remote Friendly</span>
              )}
              {vacancy.experienceLevel && (
                <span className="tag tag-experience">{vacancy.experienceLevel}</span>
              )}
              {vacancy.industry && (
                <span className="tag tag-industry">{vacancy.industry.name}</span>
              )}
            </div>

            {/* Application Count */}
            {applicationCounts[vacancy.jobId] !== undefined && applicationCounts[vacancy.jobId] > 0 && (
              <div className="vacancy-application-count">
                <span className="count-icon-small">👥</span>
                <span className="count-text-small">
                  {applicationCounts[vacancy.jobId]} {applicationCounts[vacancy.jobId] === 1 ? 'person' : 'people'} clicked apply
                </span>
              </div>
            )}

            {/* Description */}
            <p className="vacancy-description">
              {vacancy.description.length > 150 ? vacancy.description.substring(0, 150) + '...' : vacancy.description}
            </p>

            {/* Salary */}
            {vacancy.salary && (vacancy.salary.min || vacancy.salary.max) && (
              <div className="vacancy-salary-new">
                <span className="salary-text">
                  {vacancy.salary.min && vacancy.salary.max 
                    ? `₹${vacancy.salary.min.toLocaleString()} - ₹${vacancy.salary.max.toLocaleString()} PA`
                    : vacancy.salary.min 
                      ? `₹${vacancy.salary.min.toLocaleString()}+ PA`
                      : `Up to ₹${vacancy.salary.max.toLocaleString()} PA`
                  }
                </span>
              </div>
            )}
          </div>

          {/* Actions Area */}
          <div className="vacancy-card-actions">
            <button
              className="view-details-btn"
              onClick={() => handleApply(vacancy.jobId)}
            >
              View Details →
            </button>
          </div>
        </div>
      );
    });
  }, [sortedVacancies, navigate, applicationCounts]);

  if (loading) {
    return <div className="vacancy-loading">Loading vacancies...</div>;
  }

  if (error) {
    return <div className="vacancy-error">{error}</div>;
  }

  return (
    <div className="vacancy-list" id='vacancies'>
      {/* Hero Section - Matching Services Page Style */}
      <section className="careers-hero">
        <div className="careers-hero-content">
          <h1 className="careers-hero-title">Career Opportunities</h1>
          <p className="careers-hero-subtitle">
            Join a team that's shaping the future of workforce solutions. 
            Discover roles that match your skills and ambitions.
          </p>
        </div>
        <div className="careers-hero-pattern" aria-hidden="true"></div>
      </section>

      {/* Main Content Container */}
      <div className="careers-container">
        {/* Controls Bar */}
        <div className="careers-controls-bar">
          <div className="controls-left">
            <button
              onClick={() => setShowAllJobs(!showAllJobs)}
              className={`promotion-toggle ${showAllJobs ? 'active' : ''}`}
            >
              {showAllJobs ? '⭐ All Jobs' : '⭐ Promoted'}
            </button>
          </div>
          
          <div className="controls-right">
            <div className="sort-control">
              <label htmlFor="sort-select">Sort:</label>
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

        {/* Minimalistic Filter Section */}
        <div className="careers-filters">
          <div className="filters-header">
            <h3 className="filters-title">Refine Your Search</h3>
            {(filters.search || filters.industry || filters.employmentType || filters.experienceLevel || filters.city || filters.state || filters.isRemote) && (
              <button onClick={clearFilters} className="clear-filters-link">
                Clear all
              </button>
            )}
          </div>
          
          <div className="filters-grid">
            <div className="filter-group">
              <label>Search</label>
              <input
                type="text"
                placeholder="Job title or keywords..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label>Industry</label>
              <select
                value={filters.industry}
                onChange={(e) => handleFilterChange('industry', e.target.value)}
                className="filter-select"
              >
                <option value="">All Industries</option>
                {industries.map(industry => (
                  <option key={industry._id} value={industry._id}>{industry.name}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Employment Type</label>
              <select
                value={filters.employmentType}
                onChange={(e) => handleFilterChange('employmentType', e.target.value)}
                className="filter-select"
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Experience</label>
              <select
                value={filters.experienceLevel}
                onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
                className="filter-select"
              >
                <option value="">All Levels</option>
                <option value="Fresher">Fresher</option>
                <option value="0-2 years">0-2 years</option>
                <option value="2-5 years">2-5 years</option>
                <option value="5-10 years">5-10 years</option>
                <option value="10+ years">10+ years</option>
              </select>
            </div>

            <div className="filter-group">
              <label>City</label>
              <input
                type="text"
                placeholder="e.g., Noida"
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label>State</label>
              <input
                type="text"
                placeholder="e.g., Uttar Pradesh"
                value={filters.state}
                onChange={(e) => handleFilterChange('state', e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group filter-checkbox">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={filters.isRemote}
                  onChange={(e) => handleFilterChange('isRemote', e.target.checked)}
                  className="checkbox-input"
                />
                <span>Remote Only</span>
              </label>
            </div>
          </div>
        </div>

        {/* Job Listings */}
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
              <div className="pagination">
                <button
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage(prev => prev - 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
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
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VacancyList;
