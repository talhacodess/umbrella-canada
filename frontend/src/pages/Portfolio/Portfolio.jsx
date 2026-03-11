import React, { useState } from 'react'
import p1  from '../../assets/images/p-1.webp'
import p2  from '../../assets/images/p-2.webp'
import p3 from '../../assets/images/p-3.webp'
import p4 from '../../assets/images/p-4.webp'
import p5 from '../../assets/images/p-5.webp'
import p6 from '../../assets/images/p6.webp'
import p7 from '../../assets/images/p7.webp'
import p8 from '../../assets/images/p8.webp'
import p9 from '../../assets/images/p9.webp'
import p10 from '../../assets/images/p10.webp'
import p11 from '../../assets/images/p11.webp'
import p12 from '../../assets/images/p12.webp'
import p13 from '../../assets/images/p13.webp'
import p14 from '../../assets/images/p14.webp'
import p15 from '../../assets/images/p15.webp'
import p16 from '../../assets/images/p16.webp'
import p17 from '../../assets/images/p17.webp'
import p18 from '../../assets/images/p18.webp'
import p19 from '../../assets/images/p19.webp'
import p20 from '../../assets/images/p20.webp'
import p21 from '../../assets/images/p21.webp'
import p22 from '../../assets/images/p22.webp'
import p23 from '../../assets/images/p23.webp'
import p24 from '../../assets/images/p24.webp'
import p25 from '../../assets/images/p25.webp'
import p26 from '../../assets/images/p26.webp'
import p27 from '../../assets/images/p27.webp'
import p28 from '../../assets/images/p28.webp'
import p29 from '../../assets/images/p29.webp'
import p30 from '../../assets/images/p30.webp'
import p31 from '../../assets/images/p31.webp'
import p32 from '../../assets/images/p32.webp'
import p33 from '../../assets/images/p33.webp'
import { BaseUrl } from '../../utils/BaseUrl'
import PageMetadata from '../../components/common/PageMetadata'
import { MdClose, MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { FaArrowRight } from 'react-icons/fa'
import Button from '../../components/common/Button'
import { Link } from 'react-router-dom'

// ── Inline PortfolioCard ───────────────────────────────────────
const PortfolioCard = ({ img1, img2, index, onClick }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-[#AC292A]/20 hover:shadow-xl transition-all duration-500 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick({ img1, img2, index })}
    >
      {/* Image container — flip on hover */}
      <div className="relative overflow-hidden aspect-square">
        {/* Base image */}
        <img
          src={img1}
          alt={`Portfolio item ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
            hovered ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
          }`}
        />
        {/* Hover image */}
        <img
          src={img2}
          alt={`Portfolio item ${index + 1} alt`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
            hovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
        />

        {/* Dark overlay on hover */}
        <div className={`absolute inset-0 bg-[#192133] transition-opacity duration-500 ${hovered ? 'opacity-40' : 'opacity-0'}`} />

        {/* Top-left accent bar — always visible on hover */}
        <div className={`absolute top-0 left-0 h-1 bg-[#AC292A] transition-all duration-500 ${hovered ? 'w-full' : 'w-0'}`} />

        {/* Expand icon */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-400 ${hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>

        {/* Item number badge */}
        <div className={`absolute top-3 right-3 transition-all duration-300 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
          <span className="px-2 py-1 rounded-lg bg-[#AC292A] text-white text-[9px] font-bold uppercase tracking-widest shadow-md">
            #{String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Card footer */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div>
          <div className={`h-0.5 rounded-full bg-[#AC292A] mb-1.5 transition-all duration-500 ${hovered ? 'w-8' : 'w-3'}`} />
          <p className="text-[#192133] text-xs font-bold uppercase tracking-wide">
            Project <span className="text-[#AC292A]">#{String(index + 1).padStart(2, '0')}</span>
          </p>
        </div>
        <div className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-300 ${hovered ? 'bg-[#AC292A] text-white' : 'bg-gray-100 text-gray-400'}`}>
          <FaArrowRight size={10} />
        </div>
      </div>
    </div>
  )
}

// ── Lightbox modal ─────────────────────────────────────────────
const Lightbox = ({ item, total, onClose, onPrev, onNext }) => {
  if (!item) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#192133]/90 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#AC292A] to-[#AC292A]/20" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 rounded-full bg-[#AC292A]" />
            <p className="text-[#192133] text-sm font-bold uppercase tracking-wide">
              Project <span className="text-[#AC292A]">#{String(item.index + 1).padStart(2, '0')}</span>
            </p>
            <span className="text-gray-300 text-xs ml-1">/ {total} projects</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-[#AC292A]/10 hover:text-[#AC292A] flex items-center justify-center text-gray-400 transition-all duration-200"
          >
            <MdClose size={18} />
          </button>
        </div>

        {/* Images */}
        <div className="grid grid-cols-2 gap-0">
          <img src={item.img1} alt="Front" className="w-full h-72 md:h-96 object-cover" />
          <img src={item.img2} alt="Back"  className="w-full h-72 md:h-96 object-cover" />
        </div>

        {/* Nav footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-[#f7f8fc]">
          <button
            onClick={onPrev}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-[#192133] text-xs font-bold uppercase tracking-wide hover:bg-[#192133] hover:text-white hover:border-[#192133] transition-all duration-200"
          >
            <MdChevronLeft size={16} /> Previous
          </button>
          <span className="text-gray-400 text-xs font-medium">
            {item.index + 1} of {total}
          </span>
          <button
            onClick={onNext}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#192133] hover:bg-[#AC292A] text-white text-xs font-bold uppercase tracking-wide transition-all duration-200 hover:shadow-[0_4px_14px_rgba(172,41,42,0.30)]"
          >
            Next <MdChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main Page ──────────────────────────────────────────────────
function Portfolio() {
  const [lightboxItem, setLightboxItem] = useState(null)

  const portfolioData = [
    { img1: p1,  img2: p2  },
    { img1: p3,  img2: p3  },
    { img1: p4,  img2: p5  },
    { img1: p6,  img2: p7  },
    { img1: p8,  img2: p9  },
    { img1: p10, img2: p11 },
    { img1: p12, img2: p13 },
    { img1: p14, img2: p15 },
    { img1: p16, img2: p17 },
    { img1: p18, img2: p19 },
    { img1: p20, img2: p21 },
    { img1: p22, img2: p23 },
    { img1: p24, img2: p25 },
    { img1: p26, img2: p27 },
    { img1: p28, img2: p29 },
    { img1: p30, img2: p31 },
    { img1: p32, img2: p33 },
  ]

  const metadata = {
    title: "Portfolio - Umbrella Custom Packaging",
    description: "Our Portfolio highlights a range of custom packaging solutions, designed to protect, promote, and enhance your products with style.",
    keywords: "custom packaging, wholesale boxes, packaging solutions, affordable packaging, custom boxes, packaging design, eco-friendly packaging",
    author: "Umbrella Custom Packaging",
    ogUrl: `${BaseUrl}/portfolio`,
    canonicalUrl: `${BaseUrl}/portfolio`,
    ogTitle: "Portfolio - Umbrella Custom Packaging",
    ogDescription: "Our portfolio highlights a range of custom packaging solutions, designed to protect, promote, and enhance your products with style.",
    modifiedTime: "2025-06-13T15:18:43+00:00",
    twitterTitle: "Portfolio - Umbrella Custom Packaging",
    twitterDescription: "Our portfolio highlights a range of custom packaging solutions.",
    robots: "index, follow",
  }

  const openLightbox = ({ img1, img2, index }) => setLightboxItem({ img1, img2, index })

  const closeLightbox = () => setLightboxItem(null)

  const navigate = (dir) => {
    if (!lightboxItem) return
    const next = (lightboxItem.index + dir + portfolioData.length) % portfolioData.length
    setLightboxItem({ ...portfolioData[next], index: next })
  }

  return (
    <>
      <PageMetadata {...metadata} />

      <div className="bg-[#f7f8fc] selection:bg-[#AC292A] selection:text-white">

        {/* ══ HERO ════════════════════════════════════════════ */}
        <section className="bg-[#192133] relative overflow-hidden">
          {/* Dot pattern */}
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
          />
          <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-[#AC292A] opacity-[0.05] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />

          <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24 relative z-10 text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/8 border border-white/10 text-[#AC292A] text-[10px] font-bold uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#AC292A] animate-pulse" />
              Our Work
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-5">
              Our <span className="text-[#AC292A]">Portfolio</span>
            </h1>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              Our portfolio highlights a range of custom packaging solutions, designed to{' '}
              <strong className="text-white font-semibold">protect, promote, and enhance</strong>{' '}
              your products with style.
            </p>

            {/* Stats strip */}
            <div className="inline-grid grid-cols-3 gap-3">
              {[
                { value: `${portfolioData.length}+`, label: 'Projects' },
                { value: '100%',                     label: 'Custom'   },
                { value: '1k+',                      label: 'Clients'  },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center px-6 py-3 rounded-xl bg-white/5 border border-white/8">
                  <p className="text-[#AC292A] font-black text-2xl leading-none mb-1">{s.value}</p>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ GRID ════════════════════════════════════════════ */}
        <section className="max-w-8xl mx-auto px-6 md:px-10 py-14 md:py-20">

          {/* Section label */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#AC292A]/10 text-[#AC292A] text-[10px] font-bold uppercase tracking-widest mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#AC292A]" />
                Gallery
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#192133]">
                {portfolioData.length} <span className="text-[#AC292A]">Projects</span> Delivered
              </h2>
            </div>
            <p className="hidden md:block text-gray-400 text-sm max-w-xs text-right leading-relaxed">
              Click any card to view the full project in detail.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {portfolioData.map((data, index) => (
              <PortfolioCard
                key={index}
                img1={data.img1}
                img2={data.img2}
                index={index}
                onClick={openLightbox}
              />
            ))}
          </div>

          {/* Bottom CTA strip */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-5 p-7 rounded-2xl bg-[#192133]">
            <div className="text-center sm:text-left">
              <p className="text-white font-bold text-base">Like what you see?</p>
              <p className="text-gray-400 text-sm mt-1">
                Let's create custom packaging for your brand at{' '}
                <span className="text-[#AC292A] font-semibold">umbrellapackaging.ca</span>
              </p>
            </div>
            <Link  to="/contact-us">
            <Button variant='red' label={" Start Your Project "} /></Link>
          </div>
        </section>
      </div>

      {/* Lightbox */}
      <Lightbox
        item={lightboxItem}
        total={portfolioData.length}
        onClose={closeLightbox}
        onPrev={() => navigate(-1)}
        onNext={() => navigate(1)}
      />
    </>
  )
}

export default Portfolio