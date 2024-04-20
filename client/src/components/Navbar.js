import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/app" className="navbar-logo">
          Awsar
        </Link>
        <div className={`menu-icon ${isOpen && 'open'}`} onClick={toggleMenu}>
          <div className="menu-line"></div>
          <div className="menu-line"></div>
          <div className="menu-line"></div>
        </div>
        <ul className={`nav-menu ${isOpen && 'open'}`}>
          <li className="nav-item">
            <Link to="/app" className="nav-link" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/app/contact" className="nav-link" onClick={toggleMenu}>
              Contact Us
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link to="/profile" className="nav-link" onClick={toggleMenu}>
              Profile
            </Link>
          </li> */}
          <li className="nav-item">
            <Link to="/app/createjob" className="nav-link big-font" onClick={toggleMenu}>
              Create a Job
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
