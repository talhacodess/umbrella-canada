
import React from 'react';

const Modal = ({ isOpen, onClose, children,className }) => {
  if (!isOpen) return null;
  
  return (
    <>
      <div className="fixed bg-black/60 backdrop-blur-sm z-50 inset-0 overflow-y-auto animate-fadeIn">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          {/* <div 
            className="fixed inset-0 bg-black/40 transition-opacity" 
            onClick={onClose}
            aria-hidden="true"
          ></div> */}

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div className={`inline-block align-middle bg-white text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle rounded-2xl ${className || 'sm:max-w-lg w-full'}`}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;