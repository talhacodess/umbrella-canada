import React, { useState } from 'react';
import Banner from '../../components/common/Banner';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';
import { FaAngleRight, FaMapMarkerAlt, FaExternalLinkAlt, FaCheckCircle, FaShippingFast, FaLeaf, FaStar } from 'react-icons/fa';

// Assets
import goodvibecbd from '../../assets/images/about-imges/Good-vibe-cbd.webp';
import xpackaging from '../../assets/images/about-imges/xpackaging.webp';
import luxefragrance from '../../assets/images/about-imges/luxe-fragrance.webp';
import Fatsals from '../../assets/images/about-imges/Fat-sals.webp';
import STF from '../../assets/images/about-imges/STF.webp';
import xbox from '../../assets/images/about-imges/xbox.webp';
import xcitetech from '../../assets/images/about-imges/xcite-tech.webp';
import Nike from '../../assets/images/about-imges/Nike.webp';
import chanel from '../../assets/images/about-imges/chanel.webp';
import adidas from '../../assets/images/about-imges/adidas.webp';
import videoabout from '../../assets/images/about-imges/videoabout.mp4';
import usa from '../../assets/images/about-imges/usa.svg';
import uk from '../../assets/images/about-imges/uk.svg';
import canda from '../../assets/images/about-imges/canda.svg';
import australia from '../../assets/images/about-imges/australia.svg';
import uae from '../../assets/images/about-imges/uae.svg';
import chaina from '../../assets/images/about-imges/chaina.svg';
import CreativePackaging from '../../components/CreativeBanner/CreativePackaging';
import hero from "../../assets/images/about-us-banner.webp";
import BottomHero from '../../components/Hero/BottomHero';
import AnnouncementBanner from '../../components/AnnouncementBanner';

// ── Reusable Section Label ─────────────────────────────────────
const SectionLabel = ({ text }) => (
  <span className="inline-flex w-50 items-center gap-2 px-3 py-1.5  rounded-full bg-[#AC292A]/10 text-[#AC292A] text-[18px] font-bold uppercase tracking-widest">
    <span className="w-1.5 h-1.5 rounded-full bg-[#AC292A] flex-shrink-0" />
    {text}
  </span>
);

