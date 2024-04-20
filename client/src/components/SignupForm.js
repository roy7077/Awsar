import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import '../style/signupform.css';
import OtpForm from './OtpForm';

function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'Student', // Default to student
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      // Make a POST request to your backend API endpoint to generate and send OTP
      const response = await fetch('https://awsar.onrender.com/api/v1/auth/sendOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send OTP');
      }

      // Reset form fields after successful submission and navigate to OTP page
      navigate('/otp', { state: { formData: formData } });

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        accountType: 'student',
      });
    } catch (error) {
      console.error('Error sending OTP:', error);
      // Handle error, e.g., display error message to the user
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="signup-input"
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="signup-input"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="signup-input"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="signup-input"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="signup-input"
          required
        />
        <select
          name="accountType"
          value={formData.accountType}
          onChange={handleChange}
          className="signup-select"
        >
          <option value="Student">Student</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p> {/* Add a link to the login page */}
    </div>
  );
}

export default SignupForm;
