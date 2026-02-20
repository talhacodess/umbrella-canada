import React, { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'
import axios from 'axios'
import { BaseUrl } from '../../utils/BaseUrl'
import { FaStar } from 'react-icons/fa'
import google from '../../assets/images/footer/google-reviws-logo.webp'
import { logo } from '../../assets'
import trustpilot from '../../assets/images/footer/Trustpilot_logo.png'
import client from '../../assets/images/brand/client1.avif';
import categoryReview from '../../assets/images/category-review.webp';
const CategoryTestimonials = () => {
  const [ratings, setRatings] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const swiperRef = useRef(null)

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/rating/getAll`)
        const data = response?.data?.data || []
        setRatings(data)
        if (data.length > 0) {
          setSelectedIndex(0)
        }
      } catch (error) {
        console.error('Error fetching ratings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRatings()
  }, [])

  // Handle profile picture click to select testimonial
  const handleProfileClick = (index) => {
    setSelectedIndex(index)
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper
      if (ratings.length > 1 && swiper.params.loop) {
        // For loop mode, calculate the correct slide index
        const currentRealIndex = swiper.realIndex
        const diff = index - currentRealIndex
        swiper.slideToLoop(index)
      } else {
        swiper.slideTo(index)
      }
    }
  }

  // Handle swiper slide change
  const handleSlideChange = (swiper) => {
    // Handle loop mode - get real index
    let realIndex = swiper.activeIndex
    if (ratings.length > 1 && swiper.params.loop) {
      realIndex = swiper.realIndex
    }
    setSelectedIndex(realIndex)
  }

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return 'AN'
    const names = name.trim().split(' ')
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  // Generate avatar color based on name
  const getAvatarColor = (name) => {
    const colors = [
      'bg-gradient-to-br from-[#EE334B] to-[#EE334B]/80',
      'bg-gradient-to-br from-[#213554] to-[#213554]/80',
      'bg-gradient-to-br from-[#2D5016] to-[#2D5016]/80',
      'bg-gradient-to-br from-purple-500 to-purple-600',
      'bg-gradient-to-br from-blue-500 to-blue-600',
      'bg-gradient-to-br from-green-500 to-green-600',
    ]
    if (!name) return colors[0]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  if (loading) {
    return (
      <div className="bg-white py-12">
        <div className="sm:max-w-8xl mx-auto w-[95%]">
          <div className="text-center">Loading testimonials...</div>
        </div>
      </div>
    )
  }

  if (ratings.length === 0) {
    return null
  }

  // Get visible profile pictures (current + next 3)
  const getVisibleProfiles = () => {
    const visible = []
    for (let i = 0; i < Math.min(4, ratings.length); i++) {
      const index = (selectedIndex + i) % ratings.length
      visible.push({ index, rating: ratings[index] })
    }
    return visible
  }

  const visibleProfiles = getVisibleProfiles()

  return (
    <div className="bg-white py-12">
      <div className="sm:max-w-8xl mx-auto w-[95%]">
        <div className="flex sm:flex-row flex-col items-center gap-8 lg:gap-12">
          
          <div className="sm:w-6/12 w-full">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#333333] mb-2">
              CLIENT TESTIMONIAL
            </h2>
            <p className="text-[#333333] text-sm sm:text-base mb-6">
              GET TO KNOW ALL ABOUT OUR SERVICE THROUGH VARIOUS BUSINESS CLIENTS.
            </p>

            {/* Large Quotation Marks */}
            <div className="text-[#FFD700] text-6xl sm:text-7xl font-serif  leading-none">
            "
            </div>

            {/* Swiper Slider */}
            <div className="relative">
              <Swiper
                ref={swiperRef}
                modules={[Autoplay]}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={ratings.length > 1}
                loopedSlides={ratings.length}
                onSlideChange={handleSlideChange}
                className="testimonial-swiper"
              >
                {ratings.map((rating, index) => (
                  <SwiperSlide key={rating._id || index}>
                    <div className="pr-4">
                     
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold ${getAvatarColor(rating.name)}`}
                        >
                          {getInitials(rating.name)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#333333] text-base">
                            {rating.name}
                          </h4>
                          <p className="text-sm text-[#666666]">
                          {rating.email}
                          </p>
                        </div>
                      </div>

                    
                      <p className="text-[#333333] text-sm sm:text-base italic mb-4 leading-relaxed">
                        {rating.review || 'No review available'}
                      </p>

                      
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            size={18}
                            color={i < (rating.rating || 0) ? '#FFD700' : '#E4E5E9'}
                          />
                        ))}
                        {rating.rating && rating.rating % 1 !== 0 && (
                          <FaStar
                            size={18}
                            color="#FFD700"
                            style={{
                              clipPath: `inset(0 ${(1 - (rating.rating % 1)) * 100}% 0 0)`,
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          
          <div className="sm:w-5/12">
            <div className=' mx-auto'>
               <img src={categoryReview} className=' mx-auto' alt='' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryTestimonials