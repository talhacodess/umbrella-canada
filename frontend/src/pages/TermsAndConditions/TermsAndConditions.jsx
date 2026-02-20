import React from 'react';
import { Link } from 'react-router-dom';
import { 
  IoHomeOutline, IoDocumentTextOutline, IoScaleOutline, 
  IoHammerOutline, IoBanOutline, IoBoatOutline 
} from 'react-icons/io5';
import { LiaAngleRightSolid } from 'react-icons/lia';
import Banner from '../../components/common/Banner';

function TermsAndConditions() {
  return (
    <>
      <Banner title={"Terms & Conditions"} subTitle={'Terms & Conditions'}  />
      <div className="font-['Inter'] bg-white text-[#213554] selection:bg-[#ee334b] selection:text-white">
      
     

      {/* --- Section 2: Main Legal Content --- */}
      <section className="py-24 px-6 max-w-8xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-16 text-slate-600 leading-relaxed text-lg">
            
            {/* 1. Legal Notices */}
            <article className="space-y-4">
              <h2 className="text-[#213554] text-3xl font-black tracking-tight flex items-center gap-4">
                <span className="w-8 h-1 bg-[#ee334b] rounded-full"></span>
                Legal Notices
              </h2>
              <p>
                X Custom Packaging may modify this Site and these Terms and Conditions without prior notice. You should review these Terms of Use every time you visit this Site. reproducing or redistributing any materials or software from this site is strictly prohibited.
              </p>
            </article>

            {/* 2. Content Responsibility Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 group hover:border-[#ee334b]/30 transition-all">
                <div className="text-[#ee334b] text-3xl mb-4"><IoScaleOutline /></div>
                <h3 className="text-[#213554] text-xl font-bold mb-3">Copyrights & Trademarks</h3>
                <p className="text-sm leading-relaxed">
                  You are solely responsible for the Content used in your Products. You guarantee that your designs do not infringe upon any third-party rights, including trademarks, publicity, or privacy.
                </p>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 group hover:border-[#ee334b]/30 transition-all">
                <div className="text-[#ee334b] text-3xl mb-4"><IoHammerOutline /></div>
                <h3 className="text-[#213554] text-xl font-bold mb-3">Customer Content</h3>
                <p className="text-sm leading-relaxed">
                  X Custom Packaging does not control Content posted by Customers and does not guarantee its accuracy. You are accountable for all Content transmitted through our website.
                </p>
              </div>
            </div>

            {/* 3. Artwork & Proofing */}
            <article className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-[#213554] text-2xl font-bold">Artwork Specifications</h2>
                <p className="text-base">
                  All designs must be submitted in <strong>CMYK format</strong> with a minimum of <strong>300 DPI</strong>. We are not liable for color discrepancies arising from RGB to CMYK conversions or fuzzy images due to low-resolution customer files.
                </p>
              </div>

              <div className="bg-[#213554] text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-[#ee334b] text-xl font-bold mb-4">Proofing & Matching</h3>
                  <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                    Once you approve a final artwork proof, the job is forwarded to production and printed <strong>as is</strong>. X Custom Packaging is not responsible for spelling or design errors identified after your approval.
                  </p>
                  <p className="text-slate-400 text-xs italic">
                    Note: Lamination may affect printed colors. We guarantee accuracy within 90% of the final approved proof.
                  </p>
                </div>
                <div className="absolute -bottom-10 -right-10 text-white/5 text-9xl font-black italic select-none">PROOF</div>
              </div>
            </article>

            {/* 4. Cancellations & Returns */}
            <article className="space-y-6">
              <h2 className="text-[#213554] text-3xl font-black tracking-tight flex items-center gap-4">
                <span className="w-8 h-1 bg-[#ee334b] rounded-full"></span>
                Cancellations & Refunds
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <p className="font-bold text-[#ee334b] uppercase text-xs tracking-widest flex items-center gap-2">
                    <IoBanOutline /> Order Cancellation
                  </p>
                  <p className="text-sm">
                    Orders can be canceled before printing. Stage 1 cancellations incur a <strong>$15 + 5% fee</strong>. Once an order enters stage 4 (shipping), cancellation is impossible.
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="font-bold text-[#213554] uppercase text-xs tracking-widest flex items-center gap-2">
                    <IoScaleOutline /> Returns & Re-prints
                  </p>
                  <p className="text-sm">
                    Due to the custom nature of orders, we do not offer refunds. If an error is confirmed on our part, we will reprint the order at no cost to you.
                  </p>
                </div>
              </div>
            </article>

            {/* 5. Shipping & Delivery */}
            <article className="space-y-6 bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100">
              <div className="flex items-center gap-4 mb-2">
                <IoBoatOutline className="text-[#ee334b] text-3xl" />
                <h3 className="text-[#213554] text-2xl font-black">Shipping & Delivery</h3>
              </div>
              <p className="text-sm font-medium">
                Standard shipping usually takes <strong>10 to 14 business days</strong> after final proof approval. While we aim for prompt delivery, X Custom Packaging is not responsible for delays caused by external factors such as weather, customs, or technical malfunctions.
              </p>
            </article>

          </div>

          {/* Sidebar Column */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 sticky top-12">
              <h3 className="text-xl font-bold mb-6 border-b border-slate-200 pb-4">Table of Contents</h3>
              <ul className="space-y-4 text-sm font-semibold">
                <li className="flex items-center gap-3 text-[#213554] hover:text-[#ee334b] transition-colors cursor-pointer">
                  <span className="w-1.5 h-1.5 bg-[#ee334b] rounded-full"></span>
                  Copyrights & Trademarks
                </li>
                <li className="flex items-center gap-3 text-[#213554] hover:text-[#ee334b] transition-colors cursor-pointer">
                  <span className="w-1.5 h-1.5 bg-[#ee334b] rounded-full"></span>
                  Artwork Submission
                </li>
                <li className="flex items-center gap-3 text-[#213554] hover:text-[#ee334b] transition-colors cursor-pointer">
                  <span className="w-1.5 h-1.5 bg-[#ee334b] rounded-full"></span>
                  Proofing & Materials
                </li>
                <li className="flex items-center gap-3 text-[#213554] hover:text-[#ee334b] transition-colors cursor-pointer">
                  <span className="w-1.5 h-1.5 bg-[#ee334b] rounded-full"></span>
                  Shipping Policy
                </li>
              </ul>
              
              <div className="mt-8 pt-8 border-t border-slate-200">
                <h4 className="text-[#ee334b] text-xs font-black uppercase tracking-widest mb-4">Legal Support</h4>
                <p className="text-xs text-slate-500 mb-4 font-medium italic">
                  Questions regarding our terms? Contact our legal desk.
                </p>
                <div className="p-4 bg-white rounded-xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Email</p>
                  <p className="text-sm font-bold truncate">legal@xcustompackaging.com</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* --- Section 3: Professional Bottom Strip --- */}
      <section className="bg-slate-50 py-16 px-6 border-t border-slate-200">
        <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
            <p className="text-[10px] uppercase font-bold text-[#ee334b] tracking-widest mb-2">Liability</p>
            <p className="text-sm text-slate-500 font-medium">Limited to the cost of services provided.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
            <p className="text-[10px] uppercase font-bold text-[#ee334b] tracking-widest mb-2">Warranty</p>
            <p className="text-sm text-slate-500 font-medium">Products provided on an "as is" basis.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
            <p className="text-[10px] uppercase font-bold text-[#213554] tracking-widest mb-2">Jurisdiction</p>
            <p className="text-sm text-slate-500 font-medium">Subject to local regulations and safety standards.</p>
          </div>
        </div>
        
      
      </section>

    </div>
    </>
   
  );
}

export default TermsAndConditions;