import React, { useState } from 'react';
import video from '../../assets/videos/dieline-video.mp4';
import dieImg1 from '../../assets/images/dielines/Auto-lock-Boxes.webp';
import dieImg2 from '../../assets/images/dielines/Bakery-Boxes_.webp';
import dieImg3 from '../../assets/images/dielines/Bookend-Boxes_-1.webp';
import dieImg4 from '../../assets/images/dielines/Burger-Boxes_-1.webp';
import dieImg5 from '../../assets/images/dielines/Child-Resistant.webp';
import dieImg7 from '../../assets/images/dielines/Face-Mask-Boxes-1-1.webp';
import dieImg8 from '../../assets/images/dielines/Gable-Boxes_-1.webp';
import dieImg9 from '../../assets/images/dielines/Gloves-Boxes_.webp';
import dieImg10 from '../../assets/images/dielines/Heart-Shaped-Boxes-2-1.webp';
import dieImg11 from '../../assets/images/dielines/Tuck-End-Boxes-3.webp';
import dieImg12 from '../../assets/images/dielines/Window-Boxes-1.webp';
import SpecialFinishes from '../../components/SpecialFinishes';
import InstantQuoteModal from '../../components/common/InstantQuoteModal';
import { BaseUrl } from '../../utils/BaseUrl';
import PageMetadata from '../../components/common/PageMetadata';
import { CustomCupsImage } from '../../assets';
import { FaArrowRight, FaDownload } from 'react-icons/fa';
import Button from '../../components/common/Button';

const categories = [
  { title: 'Auto Lock Boxes',     img: dieImg1  },
  { title: 'Bakery Boxes',        img: dieImg2  },
  { title: 'Bookend Boxes',       img: dieImg3  },
  { title: 'Burger Boxes',        img: dieImg4  },
  { title: 'Child Resistant',     img: dieImg5  },
  { title: 'Custom Cups',         img: CustomCupsImage },
  { title: 'Face Mask Boxes',     img: dieImg7  },
  { title: 'Gable Boxes',         img: dieImg8  },
  { title: 'Gloves Boxes',        img: dieImg9  },
  { title: 'Heart Shaped Boxes',  img: dieImg10 },
  { title: 'Tuck End Boxes',      img: dieImg11 },
  { title: 'Window Boxes',        img: dieImg12 },
];

const stats = [
  { value: '12+',  label: 'Box Styles'      },
  { value: '100%', label: 'Customizable'    },
  { value: 'Free', label: 'Templates'       },
  { value: '24h',  label: 'Quote Turnaround'},
];

