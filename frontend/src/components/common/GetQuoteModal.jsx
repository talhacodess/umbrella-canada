import { MdClose } from "react-icons/md";
import { RiCheckboxCircleLine } from "react-icons/ri";
import Input from "./Input";
import Textarea from "./Textarea";
import Button from "./Button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";
import Modal from "./Modal";
import video from '../../assets/videos/getqoute.mp4';

// ── Step indicator ─────────────────────────────────────────────
const StepIndicator = ({ step }) => (
  <div className="flex items-center gap-0 mb-7">
    {/* Step 1 */}
    <div className="flex items-center gap-2">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
        ${step >= 1 ? 'bg-[#AC292A] text-white shadow-[0_2px_8px_rgba(172,41,42,0.35)]' : 'bg-gray-100 text-gray-400'}`}
      >
        {step > 1 ? (
          <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
            <path d="M1.5 5.5L5.5 9.5L12.5 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : '1'}
      </div>
      <span className={`text-xs font-bold uppercase tracking-wide transition-colors duration-300
        ${step >= 1 ? 'text-[#192133]' : 'text-gray-400'}`}
      >
        Product Details
      </span>
    </div>

    {/* Connector */}
    <div className="flex-1 mx-4 h-0.5 rounded-full bg-gray-100 overflow-hidden mx-3">
      <div className={`h-full rounded-full bg-[#AC292A] transition-all duration-500 ${step >= 2 ? 'w-full' : 'w-0'}`} />
    </div>

    {/* Step 2 */}
    <div className="flex items-center gap-2">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
        ${step >= 2 ? 'bg-[#AC292A] text-white shadow-[0_2px_8px_rgba(172,41,42,0.35)]' : 'bg-gray-100 text-gray-400'}`}
      >
        2
      </div>
      <span className={`text-xs font-bold uppercase tracking-wide transition-colors duration-300
        ${step >= 2 ? 'text-[#192133]' : 'text-gray-400'}`}
      >
        Contact Info
      </span>
    </div>
  </div>
);

// ── Shared label ───────────────────────────────────────────────
const FieldLabel = ({ text, required }) => (
  <label className="block pb-1.5 text-[#192133] text-xs font-bold uppercase tracking-wide">
    {text} {required && <span className="text-[#AC292A]">*</span>}
  </label>
);

// ── Shared select ──────────────────────────────────────────────
const StyledSelect = ({ name, value, onChange, required, children }) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    required={required}
    className="w-full border border-gray-200 bg-white text-sm px-3 py-2.5 rounded-xl text-[#192133] focus:outline-none focus:ring-2 focus:ring-[#AC292A]/30 focus:border-[#AC292A] transition-all duration-200 cursor-pointer"
  >
    {children}
  </select>
);

const GetQuoteModal = ({ isModalOpen, setIsModalOpen, closeModal }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") setPageUrl(window.location.href);
  }, []);

  const initialFormState = {
    name: "", email: "", companyName: "", phoneNumber: "",
    boxStyle: "", length: "", width: "", depth: "",
    unit: "Inches", stock: "Stock", colors: "Colors",
    printingSides: "Inside", quantity: "", addOns: "",
    image: null, description: "", pageUrl,
  };

  const [formData, setFormData] = useState(initialFormState);

  const validateStep1 = () =>
    formData.boxStyle && formData.length && formData.width && formData.depth &&
    formData.unit && formData.stock && formData.colors && formData.printingSides && formData.quantity;

  const validateStep2 = () => formData.name && formData.email;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files?.[0]) {
      if (files[0].size > 5 * 1024 * 1024) { toast.error("File size exceeds 5MB limit."); return; }
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error("File size exceeds 5MB limit."); return; }
    setFormData(prev => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) { alert("Please fill all required fields"); return; }
    setIsLoading(true);
    try {
      const fd = new FormData();
      for (const key in formData) fd.append(key, formData[key]);
      const response = await axios.post(`${BaseUrl}/requestQuote/create`, fd);
      if (response.data.status === 'success') {
        toast.success(response.data.message);
        setStep(1); setFormData(initialFormState); setIsModalOpen(false);
      } else { toast.error(response.data.message); }
    } catch (error) { toast.error(error?.response?.data?.message); }
    finally { setIsLoading(false); }
  };

  const nextStep = () => {
    if (!validateStep1()) { alert("Please fill all required fields in Product Specification"); return; }
    setStep(2);
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} className="rounded-3xl max-w-6xl w-[95%] sm:w-[90%]">
      <div className="bg-white overflow-hidden rounded-3xl">
        <div className="flex flex-col lg:flex-row h-full">

          {/* ── Left video panel ── */}
          <div className="hidden lg:flex lg:w-5/12 xl:w-4/12 flex-shrink-0 relative overflow-hidden">
            <video autoPlay muted playsInline loop className="w-full h-full object-cover">
              <source src={video} type="video/mp4" />
            </video>
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#192133]/80 via-[#192133]/20 to-transparent" />
            {/* Bottom text */}
            <div className="absolute bottom-8 left-7 right-7 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#AC292A] text-white text-[10px] font-bold uppercase tracking-widest mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                Free Quote
              </span>
              <h3 className="text-white font-bold text-xl leading-snug">
                Custom Packaging<br />Built For Your Brand
              </h3>
              <p className="text-gray-300 text-xs mt-2 leading-relaxed">
                Tell us your specs — we'll deliver a tailored solution within 24 hours.
              </p>
              {/* Stats row */}
              <div className="flex items-center gap-4 mt-5 pt-5 border-t border-white/10">
                {[['24h', 'Response'], ['1k+', 'Clients'], ['6', 'Countries']].map(([val, lbl]) => (
                  <div key={lbl}>
                    <p className="text-[#AC292A] font-black text-base leading-none">{val}</p>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">{lbl}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right form panel ── */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 md:px-8 pt-7 pb-5 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#AC292A]/10 flex items-center justify-center">
                  <RiCheckboxCircleLine className="w-5 h-5 text-[#AC292A]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#192133] leading-none">Request A Quote</h2>
                  <p className="text-gray-400 text-xs mt-0.5">Fill in your specs — we'll get back within 24 hours</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-9 h-9 rounded-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#AC292A] hover:border-[#AC292A]/20 hover:bg-[#AC292A]/5 transition-all duration-200"
                aria-label="Close"
              >
                <MdClose size={18} />
              </button>
            </div>

            {/* Form body */}
            <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6">
              {/* Step indicator */}
              <StepIndicator step={step} />

              <form onSubmit={handleSubmit}>

                {/* ══ STEP 1 ══════════════════════════════════ */}
                {step === 1 && (
                  <div>
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-1 h-5 rounded-full bg-[#AC292A]" />
                      <h6 className="text-sm font-bold text-[#192133] uppercase tracking-wide">Product Specification</h6>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">

                      {/* Box Style */}
                      <div>
                        <FieldLabel text="Box Style" required />
                        <input name="boxStyle" value={formData.boxStyle} onChange={handleChange} placeholder="Box Style" required
                          className="w-full border border-gray-200 bg-white text-sm px-3 py-2.5 rounded-xl text-[#192133] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#AC292A]/30 focus:border-[#AC292A] transition-all duration-200"
                        />
                      </div>

                      {/* Length */}
                      <div>
                        <FieldLabel text="Length" required />
                        <input name="length" value={formData.length} onChange={handleChange} placeholder="Length" required
                          className="w-full border border-gray-200 bg-white text-sm px-3 py-2.5 rounded-xl text-[#192133] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#AC292A]/30 focus:border-[#AC292A] transition-all duration-200"
                        />
                      </div>

                      {/* Width */}
                      <div>
                        <FieldLabel text="Width" required />
                        <input name="width" value={formData.width} onChange={handleChange} placeholder="Width" required
                          className="w-full border border-gray-200 bg-white text-sm px-3 py-2.5 rounded-xl text-[#192133] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#AC292A]/30 focus:border-[#AC292A] transition-all duration-200"
                        />
                      </div>

                      {/* Depth */}
                      <div>
                        <FieldLabel text="Depth" required />
                        <input name="depth" value={formData.depth} onChange={handleChange} placeholder="Depth" required
                          className="w-full border border-gray-200 bg-white text-sm px-3 py-2.5 rounded-xl text-[#192133] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#AC292A]/30 focus:border-[#AC292A] transition-all duration-200"
                        />
                      </div>

                      {/* Unit */}
                      <div>
                        <FieldLabel text="Unit" required />
                        <StyledSelect name="unit" value={formData.unit} onChange={handleChange} required>
                          <option>Inches</option>
                          <option>mm</option>
                          <option>cm</option>
                        </StyledSelect>
                      </div>

                      {/* Stock */}
                      <div>
                        <FieldLabel text="Stock" required />
                        <StyledSelect name="stock" value={formData.stock} onChange={handleChange} required>
                          <option>Stock</option>
                          <option>12pt Cardboard</option>
                          <option>14pt Cardboard</option>
                          <option>16pt Cardboard</option>
                          <option>18pt Cardboard</option>
                          <option>20pt Cardboard</option>
                          <option>22pt Cardboard</option>
                          <option>24pt Cardboard</option>
                          <option>White SBS C1S C25</option>
                          <option>Corrugated</option>
                          <option>Rigid</option>
                          <option>Kraft</option>
                          <option>Linen</option>
                        </StyledSelect>
                      </div>

                      {/* Colors */}
                      <div>
                        <FieldLabel text="Colors" required />
                        <StyledSelect name="colors" value={formData.colors} onChange={handleChange} required>
                          <option value="Colors">Colors</option>
                          <option value="Plain (No Printing)">Plain (No Printing)</option>
                          <option value="1 Color">1 Color</option>
                          <option value="2 Color">2 Color</option>
                          <option value="3 Color">3 Color</option>
                          <option value="4 Color">4 Color</option>
                          <option value="4/1 Color">4/1 Color</option>
                          <option value="4/2 Color">4/2 Color</option>
                          <option value="4/3 Color">4/3 Color</option>
                          <option value="4/4 Color">4/4 Color</option>
                        </StyledSelect>
                      </div>

                      {/* Printing Sides */}
                      <div>
                        <FieldLabel text="Printing" required />
                        <StyledSelect name="printingSides" value={formData.printingSides} onChange={handleChange} required>
                          <option value="Inside">Inside</option>
                          <option value="Outside">Outside</option>
                          <option value="Both (Inside & Outside)">Both Sides</option>
                        </StyledSelect>
                      </div>

                      {/* Quantity */}
                      <div>
                        <FieldLabel text="Quantity" required />
                        <input name="quantity" value={formData.quantity} onChange={handleChange} placeholder="e.g. 500" required
                          className="w-full border border-gray-200 bg-white text-sm px-3 py-2.5 rounded-xl text-[#192133] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#AC292A]/30 focus:border-[#AC292A] transition-all duration-200"
                        />
                      </div>

                      {/* Add-Ons */}
                      <div>
                        <FieldLabel text="Add-Ons" />
                        <StyledSelect name="addOns" value={formData.addOns} onChange={handleChange}>
                          <option value="">Select</option>
                          <option value="Foiling">Foiling</option>
                          <option value="Spot UV">Spot UV</option>
                          <option value="Embossing">Embossing</option>
                          <option value="Debossing">Debossing</option>
                          <option value="handles">Handles</option>
                          <option value="Inserts">Inserts</option>
                          <option value="Windows">Windows</option>
                        </StyledSelect>
                      </div>
                    </div>

                    {/* Upload + Description */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                      {/* Upload */}
                      <div>
                        <FieldLabel text="Upload Design" />
                        <div
                          className="relative border-2 border-dashed border-gray-200 rounded-2xl p-5 text-center hover:border-[#AC292A]/40 hover:bg-[#AC292A]/3 transition-all duration-300 cursor-pointer group"
                          style={{ minHeight: 120 }}
                          onDrop={handleFileDrop}
                          onDragOver={(e) => e.preventDefault()}
                        >
                          <input type="file" name="image" id="design_upload" onChange={handleChange}
                            className="hidden" accept=".png,.pdf,.jpg,.jpeg,.webp"
                          />
                          <label htmlFor="design_upload" className="cursor-pointer flex flex-col items-center gap-2">
                            <div className="w-11 h-11 rounded-xl bg-[#192133]/6 flex items-center justify-center group-hover:bg-[#AC292A]/10 transition-colors duration-300">
                              <svg className="w-5 h-5 text-[#192133] group-hover:text-[#AC292A] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                            </div>
                            {formData.image ? (
                              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#AC292A]/10 rounded-full">
                                <svg className="w-3.5 h-3.5 text-[#AC292A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-[#AC292A] text-xs font-bold truncate max-w-[140px]">{formData.image.name}</span>
                              </div>
                            ) : (
                              <>
                                <p className="text-[#192133] text-xs font-semibold group-hover:text-[#AC292A] transition-colors duration-300">
                                  Click to upload or drag & drop
                                </p>
                                <p className="text-gray-400 text-[10px]">PNG, PDF, JPG, WEBP · Max 5MB</p>
                              </>
                            )}
                          </label>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="flex flex-col">
                        <FieldLabel text="Description" />
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows={5}
                          placeholder="Tell us about size, material, finishing, add-ons, and design preferences..."
                          className="flex-1 border border-gray-200 bg-white text-sm px-3 py-2.5 rounded-2xl text-[#192133] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#AC292A]/30 focus:border-[#AC292A] transition-all duration-200 resize-none leading-relaxed"
                        />
                      </div>
                    </div>

                    {/* Next button */}
                    <div className="flex justify-end mt-6 pt-5 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={!validateStep1()}
                        className={`inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold text-white uppercase tracking-wide transition-all duration-200
                          ${validateStep1()
                            ? 'bg-[#192133] hover:bg-[#AC292A] hover:shadow-[0_4px_14px_rgba(172,41,42,0.35)] active:scale-[0.98]'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                      >
                        Next Step
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                {/* ══ STEP 2 ══════════════════════════════════ */}
                {step === 2 && (
                  <div>
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-1 h-5 rounded-full bg-[#AC292A]" />
                      <h6 className="text-sm font-bold text-[#192133] uppercase tracking-wide">Personal Information</h6>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <FieldLabel text="Full Name" required />
                        <input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required
                          className="w-full border border-gray-200 bg-white text-sm px-3 py-2.5 rounded-xl text-[#192133] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#AC292A]/30 focus:border-[#AC292A] transition-all duration-200"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <FieldLabel text="Email Address" required />
                        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@company.com" required
                          className="w-full border border-gray-200 bg-white text-sm px-3 py-2.5 rounded-xl text-[#192133] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#AC292A]/30 focus:border-[#AC292A] transition-all duration-200"
                        />
                      </div>

                      {/* Company */}
                      <div>
                        <FieldLabel text="Company Name" />
                        <input name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company Name"
                          className="w-full border border-gray-200 bg-white text-sm px-3 py-2.5 rounded-xl text-[#192133] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#AC292A]/30 focus:border-[#AC292A] transition-all duration-200"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <FieldLabel text="Phone Number" />
                        <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="+1 (000) 000-0000"
                          className="w-full border border-gray-200 bg-white text-sm px-3 py-2.5 rounded-xl text-[#192133] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#AC292A]/30 focus:border-[#AC292A] transition-all duration-200"
                        />
                      </div>

                      {/* Confirm checkbox */}
                      <div className="sm:col-span-2">
                        <label className="flex items-start gap-3 p-4 rounded-xl bg-[#f7f8fc] border border-gray-100 cursor-pointer group hover:border-[#AC292A]/20 transition-all duration-200">
                          <input
                            type="checkbox"
                            id="confirmInfo"
                            className="mt-0.5 w-4 h-4 accent-[#AC292A] cursor-pointer flex-shrink-0"
                          />
                          <span className="text-sm text-gray-500 group-hover:text-[#192133] transition-colors duration-200 leading-relaxed">
                            I confirm that all the information provided is accurate and complete.
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 pt-5 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-[#192133] border border-gray-200 hover:border-[#192133] hover:bg-[#192133] hover:text-white transition-all duration-200 w-full sm:w-auto justify-center"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous
                      </button>

                      <button
                        type="submit"
                        disabled={!validateStep2() || isLoading}
                        className={`inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-xl text-sm font-bold text-white uppercase tracking-wide transition-all duration-200 w-full sm:w-auto
                          ${validateStep2() && !isLoading
                            ? 'bg-[#AC292A] hover:bg-[#AC292A]/90 hover:shadow-[0_4px_16px_rgba(172,41,42,0.40)] active:scale-[0.98]'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                      >
                        {isLoading ? (
                          <>
                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                            </svg>
                            Sending…
                          </>
                        ) : (
                          <>
                            Submit Quote
                            <RiCheckboxCircleLine size={16} />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

        </div>
      </div>
    </Modal>
  );
};

export default GetQuoteModal;