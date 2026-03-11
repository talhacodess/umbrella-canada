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