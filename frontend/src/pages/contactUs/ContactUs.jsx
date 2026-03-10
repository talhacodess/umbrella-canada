import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaArrowRight, FaCheckCircle, FaClock, FaGlobe } from 'react-icons/fa';

// ── Reusable pieces ────────────────────────────────────────────
const Label = ({ text, required }) => (
  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">
    {text} {required && <span className="text-[#AC292A]">*</span>}
  </label>
);

const inputCls =
  "w-full px-4 py-3 rounded-xl bg-[#f7f8fc] border border-gray-100 text-sm text-[#192133] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#AC292A]/25 focus:border-[#AC292A] focus:bg-white transition-all duration-200";

const SectionHeader = ({ label, title, highlight, subtitle, center }) => (
  <div className={`mb-10 md:mb-12 ${center ? 'text-center flex flex-col items-center' : ''}`}>
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#AC292A]/10 text-[#AC292A] text-[10px] font-bold uppercase tracking-widest mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-[#AC292A]" />
      {label}
    </span>
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#192133] leading-tight">
      {title} {highlight && <span className="text-[#AC292A]">{highlight}</span>}
    </h2>
    {subtitle && <p className="text-gray-400 text-base mt-3 max-w-2xl leading-relaxed">{subtitle}</p>}
  </div>
);

