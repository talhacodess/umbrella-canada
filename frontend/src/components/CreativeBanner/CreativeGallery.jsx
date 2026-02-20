import React, { useState, useMemo, useEffect } from 'react';
import { BaseUrl } from '../../utils/BaseUrl';
import { Link } from 'react-router-dom';

const CreativeGallery = ({ products = [], title, description }) => {
  const images = useMemo(() => {
    if (products && products.length > 0) {
      return products.slice(0, 5).map((product, index) => ({
        id: product._id || index,
        url: `${BaseUrl}/${product?.images?.[0]?.url}`,
        title: product?.name || `Product ${index + 1}`,
        slug: product?.slug,
      }));
    }
    return [];
  }, [products]);

  const [activeImage, setActiveImage] = useState(() => {
    // Initialize with first image from products array
    if (products && products.length > 0 && products[0]?.images?.[0]?.url) {
      return `${BaseUrl}/${products[0]?.images?.[0]?.url}`;
    }
    return null;
  });

  // Update activeImage when images array changes (only if activeImage is not set or not in images)
  useEffect(() => {
    if (images && images.length > 0 && images[0]?.url) {
      // Check if current activeImage exists in images array
      const isActiveImageInImages = images.some(img => img.url === activeImage);
      // Update only if activeImage is not set or not found in images
      if (!activeImage || !isActiveImageInImages) {
        setActiveImage(images[0].url);
      }
    }
  }, [images]);

  // Don't render if no products
  if (!products || products.length === 0 || !images || images.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-10 px-6" id="brand-details-section">
      <div className="max-w-8xl mx-auto">
         <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <div className="w-20 h-1 bg-gradient-to-r from-[#EE334B] to-[#213554] mx-auto rounded-full"></div>
            </div>
            <h2 className='text-3xl sm:text-4xl font-bold text-[#213554] mb-2'>
              {title || "Your Packaging Journey Starts Here!"}
            </h2>
            <p className='text-gray-600 text-lg'>
              {description || "Discover how quality packaging makes all the difference! Experience real client experiences, expert tips, and innovative packaging solutions that enhance brands. From custom designs to seamless functionality, see how we bring packaging visions to life."}
            </p>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10">
          {/* Main Featured Image */}
          <div className="md:col-span-8 group relative overflow-hidden rounded-[2.5rem] bg-white p-3 shadow-xl shadow-slate-200/50 border border-lime-100">
            {(() => {
              const currentImage = images.find(img => img.url === activeImage) || images[0];
              const imageUrl = activeImage || images[0]?.url;
              
              if (!imageUrl) return null;
              
              return currentImage?.slug ? (
                <div >
                  <div className="overflow-hidden rounded-[2rem] h-[400px] sm:h-[450px] md:h-[500px] cursor-pointer">
                    <img
                      src={imageUrl}
                      alt={currentImage?.title || "Featured Packaging"}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
              ) : (
                <div className="overflow-hidden rounded-[2rem] h-[400px] sm:h-[450px] md:h-[500px]">
                  <img
                    src={imageUrl}
                    alt={currentImage?.title || "Featured Packaging"}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              );
            })()}
          </div>

          {/* Side Grid */}
          <div className="md:col-span-4 flex flex-col gap-4 sm:gap-6">
            {images[1] && (
              images[1].slug ? (
                <div >
                  <div className="h-[180px] sm:h-[220px] md:h-[240px] group relative overflow-hidden rounded-[2rem] bg-white p-3 shadow-lg border border-lime-100 cursor-pointer">
                    <img src={images[1].url} alt={images[1].title || "Detail"} className="w-full h-full object-cover rounded-[1.5rem]" />
                  </div>
                </div>
              ) : (
                <div className="h-[180px] sm:h-[220px] md:h-[240px] group relative overflow-hidden rounded-[2rem] bg-white p-3 shadow-lg border border-lime-100">
                  <img src={images[1].url} alt={images[1].title || "Detail"} className="w-full h-full object-cover rounded-[1.5rem]" />
                </div>
              )
            )}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {images[2] && (
                images[2].slug ? (
                  <div>
                    <div className="h-[180px] sm:h-[220px] md:h-[240px] rounded-[1.5rem] overflow-hidden border-2 border-lime-200 p-1 bg-white cursor-pointer">
                      <img src={images[2].url} alt={images[2].title || "Detail 2"} className="w-full h-full object-cover rounded-[1.2rem]" />
                    </div>
                  </div>
                ) : (
                  <div className="h-[180px] sm:h-[220px] md:h-[240px] rounded-[1.5rem] overflow-hidden border-2 border-lime-200 p-1 bg-white">
                    <img src={images[2].url} alt={images[2].title || "Detail 2"} className="w-full h-full object-cover rounded-[1.2rem]" />
                  </div>
                )
              )}
              {images[3] && (
                images[3].slug ? (
                  <div>
                    <div className="h-[180px] sm:h-[220px] md:h-[240px] rounded-[1.5rem] overflow-hidden border-2 border-lime-200 p-1 bg-white cursor-pointer">
                      <img src={images[3].url} alt={images[3].title || "Detail 3"} className="w-full h-full object-cover rounded-[1.2rem]" />
                    </div>
                  </div>
                ) : (
                  <div className="h-[180px] sm:h-[220px] md:h-[240px] rounded-[1.5rem] overflow-hidden border-2 border-lime-200 p-1 bg-white">
                    <img src={images[3].url} alt={images[3].title || "Detail 3"} className="w-full h-full object-cover rounded-[1.2rem]" />
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        
        <div className="relative group">
          <div className="flex items-center gap-4 overflow-x-auto pb-4 scroll-smooth no-scrollbar">
            {images.map((img) => (
              <button
                key={img.id}
                onClick={() => setActiveImage(img.url)}
                className={`flex-shrink-0 w-32 h-20 rounded-2xl overflow-hidden border-4 transition-all duration-300 ${
                  activeImage === img.url 
                    ? 'border-lime-400 scale-105 shadow-lg' 
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img.url} className="w-full h-full object-cover" alt={img.title} />
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default CreativeGallery;