import React from 'react';
import ButtonXSVG from '@/utils/svgs';
import '@/styles/modal.css';

const Modal = ({ id, name, logo, description, images, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="modal-wrapper">
        {/* Back Layer */}
        <div className="back-layer"></div>

        {/* Modal Content */}
        <div className="modal-container p-2 overflow-y-auto">
          {/* Close Button */}
          <div className=" ">
          <button
            onClick={onClose}
            className="absolute top-6 right-12 text-black text-xl w-12 h-12 flex items-center justify-center bg-transparent z-10 close-button"
          >
            <ButtonXSVG />
          </button>
          </div>

          <div className="w-full h-full p-6 bg-[#5CA1B7] rounded-lg inner-content overflow-y-auto">
            {/* Header Section (Logo + Text) */}
            <div className="flex mb-6 header-container">
              {/* Logo Section */}
              <div className="w-1/3 mr-6 p-4 logo-container">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-full h-auto object-contain logo-img"
                />
              </div>

              {/* Text Section */}
              <div className="w-2/3 bg-[#2F6B91] p-4 text-container">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Card ID: {id}
                </h2>
                <h3 className="text-xl text-white mb-4">Card Name: {name}</h3>
                <p
                  className="text-white leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
            </div>

            {/* Images Section */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#2F6B91] p-4 images-container">
              {images && images.map((imgSrc, index) => (
                <div key={index} className="bg-white p-2 image-box">
                  <img
                    src={imgSrc}
                    alt={`Image ${index + 1}`}
                    className="w-full h-auto object-cover image-content rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
