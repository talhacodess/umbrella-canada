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

const navHeadingClass = 'text-[#ac292a] text-[11px] font-bold tracking-[0.12em] uppercase mb-4 pb-2.5 border-b-2 border-[#ac292a] inline-block'
const navLinkClass = 'text-[#555] text-sm hover:text-[#ac292a] transition-colors duration-200 no-underline'

const FooterSection = ({ title, children }) => (
  <div>
    <h6 className={navHeadingClass}>{title}</h6>
    <ul className='flex flex-col gap-2.5 list-none p-0 m-0'>
      {children}
    </ul>
  </div>
)

const Footer = () => {
  const socialLinks = [
    { icon: <FaFacebookSquare size={18} />, href: '#' },
    { icon: <FaXTwitter size={18} />, href: '#' },
    { icon: <RiInstagramLine size={18} />, href: '#' },
    { icon: <FaLinkedin size={18} />, href: '#' },
    { icon: <IoLogoYoutube size={22} />, href: '#' },
  ]

  return (
    <footer className='bg-[#f7f7f7] text-[#333]'>

      {/* CTA Banner */}
    <div className='bg-[#ac292a] py-4'>
  <div className='max-w-8xl mx-auto px-6 flex flex-wrap items-center justify-between gap-3'>
    <p className='text-white text-[15px] tracking-wide m-0'>
      Need Quick Assistance? Our packaging experts are ready to help.
    </p>
    
    <div className='flex items-center gap-6 flex-wrap'>
      {/* Phone Link - Explicitly forced white on hover */}
     <Link  to={'tel:7472470456'}
        className='flex items-center gap-2 text-white no-underline font-bold text-xl tracking-wide hover:text-white/90 transition-colors'>
        
      
        <IoCallOutline size={22} className="text-white" />
        747-247-0456
      </Link>

      <div className='flex items-center gap-4'>
        {/* WhatsApp - Explicitly forced white on hover */}
        <Link 
          to={'#'} 
          className='flex items-center gap-1.5 text-white no-underline text-sm hover:text-white/90 transition-colors'
        >
          <FaWhatsapp size={18} className="text-white" /> WhatsApp
        </Link>
        
        <span className='text-white'>|</span>
        
        {/* Email - Explicitly forced white on hover */}
        <Link to={'mailto:sales@umbrellapackaging.ca'} className='text-white no-underline text-sm hover:text-white/90 transition-colors'>
          
        
          sales@umbrellapackaging.ca
        </Link>
      </div>
    </div>
  </div>
</div>

      {/* Main Footer Body */}
      <div className='max-w-8xl mx-auto px-6 pt-14 pb-10'>

        {/* Nav Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-8 border-b border-black/[0.08] pb-12'>

          {/* Brand Column */}
          <div className='col-span-2 sm:col-span-3 lg:col-span-1'>
            <img
              src={logo}
              alt='X Packaging Logo'
              className='w-[220px] mb-4 brightness-110'
              loading='eager'
              fetchpriority='high'
            />
            <p className='text-sm leading-7 text-[#666] max-w-[280px] mb-6'>
              We offer Packaging Boxes delivered to your door. Secure, professional, and affordable,
              our custom made packaging boxes are guaranteed to protect and transport your valuable
              items. Our devoted team is always there to serve you.
            </p>
            <div className='flex items-center gap-3'>
              {socialLinks.map((item, i) => (
                <Link
                  key={i}
                  to={item.href}
                  className='flex items-center justify-center w-9 h-9 rounded-full border border-black/15 text-[#555] hover:bg-[#ac292a] hover:border-[#ac292a] hover:text-white transition-all duration-200'
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <FooterSection title='Company'>
            {['About Us', 'Terms & Conditions', 'Refund / Cancellation Policy', 'Shipping Policy', 'Bulk Order'].map(item => (
              <li key={item}><Link to={'#'} className={navLinkClass}>{item}</Link></li>
            ))}
          </FooterSection>

          {/* Products Packaging */}
          <FooterSection title='Products Packaging'>
            {['Mailer Boxes', 'Rigid Boxes', 'Kraft Boxes', 'Cardboard Boxes', 'Sustainable Packaging', 'Product Boxes'].map(item => (
              <li key={item}><Link to={'#'} className={navLinkClass}>{item}</Link></li>
            ))}
          </FooterSection>

          {/* Packaging Styles */}
          <FooterSection title='Packaging Styles'>
            {['Sleeve and Tray', 'Die Cut Boxes', 'Cigarette Boxes', 'Child Resistant Boxes', 'Window Boxes', 'Gable Boxes'].map(item => (
              <li key={item}><Link to={'#'} className={navLinkClass}>{item}</Link></li>
            ))}
          </FooterSection>

          {/* Inspiration */}
          <FooterSection title='Inspiration'>
            <li><Link to={'/blogs'} className={navLinkClass}>Blog</Link></li>
            <li><Link to={'/reviews'} className={navLinkClass}>Reviews</Link></li>
            <li><Link to={'#'} className={navLinkClass}>Materials</Link></li>
          </FooterSection>

          {/* Contact Us */}
          <FooterSection title='Contact Us'>
            <li><Link to={'#'} className={navLinkClass}>866-255-2112</Link></li>
            <li><Link to={'#'} className={`${navLinkClass} break-all !text-[13px]`}>orders@xcustompackaging.com</Link></li>
            <li><Link to={'/contact-us'} className={navLinkClass}>Contact Us</Link></li>
          </FooterSection>

        </div>

        {/* Address Row */}
        <div className='flex items-center gap-2 py-5 border-b border-black/[0.08] text-[#555]'>
          <IoLocationOutline size={18} className='shrink-0' />
          <span className='text-sm'>9854 National Blvd # 1042 Los Angeles, CA 90034 USA</span>
        </div>

        {/* Trust + Logistics */}
        <div className='flex flex-wrap justify-between gap-8 pt-8'>
          <div>
            <p className='text-[11px] font-bold tracking-[0.12em] uppercase text-[#888] mb-3'>
              Where We're Trusted
            </p>
            <div className='flex items-center gap-5 flex-wrap'>
              <img src={img1} alt='Google Reviews' className='h-10 w-auto object-contain  ' loading='lazy' />
              <img src={img2} alt='Trustpilot' className='h-10 w-auto object-contain  ' loading='lazy' />
              <img src={img3} alt='Reviews.io' className='h-10 w-auto object-contain  ' loading='lazy' />
            </div>
          </div>
          <div>
            <p className='text-[11px] font-bold tracking-[0.12em] uppercase text-[#888] mb-3'>
              Our Logistics Partners
            </p>
            <div className='flex items-center gap-5 flex-wrap'>
              <img src={img4} alt='FedEx' className='h-10 w-auto object-contain  ' loading='lazy' />
              <img src={img5} alt='DHL' className='h-10 w-auto object-contain  ' loading='lazy' />
              <img src={img6} alt='USPS' className='h-10 w-auto object-contain ' loading='lazy' />
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className='border-t border-black/[0.08] bg-black/[0.04]'>
        <div className='max-w-8xl mx-auto px-6 py-4 flex flex-wrap justify-between items-center gap-3'>
          <span className='text-[13px] text-[#888]'>© Umbrella Packaging 2026</span>
          <div className='flex gap-6'>
            <Link to={'/terms-and-conditions'} className='text-[13px] text-[#888] hover:text-[#ac292a] no-underline transition-colors duration-200'>
              Terms & Conditions
            </Link>
            <Link to={''} className='text-[13px] text-[#888] hover:text-[#ac292a] no-underline transition-colors duration-200'>
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer