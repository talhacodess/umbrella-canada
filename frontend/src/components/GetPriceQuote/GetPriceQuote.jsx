import React, { useState, useEffect } from "react";
import Input from "../common/Input";
import Select from "../common/Select";
import Textarea from "../common/Textarea";
import Button from "../common/Button";
import { toast } from "react-toastify";
import { BaseUrl } from "../../utils/BaseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaInfoCircle, FaBox, FaUser, FaRuler, FaLayerGroup, FaImage, FaCheck, FaCheckCircle } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { Navigation, Autoplay, Mousewheel, Keyboard, EffectCoverflow } from 'swiper/modules';
import gift from '../../assets/images/Gift.webp';
import { gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8, gallery9 } from "../../assets";

// Gallery images - moved outside component to avoid dependency issues
const galleryImages = [
  { src: gallery1, alt: "Eco-friendly cosmetic packaging with botanical design" },
  { src: gallery2, alt: "Luxury wine bottle with embossed label" },
  { src: gallery5, alt: "Minimalist food packaging with clean typography" },
  { src: gallery9, alt: "Sustainable product box with recycled materials" },
  { src: gallery6, alt: "Colorful retail packaging with geometric patterns" },
  { src: gallery7, alt: "Elegent gift box with ribbon closure" },
  { src: gallery8, alt: "Modern tech product packaging with sleek design" },
  { src: gallery3, alt: "Vintage-inspired packaging with nostalgic elements" },
  { src: gallery4, alt: "Creative product container with unique shape" }
];

