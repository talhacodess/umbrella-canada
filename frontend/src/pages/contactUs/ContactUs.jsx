// import React, { useState } from 'react';
// import bg from '../../assets/images/bg-contact.png';
// import { IoCallOutline } from "react-icons/io5";
// import { MdOutlineMarkEmailRead } from "react-icons/md";
// import { IoLocationOutline } from "react-icons/io5";
// import Input from '../../components/common/Input';
// import Button from '../../components/common/Button';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import { BaseUrl } from '../../utils/BaseUrl';
// import PageMetadata from '../../components/common/PageMetadata';
// import { Link } from 'react-router-dom';

// function ContactUs() {
//   // Form validation schema
//   const validationSchema = Yup.object().shape({
//     name: Yup.string().required('Name is required'),
//     email: Yup.string().email('Invalid email').required('Email is required'),
//     // phoneNumber: Yup.string().required('Phone number is required'),
//     // companyName: Yup.string().required('Company name is required'),
//     // image: Yup.mixed(),
//     message: Yup.string(),
//   });

//   // Formik hook
//   const formik = useFormik({
//     initialValues: {
//       name: '',
//       email: '',
//       phoneNumber: '',
//       companyName: '',
//       image: null,
//       message: '',
//     },


//     validationSchema,
//     onSubmit: async (values, { resetForm, setSubmitting }) => {
//       console.log(values);

//       try {
//         const formData = new FormData();
//         Object.keys(values).forEach(key => {
//           if (values[key] !== null && values[key] !== undefined) {
//             if (key === 'image') {
//               if (values[key] instanceof File) {
//                 formData.append(key, values[key]);
//               }
//             } else {
//               formData.append(key, values[key]);
//             }
//           }
//         });

//         const response = await axios.post(`${BaseUrl}/contactus/create`, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });

//         if (response.status === 200) {
//           toast.success('Your message has been sent successfully!');
//           resetForm();
//         } else {
//           throw new Error('Failed to submit form');
//         }
//       } catch (error) {
//         console.error('Error submitting form:', error);
//         toast.error('Failed to send message. Please try again.');
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });
  
//   const metadata = {
//     title: "Contact us - Umbrella Custom Packaging",
//     description: "Get In Touch Umbrella Custom Packaging-The House of Proficient Printing & Distinct Featured Boxes. Umbrella Custom Packaging facilitates your business by providing innovative styled boxes in extraordinary design. We use the finest paper material and high quality cardboard to ensure perfect Die Cut boxes. You will get guaranteed satisfaction with high quality printing.",
//     keywords: "custom packaging, wholesale boxes, packaging solutions, affordable packaging, custom boxes, packaging design, eco-friendly packaging",
//     author: "Umbrella Custom Packaging",
//     ogUrl: `${BaseUrl}/contact-us`,
//     canonicalUrl: `${BaseUrl}/contact-us`,
//     ogTitle: "Contact Us - Umbrella Custom Packaging",
//     ogDescription: "Get In Touch Umbrella Custom Packaging-The House of Proficient Printing & Distinct Featured Boxes...",
//     modifiedTime: "2025-06-13T15:18:43+00:00",
//     twitterTitle: "Contact Us - Umbrella Custom Packaging",
//     twitterDescription: "Get In Touch Umbrella Custom Packaging-The House of Proficient Printing & Distinct Featured Boxes...",
//     robots: "index, follow"
//   };

//   return (
//     <>

//       <PageMetadata {...metadata} />
//       <div className='h-auto bg-no-repeat bg-cover py-5' style={{
//         backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url(${bg})`
//       }}>
//         <div className='max-w-[1200px] mx-auto'>
//           <div>
//             <div className='max-w-[800px] max-h-[626] mx-auto md:p-[50px] p-[20px] rounded-[8px] mt-10 shadow-xl bg-opacity-40 border border-gray-100'>
//               <div className='flex flex-col justify-around items-center space-y-8'>
//                 <h2 className='md:text-[40px] text-[30px] font-semibold text-start'>Get In Touch</h2>
//                 <p className='text-[#777777] md:text-[14px] text-[13px] text-center'>
//                   Umbrella Custom Packaging-The House of Proficient Printing & Distinct Featured Boxes.
//                   Umbrella Custom Packaging facilitates your business by providing innovative styled boxes
//                   in extraordinary design. We use the finest paper material and high quality cardboard to
//                   ensure perfect Die Cut boxes. You will get guaranteed satisfaction with high quality printing.
//                   Email Us With Any Questions or Inquires or Call Us. We would be happy to answer your questions
//                   and set up a meeting with you.
//                 </p>
//               </div>

