import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';
import CardSlider from '../common/CardSlider';
import ProductCard, { ProductSelectionProvider } from '../common/ProductCard';
import axiosInstance from '../../utils/axiosConfig';
import { BaseUrl } from '../../utils/BaseUrl';

const FeaturesPackaging = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Fetch products using getAll API with iOS Safari compatible configuration
        const response = await axiosInstance.get(`${BaseUrl}/products/getAll?page=1&perPage=8`, {
          timeout: 15000, // 15 second timeout for iOS Safari
        });
        
        if (response?.data?.status === 'success' && response?.data?.data) {
          setProducts(response.data.data);
        } else {
          console.warn('Unexpected API response format:', response?.data);
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        // Retry once for iOS Safari network issues
        if (error.code === 'ECONNABORTED' || !error.response) {
          try {
            const retryResponse = await axiosInstance.get(`${BaseUrl}/products/getAll?page=1&perPage=8`, {
              timeout: 20000, // Longer timeout on retry
            });
            if (retryResponse?.data?.status === 'success' && retryResponse?.data?.data) {
              setProducts(retryResponse.data.data);
              return;
            }
          } catch (retryError) {
            console.error('Retry failed:', retryError);
          }
        }
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className=' my-12'>
        <div className=' sm:max-w-8xl  w-[95%] mx-auto'>
        <div className=' mb-5 flex  sm:flex-row  flex-col items-center gap-2.5'>
        <h2  className=' text-left'>Featured Product Packaging</h2>
       
        <p className=' border-l  border-gray-300 pl-3 '>
        Discover packaging tailored for your products. Can't find what you need?</p>
         <Link to=""  className=" uppercase">
          <p className=' font-bold  text-[#EE334B] flex items-center'>View all  <FaAngleRight className="ml-1" size={15} />  </p>
         </Link>
        </div>
        {loading ? (
          <div className="py-2">
            <CardSlider
              top={40}
              items={Array(8).fill(null).map((_, index) => (
                <div key={index} className="w-[365px] flex-shrink-0 px-2">
                  <div 
                    className="group text-gray-700 bg-[#F9F9F9] rounded-3xl flex font-bold flex-col gap-0.5 items-center border border-gray-200 animate-pulse"
                  >
                    <div className="p-4 relative overflow-hidden rounded-3xl w-full">
                      <div className="relative w-full h-[300px] rounded-2xl overflow-hidden bg-gray-200"></div>
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
            <div className="py-2">
              <CardSlider
                top={40}
                items={products?.map((item, index) => {
                  return (
                    <div key={item._id || index} className="w-[365px] flex-shrink-0 px-2">
                      <ProductCard data={item} disableSelection={true} />
                    </div>
                  );
                })}
              />
            </div>
          </ProductSelectionProvider>
        )}
        </div>
        
    </div>
  )
}

export default FeaturesPackaging