const GetPriceQuote = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images to ensure they show on first load
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = galleryImages.map((img) => {
        return new Promise((resolve, reject) => {
          const image = new Image();
          image.onload = resolve;
          image.onerror = reject;
          image.src = img.src;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error loading images:', error);
        setImagesLoaded(true); // Still show gallery even if some images fail
      }
    };

    loadImages();
  }, []);

  const initialFormState = {
    productName: "",
    name: "",
    email: "",
    phoneNumber: "",
    length: "",
    width: "",
    depth: "",
    unit: "Inches",
    stock: "Stock",
    printing: "Printing",
    quantity: "",
    image: null,
    message: "",
    pageUrl: typeof window !== "undefined" ? window.location.href : ""
  };

  const [formData, setFormData] = useState(initialFormState);

  const validateForm = () => {
    return (
      formData.length &&
      formData.width &&
      formData.depth &&
      formData.quantity &&
      formData.name &&
      formData.email &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.phoneNumber
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
    if (!validateForm()) {
      toast.error("Please fill all required fields with valid information");
      return;
    }
    
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await axios.post(`${BaseUrl}/requestQuote/create`, formDataToSend);

      if (response.data.status === 'success') {
        toast.success("Quote request submitted successfully!");
        setIsLoading(false);
        setFormData(initialFormState);
        navigate('/thank-you-page');
      } else {
        toast.error(response.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full  bg-white max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-10">
      

      <div className="grid grid-cols-1 lg:grid-cols-2 ">
        {/* Left Side - Leave Your Message Section */}
        <div className="   p-4 sm:p-6 lg:p-8 flex flex-col justify-center relative overflow-hidden">
          {/* Watermark Background - Left Side */}
          <div className="hidden md:flex absolute -top-32 sm:-top-28 bottom-0 -left-8 sm:-left-16 items-center justify-start pl-4 sm:pl-8 pointer-events-none">
            <h6
              className="text-[40px] sm:text-[60px] lg:text-[100px] font-bold text-[#EE334B] opacity-10 select-none" 
              style={{ 
                fontFamily: 'Arial, sans-serif',
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                transform: 'rotate(0deg)'
              }}
            >
              Custom Quote
            </h6>
          </div>
          
          <div className="relative sm:w-10/12 w-full  ml-auto z-10">
            {/* Small intro text */}
            <p className="text-sm sm:text-base text-gray-500 mb-3 sm:mb-4">
              We promise unbeatable prices.
            </p>
            
            {/* Main heading */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-5 leading-tight">
              Get your Quote in Just 20 Minutes 
            </h3>
            
            {/* Decorative line */}
            <div className="w-16 sm:w-20 h-1 bg-[#EE334B] mb-5 sm:mb-6 rounded"></div>
            
            {/* Descriptive paragraph */}
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg leading-relaxed">
              Just fill in your name, email, phone number, and the instructions. We will email you the price quote in 20 minutes. The X factor always delivers!
            </p>
            
            {/* Image */}
            <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden">
              <img 
                src={gift} 
                alt="Gift box packaging" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className=" sm:w-10/12 w-full mx-auto">
        <div className="bg-[#f7f7f7] rounded-tl-[30px] sm:rounded-tl-[50px] overflow-hidden">
          {/* Red Header Banner */}
          <div className="bg-[#EE334B] text-white rounded-tl-full py-3 sm:py-4 px-4 sm:px-6 text-center">
            <h3 className="text-base sm:text-lg lg:text-xl font-bold uppercase">GET CUSTOM QUOTE</h3>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4 lg:space-y-5">
            {/* Product Information */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2">
                <FaBox className="text-[#EE334B] text-lg sm:text-xl flex-shrink-0" />
                <label className="text-xs sm:text-sm font-semibold text-gray-700">Product Information</label>
              </div>
              <Input
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="Product Name"
                className="bg-gray-100 rounded-lg border-gray-300"
              />
            </div>

            {/* Select Sizes */}
            <div className="space-y-1 sm:space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <FaRuler className="text-[#EE334B] text-lg sm:text-xl flex-shrink-0" />
                <label className="text-xs sm:text-sm font-semibold text-gray-700">Select Sizes</label>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                <Input
                  name="length"
                  type="number"
                  value={formData.length}
                  onChange={handleChange}
                  placeholder="Length"
                  required
                  className="bg-gray-100 rounded-lg border-gray-300"
                />
                <Input
                  name="width"
                  type="number"
                  value={formData.width}
                  onChange={handleChange}
                  placeholder="Width"
                  required
                  className="bg-gray-100 rounded-lg border-gray-300"
                />
                <Input
                  name="depth"
                  type="number"
                  value={formData.depth}
                  onChange={handleChange}
                  placeholder="Depth"
                  required
                  className="bg-gray-100 rounded-lg border-gray-300"
                />
                <Select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="bg-gray-100 border-gray-300"
                >
                  <option>Inches</option>
                  <option>mm</option>
                  <option>cm</option>
                </Select>
              </div>
            </div>

            {/* Choose Materials */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <FaLayerGroup className="text-[#EE334B] text-lg sm:text-xl flex-shrink-0" />
                <label className="text-xs sm:text-sm font-semibold text-gray-700">Choose Materials</label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                <Select
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="bg-gray-100 border-gray-300"
                >
                  <option>Stock</option>
                  <option>12pt Cardboard</option>
                  <option>14pt Cardboard</option>
                  <option>16pt Cardboard</option>
                  <option>18pt Cardboard</option>
                  <option>20pt Cardboard</option>
                  <option>White SBS C1S C25</option>
                  <option>Corrugated</option>
                  <option>Rigid</option>
                  <option>Kraft</option>
                  <option>Linen</option>
                </Select>
                <Select
                  name="printing"
                  value={formData.printing}
                  onChange={handleChange}
                  className="bg-gray-100 border-gray-300"
                >
                  <option>Printing</option>
                  <option>Plain (No Printing)</option>
                  <option>1 Color</option>
                  <option>2 Color</option>
                  <option>3 Color</option>
                  <option>4 Color</option>
                  <option>4/1 Color</option>
                  <option>4/2 Color</option>
                  <option>4/3 Color</option>
                  <option>4/4 Color</option>
                </Select>
                <Input
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Quantity"
                  required
                  className="bg-gray-100 rounded-lg border-gray-300"
                />
              </div>
            </div>

            {/* Upload Artwork */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start gap-2 mb-2">
                <FaImage className="text-[#EE334B] text-lg sm:text-xl flex-shrink-0" />
                <label className="text-xs sm:text-sm font-semibold text-gray-700">Upload Artwork</label>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 text-left bg-white">
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="hidden text-left"
                  id="file-upload"
                  accept=".png,.pdf,.jpg,.jpeg,.webp"
                />
                <label htmlFor="file-upload" className="cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-2">
                  <button type="button" className="px-3 sm:px-4 py-2 bg-gray-200 rounded text-xs sm:text-sm hover:bg-gray-300 whitespace-nowrap">
                    Choose File
                  </button>
                  <span className="text-xs sm:text-sm text-gray-500 text-center sm:text-left break-all">
                    {formData.image ? formData.image.name : "No file chosen"}
                  </span>
                </label>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <FaUser className="text-[#EE334B] text-lg sm:text-xl flex-shrink-0" />
                <label className="text-xs sm:text-sm font-semibold text-gray-700">Personal Information</label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 ">
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name*"
                  required
                  className="bg-gray-100 rounded-lg border-gray-300"
                />
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email ID*"
                  required
                  className="bg-gray-100 rounded-lg border-gray-300"
                />
                <Input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Contact Number*"
                  required
                  className="bg-gray-100 rounded-lg border-gray-300"
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <FaInfoCircle className="text-[#EE334B] text-lg sm:text-xl flex-shrink-0" />
                <label className="text-xs sm:text-sm font-semibold text-gray-700">Additional Information</label>
              </div>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Message..."
                className="bg-gray-100 border-gray-300"
              />
            </div>

            {/* Submit Button with reCAPTCHA */}
            <div className=" flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
              {/* reCAPTCHA */}
              <div className="bg-gray-100 border border-gray-300 rounded-lg p-2 sm:p-3 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="recaptcha" 
                    className="w-4 h-4 sm:w-5 sm:h-5 border-gray-400 rounded cursor-pointer flex-shrink-0"
                  />
                  <label htmlFor="recaptcha" className="text-xs sm:text-sm text-gray-700 cursor-pointer">
                    I'm not a robot
                  </label>
                </div>
                <div className="flex flex-col items-start sm:items-center ml-6 sm:ml-0">
                  <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-600">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="#4285F4" strokeWidth="2" fill="none"/>
                      <path d="M12 6v6l4 2" stroke="#4285F4" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span className="font-semibold">reCAPTCHA</span>
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-gray-500">
                    Privacy - Terms
                  </div>
                </div>
              </div>
              
              {/* Submit Button */}
              {isLoading ? (
                <button
                  type="submit"
                  disabled={true}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gray-300 text-white text-sm sm:text-base font-bold rounded-lg cursor-not-allowed whitespace-nowrap w-full sm:w-auto"
                >
                  Processing...
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!validateForm()}
                  className={`px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-bold rounded-lg text-white whitespace-nowrap transition-colors w-full sm:w-auto ${
                    !validateForm() 
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : 'bg-[#EE334B] hover:bg-[#d6283f] cursor-pointer'
                  }`}
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
};

export default GetPriceQuote;