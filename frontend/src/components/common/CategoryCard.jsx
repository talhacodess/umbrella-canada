import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({data}) => {
  return (
    <div className="w-[330px] mx-auto group">
      <Link to={data?.id} className="block">
        <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="relative sm:h-80 h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
            <img 
              src={data?.image} 
              alt={data?.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="p-4">
            <h6 className="font-bold text-[#213554] text-center text-lg pt-2 group-hover:text-[#EE334B] transition-colors duration-300">
              {data?.title}
            </h6>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