// ── Section Header with vertical bar ──────────────────────────
const SectionHeader = ({ label, title, subtitle, action }) => (
  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-12">
    <div className="flex items-start gap-4">
      <div className="w-1 h-12 rounded-full bg-gradient-to-b from-[#AC292A] to-[#192133] flex-shrink-0 mt-0.5" />
      <div>
        {label && <p className="text-[#AC292A] text-[10px] font-bold uppercase tracking-widest mb-1">{label}</p>}
        <h2 className="text-3xl sm:text-4xl font-bold text-[#192133] leading-tight">{title}</h2>
        {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
      </div>
    </div>
    {action && (
      <Link to={action.href || ''} className="group inline-flex items-center gap-1.5 text-[#AC292A] text-xs font-bold uppercase tracking-wide hover:gap-2.5 transition-all duration-200 flex-shrink-0">
        {action.label} <FaAngleRight size={12} />
      </Link>
    )}
  </div>
);

export default function About() {
  const [activeBrand, setActiveBrand] = useState(0);

  const companyLogos = [
    { name: "Good Vibe CBD", logo: goodvibecbd, location: "Wellness & Health", tagline: "Premium wellness products for a balanced and vibrant lifestyle.", tag: "Wellness" },
    { name: "Luxe Fragrance", logo: luxefragrance, location: "Boutique Perfumery", tagline: "Captivating scents crafted with the finest ingredients.", tag: "Fragrance" },
    { name: "Fat Sal's", logo: Fatsals, location: "Culinary Hub", tagline: "Indulgent and creatively crafted sandwiches for every craving.", tag: "Food & Beverage" },
    { name: "STF Apparel", logo: STF, location: "Urban Streetwear", tagline: "Bold and edgy street fashion for the modern trendsetter.", tag: "Streetwear" },
    { name: "Xbox", logo: xbox, location: "Gaming Tech", tagline: "Next-generation gaming consoles and immersive entertainment.", tag: "Gaming" },
    { name: "Xcite Tech", logo: xcitetech, location: "Innovation Hub", tagline: "Cutting-edge technology solutions driving the future forward.", tag: "Technology" },
    { name: "Nike", logo: Nike, location: "Global Sports", tagline: "Innovative athletic footwear and apparel for peak performance.", tag: "Sports" },
    { name: "Chanel", logo: chanel, location: "High Fashion", tagline: "Iconic luxury fashion, timeless elegance, and exquisite beauty.", tag: "Luxury" },
    { name: "Adidas", logo: adidas, location: "Sportswear", tagline: "Empowering athletes with high-performance gear and modern style.", tag: "Sportswear" },
  ];

  const strengths = [
    { icon: <FaCheckCircle />, title: "Precision Quality", desc: "Every product inspected to the highest standard before dispatch." },
    { icon: <FaShippingFast />, title: "On-Time Delivery", desc: "Reliable logistics ensuring your orders arrive on schedule." },
    { icon: <FaLeaf />, title: "Eco Materials", desc: "Sustainable materials that protect both product and planet." },
    { icon: <FaStar />, title: "Custom Solutions", desc: "Fully bespoke packaging tailored to your exact brand needs." },
  ];

  const stats = [
    { value: "10+", label: "Years Experience" },
    { value: "1k+", label: "Brand Partners" },
    { value: "50+", label: "Material Options" },
    { value: "6", label: "Global Offices" },
  ];

  const offices = [
    { country: "USA", address: "9854 National Blvd #1042, Los Angeles, CA 90034", flag: usa },
    { country: "UK", address: "275 New North Road, Islington, Suite 1946, London", flag: uk },
    { country: "Canada", address: "7398 Yonge St #6d, Thornhill, ON L4J 8J2", flag: canda },
    { country: "Australia", address: "7398 Yonge St #6d, Thornhill, ON L4J 8J2", flag: australia },
    { country: "UAE", address: "7398 Yonge St #6d, Thornhill, ON L4J 8J2", flag: uae },
    { country: "China", address: "7398 Yonge St #6d, Thornhill, ON L4J 8J2", flag: chaina },
  ];

  return (
    <div className=" bg-[#f7f7f7] text-[#192133] selection:bg-[#AC292A] selection:text-white">

      {/* ══ BANNER ══════════════════════════════════════════════ */}
      <AnnouncementBanner />

      {/* ══ INTRO / Banner ══════════════════════════════════ */}
      <div className="w-full lg:h-[50vh] h-[50vh] relative overflow-hidden">


        {/* Linear Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/75 to-black/40 z-10" style={{ backgroundImage: `url(${hero})`, backgroundSize: 'cover', backgroundPosition: 'right' }}></div>

        {/* Text Content Overlay */}
        <div className="relative w-full h-full flex items-center justify-start z-20 ">
          <div className="w-full sm:w-3/5 px-6 sm:px-8 md:px-12 lg:px-16 text-left">
            {/* Background behind content - Half screen */}
            {/* bg-black/30 backdrop-blur-sm */}
            <div className=" rounded-lg p-0 sm:p-8 md:p-10  text-left">
              <div className=" space-x-3 ">
                <h1 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-5xl font-bold mb-4 sm:mb-6 uppercase tracking-wide">
                  About Us
                </h1>
                <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8  tracking-wide">
                  We give your product the attention they deserve.

                </p>

                <Link to={'#work'}>
                  <Button variant="primary" className="font-semibold" label="See Our Work" />
                </Link>



                <Link to={'/dielines'}>
                  <Button variant="primary" className="font-semibold" label="Get Custom Template" />
                </Link>

                <Link to={'/contact-us'}>
                  <Button variant="red" className="font-semibold " label="Order Sample Kit" />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
      {/** icons under hero */}
      <BottomHero />
      {/* ══ BRAND PARTNERS ══════════════════════════════════════ */}
      <section id="brand-details-section" className="bg-white border-t border-gray-100">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-20">
          <SectionHeader
            label="Our Portfolio"
            title="Brand Partners"
            subtitle="A family of companies built on quality & innovation"

          />

          {/* Tabbed panel */}
          <div className="flex flex-col lg:flex-row rounded-2xl border border-gray-100 shadow-sm overflow-hidden bg-white">

            {/* Left tab list */}
            <div className="lg:w-64 xl:w-72 flex-shrink-0 bg-[#f7f8fc] border-b lg:border-b-0 lg:border-r border-gray-100">
              {companyLogos.map((brand, index) => (
                <button
                  key={index}
                  onClick={() => setActiveBrand(index)}
                  className={`w-full flex items-center gap-3 px-5 py-4 text-left transition-all duration-200 border-b border-gray-100 last:border-b-0 relative group
                    ${activeBrand === index ? 'bg-white' : 'hover:bg-white/70'}`}
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full transition-all duration-200
                    ${activeBrand === index ? 'bg-[#AC292A]' : 'bg-transparent group-hover:bg-[#AC292A]/30'}`}
                  />
                  <div className={`w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 border transition-all duration-200
                    ${activeBrand === index ? 'border-[#AC292A]/25 shadow-sm' : 'border-gray-200'}`}
                  >
                    <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain p-1 bg-white" />
                  </div>
                  <div className="min-w-0">
                    <p className={`text-sm font-semibold leading-snug truncate transition-colors duration-200
                      ${activeBrand === index ? 'text-[#192133]' : 'text-gray-500 group-hover:text-[#192133]'}`}
                    >
                      {brand.name}
                    </p>
                    <span className={`text-[10px] font-bold uppercase tracking-wide
                      ${activeBrand === index ? 'text-[#AC292A]' : 'text-gray-400'}`}
                    >
                      {brand.tag}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Right panel */}
            <div className="flex-1 flex flex-col sm:flex-row">
              {/* Logo */}
              <div className="w-full sm:w-2/5 flex items-center justify-center p-10 bg-[#f7f8fc] border-b sm:border-b-0 sm:border-r border-gray-100 min-h-[200px]">
                <img
                  src={companyLogos[activeBrand].logo}
                  alt={companyLogos[activeBrand].name}
                  className="max-h-36 max-w-full object-contain transition-all duration-300"
                />
              </div>
              {/* Info */}
              <div className="flex-1 p-8 md:p-10 flex flex-col justify-center gap-5">
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-full bg-[#AC292A]/10 text-[#AC292A] text-[10px] font-bold uppercase tracking-widest mb-3">
                    {companyLogos[activeBrand].tag}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#192133] mb-2">
                    {companyLogos[activeBrand].name}
                  </h3>
                  <div className="flex items-center gap-1.5 mb-4">
                    <FaMapMarkerAlt size={11} className="text-[#AC292A]" />
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      {companyLogos[activeBrand].location}
                    </span>
                  </div>
                  <p className="text-gray-500 text-base leading-relaxed">
                    {companyLogos[activeBrand].tagline}
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <div className="w-8 h-0.5 rounded-full bg-[#AC292A]" />
                    <div className="w-3 h-0.5 rounded-full bg-[#AC292A]/30" />
                  </div>
                  <Link to="" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#AC292A] uppercase tracking-wide hover:gap-2.5 transition-all duration-200">
                    Explore Brand <FaExternalLinkAlt size={9} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Dot pagination */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {companyLogos.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveBrand(i)}
                className={`rounded-full transition-all duration-200
                  ${activeBrand === i ? 'w-6 h-2 bg-[#AC292A]' : 'w-2 h-2 bg-gray-200 hover:bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </section>



      {/* ══ INTRO / WHO WE ARE ══════════════════════════════════ */}
      <section className="bg-[#f7f7f7]">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24 flex flex-col lg:flex-row items-center gap-14">

          {/* Media stack */}
          <div className="relative w-full lg:w-[48%] flex-shrink-0 flex items-center justify-center min-h-[320px] md:min-h-[420px]">
            {/* Main image */}
            <div className="relative w-[85%] aspect-[5/4] rounded-3xl overflow-hidden shadow-2xl z-0">
              <img src={xpackaging} alt="X Custom Packaging" className="w-full h-full object-cover" />
              {/* Red corner accent */}
              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#AC292A] to-transparent" />
            </div>
            {/* Floating video card */}
            <div className="absolute top-0 right-0 w-[45%] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl z-10 border-4 border-white">
              <video src={videoabout} autoPlay loop muted playsInline className="w-full h-full object-cover scale-110" />
              <div className="absolute inset-0 bg-black/10" />
            </div>
            {/* Floating stat badge */}
            <div className="absolute -bottom-4 left-4 z-20 bg-[#192133] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3">
              <div>
                <p className="text-[#AC292A] text-xl font-black leading-none">1k+</p>
                <p className="text-gray-300 text-[10px] font-bold uppercase tracking-widest mt-0.5">Happy Clients</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <p className="text-[#AC292A] text-xl font-black leading-none">10+</p>
                <p className="text-gray-300 text-[10px] font-bold uppercase tracking-widest mt-0.5">Years</p>
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <SectionLabel text="Who We Are" />

            <h2 className="text-4xl md:text-5xl font-bold text-[#192133] leading-tight">
              Delivering Premium Custom Packaging{' '}
              <span className="text-[#AC292A]">at Scale</span>
            </h2>

            <div className="w-12 h-1 rounded-full bg-gradient-to-r from-[#AC292A] to-[#AC292A]/20" />

            <div className="overflow-y-auto max-h-52 pr-1">
              <p className="text-gray-500 leading-relaxed text-base">
                At X Custom Packaging, we believe packaging is more than just protection—it is a powerful representation of your brand's identity and values. With a state-of-the-art production facility and a reliable logistics network, we deliver high-quality custom packaging solutions designed to meet the evolving needs of modern businesses.
              </p>
              <p className="text-gray-500 leading-relaxed text-base mt-4">
                Our advanced manufacturing capabilities allow us to produce a wide range of packaging styles, from simple and cost-effective boxes to premium, luxury packaging. We work with durable materials such as cardboard, kraft, corrugated, rigid, and specialty stocks to ensure maximum product safety and visual appeal.
              </p>
              <p className="text-gray-500 leading-relaxed text-base mt-4">
                Timely delivery is one of our strongest commitments. Supported by an organized shipping and logistics system, we ensure your orders are completed and dispatched within agreed timelines.
              </p>
            </div>

            <a href="#brand-details-section" className="w-fit">
              <Button label={"See Our Work in Action"} />
            </a>
          </div>
        </div>
      </section>



      {/* ══ GALLERY ═════════════════════════════════════════════ */}
      <div id="work"><CreativePackaging /></div>


      {/* ══ GLOBAL FOOTPRINT ════════════════════════════════════ */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">
          {/* Bottom inline stats row */}
          <div className=" grid grid-cols-2 sm:grid-cols-4 gap-4 pb-10">
            {stats.map((s, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center text-center py-10 rounded-2xl bg-[#f7f8fc] border border-gray-100"
              >
                <p className="text-3xl font-black text-[#192133] mb-1">{s.value}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Top stats + heading row */}
          <div className="flex flex-col lg:flex-row items-center gap-10 mb-16">
            {/* Heading */}
            <div className="flex-1 space-y-3 lg:pr-8 lg:border-r lg:border-gray-100">

              <h3 className="text-4xl lg:text-5xl font-black text-[#192133] leading-tight tracking-tight">
                Our Global Footprint Operating at the speed of{' '}
                <span className="text-[#AC292A]">International Commerce.</span>
              </h3>
              <p className="text-gray-400 text-base leading-relaxed max-w-xl">
                From North America to Asia Pacific, our global presence ensures we can serve brands wherever they operate — with the same standard of quality and care.
              </p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-4 w-full lg:w-auto lg:flex-shrink-0">
              <div className="bg-[#192133] rounded-3xl p-7 text-white shadow-xl min-w-[140px]">
                <p className="text-5xl font-black text-[#AC292A] leading-none mb-2">5+</p>
                <p className="text-slate-300 text-[10px] font-bold uppercase tracking-widest leading-snug">Global Headquarters</p>
              </div>
              <div className="bg-[#f7f8fc] rounded-3xl p-7 border border-gray-100 min-w-[140px]">
                <p className="text-5xl font-black text-[#192133] leading-none mb-2">1k+</p>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest leading-snug">Brand Partners</p>
              </div>
            </div>


          </div>

          {/* Location cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {offices.map((loc, idx) => (
              <div
                key={idx}
                className="group relative bg-white rounded-2xl border border-gray-100 p-7 hover:border-[#AC292A]/20 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Hover bg tint */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#AC292A]/0 to-[#AC292A]/0 group-hover:from-[#AC292A]/3 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-5">
                    <img src={loc.flag} alt={`${loc.country} flag`} className="w-9 h-9 object-contain" />
                    <span className="text-[10px] font-bold text-gray-200 uppercase tracking-widest group-hover:text-[#AC292A]/50 transition-colors duration-300">
                      Office
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-[#192133] mb-2 group-hover:text-[#AC292A] transition-colors duration-300">
                    {loc.country}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5">{loc.address}</p>
                  <div className="w-8 h-0.5 rounded-full bg-gray-100 group-hover:w-full group-hover:bg-[#AC292A] transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>


        </div>
      </section>

    </div>
  );
}