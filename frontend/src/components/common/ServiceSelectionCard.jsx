import React from 'react'

const ServiceSelectionCard = ({ items = [] }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className='bg-[#F7F7F7]'>
      <div className='mx-auto'>
        <div className='flex flex-wrap justify-center gap-5 items-center'>
          {items.map((item, index) => (
            <React.Fragment key={item.id || index}>
              <div className='flex flex-row items-center justify-center gap-1.5  py-3 min-w-[120px] sm:min-w-[140px] flex-1 sm:flex-none'>
                <div className=' flex  items-center gap-2'>
                  {/* Icon */}
                {item.icon && (
                  <div className='mb-3 flex  justify-center'>
                    {typeof item.icon === 'string' ? (
                      <img 
                        src={item.icon} 
                        alt={item.title || 'Service icon'} 
                        className='w-9 h-9 sm:w-10 sm:h-10 opacity-80'
                        style={{ filter: 'saturate(100%) invert(0%)' }}
                      />
                    ) : (
                      <div className='w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center'>
                        {item.icon}
                      </div>
                    )}
                  </div>
                )}
                </div>
                
                <div>
                  {/* Main Text */}
                <h6 className='text-xs sm:text-sm font-bold text-[#213554] uppercase   leading-tight'>
                  {item.title}
                </h6>
                
                {/* Sub-text */}
                {item.description && (
                  <p className='text-[8px] sm:text-[10px] text-gray-600 '>
                    {item.description}
                  </p>
                )}
                </div>
              </div>
              {/* Separator - Show only if not last item */}
              {index < items.length - 1 && (
                <div className='h-12 w-px bg-gray-300 hidden sm:block'></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServiceSelectionCard
