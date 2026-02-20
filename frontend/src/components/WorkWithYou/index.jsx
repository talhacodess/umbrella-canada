import React from 'react';
import CardSlider from '../common/CardSlider';
import { special1, special2, special3, special4, special5, special6, special7} from '../../assets';

const WorkWithYou = () => {
  const addons = [
    { img: special1, title: 'Embossing', desc: 'Embossing raises your logo or artwork for a premium, tactile experience that customers can see and feel.' },
    { img: special2, title: 'Debossing', desc: 'Debossing presses your design into the material for a subtle, sophisticated, and timeless textured effect on the box.' },
    { img: special3, title: 'Custom Foiling', desc: 'Custom foiling adds metallic colored foil on the box for instant luxury that creates a brilliant and premium finish.' },
    { img: special6, title: 'Spot UV', desc: 'A PVC window adds a practical display, allowing customers to see the product inside the packaging without opening it.' },
    { img: special4, title: 'Metallic Printing', desc: 'Metallized printing uses special inks and paper to create a vibrant, shimmering metallic effect across your packaging design.' },
    { img: special5, title: 'PVC Window', desc: 'Enhance your packaging with spot UV coating for premium finish and visual appeal.' },
   
    { img: special7, title: 'Custom Ribbons', desc: 'Custom printed ribbons add a final touch of elegance and color, perfect for gift and luxury packaging presentations.' },
  ];

  return (
    <section className="py-10">
      <div className="sm:max-w-8xl max-w-[95%] mx-auto px-4">
      <div className=' text-center'>
      <h2 className="sm:text-[35px] text-[25px] leading-9 font-sans font-[600] text-[#333333] break-words">
          Our Add-ons for Premium Packaging 
        </h2>
        <p className="pt-3 text-gray-600 pb-3 break-words">
          X Custom Packaging is one stop shop where you can add custom colored foil to your packaging, make custom-printed ribbons, do embossing and debossing, and beyond. Our premium add-ons to your packaging would be enough themselves to boost your sales, increase brand elegancy and make your presents look special.
        </p>
      </div>
        <CardSlider
          top={40}
          items={addons.map((addon, index) => (
            <div 
              key={index} 
              className="w-[85vw] sm:w-[352px] flex-shrink-0 px-2 sm:px-2 "
            >
              <div 
                className="bg-[#f7f7f7] rounded-xl overflow-hidden text-center border border-gray-200 hover:border-[#EE334B]/20 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer h-full flex flex-col"
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

export default WorkWithYou;
