import React, { useState, useEffect } from "react";
import CustomBoxCard from "../common/CustomBoxCard";
import { Box1, Box2, Box3, Box4, Box5, Box6, Box7 } from "../../assets";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

// Add fadeInUp animation
if (typeof document !== 'undefined' && !document.getElementById('custom-box-animations')) {
  const style = document.createElement('style');
  style.id = 'custom-box-animations';
  style.textContent = `
    @keyframes fadeInUp {
      0% { transform: translateY(10px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }
    .animate-fadeInUp {
      animation: fadeInUp 0.4s ease-out;
    }
  `;
  document.head.appendChild(style);
}

// Preload critical images to prevent layout shifts
const preloadImages = (imageUrls) => {
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
};

const CustomBoxMaterial = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const customBox = [
    {
      id: 1,
      title: "Rigid Boxes",
      subTitle: "Premium Feel & Protection with Rigid Boxes",
      description:
        "For special, luxury, and unique products that deserve exceptional presentation, rigid boxes are the ideal choice. X Custom Packaging made rigid boxes offer superior durability, a luxury feel, and unmatched shelf presence. We are amongst the best when it comes to making rigid boxes.",
      image: Box1,
      buttonUrl: "#",
      width: 450,  // Added explicit dimensions
      height: 300,
    },
    {
      id: 2,
      title: "Corrugated Boxes",
      subTitle: "The Reliable Strength of Corrugated Boxes",
      description:
        "Corrugated boxes are safe and reliable to ship products even across the oceans due to their layered structure and construction. We use corrugated materials that ensure your products arrive securely, every time, with fantastic print on them as per your artwork.",
      image: Box2,
      buttonUrl: "#",
      width: 450,
      height: 300,
    },
    {
      id: 3,
      title: "Kraft Boxes",
      subTitle: "100% Recycled Packaging with Kraft Boxes",
      description:
        "Go for natural and sustainable Kraft boxes, bags, and cups for a look that’s both rustic and responsible. Made from renewable resources, our Kraft packaging is strong, biodegradable, and perfect for brands committed to contributing to the environment. Go green with X Custom Packaging!",
      image: Box3,
      buttonUrl: "#",
      width: 450,
      height: 300,
    },
    {
      id: 4,
      title: "Cardboard Boxes",
      subTitle:
        "Economical & The Only Choice for Retail",
      description:
        "Cardboard boxes are an excellent choice for retail packaging because they are economical, best suited for printing any artwork on them, and adaptable to any shape. Our cardboard boxes are best for product and display packaging. X Custom Packaging transforms plain cardboard into powerful brand statements that connect with customers.",
      image: Box4,
      buttonUrl: "#",
      width: 450,
      height: 300,
    },
  
  ];

  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? customBox.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === customBox.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Preload images on component mount
  useEffect(() => {
    const imageUrls = customBox.map(box => box.image);
    preloadImages(imageUrls);
    
    // Set a small timeout to allow images to start loading
    const timer = setTimeout(() => {
      setImagesLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex]);

  // Get first 4 boxes for the image grid (2x2) - showing boxes around current index
  const getVisibleBoxes = () => {
    const boxes = [];
    for (let i = 0; i < 4; i++) {
      const index = (currentIndex + i) % customBox.length;
      boxes.push(customBox[index]);
    }
    return boxes;
  };

  const imageTabs = getVisibleBoxes();
  const activeBoxData = customBox[currentIndex];

  return (
    <div className="w-full mx-auto py-10">
      <div className="text-center">
        <h2 className="sm:text-[35px] text-[25px] font-sans font-[600] text-[#333333] break-words">
          Choose the Perfect Material for Your Custom Box

        </h2>
        <p className="pt-3 pb-6 text-sm  max-w-7xl mx-auto">
         We help you choose the right material for your packaging as it is key to balancing protection, presentation, and cost. <b>This guide breaks down your options</b>, from durable corrugated mailers to luxury rigid boxes and from eco-friendly kraft boxes and bags to budget-friendly retail cardboard boxes, helping you make the smartest choice for your product.<b>box your packaging with X Custom Packaging!</b> 

        </p>
      </div>
      
      {/* Add a loading placeholder to prevent layout shift */}
      {!imagesLoaded && (
        <div className="my-10 min-h-[400px] flex items-center justify-center">
          <div className="animate-pulse bg-gray-200 rounded-lg w-full h-full max-h-[400px]"></div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center lg:gap-8 my-8">
        {/* Left Side - Image Grid Tabs (2x2) */}
        <div className="relative">
          {/* Watermark Background */}
          {/* <div className="hidden lg:flex absolute -top-32 bottom-0 -left-8 items-center justify-start pl-4 pointer-events-none opacity-10">
            <h6
              className="text-[60px] lg:text-[100px] font-bold text-gray-300 select-none"
              style={{
                fontFamily: 'Arial, sans-serif',
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
              }}
            >
              Custom style
            </h6>
          </div> */}
          {/* <div className="hidden md:flex absolute -top-32 sm:-top-28 bottom-0 -left-8 sm:-left-16 items-center justify-start pl-4 sm:pl-8 pointer-events-none">
            <h6
              className="text-[40px] sm:text-[60px] lg:text-[100px] font-bold text-[#EE334B] opacity-10 select-none" 
              style={{ 
                fontFamily: 'Arial, sans-serif',
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                transform: 'rotate(0deg)'
              }}
            >
              Custom Quote
            </h6>
          </div>
           */}
          <div className="grid grid-cols-2 gap-4 relative z-10">
            {imageTabs.map((box, idx) => {
              const boxIndex = customBox.findIndex(b => b.id === box.id);
              const isActive = boxIndex === currentIndex;
              return (
                <button
                  key={box.id}
                  onClick={() => goToSlide(boxIndex)}
                  className={`relative group rounded-lg overflow-hidden  border-[2px] transition-all duration-300 transform  ${
                    isActive
                      ? 'border-[#EE334B] shadow-lg'
                      : 'border-gray-200 hover:border-[#EE334B]/50 hover:shadow-md'
                  }`}
                >
                  <div className="relative w-full  sm:h-64 h-auto aspect-square overflow-hidden">
                    <img
                      src={box.image}
                      alt={box.title}
                      className={`w-full h-full  object-cover transition-transform duration-700 ${
                        isActive ? '' : ''
                      }`}
                    />
                    {/* Overlay Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}></div>
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"></div>
                  </div>
                  {/* Label */}
                  <div className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/60 to-transparent transition-opacity duration-300`}>
                    <p className="text-white font-semibold text-sm text-center">{box.title}</p>
                  </div>
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-[#EE334B] rounded-full flex items-center justify-center shadow-lg">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="relative">
         

          <div className="relative">
            <div className=" z-10 animate-fadeInUp md:pr-20 pr-0">
              <CustomBoxCard {...activeBoxData} />
              
              {/* Indicator Dots with Images below Get Quote button */}
              <div className=" mt-3">
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {/* Left Arrow */}
                    <button
                      onClick={goToPrevious}
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-[#EE334B] text-[#EE334B] hover:bg-[#EE334B] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
                      aria-label="Previous box"
                    >
                      <FaAngleLeft size={14} />
                    </button>
                    
                    {/* Indicator Dots - Only First 4 Images */}
                    <div className="flex items-center justify-center gap-2 sm:gap-3 px-2">
                      {customBox.slice(0, 4).map((box, index) => {
                        const isActive = index === currentIndex;
                        return (
                          <button
                            key={box.id}
                            onClick={() => goToSlide(index)}
                            className={`relative group transition-all duration-300 ${
                              isActive ? 'scale-110' : 'hover:scale-105'
                            }`}
                            aria-label={`Go to ${box.title}`}
                          >
                            {/* Image Thumbnail */}
                            <div className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 shadow-md ${
                              isActive 
                                ? 'border-[#EE334B] shadow-lg ring-2 ring-[#EE334B]/30' 
                                : 'border-gray-200 hover:border-[#EE334B]/50'
                            }`}>
                              <img
                                src={box.image}
                                alt={box.title}
                                className={`w-full h-full object-cover transition-transform duration-300 ${
                                  isActive ? 'scale-110' : 'group-hover:scale-105'
                                }`}
                              />
                              {/* Active Indicator Dot */}
                              {/* {isActive && (
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#EE334B] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                </div>
                              )} */}
                              {/* Overlay for active state */}
                              {isActive && (
                                <div className="absolute inset-0 bg-[#EE334B]/20"></div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    
                    {/* Right Arrow */}
                    <button
                      onClick={goToNext}
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-[#EE334B] text-[#EE334B] hover:bg-[#EE334B] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
                      aria-label="Next box"
                    >
                      <FaAngleRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:flex absolute  z-30 -bottom-18 right-0 items-center justify-start pointer-events-none">
              <h6
                className="text-[40px] sm:text-[60px]  lg:text-[77px] font-bold text-[#EE334B] opacity-10 select-none" 
                style={{ 
                  fontFamily: 'Arial, sans-serif',
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  transform: 'rotate(0deg)',
                  whiteSpace: 'nowrap'
                }}
              >
                Custom{'\u00A0'}Material 
              </h6>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CustomBoxMaterial;