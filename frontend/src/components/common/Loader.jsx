// components/Loader/Loader.tsx
import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-[#213554]/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-[#EE334B] rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-[#213554] font-semibold">Loading...</p>
    </div>
  );
};

export default Loader;