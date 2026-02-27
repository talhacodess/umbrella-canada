import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import { BaseUrl } from '../../utils/BaseUrl';
import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';
import Button from '../common/Button';
import GetQuoteModal from '../common/GetQuoteModal';
import CardSlider from '../common/CardSlider';
import ProductCard from '../common/ProductCard';


const CategoryBoxes = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      let retryCount = 0;
      const maxRetries = 2;

      const attemptFetch = async (attemptNumber = 1) => {
        try {
          setLoading(true);
          console.log(`Fetching categories (attempt ${attemptNumber})...`);

          // Fetch top categories from API with iOS Safari compatible configuration
          const response = await axiosInstance.get(`${BaseUrl}/category/getAll?page=1&perPage=5`, {
            timeout: 20000, // 20 second timeout for iOS Safari
          });

          console.log('API Response received:', {
            status: response?.status,
            dataStatus: response?.data?.status,
            hasData: !!response?.data?.data,
            dataLength: response?.data?.data?.length
          });

          if (response?.data?.status === 'success' && response?.data?.data) {
            setCategories(response.data.data);
            console.log(`Successfully loaded ${response.data.data.length} categories`);
            return true;
          } else {
            // Handle unexpected response format
            console.warn('Unexpected API response format:', {
              status: response?.status,
              data: response?.data
            });
            return false;
          }
        } catch (error) {
          console.error(`Error fetching categories (attempt ${attemptNumber}):`, {
            code: error.code,
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            url: error.config?.url
          });

          // Retry logic for network issues
          if (attemptNumber < maxRetries && (error.code === 'ECONNABORTED' || !error.response || error.response?.status >= 500)) {
            console.log(`Retrying... (${attemptNumber + 1}/${maxRetries})`);
            await new Promise(resolve => setTimeout(resolve, 1000 * attemptNumber)); // Exponential backoff
            return await attemptFetch(attemptNumber + 1);
          }

          return false;
        }
      };

      const success = await attemptFetch();
      if (!success) {
        setCategories([]);
        console.error('Failed to fetch categories after all retries');
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  const handleRequestQuote = (category) => {
    setSelectedCategory(category);
    setIsQuoteModalOpen(true);
  };

  return (
    <>
      <div className="py-10 bg-white">
        <div className="sm:max-w-8xl w-[95%] mx-auto">
          {/* Header Section - Always visible */}
          <div className="text-left mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
             Explore all categories
            </h2>
          
          </div>

          {/* Categories Grid - Loading or Content */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-6 ">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-full h-40 w-40 mb-4"></div>
                  <div className="bg-gray-200 h-6 rounded-full mb-2"></div>
                  {/* <div className="bg-gray-200 h-4 rounded-full w-2/3"></div> */}
                </div>
              ))}
            </div>
          ) : (
            <>
          
               <CardSlider
              top={40}
              items={categories?.map((item, index) => {
                return (
                 
                     <div
                    key={item._id}
                    className="group flex flex-col items-center text-center"
                  >
                    {/* Category Image */}
                    <div className="relative  rounded-full overflow-hidden mb-4 bg-gray-50 group-hover:shadow-lg transition-shadow duration-300">
                      <Link to=''>
                        <div className="relative w-40 sm:h-40 h-40  rounded-full overflow-hidden">
                          <img
                            src={item.image ? `${BaseUrl}/${item.image}` : `${BaseUrl}/images/placeholder.jpg`}
                            alt={item.imageAltText || item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-2xl"
                            loading="lazy"
                          />
                          {/* Gallery Hover Overlay Gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#192133]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
                          {/* Gallery Shine Effect - Sweeps across on hover */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-2xl"></div>
                        </div>
                      </Link>
                    </div>

                    {/* Category Title */}
                    <h6 className="font-bold text-lg text-gray-800 mb-3">
                      {item.title}
                    </h6>

                   
                  </div>
                    
                  
                );
              })}
            />

              {/* Bottom Request A Quote Button */}
              {/* <div className="flex justify-center mt-6">
                <Button
                  className="bg-[#800020] text-white hover:bg-[#800020]/90 rounded-lg text-base font-semibold"
                  label="Get Instant Quote"
                  onClick={() => setIsQuoteModalOpen(true)}
                />
              </div> */}
            </>
          )}
        </div>
      </div>

      {/* Request Quote Modal */}
      <GetQuoteModal
        isModalOpen={isQuoteModalOpen}
        setIsModalOpen={setIsQuoteModalOpen}
        closeModal={() => setIsQuoteModalOpen(false)}
        categoryData={selectedCategory}
      />
    </>
  );
};

export default CategoryBoxes;

