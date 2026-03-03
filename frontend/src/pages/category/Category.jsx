import React, { useState, useEffect, useMemo, useRef } from 'react';
import { MdClose, MdChevronLeft, MdChevronRight, MdStar } from 'react-icons/md';
import Banner from '../../components/common/Banner';
import { Link, useSearchParams } from 'react-router-dom';
import ProductCardTwo, { ProductSelectionProvider } from '../../components/common/ProductCardTwo';
import axios from 'axios';
import { BaseUrl } from '../../utils/BaseUrl';
import Button from '../../components/common/Button';
import AnnouncementBanner from '../../components/AnnouncementBanner/index';
import { BiSolidCategory } from "react-icons/bi";
import {FaAngleRight} from 'react-icons/fa';
import Help from '../../components/help/index';

// Asset Imports
import bannerImage from '../../assets/images/Industry-standard.webp';
import Embossing from '../../assets/images/special/embossing.webp';
import Debossing from '../../assets/images/special/Debossing.webp';
import CustomFoiling from '../../assets/images/special/foiling.webp';
import SpotUV from '../../assets/images/special/spot uv.webp';
import MetallicPrinting from '../../assets/images/special/metalick printed.webp';
import PVCWindow from '../../assets/images/special/Pvc window.webp';
import CustomRibbons from '../../assets/images/special/Ribbon.webp';
import FoamInserts from '../../assets/images/Inserts/Foam inserts.webp';
import CardboardInserts from '../../assets/images/Inserts/cardboard.webp';
import ClamshellInserts from '../../assets/images/Inserts/Clamshell Inserts.webp';
import CorrugatedInserts from '../../assets/images/Inserts/Corrugated.webp';
import EvaFoamInserts from '../../assets/images/Inserts/eva foam inserts.webp';
import TemplatePage from '../../components/TemplatePage';
import categoryBanner from '../../assets/images/category-banner.webp'
import OfferCard from '../../components/common/OfferCard';
import FAQ from '../../components/FAQ/FAQ';
import Social from '../../components/Social';

