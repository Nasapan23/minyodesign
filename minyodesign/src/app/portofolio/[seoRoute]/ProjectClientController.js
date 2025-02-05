'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navigation from '@/components/navigation';
import CloudyOverlay from '@/components/cloudOverlay/cloudOverlay';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { motion } from 'framer-motion';
import LoadingScreen from '@/components/loadingScreen';
import Footer from '@/components/footer';

export default function ProjectClientComponent({ projectData }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Navigation />

      {/* Top Overlay */}
      <div className="relative h-[16vh] w-full -mt-10 z-10">
        <CloudyOverlay mode="up" />
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-8 py-16 space-y-12 mt-16 z-20">
        {/* Title / Description / Logo */}
        <div className="flex flex-col lg:flex-row items-start gap-8">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{projectData.title}</h1>
            <p className="text-lg text-gray-600 leading-relaxed">{projectData.description}</p>
          </div>

          {/* Project Logo */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="bg-white shadow-md rounded-lg overflow-hidden flex items-center justify-center w-[60%] h-[60%]">
            <img
              src={projectData.logoImage}
              alt="Project Logo"
              width={300}
              height={300}
              className="object-contain w-full h-full"
              loading="lazy"  // Optional: you can specify lazy loading if desired
            />
            </div>
          </div>
        </div>

        {/* Gallery with Lightbox and Hover Animation */}
        <PhotoProvider>
        <div className="relative z-30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectData.galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className="relative bg-white shadow-md rounded-lg overflow-hidden p-2"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
              }}
              transition={{ duration: 0.3 }}
            >
              <PhotoView src={image}>
                <div className="w-full aspect-square overflow-hidden">
                  <Image
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    width={500}
                    height={500}
                    className="object-cover w-full h-full cursor-pointer rounded-lg border-4 border-white"
                  />
                </div>
              </PhotoView>
            </motion.div>
          ))}
        </div>
      </PhotoProvider>
      </div>

      {/* Bottom Overlay & Footer */}
      <div className="relative mt-[80%] lg:mt-[-36%] w-full z-10">
        <CloudyOverlay />
        <Footer />
      </div>
    </>
  );
}
