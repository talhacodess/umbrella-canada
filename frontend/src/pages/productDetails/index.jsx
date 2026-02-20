import React, { useEffect, useState } from 'react'
import Tabs from '../../components/common/Tabs'
import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi'
import Input from '../../components/common/Input'
import Select from '../../components/common/Select'
import Textarea from '../../components/common/Textarea'
import Button from '../../components/common/Button'
import { IoHomeOutline } from 'react-icons/io5'
import { LiaAngleRightSolid } from 'react-icons/lia'
import BottomHero from '../../components/Hero/BottomHero'
import ProductDetail from '../../components/common/ProductDetail'
import axios from 'axios'
import { BaseUrl } from '../../utils/BaseUrl'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../store/productSlice'
import { IoSearch } from 'react-icons/io5'
import PageMetadata from '../../components/common/PageMetadata'
import { prefetchProductsBatch, getCachedProduct } from '../../utils/prefetchUtils'
import Container from '../../components/common/Container'
import CardSlider from '../../components/common/CardSlider'
import ProductCard from '../../components/common/ProductCard'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { RiShoppingCartLine } from 'react-icons/ri'

// Skeleton shimmer animation style
const shimmerStyle = {
    animation: 'shimmer 2s infinite linear',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
    backgroundSize: '200% 100%'
}

