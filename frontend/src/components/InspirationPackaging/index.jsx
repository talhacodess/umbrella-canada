import React, { useState, useEffect, useCallback, useRef } from "react";
import Button from "../common/Button";
import { Link } from "react-router-dom";
import { gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8, gallery9,gallery10,gallery11,gallery12,gallery13,gallery14,gallery15 } from "../../assets";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { Navigation, Autoplay, Mousewheel, Keyboard, EffectCoverflow } from 'swiper/modules';

// Add animations to document head
if (typeof document !== 'undefined' && !document.getElementById('gallery-modal-animations')) {
    const style = document.createElement('style');
    style.id = 'gallery-modal-animations';
    style.textContent = `
        @keyframes zoomIn {
            0% { transform: scale(0.9); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }
        .animate-zoomIn {
            animation: zoomIn 0.3s ease-out;
        }
        .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
        }
    `;
    document.head.appendChild(style);
}

const InspirationPackaging = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const swiperRef = useRef(null);
    const imageDescriptions = [
        "Eco-friendly cosmetic packaging with botanical design",
        "Luxury wine bottle with embossed label",
        "Minimalist food packaging with clean typography",
        "Sustainable product box with recycled materials",
        "Colorful retail packaging with geometric patterns",
        "Elegent gift box with ribbon closure",
        "Modern tech product packaging with sleek design",
        "Vintage-inspired packaging with nostalgic elements",
        "Creative product container with unique shape"
    ];

    const images = [
        { src: gallery1, alt: imageDescriptions[0] },
        { src: gallery2, alt: imageDescriptions[1] },
        { src: gallery5, alt: imageDescriptions[2] },
        { src: gallery9, alt: imageDescriptions[3] },
        { src: gallery6, alt: imageDescriptions[4] },
        { src: gallery7, alt: imageDescriptions[5] },
        { src: gallery8, alt: imageDescriptions[6] },
        { src: gallery3, alt: imageDescriptions[7] },
        { src: gallery4, alt: imageDescriptions[8] },
        { src: gallery10, alt: imageDescriptions[9] },
        { src: gallery11, alt: imageDescriptions[10] },
        { src: gallery12, alt: imageDescriptions[11] },
        { src: gallery13, alt: imageDescriptions[12] },
        { src: gallery14, alt: imageDescriptions[13] },
        { src: gallery15, alt: imageDescriptions[14] }  
    ];

    // Keyboard navigation for image viewer
    const handleKeyDown = useCallback((e) => {
        if (!isViewerOpen) return;
        
        switch(e.key) {
            case 'Escape':
                closeImageViewer();
                break;
            case 'ArrowLeft':
                goToPrevious();
                break;
            case 'ArrowRight':
                goToNext();
                break;
            default:
                break;
        }
    }, [isViewerOpen]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    const openImageViewer = useCallback((index) => {
        setSelectedImage(images[index].src);
        setCurrentIndex(index);
        setIsViewerOpen(true);
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
    }, [images]);

    const closeImageViewer = useCallback(() => {
        setIsViewerOpen(false);
        setSelectedImage(null);
        // Re-enable body scrolling
        document.body.style.overflow = 'unset';
    }, []);

    const goToPrevious = useCallback(() => {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        setSelectedImage(images[newIndex].src);
        setCurrentIndex(newIndex);
    }, [currentIndex, images]);

    const goToNext = useCallback(() => {
        const newIndex = (currentIndex + 1) % images.length;
        setSelectedImage(images[newIndex].src);
        setCurrentIndex(newIndex);
    }, [currentIndex, images]);

    // Preload images for better user experience
    useEffect(() => {
        images.forEach(image => {
            const img = new Image();
            img.src = image.src;
        });
    }, []);

    // Initialize Swiper properly after mount to show right side images
    useEffect(() => {
        if (swiperRef.current) {
            const swiper = swiperRef.current;
            // Wait for DOM and images to be ready
            const timer = setTimeout(() => {
                swiper.update();
                swiper.updateSlides();
                swiper.updateSlidesClasses();
                // Center to middle slide so both sides are visible
                const middleIndex = Math.floor(images.length / 2);
                swiper.slideTo(middleIndex, 0);
                // Start autoplay after initialization
                if (swiper.autoplay) {
                    swiper.autoplay.start();
                }
            }, 400);

            return () => clearTimeout(timer);
        }
    }, [images.length]);

    return (
        <div className="mx-auto overflow-x-hidden py-10 bg-[#f7f7f7]">
            <div className=" text-center">
                <h2 className="sm:text-[35px] text-[25px] font-bold text-[#213554] mb-3">
                   Our Design Department x Free Design Support 

                </h2>
                <p className="text-gray-600 text-sm sm:text-base mb-4  max-w-6xl mx-auto">
                  X Custom Packaging offers free design support to whoever comes to us and asks for it. Whether you place the order or not, we are there for you anytime. For expert advice, you can place your order on the website by filling out the form asking for design support, or send an email to <a href="mailto:sales@xcustompackaging.com">sales@xcustompackaging.com</a>. Just come to us, our dedicated design team will bring your vision to life.
                </p>
               
            </div>
            
            {/* Gallery Swiper Coverflow */}
            <div className='w-full mx-auto pb-8 pt-3 overflow-hidden'>
              <style>{`
                .gallery-center-swiper {
                  overflow: hidden !important;
                  padding: 20px 0;
                  width: 100%;
                  max-width: 100%;
                }
                .gallery-center-swiper .swiper {
                  overflow: visible !important;
                  width: 100%;
                  max-width: 100%;
                }
                .gallery-center-swiper .swiper-wrapper {
                  display: flex;
                  align-items: center;
                }
                .gallery-center-swiper .swiper-slide {
                  transition: all 0.4s ease;
                  opacity: 0.85;
                  transform: scale(0.8);
                  width: 450px !important;
                  min-width: 300px;
                  max-width: 500px;
                }
                .gallery-center-swiper .swiper-slide-active {
                  opacity: 1;
                  transform: scale(1.1);
                  z-index: 10;
                }
                .gallery-center-swiper .swiper-slide-prev,
                .gallery-center-swiper .swiper-slide-next {
                  opacity: 0.95;
                  transform: scale(0.9);
                }
                .gallery-center-swiper .swiper-button-next,
                .gallery-center-swiper .swiper-button-prev {
                  display: none !important;
                }
                .gallery-center-swiper .swiper-slide img {
                  transition: all 0.4s ease;
                }
                .gallery-center-swiper .swiper-slide-active img {
                  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                }
                @media (max-width: 640px) {
                  .gallery-center-swiper .swiper-slide {
                    transform: scale(0.9);
                    width: 340px !important;
                    min-width: 250px;
                    max-width: 350px;
                  }
                  .gallery-center-swiper .swiper-slide-active {
                    transform: scale(1.05);
                  }
                }
              `}</style>
              <Swiper
                modules={[Navigation, Autoplay, Mousewheel, Keyboard, EffectCoverflow]}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView="auto"
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2,
                  slideShadows: true,
                }}
                navigation={false}
                mousewheel={true}
                keyboard={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: false,
                }}
                loop={images.length > 5}
                spaceBetween={30}
                className="gallery-center-swiper mx-auto"
                initialSlide={Math.floor(images.length / 2)}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                  // Update Swiper after initialization
                  setTimeout(() => {
                    swiper.update();
                    swiper.updateSlides();
                    swiper.updateSlidesClasses();
                    // Ensure autoplay starts
                    if (swiper.autoplay) {
                      swiper.autoplay.start();
                    }
                  }, 200);
                }}
              >
                {images.map((img, index) => (
                  <SwiperSlide 
                    key={index}
                    style={{ width: '400px', maxWidth: '500px', minWidth: '300px' }}
                  >
                    <div 
                      className="block group relative mx-auto overflow-hidden rounded-[15px] cursor-pointer"
                      onClick={() => openImageViewer(index)}
                    >
                      <div className="relative overflow-hidden rounded-[15px] shadow-lg transition-all duration-300">
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="swiper-lazy rounded-[15px] w-full h-[450px] object-cover transition-transform duration-500 group-hover:scale-110"
                          loading={index < 3 ? "eager" : "lazy"}
                          onLoad={() => {
                            // Update Swiper when image loads to ensure all slides are visible
                            if (swiperRef.current) {
                              setTimeout(() => {
                                swiperRef.current.update();
                                swiperRef.current.updateSlides();
                                swiperRef.current.updateSlidesClasses();
                              }, 50);
                            }
                          }}
                        />
                        {/* Hover Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[15px]"></div>
                        {/* Shine Effect - Sweeps across on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-[15px]"></div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Image Viewer Modal */}
            {isViewerOpen && selectedImage && (
                <div 
                    className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
                    onClick={closeImageViewer}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeImageViewer}
                        className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
                    >
                        <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Previous Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            goToPrevious();
                        }}
                        className="absolute left-6 z-10 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-gradient-to-r hover:from-[#213554] hover:to-[#213554]/90 hover:border-[#213554] hover:scale-110 cursor-pointer hover:shadow-xl flex justify-center items-center transition-all duration-300 group"
                    >
                        <FaAngleLeft className="text-xl group-hover:scale-110 transition-transform duration-300" />
                    </button>

                    {/* Image Container */}
                    <div 
                        className="max-w-6xl max-h-[90vh] overflow-auto rounded-2xl bg-white/5 backdrop-blur-sm p-4 custom-scrollbar"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedImage}
                            alt={imageDescriptions[currentIndex]}
                            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl animate-zoomIn"
                        />
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            goToNext();
                        }}
                        className="absolute right-6 z-10 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-gradient-to-r hover:from-[#213554] hover:to-[#213554]/90 hover:border-[#213554] hover:scale-110 cursor-pointer hover:shadow-xl flex justify-center items-center transition-all duration-300 group"
                    >
                        <FaAngleRight className="text-xl group-hover:scale-110 transition-transform duration-300" />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg">
                        <span className="text-white/90">{currentIndex + 1}</span>
                        <span className="mx-2 text-white/50">/</span>
                        <span className="text-white/90">{images.length}</span>
                    </div>

                    {/* Thumbnail Strip */}
                    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 max-w-4xl overflow-x-auto px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 custom-scrollbar">
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedImage(img.src);
                                    setCurrentIndex(idx);
                                }}
                                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                                    currentIndex === idx
                                        ? 'border-[#EE334B] ring-2 ring-[#EE334B]/50 scale-110'
                                        : 'border-white/20 hover:border-white/40 hover:scale-105'
                                }`}
                            >
                                <img
                                    src={img.src}
                                    alt={img.alt || `Thumbnail ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default React.memo(InspirationPackaging);