import React from 'react'
import { IoHomeOutline } from 'react-icons/io5'
import { LiaAngleRightSolid } from 'react-icons/lia'

const Banner = ({title,subTitle}) => {
  return (
    <div className='h-48 bg-gradient-to-r from-[#213554]/5 via-white to-[#EE334B]/5 flex items-center border-b border-gray-100'>
       <div className='px-6 sm:px-12 w-full'>
         <div className='flex gap-2 items-center text-sm mb-2'>
           <IoHomeOutline className="text-[#213554]" /> 
           <LiaAngleRightSolid className="text-gray-400" />
           <p className="text-gray-600">{subTitle}</p>
         </div>
         <h2 className="text-3xl sm:text-4xl font-bold text-[#213554]">{title}</h2> 
       </div>
    </div>
  )
}

export default Banner