import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';
import CardSlider from '../common/CardSlider';


const Arrival = () => {
 

  return (
    <div className=' bg-[#fff] py-10'>
      <div className=' sm:max-w-8xl w-[95%] mx-auto'>
          <div className="text-left mb-8 inline-flex items-baseline gap-2">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                 Shop new arrivals, from clothing to packaging

                    </h2>
                    
        
                      <Link
                        to=""
                        className="ml-2 uppercase font-bold text-[#AC292A] inline-flex items-center align-baseline hover:opacity-80 transition-opacity"
                      >
                       See all
                        <FaAngleRight className="ml-1" size={15} />
                      </Link>
               
        
                  </div>
      
       <div className='grid grid-cols-4 gap-5'>
        <div className='flex flex-col'>
            <img src="https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_auto,f_auto,w_450/legacy_dam/en-us/S002076739/MXP45402-Jan5-NPI-Product-Tile-Home&Gifts-001" alt="" className='rounded-xl' />
            <h3 className="mt-2 text-sm font-medium text-gray-700">Home & Gifts</h3>

            </div>
        <div className='flex flex-col'>
            <img src="https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_auto,f_auto,w_450/legacy_dam/en-us/S002076712/MXP45402-Jan5-NPI-Product-Tile-Signage-001" alt="" className='rounded-xl' />
            <h3 className="mt-2 text-sm font-medium text-gray-700">Signage</h3>

            </div>
        <div className='flex flex-col'>
            <img src="https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_auto,f_auto,w_450/legacy_dam/en-us/S002076714/MXP45402-Jan5-NPI-Product-Tile-Promo-Products-001" alt="" className='rounded-xl' />
            <h3 className="mt-2 text-sm font-medium text-gray-700">Promo Products</h3>
            </div>
        <div className='flex flex-col'>
            <img src="https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_auto,f_auto,w_450/legacy_dam/en-us/S002076749/MXP45402-Jan5-NPI-Product-Tile-Clothing&Bags-001" alt="" className='rounded-xl' />
            <h3 className="mt-2 text-sm font-medium text-gray-700">Clothing & Bags</h3>
            </div>
        
       
       </div>
      </div>

    </div>
  )
}

export default Arrival;