import React from 'react'
import Button from './Button'
import hero from "../../assets/images/banner-slider-image.webp";
import { Link } from 'react-router-dom'
import { IoHomeOutline } from 'react-icons/io5'
import { LiaAngleRightSolid } from 'react-icons/lia'


function AboutBanner() {
  return (
     <div
      className="w-full sm:h-[60vh] h-[70vh]"
      style={{
        backgroundImage: `url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="sm:max-w-8xl h-full flex   items-center max-w-[95%] mx-auto">
      <div className=" max-w-xl">
        <div>
             <div className=' flex gap-2 items-center text-white'>
       <Link to={'/'}><IoHomeOutline color='#fff'/></Link> <LiaAngleRightSolid color='#fff' />
            <p>About us</p>
        </div>
            

          <h1 className=" text-white">
            Custom Packaging That Defines Your Brand!
          </h1>
          <div className=" py-6">
            <p className=" text-white font-semibold">
              Celebrate the New Year with Up To 30% Off!
            </p>
            <p className=" text-white">Let's Showcase Your Brand Better</p>
          </div>
          <Link to={'/shop'}>
          <Button className="bg-white font-semibold" label="Browse Our Catalogue" />
          </Link>
          
        </div>
      </div>

      </div>
    
    </div>
  )
}

export default AboutBanner