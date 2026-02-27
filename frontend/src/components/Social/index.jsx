import React, { useState, useEffect } from 'react'
import ProductCard, { ProductSelectionProvider } from '../common/ProductCard';
import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';
import CardSlider from '../common/CardSlider';
import axios from 'axios';
import { BaseUrl } from '../../utils/BaseUrl';
import { useIntersectionObserver } from '../../utils/useIntersectionObserver';

const Social = ({ serverData }) => {
  const [products, setProducts] = useState(serverData || []);
  const [loading, setLoading] = useState(!serverData);
  const [elementRef, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: true
  });

  useEffect(() => {
    
    if (serverData && serverData.length > 0) {
      setProducts(serverData);
      setLoading(false);
      return;
    }

   
    if (!isIntersecting) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
       
        const response = await axios.get(`${BaseUrl}/products/getAll?page=1&perPage=8`);
        
        if (response?.data?.status === 'success' && response?.data?.data) {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [isIntersecting, serverData]);

  return (
    <div ref={elementRef} className=' bg-[#fff] py-10'>
      <div className=' sm:max-w-8xl w-[95%] mx-auto'>
          <div className="text-left mb-8  gap-2">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                 Made by you, #MadeWithUmbrellapackaging

                    </h2>
                    <p className="text-gray-600">
                        Share your creations with us using #MadeWithUmbrellapackaging
                        
                      
                      </p>
                    
        
               
        
                  </div>
      
        {loading ? (
          <div className="py-2">
            <CardSlider
              top={40}
              items={Array(8).fill(null).map((_, index) => (
                <div key={index} className="w-[85vw] sm:w-[280px] flex-shrink-0 px-2 sm:px-2">
                  <div 
                    className="group text-gray-700 bg-[#F9F9F9] rounded-3xl flex font-bold flex-col gap-0.5 items-center border border-gray-200 animate-pulse"
                  >
                    <div className="p-4 relative overflow-hidden rounded-3xl w-full">
                      <div className="relative w-full h-[200px] sm:h-[300px] rounded-2xl overflow-hidden bg-gray-200"></div>
                    </div>
                    <div className="pb-3 w-3/4">
                      <div className="bg-gray-200 rounded h-4 w-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            />
          </div>
        ) : (
          <ProductSelectionProvider>
            <CardSlider
              top={40}
              items={products?.map((item, index) => {
                return (
                  <div key={item._id || index} className="w-[85vw] sm:w-[285px] flex-shrink-0 px-2 sm:px-2">
                    <ProductCard data={item} disableSelection={true} />
                  </div>
                );
              })}
            />
          </ProductSelectionProvider>
        )}
      </div>

    </div>
  )
}

export default Social;