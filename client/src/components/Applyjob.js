import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../style/applyjob.css';

function Applyjob() {
  const location = useLocation();
  const {
    companyName,
    role,
    location: jobLocation,
    batchEligible,
    jobDescription,
    category,
    applyLink
  } = location.state;

  // Function to convert category to skill format with hashtag
  const formatSkill = (skill) => {
    return `#${skill}`;
  };

  return (
    <div className="apply-job-container">
      <div className="apply-job-content">
        <div className="apply-job-header">
          <h2>{role}</h2>
          <p><strong>Location:</strong> {jobLocation}</p>
          <p><strong>Company:</strong> {companyName}</p>
        </div>
        <div className="apply-job-body">
          <h3>Job Description</h3>
          <p>{jobDescription}</p>
          <div>
            <strong>Eligible Batch:</strong>
            <ul>
              {batchEligible.map((batch, index) => (
                <li key={index}>{batch}</li>
              ))}
            </ul>
          </div>
          <p><strong>Skills:</strong> {formatSkill(category)}</p>
        </div>
        <Link to={applyLink} className="apply-now-button">Apply Now</Link>
      </div>
    </div>
  );
}

export default Applyjob;
