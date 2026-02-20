// import React, { useEffect, useState } from 'react'
// import Button from '../../components/common/Button';
// import GetPriceQuote from '../../components/GetPriceQuote/GetPriceQuote';
// import PackagingBanner from '../../components/common/PackagingBanner';
// import CustomBoxMaterial from '../../components/CustomBoxMaterial/CustomBoxMaterial';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/autoplay';
// import icon1 from '../../assets/images/icon/Free Design support.svg';
// import icon2 from '../../assets/images/icon/Free Lamination.svg';
// import buliding from '../../assets/images/banner2.jpg';
// import image1 from '../../assets/images/category-image1.png';
// import brand1 from '../../assets/images/brand/brand1.png';
// import brand2 from '../../assets/images/brand/brand2.svg';
// import brand3 from '../../assets/images/brand/brand3.svg';
// import brand4 from '../../assets/images/brand/brand4.svg';
// import brand5 from '../../assets/images/brand/brand5.png';
// import axios from 'axios';
// import { BaseUrl } from '../../utils/BaseUrl';
// import { Link, useParams } from 'react-router-dom';
// import PageMetadata from '../../components/common/PageMetadata';
// import InstantQuoteModal from '../../components/common/InstantQuoteModal';
// import goScreen from '../../assets/images/goScreen.webp';
// import CustomPackagingApart from '../../components/CustomPackagingApart/CustomPackagingApart';
// import { prefetchProduct, prefetchProductsBatch, prefetchSubCategory, getCachedSubCategory } from '../../utils/prefetchUtils';
// const SubCategory = ({ serverData, CategoryProducts }) => {

//   console.log(serverData);

//   const { slug } = useParams();
//   const [categoryData, setCategoryData] = useState(null)
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [allProducts, setAllProducts] = useState([]);
//   const [loading, setLoading] = useState(false)
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loadingProducts, setLoadingProducts] = useState([]);
//   const [selectedProducts, setSelectedProducts] = useState(new Set());



//   const data2 = [
//     {
//       id: 1,
//       icon: icon1,
//       title: 'No Minimum Order Qty',
//       description: 'Order as few as one custom unit to get started, with no minimum order quantity requirements.'

//     },
//     {
//       id: 2,
//       icon: icon2,
//       title: 'Free Design',
//       description: 'Avail professional design services without any added fees, ensuring your vision comes to life.'

//     },
//     {
//       id: 3,
//       icon: icon2,
//       title: 'Quickest Turnaround',
//       description: 'Avail professional design services without any added fees, ensuring your vision comes to life.'

//     },
//     {
//       id: 3,
//       icon: icon2,
//       title: 'Cheapest Prices',
//       description: 'Benefit from our regular discounted rates and get the best custom packaging at the lowest prices.'

//     },
//     {
//       id: 4,
//       icon: icon2,
//       title: 'Fee Shipping',
//       description: 'Enjoy free shipping services for stock and custom orders of packaging boxes at Umbrella Packaging.'

//     },

//     {
//       id: 3,
//       icon: icon2,
//       title: 'Quickest Turnaround',
//       description: 'Avail professional design services without any added fees, ensuring your vision comes to life.'

//     },


//   ]


//   const fetchProduct = async (page = 1) => {
//     // Only set main loading for first page
//     if (page === 1) {
//       setLoading(true);
//       setLoadingProducts(Array(8).fill(null)); // 8 loading skeletons
//     } else {
//       // For subsequent pages, use loadingMore
//       setLoadingMore(true);
//     }

//     try {
//       const response = await axios.get(`${BaseUrl}/redis/category/get?slug=${slug}`);

//       setCategoryData(response?.data?.data);

//       const response2 = await axios.get(
//         `${BaseUrl}/products/categoryProducts/${response?.data?.data?._id}?page=${page}`
//       );
//       if (page === 1) {
//         setAllProducts(response2?.data?.data);
//         setLoadingProducts([]);
//       } else {
//         // Prevent duplicates by checking if product already exists
//         setAllProducts(prev => {
//           const existingIds = new Set(prev.map(p => p._id));
//           const newProducts = response2?.data?.data.filter(p => !existingIds.has(p._id));
//           return [...prev, ...newProducts];
//         });
//       }
//       setCurrentPage(response2?.data?.currentPage);
//       setTotalPages(response2?.data?.totalPages);

//     } catch (err) {
//       if (page === 1) {
//         setLoadingProducts([]);
//       }
//     } finally {
//       if (page === 1) {
//         setLoading(false);
//       } else {
//         setLoadingMore(false);
//       }
//     }

//   };

//   useEffect(() => {
//     if (slug) {
//       // Check cache first for faster loading
//       const cachedData = getCachedSubCategory(slug);
//       if (cachedData) {
//         setCategoryData(cachedData);
//       }

//       // Prefetch SubCategory data for faster navigation
//       prefetchSubCategory(slug, true);

//       // If we have server-side data, use it initially
//       if (CategoryProducts && CategoryProducts.length > 0) {
//         setAllProducts(CategoryProducts);
//         setCurrentPage(1);
//         setTotalPages(1);
//       } else {
//         setAllProducts([]);
//         setCurrentPage(1);
//         setTotalPages(1);
//         fetchProduct();
//       }
//     }
//   }, [slug, CategoryProducts]);

//   // Automatically prefetch all products when they load (for fast navigation) - OPTIMIZED
//   useEffect(() => {
//     if (allProducts && allProducts.length > 0) {
//       // Use optimized batch prefetching for faster loading
//       prefetchProductsBatch(allProducts, {
//         batchSize: 5, // Increased from 3 to 5 for faster prefetching
//         delayBetweenBatches: 50, // Reduced from 100ms to 50ms for faster loading
//         priority: true // Priority for faster loading
//       });
//     }
//   }, [allProducts]);



//   const loadMoreProducts = () => {
//     const nextPage = currentPage + 1;
//     if (nextPage <= totalPages && !loadingMore && !loading) {
//       fetchProduct(nextPage);
//     }
//   };

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
//         "name": categoryData?.brandId?.name || serverData?.brandId?.name,
//         "item": `${BaseUrl}/category/${serverData?.brandId?.slug}`
//       },
//       {
//         "@type": "ListItem",
//         "position": 3,
//         "name": categoryData?.title || serverData?.title,
//         "item": `${BaseUrl}/sub-category/${serverData?.slug}`
//       }
//     ]
//   };

//   // Create item list schema
//   const productItems = CategoryProducts?.map((item, index) => ({
//     "@type": "ListItem",
//     "position": index + 3,
//     "name": item?.name,
//     "item": `${BaseUrl}/${item?.slug}`,
//     "image": item?.images?.[0]?.url ? `${BaseUrl}/${item.images[0].url}` : undefined
//   })) || [];
//   const itemListSchema = {
//     "@context": "https://schema.org",
//     "@type": "ItemList",
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
//         "name": categoryData?.name || serverData?.name,
//         "item": `${BaseUrl}/sub-category/${slug}`
//       },
//       ...productItems
//     ]
//   };


//   return (
//     <>

//      {(categoryData || serverData) ? (
//   <PageMetadata
//     title={categoryData?.metaTitle || serverData?.metaTitle}
//     description={categoryData?.metaDescription || serverData?.metaDescription || ""}
//     keywords={categoryData?.keywords || serverData?.keywords || ""}
//     ogUrl={`${BaseUrl}/category/${slug}`}
//     ogImage={`${BaseUrl}/${serverData?.image}`}
//     ogImageWidth="1200"
//     ogImageHeight="630"
//     canonicalUrl={`${BaseUrl}/sub-category/${slug}`}
//     breadcrumbSchema={breadcrumbSchema}
//     robots={categoryData?.robots || serverData?.robots}
//     itemListSchema={itemListSchema}
//   />
// ) : null}

//       <div className=' bg-[#F7F7F7] py-6'>
//         <div className=' sm:max-w-6xl max-w-[95%] mx-auto'>
//           <div className="flex flex-col lg:flex-row gap-8 items-center">
//             {/* Text Content */}

//             <div className='w-full lg:w-1/2 '>
//               <ul className=' flex flex-wrap sm:gap-3  gap-1'>
//                 <li className=' text-sm text-[#4440E6]'>
//                   <Link to={'/'}>
//                     Home
//                   </Link>
//                 </li>
//                 <li className=' text-sm text-[#4440E6]  whitespace-nowrap capitalize'>
//                   <Link to={`/category/${categoryData?.brandId?.slug}`} >
//                     / {categoryData?.brandId?.name}

