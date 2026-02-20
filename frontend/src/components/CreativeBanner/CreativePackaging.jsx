import React, { useState } from 'react';
import gallery1 from '../../assets/images/about-imges/gallery1.jpg';
import gallery2 from '../../assets/images/about-imges/gallery2.jpg';

const CreativePackaging = () => {
  const images = [
    { id: 1, url: gallery1, title: "Main Display" },
    { id: 2, url: gallery2, title: "Retail Wall" },
    { id: 3, url: "https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?q=80&w=800", title: "Eco-Friendly" },
    { id: 4, url: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800", title: "Box Structure" },
    { id: 5, url: "https://images.unsplash.com/photo-1512331283953-19967202267a?q=80&w=800", title: "Luxury Kit" },
  ];

  // Logic check: Ensure the initial state matches the data structure
  const [activeImage, setActiveImage] = useState(images[0].url);

  return (
    <section className="bg-white py-10 px-6" id="brand-details-section">
      <div className="max-w-8xl mx-auto">
         <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <div className="w-20 h-1 bg-gradient-to-r from-[#EE334B] to-[#213554] mx-auto rounded-full"></div>
            </div>
            <h2 className='text-3xl sm:text-4xl font-bold text-[#213554] mb-2'>
              Your Packaging Journey Starts Here!

            </h2>
            <p className='text-gray-600 text-lg'>
              Discover how quality packaging makes all the difference! Experience real client experiences, expert tips, and innovative packaging solutions that enhance brands. From custom designs to seamless functionality, see how we bring packaging visions to life.


            </p>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
          {/* Main Featured Image */}
          <div className="md:col-span-8 group relative overflow-hidden rounded-[2.5rem] bg-white p-4 shadow-xl shadow-slate-200/50 border border-lime-100">
            <div className="overflow-hidden rounded-[2rem] h-[500px]">
              <img
                src={activeImage}
                alt="Featured Packaging"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Side Grid */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="h-1/2 group relative overflow-hidden rounded-[2rem] bg-white p-3 shadow-lg border border-lime-100">
              <img src={images[1].url} alt="Detail" className="w-full h-full object-cover rounded-[1.5rem]" />
            </div>
            <div className="h-1/2 grid grid-cols-2 gap-4">
              <div className="rounded-[1.5rem] overflow-hidden border-2 border-lime-200 p-1 bg-white">
                <img src={images[2].url} alt="Detail 2" className="w-full h-full object-cover rounded-[1.2rem]" />
              </div>
              <div className="rounded-[1.5rem] overflow-hidden border-2 border-lime-200 p-1 bg-white">
                <img src={images[3].url} alt="Detail 3" className="w-full h-full object-cover rounded-[1.2rem]" />
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="relative group">
          <div className="flex items-center gap-4 overflow-x-auto pb-4 scroll-smooth no-scrollbar">
            {images.map((img) => (
              <button
                key={img.id} // Better to use img.id than the array index
                onClick={() => setActiveImage(img.url)}
                className={`flex-shrink-0 w-32 h-20 rounded-2xl overflow-hidden border-4 transition-all duration-300 ${
                  activeImage === img.url 
                    ? 'border-lime-400 scale-105 shadow-lg' 
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img.url} className="w-full h-full object-cover" alt={img.title} />
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default CreativePackaging; // Corrected Export