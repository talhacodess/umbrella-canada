import React from 'react';
import CardSlider from '../common/CardSlider';
import { insert1, insert2, insert3, insert4, insert5 } from '../../assets';

const CustomInserts = () => {
  const addons = [
    { img: insert1, title: 'Foam Inserts', desc: 'Foam inserts cushion and secure delicate products, providing protection and a polished unboxing presentation. We make them in any color you want.' },
    { img: insert2, title: 'Cardboard Inserts', desc: 'Cardboard inserts provide structured protection and organization inside your box. These are economical and for lightweight items. We can customize them in any color.' },
    { img: insert3, title: 'Clamshell Inserts', desc: 'Clamshell inserts surround and securely display your product, perfect for a clear, retail-ready presentation. These are the best suited for bulk usage.' },
    { img: insert4, title: 'Corrugated Inserts', desc: 'Corrugated inserts are the most durable inserts that we offer in any custom design. You can trust them to fit heavy and light-weight items both.' },
    { img: insert5, title: 'Eva Foam Inserts', desc: 'It is a type of premium foam insert that gives an ultra feel to the customers. We recommend this for expensive products. It comes in natural white and black colors.' },
    
  ];

  return (
    <section className="py-10 bg-[#f7f7f7] ">
      <div className="sm:max-w-8xl max-w-[95%] mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-5">Get the Inserts Your Product Needs </h2>
        <p className="text-center text-gray-600 mb-12">
        Secure your product inside the box with the insert, which is the best fit for it. We customize a wide range of inserts, which include luxury foam, economical cardboard, durable corrugated, and premium clamshell and Eva foam inserts. We can suggest the best insert for your product while keeping in view your budget.
        </p>
        <CardSlider
          top={40}
          items={addons.map((addon, index) => (
            <div 
              key={index} 
              className="w-[85vw] sm:w-[352px] flex-shrink-0 px-2 sm:px-2"
            >
              <div 
                className="bg-white rounded-xl overflow-hidden text-center border border-gray-200 hover:border-[#EE334B]/20 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer h-full flex flex-col"
              >
                <div className="relative mb-4">
                  <img 
                    src={addon.img} 
                    alt={addon.title} 
                    className="w-full  object-cover transform transition-transform duration-700" 
                  />
                  {/* Hover Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg"></div>
                  {/* Shine Effect - Sweeps across on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none rounded-lg"></div>
                </div>
                <div className='px-5 pb-5 flex-1 flex flex-col'>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-[#EE334B] transition-colors duration-300">{addon.title}</h3>
                  <p className="text-gray-500 text-sm group-hover:text-gray-700 transition-colors duration-300 whitespace-normal break-words leading-relaxed flex-1">{addon.desc}</p>
                </div>
              </div>
            </div>
          ))}
        />
      </div>
    </section>
  );
};

export default CustomInserts;