//                   </Link>

//                 </li>
//                 <li className=' text-sm text-[#767676] whitespace-nowrap'>
//                   / {categoryData?.title}
//                 </li>
//               </ul>
//               <div className=" sm:pt-3 pt-1">
//                 <h1 className=" font-bold text-gray-900 sm:text-3xl text-xl font-sans pt-4 pb-6">
//                   {categoryData?.subTitle}
//                 </h1>
//                 <div className=' overflow-y-auto h-44'>
//                   <p dangerouslySetInnerHTML={{ __html: categoryData?.description }}
//                     className="text-sm leading-6 font-sans ">

//                   </p>
//                 </div>


//               </div>

//               <div className=" flex flex-wrap   mt-5  gap-5 items-center">
//                 <Button
//                   onClick={() => setIsModalOpen(true)}
//                   label={"Get Instant Quote"}
//                   className=" bg-[#4440E6] text-white"
//                 />
//                 <Link to={'/dielines'}>
//                   <Button
//                     label={"Get  Template"}
//                     className="bg-[#4440E6] text-white"
//                   />
//                 </Link>

//                 <Link to={'/target-price'}>
//                   <Button
//                     label={"Beat My Quote"}
//                     className="bg-[#4440E6]  text-white"
//                   />
//                 </Link>

//               </div>
//             </div>
//             <InstantQuoteModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />

//             {/* Image */}
//             {/* Fixed version */}
//             <div className="w-full  lg:w-1/2">
//               {
//                 categoryData?.image ? <img
//                   src={`${BaseUrl}/${categoryData?.image}`}
//                   alt={categoryData?.imageAltText}
//                   className="w-full h-auto rounded-xl shadow-md object-cover"
//                   loading="lazy"
//                 /> : null

//               }


//             </div>
//           </div>
//         </div>
//       </div>
//       <div className='  py-6'>
//         <div className=' sm:max-w-6xl max-w-[95%] mx-auto'>
//           <div className=' sm:py-12 py-2'>
//             <h2 className="sm:text-[35px] text-[25px]   text-center   font-sans   font-[600] text-[#333333]">
//               Find a Variety of {categoryData?.title} Below
//             </h2>
//             <p className="  pt-3 pb-5 text-sm text-center ">
//               Following are the {categoryData?.title} offered at Umbrella Custom Packaging.

//             </p>


//             <div className=" grid sm:grid-cols-4 grid-cols-2  sm:gap-10 gap-4 mt-3.5">

//               {/* Loading Skeletons */}
//               {loading && loadingProducts.length > 0 && loadingProducts.map((_, index) => (
//                 <div className=' w-full' key={`loading-${index}`}>
//                   <div className="animate-pulse">
//                     <div className="bg-gray-200 rounded-lg w-full sm:h-62 h-48 mb-2"></div>
//                     <div className="bg-gray-200 rounded h-4 w-3/4 mx-auto mb-2"></div>
//                     <div className="bg-gray-200 rounded h-3 w-1/2 mx-auto"></div>
//                   </div>
//                 </div>
//               ))}

//               {/* Actual Products - Show even when loading more */}
//               {allProducts?.map((item, index) => {
//                   // Prefetch product data on hover
//                   const handleMouseEnter = () => {
//                     if (item?.slug) {
//                       prefetchProduct(item.slug);
//                     }
//                   };

//                   // Prefetch product data on mousedown (before click)
//                   const handleMouseDown = () => {
//                     if (item?.slug) {
//                       prefetchProduct(item.slug);
//                     }
//                   };

//                   const isSelected = selectedProducts.has(item._id);

//                   const handleProductClick = (e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     setSelectedProducts(prev => {
//                       const newSet = new Set(prev);
//                       if (newSet.has(item._id)) {
//                         newSet.delete(item._id);
//                       } else {
//                         newSet.add(item._id);
//                       }
//                       return newSet;
//                     });
//                   };

//                   return (
//                     <div 
//                       className={`w-full cursor-pointer transition-all ${isSelected ? 'ring-4 ring-[#4440E6] rounded-lg p-1' : ''}`}
//                       key={item._id || index}
//                       onClick={handleProductClick}
//                     >
//                       <Link 
//                         state={{ productSlug: item._id }} 
//                         to={`/${item?.slug}`}
//                         onMouseEnter={handleMouseEnter}
//                         onMouseDown={handleMouseDown}
//                         className="block"
//                       >
//                         <div className="">
//                           <div className="">
//                             <img src={`${BaseUrl}/${item?.images?.[0]?.url}`} alt={item?.images?.[0]?.altText} className=" w-full sm:h-62 h-auto object-cover overflow-hidden  rounded-lg" />
//                           </div>
//                           <h2 className="  sm:text-base text-sm font-semibold text-[#333333]  text-center  uppercase sm:py-5 py-2">{item?.name}</h2>
//                         </div>
//                       </Link>
//                     </div>
//                   );
//                 })}

//             </div>
//             {currentPage < totalPages && (
//               <div className="flex justify-center mt-6">
//                 <Button
//                   label={loadingMore ? "Loading..." : "Explore More"}
//                   className="bg-[#4440E6] text-white"
//                   onClick={loadMoreProducts}
//                   disabled={loadingMore || loading}
//                 />
//               </div>
//             )}
//           </div>

//           <GetPriceQuote />


//           <div className=' '>
//             <div className=' text-center py-4'>
//               <h2 className="sm:text-[35px] text-[25px]   text-center   font-sans   font-[600] text-[#333333]">
//                 {categoryData?.videoUpperHeading}
//               </h2>
//               <p className='pt-3 whitespace-normal break-words overflow-hidden'
//                 dangerouslySetInnerHTML={{ __html: categoryData?.videoUpperDescription }}>

//               </p>
//             </div>

//             <div className=' flex sm:flex-row flex-col items-center gap-5  mt-5 bg-[#EFF4FE] p-4 rounded-lg justify-between'>
//               <div className="sm:w-6/12 w-full">
//                 <div className="relative w-full aspect-video">
//                   <iframe
//                     src={categoryData?.videoLink}
//                     className="absolute top-0 left-0 w-full h-full rounded-lg"
//                     title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
//                   ></iframe>

//                 </div>
//               </div>
//               <div className=' sm:w-6/12 w-full'>
//                 <h2 className="sm:text-[38px] text-[25px]  leading-[42px] pb-2  font-sans   font-[600] text-[#333333]">
//                   {categoryData?.title} Video Guide</h2>
//                 <p dangerouslySetInnerHTML={{ __html: categoryData?.videoDescription }} className=' pt-4 pb-3'>
//                 </p>
//                 <h2 className="leading-[42px]  text-xl  font-sans   font-[600] text-[#333333]">
//                   Contact Us</h2>
//                 <ul className=' leading-7'>
//                   <li className=' flex gap-1 items-center'>
//                     <svg width={15} aria-hidden="true" class="e-font-icon-svg e-fas-phone-alt" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path></svg>
//                     Dial: 747-247-0456
//                   </li>
//                   <li className=' flex gap-1 items-center'>
//                     <svg width={15} aria-hidden="true" class="e-font-icon-svg e-fab-whatsapp" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path></svg>
//                     WhatsApp :747-247-0456
//                   </li>
//                   <li className=' flex gap-1    whitespace-nowrap items-center'>
//                     <svg width={15} aria-hidden="true" class="e-font-icon-svg e-far-envelope" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path></svg>
//                     Email :sales@umbrellapackaging.com
//                   </li>

//                   <li className=' flex gap-1 items-center'>
//                     <svg width={15} aria-hidden="true" class="e-font-icon-svg e-fab-skype" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M424.7 299.8c2.9-14 4.7-28.9 4.7-43.8 0-113.5-91.9-205.3-205.3-205.3-14.9 0-29.7 1.7-43.8 4.7C161.3 40.7 137.7 32 112 32 50.2 32 0 82.2 0 144c0 25.7 8.7 49.3 23.3 68.2-2.9 14-4.7 28.9-4.7 43.8 0 113.5 91.9 205.3 205.3 205.3 14.9 0 29.7-1.7 43.8-4.7 19 14.6 42.6 23.3 68.2 23.3 61.8 0 112-50.2 112-112 .1-25.6-8.6-49.2-23.2-68.1zm-194.6 91.5c-65.6 0-120.5-29.2-120.5-65 0-16 9-30.6 29.5-30.6 31.2 0 34.1 44.9 88.1 44.9 25.7 0 42.3-11.4 42.3-26.3 0-18.7-16-21.6-42-28-62.5-15.4-117.8-22-117.8-87.2 0-59.2 58.6-81.1 109.1-81.1 55.1 0 110.8 21.9 110.8 55.4 0 16.9-11.4 31.8-30.3 31.8-28.3 0-29.2-33.5-75-33.5-25.7 0-42 7-42 22.5 0 19.8 20.8 21.8 69.1 33 41.4 9.3 90.7 26.8 90.7 77.6 0 59.1-57.1 86.5-112 86.5z"></path></svg>
//                     Skype :747-247-0456
//                   </li>
//                 </ul>
//               </div>
//             </div>


