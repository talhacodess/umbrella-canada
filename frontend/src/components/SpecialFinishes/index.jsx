import React, { useState, useRef} from 'react';
import Embossing from '../../assets/images/special/embossing.webp';
import Debossing from '../../assets/images/special/Debossing.webp';
import CustomFoiling from '../../assets/images/special/foiling.webp';
import SpotUV from '../../assets/images/special/spot uv.webp';
import MetallicPrinting from '../../assets/images/special/metalick printed.webp';
import PVCWindow from '../../assets/images/special/Pvc window.webp';
import CustomRibbons from '../../assets/images/special/Ribbon.webp';
import FoamInserts from '../../assets/images/Inserts/Foam inserts.webp';
import CardboardInserts from '../../assets/images/Inserts/cardboard.webp';
import ClamshellInserts from '../../assets/images/Inserts/Clamshell Inserts.webp';
import CorrugatedInserts from '../../assets/images/Inserts/Corrugated.webp';
import EvaFoamInserts from '../../assets/images/Inserts/eva foam inserts.webp';
import { MdClose, MdChevronLeft, MdChevronRight, MdStar } from 'react-icons/md';
import Button from '../common/Button';


const SpecialFinishes = () => {
    // --- New State for Interactive Finishes ---
    const [selectedFinish, setSelectedFinish] = useState(null);
    const scrollRef = useRef(null);

    const specialFinishes = [
        { name: "Embossing", image: Embossing, rating: 4.8, reviews: "1.2k", price: "$15.00" },
        { name: "Debossing", image: Debossing, rating: 4.7, reviews: "900", price: "$16.50" },
        { name: "Custom Foiling", image: CustomFoiling, rating: 4.9, reviews: "2.1k", price: "$18.00" },
        { name: "Spot UV", image: SpotUV, rating: 4.6, reviews: "1.5k", price: "$14.99" },
        { name: "Metallic Printing", image: MetallicPrinting, rating: 4.7, reviews: "800", price: "$17.00" },
        { name: "PVC Window", image: PVCWindow, rating: 4.5, reviews: "400", price: "$22.00" },
        { name: "Custom Ribbons", image: CustomRibbons, rating: 4.9, reviews: "300", price: "$12.00" },
        { name: "Foam Inserts", image: FoamInserts, rating: 4.8, reviews: "1.1k", price: "$19.00" },
        { name: "Cardboard Inserts", image: CardboardInserts, rating: 4.4, reviews: "600", price: "$10.00" },
        { name: "Clamshell Inserts", image: ClamshellInserts, rating: 4.5, reviews: "200", price: "$25.00" },
        { name: "Corrugated Inserts", image: CorrugatedInserts, rating: 4.6, reviews: "750", price: "$13.00" },
        { name: "Eva Foam Inserts", image: EvaFoamInserts, rating: 4.9, reviews: "1.4k", price: "$21.00" },
    ];

    const scroll = (direction) => {
        const { current } = scrollRef;
        const scrollAmount = 400;
        if (direction === 'left') current.scrollLeft -= scrollAmount;
        else current.scrollLeft += scrollAmount;
    };

    return (
        <>
         {/* --- Interactive Special Finishes Section --- */}
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">Premium Special Finishes</h3>
                <div className="relative flex items-center px-4">
                  <button onClick={() => scroll('left')} className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-lg border hover:scale-110 transition-transform"><MdChevronLeft size={30} /></button>
                  <div ref={scrollRef} className='flex overflow-x-hidden scroll-smooth space-x-6 py-6 px-10'>
                    {specialFinishes.map((tab, index) => (
                      <div 
                        key={index} 
                        onClick={() => setSelectedFinish(tab)}
                        className={`flex-shrink-0 flex flex-col items-center gap-3 cursor-pointer transition-all duration-300 ${selectedFinish?.name === tab.name ? 'scale-110' : 'opacity-70 hover:opacity-100'}`}
                      >
                        <div className={`p-1 rounded-xl transition-all ${selectedFinish?.name === tab.name ? 'ring-2 ring-[#AC292A] ring-offset-2' : ''}`}>
                          <img src={tab.image} alt={tab.name} className="w-24 h-24 object-cover rounded-lg shadow-md border border-amber-50" />
                        </div>
                        <h4 className="uppercase text-[11px] font-bold text-gray-600 tracking-wider">{tab.name}</h4>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => scroll('right')} className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-lg border hover:scale-110 transition-transform"><MdChevronRight size={30} /></button>
                </div>
              </div>

              {/* --- Dynamic Content Detail Card --- */}
              {selectedFinish && (
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 animate-in fade-in slide-in-from-bottom-5 duration-500 mb-10">
                  <div className="flex flex-col lg:flex-row gap-10">
                    <div className="lg:w-1/2">
                      <img src={selectedFinish.image} alt={selectedFinish.name} className="w-full h-[400px] object-cover rounded-xl shadow-lg" />
                    </div>
                    <div className="lg:w-1/2 text-left">
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-4xl font-bold text-gray-900">{selectedFinish.name}</h2>
                        <button onClick={() => setSelectedFinish(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><MdClose size={24} /></button>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500 mb-4">
                        {[...Array(5)].map((_, i) => <MdStar key={i} />)}
                        <span className="text-gray-500 text-sm ml-2">{selectedFinish.rating} ({selectedFinish.reviews} reviews)</span>
                      </div>
                      <p className="text-gray-600 text-lg leading-relaxed mb-8">
                        Our {selectedFinish.name} provides a premium, high-end feel that instantly elevates your packaging. 
                        Perfect for luxury brands looking to create a tactile and memorable unboxing experience.
                      </p>
                      <div className="grid grid-cols-2 gap-6 mb-8 border-y py-6">
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">Key Features</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• High-definition finish</li>
                            <li>• Durable & scuff-resistant</li>
                            <li>• Eco-friendly materials</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">Best For</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Cosmetic Packaging</li>
                            <li>• Luxury Gift Boxes</li>
                            <li>• Jewelry Displays</li>
                          </ul>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                       
                        <Button label="Get Instant Quote" className="bg-[#61D2F1] hover:bg-[#4bc6e8] text-white px-10 py-4 rounded-xl font-bold shadow-lg transition-all" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
        </>
    )
}

export default SpecialFinishes;