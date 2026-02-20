import Hero from '../../components/Hero'
import { BaseUrl } from '../../utils/BaseUrl'
import React, { lazy, Suspense, useEffect, useState } from 'react'
import { prefetchSubCategory, prefetchProducts } from '../../utils/prefetchUtils'
import axios from 'axios'
import BottomHero from '../../components/Hero/BottomHero'
import OfferCard from '../../components/common/OfferCard'
import google from '../../assets/images/footer/google-reviws-logo.webp';
import kraftPackagingBanner from '../../assets/images/goScreen.webp';
import Category from '../../components/Category'
import CategoryBoxes from '../../components/CategoryBoxes'
import FeaturesPackaging from '../../components/FeaturesPackaging'
import PageMetadata from '../../components/common/PageMetadata'
import SpecialPackaging from '../../components/SpecialPackaging/SpecialPackaging'
import WeFulfil from '../../components/WeFulfil/WeFulfil'
import CustomPackagingProduced from '../../components/CustomPackagingProduced'
import PackagingBanner from '../../components/common/PackagingBanner'
import CustomPackagingApart from '../../components/CustomPackagingApart/CustomPackagingApart'
import PersonalTestimonial from '../../components/PersonalTestimnonial/PersonalTestimonial'
import CustomBoxMaterial from '../../components/CustomBoxMaterial/CustomBoxMaterial'
import Tabs from '../../components/common/Tabs'
import WorkWithYou from '../../components/WorkWithYou'
import CustomInserts from '../../components/CustomInserts'
import BannerContent from '../../components/BannerContent'