//             <div className="flex flex-col bg-[#F4ECFB] px-4 py-6  rounded-lg lg:flex-row mt-10 gap-8 items-center">
//               {/* Text Content */}

//               <div className='w-full lg:w-1/2 '>

//                 <div className="">
//                   <h2 className="sm:text-[38px] text-[25px]  leading-[42px] pb-2  font-sans   font-[600] text-[#333333]">
//                     {categoryData?.bannerTitleFirst}
//                   </h2>
//                   <div className=' overflow-y-auto h-56'>
//                     <p dangerouslySetInnerHTML={{ __html: categoryData?.bannerContentFirst }} className="text-sm leading-6  mb-6">


//                     </p>

//                   </div>


//                 </div>

//                 <div className=" flex flex-wrap   mt-7 gap-2.5 items-center">
//                   <Button
//                     onClick={() => setIsModalOpen(true)}
//                     label={"Get Instant Quote"}
//                     className=" bg-[#4440E6] text-white"
//                   />

//                 </div>
//               </div>

//               {/* Image */}
//               {/* Fixed version */}
//               <div className="w-full  lg:w-1/2">
//                 <img
//                   src={`${BaseUrl}/${categoryData?.bannerImageFirst}`}
//                   alt={categoryData?.bannerImageFirstAltText}
//                   className={"w-full h-auto rounded-xl shadow-md object-cover"}
//                   loading="lazy"
//                 />

//               </div>
//             </div>

//           </div>



//         </div>



//         <div className="sm:max-w-6xl  my-6  py-3 rounded-lg  max-w-[95%] mx-auto">
//           <div className="text-center">

//             <CustomPackagingApart />

//           </div>
//         </div>


//         <div className=' sm:max-w-6xl max-w-[95%] mx-auto'>
//           <div className="flex flex-col bg-[#F4ECFB] px-4 py-6  rounded-lg lg:flex-row mt-10 gap-8 items-center">
//             {/* Text Content */}

//             <div className='w-full lg:w-1/2 '>

//               <div className=" pt-3">
//                 <h2 className="sm:text-[38px] text-[25px]  leading-[42px] pb-2  font-sans   font-[600] text-[#333333]">
//                   {categoryData?.bannerTitleSecond}
//                 </h2>
//                 <div className=' overflow-y-auto h-56'>
//                   <p dangerouslySetInnerHTML={{ __html: categoryData?.bannerContentSecond }} className="text-sm leading-6  mb-6">




//                   </p>

//                 </div>


//               </div>

//               <div className=" flex flex-wrap   mt-7 gap-2.5 items-center">
//                 <Button
//                   onClick={() => setIsModalOpen(true)}
//                   label={"Get Instant Quote"}
//                   className=" bg-[#4440E6] text-white"
//                 />

//               </div>
//             </div>

//             {/* Image */}
//             {/* Fixed version */}
//             <div className="w-full  lg:w-1/2">
//               <img
//                 src={`${BaseUrl}/${categoryData?.bannerImageSecond}`}
//                 alt={categoryData?.bannerImageSecondAltText}
//                 className="w-full h-auto rounded-xl shadow-md object-cover"
//                 loading="lazy"
//               />

//             </div>
//           </div>
//         </div>


//         <PackagingBanner title={'Order Kraft Packaging For Sustainable Future.'} subTitle={"Go Green with Umbrella Custom Packaging Go For Kraft Packaging"} bgImage={goScreen} />


//         <div className=' sm:max-w-6xl max-w-[95%] mx-auto'>
//           <div className="flex flex-col bg-[#F4ECFB] px-4 py-6  rounded-lg lg:flex-row mt-10 gap-8 items-center">
//             {/* Image */}
//             {/* Fixed version */}
//             <div className="w-full  lg:w-1/2">
//               <img
//                 src={`${BaseUrl}/${categoryData?.bannerImageThird}`}
//                 alt={categoryData?.bannerImageThirdAltText}
//                 className="w-full h-auto rounded-xl shadow-md object-cover"
//                 loading="lazy"
//               />

//             </div>
//             {/* Text Content */}

//             <div className='w-full lg:w-1/2 '>

//               <div className=" pt-3">
//                 <h2 className="sm:text-[38px] text-[25px]  leading-[42px] pb-2  font-sans   font-[600] text-[#333333]">
//                   {categoryData?.bannerTitleThird}
//                 </h2>
//                 <div className=' overflow-y-auto h-56'>
//                   <p dangerouslySetInnerHTML={{ __html: categoryData?.bannerContentThird }} className="text-sm leading-6  mb-6">




//                   </p>

//                 </div>


//               </div>

//               <div className=" flex flex-wrap   mt-7 gap-2.5 items-center">
//                 <Button
//                   onClick={() => setIsModalOpen(true)}
//                   label={"Get Instant Quote"}
//                   className=" bg-[#4440E6] text-white"
//                 />

//               </div>
//             </div>


//           </div>
//         </div>



//         <div className=' sm:max-w-6xl mt-3.5 max-w-[95%] mx-auto'>
//           <div className="flex flex-col bg-[#F4ECFB] px-4 py-6  rounded-lg lg:flex-row mt-10 gap-8 items-center">

//             {/* Text Content */}

//             <div className='w-full lg:w-1/2 '>

//               <div className=" pt-3">
//                 <h2 className="sm:text-[38px] text-[25px]  leading-[42px] pb-2  font-sans   font-[600] text-[#333333]">
//                   {categoryData?.bannerTitleFourth}
//                 </h2>
//                 <div className=' overflow-y-auto h-56'>
//                   <p dangerouslySetInnerHTML={{ __html: categoryData?.bannerContentFourth }} className="text-sm leading-6  mb-6">




//                   </p>

//                 </div>


//               </div>

//               <div className=" flex flex-wrap   mt-7 gap-2.5 items-center">
//                 <Button
//                   onClick={() => setIsModalOpen(true)}
//                   label={"Get Instant Quote"}
//                   className=" bg-[#4440E6] text-white"
//                 />

//               </div>
//             </div>

//             {/* Image */}
//             {/* Fixed version */}
//             <div className="w-full  lg:w-1/2">
//               <img
//                 src={`${BaseUrl}/${categoryData?.bannerImageFourth}`}
//                 alt={categoryData?.bannerImageFourthAltText}
//                 className="w-full h-auto rounded-xl shadow-md object-cover"
//                 loading="lazy"
//               />

//             </div>
//           </div>
//         </div>

//       </div>


//       <div className=' mb-5 flex  justify-between sm:flex-row flex-col gap-3 items-center px-3 py-5 sm:max-w-6xl max-w-[95%] bg-[#FFDEBF] rounded-lg mx-auto'>
//         <div>
//           <h3 className=' sm:text-3xl  text-xl font-semibold'>Looking for the templates of custom boxes and packaging ?
//           </h3>
//           <p className=' py-2'>Get a quick template file from us, where you can put your design and save some good time.

//           </p>
//         </div>

//         <Link to={'/dielines'}>
//           <Button label={'Get Template'} className=" bg-[#4440E6] text-white" />
//         </Link>
//       </div>

//       <CustomBoxMaterial />


//       <div className=' py-5' style={{ backgroundImage: `url(${buliding})` }}>
//         <div className='  sm:max-w-6xl flex sm:flex-row flex-col items-center max-w-[95%] mx-auto'>
//           <div className=' sm:w-6/12 w-full'>
//             <div className=' rounded-xl px-4 py-4 bg-white'>

