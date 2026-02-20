// import React, { useEffect, useState } from 'react'
// import CustomPackagingProduced from '../../components/CustomPackagingProduced'
// import Button from '../../components/common/Button'
// import { Link, useSearchParams } from 'react-router-dom'
// import ProductCard from '../../components/common/ProductCard'
// import Input from '../../components/common/Input'
// import { BaseUrl } from '../../utils/BaseUrl'
// import axios from 'axios'
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { toast } from "react-toastify";
// import shopChoose from '../../assets/images/Industry-standard.png-2.webp';
// import PageMetadata from '../../components/common/PageMetadata'
// import { prefetchProduct, prefetchProductsBatch } from '../../utils/prefetchUtils'

// const Shop = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [products, setProducts] = useState([]);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     perPage: 5,
//     totalPages: 1
//   });
//   const [loading, setLoading] = useState(false);
//   const [categoryName, setCategoryName] = useState('All Products');

//   // Get query parameters
//   const categoryId = searchParams.get('categoryId');
//   const name = searchParams.get('name');
//   const searchQuery = searchParams.get('search');

//   const fetchProducts = async (page = 1, loadMore = false) => {
//     setLoading(true);
//     try {
//       let url = `${BaseUrl}/products/getAll?page=${page}`;

//       // Add category filter if exists
//       if (categoryId) {
//         url += `&category=${categoryId}`;
//       }

//       // Add search query if exists
//       if (searchQuery) {
//         url += `&search=${encodeURIComponent(searchQuery)}`;
//       }

//       const response = await axios.get(url);

//       if (loadMore) {
//         setProducts(prev => [...prev, ...response?.data?.data]);
//       } else {
//         setProducts(response?.data?.data);
//       }

//       setPagination({
//         page: response?.data?.pagination?.page,
//         perPage: response?.data?.pagination?.perPage,
//         totalPages: response?.data?.pagination?.totalPages
//       });

//       // Update category name if filtered
//       if (categoryId && response?.data?.categoryName) {
//         setCategoryName(response.data.categoryName);
//       } else if (searchQuery) {
//         setCategoryName(`Search Results for "${searchQuery}"`);
//       } else {
//         setCategoryName('All Products');
//       }

//     } catch (error) {
//       toast.error("Failed to fetch products");
//     } finally {
//       setLoading(false);
//     }
//   }

//   // Fetch products when query parameters change
//   useEffect(() => {
//     setProducts([]);
//     fetchProducts(1);
//   }, [categoryId, searchQuery]);

//   // Automatically prefetch all products when they load (for fast navigation) - OPTIMIZED
//   useEffect(() => {
//     if (products && products.length > 0) {
//       // Use optimized batch prefetching for faster loading
//       prefetchProductsBatch(products, {
//         batchSize: 5, // Increased from 3 to 5 for faster prefetching
//         delayBetweenBatches: 50, // Reduced from 100ms to 50ms for faster loading
//         priority: true // Priority for faster loading
//       });
//     }
//   }, [products]);

//   const handleLoadMore = () => {
//     if (pagination.page < pagination.totalPages) {
//       fetchProducts(pagination.page + 1, true);
//     }
//   };

//   // Function to update query parameters
//   const updateQueryParams = (params) => {
//     setSearchParams(params, { replace: true });
//   };

//   // Example of how to set query params (you can use this in your category filters)
//   const handleCategoryChange = (newCategoryId) => {
//     const params = {};
//     if (newCategoryId) params.category = newCategoryId;
//     if (searchQuery) params.search = searchQuery;
//     updateQueryParams(params);
//   };

//   // Example of how to set search query
//   const handleSearch = (query) => {
//     const params = {};
//     if (categoryId) params.category = categoryId;
//     if (query) params.search = query;
//     updateQueryParams(params);
//   };

//   const validationSchema = Yup.object().shape({
//     name: Yup.string().required("Name is required"),
//     email: Yup.string()
//       .email("Invalid email address")
//       .required("Email is required"),
//   });

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       phoneNumber: "",
//       message: "",
//       image: null,
//     },
//     validationSchema,
//     onSubmit: async (values, { setSubmitting, resetForm }) => {
//       setSubmitting(true)
//       try {
//         const formData = new FormData();
//         formData.append("name", values.name);
//         formData.append("email", values.email);
//         formData.append("phoneNumber", values.phoneNumber);
//         formData.append("message", values.message);
//         formData.append("image", values.image);

