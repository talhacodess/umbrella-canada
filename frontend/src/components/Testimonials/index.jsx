import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Button from "../common/Button";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://xcustompackaging.com/rating/getAllGoogleReviews");
        const result = await response.json();
        const reviewsData = result?.reviews || result?.data?.reviews || result;
        
        if (Array.isArray(reviewsData)) {
          setTestimonials(reviewsData);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);
 
  if (loading || testimonials.length === 0) {
    return <div className="py-20 text-center  text-[#213554]">Loading Reviews...</div>;
  }
 
  return (
    <div className="py-16  ">
      <section className="overflow-hidden relative">
        <style>
          {`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              display: flex;
              width: max-content;
              animation: scroll 100s linear infinite;
            }
            .pause-on-hover:hover .animate-marquee {
              animation-play-state: paused;
            }
            .testimonial-mask {
              mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
              -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
            }
          `}
        </style>
 
        <div className="max-w-8xl mx-auto text-center px-6">
          <div className="testimonial-mask pause-on-hover p-3">
            <div className="animate-marquee gap-6">
              {/* We duplicate the array to create the infinite loop effect */}
              {[...testimonials, ...testimonials].map((testimonial, index) => {
                const names = testimonial.author_name?.trim().split(' ') || [];
                const initials = `${names[0]?.charAt(0) || ''}${names[names.length - 1]?.charAt(0) || ''}`.toUpperCase();
 
                return (
                  <div
                    key={index}
                    className="p-8 bg-white border border-slate-100 w-[350px] md:w-[400px] rounded-[2rem] shadow-sm shrink-0 flex flex-col text-left whitespace-normal hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="w-12 h-12 rounded-full bg-[#ee334b] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm"
                        style={{
                          backgroundImage: testimonial.profile_photo_url ? `url(${testimonial.profile_photo_url})` : 'none',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        {!testimonial.profile_photo_url && initials}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#213554] text-lg leading-none mb-1">
                          {testimonial.author_name}
                        </h4>
                        <div className="flex text-yellow-500 text-xs gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < Math.floor(testimonial.rating) ? "fill-current" : "text-slate-200"} />
                          ))}
                        </div>
                      </div>
                    </div>
 
                    <p className="text-slate-600 text-base leading-relaxed line-clamp-4 italic mb-6">
                      "{testimonial.text || "Highly recommended service and quality!"}"
                    </p>
 
                    <div className="mt-auto pt-4 border-t border-slate-50">
                      <p className="text-[#ee334b] text-xs font-bold uppercase tracking-widest">
                        Verified Google Review
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
 
          <div className="mt-16">
           <a href="https://www.google.com/search?sca_esv=1af006d14f18ca7f&rlz=1C1RXMK_en-GBPK1190PK1190&sxsrf=ANbL-n41RZb-0JiUnyL3pswQbyVTBtV2Kw:1768577776703&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOf1vgl_3Y0ETzIquowROB-BxkPZJM6EWcTFzWmcnsl-FZmExVeO-CVINtkvBL5KVhJ0BASn6vpMB-EjQ2gUvw7Wr3d4dHk1adWvBj2D6YmZXCO9pIw%3D%3D&q=Umbrella+Custom+Packaging+USA+Reviews&sa=X&ved=2ahUKEwjOkY3RsZCSAxXaVUEAHZasDSsQ0bkNegQIWBAH&biw=1680&bih=923&dpr=1&aic=0" target="_blank" rel="noopener noreferrer"> <Button label={"View More Reviews on Google"} /></a>
            </div>
        </div>
      </section>
    </div>
  );
};
 
export default Testimonials;