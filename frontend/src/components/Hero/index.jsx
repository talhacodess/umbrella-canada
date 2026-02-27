import React, { useState, useEffect } from "react";
import hero from "../../assets/images/hero-banner.png";

import Button from "../../components/common/Button";
import { Link } from "react-router-dom";
import AnnouncementBanner from "../AnnouncementBanner";
 

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
    <>
    <AnnouncementBanner/>
    <div className="w-full lg:h-[50vh] h-[50vh] relative overflow-hidden">
    

      {/* Linear Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/75 to-black/40 z-10" style={{backgroundImage:`url(${hero})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>

      {/* Text Content Overlay */}
      <div className="relative w-full h-full flex items-center justify-center z-20 ">
        <div className="w-full sm:w-3/5 px-6 sm:px-8 md:px-12 lg:px-16 text-left">
          {/* Background behind content - Half screen */}
          {/* bg-black/30 backdrop-blur-sm */}
          <div className=" rounded-lg p-0 sm:p-8 md:p-10 bg-[#192133] text-center">
            <div className=" space-x-3 ">
              <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 uppercase tracking-wide">
              If you need it, we print it.
              </h1>
              <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8  tracking-wide">
             From custom-printed business products to beautiful photo gifts, we’ve got the product for you. Plus, with our easy-to-use design tools and services, you get exactly what you want.

              </p>
             
              <Link to={'/shop'}>
                <Button variant="red" className="font-semibold" label="Get Instant Quote" />
              </Link>
             
            
              <Link to={'/shop'}>
                <Button variant="white" className="font-semibold" label="Get Custom Template" />
              </Link>
            
              <Link to={'/shop'}>
                <Button variant="white" className="font-semibold" label="Order Sample Kit" />
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
    </>
  );
};

export default Hero;
