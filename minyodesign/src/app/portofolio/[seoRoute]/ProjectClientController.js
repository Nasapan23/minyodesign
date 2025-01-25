'use client';

import React from 'react';
import Navigation from '@/components/navigation';
import CloudyOverlay from '@/components/cloudOverlay/cloudOverlay';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

export default function ProjectClientComponent({ projectData }) {
  return (
    <>
      <Navigation />
      <div className="relative h-[24vh] w-full">
        <CloudyOverlay mode="up" />
      </div>
      <div className="container mx-auto px-8 py-16 space-y-12">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          <div className="lg:w-1/2 flex flex-col justify-start text-center lg:text-left">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{projectData.title}</h1>
            <p className="text-lg text-gray-600 leading-relaxed">{projectData.description}</p>
          </div>
          <div className="lg:w-1/2 flex justify-center items-start">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={projectData.logoImage}
                alt="Project Logo"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectData.galleryImages.map((image, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-300"
            >
              <Zoom>
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="object-cover w-full h-full cursor-pointer"
                />
              </Zoom>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