// Lazy load below-the-fold components for better FCP
const FAQ = lazy(() => import('../../components/FAQ/FAQ'))
const InspirationPackaging = lazy(() => import('../../components/InspirationPackaging'))
const Testimonials = lazy(() => import('../../components/Testimonials'))
const GetPriceQuote = lazy(() => import('../../components/GetPriceQuote/GetPriceQuote'))
const Blog = lazy(() => import('../../components/blog/Blog'))
export const Home = React.memo(({ homePageData }) => {
  useEffect(() => {
    const heroSubCategories = [
      'fashion-apparel-packaging-boxes',
      'food-packaging-boxes',
      'cbd-packaging-boxes',
      'custom-cardboard-boxes'
    ];

    heroSubCategories.forEach(slug => {
      prefetchSubCategory(slug, true);
    });

    prefetchSubCategory('kraft-packaging-boxes', true);

    // Prefetch popular products from first page (non-blocking, lower priority)
    // This helps when users navigate to product pages
    const prefetchPopularProducts = async () => {
      try {
        // Small delay to not block initial page render
        setTimeout(async () => {
          const response = await axios.get(`${BaseUrl}/products/getAll?page=1&perPage=10`, {
            timeout: 8000
          });
          const products = response?.data?.data || [];
          if (products.length > 0) {
            // Extract slugs and prefetch first 5 popular products
            const productSlugs = products
              .slice(0, 5)
              .filter(p => p?.slug)
              .map(p => p.slug);
            if (productSlugs.length > 0) {
              prefetchProducts(productSlugs, false); // false = lower priority
            }
          }
        }, 500); // Delay to not block initial render
      } catch (error) {
        // Silently fail - prefetch is optional
      }
    };

    prefetchPopularProducts();
  }, []); // Run only once on mount
// Run only once on mount
  const metadata = {
    title: "Affordable, High-Quality Custom Packaging Boxes – Wholesale | Umbrella Custom Packaging",
    description: "Get high-quality custom packaging boxes at wholesale prices. We offer affordable packaging for businesses of all sizes. Enjoy bulk discounts, free design support, and fast shipping.",
    keywords: "x custom packaging, wholesale boxes, packaging solutions, affordable packaging, custom boxes, packaging design, eco-friendly packaging",
    author: "X Custom Packaging",
    canonicalUrl: BaseUrl,
    robots: 'noindex, nofollow',
    ogUrl: BaseUrl,
    // ogImage: `${BaseUrl}${Hero1}`,
    ogImageWidth: "768",
    ogImageHeight: "499",
    ogImageType: "images/webp",
    modifiedTime: "2025-06-13T15:18:43+00:00",
    homeSchema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "X Custom Packaging",
      "hasMap": "https://www.google.com/maps/place/X+Custom+Packaging+USA/@34.0304757,-118.4009978,17z/data=!3m2!4b1!5s0x80c2bbd3055d51a3:0x68496cbd465819b1!4m6!3m5!1s0x80c2bbbf80eec803:0x8425555061bf7fe8!8m2!3d34.0304757!4d-118.4009978!16s%2Fg%2F11smvg80n4?entry=ttu&g_ep=EgoyMDI1MDcxMy4wIKXMDSoASAFQAw%3D%3D",
      "url": "https://xcustompackaging.com",
      // "logo": `${BaseUrl}${logo}`,
      // "image": `${BaseUrl}${Hero1}`,
      "telephone": "+1-747-247-0456",
      "description": "Get high-quality custom packaging boxes at wholesale prices. We offer affordable packaging for businesses of all sizes. Enjoy bulk discounts, free design support, and fast, reliable shipping. Order now for unmatched prices!",
      "founder": {
        "@type": "Person",
        "name": "Scott Ray"
      },
      "foundingDate": "2020-06-01",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "9854 National Blvd #1042",
        "addressLocality": "Los Angeles",
        "addressRegion": "CA",
        "postalCode": "90034",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 34.030563,
        "longitude": -118.40069
      },
      "priceRange": "$$",
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "Eco-Friendly Materials",
          "value": "Yes"
        }
      ],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
          ],
          "opens": "09:00",
          "closes": "18:00"
        }
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+1-747-247-0456",
          "contactType": "sales",
          "contactOption": "TollFree",
          "areaServed": "US",
          "availableLanguage": "en",
          "email": "sales@xcustompackaging.com"
        }
      ],
      "sameAs": [
        "https://www.upwork.com/xcustompackaging",
        "https://www.facebook.com/xcustompackaging",
        "https://www.instagram.com/xcustompackaging/",
        "https://www.youtube.com/channel/UCkxeWyAJqxjFSzlbnSoIVLQ",
        "https://www.linkedin.com/company/xcustompackaging/",
        "https://x.com/xcustompackaging"
      ]
    }

  };

  const [activeTab, setActiveTab] = useState("material");


  // Simple loading fallback component
  const LoadingFallback = ({ height = 'h-64' }) => (
    <div className={`${height} w-full bg-gray-100 animate-pulse rounded-lg`} />
  )
  const packagingTabs = [
    {
      title: "Custom Box Material",
      content: (
        <Suspense fallback={<LoadingFallback height="h-96" />}>
          <CustomBoxMaterial />
        </Suspense>
      )
    },
    {
      title: "Special Packaging",
      content: (
        <Suspense fallback={<LoadingFallback height="h-96" />}>
          <SpecialPackaging />
        </Suspense>
      )
    }
  ];
  return (
    <>
      <PageMetadata {...metadata} />

      <main>
        {/* Above the fold - load immediately */}
        <Hero />
        <BottomHero />
        <CategoryBoxes />
    
        <OfferCard discount={'Get 40%'} title={'Saving on Buying the Bulk'} />
        <Category serverData={homePageData?.topProducts} />
        
        <div className="w-full max-w-[95%] sm:max-w-8xl mx-auto mt-10 px-2 sm:px-4">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
           
            {/* <div className="flex md:flex-col flex-row w-full md:w-auto justify-center md:justify-start gap-2 md:gap-3 px-2">
              {[
                { key: "material", label: "Custom Box Material" },
                { key: "special", label: "Special Packaging" }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`
        flex items-center justify-center text-[11px] md:text-sm font-semibold
        flex-1 md:flex-none
        w-auto md:w-14
        h-12 md:h-64
        px-2 md:px-0
        rounded-lg
        bg-gradient-to-r md:bg-gradient-to-b from-[#EE334B] to-[#EE334B]/90
        text-white
        shadow-md transition-all duration-300
        ${activeTab === tab.key
                      ? "ring-2 ring-[#213554]"
                      : "opacity-80 hover:opacity-100"
                    }
      `}
                >
                  <span style={{ color: 'white' }} className="text-center leading-tight md:[writing-mode:vertical-rl] md:[text-orientation:mixed]">
                    {tab.label}
                  </span>
                </button>
              ))}
            </div> */}


           
            <div className="flex-1 w-full min-w-0 mt-6 md:mt-0">
              {activeTab === "material" && (
                <Suspense fallback={<LoadingFallback />}>
                  <CustomBoxMaterial />
                </Suspense>
              )}

              {activeTab === "special" && (
                <Suspense fallback={<LoadingFallback />}>
                  <SpecialPackaging />
                </Suspense>
              )}
            </div>
          </div>
        </div>
        <CustomPackagingProduced />
       
        <div className=' pt-5'>
          <Suspense fallback={<LoadingFallback height="h-64" />}>
            <GetPriceQuote />
          </Suspense>
        </div>
        <div className='flex flex-col gap-8 my-12 bg-[#F6F6F6]'>
          <div>
            {/* <div className="  mt-8  sm:max-w-8xl bg-[#fff] p-8 flex sm:flex-row flex-col gap-5 justify-between items-center rounded-xl max-w-[95%] mx-auto">
              <div>
                <img src={google} alt='' loading="lazy" />
              </div>
              <div>
                <a href="https://www.google.com/search?q=Umbrella+Custom+Packaging+USA+Reviews&rlz=1C1RXMK_en-GBPK1190PK1190&oq=umbre&gs_lcrp=EgZjaHJvbWUqCAgBEEUYJxg7MgYIABBFGEEyCAgBEEUYJxg7MhIIAhAuGCcYrwEYxwEYgAQYigUyDwgDEC4YQxixAxiABBiKBTIGCAQQRRg5MgYIBRBFGDwyBggGEEUYPTIGCAcQRRg80gEIMzgzN2owajeoAgCwAgA&sourceid=chrome&ie=UTF-8#lrd=0x80c2bbbf80eec803:0x8425555061bf7fe8,3,,,," target="_blank" rel="noopener noreferrer">
                  <button className='px-6 py-2.5 rounded-lg flex bg-blue-500 text-white  hover:bg-[#EE334B] hover:text-white hover:border-[#EE334B] text-sm items-center justify-center gap-2 
      transition-all duration-300 ease-in-out transform 
      hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed'>Review us on Google</button>
                </a>
              </div>
            </div> */}
            <div className="mt-8 sm:max-w-8xl bg-gradient-to-r from-[#213554] to-[#213554]/95 p-8 flex sm:flex-row flex-col gap-5 justify-between items-center rounded-2xl max-w-[95%] mx-auto shadow-xl">
        <div>
          <img src={google} alt='Google Reviews' className="filter brightness-0 invert" />
        </div>
        <div>
        <a href="https://www.google.com/search?q=Umbrella+Custom+Packaging+USA+Reviews&rlz=1C1RXMK_en-GBPK1190PK1190&oq=umbre&gs_lcrp=EgZjaHJvbWUqCAgBEEUYJxg7MgYIABBFGEEyCAgBEEUYJxg7MhIIAhAuGCcYrwEYxwEYgAQYigUyDwgDEC4YQxixAxiABBiKBTIGCAQQRRg5MgYIBRBFGDwyBggGEEUYPTIGCAcQRRg80gEIMzgzN2owajeoAgCwAgA&sourceid=chrome&ie=UTF-8#lrd=0x80c2bbbf80eec803:0x8425555061bf7fe8,3,,,," target="_blank" rel="noopener noreferrer"
        >
  <button className='px-8 py-3 rounded-lg flex bg-white text-[#213554] hover:bg-[#EE334B] hover:text-white font-semibold text-sm items-center justify-center gap-2 
      transition-all duration-300 ease-in-out transform 
      hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'>
            Review us on Google
          </button>

        </a>

        
        </div>
      </div>
          </div>
          <div>
            {/* Below the fold - lazy loaded with Suspense */}
            <Suspense fallback={<LoadingFallback height="h-96" />}>
              <Testimonials />
            </Suspense>
          </div>

        </div>
        <WorkWithYou/>
        <CustomInserts/>
        
        
        <CustomPackagingApart />
        {/* <FeaturesPackaging /> */}
        {/* <OfferCard discount={'Save 30%'} title={'on Bulk Orders'} subTitle={'Need more this year?'} /> */}





        
        <PackagingBanner title={'Go green with Kraft packaging.'} bgImage={kraftPackagingBanner} subTitle={'X Custom Packaging Cares About Its Environment'} url={'/shop'} />

        <WeFulfil />


        <Suspense fallback={<LoadingFallback height="h-96" />}>
          <InspirationPackaging />
        </Suspense>
       
        <Suspense fallback={<LoadingFallback height="h-96" />}>
          <PersonalTestimonial />
        </Suspense>
        <BannerContent serverData={homePageData?.banner} />
       
        <Suspense fallback={<LoadingFallback height="h-96" />}>
          <FAQ serverData={homePageData?.faqs} />
        </Suspense>
        <Suspense fallback={<LoadingFallback height="h-96" />}>
          <Blog />
        </Suspense>

      </main>
    </>
  )
})