// Footer.js

import React, { useEffect, useState } from 'react';
import '../style/footer.css';

function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer className={isVisible ? 'footer visible' : 'footer'}>
      <div className="footer-content">
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/sagar-ray-3a6297225/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/roy7077" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <div className="footer-text">
          <p>&copy; 2024 Awsar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
