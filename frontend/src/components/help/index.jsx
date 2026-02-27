import React from 'react'
import umbrellaHelp from '../../assets/images/umbrella-help.png'
import Button from '../common/Button'

const Help = () => {
  return (
    <div className=' bg-[#192133] py-10'>
        <div className='max-w-8xl w-[95%] mx-auto '>
            <div className='grid grid-cols-2 gap-10 items-center'>
                <div className=''>
                    <img src={umbrellaHelp} alt="" className='rounded-full h-94 w-full object-cover'  />
                    </div>
                <div className=' space-y-6'>
                    <h2 className='text-white text-3xl font-bold'>Help when you need it, every step of the way.</h2>
                    <p className='text-white mt-4'>From design help to product advice, our team is here to help when and how you want – so you can create with confidence.</p>
                    <Button variant='white' label={"Get help now"}/>
                </div>

            </div>

        </div>
        
    </div>
  )
}

export default Help