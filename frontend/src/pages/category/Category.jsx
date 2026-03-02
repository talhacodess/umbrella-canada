// import React, { useState, useEffect } from 'react'
// import { Link, useParams, useNavigate } from 'react-router-dom'
// import { FaAngleRight } from 'react-icons/fa'
// import axios from 'axios'
// import { BaseUrl } from '../../utils/BaseUrl'
// import Banner from '../../components/common/Banner'
// import FAQ from '../../components/FAQ/FAQ'
// import FeaturesPackaging from '../../components/FeaturesPackaging'
// import CardSlider from '../../components/common/CardSlider'
// import BlogCard from '../../components/common/BlogCard'
// import Blog from '../../components/blog/Blog'
// import PageMetadata from '../../components/common/PageMetadata'

// const Category = ({ serverData }) => {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const [allCategories, setAllCategories] = useState([]);
//   const [loadingCategories, setLoadingCategories] = useState(false);
//   const [categoryData, setCategoryData] = useState(serverData || null);
//   const [categoryProduct, setCategoryProduct] = useState([]);
//   const [loading, setLoading] = useState(!serverData);

//   const FetchCategory = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${BaseUrl}/brands/get?slug=${slug}`);
//       if (!response?.data?.data) {
//         navigate('/404')
//         return
//       }
//       setCategoryData(response?.data?.data);

//       const response2 = await axios.get(
//         `${BaseUrl}/products/categoryProducts/${response?.data?.data._id}/products-by-category`
//       );
//       setCategoryProduct(response2?.data?.data?.categories || []);
//     } catch (err) {
//       console.error("Error fetching category:", err);
//       // navigate('/404')
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     // Only fetch if serverData is not available or slug changed
//     if (slug && (!serverData || serverData.slug !== slug)) {
//       FetchCategory();
//     } else if (serverData && serverData.slug === slug) {
//       setCategoryData(serverData);
//       setLoading(false);
//     }
//   }, [slug]); // Remove categoryData from dependencies to avoid infinite loop

//   useEffect(() => {
//     return () => {
//       setCategoryData(null);
//       setCategoryProduct([]);
//     };
//   }, [slug]);

//   useEffect(() => {
//     const fetchAllCategories = async () => {
//       // Only fetch if categoryData (brand) is available
//       if (!categoryData?._id) {
//         return;
//       }

//       setLoadingCategories(true);
//       try {
//         // Fetch categories filtered by brandId
//         const response = await axios.get(`${BaseUrl}/category/getAll?page=1&perPage=100&brandId=${categoryData._id}`);
        
//         if (response?.data?.status === 'success' && response?.data?.data) {
//           // Filter categories by brandId on client side if API doesn't support it
//           const filteredCategories = Array.isArray(response.data.data) 
//             ? response.data.data.filter(category => category.brandId?._id === categoryData._id || category.brandId === categoryData._id)
//             : [];
//           setAllCategories(filteredCategories);
//         }
//       } catch (error) {
//         console.error('Error fetching categories:', error);
        
//       } finally {
//         setLoadingCategories(false);
//       }
//     };

//     fetchAllCategories();
//   }, [categoryData?._id]);

//   const breadcrumbSchema = {
//     "@context": "https://schema.org",
//     "@type": "BreadcrumbList",
//     "itemListElement": [
//       {
//         "@type": "ListItem",
//         "position": 1,
//         "name": "Home",
//         "item": BaseUrl
//       },
//       {
//         "@type": "ListItem",
//         "position": 2,
//         "name": categoryData?.name || categoryData?.title,
//         "item": `${BaseUrl}/category/${slug}`
//       }
//     ]
//   };

 
//   return (
//     <>
//       {/* {categoryData && (
//         <PageMetadata
//           title={categoryData?.metaTitle || categoryData?.name || categoryData?.title}
//           description={categoryData?.metaDescription || categoryData?.description}
//           keywords={categoryData?.keywords}
//           ogUrl={`${BaseUrl}/category/${slug}`}
//           ogImage={categoryData?.bannerImage ? `${BaseUrl}/${categoryData?.bannerImage}` : categoryData?.image ? `${BaseUrl}/${categoryData?.image}` : ''}
//           ogImageWidth="1200"
//           ogImageHeight="630"
//           canonicalUrl={`${BaseUrl}/category/${slug}`}
//           breadcrumbSchema={breadcrumbSchema}
//           robots={categoryData?.robots}
//         />
//       )} */}
//   <Banner title={categoryData?.name} subTitle={categoryData?.name}  />
//     <section className=' sm:max-w-8xl w-[95%] mx-auto'>
   
