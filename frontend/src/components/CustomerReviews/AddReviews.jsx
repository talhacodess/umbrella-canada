import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { FaStar, FaRegStar } from "react-icons/fa";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { BaseUrl } from "../../utils/BaseUrl";
import logo from "../../assets/images/brand/logo.png";
const AddReviews = ({ isModalOpen, setIsModalOpen, closeModal, onReviewAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    review: ""
  });
  const [loading, setLoading] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (value) => {
    setFormData(prev => ({
      ...prev,
      rating: value
    }));
  };

  const handleHoverRating = (value) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate rating
    if (formData.rating < 1 || formData.rating > 5) {
      toast.error("Please select a rating between 1 and 5 stars");
      return;
    }
    
    setLoading(true);
    
    try {
      await axios.post(`${BaseUrl}/rating/create`, formData);
      toast.success("Review submitted successfully!");
      setIsModalOpen(false);
      
      setFormData({
        name: "",
        email: "",
        rating: 0,
        review: ""
      });
      setHoverRating(0);
      
      // Call the callback to refresh reviews list
      if (onReviewAdded && typeof onReviewAdded === 'function') {
        onReviewAdded();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error submitting review");
    } finally {
      setLoading(false);
    }
  };

  // Function to render stars with more professional appearance
  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => {
      const ratingValue = star;
      
      return (
        <label
          key={star}
          className="cursor-pointer transition-all duration-200 p-1"
          onMouseEnter={() => handleHoverRating(ratingValue)}
          onMouseLeave={handleMouseLeave}
        >
          <input
            type="radio"
            name="rating"
            value={ratingValue}
            onClick={() => handleRatingChange(ratingValue)}
            className="hidden"
            required
          />
          {ratingValue <= (hoverRating || formData.rating) ? (
            <FaStar 
              className="text-2xl text-[#EE334B]" 
            />
          ) : (
            <FaRegStar className="text-2xl text-gray-400" />
          )}
        </label>
      );
    });
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={closeModal} className={"rounded-xl max-w-xl mx-auto"}>
        <div className="p-4 overflow-y-auto">
          <div className="bg-[#F7F7F7] rounded-[10px] flex flex-col items-center p-5">
            <div className="cursor-pointer flex w-full justify-end">
              <MdClose 
                onClick={() => {
                  setIsModalOpen(false);
                  setFormData({
                    name: "",
                    email: "",
                    rating: 0,
                    review: ""
                  });
                  setHoverRating(0);
                }} 
                size={25}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              />
            </div>

             <img src={logo} alt="Company Logo" className="mb-3  w-44" />
            
            <h2 className="text-xl font-semibold mb-4 text-[#333333]">Share Your Feedback</h2>
            
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="flex flex-col w-full gap-3 justify-between">
                <div className="w-full">
                  <Input
                    label="Full Name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="rounded-[8px] w-full border-[#333333] border bg-[#fff] p-3"
                    required
                  />
                </div>
                <div className="w-full">
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="rounded-[8px] w-full border-[#333333] border bg-[#fff] p-3"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="pb-1.5 flex text-[#333333] text-sm font-medium">
                  How would you rate your experience?
                </label>
                <div className="flex justify-start gap-1 mt-2">
                  {renderStars()}
                </div>
              </div>

              <div className="flex flex-col mb-4 mt-4">
                <label
                  className="pb-1.5 flex text-[#333333] text-sm font-medium"
                  htmlFor="review"
                >
                  Your Review
                </label>
                <textarea
                  id="review"
                  name="review"
                  rows={3}
                  value={formData.review}
                  onChange={handleChange}
                  placeholder="Share details of your experience with us..."
                  className="rounded-[8px] w-full border-[#333333] border bg-[#fff] p-3"
                  required
                ></textarea>
              </div>
              
              <Button
                label={loading ? "Submitting..." : "Submit Review"}
                className="bg-[#213554] hover:bg-[#213554]/90 text-white mt-2 w-full py-3 rounded-lg font-medium disabled:opacity-80 transition-colors"
                type="submit"
                disabled={loading || formData.rating === 0}
              />
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddReviews;