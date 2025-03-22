import React, { useState, useEffect } from "react";
import "./banner.css"; // Import the CSS file

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = [
    {
      heading: "28 YEARS OF EXCELLENCE",
      subheading: "SINCE 1994",
      guarantee: "GUARANTEED 100% SATISFACTION",
      centers: "LEADS WITH 40 CENTRES IN SRI LANKA",
      buttonText: "Learn More",
    },
    {
      heading: "INNOVATIVE TECHNOLOGY",
      subheading: "LEADING THE INDUSTRY",
      guarantee: "STATE-OF-THE-ART SOLUTIONS",
      centers: "EXPANDING ACROSS THE COUNTRY",
      buttonText: "Discover More",
    },
    {
      heading: "CUSTOMER FIRST APPROACH",
      subheading: "QUALITY SERVICE GUARANTEED",
      guarantee: "YOUR SATISFACTION IS OUR PRIORITY",
      centers: "SERVING MILLIONS OF CUSTOMERS",
      buttonText: "Get Started",
    },
    {
      heading: "SUSTAINABILITY & GROWTH",
      subheading: "BUILDING A GREENER FUTURE",
      guarantee: "ECO-FRIENDLY INITIATIVES",
      centers: "COMMITTED TO ENVIRONMENTAL RESPONSIBILITY",
      buttonText: "Join Us",
    },
  ];

  const images = [
    './poster.jpeg',
    './car1.png',
    './car2.png',
    './car3.png'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [banners.length]);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(imageInterval);
  }, [images.length]);

  useEffect(() => {
    console.log(`Current image: ${images[currentIndex]}`);
  }, [currentIndex, images]);

  return (
    <div 
      className="banner" 
      style={{ backgroundImage: `url(${images[currentIndex]})` }}
    >
      <div className="banner-content fade-in">
        <h1 className="banner-heading">{banners[currentIndex].heading}</h1>
        <h2 className="banner-subheading">{banners[currentIndex].subheading}</h2>
        <p className="banner-guarantee">{banners[currentIndex].guarantee}</p>
        <p className="banner-centers">{banners[currentIndex].centers}</p>
        <button className="banner-button">{banners[currentIndex].buttonText}</button>
      </div>
    </div>
  );
};

export default Banner;