//               <h2 className="sm:text-[38px] text-[25px]  leading-[42px] pb-2  font-sans   font-[600] text-[#333333]">
//                 Building Trust with Top <br /> Brands
//               </h2>
//               <p className=' pt-2'>Many companies choose Umbrella Custom Packaging for amazing, affordable, and memorable custom printed boxes and packaging. We work hard to make sure we give them the best advice and solutions for their needs, so they feel confident and happy working with us. It doesn’t matter how big or small your business is, we’ll work with you to make the perfect custom boxes you want. By building trust with top brands through our dedication, reliability, and exceptional service, we continue to solidify our reputation as a trusted partner in the packaging industry.

//               </p>

//               <ul className="flex pb-4  flex-wrap  justify-center mt-10 w-full gap-2">
//                 <li className="bg-white shadow-xl h-20 w-28 flex justify-center items-center rounded-xl">
//                   <img src={brand1} alt="" className="max-h-full max-w-full object-contain" />
//                 </li>
//                 <li className="bg-white shadow-xl h-20 w-28 flex justify-center items-center rounded-xl">
//                   <img src={brand2} alt="" className="max-h-full max-w-full object-contain" />
//                 </li>
//                 <li className="bg-white shadow-xl h-20 w-28 flex justify-center items-center rounded-xl">
//                   <img src={brand3} alt="" className="max-h-full max-w-full object-contain" />
//                 </li>
//                 <li className="bg-white shadow-xl h-20 w-28 flex justify-center items-center rounded-xl">
//                   <img src={brand4} alt="" className="max-h-full max-w-full object-contain" />
//                 </li>
//                 <li className="bg-white shadow-xl h-20 w-28 flex justify-center items-center rounded-xl">
//                   <img src={brand5} alt="" className="max-h-full max-w-full object-contain" />
//                 </li>
//               </ul>


//             </div>
//           </div>
//           <div className=' sm:w-5/12 w-full'>
//             <img src={image1} alt=''
//             />
//           </div>
//         </div>

//       </div>



//     </>
//   )
// }

// export default SubCategory


