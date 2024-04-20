import React from 'react';
import '../style/jobcard.css';
import { useNavigate } from 'react-router-dom';

function JobCard({ companyName, location, batchEligible, role, applyLink,jobDescription,category }) {
  const navigate = useNavigate();

  // Function to handle apply button click
  const handleApplyClick = () => {
    // Navigate to Applyjob.js component with the required data
    navigate('/app/applyjob', {
      state: { companyName, location, batchEligible, role, applyLink ,jobDescription,category}
    });
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <h3>🏢 {companyName}</h3>
        <p>📍{location}</p>
      </div>
      <div className="job-card-body">
        <p><strong>Batch Eligible:</strong> {batchEligible}</p>
        <p><strong>Role:</strong> {role}</p>
        {/* Update onClick event to call handleApplyClick function */}
        <button className="apply-link" onClick={handleApplyClick}>Apply Now</button>
      </div>
    </div>
  );
}

export default JobCard;
