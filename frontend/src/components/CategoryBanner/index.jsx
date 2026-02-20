import React from 'react';
import Button from '../common/Button';
import { BaseUrl } from '../../utils/BaseUrl';

const CategoryBanner = ({ 
  title, 
  content, 
  image, 
  imageAltText,
  buttonLabel = "Get Custom Quote",
  onButtonClick 
}) => {
  return (
    <section className='my-12'>
      <div className="sm:max-w-8xl justify-between gap-8 lg:gap-12 items-center max-w-[95%] flex sm:flex-row flex-col mx-auto">
        <div className='sm:w-6/12 w-full'>
          <div>
            <div className="flex gap-4">
              <div className="w-1 h-12 bg-gradient-to-b from-[#EE334B] to-[#213554] rounded-full"></div>
              <h2 className="sm:text-[38px] text-[25px] leading-[42px] pb-2 font-sans font-[600] text-[#333333]">
                {title}
              </h2>
            </div>
            
            <div className='overflow-y-auto h-44 pt-3 custom-scrollbar'>
              <p 
                dangerouslySetInnerHTML={{ __html: content }} 
                className="text-sm leading-6 mb-6"
              />
            </div>

            <div className='pt-9'>
              <Button
                onClick={onButtonClick}
                className="bg-gradient-to-r from-[#213554] to-[#213554]/90 hover:from-[#EE334B] hover:to-[#EE334B]/90 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                label={buttonLabel}
              />
            </div>
          </div>
        </div>
        
        {image && (
          <div className='sm:w-6/12 w-full'>
            <div className="rounded-2xl h-96 overflow-hidden shadow-xl">
              <img
                src={`${BaseUrl}/${image}`}
                alt={imageAltText || title}
                className="w-full h-full object-cover rounded-xl shadow-md"
                loading="lazy"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default React.memo(CategoryBanner);
