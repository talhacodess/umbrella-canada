import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/brand/logo.png';
import { FaFacebookSquare, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { RiInstagramLine } from 'react-icons/ri';
import { IoLogoYoutube } from 'react-icons/io';
import img1 from '../../assets/images/footer/google-reviws-logo.webp';
import img2 from '../../assets/images/footer/Trustpilot_logo.png';
import img3 from '../../assets/images/footer/reviews-io-logo.webp';
import img4 from '../../assets/images/footer/fedex.png';
import img5 from '../../assets/images/footer/dhl.png';
import img6 from '../../assets/images/footer/United_States_Postal_Service.png';
import { IoCallOutline, IoLocationOutline } from 'react-icons/io5';
const Footer = () => {
  return (
    <div className=''>

    <div className=' sm:max-w-8xl max-w-[95%] mx-auto'>
    <div  className=''>
     <div  className=' flex sm:flex-row flex-col border-b gap-1.5 border-gray-200 justify-between pb-10 sm:pt-10 pt-0'>
        <div className=' sm:w-4/12 w-12/12'>
          <img src={logo} alt='' className=' w-[300px]' loading="eager" fetchpriority="high" />
          <p className=' text-[#213554] pt-1.5'>We offer Packaging Boxes delivered to your door. Secure, professional, and affordable, our custom made packaging boxes are guaranteed to protect and transport your valuable items. Our devoted team is always there to serve you.</p>
          <div className=' flex pt-3 items-center gap-2'>
      <Link to={'#'}>
      <FaFacebookSquare className=' text-gray-400' size={20} />
      </Link>
      <Link to={'#'}>
      <FaXTwitter   className=' text-gray-400' size={20} />
      </Link>
      <Link to={'#'}>
      <RiInstagramLine  className=' text-gray-400' size={20} />
      </Link>
      <Link to={'#'}>
      <FaLinkedin  className=' text-gray-400' size={20} />
      </Link>
      <Link to={'#'}>
      <IoLogoYoutube  className=' text-gray-400' size={25} />
      </Link>
    
   </div>
        </div>
        
        <div className=' sm:w-7/12 w-full text-center'>
           <h2 className=''>Need Quick Assistance? Get In Touch</h2>
           <Link className=' flex  pt-2 items-center justify-center'>
           <IoCallOutline size={40} className='' /> 
                <h1>747-247-0456</h1>
            </Link>
            <div className=' pt-5'>
                <ul className=' flex flex-wrap gap-4 items-center justify-center '>
                    <li >
                       <Link className=' flex  gap-2 items-center'>
                       <FaWhatsapp size={25} />
                        <p className='text-lg'>747-247-0456</p>
                       </Link>
                    
                    </li>
                    <li >
                        <Link className=' flex  gap-2 items-center'>
                        <svg width={20} aria-hidden="true" class="e-font-icon-svg e-fab-skype" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M424.7 299.8c2.9-14 4.7-28.9 4.7-43.8 0-113.5-91.9-205.3-205.3-205.3-14.9 0-29.7 1.7-43.8 4.7C161.3 40.7 137.7 32 112 32 50.2 32 0 82.2 0 144c0 25.7 8.7 49.3 23.3 68.2-2.9 14-4.7 28.9-4.7 43.8 0 113.5 91.9 205.3 205.3 205.3 14.9 0 29.7-1.7 43.8-4.7 19 14.6 42.6 23.3 68.2 23.3 61.8 0 112-50.2 112-112 .1-25.6-8.6-49.2-23.2-68.1zm-194.6 91.5c-65.6 0-120.5-29.2-120.5-65 0-16 9-30.6 29.5-30.6 31.2 0 34.1 44.9 88.1 44.9 25.7 0 42.3-11.4 42.3-26.3 0-18.7-16-21.6-42-28-62.5-15.4-117.8-22-117.8-87.2 0-59.2 58.6-81.1 109.1-81.1 55.1 0 110.8 21.9 110.8 55.4 0 16.9-11.4 31.8-30.3 31.8-28.3 0-29.2-33.5-75-33.5-25.7 0-42 7-42 22.5 0 19.8 20.8 21.8 69.1 33 41.4 9.3 90.7 26.8 90.7 77.6 0 59.1-57.1 86.5-112 86.5z"></path></svg>
                        <p className='text-lg'>747-247-0456</p>
                        </Link>
                  
                    </li>
                    <li className=' flex  gap-2 items-center'>

                    <svg width={25} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 122.88 81.51"><path class="cls-1" d="M122.88,58.27l-23,23.24V69.93c-14.54-3-26,.31-34.76,11.37,1.51-22.75,17.06-33.73,34.76-34.46V35l23,23.23ZM6.68,0h93.6a6.54,6.54,0,0,1,2.54.51A6.72,6.72,0,0,1,105,2a6.65,6.65,0,0,1,2,4.72V26.4a.62.62,0,0,1-.62.62.66.66,0,0,1-.48-.22,9.31,9.31,0,0,0-2-1.61,9.77,9.77,0,0,0-2.36-1,.63.63,0,0,1-.45-.59V9.86L70.92,35.55l5.49,5.76a.63.63,0,0,1,0,.87l-.16.1c-.68.37-1.36.75-2,1.15s-1.32.82-2,1.26a.61.61,0,0,1-.82-.12l-5-5.21-10.21,8.7a2.92,2.92,0,0,1-3.76,0L41.72,39.34,9.35,71.8H52.93a.61.61,0,0,1,.62.61l0,.19c-.17.74-.33,1.48-.47,2.22v0c-.14.73-.27,1.51-.39,2.32a.62.62,0,0,1-.61.52H6.68a6.59,6.59,0,0,1-2.55-.51A6.83,6.83,0,0,1,2,75.72,6.72,6.72,0,0,1,.51,73.55v0A6.57,6.57,0,0,1,0,71V6.68A6.63,6.63,0,0,1,.51,4.13,6.83,6.83,0,0,1,2,2,6.94,6.94,0,0,1,4.13.51,6.59,6.59,0,0,1,6.68,0ZM5.89,67,37.15,35.61,5.89,10.12V67ZM10,5.89,54.29,42,96.69,5.89Z"></path></svg>
                        <p className=' text-lg'>sales@x-packaging.com</p>
                    </li>
                </ul>
                <li className=' flex  gap-2 justify-center pt-2.5 items-center'>
                    <Link className=' flex gap-1.5'>
                    <IoLocationOutline size={25} />
                        <p className=' text-lg'>9854 National Blvd # 1042 Los Angeles, CA 90034 USA</p>
                    </Link>
                
                    </li>
            </div>

        </div>
        <div>
            
        </div>
    </div>   
    <div className=' sm:py-8  py-4 grid md:grid-cols-5 grid-cols-2'>
     <div className=''>
        <h6 className=' uppercase text-lg text-[#EE334B]'>Company</h6>
        <ul className=' pt-1.5'>
            <li>
                <Link to={'#'} className=' font-semibold'>About Us</Link>
            </li>
            <li>
                <Link to={'#'} className=' font-semibold'>Terms & Conditions</Link>
            </li>
            <li>
                <Link to={'#'} className=' font-semibold'>Refund / Cancellation Policy</Link>
            </li>
            <li>
                <Link to={'#'} className=' font-semibold'>Shipping Policy</Link>
            </li>
            <li>
                <Link to={'#'} className=' font-semibold'>Bulk Order</Link>
            </li>
        </ul>
    </div>
    <div className=''>
        <h6  className=' uppercase text-lg text-[#EE334B]'>Products Packaging</h6>
        <ul  className=' pt-1.5'>
            <li>
                <Link to={'#'} className=' font-semibold'>Mailer Boxes</Link>
            </li>
            <li>
                <Link to={'#'} className=' font-semibold'>Rigid Boxes</Link>
            </li>
            <li>
                <Link to={'#'} className=' font-semibold'>Kraft Boxes</Link>
            </li>
            <li>
                <Link to={'#'} className=' font-semibold'>Cardboard Boxes</Link>
            </li>
            <li>
                <Link to={'#'} className=' font-semibold'>Sustainable Packaging</Link>
            </li>
            <li>
                <Link to={'#'} className=' font-semibold'>Product Boxes</Link>
            </li>
        </ul>
    </div>  

    <div className=''>
        <h6  className=' uppercase text-lg text-[#EE334B]'>Packaging Styles</h6>
        <ul className=' pt-1.5'>
            <li>
                <Link to={'#'} className=' font-semibold'>Sleeve and Tray</Link>
            </li>
            <li>
                <Link to={'#'} className=' font-semibold'>Die Cut Boxes</Link>
            </li>
            <li>
                <Link to={'#'} className=' font-semibold'>Cigarette Boxes</Link>
            </li>
            <li>
                <Link to={'#'} className=' font-semibold'>Child Resistant Boxes</Link>
            </li>
            <li>
                <Link to={'#'} className=' font-semibold'>Window Boxes</Link>
            </li>
            <li>
                <Link to={'#'} className=' font-semibold'>Gable Boxes</Link>
            </li>
        </ul>
    </div>  
    <div className=''>
        <h6  className=' uppercase text-lg text-[#EE334B]'>Inspiration</h6>
        <ul className=' pt-1.5'>
            <li>
                <Link to={'/blogs'} className=' font-semibold'>Blog</Link>
            </li>
            <li>
                <Link to={'/reviews'} className=' font-semibold'>Reviews</Link>
            </li>
            <li>
                <Link to={'#'} className=' font-semibold'>Materials</Link>
            </li>
           
        </ul>
    </div> 
    <div className=''>
        <h6  className=' uppercase text-lg text-[#EE334B]'>Contact Us</h6>
        <ul className=' pt-1.5'>
            <li>
                <Link to={'#'} className=' font-semibold'>866-255-2112</Link>
            </li>
            <li>
                <Link to={'#'} className=' font-semibold'>orders@xcustompackaging.com</Link>
            </li>
            <li>
                <Link to={'/contact-us'} className=' font-semibold'>Contact Us</Link>
            </li>
           
        </ul>
    </div> 
    </div>

    <div  className=' flex sm:flex-row gap-2.5 flex-col justify-between border-t border-gray-200 items-center py-4'>
        <div className=' sm:w-6/12 w-full'>
         <h5 className=' uppercase font-bold'>WHERE WE'RE TRUSTED</h5>
          <ul className=' flex items-center gap-5'>
            <li>
            <img  src={img1} alt='' className=' w-24' loading="lazy" />
            </li>
            <li>
            <img  src={img2} alt='' className=' w-32' loading="lazy" />
            </li>
            <li>
            <img  src={img3} alt='' className=' w-32' loading="lazy" />
            </li>
          </ul>
        </div>
        <div className=' sm:w-6/12 w-full flex sm:justify-end justify-start'>
            <div>
            <h5 className=' uppercase font-bold'>Our Logistics Partners</h5>
            <ul className=' flex  items-center gap-2 pt-2'>
                <li>
                    <img  src={img4} className=' w-32' alt='' loading="lazy" />
                </li>
                <li>
                    <img  src={img5} className=' w-32' alt='' loading="lazy" />
                </li>
                <li>
                    <img  src={img6} className=' w-32' alt='' loading="lazy" />
                </li>
            </ul>
            </div>
        </div>
        <div>

        </div>
    </div>


    </div>

    {/* bottom footer */}
    <div  className=' py-1.5 border-gray-200 border-t'>
    <div className=' flex sm:flex-row flex-col gap-2 justify-between items-center'>


<div>
    <ul className=' flex flex-wrap  sm:justify-start justify-between  items-center  gap-3'>
        <li className=' text-sm'>
        © Half Price Packaging 2025
        </li>
        <li>
          <Link to={'/terms-and-conditions'} className=' font-semibold'>
          Terms & Conditions
          </Link>
        </li>
        <li>
          <Link to={''} className=' font-semibold'>
          Privacy Policy
          </Link>
        </li>
    </ul>
</div>
</div>
    </div>
     
    </div>
     
    </div>
  )
}

export default Footer