const Category = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage] = useState(12);

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingFilters, setLoadingFilters] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- New State for Interactive Finishes ---
  const [selectedFinish, setSelectedFinish] = useState(null);
  const scrollRef = useRef(null);

  const selectedBrandId = searchParams.get('brandId');
  const selectedCategoryId = searchParams.get('categoryId');

  const currentCategoryName = useMemo(() => {
    if (!selectedCategoryId || categories.length === 0) return "Categories";
    const found = categories.find(c => c._id === selectedCategoryId);
    return found ? (found.title || found.name) : "Category";
  }, [selectedCategoryId, categories]);

  const specialFinishes = [
    { name: "Embossing", image: Embossing, rating: 4.8, reviews: "1.2k", price: "$15.00" },
    { name: "Debossing", image: Debossing, rating: 4.7, reviews: "900", price: "$16.50" },
    { name: "Custom Foiling", image: CustomFoiling, rating: 4.9, reviews: "2.1k", price: "$18.00" },
    { name: "Spot UV", image: SpotUV, rating: 4.6, reviews: "1.5k", price: "$14.99" },
    { name: "Metallic Printing", image: MetallicPrinting, rating: 4.7, reviews: "800", price: "$17.00" },
    { name: "PVC Window", image: PVCWindow, rating: 4.5, reviews: "400", price: "$22.00" },
    { name: "Custom Ribbons", image: CustomRibbons, rating: 4.9, reviews: "300", price: "$12.00" },
    { name: "Foam Inserts", image: FoamInserts, rating: 4.8, reviews: "1.1k", price: "$19.00" },
    { name: "Cardboard Inserts", image: CardboardInserts, rating: 4.4, reviews: "600", price: "$10.00" },
    { name: "Clamshell Inserts", image: ClamshellInserts, rating: 4.5, reviews: "200", price: "$25.00" },
    { name: "Corrugated Inserts", image: CorrugatedInserts, rating: 4.6, reviews: "750", price: "$13.00" },
    { name: "Eva Foam Inserts", image: EvaFoamInserts, rating: 4.9, reviews: "1.4k", price: "$21.00" },
  ];

  const scroll = (direction) => {
    const { current } = scrollRef;
    const scrollAmount = 400;
    if (direction === 'left') current.scrollLeft -= scrollAmount;
    else current.scrollLeft += scrollAmount;
  };

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [brandRes, catRes] = await Promise.all([
          axios.get(`${BaseUrl}/brands/getAll?all=true`),
          axios.get(`${BaseUrl}/category/getAll?page=1&perPage=100`)
        ]);
        if (brandRes.data.data) setBrands(brandRes.data.data);
        if (catRes.data.data) setCategories(catRes.data.data);
        setLoadingFilters(false);
      } catch (error) { console.error(error); setLoadingFilters(false); }
    };
    fetchFilters();
  }, []);

  const fetchProducts = async (page = 1, loadMore = false) => {
    if (page === 1) setLoading(true);
    else setLoadingMore(true);
    try {
      let url = `${BaseUrl}/products/getAll?page=${page}&perPage=${perPage}`;
      if (selectedBrandId) url += `&brandId=${selectedBrandId}`;
      if (selectedCategoryId) url += `&categoryId=${selectedCategoryId}`;
      const response = await axios.get(url);
      if (response?.data?.status === 'success' && response?.data?.data) {
        setProducts(loadMore ? [...products, ...response.data.data] : response.data.data);
        setCurrentPage(response?.data?.pagination?.page || page);
        setTotalPages(response?.data?.pagination?.totalPages || 1);
      }
    } catch (error) { console.error(error); }
    finally { setLoading(false); setLoadingMore(false); }
  };

  useEffect(() => { fetchProducts(1); }, [selectedBrandId, selectedCategoryId]);

  const handleBrandChange = (id) => {
    const params = new URLSearchParams(searchParams);
    id === selectedBrandId ? params.delete('brandId') : params.set('brandId', id);
    setSearchParams(params, { replace: true });
  };

  const handleCategoryChange = (id) => {
    const params = new URLSearchParams(searchParams);
    id === selectedCategoryId ? params.delete('categoryId') : params.set('categoryId', id);
    setSearchParams(params, { replace: true });
  };

  const clearFilters = () => setSearchParams({}, { replace: true });

  return (
    <>
      <AnnouncementBanner />
      <Banner subTitle={currentCategoryName} />

      <div className='relative'>
        <div className='bg-[#f7f7f7]'>
          <div className='sm:max-w-8xl w-[95%] mx-auto'>
            <div className="flex sm:flex-row flex-col pt-4 gap-6">
              <div className="sm:w-1/4 w-full hidden sm:block"></div>
              <div className="sm:w-3/4 w-full">
                <section className='py-5 sm:min-h-[40vh] h-auto'>
                  <div className="flex sm:flex-row items-center flex-col gap-8 lg:gap-12">
                    <div className='sm:w-6/10 w-full'>
                      <p className='text-base sm:text-lg text-gray-700 mb-6'>Over 190,000 ★★★★★ {currentCategoryName} reviews</p>
                      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 capitalize">{currentCategoryName}</h1>
                      <p className="text-base sm:text-lg text-gray-700 mb-6">Explore our premium {currentCategoryName} collection. High-quality and easy-to-customize.</p>
                      <div className="flex flex-wrap gap-4">
                        <Button onClick={() => setIsModalOpen(true)} label="Get Instant Quote" className="bg-[#2D5016] hover:bg-[#3A6B1F] text-white px-6 py-3 rounded-lg font-semibold" />
                        <Link to="/dielines"><Button label="Order Sample Kit" className="bg-[#2D5016] hover:bg-[#3A6B1F] text-white px-6 py-3 rounded-lg font-semibold" /></Link>
                      </div>
                    </div>
                    <div className='sm:w-4/10 w-full'>
                      <img src={bannerImage} alt={currentCategoryName} className="mx-auto rounded-xl object-cover" />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:max-w-8xl w-[95%] mx-auto pb-10">
          <div className="flex sm:flex-row flex-col pt-4 gap-6 items-start">
            {/* --- Sticky Sidebar --- */}
            <div className="sm:w-1/4 w-full  z-20">
              <div className="bg-white rounded-lg shadow-md p-4  absolute top-5 w-[23%] border border-gray-100">
                <div className="flex items-center justify-between mb-4 pb-3 border-b">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <BiSolidCategory className="text-[#AC292A]" /> Filters
                  </h3>
                  {(selectedBrandId || selectedCategoryId) && (
                    <button onClick={clearFilters} className="text-sm text-[#AC292A] hover:underline">Clear All</button>
                  )}
                </div>
                <div className="mb-6">
                  <h4 className="text-md font-semibold text-gray-700 mb-3">Brands</h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                    {brands.map((brand) => (
                      <label key={brand._id} className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer">
                        <input type="radio" checked={selectedBrandId === brand._id} onChange={() => handleBrandChange(brand._id)} className="accent-[#AC292A]" />
                        <span className="text-sm text-gray-700">{brand.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-md font-semibold text-gray-700 mb-3">Categories</h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                    {categories.map((category) => (
                      <label key={category._id} className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer">
                        <input type="radio" checked={selectedCategoryId === category._id} onChange={() => handleCategoryChange(category._id)} className="accent-[#AC292A]" />
                        <span className="text-sm text-gray-700">{category.title || category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* --- Products Grid --- */}
            <div className="sm:w-3/4 w-full pt-6">
              <h3 className="text-3xl font-bold text-gray-800 mb-4 capitalize">Explore all {currentCategoryName} options</h3>
              <p className="text-base sm:text-lg text-gray-700 mb-6 font-light">Choose from our premium selection of designs and materials.</p>

              {loading && products.length === 0 ? (
                <div className="text-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#AC292A] inline-block"></div></div>
              ) : (
                <ProductSelectionProvider>
                  <div className="grid gap-6 grid-cols-2 md:grid-cols-3">
                    {products.map((item, index) => <ProductCardTwo key={item._id || index} data={item} />)}
                  </div>
                  {currentPage < totalPages && (
                    <div className="flex justify-center mt-8">
                      <Button label={loadingMore ? "Loading..." : "Load More"} className="bg-[#213554] text-white px-8 py-3 rounded-lg" onClick={() => fetchProducts(currentPage + 1, true)} />
                    </div>
                  )}
                </ProductSelectionProvider>
              )}

              <hr className="my-16 border-gray-200" />

              {/* --- Interactive Special Finishes Section --- */}
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">Premium Special Finishes for {currentCategoryName}</h3>
                <div className="relative flex items-center px-4">
                  <button onClick={() => scroll('left')} className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-lg border hover:scale-110 transition-transform"><MdChevronLeft size={30} /></button>
                  <div ref={scrollRef} className='flex overflow-x-hidden scroll-smooth space-x-6 py-6 px-10'>
                    {specialFinishes.map((tab, index) => (
                      <div 
                        key={index} 
                        onClick={() => setSelectedFinish(tab)}
                        className={`flex-shrink-0 flex flex-col items-center gap-3 cursor-pointer transition-all duration-300 ${selectedFinish?.name === tab.name ? 'scale-110' : 'opacity-70 hover:opacity-100'}`}
                      >
                        <div className={`p-1 rounded-xl transition-all ${selectedFinish?.name === tab.name ? 'ring-2 ring-[#AC292A] ring-offset-2' : ''}`}>
                          <img src={tab.image} alt={tab.name} className="w-24 h-24 object-cover rounded-lg shadow-md border border-amber-50" />
                        </div>
                        <h4 className="uppercase text-[11px] font-bold text-gray-600 tracking-wider">{tab.name}</h4>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => scroll('right')} className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-lg border hover:scale-110 transition-transform"><MdChevronRight size={30} /></button>
                </div>
              </div>

              {/* --- Dynamic Content Detail Card --- */}
              {selectedFinish && (
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 animate-in fade-in slide-in-from-bottom-5 duration-500 mb-10">
                  <div className="flex flex-col lg:flex-row gap-10">
                    <div className="lg:w-1/2">
                      <img src={selectedFinish.image} alt={selectedFinish.name} className="w-full h-[400px] object-cover rounded-xl shadow-lg" />
                    </div>
                    <div className="lg:w-1/2 text-left">
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-4xl font-bold text-gray-900">{selectedFinish.name}</h2>
                        <button onClick={() => setSelectedFinish(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><MdClose size={24} /></button>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500 mb-4">
                        {[...Array(5)].map((_, i) => <MdStar key={i} />)}
                        <span className="text-gray-500 text-sm ml-2">{selectedFinish.rating} ({selectedFinish.reviews} reviews)</span>
                      </div>
                      <p className="text-gray-600 text-lg leading-relaxed mb-8">
                        Our {selectedFinish.name} provides a premium, high-end feel that instantly elevates your packaging. 
                        Perfect for luxury brands looking to create a tactile and memorable unboxing experience.
                      </p>
                      <div className="grid grid-cols-2 gap-6 mb-8 border-y py-6">
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">Key Features</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• High-definition finish</li>
                            <li>• Durable & scuff-resistant</li>
                            <li>• Eco-friendly materials</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">Best For</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Cosmetic Packaging</li>
                            <li>• Luxury Gift Boxes</li>
                            <li>• Jewelry Displays</li>
                          </ul>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                       
                        <Button label="Get Instant Quote" className="bg-[#61D2F1] hover:bg-[#4bc6e8] text-white px-10 py-4 rounded-xl font-bold shadow-lg transition-all" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/** Templates Section  */}
                <div>
                    <div className="text-left mb-8 inline-flex">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                        Explore our Popular templates
                    </h2>
                     <Link
                        to=""
                        className="ml-2 uppercase font-bold text-[#AC292A] inline-flex items-center align-baseline hover:opacity-80 transition-opacity"
                      >
                       See all templates
                        <FaAngleRight className="ml-1" size={15} />
                      </Link>
               
                </div>
            
              <TemplatePage/>
            

            </div>
            {/** Banner 1st */}
            <div>
              <OfferCard title={"Looking For Other Custom Boxes And packaging?"} subTitle={"Chat live with our packaging experts now for a free consultation and insert price quote."} buttonText='Contact Us' className={"rounded-tr-xl rounded-tl-xl"}/>
              <Help img={categoryBanner} title={"How would one define Automotive Boxes?"} description={"Our custom mailing packaging is designed to give your products a safe, clean, and professional home during shipping and display. Made from sturdy materials, these boxes are preferred because they don’t lose their shape even when holding heavy or fragile items. Flat shipped, easily assembled, and stacked neatly, these boxes are a go-to choice of most of the brands that aim to provide a polished experience to their customers. Ideal for e-commerce, gifts, or subscription deliveries, our mailer boxes balance structure and style to keep your packaging cohesive and presentable, no matter what is inside."} btn={"Get Custom Quote"} className={"rounded-bl-xl rounded-br-xl"}/>
            </div>
            {/** Social section */}
            <div><Social/></div>

            {/** FAQ Section  */}
            <div><FAQ/></div>
         
            </div>

          
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;