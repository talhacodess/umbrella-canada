// import React from "react";
// import { Link } from "react-router-dom";
// import brand1 from "../../assets/images/brand/1.png";
// import brand2 from "../../assets/images/brand/2.png";
// import brand3 from "../../assets/images/brand/3.png";
// import brand4 from "../../assets/images/brand/4.png";
// import brand5 from "../../assets/images/brand/5.png";
// import brand6 from "../../assets/images/brand/6.png";
// import brand7 from "../../assets/images/brand/7.png";
// import brand8 from "../../assets/images/brand/8.png";
// import brand9 from "../../assets/images/brand/9.png";
// import brand10 from "../../assets/images/brand/10.png";
// import brand11 from "../../assets/images/brand/11.png";
// import brand12 from "../../assets/images/brand/12.png";
// import brand13 from "../../assets/images/brand/13.png";
// import brand14 from "../../assets/images/brand/14.png";
// import brand15 from "../../assets/images/brand/15.png";

// const BottomHero = () => {
//   const brands = [
//     { id: 1, image: brand1, alt: "Adidas" },
//     { id: 2, image: brand2, alt: "Good Vibe CBD" },
//     { id: 3, image: brand3, alt: "Nike" },
//     { id: 4, image: brand4, alt: "The Frankie Shop" },
//     { id: 5, image: brand5, alt: "Channel" },
//     { id: 6, image: brand6, alt: "Brand 1" },
//     { id: 7, image: brand7, alt: "Brand 2" },
//     { id: 8, image: brand8, alt: "Brand 3" },
//     { id: 9, image: brand9, alt: "Brand 4" },
//     { id: 10, image: brand10, alt: "Brand 5" },
//     { id: 11, image: brand11, alt: "Brand 6" },
//     { id: 12, image: brand12, alt: "Brand 5" },
//     { id: 13, image: brand13, alt: "Brand 5" },
//     { id: 14, image: brand14, alt: "Brand 5" },
//     { id: 15, image: brand15, alt: "Brand 5" },
//   ];

//   // Duplicate brands for seamless loop
//   const duplicatedBrands = [...brands, ...brands, ...brands];
//   const animationDuration = brands.length * 3;

//   return (
//     <>
//       <style>
//         {`
//           @keyframes scroll-brands {
//             0% {
//               transform: translateX(0);
//             }
//             100% {
//               transform: translateX(-33.333%);
//             }
//           }
//           .brands-scroll {
//             animation: scroll-brands ${animationDuration}s linear infinite;
//           }
//           .brands-scroll:hover {
//             animation-play-state: paused;
//           }
//         `}
//       </style>
//       <div className="py-3.5 bg-[#F7F7F7]">
//         <div className="sm:max-w-7xl w-[95%] mx-auto">
         
          
//           {/* Scrolling Brands Section */}
//           <div className="relative overflow-hidden w-full">
//             <div className="flex brands-scroll whitespace-nowrap gap-8 items-center">
//               {duplicatedBrands.map((brand, index) => (
//                 <div
//                   key={`${brand.id}-${index}`}
//                   className="inline-flex items-center justify-center flex-shrink-0"
//                   style={{  height: '40px' }}
//                 >
//                   <img 
//                     src={brand.image} 
//                     alt={brand.alt} 
//                     className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
//                     style={{ filter: 'grayscale(100%)' }}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BottomHero;

import React from "react";
import { Link } from "react-router-dom";
import { Icon1, Icon2, Icon3, Icon4, Icon5,Icon14, Icon6, Icon7 } from '../../assets';
import { Icon13, Icon15, Icon16, insert1, insert2, insert3, insert4, insert5 } from '../../assets';
const services = [
  {
       id: 1,
       icon: Icon13,
       title: 'FREE SHIPPING',
       description: 'Free shipping on all orders'
     },
     // {
     //   id: 2,
     //   icon: Icon1,
     //   title: 'MONEY BACK GUARANTEE',
     //   description: '100% money back'
     // },
     {
       id: 3,
       icon: Icon15,
       title: 'ONLINE SUPPORT 24/7',
       description: '24/7 Customer Support'
     },
     {
       id: 4,
       icon: Icon16,
       title: 'Quickest Turnaround',
        description: 'Fastest production industry'
     },
     {
       id: 5,
       icon: Icon3,
       title: 'Free Design Support',
       description: 'Professional design services'
     },
     {
       id: 6,
       icon: Icon14,
       title: 'No Die & Plate Charges',
        description: 'No setup fees'
     },
];
const BottomHero = () => {
  return (
    <div className="bg-[#F7F7F7] border-b border-gray-200  relative z-30">
      <div className="max-w-8xl mx-auto px-4">
        <div className="flex flex-wrap justify-center lg:justify-between items-center py-6 gap-y-6">
          {services.map((service, index) => (
            <div key={service.id} className="flex items-center">
              {/* Individual Service Item */}
              <div className="flex items-center gap-4 px-4 group cursor-default">
                <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-9 h-9 sm:w-10 sm:h-10 opacity-80"
                    loading="lazy"
                  />
                </div>

                <div className="flex flex-col">
                  <h6 className="text-xs sm:text-sm font-bold text-[#213554] uppercase   leading-tight">
                    {service.title}
                  </h6>
                  <p className="text-[8px] sm:text-[10px] text-gray-600">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Vertical Divider - Hidden on last item and mobile */}
              {index < services.length - 1 && (
                <div className="hidden lg:block h-8 w-px bg-gray-300 mx-2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomHero;