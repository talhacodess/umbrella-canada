import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { BaseUrl } from '../../utils/BaseUrl';
import Button from '../common/Button';
import { FaArrowDown } from 'react-icons/fa';

const BannerContent = React.memo(({ serverData }) => {
  const [banner, setBanner] = useState(serverData || null);
  const [loading, setLoading] = useState(!serverData);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const contentRef = useRef(null);
  const bannerSectionRef = useRef(null);

  const fetchBanner = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BaseUrl}/banner/getAll`);
      const data = response?.data?.data?.[0] || null;
      setBanner(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching banner:', error);
      setError('Failed to load banner content');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // If serverData is provided, use it and don't fetch
    if (serverData) {
      setBanner(serverData);
      setLoading(false);
      return;
    }

    fetchBanner();
  }, [serverData]);

  useEffect(() => {
    // Check if content height exceeds a certain limit to show "Read More" button
    if (contentRef.current && banner?.description) {
      // Use setTimeout to ensure content is fully rendered
      setTimeout(() => {
        if (contentRef.current) {
          const contentHeight = contentRef.current.scrollHeight;
          const maxHeight = 600; // Maximum height before showing "Read More"
          setShowReadMore(contentHeight > maxHeight);
        }
      }, 100);
    }
  }, [banner]);

  // Handle read more/less toggle with scroll to top
  const handleToggle = () => {
    if (isExpanded) {
      // When collapsing, scroll to top of banner section
      setIsExpanded(false);
      setTimeout(() => {
        if (bannerSectionRef.current) {
          bannerSectionRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 100);
    } else {
      setIsExpanded(true);
    }
  };

  if (loading) {
    return (
      <div className=" bg-[#f7f7f7] py-10">
        <div className=" mx-auto px-4 sm:px-6 md:max-w-8xl w-[95%]">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#EE334B]"></div>
              <p className="mt-4 text-gray-600">Loading content...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !banner) {
    return null; // Don't show anything if there's an error or no banner
  }

  return (
    <div ref={bannerSectionRef} className="py-5 sm:py-8 bg-white">
      <div className=" mx-auto px-4 sm:px-6 sm:max-w-8xl w-[95%]">
        <div
          ref={contentRef}
          className="banner-content-wrapper relative"
          style={{
            maxHeight: isExpanded || !showReadMore ? 'none' : '700px',
            overflow: isExpanded || !showReadMore ? 'visible' : 'hidden',
            transition: 'max-height 0.3s ease-in-out',
            position: 'relative'
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: banner?.description }} />
          {!isExpanded && showReadMore && (
            <div
              className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none"
            />
          )}
        </div>

        {showReadMore && (
          <div className="mt-4 flex items-start">
            <Button
              onClick={handleToggle}
              label={isExpanded ? 'READ LESS' : 'READ MORE'}
              variant="red"
              size="md"
              className=" uppercase text-white"
              rIcons={
                <span className={`transform transition-transform duration-200 inline-block  ${isExpanded ? 'rotate-180' : ''}`}>
                  <FaArrowDown color='white' />
                </span>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
});

export default BannerContent;
