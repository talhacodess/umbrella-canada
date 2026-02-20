import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import abstractBg from '../../assets/images/stars.webp';

const TestimonialCard = ({ testimonial }) => {
    // Get initials from the name field in the API
    const name = testimonial.name || "Anonymous";
    const initials = name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col gap-4 text-left w-[320px] md:w-[350px] shrink-0 mb-2 overflow-x-hidden">
            <div className="flex items-center gap-3">
                <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-inner"
                    style={{ backgroundColor: '#ee334b' }}
                >
                    {initials}
                </div>
                <div>
                    <h4 className="font-bold text-sm tracking-tight" style={{ color: '#213554' }}>
                        {name}
                    </h4>
                    <div className="flex text-amber-400 text-[10px] mt-0.5">
                        {/* Ensure rating is a number, default to 5 if missing */}
                        {[...Array(Number(testimonial.rating) || 5)].map((_, i) => (
                            <span key={i}>★</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* API uses the 'review' field for the message */}
            <p className="text-zinc-600 text-[14px] leading-relaxed line-clamp-4">
                {testimonial.review}
            </p>
        </div>
    );
};

const PersonalTestimonial = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch('https://xcustompackaging.com/Rating/getAll');
                const result = await response.json();
                
                // Based on your JSON: result.status === "success" and data is in result.data
                if (result.status === "success" && Array.isArray(result.data)) {
                    setTestimonials(result.data);
                }
            } catch (error) {
                console.error("Error fetching testimonials:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    // Split data into two rows for the marquee effect
    const halfIndex = Math.ceil(testimonials.length / 2);
    const row1 = testimonials.slice(0, halfIndex);
    const row2 = testimonials.slice(halfIndex);

    // Dynamic animation timing: longer list = slower speed to keep it smooth
    const scrollSpeed = testimonials.length > 10 ? testimonials.length * 3 : 30;

    if (loading) return <div className="py-20 text-center font-bold">Loading Reviews...</div>;
    if (testimonials.length === 0) return null;

    return (
        <section className=" bg-white py-10 overflow-hidden relative">
            <style>
                {`
                @keyframes scrollLeft {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-350px * ${row1.length} - 1.5rem * ${row1.length})); }
                }
                @keyframes scrollRight {
                    0% { transform: translateX(calc(-350px * ${row2.length} - 1.5rem * ${row2.length})); }
                    100% { transform: translateX(0); }
                }
                .animate-scroll-left { animation: scrollLeft ${scrollSpeed}s linear infinite; }
                .animate-scroll-right { animation: scrollRight ${scrollSpeed}s linear infinite; }
                .pause-on-hover:hover .animate-scroll-left,
                .pause-on-hover:hover .animate-scroll-right {
                    animation-play-state: paused;
                }
                .testimonial-mask {
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                }
                `}
            </style>

            <div className="max-w-8xl mx-auto ">
                <div className='relative bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${abstractBg})` }}>
                    <div className='flex flex-col justify-between items-center pb-10'>
                        <h2 className="text-3xl md:text-5xl font-black text-center  pb-3 tracking-tight" style={{ color: '#213554' }}>
                            What People Are Saying
                        </h2>
                        <p className='  mb-5'>Start creating your custom boxes effortlessly with our extensive library, featuring fully customizable layouts for promotional, mailer, and dispaly boxes,</p>
                        <Button label={"Write a Review"} className='' />
                    </div>

                    <div className="flex flex-col gap-8 pause-on-hover testimonial-mask">
                        {/* Row 1 */}
                        {row1.length > 0 && (
                            <div className="flex overflow-hidden">
                                <div className="flex gap-6 animate-scroll-left">
                                    {[...row1, ...row1].map((t, idx) => (
                                        <TestimonialCard key={`row1-${t._id}-${idx}`} testimonial={t} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Row 2 */}
                        {row2.length > 0 && (
                            <div className="flex overflow-hidden">
                                <div className="flex gap-6 animate-scroll-right">
                                    {[...row2, ...row2].map((t, idx) => (
                                        <TestimonialCard key={`row2-${t._id}-${idx}`} testimonial={t} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='flex flex-col justify-between items-center pt-10'>
                        <Button label={"Read More"} variant='red' />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PersonalTestimonial;   