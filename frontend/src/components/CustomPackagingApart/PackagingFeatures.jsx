import React, { useMemo } from 'react';
import abstractBg from '../../assets/images/custom packaging production.webp';
import { Icon10, Icon11, Icon12, Icon7, Icon8, Icon9 } from '../../assets';

const PackagingFeatures = () => {

  const printingData = useMemo(() => [
    {
      id: 1,
      icon: Icon7,
      number: '10+',
      title: 'Finishes'
    },
    {
      id: 2,
      icon: Icon8,
      number: '12+',
      title: 'Embellishments'
    },
    {
      id: 3,
      icon: Icon9,
      number: '6+',
      title: 'Printing Techniques'
    },
    {
      id: 4,
      icon: Icon10,
      number: '6+',
      title: 'Premium Materials'
    }
  ], []);

  const oldData = useMemo(() => [
    {
      id: 1,
      icon: Icon7,
      title: 'No Die & Plate Charges',
      description: 'Benefit from zero setup fees for dies and plates on your custom packaging project.'
    },
    {
      id: 2,
      icon: Icon8,
      title: 'No limit on MOQ',
      description: 'Order exactly what you need, no minimum quantity requirements, from small orders to large runs.'
    },
    {
      id: 3,
      icon: Icon9,
      title: 'Free Design Support',
      description: 'We have an In-house design department that works for free, bringing your custom packaging vision to life.'
    },
    {
      id: 4,
      icon: Icon10,
      title: 'Quickest Turnaround',
      description: 'We make sure the fastest possible turnaround, with quick production and delivery for your custom packaging project.'
    },
    {
      id: 5,
      icon: Icon11,
      title: 'Economical Prices',
      description: 'We offer the lowest possible prices, along with everyday heavy discounts on bulk purchases.'
    },
    {
      id: 6,
      icon: Icon12,
      title: 'Free Shipping',
      description: 'X Custom Packaging provides free shipping all across the USA for orders of any size. You just need to pay for the production.'
    }
  ], []);
 
  return (
    <div className=" mx-auto">
      <div className="text-center ">
        
       

        <div className="">
          
          
          <div 
            className=' p-6 sm:p-8  relative  bg-cover  bg-center bg-no-repeat '
            style={{ backgroundImage: `url(${abstractBg})` }}
          >

            <div className="grid grid-cols-1 max-w-[95%] sm:max-w-8xl mx-auto sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {oldData.map((item) => (
                <div key={item.id} className="text-center px-2">
                  <img 
                    src={item.icon} 
                    alt={item.title}
                    width={80} 
                    height={80}
                    className='mx-auto'
                    loading="lazy"
                  />
                  <strong className="font-[600] text-[#111111] block mt-2 text-[18px]">
                    {item.title}
                  </strong>
                  <p className="m-0 text-[16px] mt-1 text-[#666666]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PackagingFeatures);