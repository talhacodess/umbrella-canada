import React from 'react';
import CardSlider from '../common/CardSlider';
import { ProductSelectionProvider } from '../common/ProductCard';
import { BaseUrl } from '../../utils/BaseUrl';

const PackagingJourney = ({ products = [] }) => {
  return (
    <section className='pt-10'>
      <div className="sm:max-w-8xl max-w-[95%] mx-auto">
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

        <ProductSelectionProvider>
          <CardSlider
            items={products?.map((item, index) => {
              return (
                <div key={item._id || index} className="w-[280px] rounded-xl overflow-hidden  flex-shrink-0">
                  {item?.video ? (
                    <video
                      src={item.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full rounded-xl h-full object-cover"
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img 
                      src={`${BaseUrl}/${item?.images?.[0]?.url}`} 
                      alt={item?.name || item?.title} 
                      className="w-full rounded-xl h-full object-cover" 
                    />
                  )}
                </div>
              );
            })}
          />
        </ProductSelectionProvider>
      </div>
    </section>
  );
};

export default React.memo(PackagingJourney);
