import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Add animations to document head
if (typeof document !== 'undefined' && !document.getElementById('tabs-animations')) {
    const style = document.createElement('style');
    style.id = 'tabs-animations';
    style.textContent = `
        @keyframes slideInRight {
            0% { transform: translateX(20px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInLeft {
            0% { transform: translateX(-20px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeInUp {
            0% { transform: translateY(10px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slideInRight {
            animation: slideInRight 0.4s ease-out;
        }
        .animate-slideInLeft {
            animation: slideInLeft 0.4s ease-out;
        }
        .animate-fadeInUp {
            animation: fadeInUp 0.4s ease-out;
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    `;
    document.head.appendChild(style);
}

const Tabs = ({ tabs, defaultTab, className }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [prevTab, setPrevTab] = useState(null);
  const [direction, setDirection] = useState('right');
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (prevTab !== null && prevTab !== activeTab) {
      const prevIndex = tabs.findIndex(t => t.title === prevTab);
      const currentIndex = tabs.findIndex(t => t.title === activeTab);
      setDirection(currentIndex > prevIndex ? 'right' : 'left');
    }
    setPrevTab(activeTab);
  }, [activeTab, prevTab, tabs]);

  useEffect(() => {
    const checkScrollPosition = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    checkScrollPosition();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);
      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, [tabs]);

  useEffect(() => {
    // Skip scrolling on initial mount to prevent auto-scroll on page refresh
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    // Scroll active tab into view on mobile (only when user changes tabs)
    if (scrollContainerRef.current) {
      const activeButton = scrollContainerRef.current.querySelector(`[data-tab="${activeTab}"]`);
      if (activeButton) {
        activeButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeTab]);

  const handleTabChange = (tabTitle) => {
    setActiveTab(tabTitle);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full">
      <div className="relative w-full">
        {/* Mobile Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-sm border border-gray-300 shadow-lg rounded-full w-8 h-8 flex items-center justify-center text-[#213554] hover:bg-[#213554] hover:text-white transition-all duration-300 active:scale-95"
            aria-label="Scroll left"
          >
            <FaChevronLeft size={14} />
          </button>
        )}
        
        {/* Mobile Right Arrow */}
        {showRightArrow && (
          <button
            onClick={scrollRight}
            className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-sm border border-gray-300 shadow-lg rounded-full w-8 h-8 flex items-center justify-center text-[#213554] hover:bg-[#213554] hover:text-white transition-all duration-300 active:scale-95"
            aria-label="Scroll right"
          >
            <FaChevronRight size={14} />
          </button>
        )}

        <div 
          ref={scrollContainerRef}
          className="flex gap-2 bg-gradient-to-r from-gray-50 to-gray-100 p-1.5 rounded-2xl overflow-x-auto overflow-y-hidden whitespace-nowrap border border-gray-200 md:justify-between scrollbar-hide w-full min-w-0"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.title;
            return (
              <button
                key={tab.title}
                data-tab={tab.title}
                className={`relative px-4 sm:px-6 py-3 sm:py-3.5 cursor-pointer transition-all duration-300 ease-in-out rounded-xl text-xs sm:text-sm font-semibold overflow-hidden group flex-shrink-0 md:flex-1 ${
                  isActive
                    ? "bg-gradient-to-r from-[#213554] to-[#213554]/90 shadow-lg"
                    : `hover:bg-white/80 hover:text-[#213554] text-gray-600 hover:shadow-md hover:scale-105 ${className}`
                }`}
                onClick={() => handleTabChange(tab.title)}
                style={isActive ? { color: '#ffffff' } : {}}
              >
                {/* Animated background effect for active tab */}
                {isActive && (
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
                )}
                {/* Hover shine effect for inactive tabs */}
                {!isActive && (
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#213554]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out"></span>
                )}
                <span className="relative z-10 whitespace-nowrap" style={isActive ? { color: '#ffffff' } : {}}>{tab.title}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-8 relative w-full min-w-0">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.title;
          if (!isActive) return null;
          
          return (
            <div
              key={tab.title}
              className={`w-full min-w-0 ${
                direction === 'right' ? 'animate-slideInRight' : 'animate-slideInLeft'
              }`}
            >
              <div className="animate-fadeInUp w-full min-w-0">
                {tab.content}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