//         <div className='  text-center max-w-5xl mx-auto py-7'>
//             <h2>Custom packaging solutions for every industry.
//             </h2>
//             <p className=' pt-2'>Half Price Packaging possesses extensive expertise in delivering personalized packaging solutions to over 3000 businesses across the globe. Below, you will find a carefully curated selection of packaging solutions designed to cater to various industries.

// </p>
//         </div>

//         {/* All Categories Section */}
//         <div className='mb-12'>
//           {loadingCategories ? (
//             <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {Array(10).fill(null).map((_, index) => (
//                 <div 
//                   key={index} 
//                   className="group text-gray-700 bg-[#F9F9F9] rounded-3xl flex font-bold flex-col gap-0.5 items-center border border-gray-200 animate-pulse"
//                 >
//                   <div className="p-4 relative overflow-hidden rounded-3xl w-full">
//                     <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-gray-200"></div>
//                   </div>
//                   <div className="pb-3 w-3/4">
//                     <div className="bg-gray-200 rounded h-4 w-full"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {allCategories.map((category) => (
//                 <Link
//                   key={category._id}
//                   to={`/category/${category.slug}`}
//                   className="group text-gray-700 bg-[#F9F9F9] hover:bg-white rounded-3xl flex font-bold flex-col gap-0.5 items-center transition-all duration-300 border border-gray-200 hover:border-[#AC292A]/20 hover:shadow-lg transform hover:-translate-y-1"
//                 >
//                   <div className="p-4 relative overflow-hidden rounded-3xl">
//                     {category.image ? (
//                       <div className="relative w-full h-56 rounded-2xl overflow-hidden">
//                         <img
//                           src={`${BaseUrl}/${category.image}`}
//                           alt={category.imageAltText || category.title}
//                           className="w-full h-full  rounded-2xl"
//                         />
//                         {/* Gallery Hover Overlay Gradient */}
//                         <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
//                         {/* Gallery Shine Effect - Sweeps across on hover */}
//                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-2xl"></div>
//                       </div>
//                     ) : category.icon ? (
//                       <div className="relative w-full h-56 rounded-2xl overflow-hidden">
//                         <img
//                           src={`${BaseUrl}/${category.icon}`}
//                           alt={category.iconAltText || category.title}
//                           className="w-full h-full object-contain rounded-2xl"
//                         />
//                         {/* Gallery Hover Overlay Gradient */}
//                         <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
//                         {/* Gallery Shine Effect - Sweeps across on hover */}
//                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-2xl"></div>
//                       </div>
//                     ) : (
//                       <div className="w-full h-56 bg-gradient-to-br from-[#213554]/10 to-[#AC292A]/10 flex items-center justify-center rounded-2xl relative overflow-hidden">
//                         <span className="text-4xl font-bold text-[#213554]/30 relative z-10">
//                           {category.title?.charAt(0) || 'C'}
//                         </span>
//                         {/* Gallery Hover Overlay Gradient */}
//                         <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
//                         {/* Gallery Shine Effect - Sweeps across on hover */}
//                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-2xl"></div>
//                       </div>
//                     )}
//                   </div>
//                   <p className="pb-3 font-bold group-hover:text-[#AC292A] transition-colors duration-300">{category.title}</p>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>
//     </section>

   

   

//     <section className=' '>
//       <FAQ/>
//     </section>

//      {/* Blogs Section */}
//      <Blog/>
    
   
//     </>
//   )
// }

// export default Category

import React, { useState, useEffect } from 'react';
import { MdClose, MdFilterList } from 'react-icons/md';
import Banner from '../../components/common/Banner';
import { IoHomeOutline } from 'react-icons/io5';
import { LiaAngleRightSolid } from 'react-icons/lia';
import { Link } from 'react-router-dom';  
import ProductCardTwo, { ProductSelectionProvider } from '../../components/common/ProductCardTwo';
import axios from 'axios';
import { BaseUrl } from '../../utils/BaseUrl';
import Button from '../../components/common/Button';
import { useSearchParams } from 'react-router-dom';
import AnnouncementBanner from '../../components/AnnouncementBanner/index'
import { BiSolidCategory } from "react-icons/bi";
import bannerImage from '../../assets/images/Industry-standard.webp'


