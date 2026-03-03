import React from 'react'
import Button from '../common/Button'

const Help = ({img, title, description, btn, className}) => {
  return (
    <div className={`bg-[#192133] py-10 ${className}`}>
        <div className={`max-w-8xl w-[95%] mx-auto`}>
            <div className={`grid grid-cols-2 gap-10 items-center ${className}`}>
                <div className=''>
                    <img src={img} alt="" className='rounded-xl h-94 w-full object-cover'  />
                    </div>
                <div className=' space-y-6'>
                    <h2 className='text-white text-3xl font-bold'>{title}</h2>
                    <p className='text-white mt-4'>{description}</p>
                    <Button variant='white' label={btn}/>
                </div>

            </div>

        </div>
        
    </div>
  )
}

export default Help