// ── Main Component ─────────────────────────────────────────────
const ContactUs = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const stats = [
    { value: '3k+',  label: 'Brands Served' },
    { value: '99%',  label: 'Quality Score'  },
    { value: '150+', label: 'Global Hubs'    },
    { value: '24h',  label: 'Quote Speed'    },
  ];

  const features = [
    { icon: <FaCheckCircle />, text: 'Free Structural Consultation'  },
    { icon: <FaGlobe />,        text: 'Global Fulfillment Support'    },
    { icon: <FaClock />,        text: 'Quote Delivered in 24 Hours'   },
    { icon: <FaCheckCircle />, text: 'Dedicated Account Manager'     },
  ];

  const contacts = [
    { icon: <FaPhoneAlt size={16} />,    title: 'Call Us',    value: '+1 747-247-0456',           sub: 'Mon – Fri, 9am – 6pm EST',    href: 'tel:+17472470456'                    },
    { icon: <FaEnvelope size={16} />,    title: 'Email Us',   value: 'info@umbrellapackaging.ca', sub: 'We reply within 24 hours',    href: 'mailto:info@umbrellapackaging.ca'    },
    { icon: <FaMapMarkerAlt size={16} />, title: 'Visit Us',  value: '9854 National Blvd #1042',  sub: 'Los Angeles, CA 90034',       href: '#map'                                },
  ];

  const steps = [
    {
      num: '01', title: 'Mastering the Prototype',
      body: 'Every project begins with a deep dive into structural integrity. Our engineers create 3D renders that ensure your product is protected while looking magnificent.',
      bullets: ['CAD Structural Design', 'Material Weight Testing', '3D Digital Mockups'],
      img: 'https://images.unsplash.com/photo-1620912189865-1e8a33da4c5e?auto=format&fit=crop&q=80&w=1000',
    },
    {
      num: '02', title: 'Sustainable Manufacturing',
      body: 'We utilize eco-friendly inks and FSC-certified materials. Our global hubs ensure production happens closer to your fulfillment centers to reduce carbon footprints.',
      bullets: ['FSC-Certified Materials', 'Eco-Friendly Inks', 'Carbon-Reduced Shipping'],
      img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000',
      testimonial: { quote: '"Umbrella Packaging transformed our unboxing experience into a viral marketing moment."', author: '— CEO, TechRetail' },
    },
  ];

  return (
    <div className="bg-[#f7f8fc] text-[#192133] selection:bg-[#AC292A] selection:text-white">

      {/* ══════════════════════════════════════════════════════════
          HERO SECTION — dark background, content on top row
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#192133] relative overflow-hidden">

        {/* ── Background decoration ── */}
        <div className="absolute top-0 right-0 w-[560px] h-[560px] bg-[#AC292A] opacity-[0.05] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[360px] h-[360px] bg-[#AC292A] opacity-[0.04] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />
        {/* Bottom fade into form row */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#192133] pointer-events-none" />

        <div className="max-w-8xl mx-auto px-6 md:px-10 relative z-10">

          {/* ── ROW 1 — Content ──────────────────────────────── */}
          <div className="pt-20 md:pt-28 pb-16 md:pb-20">
            <div className="grid lg:grid-cols-2 gap-14 items-start">

              {/* Left — headline */}
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/8 border border-white/10 text-[#AC292A] text-[10px] font-bold uppercase tracking-widest mb-7">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AC292A] animate-pulse" />
                  Instant Project Inquiry
                </span>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Let's Build Something <br />
                  <span className="text-[#AC292A]">Exceptional Together</span>
                </h1>

                <p className="text-gray-300 text-base leading-relaxed max-w-lg">
                  Share your packaging vision with us. Our specialists at <strong className="text-white font-semibold">Umbrella Packaging</strong> will analyse your requirements and deliver a tailored quote within 24 business hours — no obligation, no hidden fees.
                </p>

                {/* Accent line */}
                <div className="flex items-center gap-3 mt-8">
                  <div className="h-0.5 w-12 rounded-full bg-[#AC292A]" />
                  <div className="h-0.5 w-4 rounded-full bg-[#AC292A]/40" />
                  <div className="h-0.5 w-2 rounded-full bg-[#AC292A]/20" />
                </div>
              </div>

              {/* Right — feature bullets + mini-stats */}
              <div className="flex flex-col gap-8">
                {/* Features */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 bg-white/5 border border-white/8 rounded-xl px-4 py-3">
                      <div className="w-7 h-7 rounded-lg bg-[#AC292A]/20 flex items-center justify-center text-[#AC292A] flex-shrink-0 text-xs">
                        {f.icon}
                      </div>
                      <span className="text-gray-200 text-sm font-medium">{f.text}</span>
                    </li>
                  ))}
                </ul>

                {/* Stats row */}
                <div className="grid grid-cols-4 gap-3">
                  {stats.map((s, i) => (
                    <div key={i} className="flex flex-col items-center text-center p-4 rounded-xl bg-white/5 border border-white/8">
                      <p className="text-[#AC292A] font-black text-2xl leading-none mb-1">{s.value}</p>
                      <p className="text-gray-400 text-[9px] font-bold uppercase tracking-widest leading-tight">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── ROW 2 — Form ─────────────────────────────────── */}
          <div className="pb-20 relative z-20">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">

              {/* Form top bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-8 md:px-12 py-5 bg-[#f7f8fc] border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#AC292A]/10 flex items-center justify-center text-[#AC292A] flex-shrink-0">
                    <FaEnvelope size={14} />
                  </div>
                  <div>
                    <p className="text-[#192133] text-sm font-bold">Request a Free Custom Quote</p>
                    <p className="text-gray-400 text-xs mt-0.5">All fields marked <span className="text-[#AC292A]">*</span> are required</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Our team is online
                </div>
              </div>

              {/* Form body */}
              <div className="px-8 md:px-12 py-8 md:py-10">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#AC292A]/10 flex items-center justify-center mb-5">
                      <FaCheckCircle size={30} className="text-[#AC292A]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#192133] mb-2">Inquiry Sent Successfully!</h3>
                    <p className="text-gray-400 text-sm max-w-sm">
                      Thank you for reaching out. A member of the Umbrella Packaging team will contact you within 24 business hours.
                    </p>
                  </div>
                ) : (
                  <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" onSubmit={handleSubmit}>

                    {/* Row 1 */}
                    <div>
                      <Label text="First Name" required />
                      <input type="text" className={inputCls} placeholder="John" />
                    </div>
                    <div>
                      <Label text="Last Name" required />
                      <input type="text" className={inputCls} placeholder="Doe" />
                    </div>
                    <div>
                      <Label text="Company Name" />
                      <input type="text" className={inputCls} placeholder="Umbrella Packaging" />
                    </div>

                    {/* Row 2 */}
                    <div>
                      <Label text="Email Address" required />
                      <input type="email" className={inputCls} placeholder="john@umbrellapackaging.ca" />
                    </div>
                    <div>
                      <Label text="Phone Number" />
                      <input type="tel" className={inputCls} placeholder="+1 (000) 000-0000" />
                    </div>
                    <div>
                      <Label text="Packaging Interest" />
                      <select className={inputCls}>
                        <option value="">Select a category</option>
                        <option>Rigid Luxury Boxes</option>
                        <option>Eco-Friendly Mailers</option>
                        <option>Retail Display</option>
                        <option>Custom Cardboard</option>
                        <option>Corrugated Shipping</option>
                        <option>Kraft Packaging</option>
                      </select>
                    </div>

                    {/* Row 3 — full width */}
                    <div className="sm:col-span-2 lg:col-span-3">
                      <Label text="Project Details" />
                      <textarea
                        rows={4}
                        className={`${inputCls} resize-none`}
                        placeholder="Describe your packaging needs — dimensions, quantity, material preferences, design requirements, and any special finishing options…"
                      />
                    </div>

                    {/* Submit row */}
                    <div className="sm:col-span-2 lg:col-span-3 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-gray-100">
                      <p className="text-gray-400 text-xs leading-relaxed">
                        By submitting you agree to our{' '}
                        <a href="/privacy" className="text-[#AC292A] underline-offset-2 hover:underline">Privacy Policy</a>.
                        We never share your information.
                      </p>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#192133] hover:bg-[#AC292A] text-white text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:shadow-[0_6px_20px_rgba(172,41,42,0.35)] active:scale-[0.98] flex-shrink-0 w-full sm:w-auto justify-center"
                      >
                        Send Inquiry <FaArrowRight size={12} />
                      </button>
                    </div>

                  </form>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PROCESS STEPS
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#f7f8fc] border-t border-gray-100">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-20 md:py-28">
          <div className="text-center flex flex-col items-center mb-14">
            <SectionHeader
              label="How It Works"
              title="Our Process,"
              highlight="Simplified"
              subtitle="From concept to delivery — a transparent, step-by-step journey with Umbrella Packaging."
              center
            />
          </div>

          <div className="flex flex-col gap-20 md:gap-28">
            {steps.map((step, i) => (
              <div key={i} className={`grid lg:grid-cols-2 gap-12 md:gap-20 items-center`}>
                {/* Image */}
                <div className={`relative group ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="absolute -inset-3 bg-[#AC292A]/4 rounded-3xl blur-2xl pointer-events-none" />
                  <div className="relative rounded-3xl overflow-hidden shadow-lg border border-gray-100">
                    <img
                      src={step.img}
                      alt={step.title}
                      className="w-full h-72 md:h-96 object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#192133]/45 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#AC292A] text-white text-[10px] font-bold uppercase tracking-widest shadow-md">
                      Step {step.num}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <span className="text-[#AC292A] font-black text-[10px] tracking-[0.3em] uppercase mb-3 block">Step {step.num}</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#192133] mb-5 leading-tight">{step.title}</h2>
                  <p className="text-gray-500 text-base leading-relaxed mb-6">{step.body}</p>
                  <ul className="space-y-3 mb-6">
                    {step.bullets.map((b, bi) => (
                      <li key={bi} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#AC292A]/10 flex items-center justify-center flex-shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#AC292A]" />
                        </div>
                        <span className="text-[#192133] font-semibold text-sm">{b}</span>
                      </li>
                    ))}
                  </ul>
                  {step.testimonial && (
                    <div className="bg-[#192133] rounded-2xl p-6 border-l-4 border-[#AC292A]">
                      <p className="italic text-gray-300 text-sm leading-relaxed mb-3">{step.testimonial.quote}</p>
                      <p className="font-bold text-[#AC292A] text-xs uppercase tracking-wide">{step.testimonial.author}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CONTACT CARDS + MAP
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">

          <SectionHeader
            label="Get In Touch"
            title="We're Always"
            highlight="Here For You"
            subtitle="Reach out through any channel. Our team at Umbrella Packaging is ready to help bring your packaging vision to life."
          />

          {/* Contact cards */}
          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {contacts.map((c, i) => (
              <a
                key={i}
                href={c.href}
                className="group flex items-center gap-5 bg-[#f7f8fc] border border-gray-100 rounded-2xl p-6 hover:border-[#AC292A]/25 hover:shadow-lg transition-all duration-300 no-underline"
              >
                <div className="w-13 h-13 w-12 h-12 rounded-2xl bg-[#192133] flex items-center justify-center text-white flex-shrink-0 shadow-md group-hover:bg-[#AC292A] transition-colors duration-300">
                  {c.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{c.title}</p>
                  <p className="text-[#192133] font-bold text-sm leading-snug truncate group-hover:text-[#AC292A] transition-colors duration-300">{c.value}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{c.sub}</p>
                </div>
                <FaArrowRight size={11} className="text-gray-200 group-hover:text-[#AC292A] flex-shrink-0 transition-all duration-300 group-hover:translate-x-1" />
              </a>
            ))}
          </div>

          {/* Map */}
          <div id="map" className="w-full h-[420px] rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.3570823903114!2d-118.40134442344795!3d34.02701551864506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2ba271a396263%3A0xc47e30777edc463d!2s9854%20National%20Blvd%20%231042%2C%20Los%20Angeles%2C%20CA%2090034!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* CTA strip */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-5 p-7 rounded-2xl bg-[#192133]">
            <div className="text-center sm:text-left">
              <p className="text-white font-bold text-base">Ready to start your packaging project?</p>
              <p className="text-gray-400 text-sm mt-1">
                Visit <span className="text-[#AC292A] font-semibold">umbrellapackaging.ca</span> or get a custom quote — it's free and takes under 2 minutes.
              </p>
            </div>
            <a
              href="#quote"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#AC292A] text-white text-sm font-bold uppercase tracking-wide hover:bg-[#AC292A]/90 hover:shadow-[0_4px_16px_rgba(172,41,42,0.40)] active:scale-[0.98] transition-all duration-200 flex-shrink-0"
            >
              Get Free Quote <FaArrowRight size={11} />
            </a>
          </div>

        </div>
      </section>

    </div>
  );
};

export default ContactUs;