const Category = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage] = useState(12);
  
  // Filter states
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingFilters, setLoadingFilters] = useState(true);
  
  // Get filter values from URL params
  const selectedBrandId = searchParams.get('brandId');
  const selectedCategoryId = searchParams.get('categoryId');

  // Fetch brands
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/brands/getAll?all=true`);
        if (response?.data?.status === 'success' && response?.data?.data) {
          setBrands(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };
    fetchBrands();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/category/getAll?page=1&perPage=100`);
        if (response?.data?.status === 'success' && response?.data?.data) {
          setCategories(response.data.data);
        }
        setLoadingFilters(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoadingFilters(false);
      }
    };
    fetchCategories();
  }, []);

  const fetchProducts = async (page = 1, loadMore = false) => {
    if (page === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      let url = `${BaseUrl}/products/getAll?page=${page}&perPage=${perPage}`;
      
      // Add brand filter if selected
      if (selectedBrandId) {
        url += `&brandId=${selectedBrandId}`;
      }
      
      // Add category filter if selected
      if (selectedCategoryId) {
        url += `&categoryId=${selectedCategoryId}`;
      }

      const response = await axios.get(url);
      
      if (response?.data?.status === 'success' && response?.data?.data) {
        if (loadMore) {
          setProducts(prev => [...prev, ...response.data.data]);
        } else {
          setProducts(response.data.data);
        }
        setCurrentPage(response?.data?.pagination?.page || page);
        setTotalPages(response?.data?.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Fetch products when filters or page changes
  useEffect(() => {
    setProducts([]);
    setCurrentPage(1);
    fetchProducts(1);
  }, [selectedBrandId, selectedCategoryId]);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      fetchProducts(currentPage + 1, true);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      fetchProducts(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      fetchProducts(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle filter changes
  const handleBrandChange = (brandId) => {
    const params = new URLSearchParams(searchParams);
    if (brandId === selectedBrandId) {
      params.delete('brandId');
    } else {
      params.set('brandId', brandId);
    }
    // Reset to page 1 when filter changes
    params.delete('page');
    setSearchParams(params, { replace: true });
  };

  const handleCategoryChange = (categoryId) => {
    const params = new URLSearchParams(searchParams);
    if (categoryId === selectedCategoryId) {
      params.delete('categoryId');
    } else {
      params.set('categoryId', categoryId);
    }
    // Reset to page 1 when filter changes
    params.delete('page');
    setSearchParams(params, { replace: true });
  };

  const clearFilters = () => {
    setSearchParams({}, { replace: true });
  };

  return (
    <>
      <AnnouncementBanner/>
      <Banner  subTitle={'Category'} />
      {/* Top Banner Section */}
            <div  className=' relative '>
             <div className='bg-[#f7f7f7]'>
              {/** banner main  */}
               <div className='sm:max-w-8xl w-[95%] mx-auto'>
              <div className="flex sm:flex-row flex-col pt-4 gap-6">
                <div className="sm:w-1/4 w-full"></div>
                <div className="sm:w-3/4 w-full">
                <section className='py-5 sm:h-[50vh] h-auto' >

              <div className="sm:max-w-8xl max-w-[95%] mx-auto">
               
                <div className='flex sm:flex-row items-center flex-col gap-8 lg:gap-12'>
                  {/* Left Side - Text Content */}
                  <div className='sm:w-6/10 w-full'>
                  <p className='text-base sm:text-lg text-gray-700 mb-6 leading-relaxed'>Over 190,000 ★★★★★ Category reviews</p>
      
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                    Categories
                    </h1>
                    <p  className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
                      Time-saving, budget-thanking, easy-to-customize business cards? Must be VistaPrint.
Try 50 standard business cards for just $10.
      
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button
                        onClick={() => setIsModalOpen(true)}
                        label="Get Instant Quote"
                        className="bg-[#2D5016] hover:bg-[#3A6B1F] text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      />
                      <Link to="/dielines">
                        <Button
                          label="Order Sample Kit"
                          className="bg-[#2D5016] hover:bg-[#3A6B1F] text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        />
                      </Link>
                      <Link to="/dielines">
                        <Button
                          label="Get Custom Template"
                          className="bg-[#2D5016] hover:bg-[#3A6B1F] text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        />
                      </Link>
                    </div>
                  </div>
      
                  {/* Right Side - Product Display */}
                  <div className='sm:w-4/10 w-full'>
                    
                      <div className="relative">
                        <img
                          src={bannerImage}
                          alt='Product Image'
                          className=" mx-auto rounded-xl object-cover"
                          loading="eager"
                        />
                      </div>
               
                  </div>
                </div>
              </div>
            </section>
                </div>

              </div>
                 
            </div>
              </div> 
              {/** filter main section */}

             <div className="sm:max-w-8xl w-[95%] mx-auto">
        <div className="flex sm:flex-row flex-col pt-4 gap-6">
          
          {/* Left Sidebar - Filters */}
          <div className="sm:w-1/4 w-full ">
            <div className="bg-white rounded-lg shadow-md p-4  top-5 absolute w-[23%]">
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <BiSolidCategory className="text-[#AC292A]" />
                  Category
                </h3>
                {(selectedBrandId || selectedCategoryId) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-[#AC292A] hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Brands Filter */}
              <div className="mb-6">
                <h4 className="text-md font-semibold text-gray-700 mb-3">Brands</h4>
                {loadingFilters ? (
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-8 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                  </div>
                ) : brands.length > 0 ? (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {brands.map((brand) => (
                      <label
                        key={brand._id}
                        className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="brand"
                          checked={selectedBrandId === brand._id}
                          onChange={() => handleBrandChange(brand._id)}
                          className="w-4 h-4 text-[#AC292A] focus:ring-[#AC292A] focus:ring-2"
                        />
                        <span className="text-sm text-gray-700">{brand.name}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No brands available</p>
                )}
              </div>

              {/* Categories Filter */}
              <div className="mb-4">
                <h4 className="text-md font-semibold text-gray-700 mb-3">Categories</h4>
                {loadingFilters ? (
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="h-8 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                  </div>
                ) : categories.length > 0 ? (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {categories.map((category) => (
                      <label
                        key={category._id}
                        className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategoryId === category._id}
                          onChange={() => handleCategoryChange(category._id)}
                          className="w-4 h-4 text-[#AC292A] focus:ring-[#AC292A] focus:ring-2"
                        />
                        <span className="text-sm text-gray-700">{category.title || category.name}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No categories available</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Products Grid */}
          <div className="sm:w-3/4 w-full pt-6">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Explore all your business card printing options</h3>
          <p  className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
                     From standard to standout papers, get a look that pairs perfectly with your design.
                    </p>
          <p></p>
            {/* Active Filters Display */}
            {(selectedBrandId || selectedCategoryId) && (
              <div className="mb-4 flex flex-wrap gap-2 items-center ">
                <span className="text-sm text-gray-600">Active filters:</span>
                {selectedBrandId && (
                  <span className="px-3 py-1 bg-[#AC292A]/10 text-[#AC292A] rounded-full text-sm flex items-center gap-2">
                    {brands.find(b => b._id === selectedBrandId)?.name || 'Brand'}
                    <button
                      onClick={() => handleBrandChange(selectedBrandId)}
                      className="hover:text-[#AC292A]/70"
                    >
                      <MdClose className="w-4 h-4" />
                    </button>
                  </span>
                )}
                {selectedCategoryId && (
                  <span className="px-3 py-1 bg-[#AC292A]/10 text-[#AC292A] rounded-full text-sm flex items-center gap-2">
                    {categories.find(c => c._id === selectedCategoryId)?.title || categories.find(c => c._id === selectedCategoryId)?.name || 'Category'}
                    <button
                      onClick={() => handleCategoryChange(selectedCategoryId)}
                      className="hover:text-[#AC292A]/70"
                    >
                      <MdClose className="w-4 h-4" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {loading && products.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#AC292A]"></div>
                <p className="mt-4 text-gray-600">Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products found</p>
                {(selectedBrandId || selectedCategoryId) && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 text-[#AC292A] hover:underline"
                  >
                    Clear filters to see all products
                  </button>
                )}
              </div>
            ) : (
              <ProductSelectionProvider>
                <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                  {products.map((item, index) => (
                    <ProductCardTwo
                      key={item._id || index}
                      data={item}
                      disableSelection={false}
                    />
                  ))}
                </div>
                
                {currentPage < totalPages && (
                  <div className="flex justify-center mt-8">
                    <Button
                      label={loadingMore ? "Loading..." : "Load More"}
                      className="bg-gradient-to-r from-[#213554] to-[#213554]/90 hover:from-[#AC292A] hover:to-[#AC292A]/90 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      onClick={handleLoadMore}
                      disabled={loadingMore || loading}
                    />
                  </div>
                )}
              </ProductSelectionProvider>
            )}

            {/* Pagination Section */}
            {totalPages > 1 && (
              <div className="flex justify-end gap-2 items-center p-4 mt-6">
                <button 
                  onClick={handlePrevious}
                  disabled={currentPage === 1 || loading}
                  className="px-4 py-2 text-black bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                >
                  Previous
                </button>
                <div className="flex items-center gap-4">
                  <p className="font-medium">Page {currentPage} of {totalPages}</p>
                </div>
                <button 
                  onClick={handleNext}
                  disabled={currentPage === totalPages || loading}
                  className="px-4 py-2 text-black bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
            </div>
           

     
    </>
  );
};

export default Category;