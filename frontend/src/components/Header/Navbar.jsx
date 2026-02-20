import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/images/brand/logo.png";
import Input from "../common/Input";
import Button from "../common/Button";
import BottomNav from "./BottomNav";
import { Link } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";
import ProductCard, { ProductSelectionProvider } from "../common/ProductCard";
import GetQuoteModal from "../common/GetQuoteModal";
import { FiPhone } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import portfolio from "../../assets/images/brand/portfolio.png";
import custom from "../../assets/images/brand/custom-pricing.png";
import { HiOutlineSearch } from "react-icons/hi";
const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchRef = useRef(null);

  const OpenMenu = () => {
    setMenu(!menu);
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length < 2) {
      setShowResults(false);
      setSearchResults([]);
      return;
    }
    
    setIsSearchLoading(true);
    try {
      const response = await axios.get(`${BaseUrl}/products/search?name=${query}`);
      setSearchResults(response.data.data);
      setShowResults(true);
    } catch (error) {
      console.error("Error searching products:", error);
      setSearchResults([]);
    } finally {
      setIsSearchLoading(false);
    }
  };

  const handleResultClick = () => {
    setShowResults(false);
    setSearchQuery("");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle scroll to detect when navbar becomes static
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`${menu ? '' : 'sticky'} top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-lg backdrop-saturate-150 shadow-md ' 
        : 'bg-gradient-to-r from-white via-gray-50/30'
    }`}
    style={isScrolled ? {
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
    } : {}}
    >
      <div className="sm:max-w-8xl max-w-[95%] mx-auto px-2 sm:px-0">
        <div className="flex w-full justify-between h-auto sm:h-20 items-center gap-2 sm:gap-4 py-2 sm:py-0">
          {/* Logo and Search Bar Container */}
          <div className="flex items-center sm:w-5/12 lg:w-6/12 gap-2 sm:gap-3 flex-shrink-0">
            <Link to={'/'} className="flex-shrink-0">
              <img 
                src={logo} 
                alt="" 
                className="w-[100px] sm:w-56 md:w-[200px] lg:w-[250px] h-auto" 
                loading="eager" 
                fetchpriority="high" 
              />
            </Link>
            {/* Search Bar - Hidden on very small screens, visible from sm */}
            <div className="hidden sm:flex flex-1 max-w-lg relative search-container" ref={searchRef}>
              <Input
                placeholder={"What are you looking for today?"}
                className={"rounded-full p-2 sm:p-3 w-full border bg-white border-gray-300 shadow-xs pr-8 sm:pr-10 text-xs sm:text-sm"}
                value={searchQuery}
                onChange={handleSearch}
                Icon={<HiOutlineSearch className="text-[#EE334B]" size={23} />}
              />
              {showResults && (
                <div className="absolute z-50 mt-12 left-0 w-full sm:max-w-lg md:max-w-2xl bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 sm:max-h-96 overflow-y-auto">
                  {isSearchLoading ? (
                    <div className="flex justify-center items-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-[#213554]"></div>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <ProductSelectionProvider>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2 sm:gap-3 p-2 sm:p-4">
                        {searchResults.map((product) => (
                          <div 
                            key={product._id}
                            onClick={handleResultClick}
                            className="h-full w-full"
                          >
                            <ProductCard 
                              data={product} 
                              disableSelection={true}
                              size="compact"
                            />
                          </div>
                        ))}
                      </div>
                    </ProductSelectionProvider>
                  ) : (
                    <div className="p-3 sm:p-4 text-center text-xs sm:text-sm text-gray-500">
                      No products found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Side Buttons - Hidden on mobile */}
          <div className="hidden md:flex items-center justify-end gap-1 lg:gap-1.5">
            {/* Our Portfolio Button */}
            <Link 
              to="/portfolio" 
              className="group flex items-center gap-1  rounded-lg  py-1 lg:py-2 transition-all cursor-pointer "
            >
          <div className="w-12 h-12">
          <svg
  version="1.1"
  id="Layer_1"
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
  x="0px"
  y="0px"
  viewBox="0 0 32 32"
  style={{ enableBackground: "new 0 0 32 32" }}
  xmlSpace="preserve"
  className="transition-colors duration-300"
>
  <style
    type="text/css"
    dangerouslySetInnerHTML={{ __html: "\n\t.st0{fill:#121639; transition: fill 0.3s ease;}\n" }}
  />
  <g>
    <g>
      <path
        className="st0"
        d="M-1198.35-289.6c-0.45,0.9-0.97,1.74-1.3,2.64c-0.33,0.89-0.49,1.85-0.74,2.84c-1.25-0.4-2.19,0.27-3.1,1.1
			c-0.45,0.42-0.91,0.84-1.43,1.17c-0.79,0.51-1.29,0.29-1.55-0.62c-0.14-0.49-0.24-0.98-0.37-1.47c-0.49-1.79-2.03-2.47-3.69-1.59
			c-0.45,0.24-0.87,0.59-1.22,0.96c-0.92,0.98-2.03,1.47-3.37,1.49c-0.58,0.01-0.88,0.3-0.87,0.78c0.02,0.46,0.36,0.74,0.92,0.73
			c1.59-0.02,2.98-0.5,4.11-1.67c0.32-0.33,0.66-0.65,1.04-0.89c0.79-0.48,1.37-0.24,1.62,0.64c0.15,0.51,0.25,1.04,0.39,1.56
			c0.47,1.69,1.9,2.35,3.46,1.52c0.66-0.35,1.22-0.9,1.81-1.36c0.31-0.24,0.59-0.53,0.92-0.75c0.65-0.43,1.41-0.1,1.54,0.67
			c0.4,2.18,1.38,4.05,2.99,5.59c0.04,0.04,0.08,0.09,0.17,0.19c-0.2,0.01-0.35,0.03-0.5,0.03c-7.76,0-15.53,0-23.29,0
			c-0.83,0-1.02-0.19-1.02-1.04c0-12.55-0.01-25.11,0.01-37.66c0-1.55-0.23-2.99-1.38-4.23c0.21-0.02,0.34-0.04,0.47-0.04
			c9.73,0,19.46,0,29.19,0c2.1,0,3.61,1.46,3.61,3.52c0.01,7.19,0,14.39,0,21.58c0,0.11-0.01,0.22-0.02,0.32
			c-0.78,0.09-1.55,0.14-2.31,0.27c-1.56,0.28-2.93,0.96-4.2,1.9c-0.22,0.16-0.53,0.27-0.8,0.28c-6.56,0.02-13.12,0.01-19.68,0.01
			c-0.78,0-1.14,0.24-1.14,0.75c0,0.52,0.36,0.76,1.13,0.76c6.01,0,12.01,0,18.02,0C-1198.73-289.6-1198.54-289.6-1198.35-289.6z
			 M-1205.89-294.36c3.69,0,7.38,0,11.07,0c0.76,0,1.14-0.25,1.15-0.76c0.01-0.51-0.36-0.76-1.14-0.76c-7.38,0-14.76,0-22.14,0
			c-0.13,0-0.25,0-0.38,0c-0.43,0.03-0.74,0.32-0.74,0.72c0,0.42,0.23,0.68,0.63,0.77c0.17,0.04,0.35,0.03,0.52,0.03
			C-1213.24-294.36-1209.56-294.36-1205.89-294.36z M-1205.87-299.14c3.75,0,7.51,0,11.26,0c0.6,0,0.95-0.3,0.94-0.77
			c-0.01-0.45-0.35-0.73-0.92-0.74c-0.44-0.01-0.89,0-1.33,0c-7.03,0-14.07,0-21.1,0c-0.69,0-1.05,0.26-1.05,0.75
			c0,0.49,0.36,0.76,1.04,0.76c0.1,0,0.19,0,0.29,0C-1213.12-299.14-1209.49-299.14-1205.87-299.14z M-1214.63-305.23
			c0.11-0.04,0.23-0.09,0.35-0.14c1-0.43,1.63-1.48,1.51-2.51c-0.13-1.11-0.93-1.98-2.01-2.18c-0.28-0.05-0.57-0.02-0.85-0.05
			c-0.54-0.05-0.93-0.46-0.91-0.97c0.02-0.49,0.4-0.87,0.92-0.91c0.53-0.04,1.03,0,1.42,0.47c0.27,0.32,0.65,0.31,0.99,0.06
			c0.33-0.24,0.41-0.69,0.14-1.01c-0.24-0.29-0.52-0.6-0.85-0.73c-0.53-0.21-0.81-0.44-0.75-1.06c0.04-0.41-0.34-0.69-0.75-0.69
			c-0.43,0-0.72,0.3-0.74,0.76c-0.01,0.24,0,0.47,0,0.72c-0.12,0.05-0.22,0.09-0.32,0.13c-1.07,0.44-1.69,1.45-1.57,2.55
			c0.12,1.11,0.99,2,2.13,2.17c0.26,0.04,0.54,0.01,0.81,0.04c0.46,0.06,0.74,0.34,0.83,0.79c0.08,0.4-0.18,0.83-0.57,1
			c-0.53,0.23-1.25,0.09-1.67-0.32c-0.39-0.38-0.8-0.41-1.13-0.1c-0.31,0.29-0.35,0.77,0.01,1.1c0.42,0.38,0.92,0.67,1.46,1.05
			c0.1,1.05,0.26,1.32,0.8,1.31C-1214.87-303.75-1214.74-304.01-1214.63-305.23z M-1201.77-303.91c2.31,0,4.62,0,6.94,0
			c0.17,0,0.35,0.01,0.52-0.02c0.38-0.06,0.59-0.31,0.63-0.67c0.03-0.37-0.14-0.65-0.51-0.76c-0.16-0.05-0.34-0.06-0.51-0.06
			c-4.74,0-9.47,0-14.21,0c-0.19,0-0.39,0.01-0.56,0.08c-0.33,0.13-0.47,0.4-0.44,0.76c0.03,0.36,0.24,0.58,0.59,0.65
			c0.17,0.04,0.35,0.02,0.52,0.02C-1206.45-303.91-1204.11-303.91-1201.77-303.91z M-1201.82-314.95c-2.33,0-4.66,0-6.98,0
			c-0.16,0-0.32-0.01-0.47,0.01c-0.37,0.06-0.6,0.28-0.63,0.66c-0.03,0.37,0.13,0.66,0.49,0.77c0.19,0.06,0.4,0.07,0.61,0.07
			c4.67,0,9.35,0,14.02,0c0.19,0,0.38,0,0.56-0.05c0.39-0.11,0.58-0.39,0.55-0.78c-0.04-0.39-0.27-0.63-0.67-0.68
			c-0.16-0.02-0.32-0.01-0.47-0.01C-1197.16-314.95-1199.49-314.95-1201.82-314.95z M-1201.81-310.19c-1.95,0-3.9,0-5.85,0
			c-0.51,0-1.01-0.01-1.52,0.01c-0.43,0.02-0.72,0.32-0.73,0.72c-0.01,0.43,0.27,0.74,0.72,0.78c0.13,0.01,0.25,0.01,0.38,0.01
			c4.67,0,9.35,0,14.02,0c0.16,0,0.35,0.05,0.47-0.02c0.23-0.14,0.51-0.31,0.59-0.53c0.07-0.2-0.02-0.55-0.17-0.71
			c-0.16-0.16-0.48-0.24-0.73-0.24C-1197.03-310.19-1199.42-310.19-1201.81-310.19z"
      />
      <path
        className="st0"
        d="M-1198.77-283.5c0-4.7,3.81-8.49,8.52-8.48c4.71,0.01,8.51,3.81,8.5,8.51c-0.01,4.67-3.83,8.47-8.5,8.47
			C-1194.95-274.99-1198.78-278.81-1198.77-283.5z M-1191.47-283.09c-0.36-0.4-0.7-0.81-1.09-1.19c-0.61-0.6-1.37-0.61-1.9-0.07
			c-0.51,0.53-0.47,1.31,0.12,1.89c0.64,0.63,1.29,1.26,1.93,1.89c0.74,0.72,1.41,0.71,2.14-0.02c1.34-1.34,2.68-2.69,4.01-4.04
			c0.1-0.1,0.2-0.2,0.28-0.32c0.31-0.42,0.33-1,0.06-1.43c-0.29-0.45-0.84-0.72-1.35-0.56c-0.29,0.09-0.56,0.29-0.78,0.5
			C-1189.16-285.36-1190.26-284.27-1191.47-283.09z"
      />
      <path
        className="st0"
        d="M-1223.37-311.93c-0.14,0.01-0.25,0.02-0.36,0.02c-1.87,0-3.74,0-5.61,0c-0.67,0-0.91-0.24-0.91-0.92
			c0-0.92-0.01-1.83,0-2.75c0.03-1.86,1.48-3.34,3.32-3.42c1.82-0.08,3.43,1.32,3.54,3.18
			C-1223.3-314.53-1223.37-313.24-1223.37-311.93z"
      />
    </g>
  </g>
  <g>
    <g>
      <path
        className="st0"
        d="M16,29c-3.2,0-6.41,0-9.61,0c-1.71,0-3.03-1.1-3.34-2.76C3.01,26.01,3,25.78,3,25.56c0-3.75,0-7.5,0-11.25
			c0-2.01,1.44-3.45,3.44-3.45c2.52,0,5.05,0,7.57,0c1.23,0,2.21,0.49,2.92,1.5c0.47,0.67,0.96,1.33,1.43,2.01
			c0.35,0.5,0.81,0.73,1.42,0.73c1.93-0.01,3.86,0,5.78,0c1.99,0,3.43,1.43,3.43,3.43c0,2.35,0.01,4.7,0,7.06
			c0,1.98-1.43,3.41-3.41,3.42C22.39,29,19.2,29,16,29z M10.57,22.35c-0.58,0-1.15,0-1.73,0c-0.6,0-1.01,0.38-1,0.91
			c0,0.52,0.41,0.9,0.99,0.9c1.15,0,2.3,0,3.46,0c0.58,0,0.99-0.38,0.99-0.9c0-0.53-0.41-0.91-1.01-0.91
			C11.7,22.35,11.14,22.35,10.57,22.35z M10.53,21.14C10.53,21.14,10.53,21.14,10.53,21.14c0.59,0,1.17,0.01,1.76,0
			c0.58-0.01,0.99-0.39,0.99-0.91c0-0.52-0.4-0.9-0.99-0.9c-1.16,0-2.32,0-3.49,0c-0.12,0-0.25,0.01-0.36,0.05
			c-0.41,0.14-0.66,0.55-0.6,0.98c0.06,0.44,0.43,0.77,0.91,0.78C9.34,21.15,9.94,21.14,10.53,21.14z"
      />
      <path
        className="st0"
        d="M12.71,5.41c-0.21-1.15,0.71-2.31,1.86-2.4C14.69,3.01,14.83,3,14.96,3c3.13,0,6.25,0,9.38,0
			c1.1,0,1.92,0.59,2.17,1.58c0.05,0.2,0.07,0.41,0.08,0.62c0,2.84,0,5.69,0,8.53c0,0.06-0.01,0.13-0.01,0.18c-1.6,0-3.19,0-4.84,0
			c0-0.15,0-0.26,0-0.37c0-1.4,0.01-2.8,0-4.19c-0.02-1.94-1.31-3.49-3.21-3.87c-0.28-0.06-0.58-0.07-0.87-0.07
			c-1.54-0.01-3.08,0-4.62,0C12.92,5.41,12.81,5.41,12.71,5.41z"
      />
      <path
        className="st0"
        d="M20.54,13.89c-0.31,0-0.58,0.02-0.85-0.01c-0.12-0.01-0.26-0.12-0.33-0.22c-0.48-0.65-0.95-1.32-1.42-1.98
			c-0.96-1.35-2.27-2.03-3.93-2.03c-2.51,0-5.02,0-7.54,0c-0.34,0-0.68,0.03-1.04,0.05c0-0.6-0.09-1.21,0.17-1.78
			C5.98,7.07,6.66,6.63,7.6,6.63c1.56,0,3.12,0,4.68,0c1.79,0,3.59,0,5.38,0c1.73,0,2.87,1.15,2.87,2.88c0,1.35,0,2.7,0,4.05
			C20.54,13.66,20.54,13.75,20.54,13.89z"
      />
    </g>
  </g>
</svg>

          </div>
              <div className="flex flex-col">
                <span className="font-bold text-[#213554] text-xs lg:text-sm leading-tight">Our Portfolio</span>
                <span className="text-[10px] lg:text-xs text-gray-500 mt-0.5">Check For Ideas</span>
              </div>
            </Link>
            
            {/* Custom Pricing Button */}
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="group flex items-center gap-1  rounded-lg px-1 lg:px-3 py-1 lg:py-2 transition-all cursor-pointer"
            >
               <div className="w-12 h-12">
               <svg
  version="1.1"
  id="Layer_1"
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
  x="0px"
  y="0px"
  viewBox="0 0 32 32"
  style={{ enableBackground: "new 0 0 32 32" }}
  xmlSpace="preserve"
  className="transition-colors duration-300"
>
  <style
    type="text/css"
    dangerouslySetInnerHTML={{ __html: "\n\t.st0{fill:#121639; transition: fill 0.3s ease;}\n" }}
  />
  <g>
    <g>
      <path
        className="st0"
        d="M19.78,19.66c-0.22,0.45-0.48,0.86-0.65,1.31c-0.17,0.44-0.24,0.92-0.36,1.4c-0.62-0.2-1.09,0.13-1.53,0.54
			c-0.22,0.21-0.45,0.42-0.71,0.58c-0.39,0.25-0.64,0.15-0.77-0.3c-0.07-0.24-0.12-0.49-0.18-0.73c-0.24-0.89-1-1.22-1.83-0.79
			c-0.22,0.12-0.43,0.29-0.6,0.48c-0.46,0.49-1.01,0.73-1.67,0.74c-0.29,0-0.44,0.15-0.43,0.39c0.01,0.23,0.18,0.37,0.46,0.36
			c0.78-0.01,1.48-0.25,2.03-0.82c0.16-0.16,0.32-0.32,0.52-0.44c0.39-0.24,0.68-0.12,0.8,0.32c0.07,0.25,0.12,0.52,0.19,0.77
			c0.23,0.84,0.94,1.17,1.71,0.75c0.33-0.17,0.6-0.44,0.9-0.67c0.15-0.12,0.29-0.26,0.45-0.37c0.32-0.21,0.7-0.05,0.76,0.33
			c0.2,1.08,0.69,2,1.48,2.77c0.02,0.02,0.04,0.04,0.08,0.09c-0.1,0.01-0.17,0.01-0.25,0.01c-3.84,0-7.69,0-11.53,0
			c-0.41,0-0.5-0.09-0.5-0.51c0-6.21,0-12.43,0-18.64c0-0.77-0.11-1.48-0.69-2.09c0.1-0.01,0.17-0.02,0.23-0.02
			c4.81,0,9.63,0,14.44,0c1.04,0,1.79,0.72,1.79,1.74c0,3.56,0,7.12,0,10.68c0,0.05-0.01,0.11-0.01,0.16
			c-0.39,0.04-0.77,0.07-1.14,0.13c-0.77,0.14-1.45,0.48-2.08,0.94c-0.11,0.08-0.26,0.14-0.4,0.14c-3.25,0.01-6.49,0.01-9.74,0.01
			c-0.39,0-0.56,0.12-0.56,0.37c0,0.26,0.18,0.38,0.56,0.38c2.97,0,5.94,0,8.92,0C19.6,19.66,19.69,19.66,19.78,19.66z M16.05,17.31
			c1.83,0,3.65,0,5.48,0c0.38,0,0.57-0.12,0.57-0.38c0-0.25-0.18-0.37-0.56-0.37c-3.65,0-7.31,0-10.96,0c-0.06,0-0.13,0-0.19,0
			c-0.21,0.02-0.36,0.16-0.36,0.35c0,0.21,0.11,0.34,0.31,0.38c0.08,0.02,0.17,0.01,0.26,0.01C12.42,17.31,14.24,17.31,16.05,17.31z
			 M16.07,14.94c1.86,0,3.72,0,5.57,0c0.3,0,0.47-0.15,0.46-0.38c-0.01-0.22-0.17-0.36-0.46-0.37c-0.22,0-0.44,0-0.66,0
			c-3.48,0-6.96,0-10.44,0c-0.34,0-0.52,0.13-0.52,0.37c0,0.24,0.18,0.37,0.51,0.38c0.05,0,0.09,0,0.14,0
			C12.48,14.94,14.27,14.94,16.07,14.94z M11.73,11.92c0.05-0.02,0.11-0.04,0.17-0.07c0.5-0.21,0.81-0.73,0.75-1.24
			c-0.07-0.55-0.46-0.98-1-1.08c-0.14-0.03-0.28-0.01-0.42-0.02c-0.27-0.02-0.46-0.23-0.45-0.48c0.01-0.24,0.2-0.43,0.46-0.45
			c0.26-0.02,0.51,0,0.7,0.23c0.13,0.16,0.32,0.15,0.49,0.03c0.16-0.12,0.2-0.34,0.07-0.5c-0.12-0.14-0.26-0.3-0.42-0.36
			c-0.26-0.1-0.4-0.22-0.37-0.53c0.02-0.2-0.17-0.34-0.37-0.34c-0.21,0-0.36,0.15-0.37,0.37c-0.01,0.12,0,0.23,0,0.36
			c-0.06,0.02-0.11,0.04-0.16,0.07c-0.53,0.22-0.84,0.72-0.78,1.26c0.06,0.55,0.49,0.99,1.05,1.07c0.13,0.02,0.27,0,0.4,0.02
			c0.23,0.03,0.37,0.17,0.41,0.39c0.04,0.2-0.09,0.41-0.28,0.49c-0.26,0.11-0.62,0.04-0.83-0.16c-0.19-0.19-0.4-0.2-0.56-0.05
			c-0.15,0.14-0.17,0.38,0.01,0.54c0.21,0.19,0.46,0.33,0.72,0.52c0.05,0.52,0.13,0.66,0.4,0.65
			C11.61,12.66,11.68,12.53,11.73,11.92z M18.1,12.58c1.14,0,2.29,0,3.43,0c0.09,0,0.17,0,0.26-0.01c0.19-0.03,0.29-0.15,0.31-0.33
			c0.02-0.18-0.07-0.32-0.25-0.38c-0.08-0.03-0.17-0.03-0.25-0.03c-2.34,0-4.69,0-7.03,0c-0.09,0-0.19,0.01-0.28,0.04
			c-0.17,0.06-0.24,0.2-0.22,0.37c0.02,0.18,0.12,0.29,0.29,0.32c0.08,0.02,0.17,0.01,0.26,0.01C15.78,12.58,16.94,12.58,18.1,12.58
			z M18.07,7.12c-1.15,0-2.3,0-3.46,0c-0.08,0-0.16,0-0.23,0.01c-0.18,0.03-0.29,0.14-0.31,0.33c-0.02,0.19,0.06,0.32,0.24,0.38
			c0.09,0.03,0.2,0.03,0.3,0.03c2.31,0,4.62,0,6.94,0c0.09,0,0.19,0,0.28-0.02c0.19-0.05,0.29-0.19,0.27-0.39
			c-0.02-0.19-0.13-0.31-0.33-0.33c-0.08-0.01-0.16-0.01-0.23-0.01C20.38,7.12,19.22,7.12,18.07,7.12z M18.07,9.47
			c-0.96,0-1.93,0-2.89,0c-0.25,0-0.5-0.01-0.75,0c-0.22,0.01-0.35,0.16-0.36,0.36c-0.01,0.21,0.13,0.37,0.36,0.39
			c0.06,0.01,0.13,0,0.19,0c2.31,0,4.63,0,6.94,0c0.08,0,0.17,0.02,0.23-0.01c0.11-0.07,0.25-0.15,0.29-0.26
			c0.04-0.1-0.01-0.27-0.09-0.35c-0.08-0.08-0.24-0.12-0.36-0.12C20.44,9.47,19.26,9.47,18.07,9.47z"
      />
      <path
        className="st0"
        d="M19.58,22.68c0-2.33,1.88-4.2,4.22-4.2c2.33,0,4.21,1.89,4.21,4.21c-0.01,2.31-1.89,4.19-4.21,4.19
			C21.47,26.89,19.58,25,19.58,22.68z M23.19,22.88c-0.18-0.2-0.35-0.4-0.54-0.59c-0.3-0.3-0.68-0.3-0.94-0.04
			c-0.25,0.26-0.23,0.65,0.06,0.94c0.32,0.31,0.64,0.62,0.96,0.93c0.37,0.35,0.7,0.35,1.06-0.01c0.66-0.66,1.32-1.33,1.99-2
			c0.05-0.05,0.1-0.1,0.14-0.16c0.15-0.21,0.16-0.49,0.03-0.71c-0.14-0.23-0.41-0.36-0.67-0.28c-0.14,0.04-0.28,0.14-0.39,0.25
			C24.33,21.76,23.79,22.3,23.19,22.88z"
      />
      <path
        className="st0"
        d="M7.41,8.61C7.33,8.62,7.28,8.62,7.23,8.62c-0.92,0-1.85,0-2.77,0C4.12,8.62,4,8.5,4,8.17
			C4,7.72,4,7.26,4,6.81c0.01-0.92,0.73-1.66,1.64-1.69c0.9-0.04,1.7,0.65,1.75,1.57C7.44,7.32,7.41,7.97,7.41,8.61z"
      />
    </g>
  </g>
  <g>
    <g>
      <path
        className="st0"
        d="M-1667-626c-3.2,0-6.41,0-9.61,0c-1.71,0-3.03-1.1-3.34-2.76c-0.04-0.22-0.05-0.45-0.05-0.68
			c0-3.75,0-7.5,0-11.25c0-2.01,1.44-3.45,3.44-3.45c2.52,0,5.05,0,7.57,0c1.23,0,2.21,0.49,2.92,1.5c0.47,0.67,0.96,1.33,1.43,2.01
			c0.35,0.5,0.81,0.73,1.42,0.73c1.93-0.01,3.85,0,5.78,0c1.99,0,3.43,1.43,3.43,3.43c0,2.35,0.01,4.7,0,7.06
			c0,1.98-1.43,3.41-3.41,3.42C-1660.61-626-1663.8-626-1667-626z M-1672.43-632.65c-0.58,0-1.15,0-1.73,0c-0.6,0-1.01,0.38-1,0.91
			c0,0.52,0.41,0.9,0.99,0.9c1.15,0,2.3,0,3.46,0c0.58,0,0.99-0.38,0.99-0.9c0-0.53-0.41-0.91-1.01-0.91
			C-1671.3-632.65-1671.86-632.65-1672.43-632.65z M-1672.47-633.86C-1672.47-633.86-1672.47-633.86-1672.47-633.86
			c0.59,0,1.17,0.01,1.76,0c0.58-0.01,0.99-0.39,0.99-0.91c0-0.52-0.4-0.9-0.99-0.9c-1.16,0-2.32,0-3.49,0
			c-0.12,0-0.25,0.01-0.36,0.05c-0.41,0.14-0.66,0.55-0.6,0.98c0.06,0.44,0.43,0.77,0.91,0.78
			C-1673.66-633.85-1673.06-633.86-1672.47-633.86z"
      />
      <path
        className="st0"
        d="M-1670.29-649.59c-0.21-1.15,0.71-2.31,1.86-2.4c0.13-0.01,0.26-0.01,0.4-0.01c3.13,0,6.25,0,9.38,0
			c1.1,0,1.92,0.59,2.17,1.58c0.05,0.2,0.07,0.41,0.08,0.62c0,2.84,0,5.69,0,8.53c0,0.06-0.01,0.13-0.01,0.18c-1.6,0-3.19,0-4.84,0
			c0-0.15,0-0.26,0-0.37c0-1.4,0.01-2.8,0-4.19c-0.02-1.94-1.31-3.49-3.21-3.87c-0.28-0.06-0.58-0.07-0.87-0.07
			c-1.54-0.01-3.08,0-4.62,0C-1670.08-649.59-1670.19-649.59-1670.29-649.59z"
      />
      <path
        className="st0"
        d="M-1662.46-641.11c-0.31,0-0.58,0.02-0.85-0.01c-0.12-0.01-0.26-0.12-0.33-0.22
			c-0.48-0.65-0.95-1.32-1.42-1.98c-0.96-1.35-2.27-2.03-3.93-2.03c-2.51,0-5.02,0-7.54,0c-0.34,0-0.68,0.03-1.04,0.05
			c0-0.6-0.09-1.21,0.17-1.78c0.39-0.86,1.07-1.29,2.02-1.29c1.56,0,3.12,0,4.68,0c1.79,0,3.59,0,5.38,0c1.73,0,2.87,1.15,2.87,2.88
			c0,1.35,0,2.7,0,4.05C-1662.46-641.34-1662.46-641.25-1662.46-641.11z"
      />
    </g>
  </g>
</svg>

               </div>
          
              <div className="flex flex-col">
                <span className="font-bold text-[#213554] text-xs lg:text-sm leading-tight">Custom</span>
                <span className="text-[10px] lg:text-xs text-gray-500 mt-0.5">Pricing</span>
              </div>
            </button>
            
            {/* Phone Button */}
            <Button
              className="bg-[#EE334B] text-white hover:bg-[#EE334B]/90  rounded-lg px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm"
              label="888-276-1239"
              Icons={<FiPhone size={16} className="lg:w-[18px] lg:h-[18px]" />}
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            {/* Mobile Search Bar - Directly visible on mobile */}
            <div className="flex-1 relative" ref={searchRef}>
              <Input
                placeholder={"Search..."}
                className={"rounded-full p-2 w-full border bg-white border-gray-300 shadow-xs pr-10 text-sm"}
                value={searchQuery}
                onChange={handleSearch}
                Icon={<FaSearch className="text-[#EE334B]" size={16} />}
              />
              {showResults && searchQuery.length >= 2 && (
                <div className="fixed z-50 top-20 left-1/2 -translate-x-1/2 w-[calc(100vw-0.5rem)] max-w-xl bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto pt-2">
                  {isSearchLoading ? (
                    <div className="flex justify-center items-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#213554]"></div>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <ProductSelectionProvider>
                      <div className="grid grid-cols-2 gap-2 p-2">
                        {searchResults.slice(0, 6).map((product) => (
                          <div 
                            key={product._id}
                            onClick={handleResultClick}
                            className="h-auto w-full"
                          >
                            <ProductCard 
                              data={product} 
                              disableSelection={true}
                              size="compact"
                            />
                          </div>
                        ))}
                      </div>
                    </ProductSelectionProvider>
                  ) : (
                    <div className="p-4 text-center text-sm text-gray-500">
                      No products found
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <button 
              onClick={OpenMenu} 
              className="text-right cursor-pointer px-1.5 py-1.5 rounded-sm flex-shrink-0" 
              aria-label="Mobile Menu Toggle Button"
            >
              <span className="block h-[3px] w-[32px] bg-[#555555] mb-[4px] ml-auto"></span>
              <span className="block h-[3px] w-[24px] bg-[#555555] mb-[4px] ml-auto"></span>
              <span className="block h-[3px] w-[16px] bg-[#555555] ml-auto"></span>
            </button>
          </div>
        </div>
      </div>
      <BottomNav Menu={menu} OpenMenu={OpenMenu} />
      
      {/* Request Quote Modal */}
      <GetQuoteModal 
        isModalOpen={isQuoteModalOpen} 
        setIsModalOpen={setIsQuoteModalOpen}
        closeModal={() => setIsQuoteModalOpen(false)}
      />
    </div>
  );
};

export default Navbar;