//               <form onSubmit={formik.handleSubmit}>
//                 <div className='grid md:grid-cols-2 grid-cols-1 gap-4 mt-10'>
//                   <div>
//                     <Input
//                       name="name"
//                       placeholder='Name'
//                       value={formik.values.name}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       className={`border w-full ${formik.touched.name && formik.errors.name ? ' border border-red-500' : ''} rounded-lg border-gray-300 focus:border-[#4440E6] focus:ring-1 focus:ring-[#4440E6] p-2`}
//                     />
//                     {formik.touched.name && formik.errors.name && (
//                       <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
//                     )}
//                   </div>

//                   <div>
//                     <Input
//                       type='email'
//                       name="email"
//                       placeholder='Email'
//                       value={formik.values.email}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       className={`border w-full ${formik.touched.email && formik.errors.email ? ' border border-red-500' : ''} rounded-lg border-gray-300 focus:border-[#4440E6] focus:ring-1 focus:ring-[#4440E6] p-2`}
//                     />
//                     {formik.touched.email && formik.errors.email && (
//                       <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
//                     )}
//                   </div>

//                   <div>
//                     <Input
//                       name="phoneNumber"
//                       placeholder='Phone Number'
//                       value={formik.values.phoneNumber}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       className={`border w-full ${formik.touched.phoneNumber && formik.errors.phoneNumber ? ' border border-red-500' : ''} rounded-lg border-gray-300 focus:border-[#4440E6] focus:ring-1 focus:ring-[#4440E6] p-2`}
//                     />
//                     {formik.touched.phoneNumber && formik.errors.phoneNumber && (
//                       <div className="text-red-500 text-sm mt-1">{formik.errors.phoneNumber}</div>
//                     )}
//                   </div>

//                   <div>
//                     <Input
//                       name="companyName"
//                       placeholder='Company Name'
//                       value={formik.values.companyName}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       className={`border w-full ${formik.touched.companyName && formik.errors.companyName ? ' border border-red-500' : ''} rounded-lg border-gray-300 focus:border-[#4440E6] focus:ring-1 focus:ring-[#4440E6] p-2`}
//                     />
//                     {formik.touched.companyName && formik.errors.companyName && (
//                       <div className="text-red-500 text-sm mt-1">{formik.errors.companyName}</div>
//                     )}
//                   </div>

//                   <div>
//                     <Input
//                       type='file'
//                       name="image"
//                       onChange={(event) => {
//                         formik.setFieldValue('image', event.currentTarget.files[0]);
//                       }}
//                       onBlur={formik.handleBlur}
//                       className='border w-full rounded-lg border-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#4440E6] file:text-white hover:file:bg-[#3a36c7]'
//                     />
//                     {formik.touched.image && formik.errors.image && (
//                       <div className="text-red-500 text-sm mt-1">{formik.errors.image}</div>
//                     )}
//                   </div>
//                 </div>

//                 <div className='mt-5'>
//                   <textarea
//                     name="message"
//                     placeholder="Please share specific packaging details such as dimensions, materials, weight limits, and design preferences, We'll promptly provide you with a quote"
//                     rows={3}
//                     value={formik.values.message}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className='border w-full p-2 rounded-lg border-gray-300 focus:border-[#4440E6] focus:ring-1 focus:ring-[#4440E6]'
//                   />
//                   {formik.touched.message && formik.errors.message && (
//                     <div className="text-red-500 text-sm mt-1">{formik.errors.message}</div>
//                   )}

