import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/login.css';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Send formData to your backend API for login
      const response = await fetch('https://awsar.onrender.com/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json(); // Parse response body as JSON
  
      if (!response.ok) {
        // If response status is not OK, throw an error
        throw new Error(data.message || 'Failed to login');
      }
  
      // Store the token in local storage
      localStorage.setItem('token', data.token);
  
      // Reset form fields after successful login
      setFormData({
        email: '',
        password: '',
      });
  
      // Redirect the user to the dashboard or another page upon successful login
      navigate('/app') 
    } catch (error) {
      console.error('Error logging in:', error);
  
      // Display alert for incorrect email or password
      alert(error.message || 'Failed to login');
    }
  };
  
  

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="login-input"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="login-input"
          required
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