function Dielines() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const metadata = {
    title: "Dielines - Umbrella Custom Packaging",
    description: "Get In Touch Umbrella Custom Packaging — The House of Proficient Printing & Distinct Featured Boxes.",
    keywords: "custom packaging, wholesale boxes, packaging solutions, affordable packaging, custom boxes, packaging design, eco-friendly packaging",
    author: "Umbrella Custom Packaging",
    ogUrl: `${BaseUrl}/dielines`,
    canonicalUrl: `${BaseUrl}/dielines`,
    ogTitle: "Dielines - Umbrella Custom Packaging",
    ogDescription: "Get In Touch Umbrella Custom Packaging — The House of Proficient Printing & Distinct Featured Boxes.",
    modifiedTime: "2025-06-13T15:18:43+00:00",
    twitterTitle: "Dielines - Umbrella Custom Packaging",
    twitterDescription: "Get In Touch Umbrella Custom Packaging — The House of Proficient Printing & Distinct Featured Boxes.",
    robots: "index, follow",
  };

  const openModal = (cat) => {
    setSelectedCategory(cat);
    setIsModalOpen(true);
  };

  return (
    <>
      <PageMetadata {...metadata} />

      <div className="bg-[#f7f8fc] selection:bg-[#AC292A] selection:text-white">

        {/* ══════════════════════════════════════════════════════
            HERO — intro + video
        ══════════════════════════════════════════════════════ */}
        <section className="bg-[#192133] relative overflow-hidden">
          {/* Dot pattern */}
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
          />
          {/* Blobs */}
          <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-[#AC292A] opacity-[0.05] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[280px] h-[280px] bg-white opacity-[0.025] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

          <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24 relative z-10">
            <div className="flex flex-col md:flex-row gap-12 items-center">

              {/* Left — text */}
              <div className="md:w-1/2 text-white">
                {/* <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/8 border border-white/10 text-[#AC292A] text-[10px] font-bold uppercase tracking-widest mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AC292A] animate-pulse" />
                  Free Templates
                </span> */}

                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
                  Box <span className="text-[#AC292A]">Dielines</span>
                  Templates
                </h1>

                <p className="text-gray-300 text-base leading-relaxed mb-8 max-w-md">
                  Explore all the different box styles available at{' '}
                  <strong className="text-white font-semibold">Umbrella Custom Packaging</strong>.
                  Customize size, material, and design — then download the template or request a free quote instantly.
                </p>

                {/* Accent line */}
                <div className="flex items-center gap-3 mb-10">
                  <div className="h-0.5 w-10 rounded-full bg-[#AC292A]" />
                  <div className="h-0.5 w-4 rounded-full bg-[#AC292A]/40" />
                  <div className="h-0.5 w-2 rounded-full bg-[#AC292A]/20" />
                </div>

                {/* Stats strip */}
                {/* <div className="grid grid-cols-4 gap-3">
                  {stats.map((s, i) => (
                    <div key={i} className="flex flex-col items-center text-center p-3 rounded-xl bg-white/5 border border-white/8">
                      <p className="text-[#AC292A] font-black text-xl leading-none mb-1">{s.value}</p>
                      <p className="text-gray-400 text-[9px] font-bold uppercase tracking-widest leading-tight">{s.label}</p>
                    </div>
                  ))}
                </div> */}
              </div>

              {/* Right — video */}
              <div className="md:w-1/2 flex justify-center">
                <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  >
                    <source src={video} type="video/mp4" />
                  </video>
                  {/* Video overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#192133]/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            BOX TEMPLATES GRID
        ══════════════════════════════════════════════════════ */}
        <section className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-20">

          {/* Section header */}
          <div className="text-center mb-12">
            {/* <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#AC292A]/10 text-[#AC292A] text-[10px] font-bold uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#AC292A]" />
              Templates
            </span> */}
            <h2 className="text-3xl md:text-4xl font-bold text-[#192133]">
              Select Your Desired{' '}
              <span className="text-[#AC292A]">Box Style</span>
            </h2>
            <p className="text-gray-400 text-sm mt-3 max-w-lg mx-auto leading-relaxed">
              Choose from {categories.length} professionally engineered dieline templates. Every style is fully customizable to match your brand.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="group bg-white rounded-3xl border border-[#192133] overflow-hidden hover:border-[#AC292A]/20 hover:shadow-lg transition-all duration-300"
              >
                {/* Image area */}
                <div className="relative overflow-hidden bg-[#f7f8fc] h-48 flex items-center justify-center p-4">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#192133]/0 group-hover:bg-[#192133]/5 transition-all duration-300 pointer-events-none" />
                  {/* Top badge */}
                  <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    <span className="px-2 py-1 rounded-full bg-[#AC292A] text-white text-[9px] font-bold uppercase tracking-widest">
                      Free Template
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  {/* Bottom bar animation */}
                  <div className="w-6 h-0.5 rounded-full bg-[#AC292A] mb-3 transition-all duration-300 group-hover:w-full" />
                  <h4 className="font-bold text-[#192133] text-sm mb-4 leading-snug group-hover:text-[#AC292A] transition-colors duration-200">
                    {cat.title}
                  </h4>

                  {/* Buttons */}
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => openModal(cat)}
                      variant="red"
                      label={"Get Template"}
                    />
                   
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SPECIAL FINISHES
        ══════════════════════════════════════════════════════ */}
        <section className="max-w-8xl mx-auto px-6 md:px-10 pb-16">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm px-6 md:px-10 py-4">
            <SpecialFinishes />
          </div>
        </section>

      </div>

      {/* Modal */}
      <InstantQuoteModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        closeModal={() => setIsModalOpen(false)}
        categoryData={selectedCategory}
      />
    </>
  );
}

export default Dielines;