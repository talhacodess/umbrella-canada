import React from 'react'

import { Cursor, useTypewriter } from 'react-simple-typewriter'

import { BaseUrl } from '../../utils/BaseUrl';
import PageMetadata from '../../components/common/PageMetadata';
import Banner from '../../components/common/Banner';
function ShippingPolicy() {
    const [ text]  = useTypewriter({
            words: ['Quality And Innovation.'],
            typeSpeed: 80,
            deleteSpeed: 80,
            loop:{},
        });


         const metadata = {
                    title: "Shipping Policy - Umbrella Custom Packaging",
                    description: "We committed to quality&nbsp;and&nbsp;innovation. Various Custom Packaging Styles With Perfect Solutions. graphic-designing Free Design Free Shipping Cheapest​ Get Intense Quote Free Quote pen-tool-vector-design Free Design support printer Free Lamination Free Shipping FSC Certified Quickest Turnaround Free Quote pen-tool-vector-design Free Design support printer Free Lamination Free Shipping FSC Certified Quickest Turnaround Privacy Umbrella Custom Packaging is [&hellip;]",
                    keywords: "custom packaging, wholesale boxes, packaging solutions, affordable packaging, custom boxes, packaging design, eco-friendly packaging",
                    author: "Umbrella Custom Packaging",
                    ogUrl: `${BaseUrl}/shipping-policy`,
                      canonicalUrl: `${BaseUrl}/shipping-policy`,
                    ogTitle: "Shipping Policy - Umbrella Custom Packaging",
                    ogDescription: "We committed to quality&nbsp;and&nbsp;innovation. Various Custom Packaging Styles With Perfect Solutions. graphic-designing Free Design Free Shipping Cheapest​ Get Intense Quote Free Quote pen-tool-vector-design Free Design support printer Free Lamination Free Shipping FSC Certified Quickest Turnaround Free Quote pen-tool-vector-design Free Design support printer Free Lamination Free Shipping FSC Certified Quickest Turnaround Privacy Umbrella Custom Packaging is [&hellip;]",
                    modifiedTime: "2025-06-13T15:18:43+00:00",
                    twitterTitle: "Shipping Policy - Umbrella Custom Packaging",
                    twitterDescription: "We committed to quality&nbsp;and&nbsp;innovation. Various Custom Packaging Styles With Perfect Solutions. graphic-designing Free Design Free Shipping Cheapest​ Get Intense Quote Free Quote pen-tool-vector-design Free Design support printer Free Lamination Free Shipping FSC Certified Quickest Turnaround Free Quote pen-tool-vector-design Free Design support printer Free Lamination Free Shipping FSC Certified Quickest Turnaround Privacy Umbrella Custom Packaging is [&hellip;]",
                    robots: "index, follow"
                  };

  return (
    <>
    <PageMetadata {...metadata} />
    <Banner subTitle="Shipping Policy" />
    <div className='bg-[#f7f7f7] '>
              <div className='max-w-[95%] mx-auto h-30  flex justify-start items-center '><h2 className='text-2xl'>Shipping Policy</h2></div>
              

             </div>
    <div className='max-w-[95%] mx-auto'>


      <div class="py-6">

        <section class="space-y-4 text-sm leading-relaxed">
            <p>
                By using this website and or placing an order with Umbrella Custom Packaging, you agree to these Terms & Conditions. 
                Umbrella Custom Packaging may update these Terms & Conditions. Umbrella Custom Packaging may update these terms at 
                any time without prior notice, and we recommend reviewing this page periodically for any changes.
            </p>
            <p>
                Umbrella Custom Packaging retains ownership of all literature, materials, and manufacturing know-how used in producing 
                custom boxes and packaging. We do not sell or share our proprietary materials or production content with third parties. 
                Unless otherwise agreed in writing, Umbrella Custom Packaging may also distribute free samples and display completed 
                packaging for portfolio or website purposes.
            </p>
        </section>

        <section class="space-y-3">
            <h2 class="text-xl font-bold text-slate-900">Copyright Notice</h2>
            <p class="text-sm leading-relaxed">
                All content on this website including text, images, graphics, illustrations, designs, icons, software, and all other 
                materials are the property of Umbrella Custom Packaging and or third party service providers. You may not copy, store, 
                republish, modify, or distribute any website content without written consent.
            </p>
        </section>

        <section class="space-y-4">
            <h2 class="text-xl font-bold text-slate-900">User Conduct on Umbrella Custom Packaging</h2>
            
            <p class="text-sm">Users are responsible for any content they send, upload, submit, or transmit through this website.</p>
            
            <p class="text-sm">By using this website, you agree not to upload, submit, or transmit any content that:</p>
            
            <ul class="list-disc ml-6 space-y-3 text-sm">
                <li>Is unlawful, indecent, offensive, or defamatory</li>
                <li>Infringes intellectual property rights of Umbrella Custom Packaging or any third party</li>
                <li>Restricts or interferes with other users' access to the website</li>
            </ul>

            <div class="space-y-4 pt-2 text-sm leading-relaxed">
                <p>
                    You confirm that any images, trademarks, copyrighted designs, or other materials you provide for printing are 
                    either owned by you or used with proper written authorization.
                </p>
                <p>
                    Umbrella Custom Packaging is not responsible for the accuracy, quality, or integrity of user-submitted content 
                    and is not liable for content that may be considered objectionable.
                </p>
                <p>
                    Umbrella Custom Packaging and its authorized team reserve the right to remove content that violates these 
                    Terms & Conditions. Content may also be disclosed if required by law, legal process, or to protect the rights.
                </p>
            </div>
        </section>

    </div>

     


            </div>
             
    </>
     
  )
}

export default ShippingPolicy