//         const response = await axios.post(`${BaseUrl}/instantQuote/create`, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//         });

//         if(response?.data?.status==="success"){
//          toast.success(response?.data?.message)
//         }else{
//           toast.error(response?.data?.message)
//         }

//         resetForm();
//       } catch (error) {
//         toast.error(error?.response?.data?.message)
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });



//           const metadata = {
//                 title: "Shop - Umbrella Custom Packaging",
//                 description: "Get In Touch Umbrella Custom Packaging-The House of Proficient Printing & Distinct Featured Boxes. Umbrella Custom Packaging facilitates your business by providing innovative styled boxes in extraordinary design. We use the finest paper material and high quality cardboard to ensure perfect Die Cut boxes. You will get guaranteed satisfaction with high quality printing.",
//                 keywords: "custom packaging, wholesale boxes, packaging solutions, affordable packaging, custom boxes, packaging design, eco-friendly packaging",
//                 author: "Umbrella Custom Packaging",
//                 ogUrl: `${BaseUrl}/shop`,
//                 canonicalUrl: `${BaseUrl}/shop`,
//                 ogTitle: "Shop - Umbrella Custom Packaging",
//                 ogDescription: "Get In Touch Umbrella Custom Packaging-The House of Proficient Printing & Distinct Featured Boxes...",
//                 modifiedTime: "2025-06-13T15:18:43+00:00",
//                 twitterTitle: "Shop - Umbrella Custom Packaging",
//                 twitterDescription: "Get In Touch Umbrella Custom Packaging-The House of Proficient Printing & Distinct Featured Boxes...",
//                 robots: "index, follow"
//               };

//   return (
//     <>
//      <PageMetadata {...metadata} />
//       <div className=' bg-[#F7F7F7] rounded-lg sm:max-w-7xl max-w-[95%] mx-auto  px-3.5 my-5 py-12'>
//         <div className='  mx-auto text-center'>
//           <h1 className=' sm:text-4xl text-2xl'>Discover Our Custom Packaging Variety</h1>
//           <p className=' pt-2'>Check out all the different types of boxes we have at Umbrella Custom Packaging! We have special categories for boxes that you can customize just the way you like. You get to choose whether it’s the size, the material, or how it looks. So, have a look and pick the perfect box for you!
//           </p>
//         </div>
//       </div>

//       <div>
//         <div className=' sm:max-w-7xl max-w-[95%] mb-8 mx-auto'>
//           <div className=' flex    sm:flex-row flex-col gap-5 justify-between w-full'>
//             <div className=' sm:w-9/12 w-full
//            '>
//               <div className=' grid  md:grid-cols-3 gap-4 grid-cols-2'>
//                 {
//                   products?.map((item, index) => {
//                     return (
//                       <div className="   bg-[#f7f7f7] p-2 rounded-xl max-w-6xl mx-auto">
//                         <ProductCard data={item} />
//                       </div>

//                     )
//                   })
//                 }
//               </div>

//               {pagination.page < pagination.totalPages && (
//                 <div className=' pt-12'>
//                   <Button 
//                     label={loading ? 'Loading...' : 'Load More'} 
//                     className='mx-auto bg-[#4440E6] text-white' 
//                     onClick={handleLoadMore}
//                     disabled={loading}
//                   />
//                 </div>
//               )}

//             </div>

//             <div className=' sm:w-3/12 w-full'>

//               <div className=' rounded-xl sticky top-7 bg-[#F7F7F7] p-3'>
//                   <form onSubmit={formik.handleSubmit} className="w-full">
//                     <h2 className=' text-center'>Get an Instant Quote</h2>
//             <div className="flex flex-col w-full gap-2 justify-between">
//               {/* Name Field */}
//               <div className="w-full">
//                 <Input
//                   label="Name"
//                   type="text"
//                   name="name"
//                   placeholder="Name"
//                   value={formik.values.name}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className={`rounded-[8px] w-full border-[#333333] border bg-[#fff] p-3 ${
//                     formik.touched.name && formik.errors.name
//                       ? "border-red-500"
//                       : ""
//                   }`}
//                 />
//               </div>

