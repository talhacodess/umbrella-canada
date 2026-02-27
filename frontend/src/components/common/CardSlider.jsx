import React, { useRef } from "react";
import "./CardSlider.css";
import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";

const CardSlider = ({ items, top }) => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.firstChild?.clientWidth || 200; // Default to 200 if no card is found
      container.scrollTo({
        left: container.scrollLeft - cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.firstChild?.clientWidth || 200; // Default to 200 if no card is found
      container.scrollTo({
        left: container.scrollLeft + cardWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      <div
        ref={scrollContainerRef}
        className=" sm:pl-0 pl-4 pr-4 sm:pr-0 items-start gap-3 sm:gap-4 flex  overflow-x-auto overflow-y-hidden whitespace-nowrap custom-scrollbar py-2 snap-x snap-mandatory min-h-[280px] sm:min-h-[280px] md:min-h-[200px]"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items}
      </div>
      {/* Desktop Navigation Arrows */}
      <div className="md:block hidden">
        <button
          className="arrow arrow-left absolute left-2 cursor-pointer rounded-full flex justify-center items-center bg-white/90 backdrop-blur-sm border border-gray-200 hover:bg-gradient-to-r hover:from-[#192133] hover:to-[#192133]/90 hover:border-[#192133] hover:shadow-xl w-12 h-12 hover:text-white transition-all duration-300 group z-10"
          style={{ top: top ? `${top}%` : "50%", transform: "translateY(-50%)" }}
          onClick={scrollLeft}
        >
          <LiaAngleLeftSolid size={24} className="text-[#192133] group-hover:text-white transition-colors duration-300" />
        </button>
        <button
          className="arrow arrow-right absolute right-2 cursor-pointer rounded-full flex justify-center items-center bg-white/90 backdrop-blur-sm border border-gray-200 hover:bg-gradient-to-r hover:from-[#192133] hover:to-[#192133]/90 hover:border-[#192133] hover:shadow-xl w-12 h-12 hover:text-white transition-all duration-300 group z-10"
          style={{ top: top ? `${top}%` : "50%", transform: "translateY(-50%)" }}
          onClick={scrollRight}
        >
          <LiaAngleRightSolid size={24} className="text-[#192133] group-hover:text-white transition-colors duration-300" />
        </button>
      </div>
      {/* Mobile Navigation Arrows - Smaller and positioned */}
      <div className="md:hidden flex justify-between items-center absolute inset-y-0 left-0 right-0 pointer-events-none px-2">
        <button
          className="arrow arrow-left cursor-pointer rounded-full flex justify-center items-center bg-white/95 backdrop-blur-sm border border-gray-300 shadow-lg w-10 h-10 text-[#192133] transition-all duration-300 group z-10 pointer-events-auto active:scale-95"
          onClick={scrollLeft}
          aria-label="Scroll left"
        >
          <LiaAngleLeftSolid size={20} className="text-[#192133] transition-colors duration-300" />
        </button>
        <button
          className="arrow arrow-right cursor-pointer rounded-full flex justify-center items-center bg-white/95 backdrop-blur-sm border border-gray-300 shadow-lg w-10 h-10 text-[#192133] transition-all duration-300 group z-10 pointer-events-auto active:scale-95"
          onClick={scrollRight}
          aria-label="Scroll right"
        >
          <LiaAngleRightSolid size={20} className="text-[#192133] transition-colors duration-300" />
        </button>
      </div>
    </div>
  );
};

export default CardSlider;