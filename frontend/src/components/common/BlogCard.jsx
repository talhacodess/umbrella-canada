import React, { useContext, createContext } from "react";
import { Link } from "react-router-dom";
import { BaseUrl } from "../../utils/BaseUrl";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";

// Context for blog selection
const BlogSelectionContext = createContext();

export const BlogSelectionProvider = ({ children }) => {
  const [selectedBlogs, setSelectedBlogs] = React.useState(new Set());
  
  const toggleBlog = (blogId) => {
    setSelectedBlogs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(blogId)) {
        newSet.delete(blogId);
      } else {
        newSet.add(blogId);
      }
      return newSet;
    });
  };

  return (
    <BlogSelectionContext.Provider value={{ selectedBlogs, toggleBlog }}>
      {children}
    </BlogSelectionContext.Provider>
  );
};

export const useBlogSelection = () => {
  const context = useContext(BlogSelectionContext);
  if (!context) {
    return { selectedBlogs: new Set(), toggleBlog: () => {} };
  }
  return context;
};

const stripHtml = (html) => {
  if (!html) return "";
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const BlogCard = ({ data, disableSelection = false }) => {
  const { selectedBlogs, toggleBlog } = useBlogSelection();
  const isSelected = selectedBlogs.has(data?._id);

  const handleBlogClick = (e) => {
    // Only handle selection if not disabled and click is not on the link
    if (!disableSelection && !e.target.closest('a')) {
      e.preventDefault();
      e.stopPropagation();
      if (data?._id) {
        toggleBlog(data._id);
      }
    }
  };
  const previewText = data?.shortDescription 
    ? data.shortDescription.slice(0, 120) + "..."
    : stripHtml(data?.content).slice(0, 120) + "...";

  const cardContent = (
    <div className={`rounded-2xl overflow-hidden w-full h-full bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-[#EE334B]/20 flex flex-col transform hover:-translate-y-1 ${isSelected && !disableSelection ? 'ring-2 ring-[#EE334B] shadow-lg' : ''}`}>
          {/* Blog Image */}
          <div className="w-full h-48 sm:h-56 md:h-64 overflow-hidden relative rounded-t-2xl">
            <img
              src={`${BaseUrl}/${data?.image}`}
              alt={data?.imageAltText || data?.title}
              className="w-full h-full object-cover  transform group-hover:scale-110 transition-transform duration-700"
            />
            {/* Gallery Hover Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-t-2xl"></div>
            {/* Gallery Shine Effect - Sweeps across on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-t-2xl"></div>
            {/* Badge overlay */}
            <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20">
              <h6 className="inline-block px-2 py-1 sm:px-4 sm:py-1.5 text-xs font-bold text-white bg-[#EE334B] rounded-full shadow-lg backdrop-blur-sm">
                Knowledge Base
              </h6>
            </div>
          </div>

          {/* Blog Content */}
          <div className="p-4 sm:p-5 md:p-6 text-start flex flex-col flex-grow">
            {/* Date */}
            {data?.createdAt && (
              <div className="flex items-center text-gray-500 text-xs mb-2 sm:mb-3">
                <FaCalendarAlt className="mr-2 text-[#EE334B]" />
                <span>{formatDate(data.createdAt)}</span>
              </div>
            )}

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-bold text-[#213554] line-clamp-2 mb-2 sm:mb-3 group-hover:text-[#EE334B] transition-colors duration-300 leading-tight">
              {data?.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 line-clamp-3 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed flex-grow">
              {previewText}
            </p>

            {/* Read More Button */}
            <div className="flex justify-start items-center mt-auto pt-2">
              <span className="inline-flex items-center text-[#EE334B] font-semibold text-xs sm:text-sm group-hover:gap-2 gap-1 transition-all duration-300">
                Continue Reading
                <FaArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </div>
          </div>
        </div>
  );

  return (
    <>
      {disableSelection ? (
        // For related blogs - no selection, just navigation
        <div className="group relative w-full h-full">
          <Link to={`/blog/${data?.slug}`} className="block w-full h-full">
            {cardContent}
          </Link>
        </div>
      ) : (
        // For blog pages - with selection functionality
        <div className="group relative w-full h-full">
          <div 
            className={`transition-all duration-300 cursor-pointer w-full h-full ${isSelected ? 'ring-2 ring-[#EE334B] rounded-2xl p-0.5 sm:p-1' : ''}`}
            onClick={handleBlogClick}
          >
            <Link 
              to={`/blog/${data?.slug}`}
              className="block w-full h-full"
              onClick={(e) => {
                // Allow navigation to work normally
                e.stopPropagation();
              }}
            >
              {cardContent}
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogCard;