import React from "react";
import Button from "./Button";

const ProductDetail = ({ title, subTitle, description, image, buttonUrl }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="flex sm:flex-row flex-col items-stretch">
        <div className="sm:w-6/12 w-full">
          <div className="sm:p-8 p-6 flex flex-col justify-center h-full">
            <div className="mb-2">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-[#EE334B] bg-[#EE334B]/10 rounded-full">
                Featured Product
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#213554] mb-3 leading-tight">
              {title}
            </h1>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#213554]/80 mb-4">
              {subTitle}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6 text-base">
              {description}
            </p>
            <div className="mt-auto">
              <Button
                label={"Get Quote"}
                className="bg-[#213554] hover:bg-[#213554]/90 text-white mt-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                onClick={() => window.location.href = buttonUrl}
              />
            </div>
          </div>
        </div>
        <div className="sm:w-6/12 w-full bg-gradient-to-br from-[#213554]/5 to-[#EE334B]/5 relative overflow-hidden">
          {image && (
            <div className="h-full w-full p-6 flex items-center justify-center">
              <img 
                src={image} 
                alt={title || "Product"} 
                className="w-full h-auto max-h-80 object-contain rounded-lg shadow-md"
              />
            </div>
          )}
          {!image && (
            <div className="h-full w-full flex items-center justify-center p-6">
              <div className="w-full h-64 bg-gradient-to-br from-[#213554]/10 to-[#EE334B]/10 rounded-lg flex items-center justify-center">
                <svg className="w-24 h-24 text-[#213554]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;