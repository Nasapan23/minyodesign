'use client';
import React, { createContext, useState, useContext } from 'react';

// Create the context
const ModalContext = createContext();

// Create a provider component
export const ModalProvider = ({ children }) => {
  const [modalData, setModalData] = useState(null);

  const showModal = (data) => {
    setModalData(data);
  };

  const hideModal = () => {
    setModalData(null);
  };

  return (
    <ModalContext.Provider value={{ modalData, showModal, hideModal }}>
      {children}
      {modalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <button onClick={hideModal} className="absolute top-2 right-2">Close</button>
            <h2>{modalData.name}</h2>
            <img src={modalData.logo} alt={`${modalData.name} logo`} />
            <div dangerouslySetInnerHTML={{ __html: modalData.description }} />
            <div className="grid grid-cols-1 gap-2 mt-4">
              {modalData.images.map((src, idx) => (
                <img key={idx} src={src} alt={`Image ${idx}`} className="w-full" />
              ))}
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

// Custom hook for using the modal context
export const useModal = () => {
  return useContext(ModalContext);
};
