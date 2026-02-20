import React, { useState, useEffect } from 'react';
import axios from 'axios';
import popupBanner from '../../assets/images/popup-banner.webp';

const SavingsPopup = ({ isOpen, onClose, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone) newErrors.phone = 'Required';
    if (!formData.message) newErrors.message = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[9999] p-4 animate-fadeIn">
      <div className="relative rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden animate-slideUp" style={{ backgroundColor: '#213554' }}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center hover:bg-yellow-300 transition-colors z-[110]"
          style={{ color: '#ee334b' }}
        > ✕ </button>

        {/* Discount Badge SVG */}
        <div className="absolute top-0 right-0 w-40 h-40 flex items-center justify-center z-[100]">
            <svg viewBox="0 0 150 150" className="w-full h-full drop-shadow-xl overflow-visible">
              <path 
                fill="#ED374E" 
                className="animate-spin-slow"
                style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
                d="M135.43,84.86c2.26-2.23,4.5-4.47,6.75-6.72c1.77-1.76,3.52-3.54,5.27-5.29c-0.7-0.63-1.33-1.23-1.99-1.78 c-2.3-1.93-4.62-3.84-6.92-5.76c-2.36-1.98-4.68-4.01-7.09-5.93c-0.89-0.71-1.12-1.42-0.76-2.46c0.72-2.1,1.2-4.17,1.79-6.31 c0.63-2.26,1.37-4.59,1.92-6.88c0.08-0.32,0.2-0.63,0.3-0.95c0.56-1.88,1.12-3.77,1.7-5.73c-1.63-0.34-3.18-0.67-4.74-0.99 l-11.34-2.19c-2.49-0.42-3.75-0.35-5.4-0.81c-0.33-0.09-0.64-0.66-0.74-1.06c-0.61-2.37-1.11-4.78-1.73-7.15 c-1.06-4.04-2.19-8.06-3.27-12.1c-0.3-1.13-0.72-1.36-1.82-0.95c-1.95,0.73-3.9,1.47-5.85,2.18c-3.81,1.38-7.61,2.8-11.45,4.09 c-0.77,0.26-1.58,1.15-2.53,0.34c-0.69-0.59-1.4-1.16-2.03-1.81c-3.64-3.78-7.25-7.59-10.89-11.37c-0.75-0.78-1.63-1.45-2.51-2.22 c-0.76,0.94-1.43,1.81-2.14,2.64c-3.8,4.49-7.63,8.97-11.42,13.47c-0.62,0.73-1.23,0.97-2.16,0.65c-1.23-0.43-2.51-0.75-3.77-1.11 c-1.87-0.53-3.74-1.05-5.6-1.58c-2.49-0.71-4.98-1.44-7.47-2.16c-0.78-0.23-1.59-0.43-2.33-0.74c-0.62-0.27-0.92-0.18-1.05,0.51 c-0.76,3.91-1.58,7.81-2.28,11.73c-0.48,2.7-0.74,5.44-1.26,8.13c-0.12,0.64-0.75,1.53-1.32,1.68c-3.46,0.96-6.98,1.71-10.46,2.6 c-2.96,0.76-5.87,1.71-8.85,2.4c-1.23,0.29-1.11,0.93-0.84,1.71c1.19,3.41,2.42,6.79,3.63,10.19c0.97,2.71,1.87,5.45,2.91,8.14 c0.36,0.92,0.28,1.5-0.43,2.18c-2.02,1.94-3.97,3.97-5.96,5.94c-1.32,1.3-2.7,2.55-4.03,3.86c-1.66,1.64-3.29,3.32-5.01,5.05 c2.43,2.03,4.79,4,7.15,5.98c3.05,2.55,6.09,5.12,9.16,7.66c0.72,0.6,0.82,1.21,0.49,2.08c-0.41,1.07-0.65,2.21-0.96,3.32 c-0.12,0.44-0.23,0.88-0.36,1.32c-0.71,2.45-1.45,4.89-2.12,7.35c-0.59,2.13-1.16,4.25-1.72,6.39c-0.06,0.23-0.13,0.51-0.2,0.76 c-0.29,1.06-0.34,1.04,0.49,1.18c5.27,0.95,10.53,1.91,15.8,2.86c1.02,0.18,2.06,0.3,3.08,0.45c2.24,0.34,2.52,0.7,3,2.92 c0.65,3.03,1.37,6.05,2.14,9.06c0.76,2.98,1.72,5.91,2.39,8.91c0.29,1.3,1,1.01,1.7,0.79c1.13-0.34,2.21-0.84,3.33-1.23 c5.07-1.82,10.14-3.64,15.22-5.4c0.47-0.16,1.29-0.13,1.6,0.17c2.54,2.48,5.01,5.04,7.49,7.57c2.53,2.58,5.06,5.17,7.59,7.75 c1.91-2.17,3.81-4.27,5.63-6.44c2.76-3.27,5.45-6.59,8.19-9.88c0.44-0.52,0.93-0.82,1.73-0.54c2.18,0.76,4.38,1.48,6.6,2.09 c2.31,0.63,4.65,1.1,6.98,1.65c0.16,0.04,0.32,0.1,0.48,0.15c2.06,0.65,4.12,1.3,6.22,1.96c0.09-0.15,0.21-0.28,0.24-0.43 c0.7-3.45,1.44-6.9,2.05-10.37c0.52-2.99,0.89-6,1.32-9c0.29-2.07,0.87-2.53,2.94-2.96c3.05-0.63,6.08-1.39,9.1-2.16 c2.97-0.75,5.89-1.67,8.88-2.35c1.1-0.25,1.03-0.91,0.86-1.54c-0.39-1.41-0.91-2.78-1.42-4.16c-1.78-4.85-3.57-9.7-5.38-14.54 c-0.29-0.76-0.17-1.34,0.44-1.89C133.4,86.81,134.43,85.85,135.43,84.86z"
              />
              <g fill="#FFFFFF" style={{ fontFamily: 'sans-serif' }}>
                <text x="40" y="88" fontSize="43" fontWeight="900">25</text>
                <text x="88" y="75" fontSize="25" fontWeight="900">%</text>
                <text x="88" y="88" fontSize="11" fontWeight="bold">OFF</text>
                <text x="75" y="106" fontSize="9" fontWeight="bold" textAnchor="middle">
                  <tspan x="75" dy="0">YOUR FIRST</tspan>
                  <tspan x="75" dy="11">ORDER</tspan>
                </text>
              </g>
            </svg>
        </div>

        <div className="p-8 md:p-12 pb-4">
          <div className="mb-6">
            <h2 className="text-3xl text-white mb-2">Let's Start With Savings</h2>
            <p className="text-white text-lg opacity-90">
                We're honored you found your way to Formuland. <br/>
                This is our thank you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className='grid grid-cols-2 gap-3'>
              <div>
                <input
                    type="text" name="name" placeholder="YOUR NAME"
                    value={formData.name} onChange={handleChange}
                    className="w-full px-4 py-3 bg-transparent border-2 border-white text-white rounded-lg focus:outline-none"
                    style={{ borderColor: errors.name ? '#fde047' : 'white' }}
                />
                {errors.name && <p className="text-xs text-yellow-300 mt-1">{errors.name}</p>}
              </div>
              <div>
                <input
                    type="email" name="email" placeholder="ENTER EMAIL"
                    value={formData.email} onChange={handleChange}
                    className="w-full px-4 py-3 bg-transparent border-2 border-white text-white rounded-lg focus:outline-none"
                    style={{ borderColor: errors.email ? '#fde047' : 'white' }}
                />
                {errors.email && <p className="text-xs text-yellow-300 mt-1">{errors.email}</p>}
              </div>
            </div>
            
            <div>
                <input
                type="tel" name="phone" placeholder="PHONE NUMBER"
                value={formData.phone} onChange={handleChange}
                className="w-full px-4 py-3 bg-transparent border-2 border-white text-white rounded-lg focus:outline-none"
                style={{ borderColor: errors.phone ? '#fde047' : 'white' }}
                />
                {errors.phone && <p className="text-xs text-yellow-300 mt-1">{errors.phone}</p>}
            </div>

            <div>
                <textarea
                name="message" placeholder="YOUR MESSAGE" rows="2"
                value={formData.message} onChange={handleChange}
                className="w-full px-4 py-3 bg-transparent border-2 border-white text-white rounded-lg focus:outline-none resize-none"
                style={{ borderColor: errors.message ? '#fde047' : 'white' }}
                />
                {errors.message && <p className="text-xs text-yellow-300 mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 font-bold text-lg rounded-lg bg-[#ee334b] text-white hover:bg-[#d91e3a] disabled:opacity-50 transition-colors shadow-lg"
            >
              {isSubmitting ? 'SENDING...' : 'SAVE 25%'}
            </button>
          </form>
        </div>

        {/* --- Product Image Section Restored --- */}
        <div className="px-8 pb-10">
            <div className="w-full">
                <img
                    src={popupBanner}
                    alt="Products"
                    className="w-full h-auto object-contain max-h-[250px]"
                />
            </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-slideUp { animation: slideUp 0.4s ease-out; }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
      `}} />
    </div>
  );
};

// --- Hook Logic ---
const usePopupManager = (options = {}) => {
  const { delay = 2000, showOnce = true, storageKey = 'f-popup-data', expiryDays = 7 } = options;
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const popupData = localStorage.getItem(storageKey);
    let shouldShow = true;

    if (showOnce && popupData) {
      try {
        const { timestamp } = JSON.parse(popupData);
        const now = new Date().getTime();
        if ((now - timestamp) < (expiryDays * 24 * 60 * 60 * 1000)) {
          shouldShow = false;
        }
      } catch (e) { shouldShow = true; }
    }

    if (shouldShow) {
      const timer = setTimeout(() => setShowPopup(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay, showOnce, storageKey, expiryDays]);

  const closePopup = () => {
    setShowPopup(false);
    localStorage.setItem(storageKey, JSON.stringify({ timestamp: new Date().getTime() }));
  };

  return { showPopup, closePopup };
};

// --- Main Export ---
const PopupGlobal = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showPopup, closePopup } = usePopupManager({ delay: 2000 });

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      // Axios POST Request
      await axios.post('http://localhost:9090/popup/popupForms', formData);
      alert('Thank you! Your 25% discount code has been sent.');
      closePopup();
    } catch (error) {
      console.error("Submission error:", error);
      alert('Could not submit form. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SavingsPopup 
      isOpen={showPopup} 
      onClose={closePopup} 
      onSubmit={handleFormSubmit} 
      isSubmitting={isSubmitting} 
    />
  );
};

export default PopupGlobal;