import React, { useState, useEffect, useMemo } from 'react'
import SampleKit from '../../components/CategoryTestimonials'
import Button from '../../components/common/Button'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Input from '../../components/common/Input'
import Select from '../../components/common/Select'
import Textarea from '../../components/common/Textarea'
import ProductCard, { ProductSelectionProvider } from '../../components/common/ProductCard'
import { Link, useParams } from 'react-router-dom'
import { FaAngleRight, FaBed } from 'react-icons/fa'
import { IoHomeOutline } from 'react-icons/io5'
import { LiaAngleRightSolid } from 'react-icons/lia'
import { MdOutdoorGrill } from 'react-icons/md'
import { TbToolsKitchen3 } from 'react-icons/tb'
import Capabilities from '../../components/Capabilities'
import BottomHero from '../../components/Hero/BottomHero'
import Testimonials from '../../components/Testimonials'
import google from '../../assets/images/footer/google-reviws-logo.webp';
import axios from 'axios';
import { BaseUrl } from '../../utils/BaseUrl';
import { prefetchProduct, prefetchProductsBatch, prefetchSubCategory, getCachedSubCategory } from '../../utils/prefetchUtils';
import PageMetadata from '../../components/common/PageMetadata';
import InstantQuoteModal from '../../components/common/InstantQuoteModal';
import CustomInserts from '../../components/CustomInserts'
import { Icon13, Icon15, Icon16, insert1, insert2, insert3, insert4, insert5 } from '../../assets';
import CardSlider from '../../components/common/CardSlider';
import FAQ from '../../components/FAQ/FAQ'
import TrustBanner from '../../components/common/TrustBanner'
import CreativePackaging from '../../components/CreativeBanner/CreativePackaging';
import BoxesBrands from '../../components/BoxesBrands';
import CreativeGallery from '../../components/CreativeBanner/CreativeGallery';
import CustomPackagingApart from '../../components/CustomPackagingApart/CustomPackagingApart';
import PackagingFeatures from '../../components/CustomPackagingApart/PackagingFeatures';
import Tabs from '../../components/common/Tabs';
import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi';
import { RiPhoneLine } from 'react-icons/ri';
import PackagingJourney from '../../components/PackagingJourney';
import CategoryBanner from '../../components/CategoryBanner';
import OfferCard from '../../components/common/OfferCard';
import ServiceSelectionCard from '../../components/common/ServiceSelectionCard';
import { Icon1, Icon2, Icon3, Icon4, Icon5,Icon14, Icon6, Icon7 } from '../../assets';
import CategoryTestimonials from '../../components/CategoryTestimonials';
import video1 from '../../assets/videos/gallery/video1.mp4';
import video2 from '../../assets/videos/gallery/video2.mp4';
import video3 from '../../assets/videos/gallery/video3.mp4';
import video4 from '../../assets/videos/gallery/video4.mp4';
import video5 from '../../assets/videos/gallery/video5.mp4';
const SubCategory = ({ serverData, CategoryProducts }) => {
  const { slug } = useParams();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [categoryData, setCategoryData] = useState(serverData || null)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allProducts, setAllProducts] = useState(CategoryProducts || []);
  const [loading, setLoading] = useState(!serverData && !CategoryProducts) // Don't show loading if serverData exists
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [materialCurr, setMaterialCurr] = useState(0);
  const [wrappingsCurr, setWrappingsCurr] = useState(0);
  const [printingsCurr, setPrintingsCurr] = useState(0);
  const [coatingsCurr, setCoatingsCurr] = useState(0);
  const [finishesCurr, setFinishesCurr] = useState(0);
  const [insertsCurr, setInsertsCurr] = useState(0);
  const [addonsCurr, setAddonsCurr] = useState(0);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const fetchProduct = async (page = 1) => {
    // Only set main loading for first page
    if (page === 1) {
      setLoading(true);
      setLoadingProducts(Array(8).fill(null)); // 8 loading skeletons
    } else {
      // For subsequent pages, use loadingMore
      setLoadingMore(true);
    }

    try {
      const response = await axios.get(`${BaseUrl}/category/get?slug=${slug}`);

      setCategoryData(response?.data?.data);

      const response2 = await axios.get(
        `${BaseUrl}/products/categoryProducts/${response?.data?.data?._id}?page=${page}`
      );
      if (page === 1) {
        setAllProducts(response2?.data?.data);
        setLoadingProducts([]);
      } else {
        // Prevent duplicates by checking if product already exists
        setAllProducts(prev => {
          const existingIds = new Set(prev.map(p => p._id));
          const newProducts = response2?.data?.data.filter(p => !existingIds.has(p._id));
          return [...prev, ...newProducts];
        });
      }
      setCurrentPage(response2?.data?.currentPage);
      setTotalPages(response2?.data?.totalPages);

    } catch (err) {
      if (page === 1) {
        setLoadingProducts([]);
      }
    } finally {
      if (page === 1) {
        setLoading(false);
      } else {
        setLoadingMore(false);
      }
    }

  };

  useEffect(() => {
    if (slug) {
      // Check cache first for faster loading
      const cachedData = getCachedSubCategory(slug);
      if (cachedData) {
        setCategoryData(cachedData);
      }

      // Prefetch SubCategory data for faster navigation
      prefetchSubCategory(slug, true);

      // If we have server-side data, use it initially
      if (CategoryProducts && CategoryProducts.length > 0) {
        setAllProducts(CategoryProducts);
        setCurrentPage(1);
        setTotalPages(1);
      } else {
        setAllProducts([]);
        setCurrentPage(1);
        setTotalPages(1);
        fetchProduct();
      }
    }
  }, [slug, CategoryProducts]);

  // Automatically prefetch all products when they load (for fast navigation) - OPTIMIZED
  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      // Use optimized batch prefetching for faster loading
      prefetchProductsBatch(allProducts, {
        batchSize: 5, // Increased from 3 to 5 for faster prefetching
        delayBetweenBatches: 50, // Reduced from 100ms to 50ms for faster loading
        priority: true // Priority for faster loading
      });
    }
  }, [allProducts]);

  const loadMoreProducts = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= totalPages && !loadingMore && !loading) {
      fetchProduct(nextPage);
    }
  };

  // Breadcrumb schema for SEO
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": BaseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": categoryData?.brandId?.name || serverData?.brandId?.name,
        "item": `${BaseUrl}/category/${categoryData?.brandId?.slug || serverData?.brandId?.slug}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": categoryData?.title || serverData?.title,
        "item": `${BaseUrl}/sub-category/${slug}`
      }
    ]
  };

  // Create item list schema
  const productItems = (allProducts || CategoryProducts)?.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 3,
    "name": item?.name,
    "item": `${BaseUrl}/${item?.slug}`,
    "image": item?.images?.[0]?.url ? `${BaseUrl}/${item.images[0].url}` : undefined
  })) || [];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": BaseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": categoryData?.title || serverData?.title,
        "item": `${BaseUrl}/sub-category/${slug}`
      },
      ...productItems
    ]
  };

  const brands = [
    {
      name: "Packaging",
      logo: insert1, // Replace with real logos
      image: insert2,
      rating: 5,
    },
    {
      name: "Myka Meier",
      logo: insert1,
      image: insert1,
      rating: 5,
    },
    {
      name: "Plenaire",
      logo: insert1,
      image: insert1,
      rating: 5,
    },
    {
      name: "Toups & Co Organics",
      logo: insert1,
      image: insert1,
      rating: 5,
    }
  ];

  // Base Materials slides data
  const baseMaterialsSlides = [
    {
      title: "White",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      description: "Premium white cardboard material"
    },
    {
      title: "Card Stock",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      description: "Durable card stock option"
    },
    {
      title: "Corrugated",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      description: "Strong corrugated material"
    },
    {
      title: "Kraft",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      description: "Eco-friendly kraft paper"
    },
    {
      title: "Recycled",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      description: "Sustainable recycled material"
    },
    {
      title: "Bleached",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      description: "Bright bleached paper"
    },
    {
      title: "Unbleached",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      description: "Natural unbleached paper"
    },
    {
      title: "Coated",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      description: "Premium coated material"
    }
  ];

  // Wrappings slides data
  const wrappingsSlides = [
    {
      title: "Cellophane",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      description: "Clear cellophane wrapping"
    },
    {
      title: "Shrink Wrap",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      description: "Tight shrink wrap film"
    },
    {
      title: "Bubble Wrap",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      description: "Protective bubble wrap"
    },
    {
      title: "Polyethylene",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      description: "Durable PE wrapping"
    },
    {
      title: "Polypropylene",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      description: "Strong PP wrapping"
    },
    {
      title: "Stretch Film",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      description: "Flexible stretch film"
    }
  ];

  // Printings slides data
  const printingsSlides = [
    {
      title: "Offset Printing",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      description: "High-quality offset printing"
    },
    {
      title: "Digital Printing",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      description: "Fast digital printing"
    },
    {
      title: "Flexographic",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      description: "Flexographic printing"
    },
    {
      title: "Screen Printing",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      description: "Custom screen printing"
    },
    {
      title: "Embossing",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      description: "Elegant embossed design"
    },
    {
      title: "Foil Stamping",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      description: "Premium foil stamping"
    }
  ];

  // Coatings slides data
  const coatingsSlides = [
    {
      title: "Glossy Coating",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      description: "Shiny glossy finish"
    },
    {
      title: "Matte Coating",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      description: "Smooth matte finish"
    },
    {
      title: "UV Coating",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      description: "Durable UV coating"
    },
    {
      title: "Aqueous Coating",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      description: "Water-based coating"
    },
    {
      title: "Varnish",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      description: "Protective varnish"
    }
  ];

  // Finishes slides data
  const finishesSlides = [
    {
      title: "Glossy Finish",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      description: "High-gloss finish"
    },
    {
      title: "Matte Finish",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      description: "Elegant matte finish"
    },
    {
      title: "Satin Finish",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      description: "Smooth satin finish"
    },
    {
      title: "Textured Finish",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      description: "Unique textured finish"
    }
  ];

  // Inserts slides data
  const insertsSlides = [
    {
      title: "Foam Inserts",
      image: insert1,
      description: "Protective foam inserts"
    },
    {
      title: "Cardboard Inserts",
      image: insert2,
      description: "Custom cardboard inserts"
    },
    {
      title: "Clamshell Inserts",
      image: insert3,
      description: "Secure clamshell inserts"
    },
    {
      title: "Corrugated Inserts",
      image: insert4,
      description: "Strong corrugated inserts"
    },
    {
      title: "EVA Foam Inserts",
      image: insert5,
      description: "Premium EVA foam"
    }
  ];

  // Add-ons slides data
  const addonsSlides = [
    {
      title: "Handles",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      description: "Custom handles"
    },
    {
      title: "Windows",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      description: "Display windows"
    },
    {
      title: "Magnetic Closure",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      description: "Magnetic closure system"
    },
    {
      title: "Ribbons",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      description: "Decorative ribbons"
    },
    {
      title: "Labels",
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      description: "Custom labels"
    }
  ];

  // Helper function to create chunks
  const createChunks = (slides, chunkSize = 4) => {
    const chunks = [];
    for (let i = 0; i < slides.length; i += chunkSize) {
      chunks.push(slides.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const baseMaterialChunks = createChunks(baseMaterialsSlides);
  const wrappingsChunks = createChunks(wrappingsSlides);
  const printingsChunks = createChunks(printingsSlides);
  const coatingsChunks = createChunks(coatingsSlides);
  const finishesChunks = createChunks(finishesSlides);
  const insertsChunks = createChunks(insertsSlides);
  const addonsChunks = createChunks(addonsSlides);

  // Service Selection Cards Data
  const serviceSelectionData = [
    {
      id: 1,
      icon: Icon13,
      title: 'FREE SHIPPING',
      description: 'Free shipping on all orders'
    },
    // {
    //   id: 2,
    //   icon: Icon1,
    //   title: 'MONEY BACK GUARANTEE',
    //   description: '100% money back'
    // },
    {
      id: 3,
      icon: Icon15,
      title: 'ONLINE SUPPORT 24/7',
      description: '24/7 Customer Support'
    },
    {
      id: 4,
      icon: Icon16,
      title: 'Quickest Turnaround',
      description: ''
    },
    {
      id: 5,
      icon: Icon3,
      title: 'Free Design Support',
      description: 'Professional design services'
    },
    {
      id: 6,
      icon: Icon14,
      title: 'No Die & Plate Charges',
      description: ''
    }
  ];

  const galleryVideo = [
    {
      title: "Gallery Video 1",
      video: video1
    },
    {
      title: "Gallery Video 2",
      video: video2
    },
    {
      title: "Gallery Video 2",
      video: video3
    },
    {
      title: "Gallery Video 2",
      video: video4
    },
    {
      title: "Gallery Video 2",
      video: video5
    }
  ];
  // Navigation functions for each tab
  const prevMaterial = () => {
    setMaterialCurr((prevIndex) =>
      prevIndex === 0 ? baseMaterialChunks.length - 1 : prevIndex - 1
    );
  };

  const nextMaterial = () => {
    setMaterialCurr((prevIndex) =>
      prevIndex === baseMaterialChunks.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevWrappings = () => {
    setWrappingsCurr((prevIndex) =>
      prevIndex === 0 ? wrappingsChunks.length - 1 : prevIndex - 1
    );
  };

  const nextWrappings = () => {
    setWrappingsCurr((prevIndex) =>
      prevIndex === wrappingsChunks.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevPrintings = () => {
    setPrintingsCurr((prevIndex) =>
      prevIndex === 0 ? printingsChunks.length - 1 : prevIndex - 1
    );
  };

  const nextPrintings = () => {
    setPrintingsCurr((prevIndex) =>
      prevIndex === printingsChunks.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevCoatings = () => {
    setCoatingsCurr((prevIndex) =>
      prevIndex === 0 ? coatingsChunks.length - 1 : prevIndex - 1
    );
  };

  const nextCoatings = () => {
    setCoatingsCurr((prevIndex) =>
      prevIndex === coatingsChunks.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevFinishes = () => {
    setFinishesCurr((prevIndex) =>
      prevIndex === 0 ? finishesChunks.length - 1 : prevIndex - 1
    );
  };

  const nextFinishes = () => {
    setFinishesCurr((prevIndex) =>
      prevIndex === finishesChunks.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevInserts = () => {
    setInsertsCurr((prevIndex) =>
      prevIndex === 0 ? insertsChunks.length - 1 : prevIndex - 1
    );
  };

  const nextInserts = () => {
    setInsertsCurr((prevIndex) =>
      prevIndex === insertsChunks.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevAddons = () => {
    setAddonsCurr((prevIndex) =>
      prevIndex === 0 ? addonsChunks.length - 1 : prevIndex - 1
    );
  };

  const nextAddons = () => {
    setAddonsCurr((prevIndex) =>
      prevIndex === addonsChunks.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Helper component for slider content
  const SliderContent = ({ chunks, currentIndex, onPrev, onNext }) => (
    <div className="relative rounded-2xl pb-12 overflow-hidden bg-white/50">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {chunks.map((chunk, chunkIndex) => (
            <div
              key={chunkIndex}
              className="w-full flex-shrink-0 flex justify-between gap-3 sm:gap-4"
            >
              {chunk.map((slide) => (
                <div
                  key={slide.title}
                  className="flex-1 flex flex-col items-center group"
                >
                  <div className="w-full flex justify-center">
                    <div className="w-44 h-32 lg:w-48 lg:h-36 rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group-hover:scale-105">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <h4 className="mt-4 text-sm font-semibold text-[#213554] group-hover:text-[#EE334B] transition-colors duration-300">
                    {slide.title}
                  </h4>
                  <p className="mt-1 text-[11px] text-gray-600 text-center">
                    {slide.description}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-3 right-4 flex items-center gap-3">
        <button
          type="button"
          onClick={onPrev}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gradient-to-r hover:from-[#213554] hover:to-[#213554]/90 hover:shadow-lg transition-all duration-300 group"
        >
          <TfiAngleLeft size={18} className="text-[#213554] group-hover:text-white transition-colors duration-300" />
        </button>
        <button
          type="button"
          onClick={onNext}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gradient-to-r hover:from-[#213554] hover:to-[#213554]/90 hover:shadow-lg transition-all duration-300 group"
        >
          <TfiAngleRight size={18} className="text-[#213554] group-hover:text-white transition-colors duration-300" />
        </button>
      </div>
    </div>
  );

  // Tabs data - matching image structure
  const tabsData = [
    {
      title: "Base Materials",
      content: (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
         
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {addonsSlides.map((addon, index) => (
              <div
                key={index}
                className="bg-white rounded-xl text-center border border-gray-100 hover:border-[#EE334B]/20 hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col items-center p-4 overflow-hidden"
              >
                <div className="relative mb-4 w-40 h-40 mx-auto aspect-square">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-[#EE334B]/30 transition-all duration-300">
                    <img
                      src={addon.image}
                      alt={addon.title}
                      className="w-full h-full object-cover aspect-square transform transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  {/* Hover Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full"></div>
                  {/* Shine Effect - Sweeps across on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-full"></div>
                </div>
                <div className='px-2 pb-2'>
                  <h6 className="font-semibold group-hover:text-[#EE334B] transition-colors duration-300">{addon.title}</h6>
                  <p className="text-xs text-gray-600 mt-1">{addon.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Wrappings",
      content: (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {addonsSlides.map((addon, index) => (
            <div
              key={index}
              className="bg-white rounded-xl text-center border border-gray-100 hover:border-[#EE334B]/20 hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col items-center p-4 overflow-hidden"
            >
              <div className="relative mb-4 w-40 h-40 mx-auto aspect-square">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-[#EE334B]/30 transition-all duration-300">
                  <img
                    src={addon.image}
                    alt={addon.title}
                    className="w-full h-full object-cover aspect-square transform transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                {/* Hover Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full"></div>
                {/* Shine Effect - Sweeps across on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-full"></div>
              </div>
              <div className='px-2 pb-2'>
                <h6 className="font-semibold group-hover:text-[#EE334B] transition-colors duration-300">{addon.title}</h6>
                <p className="text-xs text-gray-600 mt-1">{addon.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      ),
    },
    {
      title: "Printings",
      content: (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {addonsSlides.map((addon, index) => (
            <div
              key={index}
              className="bg-white rounded-xl text-center border border-gray-100 hover:border-[#EE334B]/20 hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col items-center p-4 overflow-hidden"
            >
              <div className="relative mb-4 w-40 h-40 mx-auto aspect-square">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-[#EE334B]/30 transition-all duration-300">
                  <img
                    src={addon.image}
                    alt={addon.title}
                    className="w-full h-full object-cover aspect-square transform transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                {/* Hover Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full"></div>
                {/* Shine Effect - Sweeps across on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-full"></div>
              </div>
              <div className='px-2 pb-2'>
                <h6 className="font-semibold group-hover:text-[#EE334B] transition-colors duration-300">{addon.title}</h6>
                <p className="text-xs text-gray-600 mt-1">{addon.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      ),
    },
    {
      title: "Coatings",
      content: (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {addonsSlides.map((addon, index) => (
            <div
              key={index}
              className="bg-white rounded-xl text-center border border-gray-100 hover:border-[#EE334B]/20 hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col items-center p-4 overflow-hidden"
            >
              <div className="relative mb-4 w-40 h-40 mx-auto aspect-square">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-[#EE334B]/30 transition-all duration-300">
                  <img
                    src={addon.image}
                    alt={addon.title}
                    className="w-full h-full object-cover aspect-square transform transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                {/* Hover Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full"></div>
                {/* Shine Effect - Sweeps across on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-full"></div>
              </div>
              <div className='px-2 pb-2'>
                <h6 className="font-semibold group-hover:text-[#EE334B] transition-colors duration-300">{addon.title}</h6>
                <p className="text-xs text-gray-600 mt-1">{addon.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      ),
    },
    {
      title: "Finishes",
      content: (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {addonsSlides.map((addon, index) => (
              <div
                key={index}
                className="bg-white rounded-xl text-center border border-gray-100 hover:border-[#EE334B]/20 hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col items-center p-4 overflow-hidden"
              >
                <div className="relative mb-4 w-40 h-40 mx-auto aspect-square">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-[#EE334B]/30 transition-all duration-300">
                    <img
                      src={addon.image}
                      alt={addon.title}
                      className="w-full h-full object-cover aspect-square transform transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  {/* Hover Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full"></div>
                  {/* Shine Effect - Sweeps across on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-full"></div>
                </div>
                <div className='px-2 pb-2'>
                  <h6 className="font-semibold group-hover:text-[#EE334B] transition-colors duration-300">{addon.title}</h6>
                  <p className="text-xs text-gray-600 mt-1">{addon.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Inserts",
      content: (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
         
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { img: insert1, title: 'Foam Inserts' },
              { img: insert2, title: 'Cardboard Inserts' },
              { img: insert3, title: 'Clamshell Inserts' },
              { img: insert4, title: 'Corrugated Inserts' },
              { img: insert4, title: 'Corrugated Inserts' },
              { img: insert5, title: 'Eva Foam Inserts' }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl text-center border border-gray-100 hover:border-[#EE334B]/20 hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col items-center p-4 overflow-hidden"
              >
                <div className="relative mb-4 w-40 h-40 mx-auto aspect-square">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-[#EE334B]/30 transition-all duration-300">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover aspect-square transform transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  {/* Hover Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full"></div>
                  {/* Shine Effect - Sweeps across on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-full"></div>
                </div>
                <div className='px-2 pb-2'>
                  <h6 className="font-semibold group-hover:text-[#EE334B] transition-colors duration-300">{item.title}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Add-ons",
      content: (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {addonsSlides.map((addon, index) => (
              <div
                key={index}
                className="bg-white rounded-xl text-center border border-gray-100 hover:border-[#EE334B]/20 hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col items-center p-4 overflow-hidden"
              >
                <div className="relative mb-4 w-40 h-40 mx-auto aspect-square">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-[#EE334B]/30 transition-all duration-300">
                    <img
                      src={addon.image}
                      alt={addon.title}
                      className="w-full h-full object-cover aspect-square transform transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  {/* Hover Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full"></div>
                  {/* Shine Effect - Sweeps across on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-full"></div>
                </div>
                <div className='px-2 pb-2'>
                  <h6 className="font-semibold group-hover:text-[#EE334B] transition-colors duration-300">{addon.title}</h6>
                  <p className="text-xs text-gray-600 mt-1">{addon.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    }
  ];


  // Service Selection Cards Data for each tab (4 cards per tab) - with images
  const materialsCards = [
    {
      id: 1,
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      title: 'Kraft Material',
      description: 'Eco-friendly kraft material perfect for sustainable packaging solutions with natural brown appearance.'
    },
    {
      id: 2,
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      title: 'White Cardboard',
      description: 'Premium white cardboard material ideal for high-quality printing and professional appearance.'
    },
    {
      id: 3,
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      title: 'Corrugated Board',
      description: 'Strong and durable corrugated board providing excellent protection for shipping and storage.'
    },
    {
      id: 4,
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      title: 'Recycled Paper',
      description: 'Sustainable recycled paper option that helps reduce environmental impact while maintaining quality.'
    }
  ];

  const printingOptionsCards = [
    {
      id: 1,
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      title: 'Offset Printing',
      description: 'High-quality offset printing perfect for large quantities with vibrant colors and sharp details.'
    },
    {
      id: 2,
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      title: 'Digital Printing',
      description: 'Fast digital printing solutions ideal for small batches and quick turnaround times.'
    },
    {
      id: 3,
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      title: 'Flexographic',
      description: 'Flexographic printing options for flexible packaging materials with excellent color consistency.'
    },
    {
      id: 4,
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      title: 'Screen Printing',
      description: 'Custom screen printing for unique designs and specialty finishes on various materials.'
    }
  ];

  const inksCards = [
    {
      id: 1,
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      title: 'Eco-Friendly Inks',
      description: 'Sustainable ink options made from natural ingredients that are safe for food packaging.'
    },
    {
      id: 2,
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      title: 'Metallic Inks',
      description: 'Premium metallic finishes that add luxury and elegance to your packaging design.'
    },
    {
      id: 3,
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      title: 'Specialty Inks',
      description: 'Unique specialty options including glow-in-the-dark, scented, and textured inks.'
    },
    {
      id: 4,
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      title: 'Custom Colors',
      description: 'Custom color matching to perfectly match your brand colors and design requirements.'
    }
  ];

  const finishingCards = [
    {
      id: 1,
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      title: 'UV Coating',
      description: 'Durable UV coating that provides protection against scratches and enhances visual appeal.'
    },
    {
      id: 2,
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      title: 'Matte Finish',
      description: 'Elegant matte finish that reduces glare and provides a sophisticated, premium look.'
    },
    {
      id: 3,
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      title: 'Glossy Finish',
      description: 'High-gloss finish that makes colors pop and creates a vibrant, eye-catching appearance.'
    },
    {
      id: 4,
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      title: 'Embossing',
      description: 'Premium embossed designs that add texture and depth to create a luxurious feel.'
    }
  ];

  const shapesAddonsCards = [
    {
      id: 1,
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      title: 'Custom Shapes',
      description: 'Unique shape options tailored to your product requirements and brand identity.'
    },
    {
      id: 2,
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      title: 'Handles',
      description: 'Custom handle options including die-cut handles, rope handles, and ribbon handles.'
    },
    {
      id: 3,
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      title: 'Windows',
      description: 'Display window options that allow customers to see the product before purchasing.'
    },
    {
      id: 4,
      image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
      title: 'Magnetic Closure',
      description: 'Premium closure systems with magnetic closures for easy access and secure sealing.'
    }
  ];

  const tabsData2 = [
    {
      title: "Materials",
      content: (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {materialsCards.map((card, index) => (
              <div
                key={card.id || index}
                className="bg-white rounded-lg border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col"
              >
                {/* Image Section */}
                {card.image && (
                  <div className="relative w-full h-48 overflow-hidden bg-gray-50">
                    <img
                      src={card.image}
                      alt={card.title || 'Card image'}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}
                
                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#EE334B] transition-colors duration-300">
                    {card.title}
                  </h3>
                  {card.description && (
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {card.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Printing Options",
      content: (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {printingOptionsCards.map((card, index) => (
              <div
                key={card.id || index}
                className="bg-white rounded-lg border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col"
              >
                {/* Image Section */}
                {card.image && (
                  <div className="relative w-full h-48 overflow-hidden bg-gray-50">
                    <img
                      src={card.image}
                      alt={card.title || 'Card image'}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}
                
                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#EE334B] transition-colors duration-300">
                    {card.title}
                  </h3>
                  {card.description && (
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {card.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Inks",
      content: (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {inksCards.map((card, index) => (
              <div
                key={card.id || index}
                className="bg-white rounded-lg border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col"
              >
                {/* Image Section */}
                {card.image && (
                  <div className="relative w-full h-48 overflow-hidden bg-gray-50">
                    <img
                      src={card.image}
                      alt={card.title || 'Card image'}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}
                
                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#EE334B] transition-colors duration-300">
                    {card.title}
                  </h3>
                  {card.description && (
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {card.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Finishing",
      content: (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {finishingCards.map((card, index) => (
              <div
                key={card.id || index}
                className="bg-white rounded-lg border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col"
              >
                {/* Image Section */}
                {card.image && (
                  <div className="relative w-full h-48 overflow-hidden bg-gray-50">
                    <img
                      src={card.image}
                      alt={card.title || 'Card image'}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}
                
                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#EE334B] transition-colors duration-300">
                    {card.title}
                  </h3>
                  {card.description && (
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {card.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Shapes & Add-Ons",
      content: (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {shapesAddonsCards.map((card, index) => (
              <div
                key={card.id || index}
                className="bg-white rounded-lg border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col"
              >
                {/* Image Section */}
                {card.image && (
                  <div className="relative w-full h-48 overflow-hidden bg-gray-50">
                    <img
                      src={card.image}
                      alt={card.title || 'Card image'}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}
                
                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#EE334B] transition-colors duration-300">
                    {card.title}
                  </h3>
                  {card.description && (
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {card.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    }
  ];
  return (
    <>
      {(categoryData || serverData) ? (
        <PageMetadata
          title={categoryData?.metaTitle || serverData?.metaTitle}
          description={categoryData?.metaDescription || serverData?.metaDescription || ""}
          keywords={categoryData?.keywords || serverData?.keywords || ""}
          ogUrl={`${BaseUrl}/sub-category/${slug}`}
          ogImage={`${BaseUrl}/${categoryData?.image || serverData?.image}`}
          ogImageWidth="1200"
          ogImageHeight="630"
          canonicalUrl={`${BaseUrl}/sub-category/${slug}`}
          breadcrumbSchema={breadcrumbSchema}
          // robots={categoryData?.robots || serverData?.robots}
          itemListSchema={itemListSchema}
        />
      ) : null}

      {/* Top Banner Section */}
      <section className='py-5 sm:h-[70vh] h-auto' style={{ backgroundColor: categoryData?.bannerBgColor || serverData?.bannerBgColor }}>
        <div className="sm:max-w-8xl max-w-[95%] mx-auto">
          {/* Breadcrumb Navigation */}
          <div className='flex gap-2 pb-4 items-center'>
            <IoHomeOutline size={20} className="text-gray-600" />
            <LiaAngleRightSolid className="text-gray-500" />
            <h6 className='flex items-center gap-2'>
              <Link to={'/'} className='text-[#213554] hover:text-[#EE334B] transition-colors duration-200'>
                Home
              </Link>
              {(categoryData?.brandId?.name || serverData?.brandId?.name) && (
                <>
                  <LiaAngleRightSolid className="text-gray-500" />
                  <Link
                    to={`/${categoryData?.brandId?.slug || serverData?.brandId?.slug}`}
                    className='text-[#213554] hover:text-[#EE334B] transition-colors duration-200 capitalize'
                  >
                    {categoryData?.brandId?.name || serverData?.brandId?.name}
                  </Link>
                </>
              )}
              {(categoryData?.title || serverData?.title) && (
                <>
                  <LiaAngleRightSolid className="text-gray-500" />
                  <span className='text-gray-600 capitalize'>
                    {categoryData?.title || serverData?.title}
                  </span>
                </>
              )}
            </h6>
          </div>
          <div className='flex sm:flex-row items-center flex-col gap-8 lg:gap-12'>
            {/* Left Side - Text Content */}
            <div className='sm:w-1/2 w-full'>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {categoryData?.subTitle || serverData?.subTitle || 'Bespoke Packaging Solutions for Car Parts, Tools, and Accessories'}
              </h1>
              <p dangerouslySetInnerHTML={{ __html: categoryData?.description }} className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">

              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  label="Get an Instant Quote"
                  className="bg-[#2D5016] hover:bg-[#3A6B1F] text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                />
                <Link to="/dielines">
                  <Button
                    label="Explore Shapes & Styles"
                    className="bg-[#2D5016] hover:bg-[#3A6B1F] text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  />
                </Link>
              </div>
            </div>

            {/* Right Side - Product Display */}
            <div className='sm:w-1/2 w-full'>
              {categoryData?.image || serverData?.image ? (
                <div className="relative">
                  <img
                    src={`${BaseUrl}/${categoryData?.image || serverData?.image}`}
                    alt={categoryData?.imageAltText || serverData?.imageAltText || categoryData?.title || serverData?.title}
                    className=" mx-auto rounded-xl object-cover"
                    loading="eager"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
      
      {/* Bottom Hero - Show only if enabled in admin */}
      {(categoryData?.showBottomHero || serverData?.showBottomHero) && (
        <BottomHero />
      )}

      {/* Trust Banner - Show only if enabled in admin */}
      {(categoryData?.showTrustBanner || serverData?.showTrustBanner) && (
        <TrustBanner
          categoryName={categoryData?.title || serverData?.title}
        />
      )}
      
      {/* Service Selection Cards - Show only if enabled in admin */}
      {(categoryData?.showServiceSelectionCard || serverData?.showServiceSelectionCard) && (
        <ServiceSelectionCard items={serviceSelectionData} />
      )}

      <CategoryTestimonials/>

      {/* Boxes Brands Section */}
      <BoxesBrands
        title={`X Custom Packaging X Top ${categoryData?.title || serverData?.title || ''} Brands`}
        description="We don't just make packaging, we build brand moments! We have helped brands thrive in the market. Read their success stories below!"
        products={allProducts && allProducts.length > 0 ? allProducts.slice(0, 10) : []}

      />

      <section className='py-8 bg-white'>
        <div className="sm:max-w-8xl max-w-[95%] mx-auto">
          <div className=' flex sm:flex-row flex-col items-center justify-between gap-4'>
            <div className="flex items-center gap-4">
              <div className="w-1 h-12 bg-gradient-to-b from-[#EE334B] to-[#213554] rounded-full"></div>
              <div>
                <h2 className='text-3xl sm:text-4xl font-bold text-[#213554] text-left'>
                  {categoryData?.title || serverData?.title || 'Products'}
                </h2>
                <p className='text-gray-600 mt-1'>
                  We cover all your packaging needs. Can't find yours?
                </p>
              </div>
            </div>
            <Link to="" className="group">
              <p className='font-bold text-[#EE334B] flex items-center hover:text-[#213554] transition-colors duration-300 uppercase text-sm'>
                View all <FaAngleRight className="ml-1 group-hover:translate-x-1 transition-transform duration-300" size={15} />
              </p>
            </Link>
          </div>
        </div>
      </section>


      <div className=" sm:max-w-8xl w-[95%] md:px-5 px-3 mx-auto pb-10">

        <div className="flex  sm:flex-row flex-col pt-4 gap-12">



          <div className=" sm:max-w-8xl w-full mx-auto">
            <ProductSelectionProvider>
              <div className="grid  gap-6 grid-cols-5">
                {/* Loading Skeletons */}
                {loading && loadingProducts.length > 0 && loadingProducts.map((_, index) => (
                  <div className=' w-full' key={`loading-${index}`}>
                    <div className="animate-pulse">
                      <div className="bg-gray-200 rounded-lg w-full sm:h-62 h-48 mb-2"></div>
                      <div className="bg-gray-200 rounded h-4 w-3/4 mx-auto mb-2"></div>
                      <div className="bg-gray-200 rounded h-3 w-1/2 mx-auto"></div>
                    </div>
                  </div>
                ))}

                {/* Actual Products - Show even when loading more */}
                {allProducts?.map((item, index) => {
                  return (
                    <ProductCard
                      key={item._id || index}
                      data={item}
                      disableSelection={false}
                    />
                  );
                })}

              </div>
            </ProductSelectionProvider>
            {currentPage < totalPages && (
              <div className="flex justify-center mt-8">
                <Button
                  label={loadingMore ? "Loading..." : "Explore More"}
                  className="bg-gradient-to-r from-[#213554] to-[#213554]/90 hover:from-[#EE334B] hover:to-[#EE334B]/90 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={loadMoreProducts}
                  disabled={loadingMore || loading}
                />
              </div>
            )}
          </div>
        </div>
      </div>


      <CategoryBanner
        title={categoryData?.bannerTitleFirst || serverData?.bannerTitleFirst}
        content={categoryData?.bannerContentFirst || serverData?.bannerContentFirst}
        image={categoryData?.bannerImageFirst || serverData?.bannerImageFirst}
        imageAltText={categoryData?.bannerImageFirstAltText || serverData?.bannerImageFirstAltText}
        buttonLabel="Get Custom Quote"
        onButtonClick={() => setIsModalOpen(true)}
      />


<OfferCard 
  title={'Looking For Other Custom Boxes And packaging?'} 
  subTitle={'Chat live with our packaging experts now for a free consultation and insert price quote.'} 
  buttonText={'Contact Us'} 
  buttonIcon={<RiPhoneLine size={18} />}
/>

      {/* Packaging Features - 6 Items */}
      <PackagingFeatures />
      <div className="bg-white sm:max-w-8xl pt-8 max-w-[95%] mx-auto">
          <h2 className="text-3xl font-bold text-center mb-5 text-[#213554]">
            Get the Inserts Your Product Needs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { img: insert1, title: 'Foam Inserts' },
              { img: insert2, title: 'Cardboard Inserts' },
              { img: insert3, title: 'Clamshell Inserts' },
              { img: insert4, title: 'Corrugated Inserts' },
              { img: insert4, title: 'Corrugated Inserts' },
              { img: insert5, title: 'Eva Foam Inserts' }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl text-center border border-gray-100 hover:border-[#EE334B]/20 hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col items-center p-4 overflow-hidden"
              >
                <div className="relative mb-4 w-40 h-40 mx-auto aspect-square">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-[#EE334B]/30 transition-all duration-300">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover aspect-square transform transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  {/* Hover Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full"></div>
                  {/* Shine Effect - Sweeps across on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-full"></div>
                </div>
                <div className='px-2 pb-2'>
                  <h6 className="font-semibold group-hover:text-[#EE334B] transition-colors duration-300">{item.title}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      {/* Creative Gallery - Dynamic */}
      <section className='py-10'>
        <CreativeGallery
          products={allProducts && allProducts.length > 0 ? allProducts : []}
          title={`${categoryData?.title || serverData?.title || 'Custom'} Gallery`}
          description="Explore our premium collection of custom packaging solutions"
        />
      </section>


      <section className='mb-8'>
        <div className="sm:max-w-8xl bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 sm:p-12 shadow-md max-w-[95%] mx-auto border border-gray-100">
          <div className="text-center mb-8">

            <h2 className='text-3xl sm:text-4xl font-bold text-[#213554] mb-4'>
              Learn More About Custom Bakery Boxes
            </h2>
            <h3 className='text-xl sm:text-2xl font-semibold text-[#213554]/80 pt-2'>
              Keep Your Baked Goods Fresh & Preserved with Durable Custom Bakery Boxes
            </h3>
          </div>

          <div
            className='prose prose-sm sm:prose-base max-w-none text-gray-700 leading-relaxed'
            dangerouslySetInnerHTML={{ __html: categoryData?.description || serverData?.description }}
            style={{
              lineHeight: '1.75'
            }}
          ></div>

        </div>
      </section>





      {/* Tabs Section */}
      <section className='sm:max-w-8xl max-w-[95%] mx-auto'>
        <div className="mt-10">
          <Tabs className={' bg-white'} defaultTab={"Base Materials"} tabs={tabsData} />
        </div>
      </section>


  {/* Tabs Section - tabsData2 with 4 cards per tab */}
  <section className='sm:max-w-8xl max-w-[95%] mx-auto'>
        <div className="mt-10">
          <Tabs className={' bg-white'} defaultTab={"Materials"} tabs={tabsData2} />
        </div>
      </section>



      {/* Only show FAQ section if FAQs exist */}
      {((categoryData?.qna && categoryData.qna.length > 0) || (serverData?.qna && serverData.qna.length > 0)) && (
        <FAQ
          serverData={categoryData?.qna || serverData?.qna}
          faqImageUrl={categoryData?.faqImage || serverData?.faqImage}
          faqImageAltText={categoryData?.faqImageAltText || serverData?.faqImageAltText}
        />
      )}

      {/* Packaging Journey Section */}
      <PackagingJourney products={galleryVideo} />
      <InstantQuoteModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        categoryData={categoryData || serverData}
      />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #EE334B 0%, #213554 100%);
          border-radius: 10px;
          border: none;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #EE334B 0%, #213554 100%);
          opacity: 0.9;
        }
        
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #EE334B #f1f1f1;
        }
      `}</style>

    </>
  )
}

export default SubCategory;