//               {formik.touched.name && formik.errors.name && (
//                   <div className="text-red-500 text-xs mt-1">
//                     {formik.errors.name}
//                   </div>
//                 )}
//               {/* Email Field */}
//               <div className="w-full">
//                 <Input
//                   label="Email"
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   value={formik.values.email}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className={`rounded-[8px] w-full border-[#333333] border bg-[#fff] p-3 ${
//                     formik.touched.email && formik.errors.email
//                       ? "border-red-500"
//                       : ""
//                   }`}
//                 />
//               </div>

//               {formik.touched.email && formik.errors.email && (
//                   <div className="text-red-500 text-xs mt-1">
//                     {formik.errors.email}
//                   </div>
//                 )}

//               {/* Phone Number Field */}
//               <div className="w-full">
//                 <Input
//                   label="Phone Number"
//                   type="tel"
//                   name="phoneNumber"
//                   placeholder="Phone Number"
//                   value={formik.values.phoneNumber}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className={`rounded-[8px] w-full border-[#333333] border bg-[#fff] p-3 ${
//                     formik.touched.phoneNumber && formik.errors.phoneNumber
//                       ? "border-red-500"
//                       : ""
//                   }`}
//                 />
//               </div>

//               {formik.touched.phoneNumber && formik.errors.phoneNumber && (
//                   <div className="text-red-500 text-xs mt-1">
//                     {formik.errors.phoneNumber}
//                   </div>
//                 )}

//               {/* Message Field */}
//               <div className="flex flex-col">
//                 <label
//                   className="pb-1.5 flex text-[#333333] text-sm font-medium text-textColor"
//                   htmlFor="message"
//                 >
//                   Message
//                 </label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   rows={3}
//                   placeholder="Please share specific packaging details such as dimensions, materials, weight limits, and design preferences. We'll promptly provide you with a quote"
//                   value={formik.values.message}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className={`rounded-[8px] w-full border-[#333333] border bg-[#fff] p-3 ${
//                     formik.touched.message && formik.errors.message
//                       ? "border-red-500"
//                       : ""
//                   }`}
//                 ></textarea>
//                 {formik.touched.message && formik.errors.message && (
//                   <div className="text-red-500 text-xs mt-1">
//                     {formik.errors.message}
//                   </div>
//                 )}
//               </div>

//               {/* File Upload Field */}
//               <div className="w-full">
//                 <label
//                   className="pb-1.5 flex flex-col text-[#333333] text-sm font-medium text-textColor"
//                   htmlFor="image"
//                 >
//                   Upload Your Design

//                   <span className="text-xs text-black ml-1">
//                     (Max Size 5MB, Allowed: png, pdf, jpg, jpeg, webp)
//                   </span>
//                 </label>
//                 <input
//                   id="image"
//                   name="image"
//                   type="file"
//                   onChange={(event) => {
//                     formik.setFieldValue("image", event.currentTarget.files[0]);
//                   }}
//                   onBlur={formik.handleBlur}
//                   className="border w-full rounded-lg bg-white border-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#4440E6] file:text-white hover:file:bg-[#3a36c7]"
//                 />
//                 {formik.touched.image && formik.errors.image && (
//                   <div className="text-red-500 text-xs mt-1">
//                     {formik.errors.image}
//                   </div>
//                 )}
//               </div>

//               {/* Submit Button */}
//               <div>
//                 <Button
//                   type="submit"
//                   label={
//                     formik.isSubmitting ? "Submitting..." : "Send"
//                   }
//                   disabled={formik.isSubmitting || !formik.isValid}
//                   className="bg-[#4440E6] text-white w-full py-2 rounded-lg font-medium disabled:opacity-50"
//                 />
//               </div>
//             </div>
//           </form>
//               </div>

//             </div>


//           </div>
//         </div>
//       </div>

//       <div className=' bg-[#FFF1E4]  sm:max-w-7xl max-w-[95%]  mx-auto mb-8'>
//         <div className=''>
//           <div className="flex flex-col  px-4 py-6  rounded-lg lg:flex-row  gap-8 items-center">


//             <div className='w-full lg:w-1/2 '>

