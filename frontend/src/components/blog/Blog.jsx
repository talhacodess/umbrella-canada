import React, { useEffect, useState, useCallback, useMemo, lazy, Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BaseUrl } from "../../utils/BaseUrl";
import axios from "axios";
import { useIntersectionObserver } from "../../utils/useIntersectionObserver";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import CardSlider from "../common/CardSlider";
import { BlogSelectionProvider } from "../common/BlogCard";

// Lazy load the BlogCard component
const BlogCard = lazy(() => import("../common/BlogCard"));

// Skeleton loader for blog cards
const BlogCardSkeleton = () => (
  <div className="group relative py-4 h-full">
    <div className="rounded-2xl overflow-hidden h-full bg-white shadow-md border border-gray-200 flex flex-col animate-pulse">
      {/* Blog Image Skeleton */}
      <div className="w-full h-64 overflow-hidden relative rounded-t-2xl bg-gray-200"></div>
      
      {/* Blog Content Skeleton */}
      <div className="p-6 text-start flex flex-col flex-grow">
        {/* Date Skeleton */}
        <div className="flex items-center mb-3">
          <div className="h-3 w-24 bg-gray-200 rounded"></div>
        </div>
        
        {/* Title Skeleton */}
        <div className="mb-3">
          <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        </div>
        
        {/* Description Skeleton */}
        <div className="mb-4 flex-grow">
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
        
        {/* Read More Button Skeleton */}
        <div className="flex justify-start items-center mt-auto pt-2">
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [elementRef, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '200px', // Start loading 200px before component is visible
    triggerOnce: true
  });

  useEffect(() => {
    // Only fetch blogs when component is about to be visible
    if (!isIntersecting) return;

    const fetchBlogs = async () => {
      setLoadingBlogs(true);
      try {
        const response = await axios.get(`${BaseUrl}/blog/getAll?page=1&perPage=6`);
        if (response?.data?.status === 'success' && response?.data?.data) {
          setBlogs(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setBlogs([]);
      } finally {
        setLoadingBlogs(false);
      }
    };

    fetchBlogs();
  }, [isIntersecting]);


  return (
     <section ref={elementRef} className=' bg-[#F7F7F7] py-10'>
     <div className='sm:max-w-8xl w-[95%] mx-auto'>
      <div className="text-center mb-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                     Client’s Spotlights & Blog   I   Xbox Your Packaging 
                    </h2>
                    <p className="text-gray-600 text-base sm:text-lg">
                     Please see below how businesses like yours have elevated their brand with X Custom Packaging. We have responded quickly to them every time to maintain their inventories and fulfill their urgent needs. You can also find here the recent trends in packaging.
        
                      <Link
                        to=""
                        className="ml-2 uppercase font-bold text-[#EE334B] inline-flex items-center align-baseline hover:opacity-80 transition-opacity"
                      >
                        View all
                        <FaAngleRight className="ml-1" size={15} />
                      </Link>
                    </p>
        
                  </div>
       {loadingBlogs ? (
         <div className="py-2">
           <CardSlider
             top={40}
             items={Array(6).fill(null).map((_, index) => (
               <div key={index} className="w-[365px] flex-shrink-0 px-2">
                 <BlogCardSkeleton />
               </div>
             ))}
           />
         </div>
       ) : blogs.length > 0 ? (
         <BlogSelectionProvider>
           <div className="py-2">
             <CardSlider
               top={40}
               items={blogs?.map((item, index) => {
                 return (
                   <div key={item._id || index} className="w-[365px] flex-shrink-0 px-2">
                     <BlogCard data={item} />
                   </div>
                 );
               })}
             />
           </div>
         </BlogSelectionProvider>
       ) : null}
     </div>
   </section>
  );
};

export default React.memo(Blog);