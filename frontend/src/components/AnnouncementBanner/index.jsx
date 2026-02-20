import React from 'react';
import BigSale from '../../assets/images/icon/Big sale.svg';
import BulkOrder from '../../assets/images/icon/Bulk orders.svg';
import Discount from '../../assets/images/icon/Discount.svg';
import contactUs from '../../assets/images/icon/contact us.svg';
import freeShipping from '../../assets/images/icon/Free-delivery.png';

// Note: Save 40%.svg file has % character which causes URI encoding issues
// Using BigSale as fallback until file is renamed (e.g., "Save-40-percent.svg")

const AnnouncementBanner = () => {
  // Static announcements - 5 titles with icons, no subtitles
  const announcements = [
    {
      id: 1,
      title: 'Claim Your 30% Discount Now',
      icon: Discount
    },
    {
      id: 2,
      title: 'Contact us for a custom quote today!',
      icon: contactUs
    },
    {
      id: 3,
      title: 'Biggest Sale of the Season',
      icon: BigSale
    },
    {
      id: 4,
      title: 'Save 40% on Custom Boxes',
      icon: BigSale
    },
    {
      id: 5,
      title: 'Free Shipping!     Free Design!     Save Big on Bulk Orders!',
      icon: freeShipping
    }
  ];

  // Duplicate announcements for seamless loop
  const duplicatedAnnouncements = [...announcements, ...announcements];
  const animationDuration = announcements.length * 15;

  return (
    <>
      <style>
        {`
          @keyframes scroll-announcement {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .announcement-scroll {
            animation: scroll-announcement 15s linear infinite;
            will-change: transform;
          }
          .announcement-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      {/* Top Border Line with Shadow */}
      <div 
        className="h-px w-full" 
        style={{ 
          backgroundColor: '#213554',
          boxShadow: '0 1px 2px rgba(33, 53, 84, 0.2)'
        }}
      ></div>
      
      <div className="bg-[#213554] relative overflow-hidden w-full z-30">
        <div className="relative w-full py-1 sm:py-1">
          {/* Sliding Announcement Container */}
          <div className="flex announcement-scroll whitespace-nowrap">
            {duplicatedAnnouncements.map((announcement, index) => (
              <div
                key={`${announcement.id}-${index}`}
                className="inline-flex items-center gap-1 sm:gap-3 px-6 sm:px-8 lg:px-12 flex-shrink-0"
              >
                {/* Icon */}
                {announcement.icon && (
                  <img 
                    src={announcement.icon} 
                    alt="" 
                    className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 object-contain"
                  />
                )}

                {/* Title - Dark Blue (Logo Secondary Color) with underline */}
                <span className="text-xs  sm:text-sm md:text-base font-bold whitespace-nowrap underline" style={{ color: '#ffffff' }}>
                  {announcement.title}
                </span>

                {/* Separator */}
                {/* <span className="text-gray-400 mx-2 sm:mx-4 text-lg">|</span> */}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom Border Line with Shadow */}
      <div 
        className="h-px w-full" 
        style={{ 
          backgroundColor: '#213554',
          boxShadow: '0 -1px 2px rgba(33, 53, 84, 0.2)'
        }}
      ></div>
    </>
  );
};

export default AnnouncementBanner;

