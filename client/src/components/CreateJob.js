import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/createjob.css';

function CreateJob() {
  const [formData, setFormData] = useState({
    companyName: '',
    location: '',
    batchEligible: [],
    jobDescription: '',
    role: '',
    category: '',
    applyLink: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User is not authenticated');
      }
  
      // Make a request to the server to check if the user is an admin
    //   const response = await fetch('http://localhost:8080/api/v1/auth/checkAdmin', {
    //     method: 'GET',
    //     headers: {
    //       'Authorization': `Bearer ${token}`
    //     }
    //   });
  
    //   if (!response.ok) {
    //     throw new Error('User is not an admin');
    //   }
  
      formData.token=token;
      // If user is an admin, proceed with job creation
      const jobResponse = await fetch('https://awsar.onrender.com/api/v1/job/createJob', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (!jobResponse.ok) {
        throw new Error('Failed to create job');
      }
  
      navigate('/app');
    } catch (error) {
      console.error('Error creating job:', error);
      alert('You Cannot create a job , You are not Admin');
      // Handle error, e.g., display error message to the user
    }
  };
  
  

  return (
    <div className="create-job-container">
      <h2>Create a Job</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
        <input type="text" name="batchEligible" placeholder="Batch Eligible (comma separated)" value={formData.batchEligible} onChange={handleChange} required />
        <textarea name="jobDescription" placeholder="Job Description" value={formData.jobDescription} onChange={handleChange} required />
        <input type="text" name="role" placeholder="Role" value={formData.role} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
        <input type="url" name="applyLink" placeholder="Apply Link" value={formData.applyLink} onChange={handleChange} required />
        <button type="submit">Create Job</button>
      </form>
    </div>
  );
}

export default CreateJob;
