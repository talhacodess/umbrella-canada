import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowDown } from "react-icons/io";

function TableOfContent({ content }) {
    const [openTable, setTableOpen] = useState(true);
    const [headings, setHeadings] = useState([]);
    const [activeId, setActiveId] = useState(null);
    const observerRef = useRef(null);

    useEffect(() => {
        if (content) {
            // Wait for DOM to be ready
            const timeoutId = setTimeout(() => {
                const contentElement = document.querySelector('.blog_content');
                if (contentElement) {
                    const headingElements = Array.from(
                        contentElement.querySelectorAll('h1, h2, h3, h4, h5, h6')
                    );
                    
                    const processedHeadings = headingElements.map((heading, index) => {
                        let id = heading.id;
                        if (!id) {
                            id = `section-${index}-${heading.textContent
                                .toLowerCase()
                                .replace(/[^\w\s]/g, '')
                                .replace(/\s+/g, '-')}`;
                            heading.id = id;
                        }
                        return {
                            text: heading.textContent,
                            id: id,
                            level: parseInt(heading.tagName.substring(1))
                        };
                    });

                    setHeadings(processedHeadings);
                }
            }, 200);

            return () => clearTimeout(timeoutId);
        }
    }, [content]);

    useEffect(() => {
        // Set up IntersectionObserver to track which heading is in view
        if (headings.length === 0) return;

        const callback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        };

        observerRef.current = new IntersectionObserver(callback, {
            rootMargin: '-100px 0px -50% 0px',
            threshold: 0.5
        });

        // Observe all headings
        headings.forEach(heading => {
            const element = document.getElementById(heading.id);
            if (element) {
                observerRef.current.observe(element);
            }
        });

        // Clean up observer on unmount
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [headings]);

    const scrollToHeading = (id, event) => {
        event.preventDefault();
        setActiveId(id);
        
        const element = document.getElementById(id);
        if (element) {
            const offset = 120;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Update URL without triggering scroll
            window.history.pushState(null, null, `#${id}`);
        }
    };

    if (!headings || headings.length === 0) {
        return null;
    }

    return (
        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6'>
            <div 
                className='flex items-center justify-between p-4 cursor-pointer bg-gradient-to-r from-[#213554] to-[#213554]/95'
                onClick={() => setTableOpen(!openTable)}
            >
                <h5 className='text-lg font-bold text-white'>Table of Contents</h5>
                <IoIosArrowDown 
                    className={`transition-transform duration-300 text-white ${openTable ? 'rotate-180' : ''}`} 
                />
            </div>
            
            {openTable && (
                <div className='border-t max-h-[500px] overflow-y-auto custom-scrollbar'>
                    <nav className='p-4'>
                        <ul className='space-y-2'>
                            {headings.map((heading, index) => (
                                <li 
                                    key={`${heading.id}-${index}`} 
                                    className={`text-sm transition-all duration-200 ${
                                        heading.level === 1 ? 'pl-0 font-semibold' : 
                                        heading.level === 2 ? 'pl-3' : 
                                        heading.level === 3 ? 'pl-6' :
                                        'pl-9'
                                    }`}
                                >
                                    <a 
                                        href={`#${heading.id}`}
                                        onClick={(e) => scrollToHeading(heading.id, e)}
                                        className={`block py-1.5 px-2 rounded-md transition-all duration-200 hover:bg-[#EE334B]/10 hover:text-[#EE334B] ${
                                            activeId === heading.id 
                                                ? 'text-[#EE334B] font-semibold bg-[#EE334B]/10 border-l-2 border-[#EE334B]' 
                                                : 'text-gray-700 hover:text-[#EE334B]'
                                        }`}
                                    >
                                        <span className="flex items-start">
                                            <span className={`mr-2 min-w-[20px] text-xs mt-0.5 ${
                                                activeId === heading.id ? 'text-[#EE334B] font-bold' : 'text-gray-400'
                                            }`}>
                                                {index + 1}.
                                            </span>
                                            <span className="leading-relaxed">
                                                {heading.text.length > 40 
                                                    ? `${heading.text.substring(0, 40)}...` 
                                                    : heading.text}
                                            </span>
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
}

export default TableOfContent;
