import React, { useState } from "react";
import axios from 'axios';
import './Career.css';

const Career = ({url, jobId}) => {
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

    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("email", formData.email);
    data.append("address", formData.address);
    data.append("mobileNo", formData.mobileNo);
    data.append("jobId", formData.jobId);
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

      console.log(result);
      

      if (result.data.success) {
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
      } else {
        setMessage(`${result.data.message} ❌`);
      }
    } catch (error) {
      console.error(error);
      setMessage("Error submitting application ❌");
    }
  };

  return (
    <div className="career-form">
      <h2>Apply for a Career</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Mobile Number</label>
          <input
            type="tel"
            name="mobileNo"
            required
            value={formData.mobileNo}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>City</label>
          <input
            type="text"
            name="city"
            required
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>State</label>
          <select
            name="state"
            required
            value={formData.state}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select a state
            </option>
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

        <div>
          <label>10th Percentage</label>
          <input
            type="number"
            name="tenthPercentage"
            required
            min="0"
            max="100"
            step="0.01"
            value={formData.tenthPercentage}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>12th/Diploma Percentage</label>
          <input
            type="number"
            name="twelfthPercentage"
            required
            min="0"
            max="100"
            step="0.01"
            value={formData.twelfthPercentage}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Degree</label>
          <select
            name="degree"
            required
            value={formData.degree}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select a degree
            </option>
            <option value="B.Tech CSE">B.Tech CSE</option>
            <option value="B.Tech IT">B.Tech IT</option>
            <option value="B.Tech Other Branches">B.Tech Other Branches</option>
            <option value="MCA">MCA</option>
          </select>
        </div>

        <div>
          <label>Degree CGPA</label>
          <input
            type="number"
            name="degreeCgpa"
            required
            min="0"
            max="10"
            step="0.01"
            value={formData.degreeCgpa}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Upload Resume</label>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            required
            onChange={handleFileChange}
          />
        </div>

        <button type="submit">Apply</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Career;
