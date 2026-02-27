import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';
import CardSlider from '../common/CardSlider';


const Tools = () => {
 

  return (
    <div className=' bg-[#f7f7f7] py-10'>
      <div className=' sm:max-w-8xl w-[95%] mx-auto'>
          <div className="text-left mb-8 inline-flex items-baseline gap-2">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
               Tools to help build your business
                    </h2>
                    
        
                      {/* <Link
                        to=""
                        className="ml-2 uppercase font-bold text-[#AC292A] inline-flex items-center align-baseline hover:opacity-80 transition-opacity"
                      >
                       See all
                        <FaAngleRight className="ml-1" size={15} />
                      </Link>
                */}
        
                  </div>
      
       <div className='grid grid-cols-6 gap-5'>
        <div className='flex flex-col bg-white p-4 rounded-xl'>
            <img src="https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_auto,f_auto,w_450/legacy_dam/en-us/S001759635/MXP28294-Service-Tile-Refresh-VCS-002" alt="" className='rounded-xl w-full h-auto' />
            <h3 className="mt-2 text-sm font-medium text-gray-700">VCS</h3>

            </div>
        <div className='flex flex-col bg-white p-4 rounded-xl'>
            <img src="https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_auto,f_auto,w_450/legacy_dam/en-us/S001759528/MXP28294-Service-Tile-Refresh-Design-Help-002" alt="" className='rounded-xl w-full h-auto' />
            <h3 className="mt-2 text-sm font-medium text-gray-700">Design Help</h3>

            </div>
        <div className='flex flex-col bg-white p-4 rounded-xl'>
            <img src="https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_auto,f_auto,w_450/legacy_dam/en-us/S001759542/MXP28294-Service-Tile-Refresh-ProAdvantage-Reseller-002" alt="" className='rounded-xl w-full h-auto' />
            <h3 className="mt-2 text-sm font-medium text-gray-700">Pro Advantage Reseller</h3>
            </div>
        <div className='flex flex-col bg-white p-4 rounded-xl'>
            <img src="https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_auto,f_auto,w_450/legacy_dam/en-us/S001759590/MXP28294-Service-Tile-VistaCreate-002" alt="" className='rounded-xl w-full h-auto' />
            <h3 className="mt-2 text-sm font-medium text-gray-700">Vista Create</h3>
            </div>
        <div className='flex flex-col bg-white p-4 rounded-xl'>
            <img src="https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_auto,f_auto,w_450/legacy_dam/en-us/S001759566/MXP28294-Service-Tile-Refresh-Vista-Wix-Websites-002" alt="" className='rounded-xl w-full h-auto' />
            <h3 className="mt-2 text-sm font-medium text-gray-700">Vista Wix Websites</h3>
            </div>
        <div className='flex flex-col bg-white p-4 rounded-xl'>
            <img src="https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_auto,f_auto,w_450/legacy_dam/en-us/S001759523/MXP28294-Service-Tile-Logomaker-002" alt="" className='rounded-xl w-full h-auto' />
            <h3 className="mt-2 text-sm font-medium text-gray-700">Logomaker</h3>
            </div>
        
       
       </div>
      </div>

    </div>
  )
}

export default Tools;