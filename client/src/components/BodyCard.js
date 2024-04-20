import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import JobCard from './JobCard';
import '../style/bodycard.css';

function BodyCard() {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/job/getAllJobs');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const { data } = await response.json();
      setInternships(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000 // Move to next slide every 2 seconds
  };

  return (
    <div className="body-card-container">
      <div className="body-card">
        <div className="carousel-container">
          <Slider {...settings}>
            <div>
              <img className="carousel-image" src="https://previews.123rf.com/images/melpomen/melpomen1604/melpomen160400108/54662682-businessman-drawing-internship-concept-on-blurred-abstract-background.jpg" alt="Image 1" />
            </div>
            <div>
              <img className="carousel-image" src="https://www.shutterstock.com/image-vector/internship-blue-green-typography-banner-260nw-1366933799.jpg" alt="Image 2" />
            </div>
            {/* Add more images as needed */}
          </Slider>
        </div>
        {
          internships.length==0 ? <h1 className='no-intern'>No internship yet</h1> :
        
        <div className="latest-internships">
          <h2>Latest Internships</h2>
          <div className="job-cards">
            {internships.map((internship, index) => (
              <JobCard
                key={index}
                companyName={internship.companyName}
                location={internship.location}
                batchEligible={internship.batchEligible}
                role={internship.role}
                applyLink={internship.applyLink}
                jobDescription={internship.jobDescription}
                category={internship.category}
              />
            ))}
          </div>
        </div>
    }
      </div>
    </div>
  );
}

export default BodyCard;