//                   <Button
//                     type="submit"
//                     label={formik.isSubmitting ? "Sending..." : "Send"}
//                     disabled={formik.isSubmitting}
//                     className='bg-[#4440E6] hover:bg-[#3a36c7] w-full text-white mt-4 py-2 rounded-lg transition-colors duration-200'
//                   />
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className='max-w-[1200px] mx-auto mt-10'>
//         <div className='grid md:grid-cols-3 grid-cols-1 gap-10 bg-[#5a56e9] p-5 rounded-[8px]'>
//           <div className='grid grid-cols-1'>
//             <div className='bg-[#fff] flex justify-start  font-sans sm:flex-row flex-col items-center rounded-[8px] p-5 gap-3'>
//               <Link  to={'tel:+1%20747-247-0456'} className='text-white flex justify-center items-center p-3  bg-[#5a56e9] rounded-full'>
//                 <IoCallOutline size={40} />
//               </Link>
//               <div className='flex flex-col  justify-between '>
//                 <Link to={'tel:+1%20747-247-0456'}>
//                  <h2 className='text-3xl font-medium text-[#111111]'>Call Now</h2>
//                 </Link>
               
//                 <p className=' pt-1'>+1 747-247-0456</p>
//               </div>
//             </div>
//           </div>

//           <div className='grid grid-cols-1'>
//             <div className='bg-[#fff] flex justify-start  font-sans sm:flex-row flex-col items-center rounded-[8px] p-5 gap-3'>
//               <Link  to={'mailto:info@umbrellapackaging.com'} className='text-white flex justify-center items-center p-3  bg-[#5a56e9] rounded-full'>
//                 <MdOutlineMarkEmailRead size={40} />
//               </Link>
//               <div className='flex flex-col  justify-between items-start'>
//                    <Link to={'mailto:info@umbrellapackaging.com'}>
                   
//                 <h2 className='text-3xl font-medium text-[#111111]'>Email</h2>
//                    </Link>
//                 <p className=' pt-1'>info@umbrellapackaging.com</p>
//               </div>
//             </div>
//           </div>

//           <div className='grid grid-cols-1 '>
//             <div className='bg-[#fff] flex justify-start  font-sans sm:flex-row flex-col items-center rounded-[8px] p-5 gap-3'>
//               <Link  to={'https://maps.app.goo.gl/FCBPReqBvveR9ox96'} className='text-white flex justify-center items-center p-3  bg-[#5a56e9] rounded-full'>
//                 <IoLocationOutline size={40} />
//               </Link>
//               <div className='flex flex-col  justify-between items-start'>
//                                    <Link to={'https://maps.app.goo.gl/FCBPReqBvveR9ox96'}>
//                                      <h2 className='text-3xl font-medium text-[#111111]'>Location</h2>
//                                    </Link>
               
//                 <p className=' pt-1'>9854 National Blvd #1042, Los Angeles, CA 90034, United States</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className='mt-5'>
//           <iframe
//             className='bg-[#f7f7f7] rounded-[8px] p-2'
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.521941824463!2d-118.40357272390203!3d34.03048011887841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bbbf80eec803%3A0x8425555061bf7fe8!2sUmbrella%20Custom%20Packaging%20USA!5e0!3m2!1sen!2s!4v1742941460574!5m2!1sen!2s"
//             width="100%"
//             height="450"
//             allowFullScreen=""
//             loading="lazy"
//             referrerPolicy="no-referrer-when-downgrade"
//             title="Google Maps Location"
//           ></iframe>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ContactUs;


import React from 'react'

