import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Career.css';

const Career = ({url, jobId}) => {
  const [vacancy, setVacancy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    mobileNo: "",
    jobId: jobId || "",
    city: "",
    state: "",
    tenthPercentage: "",
    twelfthPercentage: "",
    degree: "",
    degreeCgpa: "",
    resume: null,
  });

  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch vacancy details
  useEffect(() => {
    const fetchVacancy = async () => {
      if (!jobId) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`${url}/api/vacancy/get/${jobId}`);
        if (response.data.success) {
          setVacancy(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching vacancy:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVacancy();
  }, [jobId, url]);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle file input
  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    // Use vacancy.jobId if available, otherwise fall back to formData.jobId
    const jobIdToSubmit = vacancy?.jobId || formData.jobId;

    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("email", formData.email);
    data.append("address", formData.address);
    data.append("mobileNo", formData.mobileNo);
    data.append("jobId", jobIdToSubmit);
    data.append("city", formData.city);
    data.append("state", formData.state);
    data.append("tenthPercentage", formData.tenthPercentage);
    data.append("twelfthPercentage", formData.twelfthPercentage);
    data.append("degree", formData.degree);
    data.append("degreeCgpa", formData.degreeCgpa);
    if (formData.resume) data.append("resume", formData.resume);

    try {
      const result = await axios.post(`${url}/api/cv/add`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Check if response indicates success
      if (result.data && result.data.success) {
        setMessage("Application submitted successfully ✅");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          address: "",
          mobileNo: "",
          jobId: jobId || "",
          city: "",
          state: "",
          tenthPercentage: "",
          twelfthPercentage: "",
          degree: "",
          degreeCgpa: "",
          resume: null,
        });
        // Reset file input
        const fileInput = document.getElementById('resume');
        if (fileInput) fileInput.value = '';
      } else {
        // Handle case where success is false but no error was thrown
        const errorMessage = result.data?.message || "Failed to submit application";
        setMessage(`${errorMessage} ❌`);
      }
    } catch (error) {
      console.error('Application submission error:', error);
      
      // Handle axios error responses (400, 500, etc.)
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || 
                            error.response.data?.error || 
                            `Server error (${error.response.status})`;
        setMessage(`${errorMessage} ❌`);
      } else if (error.request) {
        // Request was made but no response received
        setMessage("Network error. Please check your connection and try again. ❌");
      } else {
        // Something else happened
        const errorMessage = error.message || "Error submitting application";
        setMessage(`${errorMessage} ❌`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="career-loading">Loading job details...</div>;
  }

  return (
    <div className="career-apply-page">
      {/* Vacancy Details Section */}
      {vacancy && (
        <div className="vacancy-details-section">
          <div className="vacancy-header">
            <div className="vacancy-title-group">
              <h1 className="vacancy-title">{vacancy.jobTitle}</h1>
              {vacancy.industry && (
                <span className="vacancy-industry-badge">{vacancy.industry.name}</span>
              )}
            </div>
            <span className="vacancy-job-id">Job ID: #{vacancy.jobId}</span>
          </div>

          <div className="vacancy-meta">
            {vacancy.location && (vacancy.location.city || vacancy.location.state) && (
              <span className="meta-item">
                <span className="meta-icon">📍</span>
                {vacancy.location.city}{vacancy.location.city && vacancy.location.state ? ', ' : ''}{vacancy.location.state}
                {vacancy.location.isRemote && <span className="remote-badge">Remote</span>}
              </span>
            )}
            {vacancy.employmentType && (
              <span className="meta-item">
                <span className="meta-icon">💼</span>
                {vacancy.employmentType}
              </span>
            )}
            {vacancy.experienceLevel && (
              <span className="meta-item">
                <span className="meta-icon">⭐</span>
                {vacancy.experienceLevel}
              </span>
            )}
          </div>

          {vacancy.salary && (vacancy.salary.min || vacancy.salary.max) && (
            <div className="vacancy-salary-display">
              <span className="salary-label">Salary:</span>
              <span className="salary-amount">
                {vacancy.salary.min && vacancy.salary.max 
                  ? `₹${vacancy.salary.min.toLocaleString()} - ₹${vacancy.salary.max.toLocaleString()}`
                  : vacancy.salary.min 
                    ? `₹${vacancy.salary.min.toLocaleString()}+`
                    : `Up to ₹${vacancy.salary.max.toLocaleString()}`
                }
              </span>
              {vacancy.salary.isNegotiable && <span className="negotiable-badge">Negotiable</span>}
            </div>
          )}

          {vacancy.skills && vacancy.skills.length > 0 && (
            <div className="vacancy-skills-display">
              <strong>Required Skills:</strong>
              <div className="skills-tags">
                {vacancy.skills.map((skill, idx) => (
                  <span key={idx} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          )}

          <div className="vacancy-description-section">
            <h3>Job Description</h3>
            <p>{vacancy.description}</p>
          </div>

          <div className="vacancy-qualification-section">
            <h3>Qualifications Required</h3>
            <p>{vacancy.qualification}</p>
          </div>

          {vacancy.applicationDeadline && (
            <div className="application-deadline">
              <strong>Application Deadline:</strong> {new Date(vacancy.applicationDeadline).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}
            </div>
          )}
        </div>
      )}

      {/* Application Form Section */}
      <div className="application-form-section">
        <div className="form-header">
          <h2>Application Form</h2>
          <p>Fill in your details to apply for this position</p>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Personal Information */}
          <div className="form-section">
            <h3 className="section-title">Personal Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                />
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="form-section">
            <h3 className="section-title">Contact Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="mobileNo">Mobile Number *</label>
                <input
                  type="tel"
                  id="mobileNo"
                  name="mobileNo"
                  required
                  value={formData.mobileNo}
                  onChange={handleChange}
                  placeholder="+91 1234567890"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="address">Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Your complete address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                />
              </div>

              <div className="form-group">
                <label htmlFor="state">State *</label>
                <select
                  id="state"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select your state</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                  <option value="Ladakh">Ladakh</option>
                  <option value="Puducherry">Puducherry</option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                  <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                </select>
              </div>
            </div>
          </div>

          {/* Education Details */}
          <div className="form-section">
            <h3 className="section-title">Education Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="tenthPercentage">10th Percentage *</label>
                <input
                  type="number"
                  id="tenthPercentage"
                  name="tenthPercentage"
                  required
                  min="0"
                  max="100"
                  step="0.01"
                  value={formData.tenthPercentage}
                  onChange={handleChange}
                  placeholder="e.g., 85.5"
                />
              </div>

              <div className="form-group">
                <label htmlFor="twelfthPercentage">12th/Diploma Percentage *</label>
                <input
                  type="number"
                  id="twelfthPercentage"
                  name="twelfthPercentage"
                  required
                  min="0"
                  max="100"
                  step="0.01"
                  value={formData.twelfthPercentage}
                  onChange={handleChange}
                  placeholder="e.g., 80.0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="degree">Degree *</label>
                <select
                  id="degree"
                  name="degree"
                  required
                  value={formData.degree}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select your degree</option>
                  <option value="B.Tech CSE">B.Tech CSE</option>
                  <option value="B.Tech IT">B.Tech IT</option>
                  <option value="B.Tech Other Branches">B.Tech Other Branches</option>
                  <option value="MCA">MCA</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="degreeCgpa">Degree CGPA *</label>
                <input
                  type="number"
                  id="degreeCgpa"
                  name="degreeCgpa"
                  required
                  min="0"
                  max="10"
                  step="0.01"
                  value={formData.degreeCgpa}
                  onChange={handleChange}
                  placeholder="e.g., 8.5"
                />
              </div>
            </div>
          </div>

          {/* Resume Upload */}
          <div className="form-section">
            <h3 className="section-title">Resume Upload</h3>
            <div className="file-upload-area">
              <label htmlFor="resume" className="file-upload-label">
                <div className="upload-icon">📄</div>
                <div className="upload-text">
                  {formData.resume ? formData.resume.name : 'Click to upload or drag and drop'}
                </div>
                <div className="upload-hint">PDF, DOC, or DOCX (Max 5MB)</div>
              </label>
              <input
                type="file"
                id="resume"
                name="resume"
                accept=".pdf,.doc,.docx"
                required
                onChange={handleFileChange}
                className="file-input"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button type="submit" className="submit-btn" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>

          {message && (
            <div className={`message ${message.includes('✅') ? 'success' : 'error'}`} role="alert">
              <strong>{message.includes('✅') ? 'Success:' : 'Error:'}</strong> {message.replace('✅', '').replace('❌', '').trim()}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Career;
