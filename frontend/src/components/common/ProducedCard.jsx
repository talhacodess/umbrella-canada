import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const ProducedCard = ({ data }) => {
  return (
    <div className="bg-transparent rounded-md p-2 sm:p-4 w-full min-w-0">
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 sm:gap-6 items-stretch w-full">
        {data.map((item, index) => (
          <div
            key={item.title}
            className="col-span-1 bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-5 sm:p-6 min-h-[220px] sm:min-h-[240px] hover:-translate-y-2 hover:shadow-xl transform transition-all duration-300 ease-in-out group relative overflow-hidden min-w-0"
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#213554]/5 via-transparent to-[#EE334B]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            
            {/* Step number badge */}
            <div className="absolute top-4 right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#213554] to-[#213554]/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span style={{color: '#ffffff'}} className="text-white font-bold text-sm sm:text-base">{index + 1}</span>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full pt-8 sm:pt-10">
              {/* Icon */}
              <div className="mb-4 flex justify-center sm:justify-start">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#EE334B] to-[#EE334B]/80 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  <FaCheckCircle className="text-white text-lg sm:text-xl" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-[#213554] mb-3 sm:mb-4 text-center sm:text-left group-hover:text-[#EE334B] transition-colors duration-300 leading-tight break-words">
                {item?.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed flex-grow text-center sm:text-left group-hover:text-gray-700 transition-colors duration-300 break-words">
                {item?.desc}
              </p>
            </div>

            {/* Bottom border accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#213554] via-[#EE334B] to-[#213554] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProducedCard;
