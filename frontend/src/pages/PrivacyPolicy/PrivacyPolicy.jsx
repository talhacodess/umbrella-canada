import React from 'react';
import { Link } from 'react-router-dom';
import { 
  IoHomeOutline, IoShieldCheckmarkOutline, IoLockClosedOutline, 
  IoDocumentTextOutline, IoCallOutline, IoMailOutline, IoGlobeOutline, IoFingerPrintOutline
} from 'react-icons/io5';
import { LiaAngleRightSolid } from 'react-icons/lia';

function PrivacyPolicy() {
  return (
    <>
    
    <div className="font-['Inter'] bg-white text-[#213554] selection:bg-[#ee334b] selection:text-white">
      
      {/* --- Section 1: Hero Banner --- */}
      <div className="w-full py-20 bg-[#213554] relative overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#ee334b] opacity-10 skew-x-12 translate-x-20"></div>
        
        {/* Maximum width set to 8xl */}
        <div className="max-w-8xl mx-auto px-6 relative z-10">
          <nav className="flex gap-2 items-center text-white/60 mb-6 text-xs uppercase font-bold tracking-widest">
            <Link to={'/'} className="hover:text-white transition-colors">
              <IoHomeOutline size={16} />
            </Link> 
            <LiaAngleRightSolid />
            <span>Legal Center</span>
          </nav>
          
          <h1 className="text-white text-4xl md:text-7xl font-black">
            Privacy <span className="text-[#ee334b]">Policy</span>
          </h1>
          <p className="text-slate-400 text-lg mt-4 max-w-3xl border-l-2 border-[#ee334b] pl-6 font-medium">
            At X Custom Packaging, your confidentiality is our priority. We are committed to protecting your personal and business data through industry-leading security standards.
          </p>
        </div>
      </div>

      {/* --- Section 2: Core Privacy Content --- */}
      {/* Maximum width set to 8xl for consistency across sections */}
      <section className="py-24 px-6 max-w-8xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-16 text-slate-600 leading-relaxed text-lg">
            
            {/* 1. Commitment */}
            <article className="space-y-4">
              <h2 className="text-[#213554] text-3xl font-black tracking-tight flex items-center gap-4">
                <span className="w-8 h-1 bg-[#ee334b] rounded-full"></span>
                Confidentiality Commitment
              </h2>
              <p>
                X Custom Packaging is committed to maintaining the confidentiality of our customers. We do not share, sell, or otherwise disclose information about our clients to any other party except as required to process and ship purchases. We are the sole owner of the information collected on <span className="text-[#ee334b] font-bold">www.xcustompackaging.com</span>.
              </p>
            </article>

            {/* 2. Data Collection & Registration Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 group hover:border-[#ee334b]/30 transition-all">
                <div className="text-[#ee334b] text-3xl mb-4"><IoFingerPrintOutline /></div>
                <h3 className="text-[#213554] text-xl font-bold mb-3">Data Collection</h3>
                <p className="text-sm">We collect information from our users at several different points on our website to ensure a seamless service experience. This is strictly used for order accuracy and service improvements.</p>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 group hover:border-[#ee334b]/30 transition-all">
                <div className="text-[#ee334b] text-3xl mb-4"><IoDocumentTextOutline /></div>
                <h3 className="text-[#213554] text-xl font-bold mb-3">Registration</h3>
                <p className="text-sm">During registration, users provide a name and email. We use this to contact you regarding our services, even if a formal project has not yet been initiated.</p>
              </div>
            </div>

            {/* 3. Orders & Cookies */}
            <article className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-[#213554] text-2xl font-bold">Order Processing</h2>
                <p className="text-base">
                  Our order form requires contact info (name, shipping address) and financial info (credit card details). This is used strictly for credit card authorization and order fulfillment. If processing issues arise, we use this info to contact you immediately.
                </p>
              </div>

              <div className="bg-[#213554] text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-[#ee334b] text-xl font-bold mb-4">Cookies & Log Files</h3>
                  <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                    We use persistent cookies to uniquely identify users, associate files with orders, and enable the shopping basket. Our site requires cookies to be active for full functionality.
                  </p>
                  <p className="text-slate-400 text-xs">
                    Log files (IP addresses, browser type, platform type) are used to analyze trends and gather broad demographic data. This data is <strong>never</strong> linked to personally identifiable information.
                  </p>
                </div>
                <div className="absolute -bottom-10 -right-10 text-white/5 text-9xl font-black italic select-none">DATA</div>
              </div>
            </article>

            {/* 4. Security Section */}
            <article className="space-y-6">
              <h2 className="text-[#213554] text-3xl font-black tracking-tight flex items-center gap-4">
                <span className="w-8 h-1 bg-[#ee334b] rounded-full"></span>
                Security Infrastructure
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[#ee334b] font-bold uppercase text-xs tracking-widest">
                    <IoLockClosedOutline /> Online Security
                  </div>
                  <p className="text-sm">Sensitive info like credit card numbers is encrypted with industry-leading <strong>SSL software</strong>. Your data is protected by the best encryption standards available.</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[#213554] font-bold uppercase text-xs tracking-widest">
                    <IoShieldCheckmarkOutline /> Offline Security
                  </div>
                  <p className="text-sm">Access to your information is strictly restricted in our offices. Only employees performing specific job functions are granted data access.</p>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar Column for quick info */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 sticky top-12">
              <h3 className="text-xl font-bold mb-6 border-b border-slate-200 pb-4">Quick Links</h3>
              <ul className="space-y-4 text-sm font-semibold">
                <li className="flex items-center gap-3 text-[#213554] hover:text-[#ee334b] transition-colors cursor-pointer">
                  <span className="w-1.5 h-1.5 bg-[#ee334b] rounded-full"></span>
                  Data Collection
                </li>
                <li className="flex items-center gap-3 text-[#213554] hover:text-[#ee334b] transition-colors cursor-pointer">
                  <span className="w-1.5 h-1.5 bg-[#ee334b] rounded-full"></span>
                  Registration Policy
                </li>
                <li className="flex items-center gap-3 text-[#213554] hover:text-[#ee334b] transition-colors cursor-pointer">
                  <span className="w-1.5 h-1.5 bg-[#ee334b] rounded-full"></span>
                  Security Protocols
                </li>
              </ul>
              
              <div className="mt-8 pt-8 border-t border-slate-200">
                <h4 className="text-[#ee334b] text-xs font-black uppercase tracking-widest mb-4">Support</h4>
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 mb-4">
                  <IoCallOutline className="text-[#ee334b]" size={20} />
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Privacy Desk</p>
                    <p className="text-sm font-bold">+1 747-247-0456</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* --- Section 3: Professional Contact Strip --- */}
      <section className="bg-slate-50 py-16 px-6 border-t border-slate-200">
        {/* Maximum width set to 8xl */}
        <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          
          <div className="flex items-center gap-5 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="w-14 h-14 rounded-full bg-[#ee334b]/5 flex items-center justify-center text-[#ee334b] shadow-inner">
              <IoCallOutline size={24} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Privacy Desk</p>
              <p className="text-base font-bold text-[#213554]">+1 747-247-0456</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="w-14 h-14 rounded-full bg-[#ee334b]/5 flex items-center justify-center text-[#ee334b] shadow-inner">
              <IoMailOutline size={24} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Inquiries</p>
              <p className="text-base font-bold text-[#213554]">info@xcustompackaging.com</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="w-14 h-14 rounded-full bg-[#213554]/5 flex items-center justify-center text-[#213554] shadow-inner">
              <IoShieldCheckmarkOutline size={24} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Security Status</p>
              <p className="text-base font-bold text-[#213554]">SSL Fully Verified</p>
            </div>
          </div>

        </div>
        
        <div className="text-center mt-16 pt-8 border-t border-slate-200">
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.3em]">
            © 2026 X Custom Packaging Global. All Rights Reserved.
          </p>
        </div>
      </section>

    </div>
    </>
    
  );
}

export default PrivacyPolicy;