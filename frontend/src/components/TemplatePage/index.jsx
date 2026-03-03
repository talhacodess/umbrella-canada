import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { MdClose, MdStar, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import CardSlider from '../common/CardSlider';

// Asset Imports
import autoLockBox from '../../assets/images/templates/Auto-lock-Boxes.webp'
import BakeryBoxes from '../../assets/images/templates/Bakery-Boxes_.webp'
import BookendBoxes from '../../assets/images/templates/Bookend-Boxes_-1.webp'
import BurgerBoxes from '../../assets/images/templates/Burger-Boxes_-1.webp'
import ChildResistant from '../../assets/images/templates/Child-Resistant.webp'
import Button from '../common/Button';

const TemplatePage = () => {
    // 1. State for selected card
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const scrollRef = useRef(null);

    const templateData = [
        { 
            title: "Auto lock Boxes", 
            img: autoLockBox, 
            rating: 4.7, 
            reviews: 14120, 
            desc: "Secure and durable, featuring a self-locking bottom for heavy items.",
            price: "$14.99" 
        },
        { 
            title: "Bakery Boxes", 
            img: BakeryBoxes, 
            rating: 4.8, 
            reviews: 8540, 
            desc: "Classic folding boxes perfect for pastries, cakes, and treats.",
            price: "$12.50" 
        },
        { 
            title: "Bookend Boxes", 
            img: BookendBoxes, 
            rating: 4.9, 
            reviews: 3200, 
            desc: "Double-thick sidewalls with a lid that opens like a book.",
            price: "$18.00" 
        },
        { 
            title: "Burger Boxes", 
            img: BurgerBoxes, 
            rating: 4.6, 
            reviews: 5100, 
            desc: "Eco-friendly grease-resistant boxes for food service.",
            price: "$0.45" 
        },
        { 
            title: "Child Resistant", 
            img: ChildResistant, 
            rating: 5.0, 
            reviews: 1200, 
            desc: "Certified safety locking mechanisms for sensitive products.",
            price: "$22.99" 
        }
    ];

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <div className='bg-[#fff]'>
            <div className='sm:max-w-8xl w-[95%] mx-auto'>

                {/* Horizontal Selection Slider */}
                <div className="relative group mb-12">
                    <button onClick={() => scroll('left')} className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md border border-gray-100 hover:scale-110 transition-transform"><MdChevronLeft size={24}/></button>
                    
                    <div ref={scrollRef} className="flex overflow-x-auto scrollbar-hide space-x-6 py-4 px-2">
                        {templateData.map((item, index) => (
                            <div 
                                key={index} 
                                onClick={() => setSelectedTemplate(item)}
                                className={`flex-shrink-0 w-64 cursor-pointer transition-all duration-300 rounded-2xl p-4 border-2 text-center
                                ${selectedTemplate?.title === item.title ? 'border-[#192133] bg-gray-50 shadow-lg' : 'border-[#AC292A] hover:bg-gray-50'}`}
                            >
                                <img src={item.img} alt={item.title} className="w-full h-48 object-contain mb-4" />
                                <h3 className="text-center font-bold text-gray-800 mb-2">{item.title}</h3>
                               <Button variant='red' label={"Get Template"}/>
                            </div>
                        ))}
                    </div>

                    <button onClick={() => scroll('right')} className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md border border-gray-100 hover:scale-110 transition-transform"><MdChevronRight size={24}/></button>
                </div>

            
            </div>
        </div>
    )
}

export default TemplatePage;