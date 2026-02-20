import React, { useState, useEffect } from "react";
import hero from "../../assets/images/banner-slider-image.webp";
import videoSrc from "../../assets/videos/hero.mp4";
import Button from "../../components/common/Button";
import { Link } from "react-router-dom";

const Hero = () => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [showShine, setShowShine] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload hero image for faster FCP
  useEffect(() => {
    const heroImage = new Image();
    heroImage.onload = () => setImageLoaded(true);
    heroImage.src = hero;
  }, []);

  useEffect(() => {
    // Show gallery effect automatically on first load
    if (isFirstLoad) {
      // Start shine animation after a small delay
      const shineTimer = setTimeout(() => {
        setShowShine(true);
      }, 100);
      
      // Hide effects after 3 seconds
      const hideTimer = setTimeout(() => {
        setIsFirstLoad(false);
        setShowShine(false);
      }, 3000);
      
      return () => {
        clearTimeout(shineTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [isFirstLoad]);

  return (
    <div className="w-full lg:h-[75vh] h-[55vh] relative overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Fallback Background Image */}
      {/* {!imageLoaded && (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${hero})` }}
        />
      )} */}

      {/* Linear Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/75 to-black/40 z-10"></div>

      {/* Text Content Overlay */}
      <div className="relative w-full h-full flex items-center justify-start z-20">
        <div className="w-full sm:w-3/5 px-6 sm:px-8 md:px-12 lg:px-16 text-left">
          {/* Background behind content - Half screen */}
          {/* bg-black/30 backdrop-blur-sm */}
          <div className=" rounded-lg p-0 sm:p-8 md:p-10">
            <div>
              <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 uppercase tracking-wide">
              The X Factor Always Delivers!
              </h1>
              <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 uppercase tracking-wide">
              Premium Custom Boxes — Priced to Impress, Delivered in Record Time.
              </p>
              <Link to={'/shop'}>
                <Button variant="red" className="font-semibold" label="Browse Our Catalogue" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
