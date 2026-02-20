import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import AddReviews from "../../components/CustomerReviews/AddReviews";
import Button from "../../components/common/Button";
import Banner from "../../components/common/Banner";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/rating/getAll`);
      setReviews(response?.data?.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const metadata = {
    title: "Reviews - Umbrella Custom Packaging",
    description: "Reviews Umbrella Custom Packaging-The House of Proficient Printing & Distinct Featured Boxes. Umbrella Custom Packaging facilitates your business by providing innovative styled boxes in extraordinary design. We use the finest paper material and high quality cardboard to ensure perfect Die Cut boxes. You will get guaranteed satisfaction with high quality printing.",
    keywords: "custom packaging, wholesale boxes, packaging solutions, affordable packaging, custom boxes, packaging design, eco-friendly packaging",
    author: "Umbrella Custom Packaging",
    ogUrl: `${BaseUrl}/reviews`,
    canonicalUrl: `${BaseUrl}/reviews`,
    ogTitle: "Reviews - Umbrella Custom Packaging",
    ogDescription: "Reviews Umbrella Custom Packaging-The House of Proficient Printing & Distinct Featured Boxes...",
    modifiedTime: "2025-06-13T15:18:43+00:00",
    twitterTitle: "Reviews - Umbrella Custom Packaging",
    twitterDescription: "Reviews Umbrella Custom Packaging-The House of Proficient Printing & Distinct Featured Boxes...",
    robots: "index, follow"
  };

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length).toFixed(1)
    : "0.0";

  return (
    <>
      <Banner title="Customer Reviews" subTitle="Reviews" />

      {/* Main Content */}
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 py-12 max-w-7xl">
          {/* Average Rating Display */}
          {reviews.length > 0 && (
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 bg-white px-6 py-4 rounded-lg shadow-md border border-gray-200">
                <FaStar size={28} color="#f0ad4e" />
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">{averageRating}</div>
                  <div className="text-sm text-gray-600">Based on {reviews.length} reviews</div>
                </div>
              </div>
            </div>
          )}

          {/* Trust Section */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-[#4440E6] uppercase tracking-wide">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Customers Trust X-Custom Packaging
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Customers are really important to our business! If it weren't for them, 
              it would have taken us a long time to succeed. We're grateful for all 
              the customers who've supported us and helped us sell more. When our 
              customers are happy, it makes us feel really good and pushes us to keep improving.
            </p>
          </div>

          {/* CTA Section */}
          <div className="text-center mb-16">
            <div className="bg-gradient-to-r from-[#4440E6]/10 via-[#EE334B]/10 to-[#4440E6]/10 rounded-2xl p-8 md:p-12 border border-[#4440E6]/20">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Share Your Experience With Us!
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                Because we do a good job making sure they're happy. You can count on 
                X-Custom Packaging to help you with your packaging needs.
              </p>
              <Button 
                onClick={() => setOpenModal(true)} 
                label="Write a Review" 
                className="bg-[#4440E6] text-white hover:bg-[#3730a3] px-8 py-3 rounded-lg text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300" 
              />
            </div>
          </div>

          {/* Reviews Grid */}
          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {reviews.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group"
                >
                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i}
                        size={20} 
                        color={i < item.rating ? "#f0ad4e" : "#e4e5e9"}
                        className="transition-transform duration-300 group-hover:scale-110"
                        style={{ transitionDelay: `${i * 50}ms` }}
                      />
                    ))}
                  </div>
                  
                  {/* Review Text */}
                  <div className="mb-6">
                    <p className="text-gray-700 italic leading-relaxed text-base line-clamp-4">
                      "{item?.review}"
                    </p>
                  </div>
                  
                  {/* Author Info */}
                  <div className="border-t border-gray-100 pt-4">
                    <h5 className="font-bold text-gray-900 text-lg mb-1">
                      {item?.name}
                    </h5>
                    {item?.position && (
                      <p className="text-sm text-gray-500 font-medium">{item.position}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                <FaStar size={48} color="#e4e5e9" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Reviews Yet</h3>
              <p className="text-gray-500 mb-6">Be the first to share your experience!</p>
              <Button 
                onClick={() => setOpenModal(true)} 
                label="Write the First Review" 
                className="bg-[#4440E6] text-white hover:bg-[#3730a3] px-6 py-2 rounded-md" 
              />
            </div>
          )}
        </div>
      </div>

      <AddReviews
        isModalOpen={openModal} 
        setIsModalOpen={setOpenModal} 
        onReviewAdded={fetchReviews} 
      />
    </>
  );
};

export default Reviews;