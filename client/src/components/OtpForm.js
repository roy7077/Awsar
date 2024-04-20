import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../style/otp.css';

function OtpForm({ onSubmit }) {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  let formData = location.state ? location.state.formData : null; // Get formData from location state

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.otp = otp;
    console.log(formData);
    try {
      // Make a POST request to your backend API endpoint to submit the form data
      const response = await fetch('https://awsar.onrender.com/api/v1/auth/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // If response is not okay, display window alert
        window.alert('OTP is incorrect');
        setOtp('');
        return; // Stop further execution
      }

      // const res = await response.json();
      // console.log(res);

      // Reset form fields after successful submission and navigate to another page
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle error, e.g., display error message to the user
    }
  };

  return (
    <div className="otp-container">
      <h2>Enter OTP</h2>
      <p className="otp-info">Check your email for the OTP code.</p> {/* Add message here */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          value={otp}
          onChange={handleChange}
          className="otp-input"
          required
        />
        <button type="submit" className="otp-button">
          Verify OTP
        </button>
      </form>
    </div>
  );
}

export default OtpForm;