// Add shimmer keyframes to document head
if (typeof document !== 'undefined' && !document.getElementById('shimmer-style')) {
    const style = document.createElement('style');
    style.id = 'shimmer-style';
    style.textContent = `
        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
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

const ProductDetails = ({
    serverData,
    children: slides,
    autoSlide = false,
    autoSlideInterval = 3000,
}) => {
    const { slug } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [product, setProduct] = useState(serverData || null);
    const [relatedProduct, setRelatedProduct] = useState([])
    const [loading, setLoading] = useState(!serverData); // Don't show loading if serverData exists
    const [isLoading, setIsLoading] = useState(false);
    const [curr, setCurr] = useState(0);
    const [materialCurr, setMaterialCurr] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [loadedImages, setLoadedImages] = useState(new Set());
    const [thumbnailLoadedImages, setThumbnailLoadedImages] = useState(new Set());
    const [cartQuantity, setCartQuantity] = useState(1);

    const initialFormState = {
        name: "",
        email: "",
        companyName: "",
        phoneNumber: "",
        boxStyle: "",
        length: "",
        width: "",
        depth: "",
        unit: "Inches",
        stock: "Stock",
        color: "Colors",
        printingSides: "Inside",
        quantity: "",
        addons: "",
        image: null,
        message: "",
        pageUrl: typeof window !== "undefined" ? window.location.href : ""
    };

    const [formData, setFormData] = useState(initialFormState);

    const validate = () => {
        return (
            formData.boxStyle &&
            formData.length &&
            formData.width &&
            formData.depth &&
            formData.quantity
        );
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }

            const response = await axios.post(`${BaseUrl}/requestQuote/create`, formDataToSend);

            if (response.data.status === 'success') {
                navigate('/thank-you-page')
                setIsLoading(false);
                setFormData(initialFormState);
            } else {
                toast.error(response.data.message)
                setIsLoading(false);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
            setIsLoading(false);
        }
    };

    const fetchProducts = async () => {
        setLoading(true);
        try {
            // Check cache first for instant loading
            const cachedProduct = getCachedProduct(slug);
            if (cachedProduct) {
                setProduct(cachedProduct);
                setCurr(0);
                setSelectedImage(null);
                setCurrentIndex(0);
                // Preload first image immediately for instant display
                if (cachedProduct?.images && cachedProduct.images.length > 0) {
                    const firstImage = new Image();
                    firstImage.src = `${BaseUrl}/${cachedProduct.images[0].url}`;
                    firstImage.onload = () => {
                        setLoadedImages(prev => new Set([...prev, 0]));
                    };
                    firstImage.onerror = () => {
                        setLoadedImages(prev => new Set([...prev, 0]));
                    };
                }
                setLoading(false);
                return;
            }

            const response = await axios.get(`${BaseUrl}/products/get?slug=${slug}`)
            const productData = response?.data?.data;
            setProduct(productData);
            setCurr(0);
            setSelectedImage(null);
            setCurrentIndex(0);
            
            // Preload first image immediately for instant display
            if (productData?.images && productData.images.length > 0) {
                const firstImage = new Image();
                firstImage.src = `${BaseUrl}/${productData.images[0].url}`;
                firstImage.onload = () => {
                    setLoadedImages(prev => new Set([...prev, 0]));
                };
                firstImage.onerror = () => {
                    setLoadedImages(prev => new Set([...prev, 0]));
                };
            }
        } catch (err) {
            console.error('Error fetching product:', err);
        } finally {
            setLoading(false);
        }
    }

    const fetchRelatedProducts = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/products/related-products?slug=${slug}`)
            setRelatedProduct(response?.data?.data)
            
            // Prefetch related products immediately for fast navigation
            if (response?.data?.data?.relatedProducts && response.data.data.relatedProducts.length > 0) {
                prefetchProductsBatch(response.data.data.relatedProducts, {
                    batchSize: 5,
                    delayBetweenBatches: 50,
                    priority: true
                });
            }
        } catch (err) {
            console.error('Error fetching related products:', err);
        }
    }

    useEffect(() => {
        // Reset states when slug changes
        setProduct(null);
        setRelatedProduct([]);
        setCurr(0);
        setSelectedImage(null);
        setCurrentIndex(0);
        setLoadedImages(new Set());
        setThumbnailLoadedImages(new Set());
        
        // If serverData is provided and matches current slug, use it first
        if (serverData && serverData.slug === slug) {
            setProduct(serverData);
            // Preload first image immediately
            if (serverData.images && serverData.images.length > 0) {
                const firstImage = new Image();
                firstImage.src = `${BaseUrl}/${serverData.images[0].url}`;
                firstImage.onload = () => {
                    setLoadedImages(prev => new Set([...prev, 0]));
                };
                firstImage.onerror = () => {
                    setLoadedImages(prev => new Set([...prev, 0]));
                };
            }
            fetchRelatedProducts();
        }
        
        // Always fetch fresh data to ensure we have the latest
        fetchProducts();
        fetchRelatedProducts();
    }, [slug])

    // Use product images from API only (no default fallback images)
    const images = product?.images?.length
        ? product.images.map(img => `${BaseUrl}/${img.url}`)
        : [];

    const prev = () =>
        setCurr((curr) =>
            curr === 0
                ? images.length - 1
                : curr - 1
        );

    const next = () =>
        setCurr((curr) =>
            curr === images.length - 1
                ? 0
                : curr + 1
        );

    useEffect(() => {
        if (!autoSlide) return;
        const slideInterval = setInterval(next, autoSlideInterval);
        return () => clearInterval(slideInterval);
    }, [images]);

    const goToSlide = (index) => {
        setCurr(index);
    };

    const openImageViewer = (image, index) => {
        if (product?.images?.[index]) {
            setSelectedImage(product.images[index]);
            setCurrentIndex(index);
            setIsViewerOpen(true);
            document.body.style.overflow = 'hidden';
        }
    };

    const closeImageViewer = () => {
        setIsViewerOpen(false);
        document.body.style.overflow = 'auto';
    };

    const goToPrevious = () => {
        if (product?.images?.length) {
            const newIndex = (currentIndex - 1 + product.images.length) % product.images.length;
            setSelectedImage(product.images[newIndex]);
            setCurrentIndex(newIndex);
        }
    };

    const goToNext = () => {
        if (product?.images?.length) {
            const newIndex = (currentIndex + 1) % product.images.length;
            setSelectedImage(product.images[newIndex]);
            setCurrentIndex(newIndex);
        }
    };

    useEffect(() => {
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    // Keyboard navigation for image viewer
    useEffect(() => {
        if (!isViewerOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closeImageViewer();
            } else if (e.key === 'ArrowLeft' && product?.images?.length > 1) {
                goToPrevious();
            } else if (e.key === 'ArrowRight' && product?.images?.length > 1) {
                goToNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isViewerOpen]);

    
    const materialSlides = [
        {
            title: "White",
            image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
        },
        {
            title: "Card Stock",
            image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
        },
        {
            title: "Corrugated",
            image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
        },
        {
            title: "Foil",
            image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
        },
        {
            title: "Foil",
            image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
        },
        {
            title: "Foil",
            image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
        },
        {
            title: "Foil",
            image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
        },
        {
            title: "Foil",
            image: "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg",
        }

    ];

    const materialChunks = [];
    for (let i = 0; i < materialSlides.length; i += 4) {
        materialChunks.push(materialSlides.slice(i, i + 4));
    }

    const prevMaterial = () => {
        setMaterialCurr((prevIndex) =>
            prevIndex === 0 ? materialChunks.length - 1 : prevIndex - 1
        );
    };

    const nextMaterial = () => {
        setMaterialCurr((prevIndex) =>
            prevIndex === materialChunks.length - 1 ? 0 : prevIndex + 1
        );
    };

    const data = [
        {
            title: "MATERIALS",
            content: (
                <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <div className="lg:w-6/12 w-full">
                        <h3 className="text-lg font-semibold text-[#213554]">
                            Discover our range of high-quality packaging materials
                        </h3>
                        <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                            Discover our range of high-quality packaging materials designed to
                            tailor your packaging order to perfection. From sturdy cardboard
                            boxes to eco-friendly options, we have the ideal materials for your
                            unique needs. Elevate your brand and protect your products with our
                            customizable packaging solutions.
                        </p>
                    </div>

                    <div className="lg:w-6/12 w-full">
                        <div className="relative rounded-2xl pb-12 overflow-hidden bg-white/50">
                            <div className="overflow-hidden">
                                <div
                                    className="flex transition-transform duration-500 ease-out"
                                    style={{
                                        transform: `translateX(-${materialCurr * 100}%)`,
                                    }}
                                >
                                    {materialChunks.map((chunk, chunkIndex) => (
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
                                    onClick={prevMaterial}
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gradient-to-r hover:from-[#213554] hover:to-[#213554]/90 hover:shadow-lg transition-all duration-300 group"
                                >
                                    <TfiAngleLeft size={18} className="text-[#213554] group-hover:text-white transition-colors duration-300" />
                                </button>
                                <button
                                    type="button"
                                    onClick={nextMaterial}
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gradient-to-r hover:from-[#213554] hover:to-[#213554]/90 hover:shadow-lg transition-all duration-300 group"
                                >
                                    <TfiAngleRight size={18} className="text-[#213554] group-hover:text-white transition-colors duration-300" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "ADD-ONS & FINISHING",
            content: (
                <div className="flex flex-col lg:flex-row gap-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 shadow-lg p-6 sm:p-8">
                    <div className="lg:w-6/12 w-full">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-1 h-10 bg-gradient-to-b from-[#EE334B] to-[#213554] rounded-full"></div>
                            <h3 className="text-xl sm:text-2xl font-bold text-[#213554]">
                                Discover our range of high-quality packaging materials
                            </h3>
                        </div>
                        <p className="mt-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                            Discover our range of high-quality packaging materials designed to
                            tailor your packaging order to perfection. From sturdy cardboard
                            boxes to eco-friendly options, we have the ideal materials for your
                            unique needs. Elevate your brand and protect your products with our
                            customizable packaging solutions.
                        </p>
                    </div>

                    <div className="lg:w-6/12 w-full">
                        <div className="relative rounded-2xl pb-12 overflow-hidden bg-white/50">
                            <div className="overflow-hidden">
                                <div
                                    className="flex transition-transform duration-500 ease-out"
                                    style={{
                                        transform: `translateX(-${materialCurr * 100}%)`,
                                    }}
                                >
                                    {materialChunks.map((chunk, chunkIndex) => (
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
                                    onClick={prevMaterial}
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gradient-to-r hover:from-[#213554] hover:to-[#213554]/90 hover:shadow-lg transition-all duration-300 group"
                                >
                                    <TfiAngleLeft size={18} className="text-[#213554] group-hover:text-white transition-colors duration-300" />
                                </button>
                                <button
                                    type="button"
                                    onClick={nextMaterial}
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gradient-to-r hover:from-[#213554] hover:to-[#213554]/90 hover:shadow-lg transition-all duration-300 group"
                                >
                                    <TfiAngleRight size={18} className="text-[#213554] group-hover:text-white transition-colors duration-300" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "PAPER WEIGHT",
            content: <></>,
        },
        {
            title: "SHIPPING",
            content: <></>,
        }
      
    ]

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
                "name": product?.brandId?.name || "Category",
                "item": `${BaseUrl}/${product?.brandId?.slug || ''}`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": product?.name || "Product",
                "item": `${BaseUrl}/category/${slug || ''}`
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": product?.name || "Product",
                "item": `${BaseUrl}/${slug || ''}`
            }
        ]
    };

    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product?.name || serverData?.name,
        "image": product?.images?.[0]?.url ? `${BaseUrl}/${product.images[0].url}` : `${BaseUrl}/${serverData?.images?.[0]?.url}`,
        "description": product?.metaDescription || serverData?.metaDescription,
        "sku": "12345",
        "brand": {
            "@type": "Brand",
            "name": "Umbrella Custom Packaging"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "42",
        },
        "offers": {
            "@type": "Offer",
            "url": `https://umbrellapackaging.com/${product?.slug || serverData?.slug}`,
            "priceCurrency": "USD",
            "price": product?.actualPrice || serverData?.actualPrice,
            "priceValidUntil": product?.createdAt || serverData?.createdAt,
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition",
            "seller": {
                "@type": "Organization",
                "name": "Umbrella Custom Packaging"
            }
        }
    };

    return (
        <>
            {/* {product ? (
                <PageMetadata
                    title={product?.metaTitle}
                    description={product?.metaDescription || ""}
                    keywords={product?.keywords || ""}
                    ogUrl={`${BaseUrl}/category/${slug}`}
                    ogImage={`${BaseUrl}/${product?.images?.[0]?.url || serverData?.images?.[0]?.url || ""}`}
                    ogImageWidth="1200"
                    ogImageHeight="630"
                    canonicalUrl={`${BaseUrl}/${slug}`}
                    breadcrumbSchema={breadcrumbSchema}
                    productSchema={productSchema}
                    robots={product?.robots || serverData?.robots}
                />
            ) : null} */}

            <section className=' bg-[#F4F4F4] py-8'>
                <div className=' lg:max-w-8xl max-w-[95%]   flex lg:flex-row flex-col gap-4 mx-auto'>
                    <div className='  lg:w-6/12 '>
                        <div className=' flex gap-2 pb-5 items-center'>
                            <IoHomeOutline size={20} /> <LiaAngleRightSolid />
                            <h6 className=' flex items-center '>
                                <Link to={'/'} className='text-[#213554]'>Home</Link>
                                {product?.brandId?.name && (
                                    <>
                                        <LiaAngleRightSolid />
                                        <Link to={`/category/${product.brandId.slug}`} className='text-[#213554] capitalize'>
                                            {product.brandId.name}
                                        </Link>
                                    </>
                                )}
                                {product?.categoryId?.title && (
                                    <>
                                        <LiaAngleRightSolid />
                                        <Link to={`/category/${product.categoryId.slug}`} className='text-[#213554] capitalize'>
                                            {product.categoryId.title}
                                        </Link>
                                    </>
                                )}
                                {product?.name && (
                                    <>
                                        <LiaAngleRightSolid />
                                        <span>{product.name}</span>
                                    </>
                                )}
                            </h6>
                        </div>
                        <div className='w-full flex gap-7'>
                            <div className="  sm:block md:block hidden">
                                <div className="flex flex-col items-center justify-center gap-2">
                                    {images?.map((_, i) => (
                                        <div
                                            key={i}
                                            onClick={() => goToSlide(i)}
                                            className={`
                                                transition-all w-28 rounded-xl h-28 overflow-hidden bg-white relative cursor-pointer group
                                                ${curr === i ? " w-20 h-20 border-2 border-[#F05367] border-dashed ring-2 ring-[#F05367]/30" : "bg-opacity-50 hover:bg-opacity-100 hover:scale-105"}
                                            `}
                                        >
                                            {!thumbnailLoadedImages.has(i) && (
                                                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl overflow-hidden">
                                                    <div className="absolute inset-0" style={shimmerStyle}></div>
                                                </div>
                                            )}
                                            <img
                                                src={_}
                                                alt=""
                                                className={`w-full h-full object-center transition-opacity duration-300 ${
                                                    thumbnailLoadedImages.has(i) ? 'opacity-100' : 'opacity-0'
                                                }`}
                                                onLoad={() => setThumbnailLoadedImages(prev => new Set([...prev, i]))}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="overflow-hidden relative rounded-2xl group">
                                <div
                                    className="flex relative transition-transform ease-in-out duration-500 h-[90vh]"
                                    style={{ transform: `translateX(-${curr * 100}%)` }}
                                >
                                    {images?.map((image, i) => {
                                        const isFirstImage = i === 0;
                                        const isCurrentSlide = i === curr;
                                        const shouldShowSkeleton = !loadedImages.has(i) && !isFirstImage;
                                        
                                        return (
                                            <div key={i} className="flex-none w-full h-full rounded-2xl overflow-hidden relative">
                                                {shouldShowSkeleton && (
                                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 rounded-2xl overflow-hidden z-10">
                                                        <div className="absolute inset-0" style={shimmerStyle}></div>
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <div className="w-16 h-16 border-4 border-gray-200 border-t-[#213554] rounded-full animate-spin"></div>
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="relative w-full h-full overflow-hidden rounded-2xl">
                                                    <img
                                                        onClick={() => openImageViewer(product?.images?.[i] || { url: image }, i)}
                                                        src={image}
                                                        alt={product?.images?.[i]?.altText || ""}
                                                        loading={isFirstImage ? "eager" : "lazy"}
                                                        className={`w-full h-full cursor-pointer object-cover rounded-2xl transition-all duration-500 group-hover:scale-110 ${
                                                            loadedImages.has(i) || isFirstImage ? 'opacity-100' : 'opacity-0'
                                                        }`}
                                                        onLoad={() => {
                                                            setLoadedImages(prev => new Set([...prev, i]));
                                                        }}
                                                        onError={() => {
                                                            setLoadedImages(prev => new Set([...prev, i]));
                                                        }}
                                                    />
                                                    {/* Hover Overlay Gradient */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                                    {/* Shine Effect */}
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                {product?.images?.[curr] && (
                                    <div onClick={() => openImageViewer(product.images[curr], curr)} className=' flex justify-center items-center cursor-pointer w-10 h-10 bg-white rounded-full absolute top-3 right-3'>
                                        <IoSearch size={25} />
                                    </div>
                                )}
                                <button
                                    onClick={prev}
                                    className=" w-12 h-12 shadow rounded-full cursor-pointer  absolute left-5 top-56 flex  justify-center items-center bg-white/80 text-gray-800 hover:bg-white"
                                >
                                    <TfiAngleLeft size={20} className="" />
                                </button>
                                <button
                                    onClick={next}
                                    className=" w-12 h-12  rounded-full absolute cursor-pointer right-5 top-56 flex justify-center items-center shadow bg-white/80 text-gray-800 hover:bg-white"
                                >
                                    <TfiAngleRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="pt-3.5 lg:w-6/12 w-full">
                    <div className=' flex gap-2 items-center  mb-4'>
                    <div className="w-1 h-12 bg-gradient-to-b from-[#EE334B] to-[#213554] rounded-full"></div>
                    <h3 className=' pb-2 text-xl sm:text-2xl font-bold text-[#213554]'>{product?.name || "Tuck Top Mailer Boxes"}</h3>
                    </div>

                        <form onSubmit={handleSubmit}>
                            <div className=' grid grid-cols-2 pb-2 gap-2'>
                                <div className=" w-full">
                                    <Input
                                        label="Name"
                                        star={"*"}
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Name"
                                        required
                                    />
                                </div>
                                <div className=" w-full">
                                    <Input
                                        label="Email"
                                        star={"*"}
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        required
                                    />
                                </div>
                                <div className=" w-full">
                                    <Input
                                        label="Phone Number"
                                        star={"*"}
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        placeholder="Phone Number"
                                    />
                                </div>
                                <div className=" w-full">
                                    <Input
                                        label="Company Name"
                                        star={"*"}
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        placeholder="Company Name"
                                    />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-2">
                                <div className=" w-full">
                                    <Input
                                        label="Box Style"
                                        star={"*"}
                                        name="boxStyle"
                                        value={formData.boxStyle}
                                        onChange={handleChange}
                                        placeholder="Box Style"
                                        required
                                    />
                                </div>
                                <div className=" w-full">
                                    <Input
                                        label="Size (Length)"
                                        star={"*"}
                                        name="length"
                                        type="number"
                                        value={formData.length}
                                        onChange={handleChange}
                                        placeholder="Length"
                                        required
                                    />
                                </div>
                                <div className=" w-full">
                                    <Input
                                        label="Size (Width)"
                                        star={"*"}
                                        name="width"
                                        type="number"
                                        value={formData.width}
                                        onChange={handleChange}
                                        placeholder="width"
                                        required
                                    />
                                </div>
                                <div className=" w-full">
                                    <Input
                                        label="Size (Depth)"
                                        star={"*"}
                                        name="depth"
                                        type="number"
                                        value={formData.depth}
                                        onChange={handleChange}
                                        placeholder="Depth"
                                        required
                                    />
                                </div>
                                <div className=" w-full">
                                    <Select
                                        label="Unit"
                                        name="unit"
                                        value={formData.unit}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value={'Inches'}>Inches</option>
                                        <option value={'mm'}>mm</option>
                                        <option value={'cm'}>cm</option>
                                    </Select>
                                </div>
                                <div className=" w-full">
                                    <Select
                                        label="Stock"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value={'Stock'}>Stock</option>
                                        <option value={'12pt Cardboard'}>12pt Cardboard</option>
                                        <option value={'14pt Cardboard'}>14pt Cardboard</option>
                                        <option value={'16pt Cardboard'}>16pt Cardboard</option>
                                        <option value={'18pt Cardboard'}>18pt Cardboard</option>
                                        <option value={'20pt Cardboard'}>20pt Cardboard</option>
                                        <option value={'22pt Cardboard'}>22pt Cardboard</option>
                                        <option value={'24pt Cardboard'}>24pt Cardboard</option>
                                        <option value={'White SBS C1S C25'}>White SBS C1S C25</option>
                                        <option value={'Corrugated'}>Corrugated</option>
                                        <option value={'Rigid'}>Rigid</option>
                                        <option value={'Kraft'}>Kraft</option>
                                        <option value={'Linen'}>Linen</option>
                                    </Select>
                                </div>
                                <div className=" w-full">
                                    <Select
                                        label="Colors"
                                        name="color"
                                        value={formData.color}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value={'Colors'}>Colors</option>
                                        <option value={'Plain (No Printing)'}>Plain (No Printing)</option>
                                        <option value={'1 Color'}>1 Color</option>
                                        <option value={'2 Color'}>2 Color</option>
                                        <option value={'3 Color'}>3 Color</option>
                                        <option value={'4 Color'}>4 Color</option>
                                        <option value={'4/1 Color'}>4/1 Color</option>
                                        <option value={'4/2 Color'}>4/2 Color</option>
                                        <option value={'4/3 Color'}>4/3 Color</option>
                                        <option value={'4/4 Color'}>4/4 Color</option>
                                    </Select>
                                </div>
                                <div className=" w-full">
                                    <Select
                                        label="Printing Sides"
                                        name="printingSides"
                                        value={formData.printingSides}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value={'Inside'}>Inside</option>
                                        <option value={'Outside'}>Outside</option>
                                        <option value={'Both (Inside & Outside)'}>Both (Inside & Outside)</option>
                                    </Select>
                                </div>
                                <div className=" w-full">
                                    <Input
                                        label="Quantity"
                                        star={"*"}
                                        name="quantity"
                                        type="number"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        placeholder="Quantity"
                                        required
                                    />
                                </div>
                                <div className=" w-full">
                                    <Select
                                        label="Add-Ons"
                                        name="addons"
                                        value={formData.addons}
                                        onChange={handleChange}
                                        placeholder="Select Add-Ons"
                                    >
                                        <option value={''}></option>
                                        <option value={'Foiling'}>Foiling</option>
                                        <option value={'Spot UV'}>Spot UV</option>
                                        <option value={'Embossing'}>Embossing</option>
                                        <option value={'Debossing'}>Debossing</option>
                                        <option value={'handles'}>handles</option>
                                        <option value={'Inserts'}>Inserts</option>
                                        <option value={'Windows'}>Windows</option>
                                    </Select>
                                </div>
                                <div className="col-span-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="design_upload"
                                            className="block pb-1.5 text-[#213554] text-sm font-semibold mb-1"
                                        >
                                            Upload Your Design
                                            <span className="text-[#EE334B] ml-1">*</span>
                                        </label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#213554] transition-all duration-300 bg-gradient-to-br from-gray-50 to-white group cursor-pointer flex flex-col justify-center" style={{ minHeight: '120px', height: '100%' }}>
                                            <input
                                                type="file"
                                                name="image"
                                                id="design_upload"
                                                onChange={handleChange}
                                                className="hidden"
                                                accept=".png,.pdf,.jpg,.jpeg,.webp"
                                            />
                                            <label htmlFor="design_upload" className="cursor-pointer flex flex-col items-center">
                                                <div className="w-12 h-12 bg-gradient-to-br from-[#213554]/10 to-[#EE334B]/10 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                                                    <svg className="w-6 h-6 text-[#213554]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                </div>
                                                <p className="text-sm text-[#213554] font-semibold mb-0.5 group-hover:text-[#EE334B] transition-colors duration-300">
                                                    {formData.image ? formData.image.name : 'Click to upload or drag and drop'}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Max Size: 5MB | Allowed: PNG, PDF, JPG, JPEG, WEBP
                                                </p>
                                                {formData.image && (
                                                    <div className="mt-2 px-3 py-1.5 bg-[#213554]/10 text-[#213554] rounded-lg text-xs font-medium">
                                                        ✓ {formData.image.name}
                                                    </div>
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <Textarea
                                            label="Description"
                                            name="message"
                                            star={"*"}
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={7}
                                            placeholder="Tell us the size / dimensions, material, finising, add-ons, and design preferences."
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className=" w-full  flex justify-end mt-4">
                                    <Button
                                        type="submit"
                                        label={isLoading ? "Sending..." : "Request A Quote"}
                                        className={`bg-[#213554] w-full text-white ${!validate() || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        disabled={!validate() || isLoading}
                                    />
                                </div>
                            </div>
                            
                        </form>

                        
                    </div>
                </div>
            </section>
            <BottomHero />
            <section className='sm:max-w-8xl max-w-[95%] mt-10 mx-auto'>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
                    {/* Small Product Image Preview - Left Side */}
                    {images && images.length > 0 && (
                        <div className="w-full sm:w-64 md:w-64 flex-shrink-0">
                            <div className="rounded-lg overflow-hidden border-2 border-[#213554]/20 shadow-md hover:shadow-lg transition-all duration-300">
                                <img
                                    src={images[curr]}
                                    alt={product?.images?.[curr]?.altText || product?.name || "Product Image"}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>
                    )}
                    
                    {/* Right Side Content */}
                    <div className="flex-1 w-full">
                            {/* Quantity Selector and Add to Cart Button - Below Form */}
                            <div className="mt-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                                {/* Quantity Selector */}
                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-semibold text-[#213554] hidden sm:block">Quantity:</label>
                                    <div className="flex items-center border-2 border-[#213554] rounded-lg overflow-hidden bg-white">
                                        <button
                                            type="button"
                                            onClick={() => setCartQuantity(prev => prev > 1 ? prev - 1 : 1)}
                                            className="px-3 py-2 text-[#213554] hover:bg-[#213554] hover:text-white transition-colors duration-200 font-semibold"
                                        >
                                            −
                                        </button>
                                        <input
                                            type="number"
                                            min="1"
                                            value={cartQuantity}
                                            onChange={(e) => {
                                                const value = parseInt(e.target.value) || 1;
                                                setCartQuantity(value >= 1 ? value : 1);
                                            }}
                                            className="w-16 sm:w-20 px-3 py-2 text-center text-[#EE334B] font-bold text-lg border-0 focus:outline-none focus:ring-0"
                                            style={{ color: '#EE334B' }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setCartQuantity(prev => prev + 1)}
                                            className="px-3 py-2 text-[#213554] hover:bg-[#213554] hover:text-white transition-colors duration-200 font-semibold"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Add to Cart Button */}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (product) {
                                            dispatch(addToCart({
                                                _id: product._id,
                                                name: product.name,
                                                price: product.actualPrice || 0,
                                                quantity: cartQuantity,
                                                image: product.images?.[0]?.url || '',
                                                slug: product.slug
                                            }));
                                            toast.success(`${cartQuantity} ${cartQuantity === 1 ? 'item' : 'items'} added to cart!`);
                                            setCartQuantity(1);
                                            // Navigate to cart page
                                            navigate('/cart');
                                        }
                                    }}
                                    className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#EE334B] hover:bg-[#EE334B]/90 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                                    style={{ color: '#ffffff' }}
                                >
                                    {/* Cart Icon */}
                                    <RiShoppingCartLine size={20} className="text-white" style={{ color: '#ffffff' }} />
                                    
                                    {/* Button Text */}
                                    <span className="text-base sm:text-lg text-white font-semibold" style={{ color: '#ffffff' }}>
                                        Add to Cart
                                    </span>
                                </button>
                            </div>

{/* Buy Now Button and Product Information - Below Form */}
<div className="mt-6">
                            {/* Buy Now Button - Red Bar */}
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (product) {
                                        dispatch(addToCart({
                                            _id: product._id,
                                            name: product.name,
                                            price: product.actualPrice || 0,
                                            quantity: 1,
                                            image: product.images?.[0]?.url || '',
                                            slug: product.slug
                                        }));
                                        toast.success('Product added to cart!');
                                        // Navigate to cart page
                                        navigate('/cart');
                                    }
                                }}
                                className="w-full mb-4 bg-[#EE334B] hover:bg-[#EE334B]/90 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl"
                                style={{ color: '#ffffff' }}
                            >
                                <RiShoppingCartLine size={24} className="text-white" style={{ color: '#ffffff' }} />
                                <span className="text-lg" style={{ color: '#ffffff' }}>Buy Now</span>
                            </button>

                            {/* Product Information Display - Compact */}
                            <div className="bg-gray-50 rounded-lg p-3">
                                <div className="grid grid-cols-3 gap-2">
                                    {/* Product Name */}
                                    <div className="flex flex-col">
                                        <div className="bg-[#213554] text-white font-semibold py-2.5 px-2 rounded-lg text-center text-xs mb-1">
                                            Product Name
                                        </div>
                                        <div className="text-black font-medium py-1 px-2 text-center text-xs sm:text-sm">
                                            {product?.name || "Custom Window Bakery Boxes"}
                                        </div>
                                    </div>
                                    {/* Size */}
                                    <div className="flex flex-col">
                                        <div className="bg-[#213554] text-white font-semibold py-2.5 px-2 rounded-lg text-center text-xs mb-1">
                                            Size
                                        </div>
                                        <div className="text-black font-medium py-1 px-2 text-center text-xs sm:text-sm">
                                            {product?.size || "8 x 6 x 4 inch"}
                                        </div>
                                    </div>
                                    {/* Price */}
                                    <div className="flex flex-col">
                                        <div className="bg-[#213554] text-white font-semibold py-2.5 px-2 rounded-lg text-center text-xs mb-1">
                                            Price
                                        </div>
                                        <div className="text-black font-medium py-1 px-2 text-center text-xs sm:text-sm">
                                            ${product?.actualPrice || "2.50"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
              {/* Learn More About Section - Moved up and Modernized */}
              {product?.description && (
                <section className='sm:max-w-8xl max-w-[95%] mx-auto pt-8'>
                    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-1 h-12 bg-gradient-to-b from-[#EE334B] to-[#213554] rounded-full"></div>
                            <h2 className='text-2xl sm:text-3xl font-bold text-[#213554]'>
                                Learn More About {product?.name}
                            </h2>
                        </div>
                        <div className='pt-2'>
                            <div 
                                className='prose prose-sm sm:prose-base max-w-none text-gray-700 leading-relaxed'
                                dangerouslySetInnerHTML={{ __html: product?.description}}
                                style={{
                                    lineHeight: '1.75'
                                }}
                            ></div>
                        </div>
                    </div>
                </section>
            )}
            
           
          

<section className=' sm:max-w-8xl max-w-[95%] mx-auto'>
                <div className="mt-10">
                    <Tabs defaultTab={"MATERIALS"} tabs={data} />
                </div>
            </section>
            <section className=' pt-12 pb-5'>
                <div className=" sm:max-w-8xl  justify-between gap-5  max-w-[95%]  flex sm:flex-row flex-col  mx-auto">
                    <div className=' sm:w-6/12 w-full'>
                        <h2 className=' py-2'>{product?.bannerTitle}</h2>
                        <p className=' py-2' dangerouslySetInnerHTML={{ __html: product?.bannerContent}}></p>
                    </div>
                    {product?.bannerImage && (
                        <div className=' sm:w-5/12 w-full'>
                            <img 
                                src={`${BaseUrl}/${product.bannerImage}`}
                                className='  shadow-2xl w-full rounded-2xl' 
                                alt={product?.name || ''} 
                            />
                        </div>
                    )}
                </div>
            </section>
          


          
                <section className="py-8 sm:max-w-8xl max-w-[95%] mx-auto">
                    <div className='mb-8 flex sm:flex-row flex-col items-center justify-between gap-4'>
                        <div className="flex items-center gap-4">
                            <div className="w-1 h-12 bg-gradient-to-b from-[#EE334B] to-[#213554] rounded-full"></div>
                            <div>
                                <h2 className='text-2xl sm:text-3xl font-bold text-[#213554]'>Related Products</h2>
                                <p className='text-gray-600 text-sm mt-1'>Discover packaging tailored for your products</p>
                            </div>
                        </div>
                        <Link to="" className="group">
                            <div className='font-bold text-[#EE334B] flex items-center hover:text-[#213554] transition-colors duration-300 uppercase text-sm px-4 py-2 rounded-lg hover:bg-[#EE334B]/10'>
                                View all <FaAngleRight className="ml-1 group-hover:translate-x-1 transition-transform duration-300" size={15} />
                            </div>
                        </Link>
                    </div>
                    
                    {relatedProduct?.relatedProducts && relatedProduct.relatedProducts.length > 0 && (
                        <div className="relative border-gray-100">
                            <CardSlider
                                top={50}
                                items={relatedProduct.relatedProducts.map((item, index) => (
                                    <div key={item?._id || index} className="w-[280px] sm:w-[320px] md:w-[350px] lg:w-[390px] flex-shrink-0 px-2 h-full">
                                        <ProductCard data={item} disableSelection={true} />
                                    </div>
                                ))}
                            />
                        </div>
                    )}
                </section>
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
                    {product?.images?.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goToPrevious();
                            }}
                            className="absolute left-6 z-10 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-gradient-to-r hover:from-[#213554] hover:to-[#213554]/90 hover:border-[#213554] hover:scale-110 cursor-pointer hover:shadow-xl flex justify-center items-center transition-all duration-300 group"
                        >
                            <FaAngleLeft className="text-xl group-hover:scale-110 transition-transform duration-300" />
                        </button>
                    )}

                    {/* Image Container */}
                    <div 
                        className="max-w-6xl max-h-[90vh] overflow-auto rounded-2xl bg-white/5 backdrop-blur-sm p-4 custom-scrollbar"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={`${BaseUrl}/${selectedImage.url}`}
                            alt={selectedImage.altText || 'Product Image'}
                            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl animate-zoomIn"
                        />
                    </div>

                    {/* Next Button */}
                    {product?.images?.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goToNext();
                            }}
                            className="absolute right-6 z-10 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-gradient-to-r hover:from-[#213554] hover:to-[#213554]/90 hover:border-[#213554] hover:scale-110 cursor-pointer hover:shadow-xl flex justify-center items-center transition-all duration-300 group"
                        >
                            <FaAngleRight className="text-xl group-hover:scale-110 transition-transform duration-300" />
                        </button>
                    )}

                    {/* Image Counter */}
                    {product?.images?.length > 1 && (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg">
                            <span className="text-white/90">{currentIndex + 1}</span>
                            <span className="mx-2 text-white/50">/</span>
                            <span className="text-white/90">{product?.images?.length || 0}</span>
                        </div>
                    )}

                    {/* Thumbnail Strip (Optional - shows at bottom) */}
                    {product?.images?.length > 1 && product.images.length <= 10 && (
                        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 max-w-4xl overflow-x-auto px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 custom-scrollbar">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedImage(img);
                                        setCurrentIndex(idx);
                                    }}
                                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                                        currentIndex === idx
                                            ? 'border-[#EE334B] ring-2 ring-[#EE334B]/50 scale-110'
                                            : 'border-white/20 hover:border-white/40 hover:scale-105'
                                    }`}
                                >
                                    <img
                                        src={`${BaseUrl}/${img.url}`}
                                        alt={img.altText || `Thumbnail ${idx + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default ProductDetails