//               <div className=" pt-3">
//                 <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
//                   Why Choice us
//                 </h1>
//                 <div className=' overflow-y-auto h-56'>
//                   <p className="text-sm leading-6 text-gray-700 mb-6">
//                     We are your packaging partner at , not simply a business. Our persistent dedication to excellence, sustainability, and achievement is what distinguishes us. Utilizing cutting-edge technology, a committed team of professionals, and curiosity for creativity, we go above and beyond to provide custom die-cut mylar bag packaging solutions that surpass your needs. You can rely on us to creatively and carefully display, preserve, and market your products. Contact our dedicated team at or email us at <Link to={''}>Sales@umbrellapackaging.com</Link> to get started.
//                   </p>

//                 </div>


//               </div>

//               <div className=" flex flex-wrap   mt-7 gap-2.5 items-center">
//                 <Button

//                   label={"Get Instant Quote"}
//                   className=" bg-[#4440E6] text-white"
//                 />

//               </div>
//             </div>

//             <div className="w-full  lg:w-1/2">
//               <img
//                 src={shopChoose}
//                 alt="Custom packaging example"
//                 className="w-full h-auto rounded-xl shadow-md object-cover"
//                 loading="lazy"
//               />

//             </div>



//           </div>
//         </div>
//       </div>

//       <div className=' mb-4'>
//         <CustomPackagingProduced />
//       </div>

//     </>
//   )
// }

// export default Shop



import React, { useState, useEffect } from 'react';
import { MdClose, MdFilterList } from 'react-icons/md';
import Banner from '../../components/common/Banner';
import ProductCard, { ProductSelectionProvider } from '../../components/common/ProductCard';
import axios from 'axios';
import { BaseUrl } from '../../utils/BaseUrl';
import Button from '../../components/common/Button';
import { useSearchParams } from 'react-router-dom';

const Shop = () => {
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
      <Banner title={'Catalogue'} subTitle={'Catalogue'} />

      <div className="container md:px-5 px-3 mx-auto pb-10 pt-10">
        <div className="flex sm:flex-row flex-col pt-4 gap-6">
          
          {/* Left Sidebar - Filters */}
          <div className="sm:w-1/4 w-full">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <MdFilterList className="text-[#EE334B]" />
                  Filters
                </h3>
                {(selectedBrandId || selectedCategoryId) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-[#EE334B] hover:underline"
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
                          className="w-4 h-4 text-[#EE334B] focus:ring-[#EE334B] focus:ring-2"
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
                          className="w-4 h-4 text-[#EE334B] focus:ring-[#EE334B] focus:ring-2"
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
          <div className="sm:w-3/4 w-full">
            {/* Active Filters Display */}
            {(selectedBrandId || selectedCategoryId) && (
              <div className="mb-4 flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-600">Active filters:</span>
                {selectedBrandId && (
                  <span className="px-3 py-1 bg-[#EE334B]/10 text-[#EE334B] rounded-full text-sm flex items-center gap-2">
                    {brands.find(b => b._id === selectedBrandId)?.name || 'Brand'}
                    <button
                      onClick={() => handleBrandChange(selectedBrandId)}
                      className="hover:text-[#EE334B]/70"
                    >
                      <MdClose className="w-4 h-4" />
                    </button>
                  </span>
                )}
                {selectedCategoryId && (
                  <span className="px-3 py-1 bg-[#EE334B]/10 text-[#EE334B] rounded-full text-sm flex items-center gap-2">
                    {categories.find(c => c._id === selectedCategoryId)?.title || categories.find(c => c._id === selectedCategoryId)?.name || 'Category'}
                    <button
                      onClick={() => handleCategoryChange(selectedCategoryId)}
                      className="hover:text-[#EE334B]/70"
                    >
                      <MdClose className="w-4 h-4" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {loading && products.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#EE334B]"></div>
                <p className="mt-4 text-gray-600">Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products found</p>
                {(selectedBrandId || selectedCategoryId) && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 text-[#EE334B] hover:underline"
                  >
                    Clear filters to see all products
                  </button>
                )}
              </div>
            ) : (
              <ProductSelectionProvider>
                <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                  {products.map((item, index) => (
                    <ProductCard
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
                      className="bg-gradient-to-r from-[#213554] to-[#213554]/90 hover:from-[#EE334B] hover:to-[#EE334B]/90 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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
    </>
  );
};

export default Shop;