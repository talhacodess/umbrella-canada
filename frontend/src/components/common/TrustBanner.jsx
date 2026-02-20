import React from 'react';
import { FaStar } from 'react-icons/fa';
import Button from './Button';

const TrustBanner = ({ categoryName = "Apparel Packaging" }) => {
  return (
    <section className=' bg-[#F7F7F7] py-3'>
     
        <div className=" sm:max-w-8xl max-w-[95%] mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            {/* Left Section - Heading */}
            <div className="flex-1 text-center md:text-left">
              <h2 className=" font-bold leading-tight flex gap-2 items-center">
                <h6 className="text-gray-900 text-lg md:text-xl lg:text-2xl">Customers Trust Us for their </h6>
                <h6 className="text-[#EE334B] text-lg md:text-xl lg:text-2xl">{categoryName}</h6>
              </h2>
            </div>

            {/* Right Section - Rating & Stats */}
            <div className="flex flex-row items-center  gap-3">
              {/* Customer Count Text */}
              <p className="text-base md:text-lg font-normal text-gray-900 text-center md:text-right whitespace-nowrap">
                Serving 5000+ Happy Customers!
              </p>
              
              {/* Rating Display with Button - Horizontal Layout */}
              <div className="flex items-center gap-4">
                {/* Star Rating - Solid Green Stars */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar 
                      key={star}
                      className="text-green-500 text-xl md:text-2xl"
                      fill="currentColor"
                    />
                  ))}
                </div>
                
                {/* Rating Text */}
                <span className="text-lg md:text-xl font-normal text-gray-900">
                  4.9/5
                </span>

                {/* Write a Review Button */}
                <Button label="Write a Review" className="bg-[#213554] hover:bg-[#213554]/90 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap">
                 
                </Button>
              </div>
            </div>
          </div>
        </div>
      
    </section>
  );
};

export default TrustBanner;
