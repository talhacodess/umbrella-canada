import React from "react";
import Button from "./Button";
import GetQuoteModal from "./GetQuoteModal";
import { useState } from "react";

const CustomBoxCard = ({ title, subTitle, description, image, buttonUrl }) => {

  const  [IsModalOpen,setIsModalOpen] = useState(false)
  return (
    <div className=" p-2 rounded-md w-full min-w-0">
      <div className="flex w-full sm:flex-row justify-between flex-col items-center">
        <div className="sm:w-12/12 w-full min-w-0">
          <div className="sm:p-5 p-3">
            <h2 className="sm:text-[35px] text-[25px] font-sans font-[600] text-[#333333] break-words">
              {title}
            </h2>
            <h3 className="pt-4 sm:text-2xl text-xl break-words">
              <strong>{subTitle}</strong>
            </h3>
            <p className="pt-2.5 break-words">{description}</p>
            <Button
               onClick={()=>setIsModalOpen(true)}
              label={"Get Quote"}
              className="bg-[#4440E6] text-white mt-2 opacity-90"
              // onClick={() => window.location.href = buttonUrl}
            />
          </div>
        </div>
        {/* <div className="sm:w-6/12 w-full min-w-0">
          <img
            src={image}
            className="rounded-lg w-full h-auto object-contain"
            alt={title}
          />
        </div> */}
      </div>

      
            <GetQuoteModal setIsModalOpen={setIsModalOpen} isModalOpen={IsModalOpen} />
    </div>
  );
};

export default CustomBoxCard;