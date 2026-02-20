import React from "react";
const SpecialCard = ({images}) => {
  return (
    <div className="rounded-md w-full max-w-8xl mx-auto min-w-0">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 items-center w-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`${
              index === 0 ? "sm:col-span-1 col-span-2" : "col-span-1"
            } hover:-translate-y-3 transform transition duration-300 ease-in-out min-w-0`}
          >
            <img src={image} alt="" className="rounded-lg w-full h-auto object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialCard;
