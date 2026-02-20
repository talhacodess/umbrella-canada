import React from "react";
import { Link } from "react-router-dom";
import brand1 from "../../assets/images/brand/1.png";
import brand2 from "../../assets/images/brand/2.png";
import brand3 from "../../assets/images/brand/3.png";
import brand4 from "../../assets/images/brand/4.png";
import brand5 from "../../assets/images/brand/5.png";
import brand6 from "../../assets/images/brand/6.png";
import brand7 from "../../assets/images/brand/7.png";
import brand8 from "../../assets/images/brand/8.png";
import brand9 from "../../assets/images/brand/9.png";
import brand10 from "../../assets/images/brand/10.png";
import brand11 from "../../assets/images/brand/11.png";
import brand12 from "../../assets/images/brand/12.png";
import brand13 from "../../assets/images/brand/13.png";
import brand14 from "../../assets/images/brand/14.png";
import brand15 from "../../assets/images/brand/15.png";

const BottomHero = () => {
  const brands = [
    { id: 1, image: brand1, alt: "Adidas" },
    { id: 2, image: brand2, alt: "Good Vibe CBD" },
    { id: 3, image: brand3, alt: "Nike" },
    { id: 4, image: brand4, alt: "The Frankie Shop" },
    { id: 5, image: brand5, alt: "Channel" },
    { id: 6, image: brand6, alt: "Brand 1" },
    { id: 7, image: brand7, alt: "Brand 2" },
    { id: 8, image: brand8, alt: "Brand 3" },
    { id: 9, image: brand9, alt: "Brand 4" },
    { id: 10, image: brand10, alt: "Brand 5" },
    { id: 11, image: brand11, alt: "Brand 6" },
    { id: 12, image: brand12, alt: "Brand 5" },
    { id: 13, image: brand13, alt: "Brand 5" },
    { id: 14, image: brand14, alt: "Brand 5" },
    { id: 15, image: brand15, alt: "Brand 5" },
  ];

  // Duplicate brands for seamless loop
  const duplicatedBrands = [...brands, ...brands, ...brands];
  const animationDuration = brands.length * 3;

  return (
    <>
      <style>
        {`
          @keyframes scroll-brands {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.333%);
            }
          }
          .brands-scroll {
            animation: scroll-brands ${animationDuration}s linear infinite;
          }
          .brands-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      <div className="py-3.5 bg-[#F7F7F7]">
        <div className="sm:max-w-7xl w-[95%] mx-auto">
         
          
          {/* Scrolling Brands Section */}
          <div className="relative overflow-hidden w-full">
            <div className="flex brands-scroll whitespace-nowrap gap-8 items-center">
              {duplicatedBrands.map((brand, index) => (
                <div
                  key={`${brand.id}-${index}`}
                  className="inline-flex items-center justify-center flex-shrink-0"
                  style={{  height: '40px' }}
                >
                  <img 
                    src={brand.image} 
                    alt={brand.alt} 
                    className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
                    style={{ filter: 'grayscale(100%)' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomHero;