const ContactUs = () => {
  return (
    <div>
      <div className="font-['Quicksand'] text-[#213554] bg-[#fdfeff] selection:bg-[#ee334b] selection:text-white">

{/* --- Section 1: The Interactive Quote Form (MOVED TO TOP) --- */}
<section id="quote" className="py-24 px-6 bg-[#213554] relative overflow-hidden">
  {/* Abstract Background circles */}
  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ee334b] opacity-[0.05] rounded-full translate-x-1/2 -translate-y-1/2"></div>
  <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white opacity-[0.02] rounded-full -translate-x-1/2 translate-y-1/2"></div>
  
  <div className="max-w-8xl mx-auto relative z-10">
    <div className="grid lg:grid-cols-12 gap-20 items-center">
      <div className="lg:col-span-5 text-white">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-[#ee334b] text-sm font-bold tracking-widest uppercase mb-8 border border-white/5 backdrop-blur-md">
          <span className="w-2 h-2 bg-[#ee334b] rounded-full animate-pulse"></span>
          Instant Project Inquiry
        </div>
        <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
          Ready to build <br />
          <span className="text-[#ee334b]">together?</span>
        </h1>
        <p className="text-slate-300 text-lg mb-12 leading-relaxed">
          Fill out the form to your right. Our packaging specialists will review your requirements and provide a custom quote within 24 business hours.
        </p>
        
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-[#ee334b] rounded-full"></div>
            <p className="text-slate-300 font-medium">Free Structural Consultation</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-[#ee334b] rounded-full"></div>
            <p className="text-slate-300 font-medium">Eco-friendly Material Options</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-[#ee334b] rounded-full"></div>
            <p className="text-slate-300 font-medium">Global Fulfillment Support</p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7">
        <div className="bg-white p-8 lg:p-12 rounded-[40px] shadow-2xl border border-white/10">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 pl-1">First Name</label>
              <input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:ring-2 focus:ring-[#ee334b] focus:bg-white transition-all outline-none" placeholder="John" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 pl-1">Last Name</label>
              <input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:ring-2 focus:ring-[#ee334b] focus:bg-white transition-all outline-none" placeholder="Doe" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 pl-1">Company Email</label>
              <input type="email" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:ring-2 focus:ring-[#ee334b] focus:bg-white transition-all outline-none" placeholder="john@company.com" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 pl-1">Packaging Interest</label>
              <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:ring-2 focus:ring-[#ee334b] focus:bg-white transition-all outline-none appearance-none">
                <option>Select a category</option>
                <option>Rigid Luxury Boxes</option>
                <option>Eco-Friendly Mailers</option>
                <option>Retail Display</option>
              </select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 pl-1">Project Details</label>
              <textarea rows="4" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:ring-2 focus:ring-[#ee334b] focus:bg-white transition-all outline-none resize-none" placeholder="Dimensions, quantity, and design needs..."></textarea>
            </div>
            <div className="md:col-span-2 pt-4">
              <button className="w-full py-5 bg-[#ee334b] text-white font-bold rounded-2xl shadow-lg shadow-[#ee334b]/30 hover:scale-[1.01] active:scale-[0.98] transition-all uppercase tracking-widest">
                Request Estimate
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>

{/* --- Section 2: Visual Trust Bar --- */}
<section className="py-16 border-y border-slate-50 bg-slate-50/30">
  <div className="max-w-8xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
    <div>
      <h3 className="text-4xl font-bold text-[#ee334b]">3k+</h3>
      <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">Brands Served</p>
    </div>
    <div>
      <h3 className="text-4xl font-bold text-[#ee334b]">99%</h3>
      <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">Quality Score</p>
    </div>
    <div>
      <h3 className="text-4xl font-bold text-[#ee334b]">150+</h3>
      <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">Global Hubs</p>
    </div>
    <div>
      <h3 className="text-4xl font-bold text-[#ee334b]">24h</h3>
      <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">Quote Speed</p>
    </div>
  </div>
</section>

{/* --- Section 3: The "Long" Process Walkthrough --- */}
<section id="process" className="py-32 px-6">
  <div className="max-w-8xl mx-auto">
    <div className="grid lg:grid-cols-2 gap-24 items-center mb-32">
      <div className="relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#ee334b]/5 rounded-full blur-3xl"></div>
        <img 
          src="https://images.unsplash.com/photo-1620912189865-1e8a33da4c5e?auto=format&fit=crop&q=80&w=1000" 
          alt="Design" 
          className="rounded-[40px] shadow-2xl relative z-10"
        />
      </div>
      <div>
        <span className="text-[#ee334b] font-bold text-sm tracking-[0.3em] uppercase mb-4 block">Step 01</span>
        <h2 className="text-5xl font-bold mb-6">Mastering the Prototype</h2>
        <p className="text-lg text-slate-500 leading-relaxed mb-8">
          Every project begins with a deep dive into structural integrity. Our engineers create 3D renders that ensure your product is protected while looking magnificent.
        </p>
        <ul className="space-y-4 font-bold">
          <li className="flex items-center gap-3"><span className="w-2 h-2 bg-[#ee334b] rounded-full"></span> CAD Structural Design</li>
          <li className="flex items-center gap-3"><span className="w-2 h-2 bg-[#ee334b] rounded-full"></span> Material Weight Testing</li>
          <li className="flex items-center gap-3"><span className="w-2 h-2 bg-[#ee334b] rounded-full"></span> 3D Digital Mockups</li>
        </ul>
      </div>
    </div>

    <div className="grid lg:grid-cols-2 gap-24 items-center">
      <div className="order-2 lg:order-1">
        <span className="text-[#ee334b] font-bold text-sm tracking-[0.3em] uppercase mb-4 block">Step 02</span>
        <h2 className="text-5xl font-bold mb-6">Sustainable Manufacturing</h2>
        <p className="text-lg text-slate-500 leading-relaxed mb-8">
          We utilize eco-friendly inks and FSC-certified materials. Our global hubs ensure that production happens closer to your fulfillment centers to reduce carbon footprints.
        </p>
        <div className="bg-[#213554] p-8 rounded-3xl text-white">
          <p className="italic mb-4 text-slate-300">"X Custom Packaging transformed our unboxing experience into a viral marketing moment."</p>
          <p className="font-bold text-[#ee334b]">— CEO, TechRetail</p>
        </div>
      </div>
      <div className="relative order-1 lg:order-2">
        <img 
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000" 
          alt="Manufacturing" 
          className="rounded-[40px] shadow-2xl"
        />
      </div>
    </div>
  </div>
</section>

{/* --- NEW SECTION: QUICK CONTACT & MAP (Themed from Image) --- */}
<section className="py-24 px-6 bg-slate-50">
  <div className="max-w-8xl mx-auto">
    {/* Quick Contact Cards */}
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      {/* Call Now */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6 group hover:border-[#ee334b] transition-all">
        <div className="w-16 h-16 rounded-2xl bg-[#ee334b] flex items-center justify-center text-white shadow-lg shadow-[#ee334b]/20">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
        </div>
        <div>
          <h4 className="text-2xl font-bold">Call Now</h4>
          <p className="text-slate-500 font-semibold">+1 747-247-0456</p>
        </div>
      </div>

      {/* Email */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6 group hover:border-[#ee334b] transition-all">
        <div className="w-16 h-16 rounded-2xl bg-[#ee334b] flex items-center justify-center text-white shadow-lg shadow-[#ee334b]/20">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        </div>
        <div>
          <h4 className="text-2xl font-bold">Email</h4>
          <p className="text-slate-500 font-semibold text-sm">info@xcustompackaging.com</p>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6 group hover:border-[#ee334b] transition-all">
        <div className="w-16 h-16 rounded-2xl bg-[#213554] flex items-center justify-center text-white shadow-lg shadow-[#213554]/20 group-hover:bg-[#ee334b] transition-colors">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        </div>
        <div>
          <h4 className="text-2xl font-bold">Location</h4>
          <p className="text-slate-500 text-xs font-semibold leading-relaxed">9854 National Blvd #1042, Los Angeles, CA 90034</p>
        </div>
      </div>
    </div>

    {/* Map Embed Container */}
    <div className="w-full h-[450px] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.3570823903114!2d-118.40134442344795!3d34.02701551864506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2ba271a396263%3A0xc47e30777edc463d!2s9854%20National%20Blvd%20%231042%2C%20Los%20Angeles%2C%20CA%2090034!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
        className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
        style={{ border: 0 }} 
        allowFullScreen="" 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    
    
  </div>
</section>

</div>
    </div>
  )
}

export default ContactUs