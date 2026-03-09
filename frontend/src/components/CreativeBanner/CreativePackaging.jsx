import React, { useState } from 'react';
import gallery1 from '../../assets/images/about-imges/gallery1.jpg';
import gallery2 from '../../assets/images/about-imges/gallery2.jpg';
import { FaArrowRight, FaExpand } from 'react-icons/fa';
import Button from '../common/Button';

const CreativePackaging = () => {
  const images = [
    { id: 1, url: gallery1,                                                                          title: "Main Display",  tag: "Featured"   },
    { id: 2, url: gallery2,                                                                          title: "Retail Wall",   tag: "Retail"     },
    { id: 3, url: "https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?q=80&w=800",        title: "Eco-Friendly",  tag: "Sustainable"},
    { id: 4, url: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800",        title: "Box Structure", tag: "Design"     },
    { id: 5, url: "https://images.unsplash.com/photo-1512331283953-19967202267a?q=80&w=800",        title: "Luxury Kit",    tag: "Premium"    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  return (
    <section className="bg-[#f7f8fc] border-t border-gray-100 py-16 md:py-24 px-6">
      <div className="max-w-8xl mx-auto">

        {/* ── Section Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="flex items-start gap-4">
            <div className="w-1 h-12 rounded-full bg-gradient-to-b from-[#AC292A] to-[#192133] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[#AC292A] text-[10px] font-bold uppercase tracking-widest mb-1">Our Work</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#192133] leading-tight">
                Your Packaging Journey <br className="hidden sm:block" />
                <span className="text-[#AC292A]">Starts Here</span>
              </h2>
              <p className="text-gray-400 text-sm mt-2 max-w-md leading-relaxed">
                Real client experiences, expert craftsmanship, and innovative solutions that elevate brands worldwide.
              </p>
            </div>
          </div>

          <a
            href="#"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#AC292A]/25 text-[#AC292A] text-xs font-bold uppercase tracking-wide hover:bg-[#AC292A] hover:text-white hover:border-[#AC292A] transition-all duration-200 flex-shrink-0 self-start sm:self-end"
          >
            View Gallery <FaArrowRight size={10} />
          </a>
        </div>

        {/* ── Main Gallery Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">

          {/* Featured Image — large left */}
          <div className="lg:col-span-7 group relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm">
            <div className="relative h-[360px] md:h-[480px] overflow-hidden">
              <img
                src={activeImage.url}
                alt={activeImage.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#192133]/60 via-transparent to-transparent pointer-events-none" />

              {/* Tag pill */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#AC292A] text-white text-[10px] font-bold uppercase tracking-widest shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                {activeImage.tag}
              </div>

              {/* Expand icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FaExpand size={12} />
              </div>

              {/* Title bottom */}
              <div className="absolute bottom-5 left-5 right-5">
                <h3 className="text-white font-bold text-xl leading-snug drop-shadow-md">
                  {activeImage.title}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-6 h-0.5 rounded-full bg-[#AC292A]" />
                  <div className="w-3 h-0.5 rounded-full bg-white/30" />
                </div>
              </div>
            </div>
          </div>

          {/* Right column — 2 stacked images */}
          <div className="lg:col-span-5 flex flex-col gap-4 md:gap-5">

            {/* Top right — large */}
            <div className="group relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm flex-1">
              <div className="relative h-[220px] md:h-[228px] overflow-hidden">
                <img
                  src={images[1].url}
                  alt={images[1].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#192133]/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-white text-xs font-bold">{images[1].title}</span>
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-widest border border-white/20">
                  {images[1].tag}
                </div>
              </div>
            </div>

            {/* Bottom right — 2 small side by side */}
            <div className="grid grid-cols-2 gap-4 md:gap-5">
              {[images[2], images[3]].map((img, i) => (
                <div key={img.id} className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm">
                  <div className="relative h-[140px] md:h-[230px] overflow-hidden">
                    <img
                      src={img.url}
                      alt={img.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#192133]/50 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3">
                      <span className="text-white text-[11px] font-bold leading-tight">{img.title}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Thumbnail Strip ── */}
        <div className="mt-6 flex items-center gap-3 overflow-x-auto py-3" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {images.map((img, index) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(index)}
              className={`group relative flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden transition-all duration-300
                ${activeIndex === index
                  ? 'ring-2 ring-[#AC292A] ring-offset-2 shadow-md scale-105'
                  : 'opacity-50 hover:opacity-80 hover:scale-[1.02]'
                }`}
            >
              <img src={img.url} className="w-full h-full object-cover" alt={img.title} />
              {/* Active overlay */}
              {activeIndex === index && (
                <div className="absolute inset-0 bg-[#AC292A]/15" />
              )}
            </button>
          ))}

          {/* Count badge */}
          <div className="flex-shrink-0 ml-2 px-4 py-2 rounded-xl bg-[#192133] text-white text-xs font-bold">
            {activeIndex + 1} / {images.length}
          </div>
        </div>

        {/* ── Bottom CTA strip ── */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#AC292A]/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-[#AC292A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-[#192133] font-bold text-sm">Explore our full project portfolio</p>
              <p className="text-gray-400 text-xs mt-0.5">100+ completed packaging projects across 20+ industries</p>
            </div>
          </div>
          <Button label={"View All Projects"}/>
        </div>

      </div>

      <style>{`
        section::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
};

export default CreativePackaging;