import React from 'react'
import { IoHomeOutline } from 'react-icons/io5'
import { LiaAngleRightSolid } from 'react-icons/lia'

const Banner = ({subTitle}) => {
  return (
    <div className='py-3   flex items-center border-b border-gray-100'>
       <div className='px-6 sm:px-12 w-full'>
         <div className='flex gap-2 items-center text-sm mb-2'>
           <IoHomeOutline className="text-[#213554]" /> 
           <LiaAngleRightSolid className="text-gray-400" />
           <p className="text-gray-600">{subTitle}</p>
         </div>

       </div>
    </div>
  )
}

export default Banner