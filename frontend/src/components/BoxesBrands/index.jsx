import { Star } from 'lucide-react'
import React from 'react'
import CardSlider from '../common/CardSlider';
import { BaseUrl } from '../../utils/BaseUrl';
import { Link } from 'react-router-dom';

const BoxesBrands = ({ title, description, products = [], brands = [] }) => {
  // Use products if available, otherwise use brands
  const itemsToShow = products && products.length > 0 ? products : brands;
  
  // Don't render if no items
  if (!itemsToShow || itemsToShow.length === 0) {
    return null;
  }
  
  return (
    <section className="py-12 px-4 sm:max-w-8xl w-[95%] mx-auto">
      {/* Header Text */}
      <div className="text-center mb-10">
        <h2 className='text-3xl sm:text-4xl font-bold text-[#213554] mb-2'>
          {title}
        </h2>
        <p className="text-gray-600 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
          {description}
        </p>
      </div>
      <CardSlider
        items={itemsToShow?.map((brand, index) => {
         const brandLogo = brand?.images?.[0]?.url ? `${BaseUrl}/${brand?.images?.[0]?.url}` : brand?.logo;
         const brandName = brand?.name;
         const brandImage = brand?.images?.[0]?.url ? `${BaseUrl}/${brand?.images?.[0]?.url}` : brand?.image;
         const brandSlug = brand?.slug;
         const brandDescription = brand?.description || brand?.title || description;

          return (
            <div 
              key={brand?._id || brand?.name || index} 
              className="flex-none w-[280px] md:w-[350px] flex flex-col items-center flex-shrink-0"
            >
              {/* Flip Card Container */}
              <div className="relative mt-10 w-full h-[420px] flip-card-container">
                <div className="flip-card-inner">
                  {/* Front Side - Brand Image */}
                  <div className="flip-card-front">
                    <div className="relative w-full h-full">
                      {brandSlug ? (
                        <Link to={`/product/${brandSlug}`}>
                          <div className="rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-lg h-full">
                            <img
                              src={brandImage}
                              alt={`${brandName} packaging`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/320x400";
                              }}
                            />
                          </div>
                        </Link>
                      ) : (
                        <div className="rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-lg h-full">
                          <img
                            src={brandImage}
                            alt={`${brandName} packaging`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/320x400";
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Back Side - Brand Info with Logo */}
                  <div className="flip-card-back bg-gradient-to-br from-[#213554] to-[#EE334B] rounded-[2.5rem] p-6 flex flex-col justify-center items-center text-center shadow-lg relative">
                    {/* Floating Brand Logo - Only visible on back side */}
                    <div className="  w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden z-10 bg-white transition-transform duration-300 hover:scale-110">
                      <img 
                        src={brandLogo} 
                        alt={brandName} 
                        className="w-full h-full object-contain p-2" 
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/80";
                        }}
                      />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 mt-8">
                      {brandName}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed break-words whitespace-normal px-2">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius, fugit! Incidunt sequi, ab commodi corrupti sint est sit officiis. Perferendis eius necessitatibus ullam hic doloremque minus soluta voluptas sapiente ratione?
                    </p>
                   
                  </div>
                </div>
              </div>

              {/* Brand Name Below Card */}
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2 transition-colors duration-300">
                  {brandName}
                </h3>
              </div>
            </div>
          );
        })}
      />
      
      <style>{`
        .flip-card-container {
          perspective: 1000px;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.7s;
          transform-style: preserve-3d;
        }
        .flip-card-container:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  )
}

export default BoxesBrands
