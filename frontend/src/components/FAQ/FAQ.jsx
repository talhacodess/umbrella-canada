import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Accordion from '../common/Accordion';
import { BaseUrl } from '../../utils/BaseUrl';
import faqImage from '../../assets/images/faq.webp';
import Button from '../common/Button';
import { FaArrowDown, FaArrowRight } from 'react-icons/fa';

const FAQ = ({ serverData, faqImageUrl, faqImageAltText }) => {
  const stripHtml = (html) => {
    if (!html) return '';
    if (typeof document === 'undefined') {
      return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
    }
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const processFAQs = (faqs) => {
    if (!faqs || !Array.isArray(faqs)) return [];
    return faqs.map((faq, index) => ({
      key: index + 1,
      id: String(index + 1).padStart(2, '0'),
      title: faq.question,
      data: stripHtml(faq.answer),
      isOpen: false,
    }));
  };

  const [accordions, setAccordions] = useState(() => processFAQs(serverData));
  const [loading, setLoading] = useState(!serverData);

  useEffect(() => {
    // If serverData is provided, use it and don't fetch
    if (serverData && serverData.length > 0) {
      setAccordions(processFAQs(serverData));
      setLoading(false);
      return;
    }

    const fetchFAQs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BaseUrl}/faq/getAll`);
        
        if (response.data.status === 'success' && response.data.data) {
          setAccordions(processFAQs(response.data.data));
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, [serverData]);

  const toggleAccordion = (accordionKey) => {
    const updatedAccordions = accordions.map((accordion) => {
      if (accordion.key === accordionKey) {
        return { ...accordion, isOpen: !accordion.isOpen };
      } else {
        return { ...accordion, isOpen: false };
      }
    });

    setAccordions(updatedAccordions);
  };

  if (loading) {
    return (
      <div className="">
        <div className="sm:max-w-8xl max-w-[95%] mx-auto">
          <div className="sm:pb-10 pb-4">
            <div className="text-center">
              <h2 className="pt-7 text-[35px] font-[600] text-[#333333] relative inline-block">
                Frequently Asked Question
                <span className="absolute bottom-0 left-0 w-full h-1 bg-[#EE334B]"></span>
              </h2>


              <Button
              
              label={'View All FAQs'}
              variant="red"
              size="md"
              className=" uppercase text-white"
              rIcons={
                <span className={`transform transition-transform duration-200 inline-block `}>
                  <FaArrowDown color='white' />
                </span>
              }
            />
            </div>
            <div className="mt-12 text-center">
              <p>Loading FAQs...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="sm:max-w-8xl max-w-[95%] mx-auto">
        <div className="">
          <div className="text-center mb-8">
            <h2 className="pt-7 text-[35px] font-[600] text-[#333333] relative inline-block">
              Frequently Asked Question
              <span className="absolute bottom-0 left-0 w-full h-1 bg-[#EE334B]"></span>
            </h2>
            <div className=' mt-5'>
            <Button
              
              label={'View All FAQs'}
              variant="red"
              size="md"
              className=" uppercase text-white"
              rIcons={
                <span className={`transform transition-transform duration-200 inline-block `}>
                  <FaArrowRight color='white' />
                </span>
              }
            />
            </div>
          </div>
          <div className="flex sm:flex-row  pb-5 flex-col justify-between sm:gap-8 gap-6 items-center">
            {/* Left Side - Image */}
            <div className="sm:w-5/12 mx-auto w-full flex justify-center items-center relative">
              <div className="relative w-full  pt-3">
                <img 
                  src={faqImageUrl ? `${BaseUrl}/${faqImageUrl}` : faqImage} 
                  alt={faqImageAltText || "FAQ"} 
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </div>
            </div>
            
            {/* Right Side - FAQs */}
            <div className="sm:w-6/12 w-full">
              <div className="mt-0">
                {accordions.map((accordion, index) => (
                  <Accordion
                    key={accordion.key}
                    id={accordion.id}
                    title={accordion.title}
                    data={accordion.data}
                    isOpen={accordion.isOpen}
                    toggleAccordion={() => toggleAccordion(accordion.key)}
                    customKey={`${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;