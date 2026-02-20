import {
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaFacebookF,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import usa from "../../assets/images/flag/us.svg";
import uk from "../../assets/images/flag/uk.svg";
const TopNav = () => {
  return (
    <div className="bg-white border-t-1 border-[#EE354D]">
      <div className="sm:max-w-8xl max-w-[95%] py-1 mx-auto">
        <div className="flex sm:justify-between justify-center flex-wrap items-center  sm:py-2 py-1.5 border-b border-gray-200 text-sm text-gray-700 gap-4">
          {/* Left Side: Social Media Icons with About US */}
          <div className="flex items-center space-x-2">
            <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#EE334B] group transition-colors">
              <FaFacebookF size={14} className="text-gray-600 group-hover:text-white transition-colors" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#EE334B] group transition-colors">
              <FaXTwitter size={14} className="text-gray-600 group-hover:text-white transition-colors" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#EE334B] group transition-colors">
              <FaInstagram size={14} className="text-gray-600 group-hover:text-white transition-colors" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#EE334B] group transition-colors">
              <FaPinterest size={14} className="text-gray-600 group-hover:text-white transition-colors" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#EE334B] group transition-colors">
              <FaYoutube size={14} className="text-gray-600 group-hover:text-white transition-colors" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#EE334B] group transition-colors">
              <FaLinkedinIn size={14} className="text-gray-600 group-hover:text-white transition-colors" />
            </a>
            {/* Red Separator */}
            <div className="h-8 w-0.5 bg-[#213554] mx-2"></div>
            {/* About US */}
            <Link to="/about-us" className="text-[#213554] font-semibold text-lg sm:text-2xl" style={{ fontFamily: 'cursive', fontStyle: 'italic' }}>
              About US
            </Link>
          </div>

          {/* Right Side: Contact Info */}
          <div className="flex flex-wrap justify-center items-center space-x-4 space-y-1">
            <div className="flex items-center space-x-2">
              <MdEmail size={15} />
              <span>sales@umbrellapackaging.com</span>
            </div>
            {/* <div className="flex items-center space-x-2">
              <FiPhone size={15} />
              <span>747-247-0456</span>
            </div> */}
            <Link to="/my-account" className="flex items-center space-x-2 hover:text-[#EE334B] transition-colors cursor-pointer">
              <AiOutlineUser size={18} />
              <span>My Account</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
