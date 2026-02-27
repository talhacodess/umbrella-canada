import React, { useState, useEffect, useRef } from "react";

import { FaAngleDown, FaAngleRight, FaBed, FaFacebookF, FaInstagram, FaLinkedinIn, FaPinterest, FaYoutube, FaWhatsapp } from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

import logo from "../../assets/images/brand/logo.png";

import usa from '../../assets/images/flag/usa.svg';

import uk from '../../assets/images/flag/uk.svg';

import australia from '../../assets/images/flag/australia.svg';

import uae from '../../assets/images/flag/uae.svg';

import chaina from '../../assets/images/flag/chaina.svg';
import chat from "../../assets/images/header/chat.svg";
import projects from "../../assets/images/header/projects.svg";
import quote from "../../assets/images/header/quote.svg";
import user from "../../assets/images/header/user.svg";



import { canada } from "../../assets";

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

    <>

      {/**top navbar */}

      <div className="bg-[#f7f7f7] border-b border-gray-200">

        <div className="max-w-[95%] mx-auto py-2">

          <div className="flex flex-wrap gap-4 items-center justify-between">



            {/* LEFT SIDE: Socials + Local Globally */}

            <div className="flex items-center flex-wrap gap-4">



              {/* Social Media Icons */}

              <div className="flex items-center space-x-2">

                <a href="#" className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-[#AC292A] group transition-all border border-gray-100">

                  <FaFacebookF size={14} className="text-gray-600 group-hover:text-white transition-colors" />

                </a>

                <a href="#" className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-[#AC292A] group transition-all border border-gray-100">

                  <FaXTwitter size={14} className="text-gray-600 group-hover:text-white transition-colors" />

                </a>

                <a href="#" className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-[#AC292A] group transition-all border border-gray-100">

                  <FaInstagram size={14} className="text-gray-600 group-hover:text-white transition-colors" />

                </a>

                <a href="#" className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-[#AC292A] group transition-all border border-gray-100">

                  <FaPinterest size={14} className="text-gray-600 group-hover:text-white transition-colors" />

                </a>

                <a href="#" className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-[#AC292A] group transition-all border border-gray-100">

                  <FaYoutube size={14} className="text-gray-600 group-hover:text-white transition-colors" />

                </a>

                <a href="#" className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-[#AC292A] group transition-all border border-gray-100">

                  <FaLinkedinIn size={14} className="text-gray-600 group-hover:text-white transition-colors" />

                </a>

              </div>



              {/* Separator Line */}

              <div className="hidden sm:block h-6 w-[1px] bg-gray-300 mx-1"></div>



              {/* Local Globally Icons */}

              <div className="flex items-center space-x-2 text-sm">

                <span className="text-gray-700 font-bold hidden md:inline">Local Globally:</span>

                <div className="flex items-center space-x-1">

                  <img src={usa} alt="USA" className="w-6 h-6 object-contain" title="USA" />

                  <img src={uk} alt="UK" className="w-6 h-6 object-contain" title="UK" />

                  <img src={canada} alt="Canada" className="w-6 h-6 object-contain" title="Canada" />

                  <img src={australia} alt="Australia" className="w-6 h-6 object-contain" title="Australia" />

                  <img src={uae} alt="UAE" className="w-6 h-6 object-contain" title="UAE" />

                  <img src={chaina} alt="China" className="w-6 h-6 object-contain" title="China" />

                </div>

              </div>

            </div>



            {/* RIGHT SIDE: Contact Info */}

            <div className="flex items-center">

              <ul className="flex flex-wrap gap-6 items-center">

                {/* Phone */}

                <li>

                  <Link to="tel:7472470456" className="flex gap-2 items-center hover:text-[#AC292A] transition-colors group">

                    <svg

                      width={18}

                      height={18}

                      stroke="currentColor"

                      fill="none"

                      strokeWidth="2"

                      viewBox="0 0 24 24"

                      strokeLinecap="round"

                      strokeLinejoin="round"

                      className="text-gray-600 group-hover:text-[#AC292A]"

                      xmlns="http://www.w3.org/2000/svg"

                    >

                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>

                    </svg>

                    <p className="text-sm md:text-base font-semibold text-gray-700 group-hover:text-[#AC292A]">747-247-0456</p>

                  </Link>

                </li>



                {/* Email */}

                <li>

                  <Link to="mailto:sales@umbrellapackaging.ca" className="flex gap-2 items-center hover:text-[#AC292A] transition-colors group">

                    <svg

                      width={22}

                      height={22}

                      xmlns="http://www.w3.org/2000/svg"

                      viewBox="0 0 122.88 81.51"

                      fill="currentColor"

                      className="text-gray-600 group-hover:text-[#AC292A]"

                    >

                      <path d="M122.88,58.27l-23,23.24V69.93c-14.54-3-26,.31-34.76,11.37,1.51-22.75,17.06-33.73,34.76-34.46V35l23,23.23ZM6.68,0h93.6a6.54,6.54,0,0,1,2.54.51A6.72,6.72,0,0,1,105,2a6.65,6.65,0,0,1,2,4.72V26.4a.62.62,0,0,1-.62.62.66.66,0,0,1-.48-.22,9.31,9.31,0,0,0-2-1.61,9.77,9.77,0,0,0-2.36-1,.63.63,0,0,1-.45-.59V9.86L70.92,35.55l5.49,5.76a.63.63,0,0,1,0,.87l-.16.1c-.68.37-1.36.75-2,1.15s-1.32.82-2,1.26a.61.61,0,0,1-.82-.12l-5-5.21-10.21,8.7a2.92,2.92,0,0,1-3.76,0L41.72,39.34,9.35,71.8H52.93a.61.61,0,0,1,.62.61l0,.19c-.17.74-.33,1.48-.47,2.22v0c-.14.73-.27,1.51-.39,2.32a.62.62,0,0,1-.61.52H6.68a6.59,6.59,0,0,1-2.55-.51A6.83,6.83,0,0,1,2,75.72,6.72,6.72,0,0,1,.51,73.55v0A6.57,6.57,0,0,1,0,71V6.68A6.63,6.63,0,0,1,.51,4.13,6.83,6.83,0,0,1,2,2,6.94,6.94,0,0,1,4.13.51,6.59,6.59,0,0,1,6.68,0ZM5.89,67,37.15,35.61,5.89,10.12V67ZM10,5.89,54.29,42,96.69,5.89Z"></path>

                    </svg>

                    <p className="text-sm md:text-base font-semibold text-gray-700 group-hover:text-[#AC292A]">sales@umbrellapackaging.ca</p>

                  </Link>

                </li>

              </ul>

            </div>



          </div>

        </div>

      </div>



      <div className={`${menu ? '' : 'sticky'} top-0 z-50 transition-all duration-300 ${isScrolled

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

            <div className="flex items-center sm:w-5/12 lg:w-6/12 gap-2 sm:gap-10 flex-shrink-0">

              <Link to={'/'} className="flex-shrink-0">

                <img

                  src={logo}

                  alt=""

                  className="w-[100px] sm:w-56 md:w-[250px] lg:w-[150px] h-auto "

                  loading="eager"

                  fetchpriority="high"

                />

              </Link>

              {/* Search Bar - Hidden on very small screens, visible from sm */}

              <div className="hidden sm:flex flex-1 max-w-2xl relative search-container" ref={searchRef}>

                <Input

                  placeholder={"What are you looking for today?"}

                  className={"rounded-sm p-2 sm:p-3 w-full border bg-white border-gray-300 shadow-xs pr-8 sm:pr-10 text-xs sm:text-sm"}

                  value={searchQuery}

                  onChange={handleSearch}

                  Icon={<HiOutlineSearch className="text-[#AC292A]" size={23} />}

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

              {/* Help Button */}

              <Link

                to="/portfolio"

                className="group flex items-center gap-1  rounded-lg  py-1 lg:py-2 transition-all cursor-pointer "

              >

                <div className="w-18 h-18">

                  <img src={chat} alt="" />



                </div>

                <div className="flex flex-col">

                  <span className="font-bold text-[#213554] text-xs lg:text-sm leading-tight">Help is here</span>

                  <span className="text-[10px] lg:text-xs text-gray-500 mt-0.5">888-276-1239</span>

                </div>

              </Link>



              {/* Project Button */}

              <button

                onClick={() => setIsQuoteModalOpen(true)}

                className="group flex items-center gap-1  rounded-lg px-1 lg:px-3 py-1 lg:py-2 transition-all cursor-pointer"

              >

                <div className="w-12 h-12">

                  <img src={projects} alt="" />





                </div>



                <div className="flex flex-col">

                  <span className="font-bold text-[#213554] text-xs lg:text-sm leading-tight">Our Project</span>

                  <span className="text-[10px] lg:text-xs text-gray-500 mt-0.5">Check For Ideas</span>

                </div>

              </button>

              {/* Custom Pricing Button */}

              <button

                onClick={() => setIsQuoteModalOpen(true)}

                className="group flex items-center gap-1  rounded-lg px-1 lg:px-3 py-1 lg:py-2 transition-all cursor-pointer"

              >

                <div className="w-12 h-12">

                  <img src={quote} alt="" />





                </div>



                <div className="flex flex-col">

                  <span className="font-bold text-[#213554] text-xs lg:text-sm leading-tight">Custom</span>

                  <span className="text-[10px] lg:text-xs text-gray-500 mt-0.5">Pricing</span>

                </div>

              </button>

              {/* User Button */}

              <button

                onClick={() => setIsQuoteModalOpen(true)}

                className="group flex items-center gap-1  rounded-lg px-1 lg:px-3 py-1 lg:py-2 transition-all cursor-pointer"

              >

                <div className="w-12 h-12">

                  <img src={user} alt="" />





                </div>



                <div className="flex flex-col">

                  <span className="font-bold text-[#213554] text-xs lg:text-sm leading-tight">User</span>

                  <span className="text-[10px] lg:text-xs text-gray-500 mt-0.5">Login / Register</span>

               

                </div>

              </button>





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

                  Icon={<FaSearch className="text-[#AC292A]" size={16} />}

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

    </>

  );

};



export default Navbar;