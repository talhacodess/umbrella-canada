import React, { useEffect, useState, useRef } from 'react';
import TableOfContent from './TableOfContent';
import { BaseUrl } from '../../utils/BaseUrl';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PageMetadata from '../../components/common/PageMetadata';
import GetQuoteModal from '../../components/common/GetQuoteModal';
import BlogCard from '../../components/common/BlogCard';
import ProductCard from '../../components/common/ProductCard';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

function SingleBlog({ serverData }) {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [singleBlog, setSingleBlog] = useState(serverData || null);
    const [blogs, setBlogs] = useState([]);
    const [blogProducts, setBlogProducts] = useState([]);
    const blogProductsScrollRef = useRef(null);
    
    
    const fetchBlogs = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/blog/get?slug=${slug}`);
            if (!response?.data?.data) {
                // Blog not found, redirect to 404
                navigate('/404')
                return
            }
            setSingleBlog(response?.data?.data);
            // Fetch blog products after blog is loaded
            if (response?.data?.data?._id) {
                fetchBlogProducts(response.data.data._id);
            }
        } catch (error) {
            // If there's an error or blog not found, redirect to 404
            navigate('/404')
        }
    };

    const fetchBlogProducts = async (blogId) => {
        try {
            const response = await axios.get(`${BaseUrl}/blog-product/blog/${blogId}`);
            if (response?.data?.data) {
                // Extract products from blog products array
                const products = response.data.data
                    .map(bp => bp.productId)
                    .filter(product => product !== null && product !== undefined);
                setBlogProducts(products);
            }
        } catch (error) {
            // Silently handle error - products are optional
        }
    };

    const fetchAllBlogs = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/blog/getAll`);
            setBlogs(response?.data?.data);
        } catch (error) {

        }
    };

    useEffect(() => {
        fetchBlogs();
        fetchAllBlogs();
    }, [slug]);

