import React, { useState } from 'react';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const PortfolioGallery = ({ logo, title, images, onClose }) => {
  const defaultTitle = title || "Project Showcase";
  const defaultLogo = logo || "https://via.placeholder.com/200";
  const defaultImages = images && images.length > 0
    ? images.map((src) => ({ src, width: 3, height: 2 }))
    : [
        { src: "https://via.placeholder.com/600x400", width: 3, height: 2 },
        { src: "https://via.placeholder.com/600x400", width: 3, height: 2 },
        { src: "https://via.placeholder.com/600x400", width: 3, height: 2 },
      ];

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (event, { index }) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const moveNext = () => {
    setCurrentImageIndex((currentImageIndex + 1) % defaultImages.length);
  };

  const movePrev = () => {
    setCurrentImageIndex(
      (currentImageIndex + defaultImages.length - 1) % defaultImages.length
    );
  };

  return (
    <div className="fixed inset-0 bg-blue-50 z-50 flex flex-col">
      {/* Close Modal Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-2xl w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-gray-700"
        aria-label="Close Modal"
      >
        ×
      </button>

      {/* Header Section */}
      <div className="flex items-start px-6 py-4">
        {/* Logo */}
        <div className="w-48 h-48 flex-shrink-0 aspect-square overflow-hidden bg-white rounded-lg">
          <img
            src={defaultLogo}
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title & Description */}
        <div className="ml-6 flex flex-col justify-start">
          <h1 className="text-3xl font-bold text-black">{defaultTitle}</h1>
          <p className="text-gray-600 mt-2">
            This is a brief description of the project. It can include details 
            like purpose, features, and the tech stack used. Replace this text 
            as needed to describe your project.
          </p>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="flex-grow px-6 py-4 overflow-y-auto">
        <Gallery photos={defaultImages} onClick={openLightbox} />
      </div>

      {/* Lightbox for Slideshow */}
      {isLightboxOpen && (
        <Lightbox
          mainSrc={defaultImages[currentImageIndex].src}
          nextSrc={defaultImages[(currentImageIndex + 1) % defaultImages.length].src}
          prevSrc={
            defaultImages[
              (currentImageIndex + defaultImages.length - 1) % defaultImages.length
            ].src
          }
          onCloseRequest={() => setIsLightboxOpen(false)}
          onMoveNextRequest={moveNext}
          onMovePrevRequest={movePrev}
          reactModalStyle={{ overlay: { zIndex: 9999 } }}
        />
      )}
    </div>
  );
};

export default PortfolioGallery;