// ✅ Add this block here
useEffect(() => {
  // Add IDs to the headings in the rendered blog content
  const contentElement = document.querySelector('.blog_content');
  if (contentElement) {
    const headingElements = Array.from(
      contentElement.querySelectorAll('h1, h2, h3, h4, h5, h6')
    );
    headingElements.forEach((heading, index) => {
      if (!heading.id) {
        heading.id = `section-${index}-${heading.textContent
          .toLowerCase()
          .replace(/[^\w\s]/g, '')
          .replace(/\s+/g, '-')}`;
      }
    });
  }
}, [singleBlog]);

    const faqItemSchema = serverData?.qna?.map((item, index) => {
        return {
            "@context": "https://schema.org",
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        };
    });

     // Generate FAQ schema only if there are Q&A items
    const generateFaqSchema = () => {
        const qna = singleBlog?.qna || serverData?.qna || [];
        
        if (!qna.length) return null;
        
        const faqItemSchema = qna.map((item, index) => {
            return {
                "@context": "https://schema.org",
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.answer
                }
            };
        });

        return {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItemSchema
        };
    };

    
    const faqSchema = generateFaqSchema();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const calculateReadTime = (content) => {
        if (!content) return 5;
        const text = content.replace(/<[^>]*>/g, '');
        const words = text.split(/\s+/).length;
        const readTime = Math.ceil(words / 200);
        return readTime || 5;
    };

    return (
        <>
            {/* Only render Helmet meta tags when singleBlog is available */}
            {/* <PageMetadata
                title={singleBlog?.metaTitle || serverData?.metaTitle || "Custom Packaging Solutions"}
                description={singleBlog?.metaDescription || serverData?.metaDescription || ""}
                keywords={singleBlog?.keywords || serverData?.keywords || ""}
                ogUrl={`${BaseUrl}/blog/${slug}`}
                ogImage={`${BaseUrl}/${singleBlog?.image}`}
                ogImageWidth="1200"
                ogImageHeight="630"
                canonicalUrl={`${BaseUrl}/blog/${slug}`}
                faqItemSchema={faqSchema}
                robots={singleBlog?.robots || serverData?.robots}
              
            /> */}
            

            <div className='max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12'>
                <div className='flex gap-8 flex-col lg:flex-row'>
                    {/* Left Column - Main Content (2/3 width) */}
                    <div className='flex-1 lg:w-2/3 flex flex-col gap-8'>
                        {/* Header Card - Modernized */}
                        <div className='w-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 md:p-8 rounded-2xl flex flex-col gap-6 md:gap-8'>
                            
                            
                            {/* Image - Modernized */}
                            <div className='w-full'>
                                {singleBlog?.image && (
                                    <div className='relative rounded-2xl overflow-hidden shadow-xl group'>
                                        <img
                                            src={`${BaseUrl}/${singleBlog.image}`}
                                            className='w-full h-auto  object-cover transform group-hover:scale-105 transition-transform duration-700'
                                            alt={singleBlog?.imageAltText || singleBlog?.title}
                                        />
                                        {/* Gradient Overlay on Hover */}
                                        <div className='absolute inset-0 bg-gradient-to-t from-[#213554]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                                    </div>
                                )}
                            </div>
                            <div className='w-full  flex flex-col justify-between'>
                                <div>
                                    {/* Badge - Modernized */}
                                    <span className='inline-block px-4 py-2 bg-gradient-to-r from-[#EE334B] to-[#EE334B]/90 text-white text-xs font-bold rounded-full shadow-md mb-4'>
                                        Knowledge Base
                                    </span>
                                    
                                    {/* Title - Modernized */}
                                    <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-[#213554] mb-4 leading-tight'>
                                        {singleBlog?.title}
                                    </h1>
                                    
                                    {/* Meta Info - Modernized */}
                                    <div className='flex flex-wrap items-center gap-4 md:gap-6 text-gray-600'>
                                        {singleBlog?.createdAt && (
                                            <div className='flex items-center gap-2'>
                                                <FaCalendarAlt className='text-[#EE334B] text-sm' />
                                                <span className='text-sm font-medium'>{formatDate(singleBlog.createdAt)}</span>
                                            </div>
                                        )}
                                        <div className='flex items-center gap-2'>
                                            <FaClock className='text-[#EE334B] text-sm' />
                                            <span className='text-sm font-medium'>{calculateReadTime(singleBlog?.content)} min read</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Blog Content - Modernized */}
                        <div className='w-full'>
                            <article className='blog_content bg-white rounded-2xl shadow-lg p-6 md:p-8 lg:p-10'>
                                <div
                                    className="text-gray-700 leading-relaxed text-base md:text-lg [&_h1]:text-3xl [&_h1]:md:text-4xl [&_h1]:font-bold [&_h1]:text-[#213554] [&_h1]:mt-8 [&_h1]:mb-4 [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-bold [&_h2]:text-[#213554] [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-xl [&_h3]:md:text-2xl [&_h3]:font-semibold [&_h3]:text-[#213554] [&_h3]:mt-5 [&_h3]:mb-2 [&_p]:mb-4 [&_p]:leading-7 [&_a]:text-[#EE334B] [&_a]:font-medium [&_a]:no-underline [&_a:hover]:underline [&_strong]:text-[#213554] [&_strong]:font-semibold [&_img]:rounded-xl [&_img]:shadow-lg [&_img]:my-6 [&_img]:w-full [&_img]:h-auto [&_blockquote]:border-l-4 [&_blockquote]:border-[#EE334B] [&_blockquote]:pl-4 [&_blockquote]:pr-4 [&_blockquote]:py-2 [&_blockquote]:italic [&_blockquote]:bg-gray-50 [&_blockquote]:my-4 [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4 [&_ol]:space-y-2 [&_li]:leading-7"
                                    dangerouslySetInnerHTML={{ __html: singleBlog?.content }}
                                />
                            </article>
                        </div>

                    {/* Blog Products Section - Modernized with Slider */}
                    {blogProducts && blogProducts.length > 0 && (
                        <div className='w-full mt-6'>
                            <div className='bg-white rounded-2xl shadow-lg p-4 md:p-6'>
                                <div className='mb-4'>
                                    <h2 className='text-2xl md:text-3xl font-bold text-[#213554] mb-1'>Related Products</h2>
                                    <p className='text-gray-600 text-sm md:text-base'>Explore products related to this article</p>
                                </div>
                                <div className="relative">
                                    <div 
                                        ref={blogProductsScrollRef}
                                        className="blog-products-scroll sm:pl-0 pl-2 pr-2 sm:pr-0 items-start gap-2 sm:gap-3 flex productOverflow overflow-x-auto overflow-y-hidden whitespace-nowrap custom-scrollbar py-1 snap-x snap-mandatory"
                                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                    >
                                        {blogProducts.map((product, index) => (
                                             <div key={product._id || index} className="w-[85vw] sm:w-[285px] flex-shrink-0 px-2 sm:px-2">
                                             <ProductCard data={product} disableSelection={true} />
                                           </div>
                                        ))}
                                    </div>
                                    {/* Desktop Navigation Arrows */}
                                    {blogProducts.length > 2 && (
                                        <div className="md:block hidden">
                                            <button
                                                className="arrow arrow-left absolute left-2 cursor-pointer rounded-full flex justify-center items-center bg-white/90 backdrop-blur-sm border border-gray-200 hover:bg-gradient-to-r hover:from-[#213554] hover:to-[#213554]/90 hover:border-[#213554] hover:shadow-xl w-10 h-10 hover:text-white transition-all duration-300 group z-10"
                                                style={{ top: '40%', transform: 'translateY(-50%)' }}
                                                onClick={() => {
                                                    if (blogProductsScrollRef.current) {
                                                        const cardWidth = blogProductsScrollRef.current.firstChild?.clientWidth || 260;
                                                        blogProductsScrollRef.current.scrollTo({
                                                            left: blogProductsScrollRef.current.scrollLeft - cardWidth,
                                                            behavior: 'smooth'
                                                        });
                                                    }
                                                }}
                                            >
                                                <svg className="w-5 h-5 text-[#213554] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                </svg>
                                            </button>
                                            <button
                                                className="arrow arrow-right absolute right-2 cursor-pointer rounded-full flex justify-center items-center bg-white/90 backdrop-blur-sm border border-gray-200 hover:bg-gradient-to-r hover:from-[#213554] hover:to-[#213554]/90 hover:border-[#213554] hover:shadow-xl w-10 h-10 hover:text-white transition-all duration-300 group z-10"
                                                style={{ top: '40%', transform: 'translateY(-50%)' }}
                                                onClick={() => {
                                                    if (blogProductsScrollRef.current) {
                                                        const cardWidth = blogProductsScrollRef.current.firstChild?.clientWidth || 260;
                                                        blogProductsScrollRef.current.scrollTo({
                                                            left: blogProductsScrollRef.current.scrollLeft + cardWidth,
                                                            behavior: 'smooth'
                                                        });
                                                    }
                                                }}
                                            >
                                                <svg className="w-5 h-5 text-[#213554] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                    {/* Mobile Navigation Arrows */}
                                    {blogProducts.length > 2 && (
                                        <div className="md:hidden flex justify-between items-center absolute inset-y-0 left-0 right-0 pointer-events-none px-2">
                                            <button
                                                className="arrow arrow-left cursor-pointer rounded-full flex justify-center items-center bg-white/95 backdrop-blur-sm border border-gray-300 shadow-lg w-8 h-8 text-[#213554] transition-all duration-300 group z-10 pointer-events-auto active:scale-95"
                                                onClick={() => {
                                                    if (blogProductsScrollRef.current) {
                                                        const cardWidth = blogProductsScrollRef.current.firstChild?.clientWidth || 260;
                                                        blogProductsScrollRef.current.scrollTo({
                                                            left: blogProductsScrollRef.current.scrollLeft - cardWidth,
                                                            behavior: 'smooth'
                                                        });
                                                    }
                                                }}
                                                aria-label="Scroll left"
                                            >
                                                <svg className="w-4 h-4 text-[#213554] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                </svg>
                                            </button>
                                            <button
                                                className="arrow arrow-right cursor-pointer rounded-full flex justify-center items-center bg-white/95 backdrop-blur-sm border border-gray-300 shadow-lg w-8 h-8 text-[#213554] transition-all duration-300 group z-10 pointer-events-auto active:scale-95"
                                                onClick={() => {
                                                    if (blogProductsScrollRef.current) {
                                                        const cardWidth = blogProductsScrollRef.current.firstChild?.clientWidth || 260;
                                                        blogProductsScrollRef.current.scrollTo({
                                                            left: blogProductsScrollRef.current.scrollLeft + cardWidth,
                                                            behavior: 'smooth'
                                                        });
                                                    }
                                                }}
                                                aria-label="Scroll right"
                                            >
                                                <svg className="w-4 h-4 text-[#213554] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    </div>

                    {/* Right Column - Sidebar (1/3 width) */}
                    <div className='lg:w-1/3 lg:sticky lg:top-8 lg:self-start'>
                        <div className='flex flex-col gap-6'>
                            {/* Table of Contents */}
                            {singleBlog?.content && (
                                <TableOfContent content={singleBlog.content} />
                            )}

                            {/* Latest Articles Section */}
                            {blogs && blogs.length > 0 && (
                                <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100'>
                                    <div className='mb-6'>
                                        <h2 className='text-xl md:text-2xl font-bold text-[#213554] mb-2'>Latest Articles</h2>
                                        <p className='text-gray-600 text-xs md:text-sm'>Explore more insights and guides</p>
                                    </div>
                                    <div className='flex flex-col gap-4'>
                                        {blogs.slice(0, 5).map((item, index) => (
                                            <BlogCard key={item._id || index} data={item} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <GetQuoteModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />

        </>

    );
}

export default SingleBlog;


